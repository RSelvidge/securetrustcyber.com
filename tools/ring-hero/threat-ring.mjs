// threat-ring.mjs — industry-page hero (bundled into assets/js/ring-hero.js; run `npm run build` here).
// The product-page ring, but its panels are the industry's top threats in red. The camera dives in, then one by one
// each threat turns blue as the product that covers it locks on, and the core lists those products.
// Markup and data: the 'threats' hero variant in src/components/hero.mjs, src/content/threat-ring.data.mjs.
import {
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, CanvasTexture, SRGBColorSpace,
  ShaderMaterial, Shape, ExtrudeGeometry, EdgesGeometry, PlaneGeometry, BoxGeometry, CylinderGeometry, TorusGeometry,
  CircleGeometry, RingGeometry, Group, Mesh, LineSegments, MeshStandardMaterial, MeshBasicMaterial, LineBasicMaterial,
  Vector3, Color, MathUtils, AdditiveBlending, DoubleSide,
} from 'three';

const FONT = '"Space Grotesk", "Segoe UI", system-ui, sans-serif';
const C = { panel: 0x0f1f6e, side: 0x0b1752, navy900: 0x061040, blue: 0x48ABE0, glow: 0x7FE3F0, white: 0xffffff, threat: 0xff5a6a, redPanel: 0x3a1236 };
const R_IN = 3.35, R_OUT = 4.65, R_MID = (R_IN + R_OUT) / 2, H = 0.62, N = 6;
const ARC = (2 * Math.PI) / N, HALF = (ARC - MathUtils.degToRad(9)) / 2;
const LOCK_AT = [0, 1.4, 2.8], CYCLE = 12, FIRST = 4.6, RESET = 10.4; // seconds

function tex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 8; return t;
}
function fitText(g, text, maxW, size, weight = 700) {
  let s = size; do { g.font = `${weight} ${s}px ${FONT}`; s -= 2; } while (g.measureText(text).width > maxW && s > 16);
}
const threatTex = (title) => tex(512, 200, (g, w, h) => {
  const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#4a1532'); grd.addColorStop(1, '#2a0d24');
  g.fillStyle = grd; g.fillRect(4, 4, w - 8, h - 8); g.strokeStyle = '#ff5a6a'; g.lineWidth = 4; g.strokeRect(4, 4, w - 8, h - 8);
  // warning triangle
  g.save(); g.translate(70, h / 2); g.strokeStyle = '#ff8a95'; g.lineWidth = 7; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(0, -38); g.lineTo(40, 32); g.lineTo(-40, 32); g.closePath(); g.stroke();
  g.fillStyle = '#ff8a95'; g.fillRect(-3.5, -14, 7, 26); g.beginPath(); g.arc(0, 22, 4.5, 0, 7); g.fill(); g.restore();
  g.fillStyle = '#ffd6db'; g.font = `700 22px ${FONT}`; g.textBaseline = 'middle'; g.fillText('THREAT', 132, 62);
  g.fillStyle = '#fff'; fitText(g, title, w - 150, 40); g.fillText(title, 132, 118);
});
const productTex = (label, title) => tex(512, 200, (g, w, h) => {
  const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#173a9c'); grd.addColorStop(1, '#0f2a80');
  g.fillStyle = grd; g.fillRect(4, 4, w - 8, h - 8); g.strokeStyle = '#7FE3F0'; g.lineWidth = 5; g.strokeRect(4, 4, w - 8, h - 8);
  // shield with check
  g.save(); g.translate(70, h / 2); g.strokeStyle = '#7FE3F0'; g.lineWidth = 7; g.lineJoin = 'round'; g.lineCap = 'round'; const s = 84;
  g.beginPath(); g.moveTo(0, -s * .48); g.lineTo(s * .4, -s * .32); g.lineTo(s * .36, s * .1); g.quadraticCurveTo(s * .3, s * .36, 0, s * .5);
  g.quadraticCurveTo(-s * .3, s * .36, -s * .36, s * .1); g.lineTo(-s * .4, -s * .32); g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(-14, 2); g.lineTo(-3, 13); g.lineTo(16, -10); g.stroke(); g.restore();
  g.fillStyle = '#fff'; fitText(g, label, w - 150, 44); g.textBaseline = 'middle'; g.fillText(label, 132, 72);
  g.fillStyle = 'rgba(207,230,255,.85)'; fitText(g, title, w - 150, 26, 500); g.fillText(title, 132, 128);
});

function sectorShape() {
  const s = new Shape(), c = -Math.PI / 2, steps = 24;
  for (let i = 0; i <= steps; i++) { const a = c - HALF + 2 * HALF * i / steps; const v = [R_OUT * Math.cos(a), R_OUT * Math.sin(a)]; i ? s.lineTo(...v) : s.moveTo(...v); }
  for (let i = steps; i >= 0; i--) { const a = c - HALF + 2 * HALF * i / steps; s.lineTo(R_IN * Math.cos(a), R_IN * Math.sin(a)); }
  return s;
}

