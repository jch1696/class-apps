/* 수와 연산 앱 공통: 분수 표시, 막대 그리기, 입력 */
function gcd(a,b){ return b?gcd(b,a%b):Math.abs(a); }
function lcm(a,b){ return a/gcd(a,b)*b; }
function F(n,d){ return '<span class="fr"><i>'+n+'</i><span>'+d+'</span></span>'; }
function MXH(w,n,d){ return (w?w:'')+(n?F(n,d):(w?'':'0')); }
/* n/d 를 기약분수(대분수) html 로 */
function MX(n,d){ var k=gcd(n,d)||1; n/=k; d/=k; if(d===1) return ''+n; var w=Math.floor(n/d); return (w?w:'')+F(n-w*d,d); }
function rect(x,y,w,h,fill,stroke,lw,dash){ if(fill){ g.fillStyle=fill; g.fillRect(x,y,w,h); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=lw||2; g.setLineDash(dash||[]); g.strokeRect(x,y,w,h); g.setLineDash([]); } }
function line(x1,y1,x2,y2,col,lw,dash){ g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.strokeStyle=col||INK; g.lineWidth=lw||1.5; g.setLineDash(dash||[]); g.stroke(); g.setLineDash([]); }
function txt(t,x,y,col,sz,al){ g.font=(sz||17)+'px Jua,"Malgun Gothic",sans-serif'; g.textAlign=al||'center'; g.textBaseline='middle'; g.lineWidth=5; g.lineJoin='round'; g.strokeStyle=HALO; g.strokeText(t,x,y); g.fillStyle=col||INK; g.fillText(t,x,y); }
function tw(t,sz){ g.font=(sz||17)+'px Jua,"Malgun Gothic",sans-serif'; return g.measureText(t).width; }
/* 캔버스 분수: 가운데 (x,y), 너비를 돌려줌 */
function cfr(n,d,x,y,col,sz){ sz=sz||18; var w=Math.max(tw(''+n,sz),tw(''+d,sz))+6; txt(''+n,x,y-sz*0.62,col,sz); txt(''+d,x,y+sz*0.66,col,sz); line(x-w/2,y,x+w/2,y,col||INK,2); return w; }
/* 식 그리기: 토큰 = '÷' 같은 글자 또는 {w,n,d} */
function cexpr(tk,cx,y,sz,col){ sz=sz||30; var ws=tk.map(function(t){ if(typeof t==='string') return tw(t,sz)+sz*0.5; var w=Math.max(tw(''+t.n,sz*0.8),tw(''+t.d,sz*0.8))+8; return (t.w?tw(''+t.w,sz)+4:0)+(t.n!=null?w:0)+sz*0.25; }), tot=ws.reduce(function(a,b){ return a+b; },0), x=cx-tot/2;
  tk.forEach(function(t,i){ if(typeof t==='string') txt(t,x+ws[i]/2,y,col,sz); else { var xx=x+sz*0.12; if(t.w){ var a=tw(''+t.w,sz); txt(''+t.w,xx+a/2,y,col,sz); xx+=a+4; } if(t.n!=null){ var w=Math.max(tw(''+t.n,sz*0.8),tw(''+t.d,sz*0.8))+8; cfr(t.n,t.d,xx+w/2,y,col,sz*0.8); } } x+=ws[i]; }); }
/* 단위 막대: parts 등분, fills=[[개수,색]...] 를 왼쪽부터 칠함 */
function bar(x,y,w,h,parts,fills,thin){ var cw=w/parts, k=0; (fills||[]).forEach(function(f){ for(var i=0;i<f[0];i++){ rect(x+(k%parts)*cw,y,cw,h,f[1]); k++; } });
  for(var i=1;i<parts;i++) line(x+i*cw,y,x+i*cw,y+h,INK,thin?0.8:1.5); rect(x,y,w,h,null,INK,2.4); }
