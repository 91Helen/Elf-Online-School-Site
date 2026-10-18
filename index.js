/* ===== При перезагрузке всегда открываем страницу с самого верха (у меню) ===== */
function jump(y){const de=document.documentElement,st=de.style;st.scrollBehavior='auto';void de.offsetHeight;try{scrollTo({top:y,left:0,behavior:'instant'})}catch(e){scrollTo(0,y)}st.scrollBehavior=''}
(function(){const n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0],t=n?n.type:'navigate';if(t==='reload'||t==='back_forward'||!location.hash){if(location.hash)history.replaceState(null,'',location.pathname+location.search);jump(0)}})();
addEventListener('pageshow',e=>{if(e.persisted)jump(0)});

const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
gsap.registerPlugin(ScrollTrigger);
/* intro */
const intro=$('#intro'),iv=$('#iv');let done=false;
function heroIn(){gsap.from('#ej',{y:70,opacity:0,duration:1.1,ease:'power3.out'});setTimeout(()=>say('Hello!'),1500);gsap.from('.hi',{y:40,opacity:0,stagger:.14,duration:.9,ease:'power3.out'});}
function closeIntro(){if(done)return;done=true;gsap.to(intro,{clipPath:'circle(0% at 50% 50%)',duration:.8,ease:'power3.inOut',onComplete:()=>{intro.remove();document.body.style.overflow='';heroIn()}})}
document.body.style.overflow='hidden';
gsap.timeline().from('#il',{scale:.3,rotate:-120,opacity:0,duration:.6,ease:'back.out(1.5)'}).from('#it',{y:24,opacity:0,duration:.4,ease:'power3.out'},'-=.3').from('#is',{y:20,opacity:0,letterSpacing:'.5em',duration:.45,ease:'power3.out'},'-=.25');gsap.fromTo('#ibar',{scaleX:0},{scaleX:1,duration:1.7,ease:'none'});

$('#skip').onclick=closeIntro;setTimeout(closeIntro,1900);

