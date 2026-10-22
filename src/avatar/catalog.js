// ══════════════════════════════════════════════════════════════════════════
//  CATALOGUE ENDRIKA : toutes les options proposées à l'utilisateur.
//  Pour ajouter une option : l'ajouter ici, puis dessiner la variante
//  correspondante dans src/avatar/parts/.
//  `tags` : catégories d'univers auxquelles l'option est naturellement liée
//  (dev, etudiant, metier, creatif). Sans tags = universelle.
// ══════════════════════════════════════════════════════════════════════════

// ── Catégories d'univers ───────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "dev", tint: "#D6E9EA", label: "Développeur", blurb: "Ordinateur, clavier, fenêtre de code et accessoires tech",
    patch: { desk: "laptop", wall: "etageres", earphones: "filaires" } },
  { id: "etudiant", tint: "#DDEBD3", label: "Étudiant", blurb: "Cahiers, livres, stylos, tableau et petits mots",
    patch: { desk: "cahier", wall: "tableau", earphones: "aucun" } },
  { id: "metier", tint: "#F7DCCB", label: "Autres métiers", blurb: "Santé, cuisine, chantier, bureau, enseignement…",
    patch: { desk: "dossier", wall: "cadres", earphones: "aucun" } },
  { id: "creatif", tint: "#E4DDF0", label: "Créatif", blurb: "Dessin, photo, musique, couleurs et inspiration",
    patch: { desk: "tablette", wall: "guirlande", earphones: "casque" } },
  { id: "libre", tint: "#FCD9E4", label: "Personnalisation libre", blurb: "Aucun thème imposé : tu composes tout toi-même",
    patch: { desk: "rien", wall: "rien", effect: "etoiles", earphones: "aucun" } },
];

// ── Teints ─────────────────────────────────────────────────────────────────
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
  { id: "coeur", label: "Cœur" },
  { id: "longue", label: "Allongée" },
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

export const EXPRESSIONS = [
  { id: "sourire", label: "Sourire doux" },
  { id: "grand", label: "Grand sourire" },
  { id: "neutre", label: "Neutre" },
  { id: "malin", label: "Malicieux" },
  { id: "surprise", label: "Surpris" },
  { id: "rieur", label: "Éclat de rire" },
  { id: "etoiles", label: "Yeux étoilés" },
];

export const FACE_ARTS = [
  { id: "aucun", label: "Aucun" },
  { id: "grain", label: "Grain de beauté" },
  { id: "etoiles", label: "Étoiles" },
  { id: "paillettes", label: "Paillettes" },
  { id: "rouge", label: "Rouge à lèvres" },
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
  { id: "bob", label: "Bob" },
  { id: "nattes", label: "Nattes" },
  { id: "couettes", label: "Couettes" },
  { id: "puffs", label: "Afro puffs" },
  { id: "longs", label: "Longs lisses" },
  { id: "ondules", label: "Ondulés" },
  { id: "pompadour", label: "Banane" },
  { id: "locks", label: "Locks" },
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
  { id: "menthe", label: "Menthe", color: "#7CC9A8" },
  { id: "lilas", label: "Lilas", color: "#A98BD6" },
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
  { id: "cateye", label: "Cat-eye" },
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
  { id: "beret", label: "Béret", tags: ["creatif"] },
  { id: "toque", label: "Toque", tags: ["metier"] },
  { id: "chantier", label: "Casque de chantier", tags: ["metier"] },
  { id: "mortier", label: "Mortier", tags: ["etudiant"] },
  { id: "chat", label: "Oreilles de chat" },
  { id: "fleurs", label: "Couronne de fleurs" },
  { id: "couronne", label: "Couronne" },
  { id: "noeud", label: "Nœud" },
];

export const EARPHONES = [
  { id: "aucun", label: "Aucun" },
  { id: "filaires", label: "Écouteurs", tags: ["dev"] },
  { id: "casque", label: "Casque audio", tags: ["creatif", "dev"] },
];

export const EARRINGS = [
  { id: "aucune", label: "Aucune" },
  { id: "perles", label: "Perles" },
  { id: "anneaux", label: "Anneaux" },
  { id: "pendantes", label: "Pendantes" },
];

