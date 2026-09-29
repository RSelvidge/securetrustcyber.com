// src/components/hero.mjs — hero section with 5 variants: split | diagram |
// terminal | centered | compact. Every href goes through ctx.url.

import { html, join, when } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { dashboard, terminal } from './mock.mjs';

export const HERO_VARIANTS = ['split', 'diagram', 'terminal', 'centered', 'compact'];

export function hero(ctx, opts = {}) {
  const {
    variant = 'split',
    eyebrow = '',
    headline = '',
    rotating = [],
    sub = '',
    primary = null,
    secondary = null,
    media = 'SecureTrust Console',
    chips = [],
    compact = false,
  } = opts;

  const rotate = rotating.length
    ? html`<span class="hero__rotate" data-hero-rotate>${join(
        rotating.map((r, i) => html`<span class="hero__rotate-item${i === 0 ? ' is-active' : ''}">${r}</span>`)
      )}</span>`
    : '';

  const actions = html`<div class="hero__actions">
    ${primary ? html`<a class="btn btn--primary btn--lg" href="${ctx.url(primary.href)}">${primary.label} ${icon('arrowRight')}</a>` : ''}
    ${secondary ? html`<a class="btn btn--outline-inverse btn--lg" href="${ctx.url(secondary.href)}">${secondary.label}</a>` : ''}
  </div>`;

  const chipRow = chips.length
    ? html`<div class="hero__chips">${join(chips.map((c) => html`<span class="chip">${c}</span>`))}</div>`
    : '';

  const mediaBlock = variant === 'terminal'
    ? html`<div class="hero__media">${terminal()}</div>`
    : (variant === 'split' || variant === 'diagram')
      ? html`<div class="hero__media"><div class="mock">${dashboard({ title: media })}</div></div>`
      : '';

  const body = html`
    <div>
      ${when(eyebrow, html`<p class="eyebrow hero__eyebrow">${eyebrow}</p>`)}
      <h1 class="hero__title">${headline} ${rotate}</h1>
      ${when(sub, html`<p class="hero__sub">${sub}</p>`)}
      ${actions}
      ${chipRow}
    </div>`;

  return html`<section class="hero hero--${variant}${compact ? ' hero--compact' : ''}">
    <div class="container hero__inner">${body}${mediaBlock}</div>
  </section>`;
}
