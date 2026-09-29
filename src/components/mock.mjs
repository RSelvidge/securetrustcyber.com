// src/components/mock.mjs — hand-built inline SVG "product screenshots".
// No image files: these are parametric dashboard mocks drawn in brand colors.

import { raw } from '../lib/html.mjs';

const NAVY = '#0A1A65';
const NAVY_DEEP = '#061040';
const BLUE = '#48ABE0';
const SLATE = '#C3CDE4';
const MUTED = '#8C99B8';
const GREEN = '#1B9E6B';
const RED = '#D64545';
const LINE = 'rgba(255,255,255,.12)';

const tile = (x, y, w, h, value, label, color = '#fff') => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(255,255,255,.05)" stroke="${LINE}"/>
  <text x="${x + 16}" y="${y + 34}" font-family="Space Grotesk, sans-serif" font-size="26" font-weight="700" fill="${color}">${value}</text>
  <text x="${x + 16}" y="${y + 56}" font-family="Inter, sans-serif" font-size="12" fill="${MUTED}">${label}</text>`;

const spark = (x, y, w, h, pts) => `
  <polyline points="${pts}" fill="none" stroke="${BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    transform="translate(${x},${y})"/>`;

const barChart = (x, y, w, h, bars) => {
  const bw = w / bars.length;
  let out = '';
  bars.forEach((v, i) => {
    const bh = (v / 100) * h;
    out += `<rect x="${x + i * bw + 4}" y="${y + h - bh}" width="${bw - 8}" height="${bh}" rx="2" fill="${i === bars.length - 1 ? BLUE : 'rgba(72,171,224,.35)'}"/>`;
  });
  return out;
};

/**
 * A full dashboard mock. `theme` picks the left nav + KPI emphasis.
 */
export function dashboard({ title = 'SecureTrust Console', kpis = [], bars = [], theme = 'platform' } = {}) {
  const kpiDefaults = kpis.length ? kpis : [
    { value: '0', label: 'Active threats' },
    { value: '3,842', label: 'Endpoints' },
    { value: '99.2%', label: 'Patch coverage' },
    { value: '12,408', label: 'Emails blocked' },
  ];
  const kpiTiles = kpiDefaults.map((k, i) => {
    const x = 176 + (i % 2) * 236;
    const y = 22 + Math.floor(i / 2) * 84;
    return tile(x, y, 220, 68, k.value, k.label, i === 0 ? GREEN : '#fff');
  }).join('');

  const barData = bars.length ? bars : [40, 55, 38, 70, 62, 88, 74, 92, 60, 80, 68, 95];

  return raw(`
  <svg viewBox="0 0 660 300" role="img" xmlns="http://www.w3.org/2000/svg"
       aria-label="${title} dashboard preview">
    <rect width="660" height="300" rx="14" fill="${NAVY_DEEP}"/>
    <!-- window chrome -->
    <rect x="0" y="0" width="660" height="30" rx="14" fill="rgba(255,255,255,.04)"/>
    <rect x="0" y="15" width="660" height="15" fill="rgba(255,255,255,.04)"/>
    <circle cx="22" cy="15" r="4" fill="#ff5f57"/>
    <circle cx="38" cy="15" r="4" fill="#febc2e"/>
    <circle cx="54" cy="15" r="4" fill="#28c840"/>
    <text x="330" y="19" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}" text-anchor="middle">${title}</text>
    <!-- sidebar -->
    <rect x="0" y="30" width="152" height="270" fill="rgba(6,16,64,.5)"/>
    ${['Overview', 'Threats', 'Endpoints', 'Email', 'Identity', 'Reports'].map((item, i) => `
      <rect x="14" y="${56 + i * 34}" width="124" height="24" rx="6" fill="${i === 0 ? BLUE : 'transparent'}"/>
      <text x="26" y="${72 + i * 34}" font-family="Inter, sans-serif" font-size="12" fill="${i === 0 ? NAVY_DEEP : MUTED}">${item}</text>`).join('')}
    ${kpiTiles}
    <!-- chart area (left) -->
    <rect x="176" y="198" width="280" height="82" rx="10" fill="rgba(255,255,255,.04)" stroke="${LINE}"/>
    ${barChart(190, 210, 252, 58, barData)}
    <text x="190" y="266" font-family="Inter, sans-serif" font-size="10" fill="${MUTED}">Threats — last 30 days</text>
    <!-- activity list (right) -->
    <rect x="470" y="198" width="162" height="82" rx="10" fill="rgba(255,255,255,.04)" stroke="${LINE}"/>
    <text x="482" y="220" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#fff">Recent events</text>
    <circle cx="482" cy="236" r="4" fill="${GREEN}"/>
    <text x="492" y="240" font-family="Inter, sans-serif" font-size="10" fill="${MUTED}">Threat quarantined</text>
    <circle cx="482" cy="254" r="4" fill="${BLUE}"/>
    <text x="492" y="258" font-family="Inter, sans-serif" font-size="10" fill="${MUTED}">Patch deployed</text>
    <circle cx="482" cy="272" r="4" fill="${RED}"/>
    <text x="492" y="276" font-family="Inter, sans-serif" font-size="10" fill="${MUTED}">Login blocked</text>
  </svg>`);
}

/** A smaller terminal-style mock for hero--terminal. */
export function terminal(lines = []) {
  const content = lines.length ? lines : [
    ['$ stc scan --all', ''],
    ['Scanning 3,842 endpoints…', 'ok'],
    ['  phishing.domain  →  BLOCKED', ''],
    ['  cve-2026-0001   →  PATCHED', ''],
    ['Threats neutralized: 17', 'ok'],
    ['Remediation complete in 00:11', ''],
  ];
  const body = content.map(([text, cls]) => {
    const color = cls === 'ok' ? GREEN : text.includes('BLOCKED') ? RED : MUTED;
    return `<div style="color:${color}">${text.replace(/ /g, '&nbsp;')}</div>`;
  }).join('');
  return raw(`<div class="terminal" role="img" aria-label="SecureTrust command-line preview">
    <div class="terminal__bar"><span class="terminal__dot terminal__dot--r"></span><span class="terminal__dot terminal__dot--y"></span><span class="terminal__dot terminal__dot--g"></span></div>
    <div class="terminal__body">${body}</div>
  </div>`);
}
