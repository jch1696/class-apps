/* 분수의 나눗셈 (6학년 1·2학기) */
/* ───────── 1. (자연수)÷(자연수) ───────── */
var na=3, nb=4, nt=0;
function nnDraw(){ var BW=BWd(), x0=(W-BW)/2, top=16, hh=Math.min(34,(H*0.52)/na-8), i, j;
  for(i=0;i<na;i++){ var y=top+i*(hh+8), fl=[]; if(nt>0) for(j=0;j<nb;j++) fl.push([1,rgba(PC[j],0.85*nt)]); bar(x0,y,BW,hh,nb,fl); }
  var y2=top+na*(hh+8)+34, units=Math.max(1,Math.ceil(na/nb)), uw=Math.min(BW,BW/units);
  txt('한 명의 몫',x0,y2-16,MUTED,15,'left');
  for(i=0;i<units;i++) bar(x0+i*uw,y2,uw,hh,nb,i===0?[[Math.round(Math.min(na,nb)*(nt>0.5?1:0)),rgba(PC[0],0.85)]]:[[nt>0.5?Math.max(0,Math.min(nb,na-i*nb)):0,rgba(PC[0],0.85)]]);
  if(nt>0.5) for(i=1;i<units;i++){ }
  var b=$('nGo'); if(b&&!anT) b.textContent=nt>0.5?'◀ 되돌리기':'▶ 똑같이 나누기';
  $('say').innerHTML=nt<0.99?('떡 '+na+'개를 '+nb+'명이 똑같이 나누어 먹으려고 해요. 한 명이 먹는 양은 얼마일까요?<small>먼저 예상해 보고 ▶ 똑같이 나누기를 눌러 보세요.</small>'):
    ('떡 1개를 '+nb+'명이 나누면 한 명의 몫은 '+F(1,nb)+'이에요. '+na+'개를 나누면 '+F(1,nb)+'이 '+na+'개이므로 <b class="r">'+na+' ÷ '+nb+' = '+F(na,nb)+(na>=nb?' = '+MX(na,nb):'')+'</b><small style="font-size:15.5px;color:var(--ink)">(자연수) ÷ (자연수)의 몫은 나누어지는 수를 분자, 나누는 수를 분모로 하는 분수로 나타낼 수 있어요.</small>'); }
function nnUI(){ $('ctl').innerHTML='<div class="dims">'+sld('nA','떡의 수',1,5,na)+sld('nB','사람 수',2,6,nb)+'</div><div class="row"><button class="btn primary" id="nGo">▶ 똑같이 나누기</button></div>';
  sldBind('nA',function(v){ anStop(); na=v; nt=0; }); sldBind('nB',function(v){ anStop(); nb=v; nt=0; });
  $('nGo').onclick=function(){ anim(function(){ return nt; },function(v){ nt=v; },nt>0.5?0:1,1000); }; }

