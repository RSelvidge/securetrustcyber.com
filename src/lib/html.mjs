// src/lib/html.mjs — escaping tagged-template engine.
// Everything rendered into the site passes through here so interpolation is
// escaped by default and only explicit raw() fragments pass through unescaped.

const RAW = Symbol('stc.raw');

export const raw = (s) => ({ [RAW]: String(s) });
raw.RAW = RAW;

export const escape = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function render(v) {
  if (v === null || v === undefined || typeof v === 'boolean') return '';
  if (Array.isArray(v)) return v.map(render).join('');
  if (typeof v === 'object' && RAW in v) return v[RAW];
  return escape(v); // strings, numbers, Dates
}

/** Tagged template: escapes every interpolation by default. */
export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += render(values[i]) + strings[i + 1];
  return raw(out);
}

/** Join an array of html fragments with a separator. */
export const join = (arr, sep = '') => raw((arr ?? []).map(render).join(sep));

/** Conditionally include a fragment. */
export const when = (cond, fragment) => raw(cond ? render(fragment) : '');

/** Build an attribute string safely from an object (false/null/undefined dropped). */
export const attrs = (obj) => raw(
  Object.entries(obj ?? {})
    .filter(([, v]) => v !== false && v !== null && v !== undefined)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${escape(v)}"`))
    .join('')
);

/** Unwrap a fragment to a plain string (for writeFile / JSON-LD). */
export const toString = (frag) => render(frag);

html.RAW = RAW;
