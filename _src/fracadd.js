/* 약분과 통분, 분수의 덧셈과 뺄셈 (5학년 1학기) */
/* 단위 막대 여러 개: 한 단위 너비 uw, L등분, segs=[[칸 수, 색, 지움]] 을 이어서 칠함, major=굵은 눈금 수 */
function ubars(x0,y,uw,hh,nu,L,segs,major){ var cw=uw/L, gap=8, k=0, u, i;
  segs.forEach(function(s){ for(i=0;i<s[0];i++){ var X=x0+Math.floor(k/L)*(uw+gap)+(k%L)*cw; rect(X,y,cw,hh,s[1]); if(s[2]) line(X+1,y+hh-1,X+cw-1,y+1,HOT,1.6); k++; } });
  for(u=0;u<nu;u++){ var ux=x0+u*(uw+gap); if(cw>=5) for(i=1;i<L;i++) line(ux+i*cw,y,ux+i*cw,y+hh,INK,0.8); if(major) for(i=1;i<major;i++) line(ux+i*uw/major,y-4,ux+i*uw/major,y+hh+4,INK,2.2); rect(ux,y,uw,hh,null,INK,2.4); } }
function lay2(){ var BW=BWd()-76; return {BW:BW,x0:(W-BW)/2+38}; }
function lab(tk,y,col){ var l=lay2(); cexpr(tk,l.x0-40,y,20,col); }

/* ───────── 1. 크기가 같은 분수 ───────── */
var en=2, ed=3, ek=2;
function eqDraw(){ en=Math.min(en,ed); var l=lay2(), hh=56, y1=40, y2=y1+hh+50;
  ubars(l.x0,y1,l.BW,hh,1,ed,[[en,rgba(BLUE,0.8)]]); lab([{n:en,d:ed}],y1+hh/2,ACC);
  ubars(l.x0,y2,l.BW,hh,1,ed*ek,[[en*ek,rgba(ORANGE,0.8)]],ed); lab([{n:en*ek,d:ed*ek}],y2+hh/2,HOT);
  line(l.x0+en/ed*l.BW,y1-8,l.x0+en/ed*l.BW,y2+hh+8,HOT,2,[6,5]);
  $('say').innerHTML=ek===1?('전체를 '+ed+'로 나눈 것 중의 '+en+'이에요. 한 칸을 더 잘게 나누면 분수는 어떻게 될까요?<small>[곱하는 수]를 움직여 보세요.</small>'):
    ('한 칸을 '+ek+'칸씩으로 나누었어요. 색칠한 부분의 크기는 그대로예요. <b class="r">'+F(en,ed)+' = '+F(en+' × '+ek,ed+' × '+ek)+' = '+F(en*ek,ed*ek)+'</b><small style="font-size:15.5px;color:var(--ink)">분모와 분자에 0이 아닌 같은 수를 곱하면 크기가 같은 분수가 돼요. 거꾸로 분모와 분자를 0이 아닌 같은 수로 나누어도 크기가 같아요.</small>'); }
function eqUI(){ $('ctl').innerHTML='<div class="dims">'+sld('eD','분모',2,8,ed)+sld('eN','분자',1,ed,en)+sld('eK','곱하는 수',1,6,ek)+'</div>';
  sldBind('eD',function(v){ ed=v; en=Math.min(en,ed); }); sldBind('eN',function(v){ en=v; }); sldBind('eK',function(v){ ek=v; }); }

