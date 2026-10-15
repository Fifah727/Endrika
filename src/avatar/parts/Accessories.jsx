import { clothTones } from "../color";

const GOLD = "#D9B26A";

export function Earrings({ kind }) {
  if (kind === "aucune") return null;
  const pair = (x) => {
    switch (kind) {
      case "perles":
        return <circle cx={x} cy="207" r="3.6" fill="#F4F1EA" stroke="#D2CDC4" strokeWidth="1" />;
      case "anneaux":
        return <circle cx={x} cy="212" r="6" fill="none" stroke={GOLD} strokeWidth="2.2" />;
      default:
        return (
          <>
            <path d={`M${x} 205 V217`} stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
            <path d={`M${x} 216 l3.6 4.6 -3.6 4.6 -3.6 -4.6 z`} fill={GOLD} stroke="#B58F46" strokeWidth=".8" strokeLinejoin="round" />
          </>
        );
    }
  };
  return (
    <g>
      {pair(131)}
      {pair(269)}
    </g>
  );
}

export function Headwear({ kind, color }) {
  if (kind === "aucun") return null;
  const t = clothTones(color);

  if (kind === "bandeau") {
    return (
      <g fill="none" strokeLinecap="round">
        <path d="M138 148 C142 106 168 84 200 84 C232 84 258 106 262 148" stroke={t.ring} strokeWidth="11" />
        <path d="M138 148 C142 106 168 84 200 84 C232 84 258 106 262 148" stroke={t.base} strokeWidth="8" />
        <path d="M150 112 C160 98 176 90 192 88" stroke={t.light} strokeOpacity=".55" strokeWidth="2.4" />
      </g>
    );
  }

  if (kind === "casquette") {
    return (
      <g>
        {/* calotte */}
        <path d="M138 124 C136 76 164 56 200 56 C236 56 264 76 262 124 C240 114 160 114 138 124 Z" fill={t.base} />
        <path d="M200 58 C186 76 182 100 184 118 M200 58 C214 76 218 100 216 118" fill="none" stroke={t.shade} strokeOpacity=".5" strokeWidth="1.8" />
        <circle cx="200" cy="57" r="4" fill={t.ring} />
        {/* visière tournée vers nous */}
        <path d="M130 122 C150 140 250 140 270 122 C252 112 148 112 130 122 Z" fill={t.ring} />
        <path d="M140 124 C160 136 240 136 260 124" fill="none" stroke={t.light} strokeOpacity=".4" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    );
  }

  // bonnet
  return (
    <g>
      <path d="M136 112 C128 66 160 40 200 40 C240 40 272 66 264 112 Z" fill={t.base} />
      <g fill="none" stroke={t.shade} strokeOpacity=".4" strokeWidth="2" strokeLinecap="round">
        <path d="M168 50 C164 70 162 90 162 110" />
        <path d="M184 42 C182 66 182 90 182 110" />
        <path d="M200 40 V110" />
        <path d="M216 42 C218 66 218 90 218 110" />
        <path d="M232 50 C236 70 238 90 238 110" />
      </g>
      <circle cx="200" cy="38" r="11" fill={t.light} />
      <circle cx="197" cy="35" r="4" fill="#fff" fillOpacity=".25" />
      {/* revers côtelé */}
      <path d="M132 104 H268 V128 C268 138 132 138 132 128 Z" fill={t.ring} />
      <g stroke={t.deep} strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round">
        {[148, 160, 172, 184, 196, 208, 220, 232, 244, 256].map((x) => (
          <path key={x} d={`M${x} 106 V130`} />
        ))}
      </g>
    </g>
  );
}

/** Écouteurs filaires (origine) ou casque audio. Dessinés après la coiffure. */
export function Audio({ kind, accent }) {
  if (kind === "aucun") return null;

  if (kind === "casque") {
    return (
      <g>
        <path d="M130 188 C118 98 156 50 200 50 C244 50 282 98 270 188" fill="none" stroke="#3A3D44" strokeWidth="9" strokeLinecap="round" />
        <path d="M134 150 C134 108 162 66 200 62" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="114" y="168" width="24" height="46" rx="11" fill="#2B2D32" />
        <rect x="118" y="174" width="12" height="34" rx="6" fill="#18191C" />
        <rect x="114" y="168" width="24" height="46" rx="11" fill="none" stroke={accent} strokeWidth="2.4" />
        <rect x="262" y="168" width="24" height="46" rx="11" fill="#2B2D32" />
        <rect x="270" y="174" width="12" height="34" rx="6" fill="#18191C" />
        <rect x="262" y="168" width="24" height="46" rx="11" fill="none" stroke={accent} strokeWidth="2.4" />
      </g>
    );
  }

  return (
    <>
      <g>
        <rect x="129.1" y="194" width="3.8" height="28" rx="1.9" fill="#FAFAFA" stroke="#D2CDC4" strokeWidth=".9" />
        <circle cx="131" cy="192" r="5.4" fill="#FAFAFA" stroke="#D2CDC4" strokeWidth="1.1" />
        <circle cx="131" cy="192" r="2" fill="#E3DFD6" />
        <rect x="267.1" y="194" width="3.8" height="28" rx="1.9" fill="#FAFAFA" stroke="#D2CDC4" strokeWidth=".9" />
        <circle cx="269" cy="192" r="5.4" fill="#FAFAFA" stroke="#D2CDC4" strokeWidth="1.1" />
        <circle cx="269" cy="192" r="2" fill="#E3DFD6" />
      </g>
      {/* câbles : ils partent derrière l'ordinateur */}
      <g fill="none" stroke="#F0EEE8" strokeWidth="2.2" strokeLinecap="round">
        <path d="M131 221 C128 246 140 272 152 292 C162 312 172 332 177 343" />
        <path d="M269 221 C272 246 260 272 248 292 C238 312 228 332 223 343" />
      </g>
    </>
  );
}
