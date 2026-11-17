// src/components/hero.mjs — hero section with 5 variants: split | diagram |
// terminal | centered | compact. Every href goes through ctx.url.

import { html, join, raw, when } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { dashboard, terminal } from './mock.mjs';
import { RING_FRAMEWORKS } from '../content/ring-hero.data.mjs';

export const HERO_VARIANTS = ['split', 'diagram', 'terminal', 'centered', 'compact', 'ring', 'practice'];

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
    bg = null, // background photo under a navy overlay; replaces the side mock
    textSide = 'left', // 'right' puts the text over the right of the photo
  lighter = false, // a lighter navy overlay so more of the photo shows
    ring = null, // variant 'ring': { product, ring, name, points } — animated product ring (assets/js/ring-hero.js)
  } = opts;

  const rotate = rotating.length
    ? html`<span class="hero__rotate" data-hero-rotate>${join(
        rotating.map((r, i) => html`<span class="hero__rotate-item${i === 0 ? ' is-active' : ''}">${r}</span>`)
      )}</span>`
    : '';

  const actions = html`<div class="hero__actions">
    ${primary ? html`<a class="btn btn--primary btn--lg"${ctx.linkAttrs(primary.href)} href="${ctx.url(primary.href)}">${primary.label} ${icon('arrowRight')}</a>` : ''}
    ${secondary ? html`<a class="btn btn--outline-inverse btn--lg"${ctx.linkAttrs(secondary.href)} href="${ctx.url(secondary.href)}">${secondary.label}</a>` : ''}
  </div>`;

  const chipRow = chips.length
    ? html`<div class="hero__chips">${join(chips.map((c) => html`<span class="chip">${c}</span>`))}</div>`
    : '';

  const mediaBlock = bg ? '' : variant === 'ring' && ring
    ? html`<div class="hero__media ring-hero" data-ring-hero data-product="${ring.product}">
        <canvas class="ring-hero__canvas" aria-hidden="true"></canvas>
        <div class="ring-hero__core">
          <div>
            <p class="ring-hero__ring">${ring.ring}</p>
            <p class="ring-hero__name">${ring.name}</p>
            <ul class="ring-hero__points">${join(ring.points.map((p) => html`<li>${p}</li>`))}</ul>
          </div>
        </div>
      </div>
      <script src="${ctx.url.asset('js/ring-hero.js')}" defer></script>`
    : variant === 'practice'
    ? html`<div class="hero__media practice-map" data-practice-map>
        <canvas class="practice-map__canvas" aria-hidden="true"></canvas>
        <div class="practice-map__labels" data-pm="labels"></div>
        <p class="practice-map__legend"><span>Practice traffic</span><span class="is-bad">Threat stopped</span><em>Illustrative</em></p>
      </div>
      <script src="${ctx.url.asset('js/ring-hero.js')}" defer></script>`
    : variant === 'terminal'
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

  return html`<section class="hero hero--${variant}${compact ? ' hero--compact' : ''}${bg ? ' hero--photo' : ''}${bg && textSide === 'right' ? ' hero--text-right' : ''}${bg && lighter ? ' hero--lighter' : ''}"${bg ? html` style="background-image: var(--hero-overlay), url('${ctx.url.asset(bg)}')"` : ''}>
    <div class="container hero__inner">${body}${mediaBlock}</div>
    ${when(variant === 'ring', html`<div class="ring-hero__ticker" aria-label="Frameworks we map to"><div class="ring-hero__track">${join(
      [...RING_FRAMEWORKS, ...RING_FRAMEWORKS].map((f, i) => html`<span${i >= RING_FRAMEWORKS.length ? raw(' aria-hidden="true"') : ''}>${f}</span>`)
    )}</div></div>`)}
  </section>`;
}
