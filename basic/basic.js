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
// RIGHT PANEL TABS (UNCHANGED LOGIC)
// =============================
document.querySelectorAll('.rp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.rp-view').forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('rp-' + tab.dataset.tab).classList.add('active');
  });
});

// =============================
// RIGHT PANEL CLOSE + REOPEN (FIXED)
// =============================
const rightPanel = document.getElementById('rightPanel');
const closeBtn = document.getElementById('rpCloseBtn');
const openBtn = document.getElementById('openRightPanelBtn');

closeBtn.addEventListener('click', () => {
  rightPanel.classList.add('hidden');
});

openBtn.addEventListener('click', () => {
  rightPanel.classList.remove('hidden');
});
// =============================
// 2D MAP (OpenLayers - OSM)
// =============================
const map2d = new ol.Map({
  target: 'map2d',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([78.9629, 20.5937]), // India
    zoom: 4
  })
});

// =============================
// 3D MAP (Cesium)
// =============================
const viewer3d = new Cesium.Viewer('map3d', {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  sceneModePicker: false
});

// =============================
// MAP READOUTS
// =============================
const coordReadout = document.getElementById('coordReadout');
const zoomReadout = document.getElementById('zoomReadout');
const modeReadout = document.getElementById('modeReadout');

// Mouse move (2D)
map2d.on('pointermove', evt => {
  const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
  coordReadout.textContent =
    `Lat: ${lat.toFixed(5)} , Lon: ${lon.toFixed(5)}`;
});

// Zoom readout
map2d.getView().on('change:resolution', () => {
  zoomReadout.textContent =
    `Zoom: ${map2d.getView().getZoom().toFixed(2)}`;
});

// =============================
// 2D / 3D TOGGLE
// =============================
const btn2d = document.querySelector('.toggle button:nth-child(1)');
const btn3d = document.querySelector('.toggle button:nth-child(2)');

btn2d.addEventListener('click', () => {
  document.getElementById('map2d').classList.remove('hidden');
  document.getElementById('map3d').classList.add('hidden');
  btn2d.classList.add('active');
  btn3d.classList.remove('active');
  modeReadout.textContent = 'Mode: 2D';
});

btn3d.addEventListener('click', () => {
  document.getElementById('map3d').classList.remove('hidden');
  document.getElementById('map2d').classList.add('hidden');
  btn3d.classList.add('active');
  btn2d.classList.remove('active');
  modeReadout.textContent = 'Mode: 3D';
});
