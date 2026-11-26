/* 평면도형의 이동 (4학년 1학기): 밀기, 뒤집기, 돌리기 */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
var M0=[[1,2,0],[1,0,0],[1,1,1]], PATS=[[[1,2,0],[1,0,0],[1,1,1]],[[2,1,1],[0,1,0],[0,1,0]].map(function(r){ return r; }),[[1,1,2],[1,0,0],[1,0,0]],[[0,2,0],[1,1,0],[0,1,1]],[[2,0,0],[1,1,0],[1,1,1]]];
var OPS={R:'오른쪽으로 뒤집기',L:'왼쪽으로 뒤집기',U:'위쪽으로 뒤집기',D:'아래쪽으로 뒤집기',c90:'시계 방향 90°',c180:'시계 방향 180°',c270:'시계 방향 270°',c360:'시계 방향 360°',a90:'시계 반대 방향 90°',a180:'시계 반대 방향 180°',a270:'시계 반대 방향 270°'};
function opDeg(op){ return op[0]==='c'?+op.slice(1):(op[0]==='a'?-op.slice(1):0); }
/* 행렬에 이동 적용 */
function ap(m,op){ var f=[[0,0,0],[0,0,0],[0,0,0]], r, c, d=((opDeg(op)%360)+360)%360;
  for(r=0;r<3;r++) for(c=0;c<3;c++){ var v=m[r][c]; if(op==='R'||op==='L') f[r][2-c]=v; else if(op==='U'||op==='D') f[2-r][c]=v; else if(d===90) f[c][2-r]=v; else if(d===180) f[2-r][2-c]=v; else if(d===270) f[2-c][r]=v; else f[r][c]=v; } return f; }
function same(a,b){ return JSON.stringify(a)===JSON.stringify(b); }
/* 가운데 (0,0) 기준으로 3×3 무늬 그리기 */
function drawM(m,s,al){ var c=s/3, r, k; g.globalAlpha=al==null?1:al; g.fillStyle=HALO; g.fillRect(-s/2,-s/2,s,s);
  for(r=0;r<3;r++) for(k=0;k<3;k++) if(m[r][k]){ g.fillStyle=rgba(m[r][k]===2?ORANGE:BLUE,1); g.fillRect(-s/2+k*c,-s/2+r*c,c,c); }
  g.strokeStyle=INK; g.lineWidth=1; for(r=1;r<3;r++){ g.beginPath(); g.moveTo(-s/2+r*c,-s/2); g.lineTo(-s/2+r*c,s/2); g.moveTo(-s/2,-s/2+r*c); g.lineTo(s/2,-s/2+r*c); g.stroke(); }
  g.lineWidth=3; g.strokeRect(-s/2,-s/2,s,s); g.globalAlpha=1; }
function at(m,cx,cy,s,al){ g.save(); g.translate(cx,cy); drawM(m,s,al); g.restore(); }
/* 제자리에서 op 를 t(0~1)만큼 진행한 모습 */
function atOp(m,cx,cy,s,op,t){ g.save(); g.translate(cx,cy); if(op==='R'||op==='L') g.scale(1-2*t||0.001,1); else if(op==='U'||op==='D') g.scale(1,1-2*t||0.001); else g.rotate(opDeg(op)*t*Math.PI/180); drawM(m,s); g.restore(); }
function arrow(x1,y1,x2,y2,col){ var a=Math.atan2(y2-y1,x2-x1); line(x1,y1,x2,y2,col,4); g.beginPath(); g.moveTo(x2+12*Math.cos(a),y2+12*Math.sin(a)); g.lineTo(x2-8*Math.cos(a-0.6),y2-8*Math.sin(a-0.6)); g.lineTo(x2-8*Math.cos(a+0.6),y2-8*Math.sin(a+0.6)); g.closePath(); g.fillStyle=col; g.fill(); }
function bt(id,lab,pri,st){ return '<button class="btn'+(pri?' primary':'')+'" id="'+id+'" style="font-size:18px;'+(st||'')+'">'+lab+'</button>'; }
function rowH(h){ return '<div class="row" style="justify-content:center;flex-wrap:wrap;gap:10px;margin-top:8px">'+h+'</div>'; }