/* ───────── 2. (분수)÷(자연수) ───────── */
var gn=3, gd=4, gk=2, gt=0;
function fnDraw(){ gn=Math.min(gn,gd); var BW=Math.min(BWd(),460), x0=(W-BW)/2, y0=20, BH=Math.min(H-60,230), cw=BW/gd, rh=BH/gk, i;
  rect(x0,y0,gn*cw,BH,rgba(BLUE,0.45)); if(gt>0) rect(x0,y0,gn*cw,rh,rgba(ORANGE,0.9*gt));
  for(i=1;i<gd;i++) line(x0+i*cw,y0,x0+i*cw,y0+BH,INK,1.5);
  if(gt>0){ g.globalAlpha=gt; for(i=1;i<gk;i++) line(x0,y0+i*rh,x0+BW,y0+i*rh,HOT,2,[7,5]); g.globalAlpha=1; }
  rect(x0,y0,BW,BH,null,INK,2.4); cfr(gn,gd,x0+gn*cw/2,y0+BH+24,ACC,16);
  var b=$('gGo'); if(b&&!anT) b.textContent=gt>0.5?'◀ 되돌리기':'▶ '+gk+'등분 하기';
  var D=gd*gk, simp=gcd(gn,D)>1?' = '+MX(gn,D):'';
  $('say').innerHTML=gt<0.99?('파란 부분은 전체의 '+F(gn,gd)+P(gn,'이에요','예요')+'. 이것을 '+gk+'로 똑같이 나누면 전체의 얼마일까요?<small>▶ '+gk+'등분 하기를 눌러 보세요.</small>'):
    ('전체가 '+gd+' × '+gk+' = '+D+'칸으로 나뉘고, 주황색은 그중 '+gn+'칸이에요. <b class="r">'+F(gn,gd)+' ÷ '+gk+' = '+F(gn,gd)+' × '+F(1,gk)+' = '+F(gn,D)+simp+'</b><small style="font-size:15.5px;color:var(--ink)">(분수) ÷ (자연수)는 자연수를 '+F(1,'자연수')+'로 바꾸어 곱해요.'+(gn%gk===0?' 분자가 '+gk+'로 나누어떨어지므로 '+F(gn+' ÷ '+gk,gd)+' = '+F(gn/gk,gd)+'로 계산해도 돼요.':'')+'</small>'); }
function fnUI(){ $('ctl').innerHTML='<div class="dims">'+sld('gD','분모',2,8,gd)+sld('gN','분자',1,gd,gn)+sld('gK','나누는 수',2,5,gk)+'</div><div class="row"><button class="btn primary" id="gGo">▶ 등분 하기</button></div>';
  sldBind('gD',function(v){ anStop(); gd=v; gn=Math.min(gn,gd); gt=0; }); sldBind('gN',function(v){ anStop(); gn=v; gt=0; }); sldBind('gK',function(v){ anStop(); gk=v; gt=0; });
  $('gGo').onclick=function(){ anim(function(){ return gt; },function(v){ gt=v; },gt>0.5?0:1,1000); }; }

/* 막대 위에 b칸씩 묶음 표시 (cnt: 보여 줄 묶음 수, 소수 가능) */
function groups(x0,y,cw,hh,a,b,cnt){ var q=Math.ceil(a/b), i; for(i=0;i<q&&i<cnt;i++){ var s=i*b, e=Math.min(a,s+b), col=i%2?GREEN:ORANGE; rect(x0+s*cw,y,(e-s)*cw,hh,rgba(col,0.85)); rect(x0+s*cw+2,y+2,(e-s)*cw-4,hh-4,null,HOT,2.5);
    if(e-s===b) txt((i+1)+'번',x0+(s+e)/2*cw,y-14,HOT,15); else cfr(e-s,b,x0+(s+e)/2*cw,y-22,HOT,13); } }
