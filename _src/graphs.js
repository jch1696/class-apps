/* 여러 가지 그래프 (6학년 1학기) */
var DS=[{t:'좋아하는 운동',u:'명',T:40,it:[['축구',35],['피구',25],['농구',20],['줄넘기',15],['기타',5]]},{t:'가고 싶은 체험 학습 장소',u:'명',T:20,it:[['놀이공원',40],['과학관',25],['박물관',20],['동물원',10],['기타',5]]},
  {t:'좋아하는 과목',u:'명',T:200,it:[['체육',30],['미술',25],['수학',20],['국어',15],['기타',10]]},{t:'마을별 쓰레기 배출량',u:'kg',T:400,it:[['가 마을',45],['나 마을',30],['다 마을',15],['라 마을',10]]}], ds=0;
function items(o){ return o.it.map(function(x){ return {nm:x[0],p:x[1],n:o.T*x[1]/100}; }); }

/* ───────── 1. 그림그래프 ───────── */
var pg=null, pgNum=false, PGT=[['마을별 사과 생산량','상자','🍎'],['도서관별 책 수','권','📘'],['농장별 닭의 수','마리','🐔'],['지역별 초등학생 수','명','🧒']];
function pgNew(){ var t=pick(PGT), v=[]; while(v.length<4){ var x=ri(11,49)*10; if(v.indexOf(x)<0) v.push(x); } pg={t:t,v:v,nm:['가','나','다','라']}; }
function pgDraw(){ if(!pg) pgNew(); var rh=Math.min(64,(H-70)/4), x0=Math.max(70,W*0.14), y0=58, big=Math.min(40,rh*0.68), sm=big*0.52;
  txt(pg.t[0],W/2,24,INK,19); g.textBaseline='middle';
  pg.v.forEach(function(v,i){ var y=y0+i*rh+rh/2, x=x0+16, k; rect(14,y0+i*rh,W-28,rh,i%2?null:rgba(GRAY,0.15)); txt(pg.nm[i],x0-24,y,INK,19);
    g.font=big+'px sans-serif'; g.textAlign='left'; g.fillStyle=INK; for(k=0;k<Math.floor(v/100);k++){ g.fillText(pg.t[2],x,y); x+=big*1.12; } g.font=sm+'px sans-serif'; for(k=0;k<(v%100)/10;k++){ g.fillText(pg.t[2],x,y+big*0.18); x+=sm*1.15; }
    if(pgNum) txt(v+pg.t[1],W-24,y,HOT,17,'right'); });
  g.font=big*0.8+'px sans-serif'; g.textAlign='left'; g.fillStyle=INK; g.fillText(pg.t[2],W/2-150,H-22); txt('100'+pg.t[1],W/2-150+big,H-22,INK,15,'left'); g.font=sm*0.9+'px sans-serif'; g.textAlign='left'; g.fillText(pg.t[2],W/2+20,H-20); txt('10'+pg.t[1],W/2+20+sm+4,H-22,INK,15,'left');
  var mx=pg.v.indexOf(Math.max.apply(null,pg.v)), mn=pg.v.indexOf(Math.min.apply(null,pg.v));
  $('say').innerHTML='조사한 수를 그림으로 나타낸 그래프를 <b class="r">그림그래프</b>라고 해요. 큰 그림은 100'+pg.t[1]+', 작은 그림은 10'+pg.t[1]+KP(pg.t[1],'을','를')+' 나타내요.'+(pgNum?' 가장 많은 곳은 <b>'+pg.nm[mx]+'</b>('+pg.v[mx]+pg.t[1]+'), 가장 적은 곳은 <b>'+pg.nm[mn]+'</b>('+pg.v[mn]+pg.t[1]+')예요.':'')+'<small style="font-size:15.5px;color:var(--ink)">그림의 크기와 수로 많고 적음을 한눈에 알 수 있어요. 먼저 그림을 세어 각각 얼마인지 읽어 보고 [수 보이기]로 확인하세요.</small>'; }
