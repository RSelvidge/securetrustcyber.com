// src/site.registry.mjs — THE page registry: single source of truth for every
// page's slug, title, and where it appears in navigation. The mega-menu, footer,
// HTML sitemap, sitemap.xml, breadcrumbs, and link validation all project from
// this list. Add a page here and it appears everywhere, with zero edits to the
// header, footer, or any other page.

const page = (slug, title, extra = {}) => ({ slug, title, ...extra });

export const PAGES = [
  /* ================= Products (menu: products) ================= */
  page('products', 'All Products', {
    group: 'products', order: -10, icon: 'grid',
    blurb: 'Every capability in one converged cloud platform.',
    mega: { menu: 'products', col: 0 }, footer: 'products',
  }),

  // — Network Security (col 0)
  page('products/fwaas', 'Firewall-as-a-Service', {
    group: 'products', category: 'network-security', order: 0, icon: 'shield',
    blurb: 'Cloud-delivered firewall for every user, site and network.',
    mega: { menu: 'products', col: 0 }, footer: 'products',
  }),
  page('products/ips', 'Intrusion Prevention System', {
    group: 'products', category: 'network-security', order: 1, icon: 'shield',
    blurb: 'Stop attacks in real time with AI/ML detection.',
    mega: { menu: 'products', col: 0 }, footer: 'products',
  }),
  page('products/dns-security', 'DNS Security', {
    group: 'products', category: 'network-security', order: 2, icon: 'globe',
    blurb: 'Block malicious domains and detect hidden DNS abuse.',
    mega: { menu: 'products', col: 0 }, footer: 'products',
  }),
  page('products/swg', 'Secure Web Gateway', {
    group: 'products', category: 'network-security', order: 3, icon: 'globe',
    blurb: 'Filter the web and enforce one policy everywhere.',
    mega: { menu: 'products', col: 0 }, footer: 'products',
  }),

  // — Zero Trust & Cloud Security (col 1)
  page('products/ztna', 'Universal ZTNA', {
    group: 'products', category: 'zero-trust-cloud', order: 0, icon: 'key',
    blurb: 'Identity- and context-based least-privilege access.',
    mega: { menu: 'products', col: 1 }, footer: 'products',
  }),
  page('products/casb', 'CASB', {
    group: 'products', category: 'zero-trust-cloud', order: 1, icon: 'database',
    blurb: 'See every cloud app. Govern every action.',
    mega: { menu: 'products', col: 1 }, footer: 'products',
  }),
  page('products/dlp', 'Data Loss Prevention', {
    group: 'products', category: 'zero-trust-cloud', order: 2, icon: 'lock',
    blurb: 'Protect sensitive data everywhere it goes.',
    mega: { menu: 'products', col: 1 }, footer: 'products',
  }),
  page('products/ai-security', 'AI Security for End Users', {
    group: 'products', category: 'zero-trust-cloud', order: 3, icon: 'zap',
    blurb: 'Discover shadow AI and enforce guardrails in real time.',
    mega: { menu: 'products', col: 1 }, footer: 'products',
  }),

  // — Security Operations (col 2)
  page('products/siem', 'SIEM Platform', {
    group: 'products', category: 'security-operations', order: 0, icon: 'radar',
    blurb: 'Log analysis, vulnerability detection and compliance.',
    mega: { menu: 'products', col: 2 }, footer: 'products',
  }),
  page('products/patch-management', 'Managed Patch Management', {
    group: 'products', category: 'security-operations', order: 1, icon: 'wrench',
    blurb: 'Reduce exposure with automated, managed patching.',
    mega: { menu: 'products', col: 2 }, footer: 'products',
  }),

  /* ================= Solutions (menu: solutions) ================= */
  page('solutions', 'All Solutions', {
    group: 'solutions', order: -10, icon: 'grid',
    blurb: 'By compliance, industry, and integration.',
    mega: { menu: 'solutions', col: 0 }, footer: 'solutions',
  }),

  // — Compliance (col 0)
  page('compliance/iso-27001', 'ISO 27001', {
    group: 'compliance', order: 1, icon: 'scale',
    blurb: 'Build and prove an ISMS.',
    mega: { menu: 'solutions', col: 0 }, footer: 'solutions',
  }),
  page('compliance/cis-controls', 'CIS Controls', {
    group: 'compliance', order: 2, icon: 'shield',
    blurb: 'Align to the 18 critical controls.',
    mega: { menu: 'solutions', col: 0 },
  }),
  page('compliance/cyber-essentials', 'Cyber Essentials', {
    group: 'compliance', order: 3, icon: 'shield',
    blurb: 'UK certification, simplified.',
    mega: { menu: 'solutions', col: 0 },
  }),
  page('compliance/hipaa', 'HIPAA', {
    group: 'compliance', order: 4, icon: 'heart',
    blurb: 'Protect patient data end to end.',
    mega: { menu: 'solutions', col: 0 },
  }),
  page('compliance/dora', 'DORA', {
    group: 'compliance', order: 5, icon: 'scale',
    blurb: 'Digital operational resilience for finance.',
    mega: { menu: 'solutions', col: 0 },
  }),
  page('compliance/essential-eight', 'Essential Eight', {
    group: 'compliance', order: 6, icon: 'shield',
    blurb: 'The Australian mitigation framework.',
    mega: { menu: 'solutions', col: 0 },
  }),
  page('compliance/cmmc', 'CMMC', {
    group: 'compliance', order: 7, icon: 'shield',
    blurb: 'US DoD cybersecurity maturity certification.',
    mega: { menu: 'solutions', col: 0 },
  }),

  // — Industries (col 1)
  page('industries/healthcare', 'Healthcare', {
    group: 'industries', order: 0, icon: 'heart',
    blurb: 'HIPAA-aligned protection for clinical estates.',
    mega: { menu: 'solutions', col: 1 }, footer: 'solutions',
  }),
  page('industries/financial-services', 'Financial Services', {
    group: 'industries', order: 1, icon: 'chart',
    blurb: 'Resilience for banks and fintechs.',
    mega: { menu: 'solutions', col: 1 }, footer: 'solutions',
  }),
  page('industries/manufacturing', 'Manufacturing', {
    group: 'industries', order: 2, icon: 'wrench',
    blurb: 'Keep OT and IT running, secure.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/energy-utilities', 'Energy & Utilities', {
    group: 'industries', order: 3, icon: 'bolt',
    blurb: 'Defend critical national infrastructure.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/government', 'Government', {
    group: 'industries', order: 4, icon: 'building',
    blurb: 'Security for the public sector.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/education', 'Education', {
    group: 'industries', order: 5, icon: 'file',
    blurb: 'Protect students, staff and research.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/retail', 'Retail', {
    group: 'industries', order: 6, icon: 'chart',
    blurb: 'PCI-aware security for stores and e-commerce.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/technology', 'Technology', {
    group: 'industries', order: 7, icon: 'laptop',
    blurb: 'Ship fast without shipping risk.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/critical-infrastructure', 'Critical Infrastructure', {
    group: 'industries', order: 8, icon: 'shield',
    blurb: 'Resilience for systems that cannot fail.',
    mega: { menu: 'solutions', col: 1 },
  }),
  page('industries/smb', 'Small & Mid-Sized Business', {
    group: 'industries', order: 9, icon: 'grid',
    blurb: 'Enterprise-grade security, SMB-simple.',
    mega: { menu: 'solutions', col: 1 },
  }),

  // — Compare (col 2)
  page('compare/vs-zscaler', 'vs Zscaler', {
    group: 'competitors', order: 0, icon: 'x',
    blurb: 'The SSE leader vs a full SASE plus operations platform.',
    mega: { menu: 'solutions', col: 2 }, footer: 'solutions',
  }),
  page('compare/vs-netskope', 'vs Netskope', {
    group: 'competitors', order: 1, icon: 'x',
    blurb: 'CASB-first vs the full network and operations stack.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-palo-alto-prisma', 'vs Palo Alto Prisma SASE', {
    group: 'competitors', order: 2, icon: 'x',
    blurb: 'Ecosystem SASE vs one natively integrated platform.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-cloudflare', 'vs Cloudflare', {
    group: 'competitors', order: 3, icon: 'x',
    blurb: 'Network-first Zero Trust vs deeper security.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-perimeter-81', 'vs Perimeter 81', {
    group: 'competitors', order: 4, icon: 'x',
    blurb: 'ZTNA-first vs the full security surface.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-forcepoint', 'vs Forcepoint', {
    group: 'competitors', order: 5, icon: 'x',
    blurb: 'Point-product SSE vs a full platform.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-cisco-secure-access', 'vs Cisco Secure Access', {
    group: 'competitors', order: 6, icon: 'x',
    blurb: 'Assembled SASE vs native integration.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-symantec', 'vs Symantec', {
    group: 'competitors', order: 7, icon: 'x',
    blurb: 'Legacy SWG vs a cloud-native platform.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-iboss', 'vs iboss', {
    group: 'competitors', order: 8, icon: 'x',
    blurb: 'Mid-market SASE vs SASE plus operations.',
    mega: { menu: 'solutions', col: 2 },
  }),
  page('compare/vs-versa', 'vs Versa Networks', {
    group: 'competitors', order: 9, icon: 'x',
    blurb: 'SD-WAN-first vs security-first.',
    mega: { menu: 'solutions', col: 2 },
  }),

  // — Integrations (col 3)
  page('integrations/api-integrations', 'All API Integrations', {
    group: 'integrations', order: 0, icon: 'bolt',
    blurb: 'Connect SecureTrust to your stack.',
    mega: { menu: 'solutions', col: 3 },
  }),
  page('integrations/connectwise-rmm', 'ConnectWise RMM', {
    group: 'integrations', order: 1, icon: 'bolt',
    blurb: 'Sync assets and alerts with your RMM.',
    mega: { menu: 'solutions', col: 3 },
  }),
  page('integrations/autotask-psa', 'Autotask PSA', {
    group: 'integrations', order: 2, icon: 'bolt',
    blurb: 'Push tickets straight into Autotask.',
    mega: { menu: 'solutions', col: 3 },
  }),
  page('integrations/halopsa', 'HaloPSA', {
    group: 'integrations', order: 3, icon: 'bolt',
    blurb: 'Bidirectional ticket sync with Halo.',
    mega: { menu: 'solutions', col: 3 },
  }),
  page('integrations/cisco-meraki', 'Cisco Meraki Firewall', {
    group: 'integrations', order: 4, icon: 'bolt',
    blurb: 'Extend protection to your firewall.',
    mega: { menu: 'solutions', col: 3 },
  }),
  page('integrations/palo-alto', 'Palo Alto', {
    group: 'integrations', order: 5, icon: 'bolt',
    blurb: 'Coordinate with Palo Alto NGFW.',
    mega: { menu: 'solutions', col: 3 },
  }),

  /* ================= Partners (menu: partners) ================= */
  page('partners/index', 'Partner Overview', {
    draft: true,
    group: 'partners', order: 0, icon: 'users',
    blurb: 'Grow your MSP with our platform.',
    mega: { menu: 'partners', col: 0 },
  }),
  page('partners/become-a-partner', 'Become a Channel Partner', {
    draft: true,
    group: 'partners', order: 1, icon: 'arrowRight',
    blurb: 'Join the partner program.',
    mega: { menu: 'partners', col: 0 },
  }),
  page('partners/partner-portal', 'Partner Portal', {
    draft: true,
    group: 'partners', order: 2, icon: 'lock',
    blurb: 'Log in to your partner console.',
    mega: { menu: 'partners', col: 0 },
  }),

  /* ================= Resources (menu: resources) ================= */
  page('resources/index', 'All Resources', {
    group: 'resources', order: -10, icon: 'file',
    blurb: 'Guides, webinars and more.',
    mega: { menu: 'resources', col: 0 }, footer: 'resources',
  }),
  page('resources/whitepapers', 'Whitepapers', {
    group: 'resources', order: 1, icon: 'file',
    blurb: 'In-depth research and analysis.',
    mega: { menu: 'resources', col: 0 }, footer: 'resources',
  }),
  page('resources/customer-stories', 'Customer Stories', {
    group: 'resources', order: 2, icon: 'users',
    blurb: 'How teams like yours use SecureTrust.',
    mega: { menu: 'resources', col: 0 },
  }),
  page('resources/solution-briefs', 'Solution Briefs & Data Sheets', {
    group: 'resources', order: 3, icon: 'file',
    blurb: 'The detail on every capability.',
    mega: { menu: 'resources', col: 0 },
  }),
  page('resources/webinars', 'Webinars', {
    group: 'resources', order: 4, icon: 'play',
    blurb: 'Live and on-demand sessions.',
    mega: { menu: 'resources', col: 0 },
  }),
  page('trust-center', 'Trust Center', {
    group: 'resources', order: 5, icon: 'shield',
    blurb: 'Security, privacy and compliance.',
    mega: { menu: 'resources', col: 1 }, footer: 'resources',
  }),
  page('blog', 'Blog', {
    group: 'resources', order: 6, icon: 'file',
    blurb: 'News, research and guidance.',
    mega: { menu: 'resources', col: 1 }, footer: 'resources',
  }),

  /* ================= Company (menu: company) ================= */
  page('company/about', 'About', {
    group: 'company', order: 0, icon: 'building',
    blurb: 'Who we are and what we build.',
    mega: { menu: 'company', col: 0 }, footer: 'company',
  }),
  page('company/press', 'Press Center', {
    group: 'company', order: 1, icon: 'file',
    blurb: 'Announcements and media resources.',
    mega: { menu: 'company', col: 0 }, footer: 'company',
  }),
  page('company/awards', 'Awards & Accolades', {
    group: 'company', order: 2, icon: 'award',
    blurb: 'Recognition from across the industry.',
    mega: { menu: 'company', col: 0 }, footer: 'company',
  }),
  page('company/careers', 'Careers', {
    group: 'company', order: 3, icon: 'users',
    blurb: 'Join the team.',
    mega: { menu: 'company', col: 0 }, footer: 'company',
  }),
  page('company/contact', 'Contact', {
    group: 'company', order: 4, icon: 'phone',
    blurb: 'Talk to sales or support.',
    mega: { menu: 'company', col: 0 }, footer: 'company',
  }),

  /* ================= Core / utility (not in mega menus) ================= */
  page('pricing', 'Pricing & Bundles', {
    group: 'core', order: 0, icon: 'chart', footer: 'company',
  }),
  page('talk-to-an-expert', 'Talk to an Expert', {
    group: 'core', order: 1, icon: 'play', footer: 'company',
  }),

  /* ================= Legal (footer legal bar) ================= */
  page('legal/privacy-policy', 'Privacy Policy', { group: 'legal', order: 0, icon: 'file' }),
  page('legal/cookie-policy', 'Cookie Policy', { group: 'legal', order: 1, icon: 'file' }),
  page('legal/license-agreement', 'License Agreement', { group: 'legal', order: 2, icon: 'file' }),
  page('legal/terms-of-service', 'Terms of Service', { group: 'legal', order: 3, icon: 'file' }),
];

/* Menus: id + top-level label + the category index page each links to. */
export const MENUS = [
  { id: 'products', label: 'Products', index: 'products' },
  { id: 'solutions', label: 'Solutions', index: 'solutions' },
  { id: 'partners', label: 'Partners', index: 'partners/index' },
  { id: 'resources', label: 'Resources', index: 'resources/index' },
  { id: 'company', label: 'Company', index: 'company/about' },
];

/* Column titles per menu (the section headings inside each mega panel). */
export const COLUMN_TITLES = {
  products: ['Network Security', 'Zero Trust & Cloud', 'Security Operations'],
  solutions: ['Compliance', 'Industries', 'Compare', 'Integrations'],
  partners: ['Partners'],
  resources: ['Content', 'Trust & learn'],
  company: ['Company'],
};

/* Promo cards shown in the last column of each mega panel. */
export const PROMOS = {
  products: {
    title: 'One platform. Total security.',
    body: 'A converged cloud platform for network, zero trust, cloud, data and AI security.',
    cta: { label: 'Explore the platform', slug: 'products' },
  },
  solutions: null,
  partners: {
    title: 'Become a partner',
    body: 'Join hundreds of MSPs and MSSPs growing with SecureTrust Cyber.',
    cta: { label: 'Become a partner', slug: 'partners/become-a-partner' },
  },
  resources: {
    title: 'See it for yourself',
    body: 'A 30-minute conversation with a security expert about your environment.',
    cta: { label: 'Talk to an Expert', slug: 'talk-to-an-expert' },
  },
  company: {
    title: 'Join the team',
    body: 'We are hiring across security research and engineering.',
    cta: { label: 'View open roles', slug: 'company/careers' },
  },
};

/* Footer columns. `footer` field on each page maps it into one of these groups. */
export const FOOTER_GROUPS = [
  { id: 'products', title: 'Platform' },
  { id: 'solutions', title: 'Solutions' },
  { id: 'resources', title: 'Resources' },
  { id: 'company', title: 'Company' },
];

export const LEGAL_LINKS = [
  'legal/privacy-policy', 'legal/cookie-policy', 'legal/license-agreement', 'legal/terms-of-service',
];
