import re, math, shutil
p='../class-apps/index.html'
s=open(p,encoding='utf-8').read()
O='#E8823A'; BL='#3E7BD6'; B='var(--c)'; INK='var(--ink)'; MU='var(--muted)'; SF='var(--surface)'
def T(x,y,t,sz=22,fill=INK,extra=''): return '<text x="%s" y="%s" font-size="%s" fill="%s" text-anchor="middle" %s>%s</text>'%(x,y,sz,fill,extra,t)
def L(x1,y1,x2,y2,st=INK,w=2,extra=''): return '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s" stroke-linecap="round" %s/>'%(x1,y1,x2,y2,st,w,extra)
def R(x,y,w,h,fill='none',st=INK,sw=2,extra=''): return '<rect x="%s" y="%s" width="%s" height="%s" fill="%s" stroke="%s" stroke-width="%s" %s/>'%(x,y,w,h,fill,st,sw,extra)
def C(x,y,r,fill,st='none',sw=0): return '<circle cx="%s" cy="%s" r="%s" fill="%s" stroke="%s" stroke-width="%s"/>'%(x,y,r,fill,st,sw)
def E(x,y,rx,ry,fill='none',st=INK,sw=2,extra=''): return '<ellipse cx="%s" cy="%s" rx="%s" ry="%s" fill="%s" stroke="%s" stroke-width="%s" %s/>'%(x,y,rx,ry,fill,st,sw,extra)
def PG(pts,fill='none',st=INK,sw=2,extra=''): return '<polygon points="%s" fill="%s" stroke="%s" stroke-width="%s" stroke-linejoin="round" %s/>'%(' '.join('%s,%s'%q for q in pts),fill,st,sw,extra)
def PA(d,fill='none',st=INK,sw=2,extra=''): return '<path d="%s" fill="%s" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" %s/>'%(d,fill,st,sw,extra)
DS='stroke-dasharray="4 4"'
pics={}
# 규칙과 대응
g=''
for r,(lab,vals) in enumerate([('□',[1,2,3,4]),('△',[3,6,9,12])]):
    y=18+r*26; g+=R(22,y,28,26,B,INK,1.5,'fill-opacity=".25"')+T(36,y+18,lab,15)
    for i,v in enumerate(vals): g+=R(50+i*26,y,26,26,SF,INK,1.5)+T(63+i*26,y+18,v,14)
pics['pattern']=g+T(196,48,'△ = □ × 3',14,O)
# 비와 비율
g=''.join(C(40+22*i,28,9,B) for i in range(3))+''.join(C(40+22*i,56,9,O) for i in range(2))
pics['ratio']=g+T(150,53,'3',32,B)+T(175,51,':',32)+T(200,53,'2',32,O)
# 비례식
g=''.join(T(x,52,t,24) for x,t in [(50,'2'),(72,':'),(94,'3'),(120,'='),(146,'4'),(168,':'),(190,'6')])
pics['proportion']=g+PA('M50 30 Q120 -2 190 30','none',O,2.5)+PA('M94 60 Q120 82 146 60','none',B,2.5)
# 넓이
pics['area']=(PG([(80,66),(160,66),(190,18),(80,18)],BL,'none',0,'fill-opacity=".45"')+PG([(50,66),(80,66),(80,18)],B,INK,2,'fill-opacity=".6"')
  +PG([(80,66),(160,66),(190,18),(80,18)])+PG([(160,66),(190,66),(190,18)],'none',B,2,DS)+PA('M70 74 Q120 88 172 74','none',B,2)+PA('M166 70 l7 4 l-5 6','none',B,2))
# 합동과 대칭
pics['symmetry']=(PG([(120,12),(80,24),(70,56),(120,74)],B,INK,2,'fill-opacity=".6"')+PG([(120,12),(160,24),(170,56),(120,74)],BL,INK,2,'fill-opacity=".5"')+L(120,3,120,81,INK,1.8,DS))
# 직육면체
pics['cuboid']=(PG([(70,28),(94,12),(174,12),(150,28)],B,'none',0,'fill-opacity=".45"')+PG([(150,28),(174,12),(174,56),(150,72)],B,'none',0,'fill-opacity=".25"')+R(70,28,80,44,BL,INK,2,'fill-opacity=".3"')
  +PG([(70,28),(94,12),(174,12),(150,28)])+PG([(150,28),(174,12),(174,56),(150,72)])+L(70,72,94,56,INK,1.5,DS)+L(94,56,174,56,INK,1.5,DS)+L(94,56,94,12,INK,1.5,DS))
