// src/content/pages/healthcare-pricing.mjs — sales page for SecureTrust Practice
// Protection: managed security with a HIPAA Security Rule gap assessment included
// in a qualifying agreement. Not in the mega-menu; linked from industries/healthcare.
//
// Commercial terms live in OFFER. A null value means "not approved for publication":
// the page falls back to tailored-quote copy and never prints a placeholder.

import { html, join } from '../../lib/html.mjs';
import { icon } from '../../lib/icons.mjs';
import { faq } from '../../components/faq.mjs';

export const OFFER = {
  name: 'SecureTrust Practice Protection',
  // Price block only renders when rate, unit and term are all set.
  monthlyRate: null,        // number, e.g. 45
  billingUnit: null,        // e.g. 'per covered device'
  minimumMonthly: null,     // number
  setupFee: null,           // number; 0 renders "No setup fee"
  termMonths: null,         // number
  clinicproofIncluded: true, // confirmed by Rick, Nov 2026
};

const CTA = "Get My Practice's Price";
const money = (n) => `$${n.toLocaleString('en-US')}`;
const priceApproved = (o) => o.monthlyRate != null && o.billingUnit && o.termMonths != null;
const cta = (extra = '') => html`<a class="btn btn--primary btn--lg${extra}" href="#quote">${CTA}</a>`;

// Illustrative only — generic findings, no customer, no score.
const PLAN = [
  ['High', 'Former staff accounts still active', 'Disable and set an offboarding check', 'SecureTrust'],
  ['High', 'Backups never test-restored', 'Run and document a restore test', 'SecureTrust + practice'],
  ['Medium', 'No written device-loss procedure', 'Adopt a short procedure', 'Practice manager'],
];

const hero = (ctx) => html`<section class="hero hero--split hp-hero">
  <div class="container hero__inner">
    <div>
      <p class="eyebrow hero__eyebrow">Managed cybersecurity for healthcare practices</p>
      <h1 class="hero__title hp-hero__title">Protect your practice. Know where your HIPAA security gaps are.</h1>
      <p class="hero__sub">Get engineer-led cybersecurity with a HIPAA Security Rule gap assessment and prioritized remediation plan included in your qualifying service agreement.</p>
      <p class="hp-included">${icon('check')} <span><strong>HIPAA gap assessment included</strong> with your qualifying ${OFFER.name} service agreement.</span></p>
      <ul class="hp-benefits" role="list">
        ${join(['Managed protection for covered systems.', 'Clear findings and practical next steps.', 'Security expertise to help your practice move forward.']
          .map((b) => html`<li>${icon('shield')}<span>${b}</span></li>`))}
      </ul>
      <div class="hero__actions">
        ${cta()}
        <a class="btn btn--outline-inverse btn--lg" href="#included">See What's Included</a>
      </div>
      <p class="hp-micro">Tell us a little about your practice. We'll review your needs and prepare a tailored quote.</p>
    </div>
    <div class="hero__media">${planCard('Illustrative remediation plan')}</div>
  </div>
</section>`;

const planCard = (label) => html`<figure class="hp-plan" aria-label="${label}: example findings, not a real practice">
  <figcaption class="hp-plan__head">
    <span class="hp-plan__title">Remediation plan</span>
    <span class="hp-plan__tag">${label}</span>
  </figcaption>
  <table class="hp-plan__table">
    <thead><tr><th scope="col">Priority</th><th scope="col">Finding</th><th scope="col">Next step</th><th scope="col">Owner</th></tr></thead>
    <tbody>${join(PLAN.map(([p, f, s, o]) => html`<tr>
      <td><span class="hp-pri hp-pri--${p.toLowerCase()}">${p}</span></td><td>${f}</td><td>${s}</td><td>${o}</td></tr>`))}</tbody>
  </table>
  <p class="hp-plan__foot">Example findings for illustration. Priorities are not a diagnosis of any practice.</p>
</figure>`;

