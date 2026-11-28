/* 우리 반 수업 앱 공통: 화면 확대 버튼 (오른쪽 아래). 확대 정도는 이 기기에 기억된다. */
(function(){
  var KEY='classAppsZoom', LV=[1,1.25,1.5,1.75,2,2.5,3], z=1, root=document.documentElement;
  try{ var s=parseFloat(localStorage.getItem(KEY)); if(LV.indexOf(s)>=0) z=s; }catch(e){}
  var box=document.createElement('div');
  box.setAttribute('role','group'); box.setAttribute('aria-label','화면 크기');
  box.style.cssText='position:fixed;right:10px;bottom:10px;z-index:99999;display:flex;align-items:center;gap:4px;padding:5px;border-radius:999px;background:rgba(29,43,54,.88);box-shadow:0 4px 14px rgba(0,0,0,.3);font:700 15px/1 "Malgun Gothic","Apple SD Gothic Neo",sans-serif;user-select:none;-webkit-user-select:none';
  function mk(txt,label,fn){ var b=document.createElement('button'); b.type='button'; b.textContent=txt; b.setAttribute('aria-label',label); b.title=label;
    b.style.cssText='all:unset;box-sizing:border-box;cursor:pointer;min-width:38px;height:38px;padding:0 10px;border-radius:999px;background:#fff;color:#1D2B36;text-align:center;font:700 17px/38px "Malgun Gothic","Apple SD Gothic Neo",sans-serif';
    b.addEventListener('click',fn); box.appendChild(b); return b; }
  var minus=mk('－','작게',function(){ step(-1); });
  var label=mk('100%','원래 크기로',function(){ set(1); });
  var plus=mk('＋','크게',function(){ step(1); });
  var full=mk('⛶','전체 화면',function(){ var d=document; if(d.fullscreenElement||d.webkitFullscreenElement){ (d.exitFullscreen||d.webkitExitFullscreen).call(d); } else { var r=root.requestFullscreen||root.webkitRequestFullscreen; if(r) r.call(root); } });
  if(!(root.requestFullscreen||root.webkitRequestFullscreen)) full.style.display='none';
  label.style.minWidth='62px'; label.style.fontSize='15px';
  function step(d){ var i=LV.indexOf(z); set(LV[Math.max(0,Math.min(LV.length-1,i+d))]); }
  function set(v){ z=v; window.__zoom=z; root.style.zoom=z===1?'':z; box.style.zoom=1/z; label.textContent=Math.round(z*100)+'%';
    minus.style.opacity=z===LV[0]?.45:1; plus.style.opacity=z===LV[LV.length-1]?.45:1;
    try{ localStorage.setItem(KEY,z); }catch(e){}
    try{ window.dispatchEvent(new Event('resize')); }catch(e){} }
  window.__zoom=z;
  function start(){ document.body.appendChild(box); set(z); }
  if(document.body) start(); else document.addEventListener('DOMContentLoaded',start);
})();

/* 글 줄이기(sayFold): 설명 상자(#say)는 첫 문장만 보이고, 나머지 풀이는 「설명 보기」를 눌러야 펼친다.
   - <small> 안의 긴 풀이(40자 초과)와, 첫 문장 뒤에 이어지는 글을 접는다. 「도움말」로 시작하는 것과 짧은 안내는 그대로 둔다.
   - 입력 칸·단추가 들어 있는 설명 상자는 건드리지 않는다.
   - 제목 아래 긴 소개 글은 숨긴다(그림과 조작이 먼저 보이도록). */
