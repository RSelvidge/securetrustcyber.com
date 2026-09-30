// src/content/pages/pricing.mjs — pricing & bundles page.

export default {
  slug: 'pricing',
  type: 'pricing',
  title: 'Pricing & Bundles',
  metaTitle: 'Pricing & Bundles | SecureTrust Cyber',
  metaDescription: 'SecureTrust Cyber bundles: EDR, XDR and MXDR. Select your plan and deploy instantly.',
  hero: {
    variant: 'centered',
    eyebrow: 'Pricing',
    headline: 'Solutions for every business',
    sub: 'Select your plan and deploy instantly. Flexible options for enterprises and MSPs alike.',
    primary: { label: 'Estimate pricing', href: '#pricing-calculator' },
  },
  bundles: [
    {
      name: 'SecureTrust Essentials',
      description: 'Core network security for growing businesses.',
      popular: false,
      included: ['Firewall-as-a-Service', 'Intrusion Prevention System', 'DNS Security', 'Secure Web Gateway'],
      fit: 'Best for teams that need strong network and web protection without appliance sprawl.',
    },
    {
      name: 'SecureTrust Advanced',
      description: 'Full zero trust, cloud and data protection.',
      popular: true,
      included: ['Everything in Essentials', 'Universal ZTNA', 'CASB', 'Data Loss Prevention', 'AI Security for End Users'],
      fit: 'Best for organizations that want one platform covering network, zero trust, cloud, data and AI.',
    },
    {
      name: 'SecureTrust Complete',
      description: 'The full platform, with security operations.',
      popular: false,
      included: ['Everything in Advanced', 'SIEM Platform', 'Managed Patch Management', 'Managed operations oversight'],
      fit: 'Best for teams that want detection, compliance and patching fully managed.',
    },
  ],
  customHeading: "Didn't find a bundle that fits your needs?",
  customBody: 'We build custom solutions for larger and more complex estates. Talk to us about your requirements.',
};
