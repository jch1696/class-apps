/* 전개도 접기: 면 {p:[[x,y]..], par:붙은 면 번호(-1=바닥), hinge:[[x,y],[x,y]], ang, c:색, t:이름표} */
function rotAx(p,a,d,ang){ var v=[p[0]-a[0],p[1]-a[1],p[2]-a[2]], c=Math.cos(ang), sn=Math.sin(ang), dot=v[0]*d[0]+v[1]*d[1]+v[2]*d[2], cr=[d[1]*v[2]-d[2]*v[1],d[2]*v[0]-d[0]*v[2],d[0]*v[1]-d[1]*v[0]];
  return [a[0]+v[0]*c+cr[0]*sn+d[0]*dot*(1-c),a[1]+v[1]*c+cr[1]*sn+d[1]*dot*(1-c),a[2]+v[2]*c+cr[2]*sn+d[2]*dot*(1-c)]; }
function foldNet(F,e){ return F.map(function(f){ var pts=f.p.map(function(q){ return [q[0],q[1],0]; }), nd=f;
  while(nd.par>=0){ var a=[nd.hinge[0][0],nd.hinge[0][1],0], b=nd.hinge[1], d=[b[0]-a[0],b[1]-a[1],0], dl=Math.hypot(d[0],d[1])||1, c=[0,0]; d=[d[0]/dl,d[1]/dl,0]; nd.p.forEach(function(q){ c[0]+=q[0]/nd.p.length; c[1]+=q[1]/nd.p.length; });
    var sg=(d[0]*(c[1]-a[1])-d[1]*(c[0]-a[0]))>0?1:-1, ang=(nd.ang||Math.PI/2)*(1-e)*sg; pts=pts.map(function(q){ return rotAx(q,a,d,ang); }); nd=F[nd.par]; }
  return {p:pts,c:f.c||BLUE,ol:INK,src:f}; }); }
/* t: 0=접힌 입체, 1=펼친 전개도 */
function drawNet(F,t,lab){ var e=t*t*(3-2*t), fs=foldNet(F,e), sy=yaw, sp=pit, al=-Math.PI/2*(1-e), mn=[1e9,1e9,1e9], mx=[-1e9,-1e9,-1e9], rho=0, texts=[];
  fs.forEach(function(f){ f.p=f.p.map(function(q){ return [q[0],q[1]*Math.cos(al)-q[2]*Math.sin(al),q[1]*Math.sin(al)+q[2]*Math.cos(al)]; }); });
  fs.forEach(function(f){ f.p.forEach(function(q){ for(var k=0;k<3;k++){ mn[k]=Math.min(mn[k],q[k]); mx[k]=Math.max(mx[k],q[k]); } }); });
  var c=[(mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2];
  fs.forEach(function(f){ f.p=f.p.map(function(q){ var v=[q[0]-c[0],q[1]-c[1],q[2]-c[2]]; rho=Math.max(rho,Math.hypot(v[0],v[1],v[2])); return v; }); });
  var s0=Math.min(W,H)*0.42/rho, s1=Math.min(W*0.88/Math.max(mx[0]-mn[0],0.1),H*0.86/Math.max(mx[1]-mn[1],0.1)); S=Math.min(130,s0+(s1-s0)*e);
  if(lab&&e>0.97) fs.forEach(function(f){ if(f.src.t) texts.push({p:cen(f.p),t:f.src.t,c:INK,s:15}); });
  yaw=sy*(1-e); pit=sp*(1-e); paint(fs,[],[],texts); yaw=sy; pit=sp; }
function boxNet(a,b,c){ var Q=function(x0,y0,x1,y1){ return [[x0,y0],[x1,y0],[x1,y1],[x0,y1]]; };
  return [{p:Q(0,0,a,b),par:-1,c:GREEN,t:a+'×'+b},{p:Q(0,-c,a,0),par:0,hinge:[[0,0],[a,0]],c:BLUE,t:a+'×'+c},{p:Q(0,b,a,b+c),par:0,hinge:[[0,b],[a,b]],c:BLUE,t:a+'×'+c},
    {p:Q(-c,0,0,b),par:0,hinge:[[0,0],[0,b]],c:ORANGE,t:c+'×'+b},{p:Q(a,0,a+c,b),par:0,hinge:[[a,0],[a,b]],c:ORANGE,t:c+'×'+b},{p:Q(0,b+c,a,2*b+c),par:2,hinge:[[0,b+c],[a,b+c]],c:GREEN,t:a+'×'+b}]; }
