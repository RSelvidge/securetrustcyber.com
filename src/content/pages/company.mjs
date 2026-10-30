// src/content/pages/company.mjs — 5 company pages.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { prose } from '../../components/prose.mjs';

const about = {
  slug: 'company/about',
  type: 'page',
  title: 'About SecureTrust Cyber',
  metaTitle: 'About SecureTrust Cyber',
  metaDescription: 'SecureTrust Cyber provides expert-managed cybersecurity for small and mid-size medical and dental practices. Founded in Houston in 2018.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'split', eyebrow: 'About us', headline: 'Security built for healthcare practices',
      sub: 'Small and mid-size practices hold the same patient data as hospitals, with a fraction of the IT staff. We built SecureTrust Cyber to close that gap.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
      secondary: { label: 'Contact us', href: 'company/contact' },
    }),
    (ctx) => prose(ctx, {
      eyebrow: 'Who we are', heading: 'Why we focus on practices',
      body: '<p>SecureTrust Cyber delivers cloud firewall, intrusion prevention, zero trust access, data loss prevention, SIEM and managed patching as one platform, run by security specialists. We focus on small and mid-size healthcare practices: dental offices, medical groups and specialty clinics that hold sensitive patient data but rarely have anyone dedicated to protecting it.</p><p>For those practices, the hard part is rarely buying a security tool. It is keeping every safeguard working, month after month, and being able to show it during a HIPAA risk analysis or an insurance renewal. That is the work we take on, so practice owners and their staff can focus on patients.</p>',
    }),
    (ctx) => featureGrid(ctx, {
      variant: 'alternating',
      eyebrow: 'Leadership',
      heading: 'Meet our founder',
      items: [{
        title: 'Richard Selvidge, CISSP, ITIL, President & CEO',
        body: 'Richard has spent more than 25 years securing networks and systems, much of it protecting classified research inside the U.S. Department of Defense. He founded SecureTrust Cyber in Houston in 2018 to bring that same discipline to small businesses and healthcare providers, the organizations most targeted and least defended.',
        bullets: [
          'Senior Cyber Security Engineer at the Air Force Research Laboratory, securing Top Secret programs across 20+ tenant labs and running 20+ concurrent RMF audits',
          'Classified Information Assurance Manager at the U.S. Army DEVCOM Army Research Laboratory and its NIST Cybersecurity Framework subject matter expert',
          'Manager of Information Security, Governance & Compliance at AAA National',
          'Chief Information Security Officer at PurpleSec',
          'Certified Information Systems Security Professional (CISSP) and ITIL certified',
          'Writes the Healthcare Security Pulse and This Week in Cybersecurity newsletters on LinkedIn',
        ],
        image: { src: 'img/team/richard-selvidge.jpg', alt: 'Richard Selvidge, President and CEO of SecureTrust Cyber', width: 768, height: 917, fit: 'contain' },
      }],
    }),
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
  metaDescription: 'Contact the SecureTrust Cyber team for sales or support inquiries.',
  eyebrow: 'Contact',
  intro: 'Tell us a little about what you are trying to secure, and a member of the team will get back to you within one business day.',
  submitLabel: 'Send message',
};

export default [about, press, careers, contact];