export const NECKS = [
  { id: "aucun", label: "Aucun" },
  { id: "stethoscope", label: "Stéthoscope", tags: ["metier"] },
  { id: "cravate", label: "Cravate", tags: ["metier", "etudiant"] },
  { id: "noeud", label: "Nœud papillon", tags: ["metier"] },
  { id: "echarpe", label: "Écharpe" },
  { id: "perles", label: "Collier de perles" },
  { id: "badge", label: "Lanière et badge", tags: ["metier", "creatif"] },
  { id: "foulard", label: "Foulard", tags: ["creatif"] },
];

// ── Tenue ──────────────────────────────────────────────────────────────────
export const OUTFITS = [
  { id: "hoodie", label: "Sweat à capuche", tags: ["dev"] },
  { id: "tee", label: "T-shirt" },
  { id: "chemise", label: "Chemise", tags: ["metier"] },
  { id: "blazer", label: "Blazer", tags: ["metier"] },
  { id: "pull", label: "Pull en maille" },
  { id: "col", label: "Pull col roulé", tags: ["creatif"] },
  { id: "blouse", label: "Blouse", tags: ["metier"] },
  { id: "tablier", label: "Tablier", tags: ["metier", "creatif"] },
  { id: "uniforme", label: "Uniforme", tags: ["etudiant"] },
  { id: "salopette", label: "Salopette", tags: ["metier", "creatif"] },
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
  { id: "lilas", label: "Lilas", color: "#9B86C9" },
  { id: "ciel", label: "Ciel", color: "#8DB8D9" },
  { id: "blanc", label: "Blanc", color: "#F4F1EA" },
  { id: "or", label: "Or", color: "#D9B26A" },
];

// ── Décor : objet principal, mur, fenêtre, symboles, effets ────────────────
export const DESKS = [
  { id: "laptop", label: "Ordinateur portable", tags: ["dev"], hides: true },
  { id: "clavier", label: "Clavier mécanique", tags: ["dev"] },
  { id: "cahier", label: "Cahier ouvert", tags: ["etudiant"] },
  { id: "livre", label: "Gros livre", tags: ["etudiant", "metier"] },
  { id: "tablette", label: "Tablette graphique", tags: ["creatif"] },
  { id: "dossier", label: "Dossiers et stylo", tags: ["metier"] },
  { id: "camera", label: "Appareil photo", tags: ["creatif"] },
  { id: "piano", label: "Clavier de piano", tags: ["creatif"] },
  { id: "planche", label: "Planche de cuisine", tags: ["metier"] },
  { id: "outils", label: "Caisse à outils", tags: ["metier"] },
  { id: "trousse", label: "Trousse de soins", tags: ["metier"] },
  { id: "rien", label: "Rien" },
];

export const WALLS = [
  { id: "etageres", label: "Étagères", tags: ["dev", "etudiant"] },
  { id: "cadres", label: "Cadres", tags: ["metier", "creatif"] },
  { id: "guirlande", label: "Guirlande lumineuse", tags: ["creatif"] },
  { id: "neon", label: "Enseigne néon", tags: ["creatif", "dev"] },
  { id: "tableau", label: "Tableau noir", tags: ["etudiant", "metier"] },
  { id: "rien", label: "Mur nu" },
];

export const EFFECTS = [
  { id: "aucun", label: "Aucun" },
  { id: "etoiles", label: "Étoiles" },
  { id: "petales", label: "Pétales" },
  { id: "bulles", label: "Bulles" },
  { id: "neige", label: "Neige" },
  { id: "lucioles", label: "Lucioles" },
  { id: "confettis", label: "Confettis" },
  { id: "coeurs", label: "Cœurs" },
];

// ── Ambiances (thèmes de décor). `pattern` = motif du mur ──────────────────
// Couleur des accessoires : « auto » = assortie au vêtement (par défaut, pour rester cohérent)
export const HEAD_COLORS = [{ id: "auto", label: "Assortie au vêtement", color: "auto" }, ...CLOTH_COLORS];

