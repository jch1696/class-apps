/* 자연수의 혼합 계산 (5학년 1학기). 식은 토큰 배열로 다룬다: 수, '+', '−', '×', '÷', '(', ')' */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
var CN=['①','②','③','④','⑤','⑥'], ON={'+':'덧셈','−':'뺄셈','×':'곱셈','÷':'나눗셈'};
function isOp(t){ return t==='+'||t==='−'||t==='×'||t==='÷'; }
function mxStr(tk){ return tk.join(' ').replace(/\( /g,'(').replace(/ \)/g,')'); }
function parse(s){ return s.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ').map(function(t){ return /^\d+$/.test(t)?+t:t; }); }
/* 다음에 계산할 곳 찾기 */
function mxStep(tk){ var lo=0, hi=tk.length-1, par=false, o=tk.lastIndexOf('('), i, k=-1, as=false, md=false;
  if(o>=0){ lo=o+1; hi=tk.indexOf(')',o)-1; par=true; }
  for(i=lo;i<=hi;i++){ if(tk[i]==='×'||tk[i]==='÷'){ md=true; if(k<0) k=i; } if(tk[i]==='+'||tk[i]==='−') as=true; }
  if(k<0) for(i=lo;i<=hi;i++) if(tk[i]==='+'||tk[i]==='−'){ k=i; break; }
  if(k<0) return null;
  var a=tk[k-1], b=tk[k+1], op=tk[k], r=op==='+'?a+b:(op==='−'?a-b:(op==='×'?a*b:a/b)), n=tk.slice(0,k-1).concat([r],tk.slice(k+2)), whole=par&&hi-lo===2;
  if(whole) n.splice(o,3,r);
  var m=(op==='×'||op==='÷'), cnt=0; for(i=lo;i<=hi;i++) if(isOp(tk[i])) cnt++;
  var why=(par?'( ) 안을 가장 먼저 계산해요. ':'')+(cnt<=1?'':(m&&as?'곱셈과 나눗셈을 덧셈과 뺄셈보다 먼저 계산해요.':(m?'곱셈과 나눗셈은 앞에서부터 차례로 계산해요.':'덧셈과 뺄셈은 앞에서부터 차례로 계산해요.'))); if(!why) why='마지막으로 남은 계산을 해요.';
  return {tk:tk,k:k,a:a,b:b,op:op,r:r,after:n,from:whole?o:k-1,to:whole?hi+1:k+1,par:par,why:why,ok:r>=0&&r===Math.floor(r)&&r<=999&&!(op==='÷'&&b===0)}; }
function mxRun(tk){ var st=[], cur=tk, s; while((s=mxStep(cur))){ if(!s.ok) return null; st.push(s); cur=s.after; } return {tk:tk,steps:st,res:cur[0]}; }
/* 괄호와 순서를 무시하고 앞에서부터 계산한 값 */
function naive(tk){ var f=tk.filter(function(t){ return t!=='('&&t!==')'; }), v=f[0], i; for(i=1;i<f.length;i+=2){ var b=f[i+1], op=f[i]; v=op==='+'?v+b:(op==='−'?v-b:(op==='×'?v*b:v/b)); } return v; }
var TP={as:['a + b − c','a − b + c','a − (b + c)','a − (b − c)'],
  md:['a × b ÷ c','a ÷ b × c','a ÷ (b × c)'],
  mix:['a + b × c','a − b × c','a + b ÷ c','a − b ÷ c + d','a × b − c ÷ d','a + b × c − d','a + b ÷ c × d','a − b + c × d'],
  par:['(a + b) × c','a × (b − c) + d','a ÷ (b + c) × d','a + (b − c) × d','a − (b + c) ÷ d','(a − b) ÷ c + d × e']};
function mxGen(kind){ var t=pick(TP[kind]), n, r, tk; for(n=0;n<30000;n++){ tk=parse(t.replace(/[a-e]/g,function(){ return Math.random()<0.3?ri(10,48):ri(2,12); })); r=mxRun(tk); if(!r||r.res<1) continue;
    if(t.indexOf('(')>=0){ var np=mxRunBig(tk.filter(function(x){ return x!=='('&&x!==')'; })); if(np&&np.res===r.res) continue; } else if(kind==='mix'&&naive(tk)===r.res) continue; var nums=tk.filter(function(x){ return typeof x==='number'; }); if(nums.some(function(x,i){ return nums.indexOf(x)!==i; })) continue; return r; }
  return mxRun(parse('2 + 3 × 4')); }
function tkW(tk,sz){ return tk.reduce(function(s,t){ return s+(typeof t==='number'?tw(''+t,sz)+sz*0.4:(isOp(t)?sz*1.05:sz*0.42)); },0); }
/* 토큰 그리기. hl={from,to,col,badge} 밑줄, circ=연산 기호에 동그라미. 각 토큰의 가운데 x 배열을 돌려줌 */
function drawTk(tk,cx,y,sz,hl,circ){ var x=cx-tkW(tk,sz)/2, pos=[], x1=0, x2=0;
  tk.forEach(function(t,i){ var w=typeof t==='number'?tw(''+t,sz)+sz*0.4:(isOp(t)?sz*1.05:sz*0.42), on=hl&&i>=hl.from&&i<=hl.to; if(hl&&i===hl.from) x1=x; if(hl&&i===hl.to) x2=x+w;
    if(circ&&isOp(t)){ g.beginPath(); g.arc(x+w/2,y,sz*0.5,0,7); g.fillStyle=rgba(BLUE,0.35); g.fill(); g.strokeStyle=ACC; g.lineWidth=2; g.stroke(); }
    txt(''+t,x+w/2,y,on?hl.col:INK,sz); pos.push(x+w/2); x+=w; });
  if(hl){ line(x1+3,y+sz*0.72,x2-3,y+sz*0.72,hl.col,3); if(hl.badge) txt(hl.badge,(x1+x2)/2,y+sz*1.12,hl.col,sz*0.5); }
  return pos; }
/* 계산 과정 그리기: upto 단계까지 */
function drawSteps(R,upto,yT,yB){ var n=R.steps.length+1, rh=Math.min(64,(yB-yT)/n), sz=Math.min(34,rh*0.5), j; while(tkW(R.tk,sz)>W-70&&sz>12) sz--;
  for(j=0;j<=upto;j++){ var tk=j?R.steps[j-1].after:R.tk, y=yT+rh*j+rh*0.4, s=R.steps[j], hl=s?{from:s.from,to:s.to,col:j===upto?HOT:ACC,badge:CN[j]}:null;
    if(j) txt('=',W/2-tkW(tk,sz)/2-sz*0.7,y,MUTED,sz); if(!s){ txt(''+tk[0],W/2,y,HOT,sz*1.15); } else drawTk(tk,W/2,y,sz,hl); } }

/* ───────── 1. 계산 순서 ───────── */
var odK='mix', od=null, odS=0;
function odDraw(){ if(!od){ od=mxGen(odK); odS=0; } var n=od.steps.length, s=odS?od.steps[odS-1]:null, nx=od.steps[odS];
  drawSteps(od,odS,14,H-8);
  $('say').innerHTML=!s?('<b>'+mxStr(od.tk)+'</b>'+SM+'어느 부분부터 계산해야 할까요? 밑줄 친 '+CN[0]+'부터 계산해요. '+nx.why+' [다음 ▶]을 눌러 보세요.</small>'):
    (s.why+' <b class="r">'+s.a+' '+s.op+' '+s.b+' = '+s.r+'</b>'+SM+(odS<n?'다음은 밑줄 친 '+CN[odS]+'예요. '+nx.why:'계산이 끝났어요. <b class="r">'+mxStr(od.tk)+' = '+od.res+'</b>')+'</small>'); }
function odUI(){ if(!od){ od=mxGen(odK); odS=0; } $('top').innerHTML=chipsH([['as','덧셈과 뺄셈'],['md','곱셈과 나눗셈'],['mix','네 가지가 섞인 식'],['par','( )가 있는 식']],odK,'k');
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ odK=b.dataset.k; od=null; ui(); draw(); }; });
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn" id="odP">◀ 이전</button><button class="btn primary" id="odN">다음 ▶</button><button class="btn" id="odNew">다른 식</button><span class="score">'+odS+' / '+od.steps.length+'단계</span></div>';
  $('odP').onclick=function(){ odS=Math.max(0,odS-1); ui(); draw(); }; $('odN').onclick=function(){ odS=Math.min(od.steps.length,odS+1); ui(); draw(); }; $('odNew').onclick=function(){ od=null; ui(); draw(); }; }

