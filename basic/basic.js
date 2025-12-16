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
