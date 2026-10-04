// src/components/office-scene.mjs: an illustrated open-plan office, drawn in
// code. The Zero Trust tunnel rises from a computer on the centre desk, through
// the ceiling and roof, up to the cloud. The four network security rings sit
// inside the office, the four zero trust & cloud rings in the sky. Every ring
// label links to its product page. Mobile swaps the SVG labels for a link list.

import { html, raw, join, escape } from '../lib/html.mjs';

const NET = [
  ['products/fwaas', 'Firewall-as-a-Service'],
  ['products/ips', 'Intrusion Prevention'],
  ['products/dns-security', 'DNS Security'],
  ['products/swg', 'Secure Web Gateway'],
];
const ZT = [
  ['products/ztna', 'Universal ZTNA'],
  ['products/casb', 'CASB'],
  ['products/dlp', 'Data Loss Prevention'],
  ['products/ai-security', 'AI Security'],
];
const NET_Y = [524, 488, 452, 416]; // bottom to top, inside the office
const ZT_Y = [322, 286, 250, 214]; // above the roof
const CX = 600; // tunnel centre
const R = 22; // tunnel radius
const BASE = 538; // tunnel starts here (top of the centre monitor)
const TOP = 178; // tunnel ends here (inside the cloud)

const STARS = [[60,40],[140,90],[230,30],[330,70],[420,28],[500,60],[700,35],[790,80],[880,30],[970,66],[1060,38],[1140,92],[40,150],[1160,170],[250,160],[950,150],[360,200],[860,210]];
const SKY = [[96,46,262],[150,34,292],[190,58,246],[258,40,300],[905,50,282],[962,38,254],[1008,60,298],[1078,44,268]];

function skyline() {
  return SKY.map(([x, w, t]) => {
    let wins = '';
    for (let r = 0; t + 10 + r * 14 < 330; r++) {
      for (let c = 0; c < Math.floor((w - 8) / 12); c++) {
        if ((r * 7 + c * 3 + x) % 5 === 0) wins += `<rect x="${x + 5 + c * 12}" y="${t + 8 + r * 14}" width="5" height="6" fill="#7fe3f0" opacity=".55"/>`;
      }
    }
    return `<rect x="${x}" y="${t}" width="${w}" height="${400 - t}" fill="#0b1550"/>${wins}`;
  }).join('');
}

