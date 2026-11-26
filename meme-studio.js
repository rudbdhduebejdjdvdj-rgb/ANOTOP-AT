(() => {
  const canvas = document.getElementById('memeCanvas');
  const ctx = canvas.getContext('2d');
  const imageInput = document.getElementById('imageInput');
  const topText = document.getElementById('topText');
  const bottomText = document.getElementById('bottomText');
  const textColor = document.getElementById('textColor');
  const status = document.getElementById('studioStatus');
  let sourceImage = null;
  function drawCover(image) {
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const w = image.width * scale, h = image.height * scale;
    ctx.drawImage(image, (canvas.width-w)/2, (canvas.height-h)/2, w, h);
  }
  function wrapText(text, maxWidth) {
    const words = text.trim().split(/\s+/).filter(Boolean), lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines.slice(0,3);
  }
  function draw() {
    ctx.fillStyle = '#171717'; ctx.fillRect(0,0,900,900);
    if (sourceImage) drawCover(sourceImage);
    else {
      const g = ctx.createLinearGradient(0,0,900,900); g.addColorStop(0,'#a50d19'); g.addColorStop(1,'#171717');
      ctx.fillStyle=g; ctx.fillRect(0,0,900,900);
      ctx.fillStyle='#ffffff'; ctx.textAlign='center'; ctx.font='900 82px Arial'; ctx.fillText('ANOTOP AT',450,450);
    }
    ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillStyle=textColor.value;
    ctx.strokeStyle='#000'; ctx.lineJoin='round'; ctx.lineWidth=13;
    ctx.font='900 66px Impact, Arial Black, sans-serif';
    const drawBlock=(text,y)=>{const lines=wrapText(text.toUpperCase(),820); lines.forEach((line,i)=>{const yy=y+(i-(lines.length-1)/2)*76;ctx.strokeText(line,450,yy,830);ctx.fillText(line,450,yy,830);});};
    drawBlock(topText.value,95); drawBlock(bottomText.value,805);
  }
  imageInput.addEventListener('change',()=>{const file=imageInput.files && imageInput.files[0];if(!file)return;if(!file.type.startsWith('image/')){status.textContent='Elige un archivo de imagen válido.';return;}const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{sourceImage=img;draw();URL.revokeObjectURL(url);status.textContent='Imagen cargada. Tu meme está listo para editar.';};img.onerror=()=>{URL.revokeObjectURL(url);status.textContent='No se ha podido abrir esa imagen.';};img.src=url;});
  [topText,bottomText,textColor].forEach(el=>el.addEventListener('input',draw));
  document.getElementById('downloadMeme').addEventListener('click',()=>{draw();const a=document.createElement('a');a.download='anotop-at-meme.png';a.href=canvas.toDataURL('image/png');a.click();status.textContent='¡Meme descargado!';});
  draw();
})();