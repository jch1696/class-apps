/* 합동과 대칭 (5학년 2학기) */
var CX=8, CY=4, JA='ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ', PAL=['#D9482B','#1E8E5A','#2F6FDB','#B7791F','#8E44AD','#0E8C8C','#C2410C','#4D7C0F'];
function dot(p,col,r){ g.beginPath(); g.arc(X(p[0]),Y(p[1]),r||6,0,7); g.fillStyle=col||HOT; g.fill(); g.strokeStyle=HALO; g.lineWidth=2; g.stroke(); }
function cenP(ps){ var c=[0,0]; ps.forEach(function(p){ c[0]+=p[0]/ps.length; c[1]+=p[1]/ps.length; }); return c; }
function reg(n,r,deg){ var o=[]; for(var i=0;i<n;i++){ var a=(deg+360*i/n)*Math.PI/180; o.push([r*Math.cos(a),r*Math.sin(a)]); } return o; }
function at(ps){ return ps.map(function(p){ return [CX+p[0],CY+p[1]]; }); }
function chips(arr,cur,attr){ return '<div class="chips">'+arr.map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===cur)+'" data-'+attr+'="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>'; }

/* ───────── 1. 합동 ───────── */
var CG=[[[0,0],[4,0],[1,3]],[[0,0],[4,0],[5,2],[1,3]],[[0,0],[5,0],[2,2]],[[0,0],[3,0],[3,2],[1,4]],[[0,0],[3,0],[4,2],[2,4],[0,2]]], cg={i:0,th:2.1,fl:false,t:0}, cgHi='';
function cgPts(){ var p=CG[cg.i], c=cenP(p), A=p.map(function(q){ return [4+q[0]-c[0],4+q[1]-c[1]]; }), t=cg.t, th=cg.th*(1-t), f=cg.fl?-Math.cos(Math.PI*t):1, m=[11.5+(4-11.5)*t,4];
  var B=p.map(function(q){ var x=(q[0]-c[0])*f, y=q[1]-c[1]; return [m[0]+x*Math.cos(th)-y*Math.sin(th),m[1]+x*Math.sin(th)+y*Math.cos(th)]; }); return {A:A,B:B}; }
function wedge(ps,i,col){ var n=ps.length, v=ps[i], a=ps[(i+n-1)%n], b=ps[(i+1)%n], vx=X(v[0]), vy=Y(v[1]), a1=Math.atan2(Y(a[1])-vy,X(a[0])-vx), a2=Math.atan2(Y(b[1])-vy,X(b[0])-vx), d=a2-a1; while(d>Math.PI) d-=2*Math.PI; while(d<-Math.PI) d+=2*Math.PI;
  g.beginPath(); g.moveTo(vx,vy); g.arc(vx,vy,U*0.6,a1,a1+d,d<0); g.closePath(); g.fillStyle=col; g.globalAlpha=0.75; g.fill(); g.globalAlpha=1; }
function cgDraw(){ grid(); var P=cgPts(), n=P.A.length, nmA=JA.slice(0,n), nmB=JA.slice(n,2*n), b=$('cgGo'); if(b&&!anT) b.textContent=cg.t>0.5?'◀ 되돌리기':'▶ 포개어 보기';
  poly(P.A,FB(0.7),INK,2.4); poly(P.B,FO(0.6),INK,2.4);
  [P.A,P.B].forEach(function(ps,s){ var c=cenP(ps);
    if(cgHi==='ang') ps.forEach(function(v,i){ wedge(ps,i,PAL[i]); });
    if(cgHi==='side') ps.forEach(function(v,i){ seg(v,ps[(i+1)%n],PAL[i],5); });
    ps.forEach(function(v,i){ var dx=v[0]-c[0], dy=v[1]-c[1], l=Math.hypot(dx,dy)||1; if(cgHi==='pt') dot(v,PAL[i],7); if(!(s===1&&cg.t>0.6)) label((s?nmB:nmA)[i],v[0]+dx/l*0.45,v[1]+dy/l*0.45,cgHi==='pt'?PAL[i]:INK,0,0,17); }); });
  var pair=function(f){ var o=[]; for(var i=0;i<n;i++) o.push(f(i)); return o.join('　'); }, ang=function(s,i){ return s[(i+n-1)%n]+s[i]+s[(i+1)%n]; };
  $('say').innerHTML=cgHi==='pt'?('포개었을 때 겹치는 점을 <b class="r">대응점</b>이라고 해요.<small style="font-size:15.5px;color:var(--ink)">'+pair(function(i){ return '점 '+nmA[i]+' ↔ 점 '+nmB[i]; })+'</small>'):
    (cgHi==='side'?('포개었을 때 겹치는 변을 <b class="r">대응변</b>이라고 해요. 대응변의 길이는 서로 같아요.<small style="font-size:15.5px;color:var(--ink)">'+pair(function(i){ return '변 '+nmA[i]+nmA[(i+1)%n]+' ↔ 변 '+nmB[i]+nmB[(i+1)%n]; })+'</small>'):
    (cgHi==='ang'?('포개었을 때 겹치는 각을 <b class="r">대응각</b>이라고 해요. 대응각의 크기는 서로 같아요.<small style="font-size:15.5px;color:var(--ink)">'+pair(function(i){ return '각 '+ang(nmA,i)+' ↔ 각 '+ang(nmB,i); })+'</small>'):
    (cg.t<0.99?'두 도형을 포개면 완전히 겹칠까요?<small>먼저 예상해 보고 ▶ 포개어 보기를 눌러 보세요.</small>':('완전히 겹쳐요. 모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형을 서로 <b class="r">합동</b>이라고 해요.<small>'+(cg.fl?'이 도형은 뒤집어서 포개었어요. ':'')+'밀거나 돌리거나 뒤집어서 완전히 겹치면 합동이에요.</small>')))); }
