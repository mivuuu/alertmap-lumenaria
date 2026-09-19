const REGIONS = [
  { id: 1, name: "Иудея" },
  { id: 2, name: "Салабимия" },
  { id: 3, name: "Эндор" },
  { id: 4, name: "Калантия" },
  { id: 5, name: "Гесперия" },
  { id: 6, name: "Ориентия" },
  { id: 7, name: "Люциния" },
  { id: 8, name: "Сидерия" },
  { id: 9, name: "Наяда" },
  { id: 10, name: "Клерополь", capital: true },
  { id: 11, name: "Солария" },
  { id: 12, name: "Селения" },
  { id: 13, name: "Аргезия" },
  { id: 14, name: "Нереида" },
  { id: 15, name: "Альтерия" },
  { id: 16, name: "Сильвания" },
  { id: 17, name: "Таврия" },
  { id: 18, name: "Валентия" },
  { id: 19, name: "Иллирия" },
  { id: 20, name: "Астралия" },
  { id: 21, name: "Лимнида" },
  { id: 22, name: "Небулия" },
  { id: 23, name: "Кастелия" },
  { id: 24, name: "Медиолания" },
  { id: 25, name: "Окцидентия" },
  { id: 26, name: "Виридия" },
  { id: 27, name: "Тенебрия" },
  { id: 28, name: "Монтания" },
  { id: 29, name: "Мариния" },
  { id: 30, name: "Меридиония" },
  { id: 31, name: "Эстерия" },
  { id: 32, name: "Джаннат-аль-Амн" },
  { id: 33, name: "Ойл" },
  { id: 34, name: "Гесперидия" }
];

const REGION_RISK = {
  1: { zone: "very deep rear", yellow: 0.18, red: 0.07 },
  2: { zone: "very deep rear", yellow: 0.20, red: 0.08 },
  3: { zone: "deep rear", yellow: 0.32, red: 0.15 },
  4: { zone: "frontline", yellow: 1.80, red: 1.60 },
  5: { zone: "frontline", yellow: 1.70, red: 1.50 },
  6: { zone: "near-front", yellow: 1.20, red: 1.00 },
  7: { zone: "near-front", yellow: 1.05, red: 0.85 },
  8: { zone: "middle depth", yellow: 0.58, red: 0.35 },
  9: { zone: "middle depth", yellow: 0.55, red: 0.32 },
  10: { zone: "middle depth / capital", yellow: 0.65, red: 1.10 },
  11: { zone: "middle depth", yellow: 0.50, red: 0.28 },
  12: { zone: "deep rear", yellow: 0.30, red: 0.14 },
  13: { zone: "middle depth", yellow: 0.55, red: 0.34 },
  14: { zone: "near-front", yellow: 1.00, red: 0.78 },
  15: { zone: "frontline", yellow: 1.85, red: 1.70 },
  16: { zone: "frontline", yellow: 1.80, red: 1.65 },
  17: { zone: "frontline", yellow: 1.90, red: 1.75 },
  18: { zone: "frontline", yellow: 1.70, red: 1.50 },
  19: { zone: "near-front", yellow: 1.10, red: 0.90 },
  20: { zone: "frontline / southern frontline", yellow: 1.65, red: 1.45 },
  21: { zone: "near-front / operational rear", yellow: 0.85, red: 0.60 },
  22: { zone: "middle depth", yellow: 0.62, red: 0.38 },
  23: { zone: "deep rear", yellow: 0.34, red: 0.16 },
  24: { zone: "deep rear", yellow: 0.26, red: 0.11 },
  25: { zone: "very deep rear", yellow: 0.16, red: 0.06 },
  26: { zone: "very deep rear", yellow: 0.18, red: 0.07 },
  27: { zone: "very deep rear", yellow: 0.15, red: 0.05 },
  28: { zone: "deep rear / middle depth", yellow: 0.38, red: 0.18 },
  29: { zone: "very deep rear", yellow: 0.18, red: 0.07 },
  30: { zone: "deep rear", yellow: 0.28, red: 0.12 },
  31: { zone: "deep rear", yellow: 0.30, red: 0.13 },
  32: { zone: "very deep rear", yellow: 0.20, red: 0.08 },
  33: { zone: "remote island", yellow: 0.08, red: 0.025 },
  34: { zone: "very deep rear", yellow: 0.22, red: 0.09 }
};