function mount(root) {
  let items; try { items = JSON.parse(root.dataset.threats); } catch { return; }
  const canvas = root.querySelector('canvas'); if (!items?.length || !canvas) return;
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; } // no WebGL: static fallback stays
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = SRGBColorSpace;
  root.classList.add('is-live');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lis = [...root.querySelectorAll('[data-lock]')];

  const scene = new Scene(), camera = new PerspectiveCamera(34, 1, 0.1, 200);
  scene.add(new AmbientLight(0xbcd4ff, 0.55));
  const key = new DirectionalLight(0xffffff, 1.6); key.position.set(4, 12, 9); scene.add(key);
  const rim = new DirectionalLight(C.blue, 0.9); rim.position.set(-8, 3, -6); scene.add(rim);
  const coreLight = new PointLight(C.glow, 0, 14, 1.6); coreLight.position.set(0, .6, 0); scene.add(coreLight);

  const moduleGeo = new ExtrudeGeometry(sectorShape(), { depth: H, bevelEnabled: true, bevelSize: .04, bevelThickness: .04, bevelSegments: 2, curveSegments: 24 });
  moduleGeo.rotateX(-Math.PI / 2);
  const edgeGeo = new EdgesGeometry(moduleGeo, 25), topGeo = new PlaneGeometry(2.25, .88).rotateX(-Math.PI / 2);
  const seamGeo = new BoxGeometry(.14, H + .12, R_OUT - R_IN + .2);
  const fade = [], F = (m) => { m.transparent = true; fade.push([m, m.opacity]); m.opacity = 0; return m; };
  const edgeMat = new LineBasicMaterial({ color: C.glow, transparent: true, opacity: 0 });
  const sideMat = F(new MeshStandardMaterial({ color: C.side, metalness: .5, roughness: .55 }));
  const seamMat = F(new MeshStandardMaterial({ color: C.threat, emissive: C.threat, emissiveIntensity: 1.4 }));
  const railW = F(new MeshBasicMaterial({ color: C.white, opacity: .75 }));
  const railB = F(new MeshBasicMaterial({ color: C.threat }));
  const baseMat = F(new MeshStandardMaterial({ color: C.navy900, metalness: .3, roughness: .8, side: DoubleSide }));

  const textures = items.map((it) => ({ bad: threatTex(it.threat), good: productTex(it.label, it.threat) }));
  const ring = new Group(), spin = new Group(); ring.add(spin); scene.add(ring);
  const mods = [];
  for (let k = 0; k < N; k++) {
    const i = k % items.length, m = new Group(); m.rotation.y = k * ARC; spin.add(m);
    const cap = F(new MeshStandardMaterial({ color: C.redPanel, metalness: .45, roughness: .5, emissive: C.threat, emissiveIntensity: .25 }));
    m.add(new Mesh(moduleGeo, [cap, sideMat]), new LineSegments(edgeGeo, edgeMat));
    const face = F(new MeshBasicMaterial({ map: textures[i].bad }));
    const top = new Mesh(topGeo, face); top.position.set(0, H + .05, R_MID); m.add(top);
    const seam = new Mesh(seamGeo, seamMat); seam.rotation.y = ARC / 2; seam.position.set(R_MID * Math.sin(ARC / 2), H * .5, R_MID * Math.cos(ARC / 2)); spin.add(seam);
    // lock-on beam from the core to this panel
    const beamMat = new MeshBasicMaterial({ color: C.glow, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
    const beam = new Mesh(new CylinderGeometry(.07, .07, R_MID - .3, 8), beamMat); beam.rotation.x = Math.PI / 2; beam.position.set(0, H * .8, (R_MID - .3) / 2 + .15); m.add(beam);
    mods.push({ i, cap, face, beamMat, locked: false });
  }
  const torus = (r, t, mat, y) => { const o = new Mesh(new TorusGeometry(r, t, 8, 160), mat); o.rotation.x = Math.PI / 2; o.position.y = y; ring.add(o); };
  torus(R_IN - .18, .025, railW, H * .25); torus(R_OUT + .2, .022, railW, H * .2); torus(R_OUT + .34, .03, railB, H * .1);
  const base = new Mesh(new RingGeometry(R_IN - .45, R_OUT + .55, 128), baseMat); base.rotation.x = -Math.PI / 2; base.position.y = -.03; ring.add(base);
  const core = new ShaderMaterial({
    transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uAlert: { value: 1 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `varying vec2 vUv; uniform float uTime,uOpacity,uAlert;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
      void main(){ vec2 p=vUv*2.-1.; float r=length(p),a=atan(p.y,p.x); float sw=a+2.6*(1.-r)-uTime*.25;
        float f=fbm(vec2(cos(sw),sin(sw))*r*2.4+vec2(uTime*.05,-uTime*.03));
        vec3 col=mix(vec3(.04,.10,.40),vec3(.18,.52,.72),smoothstep(.15,.85,f*(1.25-r)));
        col=mix(col,vec3(.50,.89,.94),smoothstep(.55,0.,r)*.75); col+=vec3(1.)*pow(smoothstep(.45,0.,r),2.)*.55;
        vec3 red=mix(vec3(.25,.04,.12),vec3(1.,.38,.45),smoothstep(.1,.9,f*(1.25-r)))+vec3(1.,.8,.8)*pow(smoothstep(.45,0.,r),2.)*.4;
        col=mix(col,red,uAlert);
        gl_FragColor=vec4(col,smoothstep(1.,.86,r)*uOpacity); }`,
  });
  const disc = new Mesh(new CircleGeometry(R_IN - .12, 96), core); disc.rotation.x = -Math.PI / 2; disc.position.y = .02; ring.add(disc);

  const red = new Color(C.redPanel), navy = new Color(C.panel), threatC = new Color(C.threat), blueC = new Color(C.blue);
  const setLocked = (i, on) => {
    for (const m of mods) if (m.i === i && m.locked !== on) { m.locked = on; m.face.map = on ? textures[i].good : textures[i].bad; m.face.needsUpdate = true; if (on) m.flash = 1; }
  };

  const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), seg = (t, a, b) => MathUtils.clamp((t - a) / (b - a), 0, 1);
  const START = { pos: new Vector3(0, 5.6, 17.5), up: new Vector3(0, 1, 0) }, END = { pos: new Vector3(0, 21.5, .001), up: new Vector3(0, 0, -1) };
  const pos = new Vector3(), up = new Vector3(), origin = new Vector3();
  let t0 = performance.now() - (reduce ? 1e6 : 0), last = t0, visible = true, raf = 0, settled = false;
  const frame = (now) => {
    raf = 0; const t = (now - t0) / 1000, dt = Math.min((now - last) / 1000, .05); last = now; const time = reduce ? 2 : now / 1000;
    const draw = seg(t, 0, 1.1), solid = ease(seg(t, .9, 2.1)), dive = ease(seg(t, 2.3, 4.2));
    pos.lerpVectors(START.pos, END.pos, dive); up.lerpVectors(START.up, END.up, dive).normalize();
    camera.position.copy(pos); camera.up.copy(up); camera.lookAt(origin);
    for (const [m, b] of fade) m.opacity = b * solid;
    edgeMat.opacity = draw * .9 * (1 - solid * .8);
    // lock-on sequence, repeating every CYCLE seconds
    const c = reduce ? 5 : t < FIRST ? -1 : (t - FIRST) % CYCLE;
    const lockedNow = items.map((_, i) => c >= LOCK_AT[i] && c < RESET);
    lockedNow.forEach((on, i) => setLocked(i, on));
    for (const li of lis) li.classList.toggle('is-locked', li.dataset.lock.split(' ').some((i) => lockedNow[i])); // a product can cover several threats
    const lockedShare = mods.filter((m) => m.locked).length / N;
    for (const m of mods) {
      m.flash = Math.max(0, (m.flash ?? 0) - dt * 1.6);
      m.cap.color.copy(m.locked ? navy : red); m.cap.emissive.copy(m.locked ? blueC : threatC);
      m.cap.emissiveIntensity = m.locked ? .1 + m.flash * .8 : .22 + (reduce ? 0 : .12 * Math.sin(time * 3 + m.i));
      m.beamMat.opacity = m.flash * .9;
    }
    seamMat.color.copy(threatC).lerp(blueC, lockedShare); seamMat.emissive.copy(seamMat.color);
    railB.color.copy(seamMat.color);
    core.uniforms.uAlert.value += ((1 - lockedShare) - core.uniforms.uAlert.value) * Math.min(1, dt * 4);
    if (reduce) core.uniforms.uAlert.value = 0;
    core.uniforms.uTime.value = time; core.uniforms.uOpacity.value = ease(seg(t, 2.6, 4.2));
    coreLight.intensity = core.uniforms.uOpacity.value * 20; coreLight.color.copy(threatC).lerp(new Color(C.glow), lockedShare);
    if (!reduce) spin.rotation.y += .0018;
    if (!settled && t > 4.2) { settled = true; root.classList.add('is-settled'); }
    renderer.render(scene, camera);
    if (visible && !(reduce && settled)) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new ResizeObserver(() => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); kick(); }).observe(canvas);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(root);
}

const start = () => document.querySelectorAll('[data-threat-ring]').forEach(mount);
document.fonts?.load ? document.fonts.load(`700 40px ${FONT}`).then(start, start) : start();
