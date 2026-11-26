/* 📌 약속: 단원의 기본 개념(교과서 「약속하기」)을 그림 + 낱말 + 한 문장 카드로 보여 준다.
   - 각 앱: zoom.js 가 이 파일을 불러오고, 그 앱의 카드가 있으면 탭 줄 맨 앞에 「📌 약속」 단추를 붙인다.
   - yaksok.html: 모든 카드를 학년별로 모아 보여 준다.
   카드를 고치거나 더할 때는 아래 DATA 만 고치면 두 곳에 같이 반영된다. */
(function(){
  var B='#5B9BEA', O='#F28C3A', GR='#4FBF8B', RD='#D9482B', YL='#F0C85F', LB='rgba(91,155,234,.3)', LO='rgba(242,140,58,.3)', K='currentColor';
  function ln(a,b,c,d,s,w,ds){ return '<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+(s||K)+'" stroke-width="'+(w||2.5)+'" stroke-linecap="round"'+(ds?' stroke-dasharray="'+ds+'"':'')+'/>'; }
  function rc(x,y,w,h,f,s,sw,rx){ return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+(f||'none')+'" stroke="'+(s||K)+'" stroke-width="'+(sw==null?2:sw)+'"'+(rx?' rx="'+rx+'"':'')+'/>'; }
  function ci(x,y,r,f,s,sw){ return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(f||'none')+'" stroke="'+(s||K)+'" stroke-width="'+(sw==null?2:sw)+'"/>'; }
  function pg(p,f,s,sw,ds){ return '<polygon points="'+p+'" fill="'+(f||'none')+'" stroke="'+(s||K)+'" stroke-width="'+(sw==null?2.5:sw)+'" stroke-linejoin="round"'+(ds?' stroke-dasharray="'+ds+'"':'')+'/>'; }
  function pa(d,f,s,sw,ds){ return '<path d="'+d+'" fill="'+(f||'none')+'" stroke="'+(s||K)+'" stroke-width="'+(sw==null?2.5:sw)+'" stroke-linejoin="round" stroke-linecap="round"'+(ds?' stroke-dasharray="'+ds+'"':'')+'/>'; }
  function tx(x,y,t,z,c,an){ return '<text'+(/[가-힣]/.test(''+t)?' class="yl"':'')+' x="'+x+'" y="'+y+'" font-size=""'+(z||16)+'" font-weight="800" fill="'+(c||K)+'" text-anchor="'+(an||'middle')+'" dominant-baseline="central">'+t+'</text>'; }
  function fr(x,y,n,d,z,c){ z=z||22; var w=Math.max((''+n).length,(''+d).length)*z*0.34+5; return tx(x,y-z*0.62,n,z,c)+ln(x-w,y,x+w,y,c||K,2.5)+tx(x,y+z*0.66,d,z,c); }
  /* 원 조각: 위쪽에서 시계 방향 각도 */
  function sec(cx,cy,r,a0,a1,f){ var p=function(a){ a=(a-90)*Math.PI/180; return (cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1); }; return pa('M'+cx+' '+cy+' L'+p(a0)+' A'+r+' '+r+' 0 '+(a1-a0>180?1:0)+' 1 '+p(a1)+' Z',f,K,2); }
  /* 각: 오른쪽 0°, 반시계 */
  function wd(cx,cy,r,a0,a1,f,s){ var p=function(a){ a=a*Math.PI/180; return (cx+r*Math.cos(a)).toFixed(1)+' '+(cy-r*Math.sin(a)).toFixed(1); }; return pa('M'+cx+' '+cy+' L'+p(a0)+' A'+r+' '+r+' 0 '+(a1-a0>180?1:0)+' 0 '+p(a1)+' Z',f,s||'none',s?2:0); }
  function ry(cx,cy,r,a,s,w){ a=a*Math.PI/180; return ln(cx,cy,(cx+r*Math.cos(a)).toFixed(1),(cy-r*Math.sin(a)).toFixed(1),s,w||3); }
  function dots(x,y,n,per,r,f,gap){ var o='', i, st=r*2+(gap==null?4:gap); for(i=0;i<n;i++) o+=ci(x+(i%per)*st+r,y+Math.floor(i/per)*st+r,r,f,K,1.2); return o; }
  function bar(x,y,w,h,n,k,f){ var o='', i, c=w/n; for(i=0;i<n;i++) o+=rc(x+i*c,y,c,h,i<k?(f||B):'none',K,1.5); return o+rc(x,y,w,h,'none',K,2.5); }
  function grid(x,y,s,k,f){ var o='', i, c=s/10; for(i=0;i<k;i++) o+=rc(x+Math.floor(i/10)*c,y+(i%10)*c,c,c,f||B,'none',0); for(i=1;i<10;i++) o+=ln(x+i*c,y,x+i*c,y+s,K,0.5)+ln(x,y+i*c,x+s,y+i*c,K,0.5); return o+rc(x,y,s,s,'none',K,2); }
  function box(x,y,w,h,d,ft,fs,ff){ var dx=d, dy=-d*0.55; return pg([x,y,x+dx,y+dy,x+w+dx,y+dy,x+w,y].join(','),ft||'none')+pg([x+w,y,x+w+dx,y+dy,x+w+dx,y+h+dy,x+w,y+h].join(','),fs||'none')+rc(x,y,w,h,ff||'none',K,2.5); }
  function sq(x,y,dx,dy,s){ s=s||9; return pa('M'+(x+dx*s)+' '+y+' L'+(x+dx*s)+' '+(y+dy*s)+' L'+x+' '+(y+dy*s),'none',RD,2); }
  function arw(x1,y1,x2,y2,c){ var a=Math.atan2(y2-y1,x2-x1), h=7; return ln(x1,y1,x2,y2,c,2.5)+pg([x2,y2,(x2-h*Math.cos(a-0.5)).toFixed(1),(y2-h*Math.sin(a-0.5)).toFixed(1),(x2-h*Math.cos(a+0.5)).toFixed(1),(y2-h*Math.sin(a+0.5)).toFixed(1)].join(','),c||K,c||K,1); }
  function nline(y,lab){ var o=ln(20,y,200,y,K,2), i; for(i=0;i<7;i++){ o+=ln(35+i*25,y-4,35+i*25,y+4,K,1.5); o+=tx(35+i*25,y+15,lab+i-3,11); } return o; }
  function F(n,d){ return '<span class="yfr"><i>'+n+'</i><span>'+d+'</span></span>'; }
  function b(t){ return '<b>'+t+'</b>'; }

  var DATA=[
  {app:'mul3',g:3,title:'곱셈과 나눗셈의 뜻',cards:[
    {t:'곱셈식',tab:'grp',s:'4씩 3묶음은 4의 3배입니다. 이것을 '+b('4 × 3 = 12')+'라 쓰고 「4 곱하기 3은 12와 같습니다」라고 읽습니다.',
     p:dots(22,22,4,4,9,B)+dots(22,46,4,4,9,O)+dots(22,70,4,4,9,B)+tx(160,55,'4 × 3 = 12',20)},
    {t:'나눗셈식 · 몫',tab:'share',s:'8을 2로 나누면 4가 됩니다. 이것을 '+b('8 ÷ 2 = 4')+'라 쓰고, 4는 8을 2로 나눈 '+b('몫')+'이라고 합니다.',
     p:rc(14,24,52,52,LB,B,2,12)+dots(20,30,4,2,9,B)+rc(74,24,52,52,LB,B,2,12)+dots(80,30,4,2,9,B)+tx(160,42,'8 ÷ 2 =',17)+tx(196,42,'4',22,RD)+tx(196,70,'몫',14,RD)+arw(196,62,196,54,RD)}]},
  {app:'frac3',g:3,title:'분수와 소수',cards:[
    {t:'분수 · 분모 · 분자',tab:'part',s:'전체를 똑같이 4로 나눈 것 중의 3을 '+F(3,4)+'이라 쓰고 「4분의 3」이라고 읽습니다. 이런 수를 '+b('분수')+'라 하고, 아래 수를 '+b('분모')+', 위 수를 '+b('분자')+'라고 합니다.',
     p:sec(58,55,40,0,90,B)+sec(58,55,40,90,180,B)+sec(58,55,40,180,270,B)+sec(58,55,40,270,360,'none')+fr(140,55,3,4,28)+tx(166,37,'분자',13,RD,'start')+tx(166,73,'분모',13,RD,'start')},
    {t:'단위분수',tab:'cmp',s:F(1,2)+', '+F(1,3)+', '+F(1,4)+'과 같이 분자가 1인 분수를 '+b('단위분수')+'라고 합니다.',
     p:bar(16,36,130,38,4,1)+fr(180,55,1,4,26)},
    {t:'소수 · 소수점',tab:'dec',s:F(1,10)+'을 0.1이라 쓰고 「영 점 일」이라고 읽습니다. 0.1, 0.2, 0.3과 같은 수를 '+b('소수')+'라 하고, 「.」을 '+b('소수점')+'이라고 합니다.',
     p:bar(14,8,150,26,10,1)+fr(60,62,1,10,17)+tx(108,62,'= 0.1',22)+arw(112,100,112,78,RD)+tx(150,98,'소수점',13,RD)}]},
  {app:'muldiv4',g:4,title:'곱셈과 나눗셈',cards:[
    {t:'몫과 나머지 · 나누어떨어진다',tab:'nl',s:'17을 5로 나누면 '+b('몫')+'은 3이고 2가 남습니다. 이때 2를 '+b('나머지')+'라고 합니다. 나머지가 0일 때 '+b('나누어떨어진다')+'고 합니다.',
     p:tx(70,44,'17 ÷ 5 =',21)+tx(134,44,'3',26,B)+tx(160,44,'…',20)+tx(188,44,'2',26,RD)+tx(134,76,'몫',14,B)+tx(188,76,'나머지',14,RD)}]},
  {app:'frac4',g:4,title:'분수의 덧셈과 뺄셈',cards:[
    {t:'진분수 · 가분수 · 대분수',tab:'kind',s:b('진분수')+': 분자가 분모보다 작은 분수. '+b('가분수')+': 분자가 분모와 같거나 큰 분수. '+b('대분수')+': 자연수와 진분수로 이루어진 분수.',
     p:fr(38,42,2,3,24)+tx(38,92,'진분수',14,B)+fr(110,42,5,3,24)+tx(110,92,'가분수',14,O)+tx(166,42,'1',26)+fr(190,42,2,3,24)+tx(180,92,'대분수',14,GR)}]},
  {app:'dec4',g:4,title:'소수의 덧셈과 뺄셈',cards:[
    {t:'소수 두 자리 수',tab:'two',s:F(1,100)+'을 '+b('0.01')+'이라 쓰고 「영 점 영일」이라고 읽습니다. 0.37은 「영 점 삼칠」이라고 읽습니다.',
     p:grid(12,12,86,1)+fr(124,55,1,100,16)+tx(180,55,'= 0.01',18)},
    {t:'소수 세 자리 수',tab:'place',s:F(1,1000)+'을 '+b('0.001')+'이라 쓰고 「영 점 영영일」이라고 읽습니다. 소수점 아래는 숫자를 하나씩 차례로 읽습니다.',
     p:fr(48,40,1,1000,16)+tx(130,40,'= 0.001',22)+tx(110,86,'3.752 → 삼 점 칠오이',15,B)}]},
  {app:'angle4',g:4,title:'각도',cards:[
    {t:'각도 · 1도(1°) · 직각',tab:'meas',s:'각의 크기를 '+b('각도')+'라고 합니다. 직각을 똑같이 90으로 나눈 것 중의 하나를 '+b('1도')+'라 하고 1°라고 씁니다. 직각은 90°입니다.',
     p:wd(60,88,34,0,90,LB)+ry(60,88,84,0)+ry(60,88,72,90)+sq(60,88,1,-1,12)+tx(150,36,'직각 = 90°',19)},
    {t:'예각 · 둔각',tab:'meas',s:b('예각')+': 각도가 0°보다 크고 직각보다 작은 각. '+b('둔각')+': 각도가 직각보다 크고 180°보다 작은 각.',
     p:wd(20,78,26,0,45,B)+ry(20,78,70,0)+ry(20,78,70,45)+tx(50,98,'예각',15,B)+wd(150,78,22,0,130,O)+ry(150,78,58,0)+ry(150,78,62,130)+tx(160,98,'둔각',15,O)},
    {t:'삼각형과 사각형의 각의 합',tab:'tri',s:'삼각형의 세 각의 크기의 합은 '+b('180°')+'입니다. 사각형의 네 각의 크기의 합은 '+b('360°')+'입니다.',
     p:pg('14,84 94,84 60,22',LB)+tx(56,98,'180°',15,B)+pg('126,84 204,84 192,26 140,36',LO)+tx(166,98,'360°',15,O)}]},
  {app:'quad4',g:4,title:'수직과 평행, 여러 가지 사각형',cards:[
    {t:'수직 · 수선',tab:'vert',s:'두 직선이 만나서 이루는 각이 직각일 때, 두 직선은 서로 '+b('수직')+'이라고 합니다. 이때 한 직선을 다른 직선에 대한 '+b('수선')+'이라고 합니다.',
     p:ln(20,74,200,74,K,3.5)+ln(110,12,110,100,B,3.5)+sq(110,74,1,-1,12)+tx(140,24,'수선',14,B)},
    {t:'평행 · 평행선',tab:'par',s:'한 직선에 수직인 두 직선을 그으면 서로 만나지 않습니다. 이 두 직선을 '+b('평행')+'하다고 하고, 평행한 두 직선을 '+b('평행선')+'이라고 합니다.',
     p:ln(16,34,204,34,B,3.5)+ln(16,78,204,78,B,3.5)+ln(70,14,70,98,K,2,'5 4')+sq(70,34,1,1,10)+sq(70,78,1,-1,10)+tx(150,56,'평행선',15,B)},
    {t:'평행선 사이의 거리',tab:'dist',s:'평행선의 한 직선에서 다른 직선에 수선을 긋습니다. 이 수선의 길이를 '+b('평행선 사이의 거리')+'라고 합니다.',
     p:ln(16,28,204,28,K,3.5)+ln(16,84,204,84,K,3.5)+ln(110,28,110,84,RD,4)+sq(110,84,1,-1,10)+tx(150,56,'거리',15,RD)},
    {t:'사다리꼴 · 평행사변형 · 마름모',tab:'make',s:b('사다리꼴')+': 평행한 변이 한 쌍이라도 있는 사각형. '+b('평행사변형')+': 마주 보는 두 쌍의 변이 서로 평행한 사각형. '+b('마름모')+': 네 변의 길이가 모두 같은 사각형.',
     p:pg('8,70 68,70 54,28 22,28',LB)+tx(38,90,'사다리꼴',11,B)+pg('80,70 128,70 146,28 98,28',LO)+tx(113,90,'평행사변형',11,O)+pg('184,14 210,49 184,84 158,49','rgba(79,191,139,.3)')+tx(184,98,'마름모',11,GR)}]},
  {app:'divisors',g:5,title:'약수와 배수',cards:[
    {t:'약수',tab:'div',s:'어떤 수를 나누어떨어지게 하는 수를 그 수의 '+b('약수')+'라고 합니다.',
     p:tx(110,30,'6의 약수',17)+[1,2,3,6].map(function(v,i){ return ci(44+i*44,72,17,LB,B,2.5)+tx(44+i*44,72,v,19); }).join('')},
    {t:'배수',tab:'mul',s:'어떤 수를 1배, 2배, 3배… 한 수를 그 수의 '+b('배수')+'라고 합니다.',
     p:tx(110,30,'3의 배수',17)+[3,6,9,12].map(function(v,i){ return ci(36+i*42,72,17,LO,O,2.5)+tx(36+i*42,72,v,18); }).join('')+tx(204,72,'…',18)},
    {t:'공약수 · 최대공약수',tab:'gcd',s:'두 수의 공통된 약수를 '+b('공약수')+'라 하고, 공약수 중에서 가장 큰 수를 '+b('최대공약수')+'라고 합니다.',
     p:tx(110,24,'8과 12의 공약수',15)+[1,2,4].map(function(v,i){ return ci(60+i*50,66,18,i===2?YL:LB,i===2?RD:B,i===2?3.5:2.5)+tx(60+i*50,66,v,20); }).join('')+tx(160,98,'최대공약수',13,RD)},
    {t:'공배수 · 최소공배수',tab:'lcm',s:'두 수의 공통된 배수를 '+b('공배수')+'라 하고, 공배수 중에서 가장 작은 수를 '+b('최소공배수')+'라고 합니다.',
     p:tx(110,24,'2와 3의 공배수',15)+[6,12,18].map(function(v,i){ return ci(48+i*50,66,18,i===0?YL:LO,i===0?RD:O,i===0?3.5:2.5)+tx(48+i*50,66,v,19); }).join('')+tx(196,66,'…',18)+tx(48,98,'최소공배수',13,RD)}]},
  {app:'fracadd',g:5,title:'약분과 통분, 분수의 덧셈과 뺄셈',cards:[
    {t:'약분 · 기약분수',tab:'red',s:'분모와 분자를 공약수로 나누어 간단한 분수로 만드는 것을 '+b('약분')+'한다고 합니다. 분모와 분자의 공약수가 1뿐인 분수를 '+b('기약분수')+'라고 합니다.',
     p:fr(50,55,6,8,26)+tx(96,55,'=',22)+fr(142,55,3,4,26,B)+pa('M66 28 Q96 6 126 28','none',RD,2)+tx(96,10,'÷2',13,RD)+pa('M66 84 Q96 104 126 84','none',RD,2)+tx(96,102,'÷2',13,RD)+tx(190,55,'기약',13,B)},
    {t:'통분 · 공통분모',tab:'com',s:'분수의 분모를 같게 하는 것을 '+b('통분')+'한다고 하고, 통분한 분모를 '+b('공통분모')+'라고 합니다.',
     p:fr(26,50,1,2,22)+fr(62,50,1,3,22)+arw(84,50,112,50,RD)+fr(138,50,3,6,22,B)+fr(180,50,2,6,22,B)+rc(124,56,72,26,'none',RD,2,6)+tx(160,98,'공통분모',13,RD)}]},
  {app:'rounding',g:5,title:'수의 범위와 어림하기',cards:[
    {t:'이상 · 이하',tab:'one',s:'70, 71, 72와 같이 70과 같거나 큰 수를 70 '+b('이상')+'인 수라고 합니다. 70과 같거나 작은 수를 70 '+b('이하')+'인 수라고 합니다. 70이 들어갑니다(●).',
     p:nline(34,70)+ln(110,34,196,34,B,5)+ci(110,34,6,B,B)+tx(160,16,'70 이상',13,B)+nline(84,70)+ln(24,84,110,84,O,5)+ci(110,84,6,O,O)+tx(60,66,'70 이하',13,O)},
    {t:'초과 · 미만',tab:'one',s:'70보다 큰 수를 70 '+b('초과')+'인 수라고 합니다. 70보다 작은 수를 70 '+b('미만')+'인 수라고 합니다. 70은 들어가지 않습니다(○).',
     p:nline(34,70)+ln(116,34,196,34,B,5)+ci(110,34,6,'#fff',B,3)+tx(160,16,'70 초과',13,B)+nline(84,70)+ln(24,84,104,84,O,5)+ci(110,84,6,'#fff',O,3)+tx(60,66,'70 미만',13,O)},
    {t:'올림 · 버림 · 반올림',tab:'round',s:b('올림')+': 구하려는 자리 아래 수를 올려서 나타내기. '+b('버림')+': 아래 수를 버려서 나타내기. '+b('반올림')+': 바로 아래 자리 숫자가 0~4이면 버리고 5~9이면 올리기.',
     p:tx(40,55,'247',26)+arw(76,42,104,24,B)+arw(76,55,104,55,O)+arw(76,68,104,86,GR)+tx(150,22,'올림 250',15,B)+tx(150,55,'버림 240',15,O)+tx(156,88,'반올림 250',15,GR)}]},
  {app:'pattern',g:5,title:'규칙과 대응',cards:[
    {t:'대응 관계',tab:'table',s:'한 양이 변할 때 다른 양이 그에 따라 일정하게 변하는 관계를 '+b('대응 관계')+'라고 합니다. □, △ 같은 기호를 써서 식으로 나타낼 수 있습니다.',
     p:['□',1,2,3].map(function(v,i){ return rc(24+i*36,16,36,28,i?'none':LB,K,1.5)+tx(42+i*36,30,v,16); }).join('')+['△',2,4,6].map(function(v,i){ return rc(24+i*36,44,36,28,i?'none':LO,K,1.5)+tx(42+i*36,58,v,16); }).join('')+tx(110,92,'△ = □ × 2',18,RD)}]},
  {app:'area',g:5,title:'다각형의 둘레와 넓이',cards:[
    {t:'1㎠ · 1㎡ · 1㎢',tab:'unit',s:'한 변의 길이가 1cm인 정사각형의 넓이를 '+b('1㎠')+'라 쓰고 「1 제곱센티미터」라고 읽습니다. 한 변이 1m이면 '+b('1㎡')+', 1km이면 '+b('1㎢')+'입니다.',
     p:rc(30,24,58,58,LB,K,2.5)+tx(59,53,'1㎠',17)+tx(59,94,'1cm',13,RD)+tx(12,53,'1cm',13,RD)+tx(160,40,'1㎡',17,B)+tx(160,72,'1㎢',17,O)},
    {t:'밑변 · 높이',tab:'para',s:'평행사변형에서 평행한 두 변을 '+b('밑변')+'이라 하고, 두 밑변 사이의 거리를 '+b('높이')+'라고 합니다. 삼각형에서는 한 변이 밑변, 마주 보는 꼭짓점에서 밑변에 내린 수선의 길이가 높이입니다.',
     p:pg('24,82 144,82 184,24 64,24',LB)+ln(24,82,144,82,O,5)+ln(64,24,64,82,RD,3,'5 4')+sq(64,82,1,-1,9)+tx(84,98,'밑변',14,O)+tx(88,52,'높이',14,RD)}]},
  {app:'symmetry',g:5,title:'합동과 대칭',cards:[
    {t:'합동 · 대응점 · 대응변 · 대응각',tab:'cong',s:'모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형을 서로 '+b('합동')+'이라고 합니다. 겹치는 점, 변, 각을 각각 '+b('대응점')+', '+b('대응변')+', '+b('대응각')+'이라고 합니다.',
     p:pg('16,84 86,84 36,24',LB)+pg('126,84 196,84 146,24',LO)+ci(36,24,4,RD,RD)+ci(146,24,4,RD,RD)+pa('M40 18 Q92 -6 142 18','none',RD,2,'4 4')+tx(106,56,'합동',15)},
    {t:'선대칭도형 · 대칭축',tab:'line',s:'한 직선을 따라 접었을 때 완전히 겹치는 도형을 '+b('선대칭도형')+'이라 하고, 그 직선을 '+b('대칭축')+'이라고 합니다.',
     p:pg('110,14 160,44 142,92 110,76 78,92 60,44',LB)+ln(110,4,110,104,RD,2.5,'6 5')+tx(160,14,'대칭축',13,RD)},
    {t:'점대칭도형 · 대칭의 중심',tab:'point',s:'한 도형을 어떤 점을 중심으로 180° 돌렸을 때 처음 도형과 완전히 겹치면 '+b('점대칭도형')+'이라 하고, 그 점을 '+b('대칭의 중심')+'이라고 합니다.',
     p:pg('40,82 130,82 180,28 90,28',LO)+ci(110,55,5,RD,RD)+pa('M150 96 A46 46 0 0 0 196 52','none',RD,2.5)+tx(196,96,'180°',13,RD)+tx(110,70,'중심',12,RD)}]},
  {app:'cuboid',g:5,title:'직육면체',cards:[
    {t:'직육면체 · 정육면체',tab:'shape',s:'직사각형 6개로 둘러싸인 도형을 '+b('직육면체')+', 정사각형 6개로 둘러싸인 도형을 '+b('정육면체')+'라고 합니다. 선분으로 둘러싸인 부분은 면, 면과 면이 만나는 선분은 모서리, 모서리와 모서리가 만나는 점은 꼭짓점입니다.',
     p:box(14,42,78,46,26,LB,LB,LB)+tx(58,100,'직육면체',12,B)+box(136,44,44,44,22,LO,LO,LO)+tx(166,100,'정육면체',12,O)},
    {t:'밑면 · 옆면',tab:'rel',s:'직육면체에서 서로 평행한 두 면을 '+b('밑면')+'이라 하고, 밑면과 수직인 면을 '+b('옆면')+'이라고 합니다.',
     p:box(50,40,90,48,34,B,LO,LO)+pg('50,88 84,69.3 174,69.3 140,88','rgba(91,155,234,.55)',K,1.5,'4 3')+tx(190,22,'밑면',14,B)+tx(196,62,'옆면',14,O)},
    {t:'겨냥도 · 전개도',tab:'sketch',s:'직육면체의 모양을 잘 알 수 있게 보이는 모서리는 실선, 보이지 않는 모서리는 점선으로 그린 그림을 '+b('겨냥도')+'라고 합니다. 모서리를 잘라서 펼친 그림을 '+b('전개도')+'라고 합니다.',
     p:box(10,44,52,40,24)+ln(34,30.8,34,70.8,K,1.5,'4 3')+ln(10,84,34,70.8,K,1.5,'4 3')+ln(34,70.8,86,70.8,K,1.5,'4 3')+tx(46,100,'겨냥도',12,B)+rc(142,8,24,24,LO,K,1.5)+rc(118,32,24,24,LO,K,1.5)+rc(142,32,24,24,LB,K,1.5)+rc(166,32,24,24,LO,K,1.5)+rc(190,32,24,24,LO,K,1.5)+rc(142,56,24,24,LO,K,1.5)+tx(166,98,'전개도',12,O)}]},
  {app:'average',g:5,title:'평균과 가능성',cards:[
    {t:'평균',tab:'level',s:'자료의 값을 모두 더해 자료의 수로 나눈 값을 '+b('평균')+'이라고 합니다. 자료의 값을 고르게 한 것과 같습니다.',
     p:rc(26,24,26,64,LB,K,1.5)+rc(62,56,26,32,LB,K,1.5)+rc(98,40,26,48,LB,K,1.5)+ln(14,48,136,48,RD,3,'6 5')+tx(176,40,'평균',16,RD)+tx(176,66,'(4+2+3)÷3',11)},
    {t:'가능성',tab:'word',s:'어떤 상황에서 특정한 일이 일어나길 기대할 수 있는 정도를 '+b('가능성')+'이라고 합니다. 불가능하다 0, 반반이다 '+F(1,2)+', 확실하다 1로 나타낼 수 있습니다.',
     p:ln(24,44,196,44,K,3)+ci(24,44,6,O,O)+ci(110,44,6,GR,GR)+ci(196,44,6,B,B)+tx(24,22,'0',17)+fr(110,18,1,2,13)+tx(196,22,'1',17)+tx(30,70,'불가능',12,O)+tx(110,70,'반반',12,GR)+tx(190,70,'확실',12,B)}]},
  {app:'ratio',g:6,title:'비와 비율',cards:[
    {t:'비',tab:'ratio',s:'두 수를 나눗셈으로 비교하기 위해 기호 :을 사용하여 나타낸 것을 '+b('비')+'라고 합니다. 3 : 2는 「3 대 2」라고 읽습니다.',
     p:dots(18,22,3,3,11,B)+dots(18,58,2,3,11,O)+tx(124,55,'3',32,B)+tx(152,53,':',32)+tx(180,55,'2',32,O)},
    {t:'기준량 · 비교하는 양 · 비율',tab:'rate',s:'비 3 : 4에서 기호 :의 오른쪽 4는 '+b('기준량')+', 왼쪽 3은 '+b('비교하는 양')+'입니다. 기준량에 대한 비교하는 양의 크기를 '+b('비율')+'이라고 합니다.',
     p:tx(40,36,'3',28,B)+tx(62,34,':',28)+tx(84,36,'4',28,O)+tx(34,72,'비교하는 양',11,B)+tx(98,90,'기준량',11,O)+ln(84,54,92,80,O,1.5)+arw(110,36,134,36,RD)+fr(164,36,3,4,24)+tx(180,90,'비율',14,RD)},
    {t:'백분율',tab:'pct',s:'기준량을 100으로 할 때의 비율을 '+b('백분율')+'이라고 합니다. 기호 %를 써서 나타내고 「퍼센트」라고 읽습니다.',
     p:grid(12,12,86,25)+fr(122,55,25,100,15)+tx(182,55,'= 25%',19,RD)}]},
  {app:'proportion',g:6,title:'비례식과 비례배분',cards:[
    {t:'전항 · 후항',tab:'prop',s:'비 2 : 3에서 기호 : 앞에 있는 2를 '+b('전항')+', 뒤에 있는 3을 '+b('후항')+'이라고 합니다.',
     p:tx(74,44,'2',34,B)+tx(110,42,':',34)+tx(146,44,'3',34,O)+tx(74,84,'전항',15,B)+tx(146,84,'후항',15,O)},
    {t:'비례식 · 외항 · 내항',tab:'eq',s:'비율이 같은 두 비를 기호 =를 사용하여 나타낸 식을 '+b('비례식')+'이라고 합니다. 바깥쪽에 있는 두 수를 '+b('외항')+', 안쪽에 있는 두 수를 '+b('내항')+'이라고 합니다.',
     p:tx(30,55,'2',24,B)+tx(52,54,':',24)+tx(74,55,'3',24,O)+tx(110,55,'=',24)+tx(146,55,'4',24,O)+tx(168,54,':',24)+tx(190,55,'6',24,B)+pa('M30 38 L30 22 L190 22 L190 38','none',B,2)+tx(110,10,'외항',13,B)+pa('M74 72 L74 88 L146 88 L146 72','none',O,2)+tx(110,100,'내항',13,O)},
    {t:'비례배분',tab:'share',s:'전체를 주어진 비로 배분하는 것을 '+b('비례배분')+'이라고 합니다.',
     p:rc(20,30,72,34,B,K,2)+rc(92,30,108,34,O,K,2)+tx(56,47,'2',18,'#fff')+tx(146,47,'3',18,'#fff')+tx(110,14,'10을 2 : 3으로',13)+tx(56,84,'4',20,B)+tx(146,84,'6',20,O)}]},
  {app:'prism',g:6,title:'각기둥과 각뿔',cards:[
    {t:'각기둥 · 밑면 · 옆면',s:'두 면이 서로 평행하고 합동인 다각형으로 이루어진 입체도형을 '+b('각기둥')+'이라고 합니다. 서로 평행하고 합동인 두 면이 '+b('밑면')+', 두 밑면과 만나는 면이 '+b('옆면')+'입니다. 옆면은 모두 직사각형입니다.',
     p:pg('60,22 110,14 130,30',B)+pg('60,22 60,80 130,88 130,30',LO)+pg('60,80 110,72 130,88','rgba(91,155,234,.5)',K,1.5,'4 3')+ln(110,14,110,72,K,1.5,'4 3')+tx(170,22,'밑면',14,B)+tx(170,60,'옆면',14,O)},
    {t:'각뿔 · 각뿔의 꼭짓점 · 높이',s:'밑면이 다각형이고 옆면이 모두 삼각형인 입체도형을 '+b('각뿔')+'이라고 합니다. 옆면이 모두 만나는 점을 '+b('각뿔의 꼭짓점')+', 그 점에서 밑면에 수직으로 내린 선분의 길이를 '+b('높이')+'라고 합니다.',
     p:pg('40,84 110,96 150,76 80,66','rgba(91,155,234,.5)',K,1.5)+pg('95,12 40,84 110,96',LO)+pg('95,12 110,96 150,76',LO)+ln(95,12,95,80,RD,2.5,'5 4')+ci(95,12,5,RD,RD)+tx(160,14,'각뿔의 꼭짓점',12,RD)+tx(118,52,'높이',12,RD)}]},
  {app:'volume',g:6,title:'직육면체의 부피와 겉넓이',cards:[
    {t:'1㎤ · 1㎥',tab:'unit',s:'한 모서리의 길이가 1cm인 정육면체의 부피를 '+b('1㎤')+'라 쓰고 「1 세제곱센티미터」라고 읽습니다. 한 모서리가 1m이면 '+b('1㎥')+'입니다. 1㎥ = 1000000㎤',
     p:box(34,40,46,46,22,LB,LB,LB)+tx(57,98,'1cm',12,RD)+tx(16,63,'1cm',12,RD)+tx(120,30,'1cm',12,RD)+tx(160,56,'1㎤',22,B)}]},
  {app:'circle',g:6,title:'원주와 원의 넓이',cards:[
    {t:'원주 · 원주율',s:'원의 둘레를 '+b('원주')+'라고 합니다. 원의 지름에 대한 원주의 비율을 '+b('원주율')+'이라고 합니다. 원주율은 3.14…로 끝없이 이어지며, 3, 3.1, 3.14 등으로 어림하여 씁니다.',
     p:ci(60,62,36,LB,RD,4)+ln(24,62,96,62,B,3)+tx(60,50,'지름',12,B)+tx(60,12,'원주',13,RD)+tx(160,40,'원주 ÷ 지름',13)+tx(160,68,'= 3.14…',18,RD)}]},
  {app:'solid',g:6,title:'원기둥, 원뿔, 구',cards:[
    {t:'원기둥',s:'서로 평행하고 합동인 두 원을 면으로 하는 둥근 기둥 모양의 입체도형을 '+b('원기둥')+'이라고 합니다. 두 원이 밑면, 굽은 면이 옆면, 두 밑면에 수직인 선분의 길이가 높이입니다.',
     p:pa('M60 26 L60 84 A40 12 0 0 0 140 84 L140 26',LO)+'<ellipse cx="100" cy="26" rx="40" ry="12" fill="'+B+'" stroke="currentColor" stroke-width="2.5"/>'+pa('M60 84 A40 12 0 0 1 140 84','none',K,1.5,'4 3')+ln(100,26,100,84,RD,2.5,'5 4')+tx(176,24,'밑면',13,B)+tx(176,58,'옆면',13,O)+tx(118,56,'높이',12,RD)},
    {t:'원뿔 · 모선 · 구',s:'평평한 면이 원이고 옆을 둘러싼 면이 굽은 뿔 모양의 입체도형을 '+b('원뿔')+'이라고 합니다. 원뿔의 꼭짓점과 밑면 둘레의 한 점을 이은 선분이 '+b('모선')+'입니다. 공 모양의 입체도형을 '+b('구')+'라고 합니다.',
     p:pa('M24 82 L62 12 L100 82 A38 11 0 0 1 24 82 Z',LO)+pa('M24 82 A38 11 0 0 1 100 82','none',K,1.5,'4 3')+ln(62,12,100,82,RD,3.5)+tx(102,44,'모선',12,RD)+tx(62,102,'원뿔',12,O)+ci(164,52,34,LB)+'<ellipse cx="164" cy="52" rx="34" ry="10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>'+tx(164,100,'구',12,B)}]},
  {app:'graphs',g:6,title:'여러 가지 그래프',cards:[
    {t:'띠그래프 · 원그래프',tab:'band',s:'전체에 대한 각 부분의 비율을 띠 모양에 나타낸 그래프를 '+b('띠그래프')+', 원 모양에 나타낸 그래프를 '+b('원그래프')+'라고 합니다.',
     p:rc(12,40,50,30,B,K,1.5)+rc(62,40,38,30,O,K,1.5)+rc(100,40,24,30,GR,K,1.5)+tx(68,88,'띠그래프',12)+sec(172,52,34,0,150,B)+sec(172,52,34,150,270,O)+sec(172,52,34,270,360,GR)+tx(172,100,'원그래프',12)}]}
  ];
  window.YAKSOK=DATA;

  var CSS='.yfr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.1;margin:0 2px;font-size:.88em;font-weight:800}.yfr i{font-style:normal;border-bottom:2px solid currentColor;padding:0 3px}.yfr span{padding:0 3px}'+
    '.yk-btn,.tabs .yk-btn{font:inherit;font-weight:800;font-size:18px;cursor:pointer;border:2.5px solid #C99A00!important;background:#FFD84D!important;color:#3A2A00!important;border-radius:999px;padding:9px 18px;box-shadow:0 3px 0 rgba(0,0,0,.18)}.yk-btn.fix{position:fixed;top:10px;right:10px;z-index:60}'+
    '.yk-ov{position:fixed;inset:0;z-index:999;background:rgba(15,20,30,.55);overflow:auto;padding:14px}'+
    '.yk-panel{max-width:1000px;margin:10px auto;background:var(--surface,#fff);color:var(--ink,#1f2430);border-radius:20px;padding:16px 16px 20px;box-shadow:0 20px 50px rgba(0,0,0,.35)}'+
    '.yk-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}.yk-head h2{margin:0;font-size:22px;font-weight:800;flex:1}'+
    '.yk-x{font:inherit;font-size:18px;font-weight:800;cursor:pointer;border:2px solid var(--line,#aab);background:transparent;color:inherit;border-radius:999px;padding:6px 16px}'+
    '.yk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px}'+
    '.yk-card{border:2px solid var(--line,#c9d3da);border-radius:16px;overflow:hidden;background:var(--surface,#fff);display:flex;flex-direction:column}'+
    '.yk-pic{background:var(--surface2,#E8F0FC);color:var(--ink,#1f2430);padding:8px}.yk-pic svg{display:block;width:100%;height:auto;max-height:190px}'+
    '.yk-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:8px;flex:1}'+
    '.yk-term{font-size:21px;font-weight:800;line-height:1.3;color:var(--accent,#2F6FDB)}'+
    '.yk-s{font-size:16.5px;font-weight:600;line-height:1.65;margin:0}.yk-s b{font-weight:800;background:linear-gradient(transparent 62%,rgba(255,216,77,.75) 62%)}'+
    '.yk-go{align-self:flex-start;margin-top:auto;font:inherit;font-size:16px;font-weight:800;cursor:pointer;border:0;background:var(--accent,#2F6FDB);color:#fff;border-radius:999px;padding:7px 16px;text-decoration:none}';
  function css(){ if(document.getElementById('yk-css')) return; var st=document.createElement('style'); st.id='yk-css'; st.textContent=CSS; document.head.appendChild(st); }
  function cardH(c,app,link){ return '<article class="yk-card"><div class="yk-pic"><svg viewBox="0 0 220 110" role="img" aria-label="'+c.t+'">'+c.p+'</svg></div><div class="yk-body"><div class="yk-term">'+c.t+'</div><p class="yk-s">'+c.s+'</p>'+
    (link==='tab'&&c.tab&&typeof window.setTab==='function'?'<button type="button" class="yk-go" data-tab="'+c.tab+'">직접 해 보기 →</button>':'')+(link==='app'?'<a class="yk-go" href="'+app+'.html">앱에서 해 보기 →</a>':'')+'</div></article>'; }
  window.YAKSOK_CARD=cardH; window.YAKSOK_CSS=css;

  function open(e){ css(); var ov=document.createElement('div'); ov.className='yk-ov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-label','약속');
    ov.innerHTML='<div class="yk-panel"><div class="yk-head"><h2>📌 약속</h2><button type="button" class="yk-x">✕ 닫기</button></div><div class="yk-grid">'+e.cards.map(function(c){ return cardH(c,e.app,'tab'); }).join('')+'</div></div>';
    function close(){ ov.remove(); document.removeEventListener('keydown',key); }
    function key(ev){ if(ev.key==='Escape') close(); }
    ov.addEventListener('click',function(ev){ var t=ev.target; if(t===ov||t.className==='yk-x'){ close(); return; }
      if(t.className==='yk-go'&&t.dataset.tab){ close(); try{ window.setTab(t.dataset.tab); var s=document.getElementById('tabs'); if(s) s.scrollIntoView({block:'start'}); }catch(_){} } });
    document.addEventListener('keydown',key); document.body.appendChild(ov); }

  var page=(location.pathname.split('/').pop()||'').replace(/\.html?$/,''), ent=null, i;
  for(i=0;i<DATA.length;i++) if(DATA[i].app===page) ent=DATA[i];
  if(ent){ css(); var bt=document.createElement('button'); bt.type='button'; bt.className='yk-btn'; bt.textContent='📌 약속'; bt.onclick=function(){ open(ent); };
    var tabs=document.getElementById('tabs'); if(tabs) tabs.insertBefore(bt,tabs.firstChild); else { bt.className+=' fix'; document.body.appendChild(bt); } }
})();