/* ───────── 3. (분수)÷(분수) 분모가 같을 때 ───────── */
var fa=6, fd=7, fb=2, fc=0;
function ffDraw(){ fa=Math.min(fa,fd); fb=Math.min(fb,fd); var BW=BWd(), x0=(W-BW)/2, hh=50, y1=56, y2=y1+hh+70, cw=BW/fd, q=Math.ceil(fa/fb);
  bar(x0,y1,BW,hh,fd,[[fa,rgba(BLUE,0.5)]]); groups(x0,y1,cw,hh,fa,fb,fc); for(var i=1;i<fd;i++) line(x0+i*cw,y1,x0+i*cw,y1+hh,INK,1.5); rect(x0,y1,BW,hh,null,INK,2.4);
  cfr(fa,fd,x0-2,y1+hh+26,ACC,15); txt('나누어지는 수',x0+24,y1+hh+26,MUTED,14,'left');
  bar(x0,y2,BW,hh*0.8,fd,[[fb,rgba(ORANGE,0.85)]]); cfr(fb,fd,x0-2,y2+hh*0.8+26,HOT,15); txt('나누는 수 (한 묶음)',x0+24,y2+hh*0.8+26,MUTED,14,'left');
  var b=$('fGo'); if(b&&!anT) b.textContent=fc>=q?'◀ 되돌리기':'▶ 덜어 내기';
  var full=Math.floor(fa/fb), r=fa%fb;
  $('say').innerHTML=fc<q?(F(fa,fd)+' 안에 '+F(fb,fd)+P(fb,'이','가')+' 몇 번 들어갈까요?<small>'+F(fa,fd)+P(fa,'은','는')+' '+F(1,fd)+'이 '+fa+'개, '+F(fb,fd)+P(fb,'은','는')+' '+F(1,fd)+'이 '+fb+'개예요. ▶ 덜어 내기를 눌러 보세요.</small>'):
    (F(1,fd)+'이 '+fa+'개인 것을 '+fb+'개씩 묶으면 '+(r?(full?full+'묶음과 ':'')+'한 묶음의 '+F(r,fb):full+'묶음')+'이에요. <b class="r">'+F(fa,fd)+' ÷ '+F(fb,fd)+' = '+fa+' ÷ '+fb+' = '+(fa%fb?F(fa,fb)+(MX(fa,fb)!==F(fa,fb)?' = '+MX(fa,fb):''):fa/fb)+'</b><small style="font-size:15.5px;color:var(--ink)">분모가 같은 (분수) ÷ (분수)는 분자끼리 나누어 계산해요.</small>'); }
function ffUI(){ $('ctl').innerHTML='<div class="dims">'+sld('fD','분모',2,10,fd)+sld('fA','나누어지는 수의 분자',1,fd,fa)+sld('fB','나누는 수의 분자',1,fd,fb)+'</div><div class="row"><button class="btn primary" id="fGo">▶ 덜어 내기</button></div>';
  sldBind('fD',function(v){ anStop(); fd=v; fa=Math.min(fa,fd); fb=Math.min(fb,fd); fc=0; }); sldBind('fA',function(v){ anStop(); fa=v; fc=0; }); sldBind('fB',function(v){ anStop(); fb=v; fc=0; });
  $('fGo').onclick=function(){ var q=Math.ceil(fa/fb); if(fc>=q){ anStop(); fc=0; draw(); return; } anStop(); fc=0; var t0=performance.now(); (function step(now){ fc=Math.min(q,Math.floor((now-t0)/550)+1); if(fc<q){ anT=requestAnimationFrame(step); draw(); } else { anT=null; draw(); } })(t0); }; }

