/* 약수와 배수 (5학년 1학기) */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
function divs(n){ var o=[]; for(var i=1;i<=n;i++) if(n%i===0) o.push(i); return o; }
function box(x,y,w,h,t,fill,stroke,col,sz,lw){ rect(x,y,w,h,fill,stroke||LINE,lw||1.2); txt(''+t,x+w/2,y+h/2,col||INK,sz||15); }
function topChips(arr,cur,fn){ $('top').innerHTML=chipsH(arr,cur,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ fn(b.dataset.k); ui(); draw(); }; }); }

/* ───────── 1. 약수 ───────── */
var dvN=12, dvK=3, dvF={};
function dvDraw(){ dvK=Math.min(dvK,dvN); var N=dvN, K=dvK, rows=Math.ceil(N/K), rem=N%K, top=12, bot=H-84, i,
    r=Math.max(3,Math.min(15,(BWd()/K-4)/2,((bot-top)/rows-4)/2)), st=r*2+4, x0=W/2-K*st/2, y0=top+((bot-top)-rows*st)/2;
  for(i=0;i<N;i++){ var c=i%K, rw=Math.floor(i/K), last=rem&&rw===rows-1; g.beginPath(); g.arc(x0+c*st+st/2,y0+rw*st+st/2,r,0,7); g.fillStyle=rgba(last?ORANGE:BLUE,0.9); g.fill(); g.strokeStyle=INK; g.lineWidth=1.2; g.stroke(); }
  if(!dvF[N]) dvF[N]={}; if(!rem){ dvF[N][K]=1; dvF[N][N/K]=1; }
  var ds=divs(N), cw=Math.min(46,(W-20)/ds.length), bx=W/2-ds.length*cw/2, by=H-46, found=0, q=Math.floor(N/K);
  txt(N+'의 약수 찾기',W/2,by-18,MUTED,14);
  ds.forEach(function(d,j){ var f=dvF[N][d], now=!rem&&(d===K||d===q); if(f) found++; box(bx+j*cw+2,by,cw-4,34,f?d:'?',f?rgba(now?ORANGE:GREEN,0.6):null,INK,f?INK:MUTED,Math.min(17,cw*0.45)); });
  $('say').innerHTML=rem?('구슬 '+N+'개를 한 줄에 '+K+'개씩 놓으면 '+q+'줄이 되고 <b class="r">'+rem+'개가 남아요</b>. '+N+' ÷ '+K+' = '+q+' … '+rem+SM+'나누어떨어지지 않으므로 '+J(K,'은','는')+' '+N+'의 약수가 아니에요.</small>'):
    ('구슬 '+N+'개를 한 줄에 '+K+'개씩 놓으면 남김없이 '+q+'줄이 돼요. '+N+' ÷ '+K+' = '+q+SM+'<b class="r">'+J(K,'은','는')+' '+N+'의 약수</b>예요. 어떤 수를 나누어떨어지게 하는 수를 그 수의 <b>약수</b>라고 해요. 몫 '+q+'도 '+N+'의 약수예요. 거꾸로 '+J(N,'은','는')+' '+K+'의 배수예요.<br>'+(found===ds.length?N+'의 약수를 모두 찾았어요: '+ds.join(', ')+'. 1은 모든 수의 약수이고, 가장 큰 약수는 자기 자신이에요.':'아직 찾지 못한 약수가 '+(ds.length-found)+'개 있어요. 한 줄에 놓는 개수를 바꿔 보세요.')+'</small>'); }
function dvUI(){ $('ctl').innerHTML='<div class="dims">'+sld('dvN','수',2,40,dvN)+sld('dvK','한 줄 개수',1,dvN,Math.min(dvK,dvN))+'</div>';
  sldBind('dvN',function(v){ dvN=v; dvK=Math.min(dvK,v); }); sldBind('dvK',function(v){ dvK=v; }); }

