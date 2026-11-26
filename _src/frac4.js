/* 분수의 덧셈과 뺄셈 (4학년 2학기) — 분모가 같은 분수. 약분은 하지 않는다(5학년). */
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };
var SM='<small style="font-size:15.5px;color:var(--ink)">';
function mt(w,n,d){ return n?{w:w,n:n,d:d}:(''+w); }
/* 분수 막대 줄: 한 칸 = 1/d. segs=[[칸 수,색]...] 를 이어서 칠하고, 뒤에서부터 cross 칸은 지운 표시. nb=막대 수(고정) */
function bars(y,d,segs,cross,nb,bh){ var tot=0, i, k=0; segs.forEach(function(s){ tot+=s[0]; });
  nb=Math.max(nb||1,Math.ceil(tot/d)); bh=bh||Math.min(48,H*0.14);
  var gap=nb>3?8:12, bw=Math.min((BWd()-gap*(nb-1))/nb,nb===1?400:250), x0=(W-(bw*nb+gap*(nb-1)))/2, cw=bw/d;
  segs.forEach(function(s){ for(i=0;i<s[0];i++){ rect(x0+Math.floor(k/d)*(bw+gap)+(k%d)*cw,y,cw,bh,s[1]); k++; } });
  for(i=0;i<(cross||0);i++){ var kk=tot-1-i, xx=x0+Math.floor(kk/d)*(bw+gap)+(kk%d)*cw; g.globalAlpha=0.72; rect(xx,y,cw,bh,HALO); g.globalAlpha=1; line(xx+3,y+4,xx+cw-3,y+bh-4,HOT,2.5); line(xx+cw-3,y+4,xx+3,y+bh-4,HOT,2.5); }
  for(var b=0;b<nb;b++){ var bx=x0+b*(bw+gap); for(i=1;i<d;i++) line(bx+i*cw,y,bx+i*cw,y+bh,INK,1.2); rect(bx,y,bw,bh,null,INK,2.4); }
  return y+bh; }
function esz(){ return Math.min(38,W/13); }

/* ───────── 1. 분수의 종류 ───────── */
var kd=4, kn=3;
function kdDraw(){ var w=Math.floor(kn/kd), r=kn-w*kd, tk=[{n:kn,d:kd}], sz=esz(), y;
  if(kn>=kd){ tk.push('='); tk.push(mt(w,r,kd)); }
  cexpr(tk,W/2,H*0.2,sz);
  y=bars(H*0.42,kd,[[kn,CB()]],0,3);
  cexpr([{n:1,d:kd},'이 '+kn+'개'],W/2,y+H*0.15,Math.min(24,W/18),MUTED);
  var nm=kn<kd?'진분수':'가분수';
  $('say').innerHTML='<b class="r">'+nm+'</b> '+(kn<kd?'분자가 분모보다 작아요.':(r?'대분수로는 '+MXH(w,r,kd):'자연수 '+w+'과 같아요.'))+SM+'<b>진분수</b>: 분자가 분모보다 작은 분수<br><b>가분수</b>: 분자가 분모와 같거나 큰 분수<br><b>대분수</b>: 자연수와 진분수로 이루어진 분수</small>'; }
function kdUI(){ $('ctl').innerHTML='<div class="dims">'+sld('kD','분모',2,8,kd)+sld('kN','분자',1,kd*3,kn)+'</div>';
  sldBind('kD',function(v){ kd=v; if(kn>kd*3) kn=kd*3; }); sldBind('kN',function(v){ kn=v; }); }

/* ───────── 2. 덧셈 ───────── */
var ad=5, aa=2, ab=1;
function adDraw(){ var s=aa+ab, tk=[{n:aa,d:ad},'+',{n:ab,d:ad},'=',{n:s,d:ad}], y;
  if(s>=ad){ tk.push('='); tk.push(mt(Math.floor(s/ad),s%ad,ad)); }
  cexpr(tk,W/2,H*0.2,esz());
  y=bars(H*0.44,ad,[[aa,CB()],[ab,CO()]],0,2);
  txt('■ '+aa+'칸',W/2-60,y+26,ACC,16); txt('■ '+ab+'칸',W/2+60,y+26,HOT,16);
  $('say').innerHTML='분자끼리 더해요: '+aa+' + '+ab+' = <b class="r">'+s+'</b>'+SM+'분모는 그대로 '+ad+'예요. '+F(1,ad)+'이 '+aa+'개 + '+ab+'개 = '+s+'개'+(s>=ad?'<br>'+F(ad,ad)+' = 1 이므로 '+F(s,ad)+' = '+MXH(Math.floor(s/ad),s%ad,ad):'')+'</small>'; }
