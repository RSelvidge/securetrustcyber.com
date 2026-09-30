// Blog articles are individual JSON files, editable in Pages CMS.

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const POSTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'posts');

export const POSTS = readdirSync(POSTS_DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const metadata = JSON.parse(readFileSync(path.join(POSTS_DIR, file), 'utf8'));
    const body = String(metadata.body ?? '').trim();
    const words = body.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    const read = `${Math.max(1, Math.ceil(words / 220))} min read`;

    return {
      ...metadata,
      slug: `blog/${metadata.slug ?? path.basename(file, '.json')}`,
      read,
      body,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
