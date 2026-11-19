import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { toString } from '../src/lib/html.mjs';
import { blocks } from '../src/lib/blocks.mjs';
import { SITE } from '../src/site.config.mjs';
import page, { FILES } from '../src/content/pages/hipaa-risk-assessment-template.mjs';

const url = (slug) => `${slug}.html`;
url.asset = (p) => `assets/${p}`;
const render = () => toString(blocks({ url, site: SITE, linkAttrs: () => '' }, page.blocks));

test('template downloads exist in assets and are linked with download attributes', () => {
  const out = render();
  for (const f of Object.values(FILES)) {
    assert.ok(existsSync(new URL(`../assets/${f}`, import.meta.url)), `missing assets/${f}`);
    assert.match(out, new RegExp(`href="assets/${f.replace(/[.]/g, '\\.')}" download`));
  }
});

test('one H1 with the target query, and a link to the assessment service', () => {
  const out = render();
  const h1 = [...out.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1.length, 1);
  assert.match(h1[0][1], /HIPAA Risk Assessment Template/);
  assert.match(out, /href="services\/hipaa-risk-assessment\.html">HIPAA security risk assessment for dental and medical practices<\/a>/);
  assert.equal(page.cta.primary.href, 'services/hipaa-risk-assessment');
});

test('example is labeled fictional and no compliance guarantee is made', () => {
  const text = render().replace(/<[^>]+>/g, ' ');
  assert.match(text, /fictional/);
  assert.doesNotMatch(text, /(we|this template|it) (will )?guarantees? (HIPAA )?compliance|guaranteed compliance|100% compliant|audit-proof/i);
});
