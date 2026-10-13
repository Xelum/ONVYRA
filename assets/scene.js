/* ONVYRA — interactive jellyfish mascot, driven by pointer and scroll. */
(function(){
  'use strict';
  const visual=document.getElementById('hero-visual');
  const jelly=document.getElementById('jelly-wrap');
  if(!visual||!jelly)return;
  const hero=document.getElementById('home');
  const pupils=Array.from(visual.querySelectorAll('.jelly-pupil'));
  const eyes=Array.from(visual.querySelectorAll('.jelly-eye'));
  const orbits=Array.from(visual.querySelectorAll('.jelly-orbit'));
  const particles=Array.from(visual.querySelectorAll('.jelly-particle'));
  const coarse=matchMedia('(pointer:coarse)').matches;
  let targetProgress=0,progress=0,targetX=0,targetY=0,pointerX=0,pointerY=0;
  let reduced=false,onscreen=true,active=!document.documentElement.classList.contains('site-unlit'),raf=0,last=0,lastTouch=0,nextBlink=performance.now()+2600;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const damp=(from,to,speed)=>from+(to-from)*speed;

  function draw(now){
    if(coarse&&now-lastTouch>1400){targetX=Math.sin(now*.00072)*.72;targetY=Math.cos(now*.00054)*.42;}
    progress=damp(progress,targetProgress,reduced?1:.075);
    pointerX=damp(pointerX,targetX,reduced?1:.06);
    pointerY=damp(pointerY,targetY,reduced?1:.06);
    const p=clamp(progress);
    const idle=reduced?0:Math.sin(now*.00105)*9;
    const breathe=reduced?1:1+Math.sin(now*.00155)*.012;
    jelly.style.transform=`translate3d(${pointerX*10-p*26}px,${idle+pointerY*7+p*36}px,0) rotateX(${-pointerY*2.2}deg) rotateY(${pointerX*4.5}deg) rotateZ(${-2+pointerX*1.8+p*7}deg) scale(${breathe*(1-p*.035)})`;

    pupils.forEach((pupil,index)=>{
      const eye=eyes[index];
      const limitX=Math.max(5,eye.clientWidth*(coarse ? .22 : .16)),limitY=Math.max(4,eye.clientHeight*(coarse ? .18 : .13));
      pupil.style.transform=`translate3d(${pointerX*limitX}px,${pointerY*limitY}px,0)`;
    });

    if(!reduced&&now>nextBlink){
      eyes.forEach(eye=>eye.classList.add('blink'));
      setTimeout(()=>eyes.forEach(eye=>eye.classList.remove('blink')),150);
      nextBlink=now+3100+Math.random()*3200;
    }

    orbits.forEach((orbit,index)=>{
      const direction=index?1:-1;
      orbit.style.transform=`rotate(${direction*(now*.006+p*62)}deg) scale(${1+p*.08})`;
    });
    particles.forEach((particle,index)=>{
      const phase=index*2.1;
      particle.style.transform=`translate3d(${Math.sin(now*.0011+phase)*(8+index*3)}px,${Math.cos(now*.0009+phase)*(10+index*4)-p*(12+index*9)}px,0)`;
    });
    visual.style.setProperty('--scene-progress',p.toFixed(3));
    last=now;
  }
  function loop(now){
    raf=0;now=now||performance.now();if(coarse&&last&&now-last<30){raf=requestAnimationFrame(loop);return;}draw(now);
    if(!reduced&&active&&onscreen&&!document.hidden)raf=requestAnimationFrame(loop);
  }
  function ensureLoop(){if(!raf&&!reduced&&active&&onscreen&&!document.hidden)raf=requestAnimationFrame(loop);}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
  function render(next=0,nextReduced=false){
    targetProgress=clamp(next);reduced=!!nextReduced;
    if(reduced){stop();draw(last||performance.now());}else ensureLoop();
  }
  function followPointer(event){if(reduced)return;const r=visual.getBoundingClientRect();targetX=clamp((event.clientX-(r.left+r.width/2))/(r.width*.5),-1,1);targetY=clamp((event.clientY-(r.top+r.height*.36))/(r.height*.5),-1,1);if(coarse)lastTouch=performance.now();}
  function followTouch(event){const touch=event.touches?.[0];if(touch)followPointer(touch);}
  hero?.addEventListener('pointermove',followPointer,{passive:true});
  hero?.addEventListener('pointerdown',followPointer,{passive:true});
  hero?.addEventListener('touchstart',followTouch,{passive:true});
  hero?.addEventListener('touchmove',followTouch,{passive:true});
  hero?.addEventListener('pointerleave',()=>{targetX=0;targetY=0;},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else ensureLoop();});
  addEventListener('ONVYRA_ACTIVATE',()=>{active=true;lastTouch=performance.now();ensureLoop();},{once:true});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{onscreen=!!entries[0]?.isIntersecting;if(onscreen)ensureLoop();else stop();},{rootMargin:'180px'}).observe(visual);
  document.documentElement.classList.add('visual-ready');
  window.ONVYRA_SCENE={render};
})();
