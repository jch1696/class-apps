/* 규칙과 대응 (5학년 1학기) */
var OPS=['+','−','×','÷'];
function calc(op,k,x){ return op==='+'?x+k:(op==='−'?x-k:(op==='×'?x*k:x/k)); }
function inv(op){ return op==='+'?'−':(op==='−'?'+':(op==='×'?'÷':'×')); }
function shp(kind,x,y,s,col){ g.beginPath(); if(kind==='sq') g.rect(x-s/2,y-s/2,s,s); else if(kind==='ci') g.arc(x,y,s/2,0,7); else { g.moveTo(x,y-s/2); g.lineTo(x+s/2,y+s/2); g.lineTo(x-s/2,y+s/2); g.closePath(); } g.fillStyle=col; g.fill(); g.strokeStyle=INK; g.lineWidth=1.6; g.stroke(); }
/* 캔버스 표: rows=[[이름, 값들...]], marks(선택)=열마다 색 */
function ctable(rows,y0,hl){ var n=rows[0].length-1, lw=Math.min(150,W*0.3), cw=Math.min(64,(W-30-lw)/n), x0=(W-lw-cw*n)/2, rh=40;
  rows.forEach(function(r,i){ rect(x0,y0+i*rh,lw,rh,rgba(GRAY,0.3),LINE,1.2); txt(r[0],x0+lw/2,y0+i*rh+rh/2,INK,15); for(var j=0;j<n;j++){ rect(x0+lw+j*cw,y0+i*rh,cw,rh,hl&&hl[i]&&hl[i][j]?hl[i][j]:null,LINE,1.2); txt(''+r[j+1],x0+lw+j*cw+cw/2,y0+i*rh+rh/2,INK,18); } });
  return y0+rows.length*rh; }

/* ───────── 1. 도형 규칙 ───────── */
var PT=[{b:'원',bs:'○',bk:'ci',op:'×',k:2,rule:'원의 수는 사각형의 수의 2배예요.'},{b:'삼각형',bs:'△',bk:'tr',op:'+',k:1,rule:'삼각형의 수는 사각형의 수보다 1만큼 더 커요.'},{b:'삼각형',bs:'△',bk:'tr',op:'×',k:3,rule:'삼각형의 수는 사각형의 수의 3배예요.'},{b:'원',bs:'○',bk:'ci',op:'+',k:2,rule:'원의 수는 사각형의 수보다 2만큼 더 커요.'},{b:'원',bs:'○',bk:'ci',op:'×',k:4,rule:'원의 수는 사각형의 수의 4배예요.'}], sp=0, sn=3, sRev=false;
function spDraw(){ var o=PT[sp], m=calc(o.op,o.k,sn), s=Math.min(30,(W-40)/Math.max(8,o.op==='×'?sn*1.25:m)/1.25), gap=s*1.25, i, j, y1=44, y2;
  if(o.op==='×'){ var per=Math.min(o.k,2), gw=Math.max(per*gap,gap)+10, x0=(W-sn*gw)/2; y2=y1+s*1.6;
    for(i=0;i<sn;i++){ var cx=x0+i*gw+gw/2; rect(x0+i*gw+2,y1-s*0.8,gw-4,s*1.9+Math.ceil(o.k/per)*gap,rgba(GRAY,0.15),LINE,1); shp('sq',cx,y1,s,rgba(BLUE,0.9)); for(j=0;j<o.k;j++) shp(o.bk,cx+((j%per)-(per-1)/2)*gap,y2+Math.floor(j/per)*gap,s*0.85,rgba(ORANGE,0.9)); } }
  else { var xa=(W-m*gap)/2+gap/2; y2=y1+s*1.7; for(i=0;i<m;i++) shp(o.bk,xa+i*gap,y2,s*0.9,i>=sn?rgba(PINK,0.95):rgba(ORANGE,0.9)); for(i=0;i<sn;i++) shp('sq',xa+i*gap,y1,s,rgba(BLUE,0.9)); }
  var cols=[], ra=['사각형의 수 (□)'], rb=[o.b+'의 수 ('+o.bs+')']; for(i=1;i<=sn;i++){ ra.push(i); rb.push(calc(o.op,o.k,i)); } ctable([ra,rb],H-108);
  $('say').innerHTML=!sRev?('사각형이 1개씩 늘어날 때 '+o.b+'의 수는 어떻게 변하나요? 사각형이 <b>10개</b>이면 '+o.b+'은 몇 개일까요?<small>[사각형의 수]를 늘려 가며 표를 살펴보고, 규칙을 찾으면 [규칙 보기]를 눌러 확인하세요.</small>'):
    (o.rule+' 사각형이 10개이면 '+o.b+'의 수는 <b class="r">'+calc(o.op,o.k,10)+'개</b>예요.<small style="font-size:15.5px;color:var(--ink)">한 양이 변할 때 다른 양이 그에 따라 일정하게 변하는 관계를 <b>대응 관계</b>라고 해요. 사각형의 수를 □, '+o.b+'의 수를 '+o.bs+'라고 하면<br><b>'+o.bs+' = □ '+o.op+' '+o.k+'</b>　또는　<b>□ = '+o.bs+' '+inv(o.op)+' '+o.k+'</b></small>'); }
