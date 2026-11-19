// src/content/pages/hipaa-risk-assessment-template.mjs — free downloadable HIPAA
// risk assessment template (Excel) with a completed fictional example.
// Search intent: "HIPAA risk assessment template". Converts to the paid service at
// services/hipaa-risk-assessment.
//
// The workbooks are built by tools/hipaa-risk-template/build_template.py into
// assets/downloads/. EXAMPLE_ROWS below mirror rows R1, R2, R4, R3 and R7 of the example
// workbook; keep them in step if the example changes. HHS statements checked Nov 2026
// against HHS risk analysis guidance and 45 CFR 164.308 / 164.316.

import { html, join } from '../../lib/html.mjs';
import { icon } from '../../lib/icons.mjs';
import { faq } from '../../components/faq.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';

export const FILES = {
  template: 'downloads/securetrust-hipaa-risk-assessment-template.xlsx',
  example: 'downloads/securetrust-hipaa-risk-assessment-example.xlsx',
};
const SERVICE = 'services/hipaa-risk-assessment';
const HHS_RA = 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html';
const SRA_TOOL = 'https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool';
const ext = (href, label) => html`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

const downloads = (ctx, extra = '') => html`<div class="hero__actions${extra}">
  <a class="btn btn--primary btn--lg" href="${ctx.url.asset(FILES.template)}" download>${icon('download')} Download the template</a>
  <a class="btn btn--outline-inverse btn--lg" href="${ctx.url.asset(FILES.example)}" download>Download the completed example</a>
</div>`;

// Fictional practice. Mirrors the example workbook.
export const EXAMPLE_ROWS = [
  ['High', 'Remote access tool', 'Imaging vendor shares one login with no multifactor sign-in', 'Named vendor accounts with multifactor sign-in, on request only', 'IT provider'],
  ['High', 'Backups', 'Restore not tested in over a year; imaging not confirmed in backup', 'Restore one chart and one day of images; record the time taken', 'IT provider'],
  ['High', 'Cloud email', 'Multifactor sign-in not enforced for all users', 'Enforce it for every mailbox; short phishing refresher', 'IT provider'],
  ['Medium', 'Practice management', 'Two former staff accounts still active', 'Disable them; add account removal to offboarding', 'Office manager'],
  ['Low', 'Operatory workstations', 'Screens face the chair; no automatic screen lock', 'Short idle screen lock; angle monitors', 'Office manager'],
];

const TABS = [
  { icon: 'file', title: '1 Practice & Scope', body: 'Who did the assessment, what it covers, the method used, and when it will be reviewed again.' },
  { icon: 'database', title: '2 ePHI Inventory', body: 'Every system, device, cloud service and backup that holds patient data, who can reach it, and whether a business associate agreement is on file.' },
  { icon: 'search', title: '3 Risk Register', body: 'Threats, vulnerabilities and current safeguards, rated by likelihood and impact. Scores and risk levels calculate for you.' },
  { icon: 'grid', title: '4 Risk Matrix', body: 'Plain-English rating definitions and a live summary of high, medium and low risks, and how many are still open.' },
  { icon: 'clock', title: '5 Review Log', body: 'A record of each review: when, why, who and what changed.' },
  { icon: 'check', title: 'Start Here', body: 'Instructions, a legend showing which cells to fill in, and the HIPAA requirements behind each tab.' },
];

const hero = (ctx) => html`<section class="hero hero--split hp-hero">
  <div class="container hero__inner">
    <div>
      <p class="eyebrow hero__eyebrow">Free download</p>
      <h1 class="hero__title hp-hero__title">HIPAA Risk Assessment Template for Dental and Medical Practices</h1>
      <p class="hero__sub">An Excel workbook for documenting your HIPAA Security Rule risk analysis: where patient data lives, what could go wrong, how serious each risk is, and who will fix it. Includes a completed example for a fictional dental practice.</p>
      <ul class="hp-benefits" role="list">
        ${join(['Follows the steps in HHS risk analysis guidance', 'Risk scores and levels calculate automatically', 'Free, no sign-up. Opens in Excel, Google Sheets or Numbers']
          .map((b) => html`<li>${icon('check')}<span>${b}</span></li>`))}
      </ul>
      ${downloads(ctx)}
    </div>
    <div class="hero__media">${planCard()}</div>
  </div>
