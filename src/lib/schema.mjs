// src/lib/schema.mjs — JSON-LD builders. Returns raw strings for inline <script>.
// Uses ctx.site.origin for absolute URLs (read only by crawlers, harmless over file://).

import { raw } from './html.mjs';
import { publicUrl } from './url.mjs';

const script = (obj) => raw(`<script type="application/ld+json">${JSON.stringify(obj)}</script>`);

export function organization(ctx) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ctx.site.name,
    url: ctx.site.origin,
    logo: `${ctx.site.origin}/assets/img/og-default.svg`,
    sameAs: ctx.site.socials.map((s) => s.href),
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
      item: publicUrl(ctx.site.origin, c.slug ?? ctx.slug),
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
    name: page.title,
    description: page.metaDescription,
    url: publicUrl(ctx.site.origin, page.slug),
  });
}
