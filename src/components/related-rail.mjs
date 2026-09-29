// src/components/related-rail.mjs — sibling cards linking a page into the graph.
// `related: 'auto:category'` pulls siblings from the registry.

import { html, join } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { PAGES } from '../site.registry.mjs';

export function relatedRail(ctx, page, opts = {}) {
  const siblings = resolve(ctx, page, opts);
  if (!siblings.length) return '';

  return html`<div class="related-rail">
    <div class="related-rail__head">
      <h2 class="section__title">${opts.heading ?? 'Explore related solutions'}</h2>
      ${opts.more ? html`<a href="${ctx.url(opts.more)}">View all ${icon('arrowRight')}</a>` : ''}
    </div>
    <div class="grid grid--3">
      ${join(siblings.map((s) => html`
        <a class="post-card" href="${ctx.url(s.slug)}">
          <span class="post-card__chip">${s.title}</span>
          <p class="post-card__dek">${s.blurb}</p>
          <span class="feature-card__link" style="margin-top:0">Learn more ${icon('arrowRight')}</span>
        </a>`))}
    </div>
  </div>`;
}

function resolve(ctx, page, opts) {
  if (opts.items) return opts.items;
  // auto:category — siblings in the same category, excluding self.
  const cat = page.category;
  return PAGES
    .filter((p) => p.category === cat && p.slug !== page.slug && p.group === 'products')
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title, blurb: p.blurb ?? '' }));
}
