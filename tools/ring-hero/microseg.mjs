// microseg.mjs — FWaaS page microsegmentation scene (bundled into assets/js/ring-hero.js; run `npm run build` here).
// A practice split into five segments; every device has its own tunnel to the SecureTrust policy engine.
// Permitted traffic flows through the engine; a compromised front-desk PC tries to move laterally, each attempt
// is blocked at the engine, then the PC is restricted until remediated. Markup: src/components/microsegmentation.mjs.
import {
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, CanvasTexture, SRGBColorSpace,
  MeshStandardMaterial, MeshBasicMaterial, LineBasicMaterial, LineDashedMaterial, PointsMaterial, ShaderMaterial,
  Shape, ExtrudeGeometry, EdgesGeometry, PlaneGeometry, BoxGeometry, TorusGeometry, CylinderGeometry, CircleGeometry,
  SphereGeometry, BufferGeometry, BufferAttribute, Group, Mesh, LineSegments, Line, Points, Vector3, MathUtils,
  AdditiveBlending, DoubleSide,
} from 'three';

const FONT = '"Space Grotesk", "Segoe UI", system-ui, sans-serif';
const C = { panel: 0x0f1f6e, side: 0x0b1752, pad: 0x0c1a5c, blue: 0x48ABE0, glow: 0x7FE3F0, white: 0xffffff, threat: 0xff5a6a, amber: 0xffb020 };

const SEGS = [
  { id: 'front', name: 'Front desk', ang: 214, devices: [{ id: 'fd1', label: 'Front desk PC 1', kind: 'pc' }, { id: 'fd2', label: 'Front desk PC 2', kind: 'pc' }] },
  { id: 'clinical', name: 'Clinical workstations', ang: 146, devices: [{ id: 'op1', label: 'Operatory 1', kind: 'pc' }, { id: 'op2', label: 'Operatory 2', kind: 'pc' }] },
  { id: 'imaging', name: 'Imaging', ang: 78, devices: [{ id: 'xr', label: 'X-ray sensor PC', kind: 'pc' }, { id: 'cbct', label: 'CBCT scanner', kind: 'scanner' }] },
  { id: 'pms', name: 'Practice management', ang: 10, devices: [{ id: 'pms', label: 'Practice management server', kind: 'server' }] },
  { id: 'guest', name: 'Guest Wi-Fi', ang: 302, devices: [{ id: 'g1', label: 'Guest phone', kind: 'phone' }, { id: 'g2', label: 'Guest laptop', kind: 'phone' }] },
];
// permitted flows (must match the example policy in the markup)
const FLOWS = [['fd1', 'pms'], ['fd2', 'pms'], ['op1', 'pms'], ['op2', 'cbct'], ['op1', 'xr'], ['g1', 'internet'], ['g2', 'internet'], ['op2', 'pms']];
// lateral-movement targets for the compromised PC: none has an allow rule from Front desk PC 2
const ATTACKS = ['xr', 'op1', 'cbct', 'fd1', 'op2', 'g1'];

function tex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 8; return t;
}

