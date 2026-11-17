// src/components/microsegmentation.mjs — FWaaS page: animated microsegmentation scene.
// The 3D scene is drawn by assets/js/ring-hero.js (source: tools/ring-hero/microseg.mjs), which mounts on
// [data-microseg]. Copy and the example policy are server-rendered here so they work without JS.

import { html, join } from '../lib/html.mjs';

const RULES = [
  { key: 'front>pms', text: 'Front desk → Practice management' },
  { key: 'clinical>pms', text: 'Clinical → Practice management' },
  { key: 'clinical>imaging', text: 'Clinical → Imaging' },
  { key: 'guest>internet', text: 'Guest Wi-Fi → Internet only' },
  { key: 'deny', text: 'Everything else: denied by default', deny: true },
];

export function microsegmentation() {
  return html`<section class="microseg" data-microseg aria-labelledby="microseg-title">
    <div class="container microseg__head">
      <div>
        <p class="eyebrow microseg__eyebrow">Microsegmentation</p>
        <h2 class="microseg__title" id="microseg-title">One compromised device. <em>Nowhere to go.</em></h2>
        <p class="microseg__lede">Every device in your practice connects through its own SecureTrust tunnel, and segment policy decides exactly what it can reach. When one device is compromised, lateral movement stops at the policy engine instead of spreading across your network.</p>
        <div class="microseg__stats" aria-hidden="true">
          <div class="microseg__stat"><b data-ms="ok">0</b><span>Allowed by policy</span></div>
          <div class="microseg__stat microseg__stat--bad"><b data-ms="bad">0</b><span>Lateral moves blocked</span></div>
        </div>
      </div>
      <div class="microseg__policy">
        <h3>Segment policy <span>Example</span></h3>
        <ul>${join(RULES.map((r) => html`<li class="${r.deny ? 'is-deny' : ''}" data-rule="${r.key}">${r.text}</li>`))}</ul>
      </div>
    </div>
    <div class="microseg__stage">
      <canvas aria-hidden="true"></canvas>
      <div class="microseg__labels" data-ms="labels"></div>
      <ul class="microseg__log" data-ms="log"></ul>
      <p class="microseg__note">Illustrative simulation, not live data</p>
    </div>
  </section>`;
}
