/* 직육면체 (5학년 2학기). x=가로, y=높이, z=세로. 면 번호는 DIRS 순서: 오른쪽, 왼쪽, 위, 아래, 앞, 뒤 */
var A=4, B=3, C=2, FN=['오른쪽','왼쪽','위','아래','앞','뒤'];
function drawBox(fc,o){ o=o||{}; var h=[A/2,C/2,B/2], fs=DIRS.map(function(d,i){ var s=fc(i); return {p:quad([0,0,0],d,h),c:s.c,a:s.a}; }), ls=boxEdges(A,B,C,0,0,false), dots=[];
  if(o.edges) ls.forEach(function(l){ l.c='#DC2626'; l.w=l.dash.length?2.5:4; });
  if(o.verts) for(var i=0;i<8;i++) dots.push({p:[(i&1?1:-1)*h[0],(i&2?1:-1)*h[1],(i&4?1:-1)*h[2]],r:7});
  paint(fs,ls,dots,o.texts||[]); }
function scale3(){ S=Math.min(W/(A+B+3.2),H/(C+(A+B)*0.4+1.8)); }

/* ───────── 1. 직육면체와 정육면체 ───────── */
var shHi='';
function shDraw(){ scale3(); var cube=A===B&&B===C, PC=[ORANGE,ORANGE,GREEN,GREEN,BLUE,BLUE];
  drawBox(function(i){ return {c:shHi==='f'?PC[i]:BLUE,a:shHi==='f'?0.85:(shHi?0.35:1)}; },{edges:shHi==='e',verts:shHi==='v',texts:dimTexts(A,B,C,0,0)});
  $('say').innerHTML=shHi==='f'?('<b class="r">면</b>은 선분으로 둘러싸인 부분이에요. '+(cube?'정육면체':'직육면체')+'의 면은 <b class="r">6개</b>예요.<small>'+(cube?'정육면체의 면은 모두 합동인 정사각형이에요.':'같은 색으로 칠한 면끼리 모양과 크기가 같아요.')+'</small>'):
    (shHi==='e'?('<b class="r">모서리</b>는 면과 면이 만나는 선분이에요. 모서리는 <b class="r">12개</b>예요.<small>'+(cube?'정육면체는 모서리의 길이가 모두 같아요.':'길이가 같은 모서리가 4개씩 3묶음 있어요.')+'</small>'):
    (shHi==='v'?'<b class="r">꼭짓점</b>은 모서리와 모서리가 만나는 점이에요. 꼭짓점은 <b class="r">8개</b>예요.<small>한 꼭짓점에서 모서리 3개가 만나요.</small>':
    (cube?'정사각형 6개로 둘러싸인 도형을 <b class="r">정육면체</b>라고 해요.<small>정사각형은 직사각형이라고 할 수 있으므로, 정육면체는 직육면체라고 할 수 있어요.</small>':'직사각형 6개로 둘러싸인 도형을 <b class="r">직육면체</b>라고 해요.<small>가로, 세로, 높이를 모두 같게 하면 어떤 도형이 될까요?</small>'))); }
function shUI(){ $('top').innerHTML='<div class="chips">'+[['','모양'],['f','면'],['e','모서리'],['v','꼭짓점']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===shHi)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML=dimHTML(); dimBind();
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ shHi=b.dataset.k; shUI(); draw(); }; }); }

