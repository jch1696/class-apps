/* 각도 (4학년 1학기). 각도는 수학 방향(오른쪽 0°, 반시계)으로 다루고 그릴 때만 y를 뒤집는다. */
var DEG=Math.PI/180, SM='<small style="font-size:15.5px;color:var(--ink)">';
var WC=[BLUE,ORANGE,GREEN,PINK];
function sl(id,lab,min,max,val,step){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'" value="'+val+'"><output>'+val+'°</output></div>'; }
function sb(id,fn){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=this.value+'°'; draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
function ray(cx,cy,r,a,col,lw){ line(cx,cy,cx+r*Math.cos(a*DEG),cy-r*Math.sin(a*DEG),col||INK,lw||3.5); }
function wedge(cx,cy,r,a0,a1,fill,stroke){ g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,-a0*DEG,-a1*DEG,true); g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=2; g.stroke(); } }
function dot(x,y,col){ g.beginPath(); g.arc(x,y,5,0,7); g.fillStyle=col||INK; g.fill(); }
function aType(a){ return a>0&&a<90?'예각':(a===90?'직각':(a>90&&a<180?'둔각':'')); }
function protr(cx,cy,R){ var i, st=R>=180?10:30; g.beginPath(); g.arc(cx,cy,R,Math.PI,0); g.closePath(); g.fillStyle=rgba(YEL,0.3); g.fill(); g.strokeStyle=INK; g.lineWidth=2; g.stroke();
  for(i=0;i<=180;i+=(R>=200?1:5)){ var L=i%10===0?14:(i%5===0?9:5), c=Math.cos(i*DEG), s=Math.sin(i*DEG); line(cx+(R-L)*c,cy-(R-L)*s,cx+R*c,cy-R*s,INK,i%10===0?1.6:0.8); }
  for(i=0;i<=180;i+=st) txt(''+i,cx+(R-28)*Math.cos(i*DEG),cy-(R-28)*Math.sin(i*DEG)+(i===0||i===180?-9:0),INK,13);
  line(cx,cy,cx,cy-R+16,MUTED,1,[4,4]); }
function base(){ var R=Math.max(90,Math.min(W/2-24,H-96)); return {cx:W/2,cy:H-44,R:R}; }

/* ───────── 1. 각도 재기 ───────── */
var ang=70, adrag=false;
function msDraw(){ var b=base(), ty=aType(ang), col=ty==='예각'?BLUE:(ty==='직각'?GREEN:ORANGE);
  protr(b.cx,b.cy,b.R); wedge(b.cx,b.cy,Math.min(60,b.R*0.34),0,ang,rgba(col,0.75),INK);
  if(ang===90) rect(b.cx,b.cy-16,16,16,null,INK,2);
  ray(b.cx,b.cy,b.R+14,0,INK,4); ray(b.cx,b.cy,b.R+14,ang,HOT,4.5); dot(b.cx,b.cy); dot(b.cx+(b.R+14)*Math.cos(ang*DEG),b.cy-(b.R+14)*Math.sin(ang*DEG),HOT);
  txt(ang+'°',Math.min(70,W*0.16),28,HOT,Math.min(40,W/11)); if(ty) txt(ty,Math.min(70,W*0.16),28+Math.min(40,W/11),INK,Math.min(22,W/20));
  $('say').innerHTML='<b class="r">'+ang+'°</b> '+(ty||(ang===0?'두 변이 겹쳐 있어요.':'두 변이 일직선이에요.'))+SM+'<b>예각</b>: 0°보다 크고 직각보다 작은 각<br><b>직각</b>: 90°<br><b>둔각</b>: 직각보다 크고 180°보다 작은 각</small>'; }
function msUI(){ $('ctl').innerHTML=sl('aN','각도',0,180,ang)+'<div class="chips">'+[30,45,60,90,120,150].map(function(v){ return '<button class="chip" data-v="'+v+'">'+v+'°</button>'; }).join('')+'</div>'; sb('aN',function(v){ ang=v; });
  $('ctl').querySelectorAll('[data-v]').forEach(function(x){ x.onclick=function(){ ang=+x.dataset.v; ui(); draw(); }; }); }
