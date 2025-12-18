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
let theme = localStorage.getItem("theme") || "dark";

applyTheme(theme);

themeBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

function applyTheme(t) {
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add("theme-" + t);
  themeBtn.textContent = t === "dark" ? "🌙" : "🌞";
}


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


document.querySelectorAll(".dropdown > button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const dropdown = btn.parentElement;

    // Close other open dropdowns
    document.querySelectorAll(".dropdown.open").forEach((d) => {
      if (d !== dropdown) d.classList.remove("open");
    });

    // Toggle current
    dropdown.classList.toggle("open");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  document
    .querySelectorAll(".dropdown.open")
    .forEach((d) => d.classList.remove("open"));
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
const btn2d = document.getElementById("btn2d");
const btn3d = document.getElementById("btn3d");

const map2d = document.getElementById("map2d");
const map3d = document.getElementById("map3d");
const modeReadout = document.getElementById("modeReadout");

btn2d.addEventListener("click", () => {
  map2d.classList.remove("hidden");
  map3d.classList.add("hidden");

  btn2d.classList.add("active");
  btn3d.classList.remove("active");

  modeReadout.textContent = "Mode: 2D";
});

btn3d.addEventListener("click", () => {
  map3d.classList.remove("hidden");
  map2d.classList.add("hidden");

  btn3d.classList.add("active");
  btn2d.classList.remove("active");

  modeReadout.textContent = "Mode: 3D";
});