// One desk, drawn around (x, floor y). p = side the person sits on (-1, 0, 1).
function desk(x, y, s, { p = 1, shirt = '#2f6fd0', hair = '#2b1d1a', person = true, main = false } = {}) {
  const mw = main ? 124 : 92;
  const mh = main ? 74 : 56;
  const top = main ? 168 : 150;
  const px = p * 62;
  const screen = main
    ? `<path d="M0 ${-top + 14} l22 8 v18 c0 14 -10 22 -22 28 c-12 -6 -22 -14 -22 -28 v-18 z" fill="none" stroke="#bfeaff" stroke-width="3" stroke-linejoin="round"/><path d="M-9 ${-top + 40} l7 7 l13 -14" fill="none" stroke="#bfeaff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<rect x="-34" y="${-top + 10}" width="44" height="4" rx="2" fill="#bfeaff" opacity=".6"/><rect x="-34" y="${-top + 20}" width="62" height="4" rx="2" fill="#7fe3f0" opacity=".45"/><rect x="-34" y="${-top + 30}" width="34" height="4" rx="2" fill="#7fe3f0" opacity=".45"/><rect x="-34" y="${-top + 40}" width="52" height="4" rx="2" fill="#48abe0" opacity=".45"/>`;
  const chair = p === 0 ? '' : `
    <line x1="${px}" y1="-50" x2="${px}" y2="-10" stroke="#0d1655" stroke-width="4"/>
    <line x1="${px - 22}" y1="-8" x2="${px + 22}" y2="-8" stroke="#0d1655" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${px - 22}" cy="-4" r="3" fill="#0d1655"/><circle cx="${px + 22}" cy="-4" r="3" fill="#0d1655"/>
    <rect x="${px - 23}" y="-106" width="46" height="52" rx="12" fill="#0d1655" stroke="#29d4ee" stroke-opacity=".25"/>
    ${person ? `<path d="M${px - 27} -54 C${px - 27} -90 ${px - 15} -94 ${px} -94 C${px + 15} -94 ${px + 27} -90 ${px + 27} -54 Z" fill="${shirt}"/>
    <path d="M${px - 27} -54 C${px - 27} -90 ${px - 15} -94 ${px} -94" fill="none" stroke="#bfeaff" stroke-opacity=".45" stroke-width="1.5"/>
    <circle cx="${px}" cy="-108" r="11.5" fill="${hair}"/>` : ''}`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="104" ry="9" fill="#000" opacity=".28"/>
    <rect x="-90" y="-70" width="7" height="70" fill="#1a2784"/><rect x="83" y="-70" width="7" height="70" fill="#1a2784"/>
    <rect x="-86" y="-68" width="172" height="9" fill="#141f70"/>
    <rect x="-96" y="-80" width="192" height="10" rx="3" fill="#25369a" stroke="#3f55c4" stroke-width=".8"/>
    <rect x="-5" y="${-top + mh}" width="10" height="${top - mh - 80}" fill="#0b1250"/>
    <rect x="${-mw / 2}" y="${-top}" width="${mw}" height="${mh}" rx="5" fill="#08104a" stroke="#3f55c4" stroke-width="1.5"/>
    <rect x="${-mw / 2 + 4}" y="${-top + 4}" width="${mw - 8}" height="${mh - 8}" rx="3" fill="url(#screen)"/>
    ${screen}
    <rect x="-28" y="-85" width="56" height="5" rx="2" fill="#0b1250" stroke="#3f55c4" stroke-width=".6"/>
    ${chair}
  </g>`;
}

function plant(x, y) {
  return `<g transform="translate(${x} ${y})"><path d="M-14 0 L-10 -26 H10 L14 0 Z" fill="#16226b" stroke="#3f55c4" stroke-width=".8"/>
    <path d="M0 -26 C-26 -44 -30 -70 -12 -86 C-6 -62 -2 -46 0 -26 Z" fill="#1d8f7a"/>
    <path d="M0 -26 C24 -48 30 -74 14 -92 C6 -66 2 -48 0 -26 Z" fill="#26b394"/>
    <path d="M0 -26 C-4 -50 2 -70 0 -98 C8 -72 6 -48 0 -26 Z" fill="#17705f"/></g>`;
}

function windowPane(x) {
  return `<g><rect x="${x}" y="412" width="96" height="118" rx="4" fill="url(#winsky)" stroke="#3f55c4" stroke-width="2"/>
    <rect x="${x + 8}" y="486" width="18" height="40" fill="#0b1550"/><rect x="${x + 30}" y="470" width="22" height="56" fill="#0b1550"/><rect x="${x + 56}" y="494" width="30" height="32" fill="#0b1550"/>
    <rect x="${x + 36}" y="478" width="4" height="5" fill="#7fe3f0" opacity=".6"/><rect x="${x + 44}" y="490" width="4" height="5" fill="#7fe3f0" opacity=".6"/><rect x="${x + 64}" y="502" width="4" height="5" fill="#7fe3f0" opacity=".6"/>
    <line x1="${x + 48}" y1="412" x2="${x + 48}" y2="530" stroke="#3f55c4" stroke-width="2"/></g>`;
}

function label(ctx, [slug, text], y, side, hot = false) {
  const w = Math.round(text.length * 7.7 + 30);
  const left = side === 'left';
  const x = left ? 500 - w : 702;
  const edge = left ? CX - R : CX + R;
  const end = left ? 500 : 702;
  const col = slug === hot ? RED : left ? '#48abe0' : '#7fe3f0';
  return `<g class="scene__label"><line x1="${edge}" y1="${y}" x2="${end}" y2="${y}" stroke="${col}" stroke-opacity=".75" stroke-dasharray="3 3"/>
    <a href="${escape(ctx.url(slug))}"><rect x="${x}" y="${y - 14}" width="${w}" height="28" rx="14" fill="#081250" fill-opacity=".92" stroke="${col}" stroke-opacity=".9"/>
    <text x="${x + w / 2}" y="${y + 5}" text-anchor="middle" fill="#fff" font-size="14.5" font-weight="600">${escape(text)}</text></a></g>`;
}

// One tunnel per desk: [x, radius, y where it leaves the monitor]. Centre last so it draws on top.
const TUNNELS = [[170, 9, 570], [270, 13, 588], [930, 13, 588], [1030, 9, 570], [CX, R, BASE]];

function ring(cx, r, y, main) {
  const a = `M${cx - r} ${y} A${r} ${r * 0.25} 0 0`;
  const b = ` ${cx + r} ${y}`;
  return `<path d="${a} 1${b}" fill="none" stroke="#29d4ee" stroke-opacity=".35" stroke-width="2"/>
    <path d="${a} 0${b}" fill="none" stroke="#29d4ee" stroke-opacity=".28" stroke-width="${main ? 7 : 4}"/>
    <path d="${a} 0${b}" fill="none" stroke="#7fe3f0" stroke-width="${main ? 3 : 1.8}"/>
    <path d="${a} 0${b}" fill="none" stroke="#e9fbff" stroke-width="${main ? 1.2 : 0.8}"/>`;
}

function tunnel(cx, r, base) {
  const main = cx === CX;
  const ry = r * 0.25;
  const flows = (main ? [-12, 0, 12] : [0]).map((dx, i) => `<path class="scene__flow" style="animation-delay:-${(i * 0.45 + (cx % 7) * 0.2).toFixed(2)}s" d="M${cx + dx} ${base - 6} V${TOP + 4}" stroke="#e9fbff" stroke-width="${main ? 2.2 : 1.6}" stroke-linecap="round" fill="none" opacity=".85"/>`).join('');
  const rings = [...NET_Y, ...ZT_Y].map((y) => ring(cx, r, y, main)).join('');
  const edge = `stroke="#7fe3f0" stroke-width="${main ? 2 : 1.4}" opacity=".8"`;
  const collar = (y) => `<ellipse cx="${cx}" cy="${y}" rx="${r + 6}" ry="${ry + 2}" fill="none" stroke="#7fe3f0" stroke-opacity=".7" stroke-width="2"/>`;
  return `<g opacity="${main ? 1 : 0.85}">
  <rect x="${cx - r - 30}" y="${TOP}" width="${2 * r + 60}" height="${base - TOP}" fill="url(#tubeglow)"/>
  <rect x="${cx - r}" y="${TOP}" width="${2 * r}" height="${base - TOP}" fill="url(#tube)"/>
  <line x1="${cx - r}" y1="${TOP}" x2="${cx - r}" y2="${base}" ${edge}/><line x1="${cx + r}" y1="${TOP}" x2="${cx + r}" y2="${base}" ${edge}/>
  ${flows}${collar(380)}${collar(345)}${rings}
  <ellipse cx="${cx}" cy="${base}" rx="${r - 4}" ry="${Math.max(4, ry * 0.8)}" fill="url(#disc)"/>
  </g>`;
}

function cloudAt(x) {
  return `<g transform="translate(${x - 600} 0)"><ellipse cx="600" cy="150" rx="170" ry="70" fill="url(#disc)" opacity=".45"/><circle cx="540" cy="148" r="30" fill="url(#cloud)"/><circle cx="580" cy="124" r="42" fill="url(#cloud)"/><circle cx="640" cy="126" r="40" fill="url(#cloud)"/><circle cx="676" cy="150" r="28" fill="url(#cloud)"/><circle cx="608" cy="152" r="40" fill="url(#cloud)"/><rect x="510" y="150" width="180" height="32" rx="16" fill="url(#cloud)"/></g>`;
}


// Daytime version: the same drawing with the palette swapped (dark hex -> light hex).
const LIGHT = {
  '#03072a': '#6fb6ee', '#0d2186': '#cfe8fb', '#1a4bb8': '#8cc4f2', '#0b1550': '#b4c9e3', '#0c1550': '#c9d6ea',
  '#16226b': '#a9bad6', '#101d5e': '#f6f9fd', '#0a1250': '#e4ebf6', '#16246f': '#d3ddee', '#1a2784': '#b4c3e2',
  '#141f70': '#a3b4dc', '#25369a': '#c9d5f2', '#3f55c4': '#8da2d6', '#040a2e': '#c2d0e6', '#7fe3f0': '#0b86a6',
  '#29d4ee': '#0891b2', '#48abe0': '#1d6fb8', '#081250': '#ffffff', '#bfeaff': '#ffffff', '#e9fbff': '#ffffff',
  '#eafbff': '#0a1a65', '#9fe6f5': '#d6e6f7', '#7fe4f1': '#7fd0e8',
};
const lighten = (svg) => svg.replace(/#[0-9a-f]{6}\b/gi, (c) => LIGHT[c.toLowerCase()] ?? c).replaceAll('fill="#fff"', 'fill="#0a1a65"');

// DLP page: red files rise up two tunnels and are stopped at the Data Loss Prevention ring.
const RED = '#e5384b';
function blocked(cx, side, tag) {
  const y = ZT_Y[2]; // the DLP ring
  const rise = 580 - y - 12;
  const docs = [0, 1, 2, 3].map((i) => `<g class="scene__doc" style="--rise:-${rise}px;animation-delay:-${(i * 0.75).toFixed(2)}s"><rect x="${cx - 5}" y="580" width="10" height="13" rx="1.5" fill="${RED}"/><path d="M${cx - 3} 585h6M${cx - 3} 588.5h6" stroke="#ffffff" stroke-width="1" opacity=".85"/></g>`).join('');
  const rays = Array.from({ length: 10 }, (_, k) => {
    const a = (k * Math.PI) / 5;
    const p = (s) => `${(cx + Math.cos(a) * 24 * s).toFixed(1)} ${(y + Math.sin(a) * 11 * s).toFixed(1)}`;
    return `M${p(0.55)}L${p(1)}`;
  }).join('');
  const w = Math.round(tag.length * 7.6 + 26);
  const x = side === 'left' ? cx - 44 - w : cx + 44;
  const edge = side === 'left' ? cx - 28 : cx + 28;
  const end = side === 'left' ? x + w : x;
  return `<g>${docs}
    <g class="scene__burst"><ellipse cx="${cx}" cy="${y}" rx="26" ry="11" fill="${RED}" opacity=".18"/><path d="${rays}" stroke="${RED}" stroke-width="2.2" stroke-linecap="round" fill="none"/><ellipse cx="${cx}" cy="${y}" rx="19" ry="7" fill="none" stroke="${RED}" stroke-width="3"/></g>
    <line x1="${edge}" y1="${y}" x2="${end}" y2="${y}" stroke="${RED}" stroke-dasharray="3 3"/>
    <rect x="${x}" y="${y - 12}" width="${w}" height="24" rx="12" fill="${RED}"/>
    <text x="${x + w / 2}" y="${y + 4.2}" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700" letter-spacing="1.2">${escape(tag)}</text></g>`;
}
function blocks() {
  const y = ZT_Y[2];
  const mainRing = `<path d="M${CX - R} ${y} A${R} ${R * 0.25} 0 0 0 ${CX + R} ${y}" fill="none" stroke="${RED}" stroke-opacity=".35" stroke-width="8"/><path d="M${CX - R} ${y} A${R} ${R * 0.25} 0 0 0 ${CX + R} ${y}" fill="none" stroke="${RED}" stroke-width="3"/>`;
  return mainRing + blocked(270, 'left', 'EXFILTRATION BLOCKED') + blocked(930, 'right', 'UPLOAD BLOCKED');
}

