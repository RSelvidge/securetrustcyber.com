// src/templates/industry.mjs — industry page: hero + compliance chips → threats →
// control map → outcomes → case study → testimonial → FAQ → CTA.

import { html } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { featureGrid } from '../components/feature-grid.mjs';
import { controlMapTable } from '../components/control-map-table.mjs';
import { caseStudyCard } from '../components/case-study-card.mjs';
import { testimonial } from '../components/testimonial.mjs';
import { faq } from '../components/faq.mjs';
import { dualCta } from '../components/dual-cta.mjs';

export const VARIANTS = ['split', 'compact', 'centered'];

export default function industry(ctx, page) {
  return html`
    ${breadcrumbs(ctx, page)}
    ${hero(ctx, page.hero)}

    ${page.threats ? featureGrid(ctx, {
      eyebrow: 'Threat landscape', heading: page.threats.heading, intro: page.threats.intro,
      items: page.threats.items, variant: 'alternating',
    }) : ''}

    ${page.controlMap?.rows?.length ? controlMapTable(ctx, page.controlMap) : ''}

    ${page.outcomes ? featureGrid(ctx, {
      eyebrow: 'Outcomes', heading: page.outcomes.heading, intro: page.outcomes.intro,
      items: page.outcomes.items, variant: '4up',
    }) : ''}

    ${page.caseStudy ? caseStudyCard(ctx, page.caseStudy) : ''}

    ${page.quote?.items?.length ? testimonial(ctx, { variant: 'slider', ...page.quote }) : ''}

    ${page.faq?.length ? faq(ctx, { heading: page.faqHeading ?? 'Questions we get asked', items: page.faq }) : ''}

    ${dualCta(ctx, page.cta ?? {})}
  `;
}
