// tunnel.mjs — All Products page: the packet tunnel (bundled into assets/js/ring-hero.js; run `npm run build` here).
// The 10 product rings line up along one tunnel. Clean packets flow through; each threat is stopped at the ring of the
// product built to catch it, with a callout, an event log and counters (labelled as an illustrative simulation).
// Markup: src/components/packet-tunnel.mjs.
import { AdditiveBlending, AmbientLight, BackSide, BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture, CircleGeometry, CylinderGeometry, DirectionalLight, DoubleSide, EdgesGeometry, ExtrudeGeometry, Group, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Points, PointsMaterial, SRGBColorSpace, Scene, Shape, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer } from 'three';

const FONT = '"Space Grotesk", "Segoe UI", system-ui, sans-serif';

function mount(root) {
  if (root.dataset.mounted) return; root.dataset.mounted = '1';

  /* Products in inspection order. Threat examples come from each product's datasheet capabilities. */
  const P = [
    { id:'ztna',  label:'ZTNA',   name:'Zero Trust Access',     threat:'Device failed posture check', verb:'Denied' },
    { id:'dns',   label:'DNS',    name:'DNS Security',          threat:'Phishing domain',             verb:'Blocked' },
    { id:'fwaas', label:'FWaaS',  name:'Firewall-as-a-Service', threat:'Lateral movement attempt',    verb:'Blocked' },
    { id:'ips',   label:'IPS',    name:'Intrusion Prevention',  threat:'Exploit for an emerging CVE', verb:'Blocked' },
    { id:'swg',   label:'SWG',    name:'Secure Web Gateway',    threat:'Compromised website',         verb:'Blocked' },
    { id:'casb',  label:'CASB',   name:'Cloud Access Security', threat:'Upload to unsanctioned app',  verb:'Blocked' },
    { id:'ai',    label:'AI SEC', name:'AI Security',           threat:'Patient data in an AI prompt',verb:'Redacted' },
    { id:'dlp',   label:'DLP',    name:'Data Loss Prevention',  threat:'PHI leaving the practice',    verb:'Blocked' },
    { id:'siem',  label:'SIEM',   name:'SIEM Platform',         threat:'Anomalous login pattern',     verb:'Flagged' },
    { id:'patch', label:'PATCH',  name:'Patch Management',      threat:'Exploit for a patched flaw',  verb:'Neutralized' },
  ];

  const C = { panel:0x0f1f6e, side:0x0b1752, navy900:0x061040, blue:0x48ABE0, glow:0x7FE3F0, white:0xffffff, threat:0xff5a6a };
  const R_IN=1.55, R_OUT=2.25, R_MID=(R_IN+R_OUT)/2, H=0.42, N=6, SPACE=3.3;
  const ARC=2*Math.PI/N, HALF=(ARC-MathUtils.degToRad(9))/2;
  const X0 = 0, XEND = (P.length-1)*SPACE, SPAWN_X = -7, EXIT_X = XEND + 6;

  /* ---------- renderer ---------- */
  const canvas=root.querySelector('canvas');
  let renderer;
  try { renderer=new WebGLRenderer({canvas,antialias:true,alpha:true}); } catch { return; } // no WebGL: the copy stands alone
  root.classList.add('is-live');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=SRGBColorSpace;
  const scene=new Scene();
  const camera=new PerspectiveCamera(30,2,0.1,300);
  scene.add(new AmbientLight(0xbcd4ff,.6));
  const key=new DirectionalLight(0xffffff,1.5); key.position.set(-6,10,10); scene.add(key);
  const rim=new DirectionalLight(C.blue,.9); rim.position.set(10,-4,-8); scene.add(rim);

  /* ---------- textures ---------- */
  function tex(w,h,draw){ const c=document.createElement('canvas'); c.width=w; c.height=h; draw(c.getContext('2d'),w,h);
    const t=new CanvasTexture(c); t.colorSpace=SRGBColorSpace; t.anisotropy=8; return t; }
  function icon(g,id,x,y,s,col){
    g.save(); g.translate(x,y); g.strokeStyle=col; g.fillStyle=col; g.lineWidth=s*.09; g.lineCap='round'; g.lineJoin='round'; const B=()=>g.beginPath();
    switch(id){
      case 'siem': B(); g.rect(-s*.5,-s*.38,s,s*.66); g.stroke(); B(); g.moveTo(-s*.4,0); g.lineTo(-s*.15,0); g.lineTo(-s*.05,-s*.22); g.lineTo(s*.08,s*.18); g.lineTo(s*.18,-s*.05); g.lineTo(s*.4,-s*.05); g.stroke(); break;
      case 'ips': B(); g.moveTo(0,-s*.48); g.lineTo(s*.4,-s*.32); g.lineTo(s*.36,s*.1); g.quadraticCurveTo(s*.3,s*.36,0,s*.5); g.quadraticCurveTo(-s*.3,s*.36,-s*.36,s*.1); g.lineTo(-s*.4,-s*.32); g.closePath(); g.stroke(); B(); g.moveTo(-s*.18,0); g.lineTo(s*.18,0); g.stroke(); break;
      case 'swg': B(); g.arc(0,0,s*.44,0,7); g.stroke(); B(); g.ellipse(0,0,s*.18,s*.44,0,0,7); g.stroke(); B(); g.moveTo(-s*.44,0); g.lineTo(s*.44,0); g.stroke(); break;
      case 'fwaas': for(let r=0;r<3;r++){ const yy=-s*.36+r*s*.26, off=r%2?s*.2:0; for(let c=-1;c<2;c++){ B(); g.rect(-s*.5+off+c*s*.4+s*.4,yy,s*.36,s*.2); g.stroke(); } } break;
      case 'dns': [[0,-s*.32],[-s*.32,s*.28],[s*.32,s*.28]].forEach(([a,b])=>{B(); g.arc(a,b,s*.11,0,7); g.fill();}); B(); g.moveTo(0,-s*.2); g.lineTo(0,0); g.lineTo(-s*.32,0); g.lineTo(-s*.32,s*.16); g.moveTo(0,0); g.lineTo(s*.32,0); g.lineTo(s*.32,s*.16); g.stroke(); break;
      case 'ztna': B(); g.rect(-s*.34,-s*.05,s*.68,s*.5); g.stroke(); B(); g.arc(0,-s*.05,s*.22,Math.PI,0); g.stroke(); B(); g.arc(0,s*.17,s*.06,0,7); g.fill(); break;
      case 'casb': B(); g.moveTo(-s*.3,s*.25); g.arc(-s*.25,s*.05,s*.2,Math.PI*.5,Math.PI*1.5); g.arc(0,-s*.12,s*.25,Math.PI*1.1,Math.PI*1.95); g.arc(s*.28,s*.06,s*.19,Math.PI*1.5,Math.PI*.5); g.closePath(); g.stroke(); break;
      case 'dlp': B(); g.moveTo(-s*.3,-s*.48); g.lineTo(s*.12,-s*.48); g.lineTo(s*.3,-s*.3); g.lineTo(s*.3,s*.48); g.lineTo(-s*.3,s*.48); g.closePath(); g.stroke(); B(); g.rect(-s*.13,s*.05,s*.26,s*.2); g.fill(); break;
      case 'patch': g.rotate(-Math.PI/4); B(); g.rect(-s*.5,-s*.17,s,s*.34); g.stroke(); B(); g.rect(-s*.15,-s*.17,s*.3,s*.34); g.stroke(); break;
      case 'ai': B(); g.rect(-s*.28,-s*.28,s*.56,s*.56); g.stroke(); for(let i=-1;i<=1;i++){ B(); g.moveTo(i*s*.15,-s*.28); g.lineTo(i*s*.15,-s*.45); g.moveTo(i*s*.15,s*.28); g.lineTo(i*s*.15,s*.45); g.moveTo(-s*.28,i*s*.15); g.lineTo(-s*.45,i*s*.15); g.moveTo(s*.28,i*s*.15); g.lineTo(s*.45,i*s*.15); g.stroke(); }
        g.font=`700 ${s*.2}px ${FONT}`; g.textAlign='center'; g.textBaseline='middle'; g.fillText('AI',0,s*.01); break;
    }
    g.restore();
  }
  const faceTex = p => tex(512,200,(g,w,h)=>{
    const grd=g.createLinearGradient(0,0,0,h); grd.addColorStop(0,'#15287a'); grd.addColorStop(1,'#0c1a5a');
    g.fillStyle=grd; g.fillRect(4,4,w-8,h-8); g.strokeStyle='rgba(108,192,234,.45)'; g.lineWidth=3; g.strokeRect(4,4,w-8,h-8);
    g.fillStyle='rgba(255,255,255,.12)'; for(let i=0;i<6;i++) g.fillRect(w-120+i*16,36,6,h-72);
    ['#7FE3F0','#48ABE0'].forEach((c,i)=>{ g.fillStyle=c; g.beginPath(); g.arc(150,74+i*44,7,0,7); g.fill(); });
    icon(g,p.id,78,h/2,92,'#cfe6ff');
    g.fillStyle='#fff'; g.font=`700 42px ${FONT}`; g.textBaseline='middle'; g.fillText(p.label,182,h/2);
  });

  /* ---------- ring geometry (built in XZ, then turned to face down the tunnel) ---------- */
  function sectorShape(){ const s=new Shape(), c=-Math.PI/2, st=20;
    for(let i=0;i<=st;i++){ const a=c-HALF+2*HALF*i/st; const v=[R_OUT*Math.cos(a),R_OUT*Math.sin(a)]; i?s.lineTo(...v):s.moveTo(...v); }
    for(let i=st;i>=0;i--){ const a=c-HALF+2*HALF*i/st; s.lineTo(R_IN*Math.cos(a),R_IN*Math.sin(a)); } return s; }
  const moduleGeo=new ExtrudeGeometry(sectorShape(),{depth:H,bevelEnabled:true,bevelSize:.03,bevelThickness:.03,bevelSegments:2,curveSegments:20}); moduleGeo.rotateX(-Math.PI/2);
  const edgeGeo=new EdgesGeometry(moduleGeo,25);
  const faceGeo=new PlaneGeometry(1.05,0.42).rotateX(-Math.PI/2);
  const seamGeo=new BoxGeometry(.08,H+.08,R_OUT-R_IN+.14);
  const shieldGeo=new CircleGeometry(R_IN-.04,64);
  const torusGeo=(r,t)=>new TorusGeometry(r,t,8,140);

  const rings = P.map((p,i)=>{
    const g=new Group(), spin=new Group(); g.add(spin);
    const mats=[]; const track=m=>(mats.push(m),m);
    const cap=track(new MeshStandardMaterial({color:C.panel,metalness:.45,roughness:.5,emissive:C.threat,emissiveIntensity:0,transparent:true}));
    const side=track(new MeshStandardMaterial({color:C.side,metalness:.5,roughness:.55,transparent:true}));
    const edge=track(new LineBasicMaterial({color:C.glow,transparent:true,opacity:0}));
    const seam=track(new MeshStandardMaterial({color:C.blue,emissive:C.blue,emissiveIntensity:1.4,transparent:true}));
    const face=track(new MeshBasicMaterial({map:faceTex(p),transparent:true}));
    const railW=track(new MeshBasicMaterial({color:C.white,transparent:true,opacity:.7}));
    const railB=track(new MeshBasicMaterial({color:C.blue,transparent:true}));
    for(let k=0;k<N;k++){
      const m=new Group(); m.rotation.y=k*ARC; spin.add(m);
      m.add(new Mesh(moduleGeo,[cap,side])); m.add(new LineSegments(edgeGeo,edge));
      const f=new Mesh(faceGeo,face); f.position.set(0,H+.04,R_MID); m.add(f);
      const s=new Mesh(seamGeo,seam); s.rotation.y=ARC/2; s.position.set(R_MID*Math.sin(ARC/2),H*.5,R_MID*Math.cos(ARC/2)); spin.add(s);
    }
    const tor=(r,t,mat,y)=>{ const o=new Mesh(torusGeo(r,t),mat); o.rotation.x=Math.PI/2; o.position.y=y; g.add(o); };
    tor(R_IN-.12,.018,railW,H*.3); tor(R_OUT+.14,.02,railW,H*.25); tor(R_OUT+.26,.026,railB,H*.1);
    // threat shield: flashes across the ring opening when this product stops a packet
    const shieldMat=new MeshBasicMaterial({color:C.threat,transparent:true,opacity:0,blending:AdditiveBlending,depthWrite:false,side:DoubleSide});
    const shield=new Mesh(shieldGeo,shieldMat); shield.rotation.x=-Math.PI/2; shield.position.y=H*.5; g.add(shield);
    // turn the ring so its axis runs along +x (faces look back up the tunnel)
    const holder=new Group(); holder.add(g); g.rotation.z=Math.PI/2; holder.position.x=X0+i*SPACE;
    spin.rotation.y = i*0.37; // stagger so the rings don't look stamped
    scene.add(holder);
    return {p,holder,spin,mats,base:mats.map(m=>m.opacity),edge,cap,seam,shieldMat,flash:0,x:holder.position.x};
  });

  /* tunnel glow + flowing stream */
  const glow=new Mesh(new CylinderGeometry(R_IN-.1,R_IN-.1,EXIT_X-SPAWN_X,48,1,true),
    new MeshBasicMaterial({color:C.blue,transparent:true,opacity:0,blending:AdditiveBlending,side:BackSide,depthWrite:false}));
  glow.rotation.z=Math.PI/2; glow.position.x=(EXIT_X+SPAWN_X)/2; scene.add(glow);
  const STREAM=420, sPos=new Float32Array(STREAM*3), sSpd=new Float32Array(STREAM);
  const rIn=()=>{ const a=Math.random()*Math.PI*2, r=Math.sqrt(Math.random())*(R_IN-.35); return [Math.cos(a)*r, Math.sin(a)*r]; };
  for(let i=0;i<STREAM;i++){ const [y,z]=rIn(); sPos.set([SPAWN_X+Math.random()*(EXIT_X-SPAWN_X),y,z],i*3); sSpd[i]=2+Math.random()*3; }
  const sGeo=new BufferGeometry(); sGeo.setAttribute('position',new BufferAttribute(sPos,3));
  const sMat=new PointsMaterial({color:C.glow,size:.035,transparent:true,opacity:0,blending:AdditiveBlending,depthWrite:false});
  scene.add(new Points(sGeo,sMat));

  /* ---------- packets ---------- */
  const pktGeo=new BoxGeometry(.34,.13,.13), haloGeo=new SphereGeometry(.2,12,10);
  const okMat=new MeshBasicMaterial({color:C.glow}), badMat=new MeshBasicMaterial({color:C.threat});
  const okHalo=new MeshBasicMaterial({color:C.glow,transparent:true,opacity:.28,blending:AdditiveBlending,depthWrite:false});
  const badHalo=new MeshBasicMaterial({color:C.threat,transparent:true,opacity:.35,blending:AdditiveBlending,depthWrite:false});
  const pool=[];
  for(let i=0;i<70;i++){
    const g=new Group(), core=new Mesh(pktGeo,okMat), halo=new Mesh(haloGeo,okHalo); halo.scale.set(1.6,.8,.8);
    g.add(core,halo); g.visible=false; scene.add(g); pool.push({g,core,halo,live:false});
  }
  /* sparks for a block */
  const SPARKS=16, bursts=[];
  for(let b=0;b<8;b++){
    const pos=new Float32Array(SPARKS*3), vel=new Float32Array(SPARKS*3);
    const geo=new BufferGeometry(); geo.setAttribute('position',new BufferAttribute(pos,3));
    const mat=new PointsMaterial({color:C.threat,size:.09,transparent:true,opacity:0,blending:AdditiveBlending,depthWrite:false});
    const pts=new Points(geo,mat); scene.add(pts); bursts.push({pos,vel,geo,mat,age:9});
  }
  function burst(x,y,z){
    const b=bursts.find(b=>b.age>1)||bursts[0]; b.age=0;
    for(let i=0;i<SPARKS;i++){ b.pos.set([x,y,z],i*3); const a=Math.random()*Math.PI*2, e=Math.random()*Math.PI;
      b.vel.set([-Math.random()*1.5, Math.cos(a)*Math.sin(e)*2.4, Math.sin(a)*Math.sin(e)*2.4],i*3); }
  }

  /* ---------- labels (HTML, projected) ---------- */
  const labelsEl=root.querySelector('[data-pt="labels"]');
  rings.forEach(r=>{ const el=document.createElement('div'); el.className='packet-tunnel__lbl'; el.innerHTML=`<span class="packet-tunnel__hit"></span><span class="packet-tunnel__name" title="${r.p.name}">${r.p.label}</span>`; labelsEl.appendChild(el); r.el=el; r.hitEl=el.querySelector('.packet-tunnel__hit'); r.hitUntil=0; });
  const v3=new Vector3();
  function placeLabels(w,h){
    rings.forEach(r=>{ v3.set(r.x,R_OUT+.45,0).project(camera); r.el.style.transform=`translate(${(v3.x*.5+.5)*w}px,${(-v3.y*.5+.5)*h}px) translate(-50%,-100%)`; });
  }

  /* ---------- simulation ---------- */
  const nOk=root.querySelector('[data-pt="ok"]'), nBad=root.querySelector('[data-pt="bad"]'), logEl=root.querySelector('[data-pt="log"]');
  let delivered=0, stopped=0, spawnT=0, simTime=0, lastTarget=-1;
  function spawn(){
    const p=pool.find(p=>!p.live); if(!p) return;
    const bad=Math.random()<.32;
    let target=-1; if(bad){ do{ target=Math.floor(Math.random()*P.length); } while(target===lastTarget); lastTarget=target; }
    const [y,z]=rIn();
    Object.assign(p,{live:true,bad,target,state:'fly',v:3.2+Math.random()*1.6,t:0});
    p.g.position.set(SPAWN_X,y,z); p.g.scale.setScalar(1); p.g.visible=true;
    p.core.material=bad?badMat:okMat; p.halo.material=bad?badHalo:okHalo;
  }
  // fill the tunnel so traffic is already flowing when the scene appears
  let seeded=false;
  function seed(){
    for(let i=0;i<22;i++){ spawn(); const p=pool.filter(q=>q.live).pop(); if(!p) break;
      const maxX = p.bad ? rings[p.target].x-1 : EXIT_X-1; p.g.position.x = SPAWN_X + Math.random()*(maxX-SPAWN_X); }
  }
  function block(p){
    const r=rings[p.target]; p.state='die'; p.t=0; r.flash=1; stopped++;
    burst(p.g.position.x,p.g.position.y,p.g.position.z);
    r.hitEl.textContent=`${r.p.verb}: ${r.p.threat}`; r.el.classList.add('is-blocking'); r.hitUntil=simTime+1.6;
    const li=document.createElement('li'); li.innerHTML=`<i></i><span><b>${r.p.name}</b> · ${r.p.threat}</span><em>${r.p.verb}</em>`;
    logEl.prepend(li); while(logEl.children.length>4) logEl.lastChild.remove();
  }
  function step(dt){
    simTime+=dt; spawnT-=dt; if(spawnT<=0){ spawn(); spawnT=.16+Math.random()*.12; }
    for(const p of pool){ if(!p.live) continue;
      if(p.state==='fly'){
        p.g.position.x+=p.v*dt;
        if(p.bad && p.g.position.x>=rings[p.target].x-.5){ p.g.position.x=rings[p.target].x-.5; block(p); }
        else if(p.g.position.x>EXIT_X){ p.live=false; p.g.visible=false; delivered++; }
      } else { p.t+=dt; const k=1-p.t/.35; p.g.scale.setScalar(Math.max(k,0)*1.6+.001); if(p.t>.35){ p.live=false; p.g.visible=false; } }
    }
    for(const b of bursts){ if(b.age>1) continue; b.age+=dt;
      for(let i=0;i<SPARKS*3;i++) b.pos[i]+=b.vel[i]*dt; b.geo.attributes.position.needsUpdate=true; b.mat.opacity=Math.max(0,1-b.age/.7); }
    for(let i=0;i<STREAM;i++){ let x=sPos[i*3]+sSpd[i]*dt; if(x>EXIT_X) x=SPAWN_X; sPos[i*3]=x; } sGeo.attributes.position.needsUpdate=true;
    for(const r of rings){
      r.flash=Math.max(0,r.flash-dt*1.6);
      r.shieldMat.opacity=r.flash*.45; r.cap.emissiveIntensity=r.flash*.9;
      r.seam.emissive.setHex(r.flash>.05?C.threat:C.blue);
      if(r.hitUntil && simTime>r.hitUntil){ r.el.classList.remove('is-blocking'); r.hitUntil=0; }
    }
    nOk.textContent=delivered.toLocaleString(); nBad.textContent=stopped.toLocaleString();
  }

  /* ---------- intro + camera ---------- */
  const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
  const seg=(t,a,b)=>MathUtils.clamp((t-a)/(b-a),0,1);
  const LOOK=new Vector3(XEND*.5-.5,-.7,0);
  const CAM0=new Vector3(XEND*.5+4,16,52), CAM1=new Vector3(-7,5.5,31);
  let t0=null, last=performance.now(), visible=false, raf=0; // the intro starts the first time the section is in view

  function frame(now){
    raf=0; if(t0===null) t0=now-(reduce?1e6:0);
    const t=(now-t0)/1000, dt=Math.min((now-last)/1000,.05); last=now;
    const draw=seg(t,0,1.1), solid=ease(seg(t,.9,2.1)), fly=ease(seg(t,.6,3.6)), live=seg(t,3,4);
    camera.position.lerpVectors(CAM0,CAM1,fly);
    if(!reduce && t>3.6) camera.position.y=CAM1.y+Math.sin(t*.25)*.35; // slow drift
    camera.lookAt(LOOK);
    rings.forEach((r,i)=>{
      const local=seg(solid*1.4-i*.04,0,1);
      r.mats.forEach((m,k)=>m.opacity=r.base[k]*local);
      r.edge.opacity=draw*.85*(1-local*.85);
      if(!reduce) r.spin.rotation.y+=.0015*(i%2?1:-1);
      r.el.classList.toggle('is-on',live>.5);
    });
    glow.material.opacity=.035*live; sMat.opacity=.7*live;
    if(live>0 && !seeded){ seeded=true; seed(); }
    if(live>0 && !reduce) step(dt);
    const w=canvas.clientWidth,h=canvas.clientHeight; placeLabels(w,h);
    renderer.render(scene,camera);
    if(visible && !reduce) raf=requestAnimationFrame(frame);
  }
  function resize(){ const w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h) return; renderer.setSize(w,h,false); camera.aspect=w/h;
    camera.fov = w/h<1.2 ? 44 : 21; camera.updateProjectionMatrix(); if(t0!==null && !raf) raf=requestAnimationFrame(frame); }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e])=>{ visible=e.isIntersecting; if(visible&&!raf){ last=performance.now(); raf=requestAnimationFrame(frame); } }).observe(root);

  if(reduce){ seeded=true; seed(); for(let i=0;i<240;i++) step(1/60); } // reduced motion: show a settled moment, then hold still
  resize();
}

const start = () => document.querySelectorAll('[data-packet-tunnel]').forEach(mount);
document.fonts?.load ? document.fonts.load(`700 42px ${FONT}`).then(start, start) : start();
