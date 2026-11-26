s=open('graphs.js',encoding='utf-8').read()
x=open('xy_part.js',encoding='utf-8').read()
assert x.rstrip().endswith('} }'), x[-80:]
x=x.replace("st+o.u+J('','','')+'(으)로 작아져","st+o.u+'씩으로 작아져").replace("o.x[hl]+'과(와) '+o.x[hl+1]+' 사이</b>로,","o.x[hl]+KP(o.x[hl],'과','와')+' '+o.x[hl+1]+' 사이</b>이고,")
assert "J(''" not in x and '과(와)' not in x
def r(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:60].encode('unicode_escape')); s=s.replace(a,b)
r("/* ───────── 2. 띠그래프 ───────── */",x+"\n/* ───────── 2. 띠그래프 ───────── */")
r("if(my.k==='band') drawBand(m.it,(W-BWd())/2,H/2-30,BWd(),80,true,null); else drawPie(m.it,W/2,H/2+16,Math.min(H/2-54,W*0.3),true,null);",
  "if(my.k==='bar'||my.k==='line'){ drawXY(my.k,m.it.map(function(x){ return x.nm; }),m.it.map(function(x){ return x.n; }),{vals:true,u:'수',top:64}); $('say').innerHTML=m.it.map(function(x){ return x.nm+' '+x.n; }).join(', ')+' (합계 '+m.T+')<small>'+(my.k==='bar'?'막대그래프는 항목별 크기를 비교할 때 알맞아요.':'꺾은선그래프는 시간에 따라 변하는 자료에 알맞아요. 항목을 날짜나 시각 순서로 써 보세요.')+' 쓴 내용은 이 기기에 저장돼요.</small>'; return; }\n  if(my.k==='band') drawBand(m.it,(W-BWd())/2,H/2-30,BWd(),80,true,null); else drawPie(m.it,W/2,H/2+16,Math.min(H/2-54,W*0.3),true,null);")
r("chipsH([['band','띠그래프'],['pie','원그래프']],my.k,'k')","chipsH([['band','띠그래프'],['pie','원그래프'],['bar','막대그래프'],['line','꺾은선그래프']],my.k,'k')")
r("var UIS={pic:pgUI,","var UIS={xy:xyUI,pic:pgUI,")
r("DRS={pic:pgDraw,","DRS={xy:xyDraw,pic:pgDraw,")
open('graphs.js','w',encoding='utf-8',newline='\n').write(s)
m=open('mk.py',encoding='utf-8').read()
a="tabs=[('pic','① 그림그래프'),('band','② 띠그래프'),('pie','③ 원그래프'),('read','④ 그래프 해석하기'),('pick','⑤ 알맞은 그래프'),('mine','⑥ 우리 반 자료')]"
assert m.count(a)==1
m=m.replace(a,"tabs=[('pic','① 그림그래프'),('xy','② 막대와 꺾은선'),('band','③ 띠그래프'),('pie','④ 원그래프'),('read','⑤ 그래프 해석하기'),('pick','⑥ 알맞은 그래프'),('mine','⑦ 우리 반 자료')]")
a="sub='그림그래프, 띠그래프, 원그래프를 만들고 읽어 봐요'"
assert m.count(a)==1
m=m.replace(a,"sub='그림, 막대, 꺾은선, 띠, 원그래프를 만들고 읽어 봐요'")
open('mk.py','w',encoding='utf-8',newline='\n').write(m)
print('patched')
