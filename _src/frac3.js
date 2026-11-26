/* 분수와 소수 (3학년 1·2학기): 똑같이 나누기, 전체와 부분, 크기 비교, 묶음의 분수, 0.1 */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };
function sl(id,lab,min,max,val,show){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" value="'+val+'"><output>'+(show==null?val:show)+'</output></div>'; }
function sb(id,fn,fmt){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=fmt?fmt(+this.value):this.value; draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
/* 원: 위쪽에서 시계 방향으로 fr=[비율...] 조각, on[i] 이면 색칠 */
function pie(cx,cy,R,fr,on,col){ var a=-Math.PI/2, i; for(i=0;i<fr.length;i++){ var b=a+Math.PI*2*fr[i]; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,R,a,b); g.closePath(); g.fillStyle=on&&on[i]?col:HALO; g.fill(); g.strokeStyle=INK; g.lineWidth=2; g.stroke(); a=b; } g.beginPath(); g.arc(cx,cy,R,0,7); g.strokeStyle=INK; g.lineWidth=3; g.stroke(); }
function strip(x,y,w,h,fr,on,col){ var k=0, i; for(i=0;i<fr.length;i++){ rect(x+w*k,y,w*fr[i],h,on&&on[i]?col:HALO,INK,2); k+=fr[i]; } rect(x,y,w,h,null,INK,3); }
function eqFr(n){ var a=[], i; for(i=0;i<n;i++) a.push(1/n); return a; }
function unFr(n){ var w=[], s=0, i; for(i=0;i<n;i++){ var v=1+((i*37+n*11)%5)*0.55; w.push(v); s+=v; } return w.map(function(v){ return v/s; }); }

/* ───────── 1. 똑같이 나누기 ───────── */
var en=4, eshape=0, euneq=false;
function eqDraw(){ var fr=euneq?unFr(en):eqFr(en), R=Math.min(H*0.36,W*0.3), on=fr.map(function(v,i){ return i===0; });
  if(eshape) strip((W-BWd())/2,H*0.42,BWd(),Math.min(80,H*0.24),fr,on,CB()); else pie(W/2,H*0.56,R,fr,on,CB());
  txt(euneq?'✕ 크기가 달라요':'✔ 똑같이 '+en+'조각',W/2,H*0.09,euneq?HOT:ACC,Math.min(28,W/14));
  $('say').innerHTML=euneq?'조각의 크기가 서로 달라요.'+SM+'똑같이 나누지 않으면 분수로 나타낼 수 없어요.</small>':'전체를 <b class="r">똑같이 '+en+'</b>'+Pr(en)+' 나누었어요.'+SM+'조각의 모양과 크기가 모두 같아요. 색칠한 한 조각은 전체의 '+F(1,en)+'이에요.</small>'; }
function eqUI(){ $('top').innerHTML=chipsH([[0,'● 원'],[1,'▬ 띠']],eshape,'s');
  $('ctl').innerHTML=sld('eN','조각 수',2,8,en)+'<div class="row" style="justify-content:center;gap:10px"><button class="btn'+(euneq?'':' primary')+'" id="eE" style="font-size:18px">똑같이 나누기</button><button class="btn'+(euneq?' primary':'')+'" id="eU" style="font-size:18px">다르게 나누기</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ eshape=+b.dataset.s; ui(); draw(); }; }); sldBind('eN',function(v){ en=v; });
  $('eE').onclick=function(){ euneq=false; ui(); draw(); }; $('eU').onclick=function(){ euneq=true; ui(); draw(); }; }

/* ───────── 2. 전체와 부분 ───────── */
var pd=4, pon=[true,true,true,false], pshape=0;
function ptGeo(){ var R=Math.min(H*0.38,W*0.25), bw=Math.min(W*0.6,BWd()*0.66); return {R:R,cx:W*0.34,cy:H*0.5,bx:W*0.36-bw/2,by:H*0.36,bw:bw,bh:Math.min(84,H*0.26)}; }
function ptDraw(){ var q=ptGeo(), n=pon.filter(function(v){ return v; }).length, sz=Math.min(54,W/8), fx=pshape?q.bx+q.bw+(W-q.bx-q.bw)/2:W*0.78;
  if(pshape) strip(q.bx,q.by,q.bw,q.bh,eqFr(pd),pon,CB()); else pie(q.cx,q.cy,q.R,eqFr(pd),pon,CB());
  cfr(n,pd,fx,H*0.48,HOT,sz);
  $('say').innerHTML=n?F(n,pd)+' <b class="r">「'+pd+'분의 '+n+'」</b>'+SM+'전체를 똑같이 '+pd+Pr(pd)+' 나눈 것 중의 '+n+'이에요. 아래 수 '+pd+P(pd,'은','는')+' <b>분모</b>, 위 수 '+n+P(n,'은','는')+' <b>분자</b>예요.</small>':'조각을 눌러 색칠해 보세요.'; }
function ptUI(){ $('top').innerHTML=chipsH([[0,'● 원'],[1,'▬ 띠']],pshape,'s'); $('ctl').innerHTML=sld('pD','나눈 수',2,8,pd);
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ pshape=+b.dataset.s; ui(); draw(); }; });
  sldBind('pD',function(v){ var n=Math.min(v,pon.filter(function(x){ return x; }).length), i; pd=v; pon=[]; for(i=0;i<v;i++) pon.push(i<n); }); }
