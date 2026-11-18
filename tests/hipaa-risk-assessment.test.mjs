import test from 'node:test';
import assert from 'node:assert/strict';
import { toString } from '../src/lib/html.mjs';
import { blocks } from '../src/lib/blocks.mjs';
import { SITE } from '../src/site.config.mjs';
import page, { ASSESSMENT, CTA } from '../src/content/pages/hipaa-risk-assessment.mjs';

const url = (slug) => (slug === 'talk-to-an-expert' ? SITE.bookingUrl : `${slug}.html`);
url.asset = (p) => `assets/${p}`;
const render = () => toString(blocks({ url, site: SITE, linkAttrs: () => '' }, page.blocks));

test('SEO target: URL, title tag, H1 and meta description', () => {
  assert.equal(page.slug, 'services/hipaa-risk-assessment');
  assert.equal(page.metaTitle, 'HIPAA Risk Assessment Services | SecureTrust Cyber');
  assert.ok(page.metaDescription.length <= 165);
  const h1 = [...render().matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1.length, 1);
  assert.equal(h1[0][1].trim(), 'HIPAA Security Risk Assessments for Dental and Medical Practices');
});

test('every "Request an Assessment" CTA goes to the on-page request form', () => {
  const out = render();
  const ctas = [...out.matchAll(/<a [^>]*href="([^"]+)"[^>]*>Request an Assessment/g)];
  assert.ok(ctas.length >= 2, `expected repeated CTAs, got ${ctas.length}`);
  assert.ok(ctas.every((m) => m[1] === '#request'));
  assert.match(out, /id="request"/);
  assert.match(out, new RegExp(`type="submit">${CTA}</button>`));
});

test('request form uses the existing backend and asks only for business details', () => {
  const form = render().match(/<form[\s\S]*?<\/form>/)[0];
  assert.match(form, /data-endpoint="https:\/\/api\.web3forms\.com\/submit"/);
  assert.match(form, new RegExp(`name="access_key" value="${SITE.formAccessKey}"`));
  for (const name of ['name', 'email', 'practice', 'practice_type', 'practice_size']) {
    assert.match(form, new RegExp(`name="${name}"[^>]*required`), `${name} should be required`);
  }
  assert.doesNotMatch(form, /<textarea|type="file"|name="phone"|name="dob"|name="patient/, 'no free text, uploads or patient fields');
  assert.match(form, /Please do not include patient information/);
});

test('unconfirmed business terms never print placeholders, prices or guarantees', () => {
  const text = render().replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(text, /\bnull\b|\bundefined\b|\bTBD\b|NaN/);
  if (!ASSESSMENT.price) assert.doesNotMatch(text, /\$\d/);
  if (!ASSESSMENT.baa) assert.doesNotMatch(text, /sign a business associate agreement/);
  assert.doesNotMatch(text, /guarantee(d|s)? (HIPAA )?compliance|100% compliant|pass (your|an) audit/i);
});

test('illustrative findings are labeled as examples', () => {
  const out = render();
  assert.match(out, /Illustrative example/);
  assert.match(out, /does not describe any real practice/);
});
