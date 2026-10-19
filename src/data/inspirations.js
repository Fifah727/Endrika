import { byId, CATEGORIES, DEFAULTS } from "../avatar/catalog";
import { applyPatch, configFromQuery, configToQuery, randomize } from "../avatar/config";
import { deriveTheme, lum } from "../avatar/color";
import { COLLECTIONS, COLOR_BUCKETS } from "./collections";

// Cadrages de cartes (largeur : hauteur variables → grille masonry)
export const RATIOS = {
  tall: "75 0 250 400",
  portrait: "40 10 320 390",
  square: "20 20 360 360",
  wide: "0 40 400 320",
};

const I = (id, collection, title, note, ratio, patch) => ({ id, collection, title, note, ratio, patch });

// Chaque inspiration est une VRAIE configuration de l'éditeur : on peut tout modifier ensuite.
export const INSPIRATIONS = [
  // ── Cute & Coquette ──
  I("ruban-rose", "cute", "Ruban rose", "Couettes, nœud et cœurs flottants : un bonbon sur pattes.", "tall",
    { category: "libre", style: "pastel", theme: "bonbon", skin: "porcelaine", hair: "couettes", hairColor: "chatain", head: "chibi", outfit: "pull", outfitColor: "rose", headwear: "noeud", headColor: "rose", glasses: "aucune", faceArt: "coeur", expression: "grand", freckles: true, floaters: "cute", effect: "coeurs", desk: "rien", card: "notes", wall: "guirlande", neck: "perles", earrings: "perles", earphones: "aucun", activity: "chill" }),
  I("chaton", "cute", "Chaton rêveur", "Oreilles de chat, étoiles sur les joues et sourire malicieux.", "square",
    { category: "libre", style: "sticker", theme: "peche", skin: "sable", hair: "bob", hairColor: "blond", head: "douce", outfit: "tee", outfitColor: "#E4D9BF", headwear: "chat", headColor: "#F4F1EA", glasses: "aucune", faceArt: "etoiles", expression: "malin", effect: "etoiles", desk: "livre", card: "rien", wall: "cadres", floaters: "cute", earphones: "aucun", activity: "chill" }),
  I("fraise-creme", "cute", "Fraise & crème", "Tablier rose, queue de cheval et foulard assorti.", "portrait",
    { category: "metier", style: "pastel", theme: "bonbon", skin: "miel", hair: "queue", hairColor: "rose", outfit: "tablier", outfitColor: "#D58BA0", neck: "foulard", headColor: "#F4F1EA", earrings: "pendantes", glasses: "aucune", expression: "sourire", desk: "planche", card: "rien", wall: "cadres", floaters: "cute", effect: "coeurs", earphones: "aucun", activity: "think" }),
  I("cafe-cosy", "cute", "Café cosy", "Pull col roulé, lunettes rondes et pétales qui tombent.", "wide",
    { category: "etudiant", style: "pastel", theme: "peche", skin: "porcelaine", hair: "ondules", hairColor: "brun", outfit: "col", outfitColor: "#9B86C9", glasses: "rondes", frame: "rose", expression: "reveur", effect: "petales", desk: "livre", card: "notes", wall: "cadres", floaters: "cute", earphones: "aucun", activity: "chill" }),

  // ── Soft Pastel ──
  I("lilas-matin", "pastel", "Lilas du matin", "Couronne de fleurs et cheveux lilas dans un décor de lavande.", "tall",
    { category: "creatif", style: "pastel", theme: "lavande", skin: "porcelaine", hair: "longs", hairColor: "lilas", outfit: "pull", outfitColor: "lilas", headwear: "fleurs", headColor: "#F4F1EA", glasses: "aucune", expression: "sourire", effect: "petales", desk: "cahier", card: "palette", wall: "guirlande", floaters: "art", earphones: "aucun", activity: "chill" }),
  I("menthe-douce", "pastel", "Menthe douce", "Bob menthe, chemise ciel et tablette graphique.", "square",
    { category: "creatif", style: "pastel", theme: "jardin", skin: "sable", hair: "bob", hairColor: "menthe", outfit: "chemise", outfitColor: "ciel", glasses: "rondes", frame: "argent", effect: "bulles", desk: "tablette", card: "palette", wall: "etageres", floaters: "art", earphones: "aucun", activity: "focus" }),
  I("sorbet", "pastel", "Sorbet", "Afro puffs, bandeau moutarde et grand sourire.", "portrait",
    { category: "creatif", style: "pastel", theme: "peche", skin: "noisette", hair: "puffs", hairColor: "brun", outfit: "tee", outfitColor: "rose", headwear: "bandeau", headColor: "moutarde", earrings: "anneaux", glasses: "aucune", expression: "grand", effect: "etoiles", desk: "piano", card: "playlist", wall: "guirlande", floaters: "art", earphones: "aucun", activity: "dance" }),
  I("nuage", "pastel", "Nuage", "Cheveux platine, pull ciel et bulles de savon.", "wide",
    { category: "libre", style: "pastel", theme: "ciel", skin: "porcelaine", hair: "ondules", hairColor: "platine", outfit: "pull", outfitColor: "ciel", glasses: "aucune", expression: "reveur", effect: "bulles", desk: "rien", card: "rien", wall: "rien", floaters: "etoiles", earphones: "aucun", activity: "chill" }),

  // ── Dark Academia ──
  I("bibliotheque", "academia", "Bibliothèque", "Blazer, cravate et lunettes dorées sous la lumière des bougies.", "tall",
    { category: "etudiant", style: "retro", theme: "academia", skin: "sable", hair: "ondules", hairColor: "brun", outfit: "blazer", outfitColor: "#5B3A29", neck: "cravate", headColor: "#D9A53C", glasses: "rondes", frame: "or", expression: "neutre", effect: "lucioles", desk: "livre", card: "notes", wall: "etageres", floaters: "ecole", earphones: "aucun", activity: "focus" }),
  I("poete", "academia", "Le poète", "Béret, écharpe moutarde et cahier de notes.", "square",
    { category: "creatif", style: "retro", theme: "academia", skin: "porcelaine", hair: "court", hairColor: "noir", outfit: "col", outfitColor: "#5B3A29", headwear: "beret", headColor: "#5B3A29", neck: "echarpe", glasses: "aucune", expression: "reveur", effect: "petales", desk: "cahier", card: "notes", wall: "etageres", floaters: "art", earphones: "aucun", activity: "think" }),
  I("diplomee", "academia", "Jour de diplôme", "Mortier, confettis et éclat de rire.", "portrait",
    { category: "etudiant", style: "editorial", theme: "academia", skin: "ebene", hair: "puffs", hairColor: "noir", outfit: "uniforme", outfitColor: "#2F4468", headwear: "mortier", headColor: "#25262A", neck: "cravate", expression: "rieur", glasses: "aucune", desk: "livre", card: "notes", wall: "tableau", floaters: "ecole", effect: "confettis", earphones: "aucun", activity: "celebrate" }),
  I("professeur", "academia", "Le professeur", "Banane argentée, barbe soignée et blazer en tweed.", "wide",
    { category: "metier", style: "retro", theme: "academia", skin: "miel", hair: "pompadour", hairColor: "argent", facialHair: "barbe", outfit: "blazer", outfitColor: "#5B3A29", neck: "noeud", headColor: "#C47A63", glasses: "rect", frame: "noir", desk: "livre", card: "notes", wall: "etageres", floaters: "ecole", effect: "aucun", earphones: "aucun", activity: "think" }),

  // ── Dreamy & Ethereal ──
  I("reverie", "dreamy", "Rêverie", "Paillettes, couronne de fleurs et voile de lumière rosée.", "tall",
    { category: "libre", style: "reve", theme: "ciel", skin: "porcelaine", hair: "longs", hairColor: "platine", outfit: "pull", outfitColor: "#F4F1EA", headwear: "fleurs", headColor: "#F4F1EA", faceArt: "paillettes", expression: "reveur", glasses: "aucune", effect: "etoiles", desk: "rien", card: "rien", wall: "guirlande", floaters: "etoiles", earphones: "aucun", activity: "chill" }),
  I("aurore", "dreamy", "Aurore", "Coucher de soleil, yeux étoilés et chevelure rose.", "square",
    { category: "creatif", style: "reve", theme: "sunset", skin: "sable", hair: "ondules", hairColor: "rose", outfit: "col", outfitColor: "lilas", expression: "etoiles", glasses: "aucune", effect: "lucioles", desk: "tablette", card: "palette", wall: "guirlande", floaters: "art", earphones: "aucun", activity: "chill" }),
  I("lune-argent", "dreamy", "Lune d'argent", "Cheveux argentés et couronne sous un ciel de galaxie.", "portrait",
    { category: "libre", style: "reve", theme: "galaxie", skin: "ebene", hair: "longs", hairColor: "argent", outfit: "blouse", outfitColor: "#F4F1EA", headwear: "couronne", headColor: "#D9B26A", faceArt: "paillettes", expression: "sourire", glasses: "aucune", effect: "etoiles", desk: "rien", card: "rien", wall: "rien", floaters: "etoiles", earphones: "aucun", activity: "chill" }),

  // ── Artistic Soul ──
  I("atelier-peinture", "artistic", "Atelier de peinture", "Béret, tablier tâché de couleur et palette en main.", "tall",
    { category: "creatif", style: "editorial", theme: "lavande", skin: "porcelaine", hair: "chignon", hairColor: "roux", freckles: true, outfit: "tablier", outfitColor: "#C47A63", headwear: "beret", headColor: "#C47A63", glasses: "aucune", expression: "sourire", desk: "tablette", card: "palette", wall: "cadres", floaters: "art", effect: "aucun", earphones: "aucun", activity: "focus" }),
  I("photographe", "artistic", "Photographe", "Noir et blanc, appareil sur le bureau et cadres au mur.", "square",
    { category: "creatif", style: "mono", theme: "papier", skin: "miel", hair: "court", hairColor: "noir", outfit: "chemise", outfitColor: "#25262A", neck: "badge", headColor: "#F4F1EA", glasses: "rect", frame: "noir", desk: "camera", card: "rien", wall: "cadres", floaters: "rien", effect: "aucun", earphones: "aucun", activity: "think", expression: "neutre" }),
  I("studio-musique", "artistic", "Studio musique", "Locks, casque audio et enseigne néon dans la nuit.", "portrait",
    { category: "creatif", style: "editorial", theme: "nuit", skin: "ebene", hair: "locks", hairColor: "brun", outfit: "hoodie", outfitColor: "#D58BA0", earphones: "casque", desk: "piano", card: "playlist", wall: "neon", floaters: "art", effect: "etoiles", expression: "grand", glasses: "aucune", activity: "dance" }),
  I("illustratrice", "artistic", "Illustratrice", "Cat-eye rose, salopette ciel et autocollant épais.", "wide",
    { category: "creatif", style: "sticker", theme: "bonbon", skin: "sable", hair: "bob", hairColor: "menthe", outfit: "salopette", outfitColor: "ciel", glasses: "cateye", frame: "rose", expression: "malin", desk: "tablette", card: "palette", wall: "cadres", floaters: "art", effect: "aucun", earphones: "aucun", activity: "focus" }),

  // ── Digital Creator ──
  I("nuit-code", "digital", "Nuit de code", "Hoodie noir, clavier mécanique et lucioles dans le noir.", "tall",
    { category: "dev", style: "editorial", theme: "nuit", skin: "sable", hair: "court", hairColor: "bleu", outfit: "hoodie", outfitColor: "#25262A", earphones: "casque", glasses: "rect", frame: "noir", desk: "clavier", card: "code", wall: "neon", floaters: "code", effect: "lucioles", activity: "code" }),
  I("streameuse", "digital", "Streameuse", "Couettes roses, casque et cœurs dans la galaxie.", "square",
    { category: "dev", style: "sticker", theme: "galaxie", skin: "porcelaine", hair: "couettes", hairColor: "rose", outfit: "hoodie", outfitColor: "#9B86C9", earphones: "casque", glasses: "aucune", faceArt: "eyeliner", expression: "grand", desk: "laptop", card: "playlist", wall: "neon", floaters: "cute", effect: "coeurs", activity: "dance" }),
  I("dev-minimal", "digital", "Dev minimal", "Crâne rasé, lunettes rondes et zéro distraction.", "portrait",
    { category: "dev", style: "mono", theme: "papier", skin: "noisette", hair: "rase", hairColor: "noir", outfit: "tee", outfitColor: "#25262A", glasses: "rondes", frame: "noir", expression: "neutre", desk: "laptop", card: "code", wall: "rien", floaters: "code", effect: "aucun", earphones: "filaires", activity: "focus", mug: false }),
  I("fullstack-cafe", "digital", "Full-stack café", "L'atelier d'origine : sweat, écouteurs et fenêtre de code.", "wide", {}),

  // ── Study Vibes ──
  I("revisions", "study", "Révisions", "Queue de cheval, casque sur les oreilles et tableau noir.", "tall",
    { category: "etudiant", style: "editorial", theme: "jardin", skin: "miel", hair: "queue", hairColor: "chatain", outfit: "pull", outfitColor: "#6F9482", glasses: "rondes", frame: "marron", expression: "neutre", desk: "cahier", card: "notes", wall: "tableau", floaters: "ecole", earphones: "casque", effect: "aucun", activity: "focus" }),
  I("medecine", "study", "Fac de médecine", "Blouse, stéthoscope et graphiques de résultats.", "square",
    { category: "metier", style: "pastel", theme: "lagon", skin: "caramel", hair: "chignon", hairColor: "noir", outfit: "blouse", outfitColor: "#F4F1EA", neck: "stethoscope", glasses: "aucune", expression: "sourire", desk: "trousse", card: "chart", wall: "cadres", floaters: "pro", effect: "aucun", earphones: "aucun", activity: "think" }),
  I("lycee", "study", "Lycée", "Nattes, uniforme marine et cahier ouvert.", "portrait",
    { category: "etudiant", style: "sticker", theme: "peche", skin: "ebene", hair: "nattes", hairColor: "brun", head: "douce", outfit: "uniforme", outfitColor: "#2F4468", neck: "noeud", headColor: "#D2546A", glasses: "aucune", expression: "grand", desk: "cahier", card: "notes", wall: "tableau", floaters: "ecole", effect: "aucun", earphones: "aucun", activity: "focus" }),
  I("bibli-nuit", "study", "Bibliothèque de nuit", "Pull marine, bob bleuté et lucioles pour réviser tard.", "wide",
    { category: "etudiant", style: "editorial", theme: "nuit", skin: "porcelaine", hair: "bob", hairColor: "bleu", outfit: "col", outfitColor: "#2F4468", glasses: "rect", frame: "argent", expression: "reveur", desk: "livre", card: "notes", wall: "etageres", floaters: "ecole", effect: "lucioles", earphones: "aucun", activity: "focus" }),

  // ── Minimal & Monochrome ──
  I("noir-blanc", "minimal", "Noir sur blanc", "Un col roulé, des lunettes, et rien d'autre.", "tall",
    { category: "libre", style: "mono", theme: "papier", skin: "porcelaine", hair: "rase", hairColor: "noir", outfit: "col", outfitColor: "#25262A", glasses: "rondes", frame: "noir", expression: "neutre", desk: "rien", card: "rien", wall: "rien", floaters: "rien", effect: "aucun", earphones: "aucun", orbit: false, mug: false, activity: "chill" }),
  I("graphite", "minimal", "Gris graphite", "Blazer noir, nœud papillon et dossiers bien rangés.", "square",
    { category: "metier", style: "encre", theme: "studio", skin: "ebene", hair: "court", hairColor: "argent", outfit: "blazer", outfitColor: "#25262A", neck: "noeud", headColor: "#25262A", glasses: "rect", frame: "argent", expression: "neutre", desk: "dossier", card: "chart", wall: "cadres", floaters: "pro", effect: "aucun", earphones: "aucun", activity: "think" }),
  I("ligne-claire", "minimal", "Ligne claire", "Longs cheveux noirs, trait d'encre et page blanche.", "portrait",
    { category: "creatif", style: "encre", theme: "papier", skin: "sable", hair: "longs", hairColor: "noir", outfit: "tee", outfitColor: "#F4F1EA", glasses: "aucune", expression: "sourire", desk: "cahier", card: "rien", wall: "cadres", floaters: "rien", effect: "aucun", earphones: "aucun", activity: "focus" }),

  // ── Ocean Aesthetic ──
  I("plage-cafe", "ocean", "Plage & café", "Casquette ciel, grand sourire et bulles légères.", "tall",
    { category: "libre", style: "editorial", theme: "lagon", skin: "sable", hair: "ondules", hairColor: "blond", outfit: "tee", outfitColor: "#8DB8D9", headwear: "casquette", headColor: "#F4F1EA", glasses: "soleil", expression: "grand", effect: "bulles", desk: "livre", card: "rien", wall: "cadres", floaters: "etoiles", earphones: "aucun", activity: "chill" }),
  I("maree", "ocean", "Marée haute", "Locks, bonnet et pull ciel au fond de l'océan.", "square",
    { category: "libre", style: "editorial", theme: "ocean", skin: "ebene", hair: "locks", hairColor: "noir", outfit: "pull", outfitColor: "#8DB8D9", headwear: "bonnet", headColor: "#F4F1EA", glasses: "aucune", expression: "reveur", effect: "bulles", desk: "rien", card: "rien", wall: "rien", floaters: "etoiles", earphones: "aucun", activity: "chill" }),
  I("oceanographe", "ocean", "Océanographe", "Salopette marine, lunettes de soleil et appareil photo.", "wide",
    { category: "metier", style: "editorial", theme: "ocean", skin: "miel", hair: "court", hairColor: "brun", outfit: "salopette", outfitColor: "#2F4468", glasses: "soleil", expression: "malin", effect: "bulles", desk: "camera", card: "chart", wall: "cadres", floaters: "pro", earphones: "aucun", activity: "think" }),
  I("sirene", "ocean", "Sirène", "Longs cheveux menthe, couronne dorée et paillettes.", "portrait",
    { category: "libre", style: "reve", theme: "lagon", skin: "porcelaine", hair: "longs", hairColor: "menthe", outfit: "col", outfitColor: "#8DB8D9", headwear: "couronne", headColor: "#D9B26A", faceArt: "paillettes", expression: "etoiles", glasses: "aucune", effect: "bulles", desk: "rien", card: "rien", wall: "guirlande", floaters: "etoiles", earphones: "aucun", activity: "chill" }),

  // ── Fantasy & Sparkle ──
  I("reine-etoiles", "fantasy", "Reine des étoiles", "Couronne, cheveux lilas et yeux pleins d'étoiles.", "tall",
    { category: "libre", style: "reve", theme: "galaxie", skin: "caramel", hair: "longs", hairColor: "lilas", outfit: "col", outfitColor: "#9B86C9", headwear: "couronne", headColor: "#D9B26A", faceArt: "paillettes", expression: "etoiles", glasses: "aucune", effect: "etoiles", desk: "rien", card: "rien", wall: "rien", floaters: "etoiles", earphones: "aucun", activity: "chill" }),
  I("elfe-bois", "fantasy", "Elfe des bois", "Fleurs, lucioles et boucles d'oreilles pendantes.", "square",
    { category: "libre", style: "pastel", theme: "jardin", skin: "porcelaine", hair: "longs", hairColor: "blond", outfit: "pull", outfitColor: "#6F9482", headwear: "fleurs", headColor: "#F4F1EA", earrings: "pendantes", faceArt: "etoiles", expression: "sourire", glasses: "aucune", effect: "lucioles", desk: "rien", card: "rien", wall: "etageres", floaters: "cute", earphones: "aucun", activity: "chill" }),
  I("chat-magique", "fantasy", "Chat magique", "Bob rose, oreilles violettes et contour sticker.", "portrait",
    { category: "libre", style: "sticker", theme: "sunset", skin: "sable", hair: "bob", hairColor: "rose", head: "douce", outfit: "hoodie", outfitColor: "#7B5AA6", headwear: "chat", headColor: "#7B5AA6", expression: "malin", glasses: "aucune", effect: "etoiles", desk: "rien", card: "rien", wall: "neon", floaters: "etoiles", earphones: "aucun", activity: "dance" }),
  I("dragon-or", "fantasy", "Gardien d'or", "Casque doré, barbe rousse et lueurs de bougie.", "wide",
    { category: "libre", style: "retro", theme: "academia", skin: "porcelaine", hair: "ondules", hairColor: "roux", facialHair: "barbe", outfit: "blazer", outfitColor: "#5B3A29", headwear: "couronne", headColor: "#D9B26A", expression: "malin", glasses: "aucune", effect: "lucioles", desk: "livre", card: "rien", wall: "etageres", floaters: "etoiles", earphones: "aucun", activity: "think" }),
];

