export const MONO =
  "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)";

// ── Fond : mur, halo, rais de lumière, orbite, fenêtre de code, symboles ──────
export function Backdrop({ theme: th, gridId, show }) {
  return (
    <>
      {/* mur (trame de points discrète) + soubassement */}
      <rect width="400" height="400" fill={th.wall} />
      <rect width="400" height="296" fill={`url(#${gridId})`} />
      <rect y="296" width="400" height="70" fill={th.plinth} />
      <rect y="295" width="400" height="2" fill={th.plinthLine} />

      {/* halo derrière le personnage, avec son ombre douce */}
      <circle cx="208" cy="220" r="150" fill={th.haloShadow} opacity=".32" />
      <circle cx="200" cy="212" r="150" fill={th.halo} />

      {/* lumière naturelle diffuse : deux rais venus d'une fenêtre hors champ */}
      <g fill={th.ray} opacity={th.rayOpacity}>
        <polygon points="-30,0 58,0 228,366 128,366" />
        <polygon points="92,0 116,0 286,366 262,366" />
      </g>

      {show.orbit && (
        <g className="av-orbit">
          <circle cx="200" cy="212" r="172" fill="none" stroke={th.orbit} strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
          <circle cx="114" cy="63" r="5" fill={th.a} />
          <circle cx="362" cy="271" r="4" fill={th.b} />
          <circle cx="51" cy="298" r="4.5" fill={th.c} />
        </g>
      )}

      {show.codeCard && (
        <g className="av-card">
          <rect x="16" y="90" width="80" height="70" rx="8" fill="#000" opacity=".14" />
          <rect x="12" y="86" width="80" height="70" rx="8" fill="#26231F" />
          <rect x="12.5" y="86.5" width="79" height="69" rx="7.5" fill="none" stroke="#3D3832" />
          <text x="50" y="99.4" fontSize="6.5" fill="#A39B8C" style={{ fontFamily: MONO }}>app.jsx</text>
          <circle cx="23" cy="97" r="2.5" fill="#C47A63" />
          <circle cx="31" cy="97" r="2.5" fill="#D9B26A" />
          <circle cx="39" cy="97" r="2.5" fill="#8FA895" />
          <rect x="12" y="105" width="80" height="1" fill="#3D3832" />
          <rect className="av-line" x="21" y="112" width="40" height="4" rx="2" fill="#E0937D" />
          <rect className="av-line" x="27" y="122" width="52" height="4" rx="2" fill="#F1EBDD" opacity=".8" style={{ animationDelay: ".4s" }} />
          <rect className="av-line" x="27" y="132" width="34" height="4" rx="2" fill="#A8D5BB" style={{ animationDelay: ".8s" }} />
          <rect className="av-line" x="21" y="142" width="24" height="4" rx="2" fill="#8FB09B" style={{ animationDelay: "1.2s" }} />
          <rect className="av-caret" x="50" y="141" width="4" height="6" fill="#A8D5BB" />
        </g>
      )}

      {show.symbols && (
        <>
          <g style={{ fontFamily: MONO }} fontWeight="700">
            <text className="av-float" x="262" y="58" fontSize="22" fill={th.a}>{"</>"}</text>
            <text className="av-float" x="96" y="60" fontSize="18" fill={th.b} style={{ fontFamily: MONO, animationDelay: "-1.8s" }}>{"{ }"}</text>
            <text className="av-float" x="26" y="196" fontSize="16" fill={th.a} opacity=".8" style={{ fontFamily: MONO, animationDelay: "-3.2s" }}>{"=>"}</text>
          </g>
          <circle cx="316" cy="62" r="7" fill="none" stroke={th.a} strokeWidth="2.4" />
          <path d="M44 34 l8 14 h-16z" fill={th.b} opacity=".85" stroke={th.b} strokeWidth="2" strokeLinejoin="round" />
          <path className="av-spark" style={{ animationDelay: "-1.4s" }} d="M346 284 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={th.b} />
          <path className="av-spark" style={{ animationDelay: "-2.3s" }} d="M150 28 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill={th.a} />
        </>
      )}

      {/* notes de musique (visibles quand elle code ou danse) */}
      <g className="av-music">
        <g transform="translate(72 232)">
          <g className="av-mnote">
            <circle cx="0" cy="0" r="3.6" fill={th.a} />
            <path d="M3.2 0 V-15 q6 2 7 8" fill="none" stroke={th.a} strokeWidth="2.3" strokeLinecap="round" />
          </g>
        </g>
        <g transform="translate(56 262)">
          <g className="av-mnote av-mnote--b">
            <circle cx="0" cy="0" r="3.6" fill={th.b} />
            <path d="M3.2 0 V-15 q6 2 7 8" fill="none" stroke={th.b} strokeWidth="2.3" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {show.shelves && (
        <g>
          {/* haute : livres debout + plante */}
          <rect x="324" y="120" width="78" height="8" fill="#000" opacity=".1" />
          <rect x="318" y="112" width="78" height="6" rx="2" fill="#C9A672" />
          <rect x="318" y="112" width="78" height="1.6" rx="1" fill="#E2C697" />
          <rect x="326" y="80" width="9" height="32" rx="1" fill="#8FA895" />
          <rect x="326" y="90" width="9" height="3" fill="#F6F0E2" />
          <rect x="336" y="88" width="8" height="24" rx="1" fill="#C47A63" />
          <rect x="345" y="76" width="10" height="36" rx="1" fill="#E4CBA0" />
          <rect x="345" y="86" width="10" height="3" fill="#8FA895" />
          <rect x="357" y="86" width="8" height="26" rx="1" fill="#BFDCCB" transform="rotate(10 361 112)" />
          <g className="av-leaf">
            <ellipse cx="383" cy="80" rx="5" ry="14" fill="#6F9482" />
            <ellipse cx="383" cy="80" rx="5" ry="13" fill="#8FB09B" transform="rotate(-38 383 94)" />
            <ellipse cx="383" cy="80" rx="5" ry="13" fill="#A8C9B4" transform="rotate(38 383 94)" />
          </g>
          <path d="M373 98 H393 L390 112 H376 Z" fill="#C47A63" />
          <rect x="371" y="94" width="24" height="6" rx="2" fill="#B26550" />
          {/* basse : pile de livres + petite succulente */}
          <rect x="324" y="174" width="78" height="8" fill="#000" opacity=".1" />
          <rect x="318" y="166" width="78" height="6" rx="2" fill="#C9A672" />
          <rect x="318" y="166" width="78" height="1.6" rx="1" fill="#E2C697" />
          <rect x="326" y="154" width="46" height="12" rx="1.5" fill="#F6F0E2" />
          <rect x="330" y="142" width="38" height="12" rx="1.5" fill="#6F9482" />
          <rect x="324" y="130" width="48" height="12" rx="1.5" fill="#C47A63" />
          <rect x="336" y="130" width="3" height="12" fill="#F6F0E2" opacity=".85" />
          <path d="M380 156 H392 L390 166 H382 Z" fill="#D9B98A" />
          <circle cx="386" cy="152" r="5.5" fill="#8FB09B" />
          <circle cx="383" cy="150" r="3" fill="#A8C9B4" />
        </g>
      )}
    </>
  );
}

