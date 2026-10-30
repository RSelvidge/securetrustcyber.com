// src/content/pages/index.mjs — homepage content. The index template composes
// this data into the full ~14-section page.

export default {
  slug: '',
  type: 'index',
  title: 'Cybersecurity for Healthcare Practices',
  metaTitle: 'SecureTrust Cyber: Cybersecurity for Medical and Dental Practices',
  metaDescription: 'Expert-managed cybersecurity for small and mid-size medical and dental practices. Stop ransomware, protect patient data and keep HIPAA evidence ready.',
  sitemap: true,
  priority: 1.0,
  data: {
    hero: {
      variant: 'diagram',
      eyebrow: 'Cybersecurity for healthcare practices',
      headline: 'Expert-managed security for',
      rotating: ['dental practices', 'medical practices', 'specialty clinics'],
      sub: 'SecureTrust Cyber protects small and mid-size practices from ransomware and data breaches. Our specialists run the security for you, from firewall to patching, and keep the evidence your HIPAA risk analysis needs.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
      secondary: { label: 'See the platform', href: 'products' },
    },

    introHeading: 'Strong protection, without an IT security team',
    introText: 'Most practices have no one whose job is security. SecureTrust Cyber gives you one platform, managed by specialists, that covers your network, internet access, patient data and patching.',
    introCards: [
      { icon: 'lock', title: 'Stop ransomware before it spreads', body: 'Cloud firewall and intrusion prevention, backed by 250+ threat intelligence feeds, block attacks before they reach your systems.', href: 'products/ips' },
      { icon: 'scale', title: 'Keep HIPAA evidence ready', body: 'Controls mapped to the HIPAA Security Rule, and ClinicProof checks that your safeguards keep working week after week.', href: 'clinicproof' },
      { icon: 'users', title: 'Managed for you', body: 'Specialists deploy, monitor and maintain the platform, including patching on a 24-hour cycle, so your team can focus on patients.', href: 'managed-security' },
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
      enterprise: {
        title: 'Built for healthcare practices',
        body: 'Dental offices, medical groups and specialty clinics face the same attacks as hospitals with a fraction of the staff. See how SecureTrust Cyber protects patient data and the systems your practice runs on.',
        link: { label: 'Explore healthcare security', href: 'industries/healthcare' },
      },
    },

    focus: {
      eyebrow: 'Where we focus', heading: 'Built for healthcare',
      slugs: ['industries/healthcare', 'clinicproof', 'compliance/hipaa'],
    },

    stats: [
      { value: '10', label: 'capabilities, one platform' },
      { value: '250+', label: 'threat intelligence feeds' },
      { value: '350+', label: 'predefined DLP data types' },
      { value: '24/7', label: 'cloud-native enforcement' },
    ],

    comparison: {
      eyebrow: 'Why practices consolidate', heading: 'Fewer tools. No gaps.',
      body: 'Many practices pay for a firewall, a VPN, antivirus add-ons and an IT contractor, and still have gaps between them. One managed platform is simpler to run and leaves nothing unowned.',
      link: { label: 'How managed security works', href: 'managed-security' },
    },

    cta: { heading: 'One Platform. Total Security.', body: 'See how SecureTrust Cyber protects your patients, your systems and your HIPAA evidence.' },
  },
};
