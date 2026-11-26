/* 수의 범위와 어림하기 (5학년 2학기) */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
var RN={ge:'이상',le:'이하',gt:'초과',lt:'미만'};
function inR(v,k,B){ return k==='ge'?v>=B:(k==='le'?v<=B:(k==='gt'?v>B:v<B)); }
function head(x,y,dir,col){ g.beginPath(); g.moveTo(x-dir*10,y-7); g.lineTo(x,y); g.lineTo(x-dir*10,y+7); g.strokeStyle=col; g.lineWidth=3; g.lineJoin='round'; g.stroke(); }
/* 수직선: lo~hi 를 그리고 값 → x 함수를 돌려줌 */
function nline(lo,hi,y,step){ var x0=38, x1=W-38, X=function(v){ return x0+(v-lo)/(hi-lo)*(x1-x0); }, n=Math.round((hi-lo)/step), i; line(x0-22,y,x1+22,y,INK,2); head(x0-22,y,-1,INK); head(x1+22,y,1,INK);
  for(i=0;i<=n;i++) line(X(lo+i*step),y-7,X(lo+i*step),y+7,INK,1.5); return X; }
function dot(x,y,closed,col){ g.beginPath(); g.arc(x,y,7.5,0,7); g.fillStyle=closed?col:HALO; g.fill(); g.strokeStyle=col; g.lineWidth=3; g.stroke(); }

/* ───────── 1. 이상, 이하, 초과, 미만 ───────── */
var rgK='ge', rgB=20;
function rgDraw(){ var B=rgB, lo=B-5, hi=B+5, y=H*0.56, X=nline(lo,hi,y,1), v, dir=(rgK==='ge'||rgK==='gt')?1:-1, closed=(rgK==='ge'||rgK==='le'), up=y-30, xe=dir>0?X(hi)+20:X(lo)-20;
  txt(B+' '+RN[rgK]+'인 수',W/2,Math.max(34,y-110),INK,Math.min(34,W/11));
  for(v=lo;v<=hi;v++){ var on=inR(v,rgK,B); txt(''+v,X(v),y+26,on?HOT:MUTED,on?19:15); }
  line(X(B),up,xe,up,HOT,5); line(X(B),up,X(B),y,HOT,3); head(xe,up,dir,HOT); dot(X(B),y,closed,HOT);
  var e=dir>0?[B+(closed?0:1),B+2,B+5]:[B-5,B-2,B-(closed?0:1)], d=dir>0?(B+'.5'):((B-1)+'.5');
  $('say').innerHTML='<b class="r">'+B+' '+RN[rgK]+'인 수</b>는 '+(closed?J(B,'과','와')+' 같거나 ':B+'보다 ')+(dir>0?'큰':'작은')+' 수예요.'+SM+(closed?J(B,'이','가')+' <b>포함돼요</b>. 수직선에서 '+B+'의 자리를 색칠한 점 ●으로 나타내요.':J(B,'은','는')+' <b>포함되지 않아요</b>. 수직선에서 '+B+'의 자리를 속이 빈 점 ○으로 나타내요.')+' 예: '+e.join(', ')+', '+d+' 같은 수<br>이상과 이하는 기준이 되는 수를 포함하고, 초과와 미만은 포함하지 않아요.</small>'; }
function rgUI(){ $('top').innerHTML=chipsH([['ge','이상'],['le','이하'],['gt','초과'],['lt','미만']],rgK,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rgK=b.dataset.k; ui(); draw(); }; });
  $('ctl').innerHTML='<div class="dims">'+sld('rgB','기준 수',6,95,rgB)+'</div>'; sldBind('rgB',function(v){ rgB=v; }); }

