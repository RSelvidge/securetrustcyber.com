// src/lib/icons.mjs — inline SVG icon set.
// Icons are inlined into HTML at build time (external sprites are dead over
// file://). Each is a 24x24 stroke icon inheriting currentColor so it works on
// both light and dark surfaces. Returned as raw() so the html engine does not
// escape the markup.

import { raw } from './html.mjs';

const PATHS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.4-7 9-4-.6-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12L20 3M16 7l3 3M13 10l2 2"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3 3-4.5 6.5-4.5S14.8 17 15.5 20"/><circle cx="17" cy="9" r="2.5"/><path d="M17.5 14.5c2.8.3 4.4 1.7 4.5 5.5"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12l5-5"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  wrench: '<path d="M14 6a4 4 0 015.7 5.7L13 18.4l-3.4-3.4z"/><path d="M13 18.4l-2-2-5 1 3-3-1-1 5 5z"/>',
  heart: '<path d="M12 20s-7-4.3-7-9.5A4.5 4.5 0 0112 7a4.5 4.5 0 017 3.5C19 15.7 12 20 12 20z"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
  chart: '<path d="M4 20V4M4 20h16"/><rect x="7" y="13" width="3" height="4"/><rect x="12" y="9" width="3" height="8"/><rect x="17" y="5" width="3" height="12"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevDown: '<path d="M6 9l6 6 6-6"/>',
  arrowRight: '<path d="M4 12h16M13 5l7 7-7 7"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  file: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/>',
  download: '<path d="M12 3v12M6 11l6 6 6-6"/><path d="M4 21h16"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 9l6 3-6 3z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  linkedin: '<path d="M6 9v11H3V9zM4.5 7a1.8 1.8 0 100-3.5 1.8 1.8 0 000 3.5zM9 20h3v-5.5c0-1.5.5-2.5 2-2.5s2.3 1 2.3 2.5V20h3v-6c0-3-1.7-5-4.3-5-1.5 0-2.5.8-3 1.7V9H9z" fill="currentColor" stroke="none"/>',
  youtube: '<path d="M22 12c0-2-.2-3.4-.6-4.2a2.5 2.5 0 00-1.7-1.7C18.6 5.6 12 5.6 12 5.6s-6.6 0-7.7.5A2.5 2.5 0 002.6 7.8C2.2 8.6 2 10 2 12s.2 3.4.6 4.2a2.5 2.5 0 001.7 1.7c1.1.5 7.7.5 7.7.5s6.6 0 7.7-.5a2.5 2.5 0 001.7-1.7c.4-.8.6-2.2.6-4.2z"/><path d="M10 15V9l5 3z" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14 8h2.5V4.5H14A4.5 4.5 0 009.5 9v2.5H7V15h2.5v5.5H13V15h2.5l.5-3.5H13V9a1 1 0 011-1z" fill="currentColor" stroke="none"/>',
  xSocial: '<path d="M4 4l7.2 9.3L4.4 20h2.2l5.6-5.4L16.8 20H20l-7.4-9.6L18.9 4h-2.2l-5 4.9L8.2 4z" fill="currentColor" stroke="none"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"/>',
  award: '<circle cx="12" cy="9" r="5"/><path d="M9 14l-1.5 7 4.5-2.5L16.5 21 15 14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14M12 3L7 7M12 3l5 4"/><path d="M4 7l-2 4a3 3 0 005 0zM20 7l-2 4a3 3 0 005 0z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
  zap: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
  star: '<path d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.3-5.5-2.9-5.5 2.9 1-6.3L3 8.5l6.3-.9z" fill="currentColor" stroke="none"/>',
};

const WRAP = (inner, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ` +
  `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;

/** icon(name) -> inline SVG string. Unknown names yield an empty string. */
export function icon(name) {
  const d = PATHS[name];
  if (!d) return '';
  const extra = /^(linkedin|youtube|facebook|xSocial|star)$/.test(name) ? '' : '';
  return raw(WRAP(d, extra));
}

export const iconNames = Object.keys(PATHS);
