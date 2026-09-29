// src/components/logo-strip.mjs — grayscale "trusted by" logo row.
// Logos are inline SVG wordmarks (no real company marks), presented as
// illustrative placeholders.

import { html, join, raw } from '../lib/html.mjs';

const FAUX_LOGOS = ['Northwind Group', 'Cobalt & Co', 'Helix Capital', 'Apex Health', 'Meridian', 'Vantage'];

const mark = (name) => raw(`
  <svg class="logo-strip__logo" viewBox="0 0 120 24" role="img" aria-label="${name}">
    <text x="0" y="16" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="currentColor">${name}</text>
  </svg>`);

export function logoStrip(ctx, opts = {}) {
  const { label = 'Trusted by 4,200+ security teams', logos = FAUX_LOGOS } = opts;
  return html`<section class="section" style="padding-block:var(--space-2xl)">
    <div class="container">
      <p class="logo-strip__label">${label}</p>
      <div class="logo-strip__row">${join(logos.map(mark))}</div>
    </div>
  </section>`;
}
