/* 직육면체의 부피와 겉넓이 (6학년 1학기). x=가로, y=높이, z=세로 */
var A=4, B=3, C=3;
var DIRS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
function quad(c,d,h){ var u=[d[1],d[2],d[0]], v=[d[2],d[0],d[1]], m=[c[0]+d[0]*h[0],c[1]+d[1]*h[1],c[2]+d[2]*h[2]], pt=function(a,b){ return [m[0]+a*u[0]*h[0]+b*v[0]*h[0],m[1]+a*u[1]*h[1]+b*v[1]*h[1],m[2]+a*u[2]*h[2]+b*v[2]*h[2]]; };
  return [pt(1,1),pt(1,-1),pt(-1,-1),pt(-1,1)]; }
/* 쌓기나무 n개(아래층부터)의 겉면 가운데 보이는 면만 */
function cubes(a,b,c,n,ox,oy,col){ var fs=[], has=function(x,y,z){ return x>=0&&y>=0&&z>=0&&x<a&&y<c&&z<b&&(y*a*b+z*a+x)<n; }, hh=[0.5,0.5,0.5];
  for(var k=0;k<n;k++){ var x=k%a, z=Math.floor(k/a)%b, y=Math.floor(k/(a*b));
    DIRS.forEach(function(d){ if(has(x+d[0],y+d[1],z+d[2])||rot(d)[2]<=1e-6) return; fs.push({p:quad([x+0.5-a/2+ox,y+0.5-c/2+oy,z+0.5-b/2],d,hh),c:col,ol:INK}); }); }
  return fs; }
function boxFaces(c,h,col,al){ return DIRS.map(function(d){ return {p:quad(c,d,h),c:col,a:al,ol:INK}; }); }
function boxEdges(a,b,c,ox,oy,hideBack){ var ls=[], h=[a/2,c/2,b/2];
  for(var i=0;i<8;i++) for(var k=0;k<3;k++){ if(i&(1<<k)) continue; var j=i|(1<<k), vis=false, P1=[], P2=[];
    for(var m=0;m<3;m++){ var s=(i&(1<<m))?1:-1; P1.push(s*h[m]); P2.push(m===k?h[m]:s*h[m]); if(m!==k){ var n=[0,0,0]; n[m]=s; if(rot(n)[2]>1e-6) vis=true; } }
    P1[0]+=ox; P2[0]+=ox; P1[1]+=oy; P2[1]+=oy; if(!vis&&hideBack) continue; ls.push({p:[P1,P2],w:vis?2:1.3,dash:vis?[]:[5,5]}); }
  return ls; }
function dimTexts(a,b,c,ox,oy){ return [{p:[ox,-c/2+oy,b/2],t:'가로 '+a+'cm',dy:16,c:INK,s:15},{p:[a/2+ox,-c/2+oy,0],t:'세로 '+b+'cm',dx:34,dy:10,c:INK,s:15},{p:[-a/2+ox,oy,b/2],t:'높이 '+c+'cm',dx:-40,c:INK,s:15}]; }
function dimHTML(){ return '<div class="dims">'+[['A','가로'],['B','세로'],['C','높이']].map(function(d){ return '<div class="row"><label>'+d[1]+'</label><input type="range" id="d'+d[0]+'" min="1" max="6" value="'+window[d[0]]+'"><output>'+window[d[0]]+'cm</output></div>'; }).join('')+'</div>'; }
function dimBind(cb){ ['A','B','C'].forEach(function(k){ $('d'+k).oninput=function(){ window[k]=+this.value; this.nextElementSibling.textContent=this.value+'cm'; if(cb) cb(); draw(); }; }); }

