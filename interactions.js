// simple script: theme toggle + mode persisting
(function(){
  const root = document.documentElement;
  const app = document.getElementById('app');
  const themeBtn = document.getElementById('themeToggle');
  const modeBtns = document.querySelectorAll('.mode-btn');

  // restore mode
  const savedMode = localStorage.getItem('indigis.mode') || 'advanced';
  modeBtns.forEach(b=>{
    b.classList.toggle('active', b.dataset.mode === savedMode);
    b.addEventListener('click', () => {
      modeBtns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      localStorage.setItem('indigis.mode', b.dataset.mode);
      // TODO: show/hide features according to mode
      console.log('Mode now →', b.dataset.mode);
    });
  });

  // theme autopick
  function applyTheme(name){
    document.body.classList.remove('theme-light','theme-auto');
    document.body.classList.remove('theme-dark');
    if(name === 'light'){
      document.body.classList.add('theme-light');
      themeBtn.setAttribute('aria-pressed','false');
    } else if(name === 'dark'){
      document.body.classList.add('theme-auto'); // dark uses default vars
      themeBtn.setAttribute('aria-pressed','true');
    } else {
      // auto: prefers-color-scheme
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if(isDark) { document.body.classList.remove('theme-light'); }
      else { document.body.classList.add('theme-light'); }
      themeBtn.setAttribute('aria-pressed', isDark ? 'true':'false');
    }
    localStorage.setItem('indigis.theme',name);
  }

  const savedTheme = localStorage.getItem('indigis.theme') || 'auto';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const cur = localStorage.getItem('indigis.theme') || 'auto';
    const next = cur === 'auto' ? 'dark' : (cur === 'dark' ? 'light' : 'auto');
    applyTheme(next);
  });

  // cheap demo for coords (replace with real map listener)
  const coords = document.getElementById('coords');
  setInterval(()=> {
    const now = new Date();
    coords.textContent = `Lat: -- , Lon: -- • ${now.toLocaleTimeString()}`;
  }, 1000);
})();