// ── Bureau (et tasse) ─────────────────────────────────────────────────────────
export function Desk({ theme: th, mug }) {
  return (
    <>
      <rect x="0" y="366" width="400" height="34" fill={th.deskTop} />
      <rect x="0" y="366" width="400" height="3" fill={th.deskEdge} />
      <rect x="0" y="369" width="400" height="1.5" fill={th.deskGrain} opacity=".35" />
      <polygon points="128,370 176,370 144,400 92,400" fill="#FFFBEF" opacity=".14" />
      <path d="M18 380 H92 M306 378 H384 M150 394 H250" fill="none" stroke={th.deskGrain} strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" />
      {mug && (
        <g>
          <ellipse cx="45" cy="383" rx="24" ry="3.5" fill={th.contact} opacity=".18" />
          <path className="av-steam" d="M40 338 C34 328 46 322 40 312 C36 305 42 300 40 294" fill="none" stroke={th.orbit} strokeWidth="3" strokeLinecap="round" />
          <path className="av-steam av-steam--b" d="M52 338 C46 327 58 320 52 309 C48 302 54 297 52 290" fill="none" stroke={th.orbit} strokeWidth="3" strokeLinecap="round" />
          <path d="M60 352 C74 352 74 372 60 372" fill="none" stroke="#F6F0E2" strokeWidth="5" strokeLinecap="round" />
          <rect x="28" y="344" width="34" height="38" rx="7" fill="#F6F0E2" />
          <rect x="28" y="358" width="34" height="7" fill={th.a} />
          <ellipse cx="45" cy="344.5" rx="17" ry="4.5" fill="#E6DFD0" />
          <ellipse cx="45" cy="345" rx="13.5" ry="3" fill="#6B4430" />
        </g>
      )}
    </>
  );
}

