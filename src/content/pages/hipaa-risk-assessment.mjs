// src/content/pages/hipaa-risk-assessment.mjs — service landing page for the
// HIPAA Security Risk Assessment, aimed at independent dental and medical practices.
// Search intent: "HIPAA risk assessment services" / "HIPAA security risk assessment".
// Keep it on the service: compliance/hipaa covers the rule, the blog guide educates,
// ClinicProof covers ongoing control verification.
//
// Business terms live in ASSESSMENT. A null value means "not approved for
// publication": the copy falls back to scoping language and never prints a
// placeholder. Regulatory statements follow HHS OCR risk analysis guidance
// (45 CFR 164.308(a)(1)(ii)(A)), checked Nov 2026.

import { html, join } from '../../lib/html.mjs';
import { icon } from '../../lib/icons.mjs';
import { faq } from '../../components/faq.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';

export const ASSESSMENT = {
  price: null,        // e.g. 'From $2,500' — renders only when set
  turnaround: null,   // e.g. 'two to four weeks from kickoff to walkthrough'
  baa: null,          // true once confirmed we sign a BAA before assessment work
  sampleReport: null, // asset path of an approved, redacted sample report (PDF)
};

export const CTA = 'Request an Assessment';
const HHS_RA = 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html';
const cta = (extra = '') => html`<a class="btn btn--primary btn--lg${extra}" href="#request">${CTA} ${icon('arrowRight')}</a>`;

// Illustrative only: generic findings, no customer, no score.
const PLAN = [
  ['High', 'Vendor remote access uses one shared login', 'Named accounts with MFA, on request only', 'IT provider'],
  ['High', 'Backups never test-restored', 'Run and document a restore test', 'IT provider'],
  ['Medium', 'Former staff still in the practice system', 'Remove, then add an offboarding step', 'Practice manager'],
];

const planCard = (label) => html`<figure class="hp-plan" aria-label="${label}: example findings, not a real practice">
  <figcaption class="hp-plan__head">
    <span class="hp-plan__title">Prioritized findings</span>
    <span class="hp-plan__tag">${label}</span>
  </figcaption>
  <table class="hp-plan__table">
    <thead><tr><th scope="col">Priority</th><th scope="col">Finding</th><th scope="col">Recommended fix</th><th scope="col">Owner</th></tr></thead>
    <tbody>${join(PLAN.map(([p, f, s, o]) => html`<tr>
      <td><span class="hp-pri hp-pri--${p.toLowerCase()}">${p}</span></td><td>${f}</td><td>${s}</td><td>${o}</td></tr>`))}</tbody>
  </table>
  <p class="hp-plan__foot">Example findings for illustration. They do not describe any real practice.</p>
</figure>`;

const hero = () => html`<section class="hero hero--split hp-hero">
  <div class="container hero__inner">
    <div>
      <p class="eyebrow hero__eyebrow">HIPAA risk assessment services</p>
      <h1 class="hero__title hp-hero__title">HIPAA Security Risk Assessments for Dental and Medical Practices</h1>
      <p class="hero__sub">Find where patient data is exposed and get a prioritized plan to reduce risk. A SecureTrust Cyber engineer guides your practice through the assessment and explains what to fix first.</p>
      <ul class="hp-benefits" role="list">
        ${join(['For independent practices without in-house security staff', 'Written risk assessment and remediation plan', 'Findings walkthrough with the engineer who did the work']
          .map((b) => html`<li>${icon('check')}<span>${b}</span></li>`))}
      </ul>
      <div class="hero__actions">${cta()}</div>
      <p class="hp-micro">Tell us about your practice. We reply by email to set up a short scoping call.</p>
    </div>
    <div class="hero__media">${planCard('Illustrative example')}</div>
  </div>
</section>`;

const intro = () => html`<section class="section section--muted">
  <div class="container container--m">
    <div class="section-head">
      <h2 class="section__title">A risk assessment answers three questions.</h2>
      <p class="section__intro">HIPAA requires every practice to assess the risks to the electronic patient information it holds. In plain terms, the assessment works out:</p>
    </div>
    <div class="hp-problems">
      ${join([
        ['Where is patient data?', 'Every computer, system, cloud service and backup that stores or sends electronic patient information.'],
        ['Who can reach it?', 'Staff, former staff, vendors and anyone who could get in through a weak account or an open connection.'],
        ['What protects it?', 'Which safeguards are in place, whether they work, and what could happen where they fall short.'],
      ].map(([t, b]) => html`<div><h3>${t}</h3><p>${b}</p></div>`))}
    </div>
  </div>
</section>`;

