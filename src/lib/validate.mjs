// src/lib/validate.mjs — build gates. Runs at the end of every build and exits
// non-zero on any failure. On a site this size these are what let you edit
// confidently instead of grepping ~97 files.

import { PAGES as REGISTRY } from '../site.registry.mjs';
import { SITE } from '../site.config.mjs';
import path from 'node:path';
import { escape } from './html.mjs';

const EXTERNAL_DOMAINS = [
  'fonts.googleapis.com', 'fonts.gstatic.com', 'www.g2.com', 'www.capterra.com',
  'www.gartner.com', 'sourceforge.net', 'www.linkedin.com', 'www.youtube.com',
  'www.facebook.com', 'x.com', 'twitter.com', 'bookings.cloud.microsoft',
  // Blog citation sources
  'siliconangle.com', 'flashpoint.io', 'www.beckershospitalreview.com',
  'securitybrief.news', 'securitybrief.co.uk', 'flare.io', 'www.prophetsecurity.ai',
];

const SITE_HOST = new URL(SITE.origin).host;

/** Every inner page must have a usable, accessible breadcrumb and matching metadata. */
export function breadcrumbs(rendered) {
  const errors = [];
  const known = new Set(rendered.map(({ page }) => page.slug));
  for (const { page, markup } of rendered) {
    const navs = [...markup.matchAll(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/g)];
    if (!page.slug) {
      if (navs.length) errors.push('Homepage must not have a redundant breadcrumb');
      continue;
    }
    const fail = (reason) => errors.push(`"${page.slug}" breadcrumb: ${reason}`);
    if (navs.length !== 1) { fail('expected one navigation trail'); continue; }
    const nav = navs[0][1];
    const items = [...nav.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]);
    const homeHref = path.posix.relative(path.posix.dirname(`${page.slug}.html`), 'index.html');
    if (!items[0]?.includes(`<a href="${homeHref}">Home</a>`)) fail('Home does not link to the homepage');
    if ((nav.match(/aria-current="page"/g) ?? []).length !== 1 ||
        items.at(-1) !== `<span aria-current="page">${escape(page.title)}</span>`) fail('current page label is incorrect');
    if (items.slice(0, -1).some((item) => !item.includes('<a href="'))) fail('ancestor is not a usable link');
    const lists = [...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((m) => JSON.parse(m[1])).filter((data) => data['@type'] === 'BreadcrumbList');
    if (lists.length !== 1) { fail('expected one metadata trail'); continue; }
    const trail = lists[0].itemListElement;
    if (trail.length !== items.length) fail('metadata and navigation differ');
    trail.forEach((item, i) => {
      if (item.position !== i + 1 || !items[i]?.includes(`>${escape(item.name)}<`)) fail('metadata label or position differs');
      const slug = item.item === SITE.origin + '/' ? '' : item.item.replace(SITE.origin + '/', '').replace(/\.html$/, '');
      if (!known.has(slug)) fail(`metadata points to missing page ${slug}`);
    });
    if (trail[0]?.item !== SITE.origin + '/' || trail.at(-1)?.item !== `${SITE.origin}/${page.slug}.html`) fail('metadata URL is incorrect');
  }
  return errors;
}