export const THEMES = [
  { id: "atelier", label: "Atelier", pattern: "dots",
    wall: "#EFE6D3", dot: "#CDB68C", plinth: "#E7DBC2", plinthLine: "#D9C9A7", haloShadow: "#D9C8A4", halo: "#F8F2E4", ray: "#FFFBEF", rayOpacity: 0.3, orbit: "#CDB98F",
    deskTop: "#C9A170", deskEdge: "#E0BE90", deskGrain: "#B98C5C", contact: "#5A3E24", a: "#6F9482", b: "#C98B72", c: "#D9B26A" },
  { id: "nuit", label: "Nuit", pattern: "stars", dark: true,
    wall: "#1B2233", dot: "#3A4660", plinth: "#161C2B", plinthLine: "#2B3550", haloShadow: "#0F1522", halo: "#273049", ray: "#8FA8D8", rayOpacity: 0.1, orbit: "#4A5A80",
    deskTop: "#4A3A32", deskEdge: "#5E4A3F", deskGrain: "#2C221E", contact: "#000000", a: "#8FD6B0", b: "#F2A38A", c: "#F2D27A" },
  { id: "peche", label: "Pêche", pattern: "dots",
    wall: "#F7DCCB", dot: "#E6B79E", plinth: "#F0C9B3", plinthLine: "#E2B397", haloShadow: "#E8B9A0", halo: "#FFF0E5", ray: "#FFFFFF", rayOpacity: 0.3, orbit: "#E6B79E",
    deskTop: "#D9A27A", deskEdge: "#EBBE9B", deskGrain: "#BF8660", contact: "#6A3E24", a: "#5E8C86", b: "#C8645A", c: "#E0A94F" },
  { id: "lagon", label: "Lagon", pattern: "waves",
    wall: "#D6E9EA", dot: "#9CC4C6", plinth: "#C3DDDE", plinthLine: "#A9CBCD", haloShadow: "#A9CBCD", halo: "#EEF8F8", ray: "#FFFFFF", rayOpacity: 0.35, orbit: "#8FB9BC",
    deskTop: "#C9B28A", deskEdge: "#DEC9A4", deskGrain: "#A68E66", contact: "#4A4030", a: "#2F8F94", b: "#E0795D", c: "#E2B15C" },
  { id: "lavande", label: "Lavande", pattern: "dots",
    wall: "#E4DDF0", dot: "#BBAED6", plinth: "#D8CFE8", plinthLine: "#C3B7DC", haloShadow: "#C6B9DE", halo: "#F6F2FC", ray: "#FFFFFF", rayOpacity: 0.35, orbit: "#B3A5D1",
    deskTop: "#CDAE90", deskEdge: "#E2C8AE", deskGrain: "#AD8D70", contact: "#4D3A5A", a: "#7B63B5", b: "#E08A9E", c: "#E3B866" },
  { id: "bonbon", label: "Bonbon", pattern: "hearts",
    wall: "#FCD9E4", dot: "#F4A9C0", plinth: "#F8C6D6", plinthLine: "#F0AEC4", haloShadow: "#F2B5C9", halo: "#FFEFF4", ray: "#FFFFFF", rayOpacity: 0.4, orbit: "#F0A5BD",
    deskTop: "#E7B9A0", deskEdge: "#F3CDB8", deskGrain: "#C99A82", contact: "#6B3A4A", a: "#E8628F", b: "#7EC4B6", c: "#F2B84B" },
  { id: "papier", label: "Papier", pattern: "grid",
    wall: "#F2F1EE", dot: "#C9C8C3", plinth: "#E6E5E1", plinthLine: "#D5D4CF", haloShadow: "#DAD9D4", halo: "#FBFBF9", ray: "#FFFFFF", rayOpacity: 0.5, orbit: "#BDBCB6",
    deskTop: "#C7C4BC", deskEdge: "#DAD7CF", deskGrain: "#A9A69E", contact: "#2A2A2A", a: "#2A2A2A", b: "#8A8A86", c: "#B8B6AF" },
  { id: "academia", label: "Dark academia", pattern: "checks", dark: true,
    wall: "#2A2B22", dot: "#4A4A38", plinth: "#22231B", plinthLine: "#3A3B2D", haloShadow: "#17180F", halo: "#3A3A2B", ray: "#D9C79A", rayOpacity: 0.12, orbit: "#6A6A4F",
    deskTop: "#5A3E2B", deskEdge: "#74533A", deskGrain: "#3E2A1C", contact: "#000000", a: "#9BB07C", b: "#C2855A", c: "#D9B76A" },
  { id: "ciel", label: "Dreamy", pattern: "clouds",
    wall: "#DCEBFA", dot: "#FFFFFF", plinth: "#CFE1F5", plinthLine: "#B8D1EC", haloShadow: "#C4D8F0", halo: "#F8E9F4", ray: "#FFFFFF", rayOpacity: 0.5, orbit: "#B6C8EA",
    deskTop: "#D8C0D8", deskEdge: "#E8D4E8", deskGrain: "#B89DB8", contact: "#4A3A5E", a: "#8D7BD8", b: "#F29EC0", c: "#F2D07A" },
  { id: "ocean", label: "Océan", pattern: "waves", dark: true,
    wall: "#12384A", dot: "#2C6A82", plinth: "#0E2E3E", plinthLine: "#1D5068", haloShadow: "#092431", halo: "#1B5068", ray: "#7FD6E6", rayOpacity: 0.12, orbit: "#3B879E",
    deskTop: "#3E5A5E", deskEdge: "#527578", deskGrain: "#2A4144", contact: "#000000", a: "#7FE0D0", b: "#FF9E7A", c: "#F2D27A" },
  { id: "galaxie", label: "Galaxie", pattern: "stars", dark: true,
    wall: "#241B3D", dot: "#5A4A8F", plinth: "#1B1430", plinthLine: "#352A5A", haloShadow: "#120C24", halo: "#3A2C66", ray: "#C8B6FF", rayOpacity: 0.14, orbit: "#7B68C4",
    deskTop: "#4B3A68", deskEdge: "#5F4C82", deskGrain: "#33264C", contact: "#000000", a: "#9FF0D8", b: "#FF9BD0", c: "#FFE08A" },
  { id: "studio", label: "Studio pro", pattern: "grid",
    wall: "#DDE3EA", dot: "#B4BFCC", plinth: "#CCD5DF", plinthLine: "#B4C0CE", haloShadow: "#B9C5D3", halo: "#F3F6FA", ray: "#FFFFFF", rayOpacity: 0.4, orbit: "#A3B2C4",
    deskTop: "#B9A58C", deskEdge: "#CEBBA3", deskGrain: "#9A8870", contact: "#2B3442", a: "#3E6FA3", b: "#E07A5F", c: "#E0B04F" },
  { id: "jardin", label: "Jardin", pattern: "leaves",
    wall: "#DDEBD3", dot: "#A9C89A", plinth: "#CCE0BF", plinthLine: "#B3CFA3", haloShadow: "#B7D2A9", halo: "#F2F9EC", ray: "#FFFFFF", rayOpacity: 0.4, orbit: "#9DBD8D",
    deskTop: "#C4A47A", deskEdge: "#D9BD94", deskGrain: "#A4855C", contact: "#3F4A2E", a: "#4F8A5B", b: "#E08A6A", c: "#E8BC55" },
  { id: "sunset", label: "Sunset", pattern: "stripes",
    wall: "#F9D2B8", dot: "#F4A58A", plinth: "#F0B99F", plinthLine: "#E8A184", haloShadow: "#EBAE92", halo: "#FFE9D6", ray: "#FFF4E6", rayOpacity: 0.45, orbit: "#EBA487",
    deskTop: "#C98A68", deskEdge: "#DDA283", deskGrain: "#A86E50", contact: "#5A2E22", a: "#D2546A", b: "#7B5AA6", c: "#F2B84B" },
];