# 각기둥과 각뿔
pics['prism']=(PG([(36,26),(84,26),(66,14)],B,INK,2,'fill-opacity=".5"')+PG([(36,26),(84,26),(84,70),(36,70)],BL,INK,2,'fill-opacity=".3"')+L(36,70,66,58,INK,1.5,DS)+L(84,70,66,58,INK,1.5,DS)+L(66,58,66,14,INK,1.5,DS)
  +PG([(175,10),(140,68),(196,68)],B,INK,2,'fill-opacity=".5"')+PG([(175,10),(196,68),(212,54)],BL,INK,2,'fill-opacity=".3"')+L(140,68,156,54,INK,1.5,DS)+L(156,54,212,54,INK,1.5,DS)+L(175,10,156,54,INK,1.5,DS))
# 부피
g=PG([(56,32),(76,18),(148,18),(128,32)],B,'none',0,'fill-opacity=".5"')+PG([(128,32),(148,18),(148,58),(128,72)],B,'none',0,'fill-opacity=".3"')+R(56,32,72,40,BL,'none',0,'fill-opacity=".3"')
for i in (1,2): g+=L(56+24*i,32,56+24*i,72,INK,1.2)+L(56+24*i,32,76+24*i,18,INK,1.2)
g+=L(56,52,128,52,INK,1.2)+L(128,52,148,38,INK,1.2)+L(66,25,138,25,INK,1.2)+L(138,25,138,65,INK,1.2)
pics['volume']=g+R(56,32,72,40)+PG([(56,32),(76,18),(148,18),(128,32)])+PG([(128,32),(148,18),(148,58),(128,72)])+T(196,50,'3 × 2 × 2',14,B)
# 쌓기나무
a=15; h=16
def cube(i,j,k):
    x=84+(i-j)*a; y=30+(i+j)*a/2-k*h
    return (PG([(x,y),(x+a,y+a/2),(x,y+a),(x-a,y+a/2)],B,INK,1.5,'fill-opacity=".35"')+PG([(x-a,y+a/2),(x,y+a),(x,y+a+h),(x-a,y+a/2+h)],B,INK,1.5,'fill-opacity=".6"')+PG([(x,y+a),(x+a,y+a/2),(x+a,y+a/2+h),(x,y+a+h)],B,INK,1.5,'fill-opacity=".85"'))
hs={(0,0):2,(1,0):1,(2,0):1,(0,1):1,(1,1):1}
cs=sorted([(i,j,k) for (i,j),n in hs.items() for k in range(n)],key=lambda c:(c[0]+c[1],c[2]))
g=''.join(cube(*c) for c in cs)
for (i,j),n in hs.items(): g+=R(160+i*20,26+j*20,20,20,SF,INK,1.5)+T(170+i*20,41+j*20,n,13)
pics['blocks']=g+T(190,18,'위',11,MU)
# 원주
g=C(50,42,18,B,INK,2).replace('fill="var(--c)"','fill="var(--c)" fill-opacity=".3"')+L(32,42,68,42,BL,3)+L(100,62,213,62,B,4)
for i,c in enumerate([BL,O,BL]): g+=L(100+36*i,48,136+36*i,48,c,3)+L(100+36*i,43,100+36*i,53,INK,1.5)
pics['circle']=g+L(208,43,208,53,INK,1.5)+L(208,48,213,48,O,3)+T(156,30,'지름의 약 3.14배',12,MU)
# 원기둥, 원뿔, 구
pics['solid']=(PA('M32 20 V64 A18 6 0 0 0 68 64 V20',B,INK,2,'fill-opacity=".35"')+E(50,20,18,6,B,INK,2,'fill-opacity=".6"')
  +PA('M100 64 L120 10 L140 64 A20 6 0 0 1 100 64',B,INK,2,'fill-opacity=".35"')+PA('M100 64 A20 6 0 0 1 140 64','none',INK,1.5,DS)
  +C(190,42,26,B,INK,2).replace('fill="var(--c)"','fill="var(--c)" fill-opacity=".35"')+E(190,42,26,8,'none',INK,1.5,DS))
