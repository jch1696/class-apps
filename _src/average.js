/* 평균과 가능성 (5학년 2학기) */
var RED=[236,112,99];
function barsDraw(vals,t,mean){ var n=vals.length, mx=Math.max.apply(null,vals.concat([mean,4])), gap=(W-80)/n, bw=Math.min(74,gap*0.62), x0=40, yb=H-44, u=(H-100)/mx, k;
  line(x0-10,yb,W-30,yb,INK,2);
  vals.forEach(function(v,i){ var h=v+(mean-v)*t, x=x0+i*gap+(gap-bw)/2, lo=Math.min(v,h);
    rect(x,yb-lo*u,bw,lo*u,rgba(BLUE,0.9)); if(h>v) rect(x,yb-h*u,bw,(h-v)*u,rgba(ORANGE,0.9)); if(v>h&&t<1){ g.globalAlpha=1-t; rect(x,yb-v*u,bw,(v-h)*u,rgba(ORANGE,0.9)); g.globalAlpha=1; }
    var top=Math.max(h,t<1?v:h); for(k=1;k<top;k++) line(x,yb-k*u,x+bw,yb-k*u,INK,0.8); rect(x,yb-top*u,bw,top*u,null,INK,1.6);
    txt((i+1)+'회',x+bw/2,yb+16,MUTED,14); txt(DD(Math.round(h*10)/10),x+bw/2,yb-top*u-12,INK,17); });
  return {yb:yb,u:u,x0:x0}; }
function meanLine(o,mean,col){ line(o.x0-10,o.yb-mean*o.u,W-30,o.yb-mean*o.u,col||HOT,2.2,[8,6]); txt('평균 '+DD(mean),W-34,o.yb-mean*o.u-12,col||HOT,15,'right'); }

/* ───────── 1. 평균의 뜻 ───────── */
var lv=[4,7,5,9,5], lt=0;
function lvNew(){ var n=ri(3,6), m=ri(3,7), v, s, tries=0; do{ v=[]; s=0; for(var i=0;i<n-1;i++){ var x=ri(1,10); v.push(x); s+=x; } var last=m*n-s; tries++; }while((last<1||last>10||v.concat([last]).every(function(x){ return x===m; }))&&tries<200); v.push(last); lv=v; lt=0; }
function lvDraw(){ var n=lv.length, sum=lv.reduce(function(a,b){ return a+b; },0), m=sum/n, o=barsDraw(lv,lt,m); if(lt>0.02) meanLine(o,m);
  var b=$('lvGo'); if(b&&!anT) b.textContent=lt>0.5?'◀ 되돌리기':'▶ 고르게 하기';
  $('say').innerHTML=lt<0.99?('제기차기 기록이 '+lv.join(', ')+'개예요. 기록을 대표하는 값을 정하려면 어떻게 하면 좋을까요?<small>높은 막대에서 덜어 내어 낮은 막대에 채우면 높이를 고르게 만들 수 있어요. ▶ 고르게 하기를 눌러 보세요.</small>'):
    ('많은 쪽에서 덜어 적은 쪽에 채웠더니 모두 <b class="r">'+DD(m)+'개</b>로 고르게 되었어요. 이 값이 평균이에요.<small style="font-size:15.5px;color:var(--ink)">자료의 값을 모두 더해 자료의 수로 나눈 값을 <b>평균</b>이라고 해요. 평균은 자료를 대표하는 값으로 쓸 수 있어요.<br>('+lv.join(' + ')+') ÷ '+n+' = '+sum+' ÷ '+n+' = '+DD(m)+'</small>'); }
function lvUI(){ $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="lvGo">▶ 고르게 하기</button><button class="btn" id="lvNew">다른 자료</button></div>';
  $('lvGo').onclick=function(){ anim(function(){ return lt; },function(v){ lt=v; },lt>0.5?0:1,1800); }; $('lvNew').onclick=function(){ anStop(); lvNew(); draw(); }; }

