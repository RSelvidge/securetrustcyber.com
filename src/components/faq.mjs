// src/components/faq.mjs — native <details>/<summary> accordion. Zero JS.

import { html, join } from '../lib/html.mjs';

export function faq(ctx, opts = {}) {
  const { heading = 'Common questions', intro = '', items = [] } = opts;
  if (!items.length) return '';

  return html`<section class="section section--muted">
    <div class="container container--m">
      <div class="section-head">
        <p class="eyebrow">FAQ</p>
        <h2 class="section__title">${heading}</h2>
        ${intro ? html`<p class="section__intro">${intro}</p>` : ''}
      </div>
      <div class="faq">
        ${join(items.map((item) => html`
          <details class="faq__item">
            <summary>${item.q}</summary>
            <div class="faq__answer">${item.a}</div>
          </details>`))}
      </div>
    </div>
  </section>`;
}