/* ───────── 1. 쌓아서 부피 구하기 ───────── */
var fillN=0, fillT=null;
function fillStop(){ if(fillT){ clearInterval(fillT); fillT=null; } }
function fillDraw(){ var V=A*B*C, per=A*B; fillN=Math.min(fillN,V); S=Math.min(W/(A+B+3.2),H/(C+(A+B)*0.4+1.8));
  paint(cubes(A,B,C,fillN,0,0,BLUE),boxEdges(A,B,C,0,0,fillN>0),[],dimTexts(A,B,C,0,0));
  var cube=A===B&&B===C;
  $('say').innerHTML=fillN===0?('가로 '+A+'cm, 세로 '+B+'cm, 높이 '+C+'cm인 상자예요. 한 모서리가 1cm인 쌓기나무가 몇 개 들어갈까요?<small>쌓기나무 1개의 부피는 1㎤(1 세제곱센티미터)예요. 먼저 예상해 보고 쌓아 보세요.</small>'):
    (fillN<V?('쌓기나무 <b class="r">'+fillN+'개</b>를 쌓았어요.<small>한 층에 '+A+' × '+B+' = '+per+'개씩 들어가요. 지금 '+Math.floor(fillN/per)+'층을 다 채웠어요.</small>'):
    ('한 층에 '+A+' × '+B+' = '+per+'개씩 '+C+'층이므로 쌓기나무는 <b class="r">'+V+'개</b>예요. 부피는 <b class="r">'+V+'㎤</b>예요.<small style="font-size:15.5px;color:var(--ink)">'+(cube?'정육면체의 부피 = 한 모서리의 길이 × 한 모서리의 길이 × 한 모서리의 길이 = ':'직육면체의 부피 = 가로 × 세로 × 높이 = ')+A+' × '+B+' × '+C+' = '+V+'(㎤)</small>')); }
function fillUI(){ $('top').innerHTML=''; $('ctl').innerHTML=dimHTML()+'<div class="row"><button class="btn primary" id="fGo">▶ 하나씩 쌓기</button><button class="btn" id="fLay">한 층 쌓기</button><button class="btn" id="fAll">가득 채우기</button><button class="btn" id="fClr">비우기</button></div>';
  dimBind(function(){ fillStop(); fillN=0; });
  $('fGo').onclick=function(){ fillStop(); var V=A*B*C; if(fillN>=V) fillN=0; fillT=setInterval(function(){ fillN++; if(fillN>=A*B*C) fillStop(); draw(); },Math.max(30,3600/V)); draw(); };
  $('fLay').onclick=function(){ fillStop(); var per=A*B; fillN=Math.min(A*B*C,(Math.floor(fillN/per)+1)*per); draw(); };
  $('fAll').onclick=function(){ fillStop(); fillN=A*B*C; draw(); };
  $('fClr').onclick=function(){ fillStop(); fillN=0; draw(); }; }

/* ───────── 2. 부피 비교하기 ───────── */
var cm=null, cmScore=[0,0], EQ=[[[2,2,3],[1,3,4]],[[2,4,2],[4,4,1]],[[3,2,2],[1,4,3]],[[2,3,4],[4,2,3]],[[3,3,4],[4,3,3]]];
function cmNew(){ var r=function(){ return 1+rnd(4); }, a, b; if(Math.random()<0.22){ var q=EQ[rnd(EQ.length)], s=rnd(2); a=q[s]; b=q[1-s]; } else { a=[r(),r(),r()]; do{ b=[r(),r(),r()]; }while(a.join()===b.join()); }
  cm={a:a,b:b,done:false,right:false,pick:''}; }
function cmDraw(){ if(!cm) cmNew(); var a=cm.a, b=cm.b, mc=Math.max(a[2],b[2]), ox1=-(a[0]/2+1.1), ox2=b[0]/2+1.1, oy1=(a[2]-mc)/2, oy2=(b[2]-mc)/2;
  S=Math.min(W/(a[0]+b[0]+7.5),H/(mc+4.5));
  var fs=cubes(a[0],a[1],a[2],a[0]*a[1]*a[2],ox1,oy1,BLUE).concat(cubes(b[0],b[1],b[2],b[0]*b[1]*b[2],ox2,oy2,GREEN));
  var tx=[{p:[ox1,-mc/2,a[1]/2],t:'가',dy:24,c:INK,s:20},{p:[ox2,-mc/2,b[1]/2],t:'나',dy:24,c:INK,s:20}];
  paint(fs,[],[],tx);
  var va=a[0]*a[1]*a[2], vb=b[0]*b[1]*b[2], ans=va>vb?'가':(va<vb?'나':'같음');
  $('say').innerHTML=cm.done?((cm.right?'<b class="r">정답이에요!</b> ':'아쉬워요. ')+(ans==='같음'?'두 상자의 부피가 같아요.':(ans+'의 부피가 더 커요.'))+'<small style="font-size:15.5px;color:var(--ink)">가: '+a[0]+' × '+a[1]+' × '+a[2]+' = '+va+'(㎤)　　나: '+b[0]+' × '+b[1]+' × '+b[2]+' = '+vb+'(㎤)'+(ans==='같음'?'<br>모양이 달라도 부피는 같을 수 있어요.':'')+'</small>'):
    '쌓기나무(1㎤)로 만든 두 직육면체 가운데 어느 쪽의 부피가 더 클까요?<small>그림을 돌려 가로, 세로, 높이에 쌓기나무가 몇 개씩 있는지 살펴보세요.</small>'; }