function onTap(x,y){ if(tab!=='part') return; var q=ptGeo(), i=-1;
  if(pshape){ if(x>=q.bx&&x<=q.bx+q.bw&&y>=q.by-10&&y<=q.by+q.bh+10) i=Math.min(pd-1,Math.floor((x-q.bx)/q.bw*pd)); }
  else { var dx=x-q.cx, dy=y-q.cy; if(dx*dx+dy*dy<=(q.R+8)*(q.R+8)){ var a=Math.atan2(dy,dx)+Math.PI/2; if(a<0) a+=Math.PI*2; i=Math.min(pd-1,Math.floor(a/(Math.PI*2)*pd)); } }
  if(i>=0){ pon[i]=!pon[i]; draw(); } }

/* ───────── 3. 크기 비교 ───────── */
var cmode=0, ua=3, ub=5, cd=6, ca=2, cb=5;
function cpDraw(){ var BW=BWd(), x0=(W-BW)/2, bh=Math.min(56,H*0.16), y1=H*0.34, y2=y1+bh+26, A=cmode?[ca,cd]:[1,ua], B=cmode?[cb,cd]:[1,ub], va=A[0]/A[1], vb=B[0]/B[1], s=va>vb?'>':(va<vb?'<':'=');
  cexpr([{n:A[0],d:A[1]},s,{n:B[0],d:B[1]}],W/2,H*0.14,Math.min(38,W/11));
  bar(x0,y1,BW,bh,A[1],[[A[0],CB()]]); bar(x0,y2,BW,bh,B[1],[[B[0],CO()]]);
  line(x0+BW*va,y1-8,x0+BW*va,y1+bh+8,ACC,3,[5,4]); line(x0+BW*vb,y2-8,x0+BW*vb,y2+bh+8,HOT,3,[5,4]);
  $('say').innerHTML=F(A[0],A[1])+' <b class="r">'+(s==='>'?'&gt;':(s==='<'?'&lt;':'='))+'</b> '+F(B[0],B[1])+SM+(cmode?'분모가 같으면 분자가 클수록 커요. '+F(1,cd)+'이 몇 개인지 세어 보세요.':'단위분수는 분모가 작을수록 커요. 많이 나눌수록 한 조각이 작아져요.')+'</small>'; }
