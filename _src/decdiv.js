/* 소수의 나눗셈 (6학년 1·2학기). 소수는 (정수, 소수 자리 수)로 다뤄 오차를 피한다 */
function D(i,p){ var s=(i/Math.pow(10,p)).toFixed(p); if(p>0) s=s.replace(/0+$/,'').replace(/\.$/,''); return s; }
function ri(a,b){ return a+rnd(b-a+1); }

/* ───────── 1. 소수점 옮기기 ───────── */
var SHT=[['a','소수 ÷ 자연수'],['b','자릿수가 같은 소수'],['c','자릿수가 다른 소수'],['d','자연수 ÷ 소수']], shK='b', sh=null, shS=0;
function shNew(){ var q, B, A, p, o={k:shK};
  if(shK==='a'){ B=ri(2,8); q=ri(11,49); p=ri(1,2); A=q*B; o.x=D(A,p); o.y=''+B; o.x2=''+A; o.y2=''+B; o.q2=''+q; o.q=D(q,p); o.m=p===1?'10':'100'; }
  else if(shK==='b'){ p=ri(1,2); do{ B=ri(2,15); }while(B%10===0); q=ri(2,12); A=B*q; o.x=D(A,p); o.y=D(B,p); o.x2=''+A; o.y2=''+B; o.q=o.q2=''+q; o.m=p===1?'10':'100'; o.u=p===1?'0.1':'0.01'; o.A=A; o.B=B; }
  else if(shK==='c'){ do{ B=ri(12,48); }while(B%10===0); do{ q=ri(12,45); }while(q%10===0||(B*q)%10===0); A=B*q; o.x=D(A,2); o.y=D(B,1); o.x2=D(A,1); o.y2=''+B; o.q=o.q2=D(q,1); o.m='10'; }
  else { do{ B=pick([4,5,8,12,15,25,6,24]); q=ri(2,12); }while((B*q)%10!==0); A=B*q/10; o.x=''+A; o.y=D(B,1); o.x2=''+(A*10); o.y2=''+B; o.q=o.q2=''+q; o.m='10'; }
  sh=o; shS=0; }