/* ───────── 2. 순서 맞히기 ───────── */
var tp=null, tpScore=[0,0], tpPos=[], tpMsg='', tpCls='';
function tpNew(){ var R=mxGen(pick(['mix','par','mix','par','as','md'])); tp={R:R,i:0,miss:0}; tpMsg=''; tpCls=''; }
function tpCur(){ return tp.i?tp.R.steps[tp.i-1].after:tp.R.tk; }
function tpDraw(){ if(!tp) tpNew(); var R=tp.R, n=R.steps.length, done=tp.i>=n, rh=Math.min(40,(H*0.42)/Math.max(1,n)), ssz=Math.min(22,rh*0.55), j, cur=tpCur();
  for(j=0;j<tp.i;j++){ var t0=j?R.steps[j-1].after:R.tk; if(j) txt('=',W/2-tkW(t0,ssz)/2-ssz*0.7,16+rh*j+rh/2,MUTED,ssz); drawTk(t0,W/2,16+rh*j+rh/2,ssz,{from:R.steps[j].from,to:R.steps[j].to,col:ACC}); }
  var y=Math.min(H-56,16+rh*tp.i+Math.max(60,(H-16-rh*tp.i)/2)), sz=Math.min(44,W/10); while(tkW(cur,sz)>W-60&&sz>14) sz--;
  tpPos=[]; if(done){ if(tp.i) txt('=',W/2-tw(''+R.res,sz)/2-sz*0.7,y,MUTED,sz); txt(''+R.res,W/2,y,HOT,sz*1.1); }
  else { if(tp.i) txt('=',W/2-tkW(cur,sz)/2-sz*0.6,y,MUTED,sz); var pos=drawTk(cur,W/2,y,sz,null,true); cur.forEach(function(t,k){ if(isOp(t)) tpPos.push({x:pos[k],y:y,k:k}); }); }
  $('say').innerHTML=done?('<b class="r">'+mxStr(R.tk)+' = '+R.res+'</b>'+SM+(tp.miss?'틀린 횟수: '+tp.miss+'번. 계산 순서를 다시 떠올려 보세요.':'한 번도 틀리지 않고 순서를 모두 맞혔어요!')+' ( ) 안 → 곱셈과 나눗셈 → 덧셈과 뺄셈 순서로, 같은 종류끼리는 앞에서부터 계산해요.</small>'):
    ('<b>가장 먼저 계산해야 하는 곳</b>을 골라 보세요.<small>식에서 동그라미 친 기호를 누르거나 아래 단추를 누르면 돼요.</small>'); }
