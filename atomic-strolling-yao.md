# SecureTrust Cyber — Full Site Build Spec

## Context

The user wants a B2B cybersecurity marketing website modeled on `heimdalsecurity.com` — "everything it has" — but carrying their own brand, **SecureTrust Cyber**, with original copy rather than Heimdal's trademark and text.

The reference site is a unified-security-platform vendor: a WordPress site with a 5-item mega-menu promising ~60 links, a homepage of ~12 sections, ~23 product pages, plus industry, competitor-comparison, compliance, partner, resource, company, and legal pages. To match it in depth, this build targets **~97 pages**.

`C:\Users\rick\Claude\Projects\SecuretrustCyber` is currently **empty**. This is a greenfield build. Node v22.23.2, Python 3.12, and git 2.55 are installed and available.

**Intended outcome:** a complete, navigable, deployable static marketing site that reads as a real product site — not a template demo — with zero npm dependencies and no framework.

---

## Decisions locked

| Decision | Choice | Rationale |
|---|---|---|
| Output | **Static HTML/CSS/JS** | No framework, no bundler. Output opens by double-clicking. |
| Build | **Zero-dependency Node generator** (`build.mjs`) | See "Why a generator" below. Uses only `node:fs`/`node:path`. **No npm packages, no `node_modules`.** |
| Scope | **Full site, ~97 pages** | Every mega-menu link resolves to a real page. |
| Brand | **SecureTrust Cyber** | Own name, logo, and copy. Not a Heimdal clone. |
| Palette | Navy `#0A1A65` / blue `#48ABE0` / near-black `#10103B` | Same family as the reference, own execution. |
| Fonts | **Space Grotesk** (display) + **Inter** (body), Google Fonts + system fallback | User-selected. Requires network; degrades to system stack offline. |
| Visuals | **Hand-built inline SVG/CSS mockups** | No image files. Dashboard mockups, diagrams, badges, and logos drawn in SVG. |
| Forms | **Front-end only** | Full validation + success state, `data-endpoint="TODO"`. Does not submit. |
| Blog | **Index + 6 full articles** | Real cybersecurity topics, 600–900 words each. |
| Copy depth | **Tiered** | ~8 flagship pages at full depth; remaining pages get real, specific, differentiated copy at 300–400 words. Nothing is lorem ipsum. |

### Why a generator (and the one honest trade-off)

A 60-link mega-menu duplicated across 97 hand-written files means renaming one product requires editing every file on the site. The generator keeps the nav, footer, breadcrumbs, and sitemap defined **exactly once**, in `src/site.registry.mjs`.

The trade-off is explicit: editing requires running `node build.mjs`. **The output is still plain static HTML in `dist/` that double-clicks open** — nothing about the delivered site depends on Node. Only editing does.

---

## The three `file://` landmines

These are hard browser behaviors, not preferences. They dictate the architecture.

1. **`<script type="module">` does not work over `file://`.** ES modules use CORS fetch semantics and `file://` origins are opaque. Every shipped script must be a **classic** `<script defer>`. Authoring-time modules get concatenated into one classic bundle at build time. *This is the most common way a project like this breaks on the last day.*
2. **`fetch()`, `XMLHttpRequest`, and external SVG sprites (`<use href="file.svg#id">`) do not work over `file://`.** Therefore: no client-side HTML partials (inlining happens at build time), and icons must be **inlined at build time** via an `icon(name)` helper returning raw SVG. Budget ~7 KB inline SVG per page.
3. **Absolute URLs do not work over `file://`.** `<a href="/products/x.html">` resolves to the filesystem root. Every internal URL must be **relative**, computed per-page from output depth, and enforced by a build gate.

**Works fine over `file://`:** `<link rel="stylesheet">`, `<img src>`, `@font-face` with relative URLs, CSS `background-image`, `<details>`/`<summary>`, `<dialog>.showModal()`, CSS `mask-image: url(...)`. The design leans on these.

**Also avoid:** `localStorage`/`sessionStorage` behave inconsistently on `file://`. Menu state lives in memory only.

---

## Repository structure

