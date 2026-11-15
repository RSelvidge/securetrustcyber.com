// ring-hero.mjs — product-page hero animation (bundled to assets/js/ring-hero.js; run `npm run build` here).
// Four stacked rings of SecureTrust products fade in as a wireframe, solidify, then the camera dives to the
// ring that holds this page's product (data-product on [data-ring-hero]) and settles top-down over a glowing
// core while the ring turns slowly. The in-ring copy is server-rendered HTML; this file only draws the scene.
import {
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, CanvasTexture,
  SRGBColorSpace, ShaderMaterial, Shape, ExtrudeGeometry, EdgesGeometry, CylinderGeometry, PlaneGeometry,
  BoxGeometry, Group, MeshStandardMaterial, LineBasicMaterial, MeshBasicMaterial, Mesh, LineSegments,
  TorusGeometry, RingGeometry, BufferGeometry, BufferAttribute, PointsMaterial, Points, AdditiveBlending,
  CircleGeometry, DoubleSide, Vector3, MathUtils,
} from 'three';

const RINGS = [
  { name: 'Detect it', products: ['siem', 'ips'] },
  { name: 'Protect it', products: ['swg', 'fwaas', 'dns-security'] },
  { name: 'Control it', products: ['ztna', 'casb', 'dlp'] },
  { name: 'Maintain it', products: ['patch-management', 'ai-security'] },
];
const LABEL = { siem: 'SIEM', ips: 'IPS', swg: 'SWG', fwaas: 'FWaaS', 'dns-security': 'DNS', ztna: 'ZTNA', casb: 'CASB', dlp: 'DLP', 'patch-management': 'PATCH', 'ai-security': 'AI SEC' };
const FULL = { siem: 'SIEM Platform', ips: 'Intrusion Prevention', swg: 'Secure Web Gateway', fwaas: 'Firewall as a Service', 'dns-security': 'DNS Security', ztna: 'Zero Trust Access', casb: 'Cloud Access Security', dlp: 'Data Loss Prevention', 'patch-management': 'Patch Management', 'ai-security': 'AI Security' };

const C = { panel: 0x0f1f6e, panelSide: 0x0b1752, navy900: 0x061040, blue: 0x48ABE0, glow: 0x7FE3F0, white: 0xffffff };
const R_IN = 3.35, R_OUT = 4.65, R_MID = (R_IN + R_OUT) / 2, H = 0.62, N = 6, SPACING = 1.75;
const ARC = (2 * Math.PI) / N, HALF = (ARC - MathUtils.degToRad(9)) / 2;
const FONT = '"Space Grotesk", "Segoe UI", system-ui, sans-serif';