function aSet(e){ var r=cv.getBoundingClientRect(), k=(r.width/(cv.clientWidth||r.width))||1, b=base(), x=(e.clientX-r.left)/k, y=(e.clientY-r.top)/k, a=Math.atan2(b.cy-y,x-b.cx)/DEG;
  if(a<0) a=a<-90?180:0; ang=Math.round(a); var s=$('aN'); if(s){ s.value=ang; s.nextElementSibling.textContent=ang+'°'; } draw(); }
cv.addEventListener('pointerdown',function(e){ if(tab==='meas'){ adrag=true; aSet(e); } });
cv.addEventListener('pointermove',function(e){ if(adrag&&tab==='meas') aSet(e); });
cv.addEventListener('pointerup',function(){ if(adrag){ adrag=false; if(tab==='meas'){ ui(); draw(); } } });
cv.addEventListener('pointercancel',function(){ adrag=false; });

/* ───────── 2. 어림하기 ───────── */
var eT=65, eG=90, eDone=false;
function esNew(){ var o=eT; do{ eT=ri(3,33)*5; }while(eT===o); eG=90; eDone=false; }
function esDraw(){ var b=base();
  if(eDone) protr(b.cx,b.cy,b.R);
  wedge(b.cx,b.cy,Math.min(60,b.R*0.34),0,eT,rgba(BLUE,0.75),INK);
  if(eDone&&eG!==eT) ray(b.cx,b.cy,b.R,eG,MUTED,2.5);
  ray(b.cx,b.cy,b.R+14,0,INK,4); ray(b.cx,b.cy,b.R+14,eT,HOT,4.5); dot(b.cx,b.cy);
  var d=Math.abs(eT-eG), x=Math.min(84,W*0.2);
  if(eDone){ txt('실제 '+eT+'°',x,26,HOT,Math.min(26,W/16)); txt('어림 '+eG+'°',x,26+Math.min(30,W/14),MUTED,Math.min(20,W/20)); }
  else txt('?',b.cx+Math.min(90,b.R*0.5)*Math.cos(eT/2*DEG),b.cy-Math.min(90,b.R*0.5)*Math.sin(eT/2*DEG),HOT,34);
  $('say').innerHTML=eDone?('<b class="r">'+eT+'°</b> '+(d===0?'딱 맞혔어요!':(d<=10?'잘 어림했어요! 차이 '+d+'°':'차이 '+d+'°'))+SM+'각도기의 중심을 꼭짓점에, 밑금을 한 변에 맞추고 다른 변이 가리키는 눈금을 읽어요.</small>'):('몇 도일까요?'+SM+'직각(90°)보다 큰지 작은지 먼저 보세요.</small>'); }
function esUI(){ $('ctl').innerHTML=(eDone?'':sl('eN','내 어림',5,175,eG,5))+'<div class="row" style="justify-content:center">'+(eDone?'<button class="btn primary" id="eNx" style="font-size:18px">다른 각 ▶</button>':'<button class="btn primary" id="eGo" style="font-size:18px">📐 각도기로 확인</button>')+'</div>';
  if(eDone) $('eNx').onclick=function(){ esNew(); ui(); draw(); }; else { sb('eN',function(v){ eG=v; }); $('eGo').onclick=function(){ eDone=true; ui(); draw(); }; } }

