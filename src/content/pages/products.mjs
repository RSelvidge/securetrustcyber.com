// src/content/pages/products.mjs — fans out 7 category index pages + 23 product pages.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { icon } from '../../lib/icons.mjs';
import { CATEGORIES } from '../categories.data.mjs';
import { PRODUCTS } from '../products.data.mjs';

const categoryPage = (cat) => {
  const products = PRODUCTS.filter((p) => p.category === cat.slug);
  return {
    slug: `products/category/${cat.slug}`,
    type: 'page',
    title: cat.title,
    metaTitle: `${cat.title} | SecureTrust Cyber`,
    metaDescription: cat.blurb,
    cta: false,
    blocks: [
      (ctx) => hero(ctx, {
        variant: 'centered',
        eyebrow: 'Product category',
        headline: cat.title,
        sub: cat.blurb,
        primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
        secondary: { label: 'All products', href: 'products' },
      }),
      (ctx) => featureGrid(ctx, {
        heading: 'Products in this category',
        items: products.map((p) => ({
          icon: p.hero ? 'shield' : 'grid',
          title: p.title,
          body: p.meta,
          href: p.slug,
          link: 'Explore solution',
        })),
        variant: '3up',
      }),
    ],
  };
};

// All Products index page.
const allProducts = {
  slug: 'products',
  type: 'page',
  title: 'All Products',
  metaTitle: 'All Products | SecureTrust Cyber',
  metaDescription: 'Every protection layer in one platform: email, endpoint, network, identity and data security.',
  cta: false,
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'The platform', headline: 'Every layer. One platform.',
      sub: 'Explore the ten natively integrated modules that make up SecureTrust Cyber.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
    }),
    (ctx) => html`<section class="section"><div class="container">
      <div class="grid grid--3">
        ${join(CATEGORIES.map((c) => html`
          <a class="post-card" href="${ctx.url(`products/category/${c.slug}`)}">
            <span class="feature-card__icon" style="color:var(--color-link)">${icon(c.icon)}</span>
            <h3>${c.title}</h3>
            <p class="post-card__dek">${c.blurb}</p>
            <span class="feature-card__link" style="margin-top:0">Explore ${icon('arrowRight')}</span>
          </a>`))}
      </div>
    </div></section>`,
  ],
};

export default [allProducts, ...CATEGORIES.map(categoryPage), ...PRODUCTS];