const SCOPE = [
  { icon: 'laptop', title: 'Front desk and treatment rooms', body: 'Workstations, shared logins, screen locks and the updates each computer is or is not getting.' },
  { icon: 'database', title: 'Practice management and imaging', body: 'Your practice management, charting and imaging systems, the servers they run on, and who has access to them.' },
  { icon: 'globe', title: 'Cloud services and email', body: 'Email, file sharing, online scheduling and other cloud services that store or send patient information.' },
  { icon: 'layers', title: 'Backups', body: 'Where backups go, whether they are protected from ransomware, and whether anyone has tested a restore.' },
  { icon: 'users', title: 'Staff accounts', body: 'Who has which access, how accounts are added and removed, and where multi-factor sign-in is missing.' },
  { icon: 'key', title: 'Vendor remote access', body: 'How your IT provider and software vendors connect in, which accounts they use, and whether anyone can see when they do.' },
];

const deliverables = (ctx) => html`<section class="section section--muted" id="deliverables">
  <div class="container split">
    <div>
      <p class="eyebrow">What you receive</p>
      <h2 class="section__title">A written assessment you can act on.</h2>
      <ul class="hp-list" role="list">
        ${join([
          ['Written risk assessment.', 'Where patient data lives, the threats and weaknesses we found, the safeguards in place, and a rating for each risk based on likelihood and impact.'],
          ['Prioritized findings.', 'Every risk ranked, so the most serious work happens first.'],
          ['Remediation plan.', 'A recommended fix and a suggested owner for each finding: your practice, your IT provider or a vendor.'],
          ['Findings walkthrough.', 'A session with the engineer who did the work, in plain language, with time for your questions and your IT provider’s.'],
        ].map(([t, b]) => html`<li>${icon('check')}<span><strong>${t}</strong> ${b}</span></li>`))}
      </ul>
      ${ASSESSMENT.sampleReport
        ? html`<p><a href="${ctx.url.asset(ASSESSMENT.sampleReport)}">Download a redacted sample report</a></p>`
        : html`<p class="hp-note">The assessment documents the elements HHS describes in its <a href="${HHS_RA}" target="_blank" rel="noopener noreferrer">risk analysis guidance</a>. It supports your HIPAA program; it does not certify compliance.</p>`}
    </div>
    <figure class="ra-finding" aria-label="Illustrative finding: an example, not a real practice">
      <figcaption class="hp-plan__head">
        <span class="hp-plan__title">Example finding</span>
        <span class="hp-plan__tag">Illustrative</span>
      </figcaption>
      <p class="ra-finding__risk"><span class="hp-pri hp-pri--high">High risk</span> Vendor remote access uses one shared login with no multi-factor sign-in.</p>
      <dl class="ra-finding__list">
        <div><dt>Business impact</dt><dd>Anyone with that password could reach the imaging server and the practice management system. Ransomware there could stop scheduling and charting for days.</dd></div>
        <div><dt>Recommended fix</dt><dd>Give each vendor a named account with multi-factor sign-in, turn access on only when requested, and keep a log of each session.</dd></div>
        <div><dt>Suggested owner</dt><dd>IT provider, with the practice manager approving vendor requests.</dd></div>
      </dl>
      <p class="hp-plan__foot">An example of how findings are written. It does not describe any real practice.</p>
    </figure>
  </div>
</section>`;

const STEPS = [
  ['Scoping', 'A short call to learn your locations, staff count, systems and who supports your IT. We confirm what the assessment covers and send a written proposal.'],
  ['Evidence collection', 'We gather what we need from your practice and your IT provider: system lists, account lists, backup reports and current policies. We schedule around patient care.'],
  ['Assessment', 'We review the systems in scope, identify threats and weaknesses, check which safeguards work, and rate each risk by likelihood and impact.'],
  ['Findings walkthrough', 'We deliver the written assessment and remediation plan and walk you through it. Your IT provider is welcome to join.'],
];

