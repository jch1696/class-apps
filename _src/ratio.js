/* 비와 비율 (6학년 1학기) */
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };
function decS(a,b){ var v=a/b, s=DD(v); return (Math.abs(v*1000-Math.round(v*1000))<1e-9)?s:'약 '+v.toFixed(2); }

/* ───────── 1. 두 수 비교하기 ───────── */
var ca=6, cb=2, cn=3;
function cmDraw(){ var ra=Math.ceil(ca/4), rb=Math.ceil(cb/4), gw=Math.min(230,(W-30)/cn), x0=(W-gw*cn)/2, r=Math.max(5,Math.min(20,(gw-40)/8,(H-120)/((ra+rb)*2.4))), st=r*2+5, bh=(ra+rb)*st+31, y0=Math.max(30,(H-36-bh)/2+12), bx=(gw-16-(4*st-5))/2, i;
  for(i=0;i<cn;i++){ var x=x0+i*gw+8; rect(x,y0,gw-16,bh,rgba(GRAY,0.18),LINE,1.5); txt((i+1)+'모둠',x+(gw-16)/2,y0-13,MUTED,14); beads(x+bx,y0+12,ca,CB(),r,4); beads(x+bx,y0+12+ra*st+12,cb,CO(),r,4); }
  txt('● 모둠원 '+ca+'명',W/2-70,H-18,ACC,15); txt('● 태블릿 '+cb+'대',W/2+70,H-18,HOT,15);
  var div=ca%cb===0;
  $('say').innerHTML='<b>뺄셈</b>: '+(ca-cb)+', '+((ca-cb)*2)+', '+((ca-cb)*3)+'… 모둠 수마다 달라요.<br><b>나눗셈</b>: 항상 <b class="r">'+(div?ca/cb:F(ca,cb))+'배</b>예요.<small style="font-size:15.5px;color:var(--ink)">나눗셈으로 비교하면 모둠 수가 바뀌어도 변하지 않아요. 이렇게 비교한 것을 기호 : 으로 나타낸 것이 <b>비</b>예요.</small>'; }
function cmUI(){ var rows=[['모둠 수',function(i){ return i; }],['모둠원 (명)',function(i){ return ca*i; }],['태블릿 (대)',function(i){ return cb*i; }],['뺄셈',function(i){ return (ca-cb)*i; }],['나눗셈',function(){ return ca%cb===0?ca/cb:F(ca,cb); }]], h='<table><tbody>';
  rows.forEach(function(r,k){ h+='<tr><th style="text-align:left">'+r[0]+'</th>'; for(var i=1;i<=cn;i++) h+='<td'+(k>=3?' style="font-weight:700;color:'+(k===3?'var(--muted)':'var(--c1)')+'"':'')+'>'+r[1](i)+'</td>'; h+='</tr>'; });
  $('ctl').innerHTML='<div class="dims">'+sld('cA','모둠원',2,8,ca)+sld('cB','태블릿',1,4,cb)+sld('cN','모둠 수',1,5,cn)+'</div>'+h+'</tbody></table>';
  sldBind('cA',function(v){ ca=v; }); sldBind('cB',function(v){ cb=v; }); sldBind('cN',function(v){ cn=v; }); }

/* ───────── 2. 비 ───────── */
var ra=3, rb=2, rdir=0;
function rtDraw(){ var r=Math.min(15,(W-80)/22), a=rdir?rb:ra, b=rdir?ra:rb, x0=(W-10*(r*2+5))/2, sz=Math.min(64,W/8), y=H*0.62;
  beads(x0,26,ra,CB(),r,10); beads(x0,26+r*2+16,rb,CO(),r,10); txt('파랑 '+ra+'개',x0-10,26+r,ACC,15,'right'); txt('주황 '+rb+'개',x0-10,26+r*3+16,HOT,15,'right');
  var wa=tw(''+a,sz), wc=tw(' : ',sz), wb=tw(''+b,sz), xs=W/2-(wa+wc+wb)/2;
  txt(''+a,xs+wa/2,y,rdir?HOT:ACC,sz); txt(':',xs+wa+wc/2,y-4,INK,sz); txt(''+b,xs+wa+wc+wb/2,y,rdir?ACC:HOT,sz);
  txt('비교하는 양',xs+wa/2-30,y+sz*0.85,MUTED,15); txt('기준량',xs+wa+wc+wb/2+22,y+sz*0.85,MUTED,15);
  var A=rdir?'주황 구슬':'파랑 구슬', B=rdir?'파랑 구슬':'주황 구슬';
  $('say').innerHTML=B+' 수에 대한 '+A+' 수의 비는 <b class="r">'+a+' : '+b+'</b>예요.<small style="font-size:15.5px;color:var(--ink)">읽는 방법은 네 가지예요. 「'+a+' 대 '+b+'」, 「'+J(a,'과','와')+' '+b+'의 비」, 「'+a+'의 '+b+'에 대한 비」, 「'+b+'에 대한 '+a+'의 비」<br>기호 : 의 오른쪽에 있는 '+J(b,'이','가')+' <b>기준량</b>, 왼쪽에 있는 '+J(a,'이','가')+' <b>비교하는 양</b>이에요. '+a+' : '+J(b,'과','와')+' '+b+' : '+J(a,'은','는')+' 서로 다른 비예요.</small>'; }
