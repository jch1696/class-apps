/* ───────── 넓이 단위 ───────── */
var uM='m', uW=3, uH=2, uU='m';
function utxt(t,x,y,col,sz,al){ g.font=(sz||16)+'px Jua,"Malgun Gothic",sans-serif'; g.textAlign=al||'center'; g.textBaseline='middle'; g.lineWidth=5; g.lineJoin='round'; g.strokeStyle=HALO; g.strokeText(t,x,y); g.fillStyle=col||INK; g.fillText(t,x,y); }
function uln(x1,y1,x2,y2,col,lw){ g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.strokeStyle=col; g.lineWidth=lw; g.setLineDash([]); g.stroke(); }
var SMU='<small style="font-size:15.5px;color:var(--ink)">';
function unitDraw(){ var i, j;
  if(uM==='conv'){ var km=uU==='km', bu=km?'km':'m', su=km?'m':'cm', k=km?1000:100, A=km?'㎢':'㎡', a=km?'㎡':'㎠', c=Math.min((W-130)/uW,(H-76)/uH,74), x0=(W-c*uW)/2+22, y0=(H-30-c*uH)/2;
    for(i=0;i<uW;i++) for(j=0;j<uH;j++){ g.fillStyle=rgba(BLUE,0.3); g.fillRect(x0+i*c,y0+j*c,c,c); g.strokeStyle=INK; g.lineWidth=1.2; g.strokeRect(x0+i*c,y0+j*c,c,c); if(c>=38) utxt('1'+A,x0+i*c+c/2,y0+j*c+c/2,MUTED,Math.min(15,c/4)); }
    g.strokeStyle=INK; g.lineWidth=2.6; g.strokeRect(x0,y0,c*uW,c*uH);
    utxt('가로 '+uW+bu+' = '+uW*k+su,x0+c*uW/2,y0+c*uH+18,INK,15); utxt('세로 '+uH+bu,x0-10,y0+c*uH/2-10,INK,15,'right'); utxt('= '+uH*k+su,x0-10,y0+c*uH/2+10,INK,15,'right');
    var V=uW*uH, z=km?'000000':'0000';
    $('say').innerHTML='<b class="r">'+V+A+' = '+V+z+a+'</b>'+SMU+bu+'로 구하면 '+uW+' × '+uH+' = '+V+'('+A+')이에요. '+su+'로 바꾸어 구하면 '+uW*k+' × '+uH*k+' = '+V+z+'('+a+')이에요.<br>1'+A+' = 1'+z+a+'이므로 '+A+'를 '+a+'로 바꿀 때는 0을 '+(km?'6':'4')+'개 붙이고, 거꾸로 바꿀 때는 0을 '+(km?'6':'4')+'개 떼요.</small>'; return; }
  var K=uM==='km', S=Math.min(H-58,W-120), X0=(W-S)/2+18, Y0=10, c10=S/10;
  g.fillStyle=rgba(BLUE,0.2); g.fillRect(X0,Y0,S,S);
  if(S>=240) for(i=1;i<100;i++) if(i%10){ uln(X0+i*S/100,Y0,X0+i*S/100,Y0+S,LINE,0.5); uln(X0,Y0+i*S/100,X0+S,Y0+i*S/100,LINE,0.5); }
  for(i=1;i<10;i++){ uln(X0+i*c10,Y0,X0+i*c10,Y0+S,MUTED,1); uln(X0,Y0+i*c10,X0+S,Y0+i*c10,MUTED,1); }
  var th=Math.max(4,S/100); g.fillStyle=rgba(ORANGE,0.75); g.fillRect(X0,Y0+S-th,S,th); g.fillRect(X0,Y0,th,S); g.fillStyle=HOT; g.fillRect(X0,Y0+S-th,th,th);
  g.strokeStyle=INK; g.lineWidth=2.6; g.strokeRect(X0,Y0,S,S);
  utxt(K?'1㎢':'1㎡',X0+S/2,Y0+S/2,INK,Math.min(44,S/6));
  utxt(K?'1km = 1000m':'1m = 100cm',X0+S/2,Y0+S+20,INK,16); utxt(K?'1km':'1m',X0-10,Y0+S/2-10,INK,16,'right'); utxt(K?'= 1000m':'= 100cm',X0-10,Y0+S/2+11,INK,14,'right');
  uln(X0+th/2,Y0+S-th/2,X0+c10*1.6,Y0+S-c10*1.6,HOT,1.5); utxt(K?'1㎡':'1㎠',X0+c10*2.1,Y0+S-c10*2,HOT,15);
  $('say').innerHTML=K?('한 변의 길이가 1km인 정사각형의 넓이를 <b class="r">1㎢</b>라 쓰고 <b>1 제곱킬로미터</b>라고 읽어요.'+SMU+'1km = 1000m이므로 1㎢ 안에는 1㎡가 한 줄에 1000개씩 1000줄 들어가요. 1000 × 1000 = 1000000이므로 <b class="r">1㎢ = 1000000㎡</b>예요.<br>도시나 나라처럼 아주 넓은 곳의 넓이를 나타낼 때 써요. 그림의 작은 칸 하나는 한 변이 100m예요.</small>'):
    ('한 변의 길이가 1m인 정사각형의 넓이를 <b class="r">1㎡</b>라 쓰고 <b>1 제곱미터</b>라고 읽어요.'+SMU+'1m = 100cm이므로 1㎡ 안에는 1㎠가 한 줄에 100개씩 100줄 들어가요. 100 × 100 = 10000이므로 <b class="r">1㎡ = 10000㎠</b>예요.<br>교실이나 방처럼 넓은 곳의 넓이를 나타낼 때 써요. 그림의 작은 칸 하나는 한 변이 10cm예요.</small>'); }
function unitUI(){ $('top').innerHTML='<div class="chips">'+[['m','1㎡와 1㎠'],['km','1㎢와 1㎡'],['conv','단위 바꾸기']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===uM)+'" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div>';
  $('top').querySelectorAll('.chip').forEach(function(b){ b.onclick=function(){ uM=b.dataset.k; ui(); draw(); }; });
  if(uM!=='conv'){ $('ctl').innerHTML=''; return; }
  var r=function(id,lab,max,val){ return '<div class="row"><label>'+lab+'</label><input type="range" id="'+id+'" min="1" max="'+max+'" value="'+val+'"><output>'+val+uU+'</output></div>'; };
  $('ctl').innerHTML='<div class="chips" style="margin-top:8px">'+[['m','㎡ ↔ ㎠'],['km','㎢ ↔ ㎡']].map(function(k){ return '<button class="chip" aria-pressed="'+(k[0]===uU)+'" data-u="'+k[0]+'">'+k[1]+'</button>'; }).join('')+'</div><div class="dims">'+r('uW','가로',8,uW)+r('uH','세로',5,uH)+'</div>';
  $('ctl').querySelectorAll('[data-u]').forEach(function(b){ b.onclick=function(){ uU=b.dataset.u; ui(); draw(); }; });
  $('uW').oninput=function(){ uW=+this.value; this.nextElementSibling.textContent=uW+uU; draw(); }; $('uH').oninput=function(){ uH=+this.value; this.nextElementSibling.textContent=uH+uU; draw(); }; }

