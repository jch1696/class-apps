/* 비례식과 비례배분 (6학년 2학기) */
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };

/* ───────── 1. 비의 성질 ───────── */
var pa=2, pb=3, pk=3;
function prDraw(){ var gw=Math.min(120,(W-24)/pk), x0=(W-gw*pk)/2, r=Math.min(10,(gw-34)/6), i, sz=Math.min(34,W/15);
  for(i=0;i<pk;i++){ var x=x0+i*gw+6; rect(x,20,gw-12,H*0.42,rgba(GRAY,0.18),LINE,1.5); beads(x+10,32,pa,CB(),r,3); beads(x+10,32+Math.ceil(pa/3)*(r*2+5)+12,pb,CO(),r,3); }
  var y=H*0.42+70; cexpr([pa+' : '+pb,'=',(pa*pk)+' : '+(pb*pk)],W/2,y,sz); txt('× '+pk,W/2,y+sz*1.3,ACC,20); txt('전항과 후항에 똑같이',W/2,y+sz*1.3+26,MUTED,14);
  $('say').innerHTML=pk===1?('파랑 : 주황 = '+pa+' : '+pb+'예요. 기호 : 앞의 '+J(pa,'을','를')+' <b>전항</b>, 뒤의 '+J(pb,'을','를')+' <b>후항</b>이라고 해요.<small>묶음 수를 늘려 보세요.</small>'):
    ('묶음이 '+pk+'개가 되어 파랑 '+(pa*pk)+'개, 주황 '+(pb*pk)+'개예요. 비율은 '+F(pa,pb)+' = '+F(pa*pk,pb*pk)+'로 같아요. <b class="r">'+pa+' : '+pb+' = '+(pa*pk)+' : '+(pb*pk)+'</b><small style="font-size:15.5px;color:var(--ink)">비의 전항과 후항에 0이 아닌 같은 수를 곱하여도 비율은 같아요. 거꾸로 '+(pa*pk)+' : '+(pb*pk)+'의 전항과 후항을 '+pk+Pr(pk)+' 나누어도 비율은 같아요.</small>'); }
function prUI(){ $('ctl').innerHTML='<div class="dims">'+sld('pA','파랑 (전항)',1,6,pa)+sld('pB','주황 (후항)',1,6,pb)+sld('pK','묶음 수',1,5,pk)+'</div>'; sldBind('pA',function(v){ pa=v; }); sldBind('pB',function(v){ pb=v; }); sldBind('pK',function(v){ pk=v; }); }

/* ───────── 2. 간단한 자연수의 비 ───────── */
var SMT=[['nat','자연수의 비'],['dec','소수의 비'],['frac','분수의 비'],['mix','소수와 분수의 비']], smK='nat', sm=null, smS=0;
function cop(){ var a, b; do{ a=ri(1,9); b=ri(2,9); }while(a===b||gcd(a,b)>1); return [a,b]; }
function smNew(){ var st=[], c=cop(), k, a, b, L, g1;
  if(smK==='nat'){ k=pick([2,3,4,5,6,8,10,12]); st.push({tk:[(c[0]*k)+' : '+(c[1]*k)],say:'자연수의 비예요. 더 간단하게 나타낼 수 있을까요?'});
    st.push({tk:[c[0]+' : '+c[1]],op:'÷ '+k,say:'전항과 후항을 두 수의 최대공약수 '+k+Pr(k)+' 나누어요.'}); }
  else if(smK==='dec'){ k=pick([1,2,3,4,5]); a=c[0]*k; b=c[1]*k; if(a%10===0&&b%10===0){ a=c[0]; b=c[1]; k=1; } st.push({tk:[DD(a/10)+' : '+DD(b/10)],say:'소수의 비예요. 자연수의 비로 바꾸려면 어떻게 해야 할까요?'});
    st.push({tk:[a+' : '+b],op:'× 10',say:'전항과 후항에 10을 곱하여 자연수로 만들어요.'}); if(k>1) st.push({tk:[c[0]+' : '+c[1]],op:'÷ '+k,say:'전항과 후항을 최대공약수 '+k+Pr(k)+' 나누어요.'}); }
  else { var f1, f2, pre=null; if(smK==='mix'){ var t=pick([[1,2],[1,5],[2,5],[3,5],[4,5],[3,10],[7,10],[1,4],[3,4]]); f1={n:t[0],d:t[1]}; pre=DD(t[0]/t[1]); } else { do{ f1={d:ri(2,6)}; f1.n=ri(1,f1.d-1); }while(gcd(f1.n,f1.d)>1); }
    do{ f2={d:ri(2,8)}; f2.n=ri(1,f2.d-1); }while(gcd(f2.n,f2.d)>1||f2.d===f1.d||(f1.n*f2.d===f2.n*f1.d));
    if(pre){ st.push({tk:[pre,':',f2],say:'소수와 분수가 섞여 있어요. 먼저 한 가지로 맞춰요.'}); st.push({tk:[f1,':',f2],op:'소수를 분수로',say:pre+' = '+F(f1.n,f1.d)+Pr(f1.n)+' 바꾸어요.'}); }
    else st.push({tk:[f1,':',f2],say:'분수의 비예요. 자연수의 비로 바꾸려면 어떻게 해야 할까요?'});
    L=lcm(f1.d,f2.d); a=f1.n*L/f1.d; b=f2.n*L/f2.d; st.push({tk:[a+' : '+b],op:'× '+L,say:'전항과 후항에 두 분모 '+J(f1.d,'과','와')+' '+f2.d+'의 최소공배수 '+J(L,'을','를')+' 곱하여 자연수로 만들어요.'});
    g1=gcd(a,b); if(g1>1) st.push({tk:[(a/g1)+' : '+(b/g1)],op:'÷ '+g1,say:'전항과 후항을 최대공약수 '+g1+Pr(g1)+' 나누어요.'}); }
  sm=st; smS=0; }