/* ───────── 2. 두 가지 범위 ───────── */
var bA=12, bB=17, bL='ge', bR='lt';
function btDraw(){ var a=bA, b=bB, lo=a-2, hi=b+2, y=H*0.56, X=nline(lo,hi,y,1), v, up=y-30, ins=[], fs=Math.min(19,(W-76)/(hi-lo)*0.62);
  txt(a+' '+RN[bL]+' '+b+' '+RN[bR]+'인 수',W/2,Math.max(34,y-110),INK,Math.min(32,W/13));
  for(v=lo;v<=hi;v++){ var on=inR(v,bL,a)&&inR(v,bR,b); if(on) ins.push(v); txt(''+v,X(v),y+26,on?HOT:MUTED,on?fs:fs*0.8); }
  line(X(a),up,X(b),up,HOT,5); line(X(a),up,X(a),y,HOT,3); line(X(b),up,X(b),y,HOT,3); dot(X(a),y,bL==='ge',HOT); dot(X(b),y,bR==='le',HOT);
  $('say').innerHTML='<b class="r">'+a+' '+RN[bL]+' '+b+' '+RN[bR]+'인 수</b>는 '+(bL==='ge'?J(a,'과','와')+' 같거나 크고 ':a+'보다 크고 ')+(bR==='le'?J(b,'과','와')+' 같거나 작은 수':b+'보다 작은 수')+'예요.'+SM+J(a,'은','는')+' '+(bL==='ge'?'포함되고':'포함되지 않고')+', '+J(b,'은','는')+' '+(bR==='le'?'포함돼요':'포함되지 않아요')+'. '+(ins.length?'이 범위에 있는 자연수는 '+ins.join(', ')+P(ins[ins.length-1],'으로','로')+' 모두 '+ins.length+'개예요.':'이 범위에 있는 자연수는 없어요.')+'<br>생활 속 예: 놀이 기구 탑승 키, 몸무게에 따른 체급, 나이에 따른 요금처럼 범위를 정할 때 써요.</small>'; }
function btUI(){ $('top').innerHTML='';
  $('ctl').innerHTML='<div class="dims">'+sld('bA','시작 수',3,60,bA)+sld('bB','끝 수',bA+1,bA+10,bB)+'</div><div class="row" style="margin-top:6px"><span>시작:</span>'+chipsH([['ge','이상'],['gt','초과']],bL,'l','display:inline-flex;margin:0')+'<span style="margin-left:10px">끝:</span>'+chipsH([['le','이하'],['lt','미만']],bR,'r','display:inline-flex;margin:0')+'</div>';
  sldBind('bA',function(v){ var d=bB-bA; bA=v; bB=v+d; }); sldBind('bB',function(v){ bB=v; });
  $('ctl').querySelectorAll('[data-l]').forEach(function(b){ b.onclick=function(){ bL=b.dataset.l; ui(); draw(); }; }); $('ctl').querySelectorAll('[data-r]').forEach(function(b){ b.onclick=function(){ bR=b.dataset.r; ui(); draw(); }; }); }

