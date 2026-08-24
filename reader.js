
document.addEventListener('DOMContentLoaded',()=>{
  // פתיחת ההקדמה והסדר החדש של שני הדימויים.
  const introPages=[...document.querySelectorAll('.sheet.txt')].filter(s=>
    s.querySelector('.knum')?.textContent.trim()==='הקדמה');
  const introNodes=introPages.flatMap(s=>[...s.querySelectorAll('.body > .p,.body > .q,.body > .stop')]);
  const introOpening=introNodes.find(n=>n.textContent.startsWith('עולם החינוך הוא עולם מופלא'));
  if(introOpening){
    introOpening.textContent='עולם החינוך הוא עולם מופלא, והוא מרתק אותי מכמה זוויות: כאבא לילדים, כמורה וכמחנך, וגם כאדם שמבקש להבין את עצמו.';
    introOpening.insertAdjacentHTML('afterend','<div class="p">עם השנים למדתי שהעיסוק בחינוך אינו מפגיש אותי רק עם הילדים שאני מגדל ומחנך; הוא מפגיש אותי שוב ושוב גם עם עצמי. ככל שאני מבקש להבין אותם, אני נדרש להתבונן גם פנימה, במה שמתרחש בתוכי.</div>');
  }
  introNodes.find(n=>n.textContent.startsWith('בהמשך הספר מופיע גם הדימוי'))?.remove();
  const introInfluence=introNodes.find(n=>n.textContent.startsWith('אני נזכר בביטויים האלה'));
  if(introInfluence) introInfluence.outerHTML='<div class="p">אני נזכר בביטוי הזה משום שיש בו דבר שנוגע עמוקות לכל הורה ומורה.</div><div class="p">הילדים והתלמידים שלנו מושפעים מאיתנו עמוקות - מן המילים שאנחנו אומרים להם, מן הדרך שבה אנחנו מגיבים אליהם, מן המבט שלנו עליהם, מן האמון שאנחנו נותנים בהם וגם מן הגבולות שאנחנו מציבים.</div>';
  const introClay=introNodes.find(n=>n.textContent.startsWith('במובן מסוים, אנחנו שותפים'));
  if(introClay) introClay.textContent='במובן מסוים, הם ממש ״כחומר ביד היוצר״ - ביטוי המופיע אף הוא בהמשך ספר ירמיהו. אנחנו שותפים בעיצוב הדרך שבה הם יראו את עצמם ואת העולם שסביבם, לעיתים למשך כל חייהם.';
  const teachers=introNodes.find(n=>n.textContent.trim()==='הרב בנימין גוטליב ומדריכת ההורים מיכל ברנהם.');
  if(teachers) teachers.innerHTML='הרב בנימין גוטליב<br>ומדריכת ההורים מיכל ברנהם.';
  const authorityClose=introNodes.find(n=>n.textContent.includes('ככל שאנחנו בטוחים יותר בסמכות שלנו'));
  if(authorityClose && !authorityClose.nextElementSibling?.textContent.includes('זהו סוד הסמכות'))
    authorityClose.insertAdjacentHTML('afterend','<div class="stop">זהו סוד הסמכות.</div>');
  const compassion=introNodes.find(n=>n.textContent.startsWith('חשוב לי להדגיש שלצד הדיוקים'));
  if(compassion) compassion.textContent='לצד הדיוקים והעבודה הפנימית שמיכל מביאה לעולם החינוך, יש בתורתה גם יסוד חשוב שאני עצמי נוטה לעיתים להדגיש פחות: חמלה עצמית.';
  const compassionMeaning=introNodes.find(n=>n.textContent.startsWith('להבין שלכל הורה יש זמנים מוצלחים פחות'));
  if(compassionMeaning) compassionMeaning.textContent='חמלה עצמית פירושה להבין שלכל הורה יש זמנים מוצלחים יותר ומוצלחים פחות, ושגם אם טעינו - זה בסדר. אנחנו משתדלים, מנסים וטועים, מתקנים ולעיתים טועים שוב. המטרה אינה להיות הורה מושלם, אלא הורה שמנסה, לומד ומתקן.';
  introNodes.find(n=>n.textContent.startsWith('בספר הזה איגדתי את הסטטוסים'))?.remove();
  const oldThanks=introNodes.find(n=>n.textContent.startsWith('אני מודה להורים שהגיבו'));
  if(oldThanks) oldThanks.outerHTML=`
    <div class="p">אני מודה להורים שקראו את הדברים לאורך הדרך והגיבו להם. דרך התגובות שלכם הבנתי שהמחשבות האישיות שאני משתף פוגשות גם הורים אחרים. ההבנה הזאת נתנה לי את הרצון לאסוף אותן לספר. תודתי נתונה לכם.</div>
    <div class="p">ילדיי האהובים ותלמידיי היקרים, אתם המאמנים הטובים ביותר שלי. אתם מכריחים אותי יום־יום לדייק את עצמי, לבחון את הדברים מחדש ולנסות לחיות אותם באמת.</div>
    <div class="p">ובינינו, אתם יודעים טוב מכולם שגם כשאני משתדל לחיות את הדברים האלה, לא תמיד אני מצליח ליישם אותם לגמרי. גם אני טועה, מתקן ומנסה שוב.</div>
    <div class="stop">כל מה שנכתב כאן נולד מתוך המפגש איתכם.</div>`;
  for(const start of ['הספר הזה מוקדש לכם','לילדיי, שמכריחים','לתלמידיי היקרים','ולעצמי, שהולך'])
    introNodes.find(n=>n.textContent.trim().startsWith(start))?.remove();

  // דיוק הכותרת והפתיחה של פרק 1.
  const ch1Pages=[...document.querySelectorAll('.sheet.txt')].filter(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 1');
  const ch1Head=ch1Pages.find(s=>!s.classList.contains('continued'));
  if(ch1Head) ch1Head.querySelector('h2').textContent='חינוך או בריחה מהרגש?';
  const ch1Nodes=ch1Pages.flatMap(s=>[...s.querySelectorAll('.body > .p')]);
  const shyLine=ch1Nodes.find(n=>n.textContent.startsWith('ולפעמים הוא בכלל לא עושה שום דבר רע'));
  if(shyLine) shyLine.textContent='ולפעמים הוא בכלל לא עושה שום דבר רע. הוא פשוט נבוך, מתבייש או נמנע - אבל קשה לנו לראות אותו כך.';
  const feelingLine=ch1Nodes.find(n=>n.textContent.trim()==='ההתנהגות שלו מעוררת בתוכנו רגש לא נעים.');
  if(feelingLine) feelingLine.textContent='כל אחת מן ההתנהגויות האלה מעוררת בתוכנו רגשות לא נעימים, ולעיתים אף כואבים.';
  const avoidanceExamples=ch1Nodes.find(n=>n.textContent.startsWith('אם הוא יקשיב, הדאגה תירגע'));
  if(avoidanceExamples) avoidanceExamples.textContent='אם הוא יקשיב, לא נצטרך לפגוש את חוסר האונים שמתעורר בנו כשאיננו מצליחים להוביל אותו. אם הוא יפסיק להציק, לא נצטרך לפגוש את הדאגה מה יהיה איתו. ואם הוא רק יפסיק להתבייש, לא נצטרך לפגוש את חוסר הנוחות שהביישנות שלו מעוררת בנו.';
  const alternativeLine=ch1Nodes.find(n=>n.textContent.trim()==='אבל יש אפשרות אחרת.');
  const pauseLine=ch1Nodes.find(n=>n.textContent.trim()==='לפני שאנחנו ממהרים לפעול, אפשר לעצור לרגע ולפגוש את מה שמתרחש בתוכנו.');
  if(alternativeLine) alternativeLine.textContent='אבל לפני שאנו ניגשים לחנך את הילד, עלינו לעצור לרגע ולהסכים לפגוש את מה שמתחולל בתוכנו.';
  pauseLine?.remove();
  const identifyLine=ch1Nodes.find(n=>n.textContent.trim()==='לזהות את הרגש.');
  const nameLine=ch1Nodes.find(n=>n.textContent.trim()==='לקרוא לו בשם:');
  if(identifyLine) identifyLine.textContent='לעצור פירושו להפנות לרגע את המבט מן הילד אל עצמנו ולשאול: מה אני מרגיש עכשיו?';
  if(nameLine) nameLine.textContent='לזהות את הרגש ולקרוא לו בשם:';
  const resistLine=ch1Nodes.find(n=>n.textContent.startsWith('לא לנסות לשכנע את עצמנו שאין סיבה להרגיש כך'));
  if(resistLine) resistLine.textContent='אין צורך שאנסה לשכנע את עצמי שאין סיבה להרגיש כך, לגרש את הרגש או למהר לפתור אותו. זה גם לא באמת יעזור. עליי רק להסכים לפגוש את הרגש ולהיות איתו לרגע.';
  ch1Nodes.find(n=>n.textContent.trim()==='רק להסכים לכך שזה מה שאני מרגיש עכשיו.')?.remove();

  // פרק 32 נערך לאחר יצירת קובץ הספר. מחליפים כאן את הגרסה הישנה
  // לפני שהקורא מעמד את הדפים, כדי שהעימוד ייבנה מן הנוסח המעודכן.
  const ch32=[...document.querySelectorAll('.sheet.txt')].find(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 32' && !s.classList.contains('continued'));
  if(ch32){
    ch32.querySelector('h2').textContent='שתי מילים: שיקול דעת';
    ch32.querySelector('.body').innerHTML=`
      <div class="p">אנחנו רגילים לתת לילדים הוראה כמעט על כל דבר. איפה להניח, איך לעשות וכמה לקחת.</div>
      <div class="p">גם בכיתה השאלות מתחילות כבר בתחילת השנה:</div>
      <div class="q">״המורה, איפה לשמור את הדף שחילקת?״<br>״להעתיק מן הלוח בשתי שורות או בשלוש?״</div>
      <div class="p">אבל דווקא שתיים מן המילים הראשונות שאני מלמד את תלמידיי הן:</div>
      <div class="q">״שיקול דעת.״</div>
      <div class="p">בהתחלה הם לא תמיד מבינים מה אני רוצה מהם. הם רגילים שלכל שאלה יש תשובה מן המבוגר. הם שואלים, והמבוגר אמור לומר להם בדיוק מה לעשות, כך שהם אינם נדרשים לעצור ולחשוב בעצמם. אבל אני רוצה לשדר להם מסר אחר: אתה כבר יודע לחשוב. תסתכל על המצב, תבין מה נדרש ותחליט בעצמך.</div>
      <div class="sub">למצוא את הפתרון בעצמו</div>
      <div class="p">אותו עיקרון נכון גם כשמתעוררת בעיה. אם תלמיד שכח מחברת, למשל, אני יכול לומר לו:</div>
      <div class="q">״תמצא פתרון.״</div>
      <div class="p">הוא יכול לבקש דף, לשאול מחבר או לחשוב על אפשרות אחרת. אני נמצא שם ויכול לעזור כשצריך, אבל איני ממהר לחשוב במקומו.</div>
      <div class="p">ואפילו כשהילד בא ומספר שחבר מציק לו, איני חייב למהר ולספק לו פתרון. קודם אשתתף איתו בכעס או בעלבון ואשקף לו את מה שהוא מרגיש. לאחר מכן אוכל לשאול:</div>
      <div class="q">״מה לדעתך כדאי לעשות?״<br>״איך אתה חושב שאפשר לפתור את זה?״</div>
      <div class="p">כך הילד אינו נשאר לבדו עם הקושי, אבל גם אינו מוסר לי מיד את האחריות להתמודד איתו. אני נמצא לצידו, והוא לומד לחשוב, להציע דרכים ולבחור כיצד לפעול.</div>
      <div class="p">וגם בבית אני משתמש הרבה בשתי המילים האלה.</div>
      <div class="p">הילד חוזר הביתה ביום גשום ושואל:</div>
      <div class="q">״איפה להניח את הנעליים הרטובות?״</div>
      <div class="p">במקום לומר לו מיד היכן להניח אותן, אני יכול לענות:</div>
      <div class="q">״שיקול דעת.״</div>
      <div class="p">הוא כבר יודע שלא כדאי להניח אותן במקום שבו ילכלכו את הרצפה או יפריעו למעבר. עכשיו הוא צריך להתבונן סביבו, לחשוב ולמצוא בעצמו מקום מתאים.</div>
      <div class="p">ולפעמים אני מותח קצת את הקצה.</div>
      <div class="q">״אבא, כמה וופלים לקחת?״<br>״שיקול דעת.״</div>
      <div class="p">הכוונה איננה שנתתי לו רשות לקחת את כל החבילה. אני סומך עליו שיסתכל כמה יש, יחשוב גם על האחרים ויחליט כמה סביר לקחת.</div>
      <div class="p">בבית שבו עד היום היה חוק על כל תזוזה, תשובה כזאת עלולה באמת להפוך לסיפור גדול. הילד עוד לא רגיל לכך שמצפים ממנו לחשוב; הוא רגיל רק לשמוע כמה מותר לו.</div>
      <div class="p">אבל בבית שבו הילדים מתרגלים שוב ושוב להפעיל שיקול דעת, זה כבר אינו רגע דרמטי. הילד עוצר, חושב ולוקח. וגם אם לקח הפעם מעט יותר ממה שאני הייתי בוחר, לא קרה אסון. זו בדיוק הדרך שבה שיקול הדעת שלו הולך ונבנה ומתעדן.</div>
      <div class="p">כשאנחנו אומרים לילד הכול, הוא אינו צריך לחשוב. הוא צריך רק לציית. הוא עשוי לדעת היטב מה אבא ואמא מרשים, אבל לא לדעת מה נכון לעשות כשאיש אינו עומד לידו ואומר לו.</div>
      <div class="p">יש בבית גבולות ברורים, ובמקום שבו נדרשת הוראה אני נותן אותה. אבל בתוך הגבולות האלה יש מרחב גדול שבו הילד יכול להתבונן, להביא בחשבון את המציאות ואת צורכי האחרים ולקבל החלטה בעצמו.</div>
      <div class="stop">לא תמיד יהיה לידו הורה או מורה שיאמרו לו מה לעשות. אחרת, איך נצפה ממנו לדעת לחשוב ולהחליט כשיהיה לבדו?</div>
      <div class="p">שיקול דעת אינו מופיע פתאום כשהילד גדל. הוא נבנה בכל אותן החלטות קטנות שבהן יכולנו לענות במקומו - ובחרנו לתת לו לחשוב.</div>`;
    let next=ch32.nextElementSibling;
    while(next?.classList.contains('continued') && next.querySelector('.knum')?.textContent.trim()==='פרק 32'){
      const remove=next; next=next.nextElementSibling; remove.remove();
    }
  }
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
      // שורה שפותחת את מה שבא אחריה לא נשארת לבדה בתחתית העמוד:
      // כותרת משנה, שורת פתיחה שנגמרת בנקודתיים, וריצת ציטוטים שנקטעה.
      const opener=el=>{
        if(!el||from.children.length<2) return false;
        if(el.classList.contains('split-head')) return false;   // חצי פסקה - תקין
        if(el.classList.contains('sub')) return true;
        if(el.classList.contains('p') && /:$/.test(el.textContent.trim())) return true;
        // ציטוט אחרון בעמוד שהמשכו נפתח בראש הבא = רשימה שנחתכה באמצע
        return el.classList.contains('q') && !!to.firstElementChild &&
               to.firstElementChild.classList.contains('q');
      };
      for(let moved=0; moved<4 && opener(from.lastElementChild); moved++)
        to.insertBefore(from.lastElementChild,to.firstChild);
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
  const chapterWant=(location.hash.match(/chapter-(\d+)/)||[])[1];
  const chapterIndex=chapterWant ? PG.findIndex(p=>
    p.querySelector('.knum')?.textContent.trim()===`פרק ${chapterWant}` && !p.classList.contains('continued')) : -1;
  const want=parseInt((location.hash.match(/page-(\d+)/)||[])[1],10);
  cur=norm(chapterIndex>=0 ? chapterIndex : (Number.isFinite(want)?want:0));
  render();
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('reader-ready')));

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