/* ───────── 2. 약분 ───────── */
var rd=null, rdc=1;
function rdNew(){ var b, a, k; do{ b=ri(2,7); a=ri(1,b-1); }while(gcd(a,b)>1); do{ k=pick([2,3,4,6,8,9,12]); }while(b*k>60); rd={n:a*k,d:b*k,g:k}; rdc=1; }
function ri(a,b){ return a+rnd(b-a+1); }
function divs(n){ var o=[]; for(var i=1;i<=n;i++) if(n%i===0) o.push(i); return o; }
function rdDraw(){ if(!rd) rdNew(); var l=lay2(), hh=56, y1=40, y2=y1+hh+50;
  ubars(l.x0,y1,l.BW,hh,1,rd.d,[[rd.n,rgba(BLUE,0.8)]]); lab([{n:rd.n,d:rd.d}],y1+hh/2,ACC);
  ubars(l.x0,y2,l.BW,hh,1,rd.d/rdc,[[rd.n/rdc,rgba(ORANGE,0.8)]]); lab([{n:rd.n/rdc,d:rd.d/rdc}],y2+hh/2,HOT);
  $('say').innerHTML=rdc===1?(J(rd.n,'과','와')+' '+rd.d+'의 공약수는 '+divs(rd.g).join(', ')+P(rd.g,'이에요','예요')+'. 분모와 분자를 공약수로 나누어 간단한 분수로 만들어 보세요.<small>분모와 분자를 공약수로 나누어 간단히 하는 것을 <b>약분</b>한다고 해요. 아래에서 나눌 수를 골라 보세요.</small>'):
    ('분모와 분자를 '+rdc+Pr(rdc)+' 나누었어요. <b class="r">'+F(rd.n,rd.d)+' = '+F(rd.n+' ÷ '+rdc,rd.d+' ÷ '+rdc)+' = '+F(rd.n/rdc,rd.d/rdc)+'</b><small style="font-size:15.5px;color:var(--ink)">'+(rdc===rd.g?'분모와 분자의 공약수가 1뿐이라 더 약분할 수 없어요. 이런 분수를 <b>기약분수</b>라고 해요. 최대공약수 '+rd.g+Pr(rd.g)+' 나누면 한 번에 기약분수가 돼요.':'아직 더 약분할 수 있어요. '+J(rd.n/rdc,'과','와')+' '+(rd.d/rdc)+'의 공약수가 1 말고도 있어요.')+'</small>'); }
function rdUI(){ if(!rd) rdNew(); $('ctl').innerHTML='<div class="chips" style="margin-top:8px">'+divs(rd.g).map(function(c){ return '<button class="chip" aria-pressed="'+(c===rdc)+'" data-c="'+c+'">'+(c===1?'나누지 않기':c+Pr(c)+' 나누기')+'</button>'; }).join('')+'</div><div class="row"><button class="btn" id="rdNew">다른 분수</button></div>';
  $('ctl').querySelectorAll('[data-c]').forEach(function(b){ b.onclick=function(){ rdc=+b.dataset.c; rdUI(); draw(); }; }); $('rdNew').onclick=function(){ rdNew(); rdUI(); draw(); }; }

/* ───────── 3. 통분 ───────── */
var ca=1, cb=2, cc=2, cd=3, cm='mul';
function comDraw(){ ca=Math.min(ca,cb); cc=Math.min(cc,cd); var l=lay2(), hh=56, y1=40, y2=y1+hh+50, L=cm==='mul'?cb*cd:lcm(cb,cd), A=ca*L/cb, C=cc*L/cd;
  ubars(l.x0,y1,l.BW,hh,1,L,[[A,rgba(BLUE,0.8)]],cb); lab([{n:A,d:L}],y1+hh/2,ACC);
  ubars(l.x0,y2,l.BW,hh,1,L,[[C,rgba(ORANGE,0.8)]],cd); lab([{n:C,d:L}],y2+hh/2,HOT);
  var cmp=A>C?'>':(A<C?'<':'=');
  $('say').innerHTML='두 막대를 똑같이 '+L+'칸으로 나누었어요. <b class="r">'+F(ca,cb)+' = '+F(A,L)+'</b>, <b class="r">'+F(cc,cd)+' = '+F(C,L)+'</b><small style="font-size:15.5px;color:var(--ink)">분수의 분모를 같게 하는 것을 <b>통분</b>한다고 하고, 통분한 분모를 <b>공통분모</b>라고 해요. '+(cm==='mul'?'두 분모의 곱 '+cb+' × '+cd+' = '+J(L,'을','를')+' 공통분모로 했어요.':'두 분모의 최소공배수 '+J(L,'을','를')+' 공통분모로 했어요.')+(cb*cd===lcm(cb,cd)?'':' 최소공배수로 통분하면 수가 작아서 계산하기 편해요.')+'<br>통분하면 크기를 비교할 수 있어요: '+F(ca,cb)+' '+cmp+' '+F(cc,cd)+'</small>'; }
function comUI(){ $('top').innerHTML='<div class="chips">'+[['mul','두 분모의 곱으로 통분'],['lcm','최소공배수로 통분']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===cm)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML='<div class="dims">'+sld('cB','앞 분모',2,9,cb)+sld('cA','앞 분자',1,cb,ca)+sld('cD','뒤 분모',2,9,cd)+sld('cC','뒤 분자',1,cd,cc)+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ cm=b.dataset.k; comUI(); draw(); }; });
  sldBind('cB',function(v){ cb=v; ca=Math.min(ca,cb); }); sldBind('cA',function(v){ ca=v; }); sldBind('cD',function(v){ cd=v; cc=Math.min(cc,cd); }); sldBind('cC',function(v){ cc=v; }); }

