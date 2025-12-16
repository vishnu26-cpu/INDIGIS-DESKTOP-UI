/* ===========================================================
   INTERACTIONS.JS — COMPLETE WORKING + LOGGING ENABLED
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%c[INIT] DOM Loaded — Starting UI Engine",
    "color:#4D9FFF;font-weight:bold;"
  );

  /* ---------------------------------------------------------
      THEME SWITCHER  (Light / Dark)
  --------------------------------------------------------- */
  const themeBtn = document.getElementById("themeToggle");

  function applyTheme(name) {
    document.body.classList.remove("theme-light", "theme-dark");

    if (name === "light") {
      document.body.classList.add("theme-light");
      if (themeBtn) themeBtn.textContent = "🌞";
    } else {
      document.body.classList.add("theme-dark");
      if (themeBtn) themeBtn.textContent = "🌙";
    }

    console.log(
      "%c[THEME] Switched to → " + name,
      "color:#FFD75F;font-weight:bold;"
    );
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
      console.log(
        "%c[AUTH] Logging Out...",
        "color:#FF6B6B;font-weight:bold;"
      );
      localStorage.removeItem("indigis_logged_in");
      window.location.href = "index.html";
    });
  }

  /* ---------------------------------------------------------
      COORDINATE FAKE UPDATE (UI ONLY)
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

(function () {
  function qs(s) {
    return document.querySelector(s);
  }
  function qsa(s) {
    return [...document.querySelectorAll(s)];
  }

  const sections = qsa(".tool-section");
  const searchInput = qs("#lpSearch");

  /* ----------------- ACCORDION ----------------- */
  sections.forEach((sec) => {
    const header = sec.querySelector(".section-header");
    const list = sec.querySelector(".tool-list");

    if (!header || !list) return;

    header.addEventListener("click", () => {
      const isOpen = list.getAttribute("aria-hidden") === "false";
      list.setAttribute("aria-hidden", isOpen ? "true" : "false");

      console.log(
        `%c[LEFT PANEL] ${header.textContent.trim()} → ${
          isOpen ? "Collapsed" : "Expanded"
        }`,
        "color:#9ADAFF;"
      );
    });
  });

  /* ----------------- TOOL BUTTON CLICK ----------------- */
  qsa(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      qsa(".tool-btn.active").forEach((x) =>
        x.classList.remove("active")
      );
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

      sections.forEach((section) => {
        const buttons = section.querySelectorAll(".tool-btn");
        let visible = false;

        buttons.forEach((btn) => {
          const match = btn.textContent.toLowerCase().includes(q);
          btn.parentElement.style.display = match ? "" : "none";
          if (match) visible = true;
        });

        section.querySelector(".tool-list").style.display = visible
          ? "block"
          : "none";
      });
    });
  }
})();

/* ===========================================================
   RIGHT PANEL — Tabs + Layers Toggle
   (CALLED AFTER right-panel.html IS LOADED)
=========================================================== */

function initRightPanel() {
  const tabs = document.querySelectorAll(".rp-tab");
  const views = document.querySelectorAll(".rp-view");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      views.forEach((v) => v.classList.add("hidden"));

      tab.classList.add("active");
      const panelId = "rp-" + tab.dataset.tab;
      document.getElementById(panelId)?.classList.remove("hidden");
    });
  });

  document
    .getElementById("openLayersBtn")
    ?.addEventListener("click", () => {
      document
        .getElementById("layersPanel")
        ?.classList.remove("hidden");
    });

  document
    .getElementById("closeLayersBtn")
    ?.addEventListener("click", () => {
      document
        .getElementById("layersPanel")
        ?.classList.add("hidden");
    });

  console.log("%c[RIGHT PANEL] Ready ✔️", "color:#6CFFB5;");
}

/* ===========================================================
   RIGHT PANEL — RESIZE (CALLED AFTER LOAD)
=========================================================== */

function initRightPanelResize() {
  const rightPanel = document.querySelector(".right-panel");
  const rightHandle = document.getElementById("rightPanelResize");

  if (!rightPanel || !rightHandle) return;

  let resizing = false;

  rightHandle.addEventListener("mousedown", () => {
    resizing = true;
    document.body.style.userSelect = "none";
    console.log("%c[RESIZE] Right Panel — Start", "color:#67DCFF;");
  });

  document.addEventListener("mousemove", (e) => {
    if (!resizing) return;

    let newWidth = window.innerWidth - e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 420) newWidth = 420;
    rightPanel.style.width = newWidth + "px";
  });

  document.addEventListener("mouseup", () => {
    if (resizing) {
      console.log("%c[RESIZE] Right Panel — End", "color:#8AFFC1;");
    }
    resizing = false;
    document.body.style.userSelect = "auto";
  });
}
