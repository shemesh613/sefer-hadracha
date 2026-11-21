document.addEventListener('DOMContentLoaded',()=>{
  document.body.className='rd';
  document.querySelector('.ui').remove();
  const placeholder=document.createElement('section'); placeholder.className='sheet';
  document.querySelector('.sheet').before(placeholder);
  const pages=[...document.querySelectorAll('.sheet')];
  const stage=document.createElement('div'); stage.className='rd-stage';
  const book=document.createElement('div'); book.className='rd-book';
  const ONE=matchMedia('(max-width:820px)').matches;
  if(ONE) document.body.classList.add('one');
  // מקטינים את העמוד הקבוע כך שייכנס למסך, כמו מציג PDF.
  function fitPage(){
    
    const k=Math.min(1,(innerWidth-24)/(ONE?520:1040),(innerHeight-100)/693);
    stage.style.transform='translate(-50%,-50%) scale('+k.toFixed(4)+')';
  }
  {
    fitPage();
    addEventListener('resize',fitPage);
    addEventListener('orientationchange',fitPage);
  }
  document.body.appendChild(stage); stage.appendChild(book); pages.forEach(p=>book.appendChild(p));
  for(const c of ['rd-edge r','rd-edge l','rd-spine']){
    const d=document.createElement('div'); d.className=c; stage.appendChild(d); }
  const cast=document.createElement('div'); cast.className='rd-cast'; book.appendChild(cast);

  const ui=document.createElement('div'); ui.className='rd-ui';
  ui.innerHTML='<button data-p>→ הקודם</button><span class="cnt"></span>'+
               '<button data-n>הבא ←</button>'+
               '<span class="jump"><input type="number" min="1" data-go placeholder="עמוד">'+
               '<button data-jump>דלג</button></span>'+
               '<button data-play>▶ הרצה</button><button data-f>מסך מלא</button>';
  document.body.appendChild(ui);
  const hint=document.createElement('div'); hint.className='rd-hint';
  hint.textContent='גוררים את הדף ביד · חצים לדפדוף · רווח להרצה · או מקלידים מספר עמוד';
  document.body.appendChild(hint);
  setTimeout(()=>hint.style.opacity=0,5200);

  let cur=0, busy=false, PG=pages;
  if(location.search.indexOf('size')>=0) setTimeout(function(){
    var st=document.querySelector('.rd-stage').getBoundingClientRect();
    alert('מסך: '+innerWidth+' x '+innerHeight+'\n'+
          'עמוד: '+Math.round(st.width)+' x '+Math.round(st.height)+'\n'+
          'סה"כ עמודים: '+PG.length);
  },1200);
  const norm=i=>{ i=Math.max(1,Math.min(PG.length-1,i)); return (!ONE&&i>1&&i%2===0)?i-1:i; };

  // המספר שמודפס בתחתית העמוד - הוא האמת היחידה שהקורא רואה
  const folio = i => {
    const sh = PG[i];
    if(!sh) return "";
    const f = sh.querySelector('.fol');
    return (f && f.textContent) ? f.textContent : String(i);
  };

  function render(){
    PG.forEach(p=>p.classList.remove('rd-r','rd-l','rd-cover','rd-measure'));
    stage.classList.toggle('is-cover',cur===0);
    if(cur===0) PG[0].classList.add('rd-cover');
    else{ PG[cur].classList.add('rd-r'); if(!ONE && PG[cur+1]) PG[cur+1].classList.add('rd-l'); }
    const N=PG.length, LAST=N-1, end=cur===0?1:Math.min(cur+(ONE?1:2),N);
    ui.querySelector('.cnt').textContent = cur===0
      ? 'כריכה · '+LAST+' עמודים'
      : (ONE ? 'עמוד '+folio(cur)+' מתוך '+LAST
             : 'עמודים '+folio(cur)+'-'+folio(Math.min(cur+1,LAST))+' מתוך '+LAST);
    ui.querySelector('[data-p]').disabled=cur<=1||busy;
    ui.querySelector('[data-n]').disabled=end>=N||busy;
    history.replaceState(null,'','#page-'+cur);
  }

  // בונה דף מתהפך עם שני צדדים אמיתיים
  function makeLeaf(dir){
    const leaf=document.createElement('div');
    leaf.className='rd-leaf '+(dir>0?'next':'prev');
    const fi = dir>0 ? (cur===0?0:cur+1) : cur;        // הצד הקדמי = הדף שנתפס
    const bi = dir>0 ? fi+1 : fi-1;                    // הצד האחורי = מה שמאחוריו
    for(const [cls,idx] of [['f',fi],['b',bi]]){
      const face=document.createElement('div'); face.className='fc '+cls;
      if(PG[idx]){ const c=PG[idx].cloneNode(true);
        c.classList.remove('rd-r','rd-l','rd-cover','rd-measure'); face.appendChild(c); }
      const sh=document.createElement('div'); sh.className='sh'; face.appendChild(sh);
      leaf.appendChild(face);
    }
    if(dir>0&&cur===0) leaf.className='rd-leaf prev', leaf.style.transformOrigin='0% 50%';
    book.appendChild(leaf);
    return leaf;
  }

  // מציב את הדפים שנחשפים מתחת לדף המתהפך
  function underlay(dir){
    PG.forEach(p=>p.classList.remove('rd-r','rd-l','rd-cover'));
    if(dir>0){
      if(PG[cur]) PG[cur].classList.add('rd-r');          // נשאר גלוי מימין
      if(PG[cur+3]) PG[cur+3].classList.add('rd-l');      // נחשף משמאל
    }else{
      if(PG[cur+1]) PG[cur+1].classList.add('rd-l');
      if(PG[cur-2]) PG[cur-2].classList.add('rd-r');
    }
  }

  const MAXA=180;
  function setAngle(leaf,dir,t){                                // t: 0..1
    const a = dir>0 ? t*MAXA : -t*MAXA;
    const lift = Math.sin(t*Math.PI)*16;                        // הרמה קלה מהשולחן
    leaf.style.transform='translateZ('+lift+'px) rotateY('+a+'deg)';
    const f=leaf.querySelector('.fc.f .sh'), b=leaf.querySelector('.fc.b .sh');
    f.style.opacity=Math.min(1,t*1.5); b.style.opacity=Math.max(0,1.1-t*1.4);
    cast.className='rd-cast '+(dir>0?'next':'prev');
    cast.style.opacity=Math.sin(t*Math.PI)*0.55;
  }

  function go(dir){
    if(busy||drag) return;
    const st = ONE ? 1 : 2;
    const target = dir>0 ? (cur===0?1:cur+st) : (cur<=1?0:cur-st);
    if(norm(target)===cur) return;
    if(ONE||matchMedia('(prefers-reduced-motion: reduce)').matches){ cur=norm(target); render(); return; }   // מעבר מיידי, בלי סיבוב דף
    busy=true; render();
    const leaf=makeLeaf(dir); underlay(dir);
    setAngle(leaf,dir,0);
    leaf.getBoundingClientRect();
    leaf.style.transition='transform .78s cubic-bezier(.42,.03,.24,1)';
    leaf.querySelectorAll('.sh').forEach(s=>s.style.transition='opacity .78s linear');
    cast.style.transition='opacity .78s linear';
    requestAnimationFrame(()=>setAngle(leaf,dir,1));
    setTimeout(()=>{
      leaf.remove(); cast.style.transition=''; cast.style.opacity=0;
      cur=norm(target); busy=false; render();
    },790);
  }

  // ---- גרירה: הדף עוקב אחרי העכבר ----
  let drag=null;
  // בטלפון מדפדפים במשיכת אצבע בלבד.
  // נגיעה רגילה לא מדפדפת - היא הפריעה בקריאה.
  if(ONE){
    let sx=null, sy=null, last=0;
    const inUI=t=>t && t.closest && t.closest(".rd-ui");
    document.addEventListener('touchstart',e=>{
      const t=e.changedTouches[0]; sx=t.clientX; sy=t.clientY;
    },{passive:true});
    document.addEventListener('touchend',e=>{
      if(sx==null) return;
      const t=e.changedTouches[0];
      const dx=t.clientX-sx, dy=t.clientY-sy;
      sx=null;
      if(inUI(e.target)) return;
      // רק תנועה אופקית ברורה נחשבת דפדוף
      if(Math.abs(dx)<55 || Math.abs(dx)<Math.abs(dy)*1.5) return;
      const now=Date.now();
      if(now-last<400) return;
      last=now;
      go(dx>0 ? 1 : -1);        // עברית: מושכים ימינה כדי להתקדם
    },{passive:true});
  }
  stage.addEventListener('pointerdown',e=>{
    if(busy||drag||e.button!==0) return;
    const r=stage.getBoundingClientRect();
    const left = e.clientX < r.left + r.width/2;
    const dir = left ? 1 : -1;                      // עברית: הדף השמאלי הולך ימינה
    if(ONE) return;
    const target = dir>0 ? (cur===0?1:cur+2) : (cur<=1?0:cur-2);
    if(norm(target)===cur) return;
    stage.setPointerCapture(e.pointerId); stage.classList.add('dragging');
    const leaf=makeLeaf(dir); underlay(dir); setAngle(leaf,dir,0);
    drag={x:e.clientX,w:r.width/2,dir,leaf,t:0,target};
  });
  stage.addEventListener('pointermove',e=>{
    if(!drag) return;
    const d=(e.clientX-drag.x)*drag.dir;            // ימינה=קדימה, שמאלה=אחורה
    drag.t=Math.max(0,Math.min(1,d/drag.w));
    setAngle(drag.leaf,drag.dir,drag.t);
  });
  function endDrag(){
    if(!drag) return;
    const {leaf,dir,t,target}=drag; drag=null;
    stage.classList.remove('dragging');
    const done=t>0.32;
    busy=true;
    leaf.style.transition='transform .5s cubic-bezier(.3,.7,.3,1)';
    leaf.querySelectorAll('.sh').forEach(s=>s.style.transition='opacity .5s linear');
    cast.style.transition='opacity .5s linear';
    requestAnimationFrame(()=>setAngle(leaf,dir,done?1:0));
    setTimeout(()=>{
      leaf.remove(); cast.style.transition=''; cast.style.opacity=0;
      if(done) cur=norm(target);
      busy=false; render();
    },510);
  }
  stage.addEventListener('pointerup',endDrag);
  stage.addEventListener('pointercancel',endDrag);

  // ---- קפיצה למספר עמוד ----
  const inp=ui.querySelector('[data-go]');
  function jump(){
    const v=parseInt(inp.value,10);
    if(!Number.isFinite(v)) return;
    stopPlay();
    cur=norm(Math.max(0,Math.min(PG.length-1,v)));
    render(); inp.blur();
  }
  ui.querySelector('[data-jump]').onclick=jump;
  inp.addEventListener('keydown',e=>{ e.stopPropagation(); if(e.key==='Enter') jump(); });

  // ---- הרצה אוטומטית ----
  let timer=null;
  const playBtn=ui.querySelector('[data-play]');
  function stopPlay(){ if(timer){ clearInterval(timer); timer=null; playBtn.textContent='▶ הרצה'; } }
  function startPlay(){
    playBtn.textContent='⏸ עצור';
    timer=setInterval(()=>{
      if(busy||drag) return;
      if((cur===0?1:Math.min(cur+2,PG.length))>=PG.length){ stopPlay(); return; }
      go(1);
    },3400);
  }
  playBtn.onclick=()=>timer?stopPlay():startPlay();
  stage.addEventListener('pointerdown',stopPlay);

  ui.querySelector('[data-n]').onclick=()=>go(1);
  ui.querySelector('[data-p]').onclick=()=>go(-1);
  ui.querySelector('[data-f]').onclick=()=>{ document.fullscreenElement
    ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.(); };
  addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT') return;                 // הקלדה בתיבת העמוד
    if(e.key==='ArrowLeft'){ stopPlay(); go(1); }
    if(e.key==='ArrowRight'){ stopPlay(); go(-1); }
    if(e.key===' '){ e.preventDefault(); playBtn.click(); }
  });


cur=norm(Number((location.hash.match(/page-(\d+)/)||[])[1])||1); render();
});