function adUI(){ $('ctl').innerHTML='<div class="dims">'+sld('aD','분모',2,10,ad)+sld('aA','파랑',1,ad-1,aa)+sld('aB','주황',1,ad-1,ab)+'</div>';
  sldBind('aD',function(v){ ad=v; aa=Math.min(aa,ad-1); ab=Math.min(ab,ad-1); }); sldBind('aA',function(v){ aa=v; }); sldBind('aB',function(v){ ab=v; }); }

/* ───────── 3. 뺄셈 ───────── */
var sd=5, sa=4, sb2=1;
function sbDraw(){ var r=sa-sb2, tk=sa===sd?['1','−',{n:sb2,d:sd},'=',{n:sd,d:sd},'−',{n:sb2,d:sd},'=',{n:r,d:sd}]:[{n:sa,d:sd},'−',{n:sb2,d:sd},'=',{n:r,d:sd}], y;
  cexpr(tk,W/2,H*0.2,sa===sd?Math.min(34,W/17):esz());
  y=bars(H*0.44,sd,[[sa,CB()]],sb2,1);
  txt('✕ '+sb2+'칸 덜어 내기',W/2,y+26,HOT,16);
  $('say').innerHTML='분자끼리 빼요: '+sa+' − '+sb2+' = <b class="r">'+r+'</b>'+SM+'분모는 그대로 '+sd+'예요. '+F(1,sd)+'이 '+sa+'개 − '+sb2+'개 = '+r+'개'+(sa===sd?'<br>1은 '+F(sd,sd)+'로 바꾸어 계산해요.':'')+'</small>'; }
function sbUI(){ $('ctl').innerHTML='<div class="dims">'+sld('sD','분모',2,10,sd)+sld('sA','처음',2,sd,sa)+sld('sB','빼는 수',1,sa-1,sb2)+'</div>';
  sldBind('sD',function(v){ sd=v; sa=Math.max(2,Math.min(sa,sd)); sb2=Math.min(sb2,sa-1); }); sldBind('sA',function(v){ sa=v; sb2=Math.min(sb2,sa-1); }); sldBind('sB',function(v){ sb2=v; }); }

/* ───────── 4. 대분수 ───────── */
var md=4, mw1=2, mn1=1, mw2=1, mn2=3, mop=0;
function mxFix(){ mn1=Math.min(mn1,md-1); mn2=Math.min(mn2,md-1); if(mop&&mw2>=mw1){ mw2=mw1; if(mn2>mn1) mn2=mn1; } }
function mxDraw(){ var sz=Math.min(30,W/20), A=mt(mw1,mn1,md), B=mt(mw2,mn2,md), bh=Math.min(38,H*0.11), y, l2, w, r;
  if(!mop){ var s=mn1+mn2; w=mw1+mw2; cexpr([A,'+',B,'=',mt(w,s,md)].concat(s>=md?['=',mt(w+1,s-md,md)]:[]),W/2,H*0.13,sz);
    y=bars(H*0.3,md,[[mw1*md+mn1,CB()]],0,4,bh); bars(y+14,md,[[mw2*md+mn2,CO()]],0,4,bh);
    $('say').innerHTML='자연수끼리, 분수끼리 더해요: <b class="r">'+MXH(w+(s>=md?1:0),s>=md?s-md:s,md)+'</b>'+SM+'자연수: '+mw1+' + '+mw2+' = '+w+'　분수: '+F(mn1,md)+' + '+F(mn2,md)+' = '+F(s,md)+(s>=md?'<br>'+F(s,md)+' = '+MXH(1,s-md,md)+' 이므로 자연수에 1을 더해요.':'')+'</small>'; }
  else { var t1=mw1*md+mn1, t2=mw2*md+mn2, t=t1-t2; w=Math.floor(t/md); r=t%md;
    if(mn1>=mn2){ cexpr([A,'−',B,'=',mt(w,r,md)],W/2,H*0.13,sz); }
    else { cexpr([A,'−',B],W/2,H*0.09,sz); cexpr(['=',mt(mw1-1,mn1+md,md),'−',B,'=',mt(w,r,md)],W/2,H*0.09+sz*2,sz); }
    y=bars(H*0.46,md,[[t1,CB()]],t2,4,bh); txt('✕ '+MXT(mw2,mn2,md)+' 덜어 내기',W/2,y+24,HOT,15);
    $('say').innerHTML='자연수끼리, 분수끼리 빼요: <b class="r">'+MXH(w,r,md)+'</b>'+SM+(mn1>=mn2?'자연수: '+mw1+' − '+mw2+' = '+(mw1-mw2)+'　분수: '+F(mn1,md)+' − '+F(mn2,md)+' = '+F(mn1-mn2,md):'분수끼리 뺄 수 없으면 자연수 1을 '+F(md,md)+'로 바꿔요: '+MXH(mw1,mn1,md)+' = '+MXH(mw1-1,mn1+md,md))+'</small>'; } }
