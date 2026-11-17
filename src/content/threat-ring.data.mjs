// src/content/threat-ring.data.mjs — industry threat-ring heroes (hero variant 'threats', scene: tools/ring-hero/threat-ring.mjs).
// For each industry, the product that covers each of its three "threat landscape" items, in order.
// Every mapping follows the threat's own description in industries.data.mjs.

export const RING_PRODUCTS = {
  ips: { label: 'IPS', name: 'Intrusion Prevention' },
  fwaas: { label: 'FWaaS', name: 'Firewall-as-a-Service' },
  ztna: { label: 'ZTNA', name: 'Zero Trust Access' },
  dlp: { label: 'DLP', name: 'Data Loss Prevention' },
  casb: { label: 'CASB', name: 'Cloud Access Security Broker' },
  dns: { label: 'DNS', name: 'DNS Security' },
  siem: { label: 'SIEM', name: 'SIEM Platform' },
  patch: { label: 'PATCH', name: 'Managed Patch Management' },
};

export const THREAT_RING = {
  'financial-services': ['ztna', 'dlp', 'ztna'],           // account takeover · data and payment fraud · third-party risk
  manufacturing: ['fwaas', 'ips', 'fwaas'],                 // OT/IT convergence · ransomware downtime · unpatched industrial systems
  'energy-utilities': ['siem', 'fwaas', 'ztna'],            // nation-state attacks · legacy SCADA · supply-chain compromise
  government: ['dlp', 'fwaas', 'dns'],                      // citizen data · legacy systems · phishing at scale
  education: ['ips', 'ztna', 'dlp'],                        // ransomware on schools · BYOD sprawl · research theft
  retail: ['dlp', 'fwaas', 'ztna'],                         // payment data theft · seasonal spikes (elastic cloud firewall) · e-commerce fraud
  technology: ['casb', 'casb', 'dlp'],                      // supply-chain attacks · cloud sprawl · customer data
  'critical-infrastructure': ['siem', 'fwaas', 'fwaas'],    // nation-state campaigns · cascading failures · legacy OT
  smb: ['ips', 'dns', 'patch'],                             // ransomware · phishing and malicious sites · no security team
};
