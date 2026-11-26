/* 소수의 덧셈과 뺄셈 (4학년 2학기). 수는 1/100 단위 정수로 다룬다. */
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };
var SM='<small style="font-size:15.5px;color:var(--ink)">';
function D2(h){ return DD(h/100); }
var KD='영일이삼사오육칠팔구';
function rdK(s){ var p=s.split('.'); return (p[0]==='0'?'영':p[0])+(p[1]?' 점 '+p[1].split('').map(function(c){ return KD[+c]; }).join(''):''); }
function sl(id,lab,min,max,val,show,step){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'" value="'+val+'"><output>'+show+'</output></div>'; }
/* 넓은 범위 슬라이더: 끄는 동안은 그림만 다시 그리고, 놓으면 조절 칸을 새로 만든다 */
function sb(id,fn,fmt){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=fmt(+this.value); draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
/* 100칸 모눈 n개: fills=[[칸 수,색]...] 을 세로줄부터 이어 칠함. gone=뒤에서부터 덜어 낸 칸 수 */
function grids(x,y,S,n,fills,gone){ var c=S/10, k=0, tot=0, i, b, gap=14; fills.forEach(function(f){ tot+=f[0]; });
  fills.forEach(function(f){ for(i=0;i<f[0];i++){ var gi=Math.floor(k/100), kk=k%100; rect(x+gi*(S+gap)+Math.floor(kk/10)*c,y+(kk%10)*c,c,c,f[1]); k++; } });
  for(i=0;i<(gone||0);i++){ var q=tot-1-i, gx=x+Math.floor(q/100)*(S+gap)+Math.floor((q%100)/10)*c, gy=y+(q%10)*c; g.globalAlpha=0.75; rect(gx,gy,c,c,HALO); g.globalAlpha=1; line(gx+2,gy+c-2,gx+c-2,gy+2,HOT,1.6); }
  for(b=0;b<n;b++){ var bx=x+b*(S+gap); for(i=1;i<10;i++){ line(bx+i*c,y,bx+i*c,y+S,INK,0.7); line(bx,y+i*c,bx+S,y+i*c,INK,0.7); } rect(bx,y,S,S,null,INK,2.4); }
  return n*S+(n-1)*gap; }
/* 세로셈: 소수점 자리를 맞추어 쓴다. px=소수점 x */
function vnum(s,px,y,col,sz){ var p=s.split('.'), cw=sz*0.62, i; for(i=0;i<p[0].length;i++) txt(p[0][i],px-cw*(p[0].length-i)+cw/2-3,y,col,sz); if(p[1]){ txt('.',px,y+sz*0.12,col,sz); for(i=0;i<p[1].length;i++) txt(p[1][i],px+3+cw*i+cw/2,y,col,sz); } }
function vcalc(px,y,a,b,op,r,sz){ var cw=sz*0.62; vnum(a,px,y,ACC,sz); vnum(b,px,y+sz*1.25,HOT,sz); txt(op,px-cw*2.6,y+sz*1.25,INK,sz); line(px-cw*3.3,y+sz*2,px+cw*2.6,y+sz*2,INK,2.5); vnum(r,px,y+sz*2.75,INK,sz); }

/* ───────── 1. 소수 두 자리 수 ───────── */
var tn=37;
function twDraw(){ var S=Math.min(H-36,W*0.48,300), x0=Math.max(10,W/2-S-20), y0=(H-S)/2, xr=x0+S+(W-x0-S)/2, s=D2(tn), sz=Math.min(46,W/11);
  grids(x0,y0,S,1,[[tn,CB()]]);
  cfr(tn,100,xr,y0+S*0.16,INK,Math.min(24,W/22)); txt('= '+s,xr,y0+S*0.5,HOT,sz);
  if(tn<100) txt('0.1이 '+Math.floor(tn/10)+'개',xr,y0+S*0.76,ACC,Math.min(21,W/22)), txt('0.01이 '+(tn%10)+'개',xr,y0+S*0.9,ACC,Math.min(21,W/22));
  $('say').innerHTML='<b class="r">'+s+'</b> 「'+rdK(s)+'」'+SM+'100칸 가운데 '+tn+'칸이에요. 한 칸은 '+F(1,100)+' = 0.01, 한 줄은 '+F(1,10)+' = 0.1이에요.</small>'; }
function twUI(){ $('ctl').innerHTML=sl('tN','색칠한 칸',1,100,tn,tn+'칸'); sb('tN',function(v){ tn=v; },function(v){ return v+'칸'; }); }

/* ───────── 2. 자릿값 ───────── */
var pv=[3,7,5,2], psel=2, PN=[['일의','자리'],['소수','첫째 자리'],['소수','둘째 자리'],['소수','셋째 자리']], PU=[1,0.1,0.01,0.001], pbox=[];
function pvStr(){ return DD(pv[0]+pv[1]/10+pv[2]/100+pv[3]/1000); }
function pvVal(i){ return i===0?''+pv[0]:DD(pv[i]*PU[i]); }
function plDraw(){ var cw=Math.min(130,(W-40)/4), x0=(W-cw*4)/2, y0=H*0.1, hh=H*0.16, dh=H*0.34, i, sz=Math.min(64,cw*0.6); pbox=[];
  for(i=0;i<4;i++){ var x=x0+i*cw, on=i===psel; rect(x,y0,cw,hh,rgba(GRAY,0.3),LINE,1.5); txt(PN[i][0],x+cw/2,y0+hh*0.3,MUTED,Math.min(15,cw/7)); txt(PN[i][1],x+cw/2,y0+hh*0.7,MUTED,Math.min(15,cw/7));
    rect(x,y0+hh,cw,dh,on?CO(0.35):null,on?HOT:LINE,on?3:1.5); txt(''+pv[i],x+cw/2,y0+hh+dh/2,on?HOT:INK,sz); pbox.push([x,y0,cw,hh+dh]);
    txt(pvVal(i),x+cw/2,y0+hh+dh+H*0.08,on?HOT:MUTED,Math.min(on?24:17,cw/4.2)); }
  txt('.',x0+cw,y0+hh+dh*0.62,INK,sz);
  txt('👆 숫자 칸을 눌러 보세요',W/2,H-16,MUTED,14);
  $('say').innerHTML=pvStr()+'에서 <b class="r">'+pv[psel]+'</b>'+P(pv[psel],'은','는')+' <b class="r">'+pvVal(psel)+'</b>'+SM+PN[psel].join(' ')+' 숫자예요. '+(psel?DD(PU[psel])+'이 '+pv[psel]+'개':'1이 '+pv[0]+'개')+'</small>'; }
function plUI(){ $('ctl').innerHTML='<div class="dims">'+sld('p0','일',0,9,pv[0])+sld('p1','첫째',0,9,pv[1])+sld('p2','둘째',0,9,pv[2])+sld('p3','셋째',0,9,pv[3])+'</div>';
  [0,1,2,3].forEach(function(i){ sldBind('p'+i,function(v){ pv[i]=v; psel=i; }); }); }

/* ───────── 3. 크기 비교 ───────── */
var ca=125, cb=90;
function cpDraw(){ var BW=BWd()-40, x0=(W-BW)/2, hh=Math.min(44,H*0.13), y1=H*0.36, y2=y1+hh+16, i, s=ca>cb?'>':(ca<cb?'<':'='), sz=Math.min(46,W/11);
  var wa=tw(D2(ca),sz), wb=tw(D2(cb),sz), ws=tw(' > ',sz), xs=W/2-(wa+ws+wb)/2;
  txt(D2(ca),xs+wa/2,H*0.16,ACC,sz); txt(s,xs+wa+ws/2,H*0.16,INK,sz); txt(D2(cb),xs+wa+ws+wb/2,H*0.16,HOT,sz);
  rect(x0,y1,BW*ca/200,hh,CB(),INK,2.2); rect(x0,y2,BW*cb/200,hh,CO(),INK,2.2);
  var ya=y2+hh+14; line(x0,ya,x0+BW,ya,INK,2); for(i=0;i<=20;i++){ line(x0+BW*i/20,ya-(i%5?4:8),x0+BW*i/20,ya+(i%5?4:8),INK,i%5?1:2); if(i%5===0) txt(DD(i/10),x0+BW*i/20,ya+24,MUTED,15); }
  var A=(ca/100).toFixed(2), B=(cb/100).toFixed(2), at=A[0]!==B[0]?'자연수 부분':(A[2]!==B[2]?'소수 첫째 자리':'소수 둘째 자리');
  $('say').innerHTML=D2(ca)+' <b class="r">'+(s==='>'?'&gt;':(s==='<'?'&lt;':'='))+'</b> '+D2(cb)+SM+(s==='='?'두 수의 크기가 같아요.':at+'에서 크기가 갈려요. ('+A+' , '+B+')')+'<br>자연수 부분 → 소수 첫째 자리 → 소수 둘째 자리 순서로 비교해요.</small>'; }
function cpUI(){ $('ctl').innerHTML='<div class="dims">'+sl('cA','파랑',1,200,ca,D2(ca))+sl('cB','주황',1,200,cb,D2(cb))+'</div>'; sb('cA',function(v){ ca=v; },D2); sb('cB',function(v){ cb=v; },D2); }

/* ───────── 4. 덧셈 ───────── */
var pa=37, pb=50;
function calcLay(n){ var vw=Math.min(150,W*0.3), S=Math.min((W-vw-30-(n-1)*14)/n,H-50,190), gw=n*S+(n-1)*14, x0=(W-gw-vw-10)/2; return {S:S,x0:x0,y0:(H-S)/2,px:x0+gw+10+vw*0.56,sz:Math.min(34,vw/4.4)}; }
function plusDraw(){ var L=calcLay(2), s=pa+pb;
  grids(L.x0,L.y0,L.S,2,[[pa,CB()],[pb,CO()]]);
  vcalc(L.px,H/2-L.sz*1.4,D2(pa),D2(pb),'+',D2(s),L.sz);
  $('say').innerHTML=D2(pa)+' + '+D2(pb)+' = <b class="r">'+D2(s)+'</b>'+SM+'소수점끼리 맞추어 쓰고, 같은 자리끼리 더해요. '+pa+'칸 + '+pb+'칸 = '+s+'칸'+(s>=100?' (100칸 = 1)':'')+'</small>'; }
function plusUI(){ $('ctl').innerHTML='<div class="dims">'+sl('pA','파랑',1,99,pa,D2(pa))+sl('pB','주황',1,99,pb,D2(pb))+'</div>'; sb('pA',function(v){ pa=v; },D2); sb('pB',function(v){ pb=v; },D2); }

/* ───────── 5. 뺄셈 ───────── */
var ma=85, mb=30;
function minusDraw(){ var L=calcLay(1), r=ma-mb;
  grids(L.x0,L.y0,L.S,1,[[ma,CB()]],mb);
  vcalc(L.px,H/2-L.sz*1.4,D2(ma),D2(mb),'−',D2(r),L.sz);
  $('say').innerHTML=D2(ma)+' − '+D2(mb)+' = <b class="r">'+D2(r)+'</b>'+SM+'소수점끼리 맞추어 쓰고, 같은 자리끼리 빼요. '+ma+'칸 − '+mb+'칸 = '+r+'칸</small>'; }
function minusUI(){ if(mb>=ma) mb=ma-1; $('ctl').innerHTML='<div class="dims">'+sl('mA','처음',2,100,ma,D2(ma))+sl('mB','빼는 수',1,ma-1,mb,D2(mb))+'</div>'; sb('mA',function(v){ ma=v; if(mb>=ma) mb=ma-1; },D2); sb('mB',function(v){ mb=v; },D2); }

/* ───────── 6. 10배와 1/10 ───────── */
var SH=[[2,5],[7],[1,3,6],[4,0,8]], shi=0, shc=2, shOff=0, shLast=0, SHN=['백','십','일','0.1','0.01','0.001'];
function shCells(c){ var ds=SH[shi], a=['','','','','',''], i, e=c+ds.length-1; for(i=0;i<ds.length;i++) a[c+i]=''+ds[i]; for(i=e+1;i<=2;i++) a[i]='0'; for(i=2;i<c;i++) a[i]='0'; return a; }
function shStr(c){ var a=shCells(c), ip=(a[0]+a[1]+a[2]).replace(/^0+(?=\d)/,''), fp=(a[3]+a[4]+a[5]).replace(/0+$/,''); return (ip||'0')+(fp?'.'+fp:''); }
function shDraw(){ var cw=Math.min(96,(W-24)/6), x0=(W-cw*6)/2, y0=H*0.2, hh=H*0.13, dh=H*0.34, i, sz=Math.min(58,cw*0.62), ds=SH[shi], a=shCells(shc);
  for(i=0;i<6;i++){ rect(x0+i*cw,y0,cw,hh,rgba(GRAY,0.3),LINE,1.5); txt(SHN[i],x0+i*cw+cw/2,y0+hh/2,MUTED,Math.min(16,cw/4.6)); rect(x0+i*cw,y0+hh,cw,dh,null,LINE,1.5); }
  for(i=0;i<6;i++){ var mine=i>=shc&&i<shc+ds.length; if(mine) continue; if(a[i]&&!shOff) txt(a[i],x0+i*cw+cw/2,y0+hh+dh/2,MUTED,sz); }
  for(i=0;i<ds.length;i++) txt(''+ds[i],x0+(shc+i+shOff)*cw+cw/2,y0+hh+dh/2,HOT,sz);
  txt('.',x0+3*cw,y0+hh+dh*0.64,INK,sz);
  if(shLast){ var ay=y0+hh+dh+H*0.1, ax=W/2, d=shLast>0?-1:1; line(ax-50*d,ay,ax+50*d,ay,ACC,4); g.beginPath(); g.moveTo(ax+62*d,ay); g.lineTo(ax+46*d,ay-10); g.lineTo(ax+46*d,ay+10); g.closePath(); g.fillStyle=ACC; g.fill(); txt(shLast>0?'10배':'1/10',ax,ay+24,ACC,17); }
  txt(shStr(shc),W/2,H*0.09,INK,Math.min(34,W/14));
  $('say').innerHTML=(shLast?(shLast>0?'10배 → 왼쪽으로 한 칸: ':'1/10 → 오른쪽으로 한 칸: '):'지금 수: ')+'<b class="r">'+shStr(shc)+'</b>'+SM+'소수점은 그대로 있고 숫자가 자리를 옮겨요. 10배 하면 왼쪽으로, '+F(1,10)+' 하면 오른쪽으로 한 칸씩 가요.</small>'; }
function shGo(d){ var n=SH[shi].length, c=shc-d; if(c<0||c+n>6) return; shc=c; shLast=d; shOff=d; ui(); anim(function(){ return shOff; },function(v){ shOff=v; },0,600); }
function shUI(){ var n=SH[shi].length; $('top').innerHTML=chipsH(SH.map(function(x,i){ return [i,x.join('')]; }),shi,'i');
  $('ctl').innerHTML='<div class="row" style="justify-content:center;gap:14px"><button class="btn primary" id="shL"'+(shc<=0?' disabled':'')+' style="font-size:19px">◀ 10배</button><button class="btn primary" id="shR"'+(shc+n>=6?' disabled':'')+' style="font-size:19px">1/10 ▶</button></div>';
  $('shL').onclick=function(){ shGo(1); }; $('shR').onclick=function(){ shGo(-1); };
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ anStop(); shi=+b.dataset.i; shc=4-SH[shi].length; shOff=0; shLast=0; ui(); draw(); }; }); }

