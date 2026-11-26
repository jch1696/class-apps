# -*- coding: utf-8 -*-
# 4학년 앱 만들기: ratio.html 을 틀로 삼아 제목·탭·앱 코드만 바꾼다.  python _src/mk4.py  (저장소 폴더에서)
import io, os, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = io.open(os.path.join(R, 'ratio.html'), encoding='utf-8').read()
A0 = '/* 비와 비율 (6학년 1학기) */'
A1 = "\ndocument.querySelectorAll('#tabs button')"
APPS = {
 'frac4': dict(title='분수의 덧셈과 뺄셈', sub='분수 막대로 진분수, 가분수, 대분수와 분모가 같은 분수의 덧셈, 뺄셈을 알아봐요',
   tabs=[('kind', '① 진분수·가분수·대분수'), ('add', '② 덧셈'), ('sub', '③ 뺄셈'), ('mix', '④ 대분수 계산'), ('quiz', '⑤ 문제 풀기')]),
 'dec4': dict(title='소수의 덧셈과 뺄셈', sub='모눈 100칸으로 소수의 자릿값, 크기 비교, 덧셈과 뺄셈을 알아봐요',
   tabs=[('two', '① 소수 두 자리 수'), ('place', '② 자릿값'), ('cmp', '③ 크기 비교'), ('plus', '④ 덧셈'), ('minus', '⑤ 뺄셈'), ('shift', '⑥ 10배와 1/10'), ('quiz', '⑦ 문제 풀기')]),
 'angle4': dict(title='각도', sub='각도기로 각을 재고, 삼각형과 사각형의 각의 합을 알아봐요',
   tabs=[('meas', '① 각도 재기'), ('est', '② 어림하기'), ('sum', '③ 합과 차'), ('tri', '④ 삼각형의 세 각'), ('quad', '⑤ 사각형의 네 각'), ('quiz', '⑥ 문제 풀기')]),
}
for k, a in APPS.items():
    s = t
    assert s.count(A0) == 1 and s.count(A1) == 1
    js = io.open(os.path.join(R, '_src', k + '.js'), encoding='utf-8').read()
    s = s[:s.find(A0)] + js + s[s.find(A1):]
    s = s.replace('<title>비와 비율</title>', '<title>%s</title>' % a['title'])
    tabs = '\n'.join('    <button data-t="%s" role="tab" aria-selected="%s">%s</button>' % (x, 'true' if i == 0 else 'false', n) for i, (x, n) in enumerate(a['tabs']))
    s, n = re.subn(r'<header>.*?</header>\s*<div class="card"><div class="tabs" id="tabs" role="tablist">.*?</div></div>',
                   lambda m: '<header><h1>%s</h1><p>%s</p></header>\n  <div class="card"><div class="tabs" id="tabs" role="tablist">\n%s\n  </div></div>' % (a['title'], a['sub'], tabs), s, 1, re.S)
    assert n == 1 and s.count('TAB0="cmp"') == 1
    s = s.replace('TAB0="cmp"', 'TAB0="%s"' % a['tabs'][0][0])
    io.open(os.path.join(R, k + '.html'), 'w', encoding='utf-8', newline='\n').write(s)
    print('ok', k, len(s))
