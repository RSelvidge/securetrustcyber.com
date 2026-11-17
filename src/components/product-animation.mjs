import { html, join } from '../lib/html.mjs';
import { PRODUCT_ANIMATIONS } from '../content/product-animations.data.mjs';

const label = (x, y, text, cls = '') => html`<text x="${x}" y="${y}" class="pm-label ${cls}" text-anchor="middle">${text}</text>`;
const box = (x, y, w, h, content, cls = '') => html`<g class="${cls}"><rect class="pm-panel" x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/>${content}</g>`;
const line = (path, cls = '') => html`<path class="pm-route ${cls}" d="${path}"/>`;
const flow = (path, delay = 0, cls = '') => html`<circle r="6" class="pm-flow ${cls}" style="offset-path:path('${path}');animation-delay:${delay}s"/>`;
const check = (x, y, cls = 'pm-reveal') => html`<g class="${cls}"><circle cx="${x}" cy="${y}" r="17" class="pm-check-bg"/><path d="m${x - 8} ${y} 5 6 11-13" class="pm-check"/></g>`;
const cross = (x, y) => html`<g class="pm-reject"><circle cx="${x}" cy="${y}" r="18" class="pm-cross-bg"/><path d="m${x - 6} ${y - 6} 12 12 m0-12-12 12" class="pm-cross"/></g>`;
const device = (x, y, name) => box(x, y, 160, 110, html`<rect x="${x + 28}" y="${y + 18}" width="104" height="52" rx="5" class="pm-screen"/><path d="M${x + 19} ${y + 80}h122" class="pm-route"/>${label(x + 80, y + 101, name)}`);
const stream = (path) => html`${line(path)}${flow(path)}${flow(path, -1.6)}${flow(path, -3.2)}`;
const header = (text) => label(500, 52, text, 'pm-kicker');