```
SecuretrustCyber/
├── build.mjs                  # the generator. ~350 lines, zero deps.
├── package.json               # {"type":"module"} + "build" script. NO dependencies.
├── .gitignore                 # dist/, node_modules/
├── README.md                  # how to build, how to edit, the file:// caveats
│
├── src/
│   ├── site.config.mjs        # brand, legal name, address, socials, CTA copy, origin
│   ├── site.registry.mjs      # THE page registry — single source of truth
│   ├── lib/
│   │   ├── html.mjs           # tagged-template `html`, raw(), escape(), join(), when(), attrs()
│   │   ├── url.mjs            # makeUrl(outPath) → depth-aware relative URL builder
│   │   ├── icons.mjs          # icon(name) → inline SVG string
│   │   ├── blocks.mjs         # block-stack renderer
│   │   ├── nav-model.mjs      # registry → mega-menu model + footer model
│   │   ├── schema.mjs         # JSON-LD builders (Organization, Product, FAQPage, BreadcrumbList)
│   │   └── validate.mjs       # build gates (§9)
│   ├── layouts/
│   │   ├── base.mjs           # doctype, head, header, main, footer, scripts
│   │   ├── head.mjs           # meta, OG, canonical, JSON-LD, css, no-js switch
│   │   └── partials/
│   │       ├── header.mjs     # utility bar + brand + 5-item mega-menu + CTAs
│   │       ├── mega-panel.mjs # one mega panel (columns + promo card)
│   │       ├── mobile-drawer.mjs
│   │       └── footer.mjs     # 4-column footer + legal bar
│   ├── components/            # section-level, HTML-returning pure functions
│   │   ├── hero.mjs           # variants: split | diagram | terminal | centered | compact
│   │   ├── logo-strip.mjs     ├── feature-grid.mjs    ├── tab-selector.mjs
│   │   ├── platform-diagram.mjs ├── stat-row.mjs      ├── testimonial.mjs
│   │   ├── review-cards.mjs   ├── blog-grid.mjs       ├── dual-cta.mjs
│   │   ├── comparison-table.mjs ├── control-map-table.mjs ├── faq.mjs
│   │   ├── breadcrumbs.mjs    ├── related-rail.mjs    ├── integration-grid.mjs
│   │   ├── case-study-card.mjs ├── metrics-band.mjs   ├── timeline.mjs
│   │   ├── roi-calculator.mjs └── prose.mjs
│   ├── templates/
│   │   ├── index.mjs  product.mjs  industry.mjs  competitor.mjs  compliance.mjs
│   │   ├── resource.mjs  company.mjs  legal.mjs  blog-post.mjs  pricing.mjs
│   │   └── sitemap.mjs  notfound.mjs
│   ├── content/
│   │   ├── pages/             # one .mjs per page, default-exports page object OR array
│   │   │   ├── index.mjs  pricing.mjs  request-demo.mjs  404.mjs  _styleguide.mjs
│   │   │   ├── legal/*.mjs  company/*.mjs  resources/*.mjs
│   │   ├── products.data.mjs  categories.data.mjs  industries.data.mjs
│   │   ├── competitors.data.mjs  compliance.data.mjs  integrations.data.mjs
│   │   ├── partners.data.mjs  posts.data.mjs
│   │   └── snippets/          # .txt/.html read at build time — long prose & code samples
│   ├── css/                   # authored split, concatenated by build
│   │   ├── 00-tokens.css  01-reset.css  02-base.css  03-layout.css
│   │   └── 04-chrome.css  05-components.css  06-animations.css  07-utilities.css
│   └── js/                    # authored split, concatenated into ONE classic script
│       ├── 00-core.js  10-header.js  20-mega-menu.js  30-drawer.js
│       └── 40-hero-rotate.js  50-tabs.js  60-reveal.js  70-slider.js  80-to-top.js
│
├── assets/                    # copied verbatim into dist/assets/
│   ├── img/og-default.png  favicon.svg
│
└── dist/                      # BUILD OUTPUT — double-click dist/index.html
    ├── index.html  pricing.html  request-demo.html  404.html  blog.html
    ├── _styleguide.html       # noindex, excluded from sitemap
    ├── products/    (31)      industries/  (10)   compare/  (10)
    ├── compliance/  (7)       integrations/ (6)   partners/ (3)
    ├── resources/   (7)       company/ (6)        legal/ (4)
    ├── blog/        (6)
    ├── sitemap.xml  robots.txt  sitemap.html
    └── assets/css/style.css  assets/js/main.js  assets/img/  favicon.svg
```

**URL shape:** flat `.html` files in real directories (`products/edr.html`), not `products/edr/index.html`. Unambiguous over `file://`, maps 1:1 to `ctx.url()`, caps depth at 2 so the `../` prefix is trivially predictable. Switching to clean URLs later is a two-line change in `outputPathFor` and `makeUrl`.

---

## Generator core

`build.mjs` — sketch (the real thing is ~350 lines):

```js
// build.mjs — zero dependencies. Node >= 20.
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { raw } from './src/lib/html.mjs';
import { makeUrl } from './src/lib/url.mjs';
import { base } from './src/layouts/base.mjs';
import { validate } from './src/lib/validate.mjs';
import { SITE } from './src/site.config.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC  = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const TEMPLATES = {
  index:      (await import('./src/templates/index.mjs')).default,
  product:    (await import('./src/templates/product.mjs')).default,
  industry:   (await import('./src/templates/industry.mjs')).default,
  competitor: (await import('./src/templates/competitor.mjs')).default,
  compliance: (await import('./src/templates/compliance.mjs')).default,
  resource:   (await import('./src/templates/resource.mjs')).default,
  company:    (await import('./src/templates/company.mjs')).default,
  legal:      (await import('./src/templates/legal.mjs')).default,
  blog:       (await import('./src/templates/blog-post.mjs')).default,
  pricing:    (await import('./src/templates/pricing.mjs')).default,
  sitemap:    (await import('./src/templates/sitemap.mjs')).default,
  notfound:   (await import('./src/templates/notfound.mjs')).default,
};

// content/pages/**/*.mjs default-export one page object OR an array of them.
async function loadPages() { /* readdir recursive → import → flatten */ }

// slug ''                    -> index.html
// slug 'products/edr'        -> products/edr.html
const outputPathFor = (slug) => slug === '' ? 'index.html' : `${slug}.html`;

export async function build() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const pages = await loadPages();
  const registry = new Map(pages.map(p => [p.slug, p]));

  const errors = validate.registry(pages);
  if (errors.length) fail(errors);

  await concatCss(path.join(SRC,'css'), path.join(DIST,'assets','css','style.css'));
  await concatJs(path.join(SRC,'js'),   path.join(DIST,'assets','js','main.js'));
  await copyAssets(path.join(ROOT,'assets'), path.join(DIST,'assets'));

  const rendered = [];
  for (const page of pages) {
    const out = outputPathFor(page.slug);
    const ctx = { slug: page.slug, out, url: makeUrl(out), registry, site: SITE };
    const tpl = TEMPLATES[page.type];
    if (!tpl) { errors.push(`Unknown page type "${page.type}" for "${page.slug}"`); continue; }
    const doc = base(ctx, page, tpl(ctx, page));
    rendered.push({ page, out, markup: doc[raw.SYMBOL] ?? String(doc) });
  }

  // second pass: validate emitted hrefs against the registry
  errors.push(...validate.links(rendered, registry), ...validate.html(rendered, pages));
  if (errors.length) fail(errors);

  for (const { out, markup } of rendered) {
    const dest = path.join(DIST, out);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, markup, 'utf8');
  }
  await writeFile(path.join(DIST,'sitemap.xml'), buildSitemap(pages), 'utf8');
  await writeFile(path.join(DIST,'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');
  console.log(`\n  Built ${rendered.length} pages.\n  open: ${path.join(DIST,'index.html')}\n`);
}

function fail(errors) {
  console.error(`\n  BUILD FAILED — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error('   - ' + e);
  console.error(''); process.exit(1);
}

await build();
```

**Watch mode (`--watch`), if added, must fork a child process per rebuild — not re-`import()` in place.** Node's ESM loader caches the entire dependency graph, and a `?t=` cache-buster on the top-level content file does **not** invalidate the `lib/` and `components/` modules it imports. A naive in-process loop works for the first edit then silently serves stale components. Forking costs ~40 ms and is always correct.

### `src/lib/html.mjs` — escaping engine

A tagged template that escapes every interpolation by default; nested `html` results pass through unescaped. This is the whole reason to author content in JS rather than HTML partials with `{{placeholders}}` — loops, conditionals, composition, *and* automatic escaping.

```js
const RAW = Symbol('stc.raw');
export const raw = (s) => ({ [RAW]: String(s) });
export const escape = (s) => String(s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;').replace(/'/g,'&#39;');