const problem = () => html`<section class="section">
  <div class="container container--m">
    <div class="section-head">
      <h2 class="section__title">Your practice needs more than another security checklist.</h2>
    </div>
    <div class="hp-problems">
      ${join([
        ['Are the safeguards actually in place?', 'Policies say one thing. Nobody has checked whether the computers, accounts and backups match.'],
        ['Who is supposed to fix it?', 'Between your IT company, your staff and your software vendors, it is not always clear who owns each security task.'],
        ['When would anyone have time?', 'Gathering evidence and following through competes with patients, scheduling and staffing.'],
      ].map(([t, b]) => html`<div><h3>${t}</h3><p>${b}</p></div>`))}
    </div>
    <p class="hp-bridge">${OFFER.name} answers all three: we protect your systems, show you where the gaps are, and agree who closes each one.</p>
  </div>
</section>`;

const INCLUDED = [
  { icon: 'shield', title: 'Managed cybersecurity', body: 'We deploy, configure and operate the security services in your agreement, then watch for and investigate the issues that need attention.', detail: 'Selected from our platform, such as cloud firewall, zero trust access, data loss prevention, SIEM and managed patching.' },
  { icon: 'search', title: 'HIPAA Security Rule gap assessment', body: 'We review the agreed safeguards and document where your practice falls short of the scoped requirements.', detail: 'Administrative, physical and technical safeguards, within the scope set in your agreement.' },
  { icon: 'chart', title: 'Prioritized remediation plan', body: 'Every gap gets a priority, a suggested next step and an owner, so you know what to do first and who is doing it.', detail: 'Technical fixes in your agreement are ours. Policy decisions and out-of-scope work are assigned to a named owner.' },
  { icon: 'users', title: 'Expert guidance', body: 'A security engineer walks you through the findings, answers questions in plain language and coordinates with your IT provider.', detail: 'Review meetings and escalation contacts are set in your agreement.' },
  OFFER.clinicproofIncluded && { icon: 'file', title: 'ClinicProof evidence tracking', body: 'ClinicProof keeps checking a defined set of HIPAA Security Rule controls and records each dated result, so remediation progress and evidence stay organized.', detail: 'Results show which controls are verified and which need attention.' },
].filter(Boolean);

const offer = () => html`<section class="section section--muted" id="included">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">${OFFER.name}</p>
      <h2 class="section__title">One managed service. A clearer path from security gaps to action.</h2>
      <p class="section__intro">One agreement covers protection, the assessment, a plan you can act on, and the people who help you act on it.</p>
    </div>
    <ol class="hp-offer" role="list">
      ${join(INCLUDED.map((i) => html`<li class="hp-offer__item">
        <span class="hp-offer__icon">${icon(i.icon)}</span>
        <div><h3>${i.title}</h3><p>${i.body}</p><p class="hp-offer__detail">${i.detail}</p></div>
      </li>`))}
    </ol>
    <p class="hp-condition">The gap assessment is included with a qualifying ${OFFER.name} service agreement. Advanced or additional services, such as policy writing or work outside your agreement, are quoted separately.</p>
    <div class="hp-cta-row">${cta()}</div>
  </div>
</section>`;

const assessment = () => html`<section class="section">
  <div class="container split">
    <div>
      <h2 class="section__title">See what needs attention—and what to do next.</h2>
      <p class="section__intro">We review your administrative, physical and technical safeguards within the agreed scope. You receive:</p>
      <ul class="hp-list" role="list">
        ${join(['Documented findings, written for practice owners and office managers', 'A priority for each gap, so the important work happens first', 'A remediation roadmap with a suggested next step and owner for every item', 'A results review with the engineer who did the work'].map((t) => html`<li>${icon('check')}<span>${t}</span></li>`))}
      </ul>
      <p class="hp-note">A gap assessment supports your security program. On its own, it is not a complete HIPAA risk analysis or a guarantee of compliance.</p>
    </div>
    <div>${planCard('Illustrative example')}</div>
  </div>
</section>`;

