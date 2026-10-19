# Endrika

> *endrika* (malgache) : la forme, l'apparence.

Plateforme pour créer un **avatar animé personnalisé**, quel que soit ton métier, tes études ou ta passion. Tout se fait par sélection (aucun prompt) : l'avatar est un SVG animé en CSS, rendu par React, et tout fonctionne dans le navigateur (aucun serveur).

## Ce que fait Endrika

**Inspirations** : galerie masonry de 38 inspirations en 10 collections (Cute & Coquette, Soft Pastel, Dark Academia, Dreamy, Artistic Soul, Digital Creator, Study Vibes, Minimal, Ocean, Fantasy). Filtres par collection, catégorie d'avatar, couleur et style artistique ; favoris ; bouton « Créer à partir de cette inspiration » (chaque inspiration est une vraie configuration modifiable) ; générateur de « remix » inédits.

**Éditeur en 6 étapes** : Univers (catégorie, looks prêts à personnaliser, style visuel, palettes) · Personnage · Look · Décor · Animation · Exporter.

- **5 univers** : Développeur 💻, Étudiant 📚, Autres métiers 💼, Créatif 🎨, Personnalisation libre ✨. Chaque univers met en avant ses objets (ordinateur, cahier, tablette graphique, stéthoscope…), mais on peut tout mélanger (bouton « Tout »).
- **7 styles artistiques** : Illustré, Pastel, Sticker, Encre, Noir & blanc, Rêverie, Rétro.
- 15 coiffures, 5 formes de visage, 3 proportions, 8 expressions, 10 tenues, 12 couvre-chefs, 8 accessoires de cou, 11 objets de bureau, 14 ambiances, 7 activités animées, effets de particules, couleurs libres (cheveux, yeux, vêtement, monture, mur).
- **Annuler / rétablir** (Ctrl+Z, Ctrl+Maj+Z), réinitialiser, aléatoire, **lien partageable**, **enregistrement** des créations (« Mes créations », sur l'appareil).

**Exports réels** (générés dans le navigateur) :

| Format | Options | Remarques |
|---|---|---|
| PNG | taille 512 / 1024 / 2048, fond décor / transparent / couleur | |
| GIF | taille, fluidité, durée, fond | boucle parfaite ; transparence 1 bit |
| MP4 | taille, fluidité, durée, répétitions, qualité, fond | H.264 via WebCodecs (Chrome, Edge, Safari récents) |
| SVG animé | fond | vectoriel, animations CSS embarquées |

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173/Endrika/
npm run build
```

## Déployer sur GitHub Pages

```bash
npm run deploy     # build + publication de dist/ sur la branche gh-pages
```

Le site est servi sous `https://Fifah727.github.io/Endrika/` (`homepage` dans `package.json`, `base: '/Endrika/'` dans `vite.config.js`). L'état vit dans le `#hash` : aucun routeur côté serveur, aucun 404. Ajoute ce lien à « Voir le demo » du projet.

## Structure

```
src/
  App.jsx, main.jsx         application, navigation par hash, écrans chargés à la demande
  views/                    Gallery (inspirations), Editor (6 étapes), Saved (mes créations)
  components/               Nav, InspirationCard, InspirationModal, Skeleton, ErrorBoundary
  data/                     collections.js, inspirations.js (38 configs + remix + filtre couleur)
  state/                    useHistory (annuler/rétablir), useRoute, useStore (favoris, créations)
  avatar/
    catalog.js              TOUTES les options, palettes, catégories, looks
    config.js               validation, hasard, lien partageable, stockage local
    Avatar.jsx              assemble les calques selon la configuration
    parts/                  Hair, Face, Glasses, Accessories, Outfit, DeskItems, Decor, Scene, StyleFilters
  ui/
    panels.js, Options.jsx  étapes et contrôles de l'éditeur
    ExportPanel.jsx         options et aperçu des exports
    export/index.js         moteur d'export (échantillonnage des animations, PNG, GIF, MP4, SVG)
  styles/                   avatar.css (animations, états), studio.css (interface)
```

## Ajouter du contenu

- **Une option** : l'ajouter dans `src/avatar/catalog.js`, puis dessiner la variante dans `src/avatar/parts/` (viewBox 400×400, contour du visage commun x 134→266, points d'ancrage inchangés).
- **Une inspiration** : une ligne `I(...)` dans `src/data/inspirations.js` (n'importe quelle combinaison d'options valides).
- **Une collection** : une entrée dans `src/data/collections.js`.

## Comment fonctionnent les exports

L'avatar est rendu hors écran ; les animations CSS sont figées à des instants précis avec la Web Animations API (leurs durées sont ajustées pour une boucle parfaite), chaque instant est converti en SVG statique puis dessiné sur un canvas, et enfin encodé : `gifenc` pour le GIF, `WebCodecs` + `mp4-muxer` pour le MP4. Les encodeurs ne sont chargés qu'au moment de l'export.

## Limites connues

- Le MP4 nécessite WebCodecs (contexte sécurisé : https ou localhost). Sinon l'interface l'indique et propose le GIF.
- Le GIF transparent n'a pas de demi-teintes : les bords peuvent être crénelés.
- Les créations et favoris sont stockés dans le navigateur (pas de compte ni de synchronisation).
- Les textes (bulle) utilisent la police monospace du système dans les fichiers exportés.
