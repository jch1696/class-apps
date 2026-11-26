s=open('fracadd.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:40].encode('unicode_escape')); s=s.replace(a,b)
rep("F(dN*k,T)+' = '+s+'예요.<br>","F(dN*k,T)+' = '+s+P(s,'이에요','예요')+'.<br>")
rep("s2+' = '+F(n,T2)+'예요. '","s2+' = '+F(n,T2)+P(n,'이에요','예요')+'. '")
rep("나누어 약분하면 '+F(n/G,T2/G)+'예요.'","나누어 약분하면 '+F(n/G,T2/G)+P(n/G,'이에요','예요')+'.'")
rep("F(dc.n,dc.d)+' = '+fs+'이에요. 소수끼리","F(dc.n,dc.d)+' = '+fs+P(fs,'이에요','예요')+'. 소수끼리")
open('fracadd.js','w',encoding='utf-8',newline='\n').write(s)