/* ---------- canvas-drawn textures ---------- */
function tex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 8; return t;
}
function icon(g, id, x, y, s, col) {
  g.save(); g.translate(x, y); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = s * 0.09; g.lineCap = 'round'; g.lineJoin = 'round';
  const P = () => g.beginPath();
  switch (id) {
    case 'siem':
      P(); g.rect(-s * .5, -s * .38, s, s * .66); g.stroke();
      P(); g.moveTo(-s * .4, 0); g.lineTo(-s * .15, 0); g.lineTo(-s * .05, -s * .22); g.lineTo(s * .08, s * .18); g.lineTo(s * .18, -s * .05); g.lineTo(s * .4, -s * .05); g.stroke();
      P(); g.moveTo(-s * .18, s * .42); g.lineTo(s * .18, s * .42); g.stroke(); break;
    case 'ips':
      P(); g.moveTo(0, -s * .48); g.lineTo(s * .4, -s * .32); g.lineTo(s * .36, s * .1); g.quadraticCurveTo(s * .3, s * .36, 0, s * .5); g.quadraticCurveTo(-s * .3, s * .36, -s * .36, s * .1); g.lineTo(-s * .4, -s * .32); g.closePath(); g.stroke();
      P(); g.moveTo(-s * .18, 0); g.lineTo(s * .18, 0); g.stroke(); break;
    case 'swg':
      P(); g.arc(0, 0, s * .44, 0, 7); g.stroke(); P(); g.ellipse(0, 0, s * .18, s * .44, 0, 0, 7); g.stroke();
      P(); g.moveTo(-s * .44, 0); g.lineTo(s * .44, 0); g.stroke(); break;
    case 'fwaas':
      for (let r = 0; r < 3; r++) {
        const yy = -s * .36 + r * s * .26, off = r % 2 ? s * .2 : 0;
        for (let c = -1; c < 2; c++) { P(); g.rect(-s * .5 + off + c * s * .4 + s * .4, yy, s * .36, s * .2); g.stroke(); }
      } break;
    case 'dns-security':
      [[0, -s * .32], [-s * .32, s * .28], [s * .32, s * .28]].forEach(([a, b]) => { P(); g.arc(a, b, s * .11, 0, 7); g.fill(); });
      P(); g.moveTo(0, -s * .2); g.lineTo(0, 0); g.lineTo(-s * .32, 0); g.lineTo(-s * .32, s * .16); g.moveTo(0, 0); g.lineTo(s * .32, 0); g.lineTo(s * .32, s * .16); g.stroke(); break;
    case 'ztna':
      P(); g.rect(-s * .34, -s * .05, s * .68, s * .5); g.stroke(); P(); g.arc(0, -s * .05, s * .22, Math.PI, 0); g.stroke();
      P(); g.arc(0, s * .17, s * .06, 0, 7); g.fill(); break;
    case 'casb':
      P(); g.moveTo(-s * .3, s * .25); g.arc(-s * .25, s * .05, s * .2, Math.PI * .5, Math.PI * 1.5); g.arc(0, -s * .12, s * .25, Math.PI * 1.1, Math.PI * 1.95); g.arc(s * .28, s * .06, s * .19, Math.PI * 1.5, Math.PI * .5); g.closePath(); g.stroke(); break;
    case 'dlp':
      P(); g.moveTo(-s * .3, -s * .48); g.lineTo(s * .12, -s * .48); g.lineTo(s * .3, -s * .3); g.lineTo(s * .3, s * .48); g.lineTo(-s * .3, s * .48); g.closePath(); g.stroke();
      P(); g.rect(-s * .13, s * .05, s * .26, s * .2); g.fill(); P(); g.arc(0, s * .05, s * .09, Math.PI, 0); g.stroke(); break;
    case 'patch-management':
      g.rotate(-Math.PI / 4); P(); g.rect(-s * .5, -s * .17, s, s * .34); g.stroke(); P(); g.rect(-s * .15, -s * .17, s * .3, s * .34); g.stroke(); break;
    case 'ai-security':
      P(); g.rect(-s * .28, -s * .28, s * .56, s * .56); g.stroke();
      for (let i = -1; i <= 1; i++) {
        P(); g.moveTo(i * s * .15, -s * .28); g.lineTo(i * s * .15, -s * .45); g.moveTo(i * s * .15, s * .28); g.lineTo(i * s * .15, s * .45);
        g.moveTo(-s * .28, i * s * .15); g.lineTo(-s * .45, i * s * .15); g.moveTo(s * .28, i * s * .15); g.lineTo(s * .45, i * s * .15); g.stroke();
      }
      g.font = `700 ${s * .2}px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('AI', 0, s * .01); break;
  }
  g.restore();
}
const topTexture = (id, hot) => tex(512, 200, (g, w, h) => {
  const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, hot ? '#173a9c' : '#13246f'); grd.addColorStop(1, hot ? '#0f2a80' : '#0c1a5a');
  g.fillStyle = grd; g.beginPath(); g.rect(4, 4, w - 8, h - 8); g.fill();
  g.strokeStyle = hot ? '#7FE3F0' : 'rgba(108,192,234,.35)'; g.lineWidth = hot ? 5 : 2; g.stroke();
  g.fillStyle = 'rgba(255,255,255,.12)'; for (let i = 0; i < 6; i++) g.fillRect(w - 120 + i * 16, 36, 6, h - 72);
  [['#7FE3F0', hot], ['#48ABE0', true], ['#ffffff', false]].forEach(([c, on], i) => { g.fillStyle = on ? c : 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(150, 64 + i * 36, 7, 0, 7); g.fill(); });
  icon(g, id, 78, h / 2, 92, hot ? '#7FE3F0' : '#cfe6ff');
  g.fillStyle = hot ? '#ffffff' : 'rgba(255,255,255,.82)'; g.font = `700 40px ${FONT}`; g.textBaseline = 'middle';
  g.fillText(LABEL[id], 182, h / 2);
});
const sideTexture = (text) => tex(1024, 128, (g, w, h) => {
  g.fillStyle = '#0d1b5c'; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(72,171,224,.55)'; g.fillRect(0, 0, w, 5); g.fillRect(0, h - 5, w, 5);
  g.fillStyle = 'rgba(255,255,255,.1)'; for (let i = 0; i < 10; i++) { g.fillRect(40 + i * 14, 34, 5, 60); g.fillRect(w - 180 + i * 14, 34, 5, 60); }
  g.fillStyle = 'rgba(255,255,255,.75)'; g.font = `700 54px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 2);
});

