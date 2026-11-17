// practice.mjs — Healthcare industry hero: a live map of a dental practice (bundled into assets/js/ring-hero.js; run `npm run build` here).
// Rooms and devices of a practice, each device with its own tunnel up to SecureTrust. Practice traffic flows through it,
// and threats from the healthcare page's threat landscape are stopped there by the product built for each one.
// Markup: the 'practice' variant in src/components/hero.mjs.
import { AdditiveBlending, AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture, CircleGeometry, DirectionalLight, DoubleSide, EdgesGeometry, ExtrudeGeometry, Group, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Points, PointsMaterial, SRGBColorSpace, Scene, ShaderMaterial, Shape, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer } from 'three';

const FONT = '"Space Grotesk", "Segoe UI", system-ui, sans-serif';

function mount(root) {
  const C={panel:0x0f1f6e,side:0x0b1752,floor:0x0a1650,room:0x10226e,blue:0x48ABE0,glow:0x7FE3F0,white:0xffffff,threat:0xff5a6a};

  const canvas=root.querySelector('canvas');
  let renderer;
  try { renderer=new WebGLRenderer({canvas,antialias:true,alpha:true}); } catch { return; } // no WebGL: the hero text stands alone
  root.classList.add('is-live');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=SRGBColorSpace;
  const scene=new Scene(), camera=new PerspectiveCamera(30,1,.1,300);
  scene.add(new AmbientLight(0xbcd4ff,.65));
  const key=new DirectionalLight(0xffffff,1.4); key.position.set(-8,16,10); scene.add(key);
  const rim=new DirectionalLight(C.blue,.8); rim.position.set(10,6,-10); scene.add(rim);
  const fade=[], F=m=>{ m.transparent=true; fade.push([m,m.opacity]); m.opacity=0; return m; };
  const edges=[]; const E=m=>{ m.transparent=true; edges.push([m,m.opacity]); m.opacity=0; return m; };
  function tex(w,h,draw){ const c=document.createElement('canvas'); c.width=w; c.height=h; draw(c.getContext('2d'),w,h); const t=new CanvasTexture(c); t.colorSpace=SRGBColorSpace; t.anisotropy=8; return t; }

  /* ---------- practice floor plan ---------- */
  const floor=new Mesh(new BoxGeometry(17.2,.3,12.2),F(new MeshStandardMaterial({color:C.floor,metalness:.3,roughness:.8})));
  floor.position.y=-.15; scene.add(floor);
  const fEdge=new LineSegments(new EdgesGeometry(floor.geometry),E(new LineBasicMaterial({color:C.blue,opacity:.6}))); fEdge.position.copy(floor.position); scene.add(fEdge);
  // rooms: [id, name, x0, z0, x1, z1]
  const ROOMS=[
    ['op1','Operatory 1',-8.2,-5.7,-4.3,-.6], ['op2','Operatory 2',-4.1,-5.7,-.2,-.6], ['img','Imaging',0,-5.7,4.4,-.6], ['srv','Server room',4.6,-5.7,8.2,-.6],
    ['wait','Waiting room',-8.2,.6,-3.3,5.7], ['front','Front desk',-3.1,.6,1.5,5.7], ['office','Business office',1.7,.6,8.2,5.7],
  ];
  const room={};
  for(const [id,name,x0,z0,x1,z1] of ROOMS){
    const w=x1-x0, d=z1-z0, cx=(x0+x1)/2, cz=(z0+z1)/2;
    const tile=new Mesh(new BoxGeometry(w,.04,d),F(new MeshStandardMaterial({color:C.room,metalness:.25,roughness:.75}))); tile.position.set(cx,.02,cz); scene.add(tile);
    const wallGeo=new BoxGeometry(w,.75,d);
    const glass=new Mesh(wallGeo,F(new MeshStandardMaterial({color:0x2a4fc0,metalness:.2,roughness:.3,opacity:.12,depthWrite:false,side:DoubleSide}))); glass.position.set(cx,.4,cz); scene.add(glass);
    const lineMat=E(new LineBasicMaterial({color:C.glow,opacity:.7}));
    const l=new LineSegments(new EdgesGeometry(wallGeo),lineMat); l.position.copy(glass.position); scene.add(l);
    room[id]={id,name,center:new Vector3(cx,.9,cz),lineMat,x0,z0,x1,z1};
  }

  /* ---------- SecureTrust engine hovering above the practice ---------- */
  const HUB_Y=6.2, R_IN=1.35,R_OUT=2.05,H=.42,N=6,ARC=2*Math.PI/N,HALF=(ARC-MathUtils.degToRad(9))/2,R_MID=(R_IN+R_OUT)/2;
  function sector(){ const s=new Shape(),c=-Math.PI/2,st=20;
    for(let i=0;i<=st;i++){ const a=c-HALF+2*HALF*i/st; const v=[R_OUT*Math.cos(a),R_OUT*Math.sin(a)]; i?s.lineTo(...v):s.moveTo(...v); }
    for(let i=st;i>=0;i--){ const a=c-HALF+2*HALF*i/st; s.lineTo(R_IN*Math.cos(a),R_IN*Math.sin(a)); } return s; }
  const modGeo=new ExtrudeGeometry(sector(),{depth:H,bevelEnabled:true,bevelSize:.03,bevelThickness:.03,bevelSegments:2,curveSegments:20}); modGeo.rotateX(-Math.PI/2);
  const face=tex(512,200,(g,w,h)=>{ const grd=g.createLinearGradient(0,0,0,h); grd.addColorStop(0,'#15287a'); grd.addColorStop(1,'#0c1a5a'); g.fillStyle=grd; g.fillRect(4,4,w-8,h-8);
    g.strokeStyle='rgba(108,192,234,.45)'; g.lineWidth=3; g.strokeRect(4,4,w-8,h-8);
    g.save(); g.translate(70,h/2); g.strokeStyle='#cfe6ff'; g.lineWidth=8; g.beginPath(); const s=80; g.moveTo(0,-s*.48); g.lineTo(s*.4,-s*.32); g.lineTo(s*.36,s*.1); g.quadraticCurveTo(s*.3,s*.36,0,s*.5); g.quadraticCurveTo(-s*.3,s*.36,-s*.36,s*.1); g.lineTo(-s*.4,-s*.32); g.closePath(); g.stroke(); g.restore();
    g.fillStyle='#fff'; g.font=`700 38px ${FONT}`; g.textBaseline='middle'; g.fillText('SecureTrust',128,h/2); });
  const hub=new Group(), hubSpin=new Group(); hub.add(hubSpin); hub.position.y=HUB_Y; scene.add(hub);
  const hubCap=F(new MeshStandardMaterial({color:C.panel,metalness:.45,roughness:.5,emissive:C.threat,emissiveIntensity:0}));
  const hubSide=F(new MeshStandardMaterial({color:C.side,metalness:.5,roughness:.55}));
  const hubSeam=F(new MeshStandardMaterial({color:C.blue,emissive:C.blue,emissiveIntensity:1.4}));
  const faceMat=F(new MeshBasicMaterial({map:face}));
  const hubEdge=E(new LineBasicMaterial({color:C.glow,opacity:.8}));
  for(let k=0;k<N;k++){ const m=new Group(); m.rotation.y=k*ARC; hubSpin.add(m);
    m.add(new Mesh(modGeo,[hubCap,hubSide]), new LineSegments(new EdgesGeometry(modGeo,25),hubEdge));
    const f=new Mesh(new PlaneGeometry(1.0,.4).rotateX(-Math.PI/2),faceMat); f.position.set(0,H+.04,R_MID); m.add(f);
    const s=new Mesh(new BoxGeometry(.08,H+.08,R_OUT-R_IN+.14),hubSeam); s.rotation.y=ARC/2; s.position.set(R_MID*Math.sin(ARC/2),H*.5,R_MID*Math.cos(ARC/2)); hubSpin.add(s); }
  const torus=(r,t,m,y)=>{ const o=new Mesh(new TorusGeometry(r,t,8,140),m); o.rotation.x=Math.PI/2; o.position.y=y; hub.add(o); };
  torus(R_IN-.12,.018,F(new MeshBasicMaterial({color:C.white,opacity:.7})),H*.3);
  torus(R_OUT+.16,.02,F(new MeshBasicMaterial({color:C.white,opacity:.7})),H*.25);
  torus(R_OUT+.34,.026,F(new MeshBasicMaterial({color:C.blue})),H*.1);
  const coreMat=new ShaderMaterial({transparent:true,depthWrite:false,side:DoubleSide,uniforms:{uTime:{value:0},uOpacity:{value:0},uAlert:{value:0}},
    vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader:`varying vec2 vUv; uniform float uTime,uOpacity,uAlert;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
      void main(){ vec2 p=vUv*2.-1.; float r=length(p),a=atan(p.y,p.x); float sw=a+2.6*(1.-r)-uTime*.25;
        float f=fbm(vec2(cos(sw),sin(sw))*r*2.4+vec2(uTime*.05,-uTime*.03));
        vec3 col=mix(vec3(.04,.10,.40),vec3(.18,.52,.72),smoothstep(.15,.85,f*(1.25-r)));
        col=mix(col,vec3(.50,.89,.94),smoothstep(.55,0.,r)*.75); col+=vec3(1.)*pow(smoothstep(.45,0.,r),2.)*.55;
        col=mix(col,vec3(1.,.35,.42)*(.6+f),uAlert*.5);
        gl_FragColor=vec4(col,smoothstep(1.,.86,r)*uOpacity); }`});
  const core=new Mesh(new CircleGeometry(R_IN-.1,96),coreMat); core.rotation.x=-Math.PI/2; core.position.y=.05; hub.add(core);
  const coreLight=new PointLight(C.glow,0,14,1.4); coreLight.position.set(0,HUB_Y-.5,0); scene.add(coreLight);
  const HUB_IN=new Vector3(0,HUB_Y+.2,0);

  /* ---------- devices, each with its own tunnel up to SecureTrust ---------- */
  const DEVICES=[
    ['op1a','Operatory 1 PC','op1','pc',-6.2,-3.2], ['op2a','Operatory 2 PC','op2','pc',-2.2,-3.2],
    ['xr','X-ray sensor PC','img','pc',1.2,-3.4], ['cbct','CBCT scanner','img','scanner',3.2,-2.6],
    ['pms','Practice management server','srv','server',6.4,-3.2],
    ['g1','Guest phone','wait','phone',-6.6,3.6], ['g2','Guest tablet','wait','phone',-4.8,2.4],
    ['fd1','Front desk PC 1','front','pc',-1.9,3.4], ['fd2','Front desk PC 2','front','pc',.3,3.4],
    ['bo','Billing laptop','office','pc',4.9,3.2],
  ];
  const dev={}; const tGeo=new TorusGeometry(.2,.018,6,36);
  for(const [id,label,rid,kind,x,z] of DEVICES){
    const size={pc:[.7,.4,.5],server:[.65,.95,.65],scanner:[.85,.6,.85],phone:[.3,.16,.5]}[kind];
    const mat=F(new MeshStandardMaterial({color:0x1a2f8f,metalness:.4,roughness:.45,emissive:C.blue,emissiveIntensity:.25}));
    const box=new Mesh(new BoxGeometry(...size),mat); box.position.set(x,.05+size[1]/2,z); scene.add(box);
    const screenMat=F(new MeshBasicMaterial({color:C.glow,opacity:.9}));
    const scr=new Mesh(new PlaneGeometry(size[0]*.7,size[2]*.55).rotateX(-Math.PI/2),screenMat); scr.position.set(x,box.position.y+size[1]/2+.01,z); scene.add(scr);
    const pos=new Vector3(x,box.position.y+size[1]/2+.05,z);
    const az=Math.atan2(z,x); const dock=new Vector3(Math.cos(az)*R_MID,HUB_Y-.05,Math.sin(az)*R_MID);
    const ringMat=F(new MeshBasicMaterial({color:C.glow,opacity:.55,blending:AdditiveBlending,depthWrite:false}));
    const ringsArr=[]; const len=pos.distanceTo(dock);
    for(let t=.5;t<len-.2;t+=.7){ const r=new Mesh(tGeo,ringMat); r.position.lerpVectors(pos,dock,t/len); r.lookAt(dock); r.userData.k=t/len; scene.add(r); ringsArr.push(r); }
    dev[id]={id,label,room:room[rid],pos,dock,mat,screenMat,ringMat,rings:ringsArr,flash:0};
  }

  /* ---------- packets ---------- */
  const pktGeo=new BoxGeometry(.22,.1,.1), haloGeo=new SphereGeometry(.15,12,10);
  const M={ok:new MeshBasicMaterial({color:C.glow}),bad:new MeshBasicMaterial({color:C.threat}),
    okH:new MeshBasicMaterial({color:C.glow,transparent:true,opacity:.3,blending:AdditiveBlending,depthWrite:false}),
    badH:new MeshBasicMaterial({color:C.threat,transparent:true,opacity:.4,blending:AdditiveBlending,depthWrite:false})};
  const pool=[]; for(let i=0;i<50;i++){ const g=new Group(),c=new Mesh(pktGeo,M.ok),h=new Mesh(haloGeo,M.okH); h.scale.set(1.6,.8,.8); g.add(c,h); g.visible=false; scene.add(g); pool.push({g,c,h,live:false}); }
  const shield=new Mesh(new CircleGeometry(.5,40),new MeshBasicMaterial({color:C.threat,transparent:true,opacity:0,blending:AdditiveBlending,depthWrite:false,side:DoubleSide})); scene.add(shield);
  let shieldFlash=0, hubFlash=0;
  const SP=18, bursts=[]; for(let b=0;b<5;b++){ const pos=new Float32Array(SP*3),vel=new Float32Array(SP*3),geo=new BufferGeometry(); geo.setAttribute('position',new BufferAttribute(pos,3));
    const mat=new PointsMaterial({color:C.threat,size:.11,transparent:true,opacity:0,blending:AdditiveBlending,depthWrite:false}); scene.add(new Points(geo,mat)); bursts.push({pos,vel,geo,mat,age:9}); }
  function burst(p,dir){ const b=bursts.find(b=>b.age>1)||bursts[0]; b.age=0;
    for(let i=0;i<SP;i++){ b.pos.set([p.x,p.y,p.z],i*3); const r=new Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(1.3).addScaledVector(dir,-1.4); b.vel.set([r.x,r.y,r.z],i*3); } }
  function launch(path,bad,onEnd){
    const p=pool.find(p=>!p.live); if(!p) return;
    const lens=[0]; for(let i=1;i<path.length;i++) lens.push(lens[i-1]+path[i].distanceTo(path[i-1]));
    Object.assign(p,{live:true,bad,path,lens,d:0,v:bad?4.2:5+Math.random(),state:'fly',t:0,onEnd});
    p.c.material=bad?M.bad:M.ok; p.h.material=bad?M.badH:M.okH; p.g.scale.setScalar(1); p.g.position.copy(path[0]); p.g.visible=true;
  }
  const up=(d)=>[d.pos.clone(),d.dock.clone(),HUB_IN.clone()];
  const down=(d)=>[HUB_IN.clone(),d.dock.clone(),d.pos.clone()];
  const CLOUD=new Vector3(0,HUB_Y+5.5,0);

  /* ---------- labels ---------- */
  const labelsEl=root.querySelector('[data-pm="labels"]'), labels=[];
  function label(text,anchor,cls=''){ const el=document.createElement('div'); el.className='practice-map__lbl '+cls; el.innerHTML='<span class="practice-map__msg"></span><span class="practice-map__name"></span>'; el.lastChild.textContent=text; labelsEl.appendChild(el); const L={el,msg:el.firstChild,anchor,until:0}; labels.push(L); return L; }
  for(const r of Object.values(room)) r.lbl=label(r.name,r.center);
  const hubLbl=label('SecureTrust',new Vector3(0,HUB_Y+1.1,0),'is-hub');
  const v3=new Vector3();
  function placeLabels(w,h){ for(const L of labels){ v3.copy(L.anchor).project(camera); L.el.style.transform=`translate(${(v3.x*.5+.5)*w}px,${(-v3.y*.5+.5)*h}px) translate(-50%,-100%)`; } }

  /* ---------- the practice's day: normal traffic, healthcare threats stopped at SecureTrust ---------- */
  // threats from the healthcare page's threat landscape, each stopped by the product built for it
  const THREATS=[
    {kind:'in',  dev:'xr',   title:'Ransomware download blocked', by:'Intrusion Prevention'},
    {kind:'out', dev:'fd1',  title:'Phishing link blocked',       by:'DNS Security'},
    {kind:'out', dev:'op2a', title:'Patient records upload stopped', by:'Data Loss Prevention'},
    {kind:'out', dev:'cbct', title:'Imaging device lateral move blocked', by:'Firewall-as-a-Service'},
    {kind:'out', dev:'g1',   title:'Guest device kept off clinical systems', by:'Zero Trust Access'},
  ];
  const NORMAL=[['fd1','pms'],['fd2','pms'],['op1a','pms'],['op2a','xr'],['op1a','cbct'],['bo','cloud'],['g2','cloud'],['g1','cloud'],['xr','pms'],['fd2','cloud']];
  let simTime=0, nextFlow=0, nextThreat=2.5, ti=0;
  function say(L,html,secs){ L.msg.innerHTML=html; L.msg.classList.add('is-shown'); L.until=simTime+secs; }
  function block(p,th){
    p.state='die'; p.t=0; shieldFlash=1; hubFlash=1;
    const at=p.g.position.clone(), dir=(th.kind==='in'? at.clone().sub(HUB_IN): dev[th.dev].pos.clone().sub(at)).normalize();
    shield.position.copy(at); shield.lookAt(th.kind==='in'? at.clone().add(dir): dev[th.dev].pos); burst(at,th.kind==='in'?dir.clone().negate():dir.clone().negate());
    say(hubLbl,`${th.title}<small>${th.by}</small>`,2.2);
    const d=dev[th.dev]; d.flash=1; d.room.lbl.el.classList.add('is-alert'); setTimeout(()=>d.room.lbl.el.classList.remove('is-alert'),1600);
  }
  function step(dt){
    simTime+=dt;
    nextFlow-=dt; if(nextFlow<=0){ nextFlow=.3+Math.random()*.3; const [a,b]=NORMAL[Math.floor(Math.random()*NORMAL.length)];
      launch(b==='cloud'?[...up(dev[a]),CLOUD.clone()]:[...up(dev[a]),...down(dev[b]).slice(1)],false); }
    nextThreat-=dt; if(nextThreat<=0){ nextThreat=3.2+Math.random()*1.2; const th=THREATS[ti++%THREATS.length]; const d=dev[th.dev];
      if(th.kind==='in'){ // from the internet toward a device, stopped at SecureTrust's outer edge
        const a=Math.random()*Math.PI*2, from=new Vector3(Math.cos(a)*11,HUB_Y+3.5,Math.sin(a)*11-2), stop=new Vector3(Math.cos(a)*(R_OUT+.5),HUB_Y+.3,Math.sin(a)*(R_OUT+.5));
        launch([from,stop],true,p=>block(p,th));
      } else { const stop=d.dock.clone().lerp(d.pos,.08); launch([d.pos.clone(),stop],true,p=>block(p,th)); d.flash=1; } }
    for(const p of pool){ if(!p.live) continue;
      if(p.state==='fly'){ p.d+=p.v*dt; const L=p.lens[p.lens.length-1];
        if(p.d>=L){ if(p.bad){ p.g.position.copy(p.path[p.path.length-1]); p.onEnd(p); } else { p.live=false; p.g.visible=false; } continue; }
        let i=1; while(p.lens[i]<p.d) i++; const k=(p.d-p.lens[i-1])/(p.lens[i]-p.lens[i-1]);
        p.g.position.lerpVectors(p.path[i-1],p.path[i],k); p.g.lookAt(p.path[i]); p.g.rotateY(Math.PI/2);
        if(p.path[p.path.length-1]===p.path[i] && p.path[i].y>HUB_Y+4) p.g.scale.setScalar(Math.max(.01,1-k));
      } else { p.t+=dt; p.g.scale.setScalar(Math.max(.001,(1-p.t/.35)*1.7)); if(p.t>.35){ p.live=false; p.g.visible=false; } } }
    for(const b of bursts){ if(b.age>1) continue; b.age+=dt; for(let i=0;i<SP*3;i++) b.pos[i]+=b.vel[i]*dt; b.geo.attributes.position.needsUpdate=true; b.mat.opacity=Math.max(0,1-b.age/.7); }
    shieldFlash=Math.max(0,shieldFlash-dt*1.8); hubFlash=Math.max(0,hubFlash-dt*1.5);
    shield.material.opacity=shieldFlash*.75; hubCap.emissiveIntensity=hubFlash*.6; hubSeam.emissive.setHex(hubFlash>.05?C.threat:C.blue); coreMat.uniforms.uAlert.value=hubFlash;
    for(const d of Object.values(dev)){ d.flash=Math.max(0,d.flash-dt*.8); const red=d.flash>.05;
      d.ringMat.color.setHex(red?C.threat:C.glow); d.screenMat.color.setHex(red?C.threat:C.glow); d.mat.emissive.setHex(red?C.threat:C.blue); }
    for(const L of labels) if(L.until && simTime>L.until){ L.msg.classList.remove('is-shown'); L.until=0; }
  }

  /* ---------- intro + loop ---------- */
  const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2, seg=(t,a,b)=>MathUtils.clamp((t-a)/(b-a),0,1);
  const LOOK=new Vector3(.8,1.8,-.4), R_CAM=32, CAM_Y0=32, CAM_Y1=17.5, ANG0=.95, ANG1=.55;
  let t0=performance.now()-(reduce?1e6:0), last=performance.now(), visible=true, raf=0;
  function frame(now){
    raf=0; const t=(now-t0)/1000, dt=Math.min((now-last)/1000,.05); last=now;
    const draw=seg(t,0,1.2), solid=ease(seg(t,.9,2.3)), fly=ease(seg(t,.3,3.4)), live=seg(t,2.6,3.6), drop=ease(seg(t,1.4,3.2));
    let ang=ANG0+(ANG1-ANG0)*fly; if(!reduce && t>3.4) ang+=Math.sin((t-3.4)*.08)*.12;
    camera.position.set(Math.sin(ang)*R_CAM, CAM_Y0+(CAM_Y1-CAM_Y0)*fly, Math.cos(ang)*R_CAM); camera.lookAt(LOOK);
    for(const [m,b] of fade) m.opacity=b*solid;
    for(const [m,b] of edges) m.opacity=b*Math.max(draw*(1-solid*.4),solid*.6+.0);
    hub.position.y=HUB_Y+(1-drop)*5; coreMat.uniforms.uOpacity.value=solid; coreMat.uniforms.uTime.value=reduce?2:now/1000; coreLight.intensity=solid*16;
    for(const d of Object.values(dev)) for(const r of d.rings) r.visible=r.userData.k<=drop*1.05; // tunnels grow up to the engine
    if(!reduce) hubSpin.rotation.y+=.002;
    root.classList.toggle('is-settled',live>.5);
    if(live>0 && !reduce) step(dt);
    placeLabels(canvas.clientWidth,canvas.clientHeight); renderer.render(scene,camera);
    if(visible && !reduce) raf=requestAnimationFrame(frame);
  }
  function resize(){ const w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h) return; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); if(!raf) raf=requestAnimationFrame(frame); }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e])=>{ visible=e.isIntersecting; if(visible&&!raf){ last=performance.now(); raf=requestAnimationFrame(frame); } }).observe(root);
  if(reduce){ for(let i=0;i<60*6;i++) step(1/60); }
  resize();
}

const start = () => document.querySelectorAll('[data-practice-map]').forEach(mount);
document.fonts?.load ? document.fonts.load(`700 40px ${FONT}`).then(start, start) : start();
