export const MONO =
  "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)";

// ── Bureau (et tasse) ─────────────────────────────────────────────────────────
export function Desk({ theme: th }) {
  return (
    <>
      <rect x="0" y="366" width="400" height="34" fill={th.deskTop} />
      <rect x="0" y="366" width="400" height="3" fill={th.deskEdge} />
      <rect x="0" y="369" width="400" height="1.5" fill={th.deskGrain} opacity=".35" />
      <polygon points="128,370 176,370 144,400 92,400" fill="#FFFBEF" opacity=".14" />
      <path d="M18 380 H92 M306 378 H384 M150 394 H250" fill="none" stroke={th.deskGrain} strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}

// ── Tasse de café : posée sur le bureau, DEVANT le personnage (elle ne passe jamais derrière l'épaule) ──
export function Mug({ theme: th }) {
  return (
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

// ── « Z z z » de l'activité « Dormir » (invisible pour les autres activités : voir avatar.css) ──
export function Zzz() {
  const zs = [[258, 118, 21], [278, 92, 29], [300, 62, 37]];
  return (
    <g className="av-zzz" pointerEvents="none">
      {zs.map(([x, y, size], i) => (
        <text key={i} className="av-z" style={{ animationDelay: `${-i * 1}s`, fontFamily: MONO }} x={x} y={y} fontSize={size} fontWeight="700" fill="#6C6890">z</text>
      ))}
    </g>
  );
}
