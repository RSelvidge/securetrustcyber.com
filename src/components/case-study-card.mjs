// src/components/case-study-card.mjs — a customer story with quote + metrics.

import { html } from '../lib/html.mjs';
import { dashboard } from './mock.mjs';

export function caseStudyCard(ctx, opts = {}) {
  const { logo = '', quote = '', name = '', role = '', metrics = [] } = opts;

  return html`<section class="section">
    <div class="container">
      <div class="case-study reveal">
        <div>
          <div class="case-study__logo">${logo}</div>
          <blockquote class="case-study__quote">${quote}</blockquote>
          <p class="case-study__attrib">${name} · ${role}</p>
        </div>
        <div class="case-study__media"><div class="mock">${dashboard({})}</div></div>
      </div>
    </div>
  </section>`;
}