/* ───────── 3. 올림, 버림, 반올림 ───────── */
/* 수는 (정수 V, 소수 자리 수 dp) 로 다룬다. p = 나타낼 자리 (V 기준 10의 p제곱 자리) */
var PN={'-3':'소수 셋째 자리','-2':'소수 둘째 자리','-1':'소수 첫째 자리','0':'일의 자리','1':'십의 자리','2':'백의 자리','3':'천의 자리'};
var MN={up:'올림',down:'버림',half:'반올림'};
function fm(i,dp,keep){ return (i/Math.pow(10,dp)).toFixed(Math.max(0,keep)); }
function rcalc(V,p,m){ var u=Math.pow(10,p), lo=Math.floor(V/u)*u, low=V-lo, dg=Math.floor(low/(u/10)); return {u:u,lo:lo,hi:lo+u,low:low,dg:dg,res:m==='down'?lo:(m==='up'?(low?lo+u:lo):(dg>=5?lo+u:lo))}; }
var rn={V:2356,dp:0}, rnM='half', rnP=2;
function rnNew(dp){ var V; do{ V=ri(1001,9998); }while(V%10===0); rn={V:V,dp:dp}; }
function rnDraw(){ var V=rn.V, dp=rn.dp, p=rnP, c=rcalc(V,p,rnM), s=fm(V,dp,dp), sz=Math.min(52,W/9), tot=tw(s,sz), x=W/2-tot/2, y1=46, nd=s.replace('.','').length, j=0, k, kp=dp-p;
  for(k=0;k<s.length;k++){ var cwid=tw(s[k],sz), pw=-1; if(s[k]!=='.'){ pw=nd-1-j; j++; }
    if(pw===p) rect(x-3,y1-sz*0.62,cwid+6,sz*1.24,rgba(BLUE,0.45),ACC,2.5); if(rnM==='half'&&pw===p-1) rect(x-3,y1-sz*0.62,cwid+6,sz*1.24,rgba(ORANGE,0.5),HOT,2);
    txt(s[k],x+cwid/2,y1,(pw>=0&&pw<p)?(rnM==='half'&&pw===p-1?INK:MUTED):INK,sz); x+=cwid; }
  var y=Math.min(H-96,y1+sz+86), X=nline(c.lo,c.hi,y,c.u/10), fs=Math.min(17,W/26);
  txt(fm(c.lo,dp,kp),X(c.lo),y+26,c.res===c.lo?HOT:INK,fs); txt(fm(c.hi,dp,kp),X(c.hi),y+26,c.res===c.hi?HOT:INK,fs); txt(fm(c.lo+c.u/2,dp,kp+1),X(c.lo+c.u/2),y+24,MUTED,fs*0.82); line(X(c.lo+c.u/2),y-12,X(c.lo+c.u/2),y+12,MUTED,1.5);
  if(c.res!==V){ var dir=c.res>V?1:-1; line(X(V),y-30,X(c.res),y-30,HOT,4); head(X(c.res),y-30,dir,HOT); line(X(V),y-30,X(V),y,HOT,2.5); }
  dot(X(V),y,true,HOT); txt(s,X(V),y-48,HOT,fs);
  txt('→  '+fm(c.res,dp,kp),W/2,y+66,HOT,Math.min(36,W/10));
  var nm=PN[p-dp], lowS=fm(c.low,dp,dp), uS=fm(c.u,dp,kp), R=fm(c.res,dp,kp), hd=J(s,'을','를')+' <b>'+MN[rnM]+'</b>하여 <b>'+nm+'까지</b> 나타내면 <b class="r">'+R+'</b>'+P(R,'이에요','예요')+'.';
  $('say').innerHTML=hd+SM+(rnM==='up'?('<b>올림</b>은 구하려는 자리 아래 수를 올려서 나타내는 방법이에요. '+(c.low?nm+' 아래 수 '+J(lowS,'을','를')+' '+uS+Pr(uS)+' 보고 올려요.':nm+' 아래 수가 모두 0이라서 올리지 않고 그대로 써요.')):
    (rnM==='down'?('<b>버림</b>은 구하려는 자리 아래 수를 버려서 나타내는 방법이에요. '+nm+' 아래 수 '+J(lowS,'을','를')+' 0으로 보고 버려요.'):
    ('<b>반올림</b>은 구하려는 자리 바로 아래 자리의 숫자가 0, 1, 2, 3, 4이면 버리고 5, 6, 7, 8, 9이면 올리는 방법이에요. '+PN[p-dp-1]+' 숫자가 '+c.dg+'이므로 '+(c.dg>=5?'올려요.':'버려요.')+' 수직선에서 더 가까운 쪽으로 간다고 생각해도 돼요.')))+'</small>'; }
function rnUI(){ $('top').innerHTML=chipsH([['up','올림'],['down','버림'],['half','반올림']],rnM,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rnM=b.dataset.k; ui(); draw(); }; });
  $('ctl').innerHTML=chipsH([1,2,3].map(function(p){ return [''+p,PN[p-rn.dp]+'까지']; }),''+rnP,'p','margin-top:8px')+'<div class="row"><button class="btn" id="rnI">다른 자연수</button><button class="btn" id="rnD">다른 소수</button></div>';
  $('ctl').querySelectorAll('[data-p]').forEach(function(b){ b.onclick=function(){ rnP=+b.dataset.p; ui(); draw(); }; });
  $('rnI').onclick=function(){ rnNew(0); ui(); draw(); }; $('rnD').onclick=function(){ rnNew(3); ui(); draw(); }; }

