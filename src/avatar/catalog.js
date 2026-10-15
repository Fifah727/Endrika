// ══════════════════════════════════════════════════════════════════════════
//  CATALOGUE : toutes les options proposées à l'utilisateur.
//  Pour ajouter une option : l'ajouter ici, puis dessiner la variante
//  correspondante dans src/avatar/parts/.
// ══════════════════════════════════════════════════════════════════════════

// ── Teints : chaque teint fournit les nuances utilisées par le visage ──────
export const SKINS = [
  { id: "porcelaine", label: "Porcelaine", face: "#F2CFB0", ear: "#E5BB98", line: "#C0916F", neck: "#E1B28E", shade: "#B98866", blush: "#E8958B" },
  { id: "sable", label: "Sable", face: "#E4B48C", ear: "#D4A27A", line: "#A9744F", neck: "#D3A175", shade: "#A06E49", blush: "#D9776A" },
  { id: "miel", label: "Miel", face: "#D29A66", ear: "#C28958", line: "#97633B", neck: "#BF8A5A", shade: "#8E5D38", blush: "#CC6F5F" },
  { id: "caramel", label: "Caramel", face: "#B97D56", ear: "#A96F49", line: "#8A5236", neck: "#A66B46", shade: "#7A4A30", blush: "#D9776A" },
  { id: "noisette", label: "Noisette", face: "#8F5B3C", ear: "#7F4E32", line: "#5E3822", neck: "#7B4B2E", shade: "#55321C", blush: "#B85D50" },
  { id: "ebene", label: "Ébène", face: "#5F3B28", ear: "#533220", line: "#3A2216", neck: "#4F301F", shade: "#34200F", blush: "#9B4F44" },
];

export const FACES = [
  { id: "ovale", label: "Ovale" },
  { id: "ronde", label: "Ronde" },
  { id: "carree", label: "Carrée" },
];

export const BUILDS = [
  { id: "fine", label: "Fine", scale: 0.9 },
  { id: "standard", label: "Standard", scale: 1 },
  { id: "large", label: "Large", scale: 1.09 },
];

export const EYES = [
  { id: "brun", label: "Brun", color: "#4A2C1D" },
  { id: "noisette", label: "Noisette", color: "#7A5230" },
  { id: "vert", label: "Vert", color: "#3F7A57" },
  { id: "bleu", label: "Bleu", color: "#3D6FA5" },
  { id: "gris", label: "Gris", color: "#6C7F8C" },
  { id: "violet", label: "Violet", color: "#6E4C9A" },
];

// ── Cheveux ────────────────────────────────────────────────────────────────
export const HAIRS = [
  { id: "carre", label: "Carré long" },
  { id: "court", label: "Court" },
  { id: "boucles", label: "Bouclés" },
  { id: "queue", label: "Queue de cheval" },
  { id: "chignon", label: "Chignon" },
  { id: "rase", label: "Rasé" },
  { id: "chauve", label: "Chauve" },
];

export const HAIR_COLORS = [
  { id: "noir", label: "Noir", color: "#17110F" },
  { id: "brun", label: "Brun", color: "#3B2418" },
  { id: "chatain", label: "Châtain", color: "#6B4428" },
  { id: "roux", label: "Roux", color: "#A5461F" },
  { id: "blond", label: "Blond", color: "#D2A857" },
  { id: "platine", label: "Platine", color: "#E6D9B5" },
  { id: "argent", label: "Argent", color: "#BDBAB3" },
  { id: "rose", label: "Rose", color: "#D8728F" },
  { id: "bleu", label: "Bleu nuit", color: "#2F4F86" },
];

export const FACIAL_HAIRS = [
  { id: "aucune", label: "Aucune" },
  { id: "moustache", label: "Moustache" },
  { id: "bouc", label: "Bouc" },
  { id: "barbe", label: "Barbe" },
];

// ── Accessoires ────────────────────────────────────────────────────────────
export const GLASSES = [
  { id: "aucune", label: "Aucune" },
  { id: "rect", label: "Rectangulaires" },
  { id: "rondes", label: "Rondes" },
  { id: "soleil", label: "Soleil" },
];

export const FRAME_COLORS = [
  { id: "marron", label: "Marron", color: "#3A2418" },
  { id: "noir", label: "Noir", color: "#17181B" },
  { id: "or", label: "Or", color: "#C9A24A" },
  { id: "argent", label: "Argent", color: "#A9AEB5" },
  { id: "rose", label: "Rose", color: "#D4789A" },
  { id: "bleu", label: "Bleu", color: "#3D6FA5" },
  { id: "rouge", label: "Rouge", color: "#C0463A" },
];

export const HEADWEARS = [
  { id: "aucun", label: "Aucun" },
  { id: "bandeau", label: "Bandeau" },
  { id: "casquette", label: "Casquette" },
  { id: "bonnet", label: "Bonnet" },
];

export const EARPHONES = [
  { id: "aucun", label: "Aucun" },
  { id: "filaires", label: "Écouteurs" },
  { id: "casque", label: "Casque audio" },
];

