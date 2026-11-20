// src/content/pages/zero-trust-network-access.mjs — educational pillar page.
// Search intent: "what is ZTNA" / "zero trust network access" / "ZTNA vs VPN".
// Keep it explanatory; products/ztna is the product page and gets the hand-off.
// Topic outline drawn from Cato Networks' ZTNA explainer (we are a Cato partner);
// copy is our own, written for small and mid-size healthcare practices.

import { html, join } from '../../lib/html.mjs';
import { hero } from '../../components/hero.mjs';
import { prose } from '../../components/prose.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { timeline } from '../../components/timeline.mjs';
import { faq } from '../../components/faq.mjs';

const table = ({ eyebrow, heading, intro, cols, rows }) => () => html`<section class="section">
  <div class="container container--m">
    <div class="section-head">
      <p class="eyebrow">${eyebrow}</p>
      <h2 class="section__title">${heading}</h2>
      ${intro ? html`<p class="section__intro">${intro}</p>` : ''}
    </div>
    <div class="table-wrap">
      <table class="comparison-table">
        <caption class="visually-hidden">${heading}</caption>
        <thead><tr>${join(cols.map((c) => html`<th scope="col">${c}</th>`))}</tr></thead>
        <tbody>${join(rows.map(([h, ...cells]) => html`<tr><th scope="row">${h}</th>${join(cells.map((c) => html`<td>${c}</td>`))}</tr>`))}</tbody>
      </table>
    </div>
  </div>
</section>`;

const FAQ = [
  { q: 'What does ZTNA stand for?', a: 'Zero Trust Network Access. It is a way of granting remote and on-site users access to specific applications only after their identity, device and context have been verified, instead of placing them on the whole network.' },
  { q: 'Is ZTNA a replacement for a VPN?', a: 'For most organizations, yes. ZTNA covers the same need (reaching internal systems from anywhere) while limiting each user to the applications their role requires and checking the device on every connection.' },
  { q: 'Does ZTNA help with HIPAA?', a: 'It supports several HIPAA Security Rule safeguards, including access control, unique user identification and audit controls, because every access decision is tied to a named user and logged. It is one control among many, not a compliance program on its own.' },
  { q: 'Can vendors and contractors use ZTNA?', a: 'Yes. Third parties can be given access to a single application, such as an imaging server or practice management system, through a browser, without a client install and without seeing anything else on your network.' },
  { q: 'What happens if a laptop fails a posture check?', a: 'Access is blocked or reduced until the device is fixed, for example by turning disk encryption back on or updating antivirus. Checks continue during the session, not just at login.' },
  { q: 'How does ZTNA relate to SASE?', a: 'ZTNA is one component of Secure Access Service Edge (SASE). SASE delivers ZTNA together with firewall, web filtering, CASB, DLP and threat prevention from the same cloud service, under one policy.' },
];

