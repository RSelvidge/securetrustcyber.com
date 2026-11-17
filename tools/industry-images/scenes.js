// scenes.js — one function per industry threat image. Each builds onto S.scene and sets the camera.
import { THREE, COL, V, at, platform, building, device, lock, shield, warn, ringGate, wall, arc, globe, pylon, envelope, hook, doc, flask, cloud, database, packageBox, card, bag, cart, gear, bars, node, line3, dome, sparks, glowLight } from './kit.js';

// camera: pulled 20% closer than the given position and aimed slightly higher, so the subject fills the 16:9 card
const std = (S, look = V(0, 1.7, 0), pos = V(8.4, 4.6, 12.6)) => { const l = look.clone().add(V(0, .35, 0)); S.view(l.clone().lerp(pos, .8), l); };

export const SCENES = {
  /* ================= EDUCATION ================= */
  // Ransomware on schools: the school is locked by ransomware; an IPS shield stops the next payload at the gate.
  'education-ransomware'(S) {
    const s = S.scene; s.add(platform(6.2));
    s.add(at(building({ w: 4.2, d: 2.4, h: 2, roof: 'gable', cols: 8, rows: 3, red: [2, 3, 10, 11, 12, 13], clock: true, flag: true }), -.8, 0, -.6));
    s.add(at(lock(COL.red, 1), -.8, 3.35, .5));
    s.add(at(device('laptop', { screen: 'red' }), .9, 0, 1.6, -.4, .9));
    s.add(arc(V(5.8, 2.2, -1.2), V(3.5, 1.7, 1.4), { c: COL.red, lift: 1.2, packets: 3 }));
    s.add(at(shield(COL.blue, 1.05), 3.1, 1.7, 1.8, -.55));
    s.add(sparks(V(3.3, 1.7, 1.7), 45, COL.red, 1));
    glowLight(s, COL.red, V(-.8, 3.4, 1.5), 8); glowLight(s, COL.blue, V(3.6, 2, 3.4), 6);
    std(S, V(.9, 1.8, .3));
  },
  // BYOD sprawl: dozens of unmanaged phones, tablets and laptops stream toward a Zero Trust ring; one unverified device is held back.
  'education-byod'(S) {
    const s = S.scene; s.add(platform(6.5));
    const gate = at(ringGate(1.5), 1.6, 2, .2, -Math.PI / 2 + .75); s.add(gate);
    const kinds = ['phone', 'tablet', 'laptop', 'phone', 'phone', 'tablet', 'laptop', 'phone', 'tablet', 'phone', 'laptop', 'phone'];
    kinds.forEach((k, i) => {
      const x = -4.6 + (i % 4) * 1.15 + (i % 2) * .2, z = -2.2 + Math.floor(i / 4) * 1.9, bad = i === 6;
      s.add(at(device(k, { screen: bad ? 'red' : 'login' }), x, 0, z, .5 + (i % 3) * .1, k === 'laptop' ? .65 : .8));
      if (!bad && i % 2 === 0) s.add(arc(V(x + .2, k === 'laptop' ? .7 : .9, z), V(1.6, 2, .2), { lift: 1.2, packets: 2, r: .02 }));
      if (bad) s.add(at(warn(.5), x, 1.6, z));
    });
    s.add(arc(V(1.9, 2, .1), V(4.8, .8, -1.6), { lift: 1, packets: 3 }));
    s.add(at(building({ w: 1.8, d: 1.4, h: 1.5, roof: 'flat', cols: 4, rows: 3 }), 4.8, 0, -1.8));
    glowLight(s, COL.blue, V(1.6, 2.6, 1.5), 7);
    std(S, V(.7, 1.5, 0), V(5.7, 5.2, 13.5));
  },
  // Research theft: lab research and data sit in a vault; a red exfiltration arc is cut off by a DLP shield.
  'education-research'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(flask(), -2.6, 0, .6, 0, 1.3)); s.add(at(flask(COL.green), -1.7, 0, 1.3, 0, .95));
    s.add(at(database(COL.panel, .9), -2.3, 0, -1.4));
    s.add(at(doc(), -.5, 0, -.3, .2, 1.1)); s.add(at(doc(), -.1, 0, .1, .1, 1.1));
    s.add(at(ringGate(1.25, COL.blue), -1.2, 1.4, -.3, 0, 1).rotateY(0));
    const a = arc(V(-.3, 1.6, 0), V(4.2, 2.6, -1), { c: COL.red, lift: 1.6, packets: 3 }); s.add(a);
    s.add(at(shield(COL.blue, 1.15), 1.8, 2.4, .4, -.7));
    s.add(sparks(V(1.6, 2.4, .3), 50, COL.red, .9));
    s.add(at(globe(.8, COL.red), 4.2, 2.5, -1.2));
    glowLight(s, COL.blue, V(1.8, 2.6, 1.6), 7); glowLight(s, COL.red, V(4.6, 2.6, 0), 5);
    std(S, V(.5, 1.4, 0));
  },

  /* ================= MANUFACTURING ================= */
  // OT/IT convergence: office IT and the plant floor are now networked; a FWaaS segmentation wall sits between them.
  'manufacturing-otit'(S) {
    const s = S.scene; s.add(platform(6.4));
    s.add(at(building({ w: 3.2, d: 2.2, h: 1.6, roof: 'sawtooth', cols: 6, rows: 2, chimney: 2 }), -2.9, 0, -1.6));
    s.add(at(device('robot'), -3.6, 0, 1.2, .3)); s.add(at(device('plc'), -2, 0, 1.4, .2, .9));
    s.add(at(wall(5.2, 2), .6, 0, .2, Math.PI / 2 - .25));
    s.add(at(device('monitor'), 2.4, 0, -.6, -.4, .9)); s.add(at(device('laptop'), 2.8, 0, 1.3, -.5, .9)); s.add(at(device('server'), 3.8, 0, -1.6, -.4, .9));
    s.add(arc(V(2.4, 1.2, -.4), V(.7, 1.6, .2), { c: COL.red, lift: .6, packets: 2 }));
    s.add(at(shield(COL.blue, .95), .65, 2.65, .25, Math.PI / 2 - .35));
    s.add(sparks(V(.7, 1.6, .25), 35, COL.red, .7));
    glowLight(s, COL.blue, V(.8, 2.4, 1.8), 7);
    std(S, V(0, 1.4, 0));
  },
  // Ransomware downtime: the production line is encrypted and stopped; IPS blocks the payload before it spreads to the next line.
  'manufacturing-ransomware'(S) {
    const s = S.scene; s.add(platform(6.2));
    for (let i = 0; i < 2; i++) { // two conveyor lines
      const z = -1 + i * 2.2, red = i === 0;
      const belt = new THREE.Mesh(new THREE.BoxGeometry(6, .18, .9), new THREE.MeshStandardMaterial({ color: red ? 0x3a1236 : 0x12267a, metalness: .4, roughness: .5, emissive: red ? COL.red : COL.blue, emissiveIntensity: .25 })); belt.position.set(-.6, .45, z); s.add(belt);
      for (let k = 0; k < 5; k++) s.add(at(packageBox(red ? 0x3a1236 : COL.panel, red ? COL.red : COL.glow, .42), -3.2 + k * 1.3, .54, z));
      s.add(at(device('robot', { screen: red ? 'red' : 'ui' }), 1.8, 0, z - .8, -.4, .75));
    }
    s.add(at(lock(COL.red, .95), -.8, 1.6, -1));
    s.add(arc(V(5.6, 2.4, 2.4), V(3.3, 1.5, 1.4), { c: COL.red, lift: 1, packets: 3 }));
    s.add(at(shield(COL.blue, 1), 3.2, 1.55, 1.5, -.6)); s.add(sparks(V(3.35, 1.55, 1.45), 40, COL.red, .9));
    glowLight(s, COL.red, V(-.8, 2.2, 0), 7); glowLight(s, COL.blue, V(3.2, 2.2, 2.6), 6);
    std(S, V(.3, 1.2, .3));
  },
  // Unpatched industrial systems: a legacy controller that cannot be patched is isolated inside its own protected segment.
  'manufacturing-legacy'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(device('plc', { screen: 'red' }), -.2, 0, 0, .3, 1.2)); s.add(at(warn(.55), -.2, 2.55, .2));
    s.add(at(gear(COL.amber, .55), .9, 1.1, .4, -.3)); s.add(at(gear(0x6a7fb0, .4), 1.25, .55, .5, .4));
    s.add(at(ringGate(2.1, COL.blue), .2, .02, 0, 0).rotateX(-Math.PI / 2));
    const d = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 2.6, 64, 1, true), new THREE.MeshBasicMaterial({ color: COL.blue, transparent: true, opacity: .09, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); d.position.set(.2, 1.3, 0); s.add(d);
    s.add(at(device('monitor'), 3.9, 0, -1.3, -.6, .8)); s.add(at(device('server'), -3.8, 0, -1.4, .5, .8));
    s.add(arc(V(3.6, 1.1, -1), V(1.9, 1.3, -.4), { c: COL.red, lift: .8, packets: 2 })); s.add(sparks(V(2, 1.3, -.4), 30, COL.red, .6));
    s.add(arc(V(-3.6, .9, -1.2), V(-2.2, 1.1, -.4), { lift: .5, packets: 2 }));
    glowLight(s, COL.blue, V(.2, 2.8, 2), 7); glowLight(s, COL.red, V(-.2, 1.6, 1), 4);
    std(S, V(.2, 1.2, 0));
  },

  /* ================= ENERGY & UTILITIES ================= */
  // Nation-state attacks: red attack arcs from across the globe converge on the grid; SIEM monitoring catches them.
  'energy-nationstate'(S) {
    const s = S.scene; s.add(platform(6.2));
    s.add(at(globe(1.3, COL.red), -4.2, 3, -3.4));
    [[-1, 0, .6], [1, 0, -.4], [3, 0, .5]].forEach(([x, y, z]) => s.add(at(pylon(2.8), x, y, z, .2)));
    for (let i = 0; i < 3; i++) s.add(line3(V(-1 + i * 2 - 1.05, 1.82 + (i === 1 ? -.08 : 0), .6 - i * .5), V(1 + i * 2 - 1.05, 1.82, -.4 + i * .45), COL.glow, .6, .015));
    [[-3.4, 3.4, -3], [-3.6, 2.4, -2.8], [-3, 3, -2.4]].forEach(([x, y, z], i) => s.add(arc(V(x, y, z), V(-1 + i * 1.6, 2.4, .3 - i * .3), { c: COL.red, lift: 1.4 - i * .3, packets: 2 })));
    s.add(at(device('monitor', { screen: 'chart' }), 3.4, 0, 2.3, -.6, .95));
    s.add(at(shield(COL.blue, .9), 1.1, 3.6, .6, -.5)); s.add(sparks(V(.6, 3, .4), 50, COL.red, 1.2));
    glowLight(s, COL.red, V(-3.2, 2.6, -1), 7); glowLight(s, COL.blue, V(1.4, 3.4, 2), 6);
    std(S, V(0, 1.8, 0));
  },
  // Legacy SCADA: an aging SCADA control room kept inside a segmented zone with controlled access.
  'energy-scada'(S) {
    const s = S.scene; s.add(platform(6.2));
    for (let i = 0; i < 3; i++) s.add(at(device('monitor', { screen: i === 1 ? 'chart' : 'ui' }), -1.4 + i * 1.5, .5, -.6, 0, .85));
    const desk = new THREE.Mesh(new THREE.BoxGeometry(4.6, .5, 1.2), new THREE.MeshStandardMaterial({ color: 0x12267a, metalness: .4, roughness: .5 })); desk.position.set(.1, .25, -.4); s.add(desk);
    s.add(at(device('plc'), -3.4, 0, -1.4, .4, .85)); s.add(at(device('plc'), 3.5, 0, -1.4, -.4, .85));
    s.add(at(wall(7, 2.3), .1, 0, 1.2)); s.add(at(ringGate(.8, COL.blue), .1, 1.15, 1.25, 0));
    s.add(arc(V(.1, 1.15, 4), V(.1, 1.15, 1.4), { lift: .3, packets: 2 }));
    s.add(arc(V(-3.6, 1.6, 4.2), V(-2.4, 1.4, 1.3), { c: COL.red, lift: .6, packets: 2 })); s.add(sparks(V(-2.4, 1.4, 1.3), 30, COL.red, .6));
    glowLight(s, COL.blue, V(.1, 2.4, 2.6), 7);
    std(S, V(0, 1.2, .2), V(6, 4.4, 13.4));
  },
  // Supply-chain compromise: vendor connections into the utility pass one at a time through a Zero Trust ring; a compromised vendor is refused.
  'energy-supplychain'(S) {
    const s = S.scene; s.add(platform(6.4));
    s.add(at(pylon(2.6), 3.6, 0, -1.4, .2)); s.add(at(device('plc'), 2.5, 0, .9, -.4, .85)); s.add(at(device('server'), 4.4, 0, .7, -.4, .8));
    s.add(at(ringGate(1.3), .3, 1.6, 0, Math.PI / 2 - .55));
    [[-3.8, -1.6, false], [-4.2, .4, false], [-3.4, 2.2, true]].forEach(([x, z, bad]) => {
      s.add(at(packageBox(bad ? 0x3a1236 : COL.panel, bad ? COL.red : COL.glow, .7), x, 0, z, .3));
      s.add(arc(V(x + .4, .8, z), V(bad ? -1.2 : .3, bad ? 1.4 : 1.6, bad ? 1 : 0), { c: bad ? COL.red : COL.glow, lift: 1, packets: 2 }));
      if (bad) s.add(at(warn(.45), x, 1.35, z));
    });
    s.add(at(shield(COL.blue, .75), -1, 1.5, 1.1, -.4)); s.add(sparks(V(-1.15, 1.4, 1), 30, COL.red, .6));
    s.add(arc(V(.4, 1.6, 0), V(2.5, 1.3, .9), { lift: .6, packets: 2 }));
    glowLight(s, COL.blue, V(.3, 2.6, 2), 7);
    std(S, V(0, 1.2, .2));
  },

  /* ================= GOVERNMENT ================= */
  // Citizen data at risk: public records held in a civic building; DLP stops a records leak.
  'government-citizendata'(S) {
    const s = S.scene; s.add(platform(6.2));
    s.add(at(building({ w: 3.6, d: 1.8, h: 1.8, roof: 'columns', cols: 6, rows: 2 }), -1.4, 0, -1));
    s.add(at(database(COL.panel, .75), 1.8, 0, -1.2));
    [0, 1, 2].forEach((i) => s.add(at(doc(), 1 + i * .45, 0, .9 + i * .2, -.3, .9)));
    s.add(arc(V(2, 1, 1.2), V(5.4, 2.2, 2.4), { c: COL.red, lift: 1.2, packets: 3 }));
    s.add(at(shield(COL.blue, .95), 3.3, 2.2, 1.9, -.6)); s.add(sparks(V(3.3, 2.1, 1.9), 40, COL.red, .8));
    glowLight(s, COL.blue, V(3, 2.6, 3), 6);
    std(S, V(.4, 1.5, 0));
  },
  // Legacy systems: old government server racks contained inside a segmented zone.
  'government-legacy'(S) {
    const s = S.scene; s.add(platform(6.2));
    [-1.2, 0, 1.2].forEach((x, i) => s.add(at(device('rack', { screen: i === 1 ? 'red' : 'ui' }), x, 0, -.3, 0, .9)));
    s.add(at(warn(.5), 0, 2.75, -.1));
    s.add(at(ringGate(2.4, COL.blue), 0, .02, -.3).rotateX(-Math.PI / 2));
    const d = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 2.9, 64, 1, true), new THREE.MeshBasicMaterial({ color: COL.blue, transparent: true, opacity: .08, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); d.position.set(0, 1.45, -.3); s.add(d);
    s.add(at(building({ w: 1.8, d: 1.2, h: 1.3, roof: 'columns', cols: 4, rows: 2 }), 4.2, 0, -1.4, -.4, .9));
    s.add(arc(V(.4, 2, -.2), V(4, 1.2, -1), { lift: .8, packets: 2 }));
    s.add(arc(V(-4.6, 1, 1.6), V(-2.4, 1.3, .4), { c: COL.red, lift: .8, packets: 2 })); s.add(sparks(V(-2.45, 1.3, .35), 30, COL.red, .6));
    glowLight(s, COL.blue, V(0, 3, 2.4), 7);
    std(S, V(.2, 1.3, 0));
  },
  // Phishing at scale: a wave of phishing emails with hooks is blocked by DNS Security and the Secure Web Gateway before reaching staff.
  'government-phishing'(S) {
    const s = S.scene; s.add(platform(6.2));
    for (let i = 0; i < 9; i++) { const x = -4.4 + (i % 3) * .95, y = 1 + Math.floor(i / 3) * .85, z = -1.4 + (i % 3) * .5;
      s.add(at(envelope(i % 4 === 1 ? 0x3a1236 : COL.panel, i % 4 === 1 ? COL.red : COL.glow), x, y, z, .5, 1.05)); }
    s.add(at(hook(), -2.4, .9, .5, 0, .8));
    s.add(at(wall(4.2, 2.6), -.5, 0, .2, Math.PI / 2 - .3)); s.add(at(shield(COL.blue, 1.05), -.45, 3, .2, Math.PI / 2 - .4));
    s.add(sparks(V(-.6, 1.6, .2), 50, COL.red, 1));
    s.add(at(building({ w: 2.6, d: 1.6, h: 1.6, roof: 'columns', cols: 5, rows: 2 }), 2.8, 0, -.4, -.4, .95));
    s.add(at(device('laptop'), 2.3, 0, 1.9, -.6, .8));
    glowLight(s, COL.blue, V(-.3, 2.8, 2.4), 7); glowLight(s, COL.red, V(-3.4, 2.4, .4), 5);
    std(S, V(-.2, 1.5, 0));
  },

  /* ================= RETAIL ================= */
  // Payment data theft: card data from the point-of-sale terminal is kept in a protected segment; DLP stops it leaving.
  'retail-payments'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(device('pos', { screen: 'login' }), -1, 0, .2, .3, 1.9));
    const c = at(card(), .5, 1.6, 1, -.3, 1.3); c.rotation.x = -.3; s.add(c);
    s.add(at(ringGate(1.9, COL.blue), -.6, .02, .3).rotateX(-Math.PI / 2));
    s.add(arc(V(.4, 1.4, .6), V(4.6, 2.6, 1.6), { c: COL.red, lift: 1.3, packets: 3 }));
    s.add(at(shield(COL.blue, .95), 2.4, 2.4, 1.2, -.6)); s.add(sparks(V(2.3, 2.3, 1.2), 40, COL.red, .8));
    s.add(at(building({ w: 2.8, d: 1.6, h: 1.5, roof: 'flat', cols: 6, rows: 2 }), -2.4, 0, -2.4, .2, .9));
    glowLight(s, COL.blue, V(1.8, 2.6, 2.6), 6);
    std(S, V(.6, 1.5, .4), V(7, 4.2, 10.6));
  },
  // Seasonal spikes: holiday traffic surges; the cloud firewall scales with it so defenses stay on.
  'retail-seasonal'(S) {
    const s = S.scene; s.add(platform(6.2));
    const b = at(bars([.5, .7, .6, .9, .8, 1.1, 2.6, 3.1, 1.2], { spike: 7 }), -3.8, 0, -1.2, .25); s.add(b);
    [[-2.6, 1.4], [-1.6, 2], [-3.4, 2.2]].forEach(([x, z], i) => s.add(at(i === 1 ? cart() : bag(), x, 0, z, .3, .9)));
    [0, 1, 2].forEach((i) => s.add(at(ringGate(1 + i * .1, COL.blue), 1.6 + i * .2, 1.4 + i * .05, -.2 - i * .9, -Math.PI / 2 + .6, 1)));
    s.add(arc(V(-1.4, 1.2, 1.6), V(1.6, 1.4, -.2), { lift: 1, packets: 4 })); s.add(arc(V(-2.4, 1.6, .4), V(1.8, 1.5, -1.1), { lift: 1.3, packets: 4 }));
    s.add(at(cloud(COL.panel, COL.glow, .9), 3.6, 2.6, -1.6));
    s.add(at(shield(COL.blue, .8), 2.3, 3.1, .3, -.6));
    glowLight(s, COL.blue, V(1.6, 2.6, 1.8), 7); glowLight(s, COL.amber, V(-1, 3, -.6), 4);
    std(S, V(0, 1.4, 0));
  },
  // E-commerce fraud: an online store's checkout; Zero Trust stops an account-takeover login from a fraudster.
  'retail-ecommerce'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(device('monitor', { screen: 'login' }), .4, 0, -.4, -.2, 1.5));
    s.add(at(cart(), -1.6, 0, .9, .4, 1)); s.add(at(bag(), 2.2, 0, .9, -.3, .9));
    s.add(at(ringGate(.9, COL.blue), -2.6, 1.6, .2, Math.PI / 2 - .2));
    s.add(arc(V(-5.6, 2.4, 1.2), V(-2.9, 1.6, .3), { c: COL.red, lift: .8, packets: 2 })); s.add(at(warn(.45), -5, 3.1, 1.2));
    s.add(sparks(V(-2.8, 1.6, .3), 40, COL.red, .7));
    s.add(arc(V(3.8, 1.3, 1.4), V(1.6, 1.4, -.2), { lift: .9, packets: 3 }));
    s.add(at(device('phone', { screen: 'login' }), 3.8, 0, 1.4, -.5, .9));
    glowLight(s, COL.blue, V(-2.4, 2.4, 1.8), 6);
    std(S, V(-.2, 1.4, .2));
  },

  /* ================= TECHNOLOGY ================= */
  // Supply-chain attacks: a chain of software dependencies with one poisoned package caught by cloud governance and monitoring.
  'technology-supplychain'(S) {
    const s = S.scene; s.add(platform(6.2));
    const pts = [[-4, -1.2], [-2.6, -.2], [-1.2, -1], [.2, 0], [1.6, -.8], [3, .2]];
    pts.forEach(([x, z], i) => { const bad = i === 3; s.add(at(packageBox(bad ? 0x3a1236 : COL.panel, bad ? COL.red : COL.glow, .95), x, 0, z, .3));
      if (i) s.add(line3(V(pts[i - 1][0], .5, pts[i - 1][1]), V(x, .5, z), bad || i === 4 ? COL.red : COL.glow, .7, .03));
      if (bad) s.add(at(warn(.5), x, 1.6, z)); });
    s.add(at(ringGate(1.1, COL.blue), .2, 2.6, .1, -.4)); s.add(sparks(V(.2, 1, .1), 40, COL.red, .8));
    s.add(at(cloud(COL.panel, COL.glow, .8), 3.4, 2.6, -2));
    s.add(at(device('laptop', { screen: 'chart' }), 3.6, 0, 2, -.5, .85));
    glowLight(s, COL.blue, V(.2, 3, 2), 6); glowLight(s, COL.red, V(.2, 1.2, 1.4), 4);
    std(S, V(0, 1.2, 0));
  },
  // Cloud sprawl: many unmanaged cloud services; CASB brings them into view and flags the risky one.
  'technology-cloudsprawl'(S) {
    const s = S.scene; s.add(platform(6.2));
    [[-3.2, 2.4, -1.6, 0], [-1.2, 3.2, -2, 0], [1.4, 3, -1.8, 0], [3.4, 2.2, -1.2, 1], [-2.6, 1.3, 1, 0], [2.4, 1.4, 1.4, 0]].forEach(([x, y, z, bad]) =>
      s.add(at(cloud(bad ? 0x3a1236 : COL.panel, bad ? COL.red : COL.glow, .65), x, y, z)));
    s.add(at(warn(.4), 3.4, 3.1, -1.1));
    s.add(at(ringGate(1.1, COL.blue), 0, 1.4, .4, 0));
    [[-3.2, 2.4, -1.6], [-1.2, 3.2, -2], [1.4, 3, -1.8], [-2.6, 1.3, 1], [2.4, 1.4, 1.4]].forEach(([x, y, z]) => s.add(line3(V(x, y, z), V(0, 1.4, .5), COL.glow, .35, .015)));
    s.add(line3(V(3.4, 2.2, -1.2), V(.9, 1.6, .4), COL.red, .6, .02));
    s.add(at(device('laptop'), .2, 0, 2.3, -.2, .8));
    glowLight(s, COL.blue, V(0, 2.2, 2.4), 7);
    std(S, V(0, 1.8, 0));
  },
  // Customer data: a SaaS product's customer database protected by DLP and access control.
  'technology-customerdata'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(database(COL.panel, 1.1), -.6, 0, -.2)); s.add(at(dome(1.9, COL.blue), -.6, 0, -.2));
    [[-3.6, 1.6], [-3.9, -.4], [-3, -1.9]].forEach(([x, z]) => { s.add(at(device('laptop', { screen: 'login' }), x, 0, z, .7, .6)); s.add(arc(V(x + .3, .7, z), V(-1.6, 1.2, -.2), { lift: .7, packets: 2, r: .02 })); });
    s.add(arc(V(.4, 1.6, -.1), V(4.8, 2.4, 1.2), { c: COL.red, lift: 1.1, packets: 3 }));
    s.add(at(shield(COL.blue, .9), 1.9, 2.3, .4, -.6)); s.add(sparks(V(1.6, 2, .3), 40, COL.red, .8));
    glowLight(s, COL.blue, V(-.6, 2.6, 2), 7);
    std(S, V(0, 1.3, 0));
  },

  /* ================= CRITICAL INFRASTRUCTURE ================= */
  // Nation-state campaigns: persistent probes from abroad against a water/power facility, detected and monitored.
  'critical-nationstate'(S) {
    const s = S.scene; s.add(platform(6.2));
    s.add(at(globe(1.25, COL.red), 3, 2.8, -3));
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1.6, 40), new THREE.MeshStandardMaterial({ color: 0x12267a, metalness: .4, roughness: .5 })); tank.position.set(-1.6, .8, -.6); s.add(tank);
    const dome2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x1a2f8f, metalness: .4, roughness: .5 })); dome2.position.set(-1.6, 1.6, -.6); s.add(dome2);
    s.add(at(building({ w: 2.2, d: 1.4, h: 1.2, roof: 'sawtooth', cols: 5, rows: 2, chimney: 1 }), .6, 0, .6, -.2, .9));
    s.add(at(pylon(2.4), -3.6, 0, .8, .3));
    [[2.6, 3.4, -2.4], [2.3, 2.4, -2.2], [2.8, 2.9, -1.9]].forEach(([x, y, z], i) => s.add(arc(V(x, y, z), V(-1 + i, 2.2 - i * .2, -.2 + i * .3), { c: COL.red, lift: 1.4, packets: 2 })));
    s.add(at(shield(COL.blue, .9), -.2, 3.3, -.2, -.3)); s.add(sparks(V(.2, 2.6, -.1), 50, COL.red, 1.1));
    s.add(at(device('monitor', { screen: 'chart' }), -3.4, 0, 2.4, .5, .8));
    glowLight(s, COL.red, V(2.8, 2.6, -.6), 6); glowLight(s, COL.blue, V(-.2, 3.2, 1.8), 6);
    std(S, V(0, 1.6, 0));
  },
  // Cascading failures: one compromised node; microsegmentation walls stop the failure from rippling to the rest.
  'critical-cascading'(S) {
    const s = S.scene; s.add(platform(6.2));
    const P = [[-3.4, -1.2], [-3.2, 1.2], [-1.4, 0], [.6, -1.4], [.8, 1.2], [2.8, -.2], [3.8, 1.6], [4, -1.8]];
    const E = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [5, 7]];
    E.forEach(([a, b]) => { const red = (a <= 2 && b <= 2); s.add(line3(V(P[a][0], .7, P[a][1]), V(P[b][0], .7, P[b][1]), red ? COL.red : COL.glow, .6, .025)); });
    P.forEach(([x, z], i) => s.add(at(node(i <= 2 ? (i === 2 ? COL.red : 0xff8a95) : COL.glow, i === 2 ? .38 : .26), x, .7, z)));
    s.add(at(wall(3.6, 1.8), -.35, 0, -.1, Math.PI / 2 - .1));
    s.add(sparks(V(-.5, .8, 0), 45, COL.red, .9));
    s.add(at(shield(COL.blue, .8), -.35, 2.6, -.1, Math.PI / 2 - .3));
    glowLight(s, COL.red, V(-2.4, 1.6, .6), 6); glowLight(s, COL.blue, V(1.8, 2.2, 1.6), 6);
    std(S, V(.2, 1, 0));
  },
  // Legacy OT: aging pumps and valves that outlive security support, compensated by segmentation and access control.
  'critical-legacyot'(S) {
    const s = S.scene; s.add(platform(6.2));
    const pipeM = new THREE.MeshStandardMaterial({ color: 0x1d3496, metalness: .5, roughness: .4 });
    [[-3.2, .6, 0, 4.4], [1.6, .6, 0, 3.2]].forEach(([x, y, z, len]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(.22, .22, len, 20), pipeM); p.rotation.z = Math.PI / 2; p.position.set(x + len / 2 - 2.2, y, z); s.add(p); });
    const pump = new THREE.Mesh(new THREE.CylinderGeometry(.7, .7, 1.2, 32), pipeM); pump.position.set(-.6, .6, 0); s.add(pump);
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(.35, .05, 8, 32), new THREE.MeshStandardMaterial({ color: COL.red, emissive: COL.red, emissiveIntensity: .6 })); wheel.position.set(-.6, 1.6, 0); wheel.rotation.x = Math.PI / 2; s.add(wheel);
    s.add(at(device('plc', { screen: 'red' }), -2.4, 0, -1.4, .3, .85)); s.add(at(warn(.45), -2.4, 1.9, -1.2));
    s.add(at(ringGate(2.6, COL.blue), -1, .02, -.3).rotateX(-Math.PI / 2));
    const d = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 2.6, 64, 1, true), new THREE.MeshBasicMaterial({ color: COL.blue, transparent: true, opacity: .07, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); d.position.set(-1, 1.3, -.3); s.add(d);
    s.add(at(ringGate(.6, COL.blue), 2.3, 1.2, 1.2, -.6)); s.add(at(device('laptop'), 4, 0, 2, -.6, .8)); s.add(arc(V(3.8, .8, 2), V(2.4, 1.2, 1.2), { lift: .5, packets: 2 }));
    glowLight(s, COL.blue, V(-1, 3, 2.4), 7);
    std(S, V(-.2, 1.1, 0));
  },

  /* ================= SMB ================= */
  // Ransomware: a small business office hit with ransomware; inline prevention stops the payload instead of recovering after.
  'smb-ransomware'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(building({ w: 2.8, d: 2, h: 1.6, roof: 'flat', cols: 5, rows: 2, red: [1, 2] }), -1.4, 0, -.8));
    const awn = new THREE.Mesh(new THREE.BoxGeometry(2.9, .08, .6), new THREE.MeshStandardMaterial({ color: COL.blue, emissive: COL.blue, emissiveIntensity: .4 })); awn.position.set(-1.4, 1.1, .5); awn.rotation.x = .3; s.add(awn);
    s.add(at(device('laptop', { screen: 'red' }), .6, 0, 1.3, -.4, .9)); s.add(at(lock(COL.red, .8), -1.4, 2.6, 0));
    s.add(arc(V(5.4, 2.4, -.4), V(2.6, 1.6, 1.4), { c: COL.red, lift: 1, packets: 3 }));
    s.add(at(shield(COL.blue, 1), 2.4, 1.6, 1.6, -.6)); s.add(sparks(V(2.5, 1.6, 1.5), 40, COL.red, .9));
    glowLight(s, COL.red, V(-1.4, 2.4, 1), 6); glowLight(s, COL.blue, V(2.4, 2.2, 2.8), 6);
    std(S, V(.4, 1.3, .2));
  },
  // Phishing and malicious sites: a convincing phishing email and a malicious site are blocked by DNS Security and the Secure Web Gateway.
  'smb-phishing'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(envelope(0x3a1236, COL.red), -3.4, 1.6, -.6, .4, 1.4)); s.add(at(hook(), -3.6, 1.1, -.2, 0, .8));
    s.add(at(device('monitor', { screen: 'red' }), -2.6, 0, 1.6, .4, .9));
    s.add(at(wall(4, 2.4), -1, 0, .3, Math.PI / 2 - .3)); s.add(at(shield(COL.blue, 1), -.95, 2.8, .3, Math.PI / 2 - .4));
    s.add(arc(V(-3.2, 1.6, -.5), V(-1.1, 1.6, .2), { c: COL.red, lift: .5, packets: 2 })); s.add(sparks(V(-1.15, 1.6, .25), 45, COL.red, .8));
    s.add(at(device('laptop'), 2, 0, .4, -.4, 1)); s.add(at(device('phone'), 3.4, 0, 1.4, -.5, .9));
    glowLight(s, COL.blue, V(-.8, 2.6, 2.4), 7);
    std(S, V(-.3, 1.4, .1));
  },
  // No security team: a small office with nobody watching security; automated, cloud-managed protection keeps it covered.
  'smb-noteam'(S) {
    const s = S.scene; s.add(platform(6));
    s.add(at(building({ w: 2.8, d: 2, h: 1.6, roof: 'flat', cols: 5, rows: 2 }), -.4, 0, -.4));
    s.add(at(dome(2.6, COL.blue), -.4, 0, -.2));
    [[-1.6, 3, .4, .6], [.9, 3.2, -.2, .5], [-.2, 3.5, -1, .4]].forEach(([x, y, z, sc]) => s.add(at(gear(COL.glow, sc), x, y, z, .3)));
    s.add(at(cloud(COL.panel, COL.glow, .9), 3.4, 3, -1.6)); s.add(arc(V(3.4, 2.8, -1.4), V(.6, 2.6, -.4), { lift: .6, packets: 3 }));
    s.add(at(device('laptop'), 1.4, 0, 1.8, -.4, .8));
    s.add(arc(V(-5.2, 2.4, 1.6), V(-2.7, 1.6, .9), { c: COL.red, lift: .8, packets: 2 })); s.add(sparks(V(-2.75, 1.6, .9), 35, COL.red, .7));
    glowLight(s, COL.blue, V(-.4, 3, 2.2), 7);
    std(S, V(.2, 1.6, 0));
  },
};
