# Endrika

Site qui permet de **créer un avatar animé par sélection** (teint, visage, cheveux, accessoires, tenue, décor, animation), sans prompt. L'avatar est un SVG animé en CSS, rendu par React.

- Aperçu en direct, bouton **Aléatoire**, **Réinitialiser**
- **Copier le lien** : tous les choix sont dans l'URL (`#hair=boucles&skin=ebene…`)
- **Télécharger** en SVG animé (le CSS est embarqué) ou en PNG 1024 px
- Respecte « réduire les animations » du système

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
```

## Déployer sur GitHub Pages

1. Crée un dépôt GitHub et pousse le projet sur la branche `main`.
2. Dans **Settings → Pages**, choisis **Source : GitHub Actions**.
3. Chaque push sur `main` lance `.github/workflows/deploy.yml` (build + déploiement).
4. L'adresse sera `https://<pseudo>.github.io/<depot>/`. Colle-la dans le bouton « Voir le demo » du projet, dans le portfolio.

`vite.config.js` utilise `base: "./"` : aucune adresse à configurer, et l'état vit dans le `#hash`, donc pas de routeur ni de 404.

## Structure

```
src/
  avatar/
    catalog.js        toutes les options, palettes et panneaux de l'interface
    config.js         validation, hasard, lien partageable, stockage local
    color.js          dérive ombres et reflets d'une couleur de base
    Avatar.jsx        assemble les calques selon la config + interactions
    parts/            Hair, Face, Glasses, Outfit, Accessories, Scene (décor)
  styles/avatar.css   états, activités, tempo, accessibilité
  styles/Craft.css   interface
  ui/                 Options (aperçus, pastilles…), exporters (SVG, PNG, lien)
```

## Ajouter une option

1. Ajoute-la dans la liste correspondante de `src/avatar/catalog.js` (ex. `HAIRS`).
2. Dessine la variante dans `src/avatar/parts/` (ex. une entrée de `STYLES` dans `Hair.jsx`).
3. C'est tout : l'aperçu, le hasard, la validation du lien et l'export la prennent en compte.

Règles de dessin : viewBox 400 × 400, contour du visage commun (x 134→266, y 96→260), points d'ancrage des animations inchangés (tête `200 300`, bras `340 264`). Pour une coiffure, fournir un calque `back` (derrière le buste) et un calque `front` (par-dessus le visage).

## Pistes

Export animé en WebM/GIF, plus de coiffures et de tenues, chapeaux et bijoux colorables, accessoires de bureau au choix (livre, plante, chat).