function shDraw(){ if(!sh) shNew(); var sz=Math.min(40,W/13), xa=W*0.24, xo=W*0.41, xb=W*0.56, xe=W*0.71, xq=W*0.86, y1=60, y2=y1+Math.min(150,H*0.4), y3=y2+70;
  txt(sh.x,xa,y1,INK,sz); txt('÷',xo,y1,INK,sz); txt(sh.y,xb,y1,INK,sz); txt('=',xe,y1,INK,sz); txt(shS?sh.q:'?',xq,y1,shS?HOT:MUTED,sz);
  if(shS){ var ar=function(x,lab){ line(x,y1+sz*0.7,x,y2-sz*0.8,ACC,2.5); g.beginPath(); g.moveTo(x-7,y2-sz*0.8-9); g.lineTo(x,y2-sz*0.8); g.lineTo(x+7,y2-sz*0.8-9); g.strokeStyle=ACC; g.lineWidth=2.5; g.stroke(); txt(lab,x+12,(y1+y2)/2,ACC,17,'left'); };
    ar(xa,sh.m+'배'); if(sh.k!=='a') ar(xb,sh.m+'배');
    txt(sh.x2,xa,y2,INK,sz); txt('÷',xo,y2,INK,sz); txt(sh.y2,xb,y2,INK,sz); txt('=',xe,y2,INK,sz); txt(sh.q2,xq,y2,INK,sz);
    if(sh.k==='a'){ line(xq,y2-sz*0.7,xq,y1+sz*0.8,HOT,2.5); g.beginPath(); g.moveTo(xq-7,y1+sz*0.8+9); g.lineTo(xq,y1+sz*0.8); g.lineTo(xq+7,y1+sz*0.8+9); g.strokeStyle=HOT; g.lineWidth=2.5; g.stroke(); txt('1/'+sh.m+'배',xq-12,(y1+y2)/2,HOT,17,'right'); } }
  var same='나누는 수와 나누어지는 수에 같은 수를 곱해도 몫은 변하지 않아요.';
  $('say').innerHTML=!shS?(sh.x+' ÷ '+J(sh.y,'은','는')+' 어떻게 계산할까요?<small>자연수의 나눗셈으로 바꾸어 생각해 보세요.</small>'):
    (sh.k==='a'?(sh.x+'의 '+sh.m+'배인 '+sh.x2+Pr(sh.x2)+' 계산하면 '+sh.x2+' ÷ '+sh.y+' = '+J(sh.q2,'이에요','예요')+'. 나누어지는 수가 '+F(1,sh.m)+'배가 되면 몫도 '+F(1,sh.m)+'배가 되므로 <b class="r">'+sh.x+' ÷ '+sh.y+' = '+sh.q+'</b><small style="font-size:15.5px;color:var(--ink)">몫의 소수점은 나누어지는 수의 소수점 위치에 맞추어 찍어요.</small>'):
    (sh.k==='b'?(J(sh.x,'은','는')+' '+sh.u+'이 '+sh.A+'개, '+J(sh.y,'은','는')+' '+sh.u+'이 '+sh.B+'개예요. 그래서 '+sh.A+' ÷ '+J(sh.B,'과','와')+' 같아요. <b class="r">'+sh.x+' ÷ '+sh.y+' = '+sh.q+'</b><small style="font-size:15.5px;color:var(--ink)">'+same+' 두 수의 소수점을 똑같이 오른쪽으로 옮기면 돼요.</small>'):
    (sh.k==='c'?('나누는 수가 자연수가 되도록 두 수를 똑같이 10배 해요. '+sh.x2+' ÷ '+sh.y2+' = '+sh.q2+'이므로 <b class="r">'+sh.x+' ÷ '+sh.y+' = '+sh.q+'</b><small style="font-size:15.5px;color:var(--ink)">'+same+' 나누는 수를 자연수로 만드는 만큼만 소수점을 옮겨요.</small>'):
      ('나누는 수가 자연수가 되도록 두 수를 똑같이 10배 해요. '+sh.x2+' ÷ '+sh.y2+' = '+sh.q2+'이므로 <b class="r">'+sh.x+' ÷ '+sh.y+' = '+sh.q+'</b><small style="font-size:15.5px;color:var(--ink)">'+same+' 자연수도 10배 하면 끝에 0이 하나 붙어요.</small>')))); }
function shUI(){ if(!sh) shNew(); $('top').innerHTML='<div class="chips">'+SHT.map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===shK)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="shGo">'+(shS?'◀ 되돌리기':'▶ 자연수의 나눗셈으로 바꾸기')+'</button><button class="btn" id="shNew">다른 문제</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ shK=b.dataset.k; shNew(); shUI(); draw(); }; });
  $('shGo').onclick=function(){ shS=shS?0:1; shUI(); draw(); }; $('shNew').onclick=function(){ shNew(); shUI(); draw(); }; }

