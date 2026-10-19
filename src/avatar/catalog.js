// ══════════════════════════════════════════════════════════════════════════
//  CATALOGUE ENDRIKA : toutes les options proposées à l'utilisateur.
//  Pour ajouter une option : l'ajouter ici, puis dessiner la variante
//  correspondante dans src/avatar/parts/.
//  `tags` : catégories d'univers auxquelles l'option est naturellement liée
//  (dev, etudiant, metier, creatif). Sans tags = universelle.
// ══════════════════════════════════════════════════════════════════════════

// ── Catégories d'univers ───────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "dev", emoji: "💻", label: "Développeur", blurb: "Ordinateur, clavier, fenêtre de code et accessoires tech",
    patch: { desk: "laptop", card: "code", floaters: "code", wall: "etageres", activity: "code", earphones: "filaires" } },
  { id: "etudiant", emoji: "📚", label: "Étudiant", blurb: "Cahiers, livres, stylos, tableau et petits mots",
    patch: { desk: "cahier", card: "notes", floaters: "ecole", wall: "tableau", activity: "focus", earphones: "aucun" } },
  { id: "metier", emoji: "💼", label: "Autres métiers", blurb: "Santé, cuisine, chantier, bureau, enseignement…",
    patch: { desk: "dossier", card: "chart", floaters: "pro", wall: "cadres", activity: "think", earphones: "aucun" } },
  { id: "creatif", emoji: "🎨", label: "Créatif", blurb: "Dessin, photo, musique, couleurs et inspiration",
    patch: { desk: "tablette", card: "palette", floaters: "art", wall: "guirlande", activity: "chill", earphones: "casque" } },
  { id: "libre", emoji: "✨", label: "Personnalisation libre", blurb: "Aucun thème imposé : tu composes tout toi-même",
    patch: { desk: "rien", card: "rien", floaters: "rien", wall: "rien", effect: "etoiles", activity: "chill", earphones: "aucun" } },
];