/* ───────── 4. 분모가 다를 때 ───────── */
var xa=3, xb=4, xc=2, xd=5, xs=0;
function fxDraw(){ xa=Math.min(xa,xb); xc=Math.min(xc,xd); var BW=BWd()-40, x0=(W-BW)/2+30, hh=48, y1=50, y2=y1+hh+56, L=xb*xd, A=xa*xd, C=xc*xb, cw=BW/L, i;
  bar(x0,y1,BW,hh,xs>=1?L:xb,[[xs>=1?A:xa,rgba(BLUE,0.5)]],xs>=1); if(xs>=2){ groups(x0,y1,cw,hh,A,C,99); for(i=1;i<L;i++) line(x0+i*cw,y1,x0+i*cw,y1+hh,INK,0.8); rect(x0,y1,BW,hh,null,INK,2.4); }
  if(xs>=1) for(i=1;i<xb;i++) line(x0+i*BW/xb,y1-5,x0+i*BW/xb,y1+hh+5,INK,2.4);
  bar(x0,y2,BW,hh,xs>=1?L:xd,[[xs>=1?C:xc,rgba(ORANGE,0.85)]],xs>=1); if(xs>=1) for(i=1;i<xd;i++) line(x0+i*BW/xd,y2-5,x0+i*BW/xd,y2+hh+5,INK,2.4);
  cfr(xs>=1?A:xa,xs>=1?L:xb,x0-30,y1+hh/2,ACC,17); cfr(xs>=1?C:xc,xs>=1?L:xd,x0-30,y2+hh/2,HOT,17);
  cexpr([{n:xa,d:xb},'÷',{n:xc,d:xd}].concat(xs>=2?['=',A+' ÷ '+C]:[]).concat(xs>=3?['=',{n:xa,d:xb},'×',{n:xd,d:xc}]:[]),W/2,y2+hh+50,24);
  $('say').innerHTML=[F(xa,xb)+' ÷ '+F(xc,xd)+P(xc,'은','는')+' 어떻게 계산할까요?<small>분모가 달라서 '+F(xa,xb)+' 안에 '+F(xc,xd)+P(xc,'이','가')+' 몇 번 들어가는지 바로 알기 어려워요. [다음 ▶]을 눌러 보세요.</small>',
    '먼저 <b class="r">통분</b>해요. 두 막대를 모두 '+xb+' × '+xd+' = '+L+'칸으로 나누면 '+F(xa,xb)+' = '+F(A,L)+', '+F(xc,xd)+' = '+F(C,L)+'이에요.',
    '분모가 같아졌으니 <b class="r">분자끼리</b> 나누어요. '+A+'칸을 '+C+'칸씩 묶으면 '+A+' ÷ '+C+' = '+(A%C?F(A,C):A/C)+'<small style="font-size:15.5px;color:var(--ink)">'+F(A,L)+' ÷ '+F(C,L)+' = '+A+' ÷ '+C+' = '+MX(A,C)+'</small>',
    A+' ÷ '+C+' = '+F(xa+' × '+xd,xb+' × '+xc)+'이므로 <b class="r">'+F(xa,xb)+' ÷ '+F(xc,xd)+' = '+F(xa,xb)+' × '+F(xd,xc)+' = '+MX(A,C)+'</b><small style="font-size:15.5px;color:var(--ink)">(분수) ÷ (분수)는 나누는 분수의 분모와 분자를 바꾸어 곱해요.</small>'][xs]; }
function fxUI(){ $('ctl').innerHTML='<div class="dims">'+sld('xB','앞 분수의 분모',2,6,xb)+sld('xA','앞 분수의 분자',1,xb,xa)+sld('xD','뒤 분수의 분모',2,6,xd)+sld('xC','뒤 분수의 분자',1,xd,xc)+'</div><div class="row"><button class="btn" id="xPrev">◀ 이전</button><button class="btn primary" id="xNext">다음 ▶</button><span class="score">'+(xs+1)+' / 4단계</span></div>';
  sldBind('xB',function(v){ xb=v; xa=Math.min(xa,xb); xs=0; }); sldBind('xA',function(v){ xa=v; xs=0; }); sldBind('xD',function(v){ xd=v; xc=Math.min(xc,xd); xs=0; }); sldBind('xC',function(v){ xc=v; xs=0; });
  $('xPrev').onclick=function(){ xs=Math.max(0,xs-1); fxUI(); draw(); }; $('xNext').onclick=function(){ xs=Math.min(3,xs+1); fxUI(); draw(); }; }

