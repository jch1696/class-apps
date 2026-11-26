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
