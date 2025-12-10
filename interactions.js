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
    // FINAL & CORRECT THEME APPLY FUNCTION
function applyTheme(name) {
  document.body.classList.remove('theme-light', 'theme-dark', 'theme-auto');

  if (name === 'light') {
    document.body.classList.add('theme-light');
    if (themeBtn) themeBtn.textContent = "🌞";
  }
  else if (name === 'dark') {
    document.body.classList.add('theme-dark');
    if (themeBtn) themeBtn.textContent = "🌙";
  }
  else {
    // AUTO MODE – follow system
    document.body.classList.add('theme-auto');
    if (themeBtn) themeBtn.textContent = "🌓";
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
        window.location.href = 'index.html';
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
// left-panel.js (or append to your main script)
// Safe guard: run when DOM ready
(function() {
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  const sections = qsa('.tool-section');
  const searchInput = qs('#lpSearch');

  // Accordion toggle handler
  sections.forEach(sec => {
    const hdr = sec.querySelector('.section-header');
    const list = sec.querySelector('.tool-list');

    function setOpen(open) {
      hdr.setAttribute('aria-expanded', open ? 'true' : 'false');
      list.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    // default behaviour: first section open
    if (sec.dataset.section === 'maptools') setOpen(true);

    hdr.addEventListener('click', () => {
      const isOpen = hdr.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    hdr.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        hdr.click();
      }
    });
  });

  // Tool button clicks — placeholder wiring
  qsa('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // remove active from others
      qsa('.tool-btn.active').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');

      const tool = btn.dataset.tool;
      // basic routing — replace with your actual function calls
      console.log('Tool clicked:', tool);

      // small example: open modal or call a function
      if (tool === 'open-map') {
        // open map file UI (placeholder)
        alert('Open map dialog (placeholder)');
      }
      // add more tool handlers as needed
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      qsa('.tool-btn').forEach(btn => {
        const txt = btn.textContent.trim().toLowerCase();
        btn.parentElement.style.display = txt.includes(q) ? '' : 'none';
      });
      // show sections that contain visible items
      sections.forEach(sec => {
        const visible = sec.querySelectorAll('li:not([style*="display: none"])').length > 0;
        sec.querySelector('.tool-list').style.display = visible ? 'block' : 'none';
      });
    });
  }

  // Collapse/pin behaviour (basic)
  const collapseBtn = qs('#lpCollapseBtn');
  const pinBtn = qs('#lpPinBtn');
  const leftPanel = qs('#leftPanel');
  let pinned = false;

  collapseBtn && collapseBtn.addEventListener('click', () => {
    if (leftPanel.style.width && leftPanel.style.width !== '') {
      // collapse
      leftPanel.style.width = '';
      leftPanel.style.minWidth = '';
      leftPanel.style.display = 'none';
      collapseBtn.textContent = '▶';
    } else {
      leftPanel.style.display = 'flex';
      leftPanel.style.width = 'var(--left-width)';
      collapseBtn.textContent = '◀';
    }
  });

  pinBtn && pinBtn.addEventListener('click', () => {
    pinned = !pinned;
    pinBtn.style.background = pinned ? 'rgba(41,121,255,0.12)' : 'transparent';
    pinBtn.title = pinned ? 'Pinned' : 'Pin panel';
  });

})();
document.querySelectorAll(".rp-tab").forEach(tab => {
  tab.addEventListener("click", () => {

    // remove previous selection
    document.querySelectorAll(".rp-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".rp-view").forEach(v => v.classList.add("hidden"));

    // activate clicked tab
    tab.classList.add("active");
    const selected = tab.dataset.tab;
    document.getElementById("rp-" + selected).classList.remove("hidden");
  });
});
/* ===========================================================
   RESIZABLE LEFT + RIGHT PANELS
=========================================================== */

(function () {
  const leftPanel = document.querySelector("#leftPanelContainer");
  const rightPanel = document.querySelector(".right-panel");

  const leftHandle = document.getElementById("leftPanelResize");
  const rightHandle = document.getElementById("rightPanelResize");

  let resizingLeft = false;
  let resizingRight = false;

  /* ---------------- LEFT PANEL DRAG ---------------- */
  leftHandle.addEventListener("mousedown", () => {
    resizingLeft = true;
    document.body.style.userSelect = "none";
  });

  /* ---------------- RIGHT PANEL DRAG ---------------- */
  rightHandle.addEventListener("mousedown", () => {
    resizingRight = true;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (resizingLeft) {
      let newWidth = e.clientX;
      if (newWidth < 150) newWidth = 150;
      if (newWidth > 380) newWidth = 380;
      leftPanel.style.width = newWidth + "px";
    }

    if (resizingRight) {
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 160) newWidth = 160;
      if (newWidth > 420) newWidth = 420;
      rightPanel.style.width = newWidth + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    resizingLeft = false;
    resizingRight = false;
    document.body.style.userSelect = "auto";
  });
})();