/* ───────── 5. 문제 풀기 ───────── */
var qz=null, qzScore=[0,0];
function prop(dmax){ var d, n; do{ d=2+rnd(dmax-1); n=1+rnd(d-1); }while(gcd(n,d)>1); return {n:n,d:d}; }
function qzNew(){ var t=rnd(6), q={done:false,tries:0}, a, b, c, d, k, w;
  if(t===0){ a=1+rnd(9); do{ b=2+rnd(8); }while(a%b===0); q.tk=[a+' ÷ '+b]; q.n=a; q.d=b; q.why=a+' ÷ '+b+' = '+F(a,b); }
  else if(t===1){ a=prop(9); k=2+rnd(5); q.tk=[a,'÷',''+k]; q.n=a.n; q.d=a.d*k; q.why=F(a.n,a.d)+' × '+F(1,k)+' = '+F(a.n,a.d*k); }
  else if(t===2){ d=3+rnd(9); a=1+rnd(d-1); do{ b=1+rnd(d-1); }while(b===a); q.tk=[{n:a,d:d},'÷',{n:b,d:d}]; q.n=a; q.d=b; q.why='분자끼리 나누면 '+a+' ÷ '+b+' = '+F(a,b); }
  else if(t===3){ a=prop(8); do{ b=prop(8); }while(b.d===a.d); q.tk=[a,'÷',b]; q.n=a.n*b.d; q.d=a.d*b.n; q.why=F(a.n,a.d)+' × '+F(b.d,b.n)+' = '+F(q.n,q.d); }
  else if(t===4){ k=2+rnd(7); b=prop(7); q.tk=[''+k,'÷',b]; q.n=k*b.d; q.d=b.n; q.why=k+' × '+F(b.d,b.n)+' = '+F(q.n,q.d); }
  else { w=1+rnd(3); a=prop(6); b=prop(6); var im=w*a.d+a.n; q.tk=[{w:w,n:a.n,d:a.d},'÷',b]; q.n=im*b.d; q.d=a.d*b.n; q.why='대분수를 가분수로 바꾸면 '+F(im,a.d)+' × '+F(b.d,b.n)+' = '+F(q.n,q.d); }
  qz=q; }
function qzDraw(){ if(!qz) qzNew(); cexpr(qz.tk.concat(['=','?']),W/2,H/2,Math.min(52,W/11));
  var simp=MX(qz.n,qz.d);
  $('say').innerHTML=qz.done?('<b class="r">정답이에요!</b> 답: '+simp+'<small style="font-size:15.5px;color:var(--ink)">'+qz.why+(qz.why.slice(-(F(qz.n,qz.d).length))===simp?'':' = '+simp)+'</small>'):
    ('계산해 보세요.'+(qz.tries>=2?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+qz.why.split(' = ')[0]+'</small>':'<small>답은 분수로 써요. 자연수 칸은 대분수일 때만 쓰고, 답이 자연수이면 자연수 칸에만 쓰면 돼요.</small>')); }
function qzUI(msg,cls){ if(!qz) qzNew(); $('ctl').innerHTML='<div class="row" style="margin-top:8px;font-size:17px"><span>답 = '+frIn('q',true)+'</span>'+(qz.done?'':'<button class="btn primary" id="qGo">확인하기</button>')+'<button class="btn'+(qz.done?' primary':'')+'" id="qNext">'+(qz.done?'다음 문제 ▶':'건너뛰기')+'</button>'+scoreH(qzScore)+'</div><p class="msg '+(cls||'')+'" id="qMsg">'+(msg||'')+'</p>';
  if(qz.done) frShow('q',qz.n,qz.d);
  if(!qz.done) $('qGo').onclick=function(){ var v=frVal('q'), m=$('qMsg'); if(!v){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
    if(v.n*qz.d===qz.n*v.d){ if(qz.tries===0) qzScore[0]++; qzScore[1]++; qz.done=true; qzUI(gcd(v.n,v.d)>1&&v.d>1?'맞았어요. 기약분수로도 나타내 보세요.':'','ok'); draw(); } else { qz.tries++; m.className='msg bad'; m.textContent='다시 계산해 보세요.'; draw(); } };
  $('qNext').onclick=function(){ if(!qz.done) qzScore[1]++; qzNew(); qzUI(); draw(); }; }

var UIS={nn:nnUI,fn:fnUI,ff:ffUI,fx:fxUI,quiz:qzUI}, DRS={nn:nnDraw,fn:fnDraw,ff:ffDraw,fx:fxDraw,quiz:qzDraw};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