function isExternalUrl(href) {
  return /^(https?:|mailto:|tel:|#)/i.test(href) || href.startsWith('//');
}

function allowlistedExternal(href) {
  if (href.startsWith('//')) return true; // protocol-relative, e.g. //fonts.gstatic.com
  try {
    const host = new URL(href).host;
    if (host === SITE_HOST) return true; // own canonical/og URLs are not "external"
    return EXTERNAL_DOMAINS.some((d) => host === d || host.endsWith('.' + d));
  } catch {
    return false;
  }
}

/** Structural gates, run on the in-memory page list. */
export function registry(pages) {
  const errors = [];
  const seen = new Map();
  for (const p of pages) {
    if (seen.has(p.slug)) errors.push(`Duplicate slug "${p.slug}"`);
    seen.set(p.slug, p);
  }

  for (const p of pages) {
    if (!p.type) errors.push(`"${p.slug}" missing type`);
    if (!p.title) errors.push(`"${p.slug}" missing title`);
    if (!p.metaDescription || p.metaDescription.length < 40 || p.metaDescription.length > 165) {
      errors.push(`"${p.slug}" metaDescription must be 40-165 chars (got ${p.metaDescription?.length ?? 0})`);
    }
  }

  // Every registry entry that appears in nav must have a real page behind it.
  for (const r of REGISTRY) {
    if (r.draft) continue;
    if (!seen.has(r.slug)) errors.push(`Registry entry "${r.slug}" has no content page`);
  }

  return errors;
}

/** Content gates, run on the rendered HTML. */
export function links(rendered, registryMap) {
  const errors = [];
  const known = new Set(registryMap.keys());

  for (const { page, markup } of rendered) {
    // Gate 6: no absolute internal URLs (file:// killer).
    const abs = [...markup.matchAll(/(?:href|src)="\/(?!\/)/g)];
    if (abs.length) errors.push(`"${page.slug}" has ${abs.length} absolute internal URL(s)`);

    // Gate 7: every internal href resolves to a real slug; externals allowlisted.
    const hrefs = [...markup.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (href === '#') { errors.push(`"${page.slug}" has a placeholder href="#"`); continue; }
      if (isExternalUrl(href)) {
        if (/^https?:/i.test(href) && !allowlistedExternal(href)) {
          errors.push(`"${page.slug}" links to unallowlisted external URL "${href}"`);
        }
        continue;
      }
      // Skip asset-like hrefs (fonts, downloads, etc.) — only page links matter here.
      if (/\.(css|js|svg|png|jpg|jpeg|webp|pdf|woff2?|ico)([?#]|$)/i.test(href)) continue;

      const slug = resolveHref(page.slug, href);
      if (slug === null) continue; // fragment-only
      if (slug && !known.has(slug)) {
        errors.push(`"${page.slug}" links to unknown slug "${href}" (-> "${slug}")`);
      }
    }
  }
  return errors;
}

// Resolve a relative href (from a page at `pageSlug`) back to an absolute slug,
// e.g. page "products/edr" + "../../talk-to-an-expert.html" -> "talk-to-an-expert".
function resolveHref(pageSlug, href) {
  const h = href.split('#')[0].split('?')[0];
  if (!h) return null; // fragment-only
  const outPath = pageSlug === '' ? 'index.html' : pageSlug + '.html';
  const dir = path.posix.dirname(outPath);
  const abs = path.posix.normalize(path.posix.join(dir, h));
  let slug = abs.replace(/\.html$/, '');
  if (slug === '.' || slug === 'index') slug = '';
  return slug;
}

export function html(rendered, pages) {
  const errors = [];
  for (const { page, markup } of rendered) {
    // Gate 8: every <img> needs alt.
    const imgs = [...markup.matchAll(/<img\b([^>]*)>/g)];
    for (const m of imgs) {
      if (!/\balt=/.test(m[1])) errors.push(`"${page.slug}" has an <img> without alt`);
    }

    // Gate 9: heading levels never skip egregiously; exactly one <h1>.
    const heads = [...markup.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    const h1 = heads.filter((h) => h === 1).length;
    if (h1 !== 1) errors.push(`"${page.slug}" has ${h1} <h1> (expected 1)`);
    for (let i = 0; i < heads.length - 1; i++) {
      if (heads[i + 1] - heads[i] > 2) {
        errors.push(`"${page.slug}" skips heading levels (h${heads[i]} -> h${heads[i + 1]})`);
        break;
      }
    }

    // Gate 15: no ES modules (dead over file://).
    if (/type="module"/.test(markup)) errors.push(`"${page.slug}" emits type="module"`);
  }

  // Gate 13: competitor pages must have a fresh claimsReviewed date.
  const now = Date.now();
  for (const p of pages) {
    if (p.type === 'competitor') {
      if (!p.claimsReviewed) {
        errors.push(`"${p.slug}" competitor page missing claimsReviewed`);
      } else if (now - new Date(p.claimsReviewed).getTime() > 180 * 86400000) {
        errors.push(`"${p.slug}" claimsReviewed is older than 180 days`);
      }
    }
  }

  return errors;
}
