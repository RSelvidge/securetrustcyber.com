import test from 'node:test';
import assert from 'node:assert/strict';
import { publicUrl, makeUrl } from '../src/lib/url.mjs';

test('published URLs match Cloudflare final destinations, including directory indexes', () => {
  const origin = 'https://securetrustcyber.com';
  for (const [slug, suffix] of [['', '/'], ['index', '/'], ['pricing', '/pricing'], ['resources/webinars', '/resources/webinars'], ['resources/index', '/resources/'], ['partners/index', '/partners/']]) {
    assert.equal(publicUrl(origin, slug), origin + suffix);
  }
  assert.equal(publicUrl(origin + '/', 'pricing.html'), origin + '/pricing');
  assert.equal(makeUrl('resources/webinars.html')('resources/index'), '../resources/index.html');
});