/* ───────── 2. 평균 구하기 ───────── */
var cv2=[82,90,76,88,84], cn=['국어','수학','사회','과학','영어'];
function clDraw(){ var v=cv2.filter(function(x){ return x!==''; }).map(Number), n=v.length; if(!n){ $('say').innerHTML='점수를 써 보세요.'; return; } var sum=v.reduce(function(a,b){ return a+b; },0), m=sum/n, o=barsDraw0(v,cn.filter(function(x,i){ return cv2[i]!==''; })); meanLine(o,m);
  $('say').innerHTML='점수의 평균은 <b class="r">'+DD(Math.round(m*100)/100)+'점</b>이에요.<small style="font-size:15.5px;color:var(--ink)">(평균) = (자료의 값을 모두 더한 수) ÷ (자료의 수)<br>('+v.join(' + ')+') ÷ '+n+' = '+sum+' ÷ '+n+' = '+DD(Math.round(m*100)/100)+'<br>점수 하나를 바꾸면 평균이 어떻게 달라지는지 살펴보세요. 평균보다 높은 점수와 낮은 점수가 함께 있어요.</small>'; }
function barsDraw0(vals,labels){ var n=vals.length, mx=Math.max.apply(null,vals.concat([10])), gap=(W-80)/n, bw=Math.min(74,gap*0.62), x0=40, yb=H-44, u=(H-100)/mx;
  line(x0-10,yb,W-30,yb,INK,2); vals.forEach(function(v,i){ var x=x0+i*gap+(gap-bw)/2; rect(x,yb-v*u,bw,v*u,rgba(GC[i%GC.length],0.9),INK,1.5); txt(labels[i],x+bw/2,yb+16,MUTED,14); txt(''+v,x+bw/2,yb-v*u-12,INK,17); }); return {yb:yb,u:u,x0:x0}; }
function clUI(){ $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+cn.map(function(nm,i){ return '<label style="min-width:0">'+nm+' <input type="number" data-i="'+i+'" value="'+cv2[i]+'" min="0" max="100" inputmode="numeric"></label>'; }).join('')+'</div><p class="note">칸을 비우면 그 과목은 빼고 계산해요.</p>';
  $('ctl').querySelectorAll('[data-i]').forEach(function(el){ el.oninput=function(){ cv2[+el.dataset.i]=el.value===''?'':Math.max(0,Math.min(100,+el.value)); draw(); }; }); }

/* ───────── 3. 평균 이용하기 ───────── */
var quiz=QZ(function(){ var t=rnd(4), n=ri(3,5), m=ri(6,18), v=[], s=0, i, q, w=pick([['줄넘기 기록','번'],['읽은 책의 수','권'],['넣은 공의 수','개'],['턱걸이 기록','회']]);
  for(i=0;i<n-1;i++){ var x=Math.max(1,m+ri(-4,4)); v.push(x); s+=x; } var last=m*n-s; if(last<1){ v[0]+=1-last; last=1; } v.push(last); s=m*n;
  if(t===0) q={lines:[w[0],v.join(',  ')+' ('+w[1]+')'],ask:'평균은 몇 '+w[1]+'일까요?',kind:'num',unit:w[1],ans:m,show:m+w[1],why:'('+v.join(' + ')+') ÷ '+n+' = '+s+' ÷ '+n+' = '+m,hint:'모두 더한 다음 자료의 수 '+n+Pr(n)+' 나누어요.'};
  else if(t===1){ var h=rnd(n), sh=v.map(function(x,j){ return j===h?'□':x; }); q={lines:[w[0]+'의 평균이 '+m+w[1],sh.join(',  ')+' ('+w[1]+')'],ask:'□ 안에 알맞은 수는 얼마일까요?',kind:'num',unit:w[1],ans:v[h],show:v[h]+w[1],why:'자료의 값을 모두 더한 수는 평균 × 자료의 수 = '+m+' × '+n+' = '+J(s,'이에요','예요')+'. 여기에서 나머지 값을 모두 빼면 '+v[h]+P(v[h],'이에요','예요')+'.',hint:'(자료의 값을 모두 더한 수) = (평균) × (자료의 수)'}; }
  else if(t===2){ var n2=n+pick([-1,1]), m2=m+pick([-2,-1,1,2]), big=m>m2?'가 모둠':'나 모둠'; q={lines:['가 모둠: '+n+'명이 모두 '+s+w[1],'나 모둠: '+n2+'명이 모두 '+(m2*n2)+w[1]],ask:w[0]+'의 평균이 더 높은 모둠은 어느 모둠일까요?',kind:'mc',opts:['가 모둠','나 모둠'],ans:big,show:big,why:'가 모둠 평균: '+s+' ÷ '+n+' = '+m+'　　나 모둠 평균: '+(m2*n2)+' ÷ '+n2+' = '+m2+'<br>사람 수가 다를 때는 합계가 아니라 평균으로 비교해요.'}; }
  else q={lines:[n+'명의 '+w[0]+' 평균이 '+m+w[1]],ask:n+'명의 기록을 모두 더하면 몇 '+w[1]+'일까요?',kind:'num',unit:w[1],ans:s,show:s+w[1],why:'(평균) × (자료의 수) = '+m+' × '+n+' = '+s,hint:'평균에 자료의 수를 곱해요.'};
  return q; });

