// src/content/products.data.mjs — the 10 real SecureTrust Cyber capabilities,
// written from the product datasheets.

import { PRODUCT_IMAGES } from './product-images.data.mjs';

const demo = { label: 'Talk to an Expert', href: 'talk-to-an-expert' };

const buildProduct = (p) => ({
  slug: `products/${p.slug}`,
  type: 'product',
  title: p.title,
  category: p.category,
  metaTitle: `${p.title} | SecureTrust Cyber`,
  metaDescription: p.meta,
  hero: {
    variant: p.heroVariant,
    eyebrow: p.eyebrow,
    headline: p.headline,
    sub: p.sub,
    primary: demo,
    secondary: { label: 'See pricing', href: 'pricing' },
    media: p.title,
    chips: p.chips ?? [],
    bg: p.heroImage,
    textSide: p.heroTextSide,
  },
  problem: { heading: p.problemHeading, intro: p.problemIntro, items: p.problem },
  capabilities: {
    heading: p.capHeading,
    intro: p.capIntro,
    items: p.capabilities.map((item, index) => ({
      ...item,
      image: item.image ?? PRODUCT_IMAGES[p.slug]?.[index],
    })),
  },
  howItWorks: p.steps ? { heading: 'How it works', steps: p.steps } : undefined,
  platform: p.platform === false ? undefined : (p.platform ?? {}),
  proof: p.proof,
  quote: p.quote,
  faq: p.faq,
  cta: { heading: p.ctaHeading ?? 'See it in action', body: p.ctaBody },
});