function render(v) {
  if (v === null || v === undefined || typeof v === 'boolean') return '';
  if (Array.isArray(v)) return v.map(render).join('');
  if (typeof v === 'object' && RAW in v) return v[RAW];
  return escape(v);
}
export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += render(values[i]) + strings[i + 1];
  return raw(out);
}
export const join  = (arr, sep = '') => raw(arr.map(render).join(sep));
export const when  = (c, frag) => raw(c ? render(frag) : '');
export const attrs = (o) => raw(Object.entries(o)
  .filter(([,v]) => v !== false && v != null)
  .map(([k,v]) => v === true ? ` ${k}` : ` ${k}="${escape(v)}"`).join(''));
export const toString = (frag) => render(frag);
html.RAW = RAW;
```

An object that isn't `raw()` renders as `[object Object]` — loud and obvious rather than silently wrong. That's the right default.

### `src/lib/url.mjs` — the `file://` correctness hinge

```js
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function makeUrl(outPath) {
  const posix = String(outPath).replace(/\\/g, '/');   // Windows separators MUST be normalized
  const depth = posix.split('/').length - 1;
  const up = depth === 0 ? '' : '../'.repeat(depth);

  function url(target = '') {
    const t = String(target ?? '');
    if (EXTERNAL.test(t)) return t;                     // https:, mailto:, tel:, #anchor
    const clean = t.replace(/^\/+/, '').replace(/\/+$/, '');
    if (clean === '') return up + 'index.html';
    return up + (clean.endsWith('.html') ? clean : clean + '.html');
  }
  url.asset = (p) => up + 'assets/' + String(p).replace(/^\/+/, '');
  url.self = posix; url.depth = depth;
  return url;
}
```

**Rules that make this hold:**
- `page.slug` is **always posix**, never built with `path.join`. On Windows `path.join` yields backslashes, which would corrupt both the output filename and every relative URL. Normalize once at load.
- **No component ever writes a literal `href`.** Every `href`, `src`, `srcset`, and JSON-LD `url` goes through `ctx.url` / `ctx.url.asset`. Enforced by build gate §9.6.

---

## Design tokens

`src/css/00-tokens.css` — the contract every component reads.

```css
:root {
  /* brand */
  --navy-900:#061040; --navy-800:#0A1A65; --navy-700:#10103B; --navy-600:#1B2E86;
  --blue-500:#48ABE0; --blue-400:#6CC0EA; --blue-600:#2E86B8; --glow:#7FE3F0;
  --slate-050:#F6F8FC; --slate-100:#EDF1F8; --slate-200:#DCE3F0; --slate-300:#C3CDE4;
  --slate-400:#8C99B8; --slate-600:#4A5878; --slate-800:#1D2440; --white:#FFFFFF;

  /* semantic */
  --color-bg:var(--white); --color-bg-muted:var(--slate-050);
  --color-bg-deep:var(--navy-800); --color-bg-deepest:var(--navy-900); --color-bg-band:var(--navy-700);
  --color-text:var(--slate-800); --color-text-muted:var(--slate-600);
  --color-text-inverse:rgba(255,255,255,.88); --color-text-inverse-muted:rgba(255,255,255,.66);
  --color-accent:var(--blue-500);        /* FILLS/ICONS/BORDERS ON DARK — never text on white */
  --color-link:#1B6FA8;                  /* AA-compliant on white (5.4:1) */
  --color-link-hover:#14547F; --color-link-inverse:var(--blue-400);
  --color-border:var(--slate-200); --color-border-strong:var(--slate-300);
  --color-border-inverse:rgba(255,255,255,.16);
  --color-focus:#FFB020;                 /* visible on BOTH navy and white */
  --color-success:#1B9E6B; --color-danger:#D64545;

  /* type */
  --font-display:"Space Grotesk","Segoe UI Variable Display","Segoe UI",system-ui,sans-serif;
  --font-sans:"Inter","Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif;
  --font-mono:ui-monospace,"Cascadia Mono","SF Mono",Menlo,Consolas,monospace;

  --step--2:clamp(.6875rem,.67rem + .09vw,.75rem);
  --step--1:clamp(.8125rem,.79rem + .12vw,.875rem);
  --step-0: clamp(1rem,.96rem + .2vw,1.0625rem);
  --step-1: clamp(1.125rem,1.07rem + .28vw,1.25rem);
  --step-2: clamp(1.375rem,1.26rem + .55vw,1.625rem);
  --step-3: clamp(1.75rem,1.5rem + 1.15vw,2.375rem);
  --step-4: clamp(2.125rem,1.72rem + 1.9vw,3.125rem);
  --step-5: clamp(2.5rem,1.85rem + 3vw,4rem);
  --step-6: clamp(3rem,1.9rem + 5vw,5.25rem);

  --lh-tight:1.06; --lh-snug:1.22; --lh-body:1.62;
  --tracking-tight:-.022em; --tracking-wide:.08em;
  --weight-regular:400; --weight-medium:500; --weight-bold:700;

  /* space — 4px base */
  --space-3xs:.25rem; --space-2xs:.5rem; --space-xs:.75rem; --space-s:1rem;
  --space-m:1.5rem; --space-l:2rem; --space-xl:3rem; --space-2xl:4rem;
  --space-3xl:6rem; --space-4xl:8rem;
  --section-y:clamp(3.5rem,2rem + 6vw,7rem);
  --gutter:clamp(1.25rem,4vw,2.5rem);

  /* radii */
  --radius-xs:6px; --radius-s:10px; --radius-m:16px; --radius-l:24px;
  --radius-xl:32px; --radius-pill:999px;

  /* elevation */
  --shadow-1:0 1px 2px rgba(10,26,101,.06),0 1px 3px rgba(10,26,101,.08);
  --shadow-2:0 4px 12px rgba(10,26,101,.08),0 2px 4px rgba(10,26,101,.05);
  --shadow-3:0 18px 40px -12px rgba(10,26,101,.22);
  --shadow-4:0 32px 64px -20px rgba(6,16,64,.38);
  --shadow-glow:0 0 0 1px rgba(72,171,224,.35),0 12px 32px -8px rgba(72,171,224,.30);
  --ring:0 0 0 3px rgba(72,171,224,.55);

  /* containers */
  --container-s:44rem; --container-m:64rem; --container-l:78rem; --container-xl:88rem;

  /* motion */
  --dur-fast:120ms; --dur:200ms; --dur-slow:420ms; --dur-reveal:640ms;
  --ease:cubic-bezier(.2,.7,.3,1); --ease-out:cubic-bezier(.16,1,.3,1);

  /* z-index — single ladder, no gaps */
  --z-sticky:50; --z-header:100; --z-mega:110; --z-drawer:200; --z-skip-link:300;
}
@media (prefers-reduced-motion:reduce) {
  :root { --dur-fast:0ms; --dur:0ms; --dur-slow:0ms; --dur-reveal:0ms; }
}
```

