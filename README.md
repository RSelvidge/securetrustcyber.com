# SecureTrust Cyber — Static Marketing Site

A complete B2B cybersecurity marketing site modeled on a unified-security-platform
vendor, built as a **zero-dependency** static site. 97 pages, one design system,
no npm packages, no framework.

## Quick start

```powershell
node build.mjs        # generate the site into dist/
```

Then double-click `dist/index.html` to open it. That is the entire workflow —
the output is plain static HTML/CSS/JS that opens over `file://`.

```powershell
node build.mjs --watch  # rebuild automatically on change
```

## How it is organized

```
build.mjs               # the generator (zero dependencies)
src/
  site.config.mjs       # brand, legal identity, socials, CTA copy
  site.registry.mjs     # THE page registry — single source of truth for nav
  lib/                  # html engine, url builder, nav model, validation
  layouts/              # base document, head, header, footer, drawer
  components/           # hero, feature grid, tabs, tables, etc.
  templates/            # index, product, industry, competitor, compliance, …
  content/              # page data + data files (products, industries, …)
  css/                  # authored split, concatenated by build
  js/                   # authored split, concatenated into ONE classic script
assets/                 # copied verbatim into dist/assets
dist/                   # BUILD OUTPUT — the site
```

## Editing

- **Add or rename a page:** edit `src/site.registry.mjs` (nav metadata) and the
  matching content file under `src/content/`. The mega-menu, footer, sitemap and
  breadcrumbs all update automatically — you never edit the header or footer by hand.
- **Change branding:** edit `src/site.config.mjs`.
- **Change the look:** edit the tokens in `src/css/00-tokens.css`.

## The three `file://` rules (do not break these)

The site is designed to open by double-clicking, which means these must hold:

1. **No `<script type="module">`.** ES modules do not load over `file://`.
   Author JS in `src/js/*.js` (plain IIFEs); the build concatenates them into one
   classic `<script defer>`.
2. **No `fetch()` / external SVG sprites.** They are blocked over `file://`.
   Icons are inlined at build time via `icon(name)` in `src/lib/icons.mjs`.
3. **No absolute URLs.** `<a href="/products/edr.html">` resolves to the filesystem
   root. Every internal link goes through `ctx.url(slug)`, which computes the
   correct `../` prefix from the page's depth.

Build gates in `src/lib/validate.mjs` fail the build if any of these regress, or
if there are dangling links, missing `alt` text, multiple `<h1>`s, or unfresh
comparison claims.

## Fonts

The site loads **Space Grotesk** and **Inter** from Google Fonts. Offline, it
degrades to the system stack (Segoe UI). To self-host, drop woff2 files into
`assets/fonts/`, add `@font-face` blocks, and swap `--font-display`/`--font-sans`
in `00-tokens.css` — a two-line change.

## ⚠️ Before going live

- **Legal pages** (`src/content/pages/legal.mjs`) contain placeholder copy that
  needs real legal review.
- **Competitor comparison pages** assert capability differences that are
  *illustrative* and must be substantiated before commercial publication. They
  carry a `claimsReviewed` date; gate 13 fails if it goes stale.
- **Trust/stat figures** in `site.config.mjs` and the homepage are illustrative
  placeholders, not real claims.

## Contrast note

`#48ABE0` (the bright brand blue) is **2.57:1 on white** — it fails WCAG AA for
text and even the 3:1 large-text threshold. It is a *dark-background* accent.
Use `--color-accent` only for fills/icons/borders on navy, and `--color-link`
(`#1B6FA8`) for text on light backgrounds. This is documented in `00-tokens.css`.