/* ───────── 4·5. 덧셈과 뺄셈 ───────── */
var AS={add:{w1:0,a:1,b:2,w2:0,c:1,d:3,s:0},sub:{w1:1,a:1,b:4,w2:0,c:2,d:3,s:0}};
function asDraw(){ var o=AS[tab], add=tab==='add'; o.a=Math.min(o.a,o.b-1)||1; o.c=Math.min(o.c,o.d-1)||1; var L=lcm(o.b,o.d), a2=o.a*L/o.b, c2=o.c*L/o.d, A=o.w1*L+a2, C=o.w2*L+c2, R=add?A+C:A-C, ok=add||R>=0;
  var l=lay2(), nu=Math.max(1,Math.ceil(A/L),Math.ceil(C/L),o.s>=2&&add?Math.ceil(R/L):1), uw=(l.BW-8*(nu-1))/nu, hh=Math.min(44,(H-70)/3-22), y1=26, y2=y1+hh+30, y3=y2+hh+34, cells=o.s>=1?L:0;
  var t1={w:o.w1,n:o.s>=1?a2:o.a,d:o.s>=1?L:o.b}, t2={w:o.w2,n:o.s>=1?c2:o.c,d:o.s>=1?L:o.d};
  if(cells){ ubars(l.x0,y1,uw,hh,Math.max(1,Math.ceil(A/L)),L,(o.s>=2&&!add&&ok)?[[A-C,rgba(BLUE,0.8)],[C,rgba(GRAY,0.5),1]]:[[A,rgba(BLUE,0.8)]],o.b); ubars(l.x0,y2,uw,hh,Math.max(1,Math.ceil(C/L)),L,[[C,rgba(ORANGE,0.8)]],o.d); }
  else { var d1=function(y,w,n,d,col){ var segs=[], k; for(k=0;k<w;k++) segs.push([d,col]); segs.push([n,col]); ubars(l.x0,y,uw,hh,Math.max(1,w+1-(n?0:1)),d,segs); }; d1(y1,o.w1,o.a,o.b,rgba(BLUE,0.8)); d1(y2,o.w2,o.c,o.d,rgba(ORANGE,0.8)); }
  lab([t1],y1+hh/2,ACC); lab([(add?'+':'−')],y2+hh/2-hh*0.9+4,INK); lab([t2],y2+hh/2,HOT);
  if(o.s>=2&&ok){ line(l.x0-70,y3-14,l.x0+l.BW,y3-14,INK,2); if(add) ubars(l.x0,y3,uw,hh,Math.max(1,Math.ceil(R/L)),L,[[A,rgba(BLUE,0.8)],[C,rgba(ORANGE,0.8)]]); else ubars(l.x0,y3,uw,hh,Math.max(1,Math.ceil(R/L)),L,[[R,rgba(BLUE,0.8)]]);
    var rw=Math.floor(R/L), rn=R-rw*L; lab([rn?{w:rw,n:rn,d:L}:(''+rw)],y3+hh/2,INK); }
  var P1=MXH(o.w1,o.a,o.b), P2=MXH(o.w2,o.c,o.d), Q1=MXH(o.w1,a2,L), Q2=MXH(o.w2,c2,L), op=add?' + ':' − ', mixed=o.w1||o.w2, res=MX(R,L), raw=MXH(Math.floor(R/L),R%L,L), how='';
  if(ok&&o.s>=2){ if(add){ how=mixed?('자연수는 자연수끼리, 분수는 분수끼리 더해요. ('+o.w1+' + '+o.w2+') + '+F(a2+' + '+c2,L)+' = '+(o.w1+o.w2)+' + '+F(a2+c2,L)+(a2+c2>=L?' 이고, '+F(a2+c2,L)+' = '+MXH(1,a2+c2-L,L)+'이므로 자연수로 1을 받아올림해요.':'')):('분모는 그대로 두고 분자끼리 더해요. '+F(a2+' + '+c2,L)+' = '+F(a2+c2,L)+(a2+c2>=L?' 이고, 가분수는 대분수로 바꿔요.':'')); }
    else { how=mixed?(a2<c2?('분수 부분 '+F(a2,L)+'에서 '+F(c2,L)+P(c2,'을','를')+' 뺄 수 없으므로 자연수에서 1을 받아내림해요. '+Q1+' = '+MXH(o.w1-1,a2+L,L)+'로 바꾸고 자연수끼리, 분수끼리 빼요.'):'자연수는 자연수끼리, 분수는 분수끼리 빼요. ('+o.w1+' − '+o.w2+') + '+F(a2+' − '+c2,L)):('분모는 그대로 두고 분자끼리 빼요. '+F(a2+' − '+c2,L)+' = '+F(a2-c2,L)); } }
  $('say').innerHTML=!ok?('앞의 수가 뒤의 수보다 작아서 뺄 수 없어요.<small>앞의 수를 더 크게 바꿔 보세요.</small>'):
    (o.s===0?(P1+op+P2+P(o.c,'은','는')+' 어떻게 계산할까요?<small>'+(o.b===o.d?'분모가 같으면 바로 계산할 수 있어요.':'분모가 다르면 한 칸의 크기가 달라서 바로 계산할 수 없어요.')+' [다음 ▶]을 눌러 보세요.</small>'):
    (o.s===1?(o.b===o.d?'분모가 같아서 통분하지 않아도 돼요.':('먼저 <b class="r">통분</b>해요. 공통분모는 '+J(o.b,'과','와')+' '+o.d+'의 최소공배수 '+J(L,'이에요','예요')+'. '+P1+' = '+Q1+', '+P2+' = '+Q2)):
      ('<b class="r">'+P1+op+P2+' = '+Q1+op+Q2+' = '+(raw!==res?raw+' = ':'')+res+'</b><small style="font-size:15.5px;color:var(--ink)">'+how+(raw!==res?' 마지막에 약분해서 기약분수로 나타내요.':'')+'</small>'))); }