function cgUI(){ $('top').innerHTML=chips([['','포개기'],['pt','대응점'],['side','대응변'],['ang','대응각']],cgHi,'k');
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="cgGo">▶ 포개어 보기</button><button class="btn" id="cgAlt">🔀 다른 도형</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ cgHi=b.dataset.k; if(cgHi&&cg.t>0.5){ anStop(); cg.t=0; } cgUI(); draw(); }; });
  $('cgGo').onclick=function(){ anim(function(){ return cg.t; },function(v){ cg.t=v; },cg.t>0.5?0:1,2000); };
  $('cgAlt').onclick=function(){ anStop(); cg={i:(cg.i+1)%CG.length,th:[1.05,1.57,2.1,2.6,3.5,4.7][rnd(6)],fl:Math.random()<0.5,t:0}; draw(); }; }

/* ───────── 2. 선대칭도형 ───────── */
var LS=[{nm:'이등변삼각형',p:[[-2.5,-2],[2.5,-2],[0,2.5]],ax:[90]},{nm:'직사각형',p:[[-3.5,-2],[3.5,-2],[3.5,2],[-3.5,2]],ax:[90,0]},{nm:'정삼각형',p:reg(3,2.8,90),ax:[90,30,150]},
  {nm:'정사각형',p:[[-2.5,-2.5],[2.5,-2.5],[2.5,2.5],[-2.5,2.5]],ax:[90,0,45,135]},{nm:'정육각형',p:reg(6,3,0),ax:[90,0,30,60,120,150]},
  {nm:'화살표 모양',p:[[0,3],[3,0],[1.2,0],[1.2,-3],[-1.2,-3],[-1.2,0],[-3,0]],ax:[90]},{nm:'평행사변형',p:[[-3.5,-2],[1.5,-2],[3.5,2],[-1.5,2]],ax:[],test:[90,0,30]}];
var lnI=0, lnA=0, lnT=0, lnHi=false;
function clipHalf(ps,c,n,sg){ var o=[], N=ps.length; for(var i=0;i<N;i++){ var a=ps[i], b=ps[(i+1)%N], da=((a[0]-c[0])*n[0]+(a[1]-c[1])*n[1])*sg, db=((b[0]-c[0])*n[0]+(b[1]-c[1])*n[1])*sg;
    if(da>=-1e-9) o.push(a); if((da>1e-9&&db<-1e-9)||(da<-1e-9&&db>1e-9)){ var k=da/(da-db); o.push([a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]); } } return o; }