/* ───────── 2. 배수 ───────── */
var mlN=3;
function grid100(fn){ var c=Math.min((W-16)/10,(H-12)/10), x0=W/2-c*5, y0=(H-c*10)/2; for(var n=1;n<=100;n++){ var cx=x0+((n-1)%10)*c, cy=y0+Math.floor((n-1)/10)*c, s=fn(n)||{}; rect(cx,cy,c,c,s.f||null,LINE,1); if(s.b) rect(cx+2.5,cy+2.5,c-5,c-5,null,s.b,2.5); txt(''+n,cx+c/2,cy+c/2,s.f?INK:MUTED,Math.min(17,c*0.42)); } rect(x0,y0,c*10,c*10,null,INK,2); }
function mlDraw(){ grid100(function(n){ return n%mlN===0?{f:rgba(BLUE,0.8)}:null; });
  var l=[1,2,3,4,5].map(function(k){ return mlN*k; });
  $('say').innerHTML='<b class="r">'+mlN+'의 배수</b>: '+l.join(', ')+', …'+SM+J(mlN,'을','를')+' 1배, 2배, 3배, … 한 수를 '+mlN+'의 <b>배수</b>라고 해요. '+l.slice(0,3).map(function(v,k){ return mlN+' × '+(k+1)+' = '+v; }).join(', ')+', …<br>배수는 끝없이 많고, 가장 작은 배수는 자기 자신이에요. 수 배열표에서 색칠한 칸이 어떤 규칙으로 놓이는지 살펴보세요.</small>'; }
function mlUI(){ $('ctl').innerHTML='<div class="dims">'+sld('mlN','수',2,12,mlN)+'</div>'; sldBind('mlN',function(v){ mlN=v; }); }

/* 공약수로 나누기 */
function ladder(A,B){ var ps=[], rows=[[A,B]], p; while(true){ for(p=2;p<=Math.min(A,B);p++) if(A%p===0&&B%p===0) break; if(p>Math.min(A,B)) break; ps.push(p); A/=p; B/=p; rows.push([A,B]); } return {ps:ps,rows:rows}; }
function ladDraw(A,B,mode){ var L=ladder(A,B), n=L.rows.length, rh=Math.min(54,(H-76)/n), sz=Math.min(rh*0.6,W/13), cx=W/2, y0=20+rh/2, c1=cx-sz*0.2, c2=cx+sz*2.2, xl=cx-sz*1.5;
  L.rows.forEach(function(r,i){ var y=y0+i*rh, last=i===n-1, col=last&&mode==='lcm'?HOT:INK; txt(''+r[0],c1,y,col,sz); txt(''+r[1],c2,y,col,sz);
    if(!last){ txt(''+L.ps[i],xl-sz*0.4,y,HOT,sz,'right'); line(xl,y-rh*0.42,xl,y+rh*0.46,INK,2.2); line(xl,y+rh*0.46,c2+sz*1.1,y+rh*0.46,INK,2.2); } });
  var gg=L.ps.reduce(function(a,b){ return a*b; },1), la=L.rows[n-1], s=mode==='gcd'?('최대공약수: '+(L.ps.length?L.ps.join(' × ')+(L.ps.length>1?' = '+gg:''):'1')):('최소공배수: '+L.ps.concat(la).join(' × ')+' = '+gg*la[0]*la[1]), fs=Math.min(22,W/18);
  while(tw(s,fs)>W-20&&fs>12) fs--; txt(s,W/2,Math.min(H-20,y0+n*rh+6),HOT,fs);
  return {g:gg,l:gg*la[0]*la[1],ps:L.ps,la:la}; }

/* ───────── 3. 공약수와 최대공약수 ───────── */
var gA=12, gB=18, gM='list';
function chipRow(labt,arr,y,hh,cw,fn){ txt(labt,W/2,y,MUTED,15); var x=W/2-arr.length*cw/2; arr.forEach(function(d,j){ var s=fn(d)||{}; box(x+j*cw+2,y+16,cw-4,hh,d,s.f,s.b||INK,INK,Math.min(18,cw*0.45),s.b?3:1.2); }); }
function gcDraw(){ var G=gcd(gA,gB), da=divs(gA), db=divs(gB), dc=divs(G), AB=J(gA,'과','와')+' '+gB;
  if(gM==='lad'){ var o=ladDraw(gA,gB,'gcd');
    $('say').innerHTML=AB+'의 <b class="r">최대공약수는 '+G+'</b>'+P(G,'이에요','예요')+'.'+SM+(o.ps.length?'두 수를 공약수로 계속 나누어요. 1 말고는 공약수가 없을 때까지 나눈 뒤, 나눈 공약수 '+o.ps.join(', ')+P(o.ps[o.ps.length-1],'을','를')+(o.ps.length>1?' 모두 곱하면':' 보면')+' 최대공약수예요.':'두 수는 1 말고는 공약수가 없어요. 그래서 최대공약수는 1이에요.')+'</small>'; return; }
  var m=Math.max(da.length,db.length), cw=Math.min(48,(W-16)/m), rowH=(H-16)/3, hh=Math.min(40,rowH-36), f=function(d){ return G%d===0?{f:rgba(ORANGE,0.7),b:d===G?HOT:null}:{f:rgba(GRAY,0.25)}; };
  chipRow(gA+'의 약수',da,22,hh,cw,f); chipRow(gB+'의 약수',db,22+rowH,hh,cw,f); chipRow('공약수',dc,22+rowH*2,hh,cw,f);
  $('say').innerHTML=AB+'의 <b class="r">공약수는 '+dc.join(', ')+'</b>, <b class="r">최대공약수는 '+G+'</b>'+P(G,'이에요','예요')+'.'+SM+'두 수의 공통된 약수를 <b>공약수</b>, 공약수 가운데 가장 큰 수를 <b>최대공약수</b>라고 해요. '+AB+'의 공약수는 최대공약수 '+G+'의 약수와 같아요.</small>'; }
