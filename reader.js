
document.addEventListener('DOMContentLoaded',()=>{
  document.body.className='rd';
  const pages=[...document.querySelectorAll('.sheet')];
  const stage=document.createElement('div'); stage.className='rd-stage';
  const book=document.createElement('div'); book.className='rd-book';
  const ONE=matchMedia('(max-width:820px)').matches;
  if(ONE) document.body.classList.add('one');
  // מקטינים את העמוד הקבוע כך שייכנס למסך, כמו מציג PDF.
  function fitPage(){
    if(!ONE) return;
    const k=Math.min(innerWidth/528, (innerHeight-64)/701);
    stage.style.transform='translate(-50%,-50%) scale('+k.toFixed(4)+')';
  }
  if(ONE){
    fitPage();
    addEventListener('resize',fitPage);
    addEventListener('orientationchange',fitPage);
  }
  pages[0].before(stage); stage.appendChild(book); pages.forEach(p=>book.appendChild(p));
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
  const norm=i=>{ i=Math.max(0,Math.min(PG.length-1,i)); return (!ONE&&i>1&&i%2===0)?i-1:i; };

  // ===== עימוד אמיתי: נמדד בגודל שהעמוד באמת מקבל בקורא =====
  const over=sh=>{ const b=sh.querySelector('.body'); return b && b.scrollHeight>b.clientHeight+1; };

  function contSheet(sh){
    const d=document.createElement('div');
    d.className='sheet txt continued'+(sh.classList.contains('tight')?' tight':'');
    const lbl=sh.querySelector('.knum')?.textContent.replace(/ · המשך$/,'')||'';
    d.innerHTML='<div class="head"><div class="knum">'+lbl+'</div><h2>המשך</h2>'+
      '<div class="deco"></div></div><div class="body"></div><div class="fol"></div>';
    return d;
  }

  // ===== מילוי החור בתחתית העמוד =====
  // פסקה שעברה במלואה לעמוד הבא משאירה שטח לבן. כאן מושכים בחזרה
  // את תחילתה, שורה־שורה, כמו בספר. שומרים מינימום שתי שורות בכל צד.
  const SPLIT = new Set(['p','box']);          // stop/q/close הם שורות תצוגה - לא נחתכים
  function pullBack(sh,from,to){
    const b=sh.querySelector('.body');
    // scrollHeight אף פעם אינו קטן מ-clientHeight, ולכן החישוב הישן
    // החזיר תמיד אפס והפיצול לא רץ. מודדים לפי תחתית התוכן.
    let gap;
    if(ONE){
      const lastEl=b.lastElementChild;
      const used=lastEl ? (lastEl.getBoundingClientRect().bottom - b.getBoundingClientRect().top) : 0;
      gap=b.clientHeight-used;
    } else gap=b.clientHeight-b.scrollHeight;
    if(gap<40) return;                          // החור זניח
    const first=to.firstElementChild;
    if(!first||!SPLIT.has(first.className)) return;
    const lh=parseFloat(getComputedStyle(first).lineHeight)||22;
    if(first.getBoundingClientRect().height < lh*4) return;   // קצרה מכדי לחצות

    // מפרקים לאסימונים: מילים ושבירות שורה מפורשות
    const toks=[];
    first.childNodes.forEach(n=>{
      if(n.nodeName==='BR') toks.push({br:true});
      else String(n.textContent).split(/(\s+)/).forEach(w=>{ if(w) toks.push({w}); });
    });
    const render=arr=>arr.map(t=>t.br?'<br>':t.w).join('');

    const head=document.createElement('div');
    head.className=first.className;
    from.appendChild(head);

    // חיפוש בינארי: כמה אסימונים נכנסים בלי לגלוש
    let lo=0, hi=toks.length, best=0;
    while(lo<=hi){
      const mid=(lo+hi)>>1;
      head.innerHTML=render(toks.slice(0,mid));
      if(b.scrollHeight<=b.clientHeight){ best=mid; lo=mid+1; } else hi=mid-1;
    }
    head.innerHTML=render(toks.slice(0,best));
    // לפחות שתי שורות בראש הפסקה, ולפחות שתיים בהמשכה
    const tailToks=toks.slice(best);
    const okHead=head.getBoundingClientRect().height>=lh*1.8;
    if(!okHead || best===0 || tailToks.filter(t=>t.w&&t.w.trim()).length<6){
      head.remove(); return;
    }
    first.innerHTML=render(tailToks).replace(/^\s+/,'');
    head.classList.add('split-head'); first.classList.add('split-tail');
  }

  // מאחד בחזרה את כל עמודי ההמשך של פרק אחד לתוך העמוד הראשון שלו
  function mergeAfter(head){
    const to=head.querySelector('.body');
    let n=head.nextElementSibling;
    while(n && n.classList.contains('continued')){
      const nx=n.nextElementSibling, from=n.querySelector('.body');
      while(from.firstChild) to.appendChild(from.firstChild);
      n.remove(); n=nx;
    }
    to.querySelectorAll('[style*="font-size"]').forEach(e=>e.style.fontSize='');
  }

  // מפצל פרק אחד לעמודים ומחזיר את רשימתם
  function paginate(head){
    const pages=[head];
    let sh=head;
    for(;;){
      sh.classList.add('rd-measure');
      if(!over(sh)){ sh.classList.remove('rd-measure'); break; }
      const nx=contSheet(sh); sh.after(nx);
      const from=sh.querySelector('.body'), to=nx.querySelector('.body');
      while(over(sh) && from.children.length>1)
        to.insertBefore(from.lastElementChild,to.firstChild);
      if(over(sh)){        // פסקה בודדת גדולה מעמוד - מקטינים רק אותה
        const only=from.firstElementChild; let s2=100;
        while(over(sh) && s2>72){ s2-=2; only.style.fontSize=s2+'%'; }
      } else pullBack(sh,from,to);
      sh.classList.remove('rd-measure');
      pages.push(nx); sh=nx;
    }
    return pages;
  }

  // כמה מהעמוד באמת מתמלא
  function fillOf(sh){
    sh.classList.add('rd-measure');
    const b=sh.querySelector('.body'), last=b.lastElementChild;
    const v=last ? (last.getBoundingClientRect().bottom-b.getBoundingClientRect().top)/b.clientHeight : 1;
    sh.classList.remove('rd-measure');
    return v;
  }

  let tightened=0;
  function reflow(){
    tightened=0;
    // א. כל פרק חוזר להיות עמוד אחד ארוך
    for(const s of [...book.querySelectorAll('.sheet.txt')])
      if(!s.classList.contains('continued')) mergeAfter(s);
    [...book.querySelectorAll('.sheet.txt.continued')].forEach(s=>s.remove());

    // ב. פרק אחר פרק: מעמדים, ואם הזנב כמעט ריק - מכווצים רק אותו
    for(const head of [...book.querySelectorAll('.sheet.txt')]){
      head.classList.remove('tight');
      let pages=paginate(head);
      if(pages.length>1 && fillOf(pages[pages.length-1])<0.55){
        const before=pages.length;
        mergeAfter(head); head.classList.add('tight');
        pages=paginate(head);
        if(pages.length>=before){          // לא עזר - מחזירים לקדמותו
          mergeAfter(head); head.classList.remove('tight');
          pages=paginate(head);
        } else tightened++;
      }
    }

    spreads();
    let n=0; PG.forEach(s=>{ if(!s.classList.contains('cover'))n++;
      const f=s.querySelector('.fol'); if(f)f.textContent=n; });
  }

  // ===== סידור לכפולות =====
  // האיור נשאר בסוף הפרק - הוא מבטא לפעמים משהו מאמצע הפרק,
  // ואסור שיסגיר אותו מראש. מה שכן חייב: שכל פרק יתפוס מספר
  // זוגי של עמודים, אחרת האיור נופל לכפולה של הפרק הבא ונראה שייך אליו.
  const blank=()=>{ const d=document.createElement('div');
    d.className='sheet blank'; return d; };
  const isStart=p=> p.classList.contains('txt') && !p.classList.contains('continued')
    && /^\s*פרק\s+\d+/.test(p.querySelector('.knum')?.textContent||'');

  function spreads(){
    const all=[...book.querySelectorAll('.sheet')].filter(p=>!p.classList.contains('blank'));
    const cover=all[0];
    const groups=[]; let g={t:'front',p:[]};
    for(const s of all.slice(1)){
      if(s.classList.contains('section')){ groups.push(g); g={t:'sec',p:[s]}; continue; }
      if(isStart(s)){ groups.push(g); g={t:'ch',p:[s]}; continue; }
      g.p.push(s);
    }
    groups.push(g);
    [...book.querySelectorAll('.sheet.blank')].forEach(b=>b.remove());

    // כפולה = [ימני, שמאלי]. עמוד ימני הוא אינדקס אי-זוגי, שמאלי זוגי.
    // התנאי היחיד שחייב להתקיים: האיור יושב בעמוד שמאלי, וממול לו
    // מימין עמוד טקסט של אותו פרק. אם נאלץ אותו להיות תמיד אחרון,
    // נצטרך עמוד ריק בכל פרק שני. במקום זה - כשהחשבון לא מסתדר,
    // האיור נכנס עמוד אחד לפני הסוף. כמעט בלי עמודים ריקים.
    const out=[cover];
    for(const gr of groups){
      if(!gr.p.length) continue;
      if(gr.t!=='ch'){ out.push(...gr.p); continue; }
      const art=gr.p.filter(x=>x.classList.contains('art'));
      const txt=gr.p.filter(x=>!x.classList.contains('art'));
      if(!art.length){ out.push(...txt); continue; }
      // פרק עם יותר מאיור אחד: כל האיורים חוץ מהאחרון נשתלים בתוך הפרק,
      // במרווחים שווים. שם אין מגבלת צד - שני שכניהם הם ממילא אותו פרק.
      const seq=[...txt], mid=art.slice(0,-1), last=art[art.length-1];
      mid.forEach((a,k)=>{
        const at=Math.max(1,Math.round((k+1)*txt.length/(mid.length+1))+k);
        seq.splice(at,0,a);
      });
      const s=out.length, T=seq.length;      // s = האינדקס שבו הפרק מתחיל
      if((s+T)%2===0)      out.push(...seq,last);                // האיור האחרון בסוף
      else if(T>=2)        out.push(...seq.slice(0,T-1),last,seq[T-1]);
      else               { out.push(blank(),...seq,last); }      // נדיר: פרק בעמוד אחד
    }
    out.forEach(p=>book.appendChild(p));
    PG=out;
    const nb=out.filter(p=>p.classList.contains('blank')).length;
    const bad=out.filter((p,i)=>p.classList.contains('art')&&i%2===1).length;
    console.log('עמודים: '+out.length+' · ריקים: '+nb+' · איורים בצד הלא נכון: '+bad);
  }

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
    const N=PG.length, LAST=N-1, end=cur===0?1:Math.min(cur+2,N);
    ui.querySelector('.cnt').textContent = cur===0
      ? 'כריכה · '+LAST+' עמודים'
      : (ONE ? 'עמוד '+folio(cur)+' מתוך '+LAST
             : 'עמודים '+folio(cur)+'-'+folio(Math.min(cur+1,LAST))+' מתוך '+LAST);
    ui.querySelector('[data-p]').disabled=cur===0||busy;
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
    if(busy) return;
    const st = ONE ? 1 : 2;
    const target = dir>0 ? (cur===0?1:cur+st) : (cur<=1?0:cur-st);
    if(target===cur) return;
    if(ONE){ cur=norm(target); render(); return; }   // מעבר מיידי, בלי סיבוב דף
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
  // נגיעה בטלפון: מאזינים על המסמך כולו, כך ששום שכבה שמעל הבמה
  // לא יכולה לבלוע את הנגיעה. מתעלמים רק מהכפתורים שלמטה.
  // נגיעה בטלפון. שום preventDefault - הוא שיתק את הכפתורים.
  // שתי האזנות, ונעילה קצרה שמונעת דפדוף כפול על אותה נגיעה.
  // טלפון: נגיעה ומשיכה. בלי preventDefault - הוא שיתק את הכפתורים.
  if(ONE){
    let lastTap=0, sx=null, sy=null;
    const inUI=t=>t && t.closest && t.closest('.rd-ui');
    const page=(dir)=>{
      const now=Date.now();
      if(now-lastTap<400) return;
      lastTap=now;
      go(dir);
    };
    const tap=(x,target)=>{
      if(inUI(target) || x==null) return;
      const r=stage.getBoundingClientRect();
      page(x < r.left + r.width/2 ? 1 : -1);
    };
    document.addEventListener('click',e=>tap(e.clientX,e.target));
    document.addEventListener('pointerup',e=>{ if(e.pointerType!=='touch') tap(e.clientX,e.target); });
    document.addEventListener('touchstart',e=>{
      const t=e.changedTouches[0]; sx=t.clientX; sy=t.clientY;
    },{passive:true});
    document.addEventListener('touchend',e=>{
      const t=e.changedTouches[0];
      if(sx==null || inUI(e.target)) { sx=null; return; }
      const dx=t.clientX-sx, dy=t.clientY-sy;
      sx=null;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
        page(dx>0 ? 1 : -1);   // עברית: מושכים ימינה כדי להתקדם
        return;
      }
      tap(t.clientX, e.target);
    },{passive:true});
  }
  stage.addEventListener('pointerdown',e=>{
    if(busy||e.button!==0) return;
    const r=stage.getBoundingClientRect();
    const left = e.clientX < r.left + r.width/2;
    const dir = left ? 1 : -1;                      // עברית: הדף השמאלי הולך ימינה
    if(ONE) return;
    const target = dir>0 ? (cur===0?1:cur+2) : (cur<=1?0:cur-2);
    if(target===cur) return;
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

  // העימוד חייב לרוץ אחרי שהעמוד קיבל את גודלו האמיתי בקורא,
  // אחרת נמדד גודל אחר לגמרי והטקסט נחתך.
  reflow();
  const want=parseInt((location.hash.match(/page-(\d+)/)||[])[1],10);
  cur=norm(Number.isFinite(want)?want:0);
  render();

  // שינוי גודל חלון = גודל עמוד אחר = צריך לעמד מחדש
  let rt;
  addEventListener('resize',()=>{
    clearTimeout(rt);
    rt=setTimeout(()=>{
      if(busy||drag) return;
      const anchor=PG[cur];
      reflow();
      const i=PG.indexOf(anchor);
      cur=norm(i>=0?i:cur);
      render();
    },260);
  });
});
