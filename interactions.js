/* ===========================================================
   INTERACTIONS.JS — CLEANED + FULLY CORRECTED
   WORKING THEME SWITCH • LEFT PANEL • RIGHT PANEL • RESIZERS
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
      THEME SWITCHER  (Light / Dark)
  --------------------------------------------------------- */
  const themeBtn = document.getElementById("themeToggle");

  function applyTheme(name) {
    document.body.classList.remove("theme-light", "theme-dark");

    if (name === "light") {
      document.body.classList.add("theme-light");
      themeBtn.textContent = "🌞";
    } else {
      document.body.classList.add("theme-dark");
      themeBtn.textContent = "🌙";
    }

    localStorage.setItem("indigis.theme", name);
  }

  const savedTheme = localStorage.getItem("indigis.theme") || "dark";
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = localStorage.getItem("indigis.theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }


  /* ---------------------------------------------------------
      LOGOUT HANDLER
  --------------------------------------------------------- */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("indigis_logged_in");
      window.location.href = "index.html";
    });
  }


  /* ---------------------------------------------------------
      COORDS DEMO (FAKE until map loads)
  --------------------------------------------------------- */
  const coordsEl = document.getElementById("coords");
  if (coordsEl) {
    setInterval(() => {
      const now = new Date();
      coordsEl.textContent = `Lat: -- , Lon: -- • ${now.toLocaleTimeString()}`;
    }, 1000);
  }

});

/* ===========================================================
      LEFT PANEL (Accordion + Search + Tool Activation)
=========================================================== */

(function() {
  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return [...document.querySelectorAll(s)]; }

  const sections = qsa(".tool-section");
  const searchInput = qs("#lpSearch");

  /* ----------------- ACCORDION ----------------- */
  sections.forEach(sec => {
    const header = sec.querySelector(".section-header");
    const list = sec.querySelector(".tool-list");

    header.addEventListener("click", () => {
      const isOpen = list.getAttribute("aria-hidden") === "false";
      list.setAttribute("aria-hidden", isOpen ? "true" : "false");
    });
  });

  /* ----------------- TOOL BUTTON CLICK ----------------- */
  qsa(".tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa(".tool-btn.active").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");

      console.log("Tool clicked:", btn.textContent.trim());
    });
  });

  /* ----------------- SEARCH FILTER ----------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();

      sections.forEach(section => {
        const buttons = section.querySelectorAll(".tool-btn");
        let visible = false;

        buttons.forEach(btn => {
          const match = btn.textContent.toLowerCase().includes(q);
          btn.parentElement.style.display = match ? "" : "none";
          if (match) visible = true;
        });

        section.querySelector(".tool-list").style.display = visible ? "block" : "none";
      });
    });
  }

})();

/* ===========================================================
      RIGHT PANEL — TAB SWITCHING
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".rp-tab");
  const views = document.querySelectorAll(".rp-view");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      views.forEach(v => v.classList.add("hidden"));

      tab.classList.add("active");
      const id = "rp-" + tab.dataset.tab;
      document.getElementById(id).classList.remove("hidden");
    });
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
  if (leftHandle) {
    leftHandle.addEventListener("mousedown", () => {
      resizingLeft = true;
      document.body.style.userSelect = "none";
    });
  }

  /* ---------------- RIGHT PANEL DRAG ---------------- */
  if (rightHandle) {
    rightHandle.addEventListener("mousedown", () => {
      resizingRight = true;
      document.body.style.userSelect = "none";
    });
  }

  document.addEventListener("mousemove", (e) => {
    if (resizingLeft) {
      let newWidth = e.clientX;
      if (newWidth < 150) newWidth = 150;
      if (newWidth > 380) newWidth = 380;
      leftPanel.style.width = newWidth + "px";
    }

    if (resizingRight) {
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 150) newWidth = 150;
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