function tpPick(k){ if(!tp||tp.i>=tp.R.steps.length) return; var s=tp.R.steps[tp.i];
  if(s.k===k){ tp.i++; tpMsg='맞아요! '+s.a+' '+s.op+' '+s.b+' = '+s.r; tpCls='ok'; if(tp.i>=tp.R.steps.length){ tpScore[1]++; if(!tp.miss) tpScore[0]++; } }
  else { tp.miss++; tpMsg='다시 생각해 보세요. '+(s.why||'앞에서부터 차례로 계산해요.'); tpCls='bad'; }
  ui(); draw(); }
function onTap(x,y){ if(tab!=='tap'||!tp) return; var best=null, bd=1e9; tpPos.forEach(function(p){ var d=Math.abs(p.x-x)+Math.abs(p.y-y)*0.6; if(d<bd){ bd=d; best=p; } }); if(best&&bd<44) tpPick(best.k); }
function tpUI(){ if(!tp) tpNew(); var cur=tpCur(), done=tp.i>=tp.R.steps.length, side=function(t,l){ return (t==='('||t===')')?(l?'(…)':'(…)'):t; };
  $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+(done?'':cur.map(function(t,k){ return isOp(t)?'<button class="btn primary" data-k="'+k+'" style="font-size:17px">'+side(cur[k-1],1)+' '+t+' '+side(cur[k+1],0)+'</button>':''; }).join(''))+'<button class="btn'+(done?' primary':'')+'" id="tpNew">'+(done?'다음 문제 ▶':'다른 문제')+'</button>'+scoreH(tpScore)+'</div><p class="msg '+tpCls+'">'+tpMsg+'</p>';
  $('ctl').querySelectorAll('[data-k]').forEach(function(b){ b.onclick=function(){ tpPick(+b.dataset.k); }; });
  $('tpNew').onclick=function(){ if(!done) tpScore[1]++; tpNew(); ui(); draw(); }; }

