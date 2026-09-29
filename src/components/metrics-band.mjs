// src/components/metrics-band.mjs — a three-up metrics row.

import { html, join } from '../lib/html.mjs';

export function metricsBand(ctx, opts = {}) {
  const { metrics = [] } = opts;
  return html`<section class="section section--deep">
    <div class="container">
      <div class="metrics-band">
        ${join(metrics.map((m) => html`
          <div class="metric reveal">
            <div class="metric__value" style="color:var(--white)">${m.value}</div>
            <div class="metric__label" style="color:var(--color-text-inverse-muted)">${m.label}</div>
          </div>`))}
      </div>
    </div>
  </section>`;
}