// ── Animation ──────────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { id: "code", label: "Au travail, en musique", hint: "Tête qui rebondit en rythme, notes de musique, idée de temps en temps" },
  { id: "chill", label: "Se détendre", hint: "Respiration lente, vapeur du café" },
  { id: "dance", label: "Danser", hint: "Tout le buste se balance en rythme" },
  { id: "wave", label: "Faire coucou", hint: "Le bras reste levé, la bulle reste affichée" },
  { id: "celebrate", label: "Fêter ça", hint: "Coucou, rebonds et confettis" },
];

export const TEMPOS = [
  { id: "lent", label: "Lent", value: 1.5 },
  { id: "normal", label: "Normal", value: 1 },
  { id: "rapide", label: "Rapide", value: 0.65 },
];

// Messages de la bulle quand l'avatar te salue
export const GREETINGS = ["Coucou !", "Bonjour et bienvenue !", "Salama !", "Une idée en tête ?"];

// Éléments qui suivent l'univers choisi (plus de réglages séparés)
export const CARD_BY_CATEGORY = { dev: "code", etudiant: "notes", metier: "chart", creatif: "palette", libre: "rien" };
export const FLOATERS_BY_CATEGORY = { dev: "code", etudiant: "ecole", metier: "pro", creatif: "art", libre: "etoiles" };

