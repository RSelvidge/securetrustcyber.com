// src/components/timeline.mjs — a numbered step sequence.

import { html, join } from '../lib/html.mjs';

export function timeline(ctx, opts = {}) {
  const { eyebrow = '', heading = '', steps = [] } = opts;
  if (!steps.length) return '';

  return html`<section class="section">
    <div class="container container--m">
      <div class="section-head">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>
      <div class="timeline">
        ${join(steps.map((s, i) => html`
          <div class="timeline__step reveal">
            <span class="timeline__num">${String(i + 1).padStart(2, '0')}</span>
            <div><h3>${s.title}</h3><p>${s.body}</p></div>
          </div>`))}
      </div>
    </div>
  </section>`;
}