const coreMat = () => new ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `
    varying vec2 vUv; uniform float uTime; uniform float uOpacity;
    float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
    float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*n(p); p*=2.03; a*=.5; } return v; }
    void main(){
      vec2 p=vUv*2.-1.; float r=length(p); float a=atan(p.y,p.x);
      float sw=a + 2.6*(1.-r) - uTime*.25;
      vec2 q=vec2(cos(sw),sin(sw))*r*2.4;
      float f=fbm(q+vec2(uTime*.05,-uTime*.03));
      vec3 col=mix(vec3(.04,.10,.40),vec3(.18,.52,.72),smoothstep(.15,.85,f*(1.25-r)));
      col=mix(col,vec3(.50,.89,.94),smoothstep(.55,0.,r)*.75);
      col+=vec3(1.)*pow(smoothstep(.45,0.,r),2.)*.55;
      gl_FragColor=vec4(col, smoothstep(1.,.86,r)*uOpacity);
    }`,
});

function sectorShape() {
  const s = new Shape(), c = -Math.PI / 2, steps = 24;
  for (let i = 0; i <= steps; i++) { const a = c - HALF + 2 * HALF * i / steps; const v = [R_OUT * Math.cos(a), R_OUT * Math.sin(a)]; i ? s.lineTo(...v) : s.moveTo(...v); }
  for (let i = steps; i >= 0; i--) { const a = c - HALF + 2 * HALF * i / steps; s.lineTo(R_IN * Math.cos(a), R_IN * Math.sin(a)); }
  return s;
}