// FWaaS page: red traffic runs at a firewall wall on the tunnel and is dropped at the first ring.
function dropped(cx, r, dir, tag, tagX, { y = NET_Y[0], icon = 'x', tagDy = 20 } = {}) {
  const hitX = cx - dir * (r + 5);
  const startX = hitX - dir * 120;
  const run = dir * 110;
  const pkts = [0, 1, 2].map((i) => `<g class="scene__pkt" style="--run:${run}px;animation-delay:-${(i * 0.65).toFixed(2)}s"><path d="M${startX - dir * 22} ${y}H${startX - dir * 8}" stroke="${RED}" stroke-width="1.6" opacity=".6"/><rect x="${startX - 7}" y="${y - 4}" width="14" height="8" rx="2" fill="${RED}"/></g>`).join('');
  const wall = `<g class="scene__burst"><ellipse cx="${hitX}" cy="${y}" rx="12" ry="20" fill="${RED}" opacity=".2"/><rect x="${hitX - 2.5}" y="${y - 15}" width="5" height="30" rx="2" fill="${RED}"/>${icon === 'lock' ? `<circle cx="${hitX}" cy="${y}" r="9" fill="${RED}" stroke="#ffffff" stroke-width="1.4"/>${glyph('lock', hitX, y - 2)}` : glyph('x', hitX, y)}</g>`;
  const w = Math.round(tag.length * 7.6 + 26);
  const pill = tag ? `<rect x="${tagX - w / 2}" y="${y + tagDy}" width="${w}" height="24" rx="12" fill="${RED}"/><text x="${tagX}" y="${y + tagDy + 16.2}" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700" letter-spacing="1.2">${escape(tag)}</text>` : '';
  return `<g>${pkts}${wall}${pill}</g>`;
}
function fall(cx, r, tag, tagX) {
  const y = NET_Y[0]; // the firewall ring
  const startY = 232;
  const hitY = y - 10;
  const run = hitY - startY;
  const pkts = [0, 1, 2].map((i) => `<g class="scene__fall" style="--fall:${run}px;animation-delay:-${(i * 0.65).toFixed(2)}s"><path d="M${cx} ${startY - 22}V${startY - 8}" stroke="${RED}" stroke-width="1.6" opacity=".6"/><rect x="${cx - 5}" y="${startY - 7}" width="10" height="14" rx="2" fill="${RED}"/></g>`).join('');
  const wall = `<g class="scene__burst"><ellipse cx="${cx}" cy="${hitY + 5}" rx="${r + 8}" ry="9" fill="${RED}" opacity=".2"/><rect x="${cx - r - 4}" y="${hitY + 2.5}" width="${2 * r + 8}" height="5" rx="2" fill="${RED}"/><path d="M${cx - 6} ${hitY - 8}l12 12M${cx + 6} ${hitY - 8}l-12 12" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/></g>`;
  const w = Math.round(tag.length * 7.6 + 26);
  const pill = `<rect x="${tagX - w / 2}" y="${y + 20}" width="${w}" height="24" rx="12" fill="${RED}"/><text x="${tagX}" y="${y + 36.2}" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700" letter-spacing="1.2">${escape(tag)}</text>`;
  return `<g>${pkts}${wall}${pill}</g>`;
}
function drops() {
  const y = NET_Y[0];
  const arc = `M${CX - R} ${y} A${R} ${R * 0.25} 0 0 0 ${CX + R} ${y}`;
  const mainRing = `<path d="${arc}" fill="none" stroke="${RED}" stroke-opacity=".35" stroke-width="8"/><path d="${arc}" fill="none" stroke="${RED}" stroke-width="3"/>`;
  return mainRing + fall(270, 13, 'THREAT DROPPED', 190) + dropped(CX, R, -1, '', 0) + dropped(930, 13, 1, 'TRAFFIC DENIED', 839);
}

