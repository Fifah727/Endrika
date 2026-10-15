import { DEFAULTS, FLAGS, LISTS } from "./catalog";

const STORAGE_KEY = "avatar-studio:config:v1";

/** Ne garde que des valeurs connues ; tout le reste retombe sur le défaut. */
export function sanitize(input = {}) {
  const out = { ...DEFAULTS };
  for (const key of Object.keys(LISTS)) {
    const v = input[key];
    if (typeof v === "string" && LISTS[key].some((o) => o.id === v)) out[key] = v;
  }
  for (const key of FLAGS) {
    if (typeof input[key] === "boolean") out[key] = input[key];
  }
  return out;
}

/** Choisit une valeur au hasard dans chaque catégorie de l'apparence. */
export function randomize(current) {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)].id;
  const next = { ...current };
  for (const key of [
    "skin", "face", "build", "eyes", "hair", "hairColor", "glasses", "frame",
    "headwear", "headColor", "earphones", "earrings", "outfit", "outfitColor", "theme",
  ]) {
    next[key] = pick(LISTS[key]);
  }
  // Pilosité : plus rare qu'une valeur uniforme ; taches de rousseur : une fois sur trois.
  next.facialHair = Math.random() < 0.3 ? pick(LISTS.facialHair) : "aucune";
  next.freckles = Math.random() < 0.33;
  // Les lunettes et couvre-chefs restent fréquents mais pas systématiques.
  if (Math.random() < 0.35) next.glasses = "aucune";
  if (Math.random() < 0.6) next.headwear = "aucun";
  if (Math.random() < 0.4) next.earrings = "aucune";
  return next;
}

// ── Lien partageable : seules les valeurs différentes du défaut sont écrites ──
export function toHash(config) {
  const p = new URLSearchParams();
  for (const key of Object.keys(DEFAULTS)) {
    if (config[key] !== DEFAULTS[key]) p.set(key, String(config[key]));
  }
  const s = p.toString();
  return s ? `#${s}` : "";
}

export function fromHash(hash) {
  const p = new URLSearchParams((hash || "").replace(/^#/, ""));
  if ([...p.keys()].length === 0) return null;
  const raw = {};
  for (const [k, v] of p) {
    raw[k] = FLAGS.includes(k) ? v === "true" : v;
  }
  return sanitize(raw);
}

export function loadConfig() {
  const fromUrl = fromHash(typeof location !== "undefined" ? location.hash : "");
  if (fromUrl) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return sanitize(JSON.parse(saved));
  } catch {
    /* stockage indisponible : on repart du défaut */
  }
  return { ...DEFAULTS };
}

export function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* ignoré */
  }
}

/** Lien complet vers l'avatar courant. */
export function shareUrl(config) {
  return `${location.origin}${location.pathname}${toHash(config)}`;
}
