// src/templates/index.mjs — the homepage: a bespoke composition of ~14 sections.
// Product cards, industry stories, and related content derive from the registry
// and data so they stay in sync with the rest of the site.

import { html, join, when } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { logoStrip } from '../components/logo-strip.mjs';
import { featureGrid } from '../components/feature-grid.mjs';
import { tabSelector } from '../components/tab-selector.mjs';
import { platformDiagram } from '../components/platform-diagram.mjs';
import { statRow } from '../components/stat-row.mjs';
import { reviewCards } from '../components/review-cards.mjs';
import { dualCta } from '../components/dual-cta.mjs';
import { icon } from '../lib/icons.mjs';
import { PAGES } from '../site.registry.mjs';
import { POSTS } from '../content/posts.data.mjs';

export default function index(ctx, page) {
  const d = page.data ?? {};

  // Product cards: derive from the registry (all real capabilities, in order).
  const productCards = PAGES
    .filter((p) => p.group === 'products' && p.category)
    .sort((a, b) => a.order - b.order)
    .slice(0, 9);

  // Industry stories: first three industries.
  const industries = PAGES
    .filter((p) => p.group === 'industries')
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  const relatedPosts = (d.relatedPosts ?? POSTS).slice(0, 3);

  return html`
    ${hero(ctx, d.hero ?? {})}

    ${logoStrip(ctx, {})}

    ${featureGrid(ctx, {
      eyebrow: 'Why SecureTrust Cyber', heading: d.introHeading ?? 'One platform. Every surface covered.',
      intro: d.introText,
      items: d.introCards ?? [], variant: '3up',
    })}

    ${tabSelector(ctx, d.tabs ?? {})}

    ${platformDiagram(ctx, d.platform ?? {})}

    ${twoPath(ctx, d)}

    ${productCarousel(ctx, productCards)}

    ${statRow(ctx, { variant: 'inverse', eyebrow: 'At global scale', stats: d.stats ?? [] })}

    ${industryStories(ctx, industries)}

    ${comparison(ctx, d)}

    ${reviewCards(ctx, d.reviews ?? {})}

    ${awards(ctx, d.awards ?? [])}

    ${relatedContent(ctx, relatedPosts)}

    ${dualCta(ctx, d.cta ?? { heading: 'One Platform. Total Security.', body: 'See the platform that closes the gap.' })}
  `;
}

function twoPath(ctx, d) {
  const two = d.twoPath ?? {};
  return html`<section class="section section--muted">
    <div class="container">
      <div class="feature-card reveal">
        <span class="feature-card__icon">${icon('building')}</span>
        <h3>${two.enterprise?.title ?? 'Modern enterprise security'}</h3>
        <p>${two.enterprise?.body ?? ''}</p>
        <a class="feature-card__link" href="${ctx.url('solutions')}">Explore for enterprises ${icon('arrowRight')}</a>
      </div>
    </div>
  </section>`;
}

function productCarousel(ctx, products) {
  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">The platform</p>
        <h2 class="section__title">Industry-leading solutions from one platform</h2>
      </div>
      <div class="grid grid--3">
        ${join(products.map((p) => html`
          <a class="post-card" href="${ctx.url(p.slug)}">
            <span class="feature-card__icon" style="color:var(--color-link)">${icon(p.icon)}</span>
            <h3>${p.title}</h3>
            <p class="post-card__dek">${p.blurb}</p>
            <span class="feature-card__link" style="margin-top:0">Explore solution ${icon('arrowRight')}</span>
          </a>`))}
      </div>
    </div>
  </section>`;
}

function industryStories(ctx, industries) {
  return html`<section class="section section--muted">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Customer stories</p>
        <h2 class="section__title">Built for your industry</h2>
      </div>
      <div class="grid grid--3">
        ${join(industries.map((ind) => html`
          <a class="post-card" href="${ctx.url(ind.slug)}">
            <span class="post-card__chip">${ind.title}</span>
            <p class="post-card__dek">${ind.blurb}</p>
            <span class="feature-card__link" style="margin-top:0">See how ${icon('arrowRight')}</span>
          </a>`))}
      </div>
    </div>
  </section>`;
}

function comparison(ctx, d) {
  return html`<section class="section">
    <div class="container container--m">
      <div class="section-head section-head--center">
        <p class="eyebrow">Why teams consolidate</p>
        <h2 class="section__title">${d.comparison?.heading ?? 'Fewer tools. No gaps.'}</h2>
        <p class="section__intro">${d.comparison?.body ?? ''}</p>
      </div>
      <div style="text-align:center">
        <a class="btn btn--navy" href="${ctx.url('compare/vs-zscaler')}">Compare SecureTrust ${icon('arrowRight')}</a>
      </div>
    </div>
  </section>`;
}

function awards(ctx, awards) {
  if (!awards.length) return '';
  return html`<section class="section section--muted" style="padding-block:var(--space-xl)">
    <div class="container">
      <div class="award-grid">
        ${join(awards.map((a) => html`<span class="award">${icon('award')} ${a}</span>`))}
      </div>
    </div>
  </section>`;
}

function relatedContent(ctx, posts) {
  if (!posts.length) return '';
  return html`<section class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">From the blog</p>
        <h2 class="section__title">Related content</h2>
      </div>
      <div class="grid grid--3">
        ${join(posts.map((p) => html`
          <a class="post-card" href="${ctx.url(p.slug)}">
            <span class="post-card__chip">${p.category}</span>
            <h3>${p.title}</h3>
            <p class="post-card__dek">${p.dek}</p>
            <div class="post-card__meta"><span>${p.date}</span> · <span>${p.read}</span></div>
          </a>`))}
      </div>
    </div>
  </section>`;
}
