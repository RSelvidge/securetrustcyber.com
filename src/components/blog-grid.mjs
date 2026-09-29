// src/components/blog-grid.mjs — a grid of post cards.

import { html, join } from '../lib/html.mjs';

export function blogGrid(ctx, opts = {}) {
  const { eyebrow = '', heading = '', posts = [] } = opts;
  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>
      <div class="grid grid--3">
        ${join(posts.map((p) => html`
          <a class="post-card" href="${ctx.url(p.slug)}">
            <span class="post-card__chip">${p.category}</span>
            <h3>${p.title}</h3>
            <p class="post-card__dek">${p.dek}</p>
            <div class="post-card__meta"><span>${p.date}</span> · <span>${p.read}</span></div>
          </a>`))}
      </div>
    </div>
  </section>`;
}
