/* ===========================================================
   INTERACTIONS.JS — COMPLETE WORKING + LOGGING ENABLED
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c[INIT] DOM Loaded — Starting UI Engine", "color:#4D9FFF;font-weight:bold;");

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

    console.log("%c[THEME] Switched to → " + name, "color:#FFD75F;font-weight:bold;");
    localStorage.setItem("indigis.theme", name);
  }

  const savedTheme = localStorage.getItem("indigis.theme") || "dark";
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = localStorage.getItem("indigis.theme") || "dark";
      const next = current === "dark" ? "light" : "dark";

      console.log("%c[THEME] Button Clicked — Toggling", "color:#88E1FF;");
      applyTheme(next);
    });
  }


  /* ---------------------------------------------------------
      LOGOUT HANDLER
  --------------------------------------------------------- */
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("%c[AUTH] Logging Out...", "color:#FF6B6B;font-weight:bold;");
      localStorage.removeItem("indigis_logged_in");
      window.location.href = "index.html";
    });
  }


  /* ---------------------------------------------------------
      COORDINATE FAKE UPDATE (for UI)
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
   LEFT PANEL — Accordion + Tool Clicks + Search
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
    const sectionName = header.textContent.trim();

    header.addEventListener("click", () => {
      const isOpen = list.getAttribute("aria-hidden") === "false";
      list.setAttribute("aria-hidden", isOpen ? "true" : "false");

      console.log(
        `%c[LEFT PANEL] ${sectionName} → ${isOpen ? "Collapsed" : "Expanded"}`,
        "color:#9ADAFF;"
      );
    });
  });

  /* ----------------- TOOL BUTTON CLICK ----------------- */
  qsa(".tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa(".tool-btn.active").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");

      console.log(
        `%c[TOOL] Selected → ${btn.textContent.trim()}`,
        "color:#A6FF7A;font-weight:bold;"
      );
    });
  });

  /* ----------------- SEARCH FILTER ----------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      console.log("%c[SEARCH] Query → " + q, "color:#FFD1A9;");

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

      console.log("%c[RIGHT PANEL] Switched Tab → " + tab.dataset.tab, "color:#FF9EFF;");
    });
  });
});

/* ===========================================================
   RESIZABLE PANELS — LEFT + RIGHT
=========================================================== */

(function () {
  const leftPanel = document.querySelector("#leftPanelContainer");
  const rightPanel = document.querySelector(".right-panel");

  const leftHandle = document.getElementById("leftPanelResize");
  const rightHandle = document.getElementById("rightPanelResize");

  let resizingLeft = false;
  let resizingRight = false;

  /* -------- LEFT DRAG -------- */
  if (leftHandle) {
    leftHandle.addEventListener("mousedown", () => {
      resizingLeft = true;
      document.body.style.userSelect = "none";
      console.log("%c[RESIZE] Left Panel — Start", "color:#67E6DC;");
    });
  }

  /* -------- RIGHT DRAG -------- */
  if (rightHandle) {
    rightHandle.addEventListener("mousedown", () => {
      resizingRight = true;
      document.body.style.userSelect = "none";
      console.log("%c[RESIZE] Right Panel — Start", "color:#67DCFF;");
    });
  }

  document.addEventListener("mousemove", (e) => {
    if (resizingLeft) {
      let newWidth = e.clientX;
      if (newWidth < 150) newWidth = 150;
      if (newWidth > 380) newWidth = 380;
      leftPanel.style.width = newWidth + "px";

      console.log("[RESIZE] Left Panel → " + newWidth + "px");
    }

    if (resizingRight) {
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 150) newWidth = 150;
      if (newWidth > 420) newWidth = 420;
      rightPanel.style.width = newWidth + "px";

      console.log("[RESIZE] Right Panel → " + newWidth + "px");
    }
  });

  document.addEventListener("mouseup", () => {
    if (resizingLeft || resizingRight)
      console.log("%c[RESIZE] Panels — End", "color:#8AFFC1;");

    resizingLeft = false;
    resizingRight = false;
    document.body.style.userSelect = "auto";
  });

})();
