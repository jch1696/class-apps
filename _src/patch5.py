def rep(s,a,b):
    assert s.count(a)==1,(s.count(a),a[:50].encode('unicode_escape'))
    return s.replace(a,b)
# fracadd
s=open('fracadd.js',encoding='utf-8').read()
x=open('frac_part.js',encoding='utf-8').read()
s=rep(s,"/* ───────── 6. 문제 풀기 ───────── */",x+"/* ───────── 문제 풀기 ───────── */")
s=rep(s,"var UIS={eq:eqUI,red:rdUI,com:comUI,add:asUI,sub:asUI,quiz:qzUI}, DRS={eq:eqDraw,red:rdDraw,com:comDraw,add:asDraw,sub:asDraw,quiz:qzDraw};",
      "var UIS={eq:eqUI,red:rdUI,com:comUI,cmp:cpUI,add:asUI,sub:asUI,dec:decUI,quiz:qzUI}, DRS={eq:eqDraw,red:rdDraw,com:comDraw,cmp:cpDraw,add:asDraw,sub:asDraw,dec:decDraw,quiz:qzDraw};")
open('fracadd.js','w',encoding='utf-8',newline='\n').write(s)
# area
s=open('area.js',encoding='utf-8').read()
x=open('unit_part.js',encoding='utf-8').read()
s=rep(s,"function ui(){ $('top').innerHTML=''; ({rect:rectUI,para:paraUI,tri:triUI,trap:trapUI,rhom:rhomUI,quiz:quizUI})[tab](); }",
      x+"function ui(){ $('top').innerHTML=''; ({rect:rectUI,para:paraUI,tri:triUI,trap:trapUI,rhom:rhomUI,unit:unitUI,quiz:quizUI})[tab](); }")
s=rep(s,"rhom:rhomDraw,quiz:quizDraw})[tab]();","rhom:rhomDraw,unit:unitDraw,quiz:quizDraw})[tab]();")
s=rep(s,"$('hint').style.visibility=t==='quiz'?'hidden':'visible';","$('hint').style.visibility=(t==='quiz'||t==='unit')?'hidden':'visible';")
open('area.js','w',encoding='utf-8',newline='\n').write(s)
# mk.py
m=open('mk.py',encoding='utf-8').read()
m=rep(m,"tabs=[('eq','① 크기가 같은 분수'),('red','② 약분'),('com','③ 통분'),('add','④ 덧셈'),('sub','⑤ 뺄셈'),('quiz','⑥ 문제 풀기')]",
      "tabs=[('eq','① 크기가 같은 분수'),('red','② 약분'),('com','③ 통분'),('cmp','④ 크기 비교'),('add','⑤ 덧셈'),('sub','⑥ 뺄셈'),('dec','⑦ 분수와 소수'),('quiz','⑧ 문제 풀기')]")
m=rep(m,"sub='분수 막대를 나누고 합치며 약분과 통분, 덧셈과 뺄셈을 알아봐요'","sub='분수 막대를 나누고 합치며 약분과 통분, 크기 비교, 덧셈과 뺄셈, 분수와 소수의 관계를 알아봐요'")
m=rep(m,"('rhom','⑤ 마름모'),('quiz','⑥ 문제 풀기')]","('rhom','⑤ 마름모'),('unit','⑥ 넓이 단위'),('quiz','⑦ 문제 풀기')]")
m=rep(m,"sub='도형을 자르고 붙여 넓이 구하는 방법을 찾아봐요'","sub='도형을 자르고 붙여 넓이 구하는 방법을 찾고, 넓이 단위를 알아봐요'")
new=""" 'divisors':dict(title='약수와 배수',sub='구슬을 줄지어 놓고 수 배열표를 색칠하며 약수와 배수, 공약수와 공배수를 알아봐요',
   tabs=[('div','① 약수'),('mul','② 배수'),('gcd','③ 공약수와 최대공약수'),('lcm','④ 공배수와 최소공배수'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','divisors.js'],d3=False),
 'rounding':dict(title='수의 범위와 어림하기',sub='수직선으로 이상, 이하, 초과, 미만과 올림, 버림, 반올림을 알아봐요',
   tabs=[('one','① 이상·이하·초과·미만'),('two','② 수의 범위'),('round','③ 올림·버림·반올림'),('life','④ 생활 속 어림'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','rounding.js'],d3=False),
 'mixed':dict(title='자연수의 혼합 계산',sub='덧셈, 뺄셈, 곱셈, 나눗셈과 ( )가 섞인 식의 계산 순서를 알아봐요',
   tabs=[('order','① 계산 순서'),('tap','② 순서 맞히기'),('paren','③ ( )의 힘'),('story','④ 식 세우기'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','mixed.js'],d3=False),
"""
m=rep(m,"APPS={\n","APPS={\n"+new)
open('mk.py','w',encoding='utf-8',newline='\n').write(m)
print('patched')