// ── Looks prêts à personnaliser, par catégorie ─────────────────────────────
export const LOOKS = [
  { id: "web", cat: "dev", emoji: "🧑‍💻", label: "Développeur web", patch: { outfit: "hoodie", outfitColor: "#5B3A29", desk: "laptop", glasses: "rect", earphones: "filaires" } },
  { id: "gamer", cat: "dev", emoji: "🎧", label: "Nuit de code", patch: { outfit: "hoodie", outfitColor: "#2F4468", desk: "clavier", earphones: "casque", theme: "nuit", effect: "lucioles", glasses: "aucune" } },
  { id: "sysadmin", cat: "dev", emoji: "🖥️", label: "Ingénieur logiciel", patch: { outfit: "pull", outfitColor: "#6F9482", desk: "laptop", glasses: "rondes", theme: "studio" } },
  { id: "college", cat: "etudiant", emoji: "🎒", label: "Collège / lycée", patch: { outfit: "uniforme", outfitColor: "#2F4468", desk: "cahier", neck: "cravate", headwear: "aucun", wall: "tableau" } },
  { id: "fac", cat: "etudiant", emoji: "🎓", label: "Université", patch: { outfit: "pull", outfitColor: "#C47A63", desk: "livre", glasses: "rondes", theme: "academia", wall: "etageres" } },
  { id: "diplome", cat: "etudiant", emoji: "🎉", label: "Jour de diplôme", patch: { outfit: "blazer", outfitColor: "#25262A", headwear: "mortier", headColor: "#25262A", desk: "livre", activity: "celebrate", theme: "ciel" } },
  { id: "sante", cat: "metier", emoji: "🩺", label: "Santé", patch: { outfit: "blouse", outfitColor: "#E4D9BF", neck: "stethoscope", desk: "trousse", card: "chart", theme: "lagon", glasses: "aucune" } },
  { id: "cuisine", cat: "metier", emoji: "🍳", label: "Cuisine", patch: { outfit: "tablier", outfitColor: "#C47A63", headwear: "toque", headColor: "#FFFFFF", desk: "planche", card: "rien", theme: "peche", wall: "cadres" } },
  { id: "chantier", cat: "metier", emoji: "🏗️", label: "Chantier / atelier", patch: { outfit: "salopette", outfitColor: "#2F4468", headwear: "chantier", headColor: "#D9A53C", desk: "outils", card: "rien", theme: "studio", wall: "rien" } },
  { id: "bureau", cat: "metier", emoji: "📊", label: "Bureau / business", patch: { outfit: "chemise", outfitColor: "#6F9482", neck: "cravate", desk: "dossier", card: "chart", theme: "papier", glasses: "rect" } },
  { id: "prof", cat: "metier", emoji: "🍎", label: "Enseignement", patch: { outfit: "pull", outfitColor: "#D58BA0", desk: "livre", card: "notes", wall: "tableau", glasses: "rondes", floaters: "ecole" } },
  { id: "dessin", cat: "creatif", emoji: "🖌️", label: "Dessin / illustration", patch: { outfit: "tee", outfitColor: "#E4D9BF", headwear: "beret", headColor: "#C47A63", desk: "tablette", card: "palette", theme: "lavande" } },
  { id: "photo", cat: "creatif", emoji: "📷", label: "Photographie", patch: { outfit: "chemise", outfitColor: "#25262A", desk: "camera", neck: "badge", card: "rien", theme: "papier", wall: "cadres" } },
  { id: "musique", cat: "creatif", emoji: "🎹", label: "Musique", patch: { outfit: "hoodie", outfitColor: "#D58BA0", earphones: "casque", desk: "piano", card: "playlist", theme: "nuit", effect: "etoiles" } },
  { id: "libre", cat: "libre", emoji: "🌈", label: "Fantasy & paillettes", patch: { outfit: "pull", outfitColor: "#D58BA0", headwear: "couronne", headColor: "#D9B26A", theme: "galaxie", effect: "etoiles", faceArt: "paillettes" } },
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

export const HEADS = [
  { id: "normale", label: "Proportions réalistes", scale: 1 },
  { id: "douce", label: "Tête douce", scale: 1.06 },
  { id: "chibi", label: "Chibi", scale: 1.12 },
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
  { id: "reveur", label: "Rêveur" },
  { id: "etoiles", label: "Yeux étoilés" },
];

export const FACE_ARTS = [
  { id: "aucun", label: "Aucun" },
  { id: "grain", label: "Grain de beauté" },
  { id: "etoiles", label: "Étoiles" },
  { id: "coeur", label: "Cœur" },
  { id: "paillettes", label: "Paillettes" },
  { id: "rouge", label: "Rouge à lèvres" },
  { id: "eyeliner", label: "Eye-liner" },
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
];

// ── Décor : objet principal, mur, fenêtre, symboles, effets ────────────────
export const DESKS = [
  { id: "laptop", label: "Ordinateur portable", emoji: "💻", tags: ["dev"], hides: true },
  { id: "clavier", label: "Clavier mécanique", emoji: "⌨️", tags: ["dev"] },
  { id: "cahier", label: "Cahier ouvert", emoji: "📓", tags: ["etudiant"] },
  { id: "livre", label: "Gros livre", emoji: "📖", tags: ["etudiant", "metier"] },
  { id: "tablette", label: "Tablette graphique", emoji: "🖊️", tags: ["creatif"] },
  { id: "dossier", label: "Dossiers et stylo", emoji: "🗂️", tags: ["metier"] },
  { id: "camera", label: "Appareil photo", emoji: "📷", tags: ["creatif"] },
  { id: "piano", label: "Clavier de piano", emoji: "🎹", tags: ["creatif"] },
  { id: "planche", label: "Planche de cuisine", emoji: "🥕", tags: ["metier"] },
  { id: "outils", label: "Caisse à outils", emoji: "🧰", tags: ["metier"] },
  { id: "trousse", label: "Trousse de soins", emoji: "🩹", tags: ["metier"] },
  { id: "rien", label: "Rien", emoji: "◻︎" },
];

export const WALLS = [
  { id: "etageres", label: "Étagères", emoji: "📚", tags: ["dev", "etudiant"] },
  { id: "cadres", label: "Cadres", emoji: "🖼️", tags: ["metier", "creatif"] },
  { id: "guirlande", label: "Guirlande lumineuse", emoji: "💡", tags: ["creatif"] },
  { id: "neon", label: "Enseigne néon", emoji: "🌟", tags: ["creatif", "dev"] },
  { id: "tableau", label: "Tableau noir", emoji: "🧮", tags: ["etudiant", "metier"] },
  { id: "rien", label: "Mur nu", emoji: "◻︎" },
];

export const CARDS = [
  { id: "code", label: "Fenêtre de code", emoji: "🧑‍💻", tags: ["dev"] },
  { id: "notes", label: "Post-it", emoji: "📝", tags: ["etudiant"] },
  { id: "palette", label: "Palette de couleurs", emoji: "🎨", tags: ["creatif"] },
  { id: "chart", label: "Graphique", emoji: "📈", tags: ["metier"] },
  { id: "playlist", label: "Lecteur de musique", emoji: "🎵", tags: ["creatif"] },
  { id: "rien", label: "Aucune", emoji: "◻︎" },
];

export const FLOATERS = [
  { id: "code", label: "Code", emoji: "</>", tags: ["dev"] },
  { id: "ecole", label: "École", emoji: "∑", tags: ["etudiant"] },
  { id: "art", label: "Art", emoji: "♪", tags: ["creatif"] },
  { id: "pro", label: "Pro", emoji: "%", tags: ["metier"] },
  { id: "cute", label: "Cute", emoji: "♥" },
  { id: "etoiles", label: "Étoiles", emoji: "✦" },
  { id: "rien", label: "Aucun", emoji: "◻︎" },
];

export const EFFECTS = [
  { id: "aucun", label: "Aucun", emoji: "◻︎" },
  { id: "etoiles", label: "Étoiles", emoji: "✨" },
  { id: "petales", label: "Pétales", emoji: "🌸" },
  { id: "bulles", label: "Bulles", emoji: "🫧" },
  { id: "neige", label: "Neige", emoji: "❄️" },
  { id: "lucioles", label: "Lucioles", emoji: "🪄" },
  { id: "confettis", label: "Confettis", emoji: "🎉" },
  { id: "coeurs", label: "Cœurs", emoji: "💗" },
];

// ── Ambiances (thèmes de décor). `pattern` = motif du mur ──────────────────
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

// ── Styles artistiques : traitements visuels appliqués à tout le rendu ─────
export const STYLES = [
  { id: "editorial", label: "Illustré", hint: "Aplats nets, le style d'origine" },
  { id: "pastel", label: "Pastel doux", hint: "Couleurs adoucies et lumineuses" },
  { id: "sticker", label: "Sticker", hint: "Contour blanc épais et ombre portée" },
  { id: "encre", label: "Encre", hint: "Silhouette cernée d'un trait sombre" },
  { id: "mono", label: "Noir & blanc", hint: "Monochrome contrasté" },
  { id: "reve", label: "Rêverie", hint: "Voile rosé et halo lumineux" },
  { id: "retro", label: "Rétro", hint: "Teintes sépia et trame de points" },
];

// ── Palettes : jeux de couleurs harmonieux appliqués en un clic ────────────
export const PALETTES = [
  { id: "sauge", label: "Sauge & crème", colors: ["#6F9482", "#E4D9BF", "#C98B72"], patch: { theme: "atelier", outfitColor: "#6F9482", headColor: "#E4D9BF", frame: "marron" } },
  { id: "peche", label: "Pêche & corail", colors: ["#F7DCCB", "#C8645A", "#5E8C86"], patch: { theme: "peche", outfitColor: "#C47A63", headColor: "#E4D9BF", frame: "rouge" } },
  { id: "lilas", label: "Lilas doux", colors: ["#E4DDF0", "#9B86C9", "#E08A9E"], patch: { theme: "lavande", outfitColor: "#9B86C9", headColor: "#D58BA0", frame: "rose" } },
  { id: "rose", label: "Bonbon", colors: ["#FCD9E4", "#E8628F", "#7EC4B6"], patch: { theme: "bonbon", outfitColor: "#D58BA0", headColor: "#F4F1EA", frame: "rose" } },
  { id: "minuit", label: "Minuit", colors: ["#1B2233", "#8FD6B0", "#F2A38A"], patch: { theme: "nuit", outfitColor: "#2F4468", headColor: "#8DB8D9", frame: "argent" } },
  { id: "academia", label: "Académie", colors: ["#2A2B22", "#9BB07C", "#C2855A"], patch: { theme: "academia", outfitColor: "#5B3A29", headColor: "#6F9482", frame: "or" } },
  { id: "ciel", label: "Ciel rêveur", colors: ["#DCEBFA", "#8D7BD8", "#F29EC0"], patch: { theme: "ciel", outfitColor: "#8DB8D9", headColor: "#D58BA0", frame: "bleu" } },
  { id: "lagon", label: "Lagon", colors: ["#D6E9EA", "#2F8F94", "#E0795D"], patch: { theme: "lagon", outfitColor: "#8DB8D9", headColor: "#F4F1EA", frame: "bleu" } },
  { id: "mono", label: "Monochrome", colors: ["#F2F1EE", "#2A2A2A", "#8A8A86"], patch: { theme: "papier", outfitColor: "#25262A", headColor: "#25262A", frame: "noir" } },
  { id: "sunset", label: "Sunset", colors: ["#F9D2B8", "#D2546A", "#7B5AA6"], patch: { theme: "sunset", outfitColor: "#9B86C9", headColor: "#D9A53C", frame: "rouge" } },
  { id: "jardin", label: "Jardin", colors: ["#DDEBD3", "#4F8A5B", "#E08A6A"], patch: { theme: "jardin", outfitColor: "#6F9482", headColor: "#F4F1EA", frame: "or" } },
  { id: "galaxie", label: "Galaxie", colors: ["#241B3D", "#FF9BD0", "#9FF0D8"], patch: { theme: "galaxie", outfitColor: "#9B86C9", headColor: "#D9B26A", frame: "rose" } },
];

// ── Animation ──────────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { id: "code", label: "Coder en musique", hint: "Tête qui rebondit, notes, idée de temps en temps" },
  { id: "focus", label: "Se concentrer", hint: "Tête penchée sur son travail, regard baissé" },
  { id: "think", label: "Réfléchir", hint: "Les idées jaillissent, sourcils relevés" },
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

export const MESSAGES = [
  { id: "rotation", label: "Variés", texts: ["Coucou !", "Bonjour et bienvenue !", "Une idée en tête ?", "On crée quelque chose ?"] },
  { id: "bonjour", label: "Bonjour !", texts: ["Bonjour !"] },
  { id: "salama", label: "Salama !", texts: ["Salama ! Tongasoa !"] },
  { id: "hello", label: "Hello!", texts: ["Hello! Nice to meet you!"] },
  { id: "bravo", label: "Bravo !", texts: ["Bravo !", "Bien joué !"] },
  { id: "aucun", label: "Aucun", texts: [] },
];

// ── Valeurs par défaut (= l'avatar d'origine) ──────────────────────────────
export const DEFAULTS = {
  category: "dev", style: "editorial",
  skin: "caramel", face: "ovale", head: "normale", build: "standard", eyes: "brun", expression: "sourire",
  freckles: false, faceArt: "aucun",
  hair: "carre", hairColor: "noir", facialHair: "aucune",
  glasses: "rect", frame: "marron", headwear: "aucun", headColor: "sauge",
  earphones: "filaires", earrings: "aucune", neck: "aucun",
  outfit: "hoodie", outfitColor: "marron",
  theme: "atelier", bgColor: "", desk: "laptop", wall: "etageres", card: "code", floaters: "code", effect: "aucun",
  mug: true, orbit: true,
  activity: "code", tempo: "normal", hover: true, intro: true, message: "rotation",
};

// Clés dont la valeur peut être une couleur libre (#RRGGBB)
export const COLOR_KEYS = ["hairColor", "outfitColor", "eyes", "frame", "headColor"];

// Table de correspondance clé → liste d'options (sert à valider et au hasard)
export const LISTS = {
  category: CATEGORIES, style: STYLES,
  skin: SKINS, face: FACES, head: HEADS, build: BUILDS, eyes: EYES, expression: EXPRESSIONS, faceArt: FACE_ARTS,
  hair: HAIRS, hairColor: HAIR_COLORS, facialHair: FACIAL_HAIRS,
  glasses: GLASSES, frame: FRAME_COLORS, headwear: HEADWEARS, headColor: CLOTH_COLORS,
  earphones: EARPHONES, earrings: EARRINGS, neck: NECKS,
  outfit: OUTFITS, outfitColor: CLOTH_COLORS,
  theme: THEMES, desk: DESKS, wall: WALLS, card: CARDS, floaters: FLOATERS, effect: EFFECTS,
  activity: ACTIVITIES, tempo: TEMPOS, message: MESSAGES,
};

export const FLAGS = ["freckles", "mug", "orbit", "hover", "intro"];

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
  card: "0 70 120 110",
};
