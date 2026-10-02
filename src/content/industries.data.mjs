// src/content/industries.data.mjs — 10 industry definitions.

const buildIndustry = (ind) => ({
  slug: `industries/${ind.slug}`,
  type: 'industry',
  title: `${ind.title} Cybersecurity`,
  category: ind.slug,
  metaTitle: `${ind.title} Cybersecurity | SecureTrust Cyber`,
  metaDescription: ind.meta,
  hero: {
    variant: ind.heroVariant,
    eyebrow: ind.eyebrow ?? 'Industry Solutions',
    headline: ind.headline,
    sub: ind.sub,
    primary: { label: 'Get a Demo', href: 'request-demo' },
    secondary: { label: 'See the platform', href: 'products' },
    media: ind.title,
    chips: ind.chips ?? [],
  },
  threats: {
    heading: `The ${ind.title.toLowerCase()} threat landscape`,
    intro: ind.threatIntro,
    items: ind.threats,
  },
  controlMap: {
    eyebrow: 'Compliance & controls',
    heading: ind.controlHeading ?? 'How SecureTrust maps to your obligations',
    rows: ind.controlMap,
  },
  outcomes: {
    heading: 'What you get',
    intro: ind.outcomeIntro,
    items: ind.outcomes,
  },
  caseStudy: ind.caseStudy,
  quote: ind.quote,
  faq: ind.faq,
  cta: { heading: ind.ctaHeading ?? 'Protect your organization', body: ind.ctaBody },
});