const price = () => {
  const o = OFFER;
  const panel = priceApproved(o)
    ? html`<p class="hp-price"><strong>${money(o.monthlyRate)}</strong> per month, ${o.billingUnit}</p>
      <ul class="hp-list" role="list">
        ${o.minimumMonthly != null ? html`<li>${icon('check')}<span>Minimum ${money(o.minimumMonthly)} per month</span></li>` : ''}
        <li>${icon('check')}<span>${o.termMonths}-month agreement</span></li>
        ${o.setupFee != null ? html`<li>${icon('check')}<span>${o.setupFee ? `${money(o.setupFee)} one-time setup` : 'No setup fee'}</span></li>` : ''}
      </ul>`
    : html`<p class="hp-price-lead">Your quote depends on:</p>
      <ul class="hp-list" role="list">
        ${join(['How many users and devices need protection', 'How many locations you operate', 'Which security services you select'].map((t) => html`<li>${icon('check')}<span>${t}</span></li>`))}
      </ul>`;
  return html`<section class="section section--muted">
    <div class="container container--m">
      <div class="hp-quote">
        <div>
          <h2 class="section__title">A quote built around your practice.</h2>
          ${panel}
        </div>
        <div class="hp-quote__side">
          <p class="hp-quote__badge">${icon('award')} Included in your agreement</p>
          <p>HIPAA Security Rule gap assessment and prioritized remediation plan${OFFER.clinicproofIncluded ? ', plus ClinicProof evidence tracking' : ''}.</p>
          <p class="hp-micro hp-micro--dark">A quote request is not a purchase or a commitment.</p>
          ${cta(' btn--block')}
        </div>
      </div>
    </div>
  </section>`;
};

const founder = (ctx) => html`<section class="section">
  <div class="container split hp-founder">
    <img src="${ctx.url.asset('img/team/richard-selvidge.jpg')}" alt="Richard Selvidge, founder of SecureTrust Cyber" width="768" height="917" loading="lazy" decoding="async">
    <div>
      <h2 class="section__title">Know who is helping protect your practice.</h2>
      <p class="section__intro">${OFFER.name} is led by Richard Selvidge, CISSP, ITIL, founder of SecureTrust Cyber. Richard has spent more than 25 years securing networks and systems, including classified programs for the U.S. Department of Defense.</p>
      <p>He founded SecureTrust Cyber to give independent practices the same disciplined security work, explained in plain language. When you have a question about a finding, you talk to an engineer who understands it.</p>
      <p><a href="${ctx.url('company/about')}">More about Richard and SecureTrust Cyber</a></p>
    </div>
  </div>
</section>`;

const STEPS = [
  ['Scope your practice', 'We identify the users, devices, locations and systems to cover, and how your current IT arrangements work.'],
  ['Deploy and assess', 'We coordinate the agreed security deployment and gather the information the gap assessment needs.'],
  ['Review and act', 'We explain the findings, agree who owns each item, and manage the contracted services from there.'],
];

const onboarding = () => html`<section class="section section--muted">
  <div class="container container--m">
    <div class="section-head"><h2 class="section__title">Getting started is three steps.</h2></div>
    <ol class="hp-steps" role="list">
      ${join(STEPS.map(([t, b], i) => html`<li><span class="hp-steps__num">${i + 1}</span><div><h3>${t}</h3><p>${b}</p></div></li>`))}
    </ol>
    <p class="hp-need"><strong>What we need from you:</strong> one practice contact, help coordinating access, and the documents or answers we ask for along the way.</p>
    <div class="hp-cta-row">${cta()}</div>
  </div>
</section>`;

