// src/layouts/partials/header.mjs — utility bar + brand + 5-item mega-menu + CTAs.

import { html, join } from '../../lib/html.mjs';
import { navModel } from '../../lib/nav-model.mjs';
import { icon } from '../../lib/icons.mjs';
import { LOGO_SVG, WORDMARK } from '../../site.config.mjs';

export const header = (ctx) => {
  const menus = navModel();

  return html`
<header class="site-header" role="banner">
  <div class="utility-bar">
    <div class="container utility-bar__inner">
      <a class="utility-bar__link" href="${ctx.url('company/contact')}">Support</a>
      <a class="utility-bar__link" href="${ctx.url('trust-center')}">Trust Center</a>
      <a class="utility-bar__link" href="${ctx.url('pricing')}">${ctx.site.cta.pricing}</a>
    </div>
  </div>

  <div class="container nav-bar">
    <a class="brand" href="${ctx.url('')}" aria-label="${ctx.site.name} home">
      ${LOGO_SVG}
      <span class="brand__wordmark">${WORDMARK}<span style="color:var(--color-accent)">Cyber</span></span>
    </a>

    <nav class="primary-nav" aria-label="Primary">
      <ul class="primary-nav__list" role="list">
        ${join(menus.map((menu) => html`
          <li class="primary-nav__item">
            <button class="primary-nav__trigger" type="button"
                    id="trigger-${menu.id}" aria-expanded="false"
                    aria-controls="mega-${menu.id}" data-mega-trigger="${menu.id}">
              ${menu.label}
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="mega" id="mega-${menu.id}" role="region"
                 aria-labelledby="trigger-${menu.id}" data-mega-panel="${menu.id}" hidden>
              <div class="mega__inner container container--xl"
                   style="grid-template-columns: repeat(${menu.columns.length + (menu.promo ? 1 : 0)}, minmax(0,1fr));">
                ${join(menu.columns.map((col) => html`
                  <div class="mega__col">
                    <h2 class="mega__col-title" id="mega-${menu.id}-c${col.index}">${col.title}</h2>
                    <ul class="mega__list" role="list" aria-labelledby="mega-${menu.id}-c${col.index}">
                      ${join(col.items.map((it) => html`
                        <li>
                          <a class="mega__link" href="${ctx.url(it.slug)}">
                            <span class="mega__link-icon">${icon(it.icon)}</span>
                            <span>
                              <span class="mega__link-title">${it.title}</span>
                              <span class="mega__link-blurb">${it.blurb}</span>
                            </span>
                          </a>
                        </li>`))}
                    </ul>
                  </div>`))}
                ${menu.promo ? html`
                  <aside class="mega__promo">
                    <h3>${menu.promo.title}</h3>
                    <p>${menu.promo.body}</p>
                    <a class="btn" href="${ctx.url(menu.promo.cta.slug)}">${menu.promo.cta.label}</a>
                  </aside>` : ''}
              </div>
            </div>
          </li>`))}
      </ul>
    </nav>

    <div class="nav-bar__actions">
      <a class="btn btn--primary nav-bar__cta"${ctx.linkAttrs('request-demo')} href="${ctx.url('request-demo')}">${ctx.site.cta.demo}</a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-label="Open menu" aria-expanded="false">
        ${icon('menu')}
      </button>
    </div>
  </div>
</header>`;
};
