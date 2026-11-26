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