function cmUI(){ if(!cm) cmNew(); $('top').innerHTML='';
  $('ctl').innerHTML='<div class="row" style="margin-top:8px">'+(cm.done?'<button class="btn primary" id="cmNext">다음 문제 ▶</button>':'<button class="btn primary" data-v="가">가가 더 커요</button><button class="btn primary" data-v="나">나가 더 커요</button><button class="btn" data-v="같음">부피가 같아요</button>')+'<span class="score">맞힌 문제 '+cmScore[0]+' / '+cmScore[1]+'</span></div>';
  if(cm.done) $('cmNext').onclick=function(){ cmNew(); cmUI(); draw(); };
  else $('ctl').querySelectorAll('[data-v]').forEach(function(b){ b.onclick=function(){ var va=cm.a[0]*cm.a[1]*cm.a[2], vb=cm.b[0]*cm.b[1]*cm.b[2], ans=va>vb?'가':(va<vb?'나':'같음'); cm.done=true; cm.right=b.dataset.v===ans; cmScore[1]++; if(cm.right) cmScore[0]++; cmUI(); draw(); }; }); }

/* ───────── 3. 겉넓이 ───────── */
var sa=0, saT=null;
function saStop(){ if(saT){ cancelAnimationFrame(saT); saT=null; } }
function saDraw(){ drawNet(boxNet(A,B,C),sa,true); var sl=$('saT'); if(sl) sl.value=Math.round(sa*100); var bt=$('saGo'); if(bt&&!saT) bt.textContent=sa>0.5?'◀ 다시 접기':'▶ 펼치기';
  var x=A*B, y=A*C, z=B*C, cube=A===B&&B===C;
  $('say').innerHTML=sa<0.03?('가로 '+A+'cm, 세로 '+B+'cm, 높이 '+C+'cm인 직육면체의 겉넓이는 얼마일까요?<small>겉넓이는 여섯 면의 넓이를 모두 더한 것이에요. ▶ 펼치기를 눌러 전개도로 살펴보세요.</small>'):(sa<0.97?'펼치는 중…':
    (cube?('정육면체는 여섯 면이 모두 합동이에요. 겉넓이는 <b class="r">'+(x*6)+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">정육면체의 겉넓이 = 한 면의 넓이 × 6 = '+A+' × '+A+' × 6 = '+(x*6)+'(㎠)</small>'):
    ('같은 색 면은 서로 합동이에요. 합동인 면이 3쌍이므로 겉넓이는 <b class="r">'+((x+y+z)*2)+'㎠</b>예요.<small style="font-size:15.5px;color:var(--ink)">직육면체의 겉넓이 = ('+A+' × '+B+' + '+A+' × '+C+' + '+C+' × '+B+') × 2 = ('+x+' + '+y+' + '+z+') × 2 = '+((x+y+z)*2)+'(㎠)</small>'))); }
function saRun(to){ saStop(); var from=sa, t0=performance.now(), dur=2400*Math.abs(to-from)||1; (function step(now){ var k=Math.min(1,(now-t0)/dur); sa=from+(to-from)*k; if(k<1){ saT=requestAnimationFrame(step); draw(); } else { saT=null; draw(); } })(t0); }
function saUI(){ $('top').innerHTML=''; $('ctl').innerHTML=dimHTML()+'<div class="row"><label>펼치기</label><input type="range" id="saT" min="0" max="100" value="'+Math.round(sa*100)+'"><button class="btn primary" id="saGo">▶ 펼치기</button></div>';
  dimBind(function(){ saStop(); }); $('saT').oninput=function(){ saStop(); sa=this.value/100; draw(); }; $('saGo').onclick=function(){ saRun(sa>0.5?0:1); }; }

/* ───────── 4. 1㎥와 1㎤ ───────── */
var un=0, uq=null, UNS=['1㎤','한 줄','한 층','1㎥ 전체'];
function uqNew(){ var ns=[1,2,3,4,5,7,10,0.5,1.5,2.4,0.8,12], n=ns[rnd(ns.length)]; uq={n:n,dir:rnd(2)}; }
function unDraw(){ S=Math.min(W,H)/2.7; var t=0.035, fs=boxFaces([0,0,0],[0.5,0.5,0.5],un===3?ORANGE:GRAY,un===3?0.82:0.16);
  if(un===0) fs=fs.concat(boxFaces([-0.5+t,-0.5+t,0.5-t],[t,t,t],ORANGE,1));
  if(un===1) fs=fs.concat(boxFaces([0,-0.5+t,0.5-t],[0.5,t,t],ORANGE,1));
  if(un===2) fs=fs.concat(boxFaces([0,-0.5+t,0],[0.5,t,0.5],ORANGE,1));
  paint(fs,[],[],[{p:[0,-0.5,0.5],t:'100cm = 1m',dy:17,c:INK,s:15},{p:[0.5,-0.5,0],t:'100cm = 1m',dx:46,dy:12,c:INK,s:15},{p:[-0.5,0,0.5],t:'100cm = 1m',dx:-50,c:INK,s:15}]);
  $('say').innerHTML=['한 모서리의 길이가 1m인 정육면체의 부피를 <b class="r">1㎥</b>(1 세제곱미터)라고 해요.<small>구석의 주황색 쌓기나무가 1㎤예요. 실제로는 훨씬 작아서 눈에 보이도록 크게 그렸어요.</small>',
    '가로 한 줄에 1㎤ 쌓기나무가 <b class="r">100개</b> 놓여요.<small>1m = 100cm이기 때문이에요.</small>',
    '한 층에는 100 × 100 = <b class="r">10000개</b>가 놓여요.<small>가로로 100개씩, 세로로 100줄이에요.</small>',
    '100층을 쌓으면 100 × 100 × 100 = <b class="r">1000000개</b>예요.<small style="font-size:15.5px;color:var(--ink)">1㎥ = 1000000㎤</small>'][un]; }
function unUI(msg,cls){ if(!uq) uqNew(); $('top').innerHTML='<div class="chips">'+UNS.map(function(s,i){ return '<button class="chip" aria-pressed="'+(i===un)+'" data-i="'+i+'">'+s+'</button>'; }).join('')+'</div>';
  var big=uq.n*1000000, q=uq.dir===0?('<b>'+uq.n+'㎥</b> = <input type="number" class="wide" id="uqIn" inputmode="decimal"> ㎤'):('<b>'+big+'㎤</b> = <input type="number" class="wide" id="uqIn" inputmode="decimal"> ㎥');
  $('ctl').innerHTML='<div class="row" style="margin-top:10px;font-size:17px"><span>단위 바꾸기　'+q+'</span><button class="btn primary" id="uqGo">확인하기</button><button class="btn" id="uqNext">다른 문제</button></div><p class="msg '+(cls||'')+'" id="uqMsg">'+(msg||'')+'</p>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ un=+b.dataset.i; $('top').querySelectorAll('.chip').forEach(function(c){ c.setAttribute('aria-pressed',c===b); }); draw(); }; });
  $('uqGo').onclick=function(){ var el=$('uqIn'), m=$('uqMsg'), ans=uq.dir===0?big:uq.n; if(el.value===''){ m.className='msg bad'; m.textContent='칸에 수를 써 주세요.'; return; }
    var ok=Math.abs(+el.value-ans)<1e-6; el.className='wide '+(ok?'ok':'bad'); m.className='msg '+(ok?'ok':'bad'); m.textContent=ok?'맞았어요! 1㎥ = 1000000㎤이므로 '+uq.n+'㎥ = '+big+'㎤예요.':'다시 생각해 보세요. 1㎥ = 1000000㎤예요.'; };
  $('uqNext').onclick=function(){ uqNew(); unUI(); }; }

function ui(){ if(tab==='fill') fillUI(); else if(tab==='cmp') cmUI(); else if(tab==='sa') saUI(); else unUI(); }
function draw(){ tone(); if(tab==='fill') fillDraw(); else if(tab==='cmp') cmDraw(); else if(tab==='sa') saDraw(); else unDraw(); }
function setTab(t){ fillStop(); saStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
