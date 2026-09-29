// src/components/comparison-table.mjs — 3-column "Capability / Us / Them" table.

import { html, join } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';

export function comparisonTable(ctx, opts = {}) {
  const { title = '', us = 'SecureTrust Cyber', them = 'Competitor', rows = [] } = opts;

  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">How do we compare?</p>
        <h2 class="section__title">${title}</h2>
      </div>
      <div class="table-wrap">
        <table class="comparison-table">
          <caption class="visually-hidden">${title}</caption>
          <thead>
            <tr><th scope="col">Capability</th><th scope="col">${us}</th><th scope="col">${them}</th></tr>
          </thead>
          <tbody>
            ${join(rows.map((r) => html`
              <tr class="${r.win ? 'row-win' : ''}">
                <th scope="row">${r.capability}</th>
                <td class="${r.us ? 'cell-yes' : 'cell-no'}">${r.us ? `${icon('check')} Available` : `${icon('x')} Not available`}</td>
                <td class="${r.them ? 'cell-yes' : 'cell-no'}">${r.them ? `${icon('check')} Available` : `${icon('x')} Not available`}</td>
              </tr>`))}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}