/* ───────── 3. 각도의 합과 차 ───────── */
var sop=0, sa=40, sbv=65, da=120, db=45;
function smDraw(){ var cx=W/2, cy=H-40, R=Math.max(90,Math.min(W/2-30,H-118)), sz=Math.min(38,W/13), m=R*0.62;
  if(!sop){ wedge(cx,cy,R*0.8,0,sa,rgba(BLUE,0.8),INK); wedge(cx,cy,R*0.8,sa,sa+sbv,rgba(ORANGE,0.8),INK); ray(cx,cy,R,0); ray(cx,cy,R,sa); ray(cx,cy,R,sa+sbv);
    txt(sa+'°',cx+m*Math.cos(sa/2*DEG),cy-m*Math.sin(sa/2*DEG),INK,17); txt(sbv+'°',cx+m*Math.cos((sa+sbv/2)*DEG),cy-m*Math.sin((sa+sbv/2)*DEG),INK,17);
    txt(sa+'° + '+sbv+'° = '+(sa+sbv)+'°',W/2,H*0.1,INK,sz);
    $('say').innerHTML=sa+'° + '+sbv+'° = <b class="r">'+(sa+sbv)+'°</b>'+SM+'두 각을 이어 붙였어요. 각도의 합은 자연수의 덧셈처럼 계산해요.</small>'; }
  else { wedge(cx,cy,R*0.8,db,da,rgba(GREEN,0.85),INK); wedge(cx,cy,R*0.8,0,db,rgba(ORANGE,0.35),INK); ray(cx,cy,R,0); ray(cx,cy,R,db,MUTED,2.5); ray(cx,cy,R,da);
    txt((da-db)+'°',cx+m*Math.cos((db+(da-db)/2)*DEG),cy-m*Math.sin((db+(da-db)/2)*DEG),INK,18); txt(db+'°',cx+m*Math.cos(db/2*DEG),cy-m*Math.sin(db/2*DEG),MUTED,15);
    txt(da+'° − '+db+'° = '+(da-db)+'°',W/2,H*0.1,INK,sz);
    $('say').innerHTML=da+'° − '+db+'° = <b class="r">'+(da-db)+'°</b>'+SM+'큰 각에서 작은 각을 겹쳐 덜어 냈어요. 각도의 차는 자연수의 뺄셈처럼 계산해요.</small>'; } }
function smUI(){ $('top').innerHTML=chipsH([[0,'+ 합'],[1,'− 차']],sop,'k'); if(db>da-5) db=da-5;
  $('ctl').innerHTML='<div class="dims">'+(sop?sl('dA','큰 각',20,175,da,5)+sl('dB','작은 각',5,da-5,db,5):sl('sA','파랑',10,90,sa,5)+sl('sB','주황',10,90,sbv,5))+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ sop=+b.dataset.k; ui(); draw(); }; });
  if(sop){ sb('dA',function(v){ da=v; if(db>da-5) db=da-5; }); sb('dB',function(v){ db=v; }); } else { sb('sA',function(v){ sa=v; }); sb('sB',function(v){ sbv=v; }); } }

/* ───────── 각 모으기 공통 ───────── */
/* P=화면 좌표 꼭짓점(수학 방향으로 반시계 순서) → [시작 방향, 각 크기] */
function vang(P){ var n=P.length, o=[], i; for(i=0;i<n;i++){ var a=P[i], b=P[(i+1)%n], c=P[(i+n-1)%n], s=Math.atan2(-(b[1]-a[1]),b[0]-a[0])/DEG, e=Math.atan2(-(c[1]-a[1]),c[0]-a[0])/DEG; o.push([s,((e-s)%360+360)%360]); } return o; }
function poly(P,fill){ g.beginPath(); P.forEach(function(p,i){ if(i) g.lineTo(p[0],p[1]); else g.moveTo(p[0],p[1]); }); g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } g.strokeStyle=INK; g.lineWidth=3; g.lineJoin='round'; g.stroke(); }
function gather(P,degs,order,G,t,r){ var va=vang(P), cum=0;
  order.forEach(function(i){ var s=va[i][0], w=va[i][1], rot=((cum-s)%360+540)%360-180, cs=s+rot*t, x=P[i][0]+(G[0]-P[i][0])*t, y=P[i][1]+(G[1]-P[i][1])*t, m=(cs+w/2)*DEG;
    wedge(x,y,r,cs,cs+w,rgba(WC[i%4],0.9),INK); txt(degs[i]+'°',x+(r+17)*Math.cos(m),y-(r+17)*Math.sin(m),INK,15); cum+=w; }); }

