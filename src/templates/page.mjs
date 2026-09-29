// src/templates/page.mjs — generic template for landing, company, legal,
// resource, partner, integration, and solutions pages. Renders an optional
// breadcrumb, a block stack (functions called with ctx), and a closing CTA.

import { html } from '../lib/html.mjs';
import { blocks } from '../lib/blocks.mjs';
import { breadcrumbs } from '../components/breadcrumbs.mjs';
import { dualCta } from '../components/dual-cta.mjs';

export default function page(ctx, page) {
  return html`
    ${page.breadcrumbs === false ? '' : breadcrumbs(ctx, page)}
    ${blocks(ctx, page.blocks)}
    ${page.cta === false ? '' : dualCta(ctx, page.cta ?? {})}
  `;
}
