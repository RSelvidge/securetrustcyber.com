// src/content/ring-hero.data.mjs — copy shown inside the product-page ring hero (components/hero.mjs, variant 'ring').
// Name and the three capability areas come from each product's datasheet (assets/datasheets).
// `ring` must match the ring that holds the product in tools/ring-hero/ring-hero.mjs.

export const RING_HERO = {
  siem: { ring: 'Detect it', name: 'SIEM Platform', points: ['Security log analysis', 'Vulnerability detection', 'CIS benchmark auditing'] },
  ips: { ring: 'Detect it', name: 'Intrusion Prevention System', points: ['AI/ML threat detection', 'Ransomware kill-chain defense', 'Virtual patching'] },
  swg: { ring: 'Protect it', name: 'Secure Web Gateway', points: ['Malicious-domain blocking', 'Allow, Block or Prompt', 'Encrypted-session inspection'] },
  fwaas: { ring: 'Protect it', name: 'Firewall-as-a-Service', points: ['Internet, WAN and LAN inspection', 'Microsegmentation', 'Centralized policy'] },
  'dns-security': { ring: 'Protect it', name: 'DNS Security', points: ['AI-based phishing protection', 'DNS tunneling detection', 'Unified event visibility'] },
  ztna: { ring: 'Control it', name: 'Universal ZTNA', points: ['Single risk-based policy', 'Continuous device posture', 'Clientless app access'] },
  casb: { ring: 'Control it', name: 'Cloud Access Security Broker', points: ['Shadow IT discovery', 'ML-based risk scoring', 'Tenant restriction'] },
  dlp: { ring: 'Control it', name: 'Data Loss Prevention', points: ['350 predefined data types', 'Exact Data Match & OCR', 'Generative AI safeguards'] },
  'patch-management': { ring: 'Maintain it', name: 'Managed Patch Management', points: ['Automated schedules', 'CVE/CVSS prioritization', 'Compliance evidence'] },
  'ai-security': { ring: 'Maintain it', name: 'AI Security for End Users', points: ['Shadow AI discovery', 'Prompt & response inspection', 'Real-time guardrails'] },
};

// Scrolling strip along the bottom of the ring hero.
export const RING_FRAMEWORKS = ['HIPAA', 'ISO 27001', 'CIS Controls', 'CMMC', 'Essential Eight', 'Cyber Essentials', 'DORA', 'NIST CSF'];
