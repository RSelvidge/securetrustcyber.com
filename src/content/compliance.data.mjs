// src/content/compliance.data.mjs — 7 compliance framework definitions.

const buildCompliance = (c) => ({
  slug: `compliance/${c.slug}`,
  type: 'compliance',
  title: `${c.title} Compliance`,
  metaTitle: `${c.title} Compliance | SecureTrust Cyber`,
  metaDescription: c.meta,
  hero: {
    variant: c.heroVariant ?? 'compact',
    eyebrow: 'Compliance',
    headline: `${c.title} compliance, simplified`,
    sub: c.sub,
    primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
    secondary: { label: 'See the platform', href: 'products' },
    media: c.title,
    chips: c.chips ?? [],
  },
  summaryHeading: `What ${c.title} requires`,
  summary: c.summary,
  controlMap: {
    eyebrow: 'Requirements mapped',
    heading: `How SecureTrust Cyber helps you meet ${c.title}`,
    rows: c.controlMap,
  },
  evidence: c.evidence,
  faq: c.faq,
  cta: { heading: 'Prove compliance, not just claim it', body: 'See how SecureTrust Cyber maps to your obligations.' },
});

export const COMPLIANCE = [
  buildCompliance({
    slug: 'iso-27001', title: 'ISO 27001', heroVariant: 'centered',
    sub: 'Build and prove an information security management system with controls that map to Annex A.',
    meta: 'Build and prove an ISO 27001 information security management system with controls mapped to Annex A.',
    chips: ['Annex A controls'],
    summary: 'ISO 27001 is the international standard for an information security management system (ISMS). It requires a risk-driven set of controls across Annex A, and continuous improvement. Certification demands evidence, not just intent.',
    controlMap: [
      { requirement: 'A.8.8: Technical vulnerability management', answer: 'Automated patch scheduling and risk-based prioritization close vulnerabilities systematically.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'A.8.2: Privileged access rights', answer: 'Identity- and context-based least-privilege access to private resources.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'A.8.16: Monitoring activities', answer: 'Centralized log collection and real-time threat detection across the estate.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'A.8.24: Use of cryptography', answer: 'TLS inspection across internet, WAN and LAN, with device posture checks that verify encryption.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
    ],
    evidence: [
      { title: 'Control evidence', body: 'Reports and logs that demonstrate each Annex A control.' },
      { title: 'Risk visibility', body: 'The data you need for your risk assessment.' },
      { title: 'Continuous improvement', body: 'Metrics like patch coverage that show a live ISMS.' },
      { title: 'Audit trails', body: 'Admin and access records for the certification audit.' },
    ],
    faq: [
      { q: 'Does SecureTrust Cyber make me ISO 27001 certified?', a: 'No, certification comes from an accredited auditor. The platform provides the controls and evidence that make certification achievable.' },
    ],
  }),

  buildCompliance({
    slug: 'cis-controls', title: 'CIS Controls', heroVariant: 'compact',
    sub: 'Align to the 18 CIS Critical Security Controls with safeguards that map directly to platform capabilities.',
    meta: 'Align to the 18 CIS Critical Security Controls with safeguards mapped to SecureTrust Cyber capabilities.',
    chips: ['CIS v8'],
    summary: 'The CIS Controls are a prioritized set of 18 safeguards that defend against the most common attacks. They are the practical backbone of most security programs and map well onto ISO 27001.',
    controlMap: [
      { requirement: 'Control 1: Inventory of enterprise assets', answer: 'Endpoint software and asset inventory, correlated with threat intelligence.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'Control 7: Continuous vulnerability management', answer: 'Automated patching with CVE/CVSS risk-based prioritization.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Control 6: Access control management', answer: 'Least-privilege access enforced by identity and device posture.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'Control 9: Email and web protections', answer: 'Secure Web Gateway and DNS Security block the most common web-borne vectors.', href: 'products/swg', product: 'Secure Web Gateway' },
      { requirement: 'Control 4: Secure configuration of assets', answer: 'Continuous configuration auditing against CIS benchmarks.', href: 'products/siem', product: 'SIEM Platform' },
    ],
    evidence: [
      { title: 'Asset inventory', body: 'A live view of every device and application.' },
      { title: 'Patch coverage', body: 'Proof of continuous vulnerability management.' },
      { title: 'Access controls', body: 'Evidence of least privilege in practice.' },
      { title: 'Web defenses', body: 'Logs showing blocked web threats.' },
    ],
    faq: [
      { q: 'Do the CIS Controls replace ISO 27001?', a: 'They are complementary. CIS Controls are prescriptive safeguards; ISO 27001 is a management framework. SecureTrust supports both.' },
    ],
  }),

  buildCompliance({
    slug: 'cyber-essentials', title: 'Cyber Essentials', heroVariant: 'compact',
    sub: 'Achieve the UK Cyber Essentials certification with controls that cover the five technical themes.',
    meta: 'Achieve UK Cyber Essentials certification with controls that cover the five technical security themes.',
    chips: ['UK NCSC'],
    summary: 'Cyber Essentials is a UK government-backed certification covering five technical controls: firewalls, secure configuration, access control, malware protection and patching. It is often a prerequisite for public-sector work.',
    controlMap: [
      { requirement: 'Firewalls', answer: 'Cloud-delivered Firewall-as-a-Service provides a managed perimeter.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'Secure configuration', answer: 'Continuous configuration assessment against CIS benchmarks.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'Access control', answer: 'Least-privilege access enforced by identity and context.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'Patch management', answer: 'Automated patch scheduling keeps everything current.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Malware protection', answer: 'IPS and DNS Security block malware and malicious domains inline.', href: 'products/ips', product: 'Intrusion Prevention System' },
    ],
    evidence: [
      { title: 'Perimeter proof', body: 'Demonstrate your firewall and web controls.' },
      { title: 'Patch coverage', body: 'Evidence every device is current.' },
      { title: 'Access control', body: 'Show least privilege in practice.' },
      { title: 'Malware defense', body: 'Logs of blocked threats.' },
    ],
    faq: [
      { q: 'How long does Cyber Essentials take?', a: 'With the controls already in place via SecureTrust Cyber, most organizations complete the self-assessment in days.' },
    ],
  }),

  buildCompliance({
    slug: 'hipaa', title: 'HIPAA', heroVariant: 'centered',
    sub: 'Protect electronic protected health information and demonstrate HIPAA Security Rule compliance.',
    meta: 'Protect electronic protected health information and demonstrate HIPAA Security Rule compliance.',
    chips: ['Security Rule', '45 CFR §164'],
    summary: 'The HIPAA Security Rule requires administrative, physical and technical safeguards to protect electronic protected health information (ePHI). The technical safeguards are where SecureTrust Cyber directly applies.',
    controlMap: [
      { requirement: 'Access control (§164.312(a)(1))', answer: 'Identity- and context-based least-privilege access to systems holding ePHI.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'Audit controls (§164.312(b))', answer: 'Centralized log collection and event correlation for a complete audit trail.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'Integrity (§164.312(c)(1))', answer: 'IPS and DLP prevent unauthorized modification and exfiltration of ePHI.', href: 'products/ips', product: 'Intrusion Prevention System' },
      { requirement: 'Transmission security (§164.312(e)(1))', answer: 'TLS inspection and DLP protect ePHI in transit across web, SaaS and email.', href: 'products/dlp', product: 'Data Loss Prevention' },
    ],
    evidence: [
      { title: 'Access audit', body: 'Records of who accessed what, and when.' },
      { title: 'Data protection', body: 'DLP policy and violation reports covering ePHI.' },
      { title: 'Integrity controls', body: 'Evidence of inline threat prevention.' },
      { title: 'Risk analysis data', body: 'Asset and vulnerability visibility for your risk analysis.' },
    ],
    faq: [
      { q: 'Does SecureTrust Cyber sign a Business Associate Agreement?', a: 'For managed services, yes. Contact us to execute a BAA.' },
    ],
  }),

  buildCompliance({
    slug: 'dora', title: 'DORA', heroVariant: 'compact',
    sub: 'Meet the Digital Operational Resilience Act for financial entities with ICT risk and incident controls.',
    meta: 'Meet the Digital Operational Resilience Act (DORA) with ICT risk management and incident reporting controls.',
    chips: ['Regulation (EU) 2022/2554'],
    summary: 'DORA imposes a uniform framework for ICT risk management, incident reporting, resilience testing and third-party risk across EU financial entities. It entered application in January 2025.',
    controlMap: [
      { requirement: 'ICT risk management (Art. 6)', answer: 'Continuous vulnerability management and configuration visibility.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Incident reporting (Art. 19)', answer: 'Real-time log analysis and threat detection meet strict reporting timelines.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'Resilience testing (Art. 24)', answer: 'Inline attack prevention and virtual patching validate controls under pressure.', href: 'products/ips', product: 'Intrusion Prevention System' },
      { requirement: 'Third-party risk (Art. 28)', answer: 'Least-privilege access governs how third parties reach your systems.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    evidence: [
      { title: 'ICT inventory', body: 'Complete visibility of your digital estate.' },
      { title: 'Incident timelines', body: 'Evidence to support rapid reporting.' },
      { title: 'Prevention data', body: 'Inline threat-blocking and mitigation records.' },
      { title: 'Third-party access', body: 'Governed, audited access.' },
    ],
    faq: [
      { q: 'Does DORA apply to my firm?', a: 'DORA applies to a broad range of financial entities including banks, insurers, investment firms and ICT service providers to them.' },
    ],
  }),

  buildCompliance({
    slug: 'essential-eight', title: 'Essential Eight', heroVariant: 'compact',
    sub: 'Implement the Australian Cyber Security Centre Essential Eight mitigation strategies.',
    meta: 'Implement the Australian Essential Eight mitigation strategies with SecureTrust Cyber capabilities.',
    chips: ['ACSC'],
    summary: 'The Essential Eight are eight mitigation strategies from the Australian Cyber Security Centre that provide a strong baseline against cyber threats. Three maturity levels (0–3) guide progressive implementation.',
    controlMap: [
      { requirement: 'Patch applications & operating systems', answer: 'Automated patch scheduling across Windows, macOS and Linux.', href: 'products/patch-management', product: 'Managed Patch Management' },
      { requirement: 'Application control', answer: 'Govern which cloud apps and tenants users can access.', href: 'products/casb', product: 'CASB' },
      { requirement: 'Restrict administrative privileges', answer: 'Identity- and context-based least-privilege access.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'Multi-factor authentication', answer: 'Identity-based access with continuous posture checks.', href: 'products/ztna', product: 'Universal ZTNA' },
    ],
    evidence: [
      { title: 'Patch evidence', body: 'Coverage reports at every maturity level.' },
      { title: 'Application controls', body: 'Proof of cloud app governance in place.' },
      { title: 'Privilege audit', body: 'Records of controlled access.' },
      { title: 'Identity enforcement', body: 'Posture and access policy evidence.' },
    ],
    faq: [
      { q: 'What maturity level can I reach?', a: 'SecureTrust Cyber supports the technical controls for all three maturity levels; the level you claim depends on your broader program.' },
    ],
  }),

  buildCompliance({
    slug: 'cmmc', title: 'CMMC', heroVariant: 'compact',
    sub: 'Meet the US Department of Defense CMMC 2.0 requirements for protecting CUI and FCI across all maturity levels.',
    meta: 'Meet CMMC 2.0 requirements for protecting Controlled Unclassified Information and Federal Contract Information.',
    chips: ['CMMC 2.0', 'NIST SP 800-171', 'NIST SP 800-172'],
    summary: 'CMMC 2.0 requires defense contractors to protect Controlled Unclassified Information (CUI) and Federal Contract Information (FCI) at one of three maturity levels: Foundational, Advanced or Expert. The technical requirements map closely to NIST SP 800-171, and SecureTrust Cyber provides the controls and evidence to demonstrate them.',
    controlMap: [
      { requirement: 'AC.L2: Access control', answer: 'Identity- and context-based least-privilege access to systems holding CUI.', href: 'products/ztna', product: 'Universal ZTNA' },
      { requirement: 'AU.L2: Audit & accountability', answer: 'Centralized log collection and correlation produce a complete audit trail.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'CM.L2: Configuration management', answer: 'Continuous configuration assessment against CIS benchmarks.', href: 'products/siem', product: 'SIEM Platform' },
      { requirement: 'SC.L2: System & communications protection', answer: 'Microsegmentation and TLS inspection protect systems and data in transit.', href: 'products/fwaas', product: 'Firewall-as-a-Service' },
      { requirement: 'SI.L2: System & information integrity', answer: 'Inline IPS and DLP prevent unauthorized modification and exfiltration of CUI.', href: 'products/ips', product: 'Intrusion Prevention System' },
      { requirement: 'RA.L2: Risk assessment & vulnerability management', answer: 'Automated patching and vulnerability detection reduce exposure.', href: 'products/patch-management', product: 'Managed Patch Management' },
    ],
    evidence: [
      { title: 'Access audit', body: 'Records of least-privilege access to CUI and FCI.' },
      { title: 'Audit logs', body: 'Centralized, searchable event logs for audit and accountability.' },
      { title: 'Configuration evidence', body: 'CIS-benchmark assessment reports for configuration management.' },
      { title: 'Vulnerability evidence', body: 'Patch coverage and vulnerability reports for risk assessment.' },
    ],
    faq: [
      { q: 'What CMMC level do I need?', a: 'It depends on your contract. Level 1 (Foundational) covers FCI, Level 2 (Advanced) covers CUI, and Level 3 (Expert) covers the most sensitive programs. Your contracting officer specifies the required level.' },
      { q: 'Does SecureTrust Cyber make me CMMC certified?', a: 'No, certification comes from a C3PAO (Level 2) or the government (Level 3). The platform provides the technical controls and evidence that make certification achievable.' },
    ],
  }),
];
