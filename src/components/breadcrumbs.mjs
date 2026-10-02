// src/components/breadcrumbs.mjs — breadcrumb nav + JSON-LD.

import { html, join } from '../lib/html.mjs';
import { breadcrumbList } from '../lib/schema.mjs';

export function breadcrumbs(ctx, page, crumbs = null) {
  if (!page.slug) return '';
  const trail = crumbs ?? defaultCrumbs(ctx, page);
  if (!trail.length) return '';

  const jsonLd = breadcrumbList(ctx, [{ name: 'Home', slug: '' }, ...trail]);

  return html`${jsonLd}
  <nav class="breadcrumbs container" aria-label="Breadcrumb">
    <ol role="list">
      <li><a href="${ctx.url('')}">Home</a></li>
      ${join(trail.map((c, i) => html`
        <li>${i === trail.length - 1 ? html`<span aria-current="page">${c.name}</span>` : c.slug ? html`<a href="${ctx.url(c.slug)}">${c.name}</a>` : html`<span>${c.name}</span>`}</li>`))}
    </ol>
  </nav>`;
}

function defaultCrumbs(ctx, page) {
  // Directory names are not always pages. Resolve them to existing overview pages.
  const overviews = {
    resources: 'resources/index',
    partners: 'partners/index',
    industries: 'solutions',
    compliance: 'solutions',
    compare: 'solutions',
    company: 'company/about',
  };
  const parts = page.slug.split('/');
  // Last segment is the current page.
  const crumbs = [];
  let acc = '';
  parts.forEach((seg, i) => {
    acc = acc ? `${acc}/${seg}` : seg;
    const isLast = i === parts.length - 1;
    if (isLast) {
      crumbs.push({ name: page.title, slug: page.slug });
      return;
    }
    const slug = ctx.registry.has(acc) ? acc : overviews[acc];
    const parent = ctx.registry.get(slug);
    // Skip structural folders and avoid linking an overview page to itself.
    if (parent && slug !== page.slug && !crumbs.some((c) => c.slug === slug)) {
      crumbs.push({ name: parent.title, slug });
    }
  });
  return crumbs;
}