/* ───────── 3. 괄호의 힘 ───────── */
var PRT=[['−','+'],['−','−'],['+','×'],['×','+'],['−','×'],['÷','×'],['×','−']], prK=0, prM=0, pr=null;
function prTk(m){ var a=pr.a, b=pr.b, c=pr.c, o1=PRT[prK][0], o2=PRT[prK][1]; return m===1?['(',a,o1,b,')',o2,c]:(m===2?[a,o1,'(',b,o2,c,')']:[a,o1,b,o2,c]); }
function prNew(){ var n, R; for(n=0;n<30000;n++){ pr={a:ri(4,40),b:ri(2,12),c:ri(2,9)}; if(pr.a===pr.b||pr.b===pr.c||pr.a===pr.c) continue; R=[0,1,2].map(function(m){ return mxRun(prTk(m)); }); if(R[0]&&R[1]&&R[2]&&R[0].res>0&&R[1].res>0&&R[2].res>0&&(R[1].res!==R[0].res||R[2].res!==R[0].res)){ pr.R=R; return; } } pr={a:20,b:8,c:2}; pr.R=[0,1,2].map(function(m){ return mxRun(prTk(m)); }); }
function prDraw(){ if(!pr) prNew(); var R=pr.R[prM], yB=H-74, nm=['( ) 없음','앞을 묶음','뒤를 묶음'], bw=Math.min(190,(W-24)/3), x0=W/2-bw*1.5, m;
  drawSteps(R,R.steps.length,10,yB);
  for(m=0;m<3;m++){ rect(x0+m*bw+3,H-64,bw-6,56,m===prM?rgba(ORANGE,0.35):rgba(GRAY,0.18),m===prM?HOT:LINE,m===prM?2.5:1.2); txt(nm[m],x0+m*bw+bw/2,H-48,MUTED,Math.min(14,bw/9)); var s=mxStr(pr.R[m].tk)+' = '+pr.R[m].res, fs=Math.min(18,bw/8); while(tw(s,fs)>bw-14&&fs>9) fs--; txt(s,x0+m*bw+bw/2,H-24,m===prM?HOT:INK,fs); }
  var same=R.res===pr.R[0].res;
  $('say').innerHTML='<b class="r">'+mxStr(R.tk)+' = '+R.res+'</b>'+SM+(prM===0?'( )가 없으면 '+(R.steps[0].why||'앞에서부터 차례로 계산해요.')+' 아래에서 ( )의 자리를 바꿔 보세요.':
    ('( ) 안을 가장 먼저 계산해요. '+(same?'이 식은 ( )가 없어도 같은 순서로 계산하므로 결과가 '+pr.R[0].res+Pr(pr.R[0].res)+' 같아요.':'계산 순서가 바뀌어서 결과가 '+pr.R[0].res+'에서 <b>'+R.res+'</b>'+Pr(R.res)+' 달라졌어요. 같은 수와 기호라도 ( )에 따라 값이 달라질 수 있어요.')))+'</small>'; }
function prUI(){ if(!pr) prNew(); $('top').innerHTML=chipsH(PRT.map(function(p,i){ return [''+i,'□ '+p[0]+' □ '+p[1]+' □']; }),''+prK,'k'); $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ prK=+b.dataset.k; prM=0; prNew(); ui(); draw(); }; });
  $('ctl').innerHTML=chipsH([['0','( ) 없음'],['1','앞의 두 수 묶기'],['2','뒤의 두 수 묶기']],''+prM,'m','margin-top:8px')+'<div class="row"><button class="btn" id="prNew">다른 수</button></div>';
  $('ctl').querySelectorAll('[data-m]').forEach(function(b){ b.onclick=function(){ prM=+b.dataset.m; ui(); draw(); }; }); $('prNew').onclick=function(){ prNew(); ui(); draw(); }; }