function MXT(w,n,d){ return (w?w+' ':'')+(n?n+'/'+d:''); }
function mxUI(){ mxFix(); $('top').innerHTML=chipsH([[0,'+ 덧셈'],[1,'− 뺄셈']],mop,'k');
  $('ctl').innerHTML='<div class="dims">'+sld('mD','분모',2,8,md)+sld('mW1','앞 자연수',1,3,mw1)+sld('mN1','앞 분자',1,md-1,mn1)+sld('mW2','뒤 자연수',1,mop?mw1:3,mw2)+sld('mN2','뒤 분자',1,(mop&&mw2===mw1)?mn1:md-1,mn2)+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ mop=+b.dataset.k; ui(); draw(); }; });
  sldBind('mD',function(v){ md=v; mxFix(); }); sldBind('mW1',function(v){ mw1=v; mxFix(); }); sldBind('mN1',function(v){ mn1=v; mxFix(); }); sldBind('mW2',function(v){ mw2=v; mxFix(); }); sldBind('mN2',function(v){ mn2=v; mxFix(); }); }

/* ───────── 5. 문제 풀기 ───────── */
function uniq(a){ var o=[]; a.forEach(function(x){ if(o.indexOf(x)<0) o.push(x); }); return o; }
var quiz=QZ(function(){ var t=rnd(5), d, a, b, w, r, q;
  if(t===0){ d=ri(4,10); a=ri(1,d-2); b=ri(1,d-1-a); q={lines:[[{n:a,d:d},'+',{n:b,d:d},'=','?']],ask:'알맞은 답은?',opts:uniq([F(a+b,d),F(a+b,d*2),F(a+b+1,d)]),ans:F(a+b,d),why:'분모는 그대로 두고 분자끼리 더해요. '+a+' + '+b+' = '+(a+b)}; }
  else if(t===1){ d=ri(4,10); a=ri(2,d-1); b=ri(1,a-1); q={lines:[[{n:a,d:d},'−',{n:b,d:d},'=','?']],ask:'알맞은 답은?',opts:uniq([F(a-b,d),F(a+b,d),F(a-b+1,d)]),ans:F(a-b,d),why:'분모는 그대로 두고 분자끼리 빼요. '+a+' − '+b+' = '+(a-b)}; }
  else if(t===2){ d=ri(3,7); w=ri(1,3); r=ri(1,d-1); q={lines:[[{n:w*d+r,d:d},'=','?']],ask:'대분수로 나타내면?',opts:uniq([MXH(w,r,d),MXH(w+1,r,d),MXH(r===w?w+2:r,w,d)]),ans:MXH(w,r,d),why:F(d,d)+' = 1 이에요. '+(w*d+r)+' ÷ '+d+' = '+w+' … '+r}; }
  else if(t===3){ d=pick([3,5,7,9]); b=ri(1,d-1); q={lines:[['1','−',{n:b,d:d},'=','?']],ask:'알맞은 답은?',opts:uniq([F(d-b,d),F(b,d),F(d-b,d-1)]),ans:F(d-b,d),why:'1을 '+F(d,d)+'로 바꾸어 계산해요. '+d+' − '+b+' = '+(d-b)}; }
  else { d=ri(4,8); a=ri(1,d-2); b=ri(1,d-1-a); w=ri(1,3); r=ri(1,3); q={lines:[[{w:w,n:a,d:d},'+',{w:r,n:b,d:d},'=','?']],ask:'알맞은 답은?',opts:uniq([MXH(w+r,a+b,d),MXH(w+r,a+b,d*2),MXH(w+r+1,a+b,d)]),ans:MXH(w+r,a+b,d),why:'자연수끼리 '+w+' + '+r+' = '+(w+r)+', 분수끼리 '+F(a,d)+' + '+F(b,d)+' = '+F(a+b,d)}; }
  q.kind='mc'; q.opts=shuf(q.opts); q.show=q.ans; return q; });

var UIS={kind:kdUI,add:adUI,sub:sbUI,mix:mxUI,quiz:quiz.ui}, DRS={kind:kdDraw,add:adDraw,sub:sbDraw,mix:mxDraw,quiz:quiz.draw};
function ui(){ if(tab!=='mix') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
