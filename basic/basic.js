document.addEventListener("DOMContentLoaded", () => {

  /* THEME */
  const btn = document.getElementById("themeToggle");
  let theme = localStorage.getItem("theme") || "dark";
  applyTheme(theme);

  btn.onclick = () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
  };

  function applyTheme(t) {
    document.body.className = "theme-" + t;
    btn.textContent = t === "dark" ? "🌙" : "🌞";
    localStorage.setItem("theme", t);
  }

  /* LOGOUT */
  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("indigis_logged_in");
    location.href = "index.html";
  };
});

/* MODE SWITCH */
function switchMode(mode) {
  location.href = mode + ".html";
}
// =============================
// LEFT PANEL INTERACTIONS
// =============================

// Accordion toggle
document.querySelectorAll('.lp-section-title').forEach(title => {
  title.addEventListener('click', () => {
    const tools = title.nextElementSibling;
    const isOpen = tools.style.display !== 'none';
    tools.style.display = isOpen ? 'none' : 'block';
  });
});

// Tool selection highlight
document.querySelectorAll('.lp-tool').forEach(tool => {
  tool.addEventListener('click', () => {
    document
      .querySelectorAll('.lp-tool.active')
      .forEach(t => t.classList.remove('active'));

    tool.classList.add('active');

    console.log('[BASIC TOOL]', tool.textContent);
  });
});
// =============================
// RIGHT PANEL TABS
// =============================

document.querySelectorAll('.rp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rp-tab').forEach(t =>
      t.classList.remove('active')
    );
    document.querySelectorAll('.rp-view').forEach(v =>
      v.classList.remove('active')
    );

    tab.classList.add('active');
    document
      .getElementById('rp-' + tab.dataset.tab)
      .classList.add('active');
  });
});

// =============================
// RIGHT PANEL COLLAPSE
// =============================

const rightPanel = document.querySelector('.right-panel');
const closeBtn = document.getElementById('rpCloseBtn');

closeBtn.addEventListener('click', () => {
  rightPanel.style.display =
    rightPanel.style.display === 'none' ? 'flex' : 'none';
});
