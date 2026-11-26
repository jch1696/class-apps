def rd(p): return open(p,encoding='utf-8').read()
def wr(p,s): open(p,'w',encoding='utf-8',newline='\n').write(s)
def rep(s,a,b):
    assert s.count(a)==1,(s.count(a),a[:50].encode('unicode_escape'))
    return s.replace(a,b)
# ratio: 두 수 비교하기
s=rd('ratio.js')
i=s.index("function cmDraw(){"); j=s.index("/* ───────── 2. 비 ───────── */")
new=r"""function cmDraw(){ var gw=Math.min(170,(W-30)/cn), x0=(W-gw*cn)/2, r=Math.min(13,(gw-40)/8), st=r*2+5, ra=Math.ceil(ca/4), rb=Math.ceil(cb/4), bh=(ra+rb)*st+31, y0=Math.max(30,(H-36-bh)/2+12), bx=(gw-16-(4*st-5))/2, i;
  for(i=0;i<cn;i++){ var x=x0+i*gw+8; rect(x,y0,gw-16,bh,rgba(GRAY,0.18),LINE,1.5); txt((i+1)+'모둠',x+(gw-16)/2,y0-13,MUTED,14); beads(x+bx,y0+12,ca,CB(),r,4); beads(x+bx,y0+12+ra*st+12,cb,CO(),r,4); }
  txt('● 모둠원 '+ca+'명',W/2-70,H-18,ACC,15); txt('● 태블릿 '+cb+'대',W/2+70,H-18,HOT,15);
  var div=ca%cb===0;
  $('say').innerHTML='<b>뺄셈</b>: '+(ca-cb)+', '+((ca-cb)*2)+', '+((ca-cb)*3)+'… 모둠 수마다 달라요.<br><b>나눗셈</b>: 항상 <b class="r">'+(div?ca/cb:F(ca,cb))+'배</b>예요.<small style="font-size:15.5px;color:var(--ink)">나눗셈으로 비교하면 모둠 수가 바뀌어도 변하지 않아요. 이렇게 비교한 것을 기호 : 으로 나타낸 것이 <b>비</b>예요.</small>'; }
function cmUI(){ var rows=[['모둠 수',function(i){ return i; }],['모둠원 (명)',function(i){ return ca*i; }],['태블릿 (대)',function(i){ return cb*i; }],['뺄셈',function(i){ return (ca-cb)*i; }],['나눗셈',function(){ return ca%cb===0?ca/cb:F(ca,cb); }]], h='<table><tbody>';
  rows.forEach(function(r,k){ h+='<tr><th style="text-align:left">'+r[0]+'</th>'; for(var i=1;i<=cn;i++) h+='<td'+(k>=3?' style="font-weight:700;color:'+(k===3?'var(--muted)':'var(--c1)')+'"':'')+'>'+r[1](i)+'</td>'; h+='</tr>'; });
  $('ctl').innerHTML='<div class="dims">'+sld('cA','모둠원',2,8,ca)+sld('cB','태블릿',1,4,cb)+sld('cN','모둠 수',1,5,cn)+'</div>'+h+'</tbody></table>';
  sldBind('cA',function(v){ ca=v; }); sldBind('cB',function(v){ cb=v; }); sldBind('cN',function(v){ cn=v; }); }

"""
wr('ratio.js',s[:i]+new+s[j:])
# 공통 CSS: 슬라이더 줄 정렬
m=rd('mk.py')
m=rep(m,".say small .fr,.say .fr{font-size:.95em}\n",".say small .fr,.say .fr{font-size:.95em}\n.dims .row{flex-wrap:nowrap}.dims .row input[type=range]{flex:1 1 0;min-width:0;width:auto}.dims .row output{min-width:30px;text-align:right}\n")
wr('mk.py',m)
# 공통: 긴 설명 접기 (zoom.js에 덧붙임)
z=rd('../class-apps/zoom.js')
assert 'sayFold' not in z
z+=r"""
/* 글 줄이기(sayFold): 설명 상자(#say)의 긴 풀이는 접어 두고, 단추를 눌러야 펼친다. 도움말과 짧은 안내는 그대로 보인다. */
(function(){
  var say=document.getElementById('say'); if(!say||!window.MutationObserver) return;
  var open=false, ob=new MutationObserver(fix);
  function fix(){ ob.disconnect();
    var ss=say.querySelectorAll('small'), n=0, i, old=say.querySelector('.say-more'); if(old) old.remove();
    for(i=0;i<ss.length;i++){ var t=(ss[i].textContent||'').trim(); if(t.length>40&&t.indexOf('도움말')!==0){ ss[i].style.display=open?'block':'none'; n++; } }
    if(n){ var b=document.createElement('button'); b.type='button'; b.className='say-more'; b.textContent=open?'설명 접기 ▲':'설명 보기 ▼';
      b.style.cssText='display:block;margin:6px 0 0;font:inherit;font-size:14px;font-weight:700;cursor:pointer;color:inherit;background:transparent;border:1.5px solid currentColor;border-radius:999px;padding:4px 14px;opacity:.75';
      b.onclick=function(){ open=!open; fix(); }; say.appendChild(b); }
    ob.observe(say,{childList:true,subtree:true}); }
  fix();
})();
"""
wr('../class-apps/zoom.js',z)
import shutil; shutil.copy('../class-apps/zoom.js','G:/내 드라이브/코딩중/(6월) 스쿨플래너/apps/zoom.js')
print('ok')