function cpUI(){ $('top').innerHTML=chipsH([[0,'단위분수'],[1,'분모가 같은 분수']],cmode,'k'); if(ca>cd) ca=cd; if(cb>cd) cb=cd;
  $('ctl').innerHTML='<div class="dims">'+(cmode?sld('cD','분모',2,10,cd)+sld('cA','파랑 분자',1,cd,ca)+sld('cB','주황 분자',1,cd,cb):sld('uA','파랑 분모',2,10,ua)+sld('uB','주황 분모',2,10,ub))+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ cmode=+b.dataset.k; ui(); draw(); }; });
  if(cmode){ sldBind('cD',function(v){ cd=v; ca=Math.min(ca,v); cb=Math.min(cb,v); }); sldBind('cA',function(v){ ca=v; }); sldBind('cB',function(v){ cb=v; }); } else { sldBind('uA',function(v){ ua=v; }); sldBind('uB',function(v){ ub=v; }); } }

/* ───────── 4. 묶음의 분수 ───────── */
var sN=12, sd=3, sn=2, SNS=[6,8,10,12,15,16,18,20,24];
function sDivs(){ var a=[], i; for(i=2;i<=6;i++) if(sN%i===0) a.push(i); return a; }
function stDraw(){ var m=sN/sd, gw=Math.min(190,(W-20)/sd), x0=(W-gw*sd)/2, pr=Math.min(m<=4?m:(m<=8?Math.ceil(m/2):Math.ceil(m/3)),Math.max(2,Math.floor((gw-18)/23))), rows=Math.ceil(m/pr), r=Math.max(4,Math.min(17,(gw-22)/(pr*2)-2.5)), bh=rows*(r*2+5)+18, y0=H*0.34+(H*0.5-bh)/2, i;
  cexpr([sN+'의',{n:sn,d:sd},'=',''+m*sn],W/2,H*0.14,Math.min(36,W/12));
  for(i=0;i<sd;i++){ var x=x0+i*gw+5, on=i<sn; rect(x,y0,gw-10,bh,on?CB(0.22):null,on?ACC:LINE,on?3:2); beads(x+(gw-10-(pr*(r*2+5)-5))/2,y0+10,m,on?CB():rgba(GRAY,0.8),r,pr); }
  txt('한 묶음 '+m+'개',W/2,y0+bh+24,MUTED,16);
  $('say').innerHTML=sN+'의 '+F(sn,sd)+' = <b class="r">'+m*sn+'</b>'+SM+sN+P(sN,'을','를')+' 똑같이 '+sd+'묶음으로 나누면 한 묶음은 '+m+'. '+sn+'묶음은 '+m+' × '+sn+' = '+m*sn+'</small>'; }
function stUI(){ var dv=sDivs(); if(dv.indexOf(sd)<0) sd=dv[0]; if(sn>sd) sn=sd;
  $('top').innerHTML=chipsH(SNS.map(function(v){ return [v,v+'개']; }),sN,'n');
  $('ctl').innerHTML='<div class="chips" style="justify-content:center;margin:8px 0 0">'+dv.map(function(v){ return '<button class="chip" aria-pressed="'+(v===sd)+'" data-d="'+v+'">'+v+'묶음</button>'; }).join('')+'</div>'+sld('sNn','색칠할 묶음',1,sd,sn);
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ sN=+b.dataset.n; ui(); draw(); }; });
  $('ctl').querySelectorAll('[data-d]').forEach(function(b){ b.onclick=function(){ sd=+b.dataset.d; ui(); draw(); }; }); sldBind('sNn',function(v){ sn=v; }); }

