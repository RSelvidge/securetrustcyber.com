// kit.js — 3D prop kit for SecureTrust industry threat images (site navy/cyan style, red for threats).
import * as THREE from '../ring-hero/node_modules/three/build/three.module.min.js'; // run `npm install` in tools/ring-hero first
export { THREE };

export const COL = { navy: 0x0a1a65, panel: 0x12267a, deep: 0x061040, blue: 0x48ABE0, glow: 0x7FE3F0, white: 0xffffff, red: 0xff5a6a, amber: 0xffb020, green: 0x3ddc97 };
const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function stage(w = 1280, h = 720) {
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; document.body.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(w, h, false); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  // background: deep navy with a soft glow behind the subject
  const bg = document.createElement('canvas'); bg.width = 512; bg.height = 288; const g = bg.getContext('2d');
  const r = g.createRadialGradient(256, 150, 10, 256, 150, 330); r.addColorStop(0, '#1a3596'); r.addColorStop(.45, '#0c1d6e'); r.addColorStop(1, '#050d3a');
  g.fillStyle = r; g.fillRect(0, 0, 512, 288);
  const t = new THREE.CanvasTexture(bg); t.colorSpace = THREE.SRGBColorSpace; scene.background = t;
  const camera = new THREE.PerspectiveCamera(30, w / h, .1, 400);
  scene.add(new THREE.AmbientLight(0xbcd4ff, .55));
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-6, 12, 9); scene.add(key);
  const rim = new THREE.DirectionalLight(COL.blue, 1.1); rim.position.set(9, 5, -9); scene.add(rim);
  return { renderer, scene, camera, view(pos, look) { camera.position.copy(pos); camera.lookAt(look); } };
}

/* ---------- materials ---------- */
export const mat = {
  panel: (c = COL.panel, o = 1) => new THREE.MeshStandardMaterial({ color: c, metalness: .45, roughness: .45, transparent: o < 1, opacity: o }),
  glass: (c = 0x2a4fc0, o = .18) => new THREE.MeshStandardMaterial({ color: c, metalness: .2, roughness: .25, transparent: true, opacity: o, depthWrite: false, side: THREE.DoubleSide }),
  glow: (c = COL.glow, o = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: o < 1, opacity: o }),
  add: (c = COL.glow, o = .5) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
  emit: (c, i = 1) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: i, metalness: .3, roughness: .4 }),
};
export function edges(mesh, c = COL.glow, o = .75) {
  const l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 25), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o }));
  l.position.copy(mesh.position); l.rotation.copy(mesh.rotation); l.scale.copy(mesh.scale); return l;
}
const G = (...kids) => { const g = new THREE.Group(); kids.forEach((k) => k && g.add(k)); return g; };
export const at = (obj, x = 0, y = 0, z = 0, ry = 0, s = 1) => { obj.position.set(x, y, z); obj.rotation.y = ry; obj.scale.setScalar(s); return obj; };
function boxM(w, h, d, m, x = 0, y = 0, z = 0) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); return b; }
function windowsTex(cols, rows, lit = '#7FE3F0', dark = 'rgba(30,60,160,.6)', redCells = []) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#10226e'; g.fillRect(0, 0, 256, 256);
  const cw = 256 / cols, ch = 256 / rows;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const red = redCells.includes(j * cols + i); g.fillStyle = red ? '#ff5a6a' : (Math.random() < .55 ? lit : dark);
    g.globalAlpha = red ? .95 : .7; g.fillRect(i * cw + cw * .18, j * ch + ch * .2, cw * .64, ch * .55);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/* ---------- ground ---------- */
