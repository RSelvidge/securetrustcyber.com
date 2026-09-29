// src/templates/styleguide.mjs — living style guide, generated from the same
// tokens and components as the site. noindex, excluded from sitemap.

import { html, join, raw } from '../lib/html.mjs';
import { icon, iconNames } from '../lib/icons.mjs';

const COLORS = [
  ['--navy-900', '#061040'], ['--navy-800', '#0A1A65'], ['--navy-700', '#10103B'],
  ['--navy-600', '#1B2E86'], ['--blue-500', '#48ABE0'], ['--blue-400', '#6CC0EA'],
  ['--blue-600', '#2E86B8'], ['--glow', '#7FE3F0'], ['--slate-050', '#F6F8FC'],
  ['--slate-100', '#EDF1F8'], ['--slate-200', '#DCE3F0'], ['--slate-300', '#C3CDE4'],
  ['--slate-400', '#8C99B8'], ['--slate-600', '#4A5878'], ['--slate-800', '#1D2440'],
];

const STEPS = ['--step-6', '--step-5', '--step-4', '--step-3', '--step-2', '--step-1', '--step-0', '--step--1', '--step--2'];

const SPACES = ['--space-3xs', '--space-2xs', '--space-xs', '--space-s', '--space-m', '--space-l', '--space-xl', '--space-2xl', '--space-3xl', '--space-4xl'];

export default function styleguide(ctx, page) {
  return html`
    <section class="section">
      <div class="container">
        <h1 class="section__title">Design system</h1>
        <p class="section__intro">Generated from the site's own tokens and components.</p>

        <h2 style="margin:var(--space-2xl) 0 var(--space-m)">Color tokens</h2>
        <div class="grid grid--4">
          ${join(COLORS.map(([name, hex]) => html`
            <div class="swatch">
              <div class="swatch__chip" style="background:${hex}"></div>
              <div class="swatch__meta"><strong>${name}</strong><code>${hex}</code></div>
            </div>`))}
        </div>

        <h2 style="margin:var(--space-2xl) 0 var(--space-m)">Type scale</h2>
        ${join(STEPS.map((s) => html`
          <div class="type-spec">
            <div class="type-spec__label">${s}</div>
            <div style="font-size:var(${s});font-family:var(--font-display);font-weight:700;line-height:1.2">SecureTrust Cyber</div>
          </div>`))}

        <h2 style="margin:var(--space-2xl) 0 var(--space-m)">Spacing scale</h2>
        ${join(SPACES.map((s) => html`
          <div class="space-spec"><span class="space-spec__label">${s}</span><span class="space-spec__bar" style="width:var(${s})"></span></div>`))}

        <h2 style="margin:var(--space-2xl) 0 var(--space-m)">Buttons</h2>
        <div class="cluster">
          <button type="button" class="btn btn--primary">Primary</button>
          <button type="button" class="btn btn--navy">Navy</button>
          <button type="button" class="btn btn--ghost">Ghost</button>
          <button type="button" class="btn btn--inverse">Inverse</button>
          <button type="button" class="btn btn--outline-inverse">Outline inverse</button>
          <button type="button" class="btn btn--primary btn--lg">Large</button>
        </div>

        <h2 style="margin:var(--space-2xl) 0 var(--space-m)">Icons</h2>
        <div class="cluster">
          ${join(iconNames.map((n) => html`<span title="${n}" style="color:var(--color-link);width:2rem;height:2rem;display:inline-grid;place-items:center">${icon(n)}</span>`))}
        </div>
      </div>
    </section>`;
}