# 평균
g=''
for i,v in enumerate([20,46,30,50,34]): g+=R(46+30*i,72-v,20,v,B,INK,1.5,'fill-opacity=".7"')
pics['average']=g+L(34,72,200,72)+L(34,36,200,36,O,2.5,'stroke-dasharray="6 5"')+T(218,41,'평균',13,O)
# 그래프
def pt(cx,cy,r,pc): t=-math.pi/2+2*math.pi*pc/100; return '%.1f %.1f'%(cx+r*math.cos(t),cy+r*math.sin(t))
g=''; acc=0
for pc,(col,op) in zip([40,35,25],[(B,'.85'),(O,'.85'),(BL,'.7')]):
    g+=PA('M60 42 L%s A30 30 0 0 1 %s Z'%(pt(60,42,30,acc),pt(60,42,30,acc+pc)),col,INK,1.5,'fill-opacity="%s"'%op)
    g+=R(112+110*acc/100,30,110*pc/100,24,col,INK,1.5,'fill-opacity="%s"'%op); acc+=pc
pics['graphs']=g+R(112,30,110,24)+T(134,70,'40%',11,MU)+T(175,70,'35%',11,MU)+T(208,70,'25%',11,MU)
# 세계 지도
g=C(66,42,30,B,INK,2).replace('fill="var(--c)"','fill="var(--c)" fill-opacity=".25"')+E(66,42,13,30,'none',INK,1.5)+L(36,42,96,42,INK,1.5)+PA('M41 26 Q66 34 91 26','none',INK,1.5)+PA('M41 58 Q66 50 91 58','none',INK,1.5)
for i,v in enumerate([10,14,26,34,22,12]): g+=R(126+15*i,70-v,10,v,BL,'none',0,'fill-opacity=".7"')
pics['world-map']=g+L(120,70,220,70)+PA('M131 44 L146 34 L161 22 L176 18 L191 28 L206 42','none',O,2.5)+''.join(C(131+15*i,y,2.6,O) for i,y in enumerate([44,34,22,18,28,42]))
# 건반
g=''
for i in range(7): g+=R(50+20*i,14,20,58,B if i in (0,2,4) else SF,INK,1.5,'fill-opacity="%s"'%('.45' if i in (0,2,4) else '1'))
for x in (70,90,130,150,170): g+=R(x-6,14,12,34,INK,INK,1)
pics['piano']=g+''.join(C(60+20*i,60,4.5,O) for i in (0,2,4))
# 장구
g=PA('M40 16 Q72 42 104 16 V68 Q72 42 40 68 Z',B,INK,2,'fill-opacity=".45"')+E(40,42,9,27,SF,INK,2)+E(104,42,9,27,SF,INK,2)
for i in range(4): g+=R(132+22*i,30,22,24,SF,INK,1.5)
g+=C(143,42,6,'none',O,2.2)+L(143,33,143,51,O,2.2)+L(165,34,165,50,BL,2.5)+C(187,42,6,'none',O,2.2)+L(209,34,209,50,BL,2.5)
pics['jangdan']=g
# 리코더
g=PA('M26 34 H50 V30 H206 Q216 30 216 42 Q216 54 206 54 H50 V50 H26 Z',B,INK,2,'fill-opacity=".3"')
for i in range(7): g+=C(72+20*i,42,5.5,INK if i<3 else SF,INK,1.8)
pics['fingering']=g+T(92,22,'막기',11,MU)+T(172,22,'열기',11,MU)
# 음악 이론
g=''.join(L(24,22+10*i,216,22+10*i,INK,1.3) for i in range(5))+T(42,41,'4',22)+T(42,61,'4',22)+L(200,22,200,62,INK,1.5)
def note(x,y,hollow=False,col=INK):
    return E(x,y,7,5,SF if hollow else col,col,2,'transform="rotate(-20 %s %s)"'%(x,y))+L(x+6.5,y-2,x+6.5,y-30,col,2)
pics['theory']=g+note(78,57,False,B)+note(112,47,False,O)+note(146,37,False,B)+note(178,47,True)
for k,v in pics.items():
    m=re.findall(r'<a class="card" href="%s\.html"[^>]*><span class="tags">'%re.escape(k),s)
    assert len(m)==1,(k,len(m))
    a=m[0]; s=s.replace(a,a.replace('<span class="tags">','<span class="pic"><svg viewBox="0 0 240 84" aria-hidden="true">%s</svg></span><span class="tags">'%v))
assert s.count('class="pic"')==25,s.count('class="pic"')
open(p,'w',encoding='utf-8',newline='\n').write(s)
shutil.copy(p,'G:/내 드라이브/코딩중/(6월) 스쿨플래너/apps/_index_preview.html')
print('ok')