export const PRODUCTS = [
  /* ============ Network Security ============ */
  buildProduct({
    slug: 'fwaas', title: 'Firewall-as-a-Service (FWaaS)', category: 'network-security',
    platform: {
      scene: 'fwaas', heading: 'A firewall in every tunnel.',
      intro: 'Every user and every device has its own tunnel, and every tunnel starts with Firewall-as-a-Service. Unwanted traffic is dropped at the edge, while legitimate traffic keeps flowing to your apps.',
    },
    heroVariant: 'split', eyebrow: 'Network Security',
    headline: 'Cloud-delivered firewall for every user, site and network',
    sub: 'Consolidate branch, data center and LAN firewalls into one cloud-native service that inspects internet, WAN and LAN traffic with application and user context.',
    meta: 'Cloud-delivered Firewall-as-a-Service with full traffic inspection, microsegmentation and zero-trust access for every user, site and network.',
    problemHeading: 'Appliance firewalls cannot keep up',
    problemIntro: 'Hardware firewalls create blind spots, sprawl and a hardware refresh cycle that never ends.',
    problem: [
      { icon: 'grid', title: 'Appliance sprawl', body: 'Every branch and data center runs its own box, each with its own policy and hardware refresh.' },
      { icon: 'globe', title: 'Traffic blind spots', body: 'Internet, WAN and LAN traffic are inspected inconsistently, leaving gaps attackers exploit.' },
      { icon: 'shield', title: 'Lateral movement', body: 'Flat internal networks let a breach spread freely once inside.' },
    ],
    capHeading: 'One firewall, everywhere',
    capIntro: 'Replace appliance sprawl with a single cloud-native firewall that scales elastically.',
    capabilities: [
      { title: 'Full traffic inspection', body: 'Inspect internet, WAN and LAN traffic without port or protocol blind spots.', bullets: ['Internet, WAN and LAN coverage', 'Application and user awareness', 'No protocol blind spots'] },
      { title: 'Microsegmentation', body: 'Restrict access between groups, VLANs, hosts, users, devices and applications to stop lateral movement.', bullets: ['Per-group and per-host rules', 'Zero-trust access control', 'Device-posture-aware policy'] },
      { title: 'Centralized policy', body: 'Build rules from identity, device, application, location and context, once, for everywhere.', bullets: ['One rule set across sites and clouds', 'Elastic cloud processing', 'Full admin audit trail'] },
    ],
    steps: [
      { title: 'Discover', body: 'Map users, sites, networks, apps and traffic flows.' },
      { title: 'Define', body: 'Set centralized firewall, segmentation and access rules.' },
      { title: 'Inspect', body: 'Analyze and enforce policy across internet, WAN and LAN traffic.' },
      { title: 'Review', body: 'Use logs, alerts, dashboards and audit trails to improve control.' },
    ],
    faq: [
      { q: 'Does FWaaS replace my hardware firewalls?', a: 'Yes. It consolidates branch, data center and LAN appliances into one cloud-native service.' },
      { q: 'Can it inspect encrypted traffic?', a: 'Yes, including TLS, subject to deployment configuration and applicable approvals.' },
      { q: 'How does it scale?', a: 'Cloud processing scales capacity elastically, without appliance CPU limits or hardware replacement.' },
    ],
  }),

  buildProduct({
    slug: 'ips', title: 'Intrusion Prevention System (IPS)', category: 'network-security',
      platform: { scene: 'ips', heading: 'Exploits stopped inside every tunnel.', intro: 'Every user and every device has its own tunnel, and every tunnel is inspected by Intrusion Prevention. Exploit attempts are detected and stopped in flight, so they never reach the user or the device.' },
    heroVariant: 'diagram', eyebrow: 'Network Security',
    headline: 'Stop attacks in real time',
    sub: 'Cloud-delivered intrusion prevention that inspects internet, WAN and cloud traffic, including TLS, and blocks malicious activity inline.',
    meta: 'Cloud-delivered intrusion prevention that inspects internet, WAN and cloud traffic and blocks known and emerging attacks in real time.',
    problemHeading: 'Signatures alone miss modern attacks',
    problemIntro: 'Evolving threats evade signature-based defenses and hide inside encrypted traffic.',
    problem: [
      { icon: 'radar', title: 'Evasive threats', body: 'Domain squatting, DGAs and brand impersonation slip past static signatures.' },
      { icon: 'lock', title: 'Encrypted traffic', body: 'TLS hides attacks from appliances that cannot inspect it.' },
      { icon: 'clock', title: 'Emerging CVEs', body: 'Exploits land before systems can be patched.' },
    ],
    capHeading: 'Detection beyond signatures',
    capIntro: 'AI/ML models, heuristics and 250+ threat feeds find known and emerging attacks.',
    capabilities: [
      { title: 'AI/ML threat detection', body: 'Real-time models detect domain squatting, DGAs, brand impersonation and other evasive threats.', bullets: ['Domain squatting and DGA detection', 'Brand impersonation', 'Behavioral analysis'], image: { src: 'img/ips-connected-city.jpg', alt: 'City skyline with glowing blue network connections', width: 1400, height: 650 } },
      { title: 'Ransomware kill-chain defense', body: 'Block malicious downloads and command-and-control, and detect lateral movement across the WAN.', bullets: ['Malicious download blocking', 'C&C domain blocking', 'Lateral-movement detection'], image: { src: 'img/ips-threat-network.jpg', alt: 'Orange network pathways and interconnected digital nodes', width: 1400, height: 700 } },
      { title: 'Virtual patching', body: 'Deploy mitigations for high-risk emerging CVEs while impacted systems are patched.', bullets: ['Emerging-CVE mitigation', '250+ threat intelligence feeds', 'Global geo-fencing'], image: { src: 'img/ips-virtual-patching.jpg', alt: 'Person working on a laptop with digital technology graphics', width: 1400, height: 502 } },
    ],
    proof: { stats: [
      { value: '250+', label: 'threat intelligence feeds' },
      { value: 'TLS', label: 'traffic inspected inline' },
      { value: '24/7', label: 'adaptive protection' },
    ] },
    faq: [
      { q: 'How does it go beyond signatures?', a: 'AI/ML models, purpose-built heuristics and aggregated threat intelligence detect evasive and emerging attacks.' },
      { q: 'Can it protect systems while they are being patched?', a: 'Yes. Virtual patching deploys mitigations for high-risk CVEs before systems are updated.' },
      { q: 'Does it work for remote users and cloud?', a: 'Yes. It inspects branch, cloud and remote-user traffic without appliance sizing limits.' },
    ],
  }),

  buildProduct({
    slug: 'dns-security', title: 'DNS Security', category: 'network-security',
      platform: { scene: 'dns', heading: 'Bad domains never resolve.', intro: 'Every tunnel carries its own DNS control. Requests for malicious, phishing and newly registered domains are stopped before a connection is made, while legitimate lookups resolve instantly.' },
    heroVariant: 'terminal', eyebrow: 'Network Security',
    headline: 'Secure the protocol attackers hide in',
    sub: 'Inspect DNS requests in real time, block malicious destinations before connection, and detect phishing, tunneling and crypto-mining hidden in DNS traffic.',
    meta: 'DNS Security that inspects requests in real time, blocks malicious domains and detects phishing, tunneling and crypto-mining.',
    problemHeading: 'DNS is a blind spot',
    problemIntro: 'Attackers exploit DNS because it is rarely inspected, hiding phishing, tunneling and data exfiltration in plain sight.',
    problem: [
      { icon: 'globe', title: 'Malicious domains', body: 'Requests to C&C and phishing sites go through before any session is blocked.' },
      { icon: 'database', title: 'DNS tunneling', body: 'Data exfiltration hides inside legitimate-looking DNS queries.' },
      { icon: 'bolt', title: 'Crypto-mining', body: 'Mining traffic degrades endpoints and inflates costs, unseen.' },
    ],
    capHeading: 'Block before connection',
    capIntro: 'Every DNS request is inspected and scored in real time, so malicious destinations are stopped before a session begins.',
    capabilities: [
      { title: 'AI-based phishing protection', body: 'Analyze webpage components, domain age, popularity and phishing-toolkit patterns to stop credential harvesting.', bullets: ['Phishing-toolkit detection', 'Domain reputation analysis', 'Credential-harvesting prevention'] },
      { title: 'DNS tunneling detection', body: 'Inspect packet size, record type and subdomain ratios to identify anomalous exfiltration.', bullets: ['Exfiltration detection', 'Threat-agnostic analysis', 'Anomaly-based blocking'] },
      { title: 'Unified event visibility', body: 'Log every DNS threat event in one searchable data lake and dashboard.', bullets: ['Centralized DNS events', 'Crypto-mining prevention', 'Investigation and reporting'] },
    ],
    faq: [
      { q: 'What can DNS Security detect?', a: 'Phishing, impersonation, DNS tunneling, crypto-mining and malicious domains, including threats hiding in permitted DNS traffic.' },
      { q: 'Does it slow down lookups?', a: 'No. Inspection happens in real time in the cloud without adding latency.' },
    ],
  }),

  buildProduct({
    slug: 'swg', title: 'Secure Web Gateway (SWG)', category: 'network-security',
      platform: { scene: 'swg', heading: 'Risky websites stopped at the gateway.', intro: 'Every user and device browses through its own Secure Web Gateway. Malicious sites and downloads are blocked inline, while approved sites load normally.' },
    heroVariant: 'centered', eyebrow: 'Network Security',
    headline: 'Filter the web. Protect every user.',
    sub: 'Control web access from the cloud, block malicious destinations and enforce one consistent policy across users, devices and locations.',
    meta: 'Secure Web Gateway that blocks web threats and enforces one policy across users, devices and locations.',
    problemHeading: 'The web is the riskiest surface',
    problemIntro: 'Users browse from anywhere, on any device, and every click is a potential compromise.',
    problem: [
      { icon: 'globe', title: 'Web-borne threats', body: 'Malicious, compromised and phishing sites load before anyone notices.' },
      { icon: 'laptop', title: 'Inconsistent policy', body: 'Office, remote and mobile users each get different, weaker controls.' },
      { icon: 'file', title: 'No visibility', body: 'Without event logging, you cannot see what users actually accessed.' },
    ],
    capHeading: 'One web policy, everywhere',
    capIntro: 'Classify sites, enforce policy and log every event from the cloud.',
    capabilities: [
      { title: 'Malicious-domain blocking', body: 'An always-current blacklist blocks phishing, compromised, malicious and parked sites.', bullets: ['80+ website categories', 'Always-current blacklist', 'Parked and compromised sites'] },
      { title: 'Flexible policy actions', body: 'Choose Allow, Block or Prompt, with Safe Search and content restrictions built in.', bullets: ['Safe Search enforcement', 'Per-user and per-device rules', 'Custom block and prompt pages'] },
      { title: 'Encrypted-session inspection', body: 'Inspect internet traffic, including encrypted sessions, and log normalized events for review.', bullets: ['TLS inspection', 'Searchable event data lake', 'Reporting and audit support'] },
    ],
    faq: [
      { q: 'Does it cover remote workers?', a: 'Yes. One policy applies consistently across users, devices and locations, including remote work.' },
      { q: 'Can users request exceptions?', a: 'Yes. Custom prompt pages let users request exceptions that IT approves.' },
    ],
  }),

  /* ============ Zero Trust & Cloud Security ============ */
  buildProduct({
    slug: 'ztna', title: 'Universal Zero Trust Network Access', category: 'zero-trust-cloud',
      platform: { scene: 'ztna', heading: 'No trust, no tunnel.', intro: 'Access starts with identity and device posture. An unverified user or device is denied at the tunnel, and every verified one gets a private connection to only the apps it is allowed to use.' },
    heroVariant: 'split', eyebrow: 'Zero Trust',
    headline: 'One access policy. Every user, everywhere.',
    sub: 'Identity- and context-based least-privilege access to private resources, with continuous posture checks, and a better experience than VPN.',
    meta: 'Universal Zero Trust Network Access with identity- and context-based least-privilege access and continuous device posture checks.',
    problemHeading: 'VPNs grant too much trust',
    problemIntro: 'Broad perimeter access means a single compromised credential unlocks the whole network.',
    problem: [
      { icon: 'key', title: 'Broad perimeter access', body: 'VPN puts users on the network, not on the specific app they need.' },
      { icon: 'laptop', title: 'Untrusted devices', body: 'Posture is checked once at login, then never again.' },
      { icon: 'clock', title: 'Poor remote experience', body: 'Backhauling through a VPN hub adds latency and frustration.' },
    ],
    capHeading: 'Least privilege, continuously verified',
    capIntro: 'Grant only the access each user needs, and re-verify posture for every session.',
    capabilities: [
      { title: 'Single risk-based policy', body: 'Control access by identity, device posture, geography, application risk and compliance context.', bullets: ['Identity- and context-based access', 'Application-risk policy', 'Compliance-aware decisions'] },
      { title: 'Continuous device posture', body: 'Check OS, antivirus, encryption, firewall and location at connection and throughout the session.', bullets: ['Posture checks mid-session', 'BYOD via browser extension', 'Continuous enforcement'] },
      { title: 'Clientless application access', body: 'Publish private apps through a browser portal for users and third parties, no client required.', bullets: ['Clientless access', 'Windows, macOS, iOS, Android, Linux', 'Private-backbone performance'] },
    ],
    proof: { stats: [
      { value: '0', label: 'trust assumed by default' },
      { value: '5', label: 'operating systems supported' },
      { value: '100%', label: 'of sessions posture-checked' },
    ] },
    faq: [
      { q: 'Does ZTNA replace my VPN?', a: 'Yes. It replaces broad perimeter access with granular, per-resource policies and a better remote experience.' },
      { q: 'Can unmanaged devices connect?', a: 'Yes. BYOD and unmanaged devices get granular zero-trust access through a browser extension or clientless portal.' },
      { q: 'What happens if a device fails a posture check?', a: 'Access is terminated or restricted automatically until the device is remediated.' },
    ],
  }),

  buildProduct({
    slug: 'casb', title: 'Cloud Access Security Broker (CASB)', category: 'zero-trust-cloud',
    platform: { scene: 'casb', heading: 'Shadow IT stopped at the tunnel.', intro: 'Every user and device reaches cloud apps through its own tunnel, and the CASB control sees every request. Risky and unsanctioned apps are blocked, while approved apps keep working.' },
    heroVariant: 'diagram', eyebrow: 'Cloud Security',
    headline: 'See every cloud app. Govern every action.',
    sub: 'Discover sanctioned and unsanctioned cloud apps, score their risk with ML, and enforce least-privilege controls across users, devices and services.',
    meta: 'Cloud Access Security Broker that discovers shadow IT, scores application risk and enforces least-privilege controls across cloud apps.',
    problemHeading: 'Shadow IT is invisible risk',
    problemIntro: 'Users adopt cloud apps without IT, and you cannot govern what you cannot see.',
    problem: [
      { icon: 'database', title: 'Shadow IT', body: 'Unsanctioned apps and GenAI services operate outside your control.' },
      { icon: 'chart', title: 'Unknown risk', body: 'Without scoring, you cannot tell which apps are a liability.' },
      { icon: 'users', title: 'Over-privileged access', body: 'Users hold far more access than they need across SaaS.' },
    ],
    capHeading: 'Visibility, risk, control',
    capIntro: 'Discover cloud apps, score their risk and govern every action by user, app and context.',
    capabilities: [
      { title: 'Cloud application visibility', body: 'Monitor traffic and report sanctioned and unsanctioned apps in a detailed, filterable dashboard.', bullets: ['Shadow IT discovery', 'Usage and action tracking', 'Shadow AI governance'] },
      { title: 'ML-based risk scoring', body: 'Each app gets a calculated risk score with compliance and security insights.', bullets: ['Automated data collection', 'Compliance insights', 'Prioritized remediation'] },
      { title: 'Tenant restriction & least privilege', body: 'Allow only enterprise-sanctioned tenants, and block apps lacking MFA, SSO or compliance.', bullets: ['Tenant restriction', 'Action-level control', 'Managed and unmanaged devices'] },
    ],
    faq: [
      { q: 'How is CASB different from SWG?', a: 'SWG filters web traffic; CASB governs cloud apps: discover, score risk and control actions inside SaaS.' },
      { q: 'Does it cover Shadow AI?', a: 'Yes. It discovers GenAI services, assesses their risk and enforces granular access controls.' },
    ],
  }),

  buildProduct({
    slug: 'dlp', title: 'Data Loss Prevention (DLP)', category: 'zero-trust-cloud',
    platform: {
      scene: 'dlp', heading: 'Sensitive data stays where it belongs.',
      intro: 'Every user and every device has its own tunnel, and every tunnel passes through Data Loss Prevention. When sensitive data tries to leave, it is blocked at the control, without touching anyone else\'s traffic.',
    },
    heroVariant: 'terminal', eyebrow: 'Data Protection',
    headline: 'Protect sensitive data. Everywhere it goes.',
    sub: 'Classify sensitive data and enforce consistent protection across users, locations, private apps, SaaS, email and generative AI.',
    meta: 'Data Loss Prevention that classifies sensitive data and enforces protection across web, SaaS, email and generative AI.',
    problemHeading: 'Data moves faster than policy',
    problemIntro: 'Sensitive data leaves through more channels than ever, from SaaS uploads to GenAI prompts.',
    problem: [
      { icon: 'file', title: 'SaaS and cloud leaks', body: 'Users upload and share sensitive data across ungoverned apps.' },
      { icon: 'zap', title: 'GenAI exposure', body: 'Prompts and uploads to AI tools leak confidential data.' },
      { icon: 'grid', title: 'Inconsistent rules', body: 'Different tools enforce different policies, or none at all.' },
    ],
    capHeading: 'Classify once, enforce everywhere',
    capIntro: 'Built-in and custom detectors identify sensitive data, and one policy follows it across every channel.',
    capabilities: [
      { title: '350+ predefined data types', body: 'Detect common sensitive data, PII and compliance content out of the box.', bullets: ['350+ built-in detectors', 'Custom classification rules', 'MIP labels and regex'] },
      { title: 'Exact Data Match & OCR', body: 'Detect precise records and sensitive content in supported images and documents.', bullets: ['Exact Data Match', 'OCR for images and docs', 'Private app and SaaS protection'] },
      { title: 'Generative AI safeguards', body: 'Scan ChatGPT and other GenAI traffic inline and govern upload and download activity.', bullets: ['GenAI traffic scanning', 'Inline and API controls', 'Centralized DLP visibility'] },
    ],
    faq: [
      { q: 'What channels does DLP cover?', a: 'Private apps, SaaS, email, web and generative AI, inspected inline and out-of-band.' },
      { q: 'Can it detect data inside images?', a: 'Yes, via OCR on supported images and documents.' },
    ],
  }),

  buildProduct({
    slug: 'ai-security', title: 'AI Security for End Users', category: 'zero-trust-cloud',
    platform: { scene: 'ai', heading: 'AI use, without the data leak.', intro: 'Every tunnel carries its own AI Security control. Sensitive prompts and files are caught and redacted before they reach an AI tool, so people can use AI safely.' },
    heroVariant: 'centered', eyebrow: 'AI Security',
    headline: 'Confident AI adoption without losing control',
    sub: 'Discover shadow AI, understand AI risk, and enforce policy on prompts, responses, uploads and agent actions.',
    meta: 'AI Security that discovers shadow AI, assesses AI risk and enforces guardrails on prompts, responses, uploads and agent actions.',
    problemHeading: 'AI moves faster than governance',
    problemIntro: 'Employees adopt AI tools that security cannot see, and sensitive data flows into them.',
    problem: [
      { icon: 'zap', title: 'Shadow AI', body: 'Unsanctioned tools, models, copilots and agents operate outside policy.' },
      { icon: 'file', title: 'Data leakage', body: 'Users paste confidential data into prompts and uploads.' },
      { icon: 'radar', title: 'Unknown risk', body: 'AI usage is not connected to business impact or regulation.' },
    ],
    capHeading: 'Discover, assess, govern, enforce',
    capIntro: 'A full AI security lifecycle: see what AI is used, score its risk, and enforce guardrails in real time.',
    capabilities: [
      { title: 'AI app and agent discovery', body: 'Inventory sanctioned and unsanctioned AI tools, copilots, models and agents.', bullets: ['Shadow AI discovery', 'Agent and MCP profiling', 'Usage-to-user mapping'] },
      { title: 'Prompt & response inspection', body: 'Analyze the intent of prompts, responses and actions beyond simple keywords.', bullets: ['Intent analysis', 'Risk scoring in context', 'GDPR, NIST, OWASP, EU AI Act mapping'] },
      { title: 'Real-time guardrails', body: 'Block or redact sensitive data and redirect users toward approved tools.', bullets: ['Block and redact controls', 'Approved-tool redirection', 'Real-time policy enforcement'] },
    ],
    faq: [
      { q: 'Does it block legitimate AI use?', a: 'No. It redacts or redirects sensitive actions while allowing approved work to continue.' },
      { q: 'What frameworks does it align to?', a: 'GDPR, NIST, OWASP and the EU AI Act.' },
    ],
  }),

  /* ============ Security Operations ============ */
  buildProduct({
    slug: 'siem', title: 'SIEM Platform', category: 'security-operations',
    platform: { scene: 'siem', heading: 'Every tunnel feeds one picture.', intro: 'Each tunnel streams its events to the SIEM. Signals from many users and devices are correlated into a single attack story, so the threat is spotted and contained quickly.' },
    heroVariant: 'split', eyebrow: 'Security Operations',
    headline: 'Security log analysis, vulnerability detection and compliance in one',
    sub: 'Aggregate logs from endpoints, network and cloud, detect threats in real time, audit configurations against CIS benchmarks, and prove compliance.',
    meta: 'A SIEM platform for security log analysis, vulnerability detection, configuration assessment and regulatory compliance.',
    problemHeading: 'Logs everywhere, insight nowhere',
    problemIntro: 'Security data is scattered across tools, and teams cannot connect logs, vulnerabilities and compliance.',
    problem: [
      { icon: 'file', title: 'Scattered logs', body: 'Endpoints, network and cloud each keep their own logs, unconnected.' },
      { icon: 'radar', title: 'Silent vulnerabilities', body: 'CVEs go unnoticed because inventory is never matched to threat intelligence.' },
      { icon: 'scale', title: 'Audit gaps', body: 'Compliance evidence lives in spreadsheets, not in the systems being monitored.' },
    ],
    capHeading: 'Four pillars of security operations',
    capIntro: 'Log analysis, vulnerability detection, configuration assessment and compliance, in one platform.',
    capabilities: [
      { title: 'Security log analysis', body: 'Aggregate logs from endpoints, network devices, cloud and apps, and detect anomalies in real time.', bullets: ['Comprehensive log collection', 'Decoders and correlation rules', 'Contextual alerting'] },
      { title: 'Vulnerability detection', body: 'Collect software inventories, match them against vulnerability databases, and prioritize risk.', bullets: ['Endpoint software inventory', 'Threat-intelligence correlation', 'Risk-based prioritization'] },
      { title: 'Configuration & compliance', body: 'Audit configurations against CIS benchmarks and map findings to compliance controls.', bullets: ['CIS benchmark auditing', 'Remediation guidance', 'Automated compliance reporting'] },
    ],
    proof: { stats: [
      { value: '24/7', label: 'real-time threat detection' },
      { value: 'CIS', label: 'benchmark configuration audits' },
      { value: '1', label: 'unified security + compliance platform' },
    ] },
    faq: [
      { q: 'What does the SIEM collect from?', a: 'Endpoints, network devices, cloud workloads and applications, unified into one platform.' },
      { q: 'Does it do vulnerability management?', a: 'Yes. It inventories software, correlates it with vulnerability databases and prioritizes CVEs.' },
      { q: 'Can it produce compliance evidence?', a: 'Yes. It maps findings to specific controls and generates auditor-ready reports.' },
    ],
  }),

  buildProduct({
    slug: 'patch-management', title: 'Managed Patch Management', category: 'security-operations',
    platform: { scene: 'patch', heading: 'Vulnerabilities closed automatically.', intro: 'Every device gets the patches it needs, delivered through its own tunnel. Vulnerabilities are closed on schedule and compliance is reported, without chasing users.' },
    heroVariant: 'diagram', eyebrow: 'Security Operations',
    headline: 'Reduce exposure. Improve patch compliance.',
    sub: 'Managed patch operations that combine centralized visibility, automated scheduling, policy control and technician oversight across your endpoints.',
    meta: 'Managed patch management with automated scheduling, risk-based prioritization and policy control across Windows, macOS and Linux.',
    problemHeading: 'Unpatched systems are the easiest way in',
    problemIntro: 'Missing and failed patches are the most common, avoidable entry point in breaches.',
    problem: [
      { icon: 'wrench', title: 'Patch debt', body: 'Updates fall behind and critical vulnerabilities stay open.' },
      { icon: 'clock', title: 'Manual toil', body: 'Technicians spend hours on updates that should be automated.' },
      { icon: 'file', title: 'No proof', body: 'You cannot show auditors that endpoints are actually compliant.' },
    ],
    capHeading: 'Automation with oversight',
    capIntro: 'Automated schedules and policy control, backed by technician oversight and reporting.',
    capabilities: [
      { title: 'Automated schedules', body: 'Set patch windows by endpoint, group, customer or policy, with reboot control.', bullets: ['Windows, macOS and Linux', 'Third-party application patching', 'Maintenance windows'] },
      { title: 'Risk-based prioritization', body: 'Use CVE and CVSS context to focus remediation on what matters most.', bullets: ['CVE/CVSS prioritization', 'Real-time status and alerts', 'On-demand remediation'] },
      { title: 'Operational reporting', body: 'Prove patch compliance and automate feedback with status and automation reports.', bullets: ['Compliance evidence', 'Software bundles', 'Approvals and exclusions'] },
    ],
    proof: { stats: [
      { value: '99%+', label: 'patch success rate' },
      { value: '90%', label: 'reduction in manual patching' },
      { value: '5 min', label: 'average setup time' },
    ] },
    faq: [
      { q: 'Which operating systems are covered?', a: 'Windows, macOS and Linux, plus third-party application patching where supported.' },
      { q: 'Is it fully automated?', a: 'Yes, automated schedules and policies handle updates, with technician oversight for exceptions.' },
      { q: 'How do I prove compliance?', a: 'Status visibility and operational reporting provide compliance evidence for review.' },
    ],
  }),
];
