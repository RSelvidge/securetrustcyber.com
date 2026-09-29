// src/components/dual-cta.mjs — the closing banner on nearly every page.

import { html, join, when } from '../lib/html.mjs';

export function dualCta(ctx, opts = {}) {
  const {
    heading = 'One Platform. Total Security.',
    body = '',
    primary = { label: 'Get a Demo', href: 'request-demo' },
    secondary = { label: 'Pricing & Bundles', href: 'pricing' },
  } = opts;

  return html`<section class="section">
    <div class="container">
      <div class="dual-cta reveal">
        <h2>${heading}</h2>
        ${when(body, html`<p>${body}</p>`)}
        <div class="dual-cta__actions">
          <a class="btn btn--primary btn--lg" href="${ctx.url(primary.href)}">${primary.label}</a>
          ${secondary ? html`<a class="btn btn--outline-inverse btn--lg" href="${ctx.url(secondary.href)}">${secondary.label}</a>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}
