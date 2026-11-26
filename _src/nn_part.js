/* ───────── 5. 몫을 소수로 (자연수 ÷ 자연수) ───────── */
var nM='pic', nA=3, nB=4;
function nT(d){ return 10%d===0?10:(100%d===0?100:1000); }
function nDec(a,b){ return D(Math.round(a*1000/b),3); }
var nq=QZ(function(){ var B=pick([2,4,5,8,20,25]), A; do{ A=ri(1,B<10?B*3:B-1); }while(A%B===0); var s=nDec(A,B), T=nT(B), k=T/B, t=rnd(3), w=pick([['끈','m'],['주스','L'],['찰흙','kg'],['리본','m']]);
  var why=A+' ÷ '+B+' = '+F(A,B)+' = '+F(A*k,T)+' = '+s;
  if(t===0) return {lines:[A+' ÷ '+B],ask:'몫을 소수로 나타내 보세요.',kind:'num',ans:A/B,show:s,why:why,hint:'몫을 분수 '+F(A,B)+Pr(B)+' 나타낸 다음, 분모를 '+T+Pr(T)+' 만들어요.'};
  if(t===1) return {lines:[w[0]+' '+A+w[1],B+'명이 똑같이 나누어 가져요.'],ask:'한 명이 갖는 양은 몇 '+w[1]+'일까요? 소수로 나타내 보세요.',kind:'num',unit:w[1],ans:A/B,show:s+w[1],why:why,hint:'식은 '+A+' ÷ '+B+'예요. 몫을 분수로 나타낸 다음 소수로 바꾸어요.'};
  return {lines:['□ ÷ '+B+' = '+s],ask:'□ 안에 알맞은 자연수는 얼마일까요?',kind:'num',ans:A,show:''+A,why:'나누는 수와 몫을 곱하면 나누어지는 수가 돼요. '+B+' × '+s+' = '+A,hint:'나누는 수 '+B+'에 몫 '+J(s,'을','를')+' 곱해요.'}; });
function nnDraw(){ if(nM==='quiz'){ nq.draw(); return; }
  var T=nT(nB), k=T/nB, s=nDec(nA,nB), BW=BWd(), x0=(W-BW)/2, i, j, whole=nA%nB===0;
  var tk=[nA+' ÷ '+nB+' =',{n:nA,d:nB}].concat(k>1&&!whole?['=',{n:nA*k,d:T}]:[]).concat(['=',s]);
  if(nM==='pic'){ var bh=Math.min(30,(H-84)/nA-6), y0=12, cw=BW/nB;
    for(i=0;i<nA;i++){ var y=y0+i*(bh+6); rect(x0,y,BW,bh,rgba(BLUE,0.18)); rect(x0,y,cw,bh,rgba(ORANGE,0.85)); for(j=1;j<nB;j++) line(x0+j*cw,y,x0+j*cw,y+bh,INK,1); rect(x0,y,BW,bh,null,INK,2); }
    cexpr(tk,W/2,y0+nA*(bh+6)+28,Math.min(24,W/18),HOT);
    $('say').innerHTML='끈 '+nA+'m를 '+nB+'명이 똑같이 나누어 가져요. 1m짜리 끈마다 '+nB+'도막으로 똑같이 나누어 한 도막씩 받으면, 한 명은 '+F(1,nB)+'m를 '+nA+'번 받아요.<b class="r"> '+nA+' ÷ '+nB+' = '+F(nA,nB)+' = '+s+'</b><small style="font-size:15.5px;color:var(--ink)">(자연수) ÷ (자연수)의 몫은 분수로 나타낼 수 있어요. '+(whole?'분자가 분모의 배수이면 몫은 자연수예요.':'분모를 '+T+Pr(T)+' 바꾸면 '+F(nA*k,T)+'이므로 소수로 '+J(s,'이에요','예요')+'.')+' 주황색 도막이 한 명이 받는 양이에요.</small>'; return; }
  var sz=Math.min(22,W/20), ys=[H/6+10,H/2+10,H*5/6+6], z=T===10?'0':(T===100?'00':'000'), q=nA*T/nB;
  txt('① 분수로 바꾸기',W/2,ys[0]-sz*1.7,MUTED,14); cexpr(tk,W/2,ys[0],sz,INK);
  txt('② 자연수의 나눗셈 이용하기',W/2,ys[1]-sz*1.3,MUTED,14); txt(nA*T+' ÷ '+nB+' = '+q+' 이므로  '+nA+' ÷ '+nB+' = '+s,W/2,ys[1],INK,sz);
  txt('③ 세로로 계산하기',W/2,ys[2]-sz*1.3,MUTED,14); txt(nA+'.'+z+' ÷ '+nB+' = '+s,W/2,ys[2],INK,sz);
  $('say').innerHTML='세 가지 방법 모두 <b class="r">'+nA+' ÷ '+nB+' = '+s+'</b>'+P(s,'이에요','예요')+'.<small style="font-size:15.5px;color:var(--ink)">① 몫을 분수 '+F(nA,nB)+Pr(nB)+' 나타내고 분모를 '+T+Pr(T)+' 만들어요.<br>② '+nA+'의 '+T+'배인 '+nA*T+Pr(nA*T)+' 계산하면 몫이 '+J(q,'이에요','예요')+'. 나누어지는 수가 '+F(1,T)+'배가 되면 몫도 '+F(1,T)+'배가 돼요.<br>③ '+nA+' 뒤에 소수점을 찍고 0을 내려 가며 계산해요. ② 세로셈 탭의 「자연수 ÷ 자연수」에서 한 단계씩 볼 수 있어요.</small>'; }
function nnUI(){ $('top').innerHTML=chipsH([['pic','그림으로'],['way','세 가지 방법'],['quiz','문제 풀기']],nM,'k');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ nM=b.dataset.k; ui(); draw(); }; });
  if(nM==='quiz'){ nq.ui(); return; }
  $('ctl').innerHTML=chipsH([2,4,5,8,20,25].map(function(d){ return [d,'÷ '+d]; }),nB,'d','margin-top:8px')+'<div class="dims">'+sld('nA','나누어지는 수',1,9,nA)+'</div>';
  $('ctl').querySelectorAll('[data-d]').forEach(function(b){ b.onclick=function(){ nB=+b.dataset.d; ui(); draw(); }; }); sldBind('nA',function(v){ nA=v; }); }

