// src/content/pages/request-demo.mjs — book a demo through Microsoft Bookings.

import { hero } from '../../components/hero.mjs';

export default {
  slug: 'request-demo',
  type: 'page',
  title: 'Book a Demo',
  metaTitle: 'Book a Demo | SecureTrust Cyber',
  metaDescription: 'Choose a time for a SecureTrust Cyber demo using Microsoft Bookings.',
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
