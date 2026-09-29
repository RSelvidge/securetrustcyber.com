// src/templates/compliance.mjs — regulation page: hero → summary → control map →
// evidence checklist → FAQ → CTA.

import { html, join } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { controlMapTable } from '../components/control-map-table.mjs';
import { faq } from '../components/faq.mjs';
import { dualCta } from '../components/dual-cta.mjs';
import { icon } from '../lib/icons.mjs';

export const VARIANTS = ['compact', 'centered'];

export default function compliance(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    ${hero(ctx, page.hero)}

    <section class="section">
      <div class="container container--m">
        <div class="prose prose--lead">
          <h2>${page.summaryHeading ?? 'What it requires'}</h2>
          <p>${page.summary}</p>
        </div>
      </div>
    </section>

    ${page.controlMap?.rows?.length ? controlMapTable(ctx, page.controlMap) : ''}

    ${page.evidence?.length ? html`<section class="section">
      <div class="container container--m">
        <div class="section-head">
          <p class="eyebrow">Evidence</p>
          <h2 class="section__title">How SecureTrust helps you demonstrate compliance</h2>
        </div>
        <div class="grid grid--2">
          ${join(page.evidence.map((e) => html`
            <div class="feature-card reveal">
              <span class="feature-card__icon">${icon('check')}</span>
              <h3>${e.title}</h3>
              <p>${e.body}</p>
            </div>`))}
        </div>
      </div>
    </section>` : ''}

    ${page.faq?.length ? faq(ctx, { heading: page.faqHeading ?? 'Frequently asked questions', items: page.faq }) : ''}

    ${dualCta(ctx, page.cta ?? {})}
  `;
}
