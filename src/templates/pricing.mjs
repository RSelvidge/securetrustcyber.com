// src/templates/pricing.mjs — bundle cards and device pricing calculator.

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
                <a class="btn btn--primary" href="#pricing-calculator">Calculate price</a>
                <a class="btn btn--ghost" href="${ctx.url('company/contact')}">Contact Sales</a>
              </div>
            </div>`))}
        </div>
      </div>
    </section>

    <section class="section section--muted" id="pricing-calculator" aria-labelledby="pricing-calculator-title">
      <div class="container container--m">
        <div class="section-head">
          <p class="eyebrow">Build your estimate</p>
          <h2 class="section__title" id="pricing-calculator-title">Estimate your bundle price</h2>
          <p class="section__intro">Choose a bundle and enter the number of protected devices to see an estimated monthly price.</p>
        </div>
        <div class="pricing-calculator" data-pricing-calculator data-retention-ready="${page.retentionRates?.length ? 'true' : 'false'}">
          <div class="pricing-calculator__fields">
            <div class="field">
              <label class="field__label" for="pricing-devices">Number of devices</label>
              <input class="field__input" id="pricing-devices" name="devices" type="number" min="1" step="1" value="100" inputmode="numeric" required data-device-count>
            </div>
            <div class="field">
              <label class="field__label" for="pricing-bundle">Bundle</label>
              <select class="field__input" id="pricing-bundle" name="bundle" data-bundle-choice>
                <option value="essentials" data-rate="30">SecureTrust Essentials — $30/device/month</option>
                <option value="advanced" data-rate="50">SecureTrust Advanced — $50/device/month</option>
                <option value="complete" data-rate="70">SecureTrust Complete — starts at $70/device/month</option>
              </select>
            </div>
            <div class="field" data-retention-field hidden>
              <label class="field__label" for="pricing-retention">Log retention</label>
              <select class="field__input" id="pricing-retention" name="retention" data-retention-choice>
                <option value="" disabled selected>${page.retentionRates?.length ? 'Choose a log-retention option' : 'Log-retention pricing to be confirmed'}</option>
                ${join((page.retentionRates ?? []).map((tier) => html`<option value="${tier.rate}">${tier.label}</option>`))}
              </select>
              <p class="field__hint">Complete pricing varies with the selected log-retention period.</p>
            </div>
          </div>
          <div class="pricing-calculator__result" aria-live="polite" aria-atomic="true">
            <p class="pricing-calculator__label">Estimated monthly price</p>
            <p class="pricing-calculator__price" data-price-output>$3,000</p>
            <p class="pricing-calculator__detail" data-price-detail>100 devices × $30 per device/month</p>
            <a class="btn btn--primary" href="${ctx.url('company/contact')}" data-sales-link>Contact Sales</a>
          </div>
          <p class="field__hint pricing-calculator__note">Estimate excludes taxes and is subject to final configuration and agreement.</p>
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
