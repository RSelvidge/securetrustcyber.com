// src/templates/form.mjs: contact form pages. Submissions go to Web3Forms
// (data-endpoint), which emails them to the inbox tied to SITE.formAccessKey.

import { html } from '../lib/html.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { dualCta } from '../components/dual-cta.mjs';

export default function form(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    <section class="section">
      <div class="container split split--narrow">
        <div>
          <p class="eyebrow">${page.eyebrow ?? 'Get in touch'}</p>
          <h1 class="section__title">${page.title}</h1>
          <p class="section__intro" style="margin-top:var(--space-m)">${page.intro}</p>
        </div>
        <form class="form" data-validate data-endpoint="https://api.web3forms.com/submit" data-email="${ctx.site.email}" novalidate>
          <input type="hidden" name="access_key" value="${ctx.site.formAccessKey ?? ''}">
          <input type="hidden" name="subject" value="New ${page.title} request from ${ctx.site.origin.replace(/^https?:\/\//, '')}">
          <input type="hidden" name="from_name" value="${ctx.site.name} website">
          <input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="field">
            <label class="field__label" for="f-name">Full name</label>
            <input class="field__input" id="f-name" name="name" type="text" required autocomplete="name">
            <p class="field__error" hidden></p>
          </div>
          <div class="field">
            <label class="field__label" for="f-email">Work email</label>
            <input class="field__input" id="f-email" name="email" type="email" required autocomplete="email">
            <p class="field__error" hidden></p>
          </div>
          <div class="field">
            <label class="field__label" for="f-company">Company</label>
            <input class="field__input" id="f-company" name="company" type="text" required autocomplete="organization">
            <p class="field__error" hidden></p>
          </div>
          <div class="field">
            <label class="field__label" for="f-size">Company size</label>
            <select class="field__input" id="f-size" name="size" required>
              <option value="">Select…</option>
              <option>1–50 employees</option><option>51–250</option><option>251–1,000</option><option>1,001+</option>
            </select>
            <p class="field__error" hidden></p>
          </div>
          <div class="field">
            <label class="field__label" for="f-message">What are you looking to secure?</label>
            <textarea class="field__input" id="f-message" name="message" rows="4"></textarea>
          </div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">${page.submitLabel ?? 'Submit'}</button>
        </form>
      </div>
    </section>
    ${dualCta(ctx, page.cta ?? {})}
  `;
}
