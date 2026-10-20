import { lighten, lum } from "../color";

// Seule la partie basse du contour change : le haut reste identique pour que
// toutes les coiffures s'ajustent à toutes les formes de visage.
const FACE_PATHS = {
  ovale:
    "M134 172 C134 122 164 96 200 96 C236 96 266 122 266 172 C266 222 236 260 200 260 C164 260 134 222 134 172 Z",
  ronde:
    "M134 172 C134 122 164 96 200 96 C236 96 266 122 266 172 C266 232 238 264 200 264 C162 264 134 232 134 172 Z",
  carree:
    "M134 172 C134 122 164 96 200 96 C236 96 266 122 266 172 L264 214 C262 242 240 258 200 258 C160 258 138 242 136 214 Z",
  coeur:
    "M134 172 C134 122 164 96 200 96 C236 96 266 122 266 172 C266 214 238 244 200 266 C162 244 134 214 134 172 Z",
  longue:
    "M134 172 C134 122 164 96 200 96 C236 96 266 122 266 172 C266 236 240 276 200 276 C160 276 134 236 134 172 Z",
};

export function Ears({ skin }) {
  return (
    <>
      <ellipse cx="132" cy="192" rx="8" ry="13" fill={skin.ear} />
      <path d="M130 184 C127 188 127 196 131 200" fill="none" stroke={skin.line} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="268" cy="192" rx="8" ry="13" fill={skin.ear} />
      <path d="M270 184 C273 188 273 196 269 200" fill="none" stroke={skin.line} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
    </>
  );
}

export function FaceBase({ skin, shape, freckles }) {
  return (
    <>
      <path d={FACE_PATHS[shape] ?? FACE_PATHS.ovale} fill={skin.face} />
      {/* joues (plus roses quand elle sourit largement : voir avatar.css) */}
      <ellipse className="av-cheek" cx="160" cy="208" rx="13" ry="7" fill={skin.blush} />
      <ellipse className="av-cheek" cx="240" cy="208" rx="13" ry="7" fill={skin.blush} />
      {freckles && (
        <g fill={skin.line} opacity=".6">
          <circle cx="154" cy="202" r="1.4" /><circle cx="163" cy="206" r="1.4" /><circle cx="172" cy="203" r="1.4" />
          <circle cx="158" cy="212" r="1.3" /><circle cx="168" cy="214" r="1.3" />
          <circle cx="246" cy="202" r="1.4" /><circle cx="237" cy="206" r="1.4" /><circle cx="228" cy="203" r="1.4" />
          <circle cx="242" cy="212" r="1.3" /><circle cx="232" cy="214" r="1.3" />
          <circle cx="195" cy="200" r="1.2" /><circle cx="205" cy="201" r="1.2" />
        </g>
      )}
      {/* nez */}
      <path d="M201 184 Q194 202 206 204" fill="none" stroke={skin.line} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="203.5" cy="199" r="2.2" fill={lighten(skin.face, 0.25)} opacity=".5" />
    </>
  );
}