function pgUI(){ $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="pgNum">'+(pgNum?'수 숨기기':'수 보이기')+'</button><button class="btn" id="pgNew">다른 자료</button></div>';
  $('pgNum').onclick=function(){ pgNum=!pgNum; pgUI(); draw(); }; $('pgNew').onclick=function(){ pgNew(); pgNum=false; pgUI(); draw(); }; }

/* ───────── 막대그래프와 꺾은선그래프 ───────── */
function niceStep(r){ var c=[1,2,5,10,20,25,50,100,200,500,1000,2000,5000], i; for(i=0;i<c.length;i++) if(r/c[i]<=8) return c[i]; return Math.ceil(r/8); }
/* o: {u:단위, wave:물결선, pts:찍을 점 수, segs:이을 선 수, hl:강조할 선 번호, vals:값 표시, top} → 세로 눈금 한 칸 크기를 돌려줌 */
function drawXY(kind,labs,vals,o){ o=o||{}; var x0=Math.max(58,W*0.1), x1=W-26, y0=o.top||50, y1=H-46, mx=Math.max.apply(null,vals), mn=Math.min.apply(null,vals), lo=0, st, hi, i, n=vals.length;
  if(o.wave&&kind==='line'){ st=niceStep((mx-mn)||1); lo=Math.max(0,Math.floor(mn/st)*st-st); }
  st=niceStep((mx-lo)||1); hi=Math.max(lo+st,Math.ceil(mx/st)*st); var gy=lo>0?y1-30:y1, Y=function(v){ return gy-(v-lo)/(hi-lo)*(gy-y0); }, gx=(x1-x0)/n, X=function(k){ return x0+gx*(k+0.5); };
  for(i=0;i<=Math.round((hi-lo)/st);i++){ var v=lo+i*st; line(x0,Y(v),x1,Y(v),LINE,1); txt(''+v,x0-8,Y(v),MUTED,13,'right'); }
  if(kind==='line') for(i=0;i<n;i++) line(X(i),y0,X(i),gy,LINE,1);
  line(x0,y0-8,x0,y1,INK,2); line(x0,y1,x1,y1,INK,2); txt('('+(o.u||'')+')',x0-8,y0-24,MUTED,13,'right');
  if(lo>0){ txt('0',x0-8,y1,MUTED,13,'right'); g.beginPath(); for(var x=x0-6;x<=x1;x+=4){ var yy=(y1+gy)/2+Math.sin((x-x0)/9)*4; if(x===x0-6) g.moveTo(x,yy); else g.lineTo(x,yy); } g.strokeStyle=HOT; g.lineWidth=2; g.stroke(); }
  labs.forEach(function(s,k){ txt(s,X(k),y1+16,INK,Math.min(15,gx/3+6)); });
  if(kind==='bar'){ var bw=Math.min(64,gx*0.56); vals.forEach(function(v2,k){ rect(X(k)-bw/2,Y(v2),bw,y1-Y(v2),rgba(GC[k%GC.length],0.9),INK,1.6); if(o.vals) txt(''+v2,X(k),Y(v2)-12,INK,15); }); }
  else { var np=o.pts==null?n:o.pts, ns=o.segs==null?n-1:o.segs; for(i=0;i<ns&&i<n-1;i++) line(X(i),Y(vals[i]),X(i+1),Y(vals[i+1]),i===o.hl?HOT:ACC,i===o.hl?5:3);
    for(i=0;i<np&&i<n;i++){ g.beginPath(); g.arc(X(i),Y(vals[i]),6,0,7); g.fillStyle=ACC; g.fill(); g.strokeStyle=HALO; g.lineWidth=2; g.stroke(); if(o.vals) txt(''+vals[i],X(i),Y(vals[i])-15,INK,15); } }
  return st; }
