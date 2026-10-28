import { html, join } from '../../lib/html.mjs';
import { icon } from '../../lib/icons.mjs';
import { featureGrid } from '../../components/feature-grid.mjs';
import { timeline } from '../../components/timeline.mjs';
import { faq } from '../../components/faq.mjs';

const responsibilities = [
  ['Design & deployment', 'Plan the rollout, configure the selected controls and onboard your users and devices.', 'Introduce your systems and approve the rollout plan.'],
  ['Security policy', 'Build and maintain access rules, web policies and data controls around your business.', 'Tell us who needs access and approve business exceptions.'],
  ['Monitoring & investigation', 'Review the signals from your managed services, investigate issues and explain what matters.', 'Provide business context when an issue affects your operations.'],
  ['Changes & remediation', 'Make agreed security changes, manage patch activity and coordinate corrective work within scope.', 'Approve disruptive changes and agree maintenance windows.'],
  ['Reporting & improvement', 'Explain findings, completed work and recommended next steps in business terms.', 'Set priorities and make decisions about remaining risk.'],
];

export default {
  slug: 'managed-security', type: 'page', title: 'Expert-Managed Security',
  metaTitle: 'Security Managed for You, by Experts | SecureTrust Cyber',
  metaDescription: 'SecureTrust Cyber experts deploy, configure and manage your security. Get specialist ownership, practical guidance and ongoing operations for your business.',
  cta: {
    heading: 'Let experts take the security work off your plate.',
    body: 'Talk through your environment, choose the right protection and agree exactly what our team will manage for you.',
    primary: { label: 'Talk to a Security Expert', href: 'talk-to-an-expert' },
    secondary: { label: 'Explore Bundles', href: 'pricing' },
  },
  blocks: [
    (ctx) => html`<section class="managed-hero"><div class="container managed-hero__grid">
      <div><p class="eyebrow">Expert-managed cybersecurity</p><h1>Security managed for you.<br><span>By experts.</span></h1>
      <p class="managed-hero__intro">You run your business. We handle the security work: deployment, configuration, monitoring, troubleshooting and ongoing management of your selected services.</p>
      <p class="managed-hero__promise">Specialist security ownership, from the first rollout to the next policy change.</p>
      <div class="managed-actions"><a class="btn btn--primary btn--lg"${ctx.linkAttrs('talk-to-an-expert')} href="${ctx.url('talk-to-an-expert')}">Talk to a Security Expert ${icon('arrowRight')}</a><a class="btn btn--outline-inverse" href="#what-we-handle">See what we handle</a></div></div>
      <aside class="managed-ownership" aria-label="The managed service lifecycle"><p class="managed-ownership__eyebrow">The work stays with us</p><h2>One team.<br>Ongoing ownership.</h2><ol>${join([
        ['Plan', 'Understand your environment and priorities.'], ['Deploy', 'Configure protection and onboard your people.'], ['Operate', 'Manage policies, investigate and troubleshoot.'], ['Improve', 'Review findings and refine your protection.'],
      ].map(([title, body]) => html`<li><span>${icon('check')}</span><div><strong>${title}</strong><p>${body}</p></div></li>`))}</ol><p class="managed-ownership__foot">Technology, operated by people who understand security.</p></aside>
    </div></section>`,
    () => html`<section class="managed-position"><div class="container"><p class="eyebrow">A security discipline</p><h2>Security decisions deserve security expertise.</h2><p>A general IT helpdesk keeps people working. Managed cybersecurity also requires threat investigation, access design, risk judgment and disciplined change control. SecureTrust brings that specialist focus to the services we operate for you.</p></div></section>`,
    (ctx) => html`<div id="what-we-handle">${featureGrid(ctx, {
      eyebrow: 'What we take off your plate', heading: 'The tools are only the beginning.',
      intro: 'Our job is to turn your selected protection into a working, managed service. Here is the day-to-day work behind it.', variant: '3up',
      items: [
        { icon: 'grid', title: 'Deployment & onboarding', body: 'We plan the setup, configure the services and onboard users and devices so your team can get to work.' },
        { icon: 'key', title: 'Access & policy management', body: 'We configure access, web and data policies, then maintain them as people, applications and business needs change.' },
        { icon: 'radar', title: 'Monitoring & investigation', body: 'We review security events from your managed services, investigate the relevant signals and explain what needs attention.' },
        { icon: 'wrench', title: 'Patching & corrective work', body: 'For managed patch services, we coordinate schedules, review deployment status and follow up on exceptions and failures.' },
        { icon: 'users', title: 'Troubleshooting & support', body: 'We work through security issues, diagnose policy and access problems, and coordinate with your IT team and relevant vendors.' },
        { icon: 'chart', title: 'Reporting & guidance', body: 'We explain what happened, what we changed and what needs a decision, with clear recommendations for improving protection.' },
      ],
    })}</div>`,
    (ctx) => html`<section class="section managed-expertise"><div class="container managed-expertise__grid">
      <div class="managed-expertise__portrait"><img src="${ctx.url.asset('img/team/richard-selvidge.jpg')}" alt="Richard Selvidge, President and CEO of SecureTrust Cyber" width="768" height="917" loading="lazy" decoding="async"><p>Richard Selvidge, CISSP, ITIL<br><span>President & CEO, SecureTrust Cyber</span></p></div>
      <div><p class="eyebrow">Experience behind the service</p><h2 class="section__title">Led by a security practitioner.</h2><p class="managed-expertise__intro">Richard Selvidge brings more than 25 years of security experience, including classified research environments, enterprise governance and security leadership.</p><ul class="managed-credentials" role="list">
        <li>${icon('shield')}<span>Senior Cyber Security Engineer at the Air Force Research Laboratory.</span></li>
        <li>${icon('shield')}<span>Classified Information Assurance Manager at the U.S. Army DEVCOM Army Research Laboratory.</span></li>
        <li>${icon('shield')}<span>Information security, governance and compliance leadership at AAA National; Chief Information Security Officer at PurpleSec.</span></li>
        <li>${icon('shield')}<span>CISSP and ITIL certified.</span></li>
      </ul><p>That background informs how we approach your environment: understand the risk, configure deliberately, investigate with context and explain the decisions.</p><a class="managed-text-link" href="${ctx.url('company/about')}">Meet SecureTrust Cyber ${icon('arrowRight')}</a></div>
    </div></section>`,
    () => html`<section class="section"><div class="container"><div class="section-head"><p class="eyebrow">Clear ownership</p><h2 class="section__title">You set priorities. We run the security work.</h2><p class="section__intro">You do not need to learn every console or translate every alert. We bring you the business decisions that need your input and handle the agreed technical work.</p></div>
      <div class="managed-table-wrap" role="region" aria-label="Service responsibilities" tabindex="0"><table class="managed-table"><caption>How we share responsibility for your managed services</caption><thead><tr><th scope="col">The work</th><th scope="col">SecureTrust handles</th><th scope="col">You provide</th></tr></thead><tbody>${join(responsibilities.map(([work, us, customer]) => html`<tr><th scope="row">${work}</th><td>${us}</td><td>${customer}</td></tr>`))}</tbody></table></div>
      <p class="managed-scope">Your service agreement defines the selected capabilities, coverage hours, response commitments and authority to make changes. We agree those responsibilities before onboarding.</p>
    </div></section>`,
    (ctx) => timeline(ctx, { eyebrow: 'From introduction to operation', heading: 'A managed relationship from day one.', steps: [
      { title: 'Understand your business', body: 'We review your environment, existing IT support, priorities and constraints. Together we agree the services and responsibilities.' },
      { title: 'Plan and configure', body: 'We design the rollout, configure the selected controls and coordinate deployment with your team.' },
      { title: 'Put protection to work', body: 'We onboard users and devices, check the setup and explain how to get support or request a change.' },
      { title: 'Operate and improve', body: 'We manage the agreed services, investigate issues and review findings with you as your business evolves.' },
    ] }),
    (ctx) => faq(ctx, { heading: 'What working with us looks like', items: [
      { q: 'Do we have to configure or operate the security platform ourselves?', a: 'SecureTrust handles deployment, policy setup and ongoing operation of the services in your agreement. Your team provides business requirements, necessary access and approvals.' },
      { q: 'Can we keep our existing IT team or MSP?', a: 'Yes. We can work alongside your internal IT team or IT provider. We agree the security responsibilities and escalation path so everyone knows who owns the work.' },
      { q: 'Does every bundle include every security capability?', a: 'Your selected bundle determines the capabilities available. We agree how those services will be managed before onboarding, including any additional scope you need.' },
      { q: 'What monitoring hours and response times are included?', a: 'Coverage hours, escalation arrangements and response commitments are set out in your service agreement. We discuss your needs and confirm the service expectations before you start.' },
      { q: 'Do you make changes without involving us?', a: 'Not without your agreement. We set change authority and escalation rules with you up front. Routine work follows those rules, while business-impacting decisions, exceptions, and maintenance windows are coordinated with your designated contact.' },
    ] }),
  ],
};
