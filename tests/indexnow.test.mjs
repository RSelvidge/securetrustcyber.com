import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { changedUrls, pageHashes, submitUrls, validateUrls } from '../tools/indexnow.mjs';

const origin = 'https://securetrustcyber.com';
const key = 'test-indexnow-key-12345678';
const input = { origin, key, urls: [`${origin}/products/fwaas.html`] };
const proof = () => new Response(key);

test('rejects other hosts, credentials, queries and fragments and deduplicates URLs', () => {
  for (const value of ['https://evil.test/a', `${origin}.evil.test/a`, 'http://securetrustcyber.com/a', 'https://user:pass@securetrustcyber.com/a', `${origin}/a?secret=1`, `${origin}/a#part`]) {
    assert.throws(() => validateUrls([value], origin));
  }
  assert.deepEqual(validateUrls([...input.urls, ...input.urls], origin), input.urls);
});

test('detects added, changed and removed pages without resubmitting unchanged pages', () => {
  const previous = new Map([['same', '1'], ['changed', '1'], ['removed', '1']]);
  const current = new Map([['same', '1'], ['changed', '2'], ['added', '1']]);
  assert.deepEqual(changedUrls(previous, current), ['added', 'changed', 'removed']);
});

test('uses sitemap URLs, excludes noindex pages, and detects changed image content hashes', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'indexnow-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, 'products'));
  await writeFile(path.join(directory, 'sitemap.xml'), `<urlset><loc>${origin}/</loc><loc>${origin}/products/fwaas.html</loc><loc>${origin}/private.html</loc></urlset>`);
  await writeFile(path.join(directory, 'index.html'), '<h1>Home</h1>');
  await writeFile(path.join(directory, 'private.html'), '<meta name="robots" content="noindex">');
  await writeFile(path.join(directory, 'products/fwaas.html'), '<img src="image.webp?v=old">');
  const previous = await pageHashes(directory, origin);
  await writeFile(path.join(directory, 'products/fwaas.html'), '<img src="image.webp?v=new">');
  const current = await pageHashes(directory, origin);
  assert.equal(current.size, 2);
  assert.deepEqual(changedUrls(previous, current), input.urls);
});

test('maps extensionless and directory sitemap URLs to built HTML while supporting previous sitemaps', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'indexnow-clean-urls-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, 'resources'));
  await writeFile(path.join(directory, 'index.html'), 'Home');
  await writeFile(path.join(directory, 'resources/index.html'), 'Resources');
  await writeFile(path.join(directory, 'resources/webinars.html'), 'Webinars');
  const currentUrls = [`${origin}/`, `${origin}/resources/`, `${origin}/resources/webinars`];
  await writeFile(path.join(directory, 'sitemap.xml'), `<urlset>${currentUrls.map(url => `<loc>${url}</loc>`).join('')}</urlset>`);
  const current = await pageHashes(directory, origin);
  assert.deepEqual([...current.keys()], currentUrls);
  await writeFile(path.join(directory, 'sitemap.xml'), `<urlset><loc>${origin}/resources/webinars.html</loc></urlset>`);
  const previous = await pageHashes(directory, origin);
  assert.equal(previous.get(`${origin}/resources/webinars.html`), current.get(`${origin}/resources/webinars`));
});

test('verifies live ownership before submitting and distinguishes HTTP 202', async () => {
  const calls = [];
  const results = await submitUrls(input, { fetchFn: async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? proof() : new Response(null, { status: 202 });
  } });
  assert.deepEqual(results, [{ count: 1, status: 202 }]);
  assert.equal(calls[0].url, `${origin}/${key}.txt`);
  assert.equal(calls[1].url, 'https://api.indexnow.org/indexnow');
  assert.deepEqual(JSON.parse(calls[1].options.body), {
    host: 'securetrustcyber.com', key, keyLocation: `${origin}/${key}.txt`, urlList: input.urls,
  });
});

test('never submits with missing or incorrect ownership proof', async () => {
  for (const response of [new Response('not the key'), new Response(null, { status: 404 })]) {
    let calls = 0;
    await assert.rejects(submitUrls(input, { fetchFn: async () => { calls++; return response; } }), /verification file/);
    assert.equal(calls, 1);
  }
});

test('splits requests at the 10000 URL protocol limit', async () => {
  const batchSizes = [];
  const result = await submitUrls({ ...input, urls: Array.from({ length: 10001 }, (_, i) => `${origin}/page-${i}.html`) }, {
    fetchFn: async (_url, options) => {
      if (!options.body) return proof();
      batchSizes.push(JSON.parse(options.body).urlList.length);
      return new Response(null, { status: 200 });
    },
  });
  assert.deepEqual(batchSizes, [10000, 1]);
  assert.equal(result.length, 2);
});

test('honors bounded rate-limit retries and fails on permanent errors', async () => {
  let posts = 0;
  const delays = [];
  await submitUrls(input, { sleep: async (ms) => delays.push(ms), fetchFn: async (_url, options) => {
    if (!options.body) return proof();
    return ++posts === 1 ? new Response(null, { status: 429, headers: { 'retry-after': '2' } }) : new Response(null, { status: 200 });
  } });
  assert.equal(posts, 2);
  assert.deepEqual(delays, [2000]);
  for (const status of [400, 403, 422]) {
    await assert.rejects(submitUrls(input, { fetchFn: async (_url, options) => options.body ? new Response(null, { status }) : proof() }), new RegExp(`HTTP ${status}`));
  }
});

test('no changes means no network calls', async () => {
  assert.deepEqual(await submitUrls({ ...input, urls: [] }, { fetchFn: async () => assert.fail('Unexpected request') }), []);
});