function lnDraw(){ grid(); var s=LS[lnI], axs=s.ax.length?s.ax:s.test, a=axs[Math.min(lnA,axs.length-1)]*Math.PI/180, d=[Math.cos(a),Math.sin(a)], n=[-d[1],d[0]], c=[CX,CY], ps=at(s.p), k=Math.cos(Math.PI*lnT), sym=s.ax.length>0;
  var hA=clipHalf(ps,c,n,-1), hB=clipHalf(ps,c,n,1).map(function(q){ var h=(q[0]-c[0])*n[0]+(q[1]-c[1])*n[1]; return [q[0]-(1-k)*h*n[0],q[1]-(1-k)*h*n[1]]; });
  if(hA.length>2) poly(hA,FB(0.75),INK,2.4); if(hB.length>2) poly(hB,FO(0.65),INK,2.4);
  seg([c[0]-d[0]*9,c[1]-d[1]*9],[c[0]+d[0]*9,c[1]+d[1]*9],HOT,2.4,[10,5,2,5]);
  if(lnHi&&sym&&lnT<0.05){ var j=0; ps.forEach(function(v){ var h=(v[0]-c[0])*n[0]+(v[1]-c[1])*n[1]; if(h<0.05) return; var w=[v[0]-2*h*n[0],v[1]-2*h*n[1]], col=PAL[j++%PAL.length]; seg(v,w,col,2,[5,4]); dot(v,col,6); dot(w,col,6); }); }
  var b=$('lnGo'); if(b&&!anT) b.textContent=lnT>0.5?'◀ 다시 펴기':'▶ 접어 보기';
  $('say').innerHTML=(lnHi&&sym&&lnT<0.05)?('대칭축을 따라 접었을 때 겹치는 점이 <b class="r">대응점</b>이에요.<small style="font-size:15.5px;color:var(--ink)">대응점을 이은 선분은 대칭축과 수직으로 만나요. 대칭축은 그 선분을 똑같이 둘로 나누어요. 대응변의 길이와 대응각의 크기도 각각 같아요.</small>'):
    (lnT<0.99?(s.nm+'을 빨간 선을 따라 접으면 완전히 겹칠까요?<small>먼저 예상해 보고 ▶ 접어 보기를 눌러 보세요.</small>'):
    (sym?('완전히 겹쳐요. 한 직선을 따라 접어서 완전히 겹치는 도형을 <b class="r">선대칭도형</b>, 그 직선을 <b class="r">대칭축</b>이라고 해요.<small style="font-size:15.5px;color:var(--ink)">'+s.nm+'의 대칭축은 모두 '+s.ax.length+'개예요.'+(s.ax.length>1?' 다른 대칭축도 눌러 보세요. 대칭축은 모두 한 점에서 만나요.':'')+'</small>'):
      ('완전히 겹치지 않아요. '+s.nm+'은 어떤 직선으로 접어도 완전히 겹치지 않으므로 <b class="r">선대칭도형이 아니에요</b>.<small>다른 선으로도 접어 보세요.</small>'))); }
function lnUI(){ var s=LS[lnI], axs=s.ax.length?s.ax:s.test; $('top').innerHTML=chips(LS.map(function(x,i){ return [i,x.nm]; }),lnI,'i');
  $('ctl').innerHTML='<div class="chips" style="margin-top:6px">'+axs.map(function(a,i){ return '<button class="chip" aria-pressed="'+(i===lnA)+'" data-a="'+i+'">'+(s.ax.length?'대칭축 ':'접는 선 ')+(i+1)+'</button>'; }).join('')+'</div><div class="row"><button class="btn primary" id="lnGo">▶ 접어 보기</button>'+(s.ax.length?'<button class="chip" id="lnHi" aria-pressed="'+lnHi+'">대응점 표시</button>':'')+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ anStop(); lnI=+b.dataset.i; lnA=0; lnT=0; lnUI(); draw(); }; });
  $('ctl').querySelectorAll('[data-a]').forEach(function(b){ b.onclick=function(){ anStop(); lnA=+b.dataset.a; lnT=0; lnUI(); draw(); }; });
  $('lnGo').onclick=function(){ anim(function(){ return lnT; },function(v){ lnT=v; },lnT>0.5?0:1,1800); };
  if($('lnHi')) $('lnHi').onclick=function(){ anStop(); lnHi=!lnHi; if(lnHi) lnT=0; this.setAttribute('aria-pressed',lnHi); draw(); }; }

