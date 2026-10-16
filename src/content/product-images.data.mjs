// Capability visuals. Photo sources: docs/product-image-sources.json.
// FWaaS generated artwork and prompts: docs/fwaas-image-prompts.md.
// CASB generated artwork and prompts: docs/casb-image-prompts.md.
// DLP generated artwork and prompts: docs/dlp-image-prompts.md.
// SIEM generated artwork and prompts: docs/siem-image-prompts.md.
// IPS keeps the three images supplied and approved by the site owner.
const images = (slug, descriptions) => descriptions.map((alt, index) => ({
  src: `img/products/${slug}-${index + 1}.jpg`,
  alt,
  width: 1400,
  height: 788,
}));

export const PRODUCT_IMAGES = {
  fwaas: [
    { src: 'img/products/fwaas-inspection-v2.webp', alt: 'Illustration of office, laptop and cloud traffic passing through an inspection gateway, with harmful packets blocked', width: 1400, height: 788 },
    { src: 'img/products/fwaas-microsegmentation-v2.webp', alt: 'Illustration of isolated user, application and database zones with controlled connections and a blocked lateral path', width: 1400, height: 788 },
    { src: 'img/products/fwaas-centralized-policy-v2.webp', alt: 'Illustration of a central policy hub distributing consistent rules to an office, remote laptop, servers and cloud workloads', width: 1400, height: 788 },
  ],
  'dns-security': images('dns-security', [
    'Padlock on a keyboard under red and green light',
    'Blue network cables connected to a router and switch',
    'Laptop showing usage charts and analytics',
  ]),
  swg: images('swg', [
    'Padlock on a laptop surrounded by colored light trails',
    'Person using a laptop at a desk',
    'Close-up of a laptop keyboard illuminated in blue',
  ]),
  ztna: images('ztna', [
    'Smartphone displaying a security lock symbol',
    'Laptop and smartphone on a wooden work desk',
    'Remote worker accessing a laptop from home',
  ]),
  casb: [
    { src: 'img/products/casb-app-visibility-v2.webp', alt: 'Illustration of a scan revealing cloud applications connected to a laptop, including previously hidden apps', width: 1400, height: 788 },
    { src: 'img/products/casb-risk-scoring-v2.webp', alt: 'Illustration of an analysis core assessing cloud applications with distinct low, medium and high risk gauges', width: 1400, height: 788 },
    { src: 'img/products/casb-tenant-controls-v2.webp', alt: 'Illustration of identity-based policy allowing limited access to an approved cloud tenant and blocking an unsanctioned tenant', width: 1400, height: 788 },
  ],
  dlp: [
    { src: 'img/products/dlp-classification-v2.webp', alt: 'Illustration of documents being scanned and classified as personal, financial and confidential business data', width: 1400, height: 788 },
    { src: 'img/products/dlp-exact-match-ocr-v2.webp', alt: 'Illustration of sensitive regions detected in a scanned document and matched against protected reference records', width: 1400, height: 788 },
    { src: 'img/products/dlp-ai-safeguards-v2.webp', alt: 'Illustration of a DLP gateway withholding sensitive files and redacting a prompt while approved content reaches an AI service', width: 1400, height: 788 },
  ],
  'ai-security': images('ai-security', [
    'Connected nodes forming a digital sphere',
    'AI chat interface displayed on a computer screen',
    'Circuit board illustration with a digital brain',
  ]),
  siem: [
    { src: 'img/products/siem-log-analysis-v2.webp', alt: 'Illustration of endpoint, network and cloud events being correlated into an investigation chain with an alert', width: 1400, height: 788 },
    { src: 'img/products/siem-vulnerability-detection-v2.webp', alt: 'Illustration of software inventories matched against vulnerability records and ranked into risk priorities', width: 1400, height: 788 },
    { src: 'img/products/siem-compliance-evidence-v2.webp', alt: 'Illustration of configuration checks, including an unresolved gap, mapped to supporting audit evidence', width: 1400, height: 788 },
  ],
  'patch-management': images('patch-management', [
    'Laptop and monitor displaying software development tools',
    'Source code displayed on a laptop screen',
    'Computer screen showing a bar chart and tabular report',
  ]),
};
