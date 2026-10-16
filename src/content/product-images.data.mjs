// Capability visuals. Photo sources: docs/product-image-sources.json.
// FWaaS generated artwork and prompts: docs/fwaas-image-prompts.md.
// CASB generated artwork and prompts: docs/casb-image-prompts.md.
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
  dlp: images('dlp', [
    'Organized rows of labeled document binders',
    'Stacks of paper documents and file folders',
    'AI lettering on a teal circuit board',
  ]),
  'ai-security': images('ai-security', [
    'Connected nodes forming a digital sphere',
    'AI chat interface displayed on a computer screen',
    'Circuit board illustration with a digital brain',
  ]),
  siem: images('siem', [
    'Data visualization with colorful charts and graphs',
    'Analyst working at a desk with three monitors',
    'Person reviewing and writing on a business report',
  ]),
  'patch-management': images('patch-management', [
    'Laptop and monitor displaying software development tools',
    'Source code displayed on a laptop screen',
    'Computer screen showing a bar chart and tabular report',
  ]),
};