var XD=[{t:'교실의 온도',u:'℃',xn:'시각',x:['9시','10시','11시','12시','1시','2시','3시'],v:[12,14,17,21,23,24,22]},{t:'나의 몸무게',u:'kg',xn:'월',x:['3월','4월','5월','6월','7월','8월'],v:[36,37,37,39,40,42]},
  {t:'강낭콩의 키',u:'cm',xn:'날짜',x:['1일','3일','5일','7일','9일','11일'],v:[1,3,7,13,18,21]},{t:'도서관 방문자 수',u:'명',xn:'요일',x:['월','화','수','목','금'],v:[120,135,128,150,172]}], xi=0, xk='line', xs=3, xw=false;
function xyDraw(){ var o=XD[xi], n=o.v.length, hl=-1, d=0, i; for(i=0;i<n-1;i++) if(Math.abs(o.v[i+1]-o.v[i])>d){ d=Math.abs(o.v[i+1]-o.v[i]); hl=i; }
  txt(o.t,W/2,22,INK,18); var line_=xk==='line', st=drawXY(xk,o.x,o.v,line_?{u:o.u,wave:xw,pts:xs>=1?n:0,segs:xs>=2?n-1:0,hl:xs>=3?hl:-1,vals:xs>=3}:{u:o.u,vals:true});
  var mxI=o.v.indexOf(Math.max.apply(null,o.v)), mnI=o.v.indexOf(Math.min.apply(null,o.v)), up=o.v[hl+1]>o.v[hl], canWave=Math.min.apply(null,o.v)>=niceStep(Math.max.apply(null,o.v)-Math.min.apply(null,o.v)||1)*2;
  $('say').innerHTML=!line_?('<b class="r">막대그래프</b>는 막대의 길이로 크기를 비교하기 좋아요. 가장 큰 때는 <b>'+o.x[mxI]+'</b>('+o.v[mxI]+o.u+')이고, 가장 작은 때는 <b>'+o.x[mnI]+'</b>('+o.v[mnI]+o.u+')이에요.<small style="font-size:15.5px;color:var(--ink)">세로 눈금 한 칸의 크기는 '+st+o.u+'. 그런데 시간에 따라 어떻게 변하는지는 한눈에 보기 어려워요. 꺾은선그래프로 바꿔 보세요.</small>'):
    ([ '가로에는 '+o.xn+KP(o.xn,'을','를')+', 세로에는 '+o.t+KP(o.t,'을','를')+' 나타내요. 세로 눈금 한 칸의 크기는 '+st+o.u+'.<small>[다음 ▶]을 눌러 꺾은선그래프를 그려 보세요.</small>',
       '가로 눈금과 세로 눈금이 만나는 자리에 <b class="r">점</b>을 찍어요.',
       '점들을 <b class="r">선분</b>으로 차례로 이어요. 수량을 점으로 표시하고 그 점들을 선분으로 이어 그린 그래프를 <b class="r">꺾은선그래프</b>라고 해요.',
       '선이 많이 기울어질수록 변화가 커요. 가장 많이 변한 때는 <b class="r">'+o.x[hl]+KP(o.x[hl],'과','와')+' '+o.x[hl+1]+' 사이</b>이고, '+d+o.u+'만큼 '+(up?'늘었어요':'줄었어요')+'.<small style="font-size:15.5px;color:var(--ink)">꺾은선그래프는 시간에 따라 변하는 모습을 알아보기 쉽고, 조사하지 않은 중간의 값도 예상할 수 있어요.'+(xw?' 필요 없는 부분을 <b>물결선</b>으로 줄였더니 세로 눈금 한 칸이 '+st+o.u+'씩으로 작아져 변화가 더 뚜렷하게 보여요.':(canWave?' [물결선으로 줄이기]를 눌러 보세요.':''))+'</small>'][xs]); }