const process = () => html`<section class="section" id="how-it-works">
  <div class="container container--m">
    <div class="section-head">
      <p class="eyebrow">How it works</p>
      <h2 class="section__title">Four steps from first call to a plan.</h2>
    </div>
    <ol class="hp-steps" role="list">
      ${join(STEPS.map(([t, b], i) => html`<li><span class="hp-steps__num">${i + 1}</span><div><h3>${t}</h3><p>${b}</p></div></li>`))}
    </ol>
    <div class="ra-needs">
      <div>
        <h3>From your practice</h3>
        <ul class="hp-list" role="list">
          ${join(['One contact, usually the office or practice manager', 'A list of staff and the systems each person uses', 'Your software vendors and any business associate agreements', 'Current HIPAA policies and any previous risk assessment', 'About an hour for an interview, plus the walkthrough']
            .map((t) => html`<li>${icon('check')}<span>${t}</span></li>`))}
        </ul>
      </div>
      <div>
        <h3>From your IT provider</h3>
        <ul class="hp-list" role="list">
          ${join(['A device and server list', 'User and admin account lists', 'Backup setup and recent backup reports', 'How remote access works and who has it', 'Firewall, antivirus and update settings']
            .map((t) => html`<li>${icon('check')}<span>${t}</span></li>`))}
        </ul>
      </div>
    </div>
    <p class="hp-need">No IT provider? That is fine. We collect the technical details with you during the assessment.</p>
  </div>
</section>`;

const engineer = (ctx) => html`<section class="section section--muted">
  <div class="container split hp-founder">
    <img src="${ctx.url.asset('img/team/richard-selvidge.jpg')}" alt="Richard Selvidge, founder of SecureTrust Cyber" width="768" height="917" loading="lazy" decoding="async">
    <div>
      <h2 class="section__title">An engineer, not a questionnaire.</h2>
      <p class="section__intro">Assessments are led by Richard Selvidge, CISSP, ITIL, founder and chief security engineer of SecureTrust Cyber, with more than 25 years in IT and cybersecurity.</p>
      <p>You get findings written for a practice manager, not a compliance department, and a person who can explain each one and answer your IT provider’s questions.</p>
      <p><a href="${ctx.url('company/about')}">More about SecureTrust Cyber</a></p>
    </div>
  </div>
</section>`;

const after = (ctx) => html`<section class="section">
  <div class="container container--m">
    <div class="section-head">
      <h2 class="section__title">After the walkthrough, the plan is yours.</h2>
      <p class="section__intro">Your practice and IT provider can work through the plan on their own. If you want help, we can quote the remediation work or manage your security for you.</p>
    </div>
    <ul class="hp-list" role="list">
      <li>${icon('check')}<span>Need ongoing protection? <a href="${ctx.url('healthcare-pricing')}">SecureTrust Practice Protection</a> covers managed security for healthcare practices.</span></li>
      <li>${icon('check')}<span>Want proof that fixes stay fixed? <a href="${ctx.url('clinicproof')}">ClinicProof</a> keeps checking key HIPAA safeguards and records the results.</span></li>
    </ul>
    <div class="hp-cta-row">${cta()}</div>
  </div>
</section>`;

const howLong = ASSESSMENT.turnaround
  ? `Most assessments take ${ASSESSMENT.turnaround}. The office time is mostly one interview and the walkthrough.`
  : 'It depends on the number of locations, staff and systems in scope. After the scoping call, your proposal gives a timeline. The office time is mostly one interview and the walkthrough.';

export const FAQ = [
  { q: 'Does HIPAA require a security risk assessment?', a: html`Yes. The HIPAA Security Rule requires covered entities to conduct an accurate and thorough assessment of the risks to electronic protected health information (45 CFR §164.308(a)(1)(ii)(A)). HHS does not set a frequency. Its <a href="${HHS_RA}" target="_blank" rel="noopener noreferrer">guidance</a> treats it as an ongoing process, revisited when things change, such as new systems, new staff or a security incident.` },
  { q: 'We already have an IT provider. How does this work with them?', a: 'We work alongside them. They usually supply the technical details, such as device lists and backup reports, and they are welcome at the walkthrough. Many findings will be theirs to fix, so the plan names an owner for each one.' },
  { q: 'What records should we prepare?', a: 'Staff and system lists, your software vendors and business associate agreements, current HIPAA policies, and any earlier risk assessment. Your IT provider can supply device, account and backup details. We send a checklist after scoping.' },
  { q: 'How long does it take?', a: howLong },
  { q: 'What happens after the findings are delivered?', a: 'You keep the written assessment and plan. Your practice and IT provider can work through it, or we can quote the remediation work or ongoing managed security. Review the assessment again when your systems, vendors or staff change.' },
  { q: 'Will this make our practice HIPAA compliant?', a: 'No assessment can promise that. Compliance depends on your policies, training and decisions as well as your technology. The assessment shows where your risks are and what to fix first.' },
  { q: 'How is this different from a gap assessment or ClinicProof?', a: 'A gap assessment compares your safeguards with a checklist of requirements. A risk assessment also rates the threats to your patient data by likelihood and impact. ClinicProof is ongoing: it keeps checking key safeguards after the assessment.' },
  ASSESSMENT.baa && { q: 'Will you sign a business associate agreement?', a: 'Yes. If the assessment involves access to systems that hold patient information, we sign a business associate agreement before the work starts.' },
  ASSESSMENT.price && { q: 'How much does it cost?', a: `${ASSESSMENT.price}. Your proposal confirms the price for your practice after the scoping call.` },
].filter(Boolean);

