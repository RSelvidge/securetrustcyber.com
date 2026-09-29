// src/content/pages/company.mjs — 5 company pages.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { metricsBand } from '../../components/metrics-band.mjs';
import { prose } from '../../components/prose.mjs';

const about = {
  slug: 'company/about',
  type: 'page',
  title: 'About SecureTrust Cyber',
  metaTitle: 'About SecureTrust Cyber',
  metaDescription: 'SecureTrust Cyber builds a unified security platform for enterprises and MSPs. Learn who we are.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'split', eyebrow: 'About us', headline: 'One platform. One mission.',
      sub: 'We believe security should close the gaps between tools, not create them. SecureTrust Cyber is built on that conviction.',
      primary: { label: 'Join the team', href: 'company/careers' },
      secondary: { label: 'Contact us', href: 'company/contact' },
    }),
    (ctx) => prose(ctx, {
      eyebrow: 'Who we are', heading: 'Security that closes the gap',
      body: '<p>SecureTrust Cyber unifies email, endpoint, network, identity and data security into a single platform with one agent and one console. We built it because we watched teams patch together a dozen point products — and still leave gaps.</p><p>Our platform correlates telemetry across every layer, so an attack that crosses email, endpoint and identity is seen as one story instead of three disconnected alerts.</p><p>Today we protect more than three million endpoints across thousands of organizations, from mid-sized businesses to critical infrastructure.</p>',
    }),
    (ctx) => metricsBand(ctx, { metrics: [
      { value: '3M+', label: 'endpoints secured' },
      { value: '20,000+', label: 'organizations' },
      { value: '100M+', label: 'attacks prevented' },
    ] }),
  ],
};

const press = {
  slug: 'company/press',
  type: 'page',
  title: 'Press Center',
  metaTitle: 'Press Center | SecureTrust Cyber',
  metaDescription: 'Press releases, announcements and media resources from SecureTrust Cyber.',
  blocks: [
    (ctx) => hero(ctx, { variant: 'centered', eyebrow: 'Press', headline: 'News from SecureTrust Cyber', sub: 'Announcements, research and company news.', primary: { label: 'Contact PR', href: 'company/contact' } }),
  ],
};

const awards = {
  slug: 'company/awards',
  type: 'page',
  title: 'Awards & Accolades',
  metaTitle: 'Awards & Accolades | SecureTrust Cyber',
  metaDescription: 'Industry awards and recognition for SecureTrust Cyber.',
  blocks: [
    (ctx) => hero(ctx, { variant: 'compact', eyebrow: 'Recognition', headline: 'Awards & accolades', sub: 'Recognition from across the security industry.', primary: { label: 'Get a Demo', href: 'request-demo' } }),
    (ctx) => featureGrid(ctx, {
      heading: 'Recent recognition',
      items: [
        { icon: 'award', title: 'G2 Leader 2026', body: 'Recognized as a leader in endpoint security.' },
        { icon: 'award', title: 'Capterra Top Rated', body: 'Top rated by verified customers.' },
        { icon: 'award', title: 'SourceForge Leader', body: 'Spring 2026 category leader.' },
        { icon: 'award', title: 'Gartner Peer Insights', body: 'Customers for mid-market endpoint protection.' },
      ],
      variant: '4up',
    }),
  ],
};

const careers = {
  slug: 'company/careers',
  type: 'page',
  title: 'Careers',
  metaTitle: 'Careers | SecureTrust Cyber',
  metaDescription: 'Join the SecureTrust Cyber team. We are hiring across security research and engineering.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Careers', headline: 'Build security that matters',
      sub: 'We are hiring across security research, engineering and go-to-market.',
      primary: { label: 'View open roles', href: 'company/contact' },
    }),
  ],
};

const contact = {
  slug: 'company/contact',
  type: 'form',
  title: 'Contact Sales',
  metaTitle: 'Contact SecureTrust Cyber',
  metaDescription: 'Contact the SecureTrust Cyber team for sales, support or partnership inquiries.',
  eyebrow: 'Contact',
  intro: 'Tell us a little about what you are trying to secure, and a member of the team will get back to you within one business day.',
  submitLabel: 'Send message',
};

export default [about, press, awards, careers, contact];