function gcUI(){ topChips([['list','약수 늘어놓기'],['lad','공약수로 나누기']],gM,function(k){ gM=k; });
  $('ctl').innerHTML='<div class="dims">'+sld('gA','앞의 수',4,48,gA)+sld('gB','뒤의 수',4,48,gB)+'</div>'; sldBind('gA',function(v){ gA=v; }); sldBind('gB',function(v){ gB=v; }); }

/* ───────── 4. 공배수와 최소공배수 ───────── */
var lA=4, lB=6, lM='grid';
function lcDraw(){ var L=lcm(lA,lB), AB=J(lA,'과','와')+' '+lB, cm=[], k;
  if(lM==='lad'){ var o=ladDraw(lA,lB,'lcm');
    $('say').innerHTML=AB+'의 <b class="r">최소공배수는 '+L+'</b>'+P(L,'이에요','예요')+'.'+SM+(o.ps.length?'두 수를 공약수로 나눈 뒤, 나눈 공약수와 밑에 남은 몫 '+o.la.join(', ')+P(o.la[1],'을','를')+' 모두 곱하면 최소공배수예요.':'두 수는 1 말고는 공약수가 없어요. 이럴 때는 두 수를 곱한 '+lA+' × '+lB+' = '+J(L,'이','가')+' 최소공배수예요.')+'</small>'; return; }
  grid100(function(n){ var a=n%lA===0, b=n%lB===0; return a&&b?{f:rgba(GREEN,0.95),b:HOT}:(a?{f:rgba(BLUE,0.6)}:(b?{f:rgba(ORANGE,0.6)}:null)); });
  for(k=L;k<=100&&cm.length<4;k+=L) cm.push(k);
  $('say').innerHTML=AB+'의 <b class="r">공배수는 '+cm.join(', ')+', …</b> <b class="r">최소공배수는 '+L+'</b>'+P(L,'이에요','예요')+'.'+SM+'파란 칸은 '+lA+'의 배수, 주황 칸은 '+lB+'의 배수예요. 테두리가 굵은 초록 칸은 두 수의 공통된 배수, 곧 <b>공배수</b>예요. 공배수 가운데 가장 작은 수를 <b>최소공배수</b>라고 해요. 공배수는 최소공배수 '+L+'의 배수와 같아요.</small>'; }
function lcUI(){ topChips([['grid','수 배열표'],['lad','공약수로 나누기']],lM,function(k){ lM=k; });
  $('ctl').innerHTML='<div class="dims">'+sld('lA','앞의 수',2,10,lA)+sld('lB','뒤의 수',2,10,lB)+'</div>'; sldBind('lA',function(v){ lA=v; }); sldBind('lB',function(v){ lB=v; }); }