/* ───────── 1. 밀기 ───────── */
var SC=11, SR=7, sx=4, sy=2, sfx=4, sfy=2, X0=4, Y0=2;
function slDraw(){ var u=Math.min((W-24)/SC,(H-20)/SR), x0=(W-u*SC)/2, y0=(H-u*SR)/2, i;
  for(i=0;i<=SC;i++) line(x0+i*u,y0,x0+i*u,y0+SR*u,LINE,1); for(i=0;i<=SR;i++) line(x0,y0+i*u,x0+SC*u,y0+i*u,LINE,1);
  at(M0,x0+(X0+1.5)*u,y0+(Y0+1.5)*u,u*3,0.3); at(M0,x0+(sfx+1.5)*u,y0+(sfy+1.5)*u,u*3);
  var dx=sx-X0, dy=sy-Y0, w=[]; if(dx) w.push((dx>0?'오른쪽':'왼쪽')+'으로 '+Math.abs(dx)+'칸'); if(dy) w.push((dy>0?'아래쪽':'위쪽')+'으로 '+Math.abs(dy)+'칸');
  $('say').innerHTML=w.length?'<b class="r">'+w.join(', ')+'</b> 밀었어요.'+SM+'도형을 밀면 모양은 그대로이고 위치만 바뀌어요.</small>':'화살표를 눌러 도형을 밀어 보세요.'; }
function slGo(dx,dy){ var nx=sx+dx, ny=sy+dy; if(nx<0||ny<0||nx>SC-3||ny>SR-3) return; anStop(); sfx=sx; sfy=sy; var fx=sx, fy=sy, k=0; sx=nx; sy=ny; anim(function(){ return k; },function(v){ k=v; sfx=fx+dx*v; sfy=fy+dy*v; },1,350); }
function slUI(){ $('ctl').innerHTML=rowH(bt('sL','◀',1,'min-width:58px')+bt('sU','▲',1,'min-width:58px')+bt('sD','▼',1,'min-width:58px')+bt('sR','▶',1,'min-width:58px')+bt('s0','↩ 처음'));
  $('sL').onclick=function(){ slGo(-1,0); }; $('sR').onclick=function(){ slGo(1,0); }; $('sU').onclick=function(){ slGo(0,-1); }; $('sD').onclick=function(){ slGo(0,1); }; $('s0').onclick=function(){ anStop(); sx=sfx=X0; sy=sfy=Y0; draw(); }; }

/* ───────── 2. 뒤집기 ───────── */
var fop='R', ft=1;
function flDraw(){ var s=Math.min(H*0.3,W*0.26), cx=W/2, cy=H/2, d={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]}[fop], ex=cx+d[0]*s*0.56, ey=cy+d[1]*s*0.56;
  /* 접는 선(거울) */ if(d[0]) line(ex,cy-s*0.75,ex,cy+s*0.75,HOT,2.5,[7,6]); else line(cx-s*0.75,ey,cx+s*0.75,ey,HOT,2.5,[7,6]);
  at(M0,cx,cy,s);
  g.save(); g.translate(ex,ey); if(d[0]) g.scale(1-2*ft||0.001,1); else g.scale(1,1-2*ft||0.001); g.translate(-d[0]*s*0.56,-d[1]*s*0.56); drawM(M0,s,ft<1?0.85:1); g.restore();
  txt('처음',cx,cy+(d[1]>0?-1:1)*(s*0.5+16),MUTED,15);
  $('say').innerHTML='<b class="r">'+OPS[fop]+'</b>'+SM+(d[0]?'왼쪽·오른쪽으로 뒤집으면 도형의 <b>왼쪽과 오른쪽</b>이 서로 바뀌어요.':'위쪽·아래쪽으로 뒤집으면 도형의 <b>위쪽과 아래쪽</b>이 서로 바뀌어요.')+'<br>왼쪽으로 뒤집은 모양과 오른쪽으로 뒤집은 모양은 같아요.</small>'; }
