/* 다각형의 둘레와 넓이 (5학년 1학기). 모눈 좌표(cm) → 화면 */
var GW=16, GH=8, U=40, OX=0, OY=0, X0=2, Y0=1;
function lay(){ U=Math.min((W-20)/GW,(H-20)/GH); OX=(W-GW*U)/2; OY=H-(H-GH*U)/2; }
function X(x){ return OX+x*U; } function Y(y){ return OY-y*U; }
function grid(){ g.strokeStyle=LINE; g.lineWidth=1; g.setLineDash([]); g.beginPath(); for(var i=0;i<=GW;i++){ g.moveTo(X(i),Y(0)); g.lineTo(X(i),Y(GH)); } for(var j=0;j<=GH;j++){ g.moveTo(X(0),Y(j)); g.lineTo(X(GW),Y(j)); } g.stroke(); }
function poly(pts,fill,stroke,lw,dash){ g.beginPath(); pts.forEach(function(p,i){ if(i) g.lineTo(X(p[0]),Y(p[1])); else g.moveTo(X(p[0]),Y(p[1])); }); g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=lw||2.4; g.lineJoin='round'; g.setLineDash(dash||[]); g.stroke(); g.setLineDash([]); } }
function seg(a,b,col,lw,dash){ g.beginPath(); g.moveTo(X(a[0]),Y(a[1])); g.lineTo(X(b[0]),Y(b[1])); g.strokeStyle=col||INK; g.lineWidth=lw||2; g.setLineDash(dash||[]); g.lineCap='round'; g.stroke(); g.setLineDash([]); }
function label(t,x,y,col,dx,dy,sz){ g.font=(sz||16)+'px Jua,"Malgun Gothic",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.lineWidth=5; g.lineJoin='round'; g.strokeStyle=HALO; var px=X(x)+(dx||0), py=Y(y)+(dy||0); g.strokeText(t,px,py); g.fillStyle=col||INK; g.fillText(t,px,py); }
function rightMark(x,y,sx,sy){ var k=0.28; g.beginPath(); g.moveTo(X(x+sx*k),Y(y)); g.lineTo(X(x+sx*k),Y(y+sy*k)); g.lineTo(X(x),Y(y+sy*k)); g.strokeStyle=HOT; g.lineWidth=1.6; g.stroke(); }
function fmt(n){ return (Math.round(n*10)/10)+''; }
function rotP(p,m,th){ var c=Math.cos(th), s=Math.sin(th), x=p[0]-m[0], y=p[1]-m[1]; return [m[0]+x*c-y*s,m[1]+x*s+y*c]; }
function mid(a,b){ return [(a[0]+b[0])/2,(a[1]+b[1])/2]; }
var FB=function(a){ return rgba(BLUE,a==null?0.75:a); }, FO=function(a){ return rgba(ORANGE,a==null?0.75:a); };
function sl(id,lab,min,max,val,step){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'" value="'+val+'"><output>'+val+'cm</output></div>'; }
function slBind(id,fn){ $(id).oninput=function(){ this.nextElementSibling.textContent=this.value+'cm'; fn(+this.value); draw(); }; }
var anT=null;
function anStop(){ if(anT){ cancelAnimationFrame(anT); anT=null; } }
function anim(get,set,to,dur,done){ anStop(); var from=get(), t0=performance.now(); (function step(now){ var k=Math.min(1,(now-t0)/(dur||1500)), e=k*k*(3-2*k); set(from+(to-from)*e); if(k<1){ anT=requestAnimationFrame(step); draw(); } else { anT=null; if(done) done(); draw(); } })(t0); }

/* 도형 그리기 (t: 0~1 움직임) */
function dRect(w,h,n){ var k; for(k=0;k<n;k++){ var c=k%w, r=Math.floor(k/w); poly([[X0+c,Y0+r],[X0+c+1,Y0+r],[X0+c+1,Y0+r+1],[X0+c,Y0+r+1]],FB(0.6),INK,1); }
  poly([[X0,Y0],[X0+w,Y0],[X0+w,Y0+h],[X0,Y0+h]],n?null:FB(0.25),INK,2.6); label('가로 '+w+'cm',X0+w/2,Y0,INK,0,15); label('세로 '+h+'cm',X0,Y0+h/2,INK,-36,0); if(n>0&&n<w*h){ var c2=(n-1)%w, r2=Math.floor((n-1)/w); label(n+'',X0+c2+0.5,Y0+r2+0.5,HOT); } }
function dPara(b,h,s,t){ s=Math.min(s,b); var d=b*t;
  poly([[X0+s,Y0],[X0+b,Y0],[X0+b+s,Y0+h],[X0+s,Y0+h]],FB(),INK,2.4);
  if(s>0) poly([[X0+d,Y0],[X0+s+d,Y0],[X0+s+d,Y0+h]],FO(),INK,2.4); else seg([X0,Y0],[X0,Y0+h],INK,2.4);
  seg([X0+s,Y0],[X0+s,Y0+h],HOT,2.4,[6,5]); rightMark(X0+s,Y0,1,1);
  label('밑변 '+b+'cm',X0+(t>0.5?s:0)+b/2,Y0,INK,0,15); label('높이 '+h+'cm',X0+s,Y0+h/2,HOT,38,0); }
function dTri(b,h,p,t){ var Pa=[X0,Y0], Pb=[X0+b,Y0], Pc=[X0+p,Y0+h], M=mid(Pb,Pc);
  if(t>0) poly([Pa,Pb,Pc].map(function(q){ return rotP(q,M,Math.PI*t); }),FO(0.7),INK,2.4);
  poly([Pa,Pb,Pc],FB(),INK,2.4); seg(Pc,[X0+p,Y0],HOT,2.4,[6,5]); if(p>0&&p<b) rightMark(X0+p,Y0,1,1);
  label('밑변 '+b+'cm',X0+b/2,Y0,INK,0,15); label('높이 '+h+'cm',X0+p,Y0+h/2,HOT,(p<=b/2?1:-1)*38,0); }
function dTrap(a,b,h,t){ var o=1, P=[[X0,Y0],[X0+b,Y0],[X0+o+a,Y0+h],[X0+o,Y0+h]], M=mid(P[1],P[2]);
  if(t>0) poly(P.map(function(q){ return rotP(q,M,Math.PI*t); }),FO(0.7),INK,2.4);
  poly(P,FB(),INK,2.4); seg([X0+o,Y0+h],[X0+o,Y0],HOT,2.4,[6,5]); rightMark(X0+o,Y0,1,1);
  label('아랫변 '+b+'cm',X0+b/2,Y0,INK,0,15); label('윗변 '+a+'cm',X0+o+a/2,Y0+h,INK,0,-14); label('높이 '+h+'cm',X0+o,Y0+h/2,HOT,38,0);
  if(t>0.97){ label(a+'cm',X0+b+a/2,Y0,INK,0,15); label(b+'cm',X0+o+a+b/2,Y0+h,INK,0,-14); } }
function dRhom(d1,d2,t){ var cx=8, cy=4, a=d1/2, b=d2/2, P=[[cx-a,cy],[cx,cy-b],[cx+a,cy],[cx,cy+b]];
  if(t>0){ [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(function(s){ poly([[cx+s[0]*a,cy+s[1]*b],[cx+s[0]*a,cy],[cx,cy+s[1]*b]],FO(0.55*t)); }); g.globalAlpha=t; poly([[cx-a,cy-b],[cx+a,cy-b],[cx+a,cy+b],[cx-a,cy+b]],null,INK,2,[7,5]); g.globalAlpha=1; }
  poly(P,FB(),INK,2.4); seg(P[0],P[2],HOT,2.2,[6,5]); seg(P[1],P[3],ACC,2.2,[6,5]);
  label('대각선 '+d1+'cm',cx,cy,HOT,0,-13,15); label('대각선 '+d2+'cm',cx,cy-b/2,ACC,50,8,15); }

/* ───────── 1. 직사각형 ───────── */
var rw=5, rh=3, rn=0, rT=null;
function rStop(){ if(rT){ clearInterval(rT); rT=null; } }
function rectDraw(){ grid(); rn=Math.min(rn,rw*rh); dRect(rw,rh,rn); var sq=rw===rh, P=(rw+rh)*2, V=rw*rh, nm=sq?'정사각형':'직사각형';
  var per=sq?('정사각형의 둘레 = 한 변의 길이 × 4 = '+rw+' × 4 = '+P+'(cm)'):('직사각형의 둘레 = (가로 + 세로) × 2 = ('+rw+' + '+rh+') × 2 = '+P+'(cm)');
  $('say').innerHTML=rn===0?(nm+'의 둘레는 <b class="r">'+P+'cm</b>예요. 넓이는 얼마일까요?<small style="font-size:15.5px;color:var(--ink)">'+per+'</small><small>한 변의 길이가 1cm인 정사각형의 넓이를 1㎠(1 제곱센티미터)라고 해요. ▶ 1㎠씩 세기를 눌러 보세요.</small>'):
    (rn<V?('1㎠가 <b class="r">'+rn+'개</b>'):('1㎠가 한 줄에 '+rw+'개씩 '+rh+'줄이므로 '+rw+' × '+rh+' = '+V+'개예요. 넓이는 <b class="r">'+V+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">'+(sq?'정사각형의 넓이 = 한 변의 길이 × 한 변의 길이 = ':'직사각형의 넓이 = 가로 × 세로 = ')+rw+' × '+rh+' = '+V+'(㎠)</small><small>'+per+'</small>')); }
function rectUI(){ $('ctl').innerHTML='<div class="dims">'+sl('rW','가로',1,14,rw)+sl('rH','세로',1,6,rh)+'</div><div class="row"><button class="btn primary" id="rGo">▶ 1㎠씩 세기</button><button class="btn" id="rAll">모두 채우기</button><button class="btn" id="rClr">지우기</button></div>';
  slBind('rW',function(v){ rStop(); rw=v; rn=0; }); slBind('rH',function(v){ rStop(); rh=v; rn=0; });
  $('rGo').onclick=function(){ rStop(); if(rn>=rw*rh) rn=0; rT=setInterval(function(){ rn++; if(rn>=rw*rh) rStop(); draw(); },Math.max(40,3200/(rw*rh))); };
  $('rAll').onclick=function(){ rStop(); rn=rw*rh; draw(); }; $('rClr').onclick=function(){ rStop(); rn=0; draw(); }; }

/* ───────── 2. 평행사변형 ───────── */
var pb=6, ph=3, ps=2, pt=0;
function paraDraw(){ grid(); dPara(pb,ph,ps,pt); var V=pb*ph, b=$('pGo'); if(b&&!anT) b.textContent=pt>0.5?'◀ 되돌리기':'▶ 잘라서 옮기기';
  $('say').innerHTML=pt<0.99?('평행사변형의 넓이는 어떻게 구할까요?<small>평행한 두 변을 <b>밑변</b>, 두 밑변 사이의 거리를 <b>높이</b>라고 해요. 주황색 삼각형을 잘라서 반대쪽으로 옮겨 보세요.</small>'):
    ('삼각형을 잘라 옮기면 가로 '+pb+'cm, 세로 '+ph+'cm인 직사각형이 돼요. 넓이는 <b class="r">'+V+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">평행사변형의 넓이 = 밑변의 길이 × 높이 = '+pb+' × '+ph+' = '+V+'(㎠)</small><small>기울기를 바꿔도 밑변의 길이와 높이가 같으면 넓이는 같아요.</small>'); }
function paraUI(){ $('ctl').innerHTML='<div class="dims">'+sl('pB','밑변',2,8,pb)+sl('pH','높이',1,6,ph)+sl('pS','기울기',0,4,ps)+'</div><div class="row"><button class="btn primary" id="pGo">▶ 잘라서 옮기기</button></div>';
  slBind('pB',function(v){ anStop(); pb=v; }); slBind('pH',function(v){ anStop(); ph=v; }); slBind('pS',function(v){ anStop(); ps=v; }); $('pS').nextElementSibling.textContent='';
  $('pS').addEventListener('input',function(){ this.nextElementSibling.textContent=''; });
  $('pGo').onclick=function(){ anim(function(){ return pt; },function(v){ pt=v; },pt>0.5?0:1); }; }

/* ───────── 3. 삼각형 ───────── */
var tb=6, th=4, tp=2, tt=0;
function triDraw(){ grid(); tp=Math.min(tp,tb); dTri(tb,th,tp,tt); var V=tb*th/2, b=$('tGo'); if(b&&!anT) b.textContent=tt>0.5?'◀ 되돌리기':'▶ 똑같은 삼각형 붙이기';
  $('say').innerHTML=tt<0.99?('삼각형의 넓이는 어떻게 구할까요?<small>삼각형의 한 변을 <b>밑변</b>, 밑변과 마주 보는 꼭짓점에서 밑변에 수직으로 그은 선분의 길이를 <b>높이</b>라고 해요. 똑같은 삼각형을 하나 더 붙여 보세요.</small>'):
    ('합동인 삼각형 2개를 붙이면 평행사변형이 돼요. 삼각형의 넓이는 그 반인 <b class="r">'+fmt(V)+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">삼각형의 넓이 = 밑변의 길이 × 높이 ÷ 2 = '+tb+' × '+th+' ÷ 2 = '+fmt(V)+'(㎠)</small><small>꼭짓점을 옆으로 옮겨도 밑변의 길이와 높이가 같으면 넓이는 같아요.</small>'); }
function triUI(){ $('ctl').innerHTML='<div class="dims">'+sl('tB','밑변',2,7,tb)+sl('tH','높이',1,6,th)+sl('tP','꼭짓점',0,7,tp)+'</div><div class="row"><button class="btn primary" id="tGo">▶ 똑같은 삼각형 붙이기</button></div>';
  slBind('tB',function(v){ anStop(); tb=v; }); slBind('tH',function(v){ anStop(); th=v; }); slBind('tP',function(v){ anStop(); tp=v; }); $('tP').nextElementSibling.textContent='';
  $('tP').addEventListener('input',function(){ this.nextElementSibling.textContent=''; });
  $('tGo').onclick=function(){ anim(function(){ return tt; },function(v){ tt=v; },tt>0.5?0:1); }; }

/* ───────── 4. 사다리꼴 ───────── */
var za=3, zb=6, zh=3, zt=0;
function trapDraw(){ grid(); dTrap(za,zb,zh,zt); var V=(za+zb)*zh/2, b=$('zGo'); if(b&&!anT) b.textContent=zt>0.5?'◀ 되돌리기':'▶ 똑같은 사다리꼴 붙이기';
  $('say').innerHTML=zt<0.99?('사다리꼴의 넓이는 어떻게 구할까요?<small>평행한 두 변을 <b>밑변</b>이라 하고, 위치에 따라 <b>윗변</b>, <b>아랫변</b>이라고 해요. 두 밑변 사이의 거리가 <b>높이</b>예요. 똑같은 사다리꼴을 하나 더 붙여 보세요.</small>'):
    ('합동인 사다리꼴 2개를 붙이면 밑변이 ('+za+' + '+zb+')cm, 높이가 '+zh+'cm인 평행사변형이 돼요. 사다리꼴의 넓이는 그 반인 <b class="r">'+fmt(V)+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">사다리꼴의 넓이 = (윗변의 길이 + 아랫변의 길이) × 높이 ÷ 2 = ('+za+' + '+zb+') × '+zh+' ÷ 2 = '+fmt(V)+'(㎠)</small>'); }
function trapUI(){ $('ctl').innerHTML='<div class="dims">'+sl('zA','윗변',1,5,za)+sl('zB','아랫변',2,7,zb)+sl('zH','높이',1,6,zh)+'</div><div class="row"><button class="btn primary" id="zGo">▶ 똑같은 사다리꼴 붙이기</button></div>';
  slBind('zA',function(v){ anStop(); za=v; }); slBind('zB',function(v){ anStop(); zb=v; }); slBind('zH',function(v){ anStop(); zh=v; });
  $('zGo').onclick=function(){ anim(function(){ return zt; },function(v){ zt=v; },zt>0.5?0:1); }; }

/* ───────── 5. 마름모 ───────── */
var m1=8, m2=4, mt=0;
function rhomDraw(){ grid(); dRhom(m1,m2,mt); var V=m1*m2/2, b=$('mGo'); if(b&&!anT) b.textContent=mt>0.5?'◀ 되돌리기':'▶ 직사각형으로 둘러싸기';
  $('say').innerHTML=mt<0.99?('마름모의 넓이는 어떻게 구할까요?<small>마름모의 두 대각선은 서로 수직으로 만나고 서로를 똑같이 둘로 나누어요. 마름모를 직사각형으로 둘러싸 보세요.</small>'):
    ('둘러싼 직사각형은 가로 '+m1+'cm, 세로 '+m2+'cm예요. 주황색 삼각형 4개를 모으면 마름모와 넓이가 같으므로, 마름모의 넓이는 직사각형의 반인 <b class="r">'+fmt(V)+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">마름모의 넓이 = 한 대각선의 길이 × 다른 대각선의 길이 ÷ 2 = '+m1+' × '+m2+' ÷ 2 = '+fmt(V)+'(㎠)</small>'); }
function rhomUI(){ $('ctl').innerHTML='<div class="dims">'+sl('mA','가로 대각선',2,12,m1,2)+sl('mB','세로 대각선',2,6,m2,2)+'</div><div class="row"><button class="btn primary" id="mGo">▶ 직사각형으로 둘러싸기</button></div>';
  slBind('mA',function(v){ anStop(); m1=v; }); slBind('mB',function(v){ anStop(); m2=v; });
  $('mGo').onclick=function(){ anim(function(){ return mt; },function(v){ mt=v; },mt>0.5?0:1,900); }; }

/* ───────── 6. 문제 풀기 ───────── */
var qz=null, qzScore=[0,0];
function qzNew(){ var t=['rect','rectP','para','tri','trap','rhom','unit','unit'][rnd(8)], q={t:t,done:false,tries:0};
  if(t==='rect'||t==='rectP'){ q.w=2+rnd(10); q.h=2+rnd(5); q.ans=t==='rect'?q.w*q.h:(q.w+q.h)*2; q.ask=t==='rect'?'넓이':'둘레'; q.unit=t==='rect'?'㎠':'cm'; q.nm=q.w===q.h?'정사각형':'직사각형';
    q.why=t==='rect'?('가로 × 세로 = '+q.w+' × '+q.h+' = '+q.ans+'(㎠)'):('(가로 + 세로) × 2 = ('+q.w+' + '+q.h+') × 2 = '+q.ans+'(cm)'); }
  else if(t==='para'){ q.b=3+rnd(6); q.h=2+rnd(5); q.s=1+rnd(3); q.ans=q.b*q.h; q.nm='평행사변형'; q.why='밑변의 길이 × 높이 = '+q.b+' × '+q.h+' = '+q.ans+'(㎠)'; }
  else if(t==='tri'){ q.b=3+rnd(5); q.h=2+rnd(5); q.p=rnd(q.b+1); q.ans=q.b*q.h/2; q.nm='삼각형'; q.why='밑변의 길이 × 높이 ÷ 2 = '+q.b+' × '+q.h+' ÷ 2 = '+fmt(q.ans)+'(㎠)'; }
  else if(t==='trap'){ q.a=1+rnd(4); q.b=q.a+1+rnd(3); q.h=2+rnd(5); q.ans=(q.a+q.b)*q.h/2; q.nm='사다리꼴'; q.why='(윗변 + 아랫변) × 높이 ÷ 2 = ('+q.a+' + '+q.b+') × '+q.h+' ÷ 2 = '+fmt(q.ans)+'(㎠)'; }
  else if(t==='unit'){ var ua=2+rnd(8), us=rnd(5), ub=2+rnd(5); q.ask='□'; q.nm='넓이 단위'; q.hint='1㎡ = 10000㎠, 1㎢ = 1000000㎡';
    if(us===0){ q.L=ua+'㎡ = □㎠'; q.ans=ua*10000; q.unit='㎠'; q.why='1㎡ = 10000㎠이므로 0을 4개 붙이면 '+ua+'㎡ = '+q.ans+'㎠'; }
    else if(us===1){ q.L=ua*10000+'㎠ = □㎡'; q.ans=ua; q.unit='㎡'; q.why='10000㎠ = 1㎡이므로 0을 4개 떼면 '+ua*10000+'㎠ = '+ua+'㎡'; }
    else if(us===2){ q.L=ua+'㎢ = □㎡'; q.ans=ua*1000000; q.unit='㎡'; q.why='1㎢ = 1000000㎡이므로 0을 6개 붙이면 '+ua+'㎢ = '+q.ans+'㎡'; }
    else if(us===3){ q.L=ua*1000000+'㎡ = □㎢'; q.ans=ua; q.unit='㎢'; q.why='1000000㎡ = 1㎢이므로 0을 6개 떼면 '+ua*1000000+'㎡ = '+ua+'㎢'; }
    else { q.L='가로 '+ua*100+'cm, 세로 '+ub*100+'cm'; q.L2='이 직사각형의 넓이는 몇 ㎡일까요?'; q.ask='넓이'; q.ans=ua*ub; q.unit='㎡'; q.hint='먼저 cm를 m로 바꾸어요. 100cm = 1m'; q.why=ua*100+'cm = '+ua+'m, '+ub*100+'cm = '+ub+'m이므로 '+ua+' × '+ub+' = '+q.ans+'(㎡)'; } }
  else { q.d1=2*(2+rnd(5)); q.d2=2*(1+rnd(3)); q.ans=q.d1*q.d2/2; q.nm='마름모'; q.why='한 대각선 × 다른 대각선 ÷ 2 = '+q.d1+' × '+q.d2+' ÷ 2 = '+fmt(q.ans)+'(㎠)'; }
  if(!q.ask){ q.ask='넓이'; q.unit='㎠'; } qz=q; }
function quizDraw(){ if(!qz) qzNew(); var q=qz;
  if(q.t==='unit'){ var us=Math.min(36,W/11), ut=q.done?q.L.replace('□',''+q.ans):q.L, uf=function(){ g.font=us+'px Jua,"Malgun Gothic",sans-serif'; }; uf(); while(g.measureText(ut).width>W-30&&us>14){ us--; uf(); }
    utxt(ut,W/2,H*0.4,INK,us); if(q.L2) utxt(q.done?'넓이 = '+q.ans+'㎡':q.L2,W/2,H*0.4+us*1.8,q.done?HOT:MUTED,Math.max(15,us*0.8));
    $('say').innerHTML=q.done?('<b class="r">정답이에요!</b> 답: '+q.ans+q.unit+'<small style="font-size:15.5px;color:var(--ink)">'+q.why+'</small>'):
      ((q.L2?'넓이를 ㎡ 단위로 구해 보세요.':'□ 안에 알맞은 수를 써 보세요.')+(q.tries>=2?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+q.hint+'</small>':'<small>넓이 단위 사이의 관계를 떠올려 보세요.</small>')); return; }
  if(q.t==='rect'||q.t==='rectP') dRect(q.w,q.h,0); else if(q.t==='para') dPara(q.b,q.h,q.s,0); else if(q.t==='tri') dTri(q.b,q.h,q.p,0); else if(q.t==='trap') dTrap(q.a,q.b,q.h,0); else dRhom(q.d1,q.d2,0);
  $('say').innerHTML=q.done?('<b class="r">정답이에요!</b> '+q.nm+'의 '+q.ask+'는 '+fmt(q.ans)+q.unit+'예요.<small style="font-size:15.5px;color:var(--ink)">'+q.why+'</small>'):
    (q.nm+'의 <b class="r">'+q.ask+'</b>'+(q.ask==='둘레'?'는 몇 cm일까요?':'는 몇 ㎠일까요?')+(q.tries>=2?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+q.why.split(' = ')[0]+'</small>':'<small>모눈이 없으니 길이를 보고 계산해 보세요.</small>')); }
function quizUI(msg,cls){ if(!qz) qzNew(); $('ctl').innerHTML='<div class="row" style="margin-top:8px;font-size:17px"><span>'+qz.ask+' = <input type="number" id="qIn" inputmode="decimal" step="0.5"> '+qz.unit+'</span>'+(qz.done?'':'<button class="btn primary" id="qGo">확인하기</button>')+'<button class="btn'+(qz.done?' primary':'')+'" id="qNext">'+(qz.done?'다음 문제 ▶':'건너뛰기')+'</button><span class="score">맞힌 문제 '+qzScore[0]+' / '+qzScore[1]+'</span></div><p class="msg '+(cls||'')+'" id="qMsg">'+(msg||'')+'</p>';
  if(qz.done){ $('qIn').value=qz.t==='unit'?qz.ans:fmt(qz.ans); $('qIn').className='ok'; $('qIn').disabled=true; }
  else { $('qGo').onclick=function(){ var el=$('qIn'), m=$('qMsg'); if(el.value===''){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
      if(Math.abs(+el.value-qz.ans)<1e-6){ if(qz.tries===0) qzScore[0]++; qzScore[1]++; qz.done=true; quizUI(); draw(); }
      else { qz.tries++; el.className='bad'; m.className='msg bad'; m.textContent='다시 계산해 보세요.'; draw(); } };
    $('qIn').onkeydown=function(e){ if(e.key==='Enter') $('qGo').click(); }; }
  $('qNext').onclick=function(){ if(!qz.done) qzScore[1]++; qzNew(); quizUI(); draw(); }; }

/* ───────── 넓이 단위 ───────── */
var uM='m', uW=3, uH=2, uU='m';
function utxt(t,x,y,col,sz,al){ g.font=(sz||16)+'px Jua,"Malgun Gothic",sans-serif'; g.textAlign=al||'center'; g.textBaseline='middle'; g.lineWidth=5; g.lineJoin='round'; g.strokeStyle=HALO; g.strokeText(t,x,y); g.fillStyle=col||INK; g.fillText(t,x,y); }
function uln(x1,y1,x2,y2,col,lw){ g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.strokeStyle=col; g.lineWidth=lw; g.setLineDash([]); g.stroke(); }
var SMU='<small style="font-size:15.5px;color:var(--ink)">';
function unitDraw(){ var i, j;
  if(uM==='conv'){ var km=uU==='km', bu=km?'km':'m', su=km?'m':'cm', k=km?1000:100, A=km?'㎢':'㎡', a=km?'㎡':'㎠', c=Math.min((W-130)/uW,(H-76)/uH,74), x0=(W-c*uW)/2+22, y0=(H-30-c*uH)/2;
    for(i=0;i<uW;i++) for(j=0;j<uH;j++){ g.fillStyle=rgba(BLUE,0.3); g.fillRect(x0+i*c,y0+j*c,c,c); g.strokeStyle=INK; g.lineWidth=1.2; g.strokeRect(x0+i*c,y0+j*c,c,c); if(c>=38) utxt('1'+A,x0+i*c+c/2,y0+j*c+c/2,MUTED,Math.min(15,c/4)); }
    g.strokeStyle=INK; g.lineWidth=2.6; g.strokeRect(x0,y0,c*uW,c*uH);
    utxt('가로 '+uW+bu+' = '+uW*k+su,x0+c*uW/2,y0+c*uH+18,INK,15); utxt('세로 '+uH+bu,x0-10,y0+c*uH/2-10,INK,15,'right'); utxt('= '+uH*k+su,x0-10,y0+c*uH/2+10,INK,15,'right');
    var V=uW*uH, z=km?'000000':'0000';
    $('say').innerHTML='<b class="r">'+V+A+' = '+V+z+a+'</b>'+SMU+bu+'로 구하면 '+uW+' × '+uH+' = '+V+'('+A+')이에요. '+su+'로 바꾸어 구하면 '+uW*k+' × '+uH*k+' = '+V+z+'('+a+')이에요.<br>1'+A+' = 1'+z+a+'이므로 '+A+'를 '+a+'로 바꿀 때는 0을 '+(km?'6':'4')+'개 붙이고, 거꾸로 바꿀 때는 0을 '+(km?'6':'4')+'개 떼요.</small>'; return; }
  var K=uM==='km', S=Math.min(H-58,W-120), X0=(W-S)/2+18, Y0=10, c10=S/10;
  g.fillStyle=rgba(BLUE,0.2); g.fillRect(X0,Y0,S,S);
  if(S>=240) for(i=1;i<100;i++) if(i%10){ uln(X0+i*S/100,Y0,X0+i*S/100,Y0+S,LINE,0.5); uln(X0,Y0+i*S/100,X0+S,Y0+i*S/100,LINE,0.5); }
  for(i=1;i<10;i++){ uln(X0+i*c10,Y0,X0+i*c10,Y0+S,MUTED,1); uln(X0,Y0+i*c10,X0+S,Y0+i*c10,MUTED,1); }
  var th=Math.max(4,S/100); g.fillStyle=rgba(ORANGE,0.75); g.fillRect(X0,Y0+S-th,S,th); g.fillRect(X0,Y0,th,S); g.fillStyle=HOT; g.fillRect(X0,Y0+S-th,th,th);
  g.strokeStyle=INK; g.lineWidth=2.6; g.strokeRect(X0,Y0,S,S);
  utxt(K?'1㎢':'1㎡',X0+S/2,Y0+S/2,INK,Math.min(44,S/6));
  utxt(K?'1km = 1000m':'1m = 100cm',X0+S/2,Y0+S+20,INK,16); utxt(K?'1km':'1m',X0-10,Y0+S/2-10,INK,16,'right'); utxt(K?'= 1000m':'= 100cm',X0-10,Y0+S/2+11,INK,14,'right');
  uln(X0+th/2,Y0+S-th/2,X0+c10*1.6,Y0+S-c10*1.6,HOT,1.5); utxt(K?'1㎡':'1㎠',X0+c10*2.1,Y0+S-c10*2,HOT,15);
  $('say').innerHTML=K?('한 변의 길이가 1km인 정사각형의 넓이를 <b class="r">1㎢</b>라 쓰고 <b>1 제곱킬로미터</b>라고 읽어요.'+SMU+'1km = 1000m이므로 1㎢ 안에는 1㎡가 한 줄에 1000개씩 1000줄 들어가요. 1000 × 1000 = 1000000이므로 <b class="r">1㎢ = 1000000㎡</b>예요.<br>도시나 나라처럼 아주 넓은 곳의 넓이를 나타낼 때 써요. 그림의 작은 칸 하나는 한 변이 100m예요.</small>'):
    ('한 변의 길이가 1m인 정사각형의 넓이를 <b class="r">1㎡</b>라 쓰고 <b>1 제곱미터</b>라고 읽어요.'+SMU+'1m = 100cm이므로 1㎡ 안에는 1㎠가 한 줄에 100개씩 100줄 들어가요. 100 × 100 = 10000이므로 <b class="r">1㎡ = 10000㎠</b>예요.<br>교실이나 방처럼 넓은 곳의 넓이를 나타낼 때 써요. 그림의 작은 칸 하나는 한 변이 10cm예요.</small>'); }
function unitUI(){ $('top').innerHTML='<div class="chips">'+[['m','1㎡와 1㎠'],['km','1㎢와 1㎡'],['conv','단위 바꾸기']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===uM)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ uM=b.dataset.k; ui(); draw(); }; });
  if(uM!=='conv'){ $('ctl').innerHTML=''; return; }
  var r=function(id,lab,max,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="1" max="'+max+'" value="'+val+'"><output>'+val+uU+'</output></div>'; };
  $('ctl').innerHTML='<div class="chips" style="margin-top:8px">'+[['m','㎡ ↔ ㎠'],['km','㎢ ↔ ㎡']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===uU)+'" data-u="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div><div class="dims">'+r('uW','가로',8,uW)+r('uH','세로',5,uH)+'</div>';
  $('ctl').querySelectorAll('[data-u]').forEach(function(b){ b.onclick=function(){ uU=b.dataset.u; ui(); draw(); }; });
  $('uW').oninput=function(){ uW=+this.value; this.nextElementSibling.textContent=uW+uU; draw(); }; $('uH').oninput=function(){ uH=+this.value; this.nextElementSibling.textContent=uH+uU; draw(); }; }

function ui(){ $('top').innerHTML=''; ({rect:rectUI,para:paraUI,tri:triUI,trap:trapUI,rhom:rhomUI,unit:unitUI,quiz:quizUI})[tab](); }
function draw(){ tone(); lay(); g.clearRect(0,0,W,H); ({rect:rectDraw,para:paraDraw,tri:triDraw,trap:trapDraw,rhom:rhomDraw,unit:unitDraw,quiz:quizDraw})[tab](); }
function setTab(t){ anStop(); rStop(); tab=t; $('hint').style.visibility=(t==='quiz'||t==='unit')?'hidden':'visible'; if(t==='quiz'&&qz&&qz.t==='unit'){ } document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
