const $=s=>document.querySelector(s);let introTimer,startedAt,toastTimer,introAttempt=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let seen=false;try{seen=localStorage.getItem('wolff-intro-seen')==='1'}catch{};$('#year').textContent=new Date().getFullYear();const shell=[$('header'),$('main')];const setShellInert=v=>{shell.forEach(e=>e.inert=v);document.body.classList.toggle('intro-open',v)};
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3300)}
const entranceVideo=$('#entrance-video');
const introElements={overlay:$('#intro'),progress:$('#progress'),time:$('#intro-time'),kicker:$('#boot-kicker'),status:$('#boot-status'),sub:$('#boot-sub')};
const introPhases=[
  [0,'AN UNREASONABLY DRAMATIC ENTRANCE','ESTABLISHING QUESTIONABLE CONNECTION…'],
  [1.6,'TRANSMISSION FOUND','LOADING PERSONALITY…'],
  [3.7,'WELCOME TO MY CORNER OF THE INTERNET','CHECKING FOR GOOD DECISIONS… NONE FOUND.'],
  [5.9,'PLAYER ONE HAS ENTERED','THREE PORTALS READY. LET’S GO.']
];
function endIntro(){
  ++introAttempt;
  entranceVideo.pause();
  clearInterval(introTimer);
  introElements.overlay.classList.remove('starting');
  introElements.overlay.classList.add('hidden');
  introElements.overlay.setAttribute('aria-hidden','true');
  introElements.overlay.inert=true;
  setShellInert(false);
  try{localStorage.setItem('wolff-intro-seen','1')}catch{}
  $('#replay').focus({preventScroll:true});
}
function startIntro(sound){
  if(introElements.overlay.classList.contains('starting')||introElements.overlay.classList.contains('running'))return;
  const attempt=++introAttempt;
  if(sound)playMusic();
  introElements.overlay.classList.add('starting');
  introElements.status.textContent='PREPARING TRANSMISSION…';
  if(entranceVideo.currentTime>0)entranceVideo.currentTime=0;
  entranceVideo.play().then(()=>{
    if(attempt!==introAttempt)return;
    // Start the eight-second sequence only once video playback has started.
    introElements.overlay.classList.remove('starting');
    introElements.overlay.classList.add('running');
    startedAt=performance.now();
    let lastSecond=-1,lastPhase=-1;
    const update=()=>{
      const elapsed=(performance.now()-startedAt)/1000;
      const second=Math.max(0,Math.ceil(8-elapsed));
      if(second!==lastSecond){introElements.time.textContent='00:'+String(second).padStart(2,'0');lastSecond=second}
      let phase=0;
      while(phase+1<introPhases.length&&elapsed>=introPhases[phase+1][0])phase++;
      if(phase!==lastPhase){
        introElements.kicker.textContent=introPhases[phase][1];
        introElements.status.textContent=introPhases[phase][2];
        if(phase===3)introElements.sub.textContent='Make yourself mildly uncomfortable.';
        lastPhase=phase;
      }
      if(elapsed>=8)endIntro();
    };
    update();
    introTimer=setInterval(update,100);
  }).catch(error=>{
    if(attempt!==introAttempt||error.name==='AbortError')return;
    introElements.overlay.classList.remove('starting');
    introElements.status.textContent='VIDEO UNAVAILABLE. RETRY OR SKIP INTRO ↗';
    toast('Video could not start. You can retry or skip the entrance.');
  });
}
$('#enter-sound').onclick=()=>startIntro(true);$('#enter-muted').onclick=()=>{pauseMusic();startIntro(false)};$('#skip').onclick=endIntro;$('#replay').onclick=()=>{$('#intro').classList.remove('hidden','running','starting');$('#intro').removeAttribute('aria-hidden');$('#intro').inert=false;setShellInert(true);$('#boot-kicker').textContent='AN UNREASONABLY DRAMATIC ENTRANCE';$('#boot-sub').textContent='Three links. A whole production.';$('#intro-time').textContent='00:08';$('#boot-status').textContent='AWAITING PLAYER INPUT';setTimeout(()=>$('#enter-sound').focus(),60)};if(seen||reduced){$('#intro').classList.add('hidden');$('#intro').setAttribute('aria-hidden','true');$('#intro').inert=true}else{setShellInert(true);$('#enter-sound').focus()}
$('#motion').onclick=()=>{const p=document.body.classList.toggle('paused');$('#motion').textContent=p?'RESUME FX':'PAUSE FX'};let pokes=0;$('#skull-button').onclick=()=>{pokes++;toast(['I said do not feed the skull.','The skull is judging your playlist.','Achievement unlocked: questionable company.'][Math.min(pokes-1,2)])};$('#discord').onclick=async()=>{try{await navigator.clipboard.writeText('ricinseller');toast('Copied ricinseller — add me on Discord.')}catch{toast('Discord username: ricinseller')}};
const audio=$('#audio');const tracks=window.WOLFF_TRACKS||[];let current=-1,playing=false,playRequest=0;
function setMediaMeta(t){if(!('mediaSession' in navigator)||!window.MediaMetadata)return;const i=t.lastIndexOf(' - ');navigator.mediaSession.metadata=new MediaMetadata(i>0?{title:t.slice(0,i),artist:t.slice(i+3),album:'WOLFF.EXE'}:{title:t,album:'WOLFF.EXE'})}
function updatePlayer(){if('mediaSession' in navigator)navigator.mediaSession.playbackState=playing?'playing':'paused';document.body.classList.toggle('playing',playing);$('#play').textContent=playing?'Ⅱ':'▶';$('#play').setAttribute('aria-label',playing?'Pause music':'Play music')}
function randomTrack(){if(!tracks.length){toast('The soundtrack is not available yet.');return false}let choices=tracks.map((_,i)=>i).filter(i=>tracks.length===1||i!==current);current=choices[Math.floor(Math.random()*choices.length)];audio.src=tracks[current].src;if(audio.preload!=='none')audio.load();$('#track-name').textContent=tracks[current].title;$('#track-status').textContent=tracks.length+' tracks · shuffle';setMediaMeta(tracks[current].title);setVolume();return true}
async function playMusic(){const request=++playRequest;try{if(current<0&&!randomTrack())return;await audio.play();if(request!==playRequest)return;playing=true;updatePlayer()}catch(e){if(request!==playRequest||e.name==='AbortError')return;playing=false;updatePlayer();toast('Audio could not play. Tap Play to try again.')}}
function pauseMusic(){++playRequest;audio.pause();playing=false;updatePlayer()}
$('#play').onclick=()=>playing?pauseMusic():playMusic();
function setVolume(){audio.volume=Number($('#volume').value);audio.muted=$('#mute').dataset.muted==='1'}
$('#volume').oninput=setVolume;$('#mute').onclick=()=>{const muted=$('#mute').dataset.muted!=='1';$('#mute').dataset.muted=muted?'1':'0';$('#mute').textContent=muted?'MUTED':'SOUND ON';$('#mute').setAttribute('aria-label',muted?'Unmute music':'Mute music');setVolume()};
$('#shuffle').onclick=()=>{pauseMusic();if(randomTrack())playMusic()};audio.onended=()=>{pauseMusic();if(randomTrack())playMusic()};audio.onerror=()=>{pauseMusic();toast('This track could not load. Try Shuffle.')};audio.preload=(seen||reduced)?'none':'auto';if(tracks.length)randomTrack();
if('mediaSession' in navigator){const ms=navigator.mediaSession;[['play',()=>playMusic()],['pause',pauseMusic],['nexttrack',()=>$('#shuffle').click()]].forEach(([k,f])=>{try{ms.setActionHandler(k,f)}catch{}})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#intro').classList.contains('hidden'))endIntro()});

// Warm the short video only when the entrance will be shown.
if(!seen&&!reduced){entranceVideo.preload='auto';entranceVideo.load()}
$('#replay').addEventListener('click',()=>{entranceVideo.preload='auto';entranceVideo.load()});