### ⚠️ Contrast finding — act on this

Computed WCAG ratios for the palette:

| Pair | Ratio | Verdict |
|---|---|---|
| `#48ABE0` on `#FFFFFF` | **2.57:1** | **FAILS** AA text (4.5:1) *and* the 3:1 large-text/UI threshold |
| `#48ABE0` on `#0A1A65` | 6.06:1 | Passes AA |
| `#1B6FA8` on `#FFFFFF` | 5.40:1 | Passes AA |
| `#FFFFFF` on `#0A1A65` | 15.6:1 | Passes AAA |
| `#FFFFFF` on `#10103B` | 18.1:1 | Passes AAA |

**`#48ABE0` is a dark-background color.** It is excellent for accents on navy — exactly where the reference uses its blue — but must **never** be a text link or small label on white. Hence the `--color-accent` (fills, icons, borders, gradients) vs `--color-link: #1B6FA8` (text on light) split. This is the kind of thing that ships as "looks fine on my monitor" then fails an audit across 97 pages at once, so it belongs in the token file with a comment.

### Fonts

Google Fonts `Space Grotesk` (display) + `Inter` (body), as selected, with the system fallback stack above. Load with `<link rel="preconnect">` + one stylesheet `<link>`. Note in the README: **offline, this degrades to Segoe UI**, which is fine but visible. If that becomes a problem, self-hosting woff2 into `assets/fonts/` and adding `@font-face` is a two-line token change, because every component reads `var(--font-sans)`.

### Utility layer

`07-utilities.css` stays deliberately tiny: `.container` (+`--s/--m/--xl`), `.section` (+`--muted/--deep/--band`), `.stack`, `.cluster`, `.grid` (+`--2/--3/--4`), `.flow`, `.visually-hidden`, `.text-center`. **Resist a utility explosion** — anything reused more than twice belongs in `05-components.css` as a real component.

---

## Page inventory (~97)

**Core (5)** — `index`, `pricing`, `request-demo`, `404`, `blog` (index), plus `sitemap.html`

**Products (31)** — `products/index` + 7 category indexes + 23 product pages:
- *Network Security* (2): `network-dns-security`, `network-security`
- *Endpoint Security* (4): `endpoint-dns-security`, `next-gen-antivirus`, `ransomware-protection`, `application-control`
- *Vulnerability Management* (4): `patch-asset-management`, `bitlocker-management`, `usb-control`, `scripting`
- *Privileged Access Management* (3): `privileged-access-management`, `privilege-elevation-delegation`, `privileged-account-session-management`
- *Email & Collaboration* (2): `email-security`, `email-fraud-protection`
- *Threat Hunting & Response* (6): `threat-hunting-action-center`, `edr`, `xdr`, `mxdr`, `itdr`, `ai-wingman`
- *Unified Endpoint Management* (2): `remote-desktop`, `endpoint-management`

**Solutions hub (1)** — `solutions`

**Industries (10)** — `healthcare`, `financial-services`, `manufacturing`, `energy-utilities`, `government`, `education`, `retail`, `technology`, `critical-infrastructure`, `smb`

**Compare (10)** — `vs-crowdstrike`, `vs-sentinelone`, `vs-sophos`, `vs-microsoft-defender`, `vs-proofpoint`, `vs-knowbe4`, `vs-ninjaone`, `vs-connectwise`, `vs-tanium`, `vs-rapid7`

**Compliance (7)** — `nis2`, `iso-27001`, `cis-controls`, `cyber-essentials`, `hipaa`, `dora`, `essential-eight`

**Integrations (6)** — `api-integrations`, `connectwise-rmm`, `autotask-psa`, `halopsa`, `cisco-meraki`, `palo-alto`

**Partners (3)** — `partners/index`, `become-a-partner`, `partner-portal`

**Resources (7)** — `resources/index`, `demos`, `whitepapers`, `customer-stories`, `solution-briefs`, `webinars`, `trust-center`

**Company (6)** — `company/about`, `company/press`, `company/awards`, `company/careers`, `company/contact`, `company/trust-center`

**Legal (4)** — `legal/privacy-policy`, `legal/cookie-policy`, `legal/license-agreement`, `legal/terms-of-service`

**Blog (6)** — one post each on: patch management, NIS2 compliance, EDR vs XDR, ransomware protection, zero trust, phishing prevention

**Internal (1)** — `_styleguide` (noindex, excluded from sitemap)

---

## The nav problem: one registry, two views

`src/site.registry.mjs` holds every page **exactly once**. The mega-menu, footer, HTML sitemap, `sitemap.xml`, breadcrumbs, and related-page rails are all **projections of it**. Link validation falls out for free.

```js
export const PAGES = [
  { slug:'products/edr', group:'products', category:'threat-hunting', order:20,
    title:'EDR', blurb:'Hunt, detect and respond across every endpoint.',
    icon:'radar', mega:{ menu:'platform', col:2 }, footer:'products' },

  { slug:'industries/healthcare', group:'industries', order:10,
    title:'Healthcare', blurb:'HIPAA-aligned protection for clinical estates.',
    icon:'heart', mega:{ menu:'solutions', col:1 }, footer:null },
  // …~97 rows
];

export const MENUS = [
  { id:'platform',  label:'Platform',  index:'products' },
  { id:'solutions', label:'Solutions', index:'solutions' },
  { id:'compare',   label:'Compare',   index:'compare' },
  { id:'resources', label:'Resources', index:'resources' },
  { id:'company',   label:'Company',   index:'company' },
];
export const FOOTER_GROUPS = [
  { id:'products',  title:'Platform'  }, { id:'solutions', title:'Solutions' },
  { id:'resources', title:'Resources' }, { id:'company',   title:'Company'   },
];
```