function xyUI(){ $('top').innerHTML=chipsH(XD.map(function(x,i){ return [i,x.t]; }),xi,'i');
  $('ctl').innerHTML=chipsH([['bar','막대그래프'],['line','꺾은선그래프']],xk,'k','margin-top:8px')+(xk==='line'?'<div class="row"><button class="btn" id="xPrev">◀ 이전</button><button class="btn primary" id="xNext">다음 ▶</button><button class="chip" id="xWave" aria-pressed="'+xw+'">물결선으로 줄이기</button></div>':'');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ xi=+b.dataset.i; xw=false; xyUI(); draw(); }; });
  $('ctl').querySelectorAll('[data-k]').forEach(function(b){ b.onclick=function(){ xk=b.dataset.k; if(xk==='line') xs=0; xyUI(); draw(); }; });
  if(xk==='line'){ $('xPrev').onclick=function(){ xs=Math.max(0,xs-1); draw(); }; $('xNext').onclick=function(){ xs=Math.min(3,xs+1); draw(); }; $('xWave').onclick=function(){ xw=!xw; this.setAttribute('aria-pressed',xw); draw(); }; } }


/* ───────── 2. 띠그래프 ───────── */
var bs=0;
function dsChips(){ $('top').innerHTML=chipsH(DS.map(function(x,i){ return [i,x.t]; }),ds,'i'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ ds=+b.dataset.i; bs=0; ps=0; pm={}; pchk=false; ui(); draw(); }; }); }
function tbl(o,it,pct,y){ var r=[['항목'].concat(it.map(function(x){ return x.nm; })).concat(['합계']),['수 ('+o.u+')'].concat(it.map(function(x){ return x.n; })).concat([o.T])]; if(pct) r.push(['백분율 (%)'].concat(it.map(function(x){ return x.p; })).concat([100])); return ctable(r,y,null,34); }
function bdDraw(){ var o=DS[ds], it=items(o), BW=BWd(), x0=(W-BW)/2, y; txt(o.t,W/2,22,INK,18); y=tbl(o,it,bs>=1,40);
  if(bs>=2) drawBand(it,x0,y+62,BW,58,bs>=3,null);
  var f=it[0];
  $('say').innerHTML=['조사한 자료를 표로 정리했어요. 전체에 대한 각 항목의 비율을 한눈에 보려면 어떻게 나타내면 좋을까요?<small>[다음 ▶]을 눌러 띠그래프를 만들어 보세요.</small>',
    '먼저 각 항목의 <b class="r">백분율</b>을 구해요. '+f.nm+': '+F(f.n,o.T)+' × 100 = '+f.p+'(%)<small style="font-size:15.5px;color:var(--ink)">백분율의 합계가 100%인지 꼭 확인해요.</small>',
    '전체를 100%로 하는 띠를 그리고, 각 항목이 차지하는 백분율만큼 띠를 나누어요.<small style="font-size:15.5px;color:var(--ink)">작은 눈금 한 칸은 5%예요. '+f.nm+KP(f.nm,'은','는')+' '+f.p+'%이므로 눈금 '+(f.p/5)+'칸이에요.</small>',
    '나눈 부분에 항목의 이름과 백분율을 쓰면 <b class="r">띠그래프</b>가 완성돼요.<small style="font-size:15.5px;color:var(--ink)">전체에 대한 각 부분의 비율을 띠 모양에 나타낸 그래프예요. 길이가 길수록 비율이 높아요. 가장 비율이 높은 항목은 '+f.nm+'('+f.p+'%)예요.</small>'][bs]; }
function bdUI(){ dsChips(); $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn" id="bPrev">◀ 이전</button><button class="btn primary" id="bNext">다음 ▶</button><span class="score">'+(bs+1)+' / 4단계</span></div>';
  $('bPrev').onclick=function(){ bs=Math.max(0,bs-1); bdUI(); draw(); }; $('bNext').onclick=function(){ bs=Math.min(3,bs+1); bdUI(); draw(); }; }