/* ───────── 4. 생활 속 어림 ───────── */
function nz(a,b,m){ var n; do{ n=ri(a,b); }while(n%m===0); return n; }
var LIFE=[
  function(){ var n=nz(101,989,10); return ['사과 '+n+'개를 한 상자에 10개씩 담아 팔려고 해요.','상자에 담아 팔 수 있는 사과는 몇 개일까요?','버림','10개가 안 되는 사과는 상자에 담아 팔 수 없어요. '+J(n,'을','를')+' 버림하여 십의 자리까지 나타내면 '+Math.floor(n/10)*10+'개예요.']; },
  function(){ var n=nz(101,489,10); return ['학생 '+n+'명이 10명씩 탈 수 있는 보트에','모두 타려고 해요. 보트는 적어도 몇 대 필요할까요?','올림','남는 학생도 보트에 타야 해요. '+J(n,'을','를')+' 올림하여 십의 자리까지 나타내면 '+Math.ceil(n/10)*10+'이므로 보트는 '+Math.ceil(n/10)+'대 필요해요.']; },
  function(){ var n=nz(12,98,10)*100+pick([0,50]); return ['저금통에 모은 동전 '+n+'원을','1000원짜리 지폐로 바꾸면 최대 얼마까지 바꿀 수 있을까요?','버림','1000원이 안 되는 돈은 지폐로 바꿀 수 없어요. '+J(n,'을','를')+' 버림하여 천의 자리까지 나타내면 '+Math.floor(n/1000)*1000+'원이에요.']; },
  function(){ var n=nz(12,98,10)*100; return [n+'원짜리 물건을 사는데','1000원짜리 지폐로만 내려면 적어도 얼마를 내야 할까요?','올림','모자라지 않게 내야 해요. '+J(n,'을','를')+' 올림하여 천의 자리까지 나타내면 '+Math.ceil(n/1000)*1000+'원이에요.']; },
  function(){ var n=nz(1301,1598,10); return ['키를 재었더니 '+fm(n,1,1)+'cm였어요.','1cm 단위로 가장 가깝게 나타내면 몇 cm일까요?','반올림','가장 가까운 수로 나타낼 때는 반올림해요. '+J(fm(n,1,1),'을','를')+' 반올림하여 일의 자리까지 나타내면 '+Math.round(n/10)+'cm예요.']; },
  function(){ var n=nz(12011,48989,1000); return ['경기장에 관중이 '+n+'명 들어왔어요.','약 몇천 명이라고 말하려면 어떻게 어림할까요?','반올림','실제 수에 가장 가깝게 나타낼 때는 반올림해요. '+J(n,'을','를')+' 반올림하여 천의 자리까지 나타내면 '+Math.round(n/1000)*1000+'명이에요.']; },
  function(){ var n=nz(301,989,100); return ['끈 '+n+'cm를 100cm씩 잘라 리본을 만들려고 해요.','리본을 만드는 데 쓸 수 있는 끈은 몇 cm일까요?','버림','100cm가 안 되는 끈으로는 리본을 만들 수 없어요. '+J(n,'을','를')+' 버림하여 백의 자리까지 나타내면 '+Math.floor(n/100)*100+'cm예요.']; },
  function(){ var n=nz(301,989,100); return ['짐 '+n+'kg을 한 번에 100kg까지 싣는 수레로','모두 옮기려고 해요. 적어도 몇 번 옮겨야 할까요?','올림','남는 짐도 옮겨야 해요. '+J(n,'을','를')+' 올림하여 백의 자리까지 나타내면 '+Math.ceil(n/100)*100+'이므로 '+Math.ceil(n/100)+'번 옮겨야 해요.']; }];