function asUI(){ var o=AS[tab]; $('top').innerHTML='';
  $('ctl').innerHTML='<div class="dims">'+sld('s1','앞: 자연수',0,2,o.w1)+sld('s2','앞: 분모',2,8,o.b)+sld('s3','앞: 분자',1,o.b-1,Math.min(o.a,o.b-1))+sld('s4','뒤: 자연수',0,2,o.w2)+sld('s5','뒤: 분모',2,8,o.d)+sld('s6','뒤: 분자',1,o.d-1,Math.min(o.c,o.d-1))+'</div><div class="row"><button class="btn" id="sPrev">◀ 이전</button><button class="btn primary" id="sNext">다음 ▶</button><span class="score">'+(o.s+1)+' / 3단계</span></div>';
  [['s1','w1'],['s2','b'],['s3','a'],['s4','w2'],['s5','d'],['s6','c']].forEach(function(k){ sldBind(k[0],function(v){ o[k[1]]=v; o.a=Math.max(1,Math.min(o.a,o.b-1)); o.c=Math.max(1,Math.min(o.c,o.d-1)); o.s=0; }); });
  $('sPrev').onclick=function(){ o.s=Math.max(0,o.s-1); asUI(); draw(); }; $('sNext').onclick=function(){ o.s=Math.min(2,o.s+1); asUI(); draw(); }; }

/* ───────── 크기 비교 ───────── */
var pa=2, pb=3, pc=3, pd=4, ps=0;
function cpDraw(){ pa=Math.min(pa,pb); pc=Math.min(pc,pd); var l=lay2(), hh=56, y1=40, y2=y1+hh+56, L=lcm(pb,pd), A=pa*L/pb, C=pc*L/pd, sg=A>C?'>':(A<C?'<':'='), same=pb===pd;
  if(ps){ ubars(l.x0,y1,l.BW,hh,1,L,[[A,rgba(BLUE,0.8)]],pb); ubars(l.x0,y2,l.BW,hh,1,L,[[C,rgba(ORANGE,0.8)]],pd); }
  else { ubars(l.x0,y1,l.BW,hh,1,pb,[[pa,rgba(BLUE,0.8)]]); ubars(l.x0,y2,l.BW,hh,1,pd,[[pc,rgba(ORANGE,0.8)]]); }
  lab([{n:ps?A:pa,d:ps?L:pb}],y1+hh/2,ACC); lab([{n:ps?C:pc,d:ps?L:pd}],y2+hh/2,HOT);
  line(l.x0+pa/pb*l.BW,y1-8,l.x0+pa/pb*l.BW,y2+hh+8,ACC,2,[6,5]); line(l.x0+pc/pd*l.BW,y1-8,l.x0+pc/pd*l.BW,y2+hh+8,HOT,2,[6,5]);
  if(ps) txt(sg,l.x0-40,(y1+y2+hh)/2,INK,28);
  var b=$('cpGo'); if(b) b.textContent=ps?'◀ 되돌리기':'▶ 통분해서 비교하기';
  $('say').innerHTML=!ps?(F(pa,pb)+KP(''+pb,'과','와')+' '+F(pc,pd)+' 가운데 어느 분수가 더 클까요?<small>'+(same?'분모가 같으면 한 칸의 크기가 같아서 분자만 비교하면 돼요.':'분모가 다르면 한 칸의 크기가 달라서 분자만 보고는 비교할 수 없어요.')+' [통분해서 비교하기]를 눌러 보세요.</small>'):
    ((same?'분모가 같으므로 분자 '+J(A,'과','와')+' '+J(C,'을','를')+' 비교해요. ':'통분하면 '+F(pa,pb)+' = '+F(A,L)+', '+F(pc,pd)+' = '+F(C,L)+'이에요. 분자 '+J(A,'과','와')+' '+J(C,'을','를')+' 비교해요. ')+'<b class="r">'+F(pa,pb)+' '+sg+' '+F(pc,pd)+'</b><small style="font-size:15.5px;color:var(--ink)">분모가 다른 분수는 통분하여 분모를 같게 한 다음 분자의 크기를 비교해요.'+(pa===pc&&!same?' 분자가 같을 때는 분모가 작은 분수가 더 커요. 한 칸이 더 크기 때문이에요.':'')+' 세 분수를 비교할 때는 두 분수씩 차례로 비교해요.</small>'); }
