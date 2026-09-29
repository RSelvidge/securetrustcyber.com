// src/components/review-cards.mjs — G2-style review cards + aggregate score band.

import { html, join } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';

const stars = (n) => join(Array.from({ length: n }, () => icon('star')));

export function reviewCards(ctx, opts = {}) {
  const { eyebrow = '', heading = '', reviews = [], scores = [] } = opts;

  return html`<section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>
      <div class="grid grid--4">
        ${join(reviews.map((r) => html`
          <div class="review-card reveal">
            <div class="review-card__stars" aria-label="${r.rating} out of 5">${stars(r.rating)}</div>
            <div class="review-card__title">${r.title}</div>
            <p class="review-card__body">${r.body}</p>
            <div class="review-card__source">
              <span class="review-card__badge">✓</span>
              <span>${r.reviewer} · ${r.source}</span>
            </div>
          </div>`))}
      </div>
      ${scores.length ? html`
        <div class="score-band">
          ${join(scores.map((s) => html`
            <div class="score-band__item">
              <div class="score-band__value">${s.value}</div>
              <div class="score-band__label">${s.label}</div>
            </div>`))}
        </div>` : ''}
    </div>
  </section>`;
}
