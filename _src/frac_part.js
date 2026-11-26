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
    $('say').innerHTML='<b class="r">'+F(dN,dD)+' = '+(k>1?F(dN+' × '+k,dD+' × '+k)+' = ':'')+F(dN*k,T)+' = '+s+'</b><small style="font-size:15.5px;color:var(--ink)">분모를 10, 100, 1000으로 만들면 분수를 소수로 나타낼 수 있어요. '+(k>1?'분모 '+dD+'에 '+J(k,'을','를')+' 곱하면 '+J(T,'이','가')+' 되므로 분자에도 '+J(k,'을','를')+' 곱해요. ':'')+F(1,T)+' = '+dcs(1,T)+'이므로 '+F(dN*k,T)+' = '+s+'예요.<br>분자를 분모로 나누어도 돼요: '+dN+' ÷ '+dD+' = '+s+'</small>'; }
  else if(dM==='d2f'){ var T2=dV%10===0?10:100, n=dV*T2/100, G=gcd(n,T2), s2=dcs(dV,100);
    ubars(l.x0,y1,l.BW,hh,1,T2,[[n,rgba(ORANGE,0.8)]],T2===100?10:0); lab([s2],y1+hh/2,HOT);
    ubars(l.x0,y2,l.BW,hh,1,T2/G,[[n/G,rgba(BLUE,0.8)]]); lab([{n:n/G,d:T2/G}],y2+hh/2,ACC); nl01(y3,dV/100,s2);
    $('say').innerHTML='<b class="r">'+s2+' = '+F(n,T2)+(G>1?' = '+F(n/G,T2/G):'')+'</b><small style="font-size:15.5px;color:var(--ink)">'+J(s2,'은','는')+' '+dcs(1,T2)+'이 '+n+'개인 수예요. '+dcs(1,T2)+' = '+F(1,T2)+'이므로 '+s2+' = '+F(n,T2)+'예요. '+(G>1?'분모와 분자를 최대공약수 '+G+Pr(G)+' 나누어 약분하면 '+F(n/G,T2/G)+'예요.':'더 약분할 수 없는 기약분수예요.')+'<br>소수 한 자리 수는 분모가 10인 분수로, 소수 두 자리 수는 분모가 100인 분수로 나타내요.</small>'; }
  else { if(!dc) dcNew(); var ds=dcs(dc.dv,100), fs=dcs(dc.fv,100), sz=Math.min(46,W/11);
    cexpr([{n:dc.n,d:dc.d},dc.done?dc.ans:'○',ds],W/2,H*0.3,sz,INK);
    if(dc.done){ txt('소수로 맞추면:  '+fs+'  '+dc.ans+'  '+ds,W/2,H*0.3+sz*2.1,ACC,Math.min(22,W/18)); var G2=gcd(dc.dv,100); cexpr(['분수로 맞추면: ',{n:dc.fv,d:100},dc.ans,{n:dc.dv,d:100}],W/2,H*0.3+sz*3.6,Math.min(22,W/18),HOT); }
    $('say').innerHTML=dc.done?((dc.pick===dc.ans?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'<b>'+F(dc.n,dc.d)+' '+dc.ans+' '+ds+'</b><small style="font-size:15.5px;color:var(--ink)">분수를 소수로 바꾸면 '+F(dc.n,dc.d)+' = '+fs+'이에요. 소수끼리 비교하면 '+fs+' '+dc.ans+' '+ds+'. 소수를 분수로 바꾸어 분모가 100인 분수끼리 비교해도 결과는 같아요.</small>'):
      ('분수와 소수의 크기를 비교해 보세요. ○ 안에 알맞은 기호는 무엇일까요?<small>분수를 소수로 바꾸거나, 소수를 분수로 바꾸어 같은 꼴로 만들면 비교할 수 있어요.</small>'); } }
function decUI(){ $('top').innerHTML=chipsH([['f2d','분수를 소수로'],['d2f','소수를 분수로'],['cmp','크기 비교하기']],dM,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ dM=b.dataset.k; ui(); draw(); }; });
  if(dM==='f2d'){ $('ctl').innerHTML=chipsH([2,4,5,8,10,20,25,50].map(function(d){ return [''+d,'분모 '+d]; }),''+dD,'d','margin-top:8px')+'<div class="dims">'+sld('dN','분자',1,dD-1,Math.min(dN,dD-1))+'</div>';
    $('ctl').querySelectorAll('[data-d]').forEach(function(b){ b.onclick=function(){ dD=+b.dataset.d; dN=Math.max(1,Math.min(dN,dD-1)); ui(); draw(); }; }); sldBind('dN',function(v){ dN=v; }); }
  else if(dM==='d2f'){ $('ctl').innerHTML='<div class="dims">'+sld('dV','0.01의 개수',1,99,dV)+'</div>'; sldBind('dV',function(v){ dV=v; }); }
  else { if(!dc) dcNew(); $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+['>','=','<'].map(function(o){ return '<button class="btn'+(dc.done?(o===dc.ans?' primary':''):' primary')+'" data-o="'+o+'"'+(dc.done?' disabled':'')+' style="min-width:64px;font-size:22px">'+o.replace('<','&lt;').replace('>','&gt;')+'</button>'; }).join('')+(dc.done?'<button class="btn" id="dcNext">다음 문제 ▶</button>':'')+scoreH(dcScore)+'</div>';
    $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ dc.done=true; dc.pick=b.dataset.o; dcScore[1]++; if(dc.pick===dc.ans) dcScore[0]++; ui(); draw(); }; });
    if($('dcNext')) $('dcNext').onclick=function(){ dcNew(); ui(); draw(); }; } }

