// src/templates/pricing.mjs — three bundle cards. No prices are shown; CTAs route
// to the pricing-request page (mirrors the reference site).

import { html, join } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { dualCta } from '../components/dual-cta.mjs';
import { icon } from '../lib/icons.mjs';

export default function pricing(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    ${hero(ctx, page.hero)}

    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          ${join(page.bundles.map((b) => html`
            <div class="bundle ${b.popular ? 'bundle--popular' : ''} reveal">
              ${b.popular ? html`<span class="bundle__flag">Most popular</span>` : ''}
              <h3>${b.name}</h3>
              <p>${b.description}</p>
              <div>
                <p style="font-weight:var(--weight-bold);margin-bottom:var(--space-s)">Included SecureTrust solutions:</p>
                <ul class="bundle__check" role="list">
                  ${join(b.included.map((x) => html`<li>${icon('check')} <span>${x}</span></li>`))}
                </ul>
              </div>
              <p class="bundle__fit">${b.fit}</p>
              <div class="bundle__actions">
                <a class="btn btn--primary" href="${ctx.url('request-demo')}">Instant Pricing Available</a>
                <a class="btn btn--ghost" href="${ctx.url('company/contact')}">Contact Sales</a>
              </div>
            </div>`))}
        </div>
      </div>
    </section>

    <section class="section section--muted">
      <div class="container container--m text-center">
        <h2 class="section__title" style="margin-inline:auto">${page.customHeading ?? "Didn't find a bundle that fits?"}</h2>
        <p class="section__intro" style="margin-inline:auto;margin-top:var(--space-m)">${page.customBody ?? 'We build custom solutions for larger estates. Talk to us about your requirements.'}</p>
        <div style="margin-top:var(--space-l)">
          <a class="btn btn--navy btn--lg" href="${ctx.url('company/contact')}">Contact Sales</a>
        </div>
      </div>
    </section>

    ${dualCta(ctx, page.cta ?? {})}
  `;
}
