const root=document.documentElement;
const menu=document.getElementById('chapters');
const toggle=document.getElementById('scrollToggle');
const speed=document.getElementById('speed');
const progress=document.getElementById('progressBar');
let fontSize=Number(localStorage.getItem('speakerFont')||27);
let scrolling=false;
let raf=null;
let last=0;
root.style.setProperty('--font-size',fontSize+'px');
document.getElementById('menuButton').onclick=()=>menu.classList.toggle('open');
document.getElementById('larger').onclick=()=>setFont(Math.min(42,fontSize+2));
document.getElementById('smaller').onclick=()=>setFont(Math.max(19,fontSize-2));
function setFont(value){fontSize=value;root.style.setProperty('--font-size',fontSize+'px');localStorage.setItem('speakerFont',fontSize)}
menu.querySelectorAll('button').forEach(button=>button.onclick=()=>{document.getElementById(button.dataset.target).scrollIntoView();menu.classList.remove('open')});
function step(now){if(!scrolling)return;if(!last)last=now;const elapsed=now-last;if(elapsed>20){window.scrollBy(0,Number(speed.value)*.22);last=now}raf=requestAnimationFrame(step)}
toggle.onclick=()=>{scrolling=!scrolling;toggle.textContent=scrolling?'עצור גלילה':'התחל גלילה';toggle.classList.toggle('active',scrolling);last=0;if(scrolling)raf=requestAnimationFrame(step);else cancelAnimationFrame(raf)};
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&scrolling)toggle.click()});