/* ───────── 5. 문제 풀기 ───────── */
function pairG(gmin,gmax,cmax){ var G=ri(gmin,gmax), a, b; do{ a=ri(2,cmax); b=ri(2,cmax); }while(a===b||gcd(a,b)>1); return {A:G*a,B:G*b,G:G,L:G*a*b}; }
var dq=QZ(function(){ var t=rnd(6), N, p, o, w, AB;
  if(t===0){ N=pick([6,8,10,12,15,16,18,20,24,28,30,36]); return {lines:[N+'의 약수는 모두 몇 개일까요?'],ask:'약수를 모두 찾아 개수를 써 보세요.',kind:'num',ans:divs(N).length,unit:'개',show:divs(N).length+'개',why:N+'의 약수: '+divs(N).join(', '),hint:'1부터 차례로 나누어 보세요. 나누어떨어지면 약수예요.'}; }
  if(t===1){ if(rnd(2)){ N=ri(3,9); var a=N*ri(4,11); o=[a]; while(o.length<4){ w=N*ri(4,11)+ri(1,N-1); if(o.indexOf(w)<0) o.push(w); }
      return {lines:['다음 중 '+N+'의 배수는 어느 것일까요?'],ask:N+'의 배수를 골라 보세요.',kind:'mc',opts:shuf(o).map(String),ans:''+a,show:''+a,why:a+' ÷ '+N+' = '+(a/N)+Pr(a/N)+' 나누어떨어져요. '+N+' × '+(a/N)+' = '+a}; }
    N=pick([12,18,20,24,30,36,40]); o=shuf(divs(N).filter(function(d){ return d>1; })).slice(0,3); do{ w=ri(3,N-1); }while(N%w===0);
    return {lines:['다음 중 '+N+'의 약수가 아닌 것은 어느 것일까요?'],ask:N+'의 약수가 <b>아닌</b> 수를 골라 보세요.',kind:'mc',opts:shuf(o.concat([w])).map(String),ans:''+w,show:''+w,why:N+' ÷ '+w+' = '+Math.floor(N/w)+' … '+(N%w)+Pr(N%w)+' 나누어떨어지지 않아요. '+N+'의 약수: '+divs(N).join(', ')}; }
  if(t===2||t===4){ p=pairG(2,8,7); AB=J(p.A,'과','와')+' '+p.B; var wy=p.A+'의 약수: '+divs(p.A).join(', ')+'<br>'+p.B+'의 약수: '+divs(p.B).join(', ')+'<br>공약수 '+divs(p.G).join(', ')+' 가운데 가장 큰 수는 '+p.G;
    if(t===2) return {lines:[AB+'의 최대공약수'],ask:'최대공약수를 구해 보세요.',kind:'num',ans:p.G,show:''+p.G,why:wy,hint:'두 수를 모두 나누어떨어지게 하는 수 가운데 가장 큰 수를 찾아요.'};
    return {lines:['연필 '+p.A+'자루와 지우개 '+p.B+'개를','최대한 많은 학생에게','남김없이 똑같이 나누어 주려고 해요.'],ask:'몇 명에게 나누어 줄 수 있을까요?',kind:'num',ans:p.G,unit:'명',show:p.G+'명',why:'학생 수는 '+J(p.A,'과','와')+' '+J(p.B,'을','를')+' 모두 나누어떨어지게 해야 하므로 공약수예요. 최대한 많은 학생이므로 최대공약수 '+p.G+'명이에요. 한 명이 연필 '+(p.A/p.G)+'자루, 지우개 '+(p.B/p.G)+'개를 받아요.',hint:'두 수를 모두 나누어떨어지게 하는 가장 큰 수, 곧 최대공약수를 구해요.'}; }
  p=pairG(1,4,5); AB=J(p.A,'과','와')+' '+p.B; var ms=function(n){ return [1,2,3,4,5,6].map(function(k){ return n*k; }).filter(function(v){ return v<=p.L; }).join(', ')+(n*6<p.L?', …':''); }, wl=p.A+'의 배수: '+ms(p.A)+'<br>'+p.B+'의 배수: '+ms(p.B)+'<br>처음으로 같아지는 수는 '+p.L;
  if(t===3) return {lines:[AB+'의 최소공배수'],ask:'최소공배수를 구해 보세요.',kind:'num',ans:p.L,show:''+p.L,why:wl,hint:'두 수의 배수를 차례로 써서 처음으로 같아지는 수를 찾아요.'};
  return {lines:['가 버스는 '+p.A+'분마다, 나 버스는 '+p.B+'분마다 출발해요.','두 버스가 동시에 출발했다면','다음에 동시에 출발하는 때는 몇 분 뒤일까요?'],ask:'몇 분 뒤일까요?',kind:'num',ans:p.L,unit:'분 뒤',show:p.L+'분 뒤',why:'동시에 출발하는 때는 '+AB+'의 공배수예요. 바로 다음이므로 최소공배수 '+p.L+'분 뒤예요.<br>'+wl,hint:'두 수의 공통된 배수 가운데 가장 작은 수, 곧 최소공배수를 구해요.'}; });

var UIS={div:dvUI,mul:mlUI,gcd:gcUI,lcm:lcUI,quiz:function(){ dq.ui(); }}, DRS={div:dvDraw,mul:mlDraw,gcd:gcDraw,lcm:lcDraw,quiz:function(){ dq.draw(); }};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