// Only shared SVG land borders count. Offshore regions intentionally have no neighbors.
const REGION_NEIGHBORS = {
  1: [], 2: [], 3: [8, 9, 11, 12, 34], 4: [5, 15],
  5: [4, 6, 15, 16], 6: [5, 7, 8, 16],
  7: [6, 8, 9, 10, 11, 14, 16, 17], 8: [3, 6, 7, 9],
  9: [3, 7, 8, 10, 11], 10: [7, 9, 11],
  11: [3, 7, 9, 10, 12, 13, 14], 12: [3, 11, 13, 22, 23, 34],
  13: [11, 12, 14, 18, 19, 22], 14: [7, 11, 13, 17, 18],
  15: [4, 5, 16], 16: [5, 6, 7, 15, 17],
  17: [7, 14, 16, 18], 18: [13, 14, 17, 19],
  19: [13, 18, 20, 22], 20: [19, 21, 22],
  21: [20, 22, 24, 28], 22: [12, 13, 19, 20, 21, 23, 24],
  23: [12, 22, 24, 25, 34], 24: [21, 22, 23, 25, 26, 27, 28],
  25: [23, 24, 26], 26: [24, 25, 27], 27: [24, 26, 28, 29],
  28: [21, 24, 27, 29, 30], 29: [27, 28, 30], 30: [28, 29, 31],
  31: [30], 32: [], 33: [], 34: [3, 12, 23]
};

const NEIGHBOR_INFLUENCE_BY_ZONE = {
  "frontline": 1,
  "frontline / southern frontline": 1,
  "near-front": 0.85,
  "near-front / operational rear": 0.75,
  "middle depth": 0.35,
  "middle depth / capital": 0.35,
  "deep rear / middle depth": 0.25,
  "deep rear": 0.12,
  "very deep rear": 0.04,
  "remote island": 0
};

// Durations are expressed in five-minute slots. A state can last beyond its
// target, but every continuous alert episode has a deterministic hard limit.
const PERSISTENCE_BY_ZONE = {
  "very deep rear": {
    yellow: [2, 7], red: [3, 9], maxAlertSlots: 24,
    afterYellow: { yellow: 0.20, red: 0.08 },
    afterRed: { yellow: 0.64, red: 0.07 }
  },
  "remote island": {
    yellow: [2, 7], red: [3, 9], maxAlertSlots: 24,
    afterYellow: { yellow: 0.20, red: 0.08 },
    afterRed: { yellow: 0.64, red: 0.07 }
  },
  "deep rear": {
    yellow: [2, 7], red: [3, 9], maxAlertSlots: 24,
    afterYellow: { yellow: 0.20, red: 0.10 },
    afterRed: { yellow: 0.65, red: 0.07 }
  },
  "deep rear / middle depth": {
    yellow: [3, 9], red: [4, 12], maxAlertSlots: 36,
    afterYellow: { yellow: 0.24, red: 0.18 },
    afterRed: { yellow: 0.64, red: 0.12 }
  },
  "middle depth": {
    yellow: [3, 9], red: [4, 12], maxAlertSlots: 36,
    afterYellow: { yellow: 0.25, red: 0.23 },
    afterRed: { yellow: 0.62, red: 0.16 }
  },
  "middle depth / capital": {
    yellow: [3, 9], red: [4, 12], maxAlertSlots: 36,
    afterYellow: { yellow: 0.25, red: 0.23 },
    afterRed: { yellow: 0.62, red: 0.16 }
  },
  "near-front": {
    yellow: [5, 14], red: [6, 18], maxAlertSlots: 72,
    afterYellow: { yellow: 0.38, red: 0.40 },
    afterRed: { yellow: 0.55, red: 0.33 }
  },
  "near-front / operational rear": {
    yellow: [5, 14], red: [6, 18], maxAlertSlots: 72,
    afterYellow: { yellow: 0.38, red: 0.40 },
    afterRed: { yellow: 0.55, red: 0.33 }
  },
  "frontline": {
    yellow: [12, 48], red: [12, 54], maxAlertSlots: 144,
    afterYellow: { yellow: 0.44, red: 0.50 },
    afterRed: { yellow: 0.55, red: 0.41 }
  },
  "frontline / southern frontline": {
    yellow: [12, 48], red: [12, 54], maxAlertSlots: 144,
    afterYellow: { yellow: 0.44, red: 0.50 },
    afterRed: { yellow: 0.55, red: 0.41 }
  }
};