const requestForm = (ctx) => html`<section class="section section--deep hp-final" id="request">
  <div class="container split split--narrow">
    <div>
      <h2 class="section__title">Request your HIPAA security risk assessment.</h2>
      <p class="section__intro">Here is what happens next:</p>
      <ol class="ra-next" role="list">
        <li>We review your request and reply by email to set up a short scoping call.</li>
        <li>On the call, we confirm what the assessment covers and answer your questions.</li>
        <li>We send a written proposal with scope, timeline and price. Nothing starts until you approve it.</li>
      </ol>
      <p class="hp-micro">Prefer to talk now? <a class="ra-book"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}">Book a 30-minute call</a>.</p>
    </div>
    <form class="form hp-form" data-validate data-endpoint="https://api.web3forms.com/submit" data-email="${ctx.site.email}"
      data-success="Thanks, your request was received. We'll reply by email to set up a short scoping call."
      data-success-link="${ctx.site.bookingUrl}" data-success-link-label="Prefer to talk now? Book a 30-minute call." novalidate>
      <input type="hidden" name="access_key" value="${ctx.site.formAccessKey ?? ''}">
      <input type="hidden" name="subject" value="HIPAA risk assessment request from securetrustcyber.com">
      <input type="hidden" name="from_name" value="${ctx.site.name} website">
      <input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="field"><label class="field__label" for="ra-name">Your name</label>
        <input class="field__input" id="ra-name" name="name" type="text" required autocomplete="name"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="ra-email">Work email</label>
        <input class="field__input" id="ra-email" name="email" type="email" required autocomplete="email"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="ra-practice">Practice name</label>
        <input class="field__input" id="ra-practice" name="practice" type="text" required autocomplete="organization"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="ra-type">Practice type</label>
        <select class="field__input" id="ra-type" name="practice_type" required>
          <option value="">Select…</option><option>Dental</option><option>Medical</option><option>Specialty clinic</option><option>Other</option>
        </select><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="ra-size">Approximate number of staff</label>
        <select class="field__input" id="ra-size" name="practice_size" required>
          <option value="">Select…</option><option>1–5</option><option>6–15</option><option>16–40</option><option>41 or more</option><option>Not sure</option>
        </select><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="ra-it">Who handles your IT? <span class="field__hint">(optional)</span></label>
        <select class="field__input" id="ra-it" name="it_support">
          <option value="">Select…</option><option>Outside IT provider</option><option>Someone on staff</option><option>No one in particular</option><option>Not sure</option>
        </select></div>
      <p class="hp-phi">Please do not include patient information.</p>
      <button class="btn btn--primary btn--lg btn--block" type="submit">${CTA}</button>
      <p class="hp-form__legal">We use your details only to respond to your request. This does not sign you up for a newsletter. See our <a href="${ctx.url('legal/privacy-policy')}">privacy policy</a>.</p>
    </form>
  </div>
</section>`;

export default {
  slug: 'services/hipaa-risk-assessment',
  type: 'page',
  bodyClass: 'page--hipaa-risk-assessment',
  title: 'HIPAA Security Risk Assessment',
  metaTitle: 'HIPAA Risk Assessment Services | SecureTrust Cyber',
  metaDescription: 'Get a HIPAA security risk assessment for your dental or medical practice. Receive a written report, prioritized remediation plan, and an engineer-led walkthrough.',
  cta: false,
  blocks: [
    hero,
    intro,
    (ctx) => featureGrid(ctx, {
      eyebrow: 'What we assess',
      heading: 'The places patient data actually lives.',
      intro: 'We look at your practice the way an attacker or an auditor would, starting with the systems your team uses every day.',
      items: SCOPE,
    }),
    deliverables,
    process,
    engineer,
    after,
    (ctx) => faq(ctx, { heading: 'Questions practices ask before booking', items: FAQ }),
    requestForm,
  ],
};