export function platform(r = 6, c = COL.blue) {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r, .25, 96), mat.panel(COL.deep)); disc.position.y = -.125; g.add(disc);
  const top = new THREE.Mesh(new THREE.CircleGeometry(r - .05, 96), new THREE.MeshStandardMaterial({ color: 0x0c1c64, metalness: .3, roughness: .7 })); top.rotation.x = -Math.PI / 2; top.position.y = .005; g.add(top);
  [[r + .05, .03, c], [r * .78, .015, COL.glow], [r * .45, .012, COL.glow]].forEach(([rr, t, cc], i) => {
    const o = new THREE.Mesh(new THREE.TorusGeometry(rr, t, 8, 160), mat.glow(cc, i ? .35 : 1)); o.rotation.x = Math.PI / 2; o.position.y = .02; g.add(o);
  });
  // faint grid
  const grid = new THREE.PolarGridHelper(r, 12, 6, 64, COL.blue, COL.blue); grid.material.transparent = true; grid.material.opacity = .12; grid.position.y = .01; g.add(grid);
  return g;
}

/* ---------- buildings ---------- */
export function building({ w = 3, d = 2, h = 2.2, roof = 'flat', cols = 6, rows = 4, red = [], tint = COL.panel, clock = false, flag = false, chimney = 0 } = {}) {
  const g = new THREE.Group();
  const tex = windowsTex(cols, rows, '#7FE3F0', 'rgba(30,60,160,.6)', red);
  const side = new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, metalness: .3, roughness: .5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: .55 });
  const plain = mat.panel(tint);
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [side, side, plain, plain, side, side]); body.position.y = h / 2; g.add(body, edges(body));
  if (roof === 'gable') {
    const shape = new THREE.Shape(); shape.moveTo(-w / 2 - .1, 0); shape.lineTo(0, h * .38); shape.lineTo(w / 2 + .1, 0); shape.closePath();
    const rf = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: d + .2, bevelEnabled: false }), mat.panel(0x1a2f8f)); rf.position.set(0, h, -d / 2 - .1); g.add(rf, edges(rf));
  }
  if (roof === 'sawtooth') for (let i = 0; i < 4; i++) {
    const shape = new THREE.Shape(); const x0 = -w / 2 + i * w / 4; shape.moveTo(x0, 0); shape.lineTo(x0 + w / 4, 0); shape.lineTo(x0 + w / 4, h * .28); shape.closePath();
    const rf = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false }), mat.panel(0x1a2f8f)); rf.position.set(0, h, -d / 2); g.add(rf, edges(rf, COL.glow, .5));
  }
  if (roof === 'columns') { // civic building: pediment + columns
    const shape = new THREE.Shape(); shape.moveTo(-w / 2 - .25, 0); shape.lineTo(0, h * .3); shape.lineTo(w / 2 + .25, 0); shape.closePath();
    const rf = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: .5, bevelEnabled: false }), mat.panel(0x1a2f8f)); rf.position.set(0, h + .12, d / 2 + .05); g.add(rf, edges(rf));
    const slab = boxM(w + .5, .14, d + 1.1, mat.panel(0x1a2f8f), 0, h + .06, .3); g.add(slab, edges(slab));
    for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, h, 14), mat.panel(0x2a45b0)); c.position.set(-w / 2 + .1 + i * (w - .2) / 5, h / 2, d / 2 + .75); g.add(c); }
    const step = boxM(w + .7, .12, d + 1.4, mat.panel(0x1a2f8f), 0, .06, .35); g.add(step, edges(step, COL.glow, .5));
  }
  if (clock) { const ct = boxM(.8, 1.1, .8, plain, 0, h + .55 + (roof === 'gable' ? h * .2 : 0), 0); g.add(ct, edges(ct));
    const face = new THREE.Mesh(new THREE.CircleGeometry(.26, 32), mat.glow(COL.glow)); face.position.set(0, ct.position.y + .1, .41); g.add(face); }
  if (flag) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 1.6, 8), mat.glow(COL.white, .8)); pole.position.set(w / 2 + .35, .8, d / 2 + .2); g.add(pole);
    const f = boxM(.5, .3, .02, mat.emit(COL.blue, .6), w / 2 + .62, 1.42, d / 2 + .2); g.add(f); }
  for (let i = 0; i < chimney; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, 1.4, 16), plain); c.position.set(w / 2 - .4 - i * .55, h + .7, -d / 4); g.add(c, edges(c, COL.glow, .4)); }
  return g;
}