function cpUI(){ $('ctl').innerHTML='<div class="dims">'+sld('pB','앞 분모',2,9,pb)+sld('pA','앞 분자',1,pb,Math.min(pa,pb))+sld('pD','뒤 분모',2,9,pd)+sld('pC','뒤 분자',1,pd,Math.min(pc,pd))+'</div><div class="row"><button class="btn primary" id="cpGo">▶ 통분해서 비교하기</button></div>';
  sldBind('pB',function(v){ pb=v; pa=Math.min(pa,pb); ps=0; }); sldBind('pA',function(v){ pa=v; ps=0; }); sldBind('pD',function(v){ pd=v; pc=Math.min(pc,pd); ps=0; }); sldBind('pC',function(v){ pc=v; ps=0; });
  $('cpGo').onclick=function(){ ps=ps?0:1; draw(); }; }

/* ───────── 분수와 소수 ───────── */
var dM='f2d', dD=4, dN=3, dV=36, dc=null, dcScore=[0,0];
function T10(d){ return 10%d===0?10:(100%d===0?100:1000); }
function dcs(n,T){ return (n/T).toFixed(3).replace(/0+$/,'').replace(/\.$/,''); }
function nl01(y,v,labt){ var l=lay2(), X=function(t){ return l.x0+t*l.BW; }, i; line(X(0),y,X(1),y,INK,2); for(i=0;i<=10;i++){ line(X(i/10),y-(i%5?5:9),X(i/10),y+(i%5?5:9),INK,1.5); txt(i===0?'0':(i===10?'1':'0.'+i),X(i/10),y+22,MUTED,i%5?11:14); }
  g.beginPath(); g.arc(X(v),y,7,0,7); g.fillStyle=HOT; g.fill(); txt(labt,X(v),y-20,HOT,17); }
