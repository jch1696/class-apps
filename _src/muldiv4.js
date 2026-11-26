/* 곱셈과 나눗셈 (4학년 1학기): (세 자리 수)×(두 자리 수), (세 자리 수)÷(두 자리 수) */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
function sl(id,lab,min,max,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" value="'+val+'"><output>'+val+'</output></div>'; }
function sb(id,fn){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=this.value; draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
function btns(a){ return '<div class="row" style="justify-content:center;flex-wrap:wrap;gap:10px">'+a.map(function(b){ return '<button class="btn'+(b[2]?' primary':'')+'" id="'+b[0]+'"'+(b[3]?' disabled':'')+' style="font-size:18px">'+b[1]+'</button>'; }).join('')+'</div>'; }
/* 오른쪽 끝을 xr 에 맞추어 숫자를 한 칸씩 쓴다 */
function rnum(s,xr,y,sz,col,gray){ var cw=sz*0.62, n=s.length, i; for(i=0;i<n;i++) txt(s[i],xr-cw*(n-1-i)-cw/2,y,(gray&&i>=n-gray)?MUTED:col,sz); }

/* ───────── 1. 나누어 곱하기 ───────── */
var ma=243, mb=32;
function arDraw(){ var ap=[Math.floor(ma/100)*100,Math.floor(ma%100/10)*10,ma%10].filter(function(v){ return v; }), bp=[Math.floor(mb/10)*10,mb%10].filter(function(v){ return v; }),
    cwt=ap.map(function(v){ return v>=100?3:(v>=10?2.2:1.5); }), rwt=bp.map(function(v){ return v>=10?1.6:1; }), cs=cwt.reduce(function(a,b){ return a+b; },0), rs=rwt.reduce(function(a,b){ return a+b; },0),
    BW=Math.min(W-80,520), BH=H*0.6, x0=(W-BW)/2+24, y0=H*0.2, y=y0, sum=[];
  txt(ma+' × '+mb,W/2,H*0.07,INK,Math.min(30,W/15));
  bp.forEach(function(b,r){ var h=BH*rwt[r]/rs, x=x0; txt('× '+b,x0-8,y+h/2,HOT,Math.min(18,W/22),'right');
    ap.forEach(function(a,c){ var w=BW*cwt[c]/cs; rect(x,y,w,h,rgba(r?ORANGE:BLUE,0.85-c*0.22),INK,2); txt(''+a*b,x+w/2,y+h/2,INK,Math.min(24,w/3.4,h/1.8)); if(!r) txt(''+a,x+w/2,y0-13,ACC,Math.min(18,W/22)); sum.push(a*b); x+=w; }); y+=h; });
  $('say').innerHTML=ma+' × '+mb+' = <b class="r">'+ma*mb+'</b>'+SM+'자리별로 나누어 곱한 다음 모두 더해요.<br>'+sum.join(' + ')+' = '+ma*mb+'</small>'; }
function arUI(){ $('ctl').innerHTML='<div class="dims">'+sl('mA','곱해지는 수',100,999,ma)+sl('mB','곱하는 수',11,99,mb)+'</div>'+btns([['mR','🎲 다른 수']]); sb('mA',function(v){ ma=v; }); sb('mB',function(v){ mb=v; });
  $('mR').onclick=function(){ ma=ri(101,999); mb=ri(11,99); ms=0; ui(); draw(); }; }

/* ───────── 2. 곱셈 세로셈 ───────── */
var ms=0;
function vmDraw(){ var sz=Math.min(38,H/8.6), rh=sz*1.28, cw=sz*0.62, xr=W/2+cw*2.2, y=H*0.1, o=mb%10, t=Math.floor(mb/10), nx=xr+16;
  rnum(''+ma,xr,y,sz,INK); rnum(''+mb,xr,y+rh,sz,INK); txt('×',xr-cw*4.6,y+rh,INK,sz); line(xr-cw*5.4,y+rh*1.62,xr+6,y+rh*1.62,INK,2.5);
  if(ms>=1){ rnum(''+ma*o,xr,y+rh*2.3,sz,ACC); txt(ma+' × '+o,nx,y+rh*2.3,ACC,Math.min(15,W/26),'left'); }
  if(ms>=2){ rnum(''+ma*t*10,xr,y+rh*3.3,sz,HOT,1); txt(ma+' × '+t*10,nx,y+rh*3.3,HOT,Math.min(15,W/26),'left'); }
  if(ms>=3){ line(xr-cw*5.4,y+rh*3.95,xr+6,y+rh*3.95,INK,2.5); rnum(''+ma*mb,xr,y+rh*4.65,sz,INK); }
  $('say').innerHTML=[ma+' × '+mb+' 를 세로로 써요.','일의 자리부터: '+ma+' × '+o+' = <b class="r">'+ma*o+'</b>','십의 자리: '+ma+' × '+t*10+' = <b class="r">'+ma*t*10+'</b>'+SM+ma+' × '+t+' = '+ma*t+' 를 십의 자리부터 써요.</small>','두 곱을 더해요: <b class="r">'+ma*mb+'</b>'+SM+ma*o+' + '+ma*t*10+' = '+ma*mb+'</small>'][ms]; }
function vmUI(){ $('ctl').innerHTML=btns([['vN','다음 ▶',1,ms>=3],['v0','↩ 처음'],['vR','🎲 새 문제']]);
  $('vN').onclick=function(){ ms++; ui(); draw(); }; $('v0').onclick=function(){ ms=0; ui(); draw(); }; $('vR').onclick=function(){ ma=ri(101,999); mb=ri(11,99); ms=0; ui(); draw(); }; }

/* ───────── 3. 몇 번 덜어 낼까 ───────── */
var da=87, db=21;
function nlDraw(){ var q=Math.floor(da/db), r=da-q*db, BW=BWd()-20, x0=(W-BW)/2, y=H*0.66, X=function(v){ return x0+BW*v/da; }, i, ah=Math.min(H*0.3,BW*db/da*0.6+16);
  txt(da+' ÷ '+db+' = '+q+(r?' … '+r:''),W/2,H*0.1,INK,Math.min(32,W/14));
  line(x0,y,x0+BW,y,INK,3);
  for(i=0;i<q;i++){ var a=X(i*db), b=X((i+1)*db); g.beginPath(); g.moveTo(a,y); g.quadraticCurveTo((a+b)/2,y-ah*2,b,y); g.strokeStyle=rgba(BLUE,1); g.lineWidth=3.5; g.stroke(); if(q<=9) txt(''+(i+1),(a+b)/2,y-ah-12,ACC,Math.min(18,(b-a)/1.6+6)); }
  for(i=0;i<=q;i++){ line(X(i*db),y-7,X(i*db),y+7,INK,2); if(q<=6||i===0||i===q) txt(''+i*db,X(i*db),y+24,MUTED,14); }
  if(r){ line(X(q*db),y,X(da),y,HOT,8); txt('나머지 '+r,(X(q*db)+X(da))/2,y+48,HOT,16); } line(X(da),y-7,X(da),y+7,INK,2); txt(''+da,X(da),y-20,INK,15);
  $('say').innerHTML=db+'씩 <b class="r">'+q+'</b>번'+(r?', 나머지 <b class="r">'+r+'</b>':', 나누어떨어져요')+SM+'확인: '+db+' × '+q+(r?' + '+r:'')+' = '+da+'<br>나머지는 나누는 수보다 항상 작아요.</small>'; }
function nlUI(){ $('ctl').innerHTML='<div class="dims">'+sl('dA','나누어지는 수',20,199,da)+sl('dB','나누는 수',11,50,db)+'</div>'; sb('dA',function(v){ da=v; }); sb('dB',function(v){ db=v; }); }

/* ───────── 4. 나눗셈 세로셈 ───────── */
var la=736, lb=23, ls=0;
function ldSteps(){ var D=''+la, cur=0, st=[], i, on=false; for(i=0;i<D.length;i++){ var c=cur*10+(+D[i]); if(on||c>=lb||i===D.length-1){ on=true; var qd=Math.floor(c/lb); st.push({i:i,cur:c,qd:qd,prod:qd*lb,rem:c-qd*lb}); cur=c-qd*lb; } else cur=c; } return st; }
function ldDraw(){ var st=ldSteps(), D=''+la, n=D.length, sz=Math.min(34,H/(5.2+st.length*2.3)), rh=sz*1.2, cw=sz*0.62, xL=W/2-n*cw/2+cw*1.3, y0=H*0.09, y1=y0+rh*1.15, X=function(i){ return xL+(i+1)*cw; }, j;
  rnum(D,X(n-1),y1,sz,INK); rnum(''+lb,xL-14,y1,sz,INK); line(xL-8,y1-rh*0.56,X(n-1)+6,y1-rh*0.56,INK,2.5);
  g.beginPath(); g.moveTo(xL-8,y1-rh*0.56); g.quadraticCurveTo(xL+2,y1,xL-10,y1+rh*0.5); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  for(j=0;j<Math.min(ls,st.length);j++){ var s=st[j], yp=y1+(2*j+1)*rh, last=j===st.length-1, cur=j===ls-1;
    txt(''+s.qd,X(s.i)-cw/2,y0,cur?HOT:ACC,sz); rnum(''+s.prod,X(s.i),yp,sz,cur?HOT:INK); txt('−',X(s.i)-cw*(n+0.9),yp,MUTED,sz*0.8); line(xL-4,yp+rh*0.56,X(n-1)+6,yp+rh*0.56,INK,2);
    rnum(last?''+s.rem:''+(s.rem*10+(+D[s.i+1])),X(last?s.i:s.i+1),yp+rh,sz,last?HOT:INK); }
  var q=Math.floor(la/lb), r=la%lb, k=ls-1;
  $('say').innerHTML=ls===0?la+' ÷ '+lb+' 를 세로로 써요.':(ls>=st.length?la+' ÷ '+lb+' = <b class="r">'+q+(r?' … '+r:'')+'</b>'+SM+'확인: '+lb+' × '+q+(r?' + '+r:'')+' = '+la+'</small>':st[k].cur+' 안에 '+lb+P(lb,'이','가')+' <b class="r">'+st[k].qd+'</b>번'+SM+lb+' × '+st[k].qd+' = '+st[k].prod+', '+st[k].cur+' − '+st[k].prod+' = '+st[k].rem+'<br>다음 숫자 '+(''+la)[st[k].i+1]+P((''+la)[st[k].i+1],'을','를')+' 내려 써요.</small>'); }
function ldUI(){ var n=ldSteps().length; $('ctl').innerHTML=btns([['lN','다음 ▶',1,ls>=n],['l0','↩ 처음'],['lR','🎲 새 문제']])+'<div class="dims">'+sl('lA','나누어지는 수',100,999,la)+sl('lB','나누는 수',11,99,lb)+'</div>';
  $('lN').onclick=function(){ ls++; ui(); draw(); }; $('l0').onclick=function(){ ls=0; ui(); draw(); }; $('lR').onclick=function(){ lb=ri(11,49); la=ri(lb*10,Math.min(999,lb*40)); ls=0; ui(); draw(); };
  sb('lA',function(v){ la=v; ls=0; }); sb('lB',function(v){ lb=v; ls=0; }); }

/* ───────── 5. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a, b, q, r;
  if(t===0){ a=ri(11,99)*10; b=ri(2,9)*10; q={lines:[a+' × '+b+' = ?'],ask:'계산해 보세요.',ans:a*b,show:''+a*b,why:(a/10)+' × '+(b/10)+' = '+(a*b/100)+' 에 0을 두 개 붙여요.',hint:'0을 빼고 곱한 다음 0을 붙여요.'}; }
  else if(t===1){ a=ri(101,499); b=ri(11,39); q={lines:[a+' × '+b+' = ?'],ask:'계산해 보세요.',ans:a*b,show:''+a*b,why:a+' × '+(b%10)+' = '+a*(b%10)+', '+a+' × '+(b-b%10)+' = '+a*(b-b%10)+' 를 더해요.',hint:'일의 자리, 십의 자리 차례로 곱해 더해요.'}; }
  else if(t===2){ b=ri(12,49); q=ri(3,9); r=ri(0,b-1); a=b*q+r; q={lines:[a+' ÷ '+b],ask:'<b>몫</b>은 얼마일까요?',ans:q,show:''+q,why:b+' × '+q+' = '+b*q+(r?', 나머지 '+r:''),hint:b+'에 몇을 곱하면 '+a+'에 가까울까요?'}; }
  else if(t===3){ b=ri(12,49); q=ri(11,19); r=ri(1,b-1); a=b*q+r; if(a>999){ q=11; a=b*q+r; } q={lines:[a+' ÷ '+b],ask:'<b>나머지</b>는 얼마일까요?',ans:r,show:''+r,why:a+' ÷ '+b+' = '+q+' … '+r,hint:'나머지는 '+b+'보다 작아요.'}; }
  else { b=ri(12,39); q=ri(3,12); r=ri(1,b-1); q={lines:['□ ÷ '+b+' = '+q+' … '+r],ask:'□ 안에 알맞은 수는?',ans:b*q+r,show:''+(b*q+r),why:b+' × '+q+' + '+r+' = '+(b*q+r),hint:'(나누는 수) × (몫) + (나머지)'}; }
  q.kind='num'; q.unit=''; return q; });

var UIS={area:arUI,vmul:vmUI,nl:nlUI,ldiv:ldUI,quiz:quiz.ui}, DRS={area:arDraw,vmul:vmDraw,nl:nlDraw,ldiv:ldDraw,quiz:quiz.draw};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