/* ───────── 4. 식 세우기 ───────── */
var ST=[
  function(a,b,c){ return {l:['사탕 '+a+'개 중에서 '+b+'개를 먹고','다시 '+c+'개를 받았어요.','사탕은 몇 개일까요?'],e:'a − b + c',w:['a − (b + c)','a + b − c'],u:'개',y:'먹은 만큼 빼고 받은 만큼 더해요.'}; },
  function(a,b,c){ return {l:['공책 '+a+'권을 남학생 '+b+'명과 여학생 '+c+'명에게','한 권씩 나누어 주었어요.','남은 공책은 몇 권일까요?'],e:'a − (b + c)',w:['a − b + c','a + b − c'],u:'권',y:'나누어 준 학생 수를 먼저 더해야 하므로 ( )로 묶어요.'}; },
  function(a,b,c){ return {l:['구슬이 낱개로 '+a+'개 있고,','한 봉지에 '+b+'개씩 든 봉지가 '+c+'봉지 있어요.','구슬은 모두 몇 개일까요?'],e:'a + b × c',w:['(a + b) × c','a × b + c'],u:'개',y:'봉지에 든 구슬 수를 곱셈으로 먼저 구해서 더해요.'}; },
  function(a,b,c){ a=ri(3,10)*1000; b=ri(2,9)*100; return {l:[a+'원을 내고','한 개에 '+b+'원인 지우개 '+c+'개를 샀어요.','거스름돈은 얼마일까요?'],e:a+' − '+b+' × '+c,w:['('+a+' − '+b+') × '+c,a+' − '+b+' + '+c],u:'원',y:'지우개 값을 곱셈으로 먼저 구해서 낸 돈에서 빼요.',raw:true}; },
  function(a,b,c){ return {l:['연필 '+a+'자루와 색연필 '+b+'자루를 합쳐서','학생 '+c+'명이 똑같이 나누어 가지려고 해요.','한 명이 몇 자루씩 가질까요?'],e:'(a + b) ÷ c',w:['a + b ÷ c','a ÷ c + b'],u:'자루',y:'먼저 합쳐야 하므로 덧셈을 ( )로 묶어요.'}; },
  function(a,b,c){ a=ri(3,10)*100; c=ri(10,40)*100; return {l:['한 명이 '+a+'원씩 '+b+'명이 돈을 모아','한 개에 '+c+'원인 공을 한 개 샀어요.','남은 돈은 얼마일까요?'],e:a+' × '+b+' − '+c,w:[a+' × '+b+' + '+c,a+' + '+b+' − '+c],u:'원',y:'모은 돈을 곱셈으로 먼저 구해서 공의 값을 빼요.',raw:true}; }];
function stQ(){ var n, f, a, b, c, o, sub, R, opts; for(n=0;n<20000;n++){ f=pick(ST); a=ri(12,48); b=ri(2,12); c=ri(2,9); if(a===b||b===c||a===c) continue; o=f(a,b,c); sub=function(s){ return o.raw?s:s.replace('a',a).replace('b',b).replace('c',c); };
    R=mxRunBig(parse(sub(o.e))); if(!R||R.res<1) continue; opts=[sub(o.e)].concat(o.w.map(sub));
    return {lines:o.l,ask:'이 문제에 알맞은 식을 골라 보세요.',kind:'mc',opts:shuf(opts),ans:sub(o.e),show:sub(o.e)+' = '+R.res+'('+o.u+')',why:o.y+' '+R.steps.map(function(s){ return s.a+' '+s.op+' '+s.b+' = '+s.r; }).join(', ')}; }
  return null; }
/* 돈처럼 큰 수가 나오는 식용: 범위 제한 없이 계산 */
function mxRunBig(tk){ var st=[], cur=tk, s; while((s=mxStep(cur))){ if(!(s.r>=0&&s.r===Math.floor(s.r))) return null; st.push(s); cur=s.after; } return {tk:tk,steps:st,res:cur[0]}; }
var sq=QZ(stQ);

/* ───────── 5. 문제 풀기 ───────── */
var mq=QZ(function(){ if(rnd(5)===0) return stQ(); var R=mxGen(pick(['as','md','mix','mix','par','par']));
  return {lines:[mxStr(R.tk)+' = ?'],ask:'계산 순서에 맞게 계산해 보세요.',kind:'num',ans:R.res,show:''+R.res,why:R.steps.map(function(s,i){ return CN[i]+' '+s.a+' '+s.op+' '+s.b+' = '+s.r; }).join(', '),hint:R.steps[0].why||'앞에서부터 차례로 계산해요.'}; });

var UIS={order:odUI,tap:tpUI,paren:prUI,story:function(){ sq.ui(); },quiz:function(){ mq.ui(); }}, DRS={order:odDraw,tap:tpDraw,paren:prDraw,story:function(){ sq.draw(); },quiz:function(){ mq.draw(); }};
function ui(){ $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