/* ───────── 2. 세로셈 ───────── */
var LGT=[['i','소수 ÷ 자연수'],['ii','소수 ÷ 소수'],['iii','자연수 ÷ 자연수 (몫이 소수)']], lgK='i', lg=null, lgS=0;
function lgNew(){ var B, q, p, A, o={k:lgK,pre:''};
  if(lgK==='i'){ B=pick([2,3,4,5,6,7,8,9,12,15]); p=ri(1,2); do{ q=ri(12,320); }while(q%10===0||B*q>9999); A=B*q; o.title=D(A,p)+' ÷ '+B; o.ans=D(q,p); }
  else if(lgK==='ii'){ do{ B=pick([3,4,6,7,8,12,14,15,16,18,24,25,32,36]); }while(false); p=ri(0,1); do{ q=ri(12,96); }while(q%10===0||B*q>9999); A=B*q; o.title=D(A,p+1)+' ÷ '+D(B,1); o.ans=D(q,p); o.pre='나누는 수가 자연수가 되도록 두 수의 소수점을 오른쪽으로 한 자리씩 옮기면 <b>'+D(A,p)+' ÷ '+B+'</b>'+P(B,'이','가')+' 돼요. '; }
  else { B=pick([2,4,5,8,16,20,25]); do{ A=ri(1,B*12); }while(A%B===0); p=0; o.title=A+' ÷ '+B; }
  var ds=(''+A); while(ds.length<=p) ds='0'+ds; var n=ds.length, st=[], rem=0, i=0; o.n0=n;
  while(i<ds.length||(rem!==0&&i<n+4)){ if(i>=ds.length) ds+='0'; var cur=rem*10+(+ds[i]), qd=Math.floor(cur/B); st.push({i:i,cur:cur,qd:qd,prod:qd*B,rem:cur-qd*B}); rem=cur-qd*B; i++; }
  o.ds=ds; o.B=B; o.st=st; o.one=n-p-1; o.first=o.one; for(i=0;i<st.length;i++) if(st[i].qd>0){ o.first=Math.min(o.one,i); break; }
  if(lgK==='iii'){ var qs=st.map(function(s){ return s.qd; }).join(''); o.ans=D(+qs,st.length-1-o.one); }
  lg=o; lgS=0; }
function lgDraw(){ if(!lg) lgNew(); var o=lg, vis=o.st.filter(function(s,k){ return k<lgS&&s.qd>0; }).length, rows=2+o.st.filter(function(s){ return s.qd>0; }).length*2, rh=Math.min(34,(H-40)/rows), sz=rh*0.78, cw=sz*0.95, n=o.ds.length, xL=W/2-(n*cw)/2+cw*0.8, y0=22+rh/2, X=function(c){ return xL+c*cw+cw/2; };
  var put=function(s,c,y,col){ s=''+s; for(var k=0;k<s.length;k++) txt(s[k],X(c-s.length+1+k),y,col,sz); }, dotAt=function(y,col){ if(o.one<n-1||o.ds.length>o.n0){ g.beginPath(); g.arc(xL+(o.one+1)*cw,y+sz*0.32,sz*0.09,0,7); g.fillStyle=col; g.fill(); } };
  txt(''+o.B,xL-cw*0.45,y0+rh,INK,sz,'right'); g.beginPath(); g.arc(xL-cw*0.55,y0+rh,rh*0.55,-1.05,1.05); g.strokeStyle=INK; g.lineWidth=2.2; g.stroke(); line(xL-cw*0.28,y0+rh*0.5,xL+n*cw+4,y0+rh*0.5,INK,2.2);
  for(var c=0;c<n;c++){ if(c>=o.n0&&c>=lgS) continue; txt(o.ds[c],X(c),y0+rh,c>=o.n0?MUTED:INK,sz); }
  if(o.one<o.n0-1||lgS>o.n0) dotAt(y0+rh,INK);
  var y=y0+rh*2, any=false;
  o.st.forEach(function(s,k){ if(k>=lgS) return; if(s.i>=o.first){ txt(''+s.qd,X(s.i),y0,HOT,sz); any=true; } if(s.i===o.one&&s.i<n-1&&k<lgS) dotAt(y0,HOT);
    if(s.qd>0){ put(s.prod,s.i,y,INK); line(X(s.i-(''+s.cur).length+1)-cw/2-2,y+rh*0.5,X(s.i)+cw/2+2,y+rh*0.5,INK,1.8); var nx=o.st[k+1]; if(nx&&k+1<=lgS-0){ put(nx.cur===0?'0':nx.cur,s.i+1,y+rh,ACC); if(s.rem===0&&nx.cur<10&&nx.cur>0){ } } else put(s.rem,s.i,y+rh,ACC); y+=rh*2; } });
  var s=lgS>0?o.st[lgS-1]:null, end=lgS>=o.st.length;
  $('say').innerHTML=!s?('<b>'+o.title+'</b>'+P(o.title,'을','를')+' 세로로 계산해 봐요.<small style="font-size:15.5px;color:var(--ink)">'+o.pre+'[다음 ▶]을 누르면 한 단계씩 진행돼요.</small>'):
    ((s.qd>0?(s.cur+' 안에 '+J(o.B,'이','가')+' <b class="r">'+s.qd+'번</b> 들어가요. 몫에 '+J(s.qd,'을','를')+' 쓰고 '+o.B+' × '+s.qd+' = '+J(s.prod,'을','를')+' 빼면 '+J(s.rem,'이','가')+' 남아요.'):(s.cur+' 안에는 '+J(o.B,'이','가')+' 들어가지 않아요. '+(s.i>=o.first?'몫에 0을 쓰고 ':'')+'다음 자리의 수와 함께 봐요.'))+
     (s.i>=o.n0?' 나누어떨어지지 않으면 0을 내려서 계속 계산해요.':'')+(s.i===o.one&&s.i<n-1?'<small style="font-size:15.5px;color:var(--ink)">다음부터는 소수 부분이에요. 몫의 소수점은 나누어지는 수의 소수점 위치에 맞추어 찍어요.</small>':'')+
     (end?'<small style="font-size:15.5px;color:var(--ink)">나머지가 0이 되었어요. <b class="r">'+o.title+' = '+o.ans+'</b></small>':'')); }
