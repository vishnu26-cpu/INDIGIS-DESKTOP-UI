(function guardIntermediate() {
  const wsRaw = localStorage.getItem('indigis_workspace_data');

  if (!wsRaw) {
    alert('No workspace found. Please create a workspace.');
    window.location.href = '../workspace.html';
    return;
  }

  const ws = JSON.parse(wsRaw);

  if (ws.userMode !== 'intermediate' && ws.userMode !== 'advanced') {
    alert('You do not have access to Intermediate mode.');
    window.location.href = `../${ws.userMode}/${ws.userMode}.html`;
  }
})();
/* =============================
   THEME
============================= */
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

/* =============================
   MODE SWITCH
============================= */
function switchMode(mode) {
  location.href = `../${mode}/${mode}.html`;
}

/* =============================
   MAP INIT
============================= */
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([78.96, 20.59]),
    zoom: 4
  })
});

map.on("pointermove", e => {
  const [lon, lat] = ol.proj.toLonLat(e.coordinate);
  document.getElementById("coordReadout").textContent =
    `Lat: ${lat.toFixed(4)} , Lon: ${lon.toFixed(4)}`;
});

map.getView().on("change:resolution", () => {
  document.getElementById("zoomReadout").textContent =
    `Zoom: ${map.getView().getZoom().toFixed(2)}`;
});

/* =============================
   TOOLBOX LOGIC
============================= */
const toolsByDomain = {
  vector: ["Buffer", "Clip", "Intersect", "Union", "Dissolve"],
  raster: ["Raster Calculator", "Reclassify", "Zonal Statistics"],
  interpolation: ["IDW", "Kriging", "Spline"],
  suitability: ["Weighted Overlay", "Site Suitability"]
};

document.querySelectorAll(".lp-section-title[data-domain]")
  .forEach(btn => {
    btn.onclick = () => {
      const domain = btn.dataset.domain;
      const list = document.getElementById("toolList");
      document.getElementById("toolboxTitle").textContent =
        domain.toUpperCase() + " TOOLS";

      list.innerHTML = "";
      toolsByDomain[domain].forEach(t => {
        const div = document.createElement("div");
        div.className = "tool-card";
        div.textContent = t;
        list.appendChild(div);
      });
    };
  });

/* =============================
   TOOLBOX CLOSE
============================= */
document.getElementById("rpCloseBtn").onclick = () => {
  document.getElementById("toolboxPanel").style.display = "none";
};
