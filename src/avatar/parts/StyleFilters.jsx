// Styles artistiques : filtres SVG (valables aussi à l'export) + voiles décoratifs.
// `scene`  : filtre appliqué à toute l'image (couleurs)
// `person` : filtre appliqué au personnage seul (contour)

export const sceneFilterFor = (style) => (["pastel", "mono", "retro", "reve"].includes(style) ? style : null);
export const personFilterFor = (style) => (["sticker", "encre"].includes(style) ? style : null);

export function StyleDefs({ uid, style }) {
  const id = (k) => `st-${k}-${uid}`;
  return (
    <>
      <filter id={id("pastel")} colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0.7" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.88" intercept="0.12" />
          <feFuncG type="linear" slope="0.88" intercept="0.12" />
          <feFuncB type="linear" slope="0.88" intercept="0.12" />
        </feComponentTransfer>
      </filter>
      <filter id={id("mono")} colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.18" intercept="-0.08" />
          <feFuncG type="linear" slope="1.18" intercept="-0.08" />
          <feFuncB type="linear" slope="1.18" intercept="-0.08" />
        </feComponentTransfer>
      </filter>
      <filter id={id("retro")} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.52 0.62 0.15 0 0.02  0.40 0.62 0.13 0 0.01  0.28 0.46 0.12 0 0  0 0 0 1 0" />
      </filter>
      <filter id={id("reve")} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="1.02 0 0.04 0 0.03  0 0.98 0.04 0 0.02  0.02 0 1.06 0 0.05  0 0 0 1 0" />
      </filter>
      <filter id={id("sticker")} x="-8%" y="-8%" width="116%" height="116%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grow" />
        <feFlood floodColor="#FFFFFF" result="white" />
        <feComposite in="white" in2="grow" operator="in" result="outline" />
        <feGaussianBlur in="grow" stdDeviation="3" result="blur" />
        <feOffset in="blur" dy="4" result="shadowMove" />
        <feFlood floodColor="#000000" floodOpacity="0.3" result="dark" />
        <feComposite in="dark" in2="shadowMove" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={id("encre")} x="-6%" y="-6%" width="112%" height="112%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="grow" />
        <feFlood floodColor="#2B2420" result="ink" />
        <feComposite in="ink" in2="grow" operator="in" result="outline" />
        <feMerge>
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id={id("haze")} cx="50%" cy="42%" r="60%">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.38" />
        <stop offset="1" stopColor="#FFC9E6" stopOpacity="0.1" />
      </radialGradient>
      <pattern id={id("grain")} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.1" fill="#3A2A1A" opacity="0.14" />
      </pattern>
    </>
  );
}

/** Voile posé au-dessus de la scène (rêverie, rétro). */
export function StyleOverlay({ uid, style }) {
  if (style === "reve") {
    return (
      <g pointerEvents="none">
        <rect width="400" height="400" fill={`url(#st-haze-${uid})`} />
        <g fill="#fff">
          <circle className="av-spark" cx="86" cy="262" r="2.6" /><circle className="av-spark" style={{ animationDelay: "-1.2s" }} cx="320" cy="238" r="2" />
          <circle className="av-spark" style={{ animationDelay: "-2s" }} cx="248" cy="40" r="2.4" />
        </g>
      </g>
    );
  }
  if (style === "retro") {
    return (
      <g pointerEvents="none">
        <rect width="400" height="400" fill={`url(#st-grain-${uid})`} />
        <rect width="400" height="400" fill="#F0C890" opacity=".1" />
      </g>
    );
  }
  return null;
}
