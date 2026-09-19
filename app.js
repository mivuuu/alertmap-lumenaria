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

const REGION_LOCATIVE = {
  1: "Иудее", 2: "Салабимии", 3: "Эндоре", 4: "Калантии",
  5: "Гесперии", 6: "Ориентии", 7: "Люцинии", 8: "Сидерии",
  9: "Наяде", 10: "Клерополе", 11: "Соларии", 12: "Селении",
  13: "Аргезии", 14: "Нереиде", 15: "Альтерии", 16: "Сильвании",
  17: "Таврии", 18: "Валентии", 19: "Иллирии", 20: "Астралии",
  21: "Лимниде", 22: "Небулии", 23: "Кастелии", 24: "Медиолании",
  25: "Окцидентии", 26: "Виридии", 27: "Тенебрии", 28: "Монтании",
  29: "Маринии", 30: "Меридионии", 31: "Эстерии", 32: "Джаннат-аль-Амне",
  33: "Ойле", 34: "Гесперидии"
};

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

const ALERT_DURATION_BY_DEPTH = {
  0: [60 * 60, 4 * 60 * 60],
  1: [25 * 60, 2 * 60 * 60],
  2: [15 * 60, 70 * 60],
  3: [10 * 60, 45 * 60],
  4: [8 * 60, 30 * 60],
  5: [8 * 60, 25 * 60]
};

const MAX_SAME_STATE_DURATION_BY_DEPTH = {
  0: [10 * 60, 20 * 60],
  1: [8 * 60, 15 * 60],
  2: [7 * 60, 12 * 60],
  3: [5 * 60, 10 * 60],
  4: [5 * 60, 10 * 60],
  5: [5 * 60, 10 * 60]
};

const DEBUG_SIMULATION = false;

const STATUS = {
  clear: { label: "Тревог нет", color: "#34383D", cssVariable: "--status-clear" },
  yellow: { label: "Жёлтый уровень", color: "#E6B94A", cssVariable: "--status-yellow" },
  red: { label: "Красный уровень", color: "#D84C4C", cssVariable: "--status-red" }
};

const CONFIG = {
  lookbackSeconds: 8 * 60 * 60,
  lookaheadSeconds: 3 * 60 * 60,
  eventStreamDaySeconds: 24 * 60 * 60,
  eventIndexStride: 256,
  seed: 217031
};

const GLOBAL_EVENT_CONFIG = {
  calmChance: 0.05,
  longRangeChance: 0.05,
  largeWaveChance: 0.08,
  frontlineWaveChance: 0.30
};

const EVENT_DEPTH_BY_ZONE = {
  "frontline": 0,
  "frontline / southern frontline": 0,
  "near-front": 1,
  "near-front / operational rear": 1,
  "middle depth": 2,
  "middle depth / capital": 2,
  "deep rear / middle depth": 3,
  "deep rear": 3,
  "very deep rear": 4,
  "remote island": 5
};

const FRONTLINE_REGION_IDS = REGIONS
  .filter(region => EVENT_DEPTH_BY_ZONE[REGION_RISK[region.id].zone] === 0)
  .map(region => region.id);

