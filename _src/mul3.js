/* 곱셈과 나눗셈의 뜻 (3학년 1학기): 묶어 세기, 곱셈구구, 똑같이 나누기, 묶어 덜어 내기, 곱셈과 나눗셈의 관계 */
var SM='<small style="font-size:15.5px;color:var(--ink)">';
var CB=function(a){ return rgba(BLUE,a==null?0.9:a); }, CO=function(a){ return rgba(ORANGE,a==null?0.9:a); };
function sl(id,lab,min,max,val,show){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" value="'+val+'"><output>'+(show==null?val:show)+'</output></div>'; }
function sb(id,fn,fmt){ var e=$(id); e.oninput=function(){ fn(+this.value); this.nextElementSibling.textContent=fmt?fmt(+this.value):this.value; draw(); }; e.onchange=function(){ ui(); draw(); var x=$(id); if(x) x.focus(); }; }
function rr(x,y,w,h,r,fill,stroke,lw){ r=Math.min(r,w/2,h/2); g.beginPath(); g.moveTo(x+r,y); g.lineTo(x+w-r,y); g.quadraticCurveTo(x+w,y,x+w,y+r); g.lineTo(x+w,y+h-r); g.quadraticCurveTo(x+w,y+h,x+w-r,y+h); g.lineTo(x+r,y+h); g.quadraticCurveTo(x,y+h,x,y+h-r); g.lineTo(x,y+r); g.quadraticCurveTo(x,y,x+r,y); g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=lw||2; g.stroke(); } }
function rep(v,n,op){ var a=[], i; for(i=0;i<n;i++) a.push(v); return a.join(op); }
function tsz(){ return Math.min(34,W/12); }

/* ───────── 1. 묶어 세기 ───────── */
var ga=3, gb=4;
function grDraw(){ var r=Math.max(5,Math.min(24,(W-70)/(gb*2)-3,(H*0.74)/(ga*2)-6)), st=r*2+5, rw=gb*st-5+20, rh=r*2+12, x0=(W-rw)/2, y0=H*0.2+(H*0.76-ga*(rh+5))/2, i;
  txt(gb+' × '+ga+' = '+ga*gb,W/2,H*0.1,INK,tsz());
  for(i=0;i<ga;i++){ rr(x0,y0+i*(rh+5),rw,rh,rh/2,i%2?CO(0.2):CB(0.2),i%2?rgba(ORANGE,1):rgba(BLUE,1),2.5); beads(x0+10,y0+i*(rh+5)+6,gb,i%2?CO():CB(),r,gb); if(x0>40) txt(''+gb*(i+1),x0+rw+22,y0+i*(rh+5)+rh/2,MUTED,Math.min(17,rh*0.6)); }
  $('say').innerHTML=gb+'씩 '+ga+'묶음 = <b class="r">'+ga*gb+'</b>'+SM+(ga>1?rep(gb,ga,' + ')+' = '+ga*gb+'<br>':'')+gb+'의 '+ga+'배 → '+gb+' × '+ga+' = '+ga*gb+'</small>'; }
function grUI(){ $('ctl').innerHTML='<div class="dims">'+sld('gB','한 묶음',2,9,gb)+sld('gA','묶음 수',1,9,ga)+'</div>'; sldBind('gA',function(v){ ga=v; }); sldBind('gB',function(v){ gb=v; }); }

/* ───────── 2. 곱셈구구표 ───────── */
var tr=3, tc=7;
function tbGeo(){ var c=Math.min((W-16)/10,(H-10)/10); return {c:c,x0:(W-c*10)/2,y0:(H-c*10)/2}; }
function tbDraw(){ var q=tbGeo(), c=q.c, i, j, fs=c*0.44;
  for(i=0;i<=9;i++) for(j=0;j<=9;j++){ var x=q.x0+j*c, y=q.y0+i*c, hd=i===0||j===0, sel=i===tr&&j===tc, inA=i>=1&&j>=1&&i<=tr&&j<=tc, ax=(i===tr&&j===0)||(j===tc&&i===0);
    rect(x,y,c,c,sel?rgba(ORANGE,1):(ax?CB():(hd?rgba(GRAY,0.4):(inA?CB(0.3):null))),LINE,1);
    txt(i===0&&j===0?'×':(hd?''+(i||j):''+i*j),x+c/2,y+c/2,sel?INK:(hd?INK:(inA?INK:MUTED)),hd||sel?fs*1.1:fs); }
  rect(q.x0+c,q.y0+c,tc*c,tr*c,null,ACC,3);
  var lst=[]; for(i=1;i<=9;i++) lst.push(tr*i);
  $('say').innerHTML=tr+' × '+tc+' = <b class="r">'+tr*tc+'</b>'+SM+tc+' × '+tr+' = '+tr*tc+' 도 같아요. 파란 칸이 '+tr+'줄 × '+tc+'칸 = '+tr*tc+'칸이에요.<br>'+tr+'단: '+lst.join(', ')+'</small>'; }
