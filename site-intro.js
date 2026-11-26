(() => {
 const intro=document.getElementById('siteIntro');
 if(!intro) return;
 const key='anotopIntroShown';
 try{
   if(sessionStorage.getItem(key)==='1'){
     intro.classList.add('is-hidden');
     return;
   }
   sessionStorage.setItem(key,'1');
 }catch(e){}
 window.setTimeout(()=>intro.classList.add('is-done'),2100);
 window.setTimeout(()=>intro.classList.add('is-hidden'),2850);
})();