</section>`;

function planCard() {
  return html`<figure class="hp-plan" aria-label="Excerpt from the completed example: risk register for a fictional dental practice">
    <figcaption class="hp-plan__head">
      <span class="hp-plan__title">Risk register</span>
      <span class="hp-plan__tag">Completed example</span>
    </figcaption>
    <table class="hp-plan__table">
      <thead><tr><th scope="col">Level</th><th scope="col">Finding</th><th scope="col">Corrective action</th></tr></thead>
      <tbody>${join(EXAMPLE_ROWS.slice(0, 3).map(([lvl, , f, a]) => html`<tr>
        <td><span class="hp-pri hp-pri--${lvl.toLowerCase()}">${lvl}</span></td><td>${f}</td><td>${a}</td></tr>`))}</tbody>
    </table>
    <p class="hp-plan__foot">From the completed example for a fictional dental practice.</p>
  </figure>`;
}

const example = (ctx) => html`<section class="section section--muted" id="example">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Completed example</p>
      <h2 class="section__title">See what a finished assessment looks like.</h2>
      <p class="section__intro">The example workbook is filled in for Maple Street Family Dental, a fictional two-dentist office. It lists 10 systems that hold patient data and 11 risks. Here are five of them.</p>
    </div>
    <div class="table-wrap">
      <table class="comparison-table ra-example">
        <caption class="visually-hidden">Five risks from the completed example risk register</caption>
        <thead><tr><th scope="col">Risk level</th><th scope="col">System</th><th scope="col">Vulnerability</th><th scope="col">Corrective action</th><th scope="col">Owner</th></tr></thead>
        <tbody>${join(EXAMPLE_ROWS.map(([lvl, sys, f, a, o]) => html`<tr>
          <td><span class="hp-pri hp-pri--${lvl.toLowerCase()}">${lvl}</span></td><td>${sys}</td><td>${f}</td><td>${a}</td><td>${o}</td></tr>`))}</tbody>
      </table>
    </div>
    <p class="hp-note">The practice, its systems and its findings are invented. They show how entries are written, not what your practice will find.</p>
    <p><a class="btn btn--navy" href="${ctx.url.asset(FILES.example)}" download>${icon('download')} Download the completed example</a></p>
  </div>
</section>`;

const STEPS = [
  ['Set the scope', 'Fill in tab 1: who is doing the assessment, which locations and systems it covers, and when you will review it again.'],
  ['List where patient data lives', 'On tab 2, list your practice management system, imaging, workstations, cloud services and backups, and who supports each one.'],
  ['Record risks and safeguards', 'On tab 3, add a row for each realistic threat, the weakness it could exploit, and what protects you today. Ask your IT provider for account lists and backup reports.'],
  ['Rate each risk', 'Pick a likelihood and an impact from 1 to 3 using the definitions on tab 4. The score and risk level fill in automatically.'],
  ['Assign the fixes', 'Give every risk a corrective action, an owner and a target date. Use "Accepted risk" only for a decision you have documented.'],
  ['Keep it current', 'Log each review on tab 5, and update the assessment when you add software, change vendors, move offices or have an incident.'],
];

const howTo = () => html`<section class="section" id="how-to-use">
  <div class="container container--m">
    <div class="section-head">
      <p class="eyebrow">How to use it</p>
      <h2 class="section__title">Six steps to a documented risk analysis.</h2>
    </div>
    <ol class="hp-steps" role="list">
      ${join(STEPS.map(([t, b], i) => html`<li><span class="hp-steps__num">${i + 1}</span><div><h3>${t}</h3><p>${b}</p></div></li>`))}
    </ol>
    <p class="hp-need">Keep patient names and other patient information out of the workbook. Describe systems and risks instead.</p>
  </div>