/** Moustache, bouc ou barbe : dessinés avant la bouche. */
export function FacialHair({ kind, tone }) {
  if (kind === "aucune") return null;
  const mustache = (
    <path
      d="M176 213 C184 205 195 207 200 211 C205 207 216 205 224 213 C217 219 207 216 200 214 C193 216 183 219 176 213 Z"
      fill={tone.base}
    />
  );
  return (
    <g>
      {kind === "barbe" && (
        <>
          <path
            d="M135 196 C137 238 164 266 200 266 C236 266 263 238 265 196 L256 196 C254 220 248 232 238 238 C228 232 216 230 200 230 C184 230 172 232 162 238 C152 232 146 220 144 196 Z"
            fill={tone.base}
          />
          <path d="M150 232 C164 252 182 258 200 258" fill="none" stroke={tone.strand} strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
          <path d="M250 232 C236 252 218 258 200 258" fill="none" stroke={tone.strand} strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {kind === "bouc" && (
        <path d="M184 238 C190 232 210 232 216 238 C216 252 208 261 200 261 C192 261 184 252 184 238 Z" fill={tone.base} />
      )}
      {mustache}
    </g>
  );
}

const INK = "#1A0F0B";
const INSIDE = "#6E2A30";
const TONGUE = "#E98A8A";

// Chaque expression fournit une bouche « calme » (n) et une version élargie (s) affichée
// quand l'avatar te salue : avatar.css bascule de l'une à l'autre.
const mouths = (c) => ({
  sourire: {
    n: <path d="M184 219 Q200 234 216 219" fill="none" stroke={c} strokeWidth="4.4" strokeLinecap="round" />,
    s: <path d="M182 217 Q200 237 218 217" fill="none" stroke={c} strokeWidth="4.6" strokeLinecap="round" />,
  },
  grand: {
    n: <><path d="M182 216 Q200 246 218 216 Z" fill={INSIDE} stroke={c} strokeWidth="3.4" strokeLinejoin="round" /><path d="M191 232 Q200 226 209 232 Q200 241 191 232 Z" fill={TONGUE} /></>,
    s: <><path d="M179 215 Q200 250 221 215 Z" fill={INSIDE} stroke={c} strokeWidth="3.6" strokeLinejoin="round" /><path d="M190 234 Q200 227 210 234 Q200 244 190 234 Z" fill={TONGUE} /></>,
  },
  neutre: {
    n: <path d="M188 224 H212" fill="none" stroke={c} strokeWidth="4.2" strokeLinecap="round" />,
    s: <path d="M186 222 Q200 230 214 222" fill="none" stroke={c} strokeWidth="4.4" strokeLinecap="round" />,
  },
  malin: {
    n: <path d="M184 225 Q202 229 218 215" fill="none" stroke={c} strokeWidth="4.4" strokeLinecap="round" />,
    s: <path d="M182 225 Q202 233 220 213" fill="none" stroke={c} strokeWidth="4.6" strokeLinecap="round" />,
  },
  surprise: {
    n: <ellipse cx="200" cy="226" rx="6" ry="8" fill={INSIDE} stroke={c} strokeWidth="3" />,
    s: <ellipse cx="200" cy="227" rx="7" ry="9.5" fill={INSIDE} stroke={c} strokeWidth="3" />,
  },
  rieur: {
    n: <><path d="M180 214 H220 Q220 242 200 242 Q180 242 180 214 Z" fill={INSIDE} stroke={c} strokeWidth="3.4" strokeLinejoin="round" /><path d="M189 237 Q200 228 211 237 Q200 244 189 237 Z" fill={TONGUE} /></>,
    s: <><path d="M178 213 H222 Q222 246 200 246 Q178 246 178 213 Z" fill={INSIDE} stroke={c} strokeWidth="3.6" strokeLinejoin="round" /><path d="M188 240 Q200 229 212 240 Q200 248 188 240 Z" fill={TONGUE} /></>,
  },
  etoiles: {
    n: <path d="M186 217 Q200 238 214 217 Z" fill={INSIDE} stroke={c} strokeWidth="3.2" strokeLinejoin="round" />,
    s: <path d="M183 216 Q200 242 217 216 Z" fill={INSIDE} stroke={c} strokeWidth="3.4" strokeLinejoin="round" />,
  },
});

export function Mouth({ skin, expression = "sourire", lip }) {
  const c = lip ?? (lum(skin.face) < 0.3 ? "#D58A7C" : "#9A4A4A");
  const m = mouths(c)[expression] ?? mouths(c).sourire;
  return (
    <>
      <g className="av-mouth-n">{m.n}</g>
      <g className="av-mouth-s">{m.s}</g>
    </>
  );
}

const BROWS = {
  sourire: ["M146 146 Q164 136 188 144", "M212 144 Q236 136 254 146"],
  grand: ["M146 145 Q164 134 188 142", "M212 142 Q236 134 254 145"],
  neutre: ["M146 147 Q166 143 188 146", "M212 146 Q234 143 254 147"],
  malin: ["M146 149 Q164 143 188 149", "M212 138 Q236 128 254 140"],
  surprise: ["M146 139 Q164 127 188 135", "M212 135 Q236 127 254 139"],
  rieur: ["M146 144 Q164 133 188 141", "M212 141 Q236 133 254 144"],
  etoiles: ["M146 143 Q164 131 188 139", "M212 139 Q236 131 254 143"],
};

export function Brows({ tone, expression = "sourire" }) {
  const [l, r] = BROWS[expression] ?? BROWS.sourire;
  return (
    <g className="av-brows" fill="none" stroke={tone.brow} strokeWidth="3.4" strokeLinecap="round">
      <g className="av-aha">
        <path d={l} />
        <path d={r} />
      </g>
    </g>
  );
}

const EYE_KIND = { rieur: "happy", etoiles: "star" };
const STAR = "M0 -9 l2.6 6.2 6.6 .6 -5 4.4 1.6 6.6 -5.8 -3.5 -5.8 3.5 1.6 -6.6 -5 -4.4 6.6 -.6z";

function Eye({ cx, side, color, kind }) {
  const dir = side === "l" ? 1 : -1;
  if (kind === "happy") {
    return <path d={`M${cx - 10} 177 Q${cx} 163 ${cx + 10} 177`} fill="none" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />;
  }
  return (
    <>
      <ellipse cx={cx} cy="173" rx="9" ry="8.5" fill={color} />
      <circle cx={cx} cy="173" r="4.8" fill={INK} />
      {kind === "star" ? (
        <path d={STAR} transform={`translate(${cx} 172) scale(.9)`} fill="#FFE27A" />
      ) : (
        <>
          <circle cx={cx - 3 * dir} cy="170" r="2.6" fill="#fff" />
          <circle cx={cx + 3 * dir} cy="176" r="1.2" fill="#fff" opacity=".6" />
        </>
      )}
      <path d={`M${cx - 10} 168 Q${cx} 160 ${cx + 11} 168 M${cx - 10 * dir} 168 l${-3 * dir} -2`} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    </>
  );
}

export function Eyes({ color, expression = "sourire", skin }) {
  const kind = EYE_KIND[expression] ?? "open";
  return (
    <g className="av-look">
      <g className="av-eye av-eye-l"><Eye cx={166} side="l" color={color} kind={kind} /></g>
      <g className="av-eye av-eye-r"><Eye cx={234} side="r" color={color} kind={kind} /></g>
    </g>
  );
}

/** Petits détails de visage : grain de beauté, stickers, paillettes, eye-liner. */
export function FaceArt({ kind, skin }) {
  if (kind === "grain") return <circle cx="224" cy="206" r="2.3" fill="#2A1A12" opacity=".8" />;
  if (kind === "etoiles") {
    return (
      <g fill="#FFD25E" stroke="#E0A92E" strokeWidth=".8" strokeLinejoin="round">
        <path d="M0 -8 l2.2 5.4 5.8 .5 -4.4 3.8 1.4 5.7 -5 -3 -5 3 1.4 -5.7 -4.4 -3.8 5.8 -.5z" transform="translate(150 206)" />
        <path d="M0 -6 l1.7 4.1 4.4 .4 -3.3 2.9 1 4.3 -3.8 -2.3 -3.8 2.3 1 -4.3 -3.3 -2.9 4.4 -.4z" transform="translate(248 212)" />
      </g>
    );
  }
  if (kind === "paillettes") {
    const dots = [[150, 190, "#FFE08A"], [158, 197, "#9FF0D8"], [170, 190, "#FF9BD0"], [250, 190, "#FFE08A"], [242, 197, "#9FF0D8"], [230, 190, "#FF9BD0"], [162, 203, "#FFE08A"], [238, 203, "#FF9BD0"]];
    return (
      <g>
        {dots.map(([x, y, c], i) => (
          <circle key={i} className="av-spark" style={{ animationDelay: `${-i * 0.4}s` }} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.4} fill={c} />
        ))}
      </g>
    );
  }
  return null;
}