function smDraw(){ if(!sm) smNew(); var n=sm.length, sz=Math.min(34,W/16,(H-30)/(n*2.4)), gap=sz*2.5, y0=H/2-(n-1)*gap/2, i;
  for(i=0;i<=smS;i++){ cexpr(sm[i].tk,W/2,y0+i*gap,sz,i===n-1?HOT:INK); if(i>0){ line(W/2,y0+(i-1)*gap+sz*1.05,W/2,y0+i*gap-sz*1.05,ACC,2.2); txt(sm[i].op,W/2+14,y0+(i-0.5)*gap,ACC,17,'left'); } }
  $('say').innerHTML=sm[smS].say+(smS===n-1&&n>1?'<small style="font-size:15.5px;color:var(--ink)">더 나눌 수 없는 가장 간단한 자연수의 비가 되었어요.</small>':(smS===0?'<small>[다음 ▶]을 눌러 보세요.</small>':'')); }
function smUI(){ if(!sm) smNew(); $('top').innerHTML=chipsH(SMT,smK,'k');
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn" id="smPrev">◀ 이전</button><button class="btn primary" id="smNext">다음 ▶</button><button class="btn" id="smNew">다른 문제</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ smK=b.dataset.k; smNew(); smUI(); draw(); }; });
  $('smPrev').onclick=function(){ smS=Math.max(0,smS-1); draw(); }; $('smNext').onclick=function(){ smS=Math.min(sm.length-1,smS+1); draw(); }; $('smNew').onclick=function(){ smNew(); draw(); }; }

/* ───────── 3. 비례식 ───────── */
var ea=2, eb=3, ek=4, eh=-1, eShow=false;
function eqDraw(){ var v=[ea,eb,ea*ek,eb*ek], sz=Math.min(52,W/11), y=H*0.42, parts=[], x, i, tot=0, xs=[];
  var s=v.map(function(n,i2){ return i2===eh&&!eShow?'□':''+n; }), seq=[s[0],' : ',s[1],' = ',s[2],' : ',s[3]];
  seq.forEach(function(t){ tot+=tw(t,sz); }); x=W/2-tot/2; seq.forEach(function(t,i2){ var w=tw(t,sz); if(i2%2===0) xs.push(x+w/2); txt(t.trim()||t,x+w/2,y,(i2===0||i2===6)?HOT:((i2===2||i2===4)?ACC:INK),sz); x+=w; });
  g.beginPath(); g.moveTo(xs[0],y-sz*0.7); g.quadraticCurveTo((xs[0]+xs[3])/2,y-sz*2.4,xs[3],y-sz*0.7); g.strokeStyle=HOT; g.lineWidth=2.5; g.stroke(); txt('외항',(xs[0]+xs[3])/2,y-sz*1.75,HOT,17);
  g.beginPath(); g.moveTo(xs[1],y+sz*0.7); g.quadraticCurveTo((xs[1]+xs[2])/2,y+sz*1.7,xs[2],y+sz*0.7); g.strokeStyle=ACC; g.lineWidth=2.5; g.stroke(); txt('내항',(xs[1]+xs[2])/2,y+sz*1.5,ACC,17);
  var out=v[0]*v[3], inn=v[1]*v[2];
  if(eh<0){ txt('외항의 곱  '+v[0]+' × '+v[3]+' = '+out,W/2,y+sz*2.5,HOT,19); txt('내항의 곱  '+v[1]+' × '+v[2]+' = '+inn,W/2,y+sz*2.5+28,ACC,19); }
  var known=(eh===0||eh===3)?inn:out, other=eh===0?v[3]:(eh===3?v[0]:(eh===1?v[2]:v[1]));
  $('say').innerHTML=eh<0?('비율이 같은 두 비를 기호 = 로 연결한 식을 <b class="r">비례식</b>이라고 해요. 바깥쪽의 '+J(v[0],'과','와')+' '+J(v[3],'을','를')+' <b>외항</b>, 안쪽의 '+J(v[1],'과','와')+' '+J(v[2],'을','를')+' <b>내항</b>이라고 해요.<small style="font-size:15.5px;color:var(--ink)">비례식에서 외항의 곱과 내항의 곱은 같아요: '+v[0]+' × '+v[3]+' = '+v[1]+' × '+v[2]+' = '+out+'</small>'):
    (!eShow?'□ 안에 알맞은 수는 얼마일까요?<small>외항의 곱과 내항의 곱이 같다는 성질을 이용해 보세요. [풀이 보기]를 누르면 확인할 수 있어요.</small>':
      ((eh===0||eh===3)?'외항의 곱':'내항의 곱')+'이 '+((eh===0||eh===3)?'내항의 곱 '+v[1]+' × '+v[2]:'외항의 곱 '+v[0]+' × '+v[3])+' = '+J(known,'과','와')+' 같아야 해요. □ × '+other+' = '+known+'이므로 <b class="r">□ = '+known+' ÷ '+other+' = '+v[eh]+'</b>'); }