const THEME_KEY = "lumenaria-theme";
const COLLAPSE_KEY = "lumenaria-threats-collapsed";
const SIMULATION_LAB_ENABLED = new URLSearchParams(window.location.search).get("debug") === "1";
const simulationLabClock = {
  speed: 1,
  realAnchorMs: Date.now(),
  virtualAnchorMs: Date.now()
};
const mapObject = document.querySelector("#alarm-map");
const threatsPanel = document.querySelector("#threats-panel");
const threatsToggle = document.querySelector("#threats-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const statisticsDialog = document.querySelector("#statistics-dialog");
const historyDialog = document.querySelector("#history-dialog");
let currentStates = [];
let mapDocument = null;
let simulationCache = null;
let historyCache = null;
let historyFilter = "all";
let dailyStatisticsCache = null;
let notificationSecond = null;
let lastSimulationSecond = null;
let simulationUpdateTimer = null;
const renderedMapStatuses = new Map();

function simulationNow() {
  if (!SIMULATION_LAB_ENABLED) return Date.now();
  return simulationLabClock.virtualAnchorMs
    + (Date.now() - simulationLabClock.realAnchorMs) * simulationLabClock.speed;
}

function hash32(a) {
  a |= 0; a = a + 0x7ed55d16 + (a << 12) | 0; a = (a ^ 0xc761c23c) ^ (a >>> 19);
  a = a + 0x165667b1 + (a << 5) | 0; a = (a + 0xd3a2646c) ^ (a << 9);
  a = a + 0xfd7046c5 + (a << 3) | 0; return ((a ^ 0xb55a4f09) ^ (a >>> 16)) >>> 0;
}

// Runtime state is derived only from deterministic attack events.
function eventRoll(eventIndex, salt, regionId = 0, extra = 0) {
  const mixed = hash32(
    CONFIG.seed
    ^ hash32(eventIndex * 104729)
    ^ hash32(regionId * 1009)
    ^ hash32(extra * 7919)
    ^ salt
  );
  return mixed / 4294967296;
}

function eventRange(eventIndex, salt, minimum, maximum, regionId = 0, extra = 0) {
  return minimum + Math.floor(eventRoll(eventIndex, salt, regionId, extra) * (maximum - minimum + 1));
}

const eventCache = new Map();
const eventEffectsCache = new Map();
const eventStreamCache = new Map();
const DEEP_TARGET_IDS = REGIONS
  .filter(region => EVENT_DEPTH_BY_ZONE[REGION_RISK[region.id].zone] >= 3)
  .map(region => region.id);
const ORIGIN_SECTORS = {
  4: "восточный", 5: "восточный", 15: "юго-восточный", 16: "юго-восточный",
  17: "юго-восточный", 18: "южный", 20: "южный"
};

function buildAttackEvent(eventIndex, startedAt) {
  if (eventCache.has(eventIndex)) return eventCache.get(eventIndex);
  const selector = eventRoll(eventIndex, 0x32d31b79);
  const calmEnd = GLOBAL_EVENT_CONFIG.calmChance;
  const longRangeEnd = calmEnd + GLOBAL_EVENT_CONFIG.longRangeChance;
  const largeWaveEnd = longRangeEnd + GLOBAL_EVENT_CONFIG.largeWaveChance;
  const frontlineWaveEnd = largeWaveEnd + GLOBAL_EVENT_CONFIG.frontlineWaveChance;
  const type = selector < calmEnd ? "calm"
    : selector < longRangeEnd ? "long_range_strike"
      : selector < largeWaveEnd ? "large_wave"
        : selector < frontlineWaveEnd ? "frontline_wave"
          : "normal_local";
  const durationRanges = {
    calm: [5 * 60, 25 * 60],
    normal_local: [10 * 60, 40 * 60],
    frontline_wave: [20 * 60, 90 * 60],
    large_wave: [40 * 60, 2 * 60 * 60],
    long_range_strike: [8 * 60, 35 * 60]
  };
  const [minimumDuration, maximumDuration] = durationRanges[type];
  const duration = eventRange(eventIndex, 0x1b56c4e9, minimumDuration, maximumDuration);
  const originRegionId = type === "calm" || type === "long_range_strike"
    ? null
    : FRONTLINE_REGION_IDS[eventRange(eventIndex, 0x5bc20a6f, 0, FRONTLINE_REGION_IDS.length - 1)];
  const depthRoll = eventRoll(eventIndex, 0x6937af11);
  const maxDepth = type === "normal_local" ? (depthRoll < 0.72 ? 0 : 1)
    : type === "frontline_wave" ? (depthRoll < 0.62 ? 1 : 2)
      : type === "large_wave" ? (depthRoll < 0.58 ? 2 : depthRoll < 0.94 ? 3 : 4)
        : type === "long_range_strike" ? 5 : 0;
  const event = {
    id: `${eventIndex}:${type}`,
    eventIndex,
    type,
    startedAt,
    endsAt: startedAt + duration,
    originRegionId,
    originSector: type === "long_range_strike" ? "дальний удар"
      : type === "calm" ? "вся страна"
        : ORIGIN_SECTORS[originRegionId],
    severity: type === "calm" ? 0 : 0.62 + eventRoll(eventIndex, 0x78f2d14b) * 0.38,
    maxDepth
  };
  eventCache.set(eventIndex, event);
  return event;
}

function attackEventStreamForDay(dayIndex) {
  if (eventStreamCache.has(dayIndex)) return eventStreamCache.get(dayIndex);
  const dayStart = dayIndex * CONFIG.eventStreamDaySeconds;
  const dayEnd = dayStart + CONFIG.eventStreamDaySeconds;
  const events = [];
  let previousEventAt = dayStart;
  for (let sequence = 0; sequence < CONFIG.eventIndexStride; sequence++) {
    const eventIndex = dayIndex * CONFIG.eventIndexStride + sequence;
    let gap = eventRange(eventIndex, 0x749ea2d3, 8 * 60, 35 * 60);
    if (eventRoll(eventIndex, 0x1f2e3d4c, 0, previousEventAt) < 0.07) {
      gap += eventRange(eventIndex, 0x68b1fa27, 15 * 60, 50 * 60, 0, previousEventAt);
    }
    const startedAt = previousEventAt + gap;
    if (startedAt >= dayEnd) break;
    events.push(buildAttackEvent(eventIndex, startedAt));
    previousEventAt = startedAt;
  }
  eventStreamCache.set(dayIndex, events);
  return events;
}

function attackEventsForRange(startSecond, endSecond) {
  const generationStart = startSecond - CONFIG.lookbackSeconds;
  const generationEnd = endSecond + CONFIG.lookaheadSeconds;
  const firstDay = Math.floor(generationStart / CONFIG.eventStreamDaySeconds) - 1;
  const lastDay = Math.floor(generationEnd / CONFIG.eventStreamDaySeconds) + 1;
  const events = [];
  for (let dayIndex = firstDay; dayIndex <= lastDay; dayIndex++) {
    for (const event of attackEventStreamForDay(dayIndex)) {
      if (event.endsAt >= generationStart && event.startedAt <= generationEnd) events.push(event);
    }
  }
  return events.sort((a, b) => a.startedAt - b.startedAt || a.eventIndex - b.eventIndex);
}

function buildEffectPhases(event, regionId, delay, redCapable) {
  const depth = EVENT_DEPTH_BY_ZONE[REGION_RISK[regionId].zone];
  const startedAt = event.startedAt + delay;
  const [minimumDuration, maximumDuration] = ALERT_DURATION_BY_DEPTH[depth];
  const desiredDuration = eventRange(event.eventIndex, 0x4f1bbcdc, minimumDuration, maximumDuration, regionId);
  const threatDuration = Math.min(desiredDuration, Math.max(5 * 60, event.endsAt - startedAt));
  const threatEndsAt = startedAt + threatDuration;
  const phases = [];
  const [minimumSameState, maximumSameState] = MAX_SAME_STATE_DURATION_BY_DEPTH[depth];
  const yellowPhaseMinimum = Math.max(60, Math.floor(minimumSameState * 0.60));
  const yellowPhaseMaximum = Math.max(2 * 60, Math.floor(maximumSameState * 0.80));
  const escalationDelay = eventRange(event.eventIndex, 0x63d83595, 40, 6 * 60, regionId);
  if (!redCapable || startedAt + escalationDelay >= threatEndsAt - 60) {
    const yellowDuration = eventRange(
      event.eventIndex, 0x2c9277b5, yellowPhaseMinimum, yellowPhaseMaximum, regionId
    );
    const endsAt = Math.min(threatEndsAt, startedAt + yellowDuration);
    phases.push({ status: "yellow", startedAt, endsAt });
    return { eventId: event.id, regionId, delay, depth, phases, startedAt, endsAt };
  }

  const firstPhaseEnd = Math.min(threatEndsAt, startedAt + escalationDelay);
  phases.push({ status: "yellow", startedAt, endsAt: firstPhaseEnd });
  let cursor = firstPhaseEnd;
  let status = "red";
  let phaseIndex = 0;
  while (cursor < threatEndsAt) {
    const phaseMinimum = status === "red"
      ? Math.max(60, Math.floor(minimumSameState * 0.25))
      : yellowPhaseMinimum;
    const phaseMaximum = status === "red"
      ? Math.max(2 * 60, Math.floor(maximumSameState * 0.40))
      : yellowPhaseMaximum;
    const duration = eventRange(
      event.eventIndex,
      status === "red" ? 0x5e2a9c17 : 0x16f11fe9,
      phaseMinimum,
      phaseMaximum,
      regionId,
      phaseIndex
    );
    const phaseEnd = Math.min(threatEndsAt, cursor + duration);
    phases.push({ status, startedAt: cursor, endsAt: phaseEnd });
    cursor = phaseEnd;
    status = status === "red" ? "yellow" : "red";
    phaseIndex++;
  }
  return { eventId: event.id, regionId, delay, depth, phases, startedAt, endsAt: threatEndsAt };
}

function longRangeEffects(event) {
  const targetCount = eventRange(event.eventIndex, 0x45a7d36b, 1, 3);
  return DEEP_TARGET_IDS
    .map(regionId => ({ regionId, order: eventRoll(event.eventIndex, 0x29ed0e3b, regionId) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, targetCount)
    .map(({ regionId }, index) => {
      const delay = eventRange(event.eventIndex, 0x31a79d47, 20, 180, regionId, index);
      const redChance = Math.min(0.72, 0.22 + REGION_RISK[regionId].red * event.severity * 1.8);
      const redCapable = eventRoll(event.eventIndex, 0x6d2b79f5, regionId) < redChance;
      return buildEffectPhases(event, regionId, delay, redCapable);
    });
}

function connectedWaveEffects(event) {
  const effects = [];
  const visited = new Set([event.originRegionId]);
  const queue = [{ regionId: event.originRegionId, graphDepth: 0, delay: 0 }];
  const maximumGraphDepth = event.maxDepth + (event.type === "large_wave" ? 2 : 1);
  const depthChance = [1, 0.90, 0.66, 0.34, 0.12, 0.04];
  while (queue.length) {
    const current = queue.shift();
    const zoneDepth = EVENT_DEPTH_BY_ZONE[REGION_RISK[current.regionId].zone];
    const redReach = zoneDepth === 0 || zoneDepth < event.maxDepth;
    const redChance = Math.min(0.94, 0.30 + REGION_RISK[current.regionId].red * event.severity * 0.40);
    const redCapable = redReach
      && eventRoll(event.eventIndex, 0x6d2b79f5, current.regionId, current.graphDepth) < redChance;
    effects.push(buildEffectPhases(event, current.regionId, current.delay, redCapable));
    if (current.graphDepth >= maximumGraphDepth) continue;

    for (const neighborId of REGION_NEIGHBORS[current.regionId]) {
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);
      const neighborDepth = EVENT_DEPTH_BY_ZONE[REGION_RISK[neighborId].zone];
      if (neighborDepth > event.maxDepth) continue;
      const nextGraphDepth = current.graphDepth + 1;
      const riskFactor = Math.min(1, 0.45 + REGION_RISK[neighborId].yellow / 1.8);
      const typeFactor = event.type === "large_wave" ? 1.18 : event.type === "frontline_wave" ? 1 : 0.72;
      const inclusionChance = Math.min(
        0.96,
        depthChance[neighborDepth] * riskFactor * typeFactor * event.severity * (1 - nextGraphDepth * 0.07)
      );
      if (eventRoll(event.eventIndex, 0x51ed270b, neighborId, current.regionId) >= inclusionChance) continue;
      const edgeDelay = eventRange(event.eventIndex, 0x17d0b52f, 20, 150, neighborId, current.regionId);
      queue.push({ regionId: neighborId, graphDepth: nextGraphDepth, delay: current.delay + edgeDelay });
    }
  }
  return effects;
}

function effectsForAttackEvent(event) {
  if (eventEffectsCache.has(event.id)) return eventEffectsCache.get(event.id);
  const effects = event.type === "calm" ? []
    : event.type === "long_range_strike" ? longRangeEffects(event)
      : connectedWaveEffects(event);
  eventEffectsCache.set(event.id, effects);
  return effects;
}

function activeCalmEvent(second, events) {
  return events.find(event => event.type === "calm" && second >= event.startedAt && second < event.endsAt) || null;
}

function eventDrivenRegionStatus(regionId, second, events) {
  if (activeCalmEvent(second, events)) return "clear";
  let rawStatus = "clear";
  for (const event of events) {
    if (event.type === "calm") continue;
    const effect = effectsForAttackEvent(event).find(item => item.regionId === regionId);
    if (!effect || second < effect.startedAt || second >= effect.endsAt) continue;
    const phase = effect.phases.find(item => second >= item.startedAt && second < item.endsAt);
    if (phase?.status === "red") rawStatus = "red";
    if (phase?.status === "yellow" && rawStatus !== "red") rawStatus = "yellow";
  }
  return rawStatus;
}

function attackEventBoundaries(events, startSecond, endSecond) {
  const boundaries = new Set();
  for (const event of events) {
    if (event.type === "calm") {
      if (event.startedAt >= startSecond && event.startedAt <= endSecond) boundaries.add(event.startedAt);
      if (event.endsAt >= startSecond && event.endsAt <= endSecond) boundaries.add(event.endsAt);
      continue;
    }
    for (const effect of effectsForAttackEvent(event)) {
      for (const phase of effect.phases) {
        if (phase.startedAt >= startSecond && phase.startedAt <= endSecond) boundaries.add(phase.startedAt);
        if (phase.endsAt >= startSecond && phase.endsAt <= endSecond) boundaries.add(phase.endsAt);
      }
    }
  }
  return [...boundaries].sort((a, b) => a - b);
}

function currentAttackEvent(second, events) {
  const priority = { calm: 5, large_wave: 4, frontline_wave: 3, long_range_strike: 2, normal_local: 1 };
  return events
    .filter(event => second >= event.startedAt && second < event.endsAt)
    .sort((a, b) => priority[b.type] - priority[a.type] || b.severity - a.severity)[0] || null;
}

function calculateEventDrivenSimulation(second, captureDebug = false) {
  const futureEnd = second + CONFIG.lookaheadSeconds;
  const events = attackEventsForRange(second, futureEnd);
  const historyStart = second - CONFIG.lookbackSeconds;
  const boundaries = attackEventBoundaries(events, historyStart, futureEnd);
  const statuses = Object.fromEntries(REGIONS.map(region => [region.id, eventDrivenRegionStatus(region.id, historyStart - 1, events)]));
  const since = Object.fromEntries(REGIONS.map(region => [region.id, historyStart]));
  for (const boundary of boundaries) {
    if (boundary > second) break;
    for (const region of REGIONS) {
      const status = eventDrivenRegionStatus(region.id, boundary, events);
      if (status !== statuses[region.id]) {
        statuses[region.id] = status;
        since[region.id] = boundary;
      }
    }
  }

  const nextByRegion = Object.fromEntries(REGIONS.map(region => [region.id, Infinity]));
  let nextTransitionSecond = Infinity;
  const futureStatuses = { ...statuses };
  for (const boundary of boundaries) {
    if (boundary <= second) continue;
    for (const region of REGIONS) {
      const status = eventDrivenRegionStatus(region.id, boundary, events);
      if (status !== futureStatuses[region.id]) {
        if (nextByRegion[region.id] === Infinity) nextByRegion[region.id] = boundary;
        nextTransitionSecond = Math.min(nextTransitionSecond, boundary);
        futureStatuses[region.id] = status;
      }
    }
  }
  if (!Number.isFinite(nextTransitionSecond)) {
    nextTransitionSecond = futureEnd;
  }

  const states = Object.fromEntries(REGIONS.map(region => [region.id, {
    status: statuses[region.id],
    sinceSecond: since[region.id],
    nextTransitionSecond: nextByRegion[region.id]
  }]));
  const activeEvent = currentAttackEvent(second, events);
  const debugRows = captureDebug ? REGIONS.map(region => {
    const effect = activeEvent && effectsForAttackEvent(activeEvent).find(item => item.regionId === region.id);
    return {
      ID: region.id,
      name: region.name,
      zone: REGION_RISK[region.id].zone,
      currentState: states[region.id].status,
      affectedByCurrentEvent: Boolean(effect),
      delaySeconds: effect?.delay ?? null,
      propagationDepth: effect?.depth ?? null,
      nextTransitionAt: Number.isFinite(states[region.id].nextTransitionSecond)
        ? new Date(states[region.id].nextTransitionSecond * 1000).toISOString()
        : null
    };
  }) : [];
  return { second, states, events, activeEvent, nextTransitionSecond, debugRows };
}

function calculateSimulation(second, captureDebug = false) {
  return calculateEventDrivenSimulation(second, captureDebug);
}

function simulateStates(second) {
  if (simulationCache?.second === second) return simulationCache;
  simulationCache = calculateEventDrivenSimulation(second, DEBUG_SIMULATION);
  if (DEBUG_SIMULATION) {
    const event = simulationCache.activeEvent;
    console.table([{
      eventId: event?.id ?? null,
      eventType: event?.type ?? "none",
      startedAt: event ? new Date(event.startedAt * 1000).toISOString() : null,
      endsAt: event ? new Date(event.endsAt * 1000).toISOString() : null,
      originSector: event?.originSector ?? null,
      affectedRegions: event ? effectsForAttackEvent(event).map(effect => effect.regionId).join(", ") : "",
      maxDepth: event?.maxDepth ?? null
    }]);
    console.table(simulationCache.debugRows);
  }
  return simulationCache;
}

function validateSimulationConfig() {
  const ids = new Set(REGIONS.map(region => region.id));
  for (const id of ids) {
    const zone = REGION_RISK[id]?.zone;
    if (!REGION_RISK[id] || !REGION_NEIGHBORS[id] || NEIGHBOR_INFLUENCE_BY_ZONE[zone] === undefined || EVENT_DEPTH_BY_ZONE[zone] === undefined) {
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

function formatEventTime(ms) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).format(ms);
}

function formatDuration(since) {
  const totalMinutes = Math.max(0, Math.floor((simulationNow() - since) / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days) return `${days} д ${hours} ч`;
  if (hours) return `${hours} ч ${minutes} мин`;
  return totalMinutes ? `${totalMinutes} мин` : "менее минуты";
}

function historyDayKey(ms) {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

function historyDayStartSecond(ms) {
  const date = new Date(ms);
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000);
}

function createHistoryEvent(regionId, status, startSecond, endSecond = null) {
  const region = REGIONS.find(item => item.id === regionId);
  return { regionId, regionName: region.name, status, startSecond, endSecond };
}

function simulationTransitions(startSecond, endSecond) {
  if (endSecond <= startSecond) return [];
  const events = attackEventsForRange(startSecond, endSecond);
  const boundaries = attackEventBoundaries(events, startSecond + 1, endSecond);
  const statuses = Object.fromEntries(REGIONS.map(region => [
    region.id,
    eventDrivenRegionStatus(region.id, startSecond, events)
  ]));
  const transitions = [];
  for (const boundary of boundaries) {
    for (const region of REGIONS) {
      const status = eventDrivenRegionStatus(region.id, boundary, events);
      if (status !== statuses[region.id]) {
        transitions.push({ regionId: region.id, previousStatus: statuses[region.id], status, second: boundary });
        statuses[region.id] = status;
      }
    }
  }
  return transitions;
}

function createHistoryCache(now, targetSecond = Math.floor(now / 1000)) {
  const startSecond = historyDayStartSecond(now);
  const previousStates = calculateSimulation(startSecond - 1).states;
  const openEvents = {};
  for (const region of REGIONS) {
    const state = previousStates[region.id];
    if (state.status !== "clear") {
      openEvents[region.id] = createHistoryEvent(region.id, state.status, state.sinceSecond);
    }
  }
  const cache = {
    dayKey: historyDayKey(now),
    throughSecond: targetSecond,
    states: previousStates,
    events: [],
    openEvents
  };
  for (const transition of simulationTransitions(startSecond - 1, targetSecond)) {
    if (transition.previousStatus !== "clear") {
      const openEvent = cache.openEvents[transition.regionId]
        || createHistoryEvent(transition.regionId, transition.previousStatus, transition.second);
      cache.events.push({ ...openEvent, endSecond: transition.second });
      delete cache.openEvents[transition.regionId];
    }
    if (transition.status !== "clear") {
      cache.openEvents[transition.regionId] = createHistoryEvent(
        transition.regionId, transition.status, transition.second
      );
    }
  }
  const snapshot = calculateSimulation(targetSecond);
  cache.states = snapshot.states;
  cache.validUntilSecond = snapshot.nextTransitionSecond;
  return cache;
}

function ensureHistoryCache(now = simulationNow()) {
  const targetSecond = Math.floor(now / 1000);
  if (!historyCache
      || historyCache.dayKey !== historyDayKey(now)
      || targetSecond >= historyCache.validUntilSecond) {
    historyCache = createHistoryCache(now, targetSecond);
  }
  return historyCache;
}

function formatHistoryDuration(event, now) {
  const start = event.startSecond * 1000;
  const end = event.endSecond === null ? now : event.endSecond * 1000;
  const totalMinutes = Math.max(0, Math.floor((end - start) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours) return `${hours} ч${minutes ? ` ${minutes} мин` : ""}`;
  return totalMinutes ? `${totalMinutes} мин` : "менее минуты";
}

function allHistoryEvents() {
  const ongoing = Object.values(historyCache.openEvents).map(event => ({ ...event, endSecond: null }));
  return [...historyCache.events, ...ongoing];
}

function historyEvents() {
  return allHistoryEvents()
    .filter(event => historyFilter === "all" || event.status === historyFilter)
    .sort((a, b) => b.startSecond - a.startSecond || b.regionId - a.regionId);
}

function formatTotalMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours) return `${hours} ч${minutes ? ` ${minutes} мин` : ""}`;
  return totalMinutes ? `${totalMinutes} мин` : "0 мин";
}

function calculateDailyStatistics(now = simulationNow()) {
  ensureHistoryCache(now);
  if (dailyStatisticsCache?.dayKey === historyCache.dayKey
      && dailyStatisticsCache.throughSecond === historyCache.throughSecond) {
    return dailyStatisticsCache.value;
  }

  const events = allHistoryEvents();
  const dayStartSecond = historyDayStartSecond(now);
  const endSecond = historyCache.throughSecond;
  const countsByLevel = { yellow: 0, red: 0 };
  const countsByRegion = Object.fromEntries(REGIONS.map(region => [region.id, 0]));
  const durationByRegion = Object.fromEntries(REGIONS.map(region => [region.id, 0]));
  let longestCompleted = null;

  for (const event of events) {
    countsByLevel[event.status]++;
    countsByRegion[event.regionId]++;
    const clippedStart = Math.max(event.startSecond, dayStartSecond);
    const clippedEnd = Math.min(event.endSecond ?? endSecond, endSecond);
    durationByRegion[event.regionId] += Math.floor(Math.max(0, clippedEnd - clippedStart) / 60);
    if (event.endSecond !== null) {
      const durationMinutes = Math.floor((event.endSecond - event.startSecond) / 60);
      if (!longestCompleted || durationMinutes > longestCompleted.durationMinutes) {
        longestCompleted = { ...event, durationMinutes };
      }
    }
  }

  const regionLeader = REGIONS
    .map(region => ({ ...region, count: countsByRegion[region.id] }))
    .sort((a, b) => b.count - a.count || a.id - b.id)[0];
  const durations = REGIONS
    .map(region => ({ ...region, totalMinutes: durationByRegion[region.id] }))
    .filter(region => region.totalMinutes > 0)
    .sort((a, b) => b.totalMinutes - a.totalMinutes || a.id - b.id);

  const value = {
    total: events.length,
    yellow: countsByLevel.yellow,
    red: countsByLevel.red,
    active: Object.values(historyCache.states).filter(state => state.status !== "clear").length,
    regionLeader,
    longestCompleted,
    durations
  };
  dailyStatisticsCache = { dayKey: historyCache.dayKey, throughSecond: historyCache.throughSecond, value };
  return value;
}

function renderHistory(now = simulationNow()) {
  ensureHistoryCache(now);
  const events = historyEvents();
  document.querySelector("#history-list").innerHTML = events.length ? events.map(event => {
    const startTime = formatEventTime(event.startSecond * 1000);
    const endTime = event.endSecond === null ? "сейчас" : formatEventTime(event.endSecond * 1000);
    const ongoing = event.endSecond === null ? ' <span class="history-ongoing">· продолжается</span>' : "";
    return `
      <div class="history-item ${event.status}">
        <span class="history-bar" aria-hidden="true"></span>
        <span>
          <span class="history-region">${event.regionId} — ${event.regionName}</span>
          <span class="history-level">${STATUS[event.status].label}</span>
          <span class="history-time">${startTime}–${endTime} · ${formatHistoryDuration(event, now)}${ongoing}</span>
        </span>
      </div>`;
  }).join("") : '<div class="empty-history">За сегодня событий нет.</div>';
}

function notificationMessages(changes) {
  const messages = [];
  for (const status of ["red", "yellow", "clear"]) {
    const items = changes.filter(change => change.status === status);
    if (!items.length) continue;
    if (items.length === 1) {
      const place = REGION_LOCATIVE[items[0].regionId];
      messages.push({
        type: status,
        text: status === "clear"
          ? `Отбой тревоги в ${place}`
          : `В ${place} объявлен ${status === "red" ? "красный" : "жёлтый"} уровень`
      });
    } else {
      messages.push({
        type: status,
        text: status === "clear"
          ? `Отбой тревоги в ${items.length} регионах`
          : `${status === "red" ? "Красный" : "Жёлтый"} уровень объявлен в ${items.length} регионах`
      });
    }
  }
  return messages;
}

function dismissToast(toast) {
  if (!toast.isConnected) return;
  toast.classList.add("leaving");
  setTimeout(() => toast.remove(), 190);
}

function showToast(message) {
  const stack = document.querySelector("#toast-stack");
  while (stack.children.length >= 3) stack.firstElementChild.remove();
  const toast = document.createElement("div");
  toast.className = `toast ${message.type}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span>${message.text}</span><button class="toast-close" type="button" aria-label="Закрыть уведомление">×</button>`;
  toast.querySelector(".toast-close").addEventListener("click", () => dismissToast(toast));
  stack.append(toast);
  setTimeout(() => dismissToast(toast), 6000);
}

function processSecondNotifications(second) {
  if (notificationSecond === null) {
    notificationSecond = second;
    return;
  }
  if (second <= notificationSecond) return;
  if (second - notificationSecond > 24 * 60 * 60) {
    notificationSecond = second;
    return;
  }

  const changes = simulationTransitions(notificationSecond, second);
  notificationSecond = second;
  notificationMessages(changes).forEach(showToast);
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
  renderedMapStatuses.clear();
  groups.forEach(group => {
    const id = Number(group.dataset.regionId);
    const region = REGIONS.find(item => item.id === id);
    group.setAttribute("aria-label", region.name);
  });
  renderMap();
  applyMapTheme();
}

function shouldEmphasizeTransition(previousStatus, status) {
  return previousStatus !== undefined
    && ((previousStatus === "clear" && status !== "clear")
      || (previousStatus === "yellow" && status === "red"));
}

function renderMap() {
  if (!mapDocument) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  currentStates.forEach(item => {
    const group = mapDocument.querySelector(`[data-region-id="${item.id}"]`);
    if (!group) return;
    const previousStatus = renderedMapStatuses.get(item.id);
    const emphasize = shouldEmphasizeTransition(previousStatus, item.status);
    group.setAttribute("class", `region ${item.status}`);
    if (emphasize && !reduceMotion) {
      group.classList.add("emphasis");
      group.addEventListener("animationend", () => group.classList.remove("emphasis"), { once: true });
    }
    group.dataset.status = item.status;
    group.setAttribute("aria-label", `${item.name}: ${STATUS[item.status].label}`);
    renderedMapStatuses.set(item.id, item.status);
  });
  applyMapTheme();
}

function getCurrentSimulationSecond(now = simulationNow()) {
  return Math.floor(now / 1000);
}

function refreshSimulationState(second, now = simulationNow()) {
  const simulation = simulateStates(second);
  processSecondNotifications(second);
  currentStates = REGIONS.map(region => {
    const generated = simulation.states[region.id];
    return { ...region, ...generated, since: generated.sinceSecond * 1000 };
  });
  renderMap();
  renderThreats();
  renderStatistics(now);
  if (historyDialog.open) renderHistory(now);
}

function updateSimulationIfNeeded(now = simulationNow()) {
  const second = getCurrentSimulationSecond(now);
  if (second !== lastSimulationSecond) {
    refreshSimulationState(second, now);
    lastSimulationSecond = second;
  }
  updateClock(now);
}

function scheduleNextSimulationUpdate(now = simulationNow()) {
  clearTimeout(simulationUpdateTimer);
  const second = getCurrentSimulationSecond(now);
  const simulation = simulateStates(second);
  const virtualDelay = simulation.nextTransitionSecond * 1000 - now + 25;
  const delay = Math.max(25, SIMULATION_LAB_ENABLED ? virtualDelay / simulationLabClock.speed : virtualDelay);
  simulationUpdateTimer = setTimeout(() => {
    updateSimulationIfNeeded();
    scheduleNextSimulationUpdate();
  }, delay);
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

function renderStatistics(now = simulationNow()) {
  const statistics = calculateDailyStatistics(now);
  const longest = statistics.longestCompleted;
  const cards = [
    { value: statistics.total, label: "Всего тревог сегодня" },
    { value: statistics.yellow, label: "Жёлтых тревог сегодня", className: "yellow" },
    { value: statistics.red, label: "Красных тревог сегодня", className: "red" },
    { value: statistics.active, label: "Регионов активно сейчас" },
    {
      value: statistics.regionLeader.count ? `${statistics.regionLeader.id} — ${statistics.regionLeader.name}` : "—",
      label: statistics.regionLeader.count ? `${statistics.regionLeader.count} событий · больше всего сегодня` : "Событий пока нет",
      text: true
    },
    {
      value: longest ? formatTotalMinutes(longest.durationMinutes) : "—",
      label: longest ? `Самая долгая завершённая · ${longest.regionId} — ${longest.regionName}` : "Завершённых тревог пока нет",
      text: true
    }
  ];
  document.querySelector("#statistics-grid").innerHTML = cards.map(card => `
    <div class="stat-item ${card.className || ""}">
      <strong class="stat-value${card.text ? " text" : ""}">${card.value}</strong>
      <span class="stat-label">${card.label}</span>
    </div>`).join("");
  document.querySelector("#duration-list").innerHTML = statistics.durations.length
    ? statistics.durations.map(region => `
      <div class="duration-row">
        <span class="duration-region">${region.id} — ${region.name}</span>
        <span class="duration-value">${formatTotalMinutes(region.totalMinutes)}</span>
      </div>`).join("")
    : '<div class="empty-history">Сегодня тревог не было.</div>';
}

function updateDurations() {
  document.querySelectorAll(".duration[data-since]").forEach(element => {
    element.textContent = formatDuration(Number(element.dataset.since));
  });
}

function updateClock(now = simulationNow()) {
  const current = new Date(now);
  const date = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(current);
  const time = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(current);
  document.querySelector("#current-time").textContent = `${date} · ${time}`;
  updateDurations();
  renderSimulationLabClock(now);
}

function setSimulationLabSpeed(speed) {
  const virtualNow = simulationNow();
  simulationLabClock.virtualAnchorMs = virtualNow;
  simulationLabClock.realAnchorMs = Date.now();
  simulationLabClock.speed = speed;
  scheduleNextSimulationUpdate(virtualNow);
  renderSimulationLabClock(virtualNow);
}

function setSimulationLabTime(virtualTimeMs, speed = simulationLabClock.speed) {
  simulationLabClock.virtualAnchorMs = virtualTimeMs;
  simulationLabClock.realAnchorMs = Date.now();
  simulationLabClock.speed = speed;
  simulationCache = null;
  historyCache = null;
  dailyStatisticsCache = null;
  lastSimulationSecond = null;
  notificationSecond = Math.floor(virtualTimeMs / 1000);
  updateSimulationIfNeeded(virtualTimeMs);
  scheduleNextSimulationUpdate(virtualTimeMs);
  renderSimulationLabClock(virtualTimeMs);
}

function renderSimulationLabClock(now = simulationNow()) {
  if (!SIMULATION_LAB_ENABLED) return;
  const clock = document.querySelector("#simulation-lab-clock");
  if (!clock) return;
  clock.textContent = `${new Date(now).toISOString().replace("T", " ").replace(".000Z", " UTC")} · ${simulationLabClock.speed}×`;
  document.querySelectorAll("[data-lab-speed]").forEach(button => {
    button.classList.toggle("active", Number(button.dataset.labSpeed) === simulationLabClock.speed);
  });
}

function createAuditDelta(deltas, second) {
  if (!deltas.has(second)) deltas.set(second, { calm: 0, regions: new Map() });
  return deltas.get(second);
}

function addAuditRegionDelta(deltas, second, regionId, status, amount) {
  const delta = createAuditDelta(deltas, second);
  if (!delta.regions.has(regionId)) delta.regions.set(regionId, { yellow: 0, red: 0 });
  delta.regions.get(regionId)[status] += amount;
}

function auditEventDrivenSimulation(durationSeconds) {
  const startSecond = Math.floor(simulationNow() / 1000);
  const endSecond = startSecond + durationSeconds;
  const events = attackEventsForRange(startSecond, endSecond);
  const loggedEvents = events.filter(event => event.startedAt >= startSecond && event.startedAt < endSecond);
  const counts = Object.fromEntries(REGIONS.map(region => [region.id, { yellow: 0, red: 0 }]));
  const statuses = Object.fromEntries(REGIONS.map(region => [region.id, "clear"]));
  const stateSince = Object.fromEntries(REGIONS.map(region => [region.id, startSecond]));
  const statistics = Object.fromEntries(REGIONS.map(region => [region.id, {
    yellowSeconds: 0,
    redSeconds: 0,
    alerts: 0,
    transitions: 0,
    longestSeconds: 0,
    activeSince: null
  }]));
  const deltas = new Map();
  const anomalies = [];
  let calmCount = 0;

  for (const event of events) {
    if (!Number.isInteger(event.startedAt) || !Number.isInteger(event.endsAt) || event.endsAt <= event.startedAt) {
      anomalies.push(`${event.id}: некорректные временные границы`);
    }
    if (event.type === "calm") {
      if (event.startedAt <= startSecond && event.endsAt > startSecond) calmCount++;
      if (event.startedAt > startSecond && event.startedAt <= endSecond) createAuditDelta(deltas, event.startedAt).calm++;
      if (event.endsAt > startSecond && event.endsAt <= endSecond) createAuditDelta(deltas, event.endsAt).calm--;
      continue;
    }

    const effects = effectsForAttackEvent(event);
    const affectedIds = new Set(effects.map(effect => effect.regionId));
    for (const effect of effects) {
      const depth = EVENT_DEPTH_BY_ZONE[REGION_RISK[effect.regionId].zone];
      if (depth >= 3 && event.type !== "large_wave" && event.type !== "long_range_strike") {
        anomalies.push(`${event.id}: необъяснимая тревога глубокого тыла в регионе ${effect.regionId}`);
      }
      if (event.type !== "long_range_strike" && effect.regionId !== event.originRegionId
          && !REGION_NEIGHBORS[effect.regionId].some(id => affectedIds.has(id))) {
        anomalies.push(`${event.id}: регион ${effect.regionId} не связан с волной`);
      }
      if (event.type !== "long_range_strike" && effect.regionId !== event.originRegionId && effect.delay < 20) {
        anomalies.push(`${event.id}: слишком малая задержка региона ${effect.regionId}`);
      }
      let previousPhaseEnd = null;
      for (const phase of effect.phases) {
        if (phase.endsAt <= phase.startedAt || (previousPhaseEnd !== null && phase.startedAt < previousPhaseEnd)) {
          anomalies.push(`${event.id}: пересечение фаз региона ${effect.regionId}`);
        }
        const maximumSameState = MAX_SAME_STATE_DURATION_BY_DEPTH[depth][1];
        if (phase.endsAt - phase.startedAt > maximumSameState) {
          anomalies.push(`${event.id}: слишком длинная фаза региона ${effect.regionId}`);
        }
        previousPhaseEnd = phase.endsAt;
        if (phase.startedAt <= startSecond && phase.endsAt > startSecond) counts[effect.regionId][phase.status]++;
        if (phase.startedAt > startSecond && phase.startedAt <= endSecond) {
          addAuditRegionDelta(deltas, phase.startedAt, effect.regionId, phase.status, 1);
        }
        if (phase.endsAt > startSecond && phase.endsAt <= endSecond) {
          addAuditRegionDelta(deltas, phase.endsAt, effect.regionId, phase.status, -1);
        }
      }
    }
  }

  function statusFromCounts(regionId) {
    if (calmCount > 0) return "clear";
    return counts[regionId].red > 0 ? "red"
      : counts[regionId].yellow > 0 ? "yellow" : "clear";
  }

  for (const region of REGIONS) {
    statuses[region.id] = statusFromCounts(region.id);
    if (statuses[region.id] !== "clear") {
      statistics[region.id].alerts = 1;
      statistics[region.id].activeSince = startSecond;
    }
  }

  let previousSecond = startSecond;
  let maxSimultaneousOutsideCalm = 0;
  let allClearSeconds = 0;
  for (const second of [...deltas.keys()].filter(value => value > startSecond && value <= endSecond).sort((a, b) => a - b)) {
    const elapsed = second - previousSecond;
    const activeIds = REGIONS.filter(region => statuses[region.id] !== "clear").map(region => region.id);
    if (!activeIds.length) allClearSeconds += elapsed;
    for (const region of REGIONS) {
      if (statuses[region.id] === "yellow") statistics[region.id].yellowSeconds += elapsed;
      if (statuses[region.id] === "red") statistics[region.id].redSeconds += elapsed;
    }

    const delta = deltas.get(second);
    calmCount += delta.calm;
    for (const [regionId, change] of delta.regions) {
      counts[regionId].yellow += change.yellow;
      counts[regionId].red += change.red;
    }
    let simultaneousChanges = 0;
    for (const region of REGIONS) {
      const previousStatus = statuses[region.id];
      const status = statusFromCounts(region.id);
      if (status === previousStatus) continue;
      if (previousStatus !== "clear") {
        const depth = EVENT_DEPTH_BY_ZONE[REGION_RISK[region.id].zone];
        const maximumSameState = MAX_SAME_STATE_DURATION_BY_DEPTH[depth][1];
        if (second - stateSince[region.id] > maximumSameState * 2.5) {
          anomalies.push(`Регион ${region.id}: состояние ${previousStatus} не менялось слишком долго`);
        }
      }
      simultaneousChanges++;
      statistics[region.id].transitions++;
      if (previousStatus === "clear" && status !== "clear") {
        statistics[region.id].alerts++;
        statistics[region.id].activeSince = second;
      } else if (previousStatus !== "clear" && status === "clear") {
        const activeSince = statistics[region.id].activeSince ?? startSecond;
        statistics[region.id].longestSeconds = Math.max(statistics[region.id].longestSeconds, second - activeSince);
        statistics[region.id].activeSince = null;
      }
      statuses[region.id] = status;
      stateSince[region.id] = second;
    }
    if (calmCount === 0 && delta.calm === 0) {
      maxSimultaneousOutsideCalm = Math.max(maxSimultaneousOutsideCalm, simultaneousChanges);
    }
    previousSecond = second;
  }

  const remaining = endSecond - previousSecond;
  if (remaining > 0) {
    const activeIds = REGIONS.filter(region => statuses[region.id] !== "clear").map(region => region.id);
    if (!activeIds.length) allClearSeconds += remaining;
    for (const region of REGIONS) {
      if (statuses[region.id] === "yellow") statistics[region.id].yellowSeconds += remaining;
      if (statuses[region.id] === "red") statistics[region.id].redSeconds += remaining;
    }
  }
  for (const region of REGIONS) {
    if (statuses[region.id] !== "clear") {
      const depth = EVENT_DEPTH_BY_ZONE[REGION_RISK[region.id].zone];
      const maximumSameState = MAX_SAME_STATE_DURATION_BY_DEPTH[depth][1];
      if (endSecond - stateSince[region.id] > maximumSameState * 2.5) {
        anomalies.push(`Регион ${region.id}: состояние ${statuses[region.id]} не менялось слишком долго`);
      }
    }
    if (statistics[region.id].activeSince !== null) {
      statistics[region.id].longestSeconds = Math.max(
        statistics[region.id].longestSeconds,
        endSecond - statistics[region.id].activeSince
      );
    }
  }

  const calmEvents = loggedEvents.filter(event => event.type === "calm");
  for (const event of calmEvents) {
    const sample = Math.floor((event.startedAt + event.endsAt) / 2);
    const sampleEvents = attackEventsForRange(sample, sample);
    if (REGIONS.some(region => eventDrivenRegionStatus(region.id, sample, sampleEvents) !== "clear")) {
      anomalies.push(`${event.id}: окно затишья не очистило карту`);
    }
  }
  if (maxSimultaneousOutsideCalm > 12) {
    anomalies.push(`Слишком много одновременных переходов вне затишья: ${maxSimultaneousOutsideCalm}`);
  }

  const regionRows = REGIONS.map(region => {
    const values = statistics[region.id];
    const totalActive = values.yellowSeconds + values.redSeconds;
    return {
      id: region.id,
      name: region.name,
      zone: REGION_RISK[region.id].zone,
      alerts: values.alerts,
      transitions: values.transitions,
      yellowMinutes: Math.floor(values.yellowSeconds / 60),
      redMinutes: Math.floor(values.redSeconds / 60),
      longestMinutes: Math.floor(values.longestSeconds / 60),
      activePercent: totalActive / durationSeconds * 100
    };
  });
  const eventCounts = {};
  for (const event of loggedEvents) eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
  return {
    startSecond,
    endSecond,
    durationSeconds,
    events: loggedEvents,
    eventCounts,
    regionRows,
    anomalies: [...new Set(anomalies)],
    allClearSeconds,
    maxSimultaneousOutsideCalm
  };
}

function testSimulationDeterminism(durationSeconds) {
  const startSecond = Math.floor(simulationNow() / 1000);
  const samples = 24;
  for (let index = 0; index <= samples; index++) {
    const second = startSecond + Math.floor(durationSeconds * index / samples);
    const first = calculateSimulation(second);
    const secondRun = calculateSimulation(second);
    if (JSON.stringify(first.states) !== JSON.stringify(secondRun.states)
        || first.nextTransitionSecond !== secondRun.nextTransitionSecond) {
      return { passed: false, second };
    }
  }
  return { passed: true, samples: samples + 1 };
}

function formatAuditMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours ? `${hours} ч ${rest} мин` : `${rest} мин`;
}

function renderSimulationAudit(audit) {
  const summary = document.querySelector("#simulation-lab-summary");
  summary.innerHTML = `
    <strong>${Object.values(audit.eventCounts).reduce((sum, value) => sum + value, 0)} событий</strong>
    <span>Полностью спокойно: ${formatAuditMinutes(Math.floor(audit.allClearSeconds / 60))}</span>
    <span>Максимум одновременных переходов вне затишья: ${audit.maxSimultaneousOutsideCalm}</span>
    <span>${Object.entries(audit.eventCounts).map(([type, count]) => `${type}: ${count}`).join(" · ")}</span>`;
  document.querySelector("#simulation-lab-anomalies").innerHTML = audit.anomalies.length
    ? audit.anomalies.map(item => `<li>${item}</li>`).join("")
    : "<li>Аномалии не обнаружены.</li>";
  document.querySelector("#simulation-lab-regions tbody").innerHTML = audit.regionRows.map(row => `
    <tr>
      <td>${row.id}</td><td>${row.name}</td><td>${row.zone}</td>
      <td>${row.alerts}</td><td>${row.transitions}</td>
      <td>${formatAuditMinutes(row.yellowMinutes)}</td><td>${formatAuditMinutes(row.redMinutes)}</td>
      <td>${formatAuditMinutes(row.longestMinutes)}</td><td>${row.activePercent.toFixed(1)}%</td>
    </tr>`).join("");
  document.querySelector("#simulation-lab-events tbody").innerHTML = [...audit.events]
    .sort((a, b) => b.startedAt - a.startedAt)
    .slice(0, 500)
    .map(event => `
      <tr>
        <td>${new Date(event.startedAt * 1000).toISOString().replace("T", " ").slice(0, 19)}</td>
        <td>${event.type}</td><td>${event.originSector}</td>
        <td>${event.severity.toFixed(2)}</td><td>${event.maxDepth}</td>
        <td>${effectsForAttackEvent(event).length}</td>
      </tr>`).join("");
}

function runSimulationLabAudit(durationSeconds) {
  const status = document.querySelector("#simulation-lab-status");
  status.textContent = "Выполняется аудит…";
  setTimeout(() => {
    const startedAt = performance.now();
    const audit = auditEventDrivenSimulation(durationSeconds);
    renderSimulationAudit(audit);
    status.textContent = `Готово за ${Math.round(performance.now() - startedAt)} мс`;
  }, 0);
}

function initializeSimulationLab() {
  if (!SIMULATION_LAB_ENABLED) return;
  const style = document.createElement("style");
  style.textContent = `
    .simulation-lab{position:fixed;z-index:1000;right:12px;bottom:12px;width:min(720px,calc(100vw - 24px));max-height:82vh;overflow:auto;background:#171a1e;color:#f4f4f4;border:1px solid #4a5159;border-radius:12px;box-shadow:0 14px 40px #0009;font:12px/1.4 system-ui,sans-serif}
    .simulation-lab summary{position:sticky;top:0;z-index:2;padding:10px 12px;background:#20242a;cursor:pointer;font-weight:700}
    .simulation-lab-body{padding:10px}.simulation-lab h3{margin:12px 0 6px;font-size:13px}.simulation-lab-controls{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}
    .simulation-lab button{padding:5px 8px;color:inherit;background:#292f36;border:1px solid #515b66;border-radius:6px;cursor:pointer}.simulation-lab button.active{background:#8b6420;border-color:#e6b94a}
    .simulation-lab-clock{font:600 13px/1.4 ui-monospace,monospace}.simulation-lab-summary{display:grid;gap:3px;margin:8px 0}.simulation-lab-status{color:#b9c0c8}
    .simulation-lab-table-wrap{max-height:220px;overflow:auto;border:1px solid #394049;border-radius:6px}.simulation-lab table{width:100%;border-collapse:collapse;white-space:nowrap}.simulation-lab th,.simulation-lab td{padding:4px 6px;border-bottom:1px solid #30363d;text-align:left}.simulation-lab th{position:sticky;top:0;background:#252a30}.simulation-lab-anomalies{margin:4px 0;padding-left:20px}
    @media(max-width:640px){.simulation-lab{right:6px;bottom:6px;width:calc(100vw - 12px);max-height:70vh}}
  `;
  document.head.append(style);
  const lab = document.createElement("details");
  lab.className = "simulation-lab";
  lab.open = true;
  lab.innerHTML = `
    <summary>Simulation Lab · только ?debug=1</summary>
    <div class="simulation-lab-body">
      <div class="simulation-lab-clock" id="simulation-lab-clock"></div>
      <div class="simulation-lab-controls" aria-label="Скорость симуляции">
        ${[1, 2, 10, 60, 360].map(speed => `<button type="button" data-lab-speed="${speed}">${speed}×</button>`).join("")}
      </div>
      <div class="simulation-lab-controls" aria-label="Переход по времени">
        ${[-24, -6, -1, 1, 6, 24].map(hours => `<button type="button" data-lab-jump="${hours}">${hours > 0 ? "+" : ""}${hours} ч</button>`).join("")}
        <button type="button" id="simulation-lab-now">Вернуться к текущему времени</button>
      </div>
      <h3>Быстрый аудит</h3>
      <div class="simulation-lab-controls">
        <button type="button" data-lab-audit="86400">24 ч</button>
        <button type="button" data-lab-audit="172800">48 ч</button>
        <button type="button" data-lab-audit="604800">7 дней</button>
        <button type="button" data-lab-audit="2592000">30 дней</button>
        <button type="button" id="simulation-lab-determinism">Тест детерминизма</button>
      </div>
      <div class="simulation-lab-status" id="simulation-lab-status">Выберите период аудита.</div>
      <div class="simulation-lab-summary" id="simulation-lab-summary"></div>
      <h3>Аномалии</h3><ul class="simulation-lab-anomalies" id="simulation-lab-anomalies"><li>Аудит ещё не запускался.</li></ul>
      <h3>Статистика регионов</h3>
      <div class="simulation-lab-table-wrap"><table id="simulation-lab-regions"><thead><tr><th>ID</th><th>Регион</th><th>Зона</th><th>Тревоги</th><th>Переходы</th><th>Жёлтый</th><th>Красный</th><th>Макс.</th><th>Активен</th></tr></thead><tbody></tbody></table></div>
      <h3>Журнал событий</h3>
      <div class="simulation-lab-table-wrap"><table id="simulation-lab-events"><thead><tr><th>UTC</th><th>Тип</th><th>Сектор</th><th>Сила</th><th>Глубина</th><th>Регионов</th></tr></thead><tbody></tbody></table></div>
    </div>`;
  document.body.append(lab);
  lab.addEventListener("click", event => {
    const speedButton = event.target.closest("[data-lab-speed]");
    if (speedButton) setSimulationLabSpeed(Number(speedButton.dataset.labSpeed));
    const jumpButton = event.target.closest("[data-lab-jump]");
    if (jumpButton) setSimulationLabTime(simulationNow() + Number(jumpButton.dataset.labJump) * 60 * 60 * 1000);
    const auditButton = event.target.closest("[data-lab-audit]");
    if (auditButton) runSimulationLabAudit(Number(auditButton.dataset.labAudit));
  });
  document.querySelector("#simulation-lab-now").addEventListener("click", () => setSimulationLabTime(Date.now(), 1));
  document.querySelector("#simulation-lab-determinism").addEventListener("click", () => {
    const result = testSimulationDeterminism(30 * 24 * 60 * 60);
    document.querySelector("#simulation-lab-status").textContent = result.passed
      ? `Детерминизм подтверждён: ${result.samples} контрольных точек.`
      : `Ошибка детерминизма на ${new Date(result.second * 1000).toISOString()}.`;
  });
  renderSimulationLabClock();
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
document.querySelector("#statistics-button").addEventListener("click", () => {
  renderStatistics();
  statisticsDialog.showModal();
});
document.querySelector("#statistics-close").addEventListener("click", () => statisticsDialog.close());
statisticsDialog.addEventListener("click", event => {
  if (event.target === statisticsDialog) statisticsDialog.close();
});
document.querySelector("#history-button").addEventListener("click", () => {
  renderHistory();
  historyDialog.showModal();
});
document.querySelector("#history-close").addEventListener("click", () => historyDialog.close());
historyDialog.addEventListener("click", event => {
  if (event.target === historyDialog) historyDialog.close();
});
document.querySelector(".history-filters").addEventListener("click", event => {
  const button = event.target.closest("[data-history-filter]");
  if (!button) return;
  historyFilter = button.dataset.historyFilter;
  document.querySelectorAll("[data-history-filter]").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderHistory();
});

mapObject.addEventListener("load", bindMap);
if (mapObject.contentDocument?.querySelector("[data-region-id]")) bindMap();

validateSimulationConfig();
setTheme(getTheme(), false);
let savedThreatsCollapsed = false;
try { savedThreatsCollapsed = localStorage.getItem(COLLAPSE_KEY) === "true"; } catch (_) {}
setThreatsCollapsed(window.matchMedia("(max-width: 640px)").matches || savedThreatsCollapsed);
initializeSimulationLab();
updateSimulationIfNeeded();
scheduleNextSimulationUpdate();
setInterval(updateClock, 1000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateSimulationIfNeeded();
    scheduleNextSimulationUpdate();
  }
});
window.addEventListener("focus", () => {
  updateSimulationIfNeeded();
  scheduleNextSimulationUpdate();
});
