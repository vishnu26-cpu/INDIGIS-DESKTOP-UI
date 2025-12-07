// interactions.js
(function () {
  // run only after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {

    // safe element lookups (page-guarded)
    const themeBtn = document.getElementById('themeToggle');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const logoutBtn = document.getElementById('logoutBtn');
    const coordsEl = document.getElementById('coords');

    // mode buttons - guard presence
    if (modeBtns && modeBtns.length) {
      const savedMode = localStorage.getItem('indigis.mode') || 'advanced';
      modeBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.mode === savedMode);
        b.addEventListener('click', () => {
          modeBtns.forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          localStorage.setItem('indigis.mode', b.dataset.mode);
          console.log('Mode now →', b.dataset.mode);
        });
      });
    }

    // theme apply function
    function applyTheme(name) {
      document.body.classList.remove('theme-light', 'theme-auto', 'theme-dark');
      if (name === 'light') {
        document.body.classList.add('theme-light');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'false');
      } else if (name === 'dark') {
        document.body.classList.add('theme-auto');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
      } else {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) document.body.classList.remove('theme-light');
        else document.body.classList.add('theme-light');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      }
      localStorage.setItem('indigis.theme', name);
    }

    // init saved theme
    const savedTheme = localStorage.getItem('indigis.theme') || 'auto';
    applyTheme(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = localStorage.getItem('indigis.theme') || 'auto';
        const next = cur === 'auto' ? 'dark' : (cur === 'dark' ? 'light' : 'auto');
        applyTheme(next);
      });
    }

    // logout handler
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('indigis_logged_in');
        window.location.href = 'login_v2.html';
      });
    }

    // coords demo
    if (coordsEl) {
      setInterval(() => {
        const now = new Date();
        coordsEl.textContent = `Lat: -- , Lon: -- • ${now.toLocaleTimeString()}`;
      }, 1000);
    }
  });
})();