/* ───────── 2. 면 사이의 관계 ───────── */
var rlF=2, rlMode='par';
function rlDraw(){ scale3(); drawBox(function(i){ var hit=rlMode==='par'?(i===(rlF^1)):(i!==rlF&&i!==(rlF^1)); return i===rlF?{c:ORANGE,a:0.92}:(hit?{c:GREEN,a:0.8}:{c:GRAY,a:0.15}); });
  var perp=[0,1,2,3,4,5].filter(function(i){ return i!==rlF&&i!==(rlF^1); }).map(function(i){ return FN[i]; }).join(', ');
  $('say').innerHTML=rlMode==='par'?('주황색 '+FN[rlF]+' 면과 평행한 면은 초록색 <b class="r">'+FN[rlF^1]+' 면</b> 1개예요.<small style="font-size:15.5px;color:var(--ink)">직육면체에서 서로 마주 보는 면은 평행해요. 평행한 면은 모두 3쌍이에요. 이 두 면을 직육면체의 <b>밑면</b>이라고 해요.</small>'):
    ('주황색 '+FN[rlF]+' 면과 수직으로 만나는 면은 초록색 <b class="r">4개</b>예요. ('+perp+')<small style="font-size:15.5px;color:var(--ink)">직육면체에서 서로 만나는 면은 수직이에요. 밑면과 수직인 면을 직육면체의 <b>옆면</b>이라고 해요.</small>'); }
function rlUI(){ $('top').innerHTML='<div class="chips">'+[['par','평행한 면 찾기'],['perp','수직인 면 찾기']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===rlMode)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML='<div class="chips" style="margin-top:6px">'+[2,3,4,5,1,0].map(function(i){ return '<button class="chip" aria-pressed="'+(i===rlF)+'" data-f="'+i+'">'+FN[i]+' 면</button>'; }).join('')+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rlMode=b.dataset.k; rlUI(); draw(); }; });
  $('ctl').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rlF=+b.dataset.f; rlUI(); draw(); }; }); }

/* ───────── 3. 겨냥도 ───────── */
var sk=null;
function skNew(){ var ys=[-0.6,0.6,-2.5,2.5,-1.0,1.0]; do{ A=2+rnd(4); B=2+rnd(3); C=2+rnd(3); }while(false); sk={y:ys[rnd(6)],p:[0.42,0.42,0.5,-0.42][rnd(4)],dash:{},chk:false}; }
function skDraw(){ if(!sk) skNew(); yaw=sk.y; pit=sk.p; scale3(); var h=[A/2,C/2,B/2], ls=boxEdges(A,B,C,0,0,false), bad=0, dashN=0;
  ls.forEach(function(l,i){ var hid=l.dash.length>0, d=!!sk.dash[i]; l.hid=hid; if(d) dashN++; if(d!==hid) bad++; l.dash=d?[7,6]:[]; l.w=3; l.c=(sk.chk&&d!==hid)?'#DC2626':INK; });
  sk.ls=ls; paint(DIRS.map(function(d){ return {p:quad([0,0,0],d,h),c:BLUE,a:0.55}; }),ls,[],[]);
  $('say').innerHTML=!sk.chk?('겨냥도를 완성해 보세요. 보이지 않는 모서리를 눌러 <b>점선</b>으로 바꾸세요. (점선 '+dashN+'개)<small>직육면체 모양을 잘 알 수 있게 그린 그림을 겨냥도라고 해요. 보이는 모서리는 실선으로, 보이지 않는 모서리는 점선으로 그려요.</small>'):
    (bad===0?'<b class="r">잘했어요!</b> 보이는 모서리 9개는 실선, 보이지 않는 모서리 3개는 점선이에요.<small>보이지 않는 모서리 3개는 보이지 않는 꼭짓점 한 곳에서 만나요. 보이는 면은 3개, 보이지 않는 면도 3개예요.</small>':
      '빨간색 모서리 <b class="r">'+bad+'개</b>를 다시 살펴보세요.<small>면에 가려서 보이지 않는 모서리만 점선이에요.</small>'); }
function skUI(){ if(!sk) skNew(); $('top').innerHTML=''; $('ctl').innerHTML='<div class="row" style="margin-top:8px"><button class="btn primary" id="skGo">확인하기</button><button class="btn" id="skClr">모두 실선으로</button><button class="btn" id="skNew">새 문제</button></div>';
  $('skGo').onclick=function(){ sk.chk=true; draw(); }; $('skClr').onclick=function(){ sk.dash={}; sk.chk=false; draw(); }; $('skNew').onclick=function(){ skNew(); draw(); }; }