function lgUI(){ if(!lg) lgNew(); $('top').innerHTML='<div class="chips">'+LGT.map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===lgK)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn" id="lgPrev">◀ 이전</button><button class="btn primary" id="lgNext">다음 ▶</button><button class="btn" id="lgAll">끝까지</button><button class="btn" id="lgNew">다른 문제</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ lgK=b.dataset.k; lgNew(); lgUI(); draw(); }; });
  $('lgPrev').onclick=function(){ lgS=Math.max(0,lgS-1); draw(); }; $('lgNext').onclick=function(){ lgS=Math.min(lg.st.length,lgS+1); draw(); };
  $('lgAll').onclick=function(){ lgS=lg.st.length; draw(); }; $('lgNew').onclick=function(){ lgNew(); draw(); }; }

/* ───────── 3. 어림하기 ───────── */
var es=null, esScore=[0,0];
function esNew(){ var B, q; do{ B=ri(12,95); }while(B%10===0); do{ q=ri(12,98); }while(q%10===0||(B*q)%10===0); var A=B*q;
  es={x:D(A,2),y:D(B,1),ans:D(q,1),opts:shuf([D(q,0),D(q,1),D(q,2)]),ra:Math.round(A/100),rb:Math.round(B/10),done:false,pick:''}; }
function esDraw(){ if(!es) esNew(); var sz=Math.min(44,W/12); txt(es.x+' ÷ '+es.y+' = '+(es.done?es.ans:'?'),W/2,H*0.32,INK,sz);
  if(es.done){ txt('어림: 약 '+es.ra+' ÷ '+es.rb+' → 약 '+D(Math.round(es.ra/es.rb*10),1),W/2,H*0.32+sz*1.7,ACC,sz*0.6); }
  $('say').innerHTML=es.done?((es.pick===es.ans?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+es.x+' ÷ '+es.y+' = '+es.ans+'<small style="font-size:15.5px;color:var(--ink)">'+J(es.x,'을','를')+' 약 '+es.ra+', '+J(es.y,'을','를')+' 약 '+es.rb+Pr(es.rb)+' 어림하면 몫은 약 '+D(Math.round(es.ra/es.rb*10),1)+'쯤이에요. 그래서 소수점은 '+es.ans+'의 자리에 찍어야 해요.</small>'):
    '몫의 소수점은 어디에 찍어야 할까요? 계산하지 말고 <b>어림</b>해서 골라 보세요.<small>두 수를 가까운 자연수로 바꾸어 생각하면 몫의 크기를 짐작할 수 있어요.</small>'; }
function esUI(){ if(!es) esNew(); $('top').innerHTML='';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+es.opts.map(function(o){ return '<button class="btn'+(es.done?(o===es.ans?' primary':''):' primary')+'" data-o="'+o+'"'+(es.done?' disabled':'')+' style="min-width:84px;font-size:19px">'+o+'</button>'; }).join('')+(es.done?'<button class="btn" id="esNext">다음 문제 ▶</button>':'')+scoreH(esScore)+'</div>';
  $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ es.done=true; es.pick=b.dataset.o; esScore[1]++; if(es.pick===es.ans) esScore[0]++; esUI(); draw(); }; });
  if($('esNext')) $('esNext').onclick=function(){ esNew(); esUI(); draw(); }; }