/* ───────── 3. 원그래프 ───────── */
var pmode='watch', ps=0, pm={}, pchk=false, PIE={cx:0,cy:0,r:0};
function piDraw(){ var o=DS[ds], it=items(o), n=it.length, r=Math.min(H/2-44,W*0.24), cx=W*0.33, cy=H/2+10, acc=0, need=[], i; PIE={cx:cx,cy:cy,r:r}; txt(o.t,W/2,20,INK,18);
  it.forEach(function(x,k){ acc+=x.p; if(k<n-1) need.push(acc); var y=64+k*30; rect(W*0.64,y-10,20,20,rgba(GC[k%GC.length],0.9),INK,1.2); txt(x.nm+'  '+x.p+'%',W*0.64+28,y,INK,16,'left'); });
  if(pmode==='watch'){ drawPie(it,cx,cy,r,ps>n,ps>n?null:ps);
    $('say').innerHTML=ps===0?('전체를 100%로 하는 원을 그렸어요. 작은 눈금 한 칸은 5%예요. 위쪽 0에서 시작해 시계 방향으로 나누어요.<small>[다음 ▶]을 누르면 한 항목씩 그려져요.</small>'):
      (ps<=n?(it[ps-1].nm+KP(it[ps-1].nm,'은','는')+' '+it[ps-1].p+'%이므로 눈금 <b class="r">'+(it[ps-1].p/5)+'칸</b>만큼 나누어요.'):
      ('나눈 부분에 항목의 이름과 백분율을 쓰면 <b class="r">원그래프</b>가 완성돼요.<small style="font-size:15.5px;color:var(--ink)">전체에 대한 각 부분의 비율을 원 모양에 나타낸 그래프예요. 넓이가 넓을수록 비율이 높아요. 띠그래프와 같은 자료를 다른 모양으로 나타낸 것이에요.</small>')); }
  else { var keys=Object.keys(pm).map(Number), ok=keys.length===need.length&&need.every(function(v){ return pm[v]; });
    if(pchk&&ok) drawPie(it,cx,cy,r,true,null); else { drawPie([],cx,cy,r,false,null); line(cx,cy,cx,cy-r,INK,2); keys.forEach(function(v){ var a=-Math.PI/2+Math.PI*2*v/100, bad=pchk&&need.indexOf(v)<0; line(cx,cy,cx+r*Math.cos(a),cy+r*Math.sin(a),bad?'#DC2626':ACC,3); }); }
    $('say').innerHTML=(pchk&&ok)?'<b class="r">잘했어요!</b> 원그래프가 완성됐어요.<small>다른 자료로도 그려 보세요.</small>':
      (pchk?('경계선이 맞지 않아요. 빨간 선을 다시 살펴보세요. 필요한 경계선은 '+need.length+'개예요.<small>백분율을 차례로 더해 가며 눈금을 세어요. 한 칸은 5%예요.</small>'):('원의 둘레에 있는 눈금 근처를 눌러 경계선을 그어 보세요. 0에서 시작해 시계 방향으로 '+it.map(function(x){ return x.nm+' '+x.p+'%'; }).join(', ')+' 순서예요.<small>누른 곳에 가장 가까운 눈금에 선이 생겨요. 다시 누르면 지워져요. 필요한 경계선은 '+need.length+'개예요.</small>')); } }
function piUI(){ dsChips(); var n=DS[ds].it.length;
  $('ctl').innerHTML=chipsH([['watch','그리는 과정 보기'],['draw','직접 그리기']],pmode,'m','margin-top:8px')+(pmode==='watch'?'<div class="row"><button class="btn" id="pPrev">◀ 이전</button><button class="btn primary" id="pNext">다음 ▶</button></div>':'<div class="row"><button class="btn primary" id="pChk">확인하기</button><button class="btn" id="pClr">지우기</button></div>');
  $('ctl').querySelectorAll('[data-m]').forEach(function(b){ b.onclick=function(){ pmode=b.dataset.m; pm={}; pchk=false; ps=0; piUI(); draw(); }; });
  if(pmode==='watch'){ $('pPrev').onclick=function(){ ps=Math.max(0,ps-1); draw(); }; $('pNext').onclick=function(){ ps=Math.min(n+1,ps+1); draw(); }; }
  else { $('pChk').onclick=function(){ pchk=true; draw(); }; $('pClr').onclick=function(){ pm={}; pchk=false; draw(); }; } }