/* nav + parallax + reveals */
const dr=$('#drawer'),sc=$('#scrim'),bgr=$('.burger');let y0=0;function pos(){const v=window.visualViewport;if(v){dr.style.top=v.offsetTop+'px';dr.style.bottom='auto';dr.style.height=v.height+'px'}}
function tg(o){if(o===dr.classList.contains('open'))return;dr.classList.toggle('open',o);sc.classList.toggle('open',o);bgr.setAttribute('aria-expanded',o);dr.setAttribute('aria-hidden',!o);y0=scrollY;if(o){pos();$('.di').scrollTop=0;$('#dx').focus({preventScroll:true})}}
if(window.visualViewport)['resize','scroll'].forEach(e=>visualViewport.addEventListener(e,()=>dr.classList.contains('open')&&pos()));
bgr.onclick=()=>tg(true);sc.onclick=$('#dx').onclick=()=>tg(false);dr.querySelectorAll('a').forEach(a=>a.onclick=()=>tg(false));
addEventListener('wheel',()=>tg(false),{passive:true});addEventListener('touchmove',e=>{if(!dr.contains(e.target))tg(false)},{passive:true});
addEventListener('scroll',()=>{if(Math.abs(scrollY-y0)>12)tg(false)},{passive:true});
addEventListener('keydown',e=>e.key==='Escape'&&tg(false));addEventListener('resize',()=>innerWidth>860&&tg(false));
addEventListener('scroll',()=>$('nav').classList.toggle('s',scrollY>40),{passive:true});
if(!RM){
if(innerWidth>860)gsap.to('#hbg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});


document.querySelectorAll('.gal img').forEach(i=>gsap.fromTo(i,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:i.parentNode,scrub:true}}));
ScrollTrigger.batch('.rv',{start:'top 88%',once:true,onEnter:b=>gsap.from(b,{y:50,opacity:0,stagger:.12,duration:.8,ease:'power3.out',clearProps:'transform,opacity'})});
gsap.set('#elfw',{transformPerspective:1000});gsap.set('#elf',{transformOrigin:'50% 100%'});
gsap.to('#elf',{y:-14,rotation:1.4,duration:2.6,yoyo:true,repeat:-1,ease:'sine.inOut'});gsap.to('#elf',{scaleY:1.02,scaleX:.992,duration:1.7,yoyo:true,repeat:-1,ease:'sine.inOut'});
gsap.to('#elfw',{yPercent:-7,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
const Q=(t,p,d)=>gsap.quickTo(t,p,{duration:d,ease:'power3'}),mx=Q('#hbg','x',1),my=Q('#hbg','y',1),ex=Q('#elfw','x',.8),ey=Q('#elfw','y',.8),erY=Q('#elfw','rotationY',.8),erX=Q('#elfw','rotationX',.8);
addEventListener('pointermove',e=>{if(innerWidth<861)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;mx(x*-30);my(y*-18);ex(x*70);ey(y*34);erY(x*16);erX(y*-9)},{passive:true});
}
/* sparkle trail */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
if(!RM){addEventListener('pointermove',e=>{for(let i=0;i<2;i++)P.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*1.6,vy:Math.random()*1.4,l:1,c:['#43e8cb','#ffd166','#ff7eb6','#b79bff'][Math.random()*4|0]})});
(function L(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l-=.02;cx.globalAlpha=p.l;cx.fillStyle=p.c;cx.font=(8+p.l*10)+'px sans-serif';cx.fillText('✦',p.x,p.y)});requestAnimationFrame(L)})()}
const PH=['Hello!','Nice to meet you!',"Let's speak English!",'Ready to play?','You can do it!','Great job!'];let pi=0;
function say(t,v){const b=$('#bub');gsap.killTweensOf(b);gsap.timeline().fromTo(b,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.5,ease:'back.out(2)'}).to(b,{opacity:0,scale:.8,duration:.4,delay:2.4});b.textContent=t;
if(v)toon(t)}
function pickV(){const L=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));return L.find(x=>/female|samantha|karen|zira|susan|hazel|serena|moira|tessa|fiona|aria|jenny/i.test(x.name))||L.find(x=>/en-GB/i.test(x.lang))||L[0]}
let AC;function chime(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;[523,659,784].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),s=t+i*.11;o.type='sine';o.frequency.setValueAtTime(f,s);o.frequency.exponentialRampToValueAtTime(f*1.01,s+.12);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.06,s+.04);g.gain.exponentialRampToValueAtTime(.0001,s+.45);o.connect(g);g.connect(AC.destination);o.start(s);o.stop(s+.5)})}catch(e){}}
function toon(t){if(!('speechSynthesis' in window))return;chime();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t),v=pickV();if(v)u.voice=v;u.lang='en-GB';u.pitch=1.25;u.rate=.88;u.volume=.9;setTimeout(()=>speechSynthesis.speak(u),420)}
gsap.set('#ej',{transformOrigin:'50% 100%'});
$('#elf').onclick=()=>{gsap.timeline().to('#ej',{y:-70,scaleY:1.06,duration:.28,ease:'power2.out'}).to('#ej',{y:0,scaleY:.93,duration:.22,ease:'power2.in'}).to('#ej',{scaleY:1,duration:.5,ease:'elastic.out(1,.4)'});say(PH[pi++%PH.length],true)};
setInterval(()=>{if(!$('#intro')&&scrollY<innerHeight*.6&&!document.hidden)say(PH[pi++%PH.length])},10000);
/* ===== Просмотр сертификатов ===== */
const cc=[...document.querySelectorAll('.cc')],lb=$('#lb'),lbi=$('#lbi'),lbc=$('#lbc');let ci=0;
function lbo(i){ci=(i+cc.length)%cc.length;const e=cc[ci],im=e.querySelector('img');lbi.src=im.src;lbi.alt=im.alt;lbc.textContent=e.querySelector('.ct').textContent+' — '+e.querySelector('.co').textContent;lb.hidden=false}
cc.forEach((e,i)=>e.onclick=()=>lbo(i));
$('#lbx').onclick=()=>{lb.hidden=true};$('#lbp').onclick=()=>lbo(ci-1);$('#lbn').onclick=()=>lbo(ci+1);lb.onclick=e=>{if(e.target===lb)lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')lbo(ci-1);if(e.key==='ArrowRight')lbo(ci+1)});
/* ===== Умная кнопка: у верха страницы стрелка «вниз» (в самый конец), ниже — «вверх» (к меню). Прыжок мгновенный ===== */
(function(){const b=$('#sb');
function upd(){const max=document.documentElement.scrollHeight-innerHeight,y=scrollY,down=y<300;b.dataset.dir=down?'down':'up';b.style.setProperty('--p',max>0?Math.round(y/max*100):0);const t=down?'Вниз, в самый конец страницы':'Вверх, в самое начало (к меню)';b.title=t;b.setAttribute('aria-label',t)}
b.addEventListener('click',()=>jump(scrollY<300?document.documentElement.scrollHeight:0));
let tk;addEventListener('scroll',()=>{if(tk)return;tk=requestAnimationFrame(()=>{tk=0;upd()})},{passive:true});addEventListener('resize',upd);upd()})();
/* ===== Живой код: код печатается, эльфийка идёт по дорожке, взмахивает палочкой и кружится ===== */
(function(){const code=$('#code'),stage=$('#stage'),scene=$('#scene'),bub=$('#stbub'),box=$('#stwords'),hud=$('#hud'),re=$('#replay'),elf=$('#stelf'),mge=$('#mge'),sw=$('#mgsw'),sh=$('#mgsh');if(!code||!stage||!elf)return;
const LINES=[['// ✨ Создаём урок-игру вместе',null],['const game = new ElfQuest("Level 1");','s1'],['',null],['game.scene("sky-castle");','s2'],['game.add(elf, { wand: true });','s3'],['game.walk("stones", "clouds");','s4'],['elf.cast({ spin: 2 }); // ✨','s5'],['game.words(["apple", "star", "book"]);','s6'],['game.start(); // 🎉','s7']];
const RX=/(\/\/.*)|("[^"]*")|\b(const|new|true)\b|\b([A-Za-z_]\w*)(?=\()|\b(\d+)\b|(=>)/g,esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
function tok(l){const o=[];let last=0,m;RX.lastIndex=0;while((m=RX.exec(l))){if(m.index>last)o.push([l.slice(last,m.index),'tv']);o.push([m[0],m[1]?'tc':m[2]?'ts':m[3]?'tk':m[4]?'tf':m[5]?'tn':'tk']);last=m.index+m[0].length}if(last<l.length)o.push([l.slice(last),'tv']);return o}
LINES.forEach(L=>L.tk=tok(L[0]));code.style.setProperty('--n',LINES.length);
const CUR='<span class="cur"></span>',WORDS=[['🍎','apple'],['⭐','star'],['📖','book']];
/* путь по картинке: [x, y (ноги), масштаб] в долях изображения */
const WP=[[.36,.96,1],[.40,.87,.92],[.46,.80,.84],[.54,.72,.76]],IMW=1024,IMH=558;
/* спрайт эльфийки (размеры исходной анимации): холст 826x461, ноги (173,408), макушка 57, кончик палочки (365,119) */
const SW=826,SHH=461,FEET=[173,408],ETOP=57,TIP=[365,119];
let els=[],run=0,stars=0,wEls=[],started=false,bt,cur=[WP[0][0],WP[0][1],WP[0][2]],busy=false;
const lineHTML=(i,n)=>{let left=n,h='';for(const[t,c]of LINES[i].tk){if(left<=0)break;h+='<span class="'+c+'">'+esc(t.length<=left?t:t.slice(0,left))+'</span>';left-=t.length}return h};
function geo(){const r=scene.getBoundingClientRect(),W=r.width,H=r.height,sc=Math.max(W/IMW,H/IMH);return{W,H,sc,ox:(W-IMW*sc)/2,oy:(H-IMH*sc)/2,kk:(H*.4)/(FEET[1]-ETOP)}}
function feet(g,u,v){return{x:g.ox+u*IMW*g.sc,y:g.oy+v*IMH*g.sc}}
function size(g){elf.style.width=SW*g.kk+'px';elf.style.height=SHH*g.kk+'px';const eh=(FEET[1]-ETOP)*g.kk;sh.style.cssText='left:'+FEET[0]*g.kk+'px;top:'+(FEET[1]*g.kk+3)+'px;width:'+eh*.62+'px;height:'+eh*.15+'px'}
function place(u,v,s){const g=geo();size(g);const f=feet(g,u,v);gsap.set(elf,{x:f.x-FEET[0]*g.kk,y:f.y-FEET[1]*g.kk,scale:s,transformOrigin:FEET[0]*g.kk+'px '+FEET[1]*g.kk+'px'});gsap.set(mge,{transformPerspective:700,transformOrigin:'36.6% 100%'});cur=[u,v,s]}
function go(n){return new Promise(res=>{const g=geo(),f=feet(g,n[0],n[1]),d=.35+Math.hypot(n[0]-cur[0],n[1]-cur[1])*4.2;gsap.to(elf,{x:f.x-FEET[0]*g.kk,y:f.y-FEET[1]*g.kk,scale:n[2],duration:d,ease:'none',onComplete:()=>{cur=[n[0],n[1],n[2]];res()}})})}
async function walk(id){gsap.to(mge,{rotation:4,duration:.35,ease:'power2.out'});for(let i=1;i<WP.length;i++){if(id!==run)return;await go(WP[i])}gsap.to(mge,{rotation:0,duration:.5,ease:'elastic.out(1,.5)'})}
function tipPos(extraY,cosT){const g=geo(),f=feet(g,cur[0],cur[1]),k=g.kk*cur[2];return{x:f.x+(TIP[0]-FEET[0])*k*(cosT===undefined?1:cosT),y:f.y+(TIP[1]-FEET[1])*k+(extraY||0),k:k}}
function setHud(){hud.textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars)}
function say(t,ms){const g=geo(),f=feet(g,cur[0],cur[1]),eh=(FEET[1]-ETOP)*g.kk*cur[2];let x=f.x-FEET[0]*g.kk*cur[2]*.2-14,y=f.y-eh-50;x=Math.max(6,Math.min(g.W-150,x));y=Math.max(6,y);bub.style.left=x+'px';bub.style.top=y+'px';bub.textContent=t;bub.classList.add('show');clearTimeout(bt);bt=setTimeout(()=>bub.classList.remove('show'),ms||1500)}
function spark(x,y,n,spread,big){for(let i=0;i<n;i++){const d=document.createElement('i');d.className='mg-p';d.textContent=Math.random()>.35?'✦':'✧';d.style.cssText='left:'+x+'px;top:'+y+'px;font-size:'+((big?12:8)+Math.random()*(big?12:8))+'px;font-style:normal';scene.appendChild(d);const a=Math.random()*6.283,r=spread*(.4+Math.random()*.8);gsap.fromTo(d,{scale:.2,opacity:1},{x:Math.cos(a)*r,y:Math.sin(a)*r-8,scale:1,rotation:(Math.random()-.5)*160,duration:.5,ease:'power2.out'});gsap.to(d,{opacity:0,y:'+='+(10+Math.random()*24),duration:.6,delay:.45,onComplete:()=>d.remove()})}}
function flash(p){const f=document.createElement('i');f.className='mg-fl';f.style.left=p.x+'px';f.style.top=p.y+'px';scene.appendChild(f);gsap.fromTo(f,{scale:.2,opacity:1},{scale:2.6*Math.max(.6,p.k*2.4),opacity:0,duration:.7,ease:'power2.out',onComplete:()=>f.remove()})}
function confetti(){const cols=['#43e8cb','#ffd166','#ff7eb6','#7a45e0','#ffffff'];for(let i=0;i<34;i++){const d=document.createElement('i');d.className='cf';const z=6+Math.random()*8;d.style.cssText='left:'+(38+Math.random()*24)+'%;top:46%;width:'+z+'px;height:'+z*(Math.random()>.5?1:.5)+'px;background:'+cols[i%5]+';border-radius:'+(Math.random()>.5?'50%':'2px');scene.appendChild(d);
 gsap.to(d,{x:(Math.random()-.5)*340,y:-90-Math.random()*170,rotation:Math.random()*720,duration:.9,ease:'power2.out'});gsap.to(d,{y:'+=280',opacity:0,duration:1.1,delay:.9,ease:'power1.in',onComplete:()=>d.remove()})}}
function hit(i,voice){const w=wEls[i];if(!w)return;w.classList.add('hit');setTimeout(()=>w.classList.remove('hit'),700);say(WORDS[i][1]+'!',1100);if(voice&&window.toon)toon(WORDS[i][1])}
function buildWords(){box.innerHTML='';wEls=WORDS.map((w,i)=>{const b=document.createElement('button');b.type='button';b.className='wc';b.innerHTML='<b>'+w[0]+'</b>'+w[1];b.onclick=()=>{if(stage.classList.contains('s6'))hit(i,true)};box.appendChild(b);return b})}
/* взмах палочкой: замах назад, резкий взмах вперёд, вылетает вихрь */
function wave(){return new Promise(res=>{const tl=gsap.timeline({onComplete:res});
 tl.to(mge,{rotation:-8,scaleY:.97,duration:.3,ease:'power2.out'})
   .to(mge,{rotation:10,scaleY:1,duration:.17,ease:'power3.in'})
   .add(()=>{const p=tipPos();flash(p);spark(p.x,p.y,16,60*Math.max(.7,p.k*2.5),true);gsap.set(sw,{visibility:'visible',opacity:0,clipPath:'inset(0 100% 0 0)',scale:.3,transformOrigin:'0% 27%'});gsap.to(sw,{opacity:1,clipPath:'inset(0 0% 0 0)',scale:1,duration:1.2,ease:'power2.out'})},'<.06')
   .to(mge,{rotation:-3,duration:.2,ease:'power2.out'})
   .to(mge,{rotation:0,duration:.6,ease:'elastic.out(1,.4)'})})}
/* виртуозное кручение: присед, прыжок, два оборота, лёгкое приземление */
function spin(turns){return new Promise(res=>{const g=geo(),jump=(FEET[1]-ETOP)*g.kk*cur[2]*.3,t=turns*.42+.2;let last=0;
 const tl=gsap.timeline({onComplete:res});
 tl.to(mge,{scaleY:.88,scaleX:1.06,duration:.2,ease:'power2.in'})
   .to(mge,{y:-jump,scaleY:1.05,scaleX:.97,duration:t*.5,ease:'power2.out'})
   .to(mge,{rotationY:360*turns,duration:t,ease:'power1.inOut',onUpdate:function(){const now=performance.now();if(now-last>55){last=now;const th=gsap.getProperty(mge,'rotationY')*Math.PI/180,p=tipPos(gsap.getProperty(mge,'y'),Math.cos(th));spark(p.x,p.y,2,18,false)}}},'<')
   .to(sh,{scaleX:.6,opacity:.45,duration:t*.5,ease:'power2.out'},'<')
   .to(mge,{y:0,scaleY:.9,scaleX:1.05,duration:t*.5,ease:'power2.in'},'>-0.02')
   .to(sh,{scaleX:1,opacity:1,duration:t*.5,ease:'power2.in'},'<')
   .to(mge,{rotationY:0,scaleY:1,scaleX:1,duration:.55,ease:'elastic.out(1,.45)',overwrite:false})
   .set(mge,{rotationY:0},'>')})}
function wordsFromMagic(){return new Promise(res=>{buildWords();stage.classList.add('s6');const sr=scene.getBoundingClientRect(),wr=sw.getBoundingClientRect(),cx=wr.left+wr.width*.62-sr.left,cy=wr.top+wr.height*.5-sr.top;let done=0;
 wEls.forEach((w,i)=>{const r=w.getBoundingClientRect(),dx=cx-(r.left+r.width/2-sr.left),dy=cy-(r.top+r.height/2-sr.top);
  gsap.fromTo(w,{x:dx,y:dy,scale:.12,rotation:-540,opacity:0},{x:0,y:0,scale:1,rotation:0,opacity:1,duration:1,ease:'back.out(1.25)',delay:i*.22,onStart:()=>spark(cx,cy,6,40,false),onComplete:()=>{w.classList.add('on');gsap.set(w,{clearProps:'transform,opacity'});if(++done===wEls.length)res()}})})})}
function reset(){run++;clearTimeout(bt);gsap.killTweensOf([elf,mge,sw,sh]);gsap.set(mge,{clearProps:'all'});gsap.set(sw,{clearProps:'all'});gsap.set(sh,{clearProps:'transform,opacity'});sw.style.visibility='hidden';bub.classList.remove('show');['s1','s2','s3','s4','s5','s6','s7','done'].forEach(c=>stage.classList.remove(c));box.innerHTML='';wEls=[];stars=0;setHud();scene.querySelectorAll('.cf,.mg-p,.mg-fl').forEach(e=>e.remove());place(WP[0][0],WP[0][1],WP[0][2]);code.innerHTML='';els=LINES.map(()=>{const d=document.createElement('span');d.className='l';code.appendChild(d);return d})}
async function act(k,id){if(k==='s1'){stage.classList.add('s1');await sleep(300)}
 else if(k==='s2'){stage.classList.add('s2');await sleep(1500)}
 else if(k==='s3'){place(WP[0][0],WP[0][1],.2);stage.classList.add('s3');gsap.to(elf,{scale:WP[0][2],duration:.8,ease:'back.out(2)'});await sleep(500);cur[2]=WP[0][2];say('Hello!',1300);await sleep(1200)}
 else if(k==='s4'){say("Let's go!",900);await sleep(700);await walk(id);if(id!==run)return;await sleep(300)}
 else if(k==='s5'){say('Abracadabra!',1700);await wave();if(id!==run)return;await sleep(500);await spin(2);if(id!==run)return;say('Ta-da!',1200);await sleep(500)}
 else if(k==='s6'){await wordsFromMagic();if(id!==run)return;gsap.to(sw,{opacity:0,duration:1.4,onComplete:()=>{sw.style.visibility='hidden'}});stage.classList.add('s6')}
 else if(k==='s7'){for(let i=0;i<WORDS.length;i++){if(id!==run)return;hit(i,false);stars=i+1;setHud();await sleep(850)}confetti();say('Great job!',2200);stage.classList.add('done')}}
async function play(){reset();const id=run;started=true;await sleep(300);
 for(let i=0;i<LINES.length;i++){const t=LINES[i][0],el=els[i];for(let n=0;n<=t.length;n++){if(id!==run)return;el.innerHTML=lineHTML(i,n)+CUR;await sleep(t[n-1]===' '?16:24+Math.random()*32)}el.innerHTML=lineHTML(i,t.length);if(LINES[i][1])await act(LINES[i][1],id);if(id!==run)return;await sleep(200)}}
function instant(){reset();LINES.forEach((L,i)=>els[i].innerHTML=lineHTML(i,L[0].length));['s1','s2','s3','s6'].forEach(c=>stage.classList.add(c));const e=WP[WP.length-1];place(e[0],e[1],e[2]);buildWords();wEls.forEach(w=>w.classList.add('on'));stars=3;setHud();stage.classList.add('done');started=true}
/* клик по эльфийке: ещё один взмах и пируэт */
$('.mg-el').addEventListener('click',async()=>{if(busy||!stage.classList.contains('done'))return;busy=true;say('Magic!',1200);const p=tipPos();flash(p);spark(p.x,p.y,12,50,true);await spin(1);busy=false});
re.onclick=()=>RM?instant():play();
addEventListener('resize',()=>{if(stage.classList.contains('s3')&&!gsap.isTweening(elf)&&!gsap.isTweening(mge))place(cur[0],cur[1],cur[2])});
reset();
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&!started){io.disconnect();RM?instant():play()}},{threshold:.3});io.observe($('#tech .cp'))}else instant()})();
