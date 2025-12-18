// =============================
// THEME
// =============================
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

// =============================
// MODE SWITCH
// =============================
function switchMode(mode) {
  location.href = `../${mode}/${mode}.html`;
}

// =============================
// ADVANCED TOOL DEFINITIONS
// =============================
const advancedTools = {
  terrain: [
    "Viewshed",
    "Line of Sight",
    "Terrain Profile",
    "Radar Dome"
  ],
  raster: [
    "NDVI / NDWI",
    "Supervised Classification",
    "Unsupervised Classification",
    "Change Detection"
  ],
  lidar: [
    "LAS Import",
    "DEM / DSM",
    "Contours",
    "Canopy Height Model"
  ],
  sar: [
    "Speckle Filter",
    "Terrain Correction",
    "Flood Mapping"
  ],
  analysis: [
    "Network Analysis",
    "Hotspot Analysis",
    "Spatial Statistics"
  ],
  python: [
    "Run Python Script",
    "Batch Processing",
    "Model Builder"
  ],
  ai: [
    "Object Detection",
    "Smart Change Detection",
    "Auto Feature Extraction"
  ]
};

// =============================
// LEFT → RIGHT TOOL LOADING
// =============================
const domainButtons = document.querySelectorAll(".adv-domain");
const panel = document.getElementById("advancedToolPanel");

domainButtons.forEach(btn => {
  btn.onclick = () => {
    domainButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const domain = btn.dataset.domain;
    panel.innerHTML = `<h4>${btn.textContent}</h4>`;

    advancedTools[domain].forEach(tool => {
      const t = document.createElement("button");
      t.className = "adv-tool";
      t.textContent = tool;
      t.onclick = () => alert(`${tool}\n(UI only – backend later)`);
      panel.appendChild(t);
    });

    // switch to Processing tab automatically
    document.querySelector('[data-tab="processing"]').click();
  };
});

// =============================
// RIGHT PANEL TABS
// =============================
document.querySelectorAll(".rp-tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".rp-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".rp-view").forEach(v => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("rp-" + tab.dataset.tab).classList.add("active");
  };
});
document.querySelectorAll(".lp-domain-title").forEach(btn => {
  btn.addEventListener("click", () => {
    const domain = btn.parentElement;

    // close others (optional but pro)
    document.querySelectorAll(".lp-domain").forEach(d => {
      if (d !== domain) d.classList.remove("open");
    });

    domain.classList.toggle("open");
  });
});

// tool click placeholder
document.querySelectorAll(".lp-tool").forEach(tool => {
  tool.addEventListener("click", () => {
    console.log("[ADVANCED TOOL]", tool.textContent);
  });
});