</section>`;

const requirements = () => html`<section class="section section--muted">
  <div class="container container--m">
    <div class="section-head">
      <p class="eyebrow">What HIPAA requires</p>
      <h2 class="section__title">What the Security Rule asks for, and what it leaves to you.</h2>
    </div>
    <ul class="hp-list" role="list">
      <li>${icon('check')}<span><strong>Required:</strong> an accurate and thorough assessment of the risks to the electronic patient information you hold (45 CFR §164.308(a)(1)(ii)(A)), and measures that reduce those risks (§164.308(a)(1)(ii)(B)).</span></li>
      <li>${icon('check')}<span><strong>Required:</strong> written documentation of the analysis, kept for 6 years from when it was created or last in effect, whichever is later (§164.316(b)(2)).</span></li>
      <li>${icon('check')}<span><strong>Your choice:</strong> the method and the format. HHS ${ext(HHS_RA, 'risk analysis guidance')} does not require a particular template, and this workbook is one way to document the steps it describes.</span></li>
      <li>${icon('check')}<span><strong>Your choice:</strong> how often. HHS sets no fixed frequency. It expects an ongoing process, updated when things change.</span></li>
    </ul>
    <p class="hp-note">Prefer a guided questionnaire? HHS also offers a free ${ext(SRA_TOOL, 'Security Risk Assessment Tool')} for small and medium practices. This page is general information, not legal advice.</p>
  </div>
</section>`;

const help = (ctx) => html`<section class="section">
  <div class="container container--m">
    <div class="section-head">
      <p class="eyebrow">Want an engineer to do it?</p>
      <h2 class="section__title">A template documents the work. Someone still has to do it.</h2>
      <p class="section__intro">Filling in the risk register well means checking accounts, backups, remote access and device updates, not just answering questions. If you would rather have that done for you, SecureTrust Cyber’s <a href="${ctx.url(SERVICE)}">HIPAA security risk assessment for dental and medical practices</a> gives you a written report, a prioritized remediation plan and a walkthrough with the engineer who did the work.</p>
    </div>
    <div class="hp-cta-row"><a class="btn btn--primary btn--lg" href="${ctx.url(SERVICE)}">See the assessment service ${icon('arrowRight')}</a></div>
  </div>
</section>`;

export const FAQ = [
  { q: 'Is filling in this template enough for HIPAA?', a: 'It can document your risk analysis, but compliance depends on doing the analysis accurately and acting on it, along with your policies, training and other safeguards. No template or service can guarantee compliance.' },
  { q: 'Do we have to use this format?', a: 'No. HHS does not require a specific method or format. What matters is that the analysis is accurate, thorough and documented.' },
  { q: 'How often should we update it?', a: 'HHS sets no fixed schedule. Many practices review once a year, and you should also update it after changes such as new software, a new vendor, an office move or a security incident.' },
  { q: 'Can we put patient information in the workbook?', a: 'You should not need to. Describe systems, risks and fixes. Leave out patient names and other patient details.' },
  { q: 'Which programs open it?', a: 'It is an Excel workbook (.xlsx). It also opens in Google Sheets and Apple Numbers, though drop-down lists and colors may look slightly different.' },
  { q: 'How is this different from the HHS SRA Tool?', a: 'The HHS tool walks you through a long questionnaire. This workbook is a lighter register you fill in directly. Either can support your documentation; use the one that suits your practice.' },
];

export default {
  slug: 'resources/hipaa-risk-assessment-template',
  type: 'page',
  bodyClass: 'page--hipaa-risk-template',
  title: 'HIPAA Risk Assessment Template',
  metaTitle: 'HIPAA Risk Assessment Template (Free Excel Download) | SecureTrust Cyber',
  metaDescription: 'Free HIPAA risk assessment template for dental and medical practices. Excel workbook with an ePHI inventory, risk register and a completed example.',
  cta: {
    heading: 'Rather have an engineer assess your practice?',
    body: 'Get a written HIPAA security risk assessment, a prioritized remediation plan and a walkthrough of the findings.',
    primary: { label: 'See the assessment service', href: SERVICE },
    secondary: { label: 'Talk to an Expert', href: 'talk-to-an-expert' },
  },
  blocks: [
    hero,
    (ctx) => featureGrid(ctx, {
      eyebrow: 'What is inside',
      heading: 'Six tabs that follow the HHS steps.',
      intro: 'Yellow cells are yours to fill in. Scores, risk levels and the summary calculate on their own.',
      items: TABS,
      variant: '3up',
    }),
    example,
    howTo,
    requirements,
    help,
    (ctx) => faq(ctx, { heading: 'Questions about the template', items: FAQ }),
  ],
};
