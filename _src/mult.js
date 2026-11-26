/* 분수의 곱셈과 소수의 곱셈 (5학년 2학기) */
function D(i,p){ var s=(i/Math.pow(10,p)).toFixed(p); if(p>0) s=s.replace(/0+$/,'').replace(/\.$/,''); return s; }
function ri(a,b){ return a+rnd(b-a+1); }
function ubars(x0,y,uw,hh,nu,L,segs){ var cw=uw/L, gap=8, k=0, u, i;
  segs.forEach(function(s){ for(i=0;i<s[0];i++){ if(s[1]) rect(x0+Math.floor(k/L)*(uw+gap)+(k%L)*cw,y,cw,hh,s[1]); k++; } });
  for(u=0;u<nu;u++){ var ux=x0+u*(uw+gap); for(i=1;i<L;i++) line(ux+i*cw,y,ux+i*cw,y+hh,INK,1); rect(ux,y,uw,hh,null,INK,2.4); } }

/* ───────── 1. 분수 × 자연수 ───────── */
var kn=2, kd=3, kk=4, kt=0;
function fkDraw(){ kn=Math.min(kn,kd); var BW=BWd(), x0=(W-BW)/2, uw=(BW-8*(kk-1))/kk, hh=54, y1=44, y2=y1+hh+84, segs=[], i, N=kn*kk;
  for(i=0;i<kk;i++){ segs.push([kn,rgba(BLUE,0.8)],[kd-kn,null]); cfr(kn,kd,x0+i*(uw+8)+uw/2,y1-22,ACC,13); if(i) txt('+',x0+i*(uw+8)-4,y1-22,INK,15); }
  ubars(x0,y1,uw,hh,kk,kd,segs);
  if(kt>0.5){ txt('색칠한 칸을 모으면',x0,y2-18,MUTED,15,'left'); ubars(x0,y2,uw,hh,Math.max(1,Math.ceil(N/kd)),kd,[[N,rgba(ORANGE,0.85)]]); }
  var b=$('kGo'); if(b) b.textContent=kt>0.5?'◀ 되돌리기':'▶ 모으기';
  $('say').innerHTML=kt<0.5?(F(kn,kd)+' × '+kk+P(kk,'은','는')+' '+F(kn,kd)+P(kn,'을','를')+' '+kk+'번 더한 것과 같아요. 모두 얼마일까요?<small>▶ 모으기를 눌러 보세요.</small>'):
    (F(1,kd)+'이 '+kn+' × '+kk+' = '+N+'개예요. <b class="r">'+F(kn,kd)+' × '+kk+' = '+F(kn+' × '+kk,kd)+' = '+F(N,kd)+(MX(N,kd)!==F(N,kd)?' = '+MX(N,kd):'')+'</b><small style="font-size:15.5px;color:var(--ink)">(분수) × (자연수)는 분모는 그대로 두고 분자와 자연수를 곱해요. '+kk+' × '+F(kn,kd)+'도 같은 방법으로 계산하고 값도 같아요.</small>'); }
function fkUI(){ $('ctl').innerHTML='<div class="dims">'+sld('kD','분모',2,8,kd)+sld('kN','분자',1,kd,kn)+sld('kK','곱하는 수',2,6,kk)+'</div><div class="row"><button class="btn primary" id="kGo">▶ 모으기</button></div>';
  sldBind('kD',function(v){ kd=v; kn=Math.min(kn,kd); kt=0; }); sldBind('kN',function(v){ kn=v; kt=0; }); sldBind('kK',function(v){ kk=v; kt=0; });
  $('kGo').onclick=function(){ kt=kt>0.5?0:1; draw(); }; }