function spUI(){ $('top').innerHTML=chipsH(PT.map(function(x,i){ return [i,'배열 '+(i+1)]; }),sp,'i');
  $('ctl').innerHTML='<div class="row"><label>사각형의 수</label><input type="range" id="sN" min="1" max="8" value="'+sn+'"><output>'+sn+'</output><button class="btn primary" id="sRev">'+(sRev?'규칙 숨기기':'규칙 보기')+'</button></div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ sp=+b.dataset.i; sRev=false; spUI(); draw(); }; });
  $('sN').oninput=function(){ sn=+this.value; this.nextElementSibling.textContent=sn; draw(); }; $('sRev').onclick=function(){ sRev=!sRev; spUI(); draw(); }; }

/* ───────── 2. 대응 관계 찾기 ───────── */
function ex(op,k){ return '△ = □ '+op+' '+k; }
var quiz=QZ(function(){ var op=pick(OPS), k=ri(2,op==='×'||op==='÷'?6:9), xs=[], i, x0=ri(1,5), q;
  for(i=0;i<5;i++){ var x=x0+i; if(op==='÷') x=x*k; if(op==='−') x=x+k; xs.push(x); }
  var ys=xs.map(function(x){ return calc(op,k,x); }), good=ex(op,k), opts=[good], add=function(s){ if(opts.indexOf(s)<0&&opts.length<4) opts.push(s); };
  if(op==='+'&&ys[0]%xs[0]===0&&ys[0]/xs[0]>1) add(ex('×',ys[0]/xs[0])); if(op==='×') add(ex('+',ys[0]-xs[0])); if(op==='−'&&xs[0]%ys[0]===0&&xs[0]/ys[0]>1) add(ex('÷',xs[0]/ys[0])); if(op==='÷') add(ex('−',xs[0]-ys[0]));
  add('△ = □ '+inv(op)+' '+k); while(opts.length<4) add(ex(pick(OPS),ri(2,9)));
  var rel={'+':'△는 □보다 '+k+'만큼 더 커요','−':'△는 □보다 '+k+'만큼 더 작아요','×':'△는 □의 '+k+'배예요','÷':'△는 □를 '+k+Pr(k)+' 나눈 수예요'}[op];
  q={lines:[],table:[['□'].concat(xs),['△'].concat(ys)],ask:'□와 △ 사이의 대응 관계를 식으로 바르게 나타낸 것을 고르세요.<small>첫 번째 칸만 보지 말고 모든 칸에서 맞는지 확인하세요.</small>',kind:'mc',opts:shuf(opts),ans:good,show:good,why:'모든 칸에서 '+rel+'. 거꾸로 □ = △ '+inv(op)+' '+k+Pr(k)+' 나타낼 수도 있어요.'}; return q; });
function tbDraw(){ if(!quiz.q) quiz.next(); ctable(quiz.q.table,H/2-40); quiz.draw(); }

