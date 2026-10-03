// src/content/competitors.data.mjs — 10 SASE/SSE comparison definitions.
// SecureTrust Cyber is a converged SASE/SSE + SIEM + managed patch platform, so
// the fair comparison is against the SASE/SSE market, not EDR vendors.
// NOTE: capability claims are illustrative and must be reviewed/substantiated
// before any commercial publication (see plan §Risks, gate 13).

const CAPABILITIES = [
  'Firewall-as-a-Service', 'Intrusion Prevention System', 'DNS Security',
  'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention',
  'AI Security for End Users', 'SIEM Platform', 'Managed Patch Management',
];

const buildCompetitor = (c) => ({
  slug: `compare/${c.slug}`,
  type: 'competitor',
  title: `SecureTrust Cyber vs ${c.name}`,
  category: c.slug,
  metaTitle: `SecureTrust Cyber vs ${c.name} | SASE Comparison`,
  metaDescription: c.meta,
  claimsReviewed: '2026-09-29',
  hero: {
    variant: 'split',
    eyebrow: 'How do they compare?',
    headline: `SecureTrust Cyber vs ${c.name}`,
    sub: c.heroSub,
    primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
    secondary: { label: 'Compare more', href: 'solutions' },
    media: c.name,
  },
  framing: c.framing,
  painPoints: c.painPoints,
  diffHeading: `Three reasons teams choose SecureTrust Cyber over ${c.name}`,
  differentiators: c.differentiators,
  migration: c.migration,
  us: 'SecureTrust Cyber',
  them: c.name,
  table: {
    title: `SecureTrust Cyber vs ${c.name} 2026`,
    rows: CAPABILITIES.map((cap) => ({ capability: cap, us: true, them: c.themHas.includes(cap) })),
  },
  faq: c.faq,
  cta: { heading: 'See the difference for yourself', body: 'A 30-minute conversation with an expert about your own environment.' },
});

// Shared pain points: the recurring gaps across the SASE/SSE market.
const sharedPain = (name) => [
  { icon: 'grid', title: 'Security ops are separate', body: `${name} stops at secure access. SIEM, vulnerability management and patching are still separate products from separate vendors.` },
  { icon: 'layers', title: 'Point products, not a platform', body: 'You stitch together SWG, CASB, ZTNA and DLP from different modules, each with its own console and policy.' },
  { icon: 'zap', title: 'Shadow AI is an afterthought', body: 'AI Security for End Users is missing or bolted on, leaving GenAI usage ungoverned.' },
  { icon: 'chart', title: 'Add-on pricing', body: 'Core capabilities are gated behind tiers and add-ons, so the price climbs as you turn features on.' },
];