/* ───────── 4. 가능성을 말로 ───────── */
var WD=['불가능하다','~아닐 것 같다','반반이다','~일 것 같다','확실하다'];
var WS=[['내일 아침에 해가','서쪽에서 뜰 것이다.',0],['주사위를 던지면','눈의 수가 7이 나올 것이다.',0],['동전을 던지면','그림 면이 나올 것이다.',2],['주사위를 던지면','눈의 수가 짝수일 것이다.',2],['내년에는 12월이','11월보다 늦게 올 것이다.',4],['오늘이 월요일이면','내일은 화요일일 것이다.',4],['주사위를 던지면','눈의 수가 1이 나올 것이다.',1],['주사위를 던지면','눈의 수가 2 이상일 것이다.',3],
  ['빨간 구슬 2개, 파란 구슬 2개가 든 주머니에서','꺼낸 구슬이 빨간색일 것이다.',2],['빨간 구슬 4개만 든 주머니에서','꺼낸 구슬이 파란색일 것이다.',0],['빨간 구슬 1개, 파란 구슬 9개가 든 주머니에서','꺼낸 구슬이 빨간색일 것이다.',1],['당첨 제비 9개, 꽝 1개가 든 상자에서','뽑은 제비가 당첨일 것이다.',3],['계산기에 1 + 1을 누르면','2가 나올 것이다.',4],['1부터 10까지 쓴 카드 중 한 장을 뽑으면','10보다 큰 수가 나올 것이다.',0]], wI=-1;
var WHY=['절대 일어날 수 없는 일이에요.','일어날 수는 있지만 일어나지 않을 때가 더 많아요.','일어날 때와 일어나지 않을 때가 절반씩이에요.','일어나지 않을 수도 있지만 일어날 때가 더 많아요.','반드시 일어나는 일이에요.'];
var wq=QZ(function(){ var i; do{ i=rnd(WS.length); }while(i===wI); wI=i; var s=WS[i]; return {lines:[s[0],s[1]],ask:'이 일이 일어날 <b>가능성</b>을 알맞게 표현한 말을 고르세요.<small>가능성은 어떤 상황에서 특정한 일이 일어나길 기대할 수 있는 정도예요.</small>',kind:'mc',opts:WD,ans:WD[s[2]],show:WD[s[2]],why:WHY[s[2]]}; });

/* ───────── 5. 가능성을 수로 ───────── */
var nk='bag', nr=2, nc='red';
function spinner(cx,cy,r,p,ang){ g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*p); g.closePath(); g.fillStyle=rgba(RED,0.95); g.fill(); g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,-Math.PI/2+Math.PI*2*p,Math.PI*1.5); g.closePath(); g.fillStyle=rgba(BLUE,0.95); g.fill();
  g.beginPath(); g.arc(cx,cy,r,0,7); g.strokeStyle=INK; g.lineWidth=2.6; g.stroke(); if(p>0&&p<1){ line(cx,cy,cx,cy-r,INK,1.6); line(cx,cy,cx+r*Math.cos(-Math.PI/2+Math.PI*2*p),cy+r*Math.sin(-Math.PI/2+Math.PI*2*p),INK,1.6); }
  if(ang!=null){ line(cx,cy,cx+r*0.82*Math.cos(ang),cy+r*0.82*Math.sin(ang),INK,5); g.beginPath(); g.arc(cx,cy,7,0,7); g.fillStyle=INK; g.fill(); } }