/* ───────── 4. 몫과 나머지 ───────── */
var rmK='cut', rc=null, rcN=0, rr=null, rrP=1;
function rcNew(){ var c=ri(2,6), q=ri(2,6), r; do{ r=ri(1,c*10-1); }while(r%10===0&&Math.random()<0.7); rc={c:c,q:q,r:r,L:c*q*10+r}; rcN=0; }
function rrNew(){ var B=pick([3,6,7,9,11,13]), A; do{ A=ri(11,199); }while((A*100)%B===0||A%B===0); var pa=rnd(2); rr={x:D(A,pa),y:''+B,Q:Math.floor(A*1000/(B*Math.pow(10,pa)))}; }
function rmDraw(){ if(rmK==='cut'){ if(!rc) rcNew(); var BW=BWd(), x0=(W-BW)/2, y=H*0.3, hh=56, u=BW/(rc.L/10), i;
    rect(x0,y,BW,hh,rgba(GRAY,0.35)); for(i=0;i<rc.q&&i<rcN;i++){ rect(x0+i*rc.c*u,y,rc.c*u,hh,rgba(i%2?GREEN:BLUE,0.85)); txt(rc.c+'m',x0+(i+0.5)*rc.c*u,y+hh/2,INK,16); txt((i+1)+'명',x0+(i+0.5)*rc.c*u,y-16,MUTED,14); }
    for(i=1;i<=rc.q&&i<=rcN;i++) line(x0+i*rc.c*u,y,x0+i*rc.c*u,y+hh,INK,2);
    if(rcN>=rc.q){ rect(x0+rc.q*rc.c*u,y,BW-rc.q*rc.c*u,hh,rgba(ORANGE,0.85)); txt(D(rc.r,1)+'m',x0+rc.q*rc.c*u+(BW-rc.q*rc.c*u)/2,y+hh+18,HOT,16); txt('남는 리본',x0+rc.q*rc.c*u+(BW-rc.q*rc.c*u)/2,y-16,HOT,14); }
    rect(x0,y,BW,hh,null,INK,2.4); txt('리본 '+D(rc.L,1)+'m',W/2,y+hh+52,INK,18);
    var b=$('rcGo'); if(b&&!anT) b.textContent=rcN>=rc.q?'◀ 되돌리기':'▶ 나누어 주기';
    $('say').innerHTML=rcN<rc.q?('리본 '+D(rc.L,1)+'m를 한 사람에게 '+rc.c+'m씩 나누어 주려고 해요. 몇 명에게 줄 수 있고, 몇 m가 남을까요?<small>▶ 나누어 주기를 눌러 보세요.</small>'):
      ('<b class="r">'+rc.q+'명</b>에게 나누어 줄 수 있고, <b class="r">'+D(rc.r,1)+'m</b>가 남아요.<small style="font-size:15.5px;color:var(--ink)">'+D(rc.L,1)+' ÷ '+rc.c+'의 몫을 자연수까지만 구하면 몫은 '+rc.q+', 나머지는 '+J(D(rc.r,1),'이에요','예요')+'. 사람 수는 소수가 될 수 없기 때문이에요.<br>확인: '+rc.c+' × '+rc.q+' + '+D(rc.r,1)+' = '+D(rc.L,1)+'</small>'); }
  else { if(!rr) rrNew(); var s=''+rr.Q; while(s.length<4) s='0'+s; var ip=s.slice(0,-3), fp=s.slice(-3), sz=Math.min(52,W/10), str=ip+'.'+fp+'…', tot=tw(str,sz), x=W/2-tot/2, yy=H*0.42, look=ip.length+1+rrP, k;
    txt(rr.x+' ÷ '+rr.y+' =',W/2,yy-sz*1.5,INK,sz*0.6);
    for(k=0;k<str.length;k++){ var cwid=tw(str[k],sz), idx=k; if(idx===look) rect(x-3,yy-sz*0.62,cwid+6,sz*1.24,rgba(ORANGE,0.55),HOT,2); txt(str[k],x+cwid/2,yy,(k>look)?MUTED:INK,sz); x+=cwid; }
    var dg=+fp[rrP], base=Math.floor(rr.Q/Math.pow(10,3-rrP))+(dg>=5?1:0), res=(base/Math.pow(10,rrP)).toFixed(rrP), nm=['일의 자리','소수 첫째 자리','소수 둘째 자리'], nx=['소수 첫째 자리','소수 둘째 자리','소수 셋째 자리'];
    txt('약 '+res,W/2,yy+sz*1.6,HOT,sz*0.8);
    $('say').innerHTML='몫이 나누어떨어지지 않고 계속 이어져요. 몫을 반올림하여 <b>'+nm[rrP]+'까지</b> 나타내면 <b class="r">'+res+'</b>'+P(res,'이에요','예요')+'.<small style="font-size:15.5px;color:var(--ink)">'+nm[rrP]+'까지 나타내려면 바로 아래 자리인 '+nx[rrP]+' 숫자를 봐요. 그 숫자가 '+dg+'이므로 '+(dg>=5?'올려요 (5, 6, 7, 8, 9이면 올림).':'버려요 (0, 1, 2, 3, 4이면 버림).')+'</small>'; } }
