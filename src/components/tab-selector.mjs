// src/components/tab-selector.mjs — ARIA tabs over product capability layers.
// No-JS: all panels visible; JS hides inactive ones and wires the tablist.

import { html, join, when } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';

export function tabSelector(ctx, opts = {}) {
  const { eyebrow = '', heading = '', intro = '', tabs = [] } = opts;
  if (!tabs.length) return '';

  const ids = tabs.map((t) => t.id);

  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
        ${intro ? html`<p class="section__intro">${intro}</p>` : ''}
      </div>

      <div class="tabs" role="tablist" aria-orientation="horizontal" data-tabs>
        ${join(tabs.map((t) => html`
          <button class="tab" type="button" role="tab" id="tab-${t.id}"
                  aria-selected="false" aria-controls="panel-${t.id}" tabindex="-1">
            ${icon(t.icon)} ${t.label}
          </button>`))}
      </div>

      ${join(tabs.map((t) => html`
        <div class="tabpanel" role="tabpanel" id="panel-${t.id}"
             aria-labelledby="tab-${t.id}" tabindex="0">
          <h3>${t.heading}</h3>
          <p>${t.body}</p>
          ${t.bullets?.length ? html`<ul role="list">
            ${join(t.bullets.map((b) => html`<li>${icon('check')} <span>${b}</span></li>`))}
          </ul>` : ''}
          ${when(t.link, html`<a class="btn btn--ghost" style="margin-top:var(--space-m)" href="${ctx.url(t.link)}">Explore ${t.label} ${icon('arrowRight')}</a>`)}
        </div>`))}
    </div>
  </section>`;
}
