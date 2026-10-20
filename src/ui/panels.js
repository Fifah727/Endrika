// Étapes de l'éditeur : chaque groupe décrit un contrôle (voir ui/Options.jsx).
// kind : category | thumb | swatch | theme | chips | text | toggle
// variant : "thumb" (personnage seul) ou "scene" (scène complète recadrée)
// tagged : les options pensées pour l'univers choisi passent en premier (on peut toujours tout mélanger)
export const STEPS = [
  { id: "univers", label: "Univers", hint: "Choisis ce qui te ressemble : tu pourras tout mélanger ensuite.", groups: [{ kind: "category", label: "Ton univers" }] },
  {
    id: "perso", label: "Personnage", hint: "Visage, expression et coiffure",
    groups: [
      { key: "skin", kind: "swatch", label: "Teint" },
      { key: "face", kind: "thumb", crop: "face", label: "Forme du visage" },
      { key: "build", kind: "thumb", crop: "bust", label: "Carrure" },
      { key: "expression", kind: "thumb", crop: "face", label: "Expression", preview: { glasses: "aucune" } },
      { key: "eyes", kind: "swatch", label: "Couleur des yeux" },
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
      { key: "frame", kind: "swatch", label: "Monture", when: (c) => c.glasses !== "aucune" },
      { key: "headwear", kind: "thumb", crop: "head", label: "Couvre-chef", tagged: true },
      { key: "headColor", kind: "swatch", label: "Couleur des accessoires", when: (c) => c.headwear !== "aucun" || c.neck !== "aucun" },
      { key: "earphones", kind: "thumb", crop: "head", label: "Audio", tagged: true },
      { key: "earrings", kind: "thumb", crop: "ears", label: "Boucles d'oreilles" },
    ],
  },
  {
    id: "decor", label: "Décor", hint: "Ambiance, objet et effet",
    groups: [
      { key: "theme", kind: "theme", label: "Ambiance" },
      { key: "desk", kind: "thumb", variant: "scene", crop: "desk", label: "Objet sur le bureau", tagged: true },
      { key: "wall", kind: "thumb", variant: "scene", crop: "wall", label: "Décor mural", tagged: true },
      { key: "effect", kind: "chips", label: "Effet animé" },
    ],
  },
  {
    id: "anim", label: "Animation", hint: "Ce que fait ton avatar",
    groups: [
      { key: "activity", kind: "text", label: "Activité" },
      { key: "tempo", kind: "text", compact: true, label: "Rythme" },
    ],
  },
  { id: "export", label: "Exporter", hint: "PNG, GIF, MP4 ou SVG animé", groups: [] },
];
