// src/templates/notfound.mjs — 404 page.

import { html } from '../lib/html.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';

export default function notfound(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    <section class="section section--deep" style="min-height:60vh;display:grid;place-items:center">
      <div class="container text-center">
        <p class="eyebrow" style="color:var(--color-accent)">Error 404</p>
        <h1 class="section__title" style="margin-inline:auto;color:var(--white)">Page not found</h1>
        <p class="section__intro" style="margin-inline:auto;margin-top:var(--space-m)">
          The page you are looking for does not exist or has moved.
        </p>
        <div style="margin-top:var(--space-l)">
          <a class="btn btn--primary btn--lg" href="${ctx.url('')}">Back to home</a>
        </div>
      </div>
    </section>`;
}
