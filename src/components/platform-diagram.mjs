// src/components/platform-diagram.mjs — hub-and-spoke "Unified Security &
// Compliance Platform" diagram, drawn as inline SVG.

import { html, raw } from '../lib/html.mjs';

const NAVY = '#0A1A65';
const BLUE = '#48ABE0';
const GLOW = '#7FE3F0';
const MUTED = 'rgba(255,255,255,.66)';
const LINE = 'rgba(255,255,255,.18)';

export function platformDiagram(ctx, opts = {}) {
  const { heading = 'One platform. Every surface.', modules = [], compliance = [] } = opts;

  const hub = (x, y) => `
    <circle cx="${x}" cy="${y}" r="58" fill="${NAVY}" stroke="${BLUE}" stroke-width="2"/>
    <circle cx="${x}" cy="${y}" r="46" fill="none" stroke="${GLOW}" stroke-width="1" opacity=".5"/>
    <text x="${x}" y="${y - 6}" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">Unified</text>
    <text x="${x}" y="${y + 12}" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">Platform</text>`;

  const nodes = modules.length ? modules : ['FWaaS', 'SWG', 'CASB', 'ZTNA'];
  const cx = 330, cy = 130;
  const positions = [
    { x: 150, y: 60 }, { x: 510, y: 60 }, { x: 150, y: 200 }, { x: 510, y: 200 },
  ];
  const nodeSvg = nodes.slice(0, 4).map((n, i) => {
    const p = positions[i];
    return `
      <line class="conn" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="${BLUE}" stroke-width="1.5"/>
      <rect x="${p.x - 52}" y="${p.y - 20}" width="104" height="40" rx="8" fill="rgba(6,16,64,.6)" stroke="${LINE}"/>
      <text x="${p.x}" y="${p.y + 5}" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#fff" text-anchor="middle">${n}</text>`;
  }).join('');

  const complianceRow = compliance.length
    ? compliance.map((c, i) => {
        const x = 40 + i * 72;
        return `<text x="${x}" y="286" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}" text-anchor="middle">${c}</text>`;
      }).join('')
    : ['NIS2', 'CIS', 'ISO 27001', 'NIST', 'MITRE', 'DORA', 'Essential Eight', 'ISAE 3000']
        .map((c, i) => `<text x="${40 + i * 74}" y="286" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}" text-anchor="middle">${c}</text>`)
        .join('');

  return html`<section class="section section--deep">
    <div class="container platform-diagram">
      <div class="section-head section-head--center">
        <p class="eyebrow">The platform</p>
        <h2 class="section__title">${heading}</h2>
      </div>
      ${raw(`<svg viewBox="0 0 660 300" role="img" aria-label="Unified security platform diagram" xmlns="http://www.w3.org/2000/svg">
        <text x="330" y="30" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="${MUTED}" text-anchor="middle">24x7 SOC · DEFENSE IN DEPTH</text>
        ${hub(cx, cy)}
        ${nodeSvg}
        <rect x="20" y="256" width="620" height="1" fill="${LINE}"/>
        ${complianceRow}
      </svg>`)}
      <div class="dual-cta__actions" style="margin-top:var(--space-l)">
        <a class="btn btn--primary"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}">Talk to an Expert</a>
        <a class="btn btn--outline-inverse" href="${ctx.url('products')}">Learn More</a>
      </div>
    </div>
  </section>`;
}
