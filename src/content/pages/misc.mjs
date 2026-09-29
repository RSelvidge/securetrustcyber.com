// src/content/pages/misc.mjs — 404, sitemap and styleguide pages (not in nav).

export default [
  { slug: '404', type: 'notfound', title: 'Page Not Found', metaTitle: 'Page Not Found | SecureTrust Cyber', metaDescription: 'The page you are looking for does not exist.', sitemap: false },
  { slug: 'sitemap', type: 'sitemap', title: 'Sitemap', metaTitle: 'Sitemap | SecureTrust Cyber', metaDescription: 'A complete sitemap of the SecureTrust Cyber website.', sitemap: false },
  { slug: '_styleguide', type: 'styleguide', title: 'Design System', metaTitle: 'Design System | SecureTrust Cyber', metaDescription: 'The SecureTrust Cyber design system: colors, type, spacing and components.', sitemap: false, noindex: true },
];