function onTap(x,y){ if(tab!=='pie'||pmode!=='draw') return; var dx=x-PIE.cx, dy=y-PIE.cy, d=Math.hypot(dx,dy); if(d<PIE.r*0.35||d>PIE.r+40) return;
  var p=Math.round(((Math.atan2(dy,dx)+Math.PI/2)/(Math.PI*2)*100+100)%100/5)*5%100; if(p===0) return; if(pm[p]) delete pm[p]; else pm[p]=1; pchk=false; draw(); }

/* ───────── 4. 그래프 해석하기 ───────── */
var RT=[['좋아하는 간식',['떡볶이','피자','치킨','과일','기타']],['취미 활동',['운동','게임','독서','음악 감상','기타']],['기르고 싶은 동물',['강아지','고양이','햄스터','물고기','기타']],['받고 싶은 선물',['책','옷','게임기','자전거','기타']]];
var quiz=QZ(function(){ var t=pick(RT), ps=pick([[40,25,20,10,5],[35,30,15,10,10],[45,20,20,10,5],[30,30,20,15,5],[50,25,10,10,5]]), T=pick([20,40,60,200]), it=t[1].map(function(nm,i){ return {nm:nm,p:ps[i],n:T*ps[i]/100}; }), k=rnd(4), q, a, b;
  if(k===0){ var tie=ps[0]===ps[1]; q={ask:'비율이 가장 '+(tie?'낮은':'높은')+' 항목은 어느 것일까요?',kind:'mc',opts:t[1].slice(0,5),ans:tie?it[4].nm:it[0].nm,why:'길이가 길거나 넓이가 넓을수록 비율이 높아요.'}; if(ps[3]===ps[4]&&tie){ q.ask='비율이 가장 높은 두 항목 가운데 왼쪽(먼저) 것은 어느 것일까요?'; q.ans=it[0].nm; } q.show=q.ans; }
  else if(k===1){ var pr=[]; it.forEach(function(x,i){ it.forEach(function(y,j){ if(i!==j&&x.p>y.p&&x.p%y.p===0) pr.push([x,y]); }); }); var c=pick(pr); q={ask:c[0].nm+'의 비율은 '+c[1].nm+'의 비율의 몇 배일까요?',kind:'num',unit:'배',ans:c[0].p/c[1].p,show:(c[0].p/c[1].p)+'배',why:c[0].p+' ÷ '+c[1].p+' = '+(c[0].p/c[1].p),hint:'두 항목의 백분율을 나눗셈으로 비교해요.'}; }
  else if(k===2){ a=it[rnd(4)]; q={ask:'조사한 전체가 '+T+'명일 때, '+a.nm+KP(a.nm,'을','를')+' 고른 사람은 몇 명일까요?',kind:'num',unit:'명',ans:a.n,show:a.n+'명',why:T+' × '+F(a.p,100)+' = '+a.n+'(명)',hint:'전체 수에 그 항목의 비율을 곱해요.'}; }
  else { a=it[rnd(2)]; b=it[2+rnd(2)]; q={ask:a.nm+' 또는 '+b.nm+KP(b.nm,'을','를')+' 고른 사람은 전체의 몇 %일까요?',kind:'num',unit:'%',ans:a.p+b.p,show:(a.p+b.p)+'%',why:a.p+' + '+b.p+' = '+(a.p+b.p)+'(%)',hint:'두 항목의 백분율을 더해요.'}; }
  q.lines=[]; q.g={t:t[0],it:it,pie:rnd(2)}; return q; });
