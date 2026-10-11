// src/content/pages/clinicproof.mjs — ClinicProof landing page for dental practices.
// Not in the mega-menu: a campaign/landing page reached by direct link.
// Copy deliberately avoids claiming HIPAA compliance, metrics or customers.

import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { timeline } from '../../components/timeline.mjs';
import { faq } from '../../components/faq.mjs';

export default {
  slug: 'clinicproof',
  type: 'page',
  title: 'ClinicProof for Dental Practices',
  metaTitle: 'ClinicProof: Continuous HIPAA Control Verification for Dental Practices',
  metaDescription: 'ClinicProof continuously checks the security controls your dental practice relies on and keeps the evidence ready for a HIPAA review.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'split',
      eyebrow: 'ClinicProof for dental practices',
      headline: 'Know your controls work, not just that they exist',
      sub: 'ClinicProof checks the safeguards your practice depends on, week after week, and keeps the proof organized so a HIPAA review never catches you guessing.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
      secondary: { label: 'See the platform', href: 'products' },
      media: 'ClinicProof',
      chips: ['Small independent practices', 'HIPAA Security Rule', 'No IT team required'],
    }),

    (ctx) => featureGrid(ctx, {
      eyebrow: 'The problem',
      heading: 'A yearly checklist goes stale the day after you sign it',
      intro: 'Most practices prove their security once a year, if at all. In between, a workstation misses updates, a new hire gets too much access, and a backup quietly stops running.',
      variant: '3up',
      items: [
        { icon: 'clock', title: 'Point-in-time paperwork', body: 'A risk assessment describes one moment. It cannot tell you whether the safeguards are still working today.' },
        { icon: 'users', title: 'No one owns it', body: 'In a small practice the office manager or the dentist is also the IT department, with no time to re-check every control.' },
        { icon: 'file', title: 'Evidence scattered everywhere', body: 'When a reviewer asks for proof, it lives in emails, screenshots and someone’s memory.' },
      ],
    }),

    (ctx) => featureGrid(ctx, {
      eyebrow: 'What ClinicProof does',
      heading: 'Continuous Control Verification',
      intro: 'Instead of a one-off report, ClinicProof keeps checking a defined set of controls and records the result.',
      variant: '4up',
      items: [
        { icon: 'shield', title: '50 controls, checked', body: 'A defined methodology of 50 controls drawn from the HIPAA Security Rule, each marked verified, needs attention, or documented as not applicable.' },
        { icon: 'laptop', title: 'Workstation evidence', body: 'Technical checks on practice computers feed the controls that depend on them, so results come from the machines, not from memory.' },
        { icon: 'chart', title: 'Plain-English results', body: 'See which controls pass, which need attention, and what to do next, without security jargon.' },
        { icon: 'file', title: 'Evidence kept ready', body: 'Every check is recorded and dated, so the proof is already assembled when someone asks.' },
      ],
    }),

    (ctx) => timeline(ctx, {
      eyebrow: 'How it works',
      heading: 'From first conversation to ongoing proof',
      steps: [
        { title: 'Scope your practice', body: 'We learn how many locations, computers and staff you have, and which systems hold patient information.' },
        { title: 'Verify the controls', body: 'ClinicProof checks the 50 controls, using technical evidence from your workstations where a control depends on it.' },
        { title: 'Fix what fails', body: 'You get a short, prioritized list in plain language, so the gaps that matter most get closed first.' },
        { title: 'Keep the proof current', body: 'Controls are re-checked on an ongoing basis, and results stay dated and organized for any review.' },
      ],
    }),

    (ctx) => featureGrid(ctx, {
      eyebrow: 'What gets covered',
      heading: 'Five areas of the HIPAA Security Rule',
      intro: 'The 50 controls are grouped so you can see where your practice is strong and where it needs work.',
      variant: '3up',
      items: [
        { icon: 'users', title: 'Administrative (23)', body: 'Risk analysis, access management, staff training, incident response and contingency planning.' },
        { icon: 'building', title: 'Physical (10)', body: 'Who can get to the office, the workstations and the equipment that hold patient information.' },
        { icon: 'lock', title: 'Technical (9)', body: 'Access control, audit logging, integrity and transmission security on the systems themselves.' },
        { icon: 'scale', title: 'Organizational (4)', body: 'Agreements and responsibilities with the vendors and partners who touch patient information.' },
        { icon: 'file', title: 'Documentation (4)', body: 'The policies and records that show what you do and when you last reviewed it.' },
      ],
    }),

    (ctx) => faq(ctx, {
      heading: 'Questions dental practices ask',
      items: [
        { q: 'Does ClinicProof make us HIPAA compliant?', a: 'No tool can declare that for you. ClinicProof verifies specific controls and keeps dated evidence of the results. Compliance also depends on your policies, training and decisions, and a qualified professional should review your overall position.' },
        { q: 'We are a small practice. Is this overkill?', a: 'It is built for small independent practices. The checks run in the background, and the results are written for an office manager, not a security engineer.' },
        { q: 'Do we need an IT team?', a: 'No. You do not need in-house IT to use it, and we explain every failed control in plain language.' },
        { q: 'Does it replace a HIPAA risk assessment?', a: 'No. It supports one by showing, with evidence, whether the controls you rely on are working right now.' },
        { q: 'Is it available now?', a: 'ClinicProof is being built with early dental practices. Talk to an expert to learn where it stands and whether your practice is a fit.' },
      ],
    }),
  ],
  cta: {
    heading: 'See where your practice stands',
    body: 'Talk to an expert about verifying the controls your dental practice depends on.',
    secondary: { label: 'Explore the platform', href: 'products' },
  },
};