/* ---------- devices ---------- */
function screenTex(kind = 'ui', color = '#7FE3F0') {
  const c = document.createElement('canvas'); c.width = 256; c.height = 160; const g = c.getContext('2d');
  g.fillStyle = kind === 'red' ? '#3a0d20' : '#0c2a6e'; g.fillRect(0, 0, 256, 160);
  if (kind === 'red') { // ransom screen with a lock
    g.strokeStyle = '#ff5a6a'; g.lineWidth = 10; g.beginPath(); g.arc(128, 62, 24, Math.PI, 0); g.stroke(); g.fillStyle = '#ff5a6a'; g.fillRect(96, 62, 64, 52);
    g.fillStyle = '#3a0d20'; g.beginPath(); g.arc(128, 84, 8, 0, 7); g.fill(); g.fillRect(124, 84, 8, 18);
  } else if (kind === 'login') {
    g.fillStyle = 'rgba(127,227,240,.8)'; g.fillRect(70, 52, 116, 14); g.fillRect(70, 76, 116, 14); g.fillStyle = color; g.fillRect(96, 104, 64, 18);
  } else if (kind === 'chart') {
    g.strokeStyle = color; g.lineWidth = 6; g.beginPath(); g.moveTo(20, 130); [40, 100, 60, 115, 90, 95, 120, 105, 150, 40, 180, 30, 210, 90, 236, 110].forEach((v, i, a) => i % 2 || g.lineTo(v, a[i + 1])); g.stroke();
  } else { for (let i = 0; i < 6; i++) { g.fillStyle = i % 3 ? 'rgba(127,227,240,.55)' : color; g.fillRect(24, 22 + i * 21, 60 + ((i * 53) % 150), 10); } }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function device(kind = 'laptop', { screen = 'ui', color = '#7FE3F0' } = {}) {
  const g = new THREE.Group(), body = mat.panel(0x1d3496);
  const scr = new THREE.MeshBasicMaterial({ map: screenTex(screen, color) });
  if (kind === 'laptop') {
    const base = boxM(1.3, .07, .9, body, 0, .035, 0); const lid = new THREE.Group();
    const lidM = boxM(1.3, .85, .05, body, 0, .425, 0), s = new THREE.Mesh(new THREE.PlaneGeometry(1.18, .74), scr); s.position.set(0, .425, .03);
    lid.add(lidM, s, edges(lidM)); lid.position.set(0, .07, -.43); lid.rotation.x = -.25; g.add(base, edges(base), lid);
  } else if (kind === 'phone' || kind === 'tablet') {
    const [w, h] = kind === 'phone' ? [.42, .82] : [.85, 1.15];
    const b = boxM(w, h, .06, body, 0, h / 2, 0); const s = new THREE.Mesh(new THREE.PlaneGeometry(w * .86, h * .86), scr); s.position.set(0, h / 2, .035); g.add(b, s, edges(b));
    g.rotation.x = -.2;
  } else if (kind === 'monitor') {
    const b = boxM(1.6, 1, .07, body, 0, 1.05, 0); const s = new THREE.Mesh(new THREE.PlaneGeometry(1.48, .88), scr); s.position.set(0, 1.05, .04);
    const st = boxM(.12, .5, .12, body, 0, .3, -.02), ft = boxM(.6, .05, .4, body, 0, .025, 0); g.add(b, s, st, ft, edges(b));
  } else if (kind === 'server' || kind === 'rack') {
    const h = kind === 'rack' ? 2.4 : 1.3, b = boxM(.9, h, .9, body, 0, h / 2, 0); g.add(b, edges(b));
    for (let i = 0; i < (kind === 'rack' ? 9 : 4); i++) { const led = boxM(.6, .05, .02, mat.glow(i % 4 === 3 && screen === 'red' ? COL.red : COL.glow, .9), 0, .25 + i * .24, .46); g.add(led); }
  } else if (kind === 'pos') {
    const b = boxM(.9, .5, .7, body, 0, .25, 0); const s = boxM(.8, .55, .05, body, 0, .8, -.15); s.rotation.x = -.35;
    const sc = new THREE.Mesh(new THREE.PlaneGeometry(.7, .45), scr); sc.position.set(0, .8, -.12); sc.rotation.x = -.35; g.add(b, s, sc, edges(b));
  } else if (kind === 'plc') { // industrial controller cabinet
    const b = boxM(1, 1.6, .6, mat.panel(0x22357f), 0, .8, 0); g.add(b, edges(b, COL.glow, .6));
    for (let i = 0; i < 3; i++) g.add(boxM(.7, .18, .03, mat.glow(screen === 'red' && i === 1 ? COL.red : COL.glow, .8), 0, 1.25 - i * .32, .31));
  } else if (kind === 'robot') { // robotic arm
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.35, .45, .3, 24), body); base.position.y = .15;
    const a1 = boxM(.22, 1.2, .22, body, 0, .85, 0); a1.rotation.z = .35;
    const a2 = boxM(.18, .9, .18, body, .55, 1.55, 0); a2.rotation.z = -1.1;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(.12, 16, 12), mat.emit(screen === 'red' ? COL.red : COL.glow, .9)); tip.position.set(.95, 1.4, 0);
    g.add(base, a1, a2, tip, edges(a1), edges(a2));
  }
  return g;
}

