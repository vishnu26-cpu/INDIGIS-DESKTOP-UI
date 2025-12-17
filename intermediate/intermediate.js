/* =====================================================
   GLOBAL APP STATE
===================================================== */
const AppState = {
  theme: localStorage.getItem("theme") || "dark",
  mode: "intermediate"
};

/* =====================================================
   THEME HANDLING
===================================================== */
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(`theme-${theme}`);
  themeBtn.textContent = theme === "dark" ? "🌙" : "🌞";
  localStorage.setItem("theme", theme);
}

themeBtn?.addEventListener("click", () => {
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  applyTheme(AppState.theme);
});

// Init theme
applyTheme(AppState.theme);

/* =====================================================
   MODE SWITCH
===================================================== */
function switchMode(mode) {
  if (!mode) return;
  window.location.href = `../${mode}/${mode}.html`;
}

/* =====================================================
   RIGHT PANEL TABS (PROPERTIES)
===================================================== */
const rpTabs = document.querySelectorAll(".rp-tab");
const rpViews = document.querySelectorAll(".rp-view");

rpTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    rpTabs.forEach(t => t.classList.remove("active"));
    rpViews.forEach(v => v.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`rp-${target}`)?.classList.add("active");
  });
});

/* =====================================================
   LEFT PANEL ACCORDION (UNCHANGED LOGIC, CLEANED)
===================================================== */
document.querySelectorAll(".lp-section-title").forEach(title => {
  title.addEventListener("click", () => {
    const current = title.parentElement;

    document.querySelectorAll(".lp-section").forEach(section => {
      if (section !== current) section.classList.remove("open");
    });

    current.classList.toggle("open");
  });
});

/* =====================================================
   TOOL SELECTION HIGHLIGHT (UI ONLY)
===================================================== */
document.querySelectorAll(".lp-tool").forEach(tool => {
  tool.addEventListener("click", () => {
    document
      .querySelectorAll(".lp-tool.active")
      .forEach(t => t.classList.remove("active"));

    tool.classList.add("active");

    // Hook for future logic
    onToolSelected(tool.textContent.trim());
  });
});

function onToolSelected(toolName) {
  console.log(`[TOOL SELECTED]: ${toolName}`);
}

/* =====================================================
   MAP PLACEHOLDER READOUT (SAFE)
===================================================== */
const coordEl = document.getElementById("coordReadout");
const zoomEl = document.getElementById("zoomReadout");

/* 
  NOTE:
  Actual OpenLayers/Cesium map init will plug in here.
  This avoids runtime errors when map is not ready.
*/
function updateCoordinates(lat, lon) {
  if (!coordEl) return;
  coordEl.textContent = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
}

function updateZoom(zoom) {
  if (!zoomEl) return;
  zoomEl.textContent = `Zoom: ${zoom.toFixed(2)}`;
}

/* =====================================================
   INTERMEDIATE EXTENSION HOOKS
===================================================== */
window.runIntermediateTool = function (toolName) {
  console.log("[INTERMEDIATE TOOL]", toolName);

  const processingPanel = document.getElementById("rp-processing");
  if (processingPanel) {
    processingPanel.innerHTML += `<p>▶ ${toolName} executed</p>`;
  }
};