function noDrag(){ return tab==='sketch'; }
function onTap(x,y){ if(tab!=='sketch'||!sk||!sk.ls) return; var best=-1, bd=20;
  sk.ls.forEach(function(l,i){ var a=scr(rot(l.p[0])), b=scr(rot(l.p[1])), dx=b[0]-a[0], dy=b[1]-a[1], t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1))), d=Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t); if(d<bd){ bd=d; best=i; } });
  if(best>=0){ sk.dash[best]=!sk.dash[best]; sk.chk=false; draw(); } }

/* ───────── 4. 전개도 ───────── */
var R4=[[1,0],[1,1],[1,2],[1,3]];
var NETS=[[0,0],[0,1],[0,2],[0,3],[1,1],[1,2]].map(function(tb){ return R4.concat([[0,tb[0]],[2,tb[1]]]); })
  .concat([1,2,3].map(function(k){ return [[0,0],[0,1],[1,1],[1,2],[1,3],[2,k]]; }))
  .concat([[[0,0],[0,1],[1,1],[1,2],[2,2],[2,3]],[[0,0],[0,1],[0,2],[1,2],[1,3],[1,4]]]);
var R5=[[0,0],[0,1],[0,2],[0,3],[0,4]], R40=[[0,0],[0,1],[0,2],[0,3]];
var CAND=[R5.concat([[0,5]]),R5.concat([[1,0]]),R5.concat([[1,1]]),R5.concat([[1,2]]),R40.concat([[1,0],[1,2]]),R40.concat([[1,0],[1,3]]),R40.concat([[1,1],[1,3]]),R40.concat([[1,0],[2,0]]),R40.concat([[1,1],[2,1]]),
  [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0]],[[0,0],[0,1],[0,2],[1,2],[2,2],[2,3]],[[0,0],[0,1],[0,2],[1,0],[2,0],[1,2]],[[0,1],[1,0],[1,1],[1,2],[2,1],[3,1]],[[0,0],[1,0],[1,1],[1,2],[1,3],[2,0]]];
function cellsNet(cells){ var F=cells.map(function(q){ var x=q[1], y=-q[0]; return {p:[[x,y-1],[x+1,y-1],[x+1,y],[x,y]],par:-2,c:BLUE}; });
  var nb=function(i){ var o=[]; cells.forEach(function(q,j){ if(Math.abs(q[0]-cells[i][0])+Math.abs(q[1]-cells[i][1])===1) o.push(j); }); return o; }, root=0, best=-1;
  cells.forEach(function(q,i){ var n=nb(i).length; if(n>best){ best=n; root=i; } });
  F[root].par=-1; var Q=[root]; while(Q.length){ var i=Q.shift(); nb(i).forEach(function(j){ if(F[j].par!==-2) return; F[j].par=i; var sh=F[j].p.filter(function(u){ return F[i].p.some(function(v){ return v[0]===u[0]&&v[1]===u[1]; }); }); F[j].hinge=[sh[0],sh[1]]; Q.push(j); }); }
  return F; }
/* 접었을 때: ov=겹치는 면, opp=마주 보는 면 번호 */
function netInfo(F){ var cs=foldNet(F,0).map(function(f){ return cen(f.p); }), m=cen(cs), ov=[], opp=[], d=function(a,b){ return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]); };
  cs.forEach(function(c,i){ ov[i]=cs.some(function(e,j){ return j!==i&&d(c,e)<0.1; }); opp[i]=-1; cs.forEach(function(e,j){ if(j!==i&&d([c[0]+e[0],c[1]+e[1],c[2]+e[2]],[2*m[0],2*m[1],2*m[2]])<0.1) opp[i]=j; }); });
  return {ov:ov,opp:opp,ok:!ov.some(function(v){ return v; })}; }
