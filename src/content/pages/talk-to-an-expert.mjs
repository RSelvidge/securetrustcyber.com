// src/content/pages/talk-to-an-expert.mjs — book time with an expert through Microsoft Bookings.

import { hero } from '../../components/hero.mjs';

export default {
  slug: 'talk-to-an-expert',
  type: 'page',
  title: 'Talk to an Expert',
  metaTitle: 'Talk to an Expert | SecureTrust Cyber',
  metaDescription: 'Choose a time to talk with a SecureTrust Cyber security expert using Microsoft Bookings.',
  cta: false,
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered',
      eyebrow: 'See SecureTrust Cyber in action',
      headline: 'Book a meeting with our team',
      sub: 'Choose a time that works for you. Microsoft Bookings will send the meeting details and notifications.',
      primary: { label: 'Choose a meeting time', href: ctx.site.bookingUrl },
    }),
  ],
};
