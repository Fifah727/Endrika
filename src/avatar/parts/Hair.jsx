// Chaque coiffure fournit deux calques :
//   back  → dessiné DERRIÈRE le buste et la tête
//   front → dessiné PAR-DESSUS le visage (frange, mèches, pointes)
// Toutes les coiffures respectent le même contour de visage (x 134→266, y 96→260).

const Strokes = ({ children, color, opacity = 0.65, width = 1.8 }) => (
  <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={width} strokeLinecap="round">
    {children}
  </g>
);

// Pointes du carré, posées sur les épaules (identiques des deux côtés, en miroir)
const TIP = "M90.5 254 C89 284 86 300 90 312 C95 324 112 328 126 322 C138 317 144 306 145 294 C146 282 146 270 148 260 L130 248 Z";
const TIP_LINE = "M99 292 C100 306 106 316 118 320";

const STYLES = {
  // ── Carré long (coiffure d'origine) ──────────────────────────────────────
  carre: {
    back: (t) => (
      <>
        <path d="M200 56 C124 56 86 118 90 206 C92 244 90 274 87 300 L87 312 L313 312 L313 300 C310 274 308 244 310 206 C314 118 276 56 200 56 Z" fill={t.base} />
        <path d="M104 170 C100 210 97 250 93 288" fill="none" stroke={t.back} strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M296 170 C300 210 303 250 307 288" fill="none" stroke={t.back} strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
    front: (t, { shade }) => (
      <>
        <path d="M270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202" fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
        <path d="M130 202 C106 120 146 64 200 64 C254 64 294 120 270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202 Z" fill={t.base} />
        <path d="M190 98 C188 86 185 76 182 65" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round" />
        <Strokes color={t.strand}>
          <path d="M186 98 C160 102 142 126 136 164" />
          <path d="M182 84 C152 92 128 120 122 164" />
          <path d="M196 98 C230 102 254 126 262 164" />
          <path d="M202 82 C238 90 264 120 270 160" />
        </Strokes>
        <path d="M154 94 C170 80 198 76 222 82" fill="none" stroke={t.strand} strokeOpacity=".7" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M236 98 C250 106 258 120 262 138" fill="none" stroke={t.strand} strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
        <path d={TIP} fill={t.base} />
        <path d={TIP_LINE} fill="none" stroke={t.strand} strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" />
        <g transform="translate(400 0) scale(-1 1)">
          <path d={TIP} fill={t.base} />
          <path d={TIP_LINE} fill="none" stroke={t.strand} strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </>
    ),
  },

  // ── Court, frange balayée ────────────────────────────────────────────────
  court: {
    back: (t) => (
      <path d="M200 60 C140 60 116 112 122 172 C124 192 128 204 134 210 L266 210 C272 204 276 192 278 172 C284 112 260 60 200 60 Z" fill={t.base} />
    ),
    front: (t, { shade }) => (
      <>
        <path d="M266 178 C264 156 258 140 248 130 C236 116 214 110 196 112 C176 114 158 122 148 136 C140 148 136 162 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C264 156 258 140 248 130 C236 116 214 110 196 112 C176 114 158 122 148 136 C140 148 136 162 134 178 Z" fill={t.base} />
        <Strokes color={t.strand}>
          <path d="M176 76 C170 90 168 104 170 116" />
          <path d="M206 70 C204 84 206 98 212 108" />
          <path d="M236 78 C242 92 246 106 248 120" />
        </Strokes>
        <path d="M158 94 C176 78 206 74 232 82" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="3.2" strokeLinecap="round" />
      </>
    ),
  },

  // ── Bouclés (volume rond) ────────────────────────────────────────────────
  boucles: {
    back: (t) => {
      const blobs = [
        [200, 112, 72], [200, 82, 44], [150, 78, 34], [250, 78, 34], [120, 122, 34],
        [280, 122, 34], [104, 170, 32], [296, 170, 32], [108, 216, 24], [292, 216, 24],
      ];
      return (
        <>
          <g fill={t.base}>
            {blobs.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
          <g fill="none" stroke={t.strand} strokeOpacity=".35" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="7 9">
            {blobs.slice(1).map(([x, y, r]) => (
              <circle key={`s${x}-${y}`} cx={x} cy={y} r={r * 0.55} />
            ))}
          </g>
        </>
      );
    },
    front: (t, { shade }) => (
      <>
        <path d="M266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C118 130 140 86 178 80 C196 76 204 76 222 80 C260 86 282 130 266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178 Z" fill={t.base} />
        <g fill="none" stroke={t.strand} strokeOpacity=".6" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="172" cy="100" r="9" />
          <circle cx="204" cy="94" r="10" />
          <circle cx="236" cy="102" r="9" />
          <circle cx="152" cy="128" r="6" />
          <circle cx="250" cy="130" r="6" />
        </g>
      </>
    ),
  },

  // ── Queue de cheval (sur le côté gauche) ─────────────────────────────────
  queue: {
    back: (t) => (
      <>
        <path d="M200 62 C142 62 118 114 124 172 C126 192 130 204 134 210 L266 210 C270 204 274 192 276 172 C282 114 258 62 200 62 Z" fill={t.base} />
        <path d="M152 96 C98 88 66 140 80 204 C86 240 102 266 112 290 C118 268 116 242 120 218 C124 180 132 142 152 122 Z" fill={t.base} />
        <Strokes color={t.strand} opacity={0.55} width={2.2}>
          <path d="M120 106 C92 126 84 170 94 214" />
          <path d="M132 112 C112 140 108 186 114 246" />
        </Strokes>
      </>
    ),
    front: (t, { shade, tie }) => (
      <>
        <path d="M266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178 Z" fill={t.base} />
        <Strokes color={t.strand}>
          <path d="M200 104 C194 90 188 78 184 68" />
          <path d="M176 112 C164 98 158 84 158 74" />
          <path d="M226 110 C238 98 246 86 248 76" />
        </Strokes>
        <path d="M168 82 C186 72 214 72 234 80" fill="none" stroke={t.shine} strokeOpacity=".5" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="148" cy="106" rx="6" ry="10" transform="rotate(-38 148 106)" fill={tie} />
      </>
    ),
  },

  // ── Chignon (haut, côté gauche) ──────────────────────────────────────────
  chignon: {
    back: (t) => (
      <path d="M200 62 C142 62 118 114 124 172 C126 192 130 204 134 210 L266 210 C270 204 274 192 276 172 C282 114 258 62 200 62 Z" fill={t.base} />
    ),
    front: (t, { shade, tie, hideTop }) => (
      <>
        {!hideTop && (
          <>
            <circle cx="164" cy="60" r="25" fill={t.base} />
            <g fill="none" stroke={t.strand} strokeOpacity=".6" strokeWidth="2.2" strokeLinecap="round">
              <path d="M146 52 C156 42 172 42 182 52" />
              <path d="M144 64 C156 56 174 56 184 66" />
              <path d="M154 78 C164 72 176 72 182 78" />
            </g>
          </>
        )}
        <path d="M266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178 Z" fill={t.base} />
        <Strokes color={t.strand}>
          <path d="M200 104 C196 90 192 80 190 70" />
          <path d="M226 110 C238 98 246 86 248 76" />
        </Strokes>
        {!hideTop && <ellipse cx="164" cy="78" rx="14" ry="4.5" transform="rotate(-14 164 78)" fill={tie} />}
      </>
    ),
  },

  // ── Rasé (ras du crâne) ──────────────────────────────────────────────────
  rase: {
    back: () => null,
    front: (t) => (
      <>
        <path d="M136 152 C130 118 156 82 200 80 C244 82 270 118 264 152 C258 130 240 112 200 110 C160 112 142 130 136 152 Z" fill={t.base} fillOpacity=".92" />
        <path d="M158 94 C176 84 206 82 230 88" fill="none" stroke={t.shine} strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },

  // ── Chauve ───────────────────────────────────────────────────────────────
  chauve: {
    back: () => null,
    front: () => null,
  },
};

export function HairBack({ style, tone }) {
  return (STYLES[style] ?? STYLES.carre).back(tone);
}

export function HairFront({ style, tone, ...extra }) {
  return (STYLES[style] ?? STYLES.carre).front(tone, extra);
}