function dcNew(){ var d=pick([2,4,5,10,20,25]), n=ri(1,d-1), fv=n*100/d, dv; do{ dv=fv+pick([-10,-5,-2,0,0,2,5,10]); }while(dv<1||dv>99); dc={n:n,d:d,fv:fv,dv:dv,ans:fv>dv?'>':(fv<dv?'<':'='),done:false,pick:''}; }
function decDraw(){ var l=lay2(), hh=Math.min(50,(H-150)/2), y1=30, y2=y1+hh+38, y3=y2+hh+52;
  if(dM==='f2d'){ dN=Math.max(1,Math.min(dN,dD-1)); var T=T10(dD), k=T/dD, s=dcs(dN,dD);
    ubars(l.x0,y1,l.BW,hh,1,dD,[[dN,rgba(BLUE,0.8)]]); lab([{n:dN,d:dD}],y1+hh/2,ACC);
    ubars(l.x0,y2,l.BW,hh,1,T,[[dN*k,rgba(ORANGE,0.8)]],10); lab([s],y2+hh/2,HOT); nl01(y3,dN/dD,s);
    $('say').innerHTML='<b class="r">'+F(dN,dD)+' = '+(k>1?F(dN+' × '+k,dD+' × '+k)+' = ':'')+F(dN*k,T)+' = '+s+'</b><small style="font-size:15.5px;color:var(--ink)">분모를 10, 100, 1000으로 만들면 분수를 소수로 나타낼 수 있어요. '+(k>1?'분모 '+dD+'에 '+J(k,'을','를')+' 곱하면 '+J(T,'이','가')+' 되므로 분자에도 '+J(k,'을','를')+' 곱해요. ':'')+F(1,T)+' = '+dcs(1,T)+'이므로 '+F(dN*k,T)+' = '+s+P(s,'이에요','예요')+'.<br>분자를 분모로 나누어도 돼요: '+dN+' ÷ '+dD+' = '+s+'</small>'; }
  else if(dM==='d2f'){ var T2=dV%10===0?10:100, n=dV*T2/100, G=gcd(n,T2), s2=dcs(dV,100);
    ubars(l.x0,y1,l.BW,hh,1,T2,[[n,rgba(ORANGE,0.8)]],T2===100?10:0); lab([s2],y1+hh/2,HOT);
    ubars(l.x0,y2,l.BW,hh,1,T2/G,[[n/G,rgba(BLUE,0.8)]]); lab([{n:n/G,d:T2/G}],y2+hh/2,ACC); nl01(y3,dV/100,s2);
    $('say').innerHTML='<b class="r">'+s2+' = '+F(n,T2)+(G>1?' = '+F(n/G,T2/G):'')+'</b><small style="font-size:15.5px;color:var(--ink)">'+J(s2,'은','는')+' '+dcs(1,T2)+'이 '+n+'개인 수예요. '+dcs(1,T2)+' = '+F(1,T2)+'이므로 '+s2+' = '+F(n,T2)+P(n,'이에요','예요')+'. '+(G>1?'분모와 분자를 최대공약수 '+G+Pr(G)+' 나누어 약분하면 '+F(n/G,T2/G)+P(n/G,'이에요','예요')+'.':'더 약분할 수 없는 기약분수예요.')+'<br>소수 한 자리 수는 분모가 10인 분수로, 소수 두 자리 수는 분모가 100인 분수로 나타내요.</small>'; }
  else { if(!dc) dcNew(); var ds=dcs(dc.dv,100), fs=dcs(dc.fv,100), sz=Math.min(46,W/11);
    cexpr([{n:dc.n,d:dc.d},dc.done?dc.ans:'○',ds],W/2,H*0.3,sz,INK);
    if(dc.done){ txt('소수로 맞추면:  '+fs+'  '+dc.ans+'  '+ds,W/2,H*0.3+sz*2.1,ACC,Math.min(22,W/18)); var G2=gcd(dc.dv,100); cexpr(['분수로 맞추면: ',{n:dc.fv,d:100},dc.ans,{n:dc.dv,d:100}],W/2,H*0.3+sz*3.6,Math.min(22,W/18),HOT); }
    $('say').innerHTML=dc.done?((dc.pick===dc.ans?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'<b>'+F(dc.n,dc.d)+' '+dc.ans+' '+ds+'</b><small style="font-size:15.5px;color:var(--ink)">분수를 소수로 바꾸면 '+F(dc.n,dc.d)+' = '+fs+P(fs,'이에요','예요')+'. 소수끼리 비교하면 '+fs+' '+dc.ans+' '+ds+'. 소수를 분수로 바꾸어 분모가 100인 분수끼리 비교해도 결과는 같아요.</small>'):
      ('분수와 소수의 크기를 비교해 보세요. ○ 안에 알맞은 기호는 무엇일까요?<small>분수를 소수로 바꾸거나, 소수를 분수로 바꾸어 같은 꼴로 만들면 비교할 수 있어요.</small>'); } }
function decUI(){ $('top').innerHTML=chipsH([['f2d','분수를 소수로'],['d2f','소수를 분수로'],['cmp','크기 비교하기']],dM,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ dM=b.dataset.k; ui(); draw(); }; });
  if(dM==='f2d'){ $('ctl').innerHTML=chipsH([2,4,5,8,10,20,25,50].map(function(d){ return [''+d,'분모 '+d]; }),''+dD,'d','margin-top:8px')+'<div class="dims">'+sld('dN','분자',1,dD-1,Math.min(dN,dD-1))+'</div>';
    $('ctl').querySelectorAll('[data-d]').forEach(function(b){ b.onclick=function(){ dD=+b.dataset.d; dN=Math.max(1,Math.min(dN,dD-1)); ui(); draw(); }; }); sldBind('dN',function(v){ dN=v; }); }
  else if(dM==='d2f'){ $('ctl').innerHTML='<div class="dims">'+sld('dV','0.01의 개수',1,99,dV)+'</div>'; sldBind('dV',function(v){ dV=v; }); }
  else { if(!dc) dcNew(); $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+['>','=','<'].map(function(o){ return '<button class="btn'+(dc.done?(o===dc.ans?' primary':''):' primary')+'" data-o="'+o+'"'+(dc.done?' disabled':'')+' style="min-width:64px;font-size:22px">'+o.replace('<','&lt;').replace('>','&gt;')+'</button>'; }).join('')+(dc.done?'<button class="btn" id="dcNext">다음 문제 ▶</button>':'')+scoreH(dcScore)+'</div>';
    $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ dc.done=true; dc.pick=b.dataset.o; dcScore[1]++; if(dc.pick===dc.ans) dcScore[0]++; ui(); draw(); }; });
    if($('dcNext')) $('dcNext').onclick=function(){ dcNew(); ui(); draw(); }; } }

