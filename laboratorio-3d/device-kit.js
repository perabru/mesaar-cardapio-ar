/* Original educational models. Units approximately 20 mm; see software-model-sources.json. */
export function createDeviceKit(T, palette = {}) {
  const C = {accent:'#ff873c', second:'#ff5a64', dark:'#17151c', paper:'#fff6e8', ...palette};
  const matCache = new Map();
  const mat = (color, metalness=0, roughness=.48) => {
    const k=`${color}:${metalness}:${roughness}`;
    if(!matCache.has(k))matCache.set(k,new T.MeshStandardMaterial({color,metalness,roughness}));
    return matCache.get(k);
  };
  const metals = {silver:mat('#b7c3cc',.88,.23), dark:mat('#262d35',.72,.31), gold:mat('#d4b55a',.8,.3), black:mat('#10161d',.25,.47)};
  const mesh = (geometry, material, parent, x=0,y=0,z=0) => {const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const box = (p,w,h,d,m,x=0,y=0,z=0) => mesh(new T.BoxGeometry(w,h,d),typeof m==='string'?mat(m):m,p,x,y,z);
  const cyl = (p,r,h,m,x=0,y=0,z=0,segments=32) => mesh(new T.CylinderGeometry(r,r,h,segments),typeof m==='string'?mat(m):m,p,x,y,z);
  const sphere = (p,r,m,x=0,y=0,z=0) => mesh(new T.SphereGeometry(r,24,16),typeof m==='string'?mat(m):m,p,x,y,z);
  function roundedShape(w,h,r){const s=new T.Shape();const x=-w/2,y=-h/2;r=Math.min(r,w/2,h/2);s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
  function rounded(p,w,h,d,m,x=0,y=0,z=0,r=.12){const g=new T.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:false,curveSegments:8});g.translate(0,0,-d/2);return mesh(g,typeof m==='string'?mat(m):m,p,x,y,z);}
  function ringRect(p,w,h,d,wall,m,x=0,y=0,z=0,r=.18){const s=roundedShape(w,h,r);const hole=roundedShape(w-wall*2,h-wall*2,Math.max(.02,r-wall));s.holes.push(hole);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:false,curveSegments:8});g.translate(0,0,-d/2);return mesh(g,m,p,x,y,z);}
  function tube(p,points,r,m){const curve=new T.CatmullRomCurve3(points.map(a=>new T.Vector3(...a)));return mesh(new T.TubeGeometry(curve,24,r,8,false),typeof m==='string'?mat(m):m,p);}
  function rod(p,a,b,r,m){const av=new T.Vector3(...a),bv=new T.Vector3(...b),mid=av.clone().add(bv).multiplyScalar(.5);const obj=cyl(p,r,av.distanceTo(bv),m,mid.x,mid.y,mid.z,16);obj.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());return obj;}
  function screw(p,x,y,z,scale=1,front=false){const g=new T.Group();p.add(g);g.position.set(x,y,z);if(front)g.rotation.x=Math.PI/2;cyl(g,.09*scale,.04*scale,metals.silver);box(g,.11*scale,.006*scale,.017*scale,metals.dark,0,.024*scale,0);box(g,.017*scale,.006*scale,.11*scale,metals.dark,0,.024*scale,0);return g;}
  function texture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');draw(ctx,w,h);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;return tex;}
  function flatTexture(p,tex,w,h,x,y,z,rx=0){const m=new T.MeshBasicMaterial({map:tex,side:T.DoubleSide,toneMapped:false});const q=mesh(new T.PlaneGeometry(w,h),m,p,x,y,z);q.rotation.x=rx;return q;}
  function text(p,value,w,h,x,y,z,background='#132421',color='#f0f5f6',rx=0){const tex=texture(512,128,(c,W,H)=>{c.fillStyle=background;c.fillRect(0,0,W,H);c.fillStyle=color;c.font='bold 40px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(value,W/2,H/2,W-28)});return flatTexture(p,tex,w,h,x,y,z,rx);}
  const round2d=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect(x,y,w,h,r);c.fill();};
  function screenTexture(project,portrait=false){return texture(portrait?640:1280,portrait?1280:800,(c,W,H)=>{
    const dark=project==='KOMA'||project==='IonoLab';c.fillStyle=dark?C.dark:'#f8f5ec';c.fillRect(0,0,W,H);
    c.fillStyle=C.accent;c.fillRect(0,0,W,portrait?15:8);c.fillStyle=dark?'#fff6e8':C.dark;c.font=`bold ${portrait?47:35}px sans-serif`;c.fillText(project,portrait?38:35,portrait?110:68);
    c.font=`${portrait?20:18}px sans-serif`;c.fillStyle=dark?'#b9c9d9':'#607365';c.fillText('PROTÓTIPO · DADOS DEMONSTRATIVOS',portrait?38:35,portrait?151:100);
    if(project==='KOMA'){
      const x=35,y=portrait?200:135,ww=W-70,hh=portrait?365:350;c.fillStyle='#343044';round2d(c,x,y,ww,hh,18);
      const grad=c.createLinearGradient(x,y,x+ww,y+hh);grad.addColorStop(0,'#b33f4c');grad.addColorStop(1,'#e49035');c.fillStyle=grad;c.fill();
      c.fillStyle='#22202e';c.beginPath();c.moveTo(x,y+hh);c.lineTo(x+ww*.38,y+hh*.2);c.lineTo(x+ww*.6,y+hh);c.fill();c.beginPath();c.moveTo(x+ww*.5,y+hh);c.lineTo(x+ww*.75,y+hh*.35);c.lineTo(x+ww,y+hh);c.fill();
      c.fillStyle='#fff0cb';c.beginPath();c.arc(x+ww*.8,y+hh*.2,hh*.13,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.font='bold 43px sans-serif';c.fillText('VOZES DO AMANHÃ',x+23,y+hh-66,ww-46);c.font='23px sans-serif';c.fillText('Obra demonstrativa · Episódio 01',x+23,y+hh-28,ww-46);
      c.fillStyle=C.accent;round2d(c,x,y+hh+26,portrait?ww:300,54,12);c.fillStyle='#1a1418';c.font='bold 24px sans-serif';c.fillText('▶ CONTINUAR',x+28,y+hh+63);
      c.fillStyle='#f7f1e5';c.font='bold 30px sans-serif';c.fillText('MANGÁS INDEPENDENTES',x,y+hh+137,ww);
      for(let i=0;i<3;i++){c.fillStyle=['#a44e61','#6d625a','#60778f'][i];round2d(c,x+i*(ww/3+5),y+hh+160,ww/3-12,portrait?265:115,10);c.fillStyle='#e9d5b2';c.fillRect(x+i*(ww/3+5)+15,y+hh+180,ww/3-42,8);}
    }else if(project==='CORO'){
      const x=35,y=portrait?203:140,ww=W-70,hh=portrait?600:460;c.fillStyle='#d5dfc3';round2d(c,x,y,ww,hh,18);c.strokeStyle='#9fb18a';c.lineWidth=10;
      for(let i=0;i<11;i++){c.beginPath();for(let j=0;j<30;j++){const xx=x+j*ww/29,yy=y+hh*(i+.5)/11+Math.sin(j*.5+i)*22;if(!j)c.moveTo(xx,yy);else c.lineTo(xx,yy)}c.stroke();}
      c.strokeStyle='#7aafbe';c.lineWidth=portrait?24:38;c.beginPath();c.moveTo(x+ww*.67,y);c.bezierCurveTo(x+ww*.15,y+hh*.4,x+ww*.83,y+hh*.55,x+ww*.45,y+hh);c.stroke();
      for(const [px,py]of[[.2,.2],[.7,.3],[.4,.58],[.72,.7]]){c.fillStyle=C.accent;c.beginPath();c.arc(x+ww*px,y+hh*py,portrait?15:11,0,7);c.fill();c.strokeStyle='#fff8ea';c.lineWidth=5;c.stroke();}
      c.fillStyle=C.dark;c.font='bold 34px sans-serif';c.fillText('REGISTRO DE CAMPO',35,y+hh+70);c.font='25px sans-serif';c.fillText('Foto + posição + contexto',35,y+hh+115);c.fillStyle=C.accent;round2d(c,35,y+hh+145,ww,55,12);c.fillStyle='#fff';c.font='bold 23px sans-serif';c.fillText('SALVAR OBSERVAÇÃO',60,y+hh+183);
    }else if(project==='IonoLab'){
      const cx=W*.31,cy=H*.52,r=H*.28;const grad=c.createRadialGradient(cx,cy,5,cx,cy,r);grad.addColorStop(0,'#618d95');grad.addColorStop(.5,'#244964');grad.addColorStop(1,'#0a172a');c.fillStyle=grad;c.beginPath();c.arc(cx,cy,r,0,7);c.fill();
      c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();for(let i=0;i<6;i++){c.strokeStyle=i%2?'#98aab320':'#071a38bb';c.lineWidth=20;c.beginPath();c.moveTo(cx-r,cy-r+i*75);c.bezierCurveTo(cx-r*.2,cy-r+i*75-80,cx+r*.5,cy-r+i*75+70,cx+r,cy-r+i*75);c.stroke();}c.restore();
      c.strokeStyle=C.second;c.lineWidth=3;for(let i=1;i<=3;i++){c.beginPath();c.arc(cx,cy,r*i/3,0,7);c.stroke();}c.fillStyle='#dbeaff';c.font='24px monospace';c.fillText('ALL-SKY · EXEMPLO SINTÉTICO',35,H-70);
      c.fillStyle='#172b4f';round2d(c,W*.6,145,W*.35,H*.62,16);c.fillStyle='#e8f7ff';c.font='bold 27px sans-serif';c.fillText('SEQUÊNCIA / MÉTRICAS',W*.62,190);c.strokeStyle=C.second;c.lineWidth=5;c.beginPath();for(let i=0;i<45;i++){const x=W*.63+i*W*.0065,y=H*.43+Math.sin(i*.3)*H*.06+Math.cos(i*.77)*H*.02;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.fillStyle='#b4c9dc';c.font='22px sans-serif';['Originais preservados','Qualidade revisada','Máscaras versionadas','Baseline de persistência'].forEach((t,i)=>c.fillText(t,W*.62,H*.6+i*40));
    }else{
      const x=35,y=portrait?205:140,ww=W-70,hh=portrait?510:430;c.fillStyle='#e9dfc7';round2d(c,x,y,ww,hh,20);const cx=x+ww*.5,cy=y+hh*.5,r=hh*.38;c.fillStyle='#faf8ee';c.beginPath();c.ellipse(cx,cy,r*1.3,r*.8,0,0,7);c.fill();c.strokeStyle='#ddd8c8';c.lineWidth=10;c.stroke();c.fillStyle='#865330';c.beginPath();c.ellipse(cx,cy,r*.7,r*.5,-.2,0,7);c.fill();for(let i=0;i<9;i++){c.fillStyle=i%2?'#719346':'#c86738';c.beginPath();c.ellipse(cx+Math.cos(i*2)*r*.62,cy+Math.sin(i*2)*r*.4,22,13,i,0,7);c.fill();}
      c.strokeStyle=C.accent;c.lineWidth=6;for(const [a,b,sx,sy]of[[x+22,y+22,1,1],[x+ww-22,y+22,-1,1],[x+22,y+hh-22,1,-1],[x+ww-22,y+hh-22,-1,-1]]){c.beginPath();c.moveTo(a,b+sy*38);c.lineTo(a,b);c.lineTo(a+sx*38,b);c.stroke();}
      c.fillStyle=C.dark;c.font='bold 34px sans-serif';c.fillText('PRATO DA CASA',x,y+hh+70);c.font='24px sans-serif';c.fillText('Modelo de demonstração em 3D',x,y+hh+112,ww);c.fillStyle=C.accent;round2d(c,x,y+hh+145,portrait?ww:410,62,14);c.fillStyle='#fff';c.font='bold 24px sans-serif';c.fillText('VISUALIZAR NA MESA',x+25,y+hh+186);
    }
    if(portrait){c.fillStyle=dark?'#f4e5d0':C.dark;round2d(c,W*.35,H-28,W*.3,7,5);}
  });}
  function makePart(id,name,group,position,explode,description,model,dimensions,category='Dispositivo'){group.position.set(...position);return{id,name,group,explode,description,model,dimensions,category};}
  function phone(project,prefix='phone',pos=[-5,4,2],rotation=-.15){
    const w=3.58,h=7.38,d=.39;
    const frame=new T.Group();rounded(frame,w,h,.12,mat('#a4adb1',.75,.23),0,0,-.14,.42);ringRect(frame,w,h,d,.12,metals.silver,0,0,0,.42);
    rounded(frame,1.43,1.56,.19,mat('#bac3c5',.45,.24),-.82,2.55,-.28,.26);
    for(const [x,y] of [[-1.13,2.9],[-.51,2.2]]){const barrel=cyl(frame,.33,.2,metals.dark,x,y,-.44);barrel.rotation.x=Math.PI/2;const lens=cyl(frame,.25,.014,mat('#153647',.6,.08),x,y,-.55);lens.rotation.x=Math.PI/2;const glint=sphere(frame,.055,mat('#96d4ee',.4,.1),x-.08,y+.08,-.56);glint.scale.z=.15;}
    let flash=cyl(frame,.12,.03,mat('#eee5cc',.1,.2),-.43,2.97,-.4);flash.rotation.x=Math.PI/2;
    rounded(frame,.06,.65,.14,metals.dark,w/2+.03,.9,0,.025);for(const y of[1.0,1.85])rounded(frame,.06,.54,.14,metals.dark,-w/2-.03,y,0,.025);
    for(let i=0;i<5;i++){const p=cyl(frame,.035,.025,metals.black,-.94+i*.13,-h/2-.005,0,12);p.rotation.x=0;const q=p.clone();q.position.x=.42+i*.13;frame.add(q);}
    rounded(frame,.45,.05,.18,metals.dark,0,-h/2-.01,0,.02);screw(frame,-.38,-h/2,0,.32);screw(frame,.38,-h/2,0,.32);
    const board=new T.Group();rounded(board,w-.45,h-.5,.055,mat('#143e32',.1,.5),0,0,.015,.26);
    const pcb=texture(512,1024,(c,W,H)=>{c.fillStyle='#174837';c.fillRect(0,0,W,H);c.strokeStyle='#74a86b';c.lineWidth=2;for(let i=0;i<22;i++){c.beginPath();c.moveTo(20+i*22,30);c.lineTo(20+i*22,100+(i%7)*98);c.lineTo(80+i*15,140+(i%7)*98);c.lineTo(80+i*15,H-30);c.stroke();}c.fillStyle='#e6e3bc';c.font='20px monospace';c.fillText('MODELO DIDÁTICO',35,H-40);});flatTexture(board,pcb,w-.49,h-.54,0,0,.046);
    for(let i=0;i<9;i++){const x=i%3*.65-.7,y=2.5-Math.floor(i/3)*.65;rounded(board,.5,.45,.08,metals.dark,x,y,.12,.03);}
    rounded(board,1.15,.8,.13,metals.silver,.55,-2.55,.12,.08);text(board,'RF',.7,.2,.55,-2.55,.19,'#a9b7bb','#22313c');
    for(let i=0;i<12;i++){box(board,.11,.16,.05,metals.gold,-1.35+i*.24,-3.2,.09);}tube(board,[[-1.2,-2.5,.12],[-1.2,1,.12],[-.8,2.7,.13]],.023,metals.gold);
    const battery=new T.Group();rounded(battery,2.3,4.25,.1,mat('#282e32',.35,.5),-.12,-.4,.13,.13);text(battery,'Li-ion',1.5,.4,-.12,.2,.191,'#282e32','#d4d8d8');text(battery,'REPRESENTAÇÃO',1.9,.24,-.12,-.36,.192,'#282e32','#d4d8d8');box(battery,.37,.65,.018,mat('#bb8639',.2,.6),.75,1.88,.12);
    const display=new T.Group();rounded(display,w-.08,h-.08,.08,mat('#070b11',.55,.1),0,0,.25,.39);flatTexture(display,screenTexture(project,true),w-.27,h-.28,0,0,.295);
    rounded(display,1.0,.22,.012,metals.black,0,3.18,.31,.11);let lens=cyl(display,.058,.015,mat('#172b3c',.7,.12),.33,3.18,.325);lens.rotation.x=Math.PI/2;
    const specs='Envelope externo 147,6 × 71,6 × 7,8 mm; detalhes e interior simplificados.';
    const parts=[
      makePart(prefix+'_frame','Smartphone · estrutura e câmeras',frame,pos,[-.8,0,-1.6],'Aparelho de teste para o navegador, a câmera e a experiência móvel. Conectores, lentes e botões são representados em geometria 3D.','Referência externa: iPhone 15',specs),
      makePart(prefix+'_display','Tela e interface',display,pos,[0,.35,2.25],'Camada de visualização do protótipo. A tela mostra conteúdo demonstrativo; o aplicativo final será desenvolvido nas etapas do projeto.','Vidro e display esquemáticos','Camada de tela ilustrativa'),
      makePart(prefix+'_board','Placa lógica e conectividade',board,pos,[1.5,0,.55],'Representação didática das funções de processamento e comunicação do telefone. O desenho interno não reproduz a placa do fabricante.','Placa lógica ilustrativa','Posições internas não destinadas a reparo'),
      makePart(prefix+'_battery','Bateria e alimentação interna',battery,pos,[-1.5,0,1.25],'A bateria pertence ao aparelho comercial fechado. A separação digital serve para explicar funções; não é uma instrução para abrir o telefone.','Bateria selada esquemática','Sem especificação elétrica de montagem')
    ];parts.forEach(p=>p.group.rotation.y=rotation);return parts;
  }
  function laptop(project){const g=new T.Group();const base=rounded(g,12.6,8.7,.34,metals.silver,0,0,0,.3);base.rotation.x=-Math.PI/2;
    const inset=rounded(g,11.6,4.65,.025,metals.dark,0,.185,-.9,.16);inset.rotation.x=-Math.PI/2;
    const keyGeo=new T.BoxGeometry(.64,.075,.53), keyMat=mat('#343d47',.25,.42), keys=new T.InstancedMesh(keyGeo,keyMat,70),dummy=new T.Object3D();for(let row=0;row<5;row++)for(let col=0;col<14;col++){dummy.position.set(-5.14+col*.79,.25,-2.65+row*.76);dummy.updateMatrix();keys.setMatrixAt(row*14+col,dummy.matrix)}keys.castShadow=true;g.add(keys);box(g,3.7,.075,.48,keyMat,0,.25,1.14);
    const pad=rounded(g,3.55,2.0,.014,mat('#929ea7',.7,.25),0,.18,2.62,.1);pad.rotation.x=-Math.PI/2;
    for(const x of[-5.98,5.98])for(let i=0;i<13;i++)box(g,.09,.008,.14,metals.dark,x,.18,-2.8+i*.28);
    for(const z of[-2.1,-1.1,.2])box(g,.055,.17,.65,metals.dark,-6.31,0,z);box(g,.055,.18,.85,metals.dark,6.31,0,-2.2);box(g,.055,.13,.46,metals.dark,6.31,0,-.7);
    const hinge=cyl(g,.17,11,metals.dark,0,.18,-3.98);hinge.rotation.z=Math.PI/2;
    const lid=new T.Group();lid.position.set(0,.22,-3.98);lid.rotation.x=-.15;g.add(lid);rounded(lid,12.55,7.65,.22,metals.silver,0,3.65,0,.24);rounded(lid,12.1,7.2,.03,metals.black,0,3.65,.125,.11);flatTexture(lid,screenTexture(project,false),11.85,6.85,0,3.65,.148);let webcam=cyl(lid,.038,.02,mat('#1d3548',.4,.18),0,7.35,.137);webcam.rotation.x=Math.PI/2;
    for(const x of[-5.4,5.4])for(const z of[-3.7,3.7]){cyl(g,.22,.08,metals.black,x,-.2,z);screw(g,x,-.22,z,.6);}
    return g;}
  function storage(label='ARQUIVOS'){const g=new T.Group();const body=rounded(g,4.4,2.8,.55,mat('#283844',.72,.26),0,0,0,.2);body.rotation.x=-Math.PI/2;for(let i=0;i<13;i++){box(g,.09,.07,2.4,mat('#465b66',.7,.25),-1.85+i*.31,.3,0)}box(g,.65,.18,.055,metals.black,0,0,1.42);let led=sphere(g,.045,mat('#7ef2c9',.15,.12),1.6,.33,1.0);text(g,label,2.9,.53,0,.34,-.45,'#283844','#d6eef3',-Math.PI/2);for(const x of[-1.9,1.9])for(const z of[-1.1,1.1])screw(g,x,.34,z,.5);return g;}
  function raspberryPi(){const g=new T.Group();const pcbShape=roundedShape(4.25,2.8,.12);for(const [x,z]of[[-1.825,-1.225],[1.075,-1.225],[-1.825,1.225],[1.075,1.225]]){const h=new T.Path();h.absarc(x,z,.0675,0,Math.PI*2,true);pcbShape.holes.push(h);}const geo=new T.ExtrudeGeometry(pcbShape,{depth:.08,bevelEnabled:false,curveSegments:6});geo.rotateX(-Math.PI/2);const pcb=mesh(geo,mat('#227c51',.15,.5),g);
    const traces=texture(1024,672,(c,W,H)=>{c.fillStyle='#237c51';c.fillRect(0,0,W,H);c.lineWidth=2;c.strokeStyle='#5caa70';for(let i=0;i<50;i++){const xx=25+i*19;c.beginPath();c.moveTo(xx,25);c.lineTo(xx,160+i%8*40);c.lineTo(xx+60,220+i%8*40);c.lineTo(xx+60,H-20);c.stroke();}c.fillStyle='#e3e9ce';c.font='bold 38px sans-serif';c.fillText('Raspberry Pi 5',55,H-110);c.font='22px monospace';c.fillText('MODELO EDUCACIONAL',55,H-70);});flatTexture(g,traces,4.2,2.75,0,.084,0,-Math.PI/2);
    box(g,.83,.15,.83,metals.silver,-.2,.16,.12);text(g,'BCM2712',.7,.15,-.2,.24,.12,'#a8b5b9','#243438',-Math.PI/2);box(g,.68,.09,.55,metals.black,-1.2,.135,.12);box(g,.52,.08,.5,metals.black,1.05,.13,-.22);
    box(g,2.56,.17,.28,metals.black,-.35,.17,-1.18);const pinGeo=new T.BoxGeometry(.035,.26,.035),pins=new T.InstancedMesh(pinGeo,metals.gold,40),dummy=new T.Object3D();for(let r=0;r<2;r++)for(let i=0;i<20;i++){dummy.position.set(-1.56+i*.127,.38,-1.24+r*.127);dummy.updateMatrix();pins.setMatrixAt(r*20+i,dummy.matrix)}pins.castShadow=true;g.add(pins);
    for(const z of[-.92,-.04,.86]){box(g,.8,.68,.73,metals.silver,2.07,.42,z);box(g,.017,.48,.58,metals.black,2.48,.43,z);if(z<.5){for(const y of[.29,.57])box(g,.025,.1,.44,mat(z<-.5?'#171c23':'#3c74a8',.15,.38),2.5,y,z);}else{box(g,.027,.28,.45,metals.black,2.51,.48,z);for(let i=0;i<8;i++)box(g,.03,.1,.025,metals.gold,2.53,.6,z-.18+i*.052);}}
    for(const [x,w]of[[-1.7,.48],[-.65,.43],[.05,.43]]){box(g,w,.17,.27,metals.silver,x,.18,1.38);box(g,w*.72,.075,.02,metals.black,x,.18,1.53);}
    for(const x of[-1.15,.65]){box(g,.64,.11,.15,mat('#d6c6a4',.15,.45),x,.14,.78);box(g,.66,.04,.08,metals.black,x,.21,.8);}
    for(let i=0;i<12;i++){const x=-1.65+i*.29;box(g,.11,.055,.06,i%2?metals.silver:mat('#a69269',.1,.5),x,.12,-.7);}for(const [x,z]of[[-1.825,-1.225],[1.075,-1.225],[-1.825,1.225],[1.075,1.225]]){const gold=cyl(g,.105,.005,metals.gold,x,.088,z);const hole=cyl(g,.064,.007,metals.black,x,.092,z);}
    return g;}
  function coolingFan(){const g=new T.Group();box(g,1.65,.15,1.6,metals.silver);for(let i=0;i<9;i++)box(g,.05,.37,1.45,metals.silver,-.72+i*.18,.2,0);const housing=cyl(g,.55,.28,metals.dark,0,.48,0);cyl(g,.42,.015,metals.black,0,.63,0);for(let i=0;i<7;i++){const blade=box(g,.11,.035,.34,mat('#4d5964',.5,.3),0,.66,.2);const pivot=new T.Group();g.add(pivot);pivot.add(blade);pivot.rotation.y=i*Math.PI*2/7;}cyl(g,.14,.04,metals.silver,0,.66,0);for(const x of[-.67,.67])for(const z of[-.64,.64])screw(g,x,.1,z,.5);return g;}
  function fieldCamera(){const g=new T.Group();rounded(g,3.5,5.4,1.9,mat('#496046',.1,.7),0,0,0,.35);rounded(g,3.18,5.08,.14,mat('#647456',.08,.75),0,0,1.0,.28);
    for(const x of[-1.55,1.55])for(let i=0;i<6;i++){box(g,.18,.24,1.8,mat('#2d402f',.1,.75),x,-2+i*.77,0);}
    const ring=cyl(g,.77,.35,metals.dark,0,.75,1.22);ring.rotation.x=Math.PI/2;const optic=cyl(g,.61,.03,mat('#29495c',.7,.12),0,.75,1.41);optic.rotation.x=Math.PI/2;const inner=cyl(g,.33,.03,mat('#0e1e2b',.7,.09),0,.75,1.43);inner.rotation.x=Math.PI/2;
    rounded(g,2.6,1.1,.07,metals.dark,0,2.05,1.13,.18);for(let i=0;i<18;i++){const x=-1.02+i%9*.25,y=1.83+Math.floor(i/9)*.42;const ir=cyl(g,.075,.026,mat('#67495f',.5,.25),x,y,1.19,12);ir.rotation.x=Math.PI/2;}
    const pir=sphere(g,.47,mat('#d6d2c1',.08,.5),0,-.65,1.1);pir.scale.z=.35;for(let i=0;i<7;i++){const rib=box(g,.035,.64,.04,mat('#b7b7ac',.1,.5),-.32+i*.107,-.65,1.28);}
    for(const x of[-1.35,1.35])for(const y of[-2.27,2.27])screw(g,x,y,1.16,.6,true);text(g,'CORO · CAMPO',2.35,.48,0,-1.63,1.135,'#647456','#f2eddd');box(g,.15,1.3,.32,metals.dark,1.9,.0,.1);box(g,.15,1.3,.32,metals.dark,-1.9,.0,.1);return g;}
  function tripod(height=5){const g=new T.Group();cyl(g,.12,height,metals.dark,0,height/2,0);cyl(g,.2,.32,metals.silver,0,height*.56,0);cyl(g,.26,.2,metals.dark,0,height,0);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const x=Math.cos(a)*2.1,z=Math.sin(a)*2.1;rod(g,[0,height*.65,0],[x,.12,z],.09,metals.silver);cyl(g,.16,.18,metals.black,x,.09,z);}return g;}
  function softLight(){const g=tripod(7.0);const head=new T.Group();head.position.set(0,7,0);head.rotation.x=-.08;g.add(head);rounded(head,3.9,4.8,.38,metals.dark,0,1.6,0,.22);rounded(head,3.62,4.52,.04,mat('#f8edda',.05,.55),0,1.6,.22,.15);const dotMat=new T.MeshStandardMaterial({color:'#fff0d9',emissive:'#ffeecc',emissiveIntensity:.25,roughness:.8});for(let i=0;i<12;i++){const e=box(head,.015,4,.01,dotMat,-1.5+i*.27,1.6,.25);}tube(g,[[0,7,-.25],[.4,5,-.4],[.3,1,-.4],[1,0,-.2]],.035,metals.dark);return g;}
  function turntable(){const g=new T.Group();cyl(g,4.5,.42,mat('#292f33',.55,.32),0,.21,0,64);cyl(g,4.38,.17,mat('#f5ede1',.1,.5),0,.505,0,64);for(let i=0;i<24;i++){const a=i*Math.PI/12;const tick=box(g,.035,.009,.24,mat('#aa9f91',.1,.6),Math.cos(a)*4.1,.595,Math.sin(a)*4.1);tick.rotation.y=-a+Math.PI/2;}box(g,.65,.12,.04,metals.black,0,.18,4.48);text(g,'CAPTURA 360°',2.5,.4,0,.26,4.505,'#292f33','#f7e9d5');return g;}
  function dish(){const g=new T.Group();const profile=[[0,0],[2.0,.02],[2.8,.12],[3.15,.32],[3.4,.4],[3.5,.35],[3.42,.22],[3.0,.12],[2.6,-.08],[.55,-.11],[0,-.08]].map(p=>new T.Vector2(...p));mesh(new T.LatheGeometry(profile,64),mat('#f1e8d8',.05,.24),g);
    const food=rounded(g,2.9,1.85,.45,mat('#885638',.02,.85),0,.38,.0,.62);food.rotation.x=-Math.PI/2;food.rotation.z=.23;
    for(let i=0;i<6;i++){const stripe=box(g,.05,.012,1.5,mat('#442b1f',.02,.8),-1.05+i*.39,.62,0);stripe.rotation.y=-.27;}
    for(let i=0;i<12;i++){const a=i*2.4,x=Math.cos(a)*2.15,z=Math.sin(a)*1.75;const veggie=sphere(g,.32,mat(i%3===0?'#d6813e':i%3===1?'#547338':'#88a54d',.01,.8),x,.28,z);veggie.scale.set(1.2,.42,.65);veggie.rotation.y=a;}
    for(let i=0;i<11;i++){const a=i*.7;const leaf=sphere(g,.22,mat('#3c6b35',.02,.8),Math.cos(a)*.6,.72,Math.sin(a)*.5);leaf.scale.set(.45,.12,1.3);leaf.rotation.y=a;}
    return g;}
  function allSky(){const parts={};
    const base=new T.Group();cyl(base,2.3,.22,metals.silver,0,.11,0,48);for(const x of[-1.8,1.8])for(const z of[-1.35,1.35]){cyl(base,.13,3.45,metals.silver,x,1.9,z);cyl(base,.24,.25,metals.dark,x,.35,z);screw(base,x,3.65,z,1.3)}cyl(base,2.18,.3,metals.dark,0,3.55,0,48);cyl(base,2.18,.16,metals.silver,0,.45,0,48);for(let i=0;i<16;i++){const a=i*Math.PI/8;box(base,.07,1.85,.12,metals.dark,Math.cos(a)*2.15,1.3,Math.sin(a)*2.15);}
    text(base,'ALL-SKY · PESQUISA',3.0,.5,0,.9,2.18,'#27313a','#e8eff1');box(base,.6,.35,.25,metals.silver,.9,.9,2.17);box(base,.4,.2,.026,metals.black,.9,.9,2.31);parts.instrument_base=base;
    const optics=new T.Group();cyl(optics,1.65,.24,metals.dark,0,3.9,0,48);cyl(optics,1.22,.42,metals.silver,0,4.18,0,48);for(let i=0;i<6;i++)cyl(optics,1.27,.035,metals.dark,0,4.0+i*.07,0,48);const top=sphere(optics,1.2,mat('#183a54',.7,.12),0,4.35,0);top.scale.y=.47;
    const glass=new T.MeshPhysicalMaterial({color:'#a7dbeb',metalness:.08,roughness:.12,transparent:true,opacity:.2,side:T.DoubleSide,depthWrite:false});const dome=mesh(new T.SphereGeometry(2.08,48,24,0,Math.PI*2,0,Math.PI/2),glass,optics,0,3.92,0);cyl(optics,2.13,.13,metals.silver,0,3.9,0,64);for(let i=0;i<8;i++){let a=i*Math.PI/4;screw(optics,Math.cos(a)*1.88,3.99,Math.sin(a)*1.88,.7)}parts.optics=optics;
    const filter=new T.Group();cyl(filter,1.65,.13,metals.dark,0,2.78,0,48);cyl(filter,.72,.05,mat('#b94c50',.8,.08),.4,2.88,0,48);cyl(filter,.27,.15,metals.silver,-.8,2.8,0,32);for(let i=0;i<4;i++){const a=i*Math.PI/2;const r=mesh(new T.TorusGeometry(.75,.055,10,40),metals.silver,filter,.4,2.89,0);r.rotation.x=Math.PI/2;break;}text(filter,'OI 630 nm',1.4,.25,.4,2.925,0,'#622c38','#fff0e7',-Math.PI/2);parts.filter=filter;
    const sensor=new T.Group();box(sensor,2.1,.13,2.05,mat('#285c46',.12,.52),0,1.6,0);box(sensor,1.2,.15,1.15,metals.silver,0,1.74,0);box(sensor,.82,.04,.8,mat('#514f85',.8,.12),0,1.84,0);for(let i=0;i<12;i++){box(sensor,.035,.045,.14,metals.gold,-.9+i*.165,1.71,.8);box(sensor,.035,.045,.14,metals.gold,-.9+i*.165,1.71,-.8);}cyl(sensor,1.12,.5,metals.dark,0,1.26,0,40);for(let i=0;i<6;i++)cyl(sensor,1.22,.045,metals.silver,0,1.05+i*.07,0,40);parts.sensor=sensor;
    return parts;
  }
  return {T,C,mat,metals,mesh,box,cyl,sphere,rounded,ringRect,tube,rod,screw,texture,flatTexture,text,phone,laptop,storage,raspberryPi,coolingFan,fieldCamera,tripod,softLight,turntable,dish,allSky,makePart};
}