function scene(slug) {
  switch (slug) {
    case 'fwaas': return html`${header('TRAFFIC INSPECTION')}${device(70, 175, 'Users & sites')}
      ${stream('M230 220H780')}${line('M230 265H480', 'pm-route--danger')}${flow('M230 265H480', 0, 'pm-flow--threat')}
      ${box(460, 123, 80, 230, html`<path d="M487 145v185M513 145v185" class="pm-gateway"/>`)}
      ${box(780, 175, 160, 110, html`${label(860, 222, 'Protected')}${label(860, 248, 'applications')}`)}${cross(455, 265)}${check(860, 155)}${label(500, 390, 'Threat blocked · approved traffic continues', 'pm-outcome')}`;
    case 'ips': return html`${header('EXPLOIT PREVENTION')}${device(60, 175, 'Incoming traffic')}
      ${stream('M220 230H790')}${box(375, 125, 250, 220, html`${label(500, 170, 'Deep inspection')}<path class="pm-wave" d="M400 245h32l15-38 25 74 23-55 17 19h88"/><rect class="pm-inspect-sweep" x="400" y="195" width="8" height="100" rx="4"/>`)}
      ${flow('M220 230H425', 0, 'pm-flow--threat')}${cross(425, 230)}${device(790, 175, 'Workload')}${label(500, 390, 'Exploit detected before delivery', 'pm-outcome')}`;
    case 'dns-security': return html`${header('DOMAIN REPUTATION CHECK')}
      ${box(55, 133, 270, 80, html`${label(190, 166, 'portal.example')}${label(190, 191, 'Trusted lookup', 'pm-small')}`)}
      ${box(55, 273, 270, 80, html`${label(190, 306, 'phishing.example')}${label(190, 331, 'Malicious lookup', 'pm-small')}`)}
      ${stream('M325 173H710')}${line('M325 313H495', 'pm-route--danger')}${flow('M325 313H495', 0, 'pm-flow--threat')}
      ${box(435, 110, 130, 110, html`${label(500, 154, 'DNS')}${label(500, 182, 'policy')}`)}
      ${box(710, 133, 235, 80, html`${label(827, 179, 'Resolved')}`)}${check(902, 174)}${cross(500, 313)}${label(740, 318, 'No connection opened', 'pm-outcome')}`;
    case 'swg': return html`${header('WEB ACCESS POLICY')}${device(55, 180, 'Browser')}
      ${stream('M215 235H440')}${box(405, 125, 190, 230, html`${label(500, 173, 'Web gateway')}<rect x="445" y="202" width="110" height="12" rx="5" class="pm-code"/><rect x="445" y="232" width="82" height="12" rx="5" class="pm-code"/>${check(500, 297)}`)}
      ${stream('M595 205C670 205 650 145 735 145')}${box(735, 105, 220, 80, html`${label(845, 152, 'Approved site')}`)}
      ${line('M595 285H700', 'pm-route--danger')}${flow('M595 285H700', 0, 'pm-flow--threat')}${cross(700, 285)}${box(755, 249, 200, 80, html`${label(855, 282, 'Risky download')}${label(855, 307, 'Blocked', 'pm-danger-text')}`)}${label(500, 400, 'Policy follows the user', 'pm-outcome')}`;
    case 'ztna': return html`${header('LEAST-PRIVILEGE ACCESS')}${device(45, 190, 'Remote user')}
      ${stream('M205 245H790')}${join(['Identity', 'Device', 'Policy'].map((name, i) => box(285 + i * 155, 172, 130, 145, html`${label(350 + i * 155, 211, name)}${check(350 + i * 155, 260, `pm-reveal pm-delay-${i}`)}`)))}
      ${box(790, 190, 170, 110, html`${label(875, 233, 'Private app')}${label(875, 262, 'Approved', 'pm-success-text')}`)}
      ${line('M725 245V365H825', 'pm-route--danger')}${cross(778, 365)}${label(880, 373, 'Other apps isolated', 'pm-small')}`;
    case 'casb': return html`${header('CLOUD APP DISCOVERY')}${device(65, 185, 'Cloud activity')}
      ${stream('M225 240H455')}${box(400, 160, 190, 160, html`${label(495, 202, 'App discovery')}<circle cx="495" cy="256" r="32" class="pm-radar"/><path d="M495 256l26-20" class="pm-radar-hand"/>`)}
      ${join([['Approved SaaS', 80], ['Approved tenant', 200], ['High-risk app', 320]].map(([name, y], i) => html`${line(`M590 240C660 240 650 ${y + 40} 735 ${y + 40}`, i === 2 ? 'pm-route--danger' : '')}${box(735, y, 220, 80, html`${label(845, y + 46, name)}`, `pm-discover pm-delay-${i}`)}${i === 2 ? cross(710, y + 40) : check(710, y + 40, `pm-reveal pm-delay-${i}`)}`))}`;
    case 'dlp': return html`${header('SENSITIVE CONTENT INSPECTION')}
      ${box(65, 110, 250, 270, html`${label(190, 155, 'Document')}<path d="M100 190h170M100 225h170M100 260h170M100 295h110" class="pm-document-lines"/><rect x="100" y="211" width="170" height="22" rx="4" class="pm-sensitive"/><rect x="100" y="280" width="110" height="22" rx="4" class="pm-sensitive"/><rect x="89" y="175" width="202" height="4" class="pm-document-scan"/>`)}
      ${stream('M315 190H760')}${box(425, 135, 180, 110, html`${label(515, 178, 'DLP policy')}${label(515, 207, 'Content allowed', 'pm-small')}`)}
      ${line('M315 302H500', 'pm-route--danger')}${flow('M315 302H500', 0, 'pm-flow--threat')}${cross(500, 302)}${label(600, 355, 'Sensitive fields withheld', 'pm-outcome')}
      ${box(760, 135, 195, 110, html`${label(857, 178, 'Destination')}${label(857, 207, 'Approved data', 'pm-success-text')}`)}${check(858, 115)}`;
    case 'ai-security': return html`${header('PROMPT GUARDRAILS')}
      ${box(55, 135, 330, 210, html`${label(220, 177, 'User prompt')}<path d="M85 210h260M85 280h210" class="pm-document-lines"/><rect x="85" y="232" width="235" height="22" rx="4" class="pm-sensitive"/><rect x="85" y="232" width="235" height="22" rx="4" class="pm-redaction"/>${label(220, 322, 'Sensitive details redacted', 'pm-small')}`)}
      ${stream('M385 240H755')}${box(460, 155, 170, 170, html`${label(545, 200, 'Guardrails')}${check(545, 256)}`)}
      ${box(755, 155, 200, 170, html`${label(855, 202, 'Approved AI')}<path d="M810 235h90M810 255h65M810 275h80" class="pm-document-lines"/>`)}${label(500, 405, 'Useful context continues. Sensitive details do not.', 'pm-outcome')}`;
    case 'siem': return html`${header('EVENT CORRELATION')}
      ${join(['Endpoint', 'Network', 'Cloud'].map((name, i) => html`${box(50, 88 + i * 120, 180, 70, label(140, 131 + i * 120, name))}${stream(`M230 ${123 + i * 120}C350 ${123 + i * 120} 340 243 445 243`)}`))}
      ${box(410, 143, 215, 200, html`${label(517, 183, 'Correlate events')}<path d="M450 258l48-40 45 58 48-34" class="pm-chain"/>${join([[450,258],[498,218],[543,276],[591,242]].map(([x,y], i) => html`<circle cx="${x}" cy="${y}" r="8" class="pm-event pm-delay-${i % 3}"/>`))}`)}
      ${stream('M625 243H760')}${box(760, 173, 195, 140, html`${label(857, 220, 'Investigation')}${label(857, 252, 'Correlated alert', 'pm-danger-text')}`, 'pm-alert')}${label(500, 418, 'Separate signals become a connected story', 'pm-outcome')}`;
    case 'patch-management': return html`${header('MANAGED UPDATE DELIVERY')}
      ${box(55, 155, 210, 180, html`${label(160, 201, 'Update approved')}${check(160, 259)}`)}
      ${stream('M265 245H470')}${box(415, 150, 195, 190, html`${label(512, 195, 'Maintenance')}${label(512, 223, 'window')}<rect x="446" y="259" width="130" height="10" rx="5" class="pm-progress-track"/><rect x="446" y="259" width="130" height="10" rx="5" class="pm-progress"/>`)}
      ${join(['Endpoint A', 'Endpoint B', 'Endpoint C'].map((name, i) => html`${stream(`M610 245C690 245 660 ${113 + i * 120} 760 ${113 + i * 120}`)}${box(760, 78 + i * 120, 195, 80, html`${label(845, 124 + i * 120, name)}${check(926, 118 + i * 120, `pm-installed pm-delay-${i}`)}`)}`))}`;
    default: throw new Error(`No animation scene for ${slug}`);
  }
}