function sld(id,lab,min,max,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" value="'+val+'"><output>'+val+'</output></div>'; }
function sldBind(id,fn){ $(id).oninput=function(){ this.nextElementSibling.textContent=this.value; fn(+this.value); ui(); draw(); var e=$(id); if(e) e.focus(); }; }
function frIn(p,whole){ return (whole?'<input type="number" id="'+p+'w" inputmode="numeric" style="width:58px;margin:0 4px 0 0" aria-label="자연수">':'')+'<span class="fin"><input type="number" id="'+p+'n" inputmode="numeric" aria-label="분자"><hr><input type="number" id="'+p+'d" inputmode="numeric" aria-label="분모"></span>'; }
/* 입력한 분수 값 {n,d} (가분수로). 비어 있으면 null */
function frVal(p){ var w=$(p+'w')?$(p+'w').value:'', n=$(p+'n').value, d=$(p+'d').value; if(n===''&&d===''&&w==='') return null; if(n===''&&d==='') return {n:+w,d:1}; if(d===''){ d='1'; } if(+d===0) return null; return {n:(+w||0)*(+d)+(+n||0),d:+d}; }
function frShow(p,n,d){ var k=gcd(n,d)||1; n/=k; d/=k; var w=Math.floor(n/d), r=n-w*d; if($(p+'w')){ $(p+'w').value=w||''; if(r){ $(p+'n').value=r; $(p+'d').value=d; } } else { $(p+'n').value=n; $(p+'d').value=d; } [p+'w',p+'n',p+'d'].forEach(function(i){ if($(i)){ $(i).disabled=true; if($(i).value!=='') $(i).className='ok'; } }); }
/* 숫자 뒤 조사: P(수,'이','가') → 받침 있으면 앞의 것 */
function P(n,a,b){ var s=(''+n).replace(/[^0-9]/g,''), d=s[s.length-1]; return '013678'.indexOf(d)>=0?a:b; }
function J(n,a,b){ return n+P(n,a,b); }
function Pr(n){ var s=(''+n).replace(/[^0-9]/g,''), d=s[s.length-1]; return '036'.indexOf(d)>=0?'으로':'로'; }
var anT=null;
function anStop(){ if(anT){ cancelAnimationFrame(anT); anT=null; } }
function anim(get,set,to,dur,done){ anStop(); var from=get(), t0=performance.now(); (function step(now){ var k=Math.min(1,(now-t0)/(dur||1500)), e=k*k*(3-2*k); set(from+(to-from)*e); if(k<1){ anT=requestAnimationFrame(step); draw(); } else { anT=null; if(done) done(); draw(); } })(t0); }
function pick(a){ return a[rnd(a.length)]; }
function shuf(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=rnd(i+1), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function BWd(){ return Math.min(W-48,620); }
var PC=[BLUE,ORANGE,GREEN,PINK,YEL,GRAY,[170,150,235],[120,205,215]];
function scoreH(s){ return '<span class="score">맞힌 문제 '+s[0]+' / '+s[1]+'</span>'; }
function chipsH(arr,cur,attr,st){ return '<div class="chips"'+(st?' style="'+st+'"':'')+'>'+arr.map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===cur)+'" data-'+attr+'="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>'; }
function ri(a,b){ return a+rnd(b-a+1); }
function beads(x,y,n,col,r,perRow){ perRow=perRow||10; for(var i=0;i<n;i++){ g.beginPath(); g.arc(x+(i%perRow)*(r*2+5)+r,y+Math.floor(i/perRow)*(r*2+5)+r,r,0,7); g.fillStyle=col; g.fill(); g.strokeStyle=INK; g.lineWidth=1.5; g.stroke(); } }
/* 공통 문제 엔진. gen() → {lines:[글 또는 토큰배열], ask:html, kind:'mc'|'num'|'pair', opts, ans, unit, why} */
function QZ(gen){ var o={q:null,score:[0,0]};
  o.next=function(){ o.q=gen(); o.q.done=false; o.q.tries=0; o.q.right=false; };
  o.draw=function(){ if(!o.q) o.next(); var q=o.q, n=q.lines.length, sz=Math.min(40,W/14,(H-40)/(n*1.9)), y=H/2-(n-1)*sz*0.95;
    q.lines.forEach(function(l,i){ if(typeof l==='string'){ var s=sz; while(tw(l,s)>W-30&&s>12) s-=1; txt(l,W/2,y+i*sz*1.9,INK,s); } else cexpr(l,W/2,y+i*sz*1.9,sz); });
    $('say').innerHTML=q.done?((q.right?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'답: '+q.show+'<small style="font-size:15.5px;color:var(--ink)">'+q.why+'</small>'):(q.ask+(q.tries>=2&&q.hint?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+q.hint+'</small>':'')); };
  o.ui=function(msg,cls){ if(!o.q) o.next(); var q=o.q, h='';
    if(q.kind==='mc') h=q.opts.map(function(s,i){ return '<button class="btn'+(q.done?(s===q.ans?' primary':''):' primary')+'" data-o="'+i+'"'+(q.done?' disabled':'')+' style="font-size:17px">'+s+'</button>'; }).join('');
    else h='<span style="font-size:17px">답 = '+(q.kind==='pair'?'<input type="number" id="qA" inputmode="decimal" step="any"> : <input type="number" id="qB" inputmode="decimal" step="any">':'<input type="number" class="wide" id="qA" inputmode="decimal" step="any">')+' '+(q.unit||'')+'</span>'+(q.done?'':'<button class="btn primary" id="qGo">확인하기</button>');
    $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+h+'<button class="btn'+(q.done?' primary':'')+'" id="qNext">'+(q.done?'다음 문제 ▶':'건너뛰기')+'</button>'+scoreH(o.score)+'</div><p class="msg '+(cls||'')+'" id="qMsg">'+(msg||'')+'</p>';
    if(q.kind==='mc'){ if(!q.done) $('ctl').querySelectorAll('[data-o]').forEach(function(b){ b.onclick=function(){ q.done=true; q.right=q.opts[+b.dataset.o]===q.ans; o.score[1]++; if(q.right) o.score[0]++; o.ui(); draw(); }; }); }
    else if(q.done){ $('qA').value=q.kind==='pair'?q.ans[0]:q.ans; $('qA').className=(q.kind==='pair'?'':'wide ')+'ok'; $('qA').disabled=true; if($('qB')){ $('qB').value=q.ans[1]; $('qB').className='ok'; $('qB').disabled=true; } }
    else { $('qGo').onclick=function(){ var m=$('qMsg'), a=$('qA').value, b=$('qB')?$('qB').value:'0'; if(a===''||b===''){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
        var ok=q.kind==='pair'?(Math.abs(+a-q.ans[0])<1e-9&&Math.abs(+b-q.ans[1])<1e-9):Math.abs(+a-q.ans)<1e-9;
        if(ok){ if(q.tries===0) o.score[0]++; o.score[1]++; q.done=true; q.right=true; o.ui(); draw(); } else { q.tries++; m.className='msg bad'; m.textContent='다시 생각해 보세요.'; draw(); } };
      $('qA').onkeydown=function(e){ if(e.key==='Enter'&&!$('qB')) $('qGo').click(); }; }
    $('qNext').onclick=function(){ if(!o.q.done) o.score[1]++; o.next(); o.ui(); draw(); }; };
  return o; }
function DD(x){ return (Math.round(x*1000)/1000)+''; }
/* 캔버스 표: rows=[[이름, 값들...]], hl=칸 색(선택). 아래쪽 y를 돌려줌 */
function ctable(rows,y0,hl,rh){ var n=rows[0].length-1, lw=Math.min(150,W*0.3), cw=Math.min(74,(W-30-lw)/n), x0=(W-lw-cw*n)/2; rh=rh||40;
  rows.forEach(function(r,i){ rect(x0,y0+i*rh,lw,rh,rgba(GRAY,0.3),LINE,1.2); txt(r[0],x0+lw/2,y0+i*rh+rh/2,INK,15); for(var j=0;j<n;j++){ rect(x0+lw+j*cw,y0+i*rh,cw,rh,hl&&hl[i]&&hl[i][j]?hl[i][j]:null,LINE,1.2); txt(''+r[j+1],x0+lw+j*cw+cw/2,y0+i*rh+rh/2,INK,Math.min(18,cw/3.2+6)); } });
  return y0+rows.length*rh; }
var GC=[BLUE,ORANGE,GREEN,PINK,YEL,[170,150,235],GRAY];
/* 띠그래프: it=[{nm,p}] (p=백분율), lab=이름 표시 */
function drawBand(it,x,y,w,h,lab,upto){ var acc=0, i; for(i=0;i<=20;i++){ line(x+w*i/20,y-(i%2?5:9),x+w*i/20,y,INK,1); if(i%2===0) txt(''+(i*5),x+w*i/20,y-18,MUTED,12); } txt('(%)',x+w+16,y-18,MUTED,12);
  it.forEach(function(o,k){ if(upto!=null&&k>=upto) return; var sw=w*o.p/100; rect(x+w*acc/100,y,sw,h,rgba(GC[k%GC.length],0.9),INK,1.5); if(lab&&sw>26){ txt(o.nm,x+w*acc/100+sw/2,y+h/2-(sw>44?9:0),INK,Math.min(15,sw/3.2+5)); if(sw>44) txt('('+DD(o.p)+'%)',x+w*acc/100+sw/2,y+h/2+10,INK,12); } acc+=o.p; });
  rect(x,y,w,h,null,INK,2.4); }
/* 원그래프: 위쪽에서 시계 방향 */
function drawPie(it,cx,cy,r,lab,upto){ var acc=0, i, A=function(p){ return -Math.PI/2+Math.PI*2*p/100; };
  it.forEach(function(o,k){ if(upto!=null&&k>=upto) return; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,A(acc),A(acc+o.p)); g.closePath(); g.fillStyle=rgba(GC[k%GC.length],0.9); g.fill(); g.strokeStyle=INK; g.lineWidth=1.5; g.stroke();
    if(lab&&o.p>=5){ var m=A(acc+o.p/2), rr=r*(o.p>=15?0.62:0.78); txt(o.nm,cx+rr*Math.cos(m),cy+rr*Math.sin(m)-(o.p>=10?8:0),INK,o.p>=15?15:12); if(o.p>=10) txt('('+DD(o.p)+'%)',cx+rr*Math.cos(m),cy+rr*Math.sin(m)+9,INK,12); } acc+=o.p; });
  g.beginPath(); g.arc(cx,cy,r,0,7); g.strokeStyle=INK; g.lineWidth=2.4; g.stroke();
  for(i=0;i<20;i++){ var a=A(i*5); line(cx+r*Math.cos(a),cy+r*Math.sin(a),cx+(r+(i%5?5:9))*Math.cos(a),cy+(r+(i%5?5:9))*Math.sin(a),INK,1.2); if(i%5===0) txt(''+(i*5),cx+(r+22)*Math.cos(a),cy+(r+22)*Math.sin(a),MUTED,12); } }
/* 낱말 뒤 조사 (받침 있으면 앞의 것) */
function KP(w,a,b){ var c=(''+w).charCodeAt((''+w).length-1); if(c>=0xAC00&&c<=0xD7A3) return (c-0xAC00)%28?a:b; return P(w,a,b); }