function lifeQ(){ var a=pick(LIFE)(); return {lines:[a[0],a[1]],ask:'올림, 버림, 반올림 가운데 어떤 방법으로 어림해야 할까요?',kind:'mc',opts:['올림','버림','반올림'],ans:a[2],show:a[2],why:a[3]}; }
var lq=QZ(lifeQ);

/* ───────── 5. 문제 풀기 ───────── */
var rq=QZ(function(){ var t=rnd(5), B, k, o, a, b, l, r, n, v, c, p, dp, m;
  if(t===0){ B=ri(10,90); k=pick(['ge','le','gt','lt']); var up=(k==='ge'||k==='lt'), ans=(k==='ge'||k==='lt')?B-1:B+1, no=(k==='ge'||k==='le');
    o=up?[B-1,B,B+1,B+2]:[B+1,B,B-1,B-2];
    return {lines:['다음 중 '+B+' '+RN[k]+'인 수'+(no?'가 아닌 것은':'는')+' 어느 것일까요?'],ask:B+' '+RN[k]+'인 수'+(no?'가 <b>아닌</b> 것을':'를')+' 골라 보세요.',kind:'mc',opts:shuf(o).map(String),ans:''+ans,show:''+ans,why:B+' '+RN[k]+'인 수는 '+(no?J(B,'과','와')+' 같거나 ':B+'보다 ')+((k==='ge'||k==='gt')?'큰':'작은')+' 수예요. '+J(B,'은','는')+' '+(no?'포함돼요.':'포함되지 않아요.')}; }
  if(t===1){ a=ri(5,40); b=a+ri(3,9); l=pick(['ge','gt']); r=pick(['le','lt']); n=0; for(v=a;v<=b;v++) if(inR(v,l,a)&&inR(v,r,b)) n++;
    var li=[]; for(v=a;v<=b;v++) if(inR(v,l,a)&&inR(v,r,b)) li.push(v);
    return {lines:[a+' '+RN[l]+' '+b+' '+RN[r]+'인 자연수는','모두 몇 개일까요?'],ask:'범위에 있는 자연수의 개수를 써 보세요.',kind:'num',ans:n,unit:'개',show:n+'개',why:J(a,'은','는')+' '+(l==='ge'?'포함되고':'포함되지 않고')+', '+J(b,'은','는')+' '+(r==='le'?'포함돼요':'포함되지 않아요')+'. 범위에 있는 자연수: '+li.join(', '),hint:'양 끝의 수가 포함되는지부터 따져 보세요.'}; }
  if(t===4) return lifeQ();
  dp=t===2?0:3; n=nz(1001,9998,10); p=ri(1,3); m=pick(['up','down','half']); c=rcalc(n,p,m); var s=fm(n,dp,dp), R=fm(c.res,dp,dp-p), nm=PN[p-dp];
  return {lines:[J(s,'을','를')+' '+MN[m]+'하여',nm+'까지 나타내면?'],ask:'어림한 수를 써 보세요.',kind:'num',ans:+R,show:R,why:m==='half'?(PN[p-dp-1]+' 숫자가 '+c.dg+'이므로 '+(c.dg>=5?'올려요.':'버려요.')):(nm+' 아래 수 '+J(fm(c.low,dp,dp),'을','를')+' '+(m==='up'?'올려요.':'버려요.')),hint:m==='half'?'바로 아래 자리의 숫자가 5 이상인지 살펴보세요.':(m==='up'?'구하려는 자리 아래 수를 올려요.':'구하려는 자리 아래 수를 0으로 봐요.')}; });

var UIS={one:rgUI,two:btUI,round:rnUI,life:function(){ lq.ui(); },quiz:function(){ rq.ui(); }}, DRS={one:rgDraw,two:btDraw,round:rnDraw,life:function(){ lq.draw(); },quiz:function(){ rq.draw(); }};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