```js
// src/lib/nav-model.mjs — registry → the two views
export function navModel() {
  return MENUS.map(menu => {
    const items = PAGES.filter(p => !p.draft && p.mega?.menu === menu.id);
    const cols  = Math.max(...items.map(i => i.mega.col)) + 1;
    return { ...menu,
      columns: Array.from({ length: cols }, (_, i) => ({
        index: i,
        title: COLUMN_TITLES[menu.id]?.[i] ?? '',
        items: items.filter(x => x.mega.col === i).sort((a,b) => a.order - b.order).map(toLink),
      })),
      promo: PROMOS[menu.id] ?? null };
  });
}
export function footerModel() {
  return FOOTER_GROUPS.map(g => ({ id:g.id, title:g.title,
    items: PAGES.filter(p => !p.draft && p.footer === g.id)
                .sort((a,b) => a.order - b.order).slice(0,8).map(toLink) }));
}
const toLink = (p) => ({ slug:p.slug, title:p.title, blurb:p.blurb ?? '', icon:p.icon ?? null });
```

Header and footer each consume **one function** and know nothing about page structure. **Adding a product page is a one-line change in the registry** — it appears in the mega-menu, the footer if tagged, the HTML sitemap, `sitemap.xml`, and becomes a valid link target everywhere, with zero edits to header, footer, or any page.

---

## Content authoring format

**JS modules exporting page objects, with long prose and code samples in separate text files.**

