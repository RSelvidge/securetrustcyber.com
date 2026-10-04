// src/components/platform-diagram.mjs: the whole platform. The hero visual is
// the illustrated office (office-scene.mjs) with the Zero Trust tunnel rising to
// the cloud; Security Operations sits under it, compliance frameworks at the foot.

import { html, join } from '../lib/html.mjs';
import { officeScene } from './office-scene.mjs';

const OPERATIONS = [
  ['products/siem', 'SIEM Platform', '24x7 detection, investigation and compliance reporting'],
  ['products/patch-management', 'Managed Patch Management', 'Automated, technician-backed remediation'],
];
const COMPLIANCE = ['HIPAA', 'PCI DSS', 'ISO 27001', 'NIST CSF', 'CIS Controls', 'SOC 2', 'CMMC', 'FFIEC', 'NIS2', 'GDPR'];

export function platformDiagram(ctx, opts = {}) {
  const { heading = 'One platform. Every surface.', light = true, scene = '', intro } = opts;
  return html`<section class="section ${light ? 'section--muted platform platform--light' : 'section--deep platform'}">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">The platform</p>
        <h2 class="section__title">${heading}</h2>
        <p class="section__intro">${intro ?? 'Every user and every device gets its own Zero Trust tunnel, so nothing shares a path and nothing moves sideways. That is microsegmentation. Each tunnel passes through the same controls: network security on the way in, zero trust and data protection on the way to your apps, with security operations watching all of it.'}</p>
      </div>
    </div>
    ${officeScene(ctx, { light, scene })}
    <div class="container">
      <div class="platform__ops">
        <p class="platform__ops-title">Security operations</p>
        <div class="platform__ops-grid">
          ${join(OPERATIONS.map(([slug, title, body]) => html`<a class="platform__op" href="${ctx.url(slug)}"><strong>${title}</strong><span>${body}</span></a>`))}
        </div>
      </div>

      <p class="platform__console">One console &middot; one policy engine &middot; compliance evidence built in</p>
      <ul class="platform__compliance" role="list" aria-label="Compliance frameworks supported">
        ${join(COMPLIANCE.map((c) => html`<li>${c}</li>`))}
      </ul>

      <div class="dual-cta__actions" style="margin-top:var(--space-l);justify-content:center">
        <a class="btn btn--primary"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}">Talk to an Expert</a>
        <a class="btn ${light ? 'btn--ghost' : 'btn--outline-inverse'}" href="${ctx.url('products')}">Explore the platform</a>
      </div>
    </div>
  </section>`;
}