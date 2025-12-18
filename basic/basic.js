document.addEventListener("DOMContentLoaded", () => {

  /* THEME */
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

/* =============================
   LEFT PANEL
============================= */
document.querySelectorAll('.lp-section-title').forEach(title => {
  title.addEventListener('click', () => {
    const tools = title.nextElementSibling;
    tools.style.display =
      tools.style.display === 'none' ? 'block' : 'none';
  });
});

document.querySelectorAll('.lp-tool').forEach(tool => {
  tool.addEventListener('click', () => {
    document.querySelectorAll('.lp-tool.active')
      .forEach(t => t.classList.remove('active'));
    tool.classList.add('active');
  });
});

/* =============================
   RIGHT PANEL TABS
============================= */
document.querySelectorAll('.rp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.rp-view').forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('rp-' + tab.dataset.tab).classList.add('active');
  });
});

/* =============================
   RIGHT PANEL OPEN / CLOSE
============================= */
// =============================
// RIGHT PANEL OPEN / CLOSE
// =============================
const rightPanel = document.getElementById('rightPanel');
const closeBtn = document.getElementById('rpCloseBtn');
const openBtn = document.getElementById('openRightPanelBtn');

// Close (hide)
closeBtn.addEventListener('click', () => {
  rightPanel.classList.add('hidden');
});

// Open (show)
openBtn.addEventListener('click', () => {
  rightPanel.classList.remove('hidden');
});

/* =============================
   2D MAP (OpenLayers)
============================= */
const map2d = new ol.Map({
  target: 'map2d',
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([78.9629, 20.5937]),
    zoom: 4
  })
});

map2d.addControl(new ol.control.ScaleLine({ units: 'metric' }));

/* =============================
   3D MAP (Cesium)
============================= */
const viewer3d = new Cesium.Viewer('map3d', {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  sceneModePicker: false
});

/* =============================
   READOUTS
============================= */
const coordReadout = document.getElementById('coordReadout');
const zoomReadout = document.getElementById('zoomReadout');
const modeReadout = document.getElementById('modeReadout');

map2d.on('pointermove', evt => {
  const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
  coordReadout.textContent = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
});

map2d.getView().on('change:resolution', () => {
  zoomReadout.textContent = `Zoom: ${map2d.getView().getZoom().toFixed(2)}`;
});

viewer3d.camera.changed.addEventListener(() => {
  const h = Math.round(viewer3d.camera.positionCartographic.height);
  zoomReadout.textContent = `Height: ${h} m`;
});

/* =============================
   2D / 3D TOGGLE
============================= */
const map2dEl = document.getElementById("map2d");
const map3dEl = document.getElementById("map3d");
const modeReadoutEl = document.getElementById("modeReadout");

const btn2d = document.getElementById("btn2d");
const btn3d = document.getElementById("btn3d");

btn2d.addEventListener("click", () => {
  map2dEl.classList.remove("hidden");
  map3dEl.classList.add("hidden");

  btn2d.classList.add("active");
  btn3d.classList.remove("active");

  modeReadoutEl.textContent = "Mode: 2D";
});

btn3d.addEventListener("click", () => {
  map3dEl.classList.remove("hidden");
  map2dEl.classList.add("hidden");

  btn3d.classList.add("active");
  btn2d.classList.remove("active");

  modeReadoutEl.textContent = "Mode: 3D";
});

