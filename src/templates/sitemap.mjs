// src/templates/sitemap.mjs — HTML sitemap, projected from the registry.

import { html, join } from '../lib/html.mjs';
import { PAGES } from '../site.registry.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';

const GROUPS = [
  ['Products', (p) => p.group === 'products'],
  ['Solutions', (p) => ['solutions', 'compliance', 'industries', 'competitors', 'integrations'].includes(p.group)],
  ['Partners', (p) => p.group === 'partners'],
  ['Resources', (p) => p.group === 'resources'],
  ['Company', (p) => p.group === 'company'],
  ['Legal', (p) => p.group === 'legal'],
];

export default function sitemap(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    <section class="section">
      <div class="container">
        <h1 class="section__title">Sitemap</h1>
        <div class="grid grid--3" style="margin-top:var(--space-xl)">
          ${join(GROUPS.map(([label, fn]) => html`
            <div>
              <h2 style="font-size:var(--step-1);margin-bottom:var(--space-s)">${label}</h2>
              <ul role="list" class="stack stack--s">
                ${join(PAGES.filter((p) => !p.draft && fn(p)).map((p) => html`
                  <li><a href="${ctx.url(p.slug)}">${p.title}</a></li>`))}
              </ul>
            </div>`))}
        </div>
      </div>
    </section>`;
}