(function(){
  try{ var st=document.createElement('style'); st.textContent='header p{display:none}.say-rest{display:none}.say-rest.on{display:inline}'; document.head.appendChild(st); }catch(e){}
  var say=document.getElementById('say'); if(!say||!window.MutationObserver) return;
  var open=false, ob=new MutationObserver(fix), END=/[가-힣)」』\]%][.!?](?=\s|$)/;
  function vlen(n){ return n.nodeType===3?n.nodeValue.length:(n.nodeType===1&&n.tagName!=='SMALL'?(n.textContent||'').length:0); }
  function split(){   /* 첫 문장 뒤의 글을 .say-rest 로 감싼다 */
    if(say.querySelector('.say-rest,input,select,textarea,button:not(.say-more)')) return 0;
    var kids=[].slice.call(say.childNodes), tot=0, i, cut=-1, n;
    for(i=0;i<kids.length;i++) tot+=vlen(kids[i]);
    if(tot<=42) return 0;
    for(i=0;i<kids.length&&cut<0;i++){ n=kids[i];
      if(n.nodeType===1&&n.tagName==='BR'){ if(i>0) cut=i+1; }
      else if(n.nodeType===3){ var m=END.exec(n.nodeValue); if(m){ var at=m.index+2; if(at<n.nodeValue.length){ n.splitText(at); kids=[].slice.call(say.childNodes); } cut=i+1; } } }
    if(cut<0||cut>=kids.length) return 0;
    var rest=kids.slice(cut).filter(function(k){ return !(k.nodeType===1&&k.tagName==='SMALL'); }), len=0;
    rest.forEach(function(k){ len+=vlen(k); }); if(len<12) return 0;
    var sp=document.createElement('span'); sp.className='say-rest'; say.insertBefore(sp,rest[0]); rest.forEach(function(k){ sp.appendChild(k); });
    return 1; }
  function fix(){ ob.disconnect();
    var old=say.querySelector('.say-more'); if(old) old.remove();
    var n=split(), ss=say.querySelectorAll('small'), i, r=say.querySelector('.say-rest'), all=(say.textContent||'').replace(/\s+/g,' ').trim().length;
    if(r){ n=1; r.className='say-rest'+(open?' on':''); }
    for(i=0;i<ss.length;i++){ var t=(ss[i].textContent||'').trim(); if((t.length>40||(all>45&&t.length>12))&&t.indexOf('도움말')!==0){ ss[i].style.display=open?'block':'none'; n++; } }
    if(n){ var b=document.createElement('button'); b.type='button'; b.className='say-more'; b.textContent=open?'접기 ▲':'💡 설명 보기';
      b.style.cssText='display:block;margin:6px 0 0;font:inherit;font-size:14px;font-weight:700;cursor:pointer;color:inherit;background:transparent;border:1.5px solid currentColor;border-radius:999px;padding:4px 14px;opacity:.75';
      b.onclick=function(){ open=!open; fix(); }; say.appendChild(b); }
    ob.observe(say,{childList:true,subtree:true}); }
  fix();
})();

/* 또렷하게(lookBold): 앱 모음(index)과 같은 굵은 글꼴·진한 색으로 맞춘다. 모든 앱 공통.
   - 화면 글꼴: Pretendard/맑은 고딕 굵게, 탭·단추·설명 상자를 크게 진하게.
   - 그림(canvas) 글자: Jua 로 그리던 것을 같은 굵은 글꼴로 바꿔 그린다.
   - 숫자 조절(stepper): 슬라이더 옆에 큰 − 숫자 ＋ 단추를 붙인다. 범위가 좁으면(12 이하) 슬라이더는 숨긴다. */
