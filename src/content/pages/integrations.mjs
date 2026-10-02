// src/content/pages/integrations.mjs — 6 integration pages (generic template).

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { prose } from '../../components/prose.mjs';

const integration = (i) => ({
  slug: `integrations/${i.slug}`,
  type: 'page',
  title: i.title,
  metaTitle: `${i.title} Integration | SecureTrust Cyber`,
  metaDescription: i.meta,
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Integration', headline: i.title,
      sub: i.sub,
      primary: { label: 'Talk to an Expert', href: 'request-demo' },
      secondary: { label: 'All integrations', href: 'integrations/api-integrations' },
    }),
    (ctx) => prose(ctx, { heading: i.h2, body: i.body }),
    (ctx) => html`<section class="section"><div class="container container--m">
      <h2 style="font-size:var(--step-2);margin-bottom:var(--space-s)">What the integration does</h2>
      <div class="grid grid--3">
        ${join(i.features.map((f) => html`
          <div class="feature-card reveal"><h3>${f.title}</h3><p>${f.body}</p></div>`))}
      </div>
    </div></section>`,
  ],
});

export default [
  integration({
    slug: 'api-integrations', title: 'All API Integrations',
    meta: 'Connect SecureTrust Cyber to your stack with a comprehensive REST API.',
    sub: 'A comprehensive REST API that connects SecureTrust Cyber to your PSA, RMM, SIEM and automation.',
    h2: 'One API, your whole stack', body: '<p>SecureTrust Cyber exposes a REST API for assets, alerts, tickets and actions. Build the integrations your workflow needs, or use our native connectors for the tools you already run.</p><p>Every endpoint is authenticated and rate-limited, and every call is logged for audit.</p>',
    features: [
      { title: 'Assets & inventory', body: 'Pull devices, software and posture into your systems of record.' },
      { title: 'Alerts & events', body: 'Stream security events into your SIEM or ticketing.' },
      { title: 'Actions', body: 'Trigger remediation and containment programmatically.' },
      { title: 'Reporting', body: 'Export compliance and coverage data for your reports.' },
    ],
  }),
  integration({
    slug: 'connectwise-rmm', title: 'ConnectWise RMM',
    meta: 'Sync assets and alerts between SecureTrust Cyber and ConnectWise RMM.',
    sub: 'Sync assets and security alerts between SecureTrust Cyber and ConnectWise RMM.',
    h2: 'Security inside your RMM', body: '<p>The ConnectWise RMM integration keeps your managed devices and their security posture in sync. Alerts from SecureTrust Cyber flow into your RMM workflow automatically.</p>',
    features: [
      { title: 'Asset sync', body: 'Devices managed in RMM appear in SecureTrust automatically.' },
      { title: 'Alert routing', body: 'Security events create RMM alerts and tickets.' },
      { title: 'Single agent', body: 'One agent covers management and security.' },
    ],
  }),
  integration({
    slug: 'autotask-psa', title: 'Autotask PSA',
    meta: 'Push security alerts from SecureTrust Cyber into Autotask PSA tickets.',
    sub: 'Push security alerts and incidents from SecureTrust Cyber straight into Autotask PSA tickets.',
    h2: 'Security in your ticket queue', body: '<p>The Autotask PSA integration turns security events into tickets in the system your team already lives in, so nothing is missed between tools.</p>',
    features: [
      { title: 'Ticket creation', body: 'Alerts become Autotask tickets automatically.' },
      { title: 'Bidirectional sync', body: 'Status changes flow back into SecureTrust.' },
      { title: 'SLA mapping', body: 'Prioritize by severity into your existing SLAs.' },
    ],
  }),
  integration({
    slug: 'halopsa', title: 'HaloPSA',
    meta: 'Bidirectional ticket sync between SecureTrust Cyber and HaloPSA.',
    sub: 'Bidirectional ticket sync between SecureTrust Cyber and HaloPSA.',
    h2: 'Two systems, one queue', body: '<p>The HaloPSA integration keeps security incidents and service tickets in sync, so your team works from one place.</p>',
    features: [
      { title: 'Bidirectional sync', body: 'Tickets and alerts stay in sync both ways.' },
      { title: 'Asset mapping', body: 'Map HaloPSA assets to SecureTrust devices.' },
      { title: 'Automation', body: 'Trigger actions from HaloPSA workflows.' },
    ],
  }),
  integration({
    slug: 'cisco-meraki', title: 'Cisco Meraki Firewall',
    meta: 'Extend SecureTrust Cyber DNS protection to your Cisco Meraki firewall.',
    sub: 'Extend SecureTrust Cyber protection to your Cisco Meraki firewall estate.',
    h2: 'DNS protection at the network edge', body: '<p>The Cisco Meraki integration extends SecureTrust Cyber DNS filtering to your firewall, giving network-wide protection with the visibility of the platform.</p>',
    features: [
      { title: 'DNS policy sync', body: 'Apply DNS filtering policy across Meraki.' },
      { title: 'Unified visibility', body: 'See firewall and DNS events together.' },
      { title: 'One policy', body: 'Manage network security from one console.' },
    ],
  }),
  integration({
    slug: 'palo-alto', title: 'Palo Alto',
    meta: 'Coordinate SecureTrust Cyber with Palo Alto next-generation firewalls.',
    sub: 'Coordinate SecureTrust Cyber with Palo Alto next-generation firewalls.',
    h2: 'Defense in depth with your NGFW', body: '<p>The Palo Alto integration lets SecureTrust Cyber and your NGFW share threat intelligence and coordinate response across network and endpoint.</p>',
    features: [
      { title: 'Threat intel sharing', body: 'Share indicators between platform and firewall.' },
      { title: 'Coordinated response', body: 'Block at the firewall from an endpoint alert.' },
      { title: 'Unified policy', body: 'Consistent rules across layers.' },
    ],
  }),
];