/* ───────── 3. 식으로 나타내기 ───────── */
var SC=[{t:'자동차 한 대에는 바퀴가 4개 있어요.',a:'자동차의 수',b:'바퀴의 수',op:'×',k:4},{t:'형은 동생보다 3살 많아요.',a:'동생의 나이',b:'형의 나이',op:'+',k:3,from:6},{t:'탁자 한 개에 의자를 6개씩 놓아요.',a:'탁자의 수',b:'의자의 수',op:'×',k:6},
  {t:'색 테이프를 한 번 자르면 2도막, 두 번 자르면 3도막이 돼요.',a:'자른 횟수',b:'도막의 수',op:'+',k:1},{t:'한 모둠은 5명이에요.',a:'모둠의 수',b:'학생의 수',op:'×',k:5},{t:'누나는 12살, 나는 9살이에요. 해마다 한 살씩 먹어요.',a:'누나의 나이',b:'나의 나이',op:'−',k:3,from:12},
  {t:'달걀 한 판에는 달걀이 10개 들어 있어요.',a:'달걀판의 수',b:'달걀의 수',op:'×',k:10},{t:'연필 한 타는 12자루예요. 연필을 타 단위로 묶어요.',a:'연필의 수',b:'타의 수',op:'÷',k:12,mul:12}], sc=0, eo='+', ek=2;
function scXs(o){ var xs=[], i; for(i=0;i<6;i++) xs.push(o.mul?(i+1)*o.mul:(o.from||1)+i); return xs; }
function exDraw(){ var o=SC[sc], xs=scXs(o), ys=xs.map(function(x){ return calc(o.op,o.k,x); }), my=xs.map(function(x){ return DD(calc(eo,ek,x)); }), ok=ys.every(function(y,i){ return ''+y===my[i]; });
  txt(o.t,W/2,30,INK,Math.min(19,W/26));
  ctable([[o.a+' (□)'].concat(xs),[o.b+' (△)'].concat(ys),['내 식의 값'].concat(my)],62,[null,null,my.map(function(v,i){ return v===''+ys[i]?'rgba(30,142,90,.25)':'rgba(217,72,43,.22)'; })]);
  txt('△ = □ '+eo+' '+ek,W/2,62+120+44,ok?'#1E8E5A':INK,Math.min(40,W/12));
  $('say').innerHTML=ok?('<b class="r">맞았어요!</b> '+o.a+'를 □, '+o.b+'를 △라고 하면 <b>△ = □ '+o.op+' '+o.k+'</b>예요.<small style="font-size:15.5px;color:var(--ink)">거꾸로 □ = △ '+inv(o.op)+' '+o.k+Pr(o.k)+' 나타낼 수도 있어요. 기호는 □, △ 대신 ○, ☆ 같은 다른 모양을 써도 돼요.</small>'):
    (o.a+' □, '+o.b+' △ → 식을 만들어 보세요.<small>아래에서 기호와 수를 골라요. 「내 식의 값」이 모두 초록색이 되면 맞는 식이에요.</small>'); }
function exUI(){ $('top').innerHTML='';
  $('ctl').innerHTML='<div class="row" style="margin-top:6px"><span style="font-family:var(--display);font-size:18px">△ = □</span>'+OPS.map(function(p){ return '<button class="chip ck" aria-pressed="'+(p===eo)+'" data-p="'+p+'">'+p+'</button>'; }).join('')+'<input type="range" id="eK" min="1" max="12" value="'+ek+'" style="max-width:220px"><output>'+ek+'</output></div><div class="row"><button class="btn" id="eNew">다른 상황 ▶</button></div>';
  $('ctl').querySelectorAll('[data-p]').forEach(function(b){ b.onclick=function(){ eo=b.dataset.p; exUI(); draw(); }; });
  $('eK').oninput=function(){ ek=+this.value; this.nextElementSibling.textContent=ek; draw(); }; $('eNew').onclick=function(){ sc=(sc+1)%SC.length; eo='+'; ek=2; exUI(); draw(); }; }

