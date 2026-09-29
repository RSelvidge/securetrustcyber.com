// src/components/prose.mjs — a long-form text section (blog posts, legal, about).

import { html, raw } from '../lib/html.mjs';

export function prose(ctx, opts = {}) {
  const { eyebrow = '', heading = '', body = '' } = opts;
  return html`<section class="section">
    <div class="container container--s">
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      ${heading ? html`<h2 class="section__title" style="margin-bottom:var(--space-l)">${heading}</h2>` : ''}
      <div class="prose prose--lead">${raw(body)}</div>
    </div>
  </section>`;
}