const DEBUG_SIMULATION = false;

const STATUS = {
  clear: { label: "Тревог нет", color: "#34383D", cssVariable: "--status-clear" },
  yellow: { label: "Жёлтый уровень", color: "#E6B94A", cssVariable: "--status-yellow" },
  red: { label: "Красный уровень", color: "#D84C4C", cssVariable: "--status-red" }
};

// Base simulation settings. One time slot lasts five minutes.
const CONFIG = {
  slotMinutes: 5,
  chances: {
    yellow: 0.07,
    red: 0.01
  },
  neighborModifierCap: 1.45,
  probabilityCap: 0.92,
  historySlots: 7 * 24 * 12,
  seed: 217031
};

const THEME_KEY = "lumenaria-theme";
const COLLAPSE_KEY = "lumenaria-threats-collapsed";
const mapObject = document.querySelector("#alarm-map");
const threatsPanel = document.querySelector("#threats-panel");
const threatsToggle = document.querySelector("#threats-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const statisticsDialog = document.querySelector("#statistics-dialog");
let currentStates = [];
let mapDocument = null;
let simulationCache = null;

function hash32(a) {
  a |= 0; a = a + 0x7ed55d16 + (a << 12) | 0; a = (a ^ 0xc761c23c) ^ (a >>> 19);
  a = a + 0x165667b1 + (a << 5) | 0; a = (a + 0xd3a2646c) ^ (a << 9);
  a = a + 0xfd7046c5 + (a << 3) | 0; return ((a ^ 0xb55a4f09) ^ (a >>> 16)) >>> 0;
}

function deterministicRoll(regionId, slot, salt = 0) {
  const mixed = hash32(CONFIG.seed ^ hash32(regionId * 1009) ^ hash32(slot * 7919) ^ salt);
  return mixed / 4294967296;
}

function neighborModifiers(regionId, previousStates) {
  let yellowNeighbors = 0;
  let redNeighbors = 0;
  for (const neighborId of REGION_NEIGHBORS[regionId]) {
    const neighborStatus = previousStates[neighborId].status;
    if (neighborStatus === "yellow") yellowNeighbors++;
    if (neighborStatus === "red") redNeighbors++;
  }

  // Count-based calculation keeps results independent of neighbor array order.
  const rawYellow = Math.min(
    CONFIG.neighborModifierCap,
    1.15 ** yellowNeighbors * 1.25 ** redNeighbors
  );
  const rawRed = Math.min(CONFIG.neighborModifierCap, 1.15 ** redNeighbors);
  const zoneInfluence = NEIGHBOR_INFLUENCE_BY_ZONE[REGION_RISK[regionId].zone];

  return {
    yellow: 1 + (rawYellow - 1) * zoneInfluence,
    red: 1 + (rawRed - 1) * zoneInfluence
  };
}

function stateDurationTarget(regionId, state, profile) {
  const [minimum, maximum] = profile[state.status];
  const salt = state.status === "yellow" ? 0x4f1bbcdc : 0x2c9277b5;
  const roll = deterministicRoll(regionId, state.sinceSlot, salt);
  return minimum + Math.floor(roll * (maximum - minimum + 1));
}

function transitionProbabilities(regionId, previousState, modifiers, slot) {
  const risk = REGION_RISK[regionId];
  const baseYellow = CONFIG.chances.yellow * risk.yellow * modifiers.yellow;
  const baseRed = CONFIG.chances.red * risk.red * modifiers.red;
  if (previousState.status === "clear") {
    return {
      yellow: Math.min(0.24, baseYellow),
      red: Math.min(0.035, baseRed * 0.45)
    };
  }

  const profile = PERSISTENCE_BY_ZONE[risk.zone];
  const alertSinceSlot = previousState.alertSinceSlot ?? previousState.sinceSlot;
  if (slot - alertSinceSlot >= profile.maxAlertSlots) return { yellow: 0, red: 0 };

  const stateAge = slot - previousState.sinceSlot;
  if (stateAge < stateDurationTarget(regionId, previousState, profile)) {
    return previousState.status === "yellow"
      ? { yellow: 1, red: 0 }
      : { yellow: 0, red: 1 };
  }

  return previousState.status === "yellow" ? profile.afterYellow : profile.afterRed;
}

function chooseStatus(regionId, slot, probabilities) {
  const roll = deterministicRoll(regionId, slot, 0x6d2b79f5);
  if (roll < probabilities.red) return "red";
  if (roll < probabilities.red + probabilities.yellow) return "yellow";
  return "clear";
}

function initialStates(cycleStart) {
  return Object.fromEntries(REGIONS.map(region => {
    const clearState = { status: "clear", sinceSlot: cycleStart, alertSinceSlot: null };
    const probabilities = transitionProbabilities(region.id, clearState, { yellow: 1, red: 1 }, cycleStart);
    const status = chooseStatus(region.id, cycleStart, probabilities);
    return [region.id, {
      status,
      sinceSlot: cycleStart,
      alertSinceSlot: status === "clear" ? null : cycleStart
    }];
  }));
}

function simulateStates(slot) {
  if (simulationCache?.slot === slot) return simulationCache;
  const cycleStart = slot - ((slot % CONFIG.historySlots) + CONFIG.historySlots) % CONFIG.historySlots;
  let states = initialStates(cycleStart);
  let debugRows = [];
  for (let currentSlot = cycleStart + 1; currentSlot <= slot; currentSlot++) {
    const previousStates = states;
    const nextStates = {};
    const isFinalSlot = currentSlot === slot;
    for (const region of REGIONS) {
      const previous = previousStates[region.id];
      const modifiers = neighborModifiers(region.id, previousStates);
      const probabilities = transitionProbabilities(region.id, previous, modifiers, currentSlot);
      const status = chooseStatus(region.id, currentSlot, probabilities);
      nextStates[region.id] = {
        status,
        sinceSlot: status === previous.status ? previous.sinceSlot : currentSlot,
        alertSinceSlot: status === "clear"
          ? null
          : previous.status === "clear"
            ? currentSlot
            : previous.alertSinceSlot
      };
      if (isFinalSlot) {
        debugRows.push({
          ID: region.id, name: region.name,
          zone: REGION_RISK[region.id].zone,
          yellowRisk: REGION_RISK[region.id].yellow,
          redRisk: REGION_RISK[region.id].red,
          previousState: previous.status,
          neighborModifier: `Y ×${modifiers.yellow.toFixed(2)} / R ×${modifiers.red.toFixed(2)}`,
          finalYellowChance: probabilities.yellow.toFixed(4),
          finalRedChance: probabilities.red.toFixed(4),
          currentState: status
        });
      }
    }
    states = nextStates;
  }
  if (slot === cycleStart) {
    debugRows = REGIONS.map(region => ({
      ID: region.id, name: region.name,
      zone: REGION_RISK[region.id].zone,
      yellowRisk: REGION_RISK[region.id].yellow,
      redRisk: REGION_RISK[region.id].red,
      previousState: "cycle start",
      neighborModifier: "Y ×1.00 / R ×1.00",
      finalYellowChance: (CONFIG.chances.yellow * REGION_RISK[region.id].yellow).toFixed(4),
      finalRedChance: (CONFIG.chances.red * REGION_RISK[region.id].red * 0.45).toFixed(4),
      currentState: states[region.id].status
    }));
  }
  simulationCache = { slot, states };
  if (DEBUG_SIMULATION) console.table(debugRows);
  return simulationCache;
}

function validateSimulationConfig() {
  const ids = new Set(REGIONS.map(region => region.id));
  for (const id of ids) {
    const zone = REGION_RISK[id]?.zone;
    if (!REGION_RISK[id] || !REGION_NEIGHBORS[id] || NEIGHBOR_INFLUENCE_BY_ZONE[zone] === undefined || !PERSISTENCE_BY_ZONE[zone]) {
      throw new Error(`Incomplete simulation configuration for region ${id}`);
    }
    for (const neighborId of REGION_NEIGHBORS[id]) {
      if (!ids.has(neighborId) || !REGION_NEIGHBORS[neighborId].includes(id)) {
        throw new Error(`Invalid or asymmetric border: ${id}–${neighborId}`);
      }
    }
  }
}

function formatTime(ms) {
  return new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(ms);
}

function formatDuration(since) {
  const totalMinutes = Math.max(0, Math.floor((Date.now() - since) / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days) return `${days} д ${hours} ч`;
  if (hours) return `${hours} ч ${minutes} мин`;
  return totalMinutes ? `${totalMinutes} мин` : "менее минуты";
}

function getTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (_) {}
  return "dark";
}

function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "Светлая тема" : "Тёмная тема";
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#101214" : "#edf0f2";
  if (persist) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  applyMapTheme();
}

function cssColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function statusColor(status) {
  return cssColor(STATUS[status].cssVariable) || STATUS[status].color;
}

function applyMapTheme() {
  if (!mapDocument) return;
  const sea = mapDocument.querySelector(".sea");
  if (sea) sea.style.fill = cssColor("--map-sea");
  mapDocument.querySelectorAll("[data-region-id]").forEach(group => {
    const item = currentStates.find(state => state.id === Number(group.dataset.regionId));
    group.style.fill = statusColor(item?.status || "clear");
    group.style.stroke = cssColor("--map-border");
    group.style.strokeWidth = "1.25";
  });
  const labels = mapDocument.querySelector(".region-labels");
  if (labels) {
    labels.style.fill = cssColor("--map-label");
    labels.style.stroke = cssColor("--map-label-stroke");
  }
}

function installRegionNames() {
  const labelIds = [1, 1, ...Array.from({ length: 33 }, (_, index) => index + 2)];
  const labels = [...mapDocument.querySelectorAll(".region-labels text")];
  labels.forEach((label, index) => {
    const id = labelIds[index];
    const region = REGIONS.find(item => item.id === id);
    if (!region) return;
    const length = region.name.length;
    let size = length > 14 ? 9 : length > 11 ? 10 : length > 8 ? 11 : 14;
    if ([9, 10].includes(id)) size = 8;
    if (id === 33) size = 11;
    label.textContent = region.name;
    label.setAttribute("font-size", String(size));
    label.setAttribute("data-region-label-id", String(id));
  });
}

