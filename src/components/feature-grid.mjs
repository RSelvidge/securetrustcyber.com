// src/components/feature-grid.mjs — icon-card grid (3up/4up) and alternating rows.

import { html, join, when } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';

const card = (ctx, item) => html`
  <div class="feature-card reveal">
    <span class="feature-card__icon">${icon(item.icon)}</span>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    ${when(item.href, html`<a class="feature-card__link" href="${ctx.url(item.href)}">${item.link ?? 'Learn more'} ${icon('arrowRight')}</a>`)}
  </div>`;

export function featureGrid(ctx, opts = {}) {
  const { eyebrow = '', heading = '', intro = '', items = [], variant = '3up', onDark = false } = opts;
  const cls = variant === '4up' ? 'grid--4' : 'grid--3';

  if (variant === 'alternating') {
    return html`<section class="section">
      <div class="container">
        ${sectionHead(eyebrow, heading, intro)}
        <div class="stack">
          ${join(items.map((it, i) => html`
            <div class="feature-alt${i % 2 === 1 ? ' feature-alt--reverse' : ''}">
              <div class="reveal">
                <h3>${it.title}</h3>
                <p>${it.body}</p>
                ${it.bullets?.length ? html`<ul role="list">
                  ${join(it.bullets.map((b) => html`<li>${icon('check')} <span>${b}</span></li>`))}
                </ul>` : ''}
              </div>
              <div class="feature-alt__media reveal">
                ${it.image ? html`<img class="feature-alt__image${it.image.fit === 'contain' ? ' feature-alt__image--contain' : ''}" src="${ctx.url.asset(it.image.src)}" alt="${it.image.alt}" width="${it.image.width}" height="${it.image.height}" loading="lazy" decoding="async">` : (it.media ?? mediaFallback(it.title))}
              </div>
            </div>`))}
        </div>
      </div>
    </section>`;
  }

  return html`<section class="section">
    <div class="container">
      ${sectionHead(eyebrow, heading, intro)}
      <div class="grid ${cls}">
        ${join(items.map((it) => card(ctx, it)))}
      </div>
    </div>
  </section>`;
}

function sectionHead(eyebrow, heading, intro) {
  if (!eyebrow && !heading && !intro) return '';
  return html`<div class="section-head">
    ${when(eyebrow, html`<p class="eyebrow">${eyebrow}</p>`)}
    ${when(heading, html`<h2 class="section__title">${heading}</h2>`)}
    ${when(intro, html`<p class="section__intro">${intro}</p>`)}
  </div>`;
}

export function mediaFallback(title) {
  return html`<div class="feature-alt__media" style="background:linear-gradient(160deg,var(--navy-800),var(--navy-900));color:var(--white);min-height:14rem;display:grid;place-items:center;font-family:var(--font-display);font-weight:700;font-size:var(--step-2)">
    ${title}
  </div>`;
}
