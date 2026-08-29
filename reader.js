
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
  if(introClay) introClay.textContent='במובן מסוים, הם ממש ״כחומר ביד היוצר״ - ביטוי המופיע אף הוא בהמשך ספר ירמיהו, כמובן בהקשר אחר. אנחנו שותפים בעיצוב הדרך שבה הם יראו את עצמם ואת העולם שסביבם, לעיתים למשך כל חייהם.';
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
  if(avoidanceExamples) avoidanceExamples.textContent='אם הוא יקשיב, לא נצטרך לפגוש את חוסר האונים שמתעורר בנו כשאיננו מצליחים להוביל אותו. אם הוא יפסיק להציק, לא נצטרך לפגוש את הדאגה שמתעוררת בנו: ״מה יהיה איתו?״ ואם הוא רק יפסיק להתבייש, לא נצטרך לפגוש את הקושי שלנו לראות אותו כך.';
  const alternativeLine=ch1Nodes.find(n=>n.textContent.trim()==='אבל יש אפשרות אחרת.');
  const pauseLine=ch1Nodes.find(n=>n.textContent.trim()==='לפני שאנחנו ממהרים לפעול, אפשר לעצור לרגע ולפגוש את מה שמתרחש בתוכנו.');
  if(alternativeLine) alternativeLine.textContent='אבל לפני שאנו ניגשים לחנך את הילד, עלינו לעצור לרגע ולהסכים לפגוש את מה שמתחולל בתוכנו.';
  pauseLine?.remove();
  const identifyLine=ch1Nodes.find(n=>n.textContent.trim()==='לזהות את הרגש.');
  const nameLine=ch1Nodes.find(n=>n.textContent.trim()==='לקרוא לו בשם:');
  if(identifyLine) identifyLine.outerHTML='<div class="p">לעצור פירושו להפנות לרגע את המבט מן הילד אל עצמנו ולשאול:</div><div class="q">״מה אני מרגיש עכשיו?״</div>';
  if(nameLine) nameLine.textContent='ולנסות לתת לרגש שם:';
  const resistLine=ch1Nodes.find(n=>n.textContent.startsWith('לא לנסות לשכנע את עצמנו שאין סיבה להרגיש כך'));
  if(resistLine) resistLine.textContent='אין צורך שאנסה לשכנע את עצמי שאין סיבה להרגיש כך, לגרש את הרגש או למהר לפתור אותו. הרגש כבר כאן, ועליי רק להסכים לפגוש אותו ולהיות איתו לרגע.';
  ch1Nodes.find(n=>n.textContent.trim()==='רק להסכים לכך שזה מה שאני מרגיש עכשיו.')?.remove();
  ch1Nodes.find(n=>n.textContent.trim()==='זה לא נעים לי. אבל אני מסוגל להיות עם זה לרגע.')?.remove();
  const normalLine=ch1Nodes.find(n=>n.textContent.trim()==='זה אנושי. מותר לי להרגיש כך. הרגש הזה מובן.');
  if(normalLine) normalLine.textContent='זה נורמלי להרגיש כך. הרגש הזה מובן.';
  const reactionList=ch1Nodes.find(n=>n.textContent.trim().startsWith('אנחנו ממהרים להשתיק.'));
  if(reactionList) reactionList.innerHTML='אנחנו ממהרים:<br>לדרוש שיקשיב.<br>לעצור את ההצקה.<br>לשכנע אותו שאין לו סיבה להתבייש.<br>לכעוס.<br>לאיים.<br>לפתור.';
  const urgencyLine=ch1Nodes.find(n=>n.textContent.trim()==='העיקר שההתנהגות תיפסק, ואיתה גם הרגש שהתעורר בנו.');
  if(urgencyLine) urgencyLine.textContent='העיקר שההתנהגות תיפסק, ואיתה גם חוסר האונים, הדאגה או חוסר הנוחות שהתעוררו בנו.';
  const choiceLine=ch1Nodes.find(n=>n.textContent.trim()==='היא מאפשרת לנו לבחור את התגובה שלנו, במקום שהבריחה מן הרגש תבחר אותה עבורנו.');
  if(choiceLine){
    choiceLine.textContent='היא מאפשרת לנו לפעול מתוך בחירה ולא מתוך הדחף לברוח מן הרגש.';
    choiceLine.insertAdjacentHTML('afterend','<div class="stop">ושם, בעיניי, מתחיל החינוך.</div>');
  }
  const selfTalk=ch1Pages.flatMap(s=>[...s.querySelectorAll('.body > .q')])
    .find(n=>n.textContent.includes('ברור שאני דואג.'));
  if(selfTalk) selfTalk.innerHTML='״זה באמת מדאיג.״<br>״מובן שזה מכעיס אותי.״<br>״קשה לי לראות את הילד שלי במצב הזה.״';
  const acceptanceLine=ch1Nodes.find(n=>n.textContent.trim()==='לא קבלה של התנהגות הילד, אלא קבלה של הרגש שהתנהגותו מעוררת בי.');
  if(acceptanceLine) acceptanceLine.insertAdjacentHTML('afterend','<div class="p">קבלת הרגש אינה מעלימה את הכאב. אבל כשאני מנסה לברוח מן הכאב במקום להכיר בו, הוא מתגבר, הופך לסבל של ממש ומתחיל לנהל אותי. דווקא כשאני עוצר, מסכים לפגוש את הרגש הלא נעים, נותן לו שם, נושם ומבין את עצמי - משהו מתרכך. הכאב עדיין קיים, אבל משהו בו נעשה רך יותר וקל יותר לשאת אותו. כך הוא יכול לעבור בתוכי במקום להצטבר.</div>');

  // דיוק בפרק 4 במקור, המוצג כפרק 5 לאחר הוספת הפרק החדש.
  const ch4LifeWorkNodes=[...document.querySelectorAll('.sheet.txt')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 4')
    .flatMap(s=>[...s.querySelectorAll('.body > .p')]);
  const lifeWorkLine=ch4LifeWorkNodes.find(n=>n.textContent.startsWith('אני חושב שזו אחת מעבודות החיים שלנו'));
  if(lifeWorkLine) lifeWorkLine.textContent='הבירור הזה הוא אחת מעבודות החיים שלנו כהורים וכמחנכים: לבדוק שוב ושוב מאיזה מקום מגיעים הגבולות שאנחנו מציבים.';

  // פרק 2: הסמכות אינה נשענת על הציות של הילד.
  const ch2=[...document.querySelectorAll('.sheet.txt')].find(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 2' && !s.classList.contains('continued'));
  if(ch2){
    ch2.querySelector('h2').textContent='האם הסמכות שלי קורסת?';
    ch2.querySelector('.body').innerHTML=`
      <div class="p">הילד לא הקשיב לי.</div>
      <div class="p">מה קורה עכשיו בתוכי?</div>
      <div class="p">האם אני נבהל? האם אני מפחד שהסמכות שלי קורסת? האם אני מרגיש שאני חייב להגיב מיד, כדי ששאר האחים לא יחשבו שאפשר לא להקשיב לי? האם אני פועל מתוך פחד לאבד את המקום שלי כהורה?</div>
      <div class="p">לפעמים אי-ההקשבה של הילד נוגעת במקום רגיש בתוכי. לרגע אני מרגיש שאם הוא אינו מקשיב לי, אולי כבר אין לי סמכות. ואז מתעורר בי צורך לגרום לו לציית מיד. ייתכן שלא רק מפני שהבקשה שלי חשובה או משום שנדרש כאן גבול, אלא גם מפני שאני זקוק לציות שלו כדי להרגיש שלא איבדתי את מקומי כהורה.</div>
      <div class="p">באותו רגע אני זקוק לכך שהילד יעשה את מה שביקשתי, כדי שאוכל להירגע. כך, בלי לשים לב, הציות שלו הופך להיות האישור שאני מחפש לכך שלא איבדתי את מקומי כהורה.</div>
      <div class="p">כשאני זקוק לכך שהילד יציית כדי להשיב לעצמי את הביטחון, התגובה שלי צומחת מן הפחד לאבד סמכות - ולא מן הסמכות עצמה.</div>
      <div class="q">הביטחון שלי אינו אמור להגיע מן הילד.</div>
      <div class="p">את הביטחון הזה עליי לבנות בתוכי, מתוך העבודה הפנימית שלי ומתוך הידיעה שאני ההורה והמוביל.</div>
      <div class="p">נכון, אי-ההקשבה שלו עלולה לערער אותי לרגע. אבל לאחר שנתתי מקום לפחד שהתעורר בי, איני צריך להשיב לעצמי את הביטחון באמצעות ציות מיידי. אני יכול לחזור אל הבסיס היציב שבתוכי ולדעת:</div>
      <div class="q">הילד יכול להתווכח, להתנגד ואפילו לא להקשיב כרגע - ואינני מאבד בכך את מקומי כהורה.</div>
      <div class="p">מקומי כהורה אינו ניתן לי כשהילד מציית ואינו נלקח ממני כשהוא מתנגד.</div>
      <div class="p">כשאני נשען על הידיעה הזאת, איני זקוק להסכמתו או לציותו המיידי כדי להרגיש בטוח. אני יכול לעצור, לחשוב ולבחור כיצד נכון להגיב, בלי להיגרר למאבק כדי להשיב לעצמי את הביטחון.</div>
      <div class="p">הסמכות שלי אינה נקבעת בכל רגע מחדש לפי מה שהילד עושה או לפי המהירות שבה הוא מציית לי. היא מתחילה עמוק בתוכי.</div>
      <div class="p">כשהביטחון הזה קיים בי, גם כשהילד אינו מקשיב לי, הקרקע מתחת לרגליי נשארת יציבה. היא אינה רועדת.</div>
      <div class="stop">וכשהקרקע מתחת לרגליי יציבה, גם לילד קל יותר להרגיש בטוח. הוא מרגיש שגם כשהוא מתנגד, יש מולו הורה יציב שמסוגל להמשיך להוביל אותו לא מתוך פחד, אלא מתוך סמכות.</div>`;
    let next=ch2.nextElementSibling;
    while(next?.classList.contains('continued') && next.querySelector('.knum')?.textContent.trim()==='פרק 2'){
      const remove=next; next=next.nextElementSibling; remove.remove();
    }
  }

  // פרק 3: ההבדל המעשי בין השגת ציות לבין סמכות יציבה.
  const ch3=[...document.querySelectorAll('.sheet.txt')].find(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 3' && !s.classList.contains('continued'));
  if(ch3){
    ch3.querySelector('h2').textContent='לא כל ציות הוא סמכות';
    ch3.querySelector('.body').innerHTML=`
      <div class="q">״איזה הורה אני... אפילו הילד שלי לא מקשיב לי.״</div>
      <div class="p">זה משפט שעובר לרבים מאיתנו בראש ברגעים של אי-הקשבה. אבל דווקא ברגעים האלה מתגלה ההבדל בין ציות לבין סמכות.</div>
      <div class="p">נניח שהילד לא הקשיב, ואני צעקתי, איימתי או איבדתי את העשתונות - ובסוף הוא עשה את מה שביקשתי.</div>
      <div class="q">האם ניצחתי?</div>
      <div class="p">אולי השגתי ציות באותו רגע, אבל הצעקות והאיומים לא צמחו מתוך סמכות. הם צמחו מתוך לחץ ופחד לאבד שליטה.</div>
      <div class="p">ציות שהושג כך אינו מחזק את הסמכות שלי. כאשר הצעקות והאיומים נעשים הדרך שבאמצעותה אני משיג ציות, הסמכות שלי דווקא הולכת ונשחקת. הילד לומד להקשיב לעוצמת הקול או לפחד מן האיום, במקום להקשיב משום שהוא יודע שאני ההורה, שהמילה שלי עומדת ושאפשר לסמוך על ההובלה שלי.</div>
      <div class="p">ולאט לאט קורה דבר נוסף: הילד לומד שהמילה שלי, כשהיא נאמרת בקול רגוע, אינה מחייבת אותו. מבחינתו, רק הצעקה או האיום מסמנים שעכשיו עליו לפעול. כך הבקשות הרגועות שלי מאבדות מכוחן, ואני נאלץ להרים את הקול שוב ושוב כדי להשיג את אותה הקשבה.</div>
      <div class="q">השגתי ציות, אבל הדרך שבה השגתי אותו החלישה את המילה שלי.</div>
      <div class="p">לעומת זאת, גם אם הילד לא הקשיב לי באותו רגע, ואני בכל זאת נשארתי רגוע, לא חזרתי בי ממה שביקשתי, אך גם לא איבדתי את העשתונות - לא איבדתי את הסמכות שלי. להפך.</div>
      <div class="p">הגבול אינו נעלם רק מפני שהילד לא נענה לו מיד. את מה שעדיין דורש טיפול, שיחה או תגובה חינוכית, אפשר לעשות לאחר שהאירוע יירגע. אין צורך להשיג ציות באמצעות צעקות כדי להוכיח שאני ההורה.</div>
      <div class="p">טבעי שאכעס כשהילד אינו מקשיב לי. הסמכות שלי נבחנת ביכולת לפגוש את הכעס הזה, להכיל אותו ולא לתת לו לנהל את התגובה שלי ולהישפך על הילד.</div>
      <div class="stop">להישאר רגוע, לעמוד על מה שביקשתי ולהכיל את הכעס שעולה בי מבלי להוציא אותו על הילד - זו בעיניי סמכות אמיתית.</div>
      <div class="p">גם הילד מרגיש כשאני עומד מולו רגוע ובטוח. הוא מבין שאי-ההקשבה שלו אינה מערערת אותי ושאיני זקוק לצעקות כדי להוביל אותו. גם אם באותו רגע הוא עדיין אינו מקשיב, לאורך זמן דווקא היציבות הזאת מחזקת את הסמכות שלי בעיניו.</div>`;
    let next=ch3.nextElementSibling;
    while(next?.classList.contains('continued') && next.querySelector('.knum')?.textContent.trim()==='פרק 3'){
      const remove=next; next=next.nextElementSibling; remove.remove();
    }
  }

  // פרק 4: התאמת סיפור התפילה לקריאה בספר והעמקת הרגע האישי.
  const ch4Pages=[...document.querySelectorAll('.sheet.txt')].filter(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 4');
  const ch4Nodes=ch4Pages.flatMap(s=>[...s.querySelectorAll('.body > .p,.body > .q,.body > .stop')]);
  const ch4Opening=ch4Nodes.find(n=>n.textContent.startsWith('היום, באמצע התפילה בכיתה'));
  if(ch4Opening) ch4Opening.textContent='באחד הבקרים, באמצע התפילה בכיתה, ראיתי כמה תלמידים משחקים בידיהם זה עם זה.';
  const ch4Order=ch4Nodes.find(n=>n.textContent.includes('רצון שהכול ייראה ממושמע ושקט'));
  if(ch4Order) ch4Order.textContent='האם אני פועל מתוך ערך - או מתוך צורך בשליטה, פחד לאבד סמכות ורצון שהכול ייראה ממושמע ומסודר?';
  const ch4Insight=ch4Nodes.find(n=>n.textContent.startsWith('עצרתי והבנתי שלא כל דבר'));
  if(ch4Insight){
    ch4Insight.insertAdjacentHTML('beforebegin','<div class="p">הם הרי לא הפריעו לתפילה ולא משכו את תשומת לבם של שאר התלמידים. פשוט היה לי קשה לראות אותם יושבים אחרת מכפי שציפיתי. ההערה שעמדה לצאת ממני לא נבעה מערך חינוכי, אלא מן הצורך שלי שהכול ייראה מסודר. כשהבנתי את זה, עצרתי.</div>');
    ch4Insight.textContent='הרגע הזה הזכיר לי שלא כל דבר שאינו מוצא חן בעיניי דורש גבול או פעולה חינוכית.';
  }
  const ch4Examine=ch4Nodes.find(n=>n.textContent.trim()==='בכל פעם שאנחנו באים לחנך, עלינו לבדוק את עצמנו:');
  if(ch4Examine) ch4Examine.textContent='ובכל פעם שאני בא לחנך, עליי לבדוק תחילה את עצמי:';
  const ch4Personal=ch4Nodes.find(n=>n.textContent.trim()==='האם זו התנהגות שרק מפריעה לי?');
  if(ch4Personal) ch4Personal.textContent='האם זו התנהגות שרק מפריעה לי באופן אישי?';

  // פרק 5: דיוק המניע האישי שמסתתר מאחורי השפה החינוכית.
  const ch5Pages=[...document.querySelectorAll('.sheet.txt')].filter(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 5');
  const ch5Motive=ch5Pages.flatMap(s=>[...s.querySelectorAll('.body > .p')])
    .find(n=>n.textContent.startsWith('אני רוצה, ככל האפשר, שהחינוך שלי יצמח מתוך ערכים'));
  if(ch5Motive) ch5Motive.textContent='אני רוצה, ככל האפשר, שהחינוך שלי יצמח מתוך ערכים ולא מתוך מניעים אישיים שבמבט ראשון איני מבחין בהם.';
  const ch5SameBoundary=ch5Pages.flatMap(s=>[...s.querySelectorAll('.body > .p')])
    .find(n=>n.textContent.startsWith('ולעיתים אפילו אותו גבול'));
  if(ch5SameBoundary) ch5SameBoundary.outerHTML='<div class="p">הבירור הזה אינו מסתיים בשאלה אם להציב גבול או לא.</div><div class="p">לפעמים נציב בדיוק את אותו הגבול ונאמר בדיוק את אותן המילים - ובכל זאת נפעל ממקומות שונים לחלוטין.</div>';

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
  // נוסח מעודכן לפרק יום ההולדת: פגישה עם הרגש בלי להפוך את ההשקעה לחוזה.
  const birthdayChapter=[...document.querySelectorAll('.sheet.txt')].find(s=>
    !s.classList.contains('continued') &&
    s.querySelector('.knum')?.textContent.trim()==='פרק 6');
  if(birthdayChapter){
    birthdayChapter.querySelector('.body').innerHTML=`
      <div class="stop">טרחתי, התרוצצתי והתאמצתי מאוד לקראת יום ההולדת שארגנתי לבת שלי בבית.</div>
      <div class="p">זה היה יום הולדת מושקע עם כל בנות הכיתה.</div>
      <div class="p">קניות, הכנות, סידורים, ניקיונות, ארגונים...</div>
      <div class="p">ובסוף?</div>
      <div class="p">ניחשתם נכון.</div>
      <div class="p">תלונות. ועוד תלונות. ועוד תלונות.</div>
      <div class="p">לא תלונות כלפיי ולא טענות על יום ההולדת שהכנתי לה.</div>
      <div class="p">פשוט היו דברים שלא הסתדרו כפי שרצתה. באחד המשחקים היה לה צפוף, ודברים נוספים שהתרחשו במהלך יום ההולדת תסכלו ועצבנו אותה.</div>
      <div class="p">ובכל זאת, בתוכי כמעט עלה המשפט:</div>
      <div class="q">״מה את מתלוננת? תראי כמה השקעתי בשבילך!״</div>
      <div class="p">כאילו העובדה שהתאמצתי למענה מחייבת אותה להיות שמחה ומרוצה.</div>
      <div class="p">אבל עצרתי את עצמי.</div>
      <div class="p">עצרתי לרגע וניסיתי לפגוש את מה שהתעורר בי. את האכזבה, את התסכול ואת חוסר האונים לנוכח כל המאמץ שהשקעתי.</div>
      <div class="p">רק לאחר מכן יכולתי להתפנות באמת, לנסות להיכנס לנעליה ולומר:</div>
      <div class="q">״כל כך חיכית ליום ההולדת הזה ודמיינת איך הוא יהיה. ועכשיו לא הכול מסתדר כמו שרצית. אוף, זה מאכזב...״</div>
      <div class="p">כשאמרתי את המילים האלה, לא ניסיתי לתאר את האכזבה שלה מבחוץ. ניסיתי ממש לחוות לרגע את הרגש יחד איתה ולתת לו מילים.</div>
      <div class="p">כי צריך להבין משהו חשוב:</div>
      <div class="p">אין לי, כהורה, בעלות על מה שהילדה שלי מרגישה.</div>
      <div class="stop">ההשקעה שלנו בילדים אינה חוזה שמחייב אותם להרגיש את הרגש שקיווינו שירגישו.</div>
      <div class="p">זה שהתאמצתי והשקעתי אינו מחייב אותה להרגיש דווקא שמחה. מותר לה להיות גם מתוסכלת, מאוכזבת או עייפה.</div>
      <div class="sub">ומה עם הכרת הטוב?</div>
      <div class="p">נכון, אני רוצה שהיא תראה כמה טרחו והשקיעו למענה, ולא תקבל זאת כמובן מאליו.</div>
      <div class="p">אבל הכרת הטוב אינה מחייבת אותה להיות שמחה ומרוצה בכל רגע. היא יכולה להעריך את מה שעשינו למענה, ובאותו זמן להתאכזב מדברים שלא הסתדרו כפי שרצתה.</div>
      <div class="p">וגם אם ארצה לחנך אותה להכרת הטוב, עליי לשאול את עצמי אם זה הזמן המתאים לעשות זאת - בתוך התסכול, הלחץ והבלגן - או שנכון יותר לדבר על כך מאוחר יותר, ברוגע.</div>
      <div class="p">ולכן בשלב הזה הדבר הנכון ביותר הוא פשוט לפגוש את הרגש שלה, להיות איתה בתוכו ולשקף במילים את מה שהיא מרגישה.</div>
      <div class="p">בסופו של דבר, אגב, היא נהנתה מאוד.</div>
      <div class="p">אבל לא תמיד זה מסתיים כך.</div>
      <div class="p">אנחנו יכולים לתכנן עבור הילד יום הולדת עד הפרט האחרון, להשקיע בטיול משפחתי או להכין ארוחה חגיגית. אנחנו עושים את כל זה באהבה ומתוך רצון שיהיה לו טוב, אבל איננו יכולים לנהל את מה שיתעורר בליבו. הוא עשוי להתאכזב, להתעצבן או פשוט לא להיות במצב רוח ליהנות.</div>
      <div class="p">גם כשהתגובה שלו מאכזבת אותנו, וגם כשכל כך רצינו שיהיה שמח ומרוצה, עלינו לזכור שעולמו הפנימי של הילד נשאר שלו, והוא אינו חייב להרגיש אחרת כדי להתאים לציפיות שלנו.</div>`;
    let birthdayNext=birthdayChapter.nextElementSibling;
    while(birthdayNext?.classList.contains('continued') &&
          birthdayNext.querySelector('.knum')?.textContent.trim()==='פרק 6'){
      const remove=birthdayNext; birthdayNext=birthdayNext.nextElementSibling; remove.remove();
    }
  }

  // נוסח מעודכן לפרק המריבות בין האחים: הכנה מראש, התרחקות ושיקול דעת בהתערבות.
  const siblingFightsChapter=[...document.querySelectorAll('.sheet.txt')].find(s=>
    !s.classList.contains('continued') &&
    s.querySelector('.knum')?.textContent.trim()==='פרק 7');
  if(siblingFightsChapter){
    siblingFightsChapter.querySelector('.body').innerHTML=`
      <div class="p">לקראת החופש אני מכין את עצמי באמצעות משפט אחד שאני אומר לעצמי:</div>
      <div class="p">בחופש יהיו מריבות בין האחים.</div>
      <div class="p">לא אולי.</div>
      <div class="p">יהיו.</div>
      <div class="p">אני אפילו מגדיר לעצמי יעד ריאלי: נגיד, חמישים מריבות.</div>
      <div class="p">לא מפני שמריבות הן דבר טוב או מפני שאני שואף להגיע ליעד הזה, אלא מפני שהן חלק טבעי מן החיים המשותפים בין אחים.</div>
      <div class="p">כשאני מביא זאת בחשבון מראש, אני חוסך מעצמי לפחות חלק מתחושת הלחץ והבהלה שמריבות בין אחים מעוררות בנו כהורים.</div>
      <div class="p">כי מבחינתי, השאלה העיקרית אינה רק כיצד הילדים יתנהגו בזמן המריבה. השאלה היא מה אנחנו, כהורים, נעשה.</div>
      <div class="p">האם ניכנס מיד לתוכה?</div>
      <div class="p">נתחיל לחקור מי התחיל?</div>
      <div class="p">נרים את הקול?</div>
      <div class="p">נישאב לאווירה הלא נעימה - ובסופו של דבר נהפוך גם אנחנו לעוד ילד בתוך המריבה?</div>
      <div class="p">לפעמים, למרות ההכנה מראש, אני עדיין מרגיש שכבר אין לי אנרגיה ושהמריבה שלהם יוצרת בתוכי לחץ. ברגעים כאלה אני פשוט מתרחק מעט.</div>
      <div class="p">אם יש לי פינה שקטה בבית, אני הולך אליה.</div>
      <div class="p">ולפעמים אני אפילו יוצא לזמן קצר למקום סמוך כדי להתאוורר.</div>
      <div class="p">אני לא עושה זאת כאשר המריבה מסכנת את אחד הילדים. במצב כזה אני נשאר ומתערב.</div>
      <div class="p">אבל כשאני מחליט שאפשר לתת להם להתמודד בעצמם, אני אומר להם:</div>
      <div class="q">״מי שרוצה יכול לבוא איתי ברוגע. אני יוצא לכמה דקות להירגע.״</div>
      <div class="p">אני יושב מעט, נושם ונרגע.</div>
      <div class="p">וכשאני חוזר, אני חוזר מיושב יותר ועם כוחות מחודשים.</div>
      <div class="p">ובינתיים, במקרים רבים, גם הם כבר הספיקו להירגע, לדבר ביניהם ואפילו להשלים.</div>
      <div class="p">זה אולי נשמע מעט אכזרי.</div>
      <div class="p">להשאיר את הילדים עם המריבה שלהם ופשוט ללכת?</div>
      <div class="p">אבל משתי סיבות, דווקא ההפך הוא הנכון.</div>
      <div class="p">ראשית, כשאני יוצא מן המריבה ומשאיר להם מרחב להתמודד איתה, אני משדר להם שאני סומך עליהם.</div>
      <div class="p">אנחנו מדברים הרבה בבית על הכלים שעוזרים להתמודד עם מריבה. למדנו איך עוצרים, איך מדברים ואיך פותרים.</div>
      <div class="p">עכשיו אני נותן להם הזדמנות להשתמש בכלים האלה בעצמם.</div>
      <div class="p">אני יכול לומר:</div>
      <div class="q">״אני יוצא לכמה דקות, ואני סומך עליכם שתנסו לפתור את המריבה עד שאחזור.״</div>
      <div class="p">ושנית, לא תמיד הנוכחות שלי עוזרת.</div>
      <div class="p">לפעמים עצם העובדה שאני נשאר שם עצבני ומותש רק מלבה את האש. בניסיון לגרום להם להפסיק מיד, אני נשאב לתוך המתח, מרים את הקול ומוסיף למריבה גם את הכעס שלי.</div>
      <div class="p">ויותר מזה: כשהילדים רואים שברגע של חוסר אנרגיה אני לא נשאב פנימה, אלא עוצר, מתרחק מעט וחוזר רגוע יותר - הם לומדים משהו חשוב גם על ההתמודדות שלהם עם המריבה עצמה.</div>
      <div class="p">הם לומדים שאפשר לעצור לרגע.</div>
      <div class="p">לנשום.</div>
      <div class="p">להתרחק כשצריך.</div>
      <div class="p">ואחר כך לחזור.</div>
      <div class="p">וכשאני חוזר אליהם, אני חוזר כאבא.</div>
      <div class="p">לא כעוד ילד בתוך המריבה.</div>
      <div class="p">לא כל מריבה מחייבת אותנו לפתור אותה מיד.</div>
      <div class="stop">לפעמים הדבר ההורי ביותר שאנחנו יכולים לעשות הוא לעצור.<br>להתרחק.<br>ולחזור עם כוח.</div>`;
    let siblingFightsNext=siblingFightsChapter.nextElementSibling;
    while(siblingFightsNext?.classList.contains('continued') &&
          siblingFightsNext.querySelector('.knum')?.textContent.trim()==='פרק 7'){
      const remove=siblingFightsNext; siblingFightsNext=siblingFightsNext.nextElementSibling; remove.remove();
    }
  }

  // תיקונים נקודתיים בפרקים 17-19 ושכתוב פרק 20 בקול טבעי ואישי יותר.
  const chapter17Nodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 17')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const computerReflection=chapter17Nodes.find(n=>
    n.textContent.includes('אני רואה כמה קשה לך לעצור עכשיו'));
  if(computerReflection) computerReflection.textContent='״וואו, כל כך מתחשק לך להמשיך עוד. ממש קשה לעצור עכשיו.״';
  const boundaryFeeling=chapter17Nodes.find(n=>
    n.textContent.includes('אני לא משנה את הגבול כדי להעלים את האכזבה'));
  if(boundaryFeeling) boundaryFeeling.textContent='אבל אני לא משנה את הגבול רק כדי שלא יפגוש את הרגש הלא נעים.';
  const steadyAuthority=chapter17Nodes.find(n=>
    n.textContent.includes('לפעמים היא בדיוק מה שהופך, את הסמכות'));
  if(steadyAuthority) steadyAuthority.textContent=steadyAuthority.textContent.replace('שהופך, את','שהופך את');

  const chapter18Nodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 18')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const punishmentTransition=chapter18Nodes.find(n=>
    n.textContent.startsWith('אז מה אני עושה כשהילד'));
  if(punishmentTransition) punishmentTransition.textContent='ובכל זאת, הילד לא תמיד מקשיב. לפעמים הוא עובר על כלל או על ערך שחשוב לי. אז מה אני עושה?';
  const pauseBeforeBoundary=chapter18Nodes.find(n=>
    n.textContent.startsWith('אם אני פועל ממקום אישי ונסער'));
  if(pauseBeforeBoundary){
    pauseBeforeBoundary.textContent='אם אני נסער, כדאי שאעצור קודם. אחרת הגבול עלול להפוך לדרך לפרוק על הילד את מה שאני מרגיש.';
    const aiBoundary=chapter18Nodes.find(n=>n.textContent.startsWith('לא מפני שהגבול אינו חשוב'));
    aiBoundary?.remove();
  }
  const treatExample=chapter18Nodes.find(n=>n.textContent.includes('אם בדיוק מחלקים ארטיקים'));
  if(treatExample) treatExample.textContent=treatExample.textContent
    .replace('אם בדיוק מחלקים ארטיקים, נשמור לו את הארטיק לאחרי השיחה. הוא אינו מפסיד אותו.',
      'אם בדיוק מחלקים ממתק, נשמור לו אותו לאחרי השיחה. הוא אינו מפסיד אותו.');
  const deeperAnswer=chapter18Nodes.find(n=>n.textContent.startsWith('לא כדי להתיש את הילד'));
  if(deeperAnswer) deeperAnswer.textContent='השאלה הנוספת מזמינה אותו להעמיק עוד מעט, ולא להסתפק בתשובה הראשונה רק כדי לסיים את השיחה.';
  const anotherTalk=chapter18Nodes.find(n=>n.textContent.includes('נקיים שיחה נוספ'));
  if(anotherTalk) anotherTalk.textContent=anotherTalk.textContent
    .replace('נקיים שיחה נוספ.', 'נקיים שיחה נוספת.')
    .replace('אי אפשר להאמין לך..', 'אי אפשר להאמין לך.״');

  const chapter19Nodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 19')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const slogan19=chapter19Nodes.find(n=>n.textContent.trim()==='חינוך אינו הניסיון לתקן הכול בבת אחת.');
  if(slogan19){
    slogan19.textContent='למדתי שאם אנסה לתקן הכול בבת אחת, כנראה שלא אצליח להתמיד בשום דבר.';
    const final19=chapter19Nodes.find(n=>n.textContent.startsWith('חינוך הוא היכולת לזהות'));
    if(final19) final19.textContent='עדיף לבחור את הדבר החשוב עכשיו, להשקיע בו את הכוחות ולהישאר איתו עד שמתחיל להתרחש שינוי.';
  }

  const chapter20=[...document.querySelectorAll('.sheet.txt')].find(s=>
    !s.classList.contains('continued') &&
    s.querySelector('.knum')?.textContent.trim()==='פרק 20');
  if(chapter20){
    chapter20.querySelector('.body').innerHTML=`
      <div class="p">לפעמים אני רואה את הילד שלי מתאמץ לעשות משהו, וכבר ברור לי איך אפשר לסיים אותו מהר יותר.</div>
      <div class="p">ביום־יום יש אינספור רגעים כאלה. זה יכול להיות ילד קטן שמנסה לגרוב גרביים, ילדה שמכינה לעצמה משהו לאכול, או ילד שמנסה להרכיב משחק ואינו מצליח.</div>
      <div class="p">אני רואה אותו מתאמץ. זה לוקח זמן, הדרך שלו לפעמים מסורבלת, ואני כמעט בלי לשים לב אומר:</div>
      <div class="q">״בוא, תן לי. אני אעשה לך את זה.״</div>
      <div class="p">אני באמת מתכוון לעזור. אלא שבמצבים האלה העזרה שהילד צריך ממני היא שאמתין מעט, אעודד אותו ואאמין שהוא מסוגל להמשיך לנסות בעצמו.</div>
      <div class="p">אם אמהר לסיים את המשימה עבורו, אולי אחסוך זמן ובלגן, אבל הוא לא יקבל את ההזדמנות לנסות עד הסוף ולגלות שהוא מסוגל.</div>
      <div class="p">כשהדרך הראשונה אינה מצליחה, הוא מחפש דרך אחרת. הוא טועה, מתקן ומנסה שוב. ולבסוף הוא מביט במה שעשה ויודע:</div>
      <div class="q">״אני עשיתי את זה.״</div>
      <div class="p">כדי שזה יקרה, אני משתדל לעצור ולא למהר לקחת ממנו את המשימה.</div>
      <div class="p">במקום לעשות במקומו, אני יכול להיות איתו בתוך הניסיון ולתת במילים מקום למה שקורה:</div>
      <div class="q">״אוף, זה כמעט הצליח. הנה, אתה מנסה שוב.״<br>״אתה לא מוותר.״</div>
      <div class="p">הוא כנראה יעשה זאת לאט יותר, יטעה ואולי גם ישאיר מעט בלגן בדרך. זה חלק מן הלמידה.</div>
      <div class="stop">ולכן, גם כשקשה לי להתאפק, אני משתדל לחכות ולתת לו את הזמן שהוא צריך, מתוך אמונה שהוא מסוגל.</div>`;
    let chapter20Next=chapter20.nextElementSibling;
    while(chapter20Next?.classList.contains('continued') &&
          chapter20Next.querySelector('.knum')?.textContent.trim()==='פרק 20'){
      const remove=chapter20Next; chapter20Next=chapter20Next.nextElementSibling; remove.remove();
    }
  }

  const chapter23Nodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 23')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const criticism23=chapter23Nodes.find(n=>
    n.textContent.includes('אולי הוא שומע בעיקר מה אינו עושה נכון'));
  if(criticism23 && !chapter23Nodes.some(n=>n.textContent.includes('אוי, אתה משהו אתה'))){
    criticism23.insertAdjacentHTML('afterend', `
      <div class="p">לפעמים אלה אינן רק הערות על מה שהילד עשה, אלא עקיצות, הכללות וכינויים:</div>
      <div class="q">״אוי, אתה משהו אתה.״<br>״נו באמת, אתה לא רואה מה אתה עושה?״<br>״זה תמיד קורה לך.״<br>״שקרן.״<br>״חצוף.״</div>
      <div class="p">המשפטים האלה אולי נפלטים ברגע של כעס, אבל הילד שומע בהם הרבה יותר מביקורת על מעשה מסוים. הוא עלול לשמוע שכך אנחנו רואים אותו.</div>
      <div class="p">יש הבדל גדול בין לומר לילד ששיקר לבין לקרוא לו שקרן, ובין לעצור דיבור שאינו מכבד לבין לקרוא לו חצוף. המעשה זקוק לתיקון. הכינוי נדבק לילד עצמו.</div>
      <div class="p">וכשהקופה שלו ממילא כמעט ריקה, כל עקיצה כזאת לוקחת ממנה עוד אסימון.</div>`);
  }

  const hiddenGainNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 8')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const parentHiddenGain=hiddenGainNodes.find(n=>
    n.textContent.startsWith('ולפעמים, הרווח הסמוי נמצא לא רק אצל הילד'));
  if(parentHiddenGain){
    parentHiddenGain.textContent='הרווח הסמוי עשוי להימצא גם אצל ההורה, שמקבל מתוך הדפוס תחושה שצריכים אותו, או סיפוק מכך שהוא זה שמרגיע, פותר ומחזיק את הבית.';
    hiddenGainNodes.find(n=>
      n!==parentHiddenGain && n.textContent.startsWith('גם ההורה עשוי לקבל משהו מתוך הדפוס'))?.remove();
  }

  const emotionEngineNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 11')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  for(const node of emotionEngineNodes){
    node.textContent=node.textContent
      .replace('תחושת הסיפוק והגאווה', 'תחושת הסיפוק והערך')
      .replace('סיפוק, גאווה ומשמעות', 'סיפוק, ערך ומשמעות');
  }

  const feelGoodNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 12')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  for(const node of feelGoodNodes){
    node.textContent=node.textContent
      .replace('סיפוק, גאווה, קרבה', 'סיפוק, תחושת ערך, קרבה')
      .replace('סיפוק, כוח או הקלה רגעיים', 'תחושת כוח, פורקן או הקלה רגעית');
  }
  const innerFeelingIntro=feelGoodNodes.find(n=>
    n.textContent.startsWith('כשהילד מתחשב, עוזר, מתגבר או פועל באחריות'));
  if(innerFeelingIntro){
    innerFeelingIntro.textContent='כשהילד מתחשב, עוזר, מתגבר או פועל באחריות, אפשר להפנות את תשומת לבו למה שהמעשה עורר בו:';
  }
  feelGoodNodes.find(n=>n.textContent.trim()==='״ראית כמה הוא שמח כשעזרת לו?״')?.remove();
  feelGoodNodes.find(n=>n.textContent.startsWith('ולפעמים די בשאלה פשוטה'))?.remove();
  feelGoodNodes.find(n=>n.textContent.trim()==='״איך אתה מרגיש עם מה שעשית?״')?.remove();
  feelGoodNodes.find(n=>n.textContent.trim()==='״איך אתה מרגיש עכשיו עם מה שקרה?״')?.remove();
  const overcomingQuestion=feelGoodNodes.find(n=>
    n.textContent.trim()==='״איך אתה מרגיש עכשיו, אחרי שהצלחת להתגבר?״');
  if(overcomingQuestion){
    const honestQuestion=document.createElement('div');
    honestQuestion.className='p';
    honestQuestion.textContent='חשוב שזו תהיה שאלה אמיתית. איננו מנסים להכניס לפיו של הילד את הרגש שאנחנו מצפים שירגיש, אלא מזמינים אותו להקשיב למה שבאמת מתרחש בתוכו. ייתכן שהוא ירגיש סיפוק, וייתכן שלא. נקבל את תשובתו כפי שהיא. אחרת, במקום לחבר אותו לעצמו, לימדנו אותו רק איזו תשובה אנחנו רוצים לשמוע.';
    overcomingQuestion.after(honestQuestion);
  }
  const innerCompass=feelGoodNodes.find(n=>n.textContent.startsWith('כך הילד לא רק יודע שהמעשה היה טוב'));
  if(innerCompass){
    innerCompass.textContent='כשהילד לומד לעצור ולהבחין במה שבאמת מתרחש בתוכו, הוא מתחיל לזהות את הקשר בין הבחירות שלו לבין התחושות שנשארות בו אחריהן.';
  }

  const homeCollapseNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 13')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const noException=homeCollapseNodes.find(n=>n.textContent.trim()==='לא תמיד קרה משהו חריג.');
  const noStrength=homeCollapseNodes.find(n=>n.textContent.trim()==='לפעמים פשוט נגמר לו הכוח.');
  const exhaustionReflection=homeCollapseNodes.find(n=>
    n.textContent.startsWith('״נראה שאתה ממש מותש מכל השעות'));
  if(exhaustionReflection){
    exhaustionReflection.textContent='״אתה בטח ממש עייף ומותש מהיום שלך בבית הספר. אני מבינה אותך.״';
  }
  const releaseAtHome=homeCollapseNodes.find(n=>n.textContent.startsWith('כשהוא מגיע הביתה'));
  if(releaseAtHome){
    releaseAtHome.textContent=releaseAtHome.textContent.replace('ובהתפרצויות אז', 'ובהתפרצויות. אז');
  }
  if(noException){
    noException.textContent='אנחנו מיד מנסים להבין מה קרה לו. מי פגע בו? מה השתבש היום? ולפעמים אנחנו רק רוצים שההתנהגות הזאת תיפסק, ואומרים:';
    const stopCrying=document.createElement('div');
    stopCrying.className='q';
    stopCrying.textContent='״די כבר לבכות מכל דבר.״';
    const whyBehave=document.createElement('div');
    whyBehave.className='q';
    whyBehave.textContent='״למה אתה מתנהג ככה?״';
    const heldTogether=document.createElement('div');
    heldTogether.className='p';
    heldTogether.textContent='אבל ייתכן שלא קרה שום דבר חריג. הילד פשוט החזיק את עצמו במשך שעות, ועכשיו כבר אין לו כוח להמשיך.';
    noException.after(stopCrying, whyBehave, heldTogether);
    noStrength?.remove();
  }

  const noFearNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 15')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const worriedFather=noFearNodes.find(n=>n.textContent.startsWith('״אבא קצת מודאג ועצוב עכשיו'));
  if(worriedFather){
    worriedFather.textContent='״אבא קצת מודאג ועצוב עכשיו. זה לא בגללכם. אני צריך כמה דקות עם עצמי, ואחר כך אחזור.״';
  }
  const strongFather=noFearNodes.find(n=>n.textContent.trim()==='זהו אבא חזק.');
  if(strongFather){
    strongFather.textContent='זהו אבא חזק. גם כשהוא כועס, דואג או עצוב, הוא מסוגל לזהות את הרגש, לקרוא לו בשם ולא לתת לו לנהל אותו ולפגוע באחרים.';
    noFearNodes.find(n=>n.textContent.startsWith('לא משום שהוא אינו כועס'))?.remove();
    noFearNodes.find(n=>n.textContent.startsWith('הוא מזהה את הרגש. הוא קורא לו בשם'))?.remove();
  }
  const howItSounds=noFearNodes.find(n=>n.textContent.trim()==='אני יודע איך זה עלול להישמע.');
  if(howItSounds) howItSounds.textContent='אבל אני יודע איך כל זה עלול להישמע.';
  const personalPractice=noFearNodes.find(n=>n.textContent.trim().startsWith('אני כותב את זה גם מניסיון אישי.'));
  if(personalPractice){
    personalPractice.textContent='אני מכיר את התהליך הזה גם מעצמי. התרגול הזה מלווה אותי כבר שנים, וגם היום אני לא תמיד מצליח לעצור בזמן. אבל עם השנים למדתי לזהות מהר יותר מה קורה בתוכי. כשאני מזהה את הרגש ונותן לו מקום, הוא פחות מנהל אותי.';
    noFearNodes.find(n=>n.textContent.trim()==='עם הזמן, התרגול הזה הפך עבורי לדרך חיים.')?.remove();
    noFearNodes.find(n=>n.textContent.startsWith('לא מפני שאני תמיד רגוע'))?.remove();
  }
  const naturalFeeling=noFearNodes.find(n=>n.textContent.includes('זה בסדר שאני מרגיש כך'));
  if(naturalFeeling) naturalFeeling.textContent='״זה טבעי שאני מרגיש כך.״';

  const boredomNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 16')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  boredomNodes.find(n=>n.textContent.includes('לא כל רגש לא נעים הוא מצב שצריך לתקן'))?.remove();
  boredomNodes.find(n=>n.textContent.includes('איזה רעיון יש לך'))?.remove();
  const boredomReflection=boredomNodes.find(n=>n.textContent.includes('כן, באמת לא נעים כשלא יודעים מה לעשות'));
  if(boredomReflection) boredomReflection.textContent='״כן, זה באמת לא נעים כשלא יודעים מה לעשות.״';
  const stayWithBoredom=boredomNodes.find(n=>n.textContent.startsWith('אני יכול להיות איתו לרגע בתוך התחושה'));
  if(stayWithBoredom) stayWithBoredom.textContent='אני יכול להיות איתו לרגע בתוך התחושה, בלי למהר למצוא עבורו פתרון.';
  boredomNodes.find(n=>n.textContent.trim()==='לא מיד, ובוודאי לא מתוך לחץ.')?.remove();
  const possibleQuestions=boredomNodes.find(n=>n.textContent.trim()==='אפשר לשאול:');
  if(possibleQuestions){
    possibleQuestions.className='stop';
    possibleQuestions.textContent='אחרי שהיינו איתו ברגש, וכבר איננו פועלים מתוך לחץ להעלים אותו, אפשר לעזור לילד לקחת בעצמו אחריות על הפתרון.';
    const questionIntro=document.createElement('div');
    questionIntro.className='p';
    questionIntro.textContent='אפשר לשאול:';
    possibleQuestions.after(questionIntro);
  }
  const oldBoredomEnding=boredomNodes.find(n=>n.textContent.startsWith('אין שום בעיה לעזור לילד לחשוב על פתרון'));
  if(oldBoredomEnding){
    oldBoredomEnding.textContent='אנחנו נשארים לצדו ומשדרים לו אמון מלא: הוא מסוגל לפגוש את הרגש הלא נעים, ובהמשך גם לחשוב, להעלות רעיונות ולמצוא פתרון בעצמו.';
    boredomNodes.find(n=>n.textContent.startsWith('האם אנחנו מציעים עזרה מפני שהוא זקוק לנו'))?.remove();
  }
  boredomNodes.find(n=>n.textContent.startsWith('הנקודה אינה להשאיר את הילד לבדו'))?.remove();
  boredomNodes.find(n=>n.textContent.startsWith('הנקודה היא להיות לידו'))?.remove();
  boredomNodes.find(n=>n.textContent.trim()==='לשדר לו:')?.remove();
  boredomNodes.find(n=>n.textContent.includes('אני רואה שלא נעים לך. אני איתך'))?.remove();

  const chapterSeventeenNodes=[...document.querySelectorAll('.sheet')]
    .filter(s=>s.querySelector('.knum')?.textContent.trim()==='פרק 17')
    .flatMap(s=>[...s.querySelectorAll('.p,.q,.stop')]);
  const cookieExampleIntro=chapterSeventeenNodes.find(n=>n.textContent.includes('הילד מבקש עוד עוגייה'));
  if(cookieExampleIntro) cookieExampleIntro.textContent='הילדה מבקשת עוד עוגייה. אפשר לומר:';
  const cookieReflection=chapterSeventeenNodes.find(n=>n.textContent.includes('היא באמת טעימה, וכבר בא לך עוד אחת'));
  if(cookieReflection) cookieReflection.textContent='״וואי, את ממש רוצה אותה. היא כל כך טעימה, וממש בא לך עוד אחת.״';

  // פרק 10 במקור חזר כמעט במלואו על הפרק החדש. מסירים את הטקסט הכפול,
  // אך שומרים את האיור שלו ומעבירים אותו אל הפרק החדש.
  const duplicatePainSheets=[...document.querySelectorAll('.sheet.txt')].filter(s=>
    s.querySelector('.knum')?.textContent.trim()==='פרק 10');
  const lastDuplicatePainSheet=duplicatePainSheets.at(-1);
  const painChapterArt=lastDuplicatePainSheet?.nextElementSibling?.classList.contains('art')
    ? lastDuplicatePainSheet.nextElementSibling : null;
  duplicatePainSheets.forEach(s=>s.remove());

  // פרק חדש לאחר פרק 1. מוסיפים אותו רק לאחר שכל תיקוני התוכן הקיימים
  // כבר הוחלו, ואז מזיזים את מספרי הפרקים הבאים בלי לשנות את מבנה המקור.
  const oldChapter2=[...document.querySelectorAll('.sheet.txt')].find(s=>
    !s.classList.contains('continued') &&
    s.querySelector('.knum')?.textContent.trim()==='פרק 2');
  if(oldChapter2){
    for(const label of document.querySelectorAll('.sheet.txt .knum')){
      const match=label.textContent.trim().match(/^פרק (\d+)$/);
      if(match && Number(match[1])>=2 && Number(match[1])<=9){
        label.textContent='פרק '+(Number(match[1])+1);
      }
    }

    const newChapter=document.createElement('div');
    newChapter.className='sheet txt';
    newChapter.innerHTML=`
      <div class="head"><div class="knum">פרק 2</div><h2>כשהכאב שלו פוגש אותי</h2><div class="deco"></div></div>
      <div class="body">
        <div class="p">אנחנו כל כך רוצים שלילדים שלנו יהיה טוב.</div>
        <div class="p">אנחנו משקיעים בהם, דואגים להם ומנסים לשמור עליהם. החלום שלנו הוא שיהיו שמחים ומוגנים, ושלא יצטרכו לפגוש כאב, אכזבה או עלבון.</div>
        <div class="stop">אבל החלום שלילד שלנו יהיה תמיד נעים אינו מציאותי.</div>
        <div class="p">הנה דוגמה פשוטה: הארטיק של הילד נפל על הרצפה.</div>
        <div class="p">הוא מתחיל לבכות, וברגע הזה עולמו חרב עליו. אני מיד רוצה לעשות משהו. לקנות לו ארטיק חדש, להסביר לו שזה לא נורא או להסיח את דעתו.</div>
        <div class="p">קשה לי פשוט לעמוד שם מול הכאב שלו.</div>
        <div class="p">כי הכאב של הילד פוגש גם אותי, כהורה. וכשהוא פוגש אותי, אני ממהר להשתיק אותו באמצעות פתרונות, הסברים או ניסיונות לשכנע את הילד שלא קרה דבר נורא.</div>
        <div class="p">ולרוב, אם אעצור לרגע ואתבונן באמת, אגלה שיותר משאני מנסה להציל את הילד מן הכאב שלו, אני מנסה להציל את עצמי מן הכאב שכאבו מעורר בי.</div>
        <div class="stop">אבל לא זה מה שהוא זקוק לו ממני באותו רגע.</div>
        <div class="p">ברגע הזה, הרבה יותר משהוא זקוק לפתרון, הוא זקוק לכך שאראה את הכאב שלו ואהיה איתו בתוכו.</div>
        <div class="p">כדי שאוכל לעשות זאת, עליי לפגוש תחילה את מה שכאבו מעורר בי. לעצור לרגע ולהכיר בכך שקשה לי לראות אותו כך. שכואב לי בכאבו ושאני מרגיש חסר אונים מפני שאיני יכול לתקן מיד את מה שקרה.</div>
        <div class="p">כשאני מסוגל לפגוש את הכאב שלי כהורה, אני פנוי יותר לפגוש גם את הכאב של הילד.</div>
        <div class="p">במקום לקנות מיד ארטיק אחר או להסביר לו שזה רק ארטיק, אני יכול להסתכל עליו ולומר:</div>
        <div class="q">״וואו, כל כך רצית אותו, ועכשיו הוא נפל. זה כל כך מאכזב.״</div>
        <div class="p">אין אלה מילים שנועדו לגרום לו להפסיק לבכות. הן מאפשרות לו להבין מה עובר עליו, להרגיש שמישהו רואה אותו ולגלות שאפשר להיות בתוך הרגש הזה בלי להיבהל ממנו. אני מנסה באמת להיכנס לרגע לנעליו ולפגוש את החוויה כפי שהוא מרגיש אותה.</div>
        <div class="p">שיקוף רגשות אינו נוסחה, ולא תמיד אדייק. ייתכן שהילד יתקן אותי, וגם זה בסדר. המטרה אינה לומר את המשפט הנכון, אלא לנסות באמת להבין אותו ולהראות לו שאני איתו.</div>
        <div class="p">פעמים רבות עצם העובדה שמישהו רואה את הילד, מבין אותו ואינו נבהל מכאבו כבר מרגיעה משהו בתוכו. מה שקרה עדיין כואב, אבל הילד כבר אינו לבד בתוך הכאב.</div>
        <div class="p">הארטיק הוא רק דוגמה קטנה. הדבר הזה פוגש אותנו כשהילד נכשל במבחן, כשחבר אינו רוצה לשחק איתו, כשלא הזמינו אותו או כשמשהו שחיכה לו זמן רב אינו מתרחש כפי שקיווה.</div>
        <div class="p">במהלך חייו הילד יחווה הרבה שמחה, סיפוק והתרגשות, אבל גם אכזבה, עלבון, בושה, קנאה, פחד ובדידות. איננו יכולים למנוע ממנו את הרגשות האלה, וגם לא נכון לנסות להעלים אותם בכל פעם שהם מופיעים.</div>
        <div class="p">אם בכל פעם נמהר לפתור את הבעיה ולשים פלסטר על הרגש, הילד לא ילמד לפגוש רגשות לא נעימים ולשאת אותם. כל כאב עלול לטלטל אותו, מפני שלא הספיק לגלות שגם רגש לא נעים הוא דבר שאפשר להרגיש ולעבור דרכו.</div>
        <div class="p">כאשר אנחנו מסוגלים להישאר לידו גם כשכואב לו, הוא לומד שאפשר להתאכזב בלי להתפרק, להיעלב בלי לברוח ולכאוב בלי לפחד מן הכאב עצמו.</div>
        <div class="stop">איננו יכולים להבטיח לילד חיים ללא רגשות לא נעימים. אנחנו יכולים להיות איתו בתוכם היום, וכך לעזור לו לבנות בתוכו את היכולת לפגוש אותם, לשאת אותם ובהדרגה גם לעבור דרכם בכוחות עצמו.</div>
      </div><div class="fol"></div>`;
    oldChapter2.before(newChapter);
    if(painChapterArt) newChapter.after(painChapterArt);
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
    // סידור הכפולות מזיז לפעמים את האיור לפני העמוד האחרון של הפרק.
    // מאז, עמוד ההמשך שאחרי האיור אינו שכן ישיר של הכותרת - ובלי לדלג
    // עליו הוא נשאר יתום ונמחק מיד אחרי כן, יחד עם כל התוכן שבו.
    const lbl=n=>(n.querySelector('.knum')?.textContent||'').replace(/ · המשך$/,'').trim();
    const mine=lbl(head);
    let n=head.nextElementSibling;
    while(n){
      if(n.classList.contains('continued') && lbl(n)===mine){
        const nx=n.nextElementSibling, from=n.querySelector('.body');
        while(from.firstChild) to.appendChild(from.firstChild);
        n.remove(); n=nx; continue;
      }
      if(n.classList.contains('art')||n.classList.contains('blank')){ n=n.nextElementSibling; continue; }
      break;
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
