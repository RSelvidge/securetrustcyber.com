// src/components/stat-row.mjs — a band of headline stats (inverse on navy).

import { html, join } from '../lib/html.mjs';

export function statRow(ctx, opts = {}) {
  const { stats = [], variant = 'light', eyebrow = '', heading = '' } = opts;
  const inverse = variant === 'inverse';
  const head = eyebrow || heading
    ? html`<div class="section-head section-head--center">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>`
    : '';

  return html`<section class="section ${inverse ? 'section--deep' : ''}">
    <div class="container">
      ${head}
      <div class="stat-row${inverse ? ' stat-row--inverse' : ''}">
        ${join(stats.map((s) => html`
          <div class="stat reveal">
            <div class="stat__value">${s.value}</div>
            <div class="stat__label">${s.label}</div>
          </div>`))}
      </div>
    </div>
  </section>`;
}
