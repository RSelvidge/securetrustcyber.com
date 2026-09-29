// src/components/control-map-table.mjs — regulation control → product mapping.

import { html, join } from '../lib/html.mjs';

export function controlMapTable(ctx, opts = {}) {
  const { eyebrow = '', heading = '', rows = [] } = opts;

  return html`<section class="section section--muted">
    <div class="container">
      <div class="section-head">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>
      <div class="table-wrap">
        <table class="comparison-table control-map">
          <caption class="visually-hidden">${heading}</caption>
          <thead>
            <tr><th scope="col">Requirement</th><th scope="col">How SecureTrust satisfies it</th></tr>
          </thead>
          <tbody>
            ${join(rows.map((r) => html`
              <tr>
                <th scope="row">${r.requirement}</th>
                <td>${r.answer} ${r.href ? html`<a href="${ctx.url(r.href)}">→ ${r.product}</a>` : ''}</td>
              </tr>`))}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}
