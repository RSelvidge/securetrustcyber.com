// src/content/pages/blog.mjs — blog index + 6 articles.

import { hero } from '../../components/hero.mjs';
import { blogGrid } from '../../components/blog-grid.mjs';
import { POSTS } from '../posts.data.mjs';

const index = {
  slug: 'blog',
  type: 'page',
  title: 'Blog',
  metaTitle: 'Blog | SecureTrust Cyber',
  metaDescription: 'Security research, guidance and news from SecureTrust Cyber.',
  cta: false,
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'centered', eyebrow: 'Blog', headline: 'Security research and guidance',
      sub: 'Practical advice from the team building the platform.',
    }),
    (ctx) => blogGrid(ctx, {
      heading: 'Latest posts',
      posts: POSTS.map((p) => ({ slug: p.slug, title: p.title, category: p.category, dek: p.dek, date: p.date, read: p.read })),
    }),
  ],
};

const posts = POSTS.map((p) => ({
  slug: p.slug,
  type: 'blog-post',
  title: p.title,
  category: p.category,
  date: p.date,
  read: p.read,
  author: p.author,
  dek: p.dek,
  body: p.body,
  metaTitle: `${p.title} | SecureTrust Cyber`,
  metaDescription: p.dek.slice(0, 160),
  cta: { heading: 'Put this into practice', body: 'See how SecureTrust Cyber turns these principles into protection.' },
}));

export default [index, ...posts];