function rtUI(){ $('top').innerHTML=chipsH([[0,'주황에 대한 파랑의 비'],[1,'파랑에 대한 주황의 비']],rdir,'k');
  $('ctl').innerHTML='<div class="dims">'+sld('rA','파랑 구슬',1,10,ra)+sld('rB','주황 구슬',1,10,rb)+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ rdir=+b.dataset.k; rtUI(); draw(); }; }); sldBind('rA',function(v){ ra=v; }); sldBind('rB',function(v){ rb=v; }); }

/* ───────── 3. 비율 ───────── */
var qa=3, qb=4;
function rlDraw(){ var BW=BWd()-60, x0=(W-BW)/2+30, m=Math.max(qa,qb), u=BW/m, hh=48, y1=64, y2=y1+hh+44, i;
  rect(x0,y1,qb*u,hh,CO(0.8),INK,2.4); for(i=1;i<qb;i++) line(x0+i*u,y1,x0+i*u,y1+hh,INK,1); txt('기준량 '+qb,x0-8,y1+hh/2,HOT,15,'right');
  rect(x0,y2,qa*u,hh,CB(0.8),INK,2.4); for(i=1;i<qa;i++) line(x0+i*u,y2,x0+i*u,y2+hh,INK,1); txt('비교하는 양 '+qa,x0-8,y2+hh/2,ACC,15,'right');
  line(x0+qb*u,y1-10,x0+qb*u,y2+hh+10,HOT,2,[6,5]); txt('1',x0+qb*u,y1-20,HOT,15);
  cexpr([qa+' : '+qb,'→',{n:qa,d:qb},'=',decS(qa,qb)],W/2,y2+hh+62,Math.min(32,W/16));
  var v=qa/qb;
  $('say').innerHTML='기준량에 대한 비교하는 양의 크기를 <b class="r">비율</b>이라고 해요. '+qa+' : '+qb+'의 비율은 '+F(qa,qb)+' = '+decS(qa,qb)+P(decS(qa,qb),'이에요','예요')+'.<small style="font-size:15.5px;color:var(--ink)">(비율) = (비교하는 양) ÷ (기준량) = '+F('비교하는 양','기준량')+'<br>'+(v>1?'비율이 1보다 크면 비교하는 양이 기준량보다 커요.':(v<1?'비율이 1보다 작으면 비교하는 양이 기준량보다 작아요.':'비율이 1이면 비교하는 양과 기준량이 같아요.'))+'</small>'; }
function rlUI(){ $('ctl').innerHTML='<div class="dims">'+sld('qA','비교하는 양',1,12,qa)+sld('qB','기준량',1,12,qb)+'</div>'; sldBind('qA',function(v){ qa=v; }); sldBind('qB',function(v){ qb=v; }); }

/* ───────── 4. 백분율 ───────── */
var pn=25;
function pcDraw(){ var SQ=Math.min(H-40,W-200,300), x0=(W-SQ)/2-50, y0=20, c=SQ/10, i;
  for(i=0;i<pn;i++) rect(x0+Math.floor(i/10)*c,y0+(i%10)*c,c,c,CB(0.85));
  for(i=1;i<10;i++){ line(x0+i*c,y0,x0+i*c,y0+SQ,INK,0.7); line(x0,y0+i*c,x0+SQ,y0+i*c,INK,0.7); } rect(x0,y0,SQ,SQ,null,INK,2.4);
  var xr=x0+SQ+70, k=gcd(pn,100)||1; cfr(pn,100,xr,y0+40,INK,26); if(k>1&&pn>0&&pn<100) cexpr(['=',{n:pn/k,d:100/k}],xr+62,y0+40,26); txt('= '+DD(pn/100),xr,y0+120,INK,30); txt('= '+pn+'%',xr,y0+185,HOT,38);
  $('say').innerHTML='100칸 가운데 '+pn+'칸을 색칠했어요. 비율은 '+F(pn,100)+' = '+DD(pn/100)+'이고, 백분율로는 <b class="r">'+pn+'%</b>예요.<small style="font-size:15.5px;color:var(--ink)">기준량을 100으로 할 때의 비율을 <b>백분율</b>이라고 해요. 기호 %를 쓰고 「퍼센트」라고 읽어요. 비율에 100을 곱하면 백분율이 돼요: '+DD(pn/100)+' × 100 = '+pn+'(%)</small>'; }
