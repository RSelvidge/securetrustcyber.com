import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const endpoint = 'https://api.indexnow.org/indexnow';

export function validateUrls(urls, origin) {
  return [...new Set(urls.map((value) => {
    const url = new URL(value);
    if (url.origin !== origin || url.username || url.password || url.search || url.hash) {
      throw new Error('IndexNow URLs must use the configured origin without credentials, queries or fragments.');
    }
    return url.href;
  }))];
}

// Use the sitemap and rendered output, including content hashes on image URLs.
// Exclude non-public/noindex pages; absence from the new map denotes removal.
export async function pageHashes(directory, origin) {
  const sitemap = await readFile(path.join(directory, 'sitemap.xml'), 'utf8');
  const urls = validateUrls([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]), origin);
  const hashes = new Map();
  for (const url of urls) {
    const pathname = decodeURIComponent(new URL(url).pathname);
    const file = path.resolve(directory, pathname === '/' ? 'index.html' : '.' + pathname);
    const relative = path.relative(path.resolve(directory), file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !file.endsWith('.html')) {
      throw new Error('Sitemap URL does not map to a safe HTML file.');
    }
    const html = await readFile(file, 'utf8');
    if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
    hashes.set(url, createHash('sha256').update(html).digest('hex'));
  }
  return hashes;
}

export function changedUrls(previous, current) {
  return [...new Set([...previous.keys(), ...current.keys()])]
    .filter((url) => previous.get(url) !== current.get(url)).sort();
}

export async function submitUrls({ origin, key, urls }, { fetchFn = fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) } = {}) {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid IndexNow verification key.');
  const urlList = validateUrls(urls, origin);
  if (!urlList.length) return [];
  const keyLocation = `${origin}/${key}.txt`;
  const proof = await fetchFn(keyLocation, { signal: AbortSignal.timeout(30000), redirect: 'error' });
  if (proof.status !== 200 || (await proof.text()).trim() !== key) {
    throw new Error('Live IndexNow verification file is missing or does not match. Deploy it before submitting.');
  }
  const results = [];
  for (let offset = 0; offset < urlList.length; offset += 10000) {
    const batch = urlList.slice(offset, offset + 10000);
    for (let attempt = 0; ; attempt++) {
      const response = await fetchFn(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList: batch }),
        signal: AbortSignal.timeout(30000), redirect: 'error',
      });
      if (response.status === 200 || response.status === 202) {
        results.push({ count: batch.length, status: response.status });
        break;
      }
      if ((response.status === 429 || response.status >= 500) && attempt < 2) {
        const retry = response.headers.get('retry-after');
        const seconds = retry ? (Number(retry) || (Date.parse(retry) - Date.now()) / 1000) : 5 * 2 ** attempt;
        // Stop rather than retry sooner than a server's long Retry-After.
        if (!Number.isFinite(seconds) || seconds > 60) throw new Error(`IndexNow HTTP ${response.status}; retry later.`);
        await sleep(Math.max(1, seconds) * 1000);
        continue;
      }
      throw new Error(`IndexNow submission failed: HTTP ${response.status}.`);
    }
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  let previousDir;
  let dryRun = false;
  const explicitUrls = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') dryRun = true;
    else if (args[i] === '--previous' && args[i + 1]) previousDir = args[++i];
    else if (args[i] === '--url' && args[i + 1]) explicitUrls.push(args[++i]);
    else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
  }
  if (!!previousDir === !!explicitUrls.length) throw new Error('Use either --previous <built-dist> or one or more --url <absolute-url> arguments. Add --dry-run to preview.');
  const config = JSON.parse(await readFile(path.join(root, 'tools/indexnow.config.json'), 'utf8'));
  const key = (await readFile(path.join(root, config.keyFile), 'utf8')).trim();
  const urls = previousDir
    ? changedUrls(await pageHashes(path.resolve(previousDir), config.origin), await pageHashes(path.join(root, 'dist'), config.origin))
    : validateUrls(explicitUrls, config.origin);
  console.log(`${dryRun ? 'Dry run: ' : ''}${urls.length} changed URL(s).`);
  for (const url of urls) console.log(url);
  if (!dryRun) {
    for (const result of await submitUrls({ origin: config.origin, key, urls })) {
      console.log(`IndexNow HTTP ${result.status}: ${result.count} URL(s) ${result.status === 202 ? 'received; key validation pending' : 'submitted successfully'}.`);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
