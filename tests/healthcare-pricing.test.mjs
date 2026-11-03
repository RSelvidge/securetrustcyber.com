import test from 'node:test';
import assert from 'node:assert/strict';
import { toString } from '../src/lib/html.mjs';
import { blocks } from '../src/lib/blocks.mjs';
import { SITE } from '../src/site.config.mjs';
import page, { OFFER } from '../src/content/pages/healthcare-pricing.mjs';

const url = (slug) => `${slug}.html`;
url.asset = (p) => `assets/${p}`;
const render = () => toString(blocks({ url, site: SITE, linkAttrs: () => '' }, page.blocks));

test('every primary CTA scrolls to the on-page quote form, and the secondary link to the offer', () => {
  const out = render();
  const ctas = [...out.matchAll(/<a [^>]*href="([^"]+)"[^>]*>Get My Practice&#39;s Price<\/a>/g)];
  assert.ok(ctas.length >= 4, `expected repeated CTAs, got ${ctas.length}`);
  assert.ok(ctas.every((m) => m[1] === '#quote'));
  assert.match(out, /id="quote"/);
  assert.match(out, /href="#included"[^>]*>See What's Included/);
  assert.match(out, /id="included"/);
});

test('quote form posts to the existing backend and asks only for qualification fields', () => {
  const form = render().match(/<form[\s\S]*?<\/form>/)[0];
  assert.match(form, /data-endpoint="https:\/\/api\.web3forms\.com\/submit"/);
  assert.match(form, new RegExp(`name="access_key" value="${SITE.formAccessKey}"`));
  for (const name of ['name', 'email', 'practice', 'practice_size']) {
    assert.match(form, new RegExp(`name="${name}"[^>]*required`), `${name} should be required`);
  }
  assert.doesNotMatch(form, /name="practice_type"[^>]*required/);
  assert.doesNotMatch(form, /<textarea|type="file"|name="phone"/, 'no free text, uploads or phone on first contact');
  assert.match(form, /Please do not include patient information/);
});

test('unapproved commercial terms never leak placeholders or a price', () => {
  const out = render().replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(out, /\bnull\b|\bundefined\b|\bTBD\b|\[PRICE\]|NaN/);
  assert.doesNotMatch(out, /\$\d/, 'no dollar figure while rates are unapproved');
  assert.match(out, /Your quote depends on/);
});

test('an approved price renders with unit, term and setup terms', () => {
  const saved = { ...OFFER };
  Object.assign(OFFER, { monthlyRate: 45, billingUnit: 'per covered device', termMonths: 12, setupFee: 0, minimumMonthly: 500 });
  try {
    const out = render();
    assert.match(out, /\$45<\/strong> per month, per covered device/);
    assert.match(out, /12-month agreement/);
    assert.match(out, /No setup fee/);
    assert.match(out, /Minimum \$500 per month/);
  } finally {
    Object.assign(OFFER, saved);
  }
});