function mount(root) {
  const canvas = root.querySelector('canvas');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = SRGBColorSpace;
  root.classList.add('is-live');
  const q = (k) => root.querySelector(`[data-ms="${k}"]`);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new Scene(), camera = new PerspectiveCamera(32, 2, .1, 300);
  scene.add(new AmbientLight(0xbcd4ff, .6));
  const key = new DirectionalLight(0xffffff, 1.5); key.position.set(-6, 14, 10); scene.add(key);
  const rim = new DirectionalLight(C.blue, .8); rim.position.set(8, 4, -10); scene.add(rim);
  const coreLight = new PointLight(C.glow, 0, 10, 1.6); coreLight.position.set(0, 1, 0); scene.add(coreLight);
  const fade = [], F = (m) => { m.transparent = true; fade.push([m, m.opacity]); m.opacity = 0; return m; };

  /* hub: the policy engine ring */
  const R_IN = 1.45, R_OUT = 2.15, H = .45, N = 6, ARC = 2 * Math.PI / N, HALF = (ARC - MathUtils.degToRad(9)) / 2, R_MID = (R_IN + R_OUT) / 2, RIM = R_OUT + .35;
  const sector = () => {
    const s = new Shape(), c = -Math.PI / 2, st = 20;
    for (let i = 0; i <= st; i++) { const a = c - HALF + 2 * HALF * i / st; const v = [R_OUT * Math.cos(a), R_OUT * Math.sin(a)]; i ? s.lineTo(...v) : s.moveTo(...v); }
    for (let i = st; i >= 0; i--) { const a = c - HALF + 2 * HALF * i / st; s.lineTo(R_IN * Math.cos(a), R_IN * Math.sin(a)); }
    return s;
  };
  const modGeo = new ExtrudeGeometry(sector(), { depth: H, bevelEnabled: true, bevelSize: .03, bevelThickness: .03, bevelSegments: 2, curveSegments: 20 }); modGeo.rotateX(-Math.PI / 2);
  const face = tex(512, 200, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#15287a'); grd.addColorStop(1, '#0c1a5a'); g.fillStyle = grd; g.fillRect(4, 4, w - 8, h - 8);
    g.strokeStyle = 'rgba(108,192,234,.45)'; g.lineWidth = 3; g.strokeRect(4, 4, w - 8, h - 8);
    g.save(); g.translate(78, h / 2); g.strokeStyle = '#cfe6ff'; g.lineWidth = 8; const s = 92;
    for (let r = 0; r < 3; r++) { const yy = -s * .36 + r * s * .26, off = r % 2 ? s * .2 : 0; for (let c = -1; c < 2; c++) g.strokeRect(-s * .5 + off + c * s * .4 + s * .4, yy, s * .36, s * .2); }
    g.restore();
    g.fillStyle = '#fff'; g.font = `700 42px ${FONT}`; g.textBaseline = 'middle'; g.fillText('FWaaS', 172, h / 2);
    g.fillStyle = 'rgba(255,255,255,.12)'; for (let i = 0; i < 5; i++) g.fillRect(w - 100 + i * 16, 36, 6, h - 72);
  });
  const hub = new Group(), hubSpin = new Group(); hub.add(hubSpin); scene.add(hub);
  const hubCap = F(new MeshStandardMaterial({ color: C.panel, metalness: .45, roughness: .5, emissive: C.threat, emissiveIntensity: 0 }));
  const hubSide = F(new MeshStandardMaterial({ color: C.side, metalness: .5, roughness: .55 }));
  const hubSeam = F(new MeshStandardMaterial({ color: C.blue, emissive: C.blue, emissiveIntensity: 1.4 }));
  const faceMat = F(new MeshBasicMaterial({ map: face }));
  const edgeMat = new LineBasicMaterial({ color: C.glow, transparent: true, opacity: 0 });
  const modEdges = new EdgesGeometry(modGeo, 25), faceGeo = new PlaneGeometry(1.05, .42).rotateX(-Math.PI / 2), seamGeo = new BoxGeometry(.08, H + .08, R_OUT - R_IN + .14);
  for (let k = 0; k < N; k++) {
    const m = new Group(); m.rotation.y = k * ARC; hubSpin.add(m);
    m.add(new Mesh(modGeo, [hubCap, hubSide]), new LineSegments(modEdges, edgeMat));
    const f = new Mesh(faceGeo, faceMat); f.position.set(0, H + .04, R_MID); m.add(f);
    const s = new Mesh(seamGeo, hubSeam); s.rotation.y = ARC / 2; s.position.set(R_MID * Math.sin(ARC / 2), H * .5, R_MID * Math.cos(ARC / 2)); hubSpin.add(s);
  }
  const torus = (r, t, m, y) => { const o = new Mesh(new TorusGeometry(r, t, 8, 140), m); o.rotation.x = Math.PI / 2; o.position.y = y; hub.add(o); };
  torus(R_IN - .12, .018, F(new MeshBasicMaterial({ color: C.white, opacity: .7 })), H * .3);
  torus(R_OUT + .16, .02, F(new MeshBasicMaterial({ color: C.white, opacity: .7 })), H * .25);
  torus(RIM, .026, F(new MeshBasicMaterial({ color: C.blue })), H * .1);
  const coreMat = new ShaderMaterial({
    transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uAlert: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `varying vec2 vUv; uniform float uTime,uOpacity,uAlert;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
      void main(){ vec2 p=vUv*2.-1.; float r=length(p),a=atan(p.y,p.x); float sw=a+2.6*(1.-r)-uTime*.25;
        float f=fbm(vec2(cos(sw),sin(sw))*r*2.4+vec2(uTime*.05,-uTime*.03));
        vec3 col=mix(vec3(.04,.10,.40),vec3(.18,.52,.72),smoothstep(.15,.85,f*(1.25-r)));
        col=mix(col,vec3(.50,.89,.94),smoothstep(.55,0.,r)*.75); col+=vec3(1.)*pow(smoothstep(.45,0.,r),2.)*.55;
        col=mix(col,vec3(1.,.35,.42)*(.6+f),uAlert*.55);
        gl_FragColor=vec4(col,smoothstep(1.,.86,r)*uOpacity); }`,
  });
  const core = new Mesh(new CircleGeometry(R_IN - .1, 96), coreMat); core.rotation.x = -Math.PI / 2; core.position.y = .03; hub.add(core);

  /* segments, devices and their tunnels */
  const SEG_R = 8.6, PAD_R = 2.05, dev = {};
  const ringGeo = new TorusGeometry(.24, .022, 6, 40), tubeGeo = new CylinderGeometry(.22, .22, 1, 20, 1, true);
  const padGeo = new CylinderGeometry(PAD_R, PAD_R, .16, 6), padEdge = new EdgesGeometry(padGeo);
  const dirOf = (a) => new Vector3(Math.cos(a), 0, Math.sin(a));
  for (const s of SEGS) {
    const a = MathUtils.degToRad(s.ang), c = dirOf(a).multiplyScalar(SEG_R); s.center = c;
    const pad = new Mesh(padGeo, F(new MeshStandardMaterial({ color: C.pad, metalness: .3, roughness: .7 }))); pad.position.copy(c); pad.rotation.y = -a; scene.add(pad);
    s.edge = F(new LineBasicMaterial({ color: C.glow, opacity: .55 })); const pe = new LineSegments(padEdge, s.edge); pe.position.copy(c); pe.rotation.y = -a; scene.add(pe);
    const pts = []; for (let i = 0; i <= 96; i++) { const t = i / 96 * Math.PI * 2; pts.push(new Vector3(Math.cos(t) * (PAD_R + .45), .02, Math.sin(t) * (PAD_R + .45))); }
    const b = new Line(new BufferGeometry().setFromPoints(pts), F(new LineDashedMaterial({ color: C.blue, dashSize: .22, gapSize: .16, opacity: .8 })));
    b.computeLineDistances(); b.position.copy(c); scene.add(b);
    const tang = new Vector3(-Math.sin(a), 0, Math.cos(a)), n = s.devices.length;
    s.devices.forEach((d, i) => {
      d.seg = s; d.pos = c.clone().addScaledVector(tang, n === 1 ? 0 : (i - (n - 1) / 2) * 1.55).setY(.5);
      const da = Math.atan2(d.pos.z, d.pos.x); d.rim = dirOf(da).multiplyScalar(RIM).setY(.5);
      const size = { pc: [.75, .42, .55], server: [.7, .9, .7], scanner: [.85, .6, .85], phone: [.32, .18, .55] }[d.kind];
      d.mat = F(new MeshStandardMaterial({ color: 0x1a2f8f, metalness: .4, roughness: .45, emissive: C.blue, emissiveIntensity: .25 }));
      const box = new Mesh(new BoxGeometry(...size), d.mat); box.position.copy(d.pos).setY(.08 + size[1] / 2); box.rotation.y = -da; scene.add(box);
      d.screen = F(new MeshBasicMaterial({ color: C.glow, opacity: .9 }));
      const scr = new Mesh(new PlaneGeometry(size[0] * .7, size[2] * .55).rotateX(-Math.PI / 2), d.screen);
      scr.position.copy(box.position).setY(box.position.y + size[1] / 2 + .01); scr.rotation.y = -da; scene.add(scr);
      // this device's own tunnel to the policy engine
      d.ringMat = F(new MeshBasicMaterial({ color: C.glow, opacity: .85, blending: AdditiveBlending, depthWrite: false }));
      d.tubeMat = F(new MeshBasicMaterial({ color: C.blue, opacity: .08, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
      const from = d.pos.clone().addScaledVector(d.rim.clone().sub(d.pos).normalize(), .55), len = from.distanceTo(d.rim);
      for (let t = 0; t <= len; t += .62) { const r = new Mesh(ringGeo, d.ringMat); r.position.lerpVectors(from, d.rim, t / len); r.lookAt(d.rim); scene.add(r); }
      const tube = new Mesh(tubeGeo, d.tubeMat); tube.scale.y = len; tube.position.lerpVectors(from, d.rim, .5);
      tube.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), d.rim.clone().sub(from).normalize()); scene.add(tube);
      d.state = 'ok'; dev[d.id] = d;
    });
  }
  const INTERNET = new Vector3(0, 7.5, 0);

  /* packets, block flash, sparks */
  const pktGeo = new BoxGeometry(.26, .12, .12), haloGeo = new SphereGeometry(.17, 12, 10);
  const M = {
    ok: new MeshBasicMaterial({ color: C.glow }), bad: new MeshBasicMaterial({ color: C.threat }),
    okH: new MeshBasicMaterial({ color: C.glow, transparent: true, opacity: .3, blending: AdditiveBlending, depthWrite: false }),
    badH: new MeshBasicMaterial({ color: C.threat, transparent: true, opacity: .38, blending: AdditiveBlending, depthWrite: false }),
  };
  const pool = [];
  for (let i = 0; i < 60; i++) { const g = new Group(), c = new Mesh(pktGeo, M.ok), h = new Mesh(haloGeo, M.okH); h.scale.set(1.6, .8, .8); g.add(c, h); g.visible = false; scene.add(g); pool.push({ g, c, h, live: false }); }
  const shield = new Mesh(new CircleGeometry(.42, 40), new MeshBasicMaterial({ color: C.threat, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
  scene.add(shield);
  let shieldFlash = 0, hubFlash = 0;
  const SP = 18, bursts = [];
  for (let b = 0; b < 6; b++) {
    const pos = new Float32Array(SP * 3), vel = new Float32Array(SP * 3), geo = new BufferGeometry(); geo.setAttribute('position', new BufferAttribute(pos, 3));
    const mat = new PointsMaterial({ color: C.threat, size: .1, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
    scene.add(new Points(geo, mat)); bursts.push({ pos, vel, geo, mat, age: 9 });
  }
  const burst = (p, dir) => {
    const b = bursts.find((x) => x.age > 1) || bursts[0]; b.age = 0;
    for (let i = 0; i < SP; i++) { b.pos.set([p.x, p.y, p.z], i * 3); const r = new Vector3(Math.random() - .5, Math.random() - .3, Math.random() - .5).normalize().multiplyScalar(1.4).addScaledVector(dir, -1.6); b.vel.set([r.x, r.y, r.z], i * 3); }
  };
  const launch = (from, to, bad) => {
    const p = pool.find((x) => !x.live); if (!p) return;
    const A = dev[from], path = [A.pos.clone(), A.rim.clone()];
    if (!bad) { path.push(new Vector3(0, .5, 0)); if (to === 'internet') path.push(INTERNET.clone()); else path.push(dev[to].rim.clone(), dev[to].pos.clone()); }
    const lens = [0]; for (let i = 1; i < path.length; i++) lens.push(lens[i - 1] + path[i].distanceTo(path[i - 1]));
    Object.assign(p, { live: true, bad, from, to, path, lens, d: 0, v: 5.2 + Math.random(), state: 'fly', t: 0 });
    p.c.material = bad ? M.bad : M.ok; p.h.material = bad ? M.badH : M.okH; p.g.scale.setScalar(1); p.g.position.copy(path[0]); p.g.visible = true;
  };

  /* labels */
  const labelsEl = q('labels'), labels = [];
  const label = (text, anchor, cls = '') => {
    const el = document.createElement('div'); el.className = 'microseg__lbl ' + cls;
    el.innerHTML = '<span class="microseg__msg"></span><span class="microseg__name"></span>';
    el.lastChild.textContent = text; labelsEl.appendChild(el);
    const L = { el, msg: el.firstChild, anchor, until: 0 }; labels.push(L); return L;
  };
  for (const s of SEGS) s.lbl = label(s.name, s.center.clone().setY(1.9));
  const hubLbl = label('SecureTrust policy engine', new Vector3(0, 1.6, 0), 'is-hub');
  const v3 = new Vector3();
  const placeLabels = (w, h) => { for (const L of labels) { v3.copy(L.anchor).project(camera); L.el.style.transform = `translate(${(v3.x * .5 + .5) * w}px,${(-v3.y * .5 + .5) * h}px) translate(-50%,-100%)`; } };

  /* story */
  const nOk = q('ok'), nBad = q('bad'), logEl = q('log'), rules = [...root.querySelectorAll('[data-rule]')];
  let allowed = 0, blocked = 0, simTime = 0, loopT = 0, nextFlow = 0, nextAttack = 0, phase = 'normal', atk = 0;
  const say = (L, text, color, secs) => { L.msg.textContent = text; L.msg.className = 'microseg__msg is-shown is-' + color; L.until = simTime + secs; };
  const log = (who, what, cls, tag) => {
    const li = document.createElement('li'); li.className = cls;
    li.innerHTML = '<i></i><span><b></b><span></span></span><em></em>';
    li.querySelector('b').textContent = who; li.querySelector('span span').textContent = what; li.querySelector('em').textContent = tag;
    logEl.prepend(li); while (logEl.children.length > 4) logEl.lastChild.remove();
  };
  const hitRule = (k) => rules.forEach((r) => r.classList.toggle('is-hit', r.dataset.rule === k));
  const VICTIM = dev.fd2;
  const setDevice = (d, state) => {
    d.state = state; const col = state === 'bad' ? C.threat : state === 'iso' ? C.amber : C.glow;
    d.ringMat.color.setHex(col); d.tubeMat.color.setHex(state === 'ok' ? C.blue : col); d.screen.color.setHex(col);
    d.mat.emissive.setHex(state === 'ok' ? C.blue : col); d.mat.emissiveIntensity = state === 'ok' ? .25 : .6;
    d.seg.edge.color.setHex(col); d.seg.lbl.el.classList.toggle('is-alert', state !== 'ok');
  };
  const story = (dt) => {
    loopT += dt;
    nextFlow -= dt;
    if (nextFlow <= 0) {
      nextFlow = .45 + Math.random() * .35; let f;
      do { f = FLOWS[Math.floor(Math.random() * FLOWS.length)]; } while (f[0] === VICTIM.id && VICTIM.state !== 'ok');
      launch(f[0], f[1], false);
    }
    if (phase === 'normal' && loopT > 6) { phase = 'attack'; setDevice(VICTIM, 'bad'); say(VICTIM.seg.lbl, 'Compromised: phishing link clicked', 'red', 3.2); log(VICTIM.label, ' · compromised', '', 'Alert'); nextAttack = .6; }
    if (phase === 'attack') {
      nextAttack -= dt;
      if (nextAttack <= 0) { nextAttack = .8 + Math.random() * .4; launch(VICTIM.id, ATTACKS[atk++ % ATTACKS.length], true); }
      if (loopT > 14) { phase = 'isolated'; setDevice(VICTIM, 'iso'); say(VICTIM.seg.lbl, 'Access restricted until remediated', 'amber', 3.5); log(VICTIM.label, ' · access restricted', 'is-amber', 'Isolated'); }
    }
    if (phase === 'isolated' && loopT > 19) { phase = 'restored'; setDevice(VICTIM, 'ok'); say(VICTIM.seg.lbl, 'Remediated: access restored', 'green', 2.8); log(VICTIM.label, ' · remediated', 'is-green', 'Restored'); }
    if (phase === 'restored' && loopT > 24) { phase = 'normal'; loopT = 0; }
  };
  const block = (p) => {
    blocked++; p.state = 'die'; p.t = 0; const d = dev[p.from], dir = d.rim.clone().sub(d.pos).normalize(), target = dev[p.to];
    shield.position.copy(d.rim); shield.lookAt(d.pos); shieldFlash = 1; hubFlash = 1; burst(d.rim, dir); hitRule('deny');
    say(hubLbl, `Blocked: ${d.label} → ${target.label} · no rule`, 'red', 1.5);
    log(d.label, ` → ${target.label}`, '', 'Blocked');
  };
  const step = (dt) => {
    simTime += dt; story(dt);
    for (const p of pool) {
      if (!p.live) continue;
      if (p.state === 'fly') {
        p.d += p.v * dt;
        if (p.bad && p.d >= p.lens[1] - .25) { p.g.position.copy(p.path[1]).addScaledVector(p.path[1].clone().sub(p.path[0]).normalize(), -.25); block(p); continue; }
        if (p.d >= p.lens[p.lens.length - 1]) {
          p.live = false; p.g.visible = false; allowed++;
          hitRule(p.to === 'internet' ? 'guest>internet' : `${dev[p.from].seg.id}>${dev[p.to].seg.id}`); continue;
        }
        let i = 1; while (p.lens[i] < p.d) i++;
        const k = (p.d - p.lens[i - 1]) / (p.lens[i] - p.lens[i - 1]);
        p.g.position.lerpVectors(p.path[i - 1], p.path[i], k); p.g.lookAt(p.path[i]); p.g.rotateY(Math.PI / 2);
        if (p.to === 'internet' && i === p.path.length - 1) p.g.scale.setScalar(Math.max(.01, 1 - k));
      } else { p.t += dt; p.g.scale.setScalar(Math.max(.001, (1 - p.t / .35) * 1.6)); if (p.t > .35) { p.live = false; p.g.visible = false; } }
    }
    for (const b of bursts) { if (b.age > 1) continue; b.age += dt; for (let i = 0; i < SP * 3; i++) b.pos[i] += b.vel[i] * dt; b.geo.attributes.position.needsUpdate = true; b.mat.opacity = Math.max(0, 1 - b.age / .7); }
    shieldFlash = Math.max(0, shieldFlash - dt * 2); hubFlash = Math.max(0, hubFlash - dt * 1.6);
    shield.material.opacity = shieldFlash * .7; hubCap.emissiveIntensity = hubFlash * .7; hubSeam.emissive.setHex(hubFlash > .05 ? C.threat : C.blue);
    coreMat.uniforms.uAlert.value = hubFlash;
    for (const L of labels) if (L.until && simTime > L.until) { L.msg.classList.remove('is-shown'); L.until = 0; }
    nOk.textContent = allowed.toLocaleString(); nBad.textContent = blocked.toLocaleString();
  };

  /* loop: the intro starts the first time the section scrolls into view */
  const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), seg = (t, a, b) => MathUtils.clamp((t - a) / (b - a), 0, 1);
  const LOOK = new Vector3(0, -.6, 1.4), CAM0 = new Vector3(-4, 34, 30), CAM1 = new Vector3(0, 19, 22.5);
  let t0 = null, last = 0, visible = false, raf = 0;
  const frame = (now) => {
    raf = 0; if (t0 === null) t0 = now - (reduce ? 1e6 : 0);
    const t = (now - t0) / 1000, dt = Math.min((now - last) / 1000, .05); last = now;
    const draw = seg(t, 0, 1.1), solid = ease(seg(t, .9, 2.2)), fly = ease(seg(t, .4, 3.4)), live = seg(t, 2.8, 3.8);
    camera.position.lerpVectors(CAM0, CAM1, fly);
    if (!reduce && t > 3.4) { const o = Math.sin((t - 3.4) * .12) * .18; camera.position.x = Math.sin(o) * 22.5; camera.position.z = Math.cos(o) * 22.5; }
    camera.lookAt(LOOK);
    for (const [m, b] of fade) m.opacity = b * solid;
    edgeMat.opacity = draw * .85 * (1 - solid * .8);
    coreMat.uniforms.uOpacity.value = solid; coreMat.uniforms.uTime.value = reduce ? 2 : now / 1000; coreLight.intensity = solid * 14;
    if (!reduce) hubSpin.rotation.y += .002;
    root.classList.toggle('is-settled', live > .5);
    if (live > 0 && !reduce) step(dt);
    placeLabels(canvas.clientWidth, canvas.clientHeight); renderer.render(scene, camera);
    if (visible && !reduce) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new ResizeObserver(() => {
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.2 ? 52 : 32; camera.updateProjectionMatrix(); if (t0 !== null) kick();
  }).observe(canvas);
  if (reduce) { for (let i = 0; i < 600; i++) step(1 / 60); } // reduced motion: hold a moment mid-attack
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { rootMargin: '0px 0px -15% 0px' }).observe(root);
}

const start = () => document.querySelectorAll('[data-microseg]').forEach(mount);
document.fonts?.load ? document.fonts.load(`700 42px ${FONT}`).then(start, start) : start();