function flUI(){ $('ctl').innerHTML=rowH([['L','◀ 왼쪽'],['U','▲ 위쪽'],['D','▼ 아래쪽'],['R','▶ 오른쪽']].map(function(k){ return '<button class="btn'+(k[0]===fop?' primary':'')+'" data-f="'+k[0]+'" style="font-size:18px">'+k[1]+'</button>'; }).join(''));
  $('ctl').querySelectorAll('[data-f]').forEach(function(b){ b.onclick=function(){ fop=b.dataset.f; ft=0; ui(); anim(function(){ return ft; },function(v){ ft=v; },1,1100); }; }); }

/* ───────── 3. 돌리기 ───────── */
var rop='c90', rt=1;
function rtDraw(){ var s=Math.min(H*0.38,W*0.26), x1=W*0.25, x2=W*0.69, cy=H*0.52, d=opDeg(rop), R=s*0.86, a0=-Math.PI/2, a1=a0+d*rt*Math.PI/180;
  at(M0,x1,cy,s); txt('처음',x1,cy+s/2+18,MUTED,15); arrow(x1+s/2+10,cy,x2-s*0.72-22,cy,MUTED);
  atOp(M0,x2,cy,s*0.92,rop,rt);
  g.beginPath(); g.arc(x2,cy,R,a0,a1,d<0); g.strokeStyle=HOT; g.lineWidth=4; g.stroke(); var ax=x2+R*Math.cos(a1), ay=cy+R*Math.sin(a1), tg=a1+(d<0?-1:1)*Math.PI/2; if(rt>0.05){ g.beginPath(); g.moveTo(ax+12*Math.cos(tg),ay+12*Math.sin(tg)); g.lineTo(ax-7*Math.cos(tg-0.7),ay-7*Math.sin(tg-0.7)); g.lineTo(ax-7*Math.cos(tg+0.7),ay-7*Math.sin(tg+0.7)); g.closePath(); g.fillStyle=HOT; g.fill(); }
  txt(Math.round(Math.abs(d)*rt)+'°',x2,cy-R-16<14?14:cy-R-16,HOT,18);
  var ad=Math.abs(d), eq=ad===360?'처음 모양과 같아요.':(ad===180?'시계 방향 180° = 시계 반대 방향 180°':(d>0?'시계 방향 '+ad+'° = 시계 반대 방향 '+(360-ad)+'°':'시계 반대 방향 '+ad+'° = 시계 방향 '+(360-ad)+'°'));
  $('say').innerHTML='<b class="r">'+OPS[rop]+'</b> 돌리기'+SM+eq+'<br>도형을 돌리면 모양은 그대로이고 방향이 바뀌어요.</small>'; }
function rtUI(){ var B=function(k,l){ return '<button class="btn'+(k===rop?' primary':'')+'" data-r="'+k+'" style="font-size:18px">'+l+'</button>'; };
  $('ctl').innerHTML=rowH(B('c90','↻ 90°')+B('c180','↻ 180°')+B('c270','↻ 270°')+B('c360','↻ 360°'))+rowH(B('a90','↺ 90°')+B('a180','↺ 180°')+B('a270','↺ 270°'));
  $('ctl').querySelectorAll('[data-r]').forEach(function(b){ b.onclick=function(){ rop=b.dataset.r; rt=0; ui(); anim(function(){ return rt; },function(v){ rt=v; },1,500+Math.abs(opDeg(rop))*6); }; }); }

/* ───────── 4. 이어서 움직이기 ───────── */
var cm=M0, cprev=M0, cop='', ct=1, chist=[];
function cbDraw(){ var s=Math.min(H*0.4,W*0.28), x1=W*0.25, x2=W*0.72, cy=H*0.46;
  at(M0,x1,cy,s*0.8,0.9); txt('처음',x1,cy+s*0.4+18,MUTED,15); arrow(x1+s*0.4+10,cy,x2-s*0.72-18,cy,MUTED);
  if(ct<1&&cop) atOp(cprev,x2,cy,s,cop,ct); else at(cm,x2,cy,s);
  var h=chist.slice(-3).map(function(o){ return OPS[o].replace(' 방향','').replace('으로 ',' '); }); txt(chist.length?(chist.length>3?'… → ':'')+h.join(' → '):'단추를 눌러 이어서 움직여 보세요',W/2,H-18,chist.length?INK:MUTED,Math.min(15,W/28));
  $('say').innerHTML=chist.length?(same(cm,M0)?'<b class="r">처음 모양</b>으로 돌아왔어요!':'<b class="r">'+chist.length+'번</b> 움직였어요.')+SM+'같은 방향으로 2번 뒤집으면 처음 모양이 돼요. 90°씩 4번 돌려도 처음 모양이 돼요.</small>':'뒤집기와 돌리기를 이어서 해 보세요.'; }