| Format | Verdict |
|---|---|
| Markdown + frontmatter | **Reject** — no stdlib parser in Node, and it can't express "this page uses a tabbed selector with these tabs and this hero variant." Frontmatter keys become a worse version of the JS object. |
| HTML partials + `{{substitution}}` | **Reject as primary** — no loops (the 60-link menu can't be generated from data), no conditionals, no composition, and every substitution is an escaping hazard. Keep only as the `customSections` escape hatch. |
| **JS modules + tagged template literals** | **Adopt** — full language for loops/composition, and `html` escapes by default, eliminating the whole class of quoting and XSS bugs. |

### A page object

```js
export default {
  slug: '', type: 'index',
  title: 'Unified Security Platform',
  metaTitle: 'SecureTrust Cyber — Stop Breaches Before They Start',
  metaDescription: 'One platform for email, endpoint, network, identity and data security…',
  sitemap: true, priority: 1.0,

  // The block stack. Order here is the order on the page.
  // This is what makes two pages on the same template feel different.
  blocks: [
    hero({ variant:'diagram',        // <- the anti-template-smell knob
      eyebrow:'Unified Security Platform',
      headline:'Security that closes the gap',
      rotating:['between email and endpoint','between identity and data','between alert and action'],
      sub:'Six protection layers, one console, one agent…',
      primary:{ label:'Book a live demo', href:'request-demo' },
      secondary:{ label:'See the platform', href:'products' },
      media:'platform-hub' }),

    logoStrip({ label:'Trusted by 4,200+ security teams', logos:'enterprise' }),

    tabSelector({ eyebrow:'The platform', heading:'Six layers. One console.',
      tabs:[ { id:'email', label:'Email', icon:'mail', heading:'Stop the phish before the inbox',
               body:'…', bullets:['…'], link:'products/email-fraud-protection' }, /* …6 tabs */ ] }),

    statRow({ variant:'inverse', stats:[
      { value:'94%', label:'of phishing attempts blocked pre-delivery' },
      { value:'11 min', label:'median time from detection to containment' },
      { value:'3.1x', label:'reduction in successful account takeovers' },
      { value:'4,200+', label:'security teams protected' } ] }),

    dualCta({ heading:'See it against your own telemetry', body:'A 30-minute session with a solutions engineer.',
      primary:{ label:'Book a demo', href:'request-demo' }, secondary:{ label:'Talk to sales', href:'company/contact' } }),

    // Escape hatch — flagship pages get bespoke markup the long tail does not have.
    { kind:'custom', render: () => html`<section class="section section--deep">…hand-authored SVG…</section>` },
  ],
};
```

```js
// src/lib/blocks.mjs — genuinely all it needs to be
export const blocks = (ctx, list) => join((list ?? []).map(b =>
  (b && b.kind === 'custom') ? b.render(ctx)
  : (typeof b === 'string' ? b : raw(String(b)))));
```

### Escaping hazard — read this

Content lives in template literals, so a literal `${` must be written `\${` and backticks escaped. **On a cybersecurity site this will bite:** shell one-liners, PowerShell, regex, and DMARC records (`v=DMARC1; p=reject; rua=mailto:${addr}`) contain exactly those characters.

**Rule: any prose or markup containing `${`, backticks, or more than ~200 words lives in `src/content/snippets/*.html` or `*.txt` and is pulled in with `await readFile()` at build time**, then wrapped in `raw()`. This keeps data files readable and removes the bug class entirely.

---

## Templates: how a product page differs from an industry page

**The difference is block set, block order, and hero treatment — not just copy fields.** Each template also declares allowed variants, which the variety validator reads.

**Product** — *what it is → the problem → what it does → how it fits → proof → objections.*
`hero(split|diagram|terminal)` → problem prose → `featureGrid(3up)` → `tabSelector` → `platformDiagram` → `statRow(inverse)` → `integrationGrid` → `testimonial(feature)` → `faq` → `relatedRail` → `dualCta`

**Industry** — *we understand your world → your specific threats → your obligations → the mapped solution → someone like you.* Leads with **threat and obligation**, not capability, and introduces two components the product template never uses (`controlMapTable`, `caseStudyCard`).
`hero(split|compact|quote)` + compliance chips → `featureGrid(alternating)` threats → **`controlMapTable`** (regulation → control → which product satisfies it) → `featureGrid(4up)` outcomes → `caseStudyCard` → `testimonial(slider)` → `faq` → `dualCta`

**Competitor** — `hero(compare)` → framing/objection block → 3 numbered differentiators → migration block → comparison table → FAQ → `dualCta`. Carries a **mandatory `claimsReviewed: 'YYYY-MM-DD'`** field and a visible "Last verified" line, with a build gate failing if it's older than 180 days.

**Compliance** — `hero(compact|diagram)` → regulation summary card → control-to-feature mapping table → evidence checklist → FAQ → `dualCta`. Hero variants differ again.

### Data-driven fan-out

```js
// src/content/pages/products.mjs — ONE file → 23 product pages + category indexes
export default [
  ...CATEGORIES.map(c => ({ slug:`products/${c.slug}`, type:'index', title:c.title, blocks:[/* … */] })),
  ...PRODUCTS.map(p => ({ slug:`products/${p.slug}`, type:'product', title:p.title,
    metaTitle:p.metaTitle, metaDescription:p.metaDescription, category:p.category,
    hero:p.hero, problem:p.problem, capabilities:p.capabilities, tabs:p.tabs,
    platform:p.platform, proof:p.proof, integrations:p.integrations,
    quote:p.quote, faq:p.faq, cta:p.cta,
    related:'auto:category' })),   // resolved by relatedRail()
];
```

`related: 'auto:category'` is what turns 23 orphan pages into an internally-linked graph — `relatedRail()` reads `page.category`, pulls siblings from the registry, and emits 3–4 cards. **A build gate asserts every product page emits ≥3 internal product links.** That single rule does more for SEO than any meta tag.

---

## Vanilla JS architecture

**Delivery: 9 IIFE files under `src/js/`, concatenated into one `dist/assets/js/main.js`, loaded as a classic `defer` script.** Not modules — landmine 1.

```js
// src/js/00-core.js
(function (STC) {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 64rem)');
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  STC.util = { reduceMotion, desktop, $, $$,
    focusables: (root) => $$(FOCUSABLE, root).filter(el => el.offsetParent !== null) };

  document.addEventListener('DOMContentLoaded', function () {
    ['header','megaMenu','drawer','heroRotate','tabs','reveal','slider','toTop']
      .forEach(function (name) {
        const mod = STC[name];
        if (mod && typeof mod.init === 'function') {
          try { mod.init(); } catch (err) { console.error('[STC] ' + name + ' failed', err); }
        }
      });
  });
})(window.STC = window.STC || {});
```

Each module's `init()` is wrapped in try/catch so one failure can't cascade — which matters on a 97-page site where a single missing element would otherwise kill all interactivity on the page.

### Progressive enhancement rules

**Governing principle: base CSS must never hide content that only JS can restore.** Everything is `.js`-gated.

| Feature | No-JS behavior | JS behavior |
|---|---|---|
| Mega-menu | Panels render inline as nested `<ul>` of real links — ugly but fully navigable | Panels hidden; trigger becomes a disclosure |
| Hero rotating headline | First phrase renders; rest are visible `<span>`s | Cross-fades on a timer; **disabled under reduced-motion** |
| Tab selector | All panels visible, stacked, each with its own `<h3>` | JS adds `hidden` to inactive panels on init and wires the ARIA tablist |
| Mobile drawer | Content renders inline in header flow | `<dialog>` + `showModal()` — focus trap and Escape **free from the platform** |
| FAQ | Native `<details>`/`<summary>` — works with zero JS, keyboard-accessible | **Deliberately none** |
| Scroll reveals | Everything visible; base rule is `opacity: 1` | IntersectionObserver adds `.is-visible`, then disconnects |
| Testimonial slider | CSS `scroll-snap-type: x mandatory` — a real slider on touch, keyboard-scrollable | Prev/next buttons call `scrollBy()`, `hidden` until JS enables them |
| Back-to-top | Stays `hidden`; skip link covers navigation | Revealed past 600px via IntersectionObserver |

The critical CSS ordering rule, stated once:

```css
/* WRONG — invisible when JS is off or fails */
.reveal { opacity: 0; transform: translateY(16px); }

/* RIGHT — only hide when JS is present to un-hide */
.js .reveal { opacity: 0; transform: translateY(16px); }
.js .reveal.is-visible { opacity: 1; transform: none;
  transition: opacity var(--dur-reveal) var(--ease-out), transform var(--dur-reveal) var(--ease-out); }
@media (prefers-reduced-motion: reduce) { .js .reveal { opacity:1; transform:none; transition:none; } }
```

**The slider is a deliberate choice: CSS scroll-snap, not a JS transform carousel.** A transform carousel needs JS for basic navigation, hand-rolled touch handling, is a keyboard trap unless you build roving tabindex, and breaks completely with JS off. Scroll-snap gives native momentum, native keyboard access, native screen-reader semantics, and ~15 lines of JS for optional arrows.

### The `[hidden]` trap

`[hidden]` sets `display:none` at user-agent priority, so **any** author rule with `display:flex` or `display:grid` on the same element silently overrides it and the "hidden" panel stays visible. Fix it once, globally, in `01-reset.css`:

```css
[hidden] { display: none !important; }
```

Without this, the symptom is "the mega-menu is stuck open on the products page only" — a genuinely confusing bug.

---

## Accessibility specification

### Mega-menu ARIA + keyboard contract

Each top-level item is a `<button aria-expanded aria-controls>` — **not** an `<a>` — because an `<a>` activates on Enter but not Space, and reimplementing Space on a link is worse than using the correct element. No-JS navigability is recovered two ways: the panel is visible without JS, and **the first item inside every panel is "All Products →"**, linking to the category index.

```html
<nav class="primary-nav" aria-label="Primary">
  <ul role="list">
    <li>
      <button class="primary-nav__trigger" type="button" id="trigger-platform"
              aria-expanded="false" aria-controls="mega-platform" data-mega-trigger="platform">
        Platform <svg class="chev" aria-hidden="true" focusable="false">…</svg>
      </button>
      <div class="mega" id="mega-platform" role="region" aria-labelledby="trigger-platform"
           data-mega-panel="platform" hidden>
        <div class="mega__inner container container--xl">
          <div class="mega__col">
            <h2 class="mega__col-title" id="mega-platform-c0">Protection layers</h2>
            <ul role="list" aria-labelledby="mega-platform-c0">…</ul>
          </div>
          <aside class="mega__promo">…</aside>
        </div>
      </div>
    </li>
  </ul>
</nav>
```

**Keyboard contract** (`20-mega-menu.js`):
- **Enter / Space / ArrowDown** on a trigger → open, focus first link
- **ArrowLeft / ArrowRight** on a trigger → move between the five triggers (require Enter to open — less surprising than auto-open)
- **ArrowUp / ArrowDown** inside a panel → move through links, wrapping; **Home/End** → first/last
- **ArrowRight / ArrowLeft** inside a panel → next/previous *column*
- **Escape** → close and **return focus to the opening trigger**. Non-negotiable, and the most commonly omitted behavior.
- **Tab** out of the panel → close. **Click outside** → close. Opening one panel closes any other.
- `aria-expanded` stays in sync on **every** close path, including close-outside.
- **150 ms open delay on `mouseenter`, 250 ms grace on `mouseleave`**, so a diagonal path toward the panel doesn't close it. Without this, mega-menus feel broken.

Panels are not `aria-modal` and not `<dialog>`, so **no focus trap** — the user must be able to Tab straight through to the content. Trapping focus in a mega-menu is a common over-correction.

### Tabs contract

`role="tablist"` with `aria-orientation="horizontal"`; each tab `<button role="tab" aria-selected aria-controls tabindex="0|-1">` with **roving tabindex** (exactly one tab in the tab order); each panel `<div role="tabpanel" aria-labelledby tabindex="0">`, with `hidden` added **by JS on init** so no-JS users see all panels. Arrow keys move selection (automatic activation — correct here since panels are cheap). Home/End → first/last.

### Everything else
- **Landmarks:** `header[role=banner]`, `nav[aria-label]` (each nav needs a *distinct* label — "Primary", "Footer: Platform", "Breadcrumb"), `main#main[tabindex="-1"]`, `footer[role=contentinfo]`. Skip link is the first focusable element on every page.
- **Headings:** exactly one `<h1>` per page, no skipped levels — **enforced by build gate**, so it catches itself on 97 pages instead of during an audit.
- **Focus:** `:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }`. Never `outline: none`. Amber specifically because it's visible on both `#FFFFFF` and `#0A1A65` — a blue focus ring on a blue hero is invisible.
- **Images:** every `<img>` needs `alt`; decorative SVG gets `aria-hidden="true" focusable="false"`; meaningful SVG gets `<title>` + `role="img"` + `aria-labelledby`. Build gate fails on `<img` without `alt`.
- **Motion:** every animation gated on `prefers-reduced-motion` in **both** JS and CSS, because the media query can change at runtime.
- **Color:** never the sole signal — form errors get an icon + text; comparison cells use a glyph + tint, not just green/red.
- **Targets:** 44×44 minimum for all interactive elements.
- **Contrast:** the `#48ABE0`-on-white finding is the main risk. README checklist item.

---

## Build gates (`src/lib/validate.mjs`)

Runs at the end of every build, **exits non-zero** on any failure. On a site this size these are what let you edit confidently instead of grepping 97 files.

**Structural (on the in-memory model):**
1. No duplicate `slug`
2. Every page has `type`, `title`, `metaDescription` (40–165 chars), and its template's required fields
3. Every page type has a registered template
4. Every registry entry marked `mega`/`footer` has a real page behind it
5. Every page appears in the registry exactly once

**Content (on rendered HTML):**
6. **No absolute internal URLs** — regex emitted markup for `href="/` and `src="/` (excluding `href="//`). *This is the `file://` killer; catching it at build time is the single most valuable gate.*
7. Every internal `href` resolves to a real slug; external links have an `https://` scheme and an allowlisted domain
8. No `<img` without `alt=`
9. Heading levels never skip; exactly one `<h1>`
10. No `href="#"` placeholder links (these accumulate and are never noticed)
11. **Variety enforcement:** within a `group` + `category`, no two pages share a `hero.variant`. This turns an aesthetic rule into a build error — when you reach for the same hero variant you used on page 8, the build tells you.
12. Every product page emits ≥3 internal product links; every industry page links to ≥2 product pages
13. Every competitor page has `claimsReviewed` within 180 days
14. **No empty `<section>`** — a component returned nothing, usually an unfilled copy field. With 97 data-driven pages the likeliest real failure is a section silently missing because a field is `undefined`, and `when()` makes that invisible. This gate is the difference between "a few thin pages" and "we know exactly which 6 are thin."
15. No `type="module"` in emitted HTML (landmine 1)

---

## Build order

Goal: something real and viewable on day one, not after 97 pages.

- **Phase 0 — Skeleton (2–3 h).** `build.mjs`, `lib/html.mjs`, `lib/url.mjs`, `base.mjs` with stub header/footer, `index.mjs` with one paragraph. **Done when** `node build.mjs` writes `dist/index.html` and double-clicking it in Explorer renders styled text. This proves the whole `file://` promise on day one.
- **Phase 1 — Design system (1 day).** All 8 CSS files, `00-tokens.css` complete, `_styleguide.mjs` emitting the swatch/type/space/button page. **Done when** `_styleguide.html` looks like a designed page you'd show someone.
- **Phase 2 — Chrome (1.5 days).** `site.registry.mjs` with ~15 real entries, `site.config.mjs`, `nav-model.mjs`, header with the full 5-menu mega-menu, footer, mobile drawer. Then `20-mega-menu.js` + `30-drawer.js` with the complete ARIA/keyboard contract. **Do the hard interaction work here, at 15 pages, not at 97.** *Done when* every mega-menu link resolves (gate 7 passes), the menu is fully keyboard-operable, and it degrades to a readable list with JS off.
- **Phase 3 — Core components + 2 real pages (1.5 days).** Hero (all 5 variants), feature-grid, stat-row, logo-strip, dual-cta, breadcrumbs, faq, related-rail. Then build the homepage and one flagship product page (`products/email-fraud-protection`) to a genuinely finished standard including bespoke inline SVG. **Done when** you have two pages you'd ship, and a clear quality bar for the other 95.
- **Phase 4 — Templates + data fan-out (2 days).** `products.data.mjs` (23), `industries.data.mjs` (10), then product/industry templates, then competitor, compliance, resource, company, legal, blog, pricing. **Done when** `dist/` contains all ~97 files with zero gate failures and the site is fully navigable end to end.
- **Phase 5 — Content (the long pole, 4–8 days).** Fill real copy in batches of ~8 pages with a review gate between batches. **Tiered:** ~8 flagship pages at full depth; the rest at 300–400 words of genuine, differentiated copy. **The generator does not write the copy** — this is where 80% of the calendar time goes. The failure mode to avoid is pasting the same paragraph across ten industry pages; the healthcare threats must be healthcare threats and the HIPAA control map must cite real provisions.
- **Phase 6 — Interaction polish (1 day).** `40-hero-rotate.js`, `50-tabs.js`, `60-reveal.js`, `70-slider.js`, `80-to-top.js`, plus the `roi-calculator` page. All progressive, all reduced-motion aware.
- **Phase 7 — Audit & launch (1 day).** Keyboard-only walkthrough of homepage + one product + one industry + one comparison page. Contrast audit against the style guide swatches. **Test `file://` in both Chrome and Firefox, specifically on a subdirectory page.** `sitemap.xml`, `robots.txt`, `404.html`, and OG images (4 hand-made PNGs — the one asset the zero-dependency build genuinely cannot generate).

Total ≈ 12–18 working days, of which tooling and design system are ~3.

---

## Verification

**Every phase:**
```powershell
node build.mjs          # must exit 0 with no gate failures
```
Then double-click `dist/index.html` and confirm it renders.

**The `file://` proof (run this — it is the thing most likely to be silently broken):**
1. Open `dist/index.html` directly from Explorer (not via a server).
2. Navigate into `dist/products/edr.html` — a **subdirectory** page. Confirm CSS loads (proves `../assets/` is right), the mega-menu opens, and images render.
3. Check the console for CORS errors, which indicate a `fetch`/module/external-sprite leaked in.
4. Repeat in **both Chrome and Firefox** — they differ on `file://` handling.

**Accessibility:** Tab from page load — skip link appears first. Tab to a mega-menu trigger, press Enter, arrow through links, press Escape — focus must return to the trigger. Disable JS entirely and confirm the page is still readable and every nav link is reachable.

**Content integrity:** the gates cover links, headings, alt text, absolute URLs, and empty sections. Additionally spot-check that the healthcare page's threats are healthcare-specific and its control map cites real HIPAA provisions — the one failure mode no gate can catch.

---

## Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | **ES modules sneaking in** — works on a local dev server, silently fails for every `file://` user | Gate 15 + README note |
| 2 | **Absolute paths** — same profile: invisible on a server, fatal on `file://` | Gate 6 |
| 3 | **Template smell** — structurally sound but reads as a generated brochure because every page opens with the same navy hero, 3-column grid, and dual CTA with nouns swapped | Gate 11 (hero-variant rotation); different *block stack* per template, not just copy; genuinely bespoke homepage/pricing/flagship pages; the style guide forces you to see the system whole. **Not fully eliminable by architecture — Phase 5 copy quality is where this is won.** |
| 4 | **Node ESM cache in watch mode** produces stale components | Fork a child process per rebuild (§Generator core) |
| 5 | **Template-literal escaping** — `${` and backticks in prose; DMARC records, regex, and shell snippets are exactly where this bites | Long prose and code samples live in `snippets/*.txt` |
| 6 | **Windows path separators leaking into slugs** — `path.join` yields `products\edr`, corrupting output filenames and every relative URL | Slugs posix-only, normalized at load; `makeUrl` normalizes defensively |
| 7 | **`[hidden]` / `display:flex` collision** | One line in `01-reset.css` |
| 8 | **Claim substantiation** — naming real competitors and asserting they're weaker is comparative advertising requiring substantiation, and some jurisdictions restrict it further. Same for SOC 2 / ISO 27001 badges on a business that doesn't hold them. | `claimsReviewed` gate + a legal read before this goes live commercially |
| 9 | **Copywriting scale** — ~48k words is the actual project; the generator solves structure, not content | Tiered depth; structure lands in Phase 4 so copy fills in parallel, page by page |

---

## Critical files

- `build.mjs` — generator: content loading, per-page context, template dispatch, asset concatenation, validation, watch mode
- `src/site.registry.mjs` — single source of truth for all ~97 pages; mega-menu, footer, sitemap, breadcrumbs, and link validation all derive from it
- `src/lib/html.mjs` — the escaping tagged-template engine every component depends on
- `src/lib/url.mjs` — depth-aware relative URL builder; the `file://` correctness hinge
- `src/css/00-tokens.css` — the full design-token contract, including the `#48ABE0`-on-white contrast finding and the `--color-link` split
- `src/layouts/partials/header.mjs` — the mega-menu markup carrying the ARIA contract; consumer of the derived nav model

---

## Reference: structures captured from the target site

Section orders confirmed by fetching the live pages, for fidelity:

- **Homepage (~12 sections):** hero w/ rotating headline + dashboard → platform intro 3 tiles → tabbed category selector (7 tabs) → platform/compliance diagram → two-path panel (enterprise / partner) → product card carousel (9) → scale stats (4) → industry customer stories (3) → unification comparison → review cards (4 + 6 aggregate scores) → awards → related content (3) → final "Power of One" CTA → footer.
- **Product page (13 sections):** header → hero (eyebrow, H1, subhead, 2 CTAs) → demo video block → 3 key benefits → 3 alternating feature blocks → bundle/module link grid → platform diagram + compliance list → related content (3) → FAQ accordion (7) → awards (4) → testimonials + review scores (4) → closing CTA → footer. **No sidebar, no breadcrumb, no sticky sub-nav.**
- **Pricing:** hero → 3 stacked bundle cards (EDR / XDR "most popular" / MXDR), each with an included-solutions checklist, 2 CTAs, fit statement, and an "other benefits" checklist → custom-solutions contact block → footer. **No prices are ever displayed** — all CTAs route to a pricing-request page.
- **Comparison page:** hero ("HOW DO THEY COMPARE?", "X vs Y — 2026 Comparison") → framing block that concedes the competitor's strengths, then 4 pain-point cards → 3 numbered differentiators with a "where they win" concession → migration/switching block → platform breadth list → **3-column comparison table** (Capability / Us / Them, 13 rows, icon + Available|Not available per cell) → FAQ (5) → closing CTA.