function eqUI(){ $('top').innerHTML=chipsH([[0,'외항과 내항'],[1,'□ 구하기']],eh<0?0:1,'k');
  $('ctl').innerHTML=(eh<0?'<div class="dims">'+sld('eA','전항',1,9,ea)+sld('eB','후항',1,9,eb)+sld('eK','곱하는 수',2,6,ek)+'</div>':'<div class="row" style="margin-top:8px"><button class="btn primary" id="eGo">'+(eShow?'풀이 숨기기':'풀이 보기')+'</button><button class="btn" id="eNew">다른 문제</button></div>');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ if(+b.dataset.k){ eh=rnd(4); eShow=false; } else eh=-1; eqUI(); draw(); }; });
  if(eh<0){ sldBind('eA',function(v){ ea=v; }); sldBind('eB',function(v){ eb=v; }); sldBind('eK',function(v){ ek=v; }); }
  else { $('eGo').onclick=function(){ eShow=!eShow; eqUI(); draw(); }; $('eNew').onclick=function(){ var c=cop(); ea=c[0]; eb=c[1]; ek=ri(2,6); eh=rnd(4); eShow=false; eqUI(); draw(); }; } }

/* ───────── 4. 비례배분 ───────── */
var sa=3, sb=2, sn=4, sr=0;
function shDraw(){ var T=(sa+sb)*sn, r=Math.min(9,W/70), bw=(W-60)/2, y0=H*0.36, per=Math.max(4,Math.floor((bw-24)/(r*2+5)));
  txt('남은 사탕 '+(T-(sa+sb)*sr)+'개',W/2,18,MUTED,15); beads((W-Math.min(T-(sa+sb)*sr,20)*(r*2+5))/2,32,T-(sa+sb)*sr,rgba(GRAY,0.9),r,20);
  rect(20,y0,bw,H-y0-14,CB(0.14),LINE,1.5); rect(40+bw,y0,bw,H-y0-14,CO(0.14),LINE,1.5); txt('가  '+(sa*sr)+'개',20+bw/2,y0+18,ACC,18); txt('나  '+(sb*sr)+'개',40+bw+bw/2,y0+18,HOT,18);
  beads(32,y0+36,sa*sr,CB(),r,per); beads(52+bw,y0+36,sb*sr,CO(),r,per);
  var b=$('sGo'); if(b&&!anT) b.textContent=sr>=sn?'◀ 되돌리기':'▶ 나누어 주기', S=sa+sb;
  $('say').innerHTML=sr<sn?('사탕 '+T+'개를 가와 나에게 <b>'+sa+' : '+sb+'</b>로 나누어 주려고 해요. 각각 몇 개씩 받을까요?'+(sr>0?'<small>한 번에 가에게 '+sa+'개, 나에게 '+sb+'개씩 주고 있어요. ('+sr+'번째)</small>':'<small>▶ 나누어 주기를 눌러 보세요.</small>')):
    ('한 번에 '+sa+'개와 '+sb+'개씩 '+sn+'번 나누어 주었어요. 가는 <b class="r">'+(sa*sn)+'개</b>, 나는 <b class="r">'+(sb*sn)+'개</b>예요.<small style="font-size:15.5px;color:var(--ink)">전체를 주어진 비로 나누는 것을 <b>비례배분</b>이라고 해요. 가는 전체의 '+F(sa,sa+' + '+sb)+', 나는 전체의 '+F(sb,sa+' + '+sb)+'를 받아요.<br>가: '+T+' × '+F(sa,S)+' = '+(sa*sn)+'　　나: '+T+' × '+F(sb,S)+' = '+(sb*sn)+'　　확인: '+(sa*sn)+' + '+(sb*sn)+' = '+T+'</small>'); }