// ── Valeurs par défaut (= l'avatar d'origine) ──────────────────────────────
export const DEFAULTS = {
  category: "dev",
  skin: "caramel", face: "ovale", build: "standard", eyes: "brun", expression: "sourire",
  freckles: false, faceArt: "aucun",
  hair: "carre", hairColor: "noir", facialHair: "aucune",
  glasses: "rect", frame: "marron", headwear: "aucun", headColor: "auto",
  earphones: "filaires", earrings: "aucune", neck: "aucun",
  outfit: "hoodie", outfitColor: "marron",
  theme: "atelier", desk: "laptop", wall: "etageres", effect: "aucun",
  activity: "code", tempo: "normal",
};

// Clés dont la valeur peut être une couleur libre (#RRGGBB)
export const COLOR_KEYS = ["hairColor", "outfitColor", "eyes", "frame", "headColor"];

// ── Cohérence : ce qui va (ou non) avec quoi ───────────────────────────────
// Accessoires de cou possibles selon le vêtement
export const NECK_FOR = {
  hoodie: ["aucun", "echarpe", "badge"],
  tee: ["aucun", "perles", "badge", "foulard", "echarpe"],
  chemise: ["aucun", "cravate", "noeud", "badge", "foulard", "perles", "stethoscope", "echarpe"],
  blazer: ["aucun", "cravate", "noeud", "badge", "foulard", "perles"],
  pull: ["aucun", "echarpe", "perles", "badge"],
  col: ["aucun", "echarpe", "badge"],
  blouse: ["aucun", "stethoscope", "badge"],
  tablier: ["aucun", "badge", "foulard"],
  uniforme: ["aucun", "cravate", "noeud", "badge"],
  salopette: ["aucun", "badge", "foulard"],
};
// Couleurs naturelles proposées automatiquement quand on choisit ces pièces
export const HEADWEAR_COLOR = { toque: "blanc", chantier: "moutarde", mortier: "noir" };
export const OUTFIT_COLOR = { blouse: "blanc", uniforme: "marine" };

// Table de correspondance clé → liste d'options (sert à valider et au hasard)
export const LISTS = {
  category: CATEGORIES,
  skin: SKINS, face: FACES, build: BUILDS, eyes: EYES, expression: EXPRESSIONS, faceArt: FACE_ARTS,
  hair: HAIRS, hairColor: HAIR_COLORS, facialHair: FACIAL_HAIRS,
  glasses: GLASSES, frame: FRAME_COLORS, headwear: HEADWEARS, headColor: HEAD_COLORS,
  earphones: EARPHONES, earrings: EARRINGS, neck: NECKS,
  outfit: OUTFITS, outfitColor: CLOTH_COLORS,
  theme: THEMES, desk: DESKS, wall: WALLS, effect: EFFECTS,
  activity: ACTIVITIES, tempo: TEMPOS,
};

export const FLAGS = ["freckles"];

export const isHex = (v) => typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v);

/** Retrouve une option par id ; pour les clés de couleur, accepte aussi un #RRGGBB libre. */
export const byId = (key, id) => {
  if (COLOR_KEYS.includes(key) && isHex(id)) return { id, label: "Personnalisée", color: id };
  return LISTS[key].find((o) => o.id === id) ?? LISTS[key][0];
};

// ── Interface : zones de recadrage des aperçus ─────────────────────────────
export const CROPS = {
  head: "70 30 260 260",
  face: "110 90 180 180",
  eyes: "112 124 176 100",
  ears: "100 120 200 140",
  bust: "50 150 300 220",
  full: "0 0 400 400",
  desk: "40 250 320 150",
  wall: "270 60 130 140",
};