function nmDraw(){ var p=nr/4, v=nc==='red'?p:1-p, cx=W*0.3, cy=H*0.4, r=Math.min(H*0.28,W*0.17), i;
  if(nk==='spin') spinner(cx,cy,r,p,-Math.PI/4); else { g.beginPath(); g.moveTo(cx-r,cy-r*0.7); g.quadraticCurveTo(cx-r*1.3,cy+r*1.2,cx,cy+r*1.15); g.quadraticCurveTo(cx+r*1.3,cy+r*1.2,cx+r,cy-r*0.7); g.closePath(); g.fillStyle=rgba(GRAY,0.3); g.fill(); g.strokeStyle=INK; g.lineWidth=2.4; g.stroke();
    for(i=0;i<4;i++){ g.beginPath(); g.arc(cx+(i%2?1:-1)*r*0.38,cy+(i<2?0:1)*r*0.62-r*0.05,r*0.26,0,7); g.fillStyle=rgba(i<nr?RED:BLUE,0.95); g.fill(); g.strokeStyle=INK; g.lineWidth=1.6; g.stroke(); } }
  var x1=W*0.56, x2=W-40, y=H*0.42; line(x1,y,x2,y,INK,3); [[0,'0','불가능하다'],[0.5,'1/2','반반이다'],[1,'1','확실하다']].forEach(function(t){ var x=x1+(x2-x1)*t[0]; line(x,y-10,x,y+10,INK,2.4); if(t[1]==='1/2') cfr(1,2,x,y+34,INK,15); else txt(t[1],x,y+30,INK,18); txt(t[2],x,y+62,MUTED,13); });
  var mx=x1+(x2-x1)*v; g.beginPath(); g.moveTo(mx,y-12); g.lineTo(mx-11,y-34); g.lineTo(mx+11,y-34); g.closePath(); g.fillStyle=HOT; g.fill();
  var what=(nk==='spin'?'화살이 ':'꺼낸 구슬이 ')+(nc==='red'?'빨간색':'파란색')+(nk==='spin'?'에 멈출':'일')+' 가능성', word=v===0?'불가능하다':(v===1?'확실하다':'반반이다'), num=v===0?'0':(v===1?'1':F(1,2));
  $('say').innerHTML=what+'은 「'+word+'」이고, 수로 나타내면 <b class="r">'+num+'</b>이에요.<small style="font-size:15.5px;color:var(--ink)">일이 일어날 가능성을 0부터 1까지의 수로 표현할 수 있어요. 「불가능하다」는 0, 「반반이다」는 '+F(1,2)+', 「확실하다」는 1이에요.</small>'; }
function nmUI(){ $('top').innerHTML=chipsH([['bag','구슬 주머니'],['spin','회전판']],nk,'k');
  $('ctl').innerHTML=chipsH([[0,'빨강 없음'],[2,'빨강 절반'],[4,'모두 빨강']],nr,'r','margin-top:8px')+chipsH([['red','빨간색이 나올 가능성'],['blue','파란색이 나올 가능성']],nc,'c');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ nk=b.dataset.k; nmUI(); draw(); }; });
  $('ctl').querySelectorAll('[data-r]').forEach(function(b){ b.onclick=function(){ nr=+b.dataset.r; nmUI(); draw(); }; }); $('ctl').querySelectorAll('[data-c]').forEach(function(b){ b.onclick=function(){ nc=b.dataset.c; nmUI(); draw(); }; }); }