/* ───────── 2. 분수 × 분수 ───────── */
var pa=2, pb=3, pc=3, pd=4, pt2=0;
function ffDraw(){ pa=Math.min(pa,pb); pc=Math.min(pc,pd); var SQ=Math.min(H-70,W-140,270), x0=(W-SQ)/2+20, y0=44, cw=SQ/pb, rh=SQ/pd, i;
  rect(x0,y0,pa*cw,SQ,rgba(BLUE,0.45)); if(pt2>0){ rect(x0,y0,SQ,pc*rh,rgba(ORANGE,0.4*pt2)); rect(x0,y0,pa*cw,pc*rh,rgba(ORANGE,0.55*pt2),HOT,3); }
  for(i=1;i<pb;i++) line(x0+i*cw,y0,x0+i*cw,y0+SQ,INK,1.5); if(pt2>0){ g.globalAlpha=pt2; for(i=1;i<pd;i++) line(x0,y0+i*rh,x0+SQ,y0+i*rh,INK,1.5); g.globalAlpha=1; }
  rect(x0,y0,SQ,SQ,null,INK,2.4); cfr(pa,pb,x0+pa*cw/2,y0-22,ACC,15); if(pt2>0.5) cfr(pc,pd,x0-26,y0+pc*rh/2,HOT,15);
  var b=$('pGo'); if(b&&!anT) b.textContent=pt2>0.5?'◀ 되돌리기':'▶ 그중의 '+pc+'/'+pd+'만큼 색칠하기';
  var N=pa*pc, M=pb*pd;
  $('say').innerHTML=pt2<0.99?('파란 부분은 전체의 '+F(pa,pb)+P(pa,'이에요','예요')+'. 그중의 '+F(pc,pd)+'만큼은 전체의 얼마일까요?<small>'+F(pa,pb)+' × '+F(pc,pd)+P(pc,'은','는')+' '+F(pa,pb)+'의 '+F(pc,pd)+'만큼이라는 뜻이에요.</small>'):
    ('전체가 '+pb+' × '+pd+' = '+M+'칸으로 나뉘고, 두 색이 겹친 부분은 '+pa+' × '+pc+' = '+N+'칸이에요. <b class="r">'+F(pa,pb)+' × '+F(pc,pd)+' = '+F(pa+' × '+pc,pb+' × '+pd)+' = '+F(N,M)+(MX(N,M)!==F(N,M)?' = '+MX(N,M):'')+'</b><small style="font-size:15.5px;color:var(--ink)">(분수) × (분수)는 분자는 분자끼리, 분모는 분모끼리 곱해요. 대분수는 가분수로 바꾸어 같은 방법으로 계산해요.</small>'); }
function ffUI(){ $('ctl').innerHTML='<div class="dims">'+sld('pB','앞 분모',2,6,pb)+sld('pA','앞 분자',1,pb,pa)+sld('pD','뒤 분모',2,6,pd)+sld('pC','뒤 분자',1,pd,pc)+'</div><div class="row"><button class="btn primary" id="pGo">▶ 색칠하기</button></div>';
  sldBind('pB',function(v){ anStop(); pb=v; pa=Math.min(pa,pb); pt2=0; }); sldBind('pA',function(v){ anStop(); pa=v; pt2=0; }); sldBind('pD',function(v){ anStop(); pd=v; pc=Math.min(pc,pd); pt2=0; }); sldBind('pC',function(v){ anStop(); pc=v; pt2=0; });
  $('pGo').onclick=function(){ anim(function(){ return pt2; },function(v){ pt2=v; },pt2>0.5?0:1,900); }; }

/* ───────── 3. 소수 × 소수 ───────── */
var dx=7, dy=4;
function ddDraw(){ var big=dx>10||dy>10, n=big?20:10, SQ=Math.min(H-60,W-150,290), x0=(W-SQ)/2+24, y0=38, c=SQ/n, i;
  rect(x0,y0+SQ-dy*c,dx*c,dy*c,rgba(ORANGE,0.75)); rect(x0,y0,dx*c,SQ-dy*c,rgba(BLUE,0.25)); rect(x0+dx*c,y0+SQ-dy*c,SQ-dx*c,dy*c,rgba(GREEN,0.25));
  for(i=1;i<n;i++){ line(x0+i*c,y0,x0+i*c,y0+SQ,INK,i%10?0.5:2.2); line(x0,y0+i*c,x0+SQ,y0+i*c,INK,i%10?0.5:2.2); }
  rect(x0,y0,SQ,SQ,null,INK,2.4); rect(x0,y0+SQ-dy*c,dx*c,dy*c,null,HOT,3);
  txt(D(dx,1),x0+dx*c/2,y0+SQ+16,ACC,17); txt(D(dy,1),x0-22,y0+SQ-dy*c/2,ACC,17); txt('1',x0+10*c,y0-14,MUTED,14); if(big) txt('2',x0+20*c,y0-14,MUTED,14);
  var N=dx*dy;
  $('say').innerHTML='큰 정사각형 한 개의 넓이가 1이고, 작은 한 칸은 0.01이에요. 주황색은 가로 '+dx+'칸, 세로 '+dy+'칸이므로 '+dx+' × '+dy+' = '+N+'칸이에요. <b class="r">'+D(dx,1)+' × '+D(dy,1)+' = '+D(N,2)+'</b><small style="font-size:15.5px;color:var(--ink)">자연수의 곱 '+dx+' × '+dy+' = '+N+'에서, '+J(D(dx,1),'은','는')+' '+dx+'의 '+F(1,10)+'배, '+J(D(dy,1),'은','는')+' '+dy+'의 '+F(1,10)+'배이므로 곱은 '+N+'의 '+F(1,100)+'배인 '+J(D(N,2),'이에요','예요')+'.</small>'; }