export const EARRINGS = [
  { id: "aucune", label: "Aucune" },
  { id: "perles", label: "Perles" },
  { id: "anneaux", label: "Anneaux" },
  { id: "pendantes", label: "Pendantes" },
];

// ── Tenue ──────────────────────────────────────────────────────────────────
export const OUTFITS = [
  { id: "hoodie", label: "Sweat à capuche" },
  { id: "tee", label: "T-shirt" },
  { id: "chemise", label: "Chemise" },
  { id: "blazer", label: "Blazer" },
];

export const CLOTH_COLORS = [
  { id: "marron", label: "Marron", color: "#5B3A29" },
  { id: "sauge", label: "Sauge", color: "#6F9482" },
  { id: "terracotta", label: "Terracotta", color: "#C47A63" },
  { id: "creme", label: "Crème", color: "#E4D9BF" },
  { id: "noir", label: "Noir", color: "#25262A" },
  { id: "marine", label: "Marine", color: "#2F4468" },
  { id: "rose", label: "Rose", color: "#D58BA0" },
  { id: "moutarde", label: "Moutarde", color: "#D9A53C" },
];

// ── Décor ──────────────────────────────────────────────────────────────────
export const THEMES = [
  {
    id: "atelier", label: "Atelier",
    wall: "#EFE6D3", dot: "#CDB68C", plinth: "#E7DBC2", plinthLine: "#D9C9A7",
    haloShadow: "#D9C8A4", halo: "#F8F2E4", ray: "#FFFBEF", rayOpacity: 0.3, orbit: "#CDB98F",
    deskTop: "#C9A170", deskEdge: "#E0BE90", deskGrain: "#B98C5C", contact: "#5A3E24",
    a: "#6F9482", b: "#C98B72", c: "#D9B26A",
  },
  {
    id: "nuit", label: "Nuit",
    wall: "#1B2233", dot: "#3A4660", plinth: "#161C2B", plinthLine: "#2B3550",
    haloShadow: "#0F1522", halo: "#273049", ray: "#8FA8D8", rayOpacity: 0.1, orbit: "#4A5A80",
    deskTop: "#4A3A32", deskEdge: "#5E4A3F", deskGrain: "#2C221E", contact: "#000000",
    a: "#8FD6B0", b: "#F2A38A", c: "#F2D27A",
  },
  {
    id: "peche", label: "Pêche",
    wall: "#F7DCCB", dot: "#E6B79E", plinth: "#F0C9B3", plinthLine: "#E2B397",
    haloShadow: "#E8B9A0", halo: "#FFF0E5", ray: "#FFFFFF", rayOpacity: 0.3, orbit: "#E6B79E",
    deskTop: "#D9A27A", deskEdge: "#EBBE9B", deskGrain: "#BF8660", contact: "#6A3E24",
    a: "#5E8C86", b: "#C8645A", c: "#E0A94F",
  },
  {
    id: "lagon", label: "Lagon",
    wall: "#D6E9EA", dot: "#9CC4C6", plinth: "#C3DDDE", plinthLine: "#A9CBCD",
    haloShadow: "#A9CBCD", halo: "#EEF8F8", ray: "#FFFFFF", rayOpacity: 0.35, orbit: "#8FB9BC",
    deskTop: "#C9B28A", deskEdge: "#DEC9A4", deskGrain: "#A68E66", contact: "#4A4030",
    a: "#2F8F94", b: "#E0795D", c: "#E2B15C",
  },
  {
    id: "lavande", label: "Lavande",
    wall: "#E4DDF0", dot: "#BBAED6", plinth: "#D8CFE8", plinthLine: "#C3B7DC",
    haloShadow: "#C6B9DE", halo: "#F6F2FC", ray: "#FFFFFF", rayOpacity: 0.35, orbit: "#B3A5D1",
    deskTop: "#CDAE90", deskEdge: "#E2C8AE", deskGrain: "#AD8D70", contact: "#4D3A5A",
    a: "#7B63B5", b: "#E08A9E", c: "#E3B866",
  },
];

// ── Animation ──────────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { id: "code", label: "Coder en musique", hint: "Tête qui rebondit, notes, idée de temps en temps" },
  { id: "dance", label: "Danser", hint: "Tout le buste se balance en rythme" },
  { id: "chill", label: "Se détendre", hint: "Respiration lente, vapeur du café" },
  { id: "wave", label: "Faire coucou", hint: "Le bras reste levé, la bulle reste affichée" },
];

export const TEMPOS = [
  { id: "lent", label: "Lent", value: 1.5 },
  { id: "normal", label: "Normal", value: 1 },
  { id: "rapide", label: "Rapide", value: 0.65 },
];

export const MESSAGES = [
  { id: "rotation", label: "Variés", texts: ["Coucou !", "Bonjour et bienvenue !", "Tu codes aussi ?", "Une idée en tête ?", "On crée quelque chose ?"] },
  { id: "bonjour", label: "Bonjour !", texts: ["Bonjour !"] },
  { id: "salama", label: "Salama !", texts: ["Salama ! Tongasoa !"] },
  { id: "hello", label: "Hello!", texts: ["Hello! Nice to meet you!"] },
  { id: "aucun", label: "Aucun", texts: [] },
];