// Per-product scenes: red threats are stopped at that product's ring, in the centre, left and right tunnels.
const glyph = (name, x, y) => ({
  x: `<path d="M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>`,
  shield: `<path d="M${x} ${y - 7}l6 2.5v4.5c0 3.5-2.6 5.4-6 7c-3.4-1.6-6-3.5-6-7v-4.5z" fill="#ffffff"/><path d="M${x - 2.4} ${y - 2.4}l4.8 4.8M${x + 2.4} ${y - 2.4}l-4.8 4.8" stroke="${RED}" stroke-width="1.5" stroke-linecap="round"/>`,
  stop: `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="#ffffff" stroke-width="1.8"/><path d="M${x - 4.2} ${y + 4.2}L${x + 4.2} ${y - 4.2}" stroke="#ffffff" stroke-width="1.8"/>`,
  lock: `<rect x="${x - 5}" y="${y - 1}" width="10" height="8" rx="1.5" fill="#ffffff"/><path d="M${x - 3} ${y - 1}v-2.5a3 3 0 0 1 6 0v2.5" stroke="#ffffff" stroke-width="1.6" fill="none"/>`,
})[name];

const shape = (name) => ({
  cloud: `<circle cx="-4" cy="0" r="4" fill="${RED}"/><circle cx="2" cy="-2" r="5" fill="${RED}"/><circle cx="6.5" cy="1" r="3.5" fill="${RED}"/><rect x="-8" y="0" width="17" height="4.5" rx="2" fill="${RED}"/>`,
  bubble: `<rect x="-8" y="-6" width="16" height="11" rx="3" fill="${RED}"/><path d="M-3 5l-2 4l5-4z" fill="${RED}"/><path d="M-4.5-2h9M-4.5 1h6" stroke="#ffffff" stroke-width="1.1"/>`,
  patch: `<circle r="7" fill="${GREEN}"/><path d="M0-3.5V3M-3 0l3 3l3-3" stroke="#ffffff" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  bolt: `<path d="M2-9L-5 1H-1L-3 9L5-2H1Z" fill="${RED}"/>`,
  page: `<rect x="-8" y="-6" width="16" height="12" rx="2" fill="${RED}"/><rect x="-8" y="-6" width="16" height="3.5" rx="1.5" fill="#ffffff" opacity=".55"/>`,
  globe: `<circle r="6.5" fill="${RED}"/><ellipse rx="2.6" ry="6.5" fill="none" stroke="#ffffff" stroke-width=".9"/><path d="M-6.5 0H6.5" stroke="#ffffff" stroke-width=".9"/>`,
})[name];

const hotRing = (y) => {
  const arc = `M${CX - R} ${y} A${R} ${R * 0.25} 0 0 0 ${CX + R} ${y}`;
  return `<path d="${arc}" fill="none" stroke="${RED}" stroke-opacity=".35" stroke-width="8"/><path d="${arc}" fill="none" stroke="${RED}" stroke-width="3"/>`;
};

function pill(tag, x, y, fill = RED) {
  const w = Math.round(tag.length * 7.6 + 26);
  return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="24" rx="12" fill="${fill}"/><text x="${x}" y="${y + 16.2}" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700" letter-spacing="1.2">${escape(tag)}</text>`;
}

// Threats travel down from the cloud (down) or up from the desk, and stop at the control's ring.
function lane(cx, r, y, down, sh, icon) {
  const y0 = down ? 232 : 570;
  const y1 = down ? y - 16 : y + 15;
  const run = [0, 1, 2].map((i) => `<g class="${down ? 'scene__fall' : 'scene__doc'}" style="--${down ? 'fall' : 'rise'}:${y1 - y0}px;animation-delay:-${(i * 0.65).toFixed(2)}s"><g transform="translate(${cx} ${y0})">${shape(sh)}</g></g>`).join('');
  const by = down ? y - 5 : y + 5;
  const iy = down ? by + 13 : by - 13;
  const stop = `<g class="scene__burst"><ellipse cx="${cx}" cy="${by}" rx="${r + 8}" ry="9" fill="${RED}" opacity=".2"/><rect x="${cx - r - 4}" y="${by - 2.5}" width="${2 * r + 8}" height="5" rx="2" fill="${RED}"/><circle cx="${cx}" cy="${iy}" r="9" fill="${RED}" stroke="#ffffff" stroke-width="1.4"/>${glyph(icon, cx, iy)}</g>`;
  return run + stop;
}
const lanes = (y, down, sh, icon, tags, rx = 839) => hotRing(y)
  + lane(CX, R, y, down, sh, icon) + lane(270, 13, y, down, sh, icon) + lane(930, 13, y, down, sh, icon)
  + pill(tags[0], 186, y + 20) + pill(tags[1], rx, y + 20);

// Threats run in sideways at the tunnel and are turned away (used above the roof for ZTNA).
const side = (y, icon, tags) => hotRing(y)
  + dropped(270, 13, 1, tags[0], 190, { y, icon, tagDy: -50 })
  + dropped(CX, R, -1, '', 0, { y, icon })
  + dropped(930, 13, 1, tags[1], 858, { y, icon, tagDy: -50 });

// SIEM: alerts from every tunnel run to the centre, where they are correlated into one attack.
function siem() {
  const y = 506;
  const feeds = [[170, 9, 1], [270, 13, 1], [930, 13, -1], [1030, 9, -1]].map(([cx, r, dir], i) => {
    const sx = cx + dir * (r + 5);
    const ex = CX - dir * (R + 5);
    const run = ex - sx;
    const line = `<line x1="${sx}" y1="${y}" x2="${ex}" y2="${y}" stroke="${RED}" stroke-opacity=".55" stroke-dasharray="4 4"/>`;
    const pk = [0, 1].map((k) => `<g class="scene__pkt" style="--run:${run}px;animation-delay:-${(k + i * 0.3).toFixed(2)}s"><rect x="${sx - 5}" y="${y - 4}" width="10" height="8" rx="2" fill="${RED}"/></g>`).join('');
    return line + pk;
  }).join('');
  const core = `<g class="scene__burst"><ellipse cx="${CX}" cy="${y}" rx="${R + 10}" ry="14" fill="${RED}" opacity=".2"/><circle cx="${CX}" cy="${y}" r="11" fill="${RED}" stroke="#ffffff" stroke-width="1.4"/>${glyph('shield', CX, y)}</g>`;
  return feeds + core + pill('ATTACK CORRELATED', 800, y + 14);
}

// Patch Management: green patches are pushed down every tunnel to the device.
const GREEN = '#17a673';
function patched() {
  const one = ([cx, base]) => {
    const y0 = 232;
    const y1 = base - 8;
    const run = [0, 1, 2].map((i) => `<g class="scene__fall" style="--fall:${y1 - y0}px;animation-delay:-${(i * 0.65).toFixed(2)}s"><g transform="translate(${cx} ${y0})">${shape('patch')}</g></g>`).join('');
    const badge = `<g class="scene__burst"><circle cx="${cx}" cy="${base + 18}" r="9" fill="${GREEN}" stroke="#ffffff" stroke-width="1.4"/><path d="M${cx - 4} ${base + 18}l3 3l5-6" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return run + badge;
  };
  return [[170, 570], [270, 588], [930, 588], [1030, 570]].map(one).join('') + pill('PATCH DEPLOYED', 186, 492, GREEN) + pill('VULNERABILITY CLOSED', 860, 492, GREEN);
}

const SCENES = {
  casb: { slug: 'products/casb', run: () => lanes(ZT_Y[1], false, 'cloud', 'x', ['UNSANCTIONED APP', 'RISKY UPLOAD'], 1014), cap: 'Risky and unsanctioned cloud apps are blocked at the CASB control in each tunnel, while approved apps stay connected.' },
  ai: { slug: 'products/ai-security', run: () => lanes(ZT_Y[3], false, 'bubble', 'shield', ['PROMPT REDACTED', 'DATA MASKED'], 1014), cap: 'Sensitive prompts are caught before they reach an AI tool. The AI Security control in each tunnel redacts the data and lets safe use continue.' },
  siem: { slug: 'products/siem', run: siem, cap: 'Alerts from every tunnel flow into the SIEM, which correlates them into one attack so it is spotted and contained quickly.' },
  patch: { slug: 'products/patch-management', run: patched, cap: 'Missing patches are pushed down each tunnel to the device automatically, closing the vulnerability without chasing the user.' },
  dlp: { slug: 'products/dlp', run: blocks, cap: 'Sensitive data tries to leave. The DLP control in each tunnel stops it, for that user or device only.' },
  fwaas: { slug: 'products/fwaas', run: drops, cap: 'Unwanted traffic hits the firewall in each tunnel and is dropped, while legitimate traffic keeps flowing.' },
  ips: { slug: 'products/ips', run: () => lanes(NET_Y[1], true, 'bolt', 'shield', ['EXPLOIT BLOCKED', 'ATTACK STOPPED']), cap: 'Exploit attempts are caught inside each tunnel by Intrusion Prevention and stopped before they reach the user or device.' },
  dns: { slug: 'products/dns-security', run: () => lanes(NET_Y[2], false, 'globe', 'stop', ['DOMAIN BLOCKED', 'PHISHING BLOCKED']), cap: 'Requests for malicious domains are stopped at the DNS control in each tunnel, while legitimate lookups resolve as normal.' },
  swg: { slug: 'products/swg', run: () => lanes(NET_Y[3], true, 'page', 'x', ['MALWARE BLOCKED', 'DOWNLOAD BLOCKED']), cap: 'Malicious websites and downloads are blocked at the Secure Web Gateway in each tunnel, while safe browsing carries on.' },
  ztna: { slug: 'products/ztna', run: () => side(ZT_Y[0], 'lock', ['UNVERIFIED DEVICE', 'ACCESS DENIED']), cap: 'Unverified devices are denied at the tunnel, and only verified users and devices connect to the apps they are allowed to use.' },
};

export function officeScene(ctx, { light = false, scene = '' } = {}) {
  const stars = STARS.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.2 : 1.8}" fill="#bfeaff" opacity="${i % 2 ? .5 : .85}"/>`).join('');
  const lights = [140, 250, 720, 860, 1000].map((x) => `<rect x="${x}" y="384" width="70" height="5" rx="2" fill="#e9fbff" opacity=".9"/><rect x="${x - 10}" y="389" width="90" height="26" fill="url(#lightcone)"/>`).join('');
  const hot = SCENES[scene]?.slug;
  const labels = NET.map((m, i) => label(ctx, m, NET_Y[i], 'left', hot)).join('') + ZT.map((m, i) => label(ctx, m, ZT_Y[i], 'right', hot)).join('');

  const svg = `<svg viewBox="0 0 1200 820" role="img" aria-label="An open-plan office where every desk has its own Zero Trust tunnel rising through the roof to the cloud: microsegmentation, one tunnel per user and per device. The centre tunnel shows the controls each passes through: network security inside the office, zero trust and cloud controls above the roof." xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03072a"/><stop offset="1" stop-color="#0d2186"/></linearGradient>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101d5e"/><stop offset="1" stop-color="#0a1250"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16246f"/><stop offset="1" stop-color="#0a1250"/></linearGradient>
    <linearGradient id="winsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2186"/><stop offset="1" stop-color="#1a4bb8"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f3a8f"/><stop offset="1" stop-color="#1fb6d6"/></linearGradient>
    <linearGradient id="lightcone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfeaff" stop-opacity=".22"/><stop offset="1" stop-color="#bfeaff" stop-opacity="0"/></linearGradient>
    <linearGradient id="tube" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#29d4ee" stop-opacity=".6"/><stop offset=".18" stop-color="#29d4ee" stop-opacity=".14"/><stop offset=".5" stop-color="#7fe3f0" stop-opacity=".22"/><stop offset=".82" stop-color="#29d4ee" stop-opacity=".14"/><stop offset="1" stop-color="#29d4ee" stop-opacity=".6"/></linearGradient>
    <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9fe6f5"/></linearGradient>
    <linearGradient id="tubeglow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#29d4ee" stop-opacity="0"/><stop offset=".5" stop-color="#29d4ee" stop-opacity=".38"/><stop offset="1" stop-color="#29d4ee" stop-opacity="0"/></linearGradient>
    <radialGradient id="disc"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#7fe4f1"/><stop offset="1" stop-color="#29d4ee" stop-opacity="0"/></radialGradient>
  </defs>

  <rect width="1200" height="820" fill="url(#sky)"/>
  ${stars}
  ${skyline()}

  <rect x="0" y="760" width="1200" height="60" fill="#040a2e"/>
  <rect x="70" y="345" width="20" height="415" fill="#0c1550" stroke="#3f55c4" stroke-opacity=".5"/>
  <rect x="1110" y="345" width="20" height="415" fill="#0c1550" stroke="#3f55c4" stroke-opacity=".5"/>
  <rect x="90" y="380" width="1020" height="320" fill="url(#wall)"/>
  <rect x="90" y="700" width="1020" height="60" fill="url(#floor)"/>
  <rect x="90" y="696" width="1020" height="6" fill="#1a2784"/>
  <line x1="90" y1="722" x2="1110" y2="722" stroke="#3f55c4" stroke-opacity=".25"/><line x1="90" y1="744" x2="1110" y2="744" stroke="#3f55c4" stroke-opacity=".25"/>
  ${windowPane(108)}${windowPane(996)}
  ${lights}
  ${plant(128, 740)}${plant(1072, 740)}

  ${desk(170, 672, 0.68, { p: 1, shirt: '#2f6fd0', hair: '#2b1d1a' })}
  ${desk(1030, 672, 0.68, { p: 0 })}
  ${desk(270, 738, 1, { p: -1, shirt: '#d98a3d', hair: '#3b2416' })}
  ${desk(930, 738, 1, { p: 1, shirt: '#2f6fd0', hair: '#c9a063' })}
  <ellipse cx="${CX}" cy="748" rx="150" ry="14" fill="#29d4ee" opacity=".18"/>
  ${desk(CX, 746, 1.25, { p: 0, main: true })}

  <rect x="60" y="335" width="1080" height="10" rx="2" fill="#16226b" stroke="#3f55c4" stroke-opacity=".6"/>
  <rect x="70" y="345" width="1060" height="35" fill="#0c1550" stroke="#3f55c4" stroke-opacity=".5"/>
  ${TUNNELS.map(([x, r, base]) => tunnel(x, r, base)).join('')}
  ${SCENES[scene]?.run() ?? ''}
  ${[220, 600, 980].map((x) => cloudAt(x)).join('')}
  <text class="scene__cloud" x="${CX}" y="162" text-anchor="middle" fill="#0a1a65" font-size="17" font-weight="700">Apps &amp; cloud</text>
  <g class="scene__label" fill="#7fe3f0" font-size="12.5" font-weight="700" letter-spacing="2.2" text-anchor="middle">
    <text x="220" y="56">ONE TUNNEL PER USER</text><text x="${CX}" y="40" fill="#eafbff">MICROSEGMENTATION</text><text x="980" y="56">ONE TUNNEL PER DEVICE</text>
  </g>



  <g class="scene__label"><text x="500" y="394" text-anchor="end" fill="#48abe0" font-size="12.5" font-weight="700" letter-spacing="2.2">NETWORK SECURITY</text>
  <text x="702" y="188" fill="#7fe3f0" font-size="12.5" font-weight="700" letter-spacing="2.2">ZERO TRUST &amp; CLOUD</text></g>
  <text class="scene__cap" x="${CX}" y="797" text-anchor="middle" fill="#7fe3f0" font-size="15" opacity=".85">${SCENES[scene]?.cap ?? 'Every user and every device gets its own Zero Trust tunnel: microsegmentation by design'}</text>
  ${labels}
</svg>`;

  const all = [...NET, ...ZT];
  return html`<div class="container container--xl">
    <div class="scene${light ? ' scene--light' : ''}">
      ${raw(light ? lighten(svg) : svg)}
      <ul class="scene-links" role="list">
        ${join(all.map(([slug, text], i) => html`<li${i >= 4 ? html` class="is-zt"` : ''}><a href="${ctx.url(slug)}">${text}</a></li>`))}
      </ul>
    </div>
  </div>`;
}