/* ───────── 문제 풀기 ───────── */
var qz=null, qzScore=[0,0];
function prop(dmax){ var d, n; do{ d=2+rnd(dmax-1); n=1+rnd(d-1); }while(gcd(n,d)>1); return {n:n,d:d}; }
function qzNew(){ var t=rnd(8), q={done:false,tries:0,exact:false,kind:'fr'}, a, b, w1, w2, k, L;
  if(t===0){ a=prop(7); k=pick([2,3,4,5,6]); q.tk=[{n:a.n*k,d:a.d*k}]; q.n=a.n; q.d=a.d; q.exact=true; q.ask='기약분수로 나타내 보세요.'; q.why='분모와 분자를 최대공약수 '+k+Pr(k)+' 나누면 '+F(a.n,a.d); }
  else if(t===5){ do{ a=prop(9); b=prop(9); }while(a.d===b.d); L=lcm(a.d,b.d); var A5=a.n*L/a.d, C5=b.n*L/b.d; q.kind='cmp'; q.tk=[{n:a.n,d:a.d},'○',{n:b.n,d:b.d}]; q.ans=A5>C5?'>':'<'; q.ask='두 분수의 크기를 비교하여 ○ 안에 알맞은 기호를 골라 보세요.'; q.hint='두 분모의 최소공배수로 통분한 다음 분자를 비교해요.';
    q.show=F(a.n,a.d)+' '+q.ans+' '+F(b.n,b.d); q.why='통분하면 '+F(a.n,a.d)+' = '+F(A5,L)+', '+F(b.n,b.d)+' = '+F(C5,L)+'이에요. 분자를 비교하면 '+A5+' '+q.ans+' '+C5+'.'; }
  else if(t===6){ var d6=pick([2,4,5,8,20,25,50]), n6; do{ n6=ri(1,d6-1); }while(gcd(n6,d6)>1); var T6=T10(d6), k6=T6/d6; q.kind='dec'; q.tk=[{n:n6,d:d6}]; q.ans=n6/d6; q.show=dcs(n6,d6); q.ask='분수를 소수로 나타내 보세요.'; q.hint='분모를 '+T6+Pr(T6)+' 만들어요. 분모와 분자에 '+J(k6,'을','를')+' 곱해요.';
    q.why='분모와 분자에 '+J(k6,'을','를')+' 곱하면 '+F(n6*k6,T6)+' = '+q.show; }
  else if(t===7){ var v7; do{ v7=ri(2,98); }while(gcd(v7,100)===1); var T7=v7%10===0?10:100, n7=v7*T7/100, G7=gcd(n7,T7), s7=dcs(v7,100); q.tk=[s7]; q.n=n7/G7; q.d=T7/G7; q.exact=true; q.ask='소수를 기약분수로 나타내 보세요.'; q.why=s7+' = '+F(n7,T7)+'이고, 분모와 분자를 최대공약수 '+G7+Pr(G7)+' 나누면 '+F(q.n,q.d); }
  else { do{ a=prop(8); b=prop(8); }while(a.d===b.d); w1=t>=3?ri(1,3):0; w2=t>=3?ri(0,2):0; L=lcm(a.d,b.d); var A=(w1*a.d+a.n)*L/a.d, C=(w2*b.d+b.n)*L/b.d, add=(t===1||t===3);
    if(!add&&A<C){ var x=a; a=b; b=x; x=w1; w1=w2; w2=x; x=A; A=C; C=x; } if(!add&&A===C){ w1++; A+=L; }
    q.tk=[{w:w1,n:a.n,d:a.d},add?'+':'−',{w:w2,n:b.n,d:b.d}]; q.n=add?A+C:A-C; q.d=L; q.ask='계산해 보세요.'; q.why='통분하면 '+MXH(w1,a.n*L/a.d,L)+(add?' + ':' − ')+MXH(w2,b.n*L/b.d,L)+' = '+MX(q.n,q.d); }
  qz=q; }
