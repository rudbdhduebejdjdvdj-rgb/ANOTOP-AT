(() => {
 const coin=document.getElementById('interactiveCoin');
 if(!coin) return;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce) return;
 const move=(event)=>{
   const r=coin.getBoundingClientRect();
   const x=(event.clientX-r.left)/r.width;
   const y=(event.clientY-r.top)/r.height;
   const ry=(x-.5)*22, rx=(.5-y)*22;
   coin.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale(1.035)';
 };
 const reset=()=>{coin.style.transform='perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';};
 coin.addEventListener('pointermove',move);
 coin.addEventListener('pointerleave',reset);
 coin.addEventListener('pointerdown',move);
 coin.addEventListener('pointerup',reset);
})();