(function(){
  var FF='"Pretendard","Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",system-ui,sans-serif';
  try{ var st=document.createElement('style'); st.textContent=
    ':root{--display:'+FF+';--body:'+FF+';--bg:#f3f1ea;--surface2:#E8F0FC;--ink:#1f2430;--muted:#4A5568;--line:#AEBBC8;--accent:#2F6FDB;--sel:#2F6FDB;--sel-ink:#fff}'+
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#14161b;--surface2:#222B3A;--ink:#F1F4F9;--muted:#B4BFCE;--line:#4A5668;--accent:#6FA3F5;--sel:#6FA3F5;--sel-ink:#10182a}}'+
    ':root[data-theme="dark"]{--bg:#14161b;--surface2:#222B3A;--ink:#F1F4F9;--muted:#B4BFCE;--line:#4A5668;--accent:#6FA3F5;--sel:#6FA3F5;--sel-ink:#10182a}'+
    'body{font-weight:600}h1{font-weight:800;letter-spacing:-.01em}'+
    'h1,h2,button,label,output,select,th{font-family:var(--display);font-weight:800}'+
    '.tabs button{font-size:18px;font-weight:800;border-width:2px;padding:9px 16px}'+
    '.btn,.chip{font-size:17px;font-weight:800;border-width:2px}'+
    '.tabs button[aria-selected="true"],.chip[aria-pressed="true"]{background:var(--sel);color:var(--sel-ink);border-color:var(--sel);box-shadow:0 3px 0 rgba(0,0,0,.18)}'+
    '.card{border-width:1.5px;box-shadow:0 8px 22px -14px rgba(30,30,40,.3)}section.card{border-top:6px solid var(--accent)}'+
    '.say{font-size:19px;font-weight:800;border-left-width:8px;background:var(--surface2);padding:12px 14px}.say small{font-size:16px;font-weight:600;color:var(--ink)}'+
    '.hint{font-size:15px;font-weight:700;color:var(--muted)}'+
    '.row label{font-size:17px;font-weight:800}.row output{font-size:19px;font-weight:800}'+
    'th,td{font-size:17px;font-weight:700;border-width:1.5px}'+
    '.row.stp{flex-wrap:wrap;gap:8px}.row.stp label{order:0}.stp-b{order:1;flex:0 0 auto;width:46px;height:46px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-ink,#fff);font-size:28px;font-weight:800;line-height:1;padding:0;box-shadow:0 3px 0 rgba(0,0,0,.22);touch-action:manipulation}'+
    '.stp-b:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.22)}.stp-b:disabled{opacity:.3;box-shadow:none}'+
    '.row.stp output{order:2;flex:0 0 auto;min-width:58px;text-align:center;font-size:26px;font-weight:800;background:var(--surface);border:2.5px solid var(--accent);border-radius:12px;padding:3px 10px;line-height:1.3}'+
    '.stp-b.up{order:3}.row.stp input[type=range]{order:4;flex:1 1 120px;min-width:100px}.row.stp.few input[type=range]{display:none}'+
    '.tabs button{display:inline-flex;align-items:center;gap:7px}.tn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--accent);color:var(--accent-ink,#fff);font-size:14px;font-weight:800;flex:none}.tabs button[aria-selected="true"] .tn{background:var(--sel-ink);color:var(--sel)}'+
    '.dims .row.stp{flex-wrap:nowrap}.dims .row.stp.few label{flex:0 1 auto;min-width:0!important;white-space:normal!important;line-height:1.15;font-size:16px}.dims .row.stp:not(.few){flex-wrap:wrap}.dims{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))!important;gap:4px 18px!important}';
    document.head.appendChild(st); }catch(e){}

  /* canvas 글자: Jua → 굵은 본문 글꼴 */
  try{ var P=CanvasRenderingContext2D.prototype, d=Object.getOwnPropertyDescriptor(P,'font');
    if(d&&d.set&&!P.__bold){ P.__bold=1; Object.defineProperty(P,'font',{configurable:true,enumerable:d.enumerable,get:function(){ return d.get.call(this); },
      set:function(v){ try{ if(typeof v==='string'&&/Jua/.test(v)&&!/^\s*(bold|[5-9]00)/.test(v)) v='800 '+v.replace(/Jua\s*,?/,'Pretendard,"Apple SD Gothic Neo",'); }catch(e){} d.set.call(this,v); }}); } }catch(e){}

  /* 숫자 조절 단추 */
  function fire(inp){ inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('change',{bubbles:true})); }
  function mk(sign,inp){ var b=document.createElement('button'); b.type='button'; b.className='stp-b'+(sign>0?' up':''); b.textContent=sign>0?'+':'−'; b.setAttribute('aria-label',sign>0?'늘리기':'줄이기');
    var lim=sign>0?+inp.max:+inp.min, v=+inp.value; if(!isNaN(lim)&&inp.max!==''&&(sign>0?v>=lim:v<=lim)) b.disabled=true;
    b.onclick=function(){ if(sign>0) inp.stepUp(); else inp.stepDown(); fire(inp); }; return b; }
  function enh(){ var rs=document.querySelectorAll('.row input[type=range]'), i;
    for(i=0;i<rs.length;i++){ var inp=rs[i], row=inp.parentNode, out=inp.nextElementSibling;
      if(!row||row.className.indexOf('stp')>=0||!out||out.tagName!=='OUTPUT'||inp.disabled) continue;
      if(row.querySelectorAll('input').length!==1) continue;
      var step=+inp.step||1, span=((+inp.max)-(+inp.min))/step;
      row.className+=' stp'+(span<=12?' few':'');
      row.insertBefore(mk(-1,inp),inp); row.appendChild(mk(1,inp)); } }
  /* 값이 바뀌면 − / + 단추의 흐림 상태를 다시 맞춘다 */
  document.addEventListener('input',function(e){ var t=e.target; if(!t||t.type!=='range'||!t.parentNode||t.parentNode.className.indexOf('stp')<0) return; var bs=t.parentNode.querySelectorAll('.stp-b'), v=+t.value; if(bs.length===2){ bs[0].disabled=t.min!==''&&v<=+t.min; bs[1].disabled=t.max!==''&&v>=+t.max; } },true);
  var ob2=new MutationObserver(function(){ ob2.disconnect(); try{ enh(); }catch(e){} ob2.observe(document.body,{childList:true,subtree:true}); });
  /* 탭 번호 ①②… 는 굵은 글꼴에서 뭉개져 보여서 동그란 숫자 배지로 바꾼다 */
  function tabNo(){ var bs=document.querySelectorAll('.tabs button'), i; for(i=0;i<bs.length;i++){ var b=bs[i], t=b.textContent, c=t.charCodeAt(0); if(b.querySelector('.tn')||c<0x2460||c>0x2473) continue;
    b.textContent=''; var n=document.createElement('span'); n.className='tn'; n.textContent=String(c-0x245F); b.appendChild(n); b.appendChild(document.createTextNode(t.slice(1).replace(/^ +/,''))); } }
  function go(){ try{ tabNo(); enh(); }catch(e){} ob2.observe(document.body,{childList:true,subtree:true}); try{ window.dispatchEvent(new Event('resize')); }catch(e){} }
  if(document.body) go(); else document.addEventListener('DOMContentLoaded',go);
})();