function bindMap() {
  mapDocument = mapObject.contentDocument;
  if (!mapDocument) return;
  const groups = [...mapDocument.querySelectorAll("[data-region-id]")];
  if (groups.length !== REGIONS.length) throw new Error(`Expected 34 regions, found ${groups.length}`);

  installRegionNames();
  groups.forEach(group => {
    const id = Number(group.dataset.regionId);
    const region = REGIONS.find(item => item.id === id);
    group.setAttribute("aria-label", region.name);
  });
  renderMap();
  applyMapTheme();
}

function renderMap() {
  if (!mapDocument) return;
  currentStates.forEach(item => {
    const group = mapDocument.querySelector(`[data-region-id="${item.id}"]`);
    if (!group) return;
    group.setAttribute("class", `region ${item.status}`);
    group.dataset.status = item.status;
    group.setAttribute("aria-label", `${item.name}: ${STATUS[item.status].label}`);
  });
  applyMapTheme();
}

function render() {
  const now = Date.now();
  const slotMs = CONFIG.slotMinutes * 60 * 1000;
  const slot = Math.floor(now / slotMs);
  const simulation = simulateStates(slot);
  currentStates = REGIONS.map(region => {
    const generated = simulation.states[region.id];
    return { ...region, ...generated, since: generated.sinceSlot * slotMs };
  });
  renderMap();
  renderThreats();
  renderStatistics();
  updateClock();
}