/* ---------- security symbols ---------- */
export function lock(c = COL.red, s = 1) {
  const g = new THREE.Group(), m = mat.emit(c, .9);
  const body = new THREE.Mesh(new THREE.BoxGeometry(.9, .75, .32), m); body.position.y = .38;
  const sh = new THREE.Mesh(new THREE.TorusGeometry(.3, .07, 12, 32, Math.PI), m); sh.position.y = .75;
  const hole = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .34, 12), mat.glow(0x2a0a1a)); hole.rotation.x = Math.PI / 2; hole.position.set(0, .42, .01);
  g.add(body, sh, hole);
  const halo = new THREE.Mesh(new THREE.CircleGeometry(.95, 48), mat.add(c, .18)); halo.position.set(0, .45, -.2); g.add(halo);
  g.scale.setScalar(s); return g;
}
export function shield(c = COL.blue, s = 1, check = true) {
  const sh = new THREE.Shape(), k = 1;
  sh.moveTo(0, .55 * k); sh.lineTo(.46 * k, .38 * k); sh.lineTo(.42 * k, -.08 * k); sh.quadraticCurveTo(.34 * k, -.42 * k, 0, -.6 * k); sh.quadraticCurveTo(-.34 * k, -.42 * k, -.42 * k, -.08 * k); sh.lineTo(-.46 * k, .38 * k); sh.closePath();
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .14, bevelEnabled: true, bevelSize: .03, bevelThickness: .03, bevelSegments: 2 }), mat.emit(c, .55));
  const g = new THREE.Group(); g.add(m, edges(m, COL.glow, .9));
  if (check) { const pts = [V(-.18, 0, .2), V(-.04, -.15, .2), V(.2, .15, .2)]; const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0), 16, .035, 8), mat.glow(COL.white)); g.add(t); }
  const halo = new THREE.Mesh(new THREE.CircleGeometry(.95, 48), mat.add(c, .16)); halo.position.z = -.1; g.add(halo);
  g.scale.setScalar(s); return g;
}
export function warn(s = 1) { // red warning triangle
  const sh = new THREE.Shape(); sh.moveTo(0, .5); sh.lineTo(.5, -.38); sh.lineTo(-.5, -.38); sh.closePath();
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .08, bevelEnabled: false }), mat.emit(COL.red, .8));
  const bar = boxM(.08, .32, .1, mat.glow(0x2a0a1a), 0, .02, .06), dot = boxM(.08, .08, .1, mat.glow(0x2a0a1a), 0, -.24, .06);
  const g = G(m, bar, dot); g.scale.setScalar(s); return g;
}
/** SecureTrust ring gate: hero-style ring standing upright (axis along z) */
export function ringGate(r = 1.6, c = COL.blue, { flat = false } = {}) {
  const g = new THREE.Group(), N = 8;
  for (let k = 0; k < N; k++) {
    const a0 = k / N * Math.PI * 2 + .04, a1 = (k + 1) / N * Math.PI * 2 - .04;
    const sh = new THREE.Shape(); const steps = 10;
    for (let i = 0; i <= steps; i++) { const a = a0 + (a1 - a0) * i / steps; i ? sh.lineTo(Math.cos(a) * (r + .35), Math.sin(a) * (r + .35)) : sh.moveTo(Math.cos(a) * (r + .35), Math.sin(a) * (r + .35)); }
    for (let i = steps; i >= 0; i--) { const a = a0 + (a1 - a0) * i / steps; sh.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .35, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 1 }), mat.panel(0x12267a));
    g.add(m, edges(m, c, .8));
  }
  [r - .1, r + .48].forEach((rr, i) => { const t = new THREE.Mesh(new THREE.TorusGeometry(rr, i ? .03 : .02, 8, 120), mat.glow(i ? c : COL.white, i ? 1 : .7)); t.position.z = .17; g.add(t); });
  const core = new THREE.Mesh(new THREE.CircleGeometry(r - .12, 64), mat.add(c, .14)); core.position.z = .17; g.add(core);
  if (flat) g.rotation.x = -Math.PI / 2;
  return g;
}
/** glowing segmentation wall */
export function wall(len = 4, h = 1.6, c = COL.blue) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(len, h), mat.add(c, .16)); m.position.y = h / 2;
  const top = boxM(len, .05, .05, mat.glow(c), 0, h, 0), bot = boxM(len, .05, .05, mat.glow(c, .8), 0, .03, 0);
  const g = G(m, top, bot);
  for (let i = 0; i <= 4; i++) g.add(boxM(.03, h, .03, mat.glow(c, .7), -len / 2 + i * len / 4, h / 2, 0));
  return g;
}
/** curved data arc between two points, with packets */
export function arc(a, b, { c = COL.glow, lift = 2, packets = 4, r = .035, pc } = {}) {
  const mid = a.clone().lerp(b, .5); mid.y += lift;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r, 8), mat.glow(c, .75)));
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r * 3.5, 8), mat.add(c, .12)));
  for (let i = 0; i < packets; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(r * 3, 12, 10), mat.glow(pc ?? (c === COL.red ? 0xffb0b8 : 0xdffbff))); p.position.copy(curve.getPoint((i + .5) / packets)); g.add(p); }
  return g;
}
export function globe(r = 2, c = COL.blue) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32), mat.panel(0x0c1d6e, .92)));
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(r * 1.002, 24, 16)), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .35 })); g.add(wire);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r * 1.15, 32, 24), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .07, side: THREE.BackSide, blending: THREE.AdditiveBlending })));
  return g;
}
export function pylon(h = 3.2, c = COL.glow) {
  const pts = [], w0 = .55, w1 = .12, lv = [0, h * .35, h * .65, h];
  const corner = (y) => { const w = w0 + (w1 - w0) * (y / h); return [[-w, -w], [w, -w], [w, w], [-w, w]].map(([x, z]) => V(x, y, z)); };
  const levels = lv.map(corner);
  for (let i = 0; i < 4; i++) for (let l = 0; l < levels.length - 1; l++) { pts.push(levels[l][i], levels[l + 1][i], levels[l][i], levels[l + 1][(i + 1) % 4]); }
  levels.forEach((L) => { for (let i = 0; i < 4; i++) pts.push(L[i], L[(i + 1) % 4]); });
  [h * .65, h * .88].forEach((y) => pts.push(V(-1.1, y, 0), V(1.1, y, 0)));
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const g = G(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .9 })));
  [-1.05, 1.05].forEach((x) => [h * .65, h * .88].forEach((y) => { const ins = new THREE.Mesh(new THREE.SphereGeometry(.07, 10, 8), mat.glow(COL.glow)); ins.position.set(x, y - .08, 0); g.add(ins); }));
  return g;
}
export function envelope(c = COL.panel, edge = COL.glow) {
  const b = boxM(1, .62, .06, mat.panel(c), 0, .31, 0); const g = G(b, edges(b, edge, .9));
  const pts = [V(-.5, .62, .04), V(0, .28, .04), V(.5, .62, .04)]; g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: edge })));
  return g;
}
export function hook(c = COL.red) {
  const pts = [V(0, 1, 0), V(0, .2, 0), V(-.05, .02, 0), V(-.22, -.04, 0), V(-.34, .08, 0), V(-.3, .24, 0)];
  const g = G(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, .045, 8), mat.emit(c, .9)));
  const line = new THREE.Mesh(new THREE.CylinderGeometry(.01, .01, 3, 6), mat.glow(c, .6)); line.position.y = 2.5; g.add(line); return g;
}
export function doc(c = COL.panel, lines = COL.glow) {
  const b = boxM(.7, .92, .04, mat.panel(c), 0, .46, 0); const g = G(b, edges(b, COL.glow, .8));
  for (let i = 0; i < 5; i++) g.add(boxM(.46 - (i % 2) * .12, .04, .01, mat.glow(lines, .8), -.04, .74 - i * .13, .03));
  return g;
}
export function flask(c = COL.glow) {
  const pts = [V(.06, 0, 0), V(.5, 0, 0), V(.52, .05, 0), V(.16, .62, 0), V(.16, 1, 0), V(.2, 1.04, 0)].map((p) => new THREE.Vector2(p.x, p.y));
  const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), mat.glass(0x3a6fe0, .45));
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(.27, .47, .32, 32), mat.emit(c, .8)); liquid.position.y = .18;
  return G(m, liquid);
}
export function cloud(c = COL.panel, edge = COL.glow, s = 1) {
  const g = new THREE.Group(), m = mat.panel(c);
  [[0, 0, .55], [.55, -.1, .42], [-.55, -.12, .4], [.25, .3, .42]].forEach(([x, y, r]) => { const b = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), m); b.position.set(x, y, 0); g.add(b); });
  const base = boxM(1.6, .5, .8, m, 0, -.3, 0); g.add(base);
  const out = new THREE.Mesh(new THREE.TorusGeometry(.9, .015, 6, 64), mat.glow(edge, .5)); out.scale.set(1.1, .6, 1); g.add(out);
  g.scale.setScalar(s); return g;
}
export function database(c = COL.panel, s = 1) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) { const d = new THREE.Mesh(new THREE.CylinderGeometry(.7, .7, .42, 40), mat.panel(c)); d.position.y = .22 + i * .48; g.add(d, edges(d, COL.glow, .5));
    const band = new THREE.Mesh(new THREE.TorusGeometry(.7, .02, 6, 64), mat.glow(COL.glow, .9)); band.rotation.x = Math.PI / 2; band.position.y = .44 + i * .48; g.add(band); }
  g.scale.setScalar(s); return g;
}
export function packageBox(c = COL.panel, edge = COL.glow, s = .7) {
  const b = boxM(1, 1, 1, mat.panel(c), 0, .5, 0); const g = G(b, edges(b, edge, .9));
  g.add(boxM(1.02, .12, .2, mat.glow(edge, .7), 0, 1, 0)); g.scale.setScalar(s); return g;
}
export function card(c = 0x1d3496) {
  const b = boxM(1.2, .76, .04, mat.panel(c), 0, 0, 0); const g = G(b, edges(b, COL.glow, .9));
  g.add(boxM(.24, .18, .01, mat.emit(COL.amber, .6), -.36, .08, .03), boxM(.9, .06, .01, mat.glow(COL.glow, .7), 0, -.18, .03)); return g;
}
export function bag(c = COL.blue) {
  const b = boxM(.8, .9, .4, mat.panel(0x1d3496), 0, .45, 0); const g = G(b, edges(b, c, .9));
  const h = new THREE.Mesh(new THREE.TorusGeometry(.2, .03, 8, 24, Math.PI), mat.glow(c)); h.position.y = .9; g.add(h); return g;
}
export function cart(c = COL.glow) {
  const pts = [[-.6, .9, -.3], [-.45, .25, -.3], [.55, .25, -.3], [.65, .75, -.3], [-.55, .75, -.3]];
  const g = new THREE.Group();
  [-.3, .3].forEach((z) => { const p = pts.map(([x, y]) => V(x, y, z)); g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([...p, p[0]]), new THREE.LineBasicMaterial({ color: c }))); });
  const basket = boxM(1.05, .45, .6, mat.add(c, .14), .05, .5, 0); g.add(basket);
  [[-.4, .3], [-.4, -.3], [.45, .3], [.45, -.3]].forEach(([x, z]) => { const w = new THREE.Mesh(new THREE.TorusGeometry(.08, .025, 8, 16), mat.glow(c)); w.position.set(x, .08, z); g.add(w); });
  return g;
}
export function gear(c = COL.glow, s = 1) {
  const sh = new THREE.Shape(), T = 10;
  for (let i = 0; i < T * 2; i++) { const a = i / (T * 2) * Math.PI * 2, r = i % 2 ? .5 : .62; const a2 = a + Math.PI / (T * 2); i ? sh.lineTo(Math.cos(a) * r, Math.sin(a) * r) : sh.moveTo(Math.cos(a) * r, Math.sin(a) * r); sh.lineTo(Math.cos(a2) * r, Math.sin(a2) * r); }
  const hole = new THREE.Path(); hole.absarc(0, 0, .2, 0, Math.PI * 2, true); sh.holes.push(hole);
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .14, bevelEnabled: false }), mat.emit(c, .45));
  const g = G(m, edges(m, COL.glow, .8)); g.scale.setScalar(s); return g;
}
export function bars(values, { c = COL.glow, spike = -1, w = .32, gap = .14 } = {}) {
  const g = new THREE.Group();
  values.forEach((v, i) => { const isS = i === spike; const b = boxM(w, v, w, isS ? mat.emit(COL.amber, .7) : mat.emit(c, .35), i * (w + gap), v / 2, 0); g.add(b, edges(b, isS ? COL.amber : COL.glow, .8)); });
  return g;
}
export function node(c = COL.glow, r = .28) { // network node
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat.emit(c, .7)); return G(m, edges(m, COL.white, .4), new THREE.Mesh(new THREE.SphereGeometry(r * 1.9, 16, 12), mat.add(c, .1)));
}
export function line3(a, b, c = COL.glow, o = .7, r = .025) {
  const d = b.clone().sub(a), len = d.length(); const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), mat.glow(c, o));
  m.position.copy(a).addScaledVector(d, .5); m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize()); return m;
}
export function dome(r = 2.5, c = COL.blue) { // protective shield dome
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), mat.add(c, .1));
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(r, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2)), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .28 }));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(r, .03, 8, 120), mat.glow(c)); rim.rotation.x = Math.PI / 2;
  return G(m, wire, rim);
}
export function sparks(center, n = 40, c = COL.red, spread = 1.5) {
  const pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const v = V(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize().multiplyScalar(Math.random() * spread); pos.set([center.x + v.x, center.y + v.y, center.z + v.z], i * 3); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ color: c, size: .07, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }));
}
export function glowLight(scene, c, pos, i = 6, d = 10) { const l = new THREE.PointLight(c, i, d, 1.6); l.position.copy(pos); scene.add(l); return l; }
export { V };
