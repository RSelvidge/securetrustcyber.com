// build.mjs — SecureTrust Cyber static site generator. Zero dependencies:
// only node:fs, node:path, node:url. Produces plain static HTML in dist/ that
// double-clicks open. Editing requires re-running `node build.mjs`.

import { mkdir, writeFile, readdir, readFile, rm, cp } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { raw, toString } from './src/lib/html.mjs';
import { makeUrl } from './src/lib/url.mjs';
import { base } from './src/layouts/base.mjs';
import * as validate from './src/lib/validate.mjs';
import { SITE } from './src/site.config.mjs';
import { PAGES } from './src/site.registry.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const ASSETS = path.join(ROOT, 'assets');

const WATCH = process.argv.includes('--watch');

const TEMPLATES = {
  index: (await import('./src/templates/index.mjs')).default,
  product: (await import('./src/templates/product.mjs')).default,
  industry: (await import('./src/templates/industry.mjs')).default,
  competitor: (await import('./src/templates/competitor.mjs')).default,
  compliance: (await import('./src/templates/compliance.mjs')).default,
  'blog-post': (await import('./src/templates/blog-post.mjs')).default,
  pricing: (await import('./src/templates/pricing.mjs')).default,
  form: (await import('./src/templates/form.mjs')).default,
  sitemap: (await import('./src/templates/sitemap.mjs')).default,
  notfound: (await import('./src/templates/notfound.mjs')).default,
  styleguide: (await import('./src/templates/styleguide.mjs')).default,
  // Everything else (landing, company, legal, resource, partner, integration,
  // solutions, category) uses the generic block-stack page template.
  default: (await import('./src/templates/page.mjs')).default,
};

/* ---------- content loading ---------- */
// content/pages/**/*.mjs default-export one page object OR an array of them.
async function loadPages() {
  const dir = path.join(SRC, 'content', 'pages');
  const ents = await readdir(dir, { recursive: true, withFileTypes: true });
  const files = ents
    .filter((e) => e.isFile() && e.name.endsWith('.mjs'))
    .map((e) => path.join(e.parentPath ?? e.path, e.name));

  const pages = [];
  for (const f of files.sort()) {
    const mod = await import(pathToFileURL(f).href);
    const exp = mod.default;
    if (!exp) throw new Error(`No default export in ${path.relative(ROOT, f)}`);
    pages.push(...(Array.isArray(exp) ? exp : [exp]));
  }
  return pages.filter((page) => !page.draft);
}

// slug '' -> index.html ; 'products/edr' -> products/edr.html
const outputPathFor = (slug) => (slug === '' ? 'index.html' : `${slug}.html`);

/* ---------- asset pipeline ---------- */
async function concatText(dir, out) {
  const ents = (await readdir(dir)).filter((e) => e.endsWith('.css') || e.endsWith('.js'));
  const files = ents.filter((e) => (e.endsWith('.css') ? e : e)).sort();
  const parts = await Promise.all(files.map((f) => readFile(path.join(dir, f), 'utf8')));
  await writeFile(out, parts.join('\n\n'), 'utf8');
}

async function copyAssets() {
  await cp(ASSETS, path.join(DIST, 'assets'), { recursive: true, force: true });
}

// Copy Cloudflare-specific root files (_headers) into the deploy root.
async function copyCloudflare() {
  const src = path.join(ROOT, 'cloudflare');
  if (existsSync(src)) await cp(src, DIST, { recursive: true, force: true });
}

// Short content hash of a built asset, used as a cache-busting ?v= query.
const versions = new Map();
function assetVersion(p) {
  const key = String(p).replace(/^\/+/, '');
  if (!versions.has(key)) {
    const file = path.join(DIST, 'assets', key);
    versions.set(key, existsSync(file) ? createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8) : '0');
  }
  return versions.get(key);
}

/* ---------- sitemap ---------- */
function buildSitemap(pages) {
  const urls = pages
    .filter((p) => p.sitemap !== false)
    .map((p) => {
      const loc = p.slug === '' ? SITE.origin + '/' : `${SITE.origin}/${p.slug}.html`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/* ---------- the build ---------- */
export async function build() {
  const t0 = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const pages = await loadPages();
  const registryMap = new Map(pages.map((p) => [p.slug, p]));

  const errors = validate.registry(pages);
  if (errors.length) fail(errors);

  await mkdir(path.join(DIST, 'assets', 'css'), { recursive: true });
  await mkdir(path.join(DIST, 'assets', 'js'), { recursive: true });
  await concatText(path.join(SRC, 'css'), path.join(DIST, 'assets', 'css', 'style.css'));
  await concatText(path.join(SRC, 'js'), path.join(DIST, 'assets', 'js', 'main.js'));
  await copyAssets();
  await copyCloudflare();

  const rendered = [];
  for (const page of pages) {
    const out = outputPathFor(page.slug);
    const relativeUrl = makeUrl(out);
    const url = (target = '') => target === 'talk-to-an-expert' ? SITE.bookingUrl : relativeUrl(target);
    const linkAttrs = (target) => target === 'talk-to-an-expert' || target === SITE.bookingUrl
      ? raw(' target="_blank" rel="noopener noreferrer"')
      : raw('');
    // /assets/* is served "immutable" for a year (cloudflare/_headers), so every
    // asset URL carries a content hash: a changed file gets a new URL.
    url.asset = (p) => `${relativeUrl.asset(p)}?v=${assetVersion(p)}`;
    url.self = relativeUrl.self;
    url.depth = relativeUrl.depth;
    const ctx = { slug: page.slug, out, url, linkAttrs, registry: registryMap, site: SITE };
    const tpl = TEMPLATES[page.type] ?? TEMPLATES.default;
    if (!page.type) errors.push(`"${page.slug}" missing type`);
    const doc = base(ctx, page, tpl(ctx, page));
    rendered.push({ page, out, markup: toString(doc) });
  }

  errors.push(...validate.links(rendered, registryMap), ...validate.html(rendered, pages), ...validate.breadcrumbs(rendered));
  if (errors.length) fail(errors);

  for (const { out, markup } of rendered) {
    const dest = path.join(DIST, out);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, markup, 'utf8');
  }

  await writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(pages), 'utf8');
  await writeFile(path.join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');

  console.log(`\n  SecureTrust Cyber — built ${rendered.length} pages in ${Date.now() - t0}ms`);
  console.log(`  open: ${path.join(DIST, 'index.html')}\n`);
}

function fail(errors) {
  console.error(`\n  BUILD FAILED — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error('   - ' + e);
  console.error('');
  process.exit(1);
}

/* ---------- watch (fork per rebuild — Node's ESM cache never goes stale) ---------- */
if (WATCH) {
  const { watch } = await import('node:fs');
  const { fork } = await import('node:child_process');
  let timer = null;
  let child = null;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (child) child.kill();
      child = fork(fileURLToPath(import.meta.url), [], { stdio: 'inherit' });
    }, 120);
  };
  for (const dir of [SRC, ASSETS]) {
    watch(dir, { recursive: true }, (_e, f) => {
      if (f && /\.(mjs|css|js|svg|txt|html)$/.test(f)) trigger();
    });
  }
  console.log('  watching src/ and assets/ …');
  await build();
} else {
  await build();
}
