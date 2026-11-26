(() => {
 const overlay=document.getElementById('offlineNotice');
 const close=document.getElementById('offlineClose');
 if(!overlay||!close)return;
 const show=()=>{overlay.hidden=false;close.focus();};
 const hide=()=>{overlay.hidden=true;};
 document.querySelectorAll('.offline-trigger').forEach(el=>el.addEventListener('click',show));
 close.addEventListener('click',hide);
 overlay.addEventListener('click',e=>{if(e.target===overlay)hide();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)hide();});
 document.querySelectorAll('.catalogue-row').forEach(row=>{
   const track=row.querySelector('.poster-track');
   row.querySelector('.row-prev')?.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.8,behavior:'smooth'}));
   row.querySelector('.row-next')?.addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.8,behavior:'smooth'}));
 });
})();