function pairColor(F){ var inf=netInfo(F), cols=[BLUE,GREEN,ORANGE], n=0; F.forEach(function(f){ f.c=null; }); F.forEach(function(f,i){ if(f.c) return; f.c=cols[n%3]; if(inf.opp[i]>=0) F[inf.opp[i]].c=cols[n%3]; n++; }); }
var BAD=CAND.filter(function(c){ return !netInfo(cellsNet(c)).ok; });

var ntKind='cube', ntI=0, nt=0, ntCol=false, ntTimer=null;
function ntStop(){ if(ntTimer){ cancelAnimationFrame(ntTimer); ntTimer=null; } }
function ntDraw(){ var F; if(ntKind==='cube'){ F=cellsNet(NETS[ntI]); if(ntCol) pairColor(F); } else { F=boxNet(A,B,C); F.forEach(function(f){ f.t=''; if(!ntCol) f.c=BLUE; }); }
  drawNet(F,nt,false); var sl=$('ntT'); if(sl) sl.value=Math.round(nt*100); var b=$('ntGo'); if(b&&!ntTimer) b.textContent=nt>0.5?'◀ 다시 접기':'▶ 펼치기';
  var col=ntCol?'같은 색 면은 접었을 때 서로 마주 보는 평행한 면이에요. 전개도에서 평행한 면끼리는 서로 붙어 있지 않아요.':'접었을 때 서로 마주 보는 면은 어느 것일까요? 예상해 보고 [마주 보는 면 색칠]을 눌러 확인하세요.';
  $('say').innerHTML=nt<0.03?((ntKind==='cube'?'정육면체':'직육면체')+'의 모서리를 잘라서 펼친 그림을 <b class="r">전개도</b>라고 해요.<small>먼저 어떤 모양이 될지 예상해 보고 ▶ 펼치기를 눌러 보세요.</small>'):(nt<0.97?'펼치는 중…':
    (ntKind==='cube'?('정육면체의 전개도예요. 정육면체의 전개도는 모두 <b class="r">11가지</b>예요. (지금 '+(ntI+1)+'번째)<small>'+col+'</small>'):('직육면체의 전개도예요. 합동인 면이 3쌍 있고, 접었을 때 만나는 모서리는 길이가 같아요.<small>'+col+'</small>'))); }
function ntRun(to){ ntStop(); var from=nt, t0=performance.now(), dur=2600*Math.abs(to-from)||1; (function step(now){ var k=Math.min(1,(now-t0)/dur); nt=from+(to-from)*k; if(k<1){ ntTimer=requestAnimationFrame(step); draw(); } else { ntTimer=null; draw(); } })(t0); }
function ntUI(){ $('top').innerHTML='<div class="chips">'+[['cube','정육면체'],['box','직육면체']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===ntKind)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('ctl').innerHTML=(ntKind==='box'?dimHTML():'')+'<div class="row"><label>펼치기</label><input type="range" id="ntT" min="0" max="100" value="'+Math.round(nt*100)+'"><button class="btn primary" id="ntGo">▶ 펼치기</button></div><div class="row">'+(ntKind==='cube'?'<button class="btn" id="ntAlt">🔀 다른 전개도</button>':'')+'<button class="chip" id="ntCol" aria-pressed="'+ntCol+'">마주 보는 면 색칠</button></div>';
  if(ntKind==='box') dimBind(function(){ ntStop(); });
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ ntStop(); ntKind=b.dataset.k; ntUI(); draw(); }; });
  $('ntT').oninput=function(){ ntStop(); nt=this.value/100; draw(); }; $('ntGo').onclick=function(){ ntRun(nt>0.5?0:1); };
  $('ntCol').onclick=function(){ ntCol=!ntCol; this.setAttribute('aria-pressed',ntCol); draw(); };
  if($('ntAlt')) $('ntAlt').onclick=function(){ ntStop(); ntI=(ntI+1)%NETS.length; if(nt<1) ntRun(1); else draw(); }; }

