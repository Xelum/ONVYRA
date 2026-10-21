/* Preference storage is restricted to this site path and contains no visitor identifier. */
(()=>{'use strict';
 const banner=document.getElementById('privacy-banner');if(!banner)return;
 const $=id=>document.getElementById(id),key='onvyra:privacy:v1',version=1;
 let consent=null,returnFocus=null;
 function valid(value){return value&&value.version===version&&typeof value.personalization==='boolean'&&Number.isFinite(value.expires)&&Number.isFinite(value.savedAt)&&value.expires>Date.now()&&value.savedAt<=Date.now()}
 try{const value=JSON.parse(localStorage.getItem(key)||'null');if(valid(value))consent=value;else localStorage.removeItem(key)}catch(_){}
 function save(personalization){const now=Date.now(),expires=new Date(now);expires.setMonth(expires.getMonth()+6);consent={version,personalization:!!personalization,savedAt:now,expires:expires.getTime()};if(personalization)consent.reduced=document.getElementById('motion-toggle').getAttribute('aria-pressed')==='true';try{localStorage.setItem(key,JSON.stringify(consent));$('privacy-storage-note').textContent=''}catch(_){$('privacy-storage-note').textContent='Il browser non consente di salvare la scelta. Verrà applicata a questa visita.'}banner.hidden=true;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});else if(document.documentElement.classList.contains('site-unlit'))$('light-switch').focus({preventScroll:true})}
 function open(){returnFocus=document.activeElement;$('privacy-custom').hidden=true;$('privacy-save').hidden=true;$('privacy-personalize').setAttribute('aria-expanded','false');$('remember-motion').checked=!!consent?.personalization;banner.hidden=false;$('privacy-reject').focus({preventScroll:true})}
 $('privacy-accept').addEventListener('click',()=>save(true));$('privacy-reject').addEventListener('click',()=>save(false));$('privacy-dismiss').addEventListener('click',()=>save(false));$('privacy-personalize').addEventListener('click',()=>{const open=$('privacy-custom').hidden;$('privacy-custom').hidden=!open;$('privacy-save').hidden=!open;$('privacy-personalize').setAttribute('aria-expanded',String(open))});$('privacy-save').addEventListener('click',()=>save($('remember-motion').checked));$('privacy-settings').addEventListener('click',open);
 // The banner was inserted before app.js attached privacy links, so its reader uses the same dialog handling.
 if(consent?.personalization&&typeof consent.reduced==='boolean')window.ONVYRA?.setReduced(consent.reduced);
 addEventListener('ONVYRA_MOTION_CHANGE',event=>{if(!consent?.personalization)return;consent.reduced=!!event.detail.reduced;try{localStorage.setItem(key,JSON.stringify(consent))}catch(_){}});
 if(!consent)requestAnimationFrame(open);
})();
