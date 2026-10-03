// src/templates/product.mjs — structured product page:
// hero → problem → capabilities → how-it-works → platform → proof → quote → FAQ → related → CTA.

import { html, when } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { featureGrid } from '../components/feature-grid.mjs';
import { timeline } from '../components/timeline.mjs';
import { platformDiagram } from '../components/platform-diagram.mjs';
import { statRow } from '../components/stat-row.mjs';
import { testimonial } from '../components/testimonial.mjs';
import { faq } from '../components/faq.mjs';
import { relatedRail } from '../components/related-rail.mjs';
import { dualCta } from '../components/dual-cta.mjs';
import { icon } from '../lib/icons.mjs';
import { datasheetPath } from '../lib/datasheets.mjs';

export const VARIANTS = ['split', 'diagram', 'terminal'];

export default function product(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    ${hero(ctx, page.hero)}

    <section class="datasheet-band">
      <div class="container datasheet-band__inner">
        <span class="datasheet-band__text">${icon('file')} <span><strong>${page.title} datasheet</strong> Two-page overview of capabilities, deployment and FAQs (PDF)</span></span>
        <a class="btn btn--navy" href="${ctx.url.asset(datasheetPath(page.slug))}" download>${icon('download')} Download datasheet</a>
      </div>
    </section>

    ${page.problem ? featureGrid(ctx, {
      eyebrow: 'The problem', heading: page.problem.heading, intro: page.problem.intro,
      items: page.problem.items, variant: '3up',
    }) : ''}

    ${page.capabilities ? featureGrid(ctx, {
      eyebrow: 'Capabilities', heading: page.capabilities.heading, intro: page.capabilities.intro,
      items: page.capabilities.items, variant: 'alternating',
    }) : ''}

    ${page.howItWorks?.steps?.length ? timeline(ctx, page.howItWorks) : ''}

    ${page.platform ? platformDiagram(ctx, page.platform) : ''}

    ${page.proof?.stats?.length ? statRow(ctx, { variant: 'inverse', ...page.proof }) : ''}

    ${page.quote?.items?.length ? testimonial(ctx, { variant: 'feature', ...page.quote }) : ''}

    ${page.faq?.length ? faq(ctx, { heading: 'Common questions', items: page.faq }) : ''}

    ${when(true, html`<section class="section section--muted"><div class="container">${relatedRail(ctx, page)}</div></section>`)}

    ${dualCta(ctx, page.cta ?? {})}
  `;
}
