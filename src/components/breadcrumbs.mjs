// src/components/breadcrumbs.mjs — breadcrumb nav + JSON-LD.

import { html, join } from '../lib/html.mjs';
import { breadcrumbList } from '../lib/schema.mjs';

export function breadcrumbs(ctx, page, crumbs = null) {
  const trail = crumbs ?? defaultCrumbs(ctx, page);
  if (!trail.length) return '';

  const jsonLd = breadcrumbList(ctx, trail);

  return html`${jsonLd}
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol role="list">
      <li><a href="${ctx.url('')}">Home</a></li>
      ${join(trail.map((c) => html`
        <li>${c.slug ? html`<a href="${ctx.url(c.slug)}">${c.name}</a>` : html`<span aria-current="page">${c.name}</span>`}</li>`))}
    </ol>
  </nav>`;
}

function defaultCrumbs(ctx, page) {
  const parts = page.slug.split('/');
  // Last segment is the current page.
  const crumbs = [];
  let acc = '';
  parts.forEach((seg, i) => {
    acc = acc ? `${acc}/${seg}` : seg;
    const isLast = i === parts.length - 1;
    // Only link intermediate segments that resolve to a real page.
    const linkable = !isLast && ctx.registry.has(acc);
    crumbs.push({ name: segTitle(seg, page), slug: linkable ? acc : null });
  });
  return crumbs;
}

function segTitle(seg, page) {
  return seg
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
