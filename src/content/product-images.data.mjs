// Capability photography. Sources and license records: docs/product-image-sources.json.
// IPS keeps the three images supplied and approved by the site owner.
const images = (slug, descriptions) => descriptions.map((alt, index) => ({
  src: `img/products/${slug}-${index + 1}.jpg`,
  alt,
  width: 1400,
  height: 788,
}));

export const PRODUCT_IMAGES = {
  fwaas: images('fwaas', [
    'Network cables and server racks in a data center',
    'Separate blue network cables connected to a switch',
    'IT professional using a laptop beside server racks',
  ]),
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
  casb: images('casb', [
    'Aisle of equipment racks in a data center',
    'Person reviewing charts and data on a tablet',
    'Padlock surrounded by computer keyboard keys',
  ]),
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