/* ───────── 4. 삼각형의 세 각 ───────── */
var tA=60, tB=70, tt=0;
function trDraw(){ var C=180-tA-tB, c=Math.sin(tB*DEG)/Math.sin(C*DEG), ax=c*Math.cos(tA*DEG), ay=c*Math.sin(tA*DEG), x0=Math.min(0,ax), x1=Math.max(1,ax), r=Math.min(42,H*0.1),
    s=Math.min((W-90)/(x1-x0),H*0.5/ay), oy=H*0.66, ox=(W-(x1-x0)*s)/2-x0*s, P=[[ox,oy],[ox+s,oy],[ox+ax*s,oy-ay*s]], G=[W/2,H-16];
  poly(P,rgba(GRAY,0.18)); if(tt>0.02) line(G[0]-r-40,G[1],G[0]+r+40,G[1],INK,3);
  gather(P,[tA,tB,C],[0,2,1],G,tt,r);
  txt(tt>0.98?tA+'° + '+tB+'° + '+C+'° = 180°':'세 각을 모으면?',W/2,H*0.075,tt>0.98?HOT:MUTED,Math.min(tt>0.98?28:20,W/17));
  $('say').innerHTML=tt>0.98?'삼각형의 세 각의 크기의 합 = <b class="r">180°</b>'+SM+'세 각을 한 점에 모으면 직선이 돼요. 어떤 삼각형이든 180°예요.</small>':'세 각을 한 점에 모아 보세요.'; }
function trUI(){ if(tB>160-tA) tB=160-tA;
  $('ctl').innerHTML='<div class="dims">'+sl('tA','파랑 각',20,120,tA,5)+sl('tB','주황 각',20,160-tA,tB,5)+'</div><div class="row" style="justify-content:center"><button class="btn primary" id="tGo" style="font-size:18px">'+(tt>0.5?'↩ 되돌리기':'✂ 세 각 모으기')+'</button></div>';
  sb('tA',function(v){ tA=v; if(tB>160-tA) tB=160-tA; }); sb('tB',function(v){ tB=v; });
  $('tGo').onclick=function(){ var to=tt>0.5?0:1; anim(function(){ return tt; },function(v){ tt=v; },to,1600,function(){ ui(); }); }; }

/* ───────── 5. 사각형의 네 각 ───────── */
var QP=null, QD=null, qt=0, qsplit=false;
function qdNew(){ var ok=false, i, P, D;
  while(!ok){ P=[]; for(i=0;i<4;i++){ var th=(45+90*i+ri(-22,22))*DEG, rr=0.62+rnd(39)/100; P.push([rr*Math.cos(th),-rr*Math.sin(th)]); }
    var va=vang(P); ok=va.every(function(v){ return v[1]>40&&v[1]<150; }); if(ok){ D=va.map(function(v){ return Math.round(v[1]); }); D[3]=360-D[0]-D[1]-D[2]; } }
  QP=P; QD=D; }
function qdDraw(){ if(!QP) qdNew(); var s=Math.min(W*0.27,H*0.37), cx=W*0.36, cy=H*0.53, r=Math.min(46,W*0.08), P=QP.map(function(p){ return [cx+p[0]*s,cy+p[1]*s]; }), G=[W*0.81,cy];
  poly(P,rgba(GRAY,0.18));
  if(qsplit){ line(P[0][0],P[0][1],P[2][0],P[2][1],HOT,2.5,[7,6]); [[0,1,2],[0,2,3]].forEach(function(t,k){ txt('삼각형 '+(k+1),(P[t[0]][0]+P[t[1]][0]+P[t[2]][0])/3,(P[t[0]][1]+P[t[1]][1]+P[t[2]][1])/3,MUTED,14); }); }
  gather(P,QD,[0,1,2,3],G,qt,r);
  txt(qsplit?'180° × 2 = 360°':(qt>0.98?QD.join('° + ')+'° = 360°':'네 각을 모으면?'),W/2,H*0.075,(qsplit||qt>0.98)?HOT:MUTED,Math.min((qsplit||qt>0.98)?26:20,W/19));
  $('say').innerHTML=(qt>0.98||qsplit)?'사각형의 네 각의 크기의 합 = <b class="r">360°</b>'+SM+'네 각을 한 점에 모으면 한 바퀴가 돼요. 삼각형 2개로 나누면 180° × 2 = 360°예요.</small>':'네 각을 한 점에 모아 보세요.'; }
