const root=document.documentElement;
const menu=document.getElementById('chapters');
const toggle=document.getElementById('scrollToggle');
const speed=document.getElementById('speed');
const speedValue=document.getElementById('speedValue');
const progress=document.getElementById('progressBar');
const focusToggle=document.getElementById('focusToggle');
let fontSize=Number(localStorage.getItem('speakerFont')||27);
speed.value=localStorage.getItem('speakerSpeed')||5;
speedValue.textContent=speed.value;
let focusMode=localStorage.getItem('speakerFocus')!=='off';
let scrolling=false;
let raf=null;
let last=0;
root.style.setProperty('--font-size',fontSize+'px');
document.body.classList.toggle('focus-mode',focusMode);
focusToggle.textContent=focusMode?'מיקוד ✓':'מיקוד';
focusToggle.setAttribute('aria-pressed',String(focusMode));
document.getElementById('menuButton').onclick=()=>menu.classList.toggle('open');
document.getElementById('larger').onclick=()=>setFont(Math.min(42,fontSize+2));
document.getElementById('smaller').onclick=()=>setFont(Math.max(19,fontSize-2));
function setFont(value){fontSize=value;root.style.setProperty('--font-size',fontSize+'px');localStorage.setItem('speakerFont',fontSize)}
function setSpeed(value){speed.value=Math.max(1,Math.min(10,Number(value)));speedValue.textContent=speed.value;localStorage.setItem('speakerSpeed',speed.value)}
document.getElementById('slower').onclick=()=>setSpeed(Number(speed.value)-1);
document.getElementById('faster').onclick=()=>setSpeed(Number(speed.value)+1);
speed.oninput=()=>setSpeed(speed.value);
focusToggle.onclick=()=>{focusMode=!focusMode;document.body.classList.toggle('focus-mode',focusMode);focusToggle.textContent=focusMode?'מיקוד ✓':'מיקוד';focusToggle.setAttribute('aria-pressed',String(focusMode));localStorage.setItem('speakerFocus',focusMode?'on':'off');updateFocus()};
menu.querySelectorAll('button').forEach(button=>button.onclick=()=>{document.getElementById(button.dataset.target).scrollIntoView();menu.classList.remove('open')});
function step(now){if(!scrolling)return;if(!last)last=now;const elapsed=now-last;if(elapsed>20){window.scrollBy(0,Number(speed.value)*.22);last=now}raf=requestAnimationFrame(step)}
toggle.onclick=()=>{scrolling=!scrolling;toggle.textContent=scrolling?'עצור גלילה':'התחל גלילה';toggle.classList.toggle('active',scrolling);last=0;if(scrolling)raf=requestAnimationFrame(step);else cancelAnimationFrame(raf)};
const speechParagraphs=[...document.querySelectorAll('main section>p:not(.cue)')];
function updateFocus(){speechParagraphs.forEach(p=>p.classList.remove('speaking'));if(!focusMode)return;const center=innerHeight*.5;let closest=null;let distance=Infinity;speechParagraphs.forEach(p=>{const rect=p.getBoundingClientRect();const d=Math.abs((rect.top+rect.bottom)/2-center);if(d<distance){distance=d;closest=p}});if(closest)closest.classList.add('speaking')}
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%';updateFocus()},{passive:true});
window.addEventListener('resize',updateFocus);
updateFocus();
document.addEventListener('visibilitychange',()=>{if(document.hidden&&scrolling)toggle.click()});