function sldD(id,lab,min,max,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" value="'+val+'"><output>'+D(val,1)+'</output></div>'; }
function ddUI(){ $('ctl').innerHTML='<div class="dims">'+sldD('dX','가로',1,19,dx)+sldD('dY','세로',1,19,dy)+'</div>';
  $('dX').oninput=function(){ dx=+this.value; this.nextElementSibling.textContent=D(dx,1); draw(); }; $('dY').oninput=function(){ dy=+this.value; this.nextElementSibling.textContent=D(dy,1); draw(); }; }

/* ───────── 4. 소수점 위치 ───────── */
var zm='up', zk=1, zN=257, zP=2, zA=37, zB=24, z1=1, z2=1;
function ptDraw(){ if(zm==='mix'){ var sz=Math.min(40,W/14), y=H*0.26; txt(zA+' × '+zB+' = '+(zA*zB),W/2,y,MUTED,sz*0.8);
    var raw=(zA*zB/Math.pow(10,z1+z2)).toFixed(z1+z2), tr=D(zA*zB,z1+z2); txt(D(zA,z1)+' × '+D(zB,z2)+' = '+raw,W/2,y+sz*2,INK,sz); if(raw!==tr) txt('= '+tr,W/2,y+sz*3.5,HOT,sz*0.8);
    $('say').innerHTML='자연수끼리 곱한 '+zA+' × '+zB+' = '+(zA*zB)+'에 소수점을 찍어요. <b class="r">'+D(zA,z1)+' × '+D(zB,z2)+' = '+tr+'</b><small style="font-size:15.5px;color:var(--ink)">곱하는 두 수의 소수점 아래 자리 수는 '+z1+'자리와 '+z2+'자리예요. 합한 '+(z1+z2)+'자리만큼 곱의 소수점을 왼쪽으로 옮겨요.'+(raw!==tr?' 소수점 아래 끝자리의 0은 생략해요.':'')+'</small>'; return; }
  var cols=9, cw=Math.min(62,(W-30)/cols), x0=(W-cols*cw)/2, y0=40, rh=56, HD=['만','천','백','십','일','소수 첫째','둘째','셋째','넷째'], up=zm==='up', rp=up?zP-zk:zP+zk, i;
  var put=function(N,p,y,col){ var s=(N/Math.pow(10,Math.max(p,0))*(p<0?Math.pow(10,-p):1)).toFixed(4), ip=s.split('.')[0], fp=s.split('.')[1].replace(/0+$/,''); for(i=0;i<ip.length;i++) txt(ip[ip.length-1-i],x0+(4-i+0.5)*cw,y,col,30); for(i=0;i<fp.length;i++) txt(fp[i],x0+(5+i+0.5)*cw,y,col,30);
    if(fp.length){ g.beginPath(); g.arc(x0+5*cw,y+13,3.5,0,7); g.fillStyle=col; g.fill(); } };
  for(i=0;i<cols;i++){ rect(x0+i*cw,y0,cw,24,rgba(GRAY,0.3),LINE,1); txt(HD[i],x0+(i+0.5)*cw,y0+12,MUTED,cw<50?10:12); rect(x0+i*cw,y0+24,cw,rh,null,LINE,1); rect(x0+i*cw,y0+24+rh+34,cw,rh,null,LINE,1); }
  line(x0+5*cw,y0,x0+5*cw,y0+24+rh*2+34,INK,2.4);
  put(zN,zP,y0+24+rh/2,INK); put(zN,rp,y0+24+rh+34+rh/2,HOT);
  var mul=up?['1','10','100','1000'][zk]:['1','0.1','0.01','0.001'][zk]; txt('× '+mul,W/2,y0+24+rh+17,ACC,18);
  var res=(zN/Math.pow(10,zP)*(up?Math.pow(10,zk):Math.pow(10,-zk))).toFixed(Math.max(0,rp)).replace(/(\.\d*?)0+$/,'$1').replace(/\.$/,'');
  $('say').innerHTML=zk===0?(D(zN,zP)+'에 '+(up?'10, 100, 1000':'0.1, 0.01, 0.001')+'을 곱하면 숫자들의 자리가 어떻게 바뀔까요?<small>아래에서 곱하는 수를 골라 보세요.</small>'):
    ('<b class="r">'+D(zN,zP)+' × '+mul+' = '+res+'</b> 숫자는 그대로이고 자리만 '+(up?'왼쪽':'오른쪽')+'으로 '+zk+'칸씩 옮겨졌어요.<small style="font-size:15.5px;color:var(--ink)">'+(up?'곱하는 수의 0이 하나씩 늘어날 때마다 곱의 소수점이 오른쪽으로 한 자리씩 옮겨져요. 옮길 자리가 없으면 0을 채워요.':'곱하는 소수의 소수점 아래 자리 수가 하나씩 늘어날 때마다 곱의 소수점이 왼쪽으로 한 자리씩 옮겨져요. 자리가 모자라면 0을 채워요.')+'</small>'); }
function ptUI(){ $('top').innerHTML='<div class="chips">'+[['up','10, 100, 1000 곱하기'],['down','0.1, 0.01, 0.001 곱하기'],['mix','소수끼리 곱하기']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===zm)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  if(zm==='mix'){ $('ctl').innerHTML='<div class="dims">'+sld('z1','앞 수의 소수 자리',0,2,z1)+sld('z2','뒤 수의 소수 자리',0,2,z2)+'</div><div class="row"><button class="btn" id="zNew">다른 수</button></div>';
    $('z1').oninput=function(){ z1=+this.value; this.nextElementSibling.textContent=z1; draw(); }; $('z2').oninput=function(){ z2=+this.value; this.nextElementSibling.textContent=z2; draw(); };
    $('zNew').onclick=function(){ zA=ri(12,98); zB=ri(3,48); draw(); }; }
  else { var ms=zm==='up'?['곱하기 전','× 10','× 100','× 1000']:['곱하기 전','× 0.1','× 0.01','× 0.001'];
    $('ctl').innerHTML='<div class="chips" style="margin-top:8px">'+ms.map(function(s,i){ return '<button class="chip" aria-pressed="'+(i===zk)+'" data-z="'+i+'">'+s+'</button>'; }).join('')+'</div><div class="row"><button class="btn" id="zNew">다른 수</button></div>';
    $('ctl').querySelectorAll('[data-z]').forEach(function(b){ b.onclick=function(){ zk=+b.dataset.z; ptUI(); draw(); }; });
    $('zNew').onclick=function(){ if(zm==='up'){ zN=ri(102,989); zP=ri(1,3); } else { zN=ri(12,989); zP=ri(0,1); } if(zN%10===0) zN++; draw(); }; }
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ zm=b.dataset.k; zk=1; if(zm==='up'){ zN=257; zP=2; } else if(zm==='down'){ zN=257; zP=1; } ptUI(); draw(); }; }); }