function tbUI(){ $('ctl').innerHTML='<div class="dims">'+sld('tR','세로 (단)',1,9,tr)+sld('tC','가로',1,9,tc)+'</div>'; sldBind('tR',function(v){ tr=v; }); sldBind('tC',function(v){ tc=v; }); }

/* ───────── 3. 똑같이 나누기 ───────── */
var hN=12, hk=3;
function shDraw(){ var q=Math.floor(hN/hk), r=hN%hk, per=hk<=5?hk:Math.ceil(hk/2), rows=Math.ceil(hk/per), pw=Math.min(150,(W-16)/per), ph=Math.min(H*0.62/rows-8,pw*0.95), x0=(W-pw*per)/2, y0=H*0.2, pc=Math.max(1,Math.ceil(Math.sqrt(q*1.5))), pr=Math.ceil(q/pc)||1, br=Math.max(3,Math.min(14,(pw-18)/(pc*2)-2.5,(ph-14)/(pr*2)-2.5)), i;
  txt(hN+' ÷ '+hk+' = '+q+(r?' … '+r:''),W/2,H*0.09,INK,tsz());
  for(i=0;i<hk;i++){ var x=x0+(i%per)*pw+5, y=y0+Math.floor(i/per)*(ph+8); rr(x,y,pw-10,ph,Math.min(26,ph/2),rgba(YEL,0.3),INK,2.5); beads(x+(pw-10-(pc*(br*2+5)-5))/2,y+(ph-(pr*(br*2+5)-5))/2,q,CB(),br,pc); }
  if(r){ var ly=y0+rows*(ph+8)+10; txt('남은 것',W/2-r*13-34,ly+10,HOT,15); beads(W/2-r*12.5,ly,r,rgba(ORANGE,1),10,r); }
  $('say').innerHTML='한 접시에 <b class="r">'+q+'</b>개씩'+(r?', '+r+'개 남아요':'')+SM+hN+'개를 '+hk+'접시에 똑같이 나누었어요. 확인: '+hk+' × '+q+(r?' + '+r:'')+' = '+hN+'</small>'; }
function shUI(){ $('ctl').innerHTML='<div class="dims">'+sl('hN','구슬',2,36,hN,hN+'개')+sld('hK','접시',2,9,hk)+'</div>'; sb('hN',function(v){ hN=v; },function(v){ return v+'개'; }); sldBind('hK',function(v){ hk=v; }); }

/* ───────── 4. 묶어 덜어 내기 ───────── */
var kN=12, kb=4;
function tkDraw(){ var q=Math.floor(kN/kb), r=kN%kb, n=q+(r?1:0), y0=H*0.2, availH=H*0.66, R, bw, per, lines, lh, i;
  for(R=20;R>=4;R--){ bw=kb*(R*2+5)-5+16; per=Math.max(1,Math.floor((W-12)/(bw+8))); lines=Math.ceil(n/per); lh=R*2+22; if(lines*lh<=availH) break; }
  txt(kN+' ÷ '+kb+' = '+q+(r?' … '+r:''),W/2,H*0.09,INK,tsz());
  var yy=y0+(availH-lines*lh)/2;
  for(i=0;i<n;i++){ var ln=Math.floor(i/per), cnt=Math.min(per,n-ln*per), x=(W-cnt*(bw+8)+8)/2+(i%per)*(bw+8), y=yy+ln*lh, left=i>=q;
    if(left){ beads(x+8,y+6,r,rgba(ORANGE,1),R,kb); } else { rr(x,y,bw,R*2+12,R+6,CB(0.2),rgba(BLUE,1),2.5); beads(x+8,y+6,kb,CB(),R,kb); if(R>=8) txt(''+(i+1),x+bw/2,y+R*2+22>yy+lines*lh?y-8:y+R*2+21,ACC,12); } }
  $('say').innerHTML=kb+'개씩 <b class="r">'+q+'</b>묶음'+(r?', '+r+'개 남아요':'')+SM+(q<=6&&q>0?kN+rep(' − '+kb,q,'')+' = '+r+'<br>':'')+kN+'에서 '+kb+P(kb,'을','를')+' '+q+'번 덜어 낼 수 있어요.</small>'; }
function tkUI(){ $('ctl').innerHTML='<div class="dims">'+sl('kN','구슬',2,36,kN,kN+'개')+sld('kB','한 묶음',2,9,kb)+'</div>'; sb('kN',function(v){ kN=v; },function(v){ return v+'개'; }); sldBind('kB',function(v){ kb=v; }); }