/* ───────── 6. 실험하기 ───────── */
var xp=2, xr=0, xn=0, xa=-Math.PI/4;
function xpDraw(){ var p=xp/4, cx=W*0.27, cy=H*0.46, r=Math.min(H*0.34,W*0.2), bx=W*0.54, bw=W-bx-36, y=H*0.34, hh=46;
  spinner(cx,cy,r,p,xa); txt('돌린 횟수 '+xn+'번',bx,y-56,INK,18,'left');
  rect(bx,y,bw,hh,rgba(BLUE,0.9)); if(xn) rect(bx,y,bw*xr/xn,hh,rgba(RED,0.95)); rect(bx,y,bw,hh,null,INK,2.2); line(bx+bw*p,y-12,bx+bw*p,y+hh+12,INK,2.4,[6,4]); txt('예상',bx+bw*p,y-22,INK,13);
  txt('빨강 '+xr+'번',bx,y+hh+34,HOT,17,'left'); txt('파랑 '+(xn-xr)+'번',bx+bw,y+hh+34,ACC,17,'right'); if(xn) txt('빨강의 비율 '+(xr/xn*100).toFixed(1)+'%',bx,y+hh+66,INK,17,'left');
  var ex=['0','1/4','1/2','3/4','1'][xp];
  $('say').innerHTML=xn===0?('빨간색에 멈출 가능성: <b class="r">'+(xp===0?'0 (불가능하다)':(xp===4?'1 (확실하다)':(xp===2?F(1,2)+' (반반이다)':(xp===1?'「~아닐 것 같다」':'「~일 것 같다」'))))+'</b> 정말 그럴까요?<small>아래 버튼으로 여러 번 돌려 보세요.</small>'):
    (xn+'번 돌려서 빨간색이 '+xr+'번 나왔어요. 빨간색의 비율은 <b class="r">'+(xr/xn*100).toFixed(1)+'%</b>이고, 예상한 비율은 '+(p*100)+'%예요.<small style="font-size:15.5px;color:var(--ink)">'+(xn<50?'돌린 횟수가 적으면 예상과 많이 다를 수 있어요. 더 많이 돌려 보세요.':'돌린 횟수가 많아질수록 결과가 예상한 비율에 가까워져요.')+'</small>'); }
function xpSpin(k){ var p=xp/4, last=0; for(var i=0;i<k;i++){ last=Math.random(); if(last<p) xr++; xn++; } xa=-Math.PI/2+Math.PI*2*last; draw(); }
function xpUI(){ $('top').innerHTML=chipsH([[0,'빨강 없음'],[1,'빨강 1/4'],[2,'빨강 절반'],[3,'빨강 3/4'],[4,'모두 빨강']],xp,'p');
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" data-k="1">1번 돌리기</button><button class="btn primary" data-k="10">10번</button><button class="btn primary" data-k="100">100번</button><button class="btn primary" data-k="1000">1000번</button><button class="btn" id="xClr">처음부터</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ xp=+b.dataset.p; xr=0; xn=0; xpUI(); draw(); }; });
  $('ctl').querySelectorAll('[data-k]').forEach(function(b){ b.onclick=function(){ xpSpin(+b.dataset.k); }; }); $('xClr').onclick=function(){ xr=0; xn=0; draw(); }; }

