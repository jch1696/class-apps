import re
p='../class-apps/index.html'
s=open(p,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:40].encode('unicode_escape')); s=s.replace(a,b)
rep('>수학 17</button>','>수학 20</button>')
rep('수와 연산<small>4개 · 번호는 배우는 순서</small>','수와 연산<small>7개 · 번호는 배우는 순서</small>')
def card(h,no,tag,t,d): return '<a class="card" href="%s.html"><span class="tags"><span class="no">%d</span><span class="tag g5">%s</span></span><h2>%s</h2><p>%s</p><span class="go">열기 →</span></a>\n'%(h,no,tag,t,d)
i=s.index('<a class="card" href="fracadd.html">'); j=s.index('<a class="card" href="fracdiv.html">')
blk=s[i:j]
m=re.search(r'<a class="card" href="mult.html">.*?</a>\n',blk,re.S); mult=m.group(0)
assert '<span class="no">2</span>' in mult
new=(card('mixed',1,'5학년 1학기','자연수의 혼합 계산','덧셈, 뺄셈, 곱셈, 나눗셈과 ( )가 섞인 식의 계산 순서를 단계별로 알아봐요.')
 +card('divisors',2,'5학년 1학기','약수와 배수','구슬을 줄지어 놓고 수 배열표를 색칠하며 약수와 배수, 최대공약수와 최소공배수를 알아봐요.')
 +card('fracadd',3,'5학년 1학기','약분과 통분, 분수의 덧셈과 뺄셈','분수 막대로 약분과 통분, 크기 비교, 덧셈과 뺄셈, 분수와 소수의 관계를 알아봐요.')
 +card('rounding',4,'5학년 2학기','수의 범위와 어림하기','수직선으로 이상, 이하, 초과, 미만과 올림, 버림, 반올림을 알아봐요.')
 +mult.replace('<span class="no">2</span>','<span class="no">5</span>'))
s=s[:i]+new+s[j:]
rep('<a class="card" href="fracdiv.html"><span class="tags"><span class="no">3</span>','<a class="card" href="fracdiv.html"><span class="tags"><span class="no">6</span>')
rep('<a class="card" href="decdiv.html"><span class="tags"><span class="no">4</span>','<a class="card" href="decdiv.html"><span class="tags"><span class="no">7</span>')
rep('<p>도형을 자르고 붙여 평행사변형, 삼각형, 사다리꼴, 마름모의 넓이를 구해요.</p>','<p>도형을 자르고 붙여 평행사변형, 삼각형, 사다리꼴, 마름모의 넓이를 구하고, 넓이 단위를 알아봐요.</p>')
open(p,'w',encoding='utf-8',newline='\n').write(s)
print('ok')
