// src/content/pages/solutions.mjs — the Solutions hub.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { icon } from '../../lib/icons.mjs';
import { PAGES } from '../../site.registry.mjs';

const groups = [
  { id: 'compliance', title: 'Compliance', blurb: 'Meet NIS2, ISO 27001, HIPAA and more.', icon: 'scale' },
  { id: 'industries', title: 'Industries', blurb: 'Security built for your sector.', icon: 'building' },
  { id: 'competitors', title: 'Compare', blurb: 'See how SecureTrust Cyber stacks up.', icon: 'x' },
  { id: 'integrations', title: 'Integrations', blurb: 'Connect to the tools you run.', icon: 'bolt' },
];

export default {
  slug: 'solutions',
  type: 'page',
  title: 'Solutions',
  metaTitle: 'Solutions by Compliance, Industry and Integration | SecureTrust Cyber',
  metaDescription: 'SecureTrust Cyber solutions by compliance framework, industry, and third-party integration.',
  cta: false,
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Solutions', headline: 'Security that fits how you work',
      sub: 'Whether you are chasing a compliance deadline, securing a specific sector, or integrating with your stack — start here.',
      primary: { label: 'Get a Demo', href: 'request-demo' },
    }),
    (ctx) => html`<section class="section"><div class="container">
      <div class="grid grid--2">
        ${join(groups.map((g) => html`
          <div class="feature-card reveal">
            <span class="feature-card__icon">${icon(g.icon)}</span>
            <h3>${g.title}</h3>
            <p>${g.blurb}</p>
            <ul role="list" style="margin-top:var(--space-m);display:grid;gap:var(--space-2xs)">
              ${join(PAGES.filter((p) => p.group === g.id && !p.draft).slice(0, 6).map((p) => html`
                <li><a href="${ctx.url(p.slug)}">${p.title}</a></li>`))}
            </ul>
          </div>`))}
      </div>
    </div></section>`,
  ],
};