const FAQ = [
  { q: 'We already have an IT provider. Why would we need this?', a: 'Many IT providers keep systems running but do not assess HIPAA safeguards or manage security services. We agree with you, and with your provider, who is responsible for what. How we work alongside them is part of scoping.' },
  { q: 'What exactly is included in the gap assessment?', a: 'A review of the administrative, physical and technical safeguards in your agreed scope, documented findings, a prioritized remediation plan, and a review of the results with you.' },
  { q: 'Is the assessment included, or is there a separate fee?', a: `It is included with a qualifying ${OFFER.name} service agreement. Your quote shows exactly what is covered.` },
  { q: 'Does this make our practice HIPAA compliant?', a: 'No service can promise that. Compliance depends on your policies, training and decisions as well as your technology. We help you find and close security gaps and keep the evidence organized.' },
  { q: 'Is a gap assessment the same as a HIPAA security risk analysis?', a: 'No. A gap assessment compares your safeguards with scoped requirements. A risk analysis also evaluates threats and the likelihood and impact of each risk. The assessment gives your risk analysis useful input.' },
  { q: 'Who fixes the issues identified?', a: 'Technical work covered by your agreement is handled by our team. Items such as policy decisions, staff matters or work outside the agreement are assigned to a named owner, and we can quote additional help if you want it.' },
  { q: 'How much time will our office need to spend?', a: 'Mostly a practice contact who can coordinate access, answer questions and attend the results review. We schedule work around patient care where we can.' },
  { q: 'What affects the price and agreement terms?', a: 'The number of users and devices covered, your locations, and the services you choose. Agreement length and any setup work are set out in your quote.' },
  { q: 'Is this appropriate for a small practice?', a: 'Yes. It is built for independent dental, medical and behavioral health practices that do not have security staff of their own.' },
  OFFER.clinicproofIncluded && { q: 'How does ClinicProof fit in?', a: 'ClinicProof is our control verification service. After the assessment, it keeps checking a defined set of HIPAA Security Rule controls and records dated results, so you can see remediation progress and have evidence organized when someone asks for it.' },
].filter(Boolean);

const quoteForm = (ctx) => html`<section class="section section--deep hp-final" id="quote">
  <div class="container split split--narrow">
    <div>
      <h2 class="section__title">Get a clear price and a practical next step.</h2>
      <p class="section__intro">Tell us about your practice. We'll review the systems you need protected, explain the included gap assessment, and prepare a quote for the agreed services.</p>
    </div>
    <form class="form hp-form" data-validate data-endpoint="https://api.web3forms.com/submit" data-email="${ctx.site.email}"
      data-success="Thanks, your request was received. We'll review your practice details and reply by email to prepare your quote."
      data-success-link="${ctx.site.bookingUrl}" data-success-link-label="Prefer to talk now? Book a 30-minute call." novalidate>
      <input type="hidden" name="access_key" value="${ctx.site.formAccessKey ?? ''}">
      <input type="hidden" name="subject" value="Healthcare pricing request from securetrustcyber.com">
      <input type="hidden" name="from_name" value="${ctx.site.name} website">
      <input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="field"><label class="field__label" for="q-name">Your name</label>
        <input class="field__input" id="q-name" name="name" type="text" required autocomplete="name"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="q-email">Work email</label>
        <input class="field__input" id="q-email" name="email" type="email" required autocomplete="email"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="q-practice">Practice name</label>
        <input class="field__input" id="q-practice" name="practice" type="text" required autocomplete="organization"><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="q-size">Approximate number of staff</label>
        <select class="field__input" id="q-size" name="practice_size" required>
          <option value="">Select…</option><option>1–5</option><option>6–15</option><option>16–40</option><option>41 or more</option><option>Not sure</option>
        </select><p class="field__error" hidden></p></div>
      <div class="field"><label class="field__label" for="q-type">Practice type <span class="field__hint">(optional)</span></label>
        <select class="field__input" id="q-type" name="practice_type">
          <option value="">Select…</option><option>Dental</option><option>Medical</option><option>Behavioral health</option><option>Other</option>
        </select></div>
      <p class="hp-phi">Please do not include patient information.</p>
      <button class="btn btn--primary btn--lg btn--block" type="submit">${CTA}</button>
      <p class="hp-form__legal">We use your details only to prepare your quote. This does not sign you up for a newsletter. See our <a href="${ctx.url('legal/privacy-policy')}">privacy policy</a>.</p>
    </form>
  </div>
</section>`;

export default {
  slug: 'healthcare-pricing',
  type: 'page',
  bodyClass: 'page--healthcare-pricing',
  title: 'Healthcare Practice Pricing',
  metaTitle: 'Healthcare Cybersecurity & HIPAA Gap Assessment | SecureTrust',
  metaDescription: 'Managed cybersecurity for healthcare practices, with a HIPAA Security Rule gap assessment included in a qualifying service agreement. Request a tailored quote.',
  cta: false,
  blocks: [
    hero,
    problem,
    offer,
    assessment,
    price,
    founder,
    onboarding,
    (ctx) => faq(ctx, { heading: 'Questions practices ask before getting a price', items: FAQ }),
    quoteForm,
  ],
};
