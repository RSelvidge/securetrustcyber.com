import test from 'node:test';
import assert from 'node:assert/strict';
import { breadcrumbs } from '../src/components/breadcrumbs.mjs';
import { toString } from '../src/lib/html.mjs';
import { makeUrl } from '../src/lib/url.mjs';

const pages = [
  ['', 'Home'], ['products', 'All Products'], ['products/ips', 'Intrusion Prevention System (IPS)'],
  ['products/category/network-security', 'Network Security'], ['solutions', 'All Solutions'],
  ['industries/healthcare', 'Healthcare Cybersecurity'], ['resources/index', 'Resources'],
  ['resources/whitepapers', 'Whitepapers'], ['partners/index', 'Partner Overview'],
  ['partners/partner-portal', 'Partner Portal'], ['company/about', 'About'],
  ['company/contact', 'Contact'], ['legal/privacy-policy', 'Privacy Policy'],
  ['blog', 'Blog'], ['blog/ransomware', 'Ransomware & recovery'],
].map(([slug, title]) => ({ slug, title }));
const registry = new Map(pages.map((page) => [page.slug, page]));
function render(slug) {
  const ctx = { slug, registry, url: makeUrl(slug ? `${slug}.html` : 'index.html'), site: { origin: 'https://example.com' } };
  return toString(breadcrumbs(ctx, registry.get(slug)));
}
function labels(markup) {
  return [...markup.matchAll(/<li><(?:a|span)[^>]*>(.*?)<\/(?:a|span)>/g)].map((m) => m[1]);
}

test('preserves product names and acronyms and links back to the product overview', () => {
  const markup = render('products/ips');
  assert.deepEqual(labels(markup), ['Home', 'All Products', 'Intrusion Prevention System (IPS)']);
  assert.match(markup, /href="\.\.\/products\.html"/);
});
test('section directory indexes become working overview links without duplicate Index crumbs', () => {
  assert.deepEqual(labels(render('resources/index')), ['Home', 'Resources']);
  assert.match(render('resources/whitepapers'), /href="\.\.\/resources\/index\.html">Resources/);
  assert.match(render('partners/partner-portal'), /href="\.\.\/partners\/index\.html">Partner Overview/);
});
test('industries link to Solutions, while structural category and legal folders are skipped', () => {
  assert.deepEqual(labels(render('industries/healthcare')), ['Home', 'All Solutions', 'Healthcare Cybersecurity']);
  assert.deepEqual(labels(render('products/category/network-security')), ['Home', 'All Products', 'Network Security']);
  assert.deepEqual(labels(render('legal/privacy-policy')), ['Home', 'Privacy Policy']);
});
test('company overview does not link to itself and child pages link back to it', () => {
  assert.deepEqual(labels(render('company/about')), ['Home', 'About']);
  assert.deepEqual(labels(render('company/contact')), ['Home', 'About', 'Contact']);
});
test('metadata includes Home and uses the actual current page URL', () => {
  const markup = render('blog/ransomware');
  const data = JSON.parse(markup.match(/<script[^>]*>(.*?)<\/script>/s)[1]);
  assert.deepEqual(data.itemListElement.map((item) => [item.position, item.name, item.item]), [
    [1, 'Home', 'https://example.com/'], [2, 'Blog', 'https://example.com/blog.html'],
    [3, 'Ransomware & recovery', 'https://example.com/blog/ransomware.html'],
  ]);
  assert.equal((markup.match(/aria-current="page"/g) ?? []).length, 1);
  assert.match(markup, /Ransomware &amp; recovery<\/span>/);
});
test('homepage has no redundant trail', () => assert.equal(render(''), ''));