// ── Ordinateur : premier plan, dos du capot face au spectateur ────────────────
export function Laptop({ theme: th }) {
  return (
    <g className="av-laptop">
      <ellipse cx="200" cy="397" rx="106" ry="3.5" fill={th.contact} opacity=".25" />
      <rect x="106" y="387" width="188" height="9" rx="4.5" fill="#2A2B2F" stroke="#151618" strokeWidth="1.2" />
      <path d="M114 389.4 H286" fill="none" stroke="#4A4C52" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="138" y="380" width="124" height="8" rx="3" fill="#0F1012" />
      <rect x="113" y="281.5" width="174" height="8" rx="4" fill="#3A3C41" stroke="#202124" strokeWidth="1" />
      <path d="M122 286 H278 Q286 286 286 294 L282 374 Q282 382 274 382 H126 Q118 382 118 374 L114 294 Q114 286 122 286 Z" fill="#1E1F22" stroke="#34363B" strokeWidth="1.6" strokeLinejoin="round" />
      <g fill="#fff">
        <polygon points="128,292 164,292 146,376 124,376" opacity=".06" />
        <polygon points="170,292 180,292 162,376 152,376" opacity=".04" />
      </g>
    </g>
  );
}

// ── Ampoule « idée » (état code seulement) ────────────────────────────────────
export function Idea() {
  return (
    <g className="av-idea-wrap">
      <g className="av-idea">
        <circle cx="200" cy="36" r="25" fill="#E9C77C" opacity=".35" />
        <circle cx="200" cy="36" r="13" fill="#EBCB82" stroke="#3A2F27" strokeWidth="2.6" />
        <rect x="194" y="47" width="12" height="8" rx="2" fill="#3A2F27" />
        <path d="M195 38 l5 -8 l5 8" fill="none" stroke="#3A2F27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200 14 v-6 M181 21 l-4 -4 M219 21 l4 -4 M175 36 h-6 M225 36 h6" fill="none" stroke="#C98B72" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

// ── Bulle de dialogue ─────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function Bubble({ text }) {
  const bw = Math.max(96, text.length * 8 + 28);
  const bx = 150 - bw / 2;
  const tx = clamp(122, bx + 14, bx + bw - 28);
  return (
    <g className="av-bubble">
      <rect x={bx + 3} y="21" width={bw} height="32" rx="6" fill="#2B2824" opacity=".14" />
      <rect x={bx} y="18" width={bw} height="32" rx="6" fill="#2B2824" />
      <path d={`M${tx} 50 L${tx + 14} 50 L${tx + 2} 62 Z`} fill="#2B2824" />
      <text x={150} y="39" textAnchor="middle" fontSize="13" fontWeight="700" fill="#CFE8D8" style={{ fontFamily: MONO }}>
        {text}
      </text>
    </g>
  );
}