function rmUI(){ $('top').innerHTML='<div class="chips">'+[['cut','나누어 주고 남는 양'],['round','몫을 반올림하기']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===rmK)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML=rmK==='cut'?'<div class="row" style="margin-top:8px"><button class="btn primary" id="rcGo">▶ 나누어 주기</button><button class="btn" id="rcNew">다른 문제</button></div>':
    '<div class="chips" style="margin-top:8px">'+['일의 자리까지','소수 첫째 자리까지','소수 둘째 자리까지'].map(function(s,i){ return '<button class="chip" aria-pressed="'+(i===rrP)+'" data-p="'+i+'">'+s+'</button>'; }).join('')+'</div><div class="row"><button class="btn" id="rrNew">다른 문제</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ anStop(); rmK=b.dataset.k; rmUI(); draw(); }; });
  if(rmK==='cut'){ $('rcNew').onclick=function(){ anStop(); rcNew(); draw(); };
    $('rcGo').onclick=function(){ anStop(); if(rcN>=rc.q){ rcN=0; draw(); return; } rcN=0; var t0=performance.now(); (function step(now){ rcN=Math.min(rc.q,Math.floor((now-t0)/500)+1); if(rcN<rc.q){ anT=requestAnimationFrame(step); draw(); } else { anT=null; draw(); } })(t0); }; }
  else { $('ctl').querySelectorAll('[data-p]').forEach(function(b){ b.onclick=function(){ rrP=+b.dataset.p; rmUI(); draw(); }; }); $('rrNew').onclick=function(){ rrNew(); draw(); }; } }

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

var UIS={shift:shUI,long:lgUI,est:esUI,rem:rmUI,nn:nnUI}, DRS={shift:shDraw,long:lgDraw,est:esDraw,rem:rmDraw,nn:nnDraw};
function ui(){ UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
