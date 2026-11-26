# -*- coding: utf-8 -*-
# 5·6학년 수학 앱 16개 만들기 (저장소 폴더에서):
#   python _src/mk.py ratio area      -> 고른 앱만 다시 만듦
#   python _src/mk.py all             -> 16개 모두
#   python _src/mk.py all --out DIR   -> 저장소는 그대로 두고 DIR 에 만들어 비교
# 경로는 이 파일 위치 기준: 소스는 _src/, 결과는 저장소 맨 위, 공통 스타일은 prism.html 에서 읽음.
import sys, io, os
SRC=os.path.dirname(os.path.abspath(__file__))+'/'
ROOT=os.path.dirname(SRC.rstrip('/'))+'/'
OUT=ROOT
src=open(ROOT+'prism.html',encoding='utf-8').read()
css=src[src.find('<style>')+7:src.find('</style>')]
core3=src[src.find('function rot(p)'):src.find('/* 입체 모형')]
def rd(n):
    if n=='box.js':
        v=open(SRC+'volume.js',encoding='utf-8').read(); v=v[v.find('var DIRS'):v.find('/* ───────── 1.')]
        return v
    if n=='g2d.js':
        v=open(SRC+'area.js',encoding='utf-8').read(); return v[:v.find('/* 도형 그리기')]
    return open(SRC+n,encoding='utf-8').read()