function rdDraw(){ if(!quiz.q) quiz.next(); var gq=quiz.q.g; txt(gq.t,W/2,22,INK,18); if(gq.pie) drawPie(gq.it,W/2,H/2+14,Math.min(H/2-50,W*0.3),true,null); else drawBand(gq.it,(W-BWd())/2,H/2-20,BWd(),70,true,null); quiz.draw(); }

/* ───────── 5. 알맞은 그래프 고르기 ───────── */
var GO=['그림그래프','막대그래프','꺾은선그래프','띠그래프 또는 원그래프'];
var PK=[['우리 반 학생들이 좋아하는 계절별 학생 수를','서로 비교하려고 해요.',1,'항목별 수의 크기를 비교할 때는 막대그래프가 알맞아요.'],['하루 동안 교실의 온도가 시간에 따라','어떻게 변하는지 알아보려고 해요.',2,'시간에 따라 변하는 모습은 꺾은선그래프가 알맞아요.'],['전체 학생 수에 대한 혈액형별 학생 수의 비율을','한눈에 비교하려고 해요.',3,'전체에 대한 각 부분의 비율은 띠그래프나 원그래프가 알맞아요.'],
  ['지역별 쌀 생산량을 지도 위에','그림의 크기로 나타내려고 해요.',0,'지역별 수량을 그림의 크기와 수로 나타낼 때는 그림그래프가 알맞아요.'],['내 키가 1학년부터 6학년까지','어떻게 자랐는지 나타내려고 해요.',2,'연도에 따른 변화는 꺾은선그래프가 알맞아요.'],['한 달 용돈을 어디에 얼마만큼의 비율로','썼는지 나타내려고 해요.',3,'전체 용돈에 대한 쓰임새별 비율은 띠그래프나 원그래프가 알맞아요.'],
  ['반별 학급 문고 책의 수를','서로 비교하려고 해요.',1,'반별 수량의 크기를 비교할 때는 막대그래프가 알맞아요.'],['마을별 인구를 사람 그림으로','한눈에 알아보게 나타내려고 해요.',0,'수량을 그림으로 나타내는 그림그래프가 알맞아요.'],['우리 학교 학생들의 등교 방법별 비율을','나타내려고 해요.',3,'전체에 대한 각 방법의 비율은 띠그래프나 원그래프가 알맞아요.'],['월별 강수량이 일 년 동안','어떻게 달라지는지 나타내려고 해요.',2,'달에 따라 변하는 모습은 꺾은선그래프가 알맞아요. 양을 비교하려면 막대그래프도 쓸 수 있어요.']], pkI=-1;
var pkq=QZ(function(){ var i; do{ i=rnd(PK.length); }while(i===pkI); pkI=i; var s=PK[i]; return {lines:[s[0],s[1]],ask:'어떤 그래프로 나타내면 좋을까요?',kind:'mc',opts:GO,ans:GO[s[2]],show:GO[s[2]],why:s[3]}; });

/* ───────── 6. 우리 반 자료로 만들기 ───────── */
var my={t:'우리 반이 좋아하는 급식',r:[['떡볶이',9],['돈가스',7],['비빔밥',4],['카레',3],['기타',2]],k:'band'};
try{ var sv=JSON.parse(localStorage.getItem('graphsMine')||'null'); if(sv&&sv.r&&sv.r.length===5) my=sv; }catch(e){}
function myItems(){ var r=my.r.filter(function(x){ return x[0]&&x[1]>0; }), T=r.reduce(function(a,x){ return a+x[1]; },0); if(!T) return {T:0,it:[]};
  var raw=r.map(function(x){ return x[1]/T*100; }), fl=raw.map(Math.floor), left=100-fl.reduce(function(a,b){ return a+b; },0), ord=raw.map(function(v,i){ return [v-Math.floor(v),i]; }).sort(function(a,b){ return b[0]-a[0]; });
  for(var i=0;i<left;i++) fl[ord[i%ord.length][1]]++; return {T:T,it:r.map(function(x,i){ return {nm:x[0],p:fl[i],n:x[1]}; })}; }
