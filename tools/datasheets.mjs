// tools/datasheets.mjs: builds a 2-page PDF datasheet for every product from
// src/content/products.data.mjs, into assets/datasheets/.
//
// Run locally (needs Chrome and the site built and served from dist/):
//   node build.mjs
//   python -m http.server 8080 --directory dist   (in another window)
//   node tools/datasheets.mjs
// Then rebuild so the PDFs are copied into dist/ and the site links pick them up.
// ponytail: PDFs are committed, not built on Cloudflare (no Chrome there). Re-run after editing product copy.

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { PRODUCTS } from '../src/content/products.data.mjs';
import { SITE } from '../src/site.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PREVIEW = path.join(ROOT, 'dist', '_datasheets');
const OUT = path.join(ROOT, 'assets', 'datasheets');
const SERVER = process.env.DATASHEET_SERVER ?? 'http://127.0.0.1:8080';
const CHROME = process.env.CHROME ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
].find(existsSync);

import { datasheetFile } from '../src/lib/datasheets.mjs';

const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const asset = (p) => `../assets/${String(p).replace(/^\/+/, '')}`;
const year = new Date().getFullYear();

function sheet(p) {
  const heroImg = p.hero.bg ?? p.capabilities.items[0]?.image?.src;
  const caps = p.capabilities.items;
  const steps = p.howItWorks?.steps ?? [];
  const stats = p.proof?.stats ?? [];
  const faq = (p.faq ?? []).slice(0, 3);
  const others = PRODUCTS.filter((o) => o.slug !== p.slug).map((o) => o.title.replace(/\s*\(.*\)$/, ''));

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(p.title)} Datasheet | ${esc(SITE.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --navy-900:#061040; --navy-800:#0A1A65; --navy-600:#1B2E86; --blue:#48ABE0; --blue-600:#2E86B8; --cyan:#7fe3f0; --ink:#0f1733; --muted:#4a5576; --line:#dfe5f2; --soft:#f3f6fc; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Inter, "Segoe UI", sans-serif; color: var(--ink); font-size: 9.5pt; line-height: 1.45; }
  h1, h2, h3, .display { font-family: "Space Grotesk", "Segoe UI", sans-serif; }
  .page { width: 8.5in; height: 11in; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; }
  .page:last-child { page-break-after: auto; }
  .band { background: linear-gradient(120deg, var(--navy-900), var(--navy-800) 60%, var(--navy-600)); color: #fff; padding: .32in .55in; display: flex; align-items: center; justify-content: space-between; }
  .band img { height: .5in; display: block; }
  .band .kind { text-align: right; font-family: "Space Grotesk"; letter-spacing: .14em; text-transform: uppercase; font-size: 8pt; color: var(--cyan); }
  .band .kind b { display: block; color: #fff; font-size: 10.5pt; letter-spacing: .08em; }
  .hero { height: 2.8in; background-size: cover; background-position: center; position: relative; }
  .hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,16,64,0) 55%, rgba(6,16,64,.55)); }
  .body { padding: .3in .55in 0; flex: 1; }
  .eyebrow { color: var(--blue-600); font-weight: 700; font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; }
  h1 { font-size: 25pt; line-height: 1.08; color: var(--navy-800); margin: .05in 0 .06in; }
  .headline { font-family: "Space Grotesk"; font-size: 13.5pt; color: var(--blue-600); font-weight: 500; margin-bottom: .1in; }
  .sub { font-size: 10.5pt; color: var(--muted); max-width: 6.6in; }
  h2 { font-size: 13pt; color: var(--navy-800); margin: .2in 0 .04in; display: flex; align-items: center; gap: .1in; }
  h2::before { content: ""; width: .22in; height: 3px; background: var(--blue); border-radius: 2px; }
  .intro { color: var(--muted); margin-bottom: .12in; }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: .14in; }
  .card { background: var(--soft); border: 1px solid var(--line); border-radius: 8px; padding: .14in .16in; }
  .card h3 { font-size: 10.5pt; color: var(--navy-800); margin-bottom: .04in; }
  .card p { color: var(--muted); font-size: 9pt; }
  .glance { margin-top: .22in; background: var(--navy-800); color: #fff; border-radius: 10px; padding: .18in .22in; display: grid; grid-template-columns: 1.1fr 2fr; gap: .2in; align-items: center; }
  .glance h3 { font-size: 12pt; color: var(--cyan); }
  .glance ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: .05in .2in; }
  .glance li { padding-left: .16in; position: relative; font-size: 9pt; }
  .glance li::before { content: ""; position: absolute; left: 0; top: .06in; width: .07in; height: .07in; border-radius: 50%; background: var(--blue); }
  .cap { display: grid; grid-template-columns: 1.6in 1fr; gap: .2in; align-items: start; padding: .09in 0; border-bottom: 1px solid var(--line); }
  .cap:last-child { border-bottom: 0; }
  .cap img { width: 1.6in; height: .9in; object-fit: cover; border-radius: 6px; display: block; }
  .cap h3 { font-size: 11pt; color: var(--navy-800); margin-bottom: .03in; }
  .cap p { color: var(--muted); }
  .cap ul { list-style: none; display: flex; flex-wrap: wrap; gap: .05in; margin-top: .07in; }
  .cap li { background: #e8f4fb; color: var(--navy-800); border-radius: 999px; padding: .02in .1in; font-size: 8pt; font-weight: 500; }
  .row { display: grid; gap: .14in; }
  .steps { grid-template-columns: repeat(4, 1fr); }
  .step { border-top: 3px solid var(--blue); padding-top: .07in; }
  .step b { display: block; font-family: "Space Grotesk"; color: var(--navy-800); font-size: 10pt; }
  .step b span { color: var(--blue-600); margin-right: .05in; }
  .step p { color: var(--muted); font-size: 8.5pt; }
  .stats { grid-template-columns: repeat(3, 1fr); }
  .stat { background: var(--soft); border-radius: 8px; padding: .12in; text-align: center; }
  .stat b { display: block; font-family: "Space Grotesk"; font-size: 18pt; color: var(--navy-800); line-height: 1.1; }
  .stat span { color: var(--muted); font-size: 8.5pt; }
  .faq dt { font-weight: 700; color: var(--navy-800); margin-top: .08in; }
  .faq dd { color: var(--muted); }
  .cta { margin: auto .55in .18in; background: linear-gradient(120deg, var(--navy-900), var(--navy-800)); color: #fff; border-radius: 12px; padding: .22in .26in; display: grid; grid-template-columns: 1fr auto; gap: .2in; align-items: center; }
  .cta h3 { font-size: 14pt; }
  .cta p { color: #c9d6f2; font-size: 9pt; margin-top: .03in; }
  .cta .btn { background: var(--blue); color: var(--navy-900); font-weight: 700; border-radius: 999px; padding: .1in .22in; text-decoration: none; font-size: 10pt; white-space: nowrap; }
  .cta .contact { grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,.15); padding-top: .1in; font-size: 8.5pt; color: #c9d6f2; display: flex; gap: .3in; }
  .cta .contact a { color: var(--cyan); text-decoration: none; }
  .platform { font-size: 9pt; color: var(--muted); margin-top: .2in; border-left: 3px solid var(--blue); padding: .04in 0 .04in .14in; }
  .platform b { color: var(--navy-800); }
  .foot { padding: 0 .55in .22in; display: flex; justify-content: space-between; font-size: 7.5pt; color: #8a93ad; }
  .page:first-child .foot { margin-top: auto; padding-top: .2in; }
</style></head><body>

<section class="page">
  <header class="band"><img src="${asset('img/logo.png')}" alt="${esc(SITE.name)}"><div class="kind">Product datasheet<b>${esc(p.hero.eyebrow)}</b></div></header>
  <div class="hero" style="background-image:url('${asset(heroImg)}')"></div>
  <div class="body">
    <p class="eyebrow">${esc(SITE.name)}</p>
    <h1>${esc(p.title)}</h1>
    <p class="headline">${esc(p.hero.headline)}</p>
    <p class="sub">${esc(p.hero.sub)}</p>

    <h2>The challenge: ${esc(p.problem.heading)}</h2>
    <p class="intro">${esc(p.problem.intro)}</p>
    <div class="cards">${p.problem.items.map((i) => `<div class="card"><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p></div>`).join('')}</div>

    <div class="glance"><h3>${esc(p.capabilities.heading)}</h3>
      <ul>${caps.flatMap((c) => c.bullets ?? []).slice(0, 8).map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>
    <p class="platform"><b>Part of one platform.</b> ${esc(p.title.replace(/\s*\(.*\)$/, ''))} runs alongside ${esc(others.slice(0, -1).join(', '))} and ${esc(others.at(-1))}, with one console and one policy engine.</p>
  </div>
  <footer class="foot"><span>${esc(SITE.origin.replace(/^https?:\/\//, ''))}</span><span>${esc(p.title)} | Page 1 of 2</span></footer>
</section>

<section class="page">
  <header class="band"><img src="${asset('img/logo.png')}" alt="${esc(SITE.name)}"><div class="kind">Product datasheet<b>${esc(p.title.replace(/\s*\(.*\)$/, ''))}</b></div></header>
  <div class="body">
    <h2 style="margin-top:.05in">Key capabilities</h2>
    <p class="intro">${esc(p.capabilities.intro)}</p>
    ${caps.map((c) => `<div class="cap">${c.image ? `<img src="${asset(c.image.src)}" alt="${esc(c.image.alt)}">` : '<div></div>'}<div><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p>${c.bullets?.length ? `<ul>${c.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}</div></div>`).join('')}

    ${steps.length ? `<h2>How it works</h2><div class="row steps">${steps.map((s, i) => `<div class="step"><b><span>0${i + 1}</span>${esc(s.title)}</b><p>${esc(s.body)}</p></div>`).join('')}</div>` : ''}
    ${stats.length ? `<h2>By the numbers</h2><div class="row stats">${stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>` : ''}
    ${faq.length ? `<h2>Common questions</h2><dl class="faq">${faq.map((f) => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('')}</dl>` : ''}
  </div>
  <div class="cta"><div><h3>Talk to an Expert</h3><p>See how ${esc(p.title.replace(/\s*\(.*\)$/, ''))} fits your environment in a 30-minute conversation with a security expert.</p></div>
    <a class="btn" href="${esc(SITE.bookingUrl)}">Book a time</a>
    <div class="contact"><a href="${esc(SITE.origin)}/${esc(p.slug)}.html">${esc(SITE.origin.replace(/^https?:\/\//, ''))}/${esc(p.slug)}</a><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></div></div>
  <footer class="foot"><span>&copy; ${year} ${esc(SITE.legalName)}. All rights reserved.</span><span>${esc(p.title)} | Page 2 of 2</span></footer>
</section>
</body></html>`;
}

async function main() {
  if (!CHROME) throw new Error('Chrome not found; set CHROME=path/to/chrome');
  try { await fetch(SERVER); } catch { throw new Error(`Nothing serving dist/ at ${SERVER}. Start: python -m http.server 8080 --directory dist`); }
  await mkdir(PREVIEW, { recursive: true });
  await mkdir(OUT, { recursive: true });
  const profile = path.join(os.tmpdir(), 'stc-datasheet-chrome');
  for (const p of PRODUCTS) {
    const name = p.slug.replace(/^products\//, '');
    await writeFile(path.join(PREVIEW, `${name}.html`), sheet(p), 'utf8');
    const pdf = path.join(OUT, datasheetFile(p.slug));
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', `--user-data-dir=${profile}`, '--no-pdf-header-footer',
      '--virtual-time-budget=8000', `--print-to-pdf=${pdf}`, `${SERVER}/_datasheets/${name}.html`], { stdio: 'ignore' });
    console.log('wrote', path.relative(ROOT, pdf));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await main();