/* ───────── 5. 소수 0.1 ───────── */
var dn=7, KD='영일이삼사오육칠팔구';
function dcStr(n){ return Math.floor(n/10)+(n%10?'.'+n%10:''); }
function dcDraw(){ var nb=Math.max(1,Math.ceil(dn/10)), BW=Math.min(BWd(),480), x0=(W-BW)/2-(W>460?50:0), bh=Math.min(46,H*0.6/3-12), y0=H*0.26+(3-nb)*(bh+12)/2, i, s=dcStr(dn);
  for(i=0;i<nb;i++) bar(x0,y0+i*(bh+12),BW,bh,10,[[Math.max(0,Math.min(10,dn-i*10)),CB()]]);
  if(W>460) txt(s,x0+BW+(W-x0-BW)/2,y0+nb*(bh+12)/2-6,HOT,Math.min(46,W/12));
  if(dn<10) cexpr([{n:dn,d:10},'=','0.'+dn],W/2,H*0.12,Math.min(34,W/12)); else txt('0.1이 '+dn+'개 = '+s,W/2,H*0.12,INK,Math.min(30,W/14));
  $('say').innerHTML='0.1이 '+dn+'개 = <b class="r">'+s+'</b>'+(dn%10?' 「'+KD[Math.floor(dn/10)]+' 점 '+KD[dn%10]+'」':'')+SM+'전체를 똑같이 10으로 나눈 것 중의 1은 '+F(1,10)+' = 0.1 (영 점 일)이에요.'+(dn>=10?'<br>0.1이 10개이면 1이에요.':'')+'</small>'; }
function dcUI(){ $('ctl').innerHTML=sl('dN','0.1의 개수',1,30,dn,dn+'개'); sb('dN',function(v){ dn=v; },function(v){ return v+'개'; }); }

/* ───────── 6. 문제 풀기 ───────── */
function uniq(a){ var o=[]; a.forEach(function(x){ if(o.indexOf(x)<0) o.push(x); }); return o; }
var quiz=QZ(function(){ var t=rnd(5), a, b, d, q;
  if(t===0){ d=ri(3,8); a=ri(1,d-1); q={lines:['전체를 똑같이 '+d+Pr(d)+' 나눈 것 중의 '+a],ask:'분수로 나타내면?',kind:'mc',opts:shuf(uniq([F(a,d),F(d,a),F(a,d+a)])),ans:F(a,d),show:F(a,d),why:'나눈 수 '+d+P(d,'이','가')+' 분모, 색칠한 수 '+a+P(a,'이','가')+' 분자예요.'}; }
  else if(t===1){ do{ a=ri(2,9); b=ri(2,9); }while(a===b); q={lines:[[{n:1,d:a},'○',{n:1,d:b}]],ask:'○ 안에 알맞은 기호는?',kind:'mc',opts:['&gt;','&lt;'],ans:a<b?'&gt;':'&lt;',show:F(1,a)+(a<b?' &gt; ':' &lt; ')+F(1,b),why:'단위분수는 분모가 작을수록 커요.'}; }
  else if(t===2){ d=pick([2,3,4,5,6]); b=ri(2,5); a=ri(1,d-1); q={lines:[[d*b+'의',{n:a,d:d},'= ?']],ask:'얼마일까요?',kind:'num',ans:b*a,unit:'',show:''+b*a,why:d*b+P(d*b,'을','를')+' '+d+'묶음으로 나누면 한 묶음은 '+b+'. '+a+'묶음은 '+b*a,hint:'먼저 '+d+'묶음으로 똑같이 나누어 보세요.'}; }
  else if(t===3){ a=ri(2,29); if(a%10===0) a+=3; q={lines:['0.1이 '+a+'개'],ask:'소수로 나타내면?',kind:'num',ans:a/10,unit:'',show:dcStr(a),why:'0.1이 10개이면 1이에요.',hint:'0.1이 10개이면 1이에요.'}; }
  else { a=ri(1,9); q={lines:[[{n:a,d:10},'= ?']],ask:'소수로 나타내면?',kind:'num',ans:a/10,unit:'',show:'0.'+a,why:F(1,10)+' = 0.1 이므로 '+F(a,10)+' = 0.'+a,hint:F(1,10)+' = 0.1 이에요.'}; }
  return q; });

var UIS={eq:eqUI,part:ptUI,cmp:cpUI,set:stUI,dec:dcUI,quiz:quiz.ui}, DRS={eq:eqDraw,part:ptDraw,cmp:cpDraw,set:stDraw,dec:dcDraw,quiz:quiz.draw};
function ui(){ if(tab==='dec'||tab==='quiz') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; $('hint').textContent=t==='part'?'👆 조각을 눌러 색칠해 보세요':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