function myDraw(){ var m=myItems(); txt(my.t||'제목',W/2,24,INK,20); if(!m.T){ txt('아래 표에 항목과 수를 써 보세요.',W/2,H/2,MUTED,17); $('say').innerHTML='항목 이름과 수를 쓰면 그래프가 그려져요.'; return; }
  if(my.k==='bar'||my.k==='line'){ drawXY(my.k,m.it.map(function(x){ return x.nm; }),m.it.map(function(x){ return x.n; }),{vals:true,u:'수',top:64}); $('say').innerHTML=m.it.map(function(x){ return x.nm+' '+x.n; }).join(', ')+' (합계 '+m.T+')<small>'+(my.k==='bar'?'막대그래프는 항목별 크기를 비교할 때 알맞아요.':'꺾은선그래프는 시간에 따라 변하는 자료에 알맞아요. 항목을 날짜나 시각 순서로 써 보세요.')+' 쓴 내용은 이 기기에 저장돼요.</small>'; return; }
  if(my.k==='band') drawBand(m.it,(W-BWd())/2,H/2-30,BWd(),80,true,null); else drawPie(m.it,W/2,H/2+16,Math.min(H/2-54,W*0.3),true,null);
  $('say').innerHTML='전체 '+m.T+' 가운데 '+m.it.map(function(x){ return x.nm+' '+x.p+'%'; }).join(', ')+'<small>백분율은 합계가 100%가 되도록 자연수로 어림했어요. 쓴 내용은 이 기기에 저장돼요.</small>'; }
function myUI(){ $('top').innerHTML=chipsH([['band','띠그래프'],['pie','원그래프'],['bar','막대그래프'],['line','꺾은선그래프']],my.k,'k');
  $('ctl').innerHTML='<div class="row"><label>제목</label><input type="text" id="myT" value="'+my.t.replace(/"/g,'&quot;')+'" maxlength="30" style="flex:1;min-width:180px;font:inherit;padding:7px 9px;border:1.5px solid var(--line);border-radius:9px;background:var(--surface);color:var(--ink)"></div><table><thead><tr><th style="white-space:nowrap">항목</th>'+my.r.map(function(x,i){ return '<td><input type="text" data-n="'+i+'" value="'+x[0].replace(/"/g,'&quot;')+'" maxlength="8" style="width:100%;min-width:60px;font:inherit;padding:6px;border:1.5px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);text-align:center"></td>'; }).join('')+'</tr></thead><tbody><tr><th style="white-space:nowrap">수</th>'+my.r.map(function(x,i){ return '<td><input type="number" data-v="'+i+'" value="'+(x[1]||'')+'" min="0" max="9999" style="width:100%;min-width:60px;margin:0;text-align:center"></td>'; }).join('')+'</tr></tbody></table>';
  var save=function(){ try{ localStorage.setItem('graphsMine',JSON.stringify(my)); }catch(e){} draw(); };
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ my.k=b.dataset.k; myUI(); save(); }; });
  $('myT').oninput=function(){ my.t=this.value; save(); };
  $('ctl').querySelectorAll('[data-n]').forEach(function(el){ el.oninput=function(){ my.r[+el.dataset.n][0]=el.value.trim(); save(); }; });
  $('ctl').querySelectorAll('[data-v]').forEach(function(el){ el.oninput=function(){ my.r[+el.dataset.v][1]=Math.max(0,Math.floor(+el.value||0)); save(); }; }); }

var UIS={xy:xyUI,pic:pgUI,band:bdUI,pie:piUI,read:function(){ $('top').innerHTML=''; quiz.ui(); },pick:function(){ $('top').innerHTML=''; pkq.ui(); },mine:myUI}, DRS={xy:xyDraw,pic:pgDraw,band:bdDraw,pie:piDraw,read:rdDraw,pick:pkq.draw,mine:myDraw};
function ui(){ UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; $('hint').textContent=t==='pie'?'직접 그리기에서는 원 둘레의 눈금 근처를 눌러요.':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
