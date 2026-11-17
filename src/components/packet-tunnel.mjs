// src/components/packet-tunnel.mjs — All Products page: the packet tunnel. Copy is server-rendered here; the 3D scene is
// drawn by assets/js/ring-hero.js (source: tools/ring-hero/tunnel.mjs), which mounts on [data-packet-tunnel].

import { html } from '../lib/html.mjs';

export function packetTunnel(ctx) {
  return html`<section class="packet-tunnel" data-packet-tunnel aria-labelledby="packet-tunnel-title">
    <div class="container packet-tunnel__head">
      <div>
        <p class="eyebrow packet-tunnel__eyebrow">Inside the tunnel</p>
        <h2 class="packet-tunnel__title" id="packet-tunnel-title">Every packet inspected. <em>Every threat stopped where it’s caught.</em></h2>
        <p class="packet-tunnel__lede">Traffic from every user and device runs through its own SecureTrust tunnel. Clean traffic flows straight through. Each threat is stopped by the product built to catch it.</p>
        <p class="packet-tunnel__legend"><span>Clean traffic</span><span class="is-bad">Threat</span></p>
      </div>
      <div class="packet-tunnel__stats" aria-hidden="true">
        <div><b data-pt="ok">0</b><span>Delivered</span></div>
        <div class="is-bad"><b data-pt="bad">0</b><span>Stopped</span></div>
      </div>
    </div>
    <div class="packet-tunnel__stage">
      <canvas aria-hidden="true"></canvas>
      <div class="packet-tunnel__labels" data-pt="labels"></div>
      <ul class="packet-tunnel__log" data-pt="log"></ul>
      <p class="packet-tunnel__note">Illustrative simulation, not live data</p>
    </div>
    <script src="${ctx.url.asset('js/ring-hero.js')}" defer></script>
  </section>`;
}
