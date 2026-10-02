// src/content/pages/resources.mjs — resources index + sub-pages + trust center.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { prose } from '../../components/prose.mjs';
import { PAGES } from '../../site.registry.mjs';

const index = {
  slug: 'resources/index',
  type: 'page',
  title: 'Resources',
  metaTitle: 'Resources, Demos and Guides | SecureTrust Cyber',
  metaDescription: 'Product demos, whitepapers, customer stories, webinars and guides from SecureTrust Cyber.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Resources', headline: 'Learn, compare, deploy',
      sub: 'Everything you need to evaluate and get the most from the platform.',
      primary: { label: 'Talk to an Expert', href: 'request-demo' },
    }),
    (ctx) => featureGrid(ctx, {
      heading: 'Explore resources',
      items: [
        { icon: 'play', title: 'Product demos', body: 'See the platform in action, module by module.', href: 'resources/demos' },
        { icon: 'file', title: 'Whitepapers', body: 'In-depth research on the threats that matter.', href: 'resources/whitepapers' },
        { icon: 'users', title: 'Customer stories', body: 'How teams like yours use SecureTrust Cyber.', href: 'resources/customer-stories' },
        { icon: 'file', title: 'Solution briefs', body: 'The technical detail on every module.', href: 'resources/solution-briefs' },
        { icon: 'play', title: 'Webinars', body: 'Live and on-demand sessions with our experts.', href: 'resources/webinars' },
        { icon: 'shield', title: 'Trust center', body: 'Security, privacy and compliance at SecureTrust.', href: 'trust-center' },
      ],
      variant: '3up',
    }),
  ],
};

const list = (slug, title, meta, eyebrow, heading, body) => ({
  slug,
  type: 'page',
  title,
  metaTitle: `${title} | SecureTrust Cyber`,
  metaDescription: meta,
  blocks: [
    (ctx) => hero(ctx, { variant: 'compact', eyebrow, headline: heading, sub: body, primary: { label: 'Talk to an Expert', href: 'request-demo' } }),
  ],
});

const trustCenter = {
  slug: 'trust-center',
  type: 'page',
  title: 'Trust Center',
  metaTitle: 'Trust Center | SecureTrust Cyber',
  metaDescription: 'Security, privacy and compliance practices at SecureTrust Cyber.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Trust Center', headline: 'Security we hold ourselves to',
      sub: 'How SecureTrust Cyber protects its own platform and your data.',
      primary: { label: 'Contact us', href: 'company/contact' },
    }),
    (ctx) => featureGrid(ctx, {
      heading: 'Our commitments',
      items: [
        { icon: 'shield', title: 'Security by design', body: 'The platform is built on secure defaults, from encryption to least privilege.' },
        { icon: 'lock', title: 'Data protection', body: 'Your data is encrypted in transit and at rest, and we are transparent about what we collect.' },
        { icon: 'scale', title: 'Compliance', body: 'We align to ISO 27001 and support your compliance with our control maps.' },
        { icon: 'file', title: 'Privacy', body: 'Read our privacy policy to understand exactly how data is handled.' },
      ],
      variant: '4up',
    }),
  ],
};

export default [
  index,
  list('resources/demos', 'Product Demos', 'Watch product demos of the SecureTrust Cyber platform.',
    'Demos', 'See the platform in action', 'Watch guided demos of each module and the unified platform.'),
  list('resources/whitepapers', 'Whitepapers', 'In-depth whitepapers on cybersecurity topics from SecureTrust Cyber.',
    'Whitepapers', 'Research that goes deep', 'In-depth analysis of the threats and frameworks that shape security.'),
  list('resources/customer-stories', 'Customer Stories', 'How customers use SecureTrust Cyber across industries.',
    'Customer stories', 'Real teams, real outcomes', 'See how organizations across sectors secure their estates with SecureTrust Cyber.'),
  list('resources/solution-briefs', 'Solution Briefs & Data Sheets', 'Technical briefs and data sheets for every SecureTrust Cyber module.',
    'Solution briefs', 'The technical detail', 'Specifications and capabilities for every module in the platform.'),
  list('resources/webinars', 'Webinars', 'Live and on-demand webinars from SecureTrust Cyber.',
    'Webinars', 'Learn from the experts', 'Live sessions and recordings on security strategy and platform deep dives.'),
  trustCenter,
];