/* 📌 약속: 약속 카드 파일을 불러온다(카드가 있는 앱에만 단추가 생김) */
(function(){ try{ if(/yaksok/.test(location.pathname)) return; var s=document.createElement('script'); s.src='yaksok.js'; document.head.appendChild(s); }catch(e){} })();

/* 🔖 파비콘: 앱마다 같은 아이콘을 붙인다(목록·약속 모음은 html에 직접 들어 있음) */
(function(){ try{ if(document.querySelector('link[rel~="icon"]')) return; var h=document.head;
  [['icon','favicon.svg','image/svg+xml'],['icon','favicon-32.png','image/png'],['apple-touch-icon','apple-touch-icon.png','']].forEach(function(a){ var l=document.createElement('link'); l.rel=a[0]; l.href=a[1]; if(a[2]) l.type=a[2]; h.appendChild(l); }); }catch(e){} })();

/* 📱 폰에서 위아래로 밀기: 그림판(canvas)은 손가락 끌기를 통째로 가져가게(touch-action:none) 되어 있어서, 그림 위에서 밀면 화면이 안 내려갔다.
   그림을 끌어서 쓰는 화면(입체 돌리기, 사각형 만들기, 각 재기)이 아닐 때는 위아래 밀기를 화면 넘기기로 돌려준다. 누르기(탭)는 그대로 된다.
   앱이 window.needDrag()를 두면 그 값을 따른다. */
(function(){
  var cv=document.querySelector('canvas'); if(!cv||typeof window.D3==='undefined') return;
  var page=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
  function need(){ try{
    if(typeof window.needDrag==='function') return !!window.needDrag();
    if(window.D3&&!(typeof window.noDrag==='function'&&window.noDrag())) return true;
    if(page==='quad4'&&window.tab==='make') return true;
    if(page==='angle4'&&window.tab==='meas') return true;
  }catch(e){ return true; } return false; }
  function upd(){ var n=need(); cv.style.touchAction=n?'none':'pan-y'; cv.style.cursor=n?'':'default'; }
  function later(){ setTimeout(upd,0); }
  ['click','input','change','pointerup','keyup'].forEach(function(t){ document.addEventListener(t,later,true); });
  upd();
})();
