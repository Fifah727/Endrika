import { COLOR_KEYS, DEFAULTS, FLAGS, LISTS, isHex } from "./catalog";

const STORAGE_KEY = "endrika:config:v2";
const CREATIONS_KEY = "endrika:creations:v1";
const FAVORITES_KEY = "endrika:favorites:v1";

/** Ne garde que des valeurs connues ; tout le reste retombe sur le défaut. */
export function sanitize(input = {}) {
  const out = { ...DEFAULTS };
  for (const key of Object.keys(LISTS)) {
    const v = input[key];
    if (typeof v !== "string") continue;
    if (LISTS[key].some((o) => o.id === v) || (COLOR_KEYS.includes(key) && isHex(v))) out[key] = v;
  }
  if (input.bgColor === "" || isHex(input.bgColor)) out.bgColor = input.bgColor;
  for (const key of FLAGS) {
    if (typeof input[key] === "boolean") out[key] = input[key];
  }
  return out;
}

/** Fusionne un correctif (catégorie, look, palette, inspiration…) dans une config valide. */
export const applyPatch = (config, patch) => sanitize({ ...config, ...patch });

/** Choisit une valeur au hasard dans chaque catégorie de l'apparence. */
export function randomize(current, rng = Math.random) {
  const pick = (arr) => arr[Math.floor(rng() * arr.length)].id;
  const next = { ...current };
  for (const key of [
    "skin", "face", "head", "build", "eyes", "expression", "hair", "hairColor", "glasses", "frame",
    "headwear", "headColor", "earphones", "neck", "outfit", "outfitColor", "theme", "style",
  ]) {
    next[key] = pick(LISTS[key]);
  }
  next.facialHair = rng() < 0.3 ? pick(LISTS.facialHair) : "aucune";
  next.freckles = rng() < 0.33;
  next.faceArt = rng() < 0.4 ? pick(LISTS.faceArt) : "aucun";
  next.earrings = rng() < 0.4 ? pick(LISTS.earrings) : "aucune";
  if (rng() < 0.35) next.glasses = "aucune";
  if (rng() < 0.55) next.headwear = "aucun";
  if (rng() < 0.6) next.neck = "aucun";
  if (rng() < 0.7) next.style = "editorial";
  next.effect = rng() < 0.4 ? pick(LISTS.effect) : "aucun";
  return next;
}

// ── Lien partageable : seules les valeurs différentes du défaut sont écrites ──
// Forme : #/creer?hair=boucles&skin=ebene
export function configToQuery(config) {
  const p = new URLSearchParams();
  for (const key of Object.keys(DEFAULTS)) {
    if (config[key] !== DEFAULTS[key]) p.set(key, String(config[key]));
  }
  return p.toString();
}

const LEGACY = {
  laptop: (v) => ({ desk: v === "false" ? "rien" : "laptop" }),
  shelves: (v) => ({ wall: v === "false" ? "rien" : "etageres" }),
  codeCard: (v) => ({ card: v === "false" ? "rien" : "code" }),
  symbols: (v) => ({ floaters: v === "false" ? "rien" : "code" }),
};

export function configFromQuery(query) {
  const p = new URLSearchParams(query || "");
  if ([...p.keys()].length === 0) return null;
  const raw = {};
  for (const [k, v] of p) {
    if (LEGACY[k]) Object.assign(raw, LEGACY[k](v));
    else raw[k] = FLAGS.includes(k) ? v === "true" : v;
  }
  return sanitize(raw);
}

// ── Stockage local (jamais bloquant : si indisponible, on continue sans) ────
const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const loadConfig = () => {
  const saved = read(STORAGE_KEY, null);
  return saved ? sanitize(saved) : { ...DEFAULTS };
};
export const saveConfig = (config) => write(STORAGE_KEY, config);

export const loadCreations = () =>
  read(CREATIONS_KEY, []).filter((c) => c && c.id && c.config).map((c) => ({ ...c, config: sanitize(c.config) }));
export const saveCreations = (list) => write(CREATIONS_KEY, list);

export const loadFavorites = () => {
  const v = read(FAVORITES_KEY, []);
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
};
export const saveFavorites = (list) => write(FAVORITES_KEY, list);