/* ───────── 5. 문제 풀기 ───────── */
var qz=null, qzScore=[0,0];
function prop(dmax){ var d, n; do{ d=2+rnd(dmax-1); n=1+rnd(d-1); }while(gcd(n,d)>1); return {n:n,d:d}; }
function qzNew(){ var t=rnd(6), q={done:false,tries:0,dec:false}, a, b, k, w;
  if(t===0){ a=prop(9); k=ri(2,9); q.tk=[a,'×',''+k]; q.n=a.n*k; q.d=a.d; q.why=F(a.n+' × '+k,a.d)+' = '+MX(q.n,q.d); }
  else if(t===1){ a=prop(9); k=ri(2,9); q.tk=[''+k,'×',a]; q.n=a.n*k; q.d=a.d; q.why=F(k+' × '+a.n,a.d)+' = '+MX(q.n,q.d); }
  else if(t===2){ a=prop(8); b=prop(8); q.tk=[a,'×',b]; q.n=a.n*b.n; q.d=a.d*b.d; q.why=F(a.n+' × '+b.n,a.d+' × '+b.d)+' = '+MX(q.n,q.d); }
  else if(t===3){ w=ri(1,3); a=prop(5); b=prop(6); var im=w*a.d+a.n; q.tk=[{w:w,n:a.n,d:a.d},'×',b]; q.n=im*b.n; q.d=a.d*b.d; q.why='대분수를 가분수로 바꾸면 '+F(im,a.d)+' × '+F(b.n,b.d)+' = '+MX(q.n,q.d); }
  else if(t===4){ a=ri(11,99); if(a%10===0) a++; k=ri(2,9); var p=ri(1,2); q.dec=true; q.tk=[D(a,p)+' × '+k]; q.ans=a*k/Math.pow(10,p); q.as=D(a*k,p); q.why=a+' × '+k+' = '+(a*k)+'이고, 소수점 아래 '+p+'자리이므로 '+q.as; }
  else { a=ri(2,49); if(a%10===0) a++; b=ri(2,19); if(b%10===0) b++; var p1=ri(1,2), p2=1; q.dec=true; q.tk=[D(a,p1)+' × '+D(b,p2)]; q.ans=a*b/Math.pow(10,p1+p2); q.as=D(a*b,p1+p2); q.why=a+' × '+b+' = '+(a*b)+'이고, 소수점 아래 자리 수의 합이 '+(p1+p2)+'자리이므로 '+q.as; }
  qz=q; }
