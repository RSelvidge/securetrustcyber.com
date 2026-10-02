// src/templates/blog-post.mjs — long-form article.

import { html, raw } from '../lib/html.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { dualCta } from '../components/dual-cta.mjs';

export default function blogPost(ctx, page) {
  const body = String(page.body ?? '').replace(/(src|href)=(['"])\/assets\//g, (_, attr, quote) => `${attr}=${quote}${ctx.url.asset('')}`);
  return html`
    ${breadcrumbs(ctx, page)}
    <article class="section blog-article">
      <div class="container container--m">
        <header>
          <p class="eyebrow">${page.category}</p>
          <h1 class="section__title" style="margin-bottom:var(--space-s)">${page.title}</h1>
          <p class="post-card__meta" style="margin-bottom:var(--space-l)">
            <span>${page.date}</span> · <span>${page.read}</span> · <span>${page.author}</span>
          </p>
          <p class="prose prose--lead" style="color:var(--color-text-muted)">${page.dek}</p>
        </header>
        <div class="prose" style="margin-top:var(--space-xl)">${raw(body)}</div>
      </div>
    </article>
    ${dualCta(ctx, page.cta ?? {})}
  `;
}
