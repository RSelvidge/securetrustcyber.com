// src/content/pages/partners.mjs — 3 partner pages.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { timeline } from '../../components/timeline.mjs';
import { metricsBand } from '../../components/metrics-band.mjs';

const overview = {
  slug: 'partners/index',
  type: 'page',
  title: 'Partner Overview',
  metaTitle: 'Partner with SecureTrust Cyber',
  metaDescription: 'Grow your MSP or MSSP with the SecureTrust Cyber unified security platform and a partner program built for you.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'split', eyebrow: 'Partners', headline: 'Grow with the platform your clients need',
      sub: 'A unified security platform and a partner program designed to help MSPs and MSSPs win, deploy and retain.',
      primary: { label: 'Become a partner', href: 'partners/become-a-partner' },
      secondary: { label: 'Partner portal', href: 'partners/partner-portal' },
    }),
    (ctx) => featureGrid(ctx, {
      eyebrow: 'Why partner with us', heading: 'Built for your business model',
      items: [
        { icon: 'chart', title: 'Recurring revenue', body: 'Sell security as a service with predictable, recurring margins.' },
        { icon: 'grid', title: 'One platform to manage', body: 'Email, endpoint, network and identity in a single multi-tenant console.' },
        { icon: 'bolt', title: 'PSA & RMM integrations', body: 'Native integrations for ConnectWise, Autotask and HaloPSA.' },
        { icon: 'users', title: 'Partner support', body: 'Dedicated partner managers and pre-sales engineering.' },
      ],
    }),
    (ctx) => metricsBand(ctx, { metrics: [
      { value: '1,500+', label: 'channel partners' },
      { value: '20,000+', label: 'organizations protected' },
      { value: '4.8/5', label: 'partner satisfaction' },
    ] }),
  ],
};

const become = {
  slug: 'partners/become-a-partner',
  type: 'page',
  title: 'Become a Channel Partner',
  metaTitle: 'Become a Channel Partner | SecureTrust Cyber',
  metaDescription: 'Join the SecureTrust Cyber partner program and grow your MSP with a unified security platform.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Channel partners', headline: 'Become a partner',
      sub: 'Join a program built to help you win deals and grow recurring revenue.',
      primary: { label: 'Apply now', href: 'company/contact' },
    }),
    (ctx) => timeline(ctx, {
      eyebrow: 'How it works', heading: 'From sign-up to first customer',
      steps: [
        { title: 'Apply', body: 'Tell us about your practice and the clients you serve.' },
        { title: 'Onboard', body: 'Get access to the platform, training and a partner manager.' },
        { title: 'Sell', body: 'Use our sales enablement and pre-sales engineering to win.' },
        { title: 'Grow', body: 'Scale with multi-tenant management and recurring revenue.' },
      ],
    }),
  ],
};

const portal = {
  slug: 'partners/partner-portal',
  type: 'page',
  title: 'Partner Portal',
  metaTitle: 'Partner Portal | SecureTrust Cyber',
  metaDescription: 'Log in to the SecureTrust Cyber partner portal to manage your clients and platform.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'compact', eyebrow: 'Partners', headline: 'Partner portal login',
      sub: 'Manage your clients, licensing and platform from the partner portal.',
      primary: { label: 'Log in', href: 'company/contact' },
    }),
  ],
};

export default [overview, become, portal];