/* ───────── 7. 가능성으로 판단하기 ───────── */
var FO=['공정하다','가에게 유리하다','나에게 유리하다'];
var FG=[['주사위를 던져 짝수가 나오면 가가 이기고,','홀수가 나오면 나가 이겨요.',0,'짝수는 2, 4, 6으로 3가지, 홀수는 1, 3, 5로 3가지예요. 두 사람이 이길 가능성이 똑같이 반반이에요.'],
  ['주사위를 던져 1, 2가 나오면 가가 이기고,','3, 4, 5, 6이 나오면 나가 이겨요.',2,'가가 이기는 눈은 2가지, 나가 이기는 눈은 4가지예요. 나가 이길 가능성이 더 높아요.'],
  ['주사위를 던져 6의 약수가 나오면 가가 이기고,','그렇지 않으면 나가 이겨요.',1,'6의 약수는 1, 2, 3, 6으로 4가지이고 나머지는 4, 5로 2가지예요. 가가 이길 가능성이 더 높아요.'],
  ['동전을 던져 그림 면이 나오면 가가 이기고,','숫자 면이 나오면 나가 이겨요.',0,'그림 면과 숫자 면이 나올 가능성은 똑같이 반반이에요.'],
  ['빨간 구슬 3개, 파란 구슬 1개가 든 주머니에서 1개를 꺼내','빨간색이면 가, 파란색이면 나가 이겨요.',1,'구슬 4개 가운데 빨간 구슬이 3개예요. 빨간색이 나올 가능성이 더 높으므로 가에게 유리해요.'],
  ['빨간색이 전체의 1/4인 회전판을 돌려','빨간색이면 가, 파란색이면 나가 이겨요.',2,'파란색이 전체의 3/4이에요. 파란색에 멈출 가능성이 더 높으므로 나에게 유리해요.'],
  ['1부터 10까지 쓴 카드에서 한 장을 뽑아','5 이하이면 가, 6 이상이면 나가 이겨요.',0,'5 이하는 1, 2, 3, 4, 5로 5장, 6 이상은 6, 7, 8, 9, 10으로 5장이에요. 가능성이 같아요.'],
  ['1부터 10까지 쓴 카드에서 한 장을 뽑아','3의 배수이면 가, 아니면 나가 이겨요.',2,'3의 배수는 3, 6, 9로 3장뿐이고 나머지는 7장이에요. 나가 이길 가능성이 더 높아요.']];
var JG=[['내일 비가 올 가능성이 90%라고 해요.','소풍 준비를 어떻게 하면 좋을까요?',['우산을 챙긴다','우산은 필요 없다'],0,'비가 올 가능성이 매우 높아요. 가능성이 높은 일에 대비하는 것이 알맞은 판단이에요.'],
  ['제비 100개 가운데 당첨 제비는 2개예요.','제비 1개를 뽑을 때 알맞은 예상은 무엇일까요?',['당첨될 것이다','당첨되기 어렵다'],1,'당첨될 가능성은 100개 가운데 2개로 매우 낮아요. 당첨을 기대하고 결정하면 실망하기 쉬워요.'],
  ['지난 30일 동안 버스가 27일은 제시간에 왔어요.','내일 버스는 어떨 것이라고 예상할 수 있나요?',['제시간에 올 것 같다','늦게 올 것 같다'],0,'30일 가운데 27일은 제시간에 왔어요. 자료를 보면 내일도 제시간에 올 가능성이 높아요. 다만 확실한 것은 아니에요.'],
  ['동전을 4번 던졌더니 모두 그림 면이 나왔어요.','다섯 번째에는 어떤 면이 나올까요?',['그림 면이 확실하다','숫자 면이 확실하다','알 수 없다, 반반이다'],2,'앞에서 나온 결과는 다음 결과에 영향을 주지 않아요. 다섯 번째에도 그림 면과 숫자 면이 나올 가능성은 반반이에요.'],
  ['주사위를 600번 던졌더니 1의 눈이 98번 나왔어요.','6000번 던지면 1의 눈은 몇 번쯤 나올까요?',['약 100번','약 1000번','약 3000번'],1,'1의 눈은 6번에 1번꼴로 나와요. 600번 가운데 약 100번 나왔으니 6000번 던지면 약 1000번 나올 것으로 예상할 수 있어요.'],
  ['과녁 맞히기에서 가는 20번 중 15번,','나는 20번 중 9번 맞혔어요. 대표로 누구를 뽑을까요?',['가','나'],0,'같은 20번 가운데 가가 더 많이 맞혔어요. 다음에도 가가 맞힐 가능성이 더 높다고 예상할 수 있어요.'],
  ['급식에 과일이 나온 날은 지난 20일 가운데 19일이에요.','내일 급식에 과일이 나올 가능성은 어떨까요?',['~아닐 것 같다','반반이다','~일 것 같다'],2,'20일 가운데 19일이나 과일이 나왔어요. 내일도 나올 가능성이 높지만, 확실하다고 할 수는 없어요.']], jI=-1, fI=-1;
