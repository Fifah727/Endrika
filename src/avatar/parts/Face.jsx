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

export function Mouth({ skin }) {
  const color = lum(skin.face) < 0.3 ? "#D58A7C" : "#9A4A4A";
  return (
    <>
      {/* bouche : toujours un sourire, sans dents. Doux en codant, élargi au survol. */}
      <g className="av-mouth-n">
        <path d="M184 219 Q200 234 216 219" fill="none" stroke={color} strokeWidth="4.4" strokeLinecap="round" />
      </g>
      <g className="av-mouth-s">
        <path d="M182 217 Q200 237 218 217" fill="none" stroke={color} strokeWidth="4.6" strokeLinecap="round" />
      </g>
    </>
  );
}

export function Brows({ tone }) {
  return (
    <g className="av-brows" fill="none" stroke={tone.brow} strokeWidth="3.4" strokeLinecap="round">
      <g className="av-aha">
        <path d="M146 146 Q164 136 188 144" />
        <path d="M212 144 Q236 136 254 146" />
      </g>
    </g>
  );
}

export function Eyes({ color }) {
  return (
    <g className="av-look">
      <g className="av-eye av-eye-l">
        <ellipse cx="166" cy="173" rx="9" ry="8.5" fill={color} />
        <circle cx="166" cy="173" r="4.8" fill="#1A0F0B" />
        <circle cx="163" cy="170" r="2.6" fill="#fff" />
        <circle cx="169" cy="176" r="1.2" fill="#fff" opacity=".6" />
        <path d="M156 168 Q166 160 177 168 M156 168 l-3 -2" fill="none" stroke="#1A0F0B" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g className="av-eye av-eye-r">
        <ellipse cx="234" cy="173" rx="9" ry="8.5" fill={color} />
        <circle cx="234" cy="173" r="4.8" fill="#1A0F0B" />
        <circle cx="231" cy="170" r="2.6" fill="#fff" />
        <circle cx="237" cy="176" r="1.2" fill="#fff" opacity=".6" />
        <path d="M223 168 Q234 160 244 168 M244 168 l3 -2" fill="none" stroke="#1A0F0B" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
}
