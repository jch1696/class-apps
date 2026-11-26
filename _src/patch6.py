import shutil
def rep(s,a,b):
    assert s.count(a)==1,(s.count(a),a[:50].encode('unicode_escape'))
    return s.replace(a,b)
def rd(p): return open(p,encoding='utf-8').read()
def wr(p,s): open(p,'w',encoding='utf-8',newline='\n').write(s)
for f in ['decdiv.js','average.js','fracadd.js','area.js','mk.py']: shutil.copy(f,f+'.bak6')
# decdiv
s=rd('decdiv.js')
s=rep(s,"var UIS={shift:shUI,long:lgUI,est:esUI,rem:rmUI}, DRS={shift:shDraw,long:lgDraw,est:esDraw,rem:rmDraw};",
  rd('nn_part.js')+"var UIS={shift:shUI,long:lgUI,est:esUI,rem:rmUI,nn:nnUI}, DRS={shift:shDraw,long:lgDraw,est:esDraw,rem:rmDraw,nn:nnDraw};")
wr('decdiv.js',s)
# average
s=rd('average.js')
s=rep(s,"var UIS={level:lvUI,",rd('judge_part.js')+"var UIS={judge:function(){ $('top').innerHTML=''; jq.ui(); },level:lvUI,")
s=rep(s,"DRS={level:lvDraw,","DRS={judge:jq.draw,level:lvDraw,")
wr('average.js',s)
# fracadd quiz
s=rd('fracadd.js')
i=s.index("/* ───────── 문제 풀기 ───────── */"); j=s.index("var UIS=")
s=s[:i]+rd('fq_part.js')+s[j:]
wr('fracadd.js',s)
# area quiz
s=rd('area.js')
s=rep(s,"var t=['rect','rectP','para','tri','trap','rhom'][rnd(6)]","var t=['rect','rectP','para','tri','trap','rhom','unit','unit'][rnd(8)]")
s=rep(s,"  else { q.d1=2*(2+rnd(5));","""  else if(t==='unit'){ var ua=2+rnd(8), us=rnd(5), ub=2+rnd(5); q.ask='□'; q.nm='넓이 단위'; q.hint='1㎡ = 10000㎠, 1㎢ = 1000000㎡';
    if(us===0){ q.L=ua+'㎡ = □㎠'; q.ans=ua*10000; q.unit='㎠'; q.why='1㎡ = 10000㎠이므로 0을 4개 붙이면 '+ua+'㎡ = '+q.ans+'㎠'; }
    else if(us===1){ q.L=ua*10000+'㎠ = □㎡'; q.ans=ua; q.unit='㎡'; q.why='10000㎠ = 1㎡이므로 0을 4개 떼면 '+ua*10000+'㎠ = '+ua+'㎡'; }
    else if(us===2){ q.L=ua+'㎢ = □㎡'; q.ans=ua*1000000; q.unit='㎡'; q.why='1㎢ = 1000000㎡이므로 0을 6개 붙이면 '+ua+'㎢ = '+q.ans+'㎡'; }
    else if(us===3){ q.L=ua*1000000+'㎡ = □㎢'; q.ans=ua; q.unit='㎢'; q.why='1000000㎡ = 1㎢이므로 0을 6개 떼면 '+ua*1000000+'㎡ = '+ua+'㎢'; }
    else { q.L='가로 '+ua*100+'cm, 세로 '+ub*100+'cm'; q.L2='이 직사각형의 넓이는 몇 ㎡일까요?'; q.ans=ua*ub; q.unit='㎡'; q.hint='먼저 cm를 m로 바꾸어요. 100cm = 1m'; q.why=ua*100+'cm = '+ua+'m, '+ub*100+'cm = '+ub+'m이므로 '+ua+' × '+ub+' = '+q.ans+'(㎡)'; } }
  else { q.d1=2*(2+rnd(5));""")
s=rep(s,"function quizDraw(){ if(!qz) qzNew(); var q=qz;\n","""function quizDraw(){ if(!qz) qzNew(); var q=qz;
  if(q.t==='unit'){ var us=Math.min(36,W/11), ut=q.done?q.L.replace('□',''+q.ans):q.L, uf=function(){ g.font=us+'px Jua,"Malgun Gothic",sans-serif'; }; uf(); while(g.measureText(ut).width>W-30&&us>14){ us--; uf(); }
    utxt(ut,W/2,H*0.4,INK,us); if(q.L2) utxt(q.done?'넓이 = '+q.ans+'㎡':q.L2,W/2,H*0.4+us*1.8,q.done?HOT:MUTED,Math.max(15,us*0.8));
    $('say').innerHTML=q.done?('<b class="r">정답이에요!</b> 답: '+q.ans+q.unit+'<small style="font-size:15.5px;color:var(--ink)">'+q.why+'</small>'):
      ((q.L2?'넓이를 ㎡ 단위로 구해 보세요.':'□ 안에 알맞은 수를 써 보세요.')+(q.tries>=2?'<small style="font-size:15.5px;color:var(--ink)">도움말: '+q.hint+'</small>':'<small>넓이 단위 사이의 관계를 떠올려 보세요.</small>')); return; }
""")
s=rep(s,"if(qz.done){ $('qIn').value=fmt(qz.ans);","if(qz.done){ $('qIn').value=qz.t==='unit'?qz.ans:fmt(qz.ans);")
s=rep(s,"$('hint').style.visibility=(t==='quiz'||t==='unit')?'hidden':'visible';","$('hint').style.visibility=(t==='quiz'||t==='unit')?'hidden':'visible'; if(t==='quiz'&&qz&&qz.t==='unit'){ }")
wr('area.js',s)
# mk.py
m=rd('mk.py')
m=rep(m,"('est','③ 어림하기'),('rem','④ 몫과 나머지')]","('est','③ 어림하기'),('rem','④ 몫과 나머지'),('nn','⑤ 몫을 소수로')]")
m=rep(m,"sub='소수점을 옮기는 까닭과 세로셈, 어림, 나머지를 알아봐요'","sub='소수점을 옮기는 까닭과 세로셈, 어림, 나머지, 몫을 소수로 나타내는 방법을 알아봐요'")
m=rep(m,"('num','⑤ 가능성을 수로'),('exp','⑥ 실험하기')]","('num','⑤ 가능성을 수로'),('exp','⑥ 실험하기'),('judge','⑦ 가능성으로 판단하기')]")
m=rep(m,"sub='자료를 고르게 하여 평균을 구하고, 일이 일어날 가능성을 알아봐요'","sub='자료를 고르게 하여 평균을 구하고, 일이 일어날 가능성을 알아보고 판단해요'")
wr('mk.py',m)
# index
p='../class-apps/index.html'; s=rd(p)
s=rep(s,"<p>소수점을 옮기는 까닭과 세로셈, 어림하기, 몫과 나머지를 알아봐요.</p>","<p>소수점을 옮기는 까닭과 세로셈, 어림하기, 몫과 나머지, 몫을 소수로 나타내기를 알아봐요.</p>")
s=rep(s,"<p>자료를 고르게 하여 평균을 구하고, 일이 일어날 가능성을 말과 수로 나타내요.</p>","<p>자료를 고르게 하여 평균을 구하고, 일이 일어날 가능성을 말과 수로 나타내고 판단해요.</p>")
wr(p,s)
print('patched')
