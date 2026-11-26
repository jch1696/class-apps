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