/* ───────── 3·5. 대칭인 도형 그리기 ───────── */
var LD=[[[8,7],[5,5],[8,1]],[[8,7],[5,6],[6,3],[8,1]],[[8,6],[6,7],[4,5],[6,2],[8,3]],[[8,7],[7,5],[4,5],[6,3],[5,1],[8,2]]];
var PD=[[[5,2],[5,6],[11,6]],[[4,3],[6,6],[12,5]],[[4,4],[5,7],[8,6],[12,4]],[[5,1],[4,4],[7,5],[7,7],[11,7]]];
var dr={ldraw:{i:0,pts:{},chk:false,ok:false},pdraw:{i:0,pts:{},chk:false,ok:false}};
function refl(p){ return tab==='ldraw'?[16-p[0],p[1]]:[16-p[0],8-p[1]]; }
function drNeed(){ var G=(tab==='ldraw'?LD:PD)[dr[tab].i]; return G.slice(1,-1).map(refl); }
function drDraw(){ grid(); var st=dr[tab], G=(tab==='ldraw'?LD:PD)[st.i], need=drNeed(), key=function(p){ return p[0]+','+p[1]; }, nk={}, good=0, bad=0; need.forEach(function(p){ nk[key(p)]=1; });
  if(st.ok){ var full=tab==='ldraw'?G.concat(G.slice(1,-1).reverse().map(refl)):G.slice(0,-1).concat(G.slice(0,-1).map(refl)); poly(full,FB(0.6),INK,2.6); }
  if(tab==='ldraw') seg([8,-0.3],[8,8.3],HOT,2.4,[10,5,2,5]);
  for(var i=0;i<G.length-1;i++) seg(G[i],G[i+1],INK,3.2); G.forEach(function(p){ dot(p,INK,5); });
  Object.keys(st.pts).forEach(function(k){ var p=k.split(',').map(Number), ok=!!nk[k]; if(ok) good++; else bad++; dot(p,st.chk&&!ok?'#DC2626':ACC,7); });
  if(tab==='pdraw'){ dot([8,4],HOT,6); label('대칭의 중심',8,4,HOT,0,-17,14); } else label('대칭축',8,7.6,HOT,30,0,14);
  var what=tab==='ldraw'?'선대칭도형':'점대칭도형', how=tab==='ldraw'?'대응점은 대칭축에서 같은 거리만큼 떨어진 반대쪽에 있어요. 대응점을 이은 선분은 대칭축과 수직이에요.':'대응점은 대칭의 중심을 지나는 직선 위에, 중심에서 같은 거리만큼 떨어진 반대쪽에 있어요.';
  $('say').innerHTML=st.ok?('<b class="r">잘했어요!</b> '+what+'이 완성됐어요.<small>'+how+'</small>'):
    (st.chk?('맞게 찍은 점 '+good+'개, 잘못 찍은 점 <b class="r">'+bad+'개</b>, 아직 못 찾은 점 '+(need.length-good)+'개예요.<small>'+how+'</small>'):
    (what+'이 되도록 나머지 부분을 완성해 보세요. 검은 점마다 대응점을 찾아 모눈 위를 눌러 표시하세요. (찍어야 할 점 '+need.length+'개)<small>'+how+' 찍은 점을 다시 누르면 지워져요.</small>')); }
function drCheck(){ var st=dr[tab], need=drNeed(), ks=Object.keys(st.pts); st.chk=true; st.ok=ks.length===need.length&&need.every(function(p){ return st.pts[p[0]+','+p[1]]; }); }
function drUI(){ $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="drGo">확인하기</button><button class="btn" id="drClr">지우기</button><button class="btn" id="drAns">정답 보기</button><button class="btn" id="drNext">다음 문제 ▶</button></div>';
  $('drGo').onclick=function(){ drCheck(); draw(); }; $('drClr').onclick=function(){ var st=dr[tab]; st.pts={}; st.chk=false; st.ok=false; draw(); };
  $('drAns').onclick=function(){ var st=dr[tab]; st.pts={}; drNeed().forEach(function(p){ st.pts[p[0]+','+p[1]]=1; }); drCheck(); draw(); };
  $('drNext').onclick=function(){ var st=dr[tab]; st.i=(st.i+1)%4; st.pts={}; st.chk=false; st.ok=false; draw(); }; }
function onTap(x,y){ if(tab!=='ldraw'&&tab!=='pdraw') return; var st=dr[tab], gx=Math.round((x-OX)/U), gy=Math.round((OY-y)/U); if(st.ok||gx<0||gy<0||gx>GW||gy>GH) return;
  if(Math.hypot(X(gx)-x,Y(gy)-y)>U*0.45) return; var k=gx+','+gy; if(st.pts[k]) delete st.pts[k]; else st.pts[k]=1; st.chk=false; draw(); }