export const COMPETITORS = [
  buildCompetitor({
    slug: 'vs-zscaler', name: 'Zscaler',
    meta: 'A fair comparison of SecureTrust Cyber and Zscaler: coverage, security operations and total cost.',
    heroSub: 'Zscaler leads the SSE market. But it stops at secure access. Security operations are a separate problem you still have to solve.',
    framing: 'Zscaler is a serious platform and the market leader for a reason. The question for many teams is whether secure access is enough, or whether they want detection, compliance and patching in the same platform.',
    painPoints: sharedPain('Zscaler'),
    differentiators: [
      { n: 1, title: 'SSE plus security operations', body: 'SecureTrust Cyber adds SIEM, vulnerability detection and managed patch to the full secure-access stack, one platform instead of SSE plus a separate SOC toolchain.' },
      { n: 2, title: 'One policy, one console', body: 'Network, zero trust, cloud and data policy live in a single pane, not spread across Zscaler and the tools that surround it.' },
      { n: 3, title: 'AI security built in', body: 'Shadow AI discovery and guardrails are native, so GenAI usage is governed from day one.' },
    ],
    migration: { heading: 'Consolidating around a full platform?', body: 'Keep secure access and add the operations layer, without running a second stack.' },
    themHas: ['DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Does SecureTrust Cyber replace Zscaler?', a: 'For teams that want secure access plus SIEM, vulnerability management and patching in one platform, yes.' },
      { q: 'How do the costs compare?', a: 'Consolidating SSE and security operations usually lowers total cost; the figure depends on your stack.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-netskope', name: 'Netskope',
    meta: 'A fair comparison of SecureTrust Cyber and Netskope: CASB leadership vs full-platform coverage.',
    heroSub: 'Netskope is a CASB-first SSE vendor. The question is whether cloud app control alone covers your network and operations too.',
    framing: 'Netskope does CASB and DLP very well. But a CASB-first platform leaves the network security and security operations layers to other vendors.',
    painPoints: sharedPain('Netskope'),
    differentiators: [
      { n: 1, title: 'The full network stack', body: 'Where Netskope focuses on cloud apps, SecureTrust Cyber adds FWaaS, IPS and DNS Security for the whole network.' },
      { n: 2, title: 'Security operations included', body: 'SIEM and managed patch come with the platform, rather than as a separate purchase.' },
      { n: 3, title: 'One console for everything', body: 'Network, cloud, data and operations in a single pane, not CASB plus a pile of integrations.' },
    ],
    migration: { heading: 'Moving from a CASB-first approach?', body: 'Get cloud app governance plus the rest of the stack in one platform.' },
    themHas: ['Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Is your CASB as strong as Netskope?', a: 'We match core CASB capabilities and add network security and operations that a CASB-first platform does not include.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-palo-alto-prisma', name: 'Palo Alto Prisma SASE',
    meta: 'A fair comparison of SecureTrust Cyber and Palo Alto Prisma SASE across coverage and operations.',
    heroSub: 'Prisma SASE brings Palo Alto’s firewall to the cloud. But detection, compliance and patching still live in separate products.',
    framing: 'Prisma SASE is a strong choice if you are already deep in the Palo Alto ecosystem. The trade-off is that security operations live in Cortex and other products, not in the SASE platform itself.',
    painPoints: [
      { icon: 'layers', title: 'Operations are separate', body: 'Detection lives in Cortex, patching elsewhere, so you are still running a multi-product stack.' },
      { icon: 'grid', title: 'Ecosystem lock-in', body: 'The value is greatest if you standardize on Palo Alto across firewall, SASE and XDR.' },
      { icon: 'chart', title: 'Enterprise complexity', body: 'Licensing and management are built for large enterprises with dedicated teams.' },
      { icon: 'zap', title: 'Shadow AI gap', body: 'AI Security for End Users is not a first-class part of the SASE offering.' },
    ],
    differentiators: [
      { n: 1, title: 'One platform, not an ecosystem', body: 'SecureTrust Cyber delivers SASE, SIEM and patch in one product rather than a family of products to integrate.' },
      { n: 2, title: 'AI security built in', body: 'Shadow AI governance is native, not an add-on or a separate service.' },
      { n: 3, title: 'Simpler to run', body: 'One console, one policy engine and one support team, no multi-product integration work.' },
    ],
    migration: { heading: 'Consolidating off a multi-product stack?', body: 'Bring SASE and security operations together without the integration burden.' },
    themHas: ['Firewall-as-a-Service', 'Intrusion Prevention System', 'DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Does SecureTrust Cyber match Prisma on network security?', a: 'We cover the same network surface (FWaaS, IPS, DNS, SWG) and add SIEM and patch in the same platform.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-cloudflare', name: 'Cloudflare',
    meta: 'A fair comparison of SecureTrust Cyber and Cloudflare Zero Trust across maturity and coverage.',
    heroSub: 'Cloudflare’s network is everywhere, and its Zero Trust suite is improving fast. But security depth and operations are still catching up.',
    framing: 'Cloudflare is a remarkable platform, and its Zero Trust suite has come a long way. For teams that need deep security features and a managed operations layer today, the coverage is still thinner.',
    painPoints: [
      { icon: 'radar', title: 'Maturing security', body: 'CASB, DLP and IPS are newer and less complete than the network they sit on.' },
      { icon: 'layers', title: 'No security operations', body: 'SIEM and managed patch are not part of the offering.' },
      { icon: 'grid', title: 'Do-it-yourself', body: 'The platform is developer-first, and security teams often assemble what they need.' },
      { icon: 'zap', title: 'Shadow AI gap', body: 'AI Security for End Users is not a first-class feature.' },
    ],
    differentiators: [
      { n: 1, title: 'Deeper security features', body: 'Full IPS, CASB and DLP that are complete today, not on a roadmap.' },
      { n: 2, title: 'Security operations included', body: 'SIEM, vulnerability detection and managed patch come with the platform.' },
      { n: 3, title: 'Built for security teams', body: 'A purpose-built security console rather than a developer-first dashboard.' },
    ],
    migration: { heading: 'Adding depth to a Cloudflare footprint?', body: 'Layer full SSE and operations on top of, or instead of, Cloudflare Zero Trust.' },
    themHas: ['Firewall-as-a-Service', 'DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'How does SecureTrust Cyber compare on DNS?', a: 'Both offer strong DNS filtering; SecureTrust Cyber pairs it with a full security and operations stack.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-perimeter-81', name: 'Perimeter 81',
    meta: 'A fair comparison of SecureTrust Cyber and Perimeter 81 for SMB and mid-market SASE.',
    heroSub: 'Perimeter 81 makes ZTNA easy for mid-market teams. But the rest of the stack (network security, data and operations) is thin.',
    framing: 'Perimeter 81 is popular for making ZTNA approachable. If ZTNA is all you need, it is a fine choice. If you need the full security surface, the coverage is limited.',
    painPoints: [
      { icon: 'key', title: 'ZTNA-first, thin elsewhere', body: 'Strong access, but limited FWaaS, IPS, DLP and no security operations.' },
      { icon: 'layers', title: 'No SIEM or patch', body: 'Detection, compliance and patching are separate purchases.' },
      { icon: 'grid', title: 'Feature depth', body: 'Advanced DLP, CASB and AI security are limited or absent.' },
    ],
    differentiators: [
      { n: 1, title: 'Full SASE, not just ZTNA', body: 'Firewall, IPS, SWG, CASB and DLP alongside zero-trust access in one platform.' },
      { n: 2, title: 'Security operations included', body: 'SIEM and managed patch are part of the platform, not an add-on.' },
      { n: 3, title: 'Grow without switching', body: 'Start with access, expand to the full stack without replacing your security.' },
    ],
    migration: { heading: 'Outgrowing ZTNA-only?', body: 'Move to a full platform without losing the simplicity you like.' },
    themHas: ['Firewall-as-a-Service', 'DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Is SecureTrust Cyber as easy to deploy as Perimeter 81?', a: 'Yes, cloud-delivered, no appliances, with a much deeper feature set behind the same simplicity.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-forcepoint', name: 'Forcepoint',
    meta: 'A fair comparison of SecureTrust Cyber and Forcepoint across SSE depth and operations.',
    heroSub: 'Forcepoint has deep DLP and SWG heritage. But it is a point-product SSE, with operations and AI security left to other vendors.',
    framing: 'Forcepoint does DLP and SWG well, with a long enterprise history. The trade-off is that it is an SSE point product, so the network and operations layers come from elsewhere.',
    painPoints: sharedPain('Forcepoint'),
    differentiators: [
      { n: 1, title: 'Network security included', body: 'FWaaS and IPS come with the platform, alongside SWG, CASB and DLP.' },
      { n: 2, title: 'Security operations in one place', body: 'SIEM and managed patch are native, not a separate stack.' },
      { n: 3, title: 'AI security built in', body: 'Shadow AI discovery and guardrails are first-class, not a roadmap item.' },
    ],
    migration: { heading: 'Consolidating SSE and operations?', body: 'Keep deep DLP and add the full platform around it.' },
    themHas: ['Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Does SecureTrust Cyber match Forcepoint on DLP?', a: 'We match core DLP with 350+ data types and add network security and operations in the same platform.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-cisco-secure-access', name: 'Cisco Secure Access',
    meta: 'A fair comparison of SecureTrust Cyber and Cisco Secure Access (Umbrella) across integration and operations.',
    heroSub: 'Cisco Umbrella is strong at DNS, but the SASE pieces are a patchwork of acquisitions that still leave operations separate.',
    framing: 'Cisco Secure Access builds on Umbrella’s strong DNS foundation, but the SASE story is assembled across acquired products. For teams that want a natively integrated platform, that matters.',
    painPoints: [
      { icon: 'grid', title: 'Assembled, not integrated', body: 'DNS, SWG and CASB come from different products stitched together.' },
      { icon: 'layers', title: 'No security operations', body: 'SIEM and patch are separate products, often from other vendors.' },
      { icon: 'chart', title: 'Enterprise licensing', body: 'Pricing is built for large Cisco estates with complex licensing.' },
      { icon: 'zap', title: 'Shadow AI gap', body: 'AI Security for End Users is not part of the offering.' },
    ],
    differentiators: [
      { n: 1, title: 'Natively integrated platform', body: 'Every capability shares one agent, one console and one policy engine.' },
      { n: 2, title: 'Operations included', body: 'SIEM and managed patch are part of the same platform, not bolt-ons.' },
      { n: 3, title: 'AI security built in', body: 'Govern Shadow AI from the same console as the rest of security.' },
    ],
    migration: { heading: 'Simplifying a Cisco-heavy stack?', body: 'Consolidate DNS, SASE and operations into one platform.' },
    themHas: ['DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Can SecureTrust Cyber replace Cisco Umbrella?', a: 'Yes, with comparable DNS filtering plus a full SASE and operations platform.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-symantec', name: 'Symantec (Broadcom)',
    meta: 'A fair comparison of SecureTrust Cyber and Symantec SWG/CASB across maturity and breadth.',
    heroSub: 'Symantec’s SWG and DLP are mature, but aging, and the network security and operations layers are missing.',
    framing: 'Symantec has a long SWG and DLP pedigree, but the portfolio has aged. It does not cover network security or security operations, leaving you to fill those gaps.',
    painPoints: sharedPain('Symantec'),
    differentiators: [
      { n: 1, title: 'Modern, cloud-native platform', body: 'Built cloud-first, with elastic capacity and no legacy appliance heritage.' },
      { n: 2, title: 'Network security included', body: 'FWaaS and IPS come with the platform, alongside SWG, CASB and DLP.' },
      { n: 3, title: 'Security operations included', body: 'SIEM and managed patch are native, not a separate vendor.' },
    ],
    migration: { heading: 'Modernizing off legacy SWG?', body: 'Move to a cloud-native platform that covers the full surface.' },
    themHas: ['Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'How does migration from Symantec work?', a: 'We map your existing web and DLP policies and migrate them without a coverage gap.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-iboss', name: 'iboss',
    meta: 'A fair comparison of SecureTrust Cyber and iboss across SASE coverage and operations.',
    heroSub: 'iboss delivers SASE for the mid-market, but SIEM, patch and AI security are missing from the platform.',
    framing: 'iboss is a credible SASE option for mid-market teams. The gap is the same one across the market: security operations and AI security are not part of the platform.',
    painPoints: sharedPain('iboss'),
    differentiators: [
      { n: 1, title: 'Operations included', body: 'SIEM, vulnerability detection and managed patch come with the platform.' },
      { n: 2, title: 'AI security built in', body: 'Shadow AI governance is native, not an afterthought.' },
      { n: 3, title: 'One support relationship', body: 'One vendor, one console, one support team across SASE and operations.' },
    ],
    migration: { heading: 'Adding operations to SASE?', body: 'Keep SASE and add the operations layer in the same platform.' },
    themHas: ['Firewall-as-a-Service', 'Intrusion Prevention System', 'DNS Security', 'Secure Web Gateway', 'Universal ZTNA', 'CASB', 'Data Loss Prevention'],
    faq: [
      { q: 'Is SecureTrust Cyber comparable to iboss on SASE?', a: 'Yes, with the same SASE surface plus SIEM, patch and AI security that iboss does not include.' },
    ],
  }),

  buildCompetitor({
    slug: 'vs-versa', name: 'Versa Networks',
    meta: 'A fair comparison of SecureTrust Cyber and Versa across SASE, SD-WAN and security depth.',
    heroSub: 'Versa is strong in SD-WAN, with security layered on. For security-first teams, the depth is secondary to the networking.',
    framing: 'Versa Networks comes from SD-WAN, and security is layered on top. If networking is your priority, that works. If security and operations are the priority, the depth is thinner.',
    painPoints: [
      { icon: 'bolt', title: 'Networking-first', body: 'Security is a feature of the SD-WAN story, not the core focus.' },
      { icon: 'layers', title: 'No security operations', body: 'SIEM and managed patch are separate.' },
      { icon: 'zap', title: 'Shadow AI gap', body: 'AI Security for End Users is not part of the platform.' },
      { icon: 'grid', title: 'Feature depth', body: 'CASB and DLP are lighter than dedicated security platforms.' },
    ],
    differentiators: [
      { n: 1, title: 'Security-first platform', body: 'Every capability is built for security teams, not bolted onto networking.' },
      { n: 2, title: 'Security operations included', body: 'SIEM and managed patch come with the platform.' },
      { n: 3, title: 'AI security built in', body: 'Govern Shadow AI natively, not as a separate product.' },
    ],
    migration: { heading: 'Prioritizing security over SD-WAN?', body: 'Move to a platform where security is the point, not an add-on.' },
    themHas: ['Firewall-as-a-Service', 'Intrusion Prevention System', 'DNS Security', 'Secure Web Gateway', 'Universal ZTNA'],
    faq: [
      { q: 'Does SecureTrust Cyber do SD-WAN?', a: 'Our focus is security: SASE, SIEM and patch. We integrate with your connectivity rather than replacing your SD-WAN.' },
    ],
  }),
];
