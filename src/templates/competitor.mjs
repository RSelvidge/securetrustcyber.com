// src/templates/competitor.mjs — comparison page: hero → framing → differentiators →
// comparison table → migration → FAQ → CTA. Carries claimsReviewed for gate 13.

import { html, join } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { comparisonTable } from '../components/comparison-table.mjs';
import { faq } from '../components/faq.mjs';
import { dualCta } from '../components/dual-cta.mjs';
import { icon } from '../lib/icons.mjs';

export default function competitor(ctx, page) {
  const diff = page.differentiators ?? [];

  return html`
    ${breadcrumbs(ctx, page)}
    ${hero(ctx, page.hero)}

    <section class="section">
      <div class="container container--m">
        <div class="prose prose--lead">
          <p>${page.framing}</p>
        </div>
        <div class="grid grid--2" style="margin-top:var(--space-xl)">
          ${join((page.painPoints ?? []).map((p) => html`
            <div class="feature-card reveal">
              <span class="feature-card__icon">${icon(p.icon ?? 'x')}</span>
              <h3>${p.title}</h3>
              <p>${p.body}</p>
            </div>`))}
        </div>
      </div>
    </section>

    ${diff.length ? html`<section class="section section--muted">
      <div class="container container--m">
        <div class="section-head">
          <p class="eyebrow">Why SecureTrust Cyber</p>
          <h2 class="section__title">${page.diffHeading ?? 'Three reasons teams switch'}</h2>
        </div>
        <div class="diff">
          ${join(diff.map((d) => html`
            <div class="diff__item reveal">
              <span class="diff__num">0${d.n}</span>
              <div><h3>${d.title}</h3><p>${d.body}</p></div>
            </div>`))}
        </div>
      </div>
    </section>` : ''}

    ${page.table?.rows?.length ? comparisonTable(ctx, { title: page.table.title, us: page.us, them: page.them, rows: page.table.rows }) : ''}

    ${page.migration ? html`<section class="section section--deep">
      <div class="container container--m">
        <h2 class="section__title" style="color:var(--white)">${page.migration.heading}</h2>
        <p style="color:var(--color-text-inverse-muted);max-width:56ch;margin-top:var(--space-m)">${page.migration.body}</p>
        <div style="margin-top:var(--space-l)">
          <a class="btn btn--primary" href="${ctx.url('request-demo')}">Talk to a migration expert</a>
        </div>
      </div>
    </section>` : ''}

    ${page.faq?.length ? faq(ctx, { heading: page.faqHeading ?? 'About the comparison', items: page.faq }) : ''}

    ${page.claimsReviewed ? html`<p class="container container--s" style="color:var(--color-text-muted);font-size:var(--step--1);padding-bottom:var(--space-l)">Comparison last verified: ${page.claimsReviewed}.</p>` : ''}

    ${dualCta(ctx, page.cta ?? {})}
  `;
}