export function productAnimation(ctx, product, { compact = false } = {}) {
  const slug = product.slug.split('/').at(-1);
  const config = PRODUCT_ANIMATIONS[slug];
  if (!config) throw new Error(`Missing product animation: ${slug}`);
  const image = product.capabilities.items.find((item) => item.image)?.image;
  return html`<article class="product-motion${compact ? ' product-motion--compact' : ''}" data-product-motion="${slug}">
    <div class="product-motion__heading"><p class="eyebrow">${compact ? product.title : 'Protection in motion'}</p><${compact ? 'h3' : 'h2'}>${config.title}</${compact ? 'h3' : 'h2'}><p>${config.intro}</p></div>
    <div class="product-motion__player">
      <div class="product-motion__stage" role="img" aria-label="${config.intro}">
        ${image ? html`<img class="product-motion__art" src="${ctx.url.asset(image.src)}" alt="" width="${image.width}" height="${image.height}" loading="lazy" decoding="async">` : ''}
        <div class="product-motion__shade"></div>
        <svg viewBox="0 0 1000 470" aria-hidden="true" focusable="false">${scene(slug)}</svg>
      </div>
      <div class="product-motion__legend">${config.legend}</div>
    </div>
    <ol class="product-motion__steps">${join(config.steps.map((step) => html`<li>${step}</li>`))}</ol>
    ${compact ? html`<a class="product-motion__link" href="${ctx.url(product.slug)}">Explore ${product.title} →</a>` : html`<p class="product-motion__note">Conceptual illustration. Deployment configuration and policy determine actual behavior.</p>`}
  </article>`;
}
