// src/content/pages/legal.mjs — 4 legal pages. Bodies are placeholders to be
// reviewed and finalized before any real deployment.

import { hero } from '../../components/hero.mjs';
import { prose } from '../../components/prose.mjs';

const legal = (slug, title, body) => ({
  slug,
  type: 'page',
  title,
  metaTitle: `${title} | SecureTrust Cyber`,
  metaDescription: `${title} for SecureTrust Cyber, covering how we handle your data and govern use of our services.`,
  cta: false,
  blocks: [
    (ctx) => hero(ctx, { variant: 'compact', eyebrow: 'Legal', headline: title, sub: 'Last updated: September 2026.' }),
    (ctx) => prose(ctx, { heading: title, body }),
  ],
});

export default [
  legal('legal/privacy-policy', 'Privacy Policy',
    '<p>This Privacy Policy describes how SecureTrust Cyber collects, uses and protects personal data. This is placeholder text pending legal review and must be finalized before any real deployment.</p><p>We collect only the data needed to provide and improve our services, and we protect it in accordance with applicable data protection law.</p>'),
  legal('legal/cookie-policy', 'Cookie Policy',
    '<p>This Cookie Policy describes how the SecureTrust Cyber website uses cookies. Placeholder text pending legal review.</p><p>We use cookies to provide core site functionality and to understand how visitors use our site.</p>'),
  legal('legal/license-agreement', 'License Agreement',
    '<p>This License Agreement governs your use of SecureTrust Cyber software and services. Placeholder text pending legal review.</p><p>By using the platform, you agree to the terms set out in your subscription agreement.</p>'),
  legal('legal/terms-of-service', 'Terms of Service',
    '<p>These Terms of Service govern access to and use of the SecureTrust Cyber website and platform. Placeholder text pending legal review.</p><p>Please read these terms carefully before using our services.</p>'),
];
