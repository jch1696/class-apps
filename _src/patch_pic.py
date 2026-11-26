p='../class-apps/index.html'
s=open(p,encoding='utf-8').read()
O='#E8823A'
def T(x,y,t,sz=22,fill='var(--ink)',extra=''): return '<text x="%s" y="%s" font-size="%s" fill="%s" text-anchor="middle" %s>%s</text>'%(x,y,sz,fill,extra,t)
def L(x1,y1,x2,y2,st='var(--ink)',w=2,extra=''): return '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s" stroke-linecap="round" %s/>'%(x1,y1,x2,y2,st,w,extra)
def R(x,y,w,h,fill='none',st='var(--ink)',sw=2,extra=''): return '<rect x="%s" y="%s" width="%s" height="%s" fill="%s" stroke="%s" stroke-width="%s" %s/>'%(x,y,w,h,fill,st,sw,extra)
def C(x,y,r,fill,st='none',sw=0): return '<circle cx="%s" cy="%s" r="%s" fill="%s" stroke="%s" stroke-width="%s"/>'%(x,y,r,fill,st,sw)
def FR(x,y,n,d,sz=15,fill='var(--ink)'): return T(x,y-4,n,sz,fill)+L(x-sz*0.45,y,x+sz*0.45,y,fill,1.8)+T(x,y+sz*0.95,d,sz,fill)
def badge(x,y,n,col): return C(x,y,9,col)+T(x,y+4.5,n,12,'#fff')
B='var(--c)'
pics={}
# 1 혼합 계산: 2 + 3 × 4
pics['mixed']=(T(58,46,'2',28)+T(92,46,'+',28,B)+T(126,46,'3',28)+T(156,46,'×',28,O)+T(186,46,'4',28)
  +'<path d="M112 56 v6 h88 v-6" fill="none" stroke="%s" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'%O+badge(156,72,'1',O)+badge(92,14,'2',B))
# 2 약수와 배수: 구슬 12개
g=''
for r in range(3):
    for c in range(4): g+=C(40+c*15,22+r*15,6,B)
for r in range(2):
    for c in range(6): g+=C(132+c*15,29+r*15,6,O)
pics['divisors']=g+T(62,76,'3 × 4',13,'var(--muted)')+T(170,76,'2 × 6',13,'var(--muted)')+T(110,42,'=',20)
# 3 분수: 1/2 = 3/6
g=R(70,12,150,22,'var(--surface)')+R(70,12,75,22,B,'none',0,'opacity=".8"')+L(145,12,145,34)+R(70,12,150,22)
g+=R(70,50,150,22,'var(--surface)')+R(70,50,75,22,O,'none',0,'opacity=".85"')
for i in range(1,6): g+=L(70+25*i,50,70+25*i,72,'var(--ink)',1.5)
g+=R(70,50,150,22)+L(145,6,145,78,'var(--muted)',1.5,'stroke-dasharray="4 4"')
pics['fracadd']=g+FR(40,23,'1','2')+FR(40,61,'3','6')
# 4 수의 범위: 수직선
g=L(18,44,222,44)
for i in range(9): g+=L(20+25*i,38,20+25*i,50,'var(--ink)',1.5)
g+=L(70,44,170,44,B,6)+C(70,44,7.5,B)+C(170,44,7,'var(--surface)',B,3)
pics['rounding']=g+T(70,72,'12',14)+T(170,72,'16',14)+T(120,24,'12 이상 16 미만',13,'var(--muted)')
# 5 곱셈: 넓이 모델 2/3 × 3/4
g=R(34,12,96,60,'var(--surface)','none',0)+R(34,12,72,60,B,'none',0,'opacity=".35"')+R(34,12,96,40,O,'none',0,'opacity=".4"')+R(34,12,72,40,B,'none',0,'opacity=".55"')
for i in range(1,4): g+=L(34+24*i,12,34+24*i,72,'var(--ink)',1.2)
for i in range(1,3): g+=L(34,12+20*i,130,12+20*i,'var(--ink)',1.2)
pics['mult']=g+R(34,12,96,60)+FR(160,40,'2','3',16,O)+T(183,46,'×',18)+FR(206,40,'3','4',16,B)
# 6 분수의 나눗셈: 3/4 ÷ 1/4
g=R(24,42,120,24,'var(--surface)','none',0)+R(24,42,90,24,B,'none',0,'opacity=".8"')
for i in range(1,4): g+=L(24+30*i,42,24+30*i,66,'var(--ink)',1.5)
g+=R(24,42,120,24)
for i in range(3): g+='<path d="M%s 38 q13 -14 26 0" fill="none" stroke="%s" stroke-width="2.2" stroke-linecap="round"/>'%(26+30*i,O)+T(39+30*i,22,str(i+1),13,O)
pics['fracdiv']=g+FR(170,40,'3','4',16)+T(192,46,'÷',18)+FR(214,40,'1','4',16)
# 7 소수의 나눗셈: 3.6 ÷ 1.2 → 36 ÷ 12
def arrow(x): return L(x,32,x,50,O,2.2)+'<path d="M%s 46 l5 6 l5 -6" fill="none" stroke="%s" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'%(x-5,O)+T(x+22,46,'10배',11,O)
pics['decdiv']=(T(64,26,'3.6',22)+T(108,26,'÷',22)+T(152,26,'1.2',22)+arrow(64)+arrow(152)+T(64,74,'36',22)+T(108,74,'÷',22)+T(152,74,'12',22)+T(198,74,'= 3',22,B))
for k,v in pics.items():
    a='<a class="card" href="%s.html"><span class="tags">'%k
    assert s.count(a)==1,k
    s=s.replace(a,'<a class="card" href="%s.html"><span class="pic"><svg viewBox="0 0 240 84" aria-hidden="true">%s</svg></span><span class="tags">'%(k,v))
css='.card{overflow:hidden}.pic{display:block;margin:-16px -16px 6px;background:color-mix(in srgb,var(--c) 9%,var(--surface));border-bottom:1px solid var(--line)}.pic svg{display:block;width:100%;height:96px;font-family:inherit;font-weight:800}\n'
a='.card:hover,.card:focus-visible{'
assert s.count(a)==1
s=s.replace(a,css+a)
open(p,'w',encoding='utf-8',newline='\n').write(s)
import shutil; shutil.copy(p,'G:/내 드라이브/코딩중/(6월) 스쿨플래너/apps/_index_preview.html')
print('ok')