function qdUI(){ $('ctl').innerHTML='<div class="row" style="justify-content:center;flex-wrap:wrap;gap:10px"><button class="btn primary" id="qGo2" style="font-size:18px">'+(qt>0.5?'↩ 되돌리기':'✂ 네 각 모으기')+'</button><button class="btn" id="qSp" aria-pressed="'+qsplit+'" style="font-size:18px">📐 삼각형 2개로</button><button class="btn" id="qNw" style="font-size:18px">다른 사각형 ▶</button></div>';
  $('qGo2').onclick=function(){ var to=qt>0.5?0:1; anim(function(){ return qt; },function(v){ qt=v; },to,1800,function(){ ui(); }); };
  $('qSp').onclick=function(){ qsplit=!qsplit; ui(); draw(); }; $('qNw').onclick=function(){ anStop(); qdNew(); qt=0; qsplit=false; ui(); draw(); }; }

/* ───────── 6. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a, b, c, q;
  if(t===0){ a=pick([ri(2,17)*5,90,ri(19,35)*5]); var ty=aType(a); q={lines:[a+'°'],ask:'어떤 각일까요?',kind:'mc',opts:['예각','직각','둔각'],ans:ty,show:ty,why:'직각은 90°예요. '+a+'°는 '+(a<90?'90°보다 작아요.':(a>90?'90°보다 커요.':'꼭 90°예요.'))}; }
  else if(t===1){ a=ri(4,18)*5; b=ri(4,18)*5; q={lines:[a+'° + '+b+'° = ?'],ask:'각도의 합은?',kind:'num',ans:a+b,show:(a+b)+'°',why:a+' + '+b+' = '+(a+b),hint:'자연수의 덧셈처럼 계산해요.'}; }
  else if(t===2){ a=ri(12,34)*5; b=ri(3,a/5-3)*5; q={lines:[a+'° − '+b+'° = ?'],ask:'각도의 차는?',kind:'num',ans:a-b,show:(a-b)+'°',why:a+' − '+b+' = '+(a-b),hint:'자연수의 뺄셈처럼 계산해요.'}; }
  else if(t===3){ a=ri(5,20)*5; b=ri(5,Math.min(20,(170-a)/5))*5; c=180-a-b; q={lines:['삼각형의 두 각','「'+a+'°, '+b+'°」'],ask:'나머지 한 각은?',kind:'num',ans:c,show:c+'°',why:'180° − '+a+'° − '+b+'° = '+c+'°',hint:'삼각형의 세 각의 합은 180°예요.'}; }
  else { a=ri(12,22)*5; b=ri(12,22)*5; c=ri(12,22)*5; var d=360-a-b-c; q={lines:['사각형의 세 각','「'+a+'°, '+b+'°, '+c+'°」'],ask:'나머지 한 각은?',kind:'num',ans:d,show:d+'°',why:'360° − '+a+'° − '+b+'° − '+c+'° = '+d+'°',hint:'사각형의 네 각의 합은 360°예요.'}; }
  q.unit=q.kind==='num'?'°':''; return q; });

var UIS={meas:msUI,est:esUI,sum:smUI,tri:trUI,quad:qdUI,quiz:quiz.ui}, DRS={meas:msDraw,est:esDraw,sum:smDraw,tri:trDraw,quad:qdDraw,quiz:quiz.draw};
function ui(){ if(tab!=='sum') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; if(tt>0&&tt<1) tt=0; if(qt>0&&qt<1) qt=0; $('hint').textContent=t==='meas'?'👆 빨간 선을 끌어 보세요':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
