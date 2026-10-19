// Étapes de l'éditeur : chaque groupe décrit un contrôle (voir ui/Options.jsx).
// kind : category | looks | thumb | swatch | theme | bgcolor | palette | chips | text | toggle
// variant : "thumb" (personnage seul) ou "scene" (scène complète recadrée)
// tagged : propose « Pour mon univers » / « Tout » (on peut mélanger les catégories)
export const STEPS = [
  {
    id: "univers", label: "Univers", hint: "Catégorie, style visuel et palette",
    groups: [
      { kind: "category", label: "Ton univers" },
      { kind: "looks", label: "Looks prêts à personnaliser" },
      { key: "style", kind: "thumb", variant: "scene", crop: "40 20 320 340", label: "Style visuel" },
      { kind: "palette", label: "Palettes harmonieuses" },
    ],
  },
  {
    id: "perso", label: "Personnage", hint: "Visage, expression et coiffure",
    groups: [
      { key: "skin", kind: "swatch", label: "Teint" },
      { key: "face", kind: "thumb", crop: "face", label: "Forme du visage" },
      { key: "head", kind: "thumb", crop: "head", label: "Proportions" },
      { key: "build", kind: "thumb", crop: "bust", label: "Carrure" },
      { key: "expression", kind: "thumb", crop: "face", label: "Expression", preview: { glasses: "aucune" } },
      { key: "eyes", kind: "swatch", label: "Couleur des yeux", custom: true },
      { key: "faceArt", kind: "thumb", crop: "face", label: "Détails du visage" },
      { key: "freckles", kind: "toggle", label: "Taches de rousseur" },
      { key: "hair", kind: "thumb", crop: "head", label: "Coiffure", preview: { headwear: "aucun" } },
      { key: "hairColor", kind: "swatch", label: "Couleur des cheveux", custom: true },
      { key: "facialHair", kind: "thumb", crop: "face", label: "Pilosité faciale" },
    ],
  },
  {
    id: "look", label: "Look", hint: "Vêtements et accessoires",
    groups: [
      { key: "outfit", kind: "thumb", crop: "bust", label: "Vêtement", tagged: true },
      { key: "outfitColor", kind: "swatch", label: "Couleur du vêtement", custom: true },
      { key: "neck", kind: "thumb", crop: "bust", label: "Cou", tagged: true },
      { key: "glasses", kind: "thumb", crop: "eyes", label: "Lunettes" },
      { key: "frame", kind: "swatch", label: "Monture", custom: true, when: (c) => c.glasses !== "aucune" },
      { key: "headwear", kind: "thumb", crop: "head", label: "Couvre-chef", tagged: true },
      { key: "headColor", kind: "swatch", label: "Couleur des accessoires", custom: true, when: (c) => c.headwear !== "aucun" || c.neck !== "aucun" },
      { key: "earphones", kind: "thumb", crop: "head", label: "Audio", tagged: true },
      { key: "earrings", kind: "thumb", crop: "ears", label: "Boucles d'oreilles" },
    ],
  },
  {
    id: "decor", label: "Décor", hint: "Ambiance, objets et effets",
    groups: [
      { key: "theme", kind: "theme", label: "Ambiance" },
      { key: "bgColor", kind: "bgcolor", label: "Couleur du mur" },
      { key: "desk", kind: "thumb", variant: "scene", crop: "desk", label: "Objet sur le bureau", tagged: true },
      { key: "wall", kind: "thumb", variant: "scene", crop: "wall", label: "Décor mural", tagged: true },
      { key: "card", kind: "thumb", variant: "scene", crop: "card", label: "Fenêtre flottante", tagged: true },
      { key: "floaters", kind: "chips", label: "Symboles flottants", tagged: true },
      { key: "effect", kind: "chips", label: "Effet animé" },
      { key: "mug", kind: "toggle", label: "Tasse de café" },
      { key: "orbit", kind: "toggle", label: "Orbite" },
    ],
  },
  {
    id: "anim", label: "Animation", hint: "Mouvement, rythme et message",
    groups: [
      { key: "activity", kind: "text", label: "Activité" },
      { key: "tempo", kind: "text", compact: true, label: "Rythme" },
      { key: "message", kind: "text", compact: true, label: "Message de la bulle" },
      { key: "hover", kind: "toggle", label: "Regarder le curseur et saluer au survol" },
      { key: "intro", kind: "toggle", label: "Salut d'accueil au chargement" },
    ],
  },
  { id: "export", label: "Exporter", hint: "PNG, GIF, MP4 ou SVG animé", groups: [] },
];