/* ───────── 4. 점대칭도형 ───────── */
var PS=[{nm:'평행사변형',p:[[-3.5,-2],[1.5,-2],[3.5,2],[-1.5,2]],ok:true},{nm:'직사각형',p:[[-3.5,-2],[3.5,-2],[3.5,2],[-3.5,2]],ok:true},{nm:'정육각형',p:reg(6,3,0),ok:true},
  {nm:'S자 모양',p:[[-3,2],[1,2],[1,-1],[3,-1],[3,-2],[-1,-2],[-1,1],[-3,1]],ok:true},{nm:'정삼각형',p:reg(3,2.8,90),ok:false},{nm:'사다리꼴',p:[[-3.5,-2],[3.5,-2],[1.5,2],[-1.5,2]],ok:false}];
var ptI=0, ptT=0, ptHi=false;
function ptDraw(){ grid(); var s=PS[ptI], ps=at(s.p), c=[CX,CY];
  poly(ps,FB(0.45),INK,2.4); if(ptT>0) poly(ps.map(function(q){ return rotP(q,c,Math.PI*ptT); }),FO(0.6),INK,2.2);
  if(ptHi&&s.ok&&ptT<0.05){ var n=ps.length; for(var i=0;i<n/2;i++){ var v=ps[i], w=[2*c[0]-v[0],2*c[1]-v[1]], col=PAL[i%PAL.length]; seg(v,w,col,2,[5,4]); dot(v,col,6); dot(w,col,6); } }
  dot(c,HOT,6); label(ptT>0&&ptT<1?Math.round(ptT*180)+'°':'',CX,CY,HOT,0,-17,15);
  var b=$('ptGo'); if(b&&!anT) b.textContent=ptT>0.5?'◀ 되돌리기':'▶ 180° 돌려 보기';
  $('say').innerHTML=(ptHi&&s.ok&&ptT<0.05)?('180° 돌렸을 때 겹치는 점이 <b class="r">대응점</b>이에요.<small style="font-size:15.5px;color:var(--ink)">대응점을 이은 선분은 모두 대칭의 중심을 지나요. 대칭의 중심은 그 선분을 똑같이 둘로 나누어요. 대칭의 중심은 1개뿐이에요.</small>'):
    (ptT<0.99?(s.nm+'을 빨간 점을 중심으로 180° 돌리면 처음 도형과 완전히 겹칠까요?<small>먼저 예상해 보고 ▶ 180° 돌려 보기를 눌러 보세요.</small>'):
    (s.ok?'처음 도형과 완전히 겹쳐요. 한 점을 중심으로 180° 돌렸을 때 처음 도형과 완전히 겹치는 도형을 <b class="r">점대칭도형</b>, 그 점을 <b class="r">대칭의 중심</b>이라고 해요.<small>[대응점 표시]를 눌러 대응점을 살펴보세요.</small>':
      ('처음 도형과 완전히 겹치지 않아요. '+s.nm+'은 <b class="r">점대칭도형이 아니에요</b>.<small>'+(s.nm==='정삼각형'||s.nm==='사다리꼴'?'하지만 접으면 겹치는 선이 있으니 선대칭도형이에요.':'')+'</small>'))); }
function ptUI(){ var s=PS[ptI]; $('top').innerHTML=chips(PS.map(function(x,i){ return [i,x.nm]; }),ptI,'i');
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="ptGo">▶ 180° 돌려 보기</button>'+(s.ok?'<button class="chip" id="ptHi" aria-pressed="'+ptHi+'">대응점 표시</button>':'')+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ anStop(); ptI=+b.dataset.i; ptT=0; ptUI(); draw(); }; });
  $('ptGo').onclick=function(){ anim(function(){ return ptT; },function(v){ ptT=v; },ptT>0.5?0:1,2200); };
  if($('ptHi')) $('ptHi').onclick=function(){ anStop(); ptHi=!ptHi; if(ptHi) ptT=0; this.setAttribute('aria-pressed',ptHi); draw(); }; }

var UIS={cong:cgUI,line:lnUI,ldraw:drUI,point:ptUI,pdraw:drUI}, DRS={cong:cgDraw,line:lnDraw,ldraw:drDraw,point:ptDraw,pdraw:drDraw};
function ui(){ UIS[tab](); }
function draw(){ tone(); lay(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; $('hint').textContent=(t==='ldraw'||t==='pdraw')?'모눈의 점(선이 만나는 곳)을 누르면 점이 찍혀요.':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
