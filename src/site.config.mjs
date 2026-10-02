// src/site.config.mjs — brand, legal identity, and site-wide copy.
// The single place to change the company name, address, or CTAs.

import { raw } from './lib/html.mjs';

export const SITE = {
  name: 'SecureTrust Cyber',
  shortName: 'SecureTrust',
  legalName: 'SecureTrust Cyber',
  tagline: 'One Platform. Total Security.',
  description:
    'A converged cloud platform for network, zero trust, cloud, data and AI security, ' +
    'with SIEM and managed patch. One platform, total security.',

  // The live domain.
  origin: 'https://securetrustcyber.com',
  bookingUrl: 'https://bookings.cloud.microsoft/bookwithme/user/20566259f3624bc19b31984aa6bd3d05@securetrust.io/meetingtype/2wj5NMEGaUC1HXxVo9IWUA2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile',

  // Address is placeholder copy — replace before going live.
  address: 'Replace with your registered address',
  vat: 'VAT: replace',
  email: 'hello@securetrustcyber.com',
  phone: 'Replace with your phone number',

  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { name: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
    { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { name: 'X', href: 'https://x.com/', icon: 'x' },
  ],

  // Global CTA labels, referenced by every template so copy stays consistent.
  cta: {
    demo: 'Get a Demo',
    pricing: 'Get Pricing',
    trial: 'Book a Demo',
    contact: 'Contact Sales',
  },

  // Placeholder statistics — replace with real figures before going live.
  stats: {
    capabilities: '10',
    threatFeeds: '250+',
    dataTypes: '350+',
    categories: '80+',
  },
};

// The wordmark as inline SVG — used by header (dark) and footer (inverse).
// A simple shield + wordmark lockup, drawn in brand colors, currentColor-aware.
export const LOGO_SVG = raw(`
<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="stc-mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#48ABE0"/><stop offset="1" stop-color="#0A1A65"/>
    </linearGradient>
  </defs>
  <path fill="url(#stc-mark)" d="M16 2 L28 6.5 V15 C28 23.5 22.5 29 16 30 C9.5 29 4 23.5 4 15 V6.5 Z"/>
  <path fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
        d="M10.5 15.5 L14 19 L21.5 11"/>
</svg>`);

export const WORDMARK = 'SecureTrust';