/* ───────── 4. 수 넣는 기계 ───────── */
var mc=null, mo='+', mk=2;
function mcNew(){ var op=pick(OPS); mc={op:op,k:ri(2,op==='×'||op==='÷'?6:9),hist:[],msg:'',solved:false,tried:false}; mo='+'; mk=2; }
function mcDraw(){ if(!mc) mcNew(); var bx=W*0.2, by=40, bw=Math.min(190,W*0.34), bh=110, last=mc.hist[mc.hist.length-1];
  rect(bx,by,bw,bh,rgba(BLUE,0.35),INK,2.6); txt(mc.solved?'□ '+mc.op+' '+mc.k:'?',bx+bw/2,by+bh/2,mc.solved?HOT:INK,mc.solved?30:54); txt('수 넣는 기계',bx+bw/2,by-14,MUTED,14);
  if(last){ txt(''+last[0],bx-44,by+bh/2,ACC,30); txt('→',bx-16,by+bh/2,INK,22); txt('→',bx+bw+16,by+bh/2,INK,22); txt(''+last[1],bx+bw+52,by+bh/2,HOT,30); }
  var hx=W*0.76; txt('넣은 수 → 나온 수',hx,24,MUTED,14); mc.hist.slice(-8).forEach(function(h,i){ txt(h[0]+'  →  '+h[1],hx,50+i*26,INK,18); });
  $('say').innerHTML=mc.solved?('<b class="r">규칙을 찾았어요!</b> 넣은 수를 □, 나온 수를 △라고 하면 이 기계의 규칙은 <b>△ = □ '+mc.op+' '+mc.k+'</b>'+P(mc.k,'이에요','예요')+'.<small>[새 기계]를 눌러 다른 규칙도 찾아보세요.</small>'):
    ((mc.msg?mc.msg+' ':'')+(mc.hist.length?'넣은 수와 나온 수 사이의 규칙을 찾아보세요.':'기계에 수를 넣으면 어떤 규칙에 따라 다른 수가 나와요. 수를 넣어 보세요.')+'<small>'+(mc.tried?'아직 아니에요. 넣은 수들을 모두 다시 살펴보세요. ':'')+'여러 수를 넣어 본 다음, 아래에서 규칙을 골라 [규칙 맞히기]를 누르세요. 넣어 본 횟수: '+mc.hist.length+'번</small>'); }
function mcUI(){ if(!mc) mcNew(); $('top').innerHTML='';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px"><span>넣을 수 <input type="number" id="mIn" min="0" max="999" inputmode="numeric"></span><button class="btn primary" id="mGo">기계에 넣기</button><button class="btn" id="mNew">새 기계</button></div>'+
    '<div class="row"><span style="font-family:var(--display);font-size:18px">내 생각: △ = □</span>'+OPS.map(function(p){ return '<button class="chip ck" aria-pressed="'+(p===mo)+'" data-p="'+p+'">'+p+'</button>'; }).join('')+'<input type="range" id="mK" min="1" max="10" value="'+mk+'" style="max-width:180px"><output>'+mk+'</output><button class="btn primary" id="mTry">규칙 맞히기</button></div>';
  var put=function(){ var el=$('mIn'); if(el.value==='') return; var x=Math.floor(+el.value), y=calc(mc.op,mc.k,x); mc.msg=''; mc.tried=false;
    if(x<0||x>999) mc.msg='0부터 999까지의 수만 넣을 수 있어요.'; else if(y<0) mc.msg=x+P(x,'은','는')+' 너무 작아서 넣을 수 없어요.'; else if(y!==Math.floor(y)) mc.msg=x+P(x,'은','는')+' 이 기계에 넣을 수 없는 수예요.'; else mc.hist.push([x,y]); el.value=''; el.focus(); draw(); };
  $('mGo').onclick=put; $('mIn').onkeydown=function(e){ if(e.key==='Enter') put(); };
  $('mNew').onclick=function(){ mcNew(); mcUI(); draw(); };
  $('ctl').querySelectorAll('[data-p]').forEach(function(b){ b.onclick=function(){ mo=b.dataset.p; $('ctl').querySelectorAll('[data-p]').forEach(function(c){ c.setAttribute('aria-pressed',c===b); }); }; });
  $('mK').oninput=function(){ mk=+this.value; this.nextElementSibling.textContent=mk; };
  $('mTry').onclick=function(){ if(mo===mc.op&&mk===mc.k) mc.solved=true; else mc.tried=true; mc.msg=''; draw(); }; }

var UIS={shape:spUI,table:function(){ $('top').innerHTML=''; quiz.ui(); },expr:exUI,machine:mcUI}, DRS={shape:spDraw,table:tbDraw,expr:exDraw,machine:mcDraw};
function ui(){ UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
