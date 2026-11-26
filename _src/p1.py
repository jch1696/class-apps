s=open('mixed.js',encoding='utf-8').read()
i=s.index("  var m=(op==='×'||op==='÷'), why="); j=s.index("  return {tk:tk,k:k,a:a,b:b")
new="""  var m=(op==='×'||op==='÷'), cnt=0; for(i=lo;i<=hi;i++) if(isOp(tk[i])) cnt++;
  var why=(par?'( ) 안을 가장 먼저 계산해요. ':'')+(cnt<=1?'':(m&&as?'곱셈과 나눗셈을 덧셈과 뺄셈보다 먼저 계산해요.':(m?'곱셈과 나눗셈은 앞에서부터 차례로 계산해요.':'덧셈과 뺄셈은 앞에서부터 차례로 계산해요.'))); if(!why) why='마지막으로 남은 계산을 해요.';
"""
s=s[:i]+new+s[j:]
a="a=a*100; b=b*10; return"; assert s.count(a)==1; s=s.replace(a,"a=a*100; b=b*100; return")
open('mixed.js','w',encoding='utf-8',newline='\n').write(s)
