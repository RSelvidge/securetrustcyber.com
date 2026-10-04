// src/content/pages/index.mjs — homepage content. The index template composes
// this data into the full ~14-section page.

export default {
  slug: '',
  type: 'index',
  title: 'Unified Security Platform',
  metaTitle: 'SecureTrust Cyber: One Platform. Total Security.',
  metaDescription: 'A converged cloud platform for network, zero trust, cloud, data and AI security, plus SIEM and managed patch. One platform, total security.',
  sitemap: true,
  priority: 1.0,
  data: {
    hero: {
      variant: 'diagram',
      eyebrow: 'Unified Security Platform',
      headline: 'Security that closes the gap',
      rotating: ['between network and cloud', 'between identity and data', 'between user and application'],
      sub: 'A converged cloud platform that unifies firewall, web, zero trust, cloud, data and AI security, with SIEM and managed patch on top. One platform, total security.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
      secondary: { label: 'See the platform', href: 'products' },
    },

    introHeading: 'One platform. Every surface covered.',
    introText: 'Firewall-as-a-Service, IPS, DNS Security, SWG, ZTNA, CASB, DLP, AI Security, SIEM and managed patch, delivered from one cloud.',
    introCards: [
      { icon: 'layers', title: 'Converged cloud security', body: 'Network, web, zero trust, cloud, data and AI security in one platform, no appliance sprawl.', href: 'products' },
      { icon: 'scale', title: 'Built for compliance', body: 'Native control maps for HIPAA, ISO 27001, CIS Controls and DORA.', href: 'compliance/hipaa' },
      { icon: 'grid', title: 'Consolidate tools. Eliminate gaps.', body: 'Replace VPN, firewalls, SWG, CASB and DLP point products with a single platform.', href: 'solutions' },
    ],

    tabs: {
      eyebrow: 'The platform', heading: 'Every capability. One console.', intro: 'Every layer shares the same policy engine and the same visibility.',
      tabs: [
        { id: 'firewall', label: 'Firewall', icon: 'shield', heading: 'Cloud-delivered firewall, everywhere',
          body: 'Consolidate branch, data center and LAN firewalls into one service that inspects internet, WAN and LAN traffic.',
          bullets: ['Full traffic inspection', 'Microsegmentation', 'Zero-trust access control'],
          link: 'products/fwaas' },
        { id: 'ips', label: 'IPS', icon: 'radar', heading: 'Stop attacks in real time',
          body: 'AI/ML detection and 250+ threat feeds block known and emerging attacks inline, including TLS.',
          bullets: ['AI/ML threat detection', 'Ransomware kill-chain defense', 'Virtual patching'],
          link: 'products/ips' },
        { id: 'zerotrust', label: 'Zero Trust', icon: 'key', heading: 'Least privilege, continuously verified',
          body: 'Identity- and context-based access with continuous device posture checks, and no VPN.',
          bullets: ['Risk-based policy', 'Continuous posture checks', 'Clientless access'],
          link: 'products/ztna' },
        { id: 'cloud', label: 'Cloud', icon: 'database', heading: 'See and govern every cloud app',
          body: 'Discover shadow IT, score application risk and enforce least-privilege controls across SaaS.',
          bullets: ['Shadow IT discovery', 'ML risk scoring', 'Tenant restriction'],
          link: 'products/casb' },
        { id: 'data', label: 'Data & AI', icon: 'lock', heading: 'Protect data everywhere it goes',
          body: 'Classify sensitive data and enforce protection across web, SaaS, email and generative AI.',
          bullets: ['350+ data types', 'GenAI safeguards', 'Exact Data Match & OCR'],
          link: 'products/dlp' },
        { id: 'ops', label: 'Operations', icon: 'chart', heading: 'Detect, audit and patch',
          body: 'SIEM log analysis, CIS-benchmark audits, vulnerability detection and managed patching.',
          bullets: ['Real-time threat detection', 'CIS configuration audits', 'Automated patching'],
          link: 'products/siem' },
      ],
    },

    platform: { heading: 'Unified security & compliance platform', modules: ['FWaaS', 'SWG', 'CASB', 'ZTNA'] },

    twoPath: {
      enterprise: { title: 'Modern enterprise security', body: 'Healthcare, manufacturing, finance, technology and retail all run on SecureTrust Cyber.' },
      partner: { title: 'Partner with us', body: 'Join a partner program built for MSPs and MSSPs, with PSA and RMM integrations out of the box.' },
    },

    stats: [
      { value: '10', label: 'capabilities, one platform' },
      { value: '250+', label: 'threat intelligence feeds' },
      { value: '350+', label: 'predefined DLP data types' },
      { value: '24/7', label: 'cloud-native enforcement' },
    ],

    comparison: { heading: 'Fewer tools. No gaps.', body: 'Consolidating onto one platform lowers cost, cuts complexity and closes the seams between point products.' },

    reviews: {
      eyebrow: 'What our customers say', heading: 'Rated by the teams who use it',
      reviews: [
        { rating: 5, title: 'Front-row security like a Swiss army knife', body: 'Every layer we needed in one place, without the integration headaches.', reviewer: 'IT Manager', source: 'G2' },
        { rating: 5, title: 'Solid product with a great team', body: 'The support is genuinely responsive, a named expert, not a queue.', reviewer: 'Head of Group IT', source: 'G2' },
        { rating: 4, title: 'Consolidated our whole stack', body: 'We retired three point products the month we deployed.', reviewer: 'CTO / CIO', source: 'G2' },
        { rating: 5, title: 'Replaced our VPN and firewalls', body: 'One platform now covers what used to be a pile of appliances.', reviewer: 'IT Manager', source: 'G2' },
      ],
      scores: [
        { value: '4.4', label: 'G2' }, { value: '4.8', label: 'Capterra' }, { value: '4.7', label: 'Gartner' },
        { value: '4.4', label: 'SourceForge' }, { value: '4.8', label: 'TrustRadius' }, { value: '4.8', label: 'G2 (mid-market)' },
      ],
    },

    awards: ['G2 Leader 2026', 'Capterra Top Rated', 'SourceForge Leader', 'Gartner Peer Insights'],

    cta: { heading: 'One Platform. Total Security.', body: 'See the platform that closes the gap across your entire estate.' },
  },
};