function qzDraw(){ if(!qz) qzNew(); cexpr(qz.tk.concat(['=','?']),W/2,H/2,Math.min(50,W/12));
  $('say').innerHTML=qz.done?('<b class="r">정답이에요!</b> 답: '+(qz.dec?qz.as:MX(qz.n,qz.d))+'<small style="font-size:15.5px;color:var(--ink)">'+qz.why+'</small>'):
    ('계산해 보세요.'+(qz.tries>=2?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+(qz.dec?'자연수의 곱을 먼저 구하고 소수점을 찍어요.':'분자는 분자끼리, 분모는 분모끼리 곱해요.')+'</small>':(qz.dec?'<small>답은 소수로 써요.</small>':'<small>자연수 칸은 대분수일 때만 써요. 답이 자연수이면 자연수 칸에만 쓰면 돼요.</small>'))); }
function qzUI(msg,cls){ if(!qz) qzNew(); $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px;font-size:17px"><span>답 = '+(qz.dec?'<input type="number" class="wide" id="qx" inputmode="decimal" step="any">':frIn('q',true))+'</span>'+(qz.done?'':'<button class="btn primary" id="qGo">확인하기</button>')+'<button class="btn'+(qz.done?' primary':'')+'" id="qNext">'+(qz.done?'다음 문제 ▶':'건너뛰기')+'</button>'+scoreH(qzScore)+'</div><p class="msg '+(cls||'')+'" id="qMsg">'+(msg||'')+'</p>';
  if(qz.done){ if(qz.dec){ $('qx').value=qz.as; $('qx').className='wide ok'; $('qx').disabled=true; } else frShow('q',qz.n,qz.d); }
  if(!qz.done) $('qGo').onclick=function(){ var m=$('qMsg'), ok, note='';
    if(qz.dec){ if($('qx').value===''){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; } ok=Math.abs(+$('qx').value-qz.ans)<1e-9; }
    else { var v=frVal('q'); if(!v){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; } ok=v.n*qz.d===qz.n*v.d; if(ok&&gcd(v.n,v.d)>1&&v.d>1) note='맞았어요. 기약분수로도 나타내 보세요.'; }
    if(ok){ if(qz.tries===0) qzScore[0]++; qzScore[1]++; qz.done=true; qzUI(note,'ok'); draw(); } else { qz.tries++; m.className='msg bad'; m.textContent='다시 계산해 보세요.'; draw(); } };
  $('qNext').onclick=function(){ if(!qz.done) qzScore[1]++; qzNew(); qzUI(); draw(); }; }

var UIS={fk:fkUI,ff:ffUI,dd:ddUI,pt:ptUI,quiz:qzUI}, DRS={fk:fkDraw,ff:ffDraw,dd:ddDraw,pt:ptDraw,quiz:qzDraw};
function ui(){ if(tab!=='pt') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