// ── Valeurs par défaut (= l'avatar d'origine) ──────────────────────────────
export const DEFAULTS = {
  skin: "caramel", face: "ovale", build: "standard", eyes: "brun", freckles: false,
  hair: "carre", hairColor: "noir", facialHair: "aucune",
  glasses: "rect", frame: "marron", headwear: "aucun", headColor: "sauge",
  earphones: "filaires", earrings: "aucune",
  outfit: "hoodie", outfitColor: "marron",
  theme: "atelier", shelves: true, codeCard: true, symbols: true, mug: true, orbit: true, laptop: true,
  activity: "code", tempo: "normal", hover: true, intro: true, message: "rotation",
};

// Table de correspondance clé → liste d'options (sert à valider et au hasard)
export const LISTS = {
  skin: SKINS, face: FACES, build: BUILDS, eyes: EYES,
  hair: HAIRS, hairColor: HAIR_COLORS, facialHair: FACIAL_HAIRS,
  glasses: GLASSES, frame: FRAME_COLORS, headwear: HEADWEARS, headColor: CLOTH_COLORS,
  earphones: EARPHONES, earrings: EARRINGS,
  outfit: OUTFITS, outfitColor: CLOTH_COLORS,
  theme: THEMES, activity: ACTIVITIES, tempo: TEMPOS, message: MESSAGES,
};

export const FLAGS = ["freckles", "shelves", "codeCard", "symbols", "mug", "orbit", "laptop", "hover", "intro"];

export const byId = (key, id) => LISTS[key].find((o) => o.id === id) ?? LISTS[key][0];

// ── Interface : panneaux et groupes de choix ───────────────────────────────
// kind : "thumb" (aperçu dessiné), "swatch" (pastille de couleur),
//        "text" (carte de texte), "toggle" (interrupteur)
// crop : zone du dessin affichée dans l'aperçu
export const CROPS = {
  head: "70 30 260 260",
  face: "110 90 180 180",
  eyes: "112 124 176 100",
  ears: "100 120 200 140",
  bust: "50 170 300 220",
};

export const PANELS = [
  {
    id: "visage", label: "Visage",
    groups: [
      { key: "skin", label: "Teint", kind: "swatch", pick: (o) => o.face },
      { key: "face", label: "Forme du visage", kind: "thumb", crop: "face" },
      { key: "eyes", label: "Yeux", kind: "swatch", pick: (o) => o.color },
      { key: "build", label: "Carrure", kind: "thumb", crop: "bust" },
      { key: "freckles", label: "Taches de rousseur", kind: "toggle" },
    ],
  },
  {
    id: "cheveux", label: "Cheveux",
    groups: [
      { key: "hair", label: "Coiffure", kind: "thumb", crop: "head", preview: { headwear: "aucun" } },
      { key: "hairColor", label: "Couleur des cheveux", kind: "swatch", pick: (o) => o.color },
      { key: "facialHair", label: "Pilosité faciale", kind: "thumb", crop: "face" },
    ],
  },
  {
    id: "accessoires", label: "Accessoires",
    groups: [
      { key: "glasses", label: "Lunettes", kind: "thumb", crop: "eyes" },
      { key: "frame", label: "Monture", kind: "swatch", pick: (o) => o.color, when: (c) => c.glasses !== "aucune" },
      { key: "headwear", label: "Couvre-chef", kind: "thumb", crop: "head" },
      { key: "headColor", label: "Couleur du couvre-chef", kind: "swatch", pick: (o) => o.color, when: (c) => c.headwear !== "aucun" },
      { key: "earphones", label: "Audio", kind: "thumb", crop: "head" },
      { key: "earrings", label: "Boucles d'oreilles", kind: "thumb", crop: "ears" },
    ],
  },
  {
    id: "tenue", label: "Tenue",
    groups: [
      { key: "outfit", label: "Vêtement", kind: "thumb", crop: "bust" },
      { key: "outfitColor", label: "Couleur du vêtement", kind: "swatch", pick: (o) => o.color },
    ],
  },
  {
    id: "decor", label: "Décor",
    groups: [
      { key: "theme", label: "Ambiance", kind: "theme" },
      { key: "shelves", label: "Étagères", kind: "toggle" },
      { key: "codeCard", label: "Fenêtre de code", kind: "toggle" },
      { key: "symbols", label: "Symboles et étincelles", kind: "toggle" },
      { key: "mug", label: "Tasse de café", kind: "toggle" },
      { key: "laptop", label: "Ordinateur portable (masque le buste)", kind: "toggle" },
      { key: "orbit", label: "Orbite", kind: "toggle" },
    ],
  },
  {
    id: "animation", label: "Animation",
    groups: [
      { key: "activity", label: "Activité", kind: "text" },
      { key: "tempo", label: "Tempo", kind: "text", compact: true },
      { key: "message", label: "Message de la bulle", kind: "text", compact: true },
      { key: "hover", label: "Regarder le curseur et saluer au survol", kind: "toggle" },
      { key: "intro", label: "Salut d'accueil au chargement", kind: "toggle" },
    ],
  },
];
