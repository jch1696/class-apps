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
  $('say').innerHTML=!line_?('<b class="r">막대그래프</b>는 막대의 길이로 크기를 비교하기 좋아요. 가장 큰 때는 <b>'+o.x[mxI]+'</b>('+o.v[mxI]+o.u+'), 가장 작은 때는 <b>'+o.x[mnI]+'</b>('+o.v[mnI]+o.u+')예요.<small style="font-size:15.5px;color:var(--ink)">세로 눈금 한 칸은 '+st+o.u+'예요. 그런데 시간에 따라 어떻게 변하는지는 한눈에 보기 어려워요. 꺾은선그래프로 바꿔 보세요.</small>'):
    ([ '가로에는 '+o.xn+KP(o.xn,'을','를')+', 세로에는 '+o.t+KP(o.t,'을','를')+' 나타내요. 세로 눈금 한 칸은 '+st+o.u+'예요.<small>[다음 ▶]을 눌러 꺾은선그래프를 그려 보세요.</small>',
       '가로 눈금과 세로 눈금이 만나는 자리에 <b class="r">점</b>을 찍어요.',
       '점들을 <b class="r">선분</b>으로 차례로 이어요. 수량을 점으로 표시하고 그 점들을 선분으로 이어 그린 그래프를 <b class="r">꺾은선그래프</b>라고 해요.',
       '선이 많이 기울어질수록 변화가 커요. 가장 많이 변한 때는 <b class="r">'+o.x[hl]+'과(와) '+o.x[hl+1]+' 사이</b>로, '+d+o.u+'만큼 '+(up?'늘었어요':'줄었어요')+'.<small style="font-size:15.5px;color:var(--ink)">꺾은선그래프는 시간에 따라 변하는 모습을 알아보기 쉽고, 조사하지 않은 중간의 값도 예상할 수 있어요.'+(xw?' 필요 없는 부분을 <b>물결선</b>으로 줄였더니 세로 눈금 한 칸이 '+st+o.u+J('','','')+'(으)로 작아져 변화가 더 뚜렷하게 보여요.':(canWave?' [물결선으로 줄이기]를 눌러 보세요.':''))+'</small>'][xs]); }
function xyUI(){ $('top').innerHTML=chipsH(XD.map(function(x,i){ return [i,x.t]; }),xi,'i');
  $('ctl').innerHTML=chipsH([['bar','막대그래프'],['line','꺾은선그래프']],xk,'k','margin-top:8px')+(xk==='line'?'<div class="row"><button class="btn" id="xPrev">◀ 이전</button><button class="btn primary" id="xNext">다음 ▶</button><button class="chip" id="xWave" aria-pressed="'+xw+'">물결선으로 줄이기</button></div>':'');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ xi=+b.dataset.i; xw=false; xyUI(); draw(); }; });
  $('ctl').querySelectorAll('[data-k]').forEach(function(b){ b.onclick=function(){ xk=b.dataset.k; if(xk==='line') xs=0; xyUI(); draw(); }; });
  if(xk==='line'){ $('xPrev').onclick=function(){ xs=Math.max(0,xs-1); draw(); }; $('xNext').onclick=function(){ xs=Math.min(3,xs+1); draw(); }; $('xWave').onclick=function(){ xw=!xw; this.setAttribute('aria-pressed',xw); draw(); }; } }