function pcUI(){ $('ctl').innerHTML='<div class="row"><label>색칠한 칸</label><input type="range" id="pN" min="0" max="100" value="'+pn+'"><output>'+pn+'칸</output></div>'+'<div class="chips">'+[[50,'1/2'],[25,'1/4'],[75,'3/4'],[20,'1/5'],[60,'3/5'],[35,'7/20'],[10,'0.1'],[5,'0.05']].map(function(k){ return '<button class="chip" data-n="'+k[0]+'">'+k[1]+' = ? %</button>'; }).join('')+'</div>';
  $('pN').oninput=function(){ pn=+this.value; this.nextElementSibling.textContent=pn+'칸'; draw(); };
  $('ctl').querySelectorAll('[data-n]').forEach(function(b){ b.onclick=function(){ pn=+b.dataset.n; $('pN').value=pn; $('pN').nextElementSibling.textContent=pn+'칸'; draw(); }; }); }

/* ───────── 5. 생활 속 비율 ───────── */
var LF=[{k:'spd',nm:'빠르기',who:['가 자동차','나 자동차'],x:['간 거리','km',60,480,20],y:['걸린 시간','시간',1,6,1],res:'걸린 시간에 대한 간 거리의 비율',unit:'',win:'더 빨라요',v:[[240,3],[300,4]],note:'걸린 시간에 대한 간 거리의 비율이 클수록 빨라요. 1시간 동안 간 거리와 같아요.'},
  {k:'pop',nm:'인구가 밀집한 정도',who:['가 마을','나 마을'],x:['인구','명',1000,20000,500],y:['넓이','㎢',2,20,1],res:'넓이에 대한 인구의 비율',unit:'',win:'인구가 더 밀집해 있어요',v:[[9000,6],[12000,10]],note:'넓이에 대한 인구의 비율이 클수록 사람이 더 빽빽하게 살아요. 1㎢에 사는 사람 수와 같아요.'},
  {k:'salt',nm:'소금물의 진하기',who:['가 컵','나 컵'],x:['소금 양','g',5,60,5],y:['소금물 양','g',100,500,50],res:'소금물 양에 대한 소금 양의 비율',unit:'%',win:'더 진해요',v:[[30,200],[40,400]],note:'소금물 양에 대한 소금 양의 비율이 클수록 진해요. 백분율로 나타내면 비교하기 쉬워요.'},
  {k:'sale',nm:'할인율',who:['가 가게','나 가게'],x:['할인 금액','원',500,5000,500],y:['원래 가격','원',5000,20000,1000],res:'원래 가격에 대한 할인 금액의 비율',unit:'%',win:'할인율이 더 높아요',v:[[2000,10000],[3000,20000]],note:'할인 금액이 커도 원래 가격이 비싸면 할인율은 낮을 수 있어요. 기준량이 다를 때는 비율로 비교해요.'}], lf=0;
function lfVal(o,i){ var v=o.v[i][0]/o.v[i][1]; return o.unit==='%'?v*100:v; }
function lfStr(o,i){ var v=lfVal(o,i), s=(Math.abs(v*100-Math.round(v*100))<1e-9)?DD(v):'약 '+v.toFixed(1); return s+o.unit; }
function lfDraw(){ var o=LF[lf], BW=BWd()-110, x0=(W-BW)/2+50, hh=54, m=Math.max(lfVal(o,0),lfVal(o,1))||1, i;
  for(i=0;i<2;i++){ var y=60+i*(hh+74), w=BW*lfVal(o,i)/m; txt(o.who[i],x0-10,y+hh/2,INK,16,'right'); rect(x0,y,w,hh,i?CO(0.85):CB(0.85),INK,2.2); txt(lfStr(o,i),x0+w+8,y+hh/2,i?HOT:ACC,20,'left');
    txt(o.x[0]+' '+o.v[i][0]+o.x[1]+' ÷ '+o.y[0]+' '+o.v[i][1]+o.y[1],x0,y-16,MUTED,14,'left'); }
  var a=lfVal(o,0), b=lfVal(o,1), E=function(i){ return o.v[i][0]+' ÷ '+o.v[i][1]+(o.unit==='%'?' × 100':'')+' = '+lfStr(o,i); };
  $('say').innerHTML=(Math.abs(a-b)<1e-9?'두 곳의 비율이 같아요.':('<b class="r">'+o.who[a>b?0:1]+'</b> 쪽이 '+o.win+'.'))+'<small style="font-size:15.5px;color:var(--ink)">'+o.res+'로 비교해요.　'+o.who[0]+': '+E(0)+'　　'+o.who[1]+': '+E(1)+'<br>'+o.note+'</small>'; }