export const INDUSTRIES = [
  buildIndustry({
    slug: 'healthcare', title: 'Healthcare', heroVariant: 'split', eyebrow: 'Healthcare',
    headline: 'Security that keeps care running',
    sub: 'Protect patient data and clinical systems from ransomware and breaches, while meeting HIPAA obligations.',
    meta: 'Healthcare cybersecurity that protects patient data and clinical systems from ransomware while meeting HIPAA.',
    chips: ['HIPAA', 'HITECH', 'NIS2'],
    threatIntro: 'Healthcare is a prime target: attackers know a hospital cannot afford downtime, and patient data is valuable.',
    threats: [
      { title: 'Ransomware against care', body: 'Attacks encrypt clinical systems and force hospitals to divert patients. Inline intrusion prevention stops ransomware before it spreads.', image: { src: 'img/healthcare-ransomware.png', alt: 'Healthcare staff beside a laptop displaying a ransomware lock symbol', width: 646, height: 382 } },
      { title: 'Connected medical devices', body: 'Infusion pumps and imaging devices run old, unpatchable software. Network segmentation and firewall controls reduce the risk they carry.', image: { src: 'img/healthcare-medical-devices.jpg', alt: 'CT scanner and monitoring equipment in a medical imaging room', width: 1400, height: 933 } },
      { title: 'Insider data exposure', body: 'More people need access to records than in any other industry, making least-privilege access and audit essential.', image: { src: 'img/healthcare-insider-exposure.png', alt: 'Insider threat survey: remote and hybrid workforces 75%, AI and automation in cybersecurity 69%, cloud collaboration and data sharing 66%, advanced social engineering 53%', width: 663, height: 284, fit: 'contain' } },
    ],
    controlHeading: 'Meeting HIPAA and beyond',
    controlMap: [
      { requirement: 'HIPAA Security Rule — Access Control (45 CFR §164.312(a)(1))', answer: 'Identity- and context-based least-privilege access restricts who can see patient data.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'HIPAA — Audit Controls (§164.312(b))', answer: 'Centralized log collection and correlation produce a complete audit trail.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'HIPAA — Transmission Security (§164.312(e)(1))', answer: 'DLP and TLS inspection protect ePHI in transit across web, SaaS and email.', href: 'products/dlp', product: 'Data Loss Prevention' },
      { requirement: 'HIPAA — Risk Analysis (§164.308(a)(1)(ii)(A))', answer: 'Continuous vulnerability and configuration visibility supports a defensible risk analysis.', href: 'products/patch-management', product: 'Managed Patch Management' },
    ],
    outcomeIntro: 'Fewer breaches, faster recovery, and audit-ready compliance.',
    outcomes: [
      { icon: 'lock', title: 'Stop ransomware', body: 'Prevent the attacks that force downtime.' },
      { icon: 'shield', title: 'Protect ePHI', body: 'Keep patient data confidential and intact.' },
      { icon: 'scale', title: 'Audit-ready', body: 'Prove HIPAA compliance on demand.' },
      { icon: 'clock', title: 'Keep systems up', body: 'Patch without disrupting clinical workflows.' },
    ],
    caseStudy: { logo: 'Apex Health Network', quote: 'SecureTrust let us secure our clinical estate without a single minute of unplanned downtime.', name: 'Dr. Elena Vasquez', role: 'CIO' },
    quote: { heading: 'Trusted across healthcare', items: [
      { text: 'We went from fearing ransomware to containing it. Inline prevention stopped an encryption attempt before it touched a single record.', name: 'Marcus Webb', role: 'Head of IT Infrastructure', company: 'Regional hospital' },
    ] },
    faq: [
      { q: 'Does it cover connected medical devices?', a: 'Medical devices are discovered and monitored, and network segmentation reduces the risk they carry.' },
      { q: 'Will it disrupt clinical workflows?', a: 'Patching and policy are scheduled around clinical hours, so care is never interrupted.' },
    ],
  }),

  buildIndustry({
    slug: 'financial-services', title: 'Financial Services', heroVariant: 'diagram', eyebrow: 'Financial Services',
    headline: 'Resilience your regulators expect',
    sub: 'Meet DORA, protect customer assets and keep the lights on through the worst that attackers can throw at you.',
    meta: 'Financial services cybersecurity that meets DORA and protects customer assets and critical systems.',
    chips: ['DORA', 'PCI DSS', 'ISO 27001'],
    threatIntro: 'Financial institutions face motivated, well-funded attackers and relentless regulatory scrutiny.',
    threats: [
      { title: 'Account takeover', body: 'Stolen credentials are the weapon of choice. Zero-trust access and identity-based policy stop abuse before money moves.', image: { src: 'img/financial-account-takeover.png', alt: 'Person using a laptop with login credentials and security lock graphics', width: 678, height: 363, fit: 'contain' } },
      { title: 'Data and payment fraud', body: 'Sensitive data exfiltration and payment fraud are stopped by DLP and cloud app governance.', image: { src: 'img/financial-payment-fraud.png', alt: 'Fraud prevention graphic with credit card, identity, and data protection symbols', width: 650, height: 414, fit: 'contain' } },
      { title: 'Third-party risk', body: 'Vendors are an extension of your attack surface. Least-privilege access keeps supply-chain risk visible and governed.', image: { src: 'img/financial-third-party-risk.png', alt: 'Cartoon of a business meeting reviewing a tangled diagram of third-party connections', width: 642, height: 406, fit: 'contain' } },
    ],
    controlHeading: 'Mapping to DORA',
    controlMap: [
      { requirement: 'DORA — ICT risk management (Art. 6)', answer: 'Continuous vulnerability and configuration visibility forms the basis of a sound risk framework.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'DORA — Incident reporting (Art. 19)', answer: 'Real-time log analysis and threat detection ensure incidents are detected and reported within the deadline.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'DORA — Digital operational resilience testing (Art. 24)', answer: 'Inline attack prevention and virtual patching validate that your controls hold under attack.', href: 'products/ips', product: 'Intrusion Prevention System' },
      { requirement: 'DORA — Third-party risk (Art. 28)', answer: 'Least-privilege access governs how third parties touch your systems.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    outcomeIntro: 'Resilience, security, and the evidence regulators ask for.',
    outcomes: [
      { icon: 'scale', title: 'Regulatory ready', body: 'Evidence for DORA, PCI and ISO on demand.' },
      { icon: 'key', title: 'Stop fraud', body: 'Block account takeover and data theft.' },
      { icon: 'radar', title: 'Faster response', body: 'Detect and contain incidents in minutes.' },
      { icon: 'shield', title: 'Supply-chain control', body: 'See and govern third-party access.' },
    ],
    caseStudy: { logo: 'Helix Capital', quote: 'SecureTrust gave us a single view of risk across banking, trading and payments.', name: 'James Okoro', role: 'CISO' },
    faq: [
      { q: 'Does it help with DORA specifically?', a: 'Yes. The control map above shows how each capability supports a specific DORA article.' },
      { q: 'Can it integrate with our existing GRC tooling?', a: 'Yes, via the API integration layer.' },
    ],
  }),

  buildIndustry({
    slug: 'manufacturing', title: 'Manufacturing', heroVariant: 'terminal', eyebrow: 'Manufacturing',
    headline: 'Keep the line running',
    sub: 'Protect OT and IT together so a cyber incident never stops production.',
    meta: 'Manufacturing cybersecurity that protects OT and IT together so production never stops.',
    chips: ['IEC 62443', 'NIS2'],
    threatIntro: 'Manufacturing runs on a mix of legacy OT and modern IT, and downtime costs millions per hour.',
    threats: [
      { title: 'OT/IT convergence', body: 'Industrial control systems are increasingly networked, exposing them to IT-borne attacks. Segmentation and firewall controls contain the risk.' },
      { title: 'Ransomware downtime', body: 'An encrypted production line stops output. Inline intrusion prevention halts ransomware before it spreads.' },
      { title: 'Unpatched industrial systems', body: 'Legacy machines cannot be patched easily. Segmentation and cloud app governance reduce the risk.' },
    ],
    controlHeading: 'Protecting OT and IT',
    controlMap: [
      { requirement: 'IEC 62443 — Network segmentation', answer: 'Microsegmentation isolates OT from IT, containing any breach.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'IEC 62443 — Patch management', answer: 'Automated patching closes vulnerabilities without manual effort.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'IEC 62443 — Application control', answer: 'Cloud app and tenant governance restricts unauthorized access.', href: 'products/casb', product: 'CASB' },
    ],
    outcomeIntro: 'Uninterrupted production and a hardened plant floor.',
    outcomes: [
      { icon: 'clock', title: 'Zero downtime', body: 'Stop attacks before they stop the line.' },
      { icon: 'grid', title: 'OT visibility', body: 'See every device and flow.' },
      { icon: 'shield', title: 'Segmented by default', body: 'Contain breaches at the boundary.' },
      { icon: 'wrench', title: 'Patch without pause', body: 'Update systems around production windows.' },
    ],
    faq: [
      { q: 'Does it work with legacy industrial systems?', a: 'Yes. Segmentation and access control secure systems that cannot be patched.' },
    ],
  }),

  buildIndustry({
    slug: 'energy-utilities', title: 'Energy & Utilities', heroVariant: 'split', eyebrow: 'Energy & Utilities',
    headline: 'Defend critical national infrastructure',
    sub: 'Protect the systems that power everything else, from grid to generation.',
    meta: 'Cybersecurity for energy and utilities that protects critical national infrastructure from attack.',
    chips: ['NIS2', 'NERC CIP', 'CIS Controls'],
    threatIntro: 'Energy is a top target for nation-state actors, where an incident can cascade beyond the organization.',
    threats: [
      { title: 'Nation-state attacks', body: 'Sophisticated, persistent adversaries target the grid. AI/ML detection and continuous monitoring are essential.' },
      { title: 'Legacy SCADA', body: 'Operational systems outlive their support windows. Segmentation and access control compensate for the gap.' },
      { title: 'Supply-chain compromise', body: 'Vendors with access to OT are a path in. Least-privilege access governs that access.' },
    ],
    controlHeading: 'NERC CIP and NIS2 alignment',
    controlMap: [
      { requirement: 'NERC CIP-005 — Electronic security perimeter', answer: 'Microsegmentation creates a defensible boundary around critical assets.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'NERC CIP-007 — System security management', answer: 'Automated patching and configuration assessment keep systems current.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'NERC CIP-004 — Personnel & training / access', answer: 'Least-privilege access governs who touches critical systems.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    outcomeIntro: 'Resilience for systems that cannot fail.',
    outcomes: [
      { icon: 'shield', title: 'Grid resilience', body: 'Keep critical systems running under attack.' },
      { icon: 'radar', title: 'Adversary visibility', body: 'Spot nation-state activity early.' },
      { icon: 'key', title: 'Controlled access', body: 'Govern who touches OT.' },
      { icon: 'scale', title: 'Compliance', body: 'NERC CIP and NIS2 evidence.' },
    ],
    faq: [
      { q: 'Can it protect air-gapped OT?', a: 'Yes. Segmentation and access control secure even isolated operational networks.' },
    ],
  }),

  buildIndustry({
    slug: 'government', title: 'Government', heroVariant: 'centered', eyebrow: 'Government',
    headline: 'Security for the public sector',
    sub: 'Protect citizen data and public services against well-resourced adversaries.',
    meta: 'Government cybersecurity that protects citizen data and public services against sophisticated threats.',
    chips: ['NIS2', 'CIS Controls', 'ISO 27001'],
    threatIntro: 'Public sector bodies hold sensitive citizen data and face both criminal and state-sponsored threats.',
    threats: [
      { title: 'Citizen data at risk', body: 'Breaches of public records erode trust. DLP and access control protect the data.' },
      { title: 'Legacy systems', body: 'Government IT runs on old platforms. Segmentation and access control limit the damage they can cause.' },
      { title: 'Phishing at scale', body: 'Staff are heavily targeted. DNS Security and the Secure Web Gateway block the most common vectors.' },
    ],
    controlHeading: 'Meeting public-sector standards',
    controlMap: [
      { requirement: 'CIS Controls — Inventory & control of enterprise assets', answer: 'Continuous asset and software inventory gives a complete, current view.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'CIS Controls — Access control management', answer: 'Least-privilege access protects sensitive systems.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'CIS Controls — Email & web protections', answer: 'Secure Web Gateway and DNS Security block web-borne threats.', href: 'products/swg', product: 'Secure Web Gateway' },
    ],
    outcomeIntro: 'Protected services and citizen trust.',
    outcomes: [
      { icon: 'shield', title: 'Protect citizens', body: 'Keep public data safe.' },
      { icon: 'clock', title: 'Service continuity', body: 'Prevent outages from attacks.' },
      { icon: 'scale', title: 'Auditable', body: 'Evidence for every standard.' },
      { icon: 'users', title: 'Reduced phishing', body: 'Fewer successful attacks on staff.' },
    ],
    faq: [
      { q: 'Can it run in a sovereign or on-premises environment?', a: 'Yes. Deployment options include sovereign and on-premises hosting.' },
    ],
  }),

  buildIndustry({
    slug: 'education', title: 'Education', heroVariant: 'diagram', eyebrow: 'Education',
    headline: 'Protect students, staff and research',
    sub: 'Secure sprawling, open campus networks without slowing down learning or research.',
    meta: 'Cybersecurity for education that protects students, staff and research on open campus networks.',
    chips: ['Cyber Essentials', 'GDPR'],
    threatIntro: 'Schools and universities run open networks with thousands of devices and limited security staff.',
    threats: [
      { title: 'Ransomware on schools', body: 'Schools are a favorite target because they cannot afford downtime. Inline prevention stops encryption.' },
      { title: 'BYOD sprawl', body: 'Thousands of unmanaged devices connect daily. Zero-trust access and web controls bring order.' },
      { title: 'Research theft', body: 'Valuable research is targeted by competitors and nation-states. Least-privilege access and DLP protect it.' },
    ],
    controlHeading: 'Security for open campuses',
    controlMap: [
      { requirement: 'Cyber Essentials — Patch management', answer: 'Automated patching keeps student and staff devices current.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Cyber Essentials — Access control', answer: 'Least-privilege access limits who reaches sensitive systems.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'GDPR — Protecting personal data', answer: 'DLP safeguards student records and research data.', href: 'products/dlp', product: 'Data Loss Prevention' },
    ],
    outcomeIntro: 'A safe campus that stays open.',
    outcomes: [
      { icon: 'shield', title: 'Safe networks', body: 'Protect thousands of devices.' },
      { icon: 'clock', title: 'No downtime', body: 'Keep classes running.' },
      { icon: 'file', title: 'Data protected', body: 'Safeguard student records.' },
      { icon: 'users', title: 'Light staff load', body: 'Automation does the heavy lifting.' },
    ],
    faq: [
      { q: 'Can it handle tens of thousands of devices?', a: 'Yes. The platform scales to the largest campuses.' },
    ],
  }),

  buildIndustry({
    slug: 'retail', title: 'Retail', heroVariant: 'split', eyebrow: 'Retail',
    headline: 'Security that does not slow the sale',
    sub: 'Protect stores, e-commerce and payment data without adding friction for customers or staff.',
    meta: 'Retail cybersecurity that protects stores, e-commerce and payment data without adding friction.',
    chips: ['PCI DSS', 'GDPR'],
    threatIntro: 'Retail handles payment data across hundreds of locations and a huge attack surface.',
    threats: [
      { title: 'Payment data theft', body: 'Point-of-sale systems are a prize target. DLP and segmentation protect cardholder data.' },
      { title: 'Seasonal spikes', body: 'Attackers strike during peak seasons when teams are stretched. Cloud automation keeps defenses on.' },
      { title: 'E-commerce fraud', body: 'Fraudulent transactions and account takeover hit online channels. Zero-trust access reduces loss.' },
    ],
    controlHeading: 'PCI DSS alignment',
    controlMap: [
      { requirement: 'PCI DSS Req 5 — Protect against malware', answer: 'IPS and DNS Security block malware and malicious domains inline.', href: 'products/ips', product: 'Intrusion Prevention System' },
      { requirement: 'PCI DSS Req 7 — Restrict access', answer: 'Least-privilege access limits who reaches cardholder data.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'PCI DSS Req 3 — Protect stored data', answer: 'DLP detects and blocks exposure of cardholder data.', href: 'products/dlp', product: 'Data Loss Prevention' },
    ],
    outcomeIntro: 'Protected payments and a smooth customer experience.',
    outcomes: [
      { icon: 'shield', title: 'Secure payments', body: 'Protect cardholder data everywhere.' },
      { icon: 'clock', title: 'Always on', body: 'Automated defenses during peak season.' },
      { icon: 'scale', title: 'PCI ready', body: 'Evidence for assessors.' },
      { icon: 'users', title: 'No friction', body: 'Security invisible to customers.' },
    ],
    faq: [
      { q: 'Does it cover point-of-sale devices?', a: 'Yes, with network and access controls for POS systems.' },
    ],
  }),

  buildIndustry({
    slug: 'technology', title: 'Technology', heroVariant: 'terminal', eyebrow: 'Technology',
    headline: 'Ship fast without shipping risk',
    sub: 'Security that keeps pace with your product velocity, from engineering to production.',
    meta: 'Cybersecurity for technology companies that keeps pace with product velocity without slowing it down.',
    chips: ['ISO 27001', 'SOC 2', 'CIS Controls'],
    threatIntro: 'Technology companies move fast, ship constantly and hold customer data — a tempting combination for attackers.',
    threats: [
      { title: 'Supply-chain attacks', body: 'Attackers poison dependencies and cloud apps. Cloud governance and monitoring catch the result.' },
      { title: 'Cloud sprawl', body: 'Fast-moving teams create shadow cloud assets. CASB visibility brings them under control.' },
      { title: 'Customer data', body: 'SaaS products hold sensitive customer data. DLP and access control protect it.' },
    ],
    controlHeading: 'ISO 27001 and SOC 2 alignment',
    controlMap: [
      { requirement: 'ISO 27001 — A.8.8 Vulnerability management', answer: 'Automated patching closes vulnerabilities across the estate.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'ISO 27001 — A.8.2 Privileged access', answer: 'Least-privilege access protects production and customer data.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'SOC 2 — CC6 Logical access', answer: 'Identity- and context-based access controls secure logical access to systems.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    outcomeIntro: 'Velocity without compromise.',
    outcomes: [
      { icon: 'zap', title: 'No slowdown', body: 'Security that matches your pace.' },
      { icon: 'layers', title: 'Cloud visibility', body: 'See shadow apps and control them.' },
      { icon: 'shield', title: 'Customer trust', body: 'Prove security to buyers.' },
      { icon: 'scale', title: 'Audit ready', body: 'ISO and SOC 2 evidence.' },
    ],
    faq: [
      { q: 'Does it integrate with our CI/CD and cloud tooling?', a: 'Yes, via the API integration layer.' },
    ],
  }),

  buildIndustry({
    slug: 'critical-infrastructure', title: 'Critical Infrastructure', heroVariant: 'centered', eyebrow: 'Critical Infrastructure',
    headline: 'Resilience for systems that cannot fail',
    sub: 'Defense in depth for the sectors where an outage has national consequences.',
    meta: 'Cybersecurity for critical infrastructure where an outage has national consequences.',
    chips: ['NIS2', 'NERC CIP', 'ISA/IEC 62443'],
    threatIntro: 'Critical infrastructure faces the most capable adversaries and the highest-stakes consequences.',
    threats: [
      { title: 'Nation-state campaigns', body: 'Persistent, well-resourced attackers probe these networks daily. AI/ML detection and monitoring are essential.' },
      { title: 'Cascading failures', body: 'A breach in one system can ripple outward. Microsegmentation contains the blast radius.' },
      { title: 'Legacy OT', body: 'Operational technology outlives its security support. Segmentation and access control compensate.' },
    ],
    controlHeading: 'Sector-specific frameworks',
    controlMap: [
      { requirement: 'NIS2 — Risk management measures', answer: 'Continuous visibility and patching form the core of a defensible risk program.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'ISA/IEC 62443 — Zones & conduits', answer: 'Microsegmentation enforces zones and conduits across OT.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'NERC CIP — Access management', answer: 'Least-privilege access governs who touches critical systems.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    outcomeIntro: 'Resilience in the face of nation-state threat.',
    outcomes: [
      { icon: 'shield', title: 'Contained blasts', body: 'Limit the damage of any breach.' },
      { icon: 'radar', title: 'Adversary awareness', body: 'See sophisticated activity early.' },
      { icon: 'key', title: 'Governed access', body: 'Control every privileged action.' },
      { icon: 'scale', title: 'Regulatory alignment', body: 'NIS2, NERC CIP, IEC 62443.' },
    ],
    faq: [
      { q: 'Can it secure air-gapped and legacy OT?', a: 'Yes, through segmentation and access control.' },
    ],
  }),

  buildIndustry({
    slug: 'smb', title: 'Small & Mid-Sized Business', heroVariant: 'split', eyebrow: 'SMB',
    headline: 'Enterprise-grade security, SMB-simple',
    sub: 'The protection you need, without the cost and complexity you cannot afford.',
    meta: 'Enterprise-grade cybersecurity for small and mid-sized businesses, without the cost or complexity.',
    chips: ['Cyber Essentials', 'CIS Controls'],
    threatIntro: 'SMBs are attacked because they are seen as easy targets, and a single breach can be fatal.',
    threats: [
      { title: 'Ransomware', body: 'SMBs are hit hardest because they cannot pay and cannot recover. Inline prevention beats recovery.' },
      { title: 'Phishing and malicious sites', body: 'A single convincing link can compromise the whole business. DNS Security and SWG stop most.' },
      { title: 'No security team', body: 'Most SMBs have no dedicated security staff. Cloud automation is the only realistic answer.' },
    ],
    controlHeading: 'The essentials, done for you',
    controlMap: [
      { requirement: 'Cyber Essentials — Firewalls & secure configuration', answer: 'Firewall-as-a-Service provides a managed perimeter.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'Cyber Essentials — Patch management', answer: 'Managed patching keeps everything current without effort.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Cyber Essentials — Access control', answer: 'Least-privilege access protects your accounts.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    outcomeIntro: 'Protection that runs itself.',
    outcomes: [
      { icon: 'shield', title: 'Protected', body: 'Enterprise-grade controls, no team required.' },
      { icon: 'zap', title: 'Automated', body: 'Set it up and it runs itself.' },
      { icon: 'chart', title: 'Affordable', body: 'Priced for SMB budgets.' },
      { icon: 'clock', title: 'Fast to deploy', body: 'Up and running in hours.' },
    ],
    faq: [
      { q: 'Do I need a security team to use this?', a: 'No. Cloud automation handles the day-to-day, and managed patch adds human oversight.' },
    ],
  }),
];