function mount(root) {
  const product = root.dataset.product;
  const active = RINGS.findIndex((r) => r.products.includes(product));
  const canvas = root.querySelector('canvas');
  if (active < 0 || !canvas) return;

  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; } // no WebGL: static fallback stays
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  root.classList.add('is-live');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  scene.add(new AmbientLight(0xbcd4ff, 0.55));
  const key = new DirectionalLight(0xffffff, 1.6); key.position.set(4, 12, 9); scene.add(key);
  const rim = new DirectionalLight(C.blue, 0.9); rim.position.set(-8, 3, -6); scene.add(rim);
  const coreLight = new PointLight(C.glow, 0, 14, 1.6); scene.add(coreLight);

  const moduleGeo = new ExtrudeGeometry(sectorShape(), { depth: H, bevelEnabled: true, bevelSize: .04, bevelThickness: .04, bevelSegments: 2, curveSegments: 24 });
  moduleGeo.rotateX(-Math.PI / 2);
  const edgeGeo = new EdgesGeometry(moduleGeo, 25);
  const sideGeo = new CylinderGeometry(R_OUT + .055, R_OUT + .055, H * .62, 24, 1, true, -HALF * .82, HALF * 1.64);
  const topGeo = new PlaneGeometry(2.25, 0.88).rotateX(-Math.PI / 2);
  const seamGeo = new BoxGeometry(.14, H + .12, R_OUT - R_IN + .2);
  const cache = {};
  const cached = (k, f) => (cache[k] ??= f());
  const core = coreMat();

  const rings = RINGS.map((def, idx) => {
    const isA = idx === active;
    const g = new Group(), spin = new Group(); g.add(spin);
    const mats = [], track = (m) => (mats.push(m), m);
    const capMat = track(new MeshStandardMaterial({ color: C.panel, metalness: .45, roughness: .5, transparent: true }));
    const sideMat = track(new MeshStandardMaterial({ color: C.panelSide, metalness: .5, roughness: .55, transparent: true }));
    const hotCap = track(new MeshStandardMaterial({ color: 0x12287f, metalness: .5, roughness: .5, emissive: C.blue, emissiveIntensity: 0, transparent: true }));
    const edgeMat = track(new LineBasicMaterial({ color: C.glow, transparent: true, opacity: 0 }));
    const seamMat = track(new MeshStandardMaterial({ color: C.blue, emissive: C.blue, emissiveIntensity: 1.4, transparent: true }));
    const railW = track(new MeshBasicMaterial({ color: C.white, transparent: true, opacity: .75 }));
    const railB = track(new MeshBasicMaterial({ color: C.blue, transparent: true }));
    const baseMat = track(new MeshStandardMaterial({ color: C.navy900, metalness: .3, roughness: .8, transparent: true, side: DoubleSide }));
    let firstHot = -1;
    for (let i = 0; i < N; i++) {
      const id = def.products[i % def.products.length];
      const hot = isA && id === product; if (hot && firstHot < 0) firstHot = i;
      const m = new Group(); m.rotation.y = i * ARC; spin.add(m);
      m.add(new Mesh(moduleGeo, [hot ? hotCap : capMat, sideMat]));
      m.add(new LineSegments(edgeGeo, edgeMat));
      const top = new Mesh(topGeo, track(new MeshBasicMaterial({ map: cached((hot ? 'T' : 't') + id, () => topTexture(id, hot)), transparent: true })));
      top.position.set(0, H + .05, R_MID); m.add(top);
      const label = i % 2 ? FULL[id].toUpperCase() : def.name.toUpperCase();
      const side = new Mesh(sideGeo, track(new MeshBasicMaterial({ map: cached('s' + label, () => sideTexture(label)), transparent: true })));
      side.position.y = H * .5; m.add(side);
      const seam = new Mesh(seamGeo, seamMat); seam.rotation.y = ARC / 2;
      seam.position.set(R_MID * Math.sin(ARC / 2), H * .5, R_MID * Math.cos(ARC / 2)); spin.add(seam);
    }
    const torus = (r, t, mat, y) => { const o = new Mesh(new TorusGeometry(r, t, 8, 160), mat); o.rotation.x = Math.PI / 2; o.position.y = y; g.add(o); };
    torus(R_IN - .18, .025, railW, H * .25); torus(R_IN - .32, .018, railB, H * .15);
    torus(R_OUT + .2, .022, railW, H * .2); torus(R_OUT + .34, .03, railB, H * .1); torus(R_OUT + .46, .015, railW, 0);
    const base = new Mesh(new RingGeometry(R_IN - .45, R_OUT + .55, 128), baseMat); base.rotation.x = -Math.PI / 2; base.position.y = -.03; g.add(base);
    const pts = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2 + Math.random() * .15; pts.set([Math.sin(a) * (R_OUT + .34), H * .12, Math.cos(a) * (R_OUT + .34)], i * 3); }
    const pg = new BufferGeometry(); pg.setAttribute('position', new BufferAttribute(pts, 3));
    const packets = new Points(pg, track(new PointsMaterial({ color: C.glow, size: .09, transparent: true, blending: AdditiveBlending, depthWrite: false })));
    g.add(packets);
    if (isA) {
      const disc = new Mesh(new CircleGeometry(R_IN - .12, 96), core); disc.rotation.x = -Math.PI / 2; disc.position.y = .02; g.add(disc);
      spin.rotation.y = -firstHot * ARC; // a highlighted module faces the viewer when the camera lands
    }
    g.position.y = (RINGS.length - 1) / 2 * SPACING - idx * SPACING;
    scene.add(g);
    return { g, spin, mats, base0: mats.map((m) => m.opacity), edgeMat, hotCap, packets, y0: g.position.y };
  });

  const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const seg = (t, a, b) => MathUtils.clamp((t - a) / (b - a), 0, 1);
  const ay = rings[active].y0;
  const START = { pos: new Vector3(0, 5.2, 17.5), look: new Vector3(0, 0, 0), up: new Vector3(0, 1, 0) };
  const END = { pos: new Vector3(0, ay + 21.5, .001), look: new Vector3(0, ay, 0), up: new Vector3(0, 0, -1) };
  const pos = new Vector3(), look = new Vector3(), up = new Vector3();
  const t0 = performance.now() - (reduce ? 1e6 : 0);
  let visible = true, settled = false, raf = 0;

  function frame(now) {
    raf = 0;
    const t = (now - t0) / 1000, time = reduce ? 2 : now / 1000;
    const draw = seg(t, 0, 1.1), solid = ease(seg(t, .9, 2.1)), dive = ease(seg(t, 2.3, 4.4));
    pos.lerpVectors(START.pos, END.pos, dive); look.lerpVectors(START.look, END.look, dive); up.lerpVectors(START.up, END.up, dive).normalize();
    camera.position.copy(pos); camera.up.copy(up); camera.lookAt(look);
    rings.forEach((r, i) => {
      const isA = i === active, leave = isA ? 0 : ease(seg(t, 2.2, 3.4));
      r.g.position.y = r.y0 + (isA ? 0 : (i < active ? 1 : -1) * leave * 7);
      r.g.position.x = isA ? 0 : (i % 2 ? 1 : -1) * leave * 6;
      r.mats.forEach((m, k) => { m.opacity = r.base0[k] * solid * (1 - leave); });
      r.edgeMat.opacity = draw * .9 * (1 - solid * .8) * (1 - leave) + (isA ? solid * .12 : 0);
      r.g.visible = leave < 1;
      if (!reduce) { r.spin.rotation.y += isA ? .002 : .004 * (i % 2 ? 1 : -1); r.packets.rotation.y = -time * .35; }
    });
    const coreIn = ease(seg(t, 3.0, 4.6));
    core.uniforms.uTime.value = time; core.uniforms.uOpacity.value = coreIn;
    coreLight.position.set(0, ay + .6, 0); coreLight.intensity = coreIn * 22;
    rings[active].hotCap.emissiveIntensity = coreIn * (.12 + (reduce ? 0 : .1 * Math.sin(time * 2.4)));
    if (!settled && t > 4.2) { settled = true; root.classList.add('is-settled'); }
    renderer.render(scene, camera);
    if (visible && !(reduce && settled)) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); kick();
  };
  new ResizeObserver(resize).observe(canvas);
  // pause when the hero scrolls out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(root);
  }
  resize();
  // draw labels once the web font is in, so canvas textures don't fall back to a system font
  (document.fonts?.ready ?? Promise.resolve()).then(kick);
}

const start = () => document.querySelectorAll('[data-ring-hero]').forEach(mount);
document.fonts?.load ? document.fonts.load(`700 40px ${FONT}`).then(start, start) : start();