// ── Remix : de nouvelles idées générées à partir d'une collection ───────────
const mulberry32 = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function makeRemix(seed, collectionId) {
  const col = COLLECTIONS.find((c) => c.id === collectionId) ?? COLLECTIONS[0];
  const rng = mulberry32(seed);
  const pickOf = (arr) => arr[Math.floor(rng() * arr.length)];
  const cat = pickOf(CATEGORIES).id;
  const base = applyPatch(DEFAULTS, { ...CATEGORIES.find((c) => c.id === cat).patch, category: cat });
  const raw = randomize(base, rng);
  const config = applyPatch(raw, {
    theme: pickOf(col.themes), style: pickOf(col.styles), hairColor: pickOf(col.hairColors), outfitColor: pickOf(col.outfitColors),
    effect: rng() < 0.5 ? pickOf(["etoiles", "petales", "bulles", "lucioles", "coeurs"]) : "aucun",
  });
  const id = `g:${col.id}:${configToQuery(config)}`;
  return { id, collection: col.id, title: `Remix ${col.label.split(" ")[0]}`, note: "Une combinaison inédite générée pour toi : modifie-la comme tu veux.", ratio: pickOf(Object.keys(RATIOS)), config, generated: true };
}

/** Retrouve une inspiration (statique ou remix) à partir de son identifiant. */
export function resolveInspiration(id) {
  if (id.startsWith("g:")) {
    const [, collection, ...rest] = id.split(":");
    const config = configFromQuery(rest.join(":")) ?? { ...DEFAULTS };
    const col = COLLECTIONS.find((c) => c.id === collection) ?? COLLECTIONS[0];
    return { id, collection: col.id, title: `Remix ${col.label.split(" ")[0]}`, note: "Une combinaison inédite générée pour toi : modifie-la comme tu veux.", ratio: "portrait", config, generated: true };
  }
  const item = INSPIRATIONS.find((i) => i.id === id);
  return item ? { ...item, config: applyPatch(DEFAULTS, item.patch) } : null;
}

// Ordre d'affichage : on alterne les collections pour varier les formats dans la grille
const resolved = INSPIRATIONS.map((i) => ({ ...i, config: applyPatch(DEFAULTS, i.patch) }));
const byCollection = COLLECTIONS.map((c) => resolved.filter((i) => i.collection === c.id));
export const ALL = Array.from({ length: Math.max(...byCollection.map((l) => l.length)) }, (_, n) => byCollection.map((l) => l[n]).filter(Boolean)).flat();

// ── Couleur dominante (déduite du décor) pour le filtre par couleur ─────────
export function colorBucket(config) {
  const base = byId("theme", config.theme);
  const wall = (config.bgColor ? deriveTheme(base, config.bgColor) : base).wall;
  const n = parseInt(wall.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  if (lum(wall) < 0.28) return "sombre";
  if (d < 8) return "neutre";
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  if (h < 18 || h >= 320) return "rose";
  if (h < 70) return "chaud";
  if (h < 170) return "vert";
  if (h < 250) return "bleu";
  return "violet";
}

export { COLOR_BUCKETS };
