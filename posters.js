(() => {
  const wall = document.querySelector('#poster-wall');
  const posters = [...wall.querySelectorAll('.wall-poster')];
  const status = document.querySelector('#wall-status');
  const showAll = document.querySelector('#show-posters');
  const intro = document.querySelector('#intro');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false, elapsed = 0, lastTime = null, frame = null;
  function setStatus(text) { if (status.textContent !== text) status.textContent = text; }
  function settle() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    wall.dataset.stage = 'settled';
    posters.forEach(poster => poster.classList.remove('active'));
    setStatus('ALL SIGNALS RECEIVED');
    showAll.textContent = 'REPLAY REVEAL ↻';
  }
  function tick(time) {
    frame = null;
    if (wall.dataset.stage === 'settled') return;
    const paused = document.body.classList.contains('paused');
    if (inView && !document.hidden && intro.classList.contains('hidden') && !paused) {
      if (lastTime !== null) elapsed += time - lastTime;
      lastTime = time;
      wall.dataset.stage = 'revealing';
      if (elapsed >= 20000) { settle(); return; }
      const beat = Math.floor(elapsed / 2000);
      posters.forEach((poster, index) => poster.classList.toggle('active', index === beat % posters.length && elapsed % 2000 < 700));
      setStatus('SIGNAL ' + String(Math.ceil((20000 - elapsed) / 1000)).padStart(2, '0') + ' / 20');
    } else {
      lastTime = null;
      if (paused) setStatus('REVEAL PAUSED');
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (motionPreference.matches) { settle(); return; }
    elapsed = 0;
    lastTime = null;
    wall.dataset.stage = 'waiting';
    showAll.textContent = 'SHOW ALL ↗';
    if (frame === null) frame = requestAnimationFrame(tick);
  }
  showAll.addEventListener('click', () => wall.dataset.stage === 'settled' ? start() : settle());
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0.15 }).observe(wall);
  document.addEventListener('visibilitychange', () => { lastTime = null; });
  motionPreference.addEventListener('change', () => { if (motionPreference.matches) settle(); });
  start();
})();