function lfUI(){ var o=LF[lf]; $('top').innerHTML=chipsH(LF.map(function(x,i){ return [i,x.nm]; }),lf,'i');
  var S=function(id,lab,a,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+a[2]+'" max="'+a[3]+'" step="'+a[4]+'" value="'+val+'"><output>'+val+a[1]+'</output></div>'; };
  $('ctl').innerHTML='<div class="dims">'+S('l0','가: '+o.x[0],o.x,o.v[0][0])+S('l1','가: '+o.y[0],o.y,o.v[0][1])+S('l2','나: '+o.x[0],o.x,o.v[1][0])+S('l3','나: '+o.y[0],o.y,o.v[1][1])+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ lf=+b.dataset.i; lfUI(); draw(); }; });
  [0,1,2,3].forEach(function(k){ $('l'+k).oninput=function(){ o.v[k>>1][k&1]=+this.value; this.nextElementSibling.textContent=this.value+(k&1?o.y[1]:o.x[1]); draw(); }; }); }

/* ───────── 6. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a, b, q={};
  if(t===0){ do{ a=ri(2,9); b=ri(2,9); }while(a===b); var f=pick([[a+' 대 '+b,0],[J(a,'과','와')+' '+b+'의 비',0],[a+'의 '+b+'에 대한 비',0],[b+'에 대한 '+a+'의 비',0]]);
    q={lines:['「'+f[0]+'」'],ask:'비로 바르게 나타낸 것을 고르세요.',kind:'mc',opts:shuf([a+' : '+b,b+' : '+a]),ans:a+' : '+b,show:a+' : '+b,why:'「~에 대한」이 붙은 수가 기준량이고, 기준량은 기호 : 의 오른쪽에 써요.'}; }
  else if(t===1){ b=pick([2,4,5,8,10,20,25]); do{ a=ri(1,b+6); }while(a===b); q={lines:[a+' : '+b],ask:'비율을 <b>소수</b>로 나타내 보세요.',kind:'num',ans:a/b,unit:'',show:DD(a/b),why:'(비교하는 양) ÷ (기준량) = '+a+' ÷ '+b+' = '+DD(a/b),hint:'비교하는 양을 기준량으로 나누어요.'}; }
  else if(t===2){ b=pick([2,4,5,10,20,25,50]); a=ri(1,b-1); q={lines:[[{n:a,d:b}]],ask:'이 비율을 <b>백분율</b>로 나타내 보세요.',kind:'num',ans:a/b*100,unit:'%',show:DD(a/b*100)+'%',why:F(a,b)+' × 100 = '+DD(a/b*100)+'(%)',hint:'비율에 100을 곱해요.'}; }
  else if(t===3){ b=pick([20,25,40,50,200]); a=ri(1,b/5)*pick([1,2,3]); if(a>=b) a=b/5; var s=pick([['전체 학생 '+b+'명 가운데 안경을 쓴 학생은 '+a+'명','전체 학생 수에 대한 안경을 쓴 학생 수의 비율'],['공을 '+b+'번 던져 '+a+'번 넣었어요','던진 횟수에 대한 넣은 횟수의 비율'],['씨앗 '+b+'개를 심었더니 '+a+'개에서 싹이 났어요','심은 씨앗 수에 대한 싹이 난 씨앗 수의 비율']]);
    q={lines:[s[0]],ask:s[1]+'은 몇 %일까요?',kind:'num',ans:a/b*100,unit:'%',show:DD(a/b*100)+'%',why:F(a,b)+' × 100 = '+DD(a/b*100)+'(%)',hint:'기준량은 '+b+', 비교하는 양은 '+J(a,'이에요','예요')+'.'}; }
  else { do{ a=ri(2,12); b=ri(2,12); }while(a===b); var askB=rnd(2); q={lines:[a+' : '+b],ask:'이 비에서 <b>'+(askB?'기준량':'비교하는 양')+'</b>은 어느 것일까요?',kind:'mc',opts:[''+a,''+b],ans:''+(askB?b:a),show:''+(askB?b:a),why:'기호 : 의 오른쪽이 기준량, 왼쪽이 비교하는 양이에요.'}; }
  return q; });

var UIS={cmp:cmUI,ratio:rtUI,rate:rlUI,pct:pcUI,life:lfUI,quiz:quiz.ui}, DRS={cmp:cmDraw,ratio:rtDraw,rate:rlDraw,pct:pcDraw,life:lfDraw,quiz:quiz.draw};
function ui(){ if(tab!=='ratio'&&tab!=='life') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