function qzDraw(){ if(!qz) qzNew(); var q=qz, SM='<small style="font-size:15.5px;color:var(--ink)">';
  cexpr(q.kind==='cmp'?(q.done?[q.tk[0],q.ans,q.tk[2]]:q.tk):q.tk.concat(['=',q.done&&q.kind==='dec'?q.show:'?']),W/2,H/2,Math.min(50,W/12));
  if(q.kind==='fr'){ $('say').innerHTML=q.done?('<b class="r">정답이에요!</b> 답: '+MX(q.n,q.d)+SM+q.why+'</small>'):
    (q.ask+(q.tries>=2?SM+'도움말: '+(q.exact?'분모와 분자의 공약수로 나누어요.':'먼저 두 분모의 최소공배수로 통분해요.')+'</small>':'<small>자연수 칸은 대분수일 때만 써요. 답이 자연수이면 자연수 칸에만 쓰면 돼요.</small>')); return; }
  $('say').innerHTML=q.done?((q.right?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'답: '+q.show+SM+q.why+'</small>'):(q.ask+(q.tries>=2||q.kind==='cmp'?SM+'도움말: '+q.hint+'</small>':'')); }
function qzUI(msg,cls){ if(!qz) qzNew(); var q=qz, h; $('top').innerHTML='';
  if(q.kind==='cmp') h=['>','<'].map(function(o){ return '<button class="btn'+(q.done?(o===q.ans?' primary':''):' primary')+'" data-o="'+o+'"'+(q.done?' disabled':'')+' style="min-width:64px;font-size:22px">'+o.replace('<','&lt;').replace('>','&gt;')+'</button>'; }).join('');
  else h='<span>답 = '+(q.kind==='dec'?'<input type="number" class="wide" id="qD" inputmode="decimal" step="any">':frIn('q',true))+'</span>'+(q.done?'':'<button class="btn primary" id="qGo">확인하기</button>');
  $('ctl').innerHTML='<div class="row" style="margin-top:8px;font-size:17px">'+h+'<button class="btn'+(q.done?' primary':'')+'" id="qNext">'+(q.done?'다음 문제 ▶':'건너뛰기')+'</button>'+scoreH(qzScore)+'</div><p class="msg '+(cls||'')+'" id="qMsg">'+(msg||'')+'</p>';
  if(q.kind==='cmp'){ if(!q.done) $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ q.done=true; q.right=b.dataset.o===q.ans; qzScore[1]++; if(q.right) qzScore[0]++; qzUI(); draw(); }; }); }
  else if(q.kind==='dec'){ if(q.done){ $('qD').value=q.show; $('qD').className='wide ok'; $('qD').disabled=true; }
    else { $('qGo').onclick=function(){ var m=$('qMsg'), v=$('qD').value; if(v===''){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
        if(Math.abs(+v-q.ans)<1e-9){ if(q.tries===0) qzScore[0]++; qzScore[1]++; q.done=true; q.right=true; qzUI(); draw(); } else { q.tries++; m.className='msg bad'; m.textContent='다시 생각해 보세요.'; draw(); } };
      $('qD').onkeydown=function(e){ if(e.key==='Enter') $('qGo').click(); }; } }
  else { if(q.done) frShow('q',q.n,q.d);
    if(!q.done) $('qGo').onclick=function(){ var v=frVal('q'), m=$('qMsg'); if(!v){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
      var same=v.n*q.d===q.n*v.d, simp=gcd(v.n,v.d)===1||v.d===1;
      if(same&&(simp||!q.exact)){ if(q.tries===0) qzScore[0]++; qzScore[1]++; q.done=true; qzUI(simp?'':'맞았어요. 기약분수로도 나타내 보세요.','ok'); draw(); }
      else { q.tries++; m.className='msg bad'; m.textContent=same?'크기는 같지만 아직 더 약분할 수 있어요.':'다시 계산해 보세요.'; draw(); } }; }
  $('qNext').onclick=function(){ if(!qz.done) qzScore[1]++; qzNew(); qzUI(); draw(); }; }

var UIS={eq:eqUI,red:rdUI,com:comUI,cmp:cpUI,add:asUI,sub:asUI,dec:decUI,quiz:qzUI}, DRS={eq:eqDraw,red:rdDraw,com:comDraw,cmp:cpDraw,add:asDraw,sub:asDraw,dec:decDraw,quiz:qzDraw};
function ui(){ if(tab!=='com') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
