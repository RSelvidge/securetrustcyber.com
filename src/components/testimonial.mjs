// src/components/testimonial.mjs — quote card (feature) and scroll-snap slider.

import { html, join, when } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';

const initials = (name) => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const card = (q) => html`
  <figure class="quote-card">
    <blockquote class="quote-card__text">${q.text}</blockquote>
    <figcaption class="quote-card__person">
      <span class="quote-card__avatar" aria-hidden="true">${initials(q.name)}</span>
      <span>
        <span class="quote-card__name">${q.name}</span><br>
        <span class="quote-card__role">${q.role}</span>
      </span>
      ${when(q.company, html`<span class="quote-card__meta">${q.company}</span>`)}
    </figcaption>
  </figure>`;

export function testimonial(ctx, opts = {}) {
  const { variant = 'feature', eyebrow = '', heading = '', items = [] } = opts;
  if (!items.length) return '';

  const head = heading || eyebrow
    ? html`<div class="section-head section-head--center">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? html`<h2 class="section__title">${heading}</h2>` : ''}
      </div>`
    : '';

  if (variant === 'slider') {
    return html`<section class="section">
      <div class="container">
        ${head}
        <div class="slider" data-slider>
          <div class="slider__track" data-slider-track>
            ${join(items.map(card))}
          </div>
          <div class="slider__nav">
            <button class="slider__btn" type="button" data-slider-prev aria-label="Previous">${icon('arrowRight')}</button>
            <button class="slider__btn" type="button" data-slider-next aria-label="Next">${icon('arrowRight')}</button>
          </div>
        </div>
      </div>
    </section>`;
  }

  return html`<section class="section section--muted">
    <div class="container">
      ${head}
      <div class="testimonial--feature">${join(items.slice(0, 1).map(card))}</div>
    </div>
  </section>`;
}