function cbGo(op){ anStop(); cprev=cm; cm=ap(cm,op); cop=op; chist.push(op); ct=0; anim(function(){ return ct; },function(v){ ct=v; },1,800); }
function cbUI(){ $('ctl').innerHTML=rowH(bt('cR','↔ 오른쪽으로 뒤집기',1)+bt('cD','↕ 아래쪽으로 뒤집기',1))+rowH(bt('cC','↻ 90°',1)+bt('cA','↺ 90°',1)+bt('c0','↩ 처음'));
  $('cR').onclick=function(){ cbGo('R'); }; $('cD').onclick=function(){ cbGo('D'); }; $('cC').onclick=function(){ cbGo('c90'); }; $('cA').onclick=function(){ cbGo('a90'); }; $('c0').onclick=function(){ anStop(); cm=cprev=M0; chist=[]; ct=1; draw(); }; }

/* ───────── 5. 문제 풀기 ───────── */
var QO=['R','D','c90','c180','a90'], qz={m:M0,op:'R',opts:[],done:false,right:false,pickd:''}, qscore=[0,0];
function qzNew(){ qz.m=pick(PATS); qz.op=pick(QO); qz.opts=shuf(QO.filter(function(o){ return o!==qz.op; })).slice(0,3).concat([qz.op]); qz.opts=shuf(qz.opts); qz.done=false; qz.right=false; }
function qzDraw(){ var s=Math.min(H*0.4,W*0.28), x1=W*0.26, x2=W*0.74, cy=H*0.48;
  at(qz.m,x1,cy,s); txt('처음',x1,cy+s/2+18,MUTED,15); at(ap(qz.m,qz.op),x2,cy,s); txt('움직인 뒤',x2,cy+s/2+18,MUTED,15);
  arrow(x1+s/2+12,cy,x2-s/2-22,cy,HOT); txt('?',W/2,cy-22,HOT,30);
  $('say').innerHTML=qz.done?((qz.right?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'답: '+OPS[qz.op]+SM+(qz.op==='R'?'왼쪽과 오른쪽이 서로 바뀌었어요.':(qz.op==='D'?'위쪽과 아래쪽이 서로 바뀌었어요.':'주황색 칸이 어디로 갔는지 보세요.'))+'</small>'):'어떻게 움직였을까요?'; }
function qzUI(){ $('ctl').innerHTML=rowH(qz.opts.map(function(o){ return '<button class="btn'+(qz.done&&o!==qz.op?'':' primary')+'" data-o="'+o+'"'+(qz.done?' disabled':'')+' style="font-size:17px">'+OPS[o]+'</button>'; }).join(''))+rowH('<button class="btn'+(qz.done?' primary':'')+'" id="qNext" style="font-size:17px">'+(qz.done?'다음 문제 ▶':'건너뛰기')+'</button>'+scoreH(qscore));
  if(!qz.done) $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ qz.done=true; qz.right=b.dataset.o===qz.op; qscore[1]++; if(qz.right) qscore[0]++; ui(); draw(); }; });
  $('qNext').onclick=function(){ if(!qz.done) qscore[1]++; qzNew(); ui(); draw(); }; }
qzNew();

var UIS={slide:slUI,flip:flUI,turn:rtUI,combo:cbUI,quiz:qzUI}, DRS={slide:slDraw,flip:flDraw,turn:rtDraw,combo:cbDraw,quiz:qzDraw};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); ft=1; rt=1; ct=1; sfx=sx; sfy=sy; tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
