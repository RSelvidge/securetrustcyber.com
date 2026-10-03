// src/layouts/partials/mobile-drawer.mjs — <dialog>-based mobile navigation.

import { html, join } from '../../lib/html.mjs';
import { navModel } from '../../lib/nav-model.mjs';
import { icon } from '../../lib/icons.mjs';

export const mobileDrawer = (ctx) => {
  const menus = navModel();
  return html`
<dialog class="mobile-drawer" data-drawer aria-label="Mobile navigation">
  <div class="mobile-drawer__inner">
    <div class="mobile-drawer__top">
      <span class="brand__wordmark" style="font-family:var(--font-display);font-weight:700;color:var(--navy-800)">
        ${ctx.site.shortName}
      </span>
      <button class="nav-toggle" type="button" data-drawer-close aria-label="Close menu">${icon('x')}</button>
    </div>
    ${join(menus.map((menu) => html`
      <details class="mobile-drawer__group">
        <summary>${menu.label} ${icon('chevDown')}</summary>
        <ul role="list">
          ${join(menu.columns.flatMap((c) => c.items).map((it) => html`
            <li><a href="${ctx.url(it.slug)}">${it.title}</a></li>`))}
        </ul>
      </details>`))}
    <a class="mobile-drawer__link" href="${ctx.url('pricing')}">Pricing</a>
    <div style="margin-top:var(--space-l)">
      <a class="btn btn--primary btn--block"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}">${ctx.site.cta.demo}</a>
    </div>
  </div>
</dialog>`;
};
