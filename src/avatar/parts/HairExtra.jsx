// Coiffures supplémentaires (même contrat que Hair.jsx : calques back / front).
const S = ({ c, o = 0.6, w = 2, children }) => (
  <g fill="none" stroke={c} strokeOpacity={o} strokeWidth={w} strokeLinecap="round">{children}</g>
);

// Cap collé au crâne avec raie au milieu (base de plusieurs styles)
const CAP = "M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178 Z";
const CAP_SHADOW = "M266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178";
const SKULL = "M200 62 C142 62 118 114 124 172 C126 192 130 204 134 210 L266 210 C270 204 274 192 276 172 C282 114 258 62 200 62 Z";

const braid = (x0, dir, base, strand) => {
  const pts = [[0, 214], [-4, 240], [-7, 266], [-10, 292], [-12, 318]];
  return (
    <g>
      {pts.map(([dx, y], i) => (
        <ellipse key={i} cx={x0 + dir * -dx} cy={y} rx="10" ry="13" transform={`rotate(${dir * 14} ${x0 + dir * -dx} ${y})`} fill={base} stroke={strand} strokeOpacity=".7" strokeWidth="1.6" />
      ))}
    </g>
  );
};

export const EXTRA = {
  // ── Bob net, frange balayée ──────────────────────────────────────────────
  bob: {
    back: (t) => (
      <path d="M200 58 C128 58 96 116 98 188 C99 214 100 232 108 244 C130 250 150 246 160 240 L240 240 C250 246 270 250 292 244 C300 232 301 214 302 188 C304 116 272 58 200 58 Z" fill={t.base} />
    ),
    front: (t, { shade }) => (
      <>
        <path d="M270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202" fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
        <path d="M130 202 C106 120 146 64 200 64 C254 64 294 120 270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202 Z" fill={t.base} />
        <path d="M110 188 C106 214 108 232 116 246 C130 250 146 244 152 238 C146 222 142 206 142 188 Z" fill={t.base} />
        <path d="M290 188 C294 214 292 232 284 246 C270 250 254 244 248 238 C254 222 258 206 258 188 Z" fill={t.base} />
        <S c={t.strand}><path d="M186 98 C160 102 142 126 136 164" /><path d="M196 98 C230 102 254 126 262 164" /><path d="M122 210 C122 224 126 236 132 244" /><path d="M278 210 C278 224 274 236 268 244" /></S>
        <path d="M156 92 C172 80 200 76 224 82" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="3.2" strokeLinecap="round" />
      </>
    ),
  },

  // ── Nattes ───────────────────────────────────────────────────────────────
  nattes: {
    back: (t) => <path d={SKULL} fill={t.base} />,
    front: (t, { shade, tie }) => (
      <>
        <path d={CAP_SHADOW} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d={CAP} fill={t.base} />
        <S c={t.strand}><path d="M200 104 C198 90 196 78 196 66" /><path d="M176 112 C164 98 158 84 158 74" /><path d="M226 110 C238 98 246 86 248 76" /></S>
        <path d="M200 64 V104" stroke={shade} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        {braid(124, 1, t.base, t.strand)}
        {braid(276, -1, t.base, t.strand)}
        <ellipse cx="116" cy="330" rx="8" ry="5" fill={tie} />
        <ellipse cx="284" cy="330" rx="8" ry="5" fill={tie} />
      </>
    ),
  },

  // ── Couettes hautes, frange droite ───────────────────────────────────────
  couettes: {
    back: (t, ) => (
      <>
        <path d={SKULL} fill={t.base} />
        <circle cx="98" cy="122" r="30" fill={t.base} />
        <circle cx="302" cy="122" r="30" fill={t.base} />
        <path d="M82 138 C70 184 82 226 102 244 C110 224 110 188 118 156 Z" fill={t.base} />
        <path d="M318 138 C330 184 318 226 298 244 C290 224 290 188 282 156 Z" fill={t.base} />
        <S c={t.strand} o={0.5}><path d="M84 132 C74 170 84 206 98 228" /><path d="M316 132 C326 170 316 206 302 228" /></S>
      </>
    ),
    front: (t, { shade, tie }) => (
      <>
        <path d="M266 178 C262 150 256 130 240 120 C228 112 212 108 200 108 C188 108 172 112 160 120 C144 130 138 150 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 256 130 240 120 C228 112 212 108 200 108 C188 108 172 112 160 120 C144 130 138 150 134 178 Z" fill={t.base} />
        <path d="M146 112 C168 100 232 100 254 112 L256 132 C232 124 168 124 144 132 Z" fill={t.base} />
        <S c={t.strand}><path d="M168 106 C166 114 166 122 168 128" /><path d="M200 104 C200 112 200 120 200 126" /><path d="M232 106 C234 114 234 122 232 128" /></S>
        <path d="M160 84 C178 74 210 72 234 80" fill="none" stroke={t.shine} strokeOpacity=".5" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="116" cy="128" rx="5" ry="12" transform="rotate(28 116 128)" fill={tie} />
        <ellipse cx="284" cy="128" rx="5" ry="12" transform="rotate(-28 284 128)" fill={tie} />
      </>
    ),
  },

  // ── Afro puffs ───────────────────────────────────────────────────────────
  puffs: {
    back: (t) => (
      <>
        <circle cx="140" cy="78" r="36" fill={t.base} />
        <circle cx="260" cy="78" r="36" fill={t.base} />
        <path d={SKULL} fill={t.base} />
        <g fill="none" stroke={t.strand} strokeOpacity=".4" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 8">
          <circle cx="140" cy="78" r="22" /><circle cx="260" cy="78" r="22" />
        </g>
      </>
    ),
    front: (t, { shade, tie }) => (
      <>
        <path d="M266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C120 130 148 80 200 78 C252 80 280 130 266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178 Z" fill={t.base} />
        <ellipse cx="164" cy="108" rx="8" ry="5" transform="rotate(-30 164 108)" fill={tie} />
        <ellipse cx="236" cy="108" rx="8" ry="5" transform="rotate(30 236 108)" fill={tie} />
      </>
    ),
  },

  // ── Longs lisses, raie au milieu ─────────────────────────────────────────
  longs: {
    back: (t) => (
      <>
        <path d="M200 56 C120 56 88 118 92 210 C94 270 92 310 88 340 L312 340 C308 310 306 270 308 210 C312 118 280 56 200 56 Z" fill={t.base} />
        <path d="M110 190 C106 240 104 290 100 330" fill="none" stroke={t.back} strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M290 190 C294 240 296 290 300 330" fill="none" stroke={t.back} strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
    front: (t, { shade }) => (
      <>
        <path d="M130 222 C108 130 146 66 200 64 C254 66 292 130 270 222 C262 180 246 142 214 114 C208 108 204 106 200 106 C196 106 192 108 186 114 C154 142 138 180 130 222" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="9" strokeLinecap="round" />
        <path d="M130 222 C108 130 146 64 200 64 C254 64 292 130 270 222 C262 180 246 142 214 114 C208 108 204 106 200 106 C196 106 192 108 186 114 C154 142 138 180 130 222 Z" fill={t.base} />
        <path d="M110 200 C102 250 98 292 100 336 C114 342 130 336 140 324 C140 282 138 240 142 202 Z" fill={t.base} />
        <path d="M290 200 C298 250 302 292 300 336 C286 342 270 336 260 324 C260 282 262 240 258 202 Z" fill={t.base} />
        <S c={t.strand}><path d="M200 106 C198 92 196 78 196 66" /><path d="M186 114 C160 118 140 150 134 196" /><path d="M214 114 C240 118 260 150 266 196" /><path d="M118 214 C114 262 112 300 112 330" /><path d="M282 214 C286 262 288 300 288 330" /></S>
        <path d="M156 92 C172 78 200 74 224 80" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="3.2" strokeLinecap="round" />
      </>
    ),
  },

  // ── Ondulés mi-longs ─────────────────────────────────────────────────────
  ondules: {
    back: (t) => (
      <path d="M200 56 C122 56 90 116 94 196 C96 224 92 244 98 262 Q108 278 120 262 Q132 248 144 266 L256 266 Q268 248 280 262 Q292 278 302 262 C308 244 304 224 306 196 C310 116 278 56 200 56 Z" fill={t.base} />
    ),
    front: (t, { shade }) => (
      <>
        <path d="M270 214 C264 170 254 140 236 122 C224 112 208 104 190 98 C170 112 150 134 142 176 C138 192 134 204 130 214" fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
        <path d="M130 214 C106 122 146 64 200 64 C254 64 294 122 270 214 C264 170 254 140 236 122 C224 112 208 104 190 98 C170 112 150 134 142 176 C138 192 134 204 130 214 Z" fill={t.base} />
        <path d="M114 196 Q100 218 112 238 Q124 254 114 276 Q130 282 144 268 Q154 238 144 212 Z" fill={t.base} />
        <path d="M286 196 Q300 218 288 238 Q276 254 286 276 Q270 282 256 268 Q246 238 256 212 Z" fill={t.base} />
        <S c={t.strand}><path d="M186 98 C160 102 142 126 136 164" /><path d="M196 98 C230 102 254 126 262 164" /><path d="M118 214 Q110 236 120 254" /><path d="M282 214 Q290 236 280 254" /></S>
        <path d="M154 94 C170 80 198 76 222 82" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="3.2" strokeLinecap="round" />
      </>
    ),
  },

  // ── Banane (gros volume devant) ──────────────────────────────────────────
  pompadour: {
    back: (t) => <path d={SKULL} fill={t.base} />,
    front: (t, { shade }) => (
      <>
        <path d="M266 178 C264 150 256 132 242 122 C230 114 214 112 200 112 C186 112 168 116 156 126 C142 138 136 156 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d="M134 178 C120 112 138 38 212 34 C264 34 284 100 266 178 C264 150 256 132 242 122 C230 114 214 112 200 112 C186 112 168 116 156 126 C142 138 136 156 134 178 Z" fill={t.base} />
        <S c={t.strand} w={2.2}><path d="M164 112 C158 90 160 66 176 50" /><path d="M192 110 C186 84 190 58 208 42" /><path d="M224 112 C226 86 236 62 252 52" /></S>
        <path d="M150 90 C158 66 184 48 214 46" fill="none" stroke={t.shine} strokeOpacity=".55" strokeWidth="3.4" strokeLinecap="round" />
      </>
    ),
  },

  // ── Locks ────────────────────────────────────────────────────────────────
  locks: {
    back: (t) => (
      <>
        <path d={SKULL} fill={t.base} />
        <g fill="none" stroke={t.base} strokeWidth="13" strokeLinecap="round">
          <path d="M126 150 C108 190 104 240 110 292" /><path d="M140 168 C128 210 126 250 130 296" /><path d="M110 138 C90 180 88 232 94 276" />
          <path d="M274 150 C292 190 296 240 290 292" /><path d="M260 168 C272 210 274 250 270 296" /><path d="M290 138 C310 180 312 232 306 276" />
        </g>
        <g fill="none" stroke={t.strand} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 9">
          <path d="M126 150 C108 190 104 240 110 292" /><path d="M274 150 C292 190 296 240 290 292" /><path d="M94 150 C80 190 82 232 90 272" opacity="0" />
        </g>
      </>
    ),
    front: (t, { shade, tie }) => (
      <>
        <path d={CAP_SHADOW} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d={CAP} fill={t.base} />
        <g fill="none" stroke={t.base} strokeWidth="13" strokeLinecap="round">
          <path d="M148 120 C140 170 134 230 140 308" /><path d="M252 120 C260 170 266 230 260 308" />
        </g>
        <g fill="none" stroke={t.strand} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 9">
          <path d="M148 120 C140 170 134 230 140 308" /><path d="M252 120 C260 170 266 230 260 308" />
        </g>
        <S c={t.strand}><path d="M200 104 C198 90 196 78 196 66" /><path d="M176 112 C164 98 158 84 158 74" /></S>
        <rect x="134" y="140" width="12" height="5" rx="2.4" fill={tie} />
        <rect x="254" y="140" width="12" height="5" rx="2.4" fill={tie} />
      </>
    ),
  },
};