var jq=QZ(function(){ var t=rnd(5), i;
  if(t===0){ var w1=ri(2,8), n2=pick([20,50]), w2; do{ w2=(w1+pick([-2,-1,1,2]))*n2/10; }while(w2<n2/10||w2>n2*0.9); var a=w1/10>w2/n2?'가 상자':'나 상자';
    return {lines:['가 상자: 제비 10개 가운데 당첨 '+w1+'개','나 상자: 제비 '+n2+'개 가운데 당첨 '+w2+'개'],ask:'제비 1개를 뽑는다면 어느 상자에서 뽑는 것이 유리할까요?',kind:'mc',opts:['가 상자','나 상자'],ans:a,show:a,why:'당첨될 가능성은 가 상자가 '+F(w1,10)+', 나 상자가 '+F(w2,n2)+' = '+F(w2*10/n2,10)+'이에요. 당첨 제비의 수가 아니라 전체 가운데 당첨 제비가 차지하는 정도로 비교해요.'}; }
  if(t===1){ var k=pick([1,2,3]), r=k*25+ri(-5,5), o=['빨강이 전체의 1/4','빨강이 전체의 절반','빨강이 전체의 3/4'];
    return {lines:['회전판을 100번 돌렸더니','빨강 '+r+'번, 파랑 '+(100-r)+'번이 나왔어요.'],ask:'어떤 회전판을 돌렸을 가능성이 가장 높을까요?',kind:'mc',opts:o,ans:o[k-1],show:o[k-1],why:'빨강이 100번 가운데 '+r+'번으로 약 '+(k*25)+'%예요. 여러 번 실험한 결과는 실제 가능성에 가까워지므로, '+o[k-1]+'인 회전판이라고 예상할 수 있어요.'}; }
  if(t===2){ do{ i=rnd(FG.length); }while(i===fI); fI=i; var f=FG[i]; return {lines:[f[0],f[1]],ask:'이 놀이 규칙은 <b>공정</b>할까요?<small>두 사람이 이길 가능성이 같아야 공정한 놀이예요.</small>',kind:'mc',opts:FO,ans:FO[f[2]],show:FO[f[2]],why:f[3]}; }
  if(t===3){ var d=pick([[3,0],[4,0],[10,1],[16,2],[17,2]]), c=pick([['자유투를 20번 던져 ','번 넣었어요.','다음 자유투가 들어갈'],['화살을 20번 쏘아 ','번 과녁에 맞혔어요.','다음 화살이 과녁에 맞을'],['뽑기를 20번 해서 ','번 당첨되었어요.','다음 뽑기에서 당첨될']]), o2=['~아닐 것 같다','반반이다','~일 것 같다'];
    return {lines:[c[0]+d[0]+c[1]],ask:c[2]+' 가능성을 알맞게 표현한 말을 고르세요.',kind:'mc',opts:o2,ans:o2[d[1]],show:o2[d[1]],why:'20번 가운데 '+d[0]+'번이면 '+(d[1]===1?'절반이에요.':(d[1]===0?'절반보다 훨씬 적어요.':'절반보다 훨씬 많아요.'))+' 지금까지의 자료를 보고 다음에 일어날 가능성을 예상할 수 있어요.'}; }
  do{ i=rnd(JG.length); }while(i===jI); jI=i; var s=JG[i]; return {lines:[s[0],s[1]],ask:'가능성을 생각하여 알맞은 판단을 골라 보세요.',kind:'mc',opts:s[2],ans:s[2][s[3]],show:s[2][s[3]],why:s[4]}; });

var UIS={judge:function(){ $('top').innerHTML=''; jq.ui(); },level:lvUI,calc:clUI,use:function(){ $('top').innerHTML=''; quiz.ui(); },word:function(){ $('top').innerHTML=''; wq.ui(); },num:nmUI,exp:xpUI}, DRS={judge:jq.draw,level:lvDraw,calc:clDraw,use:quiz.draw,word:wq.draw,num:nmDraw,exp:xpDraw};
function ui(){ UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