function shUI(){ $('ctl').innerHTML='<div class="dims">'+sld('sA','가의 비',1,5,sa)+sld('sB','나의 비',1,5,sb)+sld('sN','묶음 수',1,6,sn)+'</div><div class="row"><button class="btn primary" id="sGo">▶ 나누어 주기</button></div>';
  sldBind('sA',function(v){ anStop(); sa=v; sr=0; }); sldBind('sB',function(v){ anStop(); sb=v; sr=0; }); sldBind('sN',function(v){ anStop(); sn=v; sr=0; });
  $('sGo').onclick=function(){ anStop(); if(sr>=sn){ sr=0; draw(); return; } sr=0; var t0=performance.now(); (function step(now){ sr=Math.min(sn,Math.floor((now-t0)/650)+1); if(sr<sn){ anT=requestAnimationFrame(step); draw(); } else { anT=null; draw(); } })(t0); }; }

/* ───────── 5. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(4), c=cop(), k, q, v, h;
  if(t===0){ k=pick([2,3,4,5,6,8]); var dec=rnd(2), A=c[0]*k, B=c[1]*k; if(dec&&A%10===0&&B%10===0) dec=0; q={lines:[dec?DD(A/10)+' : '+DD(B/10):A+' : '+B],ask:'가장 간단한 자연수의 비로 나타내 보세요.',kind:'pair',ans:c,show:c[0]+' : '+c[1],why:(dec?'전항과 후항에 10을 곱한 다음 ':'')+'전항과 후항을 최대공약수 '+k+Pr(k)+' 나누어요.',hint:'전항과 후항에 같은 수를 곱하거나 나누어도 비율은 같아요.'}; }
  else if(t===1){ k=ri(2,7); v=[c[0],c[1],c[0]*k,c[1]*k]; h=rnd(4); var s=v.map(function(n,i){ return i===h?'□':''+n; }); q={lines:[s[0]+' : '+s[1]+' = '+s[2]+' : '+s[3]],ask:'□ 안에 알맞은 수를 구해 보세요.',kind:'num',ans:v[h],show:''+v[h],why:'외항의 곱 '+v[0]+' × '+v[3]+P(v[3],'과','와')+' 내항의 곱 '+v[1]+' × '+v[2]+P(v[2],'은','는')+' 모두 '+(v[0]*v[3])+P(v[0]*v[3],'이에요','예요')+'.',hint:'외항의 곱과 내항의 곱은 같아요.'}; }
  else if(t===2){ k=ri(2,9); var T=(c[0]+c[1])*k, w=pick([['사탕','개'],['색종이','장'],['용돈','00원'],['끈','cm']]); q={lines:[w[0]+' '+T+w[1],'가 : 나 = '+c[0]+' : '+c[1]],ask:'주어진 비로 나누면 가와 나는 각각 얼마씩 가질까요? (가 : 나 순서로 써요)',kind:'pair',ans:[c[0]*k,c[1]*k],show:'가 '+(c[0]*k)+', 나 '+(c[1]*k),why:'가: '+T+' × '+F(c[0],c[0]+c[1])+' = '+(c[0]*k)+'　　나: '+T+' × '+F(c[1],c[0]+c[1])+' = '+(c[1]*k),hint:'가는 전체의 '+F(c[0],c[0]+c[1])+P(c[0],'을','를')+' 가져요.'}; }
  else { k=ri(2,6); var good=(c[0]*k)+' : '+(c[1]*k), bad1=(c[0]+k)+' : '+(c[1]+k), bad2=(c[1]*k)+' : '+(c[0]*k); q={lines:[c[0]+' : '+c[1]],ask:'이 비와 <b>비율이 같은 비</b>를 고르세요.',kind:'mc',opts:shuf([good,bad1,bad2]),ans:good,show:good,why:'전항과 후항에 똑같이 '+J(k,'을','를')+' 곱했어요. 같은 수를 더하면 비율이 달라지고, 순서를 바꾸면 다른 비가 돼요.'}; }
  return q; });

var UIS={prop:prUI,simp:smUI,eq:eqUI,share:shUI,quiz:quiz.ui}, DRS={prop:prDraw,simp:smDraw,eq:eqDraw,share:shDraw,quiz:quiz.draw};
function ui(){ if(tab!=='simp'&&tab!=='eq') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
