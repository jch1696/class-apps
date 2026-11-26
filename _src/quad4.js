/* 수직과 평행, 여러 가지 사각형 (4학년 2학기) */
var DEG=Math.PI/180, SM='<small style="font-size:15.5px;color:var(--ink)">';
function sl(id,lab,min,max,val,step,unit){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'" value="'+val+'"><output>'+val+(unit||'')+'</output></div>'; }
function sb(id,fn,unit){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=this.value+(unit||''); draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
function dot(x,y,col,r){ g.beginPath(); g.arc(x,y,r||5,0,7); g.fillStyle=col||INK; g.fill(); }
/* 꼭짓점 p 에서 두 방향(단위벡터) 사이 직각 표시 */
function rmark(p,u,v,s){ s=s||14; g.beginPath(); g.moveTo(p[0]+u[0]*s,p[1]+u[1]*s); g.lineTo(p[0]+(u[0]+v[0])*s,p[1]+(u[1]+v[1])*s); g.lineTo(p[0]+v[0]*s,p[1]+v[1]*s); g.strokeStyle=HOT; g.lineWidth=2.5; g.stroke(); }

/* ───────── 1. 수직 ───────── */
var va=60;
function vtDraw(){ var cx=W/2, cy=H*0.56, L=Math.min(W/2-24,H*0.5), c=Math.cos(va*DEG), s=Math.sin(va*DEG), on=va===90;
  line(cx-L,cy,cx+L,cy,INK,4); line(cx-L*c,cy+L*s,cx+L*c,cy-L*s,on?HOT:rgba(BLUE,1),4.5);
  if(on) rmark([cx,cy],[1,0],[0,-1],18); else { g.beginPath(); g.arc(cx,cy,34,-va*DEG,0); g.strokeStyle=MUTED; g.lineWidth=2.5; g.stroke(); txt(va+'°',cx+56*Math.cos(va/2*DEG),cy-56*Math.sin(va/2*DEG),MUTED,17); }
  txt('가',cx+L-8,cy+20,INK,17); txt('나',cx+L*c+(on?18:14),cy-L*s+14,on?HOT:ACC,17);
  txt(on?'수직':va+'°',W/2,H*0.08,on?HOT:MUTED,Math.min(34,W/12));
  $('say').innerHTML=on?'두 직선은 서로 <b class="r">수직</b>이에요.'+SM+'두 직선이 만나서 이루는 각이 직각일 때 수직이라고 해요. 직선 나는 직선 가에 대한 <b>수선</b>이에요.</small>':'만나서 이루는 각: '+va+'°'+SM+'직각(90°)이 되도록 돌려 보세요.</small>'; }
function vtUI(){ $('ctl').innerHTML=sl('vA','돌리기',10,170,va,5,'°'); sb('vA',function(v){ va=v; },'°'); }

/* ───────── 2. 평행 ───────── */
var pt=0, pg=3;
function plDraw(){ var u=Math.min(46,H/8), cx=W/2, y1=H*0.3, y2=y1+pg*u, L=W/2-16, t=Math.tan(pt*DEG), on=pt===0;
  line(cx-L,y1,cx+L,y1,INK,4); line(cx-L,y2+L*t,cx+L,y2-L*t,on?HOT:rgba(BLUE,1),4.5);
  /* 두 직선에 걸친 수선 */ line(cx-L*0.55,y1-16,cx-L*0.55,y2+L*0.55*t+16,MUTED,2,[6,5]); rmark([cx-L*0.55,y1],[1,0],[0,1],12); if(on) rmark([cx-L*0.55,y2],[1,0],[0,-1],12);
  txt('가',cx+L-10,y1-16,INK,17); txt('나',cx+L-10,y2-L*t+20,on?HOT:ACC,17);
  if(!on){ var xm=cx+(y2-y1)/t, in_=Math.abs(xm-cx)<L; if(in_){ dot(xm,y1,HOT,7); txt('만나요',xm,y1-22,HOT,16); } else txt(pt>0?'오른쪽으로 늘이면 만나요 →':'← 왼쪽으로 늘이면 만나요',W/2,H-18,HOT,16); }
  txt(on?'평행':'만나요',W/2,H*0.08,on?HOT:MUTED,Math.min(34,W/12));
  $('say').innerHTML=on?'두 직선은 서로 <b class="r">평행</b>이에요.'+SM+'아무리 늘여도 서로 만나지 않는 두 직선을 평행하다고 해요. 한 직선에 수직인 두 직선은 서로 평행해요.</small>':'기울어져 있어서 늘이면 만나요.'+SM+'기울기를 0°로 맞춰 보세요.</small>'; }
function plUI(){ $('ctl').innerHTML='<div class="dims">'+sl('pT','기울기',-20,20,pt,5,'°')+sl('pG','간격',2,4,pg,1,'칸')+'</div>'; sb('pT',function(v){ pt=v; },'°'); sb('pG',function(v){ pg=v; },'칸'); }

/* ───────── 3. 평행선 사이의 거리 ───────── */
var dx=3, dd=3;
function dsDraw(){ var u=Math.min((W-40)/14,(H-110)/5), cx=W/2, y1=H*0.26, y2=y1+dd*u, L=7*u, len=Math.sqrt(dx*dx+dd*dd), on=dx===0, i;
  for(i=-7;i<=7;i++) line(cx+i*u,y1,cx+i*u,y2,LINE,1);
  line(cx-L,y1,cx+L,y1,INK,4); line(cx-L,y2,cx+L,y2,INK,4);
  line(cx,y1,cx,y2,HOT,on?5:2.5,on?null:[6,5]); rmark([cx,y2],[1,0],[0,-1],12);
  if(!on){ line(cx+dx*u,y1,cx,y2,rgba(BLUE,1),4.5); txt(DD(Math.round(len*10)/10)+'칸',cx+dx*u/2+(dx>0?26:-26),(y1+y2)/2,ACC,18); }
  dot(cx+dx*u,y1,on?HOT:rgba(BLUE,1),8); dot(cx,y2,INK,6); txt('수선 '+dd+'칸',cx+(dx>0?-44:44),(y1+y2)/2,HOT,17);
  txt('선분의 길이: '+DD(Math.round(len*10)/10)+'칸',W/2,H*0.09,on?HOT:INK,Math.min(26,W/16));
  $('say').innerHTML=on?'수선의 길이 = <b class="r">평행선 사이의 거리</b>'+SM+'평행선 사이에 그은 선분 가운데 수선이 가장 짧아요. 어디에서 재어도 길이가 같아요.</small>':'비스듬한 선분은 수선보다 길어요.'+SM+'점을 가운데(0칸)로 옮겨 가장 짧은 선분을 찾아보세요.</small>'; }
function dsUI(){ $('ctl').innerHTML='<div class="dims">'+sl('sX','점 옮기기',-6,6,dx,1,'칸')+sl('sD','간격',2,4,dd,1,'칸')+'</div>'; sb('sX',function(v){ dx=v; },'칸'); sb('sD',function(v){ dd=v; },'칸'); }

/* ───────── 4. 사각형 만들기 ───────── */
var GC_=10, GR=7, QN=[['trap','사다리꼴'],['para','평행사변형'],['rhom','마름모'],['rect','직사각형'],['sq','정사각형']];
var PRE={trap:[[2,6],[9,6],[7,2],[4,2]],para:[[1,6],[7,6],[9,2],[3,2]],rhom:[[5,1],[7,4],[5,7],[3,4]],rect:[[2,2],[8,2],[8,6],[2,6]],sq:[[3,1],[8,1],[8,6],[3,6]]}, QV=PRE.para.map(function(p){ return p.slice(); }), qdrag=-1;
function qgeo(){ var u=Math.min((W-36)/GC_,(H-30)/GR); return {u:u,x0:(W-u*GC_)/2,y0:(H-u*GR)/2}; }
function qcls(V){ var e=[], i, cr=[], o={ok:true}; for(i=0;i<4;i++) e.push([V[(i+1)%4][0]-V[i][0],V[(i+1)%4][1]-V[i][1]]);
  for(i=0;i<4;i++) cr.push(e[i][0]*e[(i+1)%4][1]-e[i][1]*e[(i+1)%4][0]);
  if(!(cr.every(function(c){ return c>0; })||cr.every(function(c){ return c<0; }))) return {ok:false,e:e};
  var L=e.map(function(v){ return v[0]*v[0]+v[1]*v[1]; }); o.e=e; o.p02=e[0][0]*e[2][1]-e[0][1]*e[2][0]===0; o.p13=e[1][0]*e[3][1]-e[1][1]*e[3][0]===0;
  o.right=[0,1,2,3].map(function(i){ return e[i][0]*e[(i+3)%4][0]+e[i][1]*e[(i+3)%4][1]===0; });
  o.trap=o.p02||o.p13; o.para=o.p02&&o.p13; o.rhom=L[0]===L[1]&&L[1]===L[2]&&L[2]===L[3]; o.rect=o.para&&o.right[0]; o.sq=o.rect&&o.rhom; return o; }
function mkDraw(){ var q=qgeo(), i, j, c=qcls(QV), P=QV.map(function(p){ return [q.x0+p[0]*q.u,q.y0+p[1]*q.u]; });
  for(i=0;i<=GC_;i++) for(j=0;j<=GR;j++) dot(q.x0+i*q.u,q.y0+j*q.u,LINE,2.5);
  g.beginPath(); P.forEach(function(p,k){ if(k) g.lineTo(p[0],p[1]); else g.moveTo(p[0],p[1]); }); g.closePath(); g.fillStyle=rgba(GRAY,0.25); g.fill();
  for(i=0;i<4;i++){ var a=P[i], b=P[(i+1)%4], par=c.ok&&((i%2===0&&c.p02)||(i%2===1&&c.p13)); line(a[0],a[1],b[0],b[1],par?(i%2?rgba(ORANGE,1):rgba(BLUE,1)):INK,par?5.5:3.5); }
  if(c.ok) for(i=0;i<4;i++) if(c.right[i]){ var e1=c.e[i], e0=c.e[(i+3)%4], l1=Math.sqrt(e1[0]*e1[0]+e1[1]*e1[1]), l0=Math.sqrt(e0[0]*e0[0]+e0[1]*e0[1]); rmark(P[i],[e1[0]/l1,e1[1]/l1],[-e0[0]/l0,-e0[1]/l0],13); }
  P.forEach(function(p,k){ dot(p[0],p[1],HOT,k===qdrag?12:9); });
  var nm=c.ok?QN.filter(function(k){ return c[k[0]]; }).map(function(k){ return k[1]; }):[];
  $('say').innerHTML=!c.ok?'사각형 모양이 되도록 점을 옮겨 보세요.':(nm.length?'<b class="r">'+nm[nm.length-1]+'</b>'+(nm.length>1?' (이름이 '+nm.length+'개예요)':'')+SM+nm.join(', ')+'이라고 할 수 있어요.<br>같은 색 변끼리 서로 평행해요.</small>':'평행한 변이 없는 사각형이에요.'+SM+'한 쌍의 변이 평행하도록 점을 옮겨 보세요.</small>');
  var bx=$('qBad'); if(bx) bx.innerHTML=QN.map(function(k){ var y=c.ok&&c[k[0]]; return '<span style="display:inline-block;margin:3px 4px;padding:5px 12px;border-radius:999px;font-weight:800;font-size:16px;border:2px solid '+(y?'var(--accent)':'var(--line)')+';background:'+(y?'var(--accent)':'transparent')+';color:'+(y?'#fff':'var(--muted)')+'">'+(y?'✔ ':'✕ ')+k[1]+'</span>'; }).join(''); }
function mkUI(){ $('top').innerHTML='<div class="chips">'+QN.map(function(k){ return '<button class="chip" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>'; $('ctl').innerHTML='<div id="qBad" style="text-align:center;margin-top:6px"></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ QV=PRE[b.dataset.k].map(function(p){ return p.slice(); }); draw(); }; }); }
function qpt(e){ var r=cv.getBoundingClientRect(), k=(r.width/(cv.clientWidth||r.width))||1; return [(e.clientX-r.left)/k,(e.clientY-r.top)/k]; }
cv.addEventListener('pointerdown',function(e){ if(tab!=='make') return; var p=qpt(e), q=qgeo(), best=-1, bd=44*44; QV.forEach(function(v,i){ var x=q.x0+v[0]*q.u-p[0], y=q.y0+v[1]*q.u-p[1], d=x*x+y*y; if(d<bd){ bd=d; best=i; } }); qdrag=best; draw(); });
cv.addEventListener('pointermove',function(e){ if(tab!=='make'||qdrag<0) return; var p=qpt(e), q=qgeo(), x=Math.max(0,Math.min(GC_,Math.round((p[0]-q.x0)/q.u))), y=Math.max(0,Math.min(GR,Math.round((p[1]-q.y0)/q.u))); if(QV[qdrag][0]!==x||QV[qdrag][1]!==y){ QV[qdrag]=[x,y]; draw(); } });
function qend(){ if(qdrag>=0){ qdrag=-1; if(tab==='make') draw(); } }
cv.addEventListener('pointerup',qend); cv.addEventListener('pointercancel',qend);

/* ───────── 5. 사각형 사이의 관계 ───────── */
var rsel='sq', RB={trap:[0.04,0.05,0.92,0.9],para:[0.09,0.2,0.82,0.72],rect:[0.13,0.38,0.46,0.5],rhom:[0.41,0.38,0.46,0.5]}, RUP={trap:['trap'],para:['para','trap'],rect:['rect','para','trap'],rhom:['rhom','para','trap'],sq:['rect','rhom','para','trap']},
  RNM={trap:'사다리꼴',para:'평행사변형',rect:'직사각형',rhom:'마름모',sq:'정사각형'}, RDEF={trap:'평행한 변이 한 쌍이라도 있는 사각형',para:'마주 보는 두 쌍의 변이 서로 평행한 사각형',rhom:'네 변의 길이가 모두 같은 사각형',rect:'네 각이 모두 직각인 사각형',sq:'네 변의 길이가 모두 같고 네 각이 모두 직각인 사각형'};
function rlDraw(){ var up=RUP[rsel], fs=Math.min(18,W/22), B=function(k){ var b=RB[k]; return [b[0]*W,b[1]*H,b[2]*W,b[3]*H]; };
  ['trap','para','rect','rhom'].forEach(function(k,i){ var b=B(k), on=up.indexOf(k)>=0; rect(b[0],b[1],b[2],b[3],on?rgba([BLUE,GREEN,ORANGE,PINK][i],0.4):null,on?INK:LINE,on?3:2); });
  var a=B('rect'), b=B('rhom'), ox=b[0], ow=a[0]+a[2]-b[0]; if(rsel==='sq') rect(ox,a[1],ow,a[3],rgba(YEL,0.9),HOT,3.5);
  var t=B('trap'), p=B('para'); txt('사다리꼴',t[0]+t[2]/2,t[1]+(p[1]-t[1])/2,up.indexOf('trap')>=0?INK:MUTED,fs); txt('평행사변형',p[0]+p[2]/2,p[1]+(a[1]-p[1])/2,up.indexOf('para')>=0?INK:MUTED,fs);
  txt('직사각형',a[0]+(ox-a[0])/2,a[1]+a[3]/2,up.indexOf('rect')>=0?INK:MUTED,Math.min(fs,(ox-a[0])/4.4)); txt('마름모',ox+ow+(b[0]+b[2]-ox-ow)/2,a[1]+a[3]/2,up.indexOf('rhom')>=0?INK:MUTED,Math.min(fs,(ox-a[0])/4.4));
  txt('정사',ox+ow/2,a[1]+a[3]/2-fs*0.6,rsel==='sq'?HOT:MUTED,Math.min(fs,ow/2.4)); txt('각형',ox+ow/2,a[1]+a[3]/2+fs*0.6,rsel==='sq'?HOT:MUTED,Math.min(fs,ow/2.4));
  var o=up.filter(function(k){ return k!==rsel; }).map(function(k){ return RNM[k]; });
  $('say').innerHTML='<b class="r">'+RNM[rsel]+'</b>'+(o.length?KP(RNM[rsel],'은','는')+' '+o.join(', ')+'이기도 해요.':'')+SM+RNM[rsel]+': '+RDEF[rsel]+'<br>안쪽에 있는 사각형은 바깥쪽 사각형의 성질을 모두 가지고 있어요.</small>'; }
function rlUI(){ $('top').innerHTML=chipsH([['sq','정사각형'],['rect','직사각형'],['rhom','마름모'],['para','평행사변형'],['trap','사다리꼴']],rsel,'k'); $('ctl').innerHTML='';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rsel=b.dataset.k; ui(); draw(); }; }); }

/* ───────── 6. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a, b, q;
  if(t===0){ var k=pick(['trap','para','rhom','rect']), ws=RDEF[k].split(' '), h=Math.ceil(ws.length/2); q={lines:[ws.slice(0,h).join(' '),ws.slice(h).join(' ')],ask:'어떤 사각형일까요?',kind:'mc',opts:shuf(['사다리꼴','평행사변형','마름모','직사각형']),ans:RNM[k],show:RNM[k],why:RNM[k]+': '+RDEF[k]}; }
  else if(t===1){ a=ri(5,16)*5; if(a===90) a=70; q={lines:['평행사변형의 한 각: '+a+'°'],ask:'이웃한 각의 크기는?',kind:'num',ans:180-a,unit:'°',show:(180-a)+'°',why:'평행사변형에서 이웃한 두 각의 합은 180°예요. 180° − '+a+'° = '+(180-a)+'°',hint:'이웃한 두 각의 합은 180°예요.'}; }
  else if(t===2){ a=ri(3,15); q={lines:['마름모의 한 변: '+a+'cm'],ask:'네 변의 길이의 합은?',kind:'num',ans:a*4,unit:'cm',show:a*4+'cm',why:'마름모는 네 변의 길이가 모두 같아요. '+a+' × 4 = '+a*4,hint:'네 변의 길이가 모두 같아요.'}; }
  else if(t===3){ var pr=pick([['정사각형','마름모',1],['정사각형','직사각형',1],['직사각형','평행사변형',1],['마름모','평행사변형',1],['평행사변형','사다리꼴',1],['직사각형','정사각형',0],['평행사변형','마름모',0],['사다리꼴','평행사변형',0],['마름모','정사각형',0]]);
    q={lines:['모든 '+pr[0]+KP(pr[0],'은','는'),pr[1]+'이라고 할 수 있다'],ask:'맞을까요?',kind:'mc',opts:['⭕ 맞아요','❌ 아니에요'],ans:pr[2]?'⭕ 맞아요':'❌ 아니에요',show:pr[2]?'맞아요':'아니에요',why:pr[2]?pr[0]+KP(pr[0],'은','는')+' '+pr[1]+'의 성질을 모두 가지고 있어요.':pr[1]+'의 성질을 갖지 않은 '+pr[0]+'도 있어요.'}; }
  else { a=ri(3,12); b=ri(3,12); q={lines:['평행사변형의 이웃한 두 변','「'+a+'cm, '+b+'cm」'],ask:'네 변의 길이의 합은?',kind:'num',ans:(a+b)*2,unit:'cm',show:(a+b)*2+'cm',why:'마주 보는 변의 길이가 같아요. ('+a+' + '+b+') × 2 = '+(a+b)*2,hint:'마주 보는 변의 길이가 서로 같아요.'}; }
  return q; });

var UIS={vert:vtUI,par:plUI,dist:dsUI,make:mkUI,rel:rlUI,quiz:quiz.ui}, DRS={vert:vtDraw,par:plDraw,dist:dsDraw,make:mkDraw,rel:rlDraw,quiz:quiz.draw};
function ui(){ if(tab!=='make'&&tab!=='rel') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; $('hint').textContent=t==='make'?'👆 빨간 점을 끌어 사각형을 바꿔 보세요':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