function activeThreats() {
  const order = { red: 0, yellow: 1 };
  return currentStates.filter(item => item.status !== "clear").sort((a, b) => order[a.status] - order[b.status] || a.id - b.id);
}

function renderThreats() {
  const items = activeThreats();
  document.querySelector("#threats-summary").textContent = items.length ? alertCountLabel(items.length) : "Активных тревог нет";
  document.querySelector("#threat-list").innerHTML = items.length ? items.map(item => `
    <div class="threat-item ${item.status}">
      <span class="threat-bar" aria-hidden="true"></span>
      <span class="threat-body">
        <span class="threat-name">${item.name}${item.capital ? " · столица" : ""}</span>
        <span class="threat-type">${STATUS[item.status].label}</span>
        <span class="threat-time">с ${formatTime(item.since)} · <span class="duration" data-since="${item.since}">${formatDuration(item.since)}</span></span>
      </span>
    </div>`).join("") : '<div class="empty-threats">Активных тревог нет.</div>';
}

function alertCountLabel(count) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} активных тревог`;
  if (last === 1) return `${count} активная тревога`;
  if (last >= 2 && last <= 4) return `${count} активные тревоги`;
  return `${count} активных тревог`;
}

function renderStatistics() {
  const counts = Object.fromEntries(Object.keys(STATUS).map(key => [key, 0]));
  currentStates.forEach(item => counts[item.status]++);
  const labels = { ...Object.fromEntries(Object.entries(STATUS).map(([key, value]) => [key, value.label])), clear: "Без тревоги" };
  const order = ["red", "yellow", "clear"];
  document.querySelector("#statistics-grid").innerHTML = order.map(key => `
    <div class="stat-item ${key}">
      <strong class="stat-value">${counts[key]}</strong>
      <span class="stat-label">${labels[key]}</span>
    </div>`).join("");
}

function updateDurations() {
  document.querySelectorAll(".duration[data-since]").forEach(element => {
    element.textContent = formatDuration(Number(element.dataset.since));
  });
}

function updateClock() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(now);
  const time = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(now);
  document.querySelector("#current-time").textContent = `${date} · ${time}`;
  updateDurations();
}

function setThreatsCollapsed(collapsed) {
  threatsPanel.classList.toggle("collapsed", collapsed);
  threatsToggle.setAttribute("aria-expanded", String(!collapsed));
  threatsToggle.querySelector(".collapse-label").textContent = collapsed ? "Развернуть" : "Свернуть";
  try { localStorage.setItem(COLLAPSE_KEY, String(collapsed)); } catch (_) {}
}

themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

threatsToggle.addEventListener("click", () => setThreatsCollapsed(!threatsPanel.classList.contains("collapsed")));
document.querySelector("#statistics-button").addEventListener("click", () => statisticsDialog.showModal());
document.querySelector("#statistics-close").addEventListener("click", () => statisticsDialog.close());
statisticsDialog.addEventListener("click", event => {
  if (event.target === statisticsDialog) statisticsDialog.close();
});

mapObject.addEventListener("load", bindMap);
if (mapObject.contentDocument?.querySelector("[data-region-id]")) bindMap();

validateSimulationConfig();
setTheme(getTheme(), false);
let savedThreatsCollapsed = false;
try { savedThreatsCollapsed = localStorage.getItem(COLLAPSE_KEY) === "true"; } catch (_) {}
setThreatsCollapsed(window.matchMedia("(max-width: 640px)").matches || savedThreatsCollapsed);
render();
setInterval(updateClock, 1000);
setInterval(render, 30_000);
