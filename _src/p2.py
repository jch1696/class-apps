s=open('mixed.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,a[:40].encode('unicode_escape'); s=s.replace(a,b)
rep("if((kind==='mix'||kind==='par'||t.indexOf('(')>=0)&&naive(tk)===r.res) continue;",
    "if(t.indexOf('(')>=0){ var np=mxRunBig(tk.filter(function(x){ return x!=='('&&x!==')'; })); if(np&&np.res===r.res) continue; } else if(kind==='mix'&&naive(tk)===r.res) continue;")
rep("a=a*100; b=b*100; return","a=ri(3,10)*1000; b=ri(2,9)*100; return")
rep("a=a*100; c=c*100; return","a=ri(3,10)*100; c=ri(10,40)*100; return")
rep("w:[a+' × ('+b+' − '+c+')',a+' + '+b+' − '+c]","w:[a+' × '+b+' + '+c,a+' + '+b+' − '+c]")
open('mixed.js','w',encoding='utf-8',newline='\n').write(s)
