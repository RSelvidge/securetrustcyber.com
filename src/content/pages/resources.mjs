// src/content/pages/resources.mjs — resources index + sub-pages + trust center.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { prose } from '../../components/prose.mjs';
import { PAGES } from '../../site.registry.mjs';
import { PRODUCTS } from '../products.data.mjs';
import { icon } from '../../lib/icons.mjs';
import { datasheetPath } from '../../lib/datasheets.mjs';

const solutionBriefs = {
  slug: 'resources/solution-briefs',
  type: 'page',
  title: 'Solution Briefs & Data Sheets',
  metaTitle: 'Solution Briefs & Data Sheets | SecureTrust Cyber',
  metaDescription: 'Download the datasheet for every SecureTrust Cyber module: capabilities, deployment and common questions.',
  blocks: [
    (ctx) => hero(ctx, { variant: 'compact', eyebrow: 'Data sheets', headline: 'The technical detail', sub: 'A two-page datasheet for every module in the platform. Download, share with your team, or send to procurement.', primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' } }),
    (ctx) => html`<section class="section"><div class="container">
      <div class="datasheet-grid">${join(PRODUCTS.map((p) => html`
        <article class="datasheet-card">
          <span class="datasheet-card__eyebrow">${p.hero.eyebrow}</span>
          <h3>${p.title}</h3>
          <p>${p.hero.headline}</p>
          <div class="datasheet-card__links">
            <a class="btn btn--navy" href="${ctx.url.asset(datasheetPath(p.slug))}" download>${icon('download')} Datasheet (PDF)</a>
            <a href="${ctx.url(p.slug)}">Product page</a>
          </div>
        </article>`))}</div>
    </div></section>`,
  ],
};

const index = {
  slug: 'resources/index',
  type: 'page',
  title: 'Resources',
  metaTitle: 'Resources and Guides | SecureTrust Cyber',
  metaDescription: 'Whitepapers, customer stories, webinars and guides from SecureTrust Cyber.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Resources', headline: 'Learn, compare, deploy',
      sub: 'Everything you need to evaluate and get the most from the platform.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
    }),
    (ctx) => featureGrid(ctx, {
      heading: 'Explore resources',
      items: [
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
    (ctx) => hero(ctx, { variant: 'compact', eyebrow, headline: heading, sub: body, primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' } }),
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
  list('resources/whitepapers', 'Whitepapers', 'In-depth whitepapers on cybersecurity topics from SecureTrust Cyber.',
    'Whitepapers', 'Research that goes deep', 'In-depth analysis of the threats and frameworks that shape security.'),
  list('resources/customer-stories', 'Customer Stories', 'How customers use SecureTrust Cyber across industries.',
    'Customer stories', 'Real teams, real outcomes', 'See how organizations across sectors secure their estates with SecureTrust Cyber.'),
  solutionBriefs,
  list('resources/webinars', 'Webinars', 'Live and on-demand webinars from SecureTrust Cyber.',
    'Webinars', 'Learn from the experts', 'Live sessions and recordings on security strategy and platform deep dives.'),
  trustCenter,
];