APPS={
 'divisors':dict(title='약수와 배수',sub='구슬을 줄지어 놓고 수 배열표를 색칠하며 약수와 배수, 공약수와 공배수를 알아봐요',
   tabs=[('div','① 약수'),('mul','② 배수'),('gcd','③ 공약수와 최대공약수'),('lcm','④ 공배수와 최소공배수'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','divisors.js'],d3=False),
 'rounding':dict(title='수의 범위와 어림하기',sub='수직선으로 이상, 이하, 초과, 미만과 올림, 버림, 반올림을 알아봐요',
   tabs=[('one','① 이상·이하·초과·미만'),('two','② 수의 범위'),('round','③ 올림·버림·반올림'),('life','④ 생활 속 어림'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','rounding.js'],d3=False),
 'mixed':dict(title='자연수의 혼합 계산',sub='덧셈, 뺄셈, 곱셈, 나눗셈과 ( )가 섞인 식의 계산 순서를 알아봐요',
   tabs=[('order','① 계산 순서'),('tap','② 순서 맞히기'),('paren','③ ( )의 힘'),('story','④ 식 세우기'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','mixed.js'],d3=False),
 'graphs':dict(title='여러 가지 그래프',sub='그림, 막대, 꺾은선, 띠, 원그래프를 만들고 읽어 봐요',
   tabs=[('pic','① 그림그래프'),('xy','② 막대와 꺾은선'),('band','③ 띠그래프'),('pie','④ 원그래프'),('read','⑤ 그래프 해석하기'),('pick','⑥ 알맞은 그래프'),('mine','⑦ 우리 반 자료')],
   hint='',js=['n2d.js','graphs.js'],d3=False),
 'average':dict(title='평균과 가능성',sub='자료를 고르게 하여 평균을 구하고, 일이 일어날 가능성을 알아보고 판단해요',
   tabs=[('level','① 평균의 뜻'),('calc','② 평균 구하기'),('use','③ 평균 이용하기'),('word','④ 가능성을 말로'),('num','⑤ 가능성을 수로'),('exp','⑥ 실험하기'),('judge','⑦ 가능성으로 판단하기')],
   hint='',js=['n2d.js','average.js'],d3=False),
 'ratio':dict(title='비와 비율',sub='두 양을 나눗셈으로 비교하고, 비와 비율, 백분율을 알아봐요',
   tabs=[('cmp','① 두 수 비교하기'),('ratio','② 비'),('rate','③ 비율'),('pct','④ 백분율'),('life','⑤ 생활 속 비율'),('quiz','⑥ 문제 풀기')],
   hint='',js=['n2d.js','ratio.js'],d3=False),
 'proportion':dict(title='비례식과 비례배분',sub='비의 성질과 비례식, 비례배분을 구슬로 알아봐요',
   tabs=[('prop','① 비의 성질'),('simp','② 간단한 자연수의 비'),('eq','③ 비례식'),('share','④ 비례배분'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','proportion.js'],d3=False),
 'pattern':dict(title='규칙과 대응',sub='두 양 사이의 대응 관계를 찾아 식으로 나타내 봐요',
   tabs=[('shape','① 도형 규칙'),('table','② 대응 관계 찾기'),('expr','③ 식으로 나타내기'),('machine','④ 수 넣는 기계')],
   hint='',js=['n2d.js','pattern.js'],d3=False),
 'fracdiv':dict(title='분수의 나눗셈',sub='그림으로 나누어 보며 분수의 나눗셈을 곱셈으로 바꾸는 까닭을 알아봐요',
   tabs=[('nn','① 자연수 ÷ 자연수'),('fn','② 분수 ÷ 자연수'),('ff','③ 분수 ÷ 분수'),('fx','④ 분모가 다를 때'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','fracdiv.js'],d3=False),
 'decdiv':dict(title='소수의 나눗셈',sub='소수점을 옮기는 까닭과 세로셈, 어림, 나머지, 몫을 소수로 나타내는 방법을 알아봐요',
   tabs=[('shift','① 소수점 옮기기'),('long','② 세로셈'),('est','③ 어림하기'),('rem','④ 몫과 나머지'),('nn','⑤ 몫을 소수로')],
   hint='',js=['n2d.js','decdiv.js'],d3=False),
 'fracadd':dict(title='약분과 통분, 분수의 덧셈과 뺄셈',sub='분수 막대를 나누고 합치며 약분과 통분, 크기 비교, 덧셈과 뺄셈, 분수와 소수의 관계를 알아봐요',
   tabs=[('eq','① 크기가 같은 분수'),('red','② 약분'),('com','③ 통분'),('cmp','④ 크기 비교'),('add','⑤ 덧셈'),('sub','⑥ 뺄셈'),('dec','⑦ 분수와 소수'),('quiz','⑧ 문제 풀기')],
   hint='',js=['n2d.js','fracadd.js'],d3=False),
 'mult':dict(title='분수의 곱셈과 소수의 곱셈',sub='넓이 그림으로 분수와 소수의 곱셈을 알아봐요',
   tabs=[('fk','① 분수 × 자연수'),('ff','② 분수 × 분수'),('dd','③ 소수 × 소수'),('pt','④ 소수점 위치'),('quiz','⑤ 문제 풀기')],
   hint='',js=['n2d.js','mult.js'],d3=False),
 'volume':dict(title='직육면체의 부피와 겉넓이',sub='쌓기나무로 상자를 채워 부피를 구하고, 전개도로 겉넓이를 알아봐요',
   tabs=[('fill','① 쌓아서 부피 구하기'),('cmp','② 부피 비교하기'),('sa','③ 겉넓이'),('unit','④ 1㎥와 1㎤')],
   hint='👆 끌면 돌아가요',js=['net.js','volume.js'],d3=True),
 'cuboid':dict(title='직육면체',sub='직육면체와 정육면체의 구성 요소, 면 사이의 관계, 겨냥도와 전개도를 알아봐요',
   tabs=[('shape','① 직육면체와 정육면체'),('rel','② 면 사이의 관계'),('sketch','③ 겨냥도'),('net','④ 전개도'),('quiz','⑤ 전개도 찾기')],
   hint='👆 끌면 돌아가요 · 점선은 안 보이는 모서리',js=['net.js','box.js','cuboid.js'],d3=True),
 'area':dict(title='다각형의 둘레와 넓이',sub='도형을 자르고 붙여 넓이 구하는 방법을 찾고, 넓이 단위를 알아봐요',
   tabs=[('rect','① 직사각형'),('para','② 평행사변형'),('tri','③ 삼각형'),('trap','④ 사다리꼴'),('rhom','⑤ 마름모'),('unit','⑥ 넓이 단위'),('quiz','⑦ 문제 풀기')],
   hint='모눈 한 칸 = 1㎠',js=['area.js'],d3=False),
 'symmetry':dict(title='합동과 대칭',sub='도형을 겹치고, 접고, 돌려 보며 합동과 대칭을 알아봐요',
   tabs=[('cong','① 합동'),('line','② 선대칭도형'),('ldraw','③ 선대칭 그리기'),('point','④ 점대칭도형'),('pdraw','⑤ 점대칭 그리기')],
   hint='',js=['g2d.js','symmetry.js'],d3=False),
}
PRE='''var $=function(id){ return document.getElementById(id); };
var cv=$('cv'), g=cv.getContext('2d'), W=640, H=440, S=100, yaw=-0.5, pit=0.36, tab='';
var BLUE=[125,180,245], GREEN=[120,210,165], ORANGE=[251,146,60], GRAY=[185,196,206], PINK=[236,150,190], YEL=[240,200,95];
var INK='#1D2B36', HOT='#D9482B', ACC='#2F6FDB', HALO='#EDF1F3', MUTED='#5C6B77', LINE='#C9D3DA';
function tone(){ var c=getComputedStyle(document.documentElement), v=function(n,d){ return (c.getPropertyValue(n)||'').trim()||d; }; INK=v('--ink',INK); HOT=v('--c1',HOT); ACC=v('--accent',ACC); HALO=v('--surface2',HALO); MUTED=v('--muted',MUTED); LINE=v('--line',LINE); }
function rnd(n){ return Math.floor(Math.random()*n); }
function rgba(c,a){ return 'rgba('+c[0]+','+c[1]+','+c[2]+','+(a==null?1:a)+')'; }
function fit(){ var w=cv.clientWidth||640, d=(window.devicePixelRatio||1)*(window.__zoom||1); W=w; H=Math.round(Math.min(460,Math.max(300,w*0.72))); cv.style.height=H+'px'; cv.width=Math.round(W*d); cv.height=Math.round(H*d); g.setTransform(d,0,0,d,0,0); draw(); }
'''
POST='''
document.querySelectorAll('#tabs button').forEach(function(b){ b.onclick=function(){ setTab(b.dataset.t); }; });
var drag=null, moved=0;
cv.addEventListener('pointerdown',function(e){ drag=[e.clientX,e.clientY]; moved=0; try{ cv.setPointerCapture(e.pointerId); }catch(_){} });
cv.addEventListener('pointermove',function(e){ if(!drag) return; var dx=e.clientX-drag[0], dy=e.clientY-drag[1]; moved+=Math.abs(dx)+Math.abs(dy); drag=[e.clientX,e.clientY];
  if(D3&&!(window.noDrag&&noDrag())){ yaw+=dx*0.011; pit=Math.max(-0.5,Math.min(1.5,pit+dy*0.009)); draw(); } });
cv.addEventListener('pointerup',function(e){ if(drag&&moved<10&&window.onTap){ var r=cv.getBoundingClientRect(), k=(r.width/(cv.clientWidth||r.width))||1; onTap((e.clientX-r.left)/k,(e.clientY-r.top)/k); } drag=null; });
cv.addEventListener('pointercancel',function(){ drag=null; });
window.addEventListener('resize',fit); try{ matchMedia('(prefers-color-scheme:dark)').addEventListener('change',draw); }catch(_){}
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(draw);
setTab(TAB0); fit();
'''
XCSS='''.dims{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0 16px}
.dims .row label{min-width:40px}
.score{margin-left:auto;font-family:var(--display)}
input.wide{width:130px}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.15;margin:0 3px;font-family:var(--display);font-weight:400}
.fr i{font-style:normal;border-bottom:2px solid currentColor;padding:0 4px}.fr span{padding:0 4px}
.fin{display:inline-flex;flex-direction:column;vertical-align:middle;gap:3px;align-items:center}.fin input{margin:0;width:64px;text-align:center}.fin hr{width:100%;border:0;border-top:2.5px solid var(--ink);margin:0}
.dims .row label{min-width:40px;white-space:nowrap}
.say small .fr,.say .fr{font-size:.95em}
.dims .row{flex-wrap:nowrap}.dims .row input[type=range]{flex:1 1 0;min-width:0;width:auto}.dims .row output{min-width:30px;text-align:right}
'''
def build(k):
    a=APPS[k]
    tabs='\n'.join('    <button data-t="%s" role="tab" aria-selected="%s">%s</button>'%(t,'true' if i==0 else 'false',n) for i,(t,n) in enumerate(a['tabs']))
    js=PRE+(core3 if a['d3'] else '')+'var D3=%s, TAB0="%s";\n'%('true' if a['d3'] else 'false',a['tabs'][0][0])+'\n'.join(rd(f) for f in a['js'])+POST
    cur='' if a['d3'] else 'canvas{cursor:default}\n'
    h='''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&family=Gowun+Dodum&display=swap">
<style>%s%s%s</style></head><body>
<div class="app">
  <header><h1>%s</h1><p>%s</p></header>
  <div class="card"><div class="tabs" id="tabs" role="tablist">
%s
  </div></div>
  <section class="card"><div class="stage">
    <div id="top"></div>
    <canvas id="cv"></canvas>
    <p class="hint" id="hint">%s</p>
    <div id="ctl"></div>
    <div class="say" id="say"></div>
  </div></section>
</div>
<script>
%s</script>
<script src="zoom.js"></script></body></html>
'''%(a['title'],css,XCSS,cur,a['title'],a['sub'],tabs,a['hint'],js)
    open(OUT+k+'.html','w',encoding='utf-8',newline='\n').write(h)
    print('ok',k,len(h))
args=sys.argv[1:]
if '--out' in args:
    i=args.index('--out'); OUT=args[i+1].rstrip('/\\')+'/'; os.makedirs(OUT,exist_ok=True); del args[i:i+2]
if args==['all']: args=list(APPS)
if not args: print('앱 이름을 주세요:',' '.join(APPS))
for k in args: build(k)