/* ───────── 5. 전개도 찾기 ───────── */
var qz=null, qzE=1, qzTimer=null, qzScore=[0,0];
function qzStop(){ if(qzTimer){ cancelAnimationFrame(qzTimer); qzTimer=null; } }
function orient(cells){ var k=rnd(4), fl=rnd(2), o=cells.map(function(q){ var r=q[0], c=q[1]; for(var i=0;i<k;i++){ var t=r; r=c; c=-t; } return [r,fl?-c:c]; }), mr=1e9, mc=1e9;
  o.forEach(function(q){ mr=Math.min(mr,q[0]); mc=Math.min(mc,q[1]); }); return o.map(function(q){ return [q[0]-mr,q[1]-mc]; }); }
function qzNew(){ var ok=Math.random()<0.5, cells=orient(ok?NETS[rnd(NETS.length)]:BAD[rnd(BAD.length)]), F=cellsNet(cells); qzStop(); qz={F:F,ok:ok,inf:netInfo(F),done:false,right:false}; qzE=1; }
function qzDraw(){ if(!qz) qzNew(); qz.F.forEach(function(f,i){ f.c=(qz.done&&qz.inf.ov[i])?ORANGE:BLUE; }); drawNet(qz.F,qzE,false);
  $('say').innerHTML=qz.done?((qz.right?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+'정육면체를 '+(qz.ok?'만들 수 있어요.':'만들 수 없어요.')+'<small style="font-size:15.5px;color:var(--ink)">'+(qz.ok?'접으면 여섯 면이 서로 겹치지 않고 정육면체가 돼요.':'접으면 주황색 면끼리 서로 겹쳐서 정육면체의 한 면이 비어요.')+' [접어서 확인하기]를 눌러 보세요.</small>'):
    '이 전개도를 접으면 <b>정육면체</b>를 만들 수 있을까요?<small>머릿속으로 접어 보세요. 겹치는 면이 있으면 정육면체를 만들 수 없어요.</small>'; }
function qzUI(){ if(!qz) qzNew(); $('top').innerHTML='';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+(qz.done?('<button class="btn" id="qzFold">'+(qzE>0.5?'접어서 확인하기':'다시 펼치기')+'</button><button class="btn primary" id="qzNext">다음 문제 ▶</button>'):'<button class="btn primary" id="qzO">⭕ 만들 수 있어요</button><button class="btn primary" id="qzX">❌ 만들 수 없어요</button>')+'<span class="score">맞힌 문제 '+qzScore[0]+' / '+qzScore[1]+'</span></div>';
  var ans=function(v){ qz.done=true; qz.right=(v===qz.ok); qzScore[1]++; if(qz.right) qzScore[0]++; qzUI(); draw(); };
  if(qz.done){ $('qzNext').onclick=function(){ qzNew(); qzUI(); draw(); };
    $('qzFold').onclick=function(){ qzStop(); var from=qzE, to=from>0.5?0:1, t0=performance.now(); (function step(now){ var k=Math.min(1,(now-t0)/2400); qzE=from+(to-from)*k; if(k<1){ qzTimer=requestAnimationFrame(step); draw(); } else { qzTimer=null; qzUI(); draw(); } })(t0); }; }
  else { $('qzO').onclick=function(){ ans(true); }; $('qzX').onclick=function(){ ans(false); }; } }

var HINT0='';
function ui(){ if(tab==='shape') shUI(); else if(tab==='rel') rlUI(); else if(tab==='sketch') skUI(); else if(tab==='net') ntUI(); else qzUI(); }
function draw(){ tone(); if(tab==='shape') shDraw(); else if(tab==='rel') rlDraw(); else if(tab==='sketch') skDraw(); else if(tab==='net') ntDraw(); else qzDraw(); }
function setTab(t){ ntStop(); qzStop(); if(!HINT0) HINT0=$('hint').textContent; if(tab==='sketch'&&t!=='sketch'){ yaw=-0.5; pit=0.36; } tab=t; $('hint').textContent=t==='sketch'?'모서리를 누를 때마다 실선과 점선이 바뀌어요.':HINT0;
  document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
