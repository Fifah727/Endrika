import { CATEGORIES, DEFAULTS } from "../avatar/catalog";
import { applyPatch } from "../avatar/config";
import { COLLECTIONS } from "./collections";

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
  I("ruban-rose", "cute", "Ruban rose", "Couettes, nœud et cœurs flottants : un bonbon sur pattes.", "tall",
    { category: "libre", theme: "bonbon", skin: "porcelaine", hair: "couettes", hairColor: "chatain", outfit: "pull", outfitColor: "rose", headwear: "noeud", headColor: "rose", glasses: "aucune", faceArt: "paillettes", expression: "grand", freckles: true, effect: "coeurs", desk: "rien", wall: "guirlande", neck: "perles", earrings: "perles", earphones: "aucun", activity: "chill" }),

  I("fraise-creme", "cute", "Fraise & crème", "Tablier rose, queue de cheval et foulard assorti.", "portrait",
    { category: "metier", theme: "bonbon", skin: "miel", hair: "queue", hairColor: "rose", outfit: "tablier", outfitColor: "#D58BA0", neck: "foulard", headColor: "#F4F1EA", earrings: "pendantes", glasses: "aucune", expression: "sourire", desk: "planche", wall: "cadres", effect: "coeurs", earphones: "aucun", activity: "chill" }),

  I("diplomee", "academia", "Jour de diplôme", "Mortier, confettis et éclat de rire.", "portrait",
    { category: "etudiant", theme: "academia", skin: "ebene", hair: "puffs", hairColor: "noir", outfit: "uniforme", outfitColor: "#2F4468", headwear: "mortier", headColor: "#25262A", neck: "cravate", expression: "rieur", glasses: "aucune", desk: "livre", wall: "tableau", effect: "confettis", earphones: "aucun", activity: "celebrate" }),

  I("reverie", "dreamy", "Rêverie", "Paillettes, couronne de fleurs et voile de lumière rosée.", "tall",
    { category: "libre", theme: "ciel", skin: "porcelaine", hair: "longs", hairColor: "platine", outfit: "pull", outfitColor: "#F4F1EA", headwear: "fleurs", headColor: "#F4F1EA", faceArt: "paillettes", expression: "sourire", glasses: "aucune", effect: "etoiles", desk: "rien", wall: "guirlande", earphones: "aucun", activity: "chill" }),

  I("atelier-peinture", "artistic", "Atelier de peinture", "Béret, tablier tâché de couleur et palette en main.", "tall",
    { category: "creatif", theme: "lavande", skin: "porcelaine", hair: "chignon", hairColor: "roux", freckles: true, outfit: "tablier", outfitColor: "#C47A63", headwear: "beret", headColor: "#C47A63", glasses: "aucune", expression: "sourire", desk: "tablette", wall: "cadres", effect: "aucun", earphones: "aucun", activity: "chill" }),

  I("photographe", "artistic", "Photographe", "Noir et blanc, appareil sur le bureau et cadres au mur.", "square",
    { category: "creatif", theme: "papier", skin: "miel", hair: "court", hairColor: "noir", outfit: "chemise", outfitColor: "#25262A", neck: "badge", headColor: "#F4F1EA", glasses: "rect", frame: "noir", desk: "camera", wall: "cadres", effect: "aucun", earphones: "aucun", activity: "chill", expression: "neutre" }),

  I("studio-musique", "artistic", "Studio musique", "Locks, casque audio et enseigne néon dans la nuit.", "portrait",
    { category: "creatif", theme: "nuit", skin: "ebene", hair: "locks", hairColor: "brun", outfit: "hoodie", outfitColor: "#D58BA0", earphones: "casque", desk: "piano", wall: "neon", effect: "etoiles", expression: "grand", glasses: "aucune", activity: "dance" }),

  I("nuit-code", "digital", "Nuit de code", "Hoodie noir, clavier mécanique et lucioles dans le noir.", "tall",
    { category: "dev", theme: "nuit", skin: "sable", hair: "court", hairColor: "bleu", outfit: "hoodie", outfitColor: "#25262A", earphones: "casque", glasses: "rect", frame: "noir", desk: "clavier", wall: "neon", effect: "lucioles", activity: "code" }),

  I("fullstack-cafe", "digital", "Full-stack café", "L'atelier d'origine : sweat, écouteurs et fenêtre de code.", "wide", {}),

  // ── Study Vibes ──

  I("revisions", "study", "Révisions", "Queue de cheval, casque sur les oreilles et tableau noir.", "tall",
    { category: "etudiant", theme: "jardin", skin: "miel", hair: "queue", hairColor: "chatain", outfit: "pull", outfitColor: "#6F9482", glasses: "rondes", frame: "marron", expression: "neutre", desk: "cahier", wall: "tableau", earphones: "casque", effect: "aucun", activity: "chill" }),

  I("medecine", "study", "Fac de médecine", "Blouse, stéthoscope et graphiques de résultats.", "square",
    { category: "metier", theme: "lagon", skin: "caramel", hair: "chignon", hairColor: "noir", outfit: "blouse", outfitColor: "#F4F1EA", neck: "stethoscope", glasses: "aucune", expression: "sourire", desk: "trousse", wall: "cadres", effect: "aucun", earphones: "aucun", activity: "chill" }),

  I("plage-cafe", "ocean", "Plage & café", "Casquette ciel, grand sourire et bulles légères.", "tall",
    { category: "libre", theme: "lagon", skin: "sable", hair: "ondules", hairColor: "blond", outfit: "tee", outfitColor: "#8DB8D9", headwear: "casquette", headColor: "#F4F1EA", glasses: "soleil", expression: "grand", effect: "bulles", desk: "livre", wall: "cadres", earphones: "aucun", activity: "chill" }),
];

/** Retrouve une inspiration à partir de son identifiant. */
export function resolveInspiration(id) {
  const item = INSPIRATIONS.find((i) => i.id === id);
  return item ? { ...item, config: applyPatch(DEFAULTS, item.patch) } : null;
}

// Ordre d'affichage : on alterne les collections pour varier les formats dans la grille
const resolved = INSPIRATIONS.map((i) => ({ ...i, config: applyPatch(DEFAULTS, i.patch) }));
const byCollection = COLLECTIONS.map((c) => resolved.filter((i) => i.collection === c.id));
export const ALL = Array.from({ length: Math.max(...byCollection.map((l) => l.length)) }, (_, n) => byCollection.map((l) => l[n]).filter(Boolean)).flat();
