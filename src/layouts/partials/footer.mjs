// src/layouts/partials/footer.mjs — 4-column footer + legal bar, projected from registry.

import { html, join } from '../../lib/html.mjs';
import { footerModel, legalLinks } from '../../lib/nav-model.mjs';
import { icon } from '../../lib/icons.mjs';
import { LOGO_SVG, WORDMARK } from '../../site.config.mjs';

export const footer = (ctx) => {
  const columns = footerModel();
  const legal = legalLinks();
  const year = new Date().getFullYear();

  return html`
<footer class="site-footer" role="contentinfo">
  <div class="container site-footer__top">
    <div class="site-footer__brand">
      <a class="brand brand--inverse" href="${ctx.url('')}" aria-label="${ctx.site.name} home">
        ${LOGO_SVG}
        <span class="brand__wordmark">${WORDMARK}<span style="color:var(--color-accent)">Cyber</span></span>
      </a>
      <p class="site-footer__tagline">${ctx.site.tagline}</p>
      <a class="btn btn--inverse"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}" style="justify-self:start">${ctx.site.cta.trial}</a>
      <address class="site-footer__address">${ctx.site.address}<br>VAT ${ctx.site.vat}</address>
      <div class="social-links">
        ${join(ctx.site.socials.map((s) => html`
          <a href="${s.href}" aria-label="${s.name}">${icon(s.icon)}</a>`))}
      </div>
    </div>

    ${join(columns.map((col) => html`
      <nav class="footer-col" aria-labelledby="fc-${col.id}">
        <h2 class="footer-col__title" id="fc-${col.id}">${col.title}</h2>
        <ul class="footer-col__list" role="list">
          ${join(col.items.map((it) => html`
            <li><a class="footer-col__link" href="${ctx.url(it.slug)}">${it.title}</a></li>`))}
        </ul>
      </nav>`))}
  </div>

  <div class="container site-footer__legal">
    <p>©${year} ${ctx.site.legalName}. All rights reserved.</p>
    <ul class="legal-links" role="list">
      ${join(legal.map((l) => html`<li><a href="${ctx.url(l.slug)}">${l.title}</a></li>`))}
    </ul>
  </div>
</footer>`;
};
