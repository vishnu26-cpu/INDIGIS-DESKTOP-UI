// =============================
// THEME
// =============================
const themeBtn = document.getElementById("themeToggle");
let theme = localStorage.getItem("theme") || "dark";
applyTheme(theme);

themeBtn.onclick = () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
};

function applyTheme(t) {
  document.body.className = "theme-" + t;
  themeBtn.textContent = t === "dark" ? "🌙" : "🌞";
}

// =============================
// MODE SWITCH
// =============================
function switchMode(mode) {
  location.href = `../${mode}/${mode}.html`;
}

// =============================
// MAP INIT (SAME AS BASIC)
// =============================
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([78.96, 20.59]),
    zoom: 4
  })
});

// =============================
// MAP READOUTS
// =============================
map.on("pointermove", e => {
  const [lon, lat] = ol.proj.toLonLat(e.coordinate);
  document.getElementById("coordReadout").textContent =
    `Lat: ${lat.toFixed(4)} , Lon: ${lon.toFixed(4)}`;
});

map.getView().on("change:resolution", () => {
  document.getElementById("zoomReadout").textContent =
    `Zoom: ${map.getView().getZoom().toFixed(2)}`;
});

// =============================
// RIGHT PANEL TABS (PROPERTIES)
// =============================
document.querySelectorAll(".rp-tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".rp-tab")
      .forEach(t => t.classList.remove("active"));

    document.querySelectorAll(".rp-view")
      .forEach(v => v.classList.remove("active"));

    tab.classList.add("active");
    document
      .getElementById("rp-" + tab.dataset.tab)
      .classList.add("active");
  };
});

// =============================
// LEFT PANEL ACCORDION
// =============================
// =============================
// LEFT PANEL – CLICK DROPDOWN ONLY
// =============================
document.querySelectorAll(".lp-section-title").forEach(title => {
  title.addEventListener("click", () => {
    const section = title.parentElement;

    // close others (optional, desktop-style)
    document.querySelectorAll(".lp-section").forEach(sec => {
      if (sec !== section) sec.classList.remove("open");
    });

    // toggle current
    section.classList.toggle("open");
  });
});


// =============================
// TOOL SELECTION HIGHLIGHT
// =============================
document.querySelectorAll(".lp-tool").forEach(tool => {
  tool.onclick = () => {
    document
      .querySelectorAll(".lp-tool.active")
      .forEach(t => t.classList.remove("active"));

    tool.classList.add("active");
  };
});

// =============================
// PROCESSING TOOLS (UI ONLY)
// =============================
document.querySelectorAll(".proc-tool").forEach(btn => {
  btn.onclick = () => {
    alert(
      `Tool selected: ${btn.textContent}\n(Logic will be added later)`
    );
  };
});

/* ======================================================
   INTERMEDIATE EXTENSIONS (SAFE ADDITIONS ONLY)
====================================================== */

// Placeholder hook for future analysis tools
window.runIntermediateTool = function (toolName) {
  console.log("[INTERMEDIATE TOOL]", toolName);
  alert(`Running ${toolName}\n(backend logic later)`);
};
