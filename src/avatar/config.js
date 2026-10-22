import { COLOR_KEYS, DEFAULTS, FLAGS, HEADWEAR_COLOR, LISTS, NECK_FOR, OUTFIT_COLOR, isHex } from "./catalog";

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
  for (const key of FLAGS) {
    if (typeof input[key] === "boolean") out[key] = input[key];
  }
  return harmonize(out, null);
}

/**
 * Garde l'avatar cohérent. `changed` = la clé que l'utilisateur vient de modifier (ou null).
 *  - un accessoire de cou doit aller avec le vêtement ;
 *  - un casque audio ne se porte pas avec un couvre-chef (et cache les boucles d'oreilles) ;
 *  - toque, casque de chantier et mortier reprennent leur couleur naturelle ; blouse et uniforme aussi.
 */
export function harmonize(c, changed = null) {
  const out = { ...c };
  if (!(NECK_FOR[out.outfit] ?? ["aucun"]).includes(out.neck)) out.neck = "aucun";
  if (out.earphones === "casque" && out.headwear !== "aucun") {
    if (changed === "earphones") out.headwear = "aucun";
    else out.earphones = "filaires";
  }
  if (out.earphones === "casque") out.earrings = "aucune";
  if (changed === "headwear") {
    const natural = HEADWEAR_COLOR[out.headwear];
    if (natural) out.headColor = natural;
    else if (Object.values(HEADWEAR_COLOR).includes(out.headColor)) out.headColor = "auto";
  }
  if (changed === "outfit" && OUTFIT_COLOR[out.outfit]) out.outfitColor = OUTFIT_COLOR[out.outfit];
  return out;
}

/** Fusionne un correctif (catégorie, look, palette, inspiration…) dans une config valide. */
export const applyPatch = (config, patch) => sanitize({ ...config, ...patch });

/** Tire un avatar au hasard, mais cohérent (vêtement, cou, couvre-chef et audio compatibles). */
export function randomize(current, rng = Math.random) {
  const pick = (arr) => arr[Math.floor(rng() * arr.length)].id;
  const oneOf = (ids) => ids[Math.floor(rng() * ids.length)];
  const next = { ...current };
  for (const key of ["skin", "face", "build", "eyes", "expression", "hair", "hairColor", "glasses", "frame", "outfit", "outfitColor", "theme"]) {
    next[key] = pick(LISTS[key]);
  }
  if (OUTFIT_COLOR[next.outfit] && rng() < 0.8) next.outfitColor = OUTFIT_COLOR[next.outfit];
  const necks = NECK_FOR[next.outfit] ?? ["aucun"];
  next.neck = rng() < 0.4 ? oneOf(necks) : "aucun";
  next.headwear = rng() < 0.4 ? pick(LISTS.headwear) : "aucun";
  next.headColor = HEADWEAR_COLOR[next.headwear] ?? (rng() < 0.7 ? "auto" : pick(LISTS.outfitColor));
  next.earphones = next.headwear !== "aucun" ? oneOf(["aucun", "filaires"]) : pick(LISTS.earphones);
  next.earrings = rng() < 0.35 ? pick(LISTS.earrings) : "aucune";
  next.facialHair = rng() < 0.25 ? pick(LISTS.facialHair) : "aucune";
  next.faceArt = rng() < 0.3 ? pick(LISTS.faceArt) : "aucun";
  next.freckles = rng() < 0.3;
  if (rng() < 0.3) next.glasses = "aucune";
  next.effect = rng() < 0.35 ? pick(LISTS.effect) : "aucun";
  return harmonize(next, null);
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

export function configFromQuery(query) {
  const p = new URLSearchParams(query || "");
  if ([...p.keys()].length === 0) return null;
  const raw = {};
  for (const [k, v] of p) {
    raw[k] = FLAGS.includes(k) ? v === "true" : v;
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
