// src/components/integration-grid.mjs — integration cards.

import { html, join } from '../lib/html.mjs';

export function integrationGrid(ctx, opts = {}) {
  const { eyebrow = '', heading = '', intro = '', items = [] } = opts;
  if (!items.length) return '';

  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
        ${intro ? html`<p class="section__intro">${intro}</p>` : ''}
      </div>
      <div class="integration-grid">
        ${join(items.map((it) => html`
          <div class="integration-card reveal">
            <div class="integration-card__logo">${it.name}</div>
            <p>${it.body}</p>
          </div>`))}
      </div>
    </div>
  </section>`;
}
