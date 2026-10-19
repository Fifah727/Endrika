// Petits utilitaires de couleur : on part d'une couleur de base choisie par
// l'utilisateur et on en dérive les ombres, reflets et mèches.

const toRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (rgb) =>
  "#" +
  rgb
    .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0"))
    .join("");

/** Mélange a vers b (t = 0 → a, t = 1 → b). */
export const mix = (a, b, t) => {
  const A = toRgb(a);
  const B = toRgb(b);
  return toHex(A.map((v, i) => v + (B[i] - v) * t));
};

export const darken = (c, t) => mix(c, "#000000", t);
export const lighten = (c, t) => mix(c, "#ffffff", t);

/** Luminance perçue, de 0 (noir) à 1 (blanc). */
export const lum = (hex) => {
  const [r, g, b] = toRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/** Teintes dérivées d'une couleur de cheveux. */
export const hairTones = (base) => {
  const light = lum(base) > 0.55;
  const warm = light ? "#5A3F2C" : "#C8A58C";
  return {
    base,
    back: mix(base, warm, light ? 0.18 : 0.16),
    strand: mix(base, warm, light ? 0.25 : 0.25),
    shine: light ? mix(base, "#ffffff", 0.5) : mix(base, "#C8A58C", 0.5),
    brow: mix(base, "#120C0A", light ? 0.55 : 0.2),
  };
};

/** Teintes dérivées d'une couleur de vêtement. */
export const clothTones = (base) => ({
  base,
  ring: darken(base, 0.23),
  shade: darken(base, 0.31),
  deep: darken(base, 0.45),
  light: lighten(base, 0.18),
  collar: lum(base) > 0.75 ? "#FFFFFF" : lighten(base, 0.8),
});

/** Reconstruit une ambiance complète à partir d'une couleur de mur choisie librement. */
export const deriveTheme = (base, bg) => {
  const dark = lum(bg) < 0.4;
  return {
    ...base,
    wall: bg,
    dot: dark ? lighten(bg, 0.2) : darken(bg, 0.14),
    plinth: dark ? darken(bg, 0.25) : darken(bg, 0.05),
    plinthLine: dark ? lighten(bg, 0.12) : darken(bg, 0.12),
    haloShadow: dark ? darken(bg, 0.35) : darken(bg, 0.1),
    halo: dark ? lighten(bg, 0.14) : lighten(bg, 0.55),
    ray: dark ? lighten(bg, 0.5) : "#FFFFFF",
    rayOpacity: dark ? 0.12 : 0.35,
    orbit: dark ? lighten(bg, 0.3) : darken(bg, 0.22),
    dark,
  };
};