/* ───────── 5. 곱셈과 나눗셈의 관계 ───────── */
var fa=3, fb=5, fk=0;
function fmEq(k){ var c=fa*fb; return [fb+' × '+fa+' = '+c,fa+' × '+fb+' = '+c,c+' ÷ '+fb+' = '+fa,c+' ÷ '+fa+' = '+fb][k]; }
function fmDraw(){ var r=Math.max(5,Math.min(22,(W-60)/(fb*2)-3.5,(H*0.7)/(fa*2)-3.5)), st=r*2+7, x0=(W-(fb*st-7))/2, y0=H*0.22+(H*0.72-(fa*st-7))/2, i, j, byRow=fk===0||fk===2;
  txt(fmEq(fk),W/2,H*0.1,HOT,tsz());
  if(byRow) for(i=0;i<fa;i++) rr(x0-6,y0+i*st-4,fb*st-7+12,r*2+8,r+4,i%2?CO(0.22):CB(0.22),i%2?rgba(ORANGE,1):rgba(BLUE,1),2.5);
  else for(j=0;j<fb;j++) rr(x0+j*st-4,y0-6,r*2+8,fa*st-7+12,r+4,j%2?CO(0.22):CB(0.22),j%2?rgba(ORANGE,1):rgba(BLUE,1),2.5);
  for(i=0;i<fa;i++) for(j=0;j<fb;j++){ g.beginPath(); g.arc(x0+j*st+r,y0+i*st+r,r,0,7); g.fillStyle=((byRow?i:j)%2)?CO():CB(); g.fill(); g.strokeStyle=INK; g.lineWidth=1.5; g.stroke(); }
  var c=fa*fb, ex=[fb+'씩 '+fa+'묶음이에요.',fa+'씩 '+fb+'묶음이에요.',c+'개를 '+fb+'개씩 묶으면 '+fa+'묶음이에요.',c+'개를 '+fa+'개씩 묶으면 '+fb+'묶음이에요.'][fk];
  $('say').innerHTML='<b class="r">'+fmEq(fk)+'</b> '+ex+SM+'그림 하나로 곱셈식 2개, 나눗셈식 2개를 만들 수 있어요.<br>'+[0,1,2,3].map(fmEq).join('　')+'</small>'; }
function fmUI(){ $('top').innerHTML=chipsH([0,1,2,3].map(function(k){ return [k,fmEq(k)]; }),fk,'k'); $('ctl').innerHTML='<div class="dims">'+sld('fA','줄 수',2,9,fa)+sld('fB','한 줄',2,9,fb)+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ fk=+b.dataset.k; ui(); draw(); }; }); sldBind('fA',function(v){ fa=v; }); sldBind('fB',function(v){ fb=v; }); }

/* ───────── 6. 문제 풀기 ───────── */
var quiz=QZ(function(){ var t=rnd(5), a=ri(2,9), b=ri(2,9), c=a*b, q;
  if(t===0) q={lines:[a+' × '+b+' = ?'],ask:'계산해 보세요.',ans:c,show:''+c,why:a+'씩 '+b+'묶음이에요. '+(b<=5?rep(a,b,' + ')+' = '+c:a+'단을 외워 보세요.'),hint:a+'씩 '+b+'번 더해 보세요.'};
  else if(t===1) q={lines:[c+' ÷ '+a+' = ?'],ask:'계산해 보세요.',ans:b,show:''+b,why:a+' × '+b+' = '+c+' 이므로 '+c+' ÷ '+a+' = '+b,hint:a+'단에서 '+c+P(c,'이','가')+' 되는 곱을 찾아보세요.'};
  else if(t===2) q={lines:['□ × '+a+' = '+c],ask:'□ 안에 알맞은 수는?',ans:b,show:''+b,why:c+' ÷ '+a+' = '+b,hint:'나눗셈으로 바꾸어 생각해요: '+c+' ÷ '+a};
  else if(t===3) q={lines:['사탕 '+c+'개를','「'+a+'명」이 똑같이 나누면'],ask:'한 명이 몇 개씩 가질까요?',ans:b,unit:'개',show:b+'개',why:c+' ÷ '+a+' = '+b,hint:'나눗셈식: '+c+' ÷ '+a};
  else q={lines:['귤 '+c+'개를 한 봉지에','「'+a+'개씩」 담으면'],ask:'몇 봉지가 될까요?',ans:b,unit:'봉지',show:b+'봉지',why:c+' ÷ '+a+' = '+b,hint:'나눗셈식: '+c+' ÷ '+a};
  q.kind='num'; if(!q.unit) q.unit=''; return q; });

function onTap(x,y){ if(tab!=='table') return; var q=tbGeo(), j=Math.floor((x-q.x0)/q.c), i=Math.floor((y-q.y0)/q.c); if(i<0||j<0||i>9||j>9||(i===0&&j===0)) return; if(i>=1) tr=i; if(j>=1) tc=j; ui(); draw(); }
var UIS={grp:grUI,table:tbUI,share:shUI,take:tkUI,fam:fmUI,quiz:quiz.ui}, DRS={grp:grDraw,table:tbDraw,share:shDraw,take:tkDraw,fam:fmDraw,quiz:quiz.draw};
function ui(){ if(tab!=='fam') $('top').innerHTML=''; UIS[tab](); }
function draw(){ tone(); g.clearRect(0,0,W,H); DRS[tab](); }
function setTab(t){ anStop(); tab=t; $('hint').textContent=t==='table'?'👆 표의 칸을 눌러 보세요':''; document.querySelectorAll('#tabs button').forEach(function(b){ b.setAttribute('aria-selected',b.dataset.t===t); }); ui(); draw(); }