export default {
  slug: 'zero-trust-network-access',
  type: 'page',
  title: 'What Is Zero Trust Network Access (ZTNA)?',
  metaTitle: 'What Is Zero Trust Network Access (ZTNA)? | SecureTrust Cyber',
  metaDescription: 'Zero Trust Network Access (ZTNA) explained: how it works, ZTNA vs VPN, agent vs clientless models, use cases and how to roll it out in a healthcare practice.',
  blocks: [
    (ctx) => hero(ctx, {
      variant: 'compact', eyebrow: 'Zero Trust explained',
      headline: 'What Is Zero Trust Network Access (ZTNA)?',
      sub: 'ZTNA connects people to the applications they need, and nothing else. Every request is checked against identity, device health and context before access is granted.',
      primary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
      secondary: { label: 'See Universal ZTNA', href: 'products/ztna' },
    }),

    (ctx) => prose(ctx, {
      eyebrow: 'The short answer',
      heading: 'Deny by default. Allow by exception.',
      body: `<p>Zero Trust Network Access is a security model for reaching private applications, whether they run in your office, a data center or the cloud. Nothing is trusted because of where it sits. A user, a device and a request each have to earn access, and that access is limited to the specific application a policy allows.</p>
<p>A traditional VPN works the other way around. Once someone logs in, they are on the network and can usually reach anything on the same subnet. If those credentials are phished, an attacker inherits the same broad reach. ZTNA closes that gap by drawing a separate trust boundary around every application, so a single compromised account cannot be used to roam.</p>
<p>For a dental office or medical group, that difference is practical: the front desk reaches the practice management system, the hygienist reaches imaging, the billing vendor reaches billing, and none of them can see the server holding everyone else's records.</p>`,
    }),

    (ctx) => featureGrid(ctx, {
      eyebrow: 'Why it matters', heading: 'What ZTNA changes',
      intro: 'Least-privilege access shrinks what an attacker, a careless insider or a compromised vendor account can reach.',
      variant: '3up',
      items: [
        { icon: 'layers', title: 'Microsegmentation by default', body: 'Each application sits behind its own software-defined perimeter, which cuts off lateral movement after a breach.' },
        { icon: 'key', title: 'Smaller blast radius', body: 'A stolen password opens one approved application for one user, not the whole network.' },
        { icon: 'users', title: 'Insider risk under control', body: 'Staff see only what their role needs, and every access attempt is logged for review.' },
        { icon: 'lock', title: 'Applications hidden from the internet', body: 'Private apps are never exposed publicly, so attackers cannot scan for them or target them with ransomware.' },
        { icon: 'globe', title: 'Consistent cloud access', body: 'The same identity-based rules govern access to cloud and on-premises systems.' },
        { icon: 'scale', title: 'Audit-ready evidence', body: 'Per-user, per-application logs support HIPAA access control and audit requirements and make reviews faster.' },
      ],
    }),

    (ctx) => timeline(ctx, {
      eyebrow: 'How it works', heading: 'From login to application in three checks',
      steps: [
        { title: 'Verify the user', body: 'The user signs in through your identity provider with multi-factor authentication.' },
        { title: 'Check the device and context', body: 'The service evaluates device posture (OS version, antivirus, disk encryption, certificates) and real-time context such as location, and keeps checking during the session.' },
        { title: 'Connect to the approved app only', body: 'An encrypted tunnel opens to the specific application the policy allows. Everything else on the network stays invisible.' },
      ],
    }),

    table({
      eyebrow: 'ZTNA vs VPN', heading: 'How ZTNA compares to a traditional VPN',
      intro: 'VPNs were designed when most systems lived in one office. ZTNA fits a workforce and an application estate that are spread out.',
      cols: ['', 'Traditional VPN', 'ZTNA'],
      rows: [
        ['Access scope', 'The whole network segment after login', 'Only the applications policy allows'],
        ['Device checks', 'Usually once, at connection', 'At connection and throughout the session'],
        ['Exposure', 'VPN gateway is reachable from the internet', 'Applications are hidden from the internet'],
        ['Performance', 'Traffic often backhauled through one office', 'Users connect through the nearest cloud point of presence'],
        ['Scaling', 'Limited by appliance capacity', 'Cloud-delivered, grows with users and sites'],
        ['Third-party access', 'Shared accounts or full network access', 'Per-app access, often clientless'],
      ],
    }),

    table({
      eyebrow: 'Deployment models', heading: 'Agent-based vs clientless ZTNA',
      intro: 'Most organizations use both: an agent on managed laptops, clientless browser access for vendors and personal devices.',
      cols: ['', 'Agent-based', 'Clientless (service-based)'],
      rows: [
        ['How it connects', 'Software client on the device', 'Browser through a cloud portal'],
        ['Best for', 'Company-managed laptops and desktops', 'Vendors, contractors and personal devices'],
        ['Device visibility', 'Deep posture checks', 'Limited to browser and session context'],
        ['Platform support', 'Windows, macOS, Linux, iOS, Android', 'Any modern browser'],
        ['Upkeep', 'Client updates to manage', 'Nothing to install'],
      ],
    }),

    (ctx) => featureGrid(ctx, {
      eyebrow: 'Use cases', heading: 'Where ZTNA earns its keep',
      variant: '3up',
      items: [
        { icon: 'laptop', title: 'Replace the VPN', body: 'Give remote staff, doctors on call and multi-location teams fast, granular access under one policy.' },
        { icon: 'users', title: 'Lock down vendor access', body: 'Give IT providers, billing services and equipment vendors access to one system, with no shared logins.' },
        { icon: 'building', title: 'Add new locations quickly', body: 'Bring an acquired practice or a new office onto the same access policy without merging networks.' },
      ],
    }),

    (ctx) => timeline(ctx, {
      eyebrow: 'Rolling it out', heading: 'How to implement ZTNA',
      steps: [
        { title: 'Inventory applications and users', body: 'List the systems people reach remotely and who needs each one, including vendors.' },
        { title: 'Pick the access model', body: 'Decide which users get an agent and which get clientless access.' },
        { title: 'Write least-privilege policies', body: 'Base rules on role, data sensitivity and device posture. Start strict and open only what is needed.' },
        { title: 'Pilot, then expand', body: 'Test with a small group, fix gaps, then move departments over and retire VPN accounts.' },
        { title: 'Train staff', body: 'Show users what changes, especially MFA prompts and posture warnings.' },
        { title: 'Monitor and tune', body: 'Review access logs, remove unused permissions and adjust policy as roles and systems change.' },
      ],
    }),

    (ctx) => prose(ctx, {
      eyebrow: 'ZTNA and SASE',
      heading: 'Built on Cato Networks SASE Cloud',
      body: `<p>SecureTrust Cyber is a Cato Networks partner, and our platform runs on the Cato SASE Cloud. ZTNA is delivered from Cato's global points of presence over its private backbone, so there is no separate connector appliance to deploy or maintain.</p>
<p>Because ZTNA shares a single-pass engine and one policy with the rest of the stack (<a href="${ctx.url('products/fwaas')}">Firewall-as-a-Service</a>, <a href="${ctx.url('products/swg')}">Secure Web Gateway</a>, <a href="${ctx.url('products/casb')}">CASB</a>, <a href="${ctx.url('products/dlp')}">DLP</a> and <a href="${ctx.url('products/ips')}">IPS</a>), access decisions and threat inspection happen together. Our engineers deploy, configure and manage it for you, so a practice without dedicated security staff still gets enterprise-grade zero trust.</p>
<p>See the capabilities on our <a href="${ctx.url('products/ztna')}">Universal ZTNA</a> page, or read our guide to <a href="${ctx.url('blog/zero-trust-architecture')}">zero trust architecture</a>.</p>`,
    }),

    (ctx) => faq(ctx, { heading: 'ZTNA questions, answered', items: FAQ }),
  ],
  cta: {
    heading: 'Ready to retire the VPN?',
    body: 'Talk with a SecureTrust Cyber engineer about moving your practice to zero trust access.',
    secondary: { label: 'Universal ZTNA', href: 'products/ztna' },
  },
};