/* ───────── 7. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a, b, q;
  if(t===0){ if(rnd(2)){ a=ri(1,9)*10; b=ri(1,9)*10; } else { a=ri(11,89); b=ri(11,89); } q={lines:[D2(a)+' + '+D2(b)+' = ?'],ask:'계산해 보세요.',kind:'num',ans:(a+b)/100,show:D2(a+b),why:'같은 자리끼리 더해요. 0.01이 '+a+'개 + '+b+'개 = '+(a+b)+'개',hint:'소수점끼리 맞추어 세로로 써 보세요.'}; }
  else if(t===1){ if(rnd(2)){ a=ri(3,9)*10; b=ri(1,a/10-1)*10; } else { a=ri(30,99); b=ri(11,a-5); } q={lines:[D2(a)+' − '+D2(b)+' = ?'],ask:'계산해 보세요.',kind:'num',ans:(a-b)/100,show:D2(a-b),why:'같은 자리끼리 빼요. 0.01이 '+a+'개 − '+b+'개 = '+(a-b)+'개',hint:'소수점끼리 맞추어 세로로 써 보세요.'}; }
  else if(t===2){ do{ a=ri(1,9)*10+(rnd(2)?ri(1,9):0); b=ri(1,9)*10+(rnd(2)?ri(1,9):0); }while(a===b); var s=a>b?'>':'<'; q={lines:[D2(a)+'  ○  '+D2(b)],ask:'○ 안에 알맞은 기호는?',kind:'mc',opts:['&gt;','&lt;'],ans:a>b?'&gt;':'&lt;',show:D2(a)+' '+(a>b?'&gt;':'&lt;')+' '+D2(b),why:'소수 첫째 자리부터 차례로 비교해요. ('+(a/100).toFixed(2)+' , '+(b/100).toFixed(2)+')'}; }
  else if(t===3){ var ds=shuf([1,2,3,4,5,6,7,8,9]).slice(0,4), i=ri(0,3), u=[1,0.1,0.01,0.001], n=ds[0]+'.'+ds[1]+ds[2]+ds[3]; q={lines:[n],ask:'<b class="r">'+ds[i]+'</b>'+P(ds[i],'이','가')+' 나타내는 수는?',kind:'mc',opts:u.map(function(x){ return DD(ds[i]*x); }),ans:DD(ds[i]*u[i]),show:DD(ds[i]*u[i]),why:ds[i]+P(ds[i],'은','는')+' '+['일의 자리','소수 첫째 자리','소수 둘째 자리','소수 셋째 자리'][i]+' 숫자예요.'}; }
  else { a=ri(11,99); var up=rnd(2), base=pick([10,100]); q={lines:[DD(a/base)+(up?'의 10배':'의 1/10')],ask:'얼마일까요?',kind:'num',ans:up?a*10/base:a/(base*10),show:DD(up?a*10/base:a/(base*10)),why:up?'10배 하면 숫자가 왼쪽으로 한 칸씩 옮겨져요.':'1/10 하면 숫자가 오른쪽으로 한 칸씩 옮겨져요.',hint:'소수점은 그대로, 숫자가 한 칸 옮겨져요.'}; }
  q.unit=''; return q; });

function onTap(x,y){ if(tab!=='place') return; for(var i=0;i<pbox.length;i++){ var b=pbox[i]; if(x>=b[0]&&x<=b[0]+b[2]&&y>=b[1]&&y<=b[1]+b[3]){ psel=i; draw(); return; } } }
var UIS={two:twUI,place:plUI,cmp:cpUI,plus:plusUI,minus:minusUI,shift:shUI,quiz:quiz.ui}, DRS={two:twDraw,place:plDraw,cmp:cpDraw,plus:plusDraw,minus:minusDraw,shift:shDraw,quiz:quiz.draw};
function ui(){ if(tab!=='shift') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); shOff=0; tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
