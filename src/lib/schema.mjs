// src/lib/schema.mjs — JSON-LD builders. Returns raw strings for inline <script>.
// Uses ctx.site.origin for absolute URLs (read only by crawlers, harmless over file://).

import { raw } from './html.mjs';

const script = (obj) => raw(`<script type="application/ld+json">${JSON.stringify(obj)}</script>`);

const orgId = (ctx) => `${ctx.site.origin}/#organization`;
const pageUrl = (ctx, page) => ctx.site.origin + '/' + (page.slug ? page.slug + '.html' : '');

// sameAs only takes real profile URLs; skip the bare-homepage placeholders in site.config.
const profiles = (ctx) =>
  ctx.site.socials.map((s) => s.href).filter((h) => new URL(h).pathname.replace(/\/$/, '') !== '');

export function organization(ctx) {
  const sameAs = profiles(ctx);
  return script({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId(ctx),
    name: ctx.site.name,
    legalName: ctx.site.legalName,
    url: ctx.site.origin + '/',
    description: ctx.site.description,
    logo: { '@type': 'ImageObject', url: `${ctx.site.origin}/assets/img/logo.png` },
    email: ctx.site.email,
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: ctx.site.email, availableLanguage: 'English' },
    ...(sameAs.length && { sameAs }),
  });
}

export function webSite(ctx) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ctx.site.origin}/#website`,
    url: ctx.site.origin + '/',
    name: ctx.site.name,
    inLanguage: 'en',
    publisher: { '@id': orgId(ctx) },
  });
}

export function breadcrumbList(ctx, crumbs) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: (c.slug ?? ctx.slug) ? `${ctx.site.origin}/${c.slug ?? ctx.slug}.html` : ctx.site.origin + '/',
    })),
  });
}

export function faqPage(items) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  });
}

export function webPage(ctx, page) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl(ctx, page) + '#webpage',
    name: page.title,
    description: page.metaDescription,
    url: pageUrl(ctx, page),
    inLanguage: 'en',
    isPartOf: { '@id': `${ctx.site.origin}/#website` },
    publisher: { '@id': orgId(ctx) },
  });
}
