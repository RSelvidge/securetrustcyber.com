// src/lib/url.mjs — depth-aware relative URL builder.
// The hinge of file:// correctness: every internal link is relative, computed
// from the page's output depth. Windows separators are normalized to posix.

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function makeUrl(outPath) {
  const posix = String(outPath).replace(/\\/g, '/');
  const depth = posix.split('/').length - 1; // 'index.html' -> 0
  const up = depth === 0 ? '' : '../'.repeat(depth);

  function url(target = '') {
    if (target === null || target === undefined) return '';
    const t = String(target);
    if (EXTERNAL.test(t)) return t; // https:, mailto:, tel:, #anchor
    const clean = t.replace(/^\/+/, '').replace(/\/+$/, '');
    if (clean === '') return up + 'index.html';
    return up + (clean.endsWith('.html') ? clean : clean + '.html');
  }

  url.asset = (p) => up + 'assets/' + String(p).replace(/^\/+/, '');
  url.self = posix;
  url.depth = depth;
  return url;
}
