// src/content/posts.data.mjs — blog posts. Bodies are plain strings with inline
// HTML (no backticks or ${), rendered via raw().

export const POSTS = [
  {
    slug: 'blog/patch-management-best-practices',
    title: 'Patch management best practices: close the window before attackers do',
    category: 'Vulnerability Management',
    date: '2026-09-18',
    read: '7 min read',
    author: 'SecureTrust Cyber',
    dek: 'Most breaches exploit vulnerabilities that already had a patch. A disciplined patching cadence is the single highest-leverage control you can adopt.',
    body: `
<p>Nearly every headline breach follows the same script: an attacker exploits a vulnerability for which a patch already existed, often for months. Patch management is unglamorous, but it is the highest-leverage control in most security programs. This guide covers how to do it well.</p>
<h2>Why patching fails</h2>
<p>Patching fails for predictable reasons. Teams do not know what is in their estate, so they cannot patch what they cannot see. Manual patching does not scale past a few hundred devices. And fear of breaking a critical application leads teams to defer, sometimes indefinitely.</p>
<ul>
<li><strong>Invisible assets:</strong> unmanaged devices, shadow IT, and retired systems still on the network.</li>
<li><strong>Manual effort:</strong> ticket-driven patching that relies on someone remembering to run it.</li>
<li><strong>Deferral culture:</strong> postponing updates because "it has been fine so far."</li>
</ul>
<h2>A working cadence</h2>
<p>Establish a regular cycle. Most organizations do well with a monthly security-patch window plus an emergency track for actively exploited vulnerabilities. Separate operating-system updates from third-party application updates, which are the most common entry point.</p>
<h2>Automation is the difference</h2>
<p>The only way to patch thousands of endpoints reliably is to automate discovery, deployment, and verification. A platform that inventories your estate, maps each asset to the patches it needs, and deploys on a schedule removes the human bottleneck that leaves systems exposed.</p>
<p>Prioritize by exploitability, not just severity. A critical CVSS score on an internet-facing service matters more than a high score on an internal-only host. Track your mean time to patch as a metric and hold it steady.</p>
<h2>Measure what matters</h2>
<p>Patch coverage — the percentage of your estate at current patch level — is the metric that tells you whether the program is working. A coverage number in the high nineties means an attacker has to work much harder to find a foothold.</p>`,
  },
  {
    slug: 'blog/nis2-compliance-guide',
    title: 'NIS2 compliance: a practical guide for 2026',
    category: 'Compliance',
    date: '2026-09-05',
    read: '8 min read',
    author: 'SecureTrust Cyber',
    dek: 'NIS2 expands the scope of EU cybersecurity rules to thousands more organizations. Here is what actually changes and how to prepare.',
    body: `
<p>NIS2 is the EU's update to its network and information security directive. It broadens scope, raises accountability for management, and shortens incident-reporting deadlines. For many organizations, it is the first time security stops being an IT-only concern.</p>
<h2>Who is in scope</h2>
<p>NIS2 covers essential and important entities across sectors including energy, transport, health, digital infrastructure, and public administration. The threshold-based definition pulls in many mid-sized businesses that were never regulated before. If in doubt, assume you are in scope and check.</p>
<h2>What it requires</h2>
<p>The directive demands risk-management measures, supply-chain security, and incident reporting within 24 hours of becoming aware of a significant incident, with a fuller report within 72 hours. Management bears direct responsibility and can be held personally liable for negligence.</p>
<ul>
<li>Risk analysis and information-system security policies</li>
<li>Incident handling and business continuity</li>
<li>Supply-chain security and vulnerability handling</li>
<li>Access control and asset management</li>
<li>Encryption and multi-factor authentication where appropriate</li>
</ul>
<h2>How to prepare</h2>
<p>Start with visibility. You cannot demonstrate risk management over assets you cannot enumerate. Map your estate, identify your essential services, and align your controls to a recognized framework such as ISO 27001 or the CIS Controls, which map well to NIS2 expectations.</p>
<p>Then build the reporting muscle. The 24-hour deadline is unforgiving, so your detection and response must produce the information you need to notify within hours, not days.</p>`,
  },
  {
    slug: 'blog/edr-vs-xdr',
    title: 'EDR vs XDR: what is the difference and which do you need?',
    category: 'Detection & Response',
    date: '2026-08-22',
    read: '6 min read',
    author: 'SecureTrust Cyber',
    dek: 'EDR watches endpoints. XDR correlates signal across email, network, identity, and cloud. Understanding the difference shapes your whole detection strategy.',
    body: `
<p>EDR and XDR are often used interchangeably, but they describe different scopes of visibility. Choosing between them is really a decision about how much of your environment you want your detection layer to see.</p>
<h2>EDR: endpoint focus</h2>
<p>Endpoint detection and response puts a sensor on every device, records behavior, and lets you hunt for threats and contain them. It is excellent at catching what lands on a laptop or server. Its blind spot is everything that is not an endpoint.</p>
<h2>XDR: correlated visibility</h2>
<p>Extended detection and response takes the same idea and stretches it across domains — email, network, identity, and cloud — correlating signals into a single timeline. An attacker who phishes a user, then moves laterally, then accesses SaaS apps generates a connected story instead of four disconnected alerts.</p>
<h2>Which do you need?</h2>
<p>If your exposure is mostly a fleet of laptops, strong EDR may be enough. If you run email, cloud apps, and remote access, XDR closes gaps that EDR cannot see. The practical answer for most mid-sized organizations is a platform that starts with EDR and adds cross-domain correlation without a separate tool per domain.</p>
<p>The goal is fewer tools and fewer gaps. A single platform that shares telemetry across email, endpoint, network, and identity is usually cheaper to operate and faster to respond than a best-of-breed stack stitched together.</p>`,
  },
  {
    slug: 'blog/ransomware-protection',
    title: 'Ransomware protection in layers: prevention, detection, recovery',
    category: 'Endpoint Security',
    date: '2026-08-08',
    read: '7 min read',
    author: 'SecureTrust Cyber',
    dek: 'No single control stops ransomware. A layered defense across prevention, detection, and recovery is what actually keeps your data safe.',
    body: `
<p>Ransomware operators have industrialized. They automate initial access, move laterally, and encrypt before defenders can react. Beating them requires layers that fail safely into one another.</p>
<h2>Prevention</h2>
<p>Prevention starts before the ransomware binary ever runs. Patch the vulnerabilities attackers use for initial access. Filter malicious domains and email. Block macros and scripts from untrusted sources. These reduce the number of attempts that ever reach an endpoint.</p>
<h2>Detection</h2>
<p>When prevention fails, detection buys time. Behavioral detection that flags mass file modification is the critical control: ransomware must encrypt thousands of files quickly, and that pattern is detectable. The goal is to interrupt encryption before it completes.</p>
<h2>Recovery</h2>
<p>Assume encryption will sometimes succeed. Immutable, off-network backups that an attacker cannot reach are the difference between an incident and a disaster. Test restores regularly — an untested backup is a hope, not a plan.</p>
<h2>Putting it together</h2>
<p>Patching, DNS filtering, email protection, behavioral endpoint detection, and tested backups form a defense-in-depth chain. Each layer is imperfect, but together they make ransomware expensive, slow, and often futile.</p>`,
  },
  {
    slug: 'blog/zero-trust-architecture',
    title: 'Zero trust architecture: from buzzword to a practical roadmap',
    category: 'Security Strategy',
    date: '2026-07-25',
    read: '7 min read',
    author: 'SecureTrust Cyber',
    dek: 'Zero trust is a principle, not a product. Here is a pragmatic sequence for turning it into real controls.',
    body: `
<p>Zero trust means assuming the network is already compromised and verifying every request as if it originated from the open internet. It is a principle that translates into a handful of concrete controls.</p>
<h2>Identity first</h2>
<p>Every zero-trust program starts with identity. Strong, phishing-resistant authentication and least-privilege access are the foundation. If you can only do one thing, tighten privileged access: it is where the damage is done.</p>
<h2>Verify devices</h2>
<p>Knowing who is connecting is not enough; you must know what device they are using and whether it is healthy. Device trust — patched, encrypted, managed — gates access before credentials alone are trusted.</p>
<h2>Segment and monitor</h2>
<p>Micro-segmentation limits lateral movement, and continuous monitoring ensures that trust granted today can be revoked tomorrow. Assume breach and instrument accordingly.</p>
<h2>A practical sequence</h2>
<ul>
<li>Inventory users, devices, and assets.</li>
<li>Enforce multi-factor authentication everywhere.</li>
<li>Move privileged access to least privilege with audit.</li>
<li>Require device health before granting access.</li>
<li>Segment critical systems and monitor continuously.</li>
</ul>`,
  },
  {
    slug: 'blog/phishing-prevention',
    title: 'Phishing prevention: why email is still the front door',
    category: 'Email Security',
    date: '2026-07-10',
    read: '5 min read',
    author: 'SecureTrust Cyber',
    dek: 'Email remains the most common initial access vector. Here is how to close the front door without grinding your team to a halt.',
    body: `
<p>Email is still the most common way attackers get in. A single convincing message can defeat a thousand other controls. Closing the front door is a matter of layered filtering plus a resilient human layer.</p>
<h2>Filter what you can</h2>
<p>The first layer is technical: block known-bad domains and messages with malicious attachments, and flag impersonation. Gateways that inspect links at click time and scan attachments in a sandbox catch most commodity phishing before it reaches a human.</p>
<h2>Focus on impersonation</h2>
<p>The most damaging attacks are not mass spam but targeted impersonation — a fake invoice, a spoofed executive, a lookalike domain. These need identity-aware controls that verify sender reputation and flag unusual senders, not just content scanning.</p>
<h2>Prepare the human layer</h2>
<p>People are the last line, not the first. Short, frequent awareness exercises that simulate real tactics keep the human layer sharp. But the goal is to reduce reliance on people, not to blame them when a well-crafted message gets through.</p>
<p>The combination — strong filtering, impersonation protection, and a prepared team — makes your organization a hard target where attackers move on to easier ones.</p>`,
  },
];
