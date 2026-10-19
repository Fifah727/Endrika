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


  if (kind === "beret") {
    return (
      <g>
        <path d="M130 112 C124 72 168 50 216 54 C264 58 284 88 268 114 C240 102 164 100 130 112 Z" fill={t.base} />
        <path d="M130 112 C164 100 240 102 268 114 C262 122 138 124 130 112 Z" fill={t.ring} />
        <path d="M160 70 C180 62 210 60 236 66" fill="none" stroke={t.light} strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />
        <path d="M204 53 C206 44 212 42 216 44" fill="none" stroke={t.ring} strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }

  if (kind === "toque") {
    return (
      <g>
        <g fill={t.base} stroke={t.shade} strokeOpacity=".35" strokeWidth="1.6">
          <circle cx="166" cy="62" r="30" />
          <circle cx="234" cy="62" r="30" />
          <circle cx="200" cy="46" r="34" />
          <path d="M138 66 H262 V108 H138 Z" stroke="none" />
        </g>
        <g fill="none" stroke={t.shade} strokeOpacity=".4" strokeWidth="2" strokeLinecap="round">
          <path d="M176 92 C174 80 174 72 176 64" /><path d="M200 94 V70" /><path d="M224 92 C226 80 226 72 224 64" />
        </g>
        <path d="M136 98 H264 V126 C264 134 136 134 136 126 Z" fill={t.base} stroke={t.shade} strokeOpacity=".4" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M146 118 H254" stroke={t.shade} strokeOpacity=".3" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    );
  }

  if (kind === "chantier") {
    return (
      <g>
        <path d="M134 120 C134 66 166 44 200 44 C234 44 266 66 266 120 Z" fill={t.base} />
        <path d="M184 46 C180 70 180 96 182 120 H218 C220 96 220 70 216 46 Z" fill={t.ring} />
        <path d="M150 90 C156 70 172 56 190 50" fill="none" stroke={t.light} strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 120 H280 C280 130 120 130 120 120 Z" fill={t.ring} />
      </g>
    );
  }

  if (kind === "mortier") {
    return (
      <g>
        <path d="M148 94 C148 112 150 122 158 128 C182 138 218 138 242 128 C250 122 252 112 252 94 L200 106 Z" fill={t.shade} />
        <path d="M88 78 L200 50 L312 78 L200 108 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <path d="M200 78 L286 86 L288 124" fill="none" stroke="#D9B26A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="282" y="122" width="12" height="24" rx="3" fill="#D9B26A" />
        <circle cx="200" cy="78" r="5" fill="#D9B26A" />
      </g>
    );
  }

  if (kind === "chat") {
    return (
      <g>
        <path d="M134 112 L142 50 L188 82 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <path d="M266 112 L258 50 L212 82 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <path d="M148 96 L150 66 L174 82 Z" fill="#F2B6C6" />
        <path d="M252 96 L250 66 L226 82 Z" fill="#F2B6C6" />
        <path d="M136 112 C150 84 250 84 264 112" fill="none" stroke={t.base} strokeWidth="6" strokeLinecap="round" />
      </g>
    );
  }

  if (kind === "fleurs") {
    const spots = [[140, 124], [152, 106], [172, 94], [200, 90], [228, 94], [248, 106], [260, 124]];
    const petals = [t.base, "#F4F1EA", t.light, "#F4F1EA", t.base, "#F4F1EA", t.light];
    return (
      <g>
        <path d="M138 126 C146 98 170 86 200 86 C230 86 254 98 262 126" fill="none" stroke="#5E8C6A" strokeWidth="4" strokeLinecap="round" />
        {[[156, 112, -30], [186, 92, -10], [214, 92, 10], [244, 112, 30]].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="9" ry="4" transform={`rotate(${r} ${x} ${y})`} fill="#6FA37B" />
        ))}
        {spots.map(([x, y], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx={x + 5.4 * Math.cos((a * Math.PI) / 180)} cy={y + 5.4 * Math.sin((a * Math.PI) / 180)} r="4.4" fill={petals[i]} stroke="#00000014" strokeWidth=".6" />
            ))}
            <circle cx={x} cy={y} r="3.2" fill="#F2C94C" />
          </g>
        ))}
      </g>
    );
  }

  if (kind === "couronne") {
    return (
      <g>
        <path d="M146 98 L150 60 L176 82 L200 52 L224 82 L250 60 L254 98 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <rect x="146" y="96" width="108" height="14" rx="4" fill={t.ring} />
        <circle cx="150" cy="60" r="4.4" fill="#F2B6C6" /><circle cx="200" cy="52" r="5" fill="#9FF0D8" /><circle cx="250" cy="60" r="4.4" fill="#F2B6C6" />
        <circle cx="176" cy="103" r="3" fill="#fff" fillOpacity=".7" /><circle cx="200" cy="103" r="3" fill="#fff" fillOpacity=".7" /><circle cx="224" cy="103" r="3" fill="#fff" fillOpacity=".7" />
        <path d="M156 90 L152 68" stroke="#fff" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  if (kind === "noeud") {
    return (
      <g transform="rotate(-12 166 82)">
        <path d="M166 82 L124 60 Q114 82 124 106 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <path d="M166 82 L208 60 Q218 82 208 106 Z" fill={t.base} stroke={t.ring} strokeWidth="2" strokeLinejoin="round" />
        <path d="M134 72 L156 82 M198 72 L176 82" stroke={t.light} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="166" cy="82" r="9" fill={t.ring} />
        <circle cx="163" cy="79" r="3" fill={t.light} fillOpacity=".5" />
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

/** Accessoires portés autour du cou, dessinés sur le buste (donc animés avec lui). */
export function Neck({ kind, color }) {
  if (kind === "aucun") return null;
  const t = clothTones(color);

  switch (kind) {
    case "stethoscope":
      return (
        <g>
          <path d="M168 250 C146 292 164 334 196 346" fill="none" stroke="#2B2D32" strokeWidth="5" strokeLinecap="round" />
          <path d="M232 250 C254 292 236 334 204 346" fill="none" stroke="#2B2D32" strokeWidth="5" strokeLinecap="round" />
          <path d="M168 250 C146 292 164 334 196 346" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="200" cy="352" r="10" fill="#B7BCC4" stroke="#7F858E" strokeWidth="2" />
          <circle cx="200" cy="352" r="5" fill="#8C929B" />
          <circle cx="168" cy="249" r="3.4" fill="#B7BCC4" /><circle cx="232" cy="249" r="3.4" fill="#B7BCC4" />
        </g>
      );
    case "cravate":
      return (
        <g>
          <path d="M190 296 L210 296 L213 308 L200 316 L187 308 Z" fill={t.ring} />
          <path d="M190 312 L210 312 L218 374 L200 388 L182 374 Z" fill={t.base} stroke={t.ring} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M196 322 L194 372" stroke={t.light} strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "noeud":
      return (
        <g>
          <path d="M200 286 L168 270 Q162 286 168 302 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M200 286 L232 270 Q238 286 232 302 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="192" y="278" width="16" height="16" rx="4" fill={t.ring} />
        </g>
      );
    case "echarpe":
      return (
        <g>
          <path d="M148 264 C170 292 230 292 252 264 L256 292 C232 316 168 316 144 292 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M212 300 L248 304 L254 360 L220 362 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <g stroke={t.ring} strokeOpacity=".6" strokeWidth="2" strokeLinecap="round"><path d="M226 322 L250 324" /><path d="M227 336 L251 338" /></g>
          <path d="M160 276 C180 296 220 296 240 276" fill="none" stroke={t.light} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "perles":
      return (
        <g fill="#F7F3EA" stroke="#D5CEC0" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => {
            const a = (i / 10) * Math.PI;
            return <circle key={i} cx={166 + 34 * (1 - Math.cos(a))} cy={262 + 26 * Math.sin(a)} r="3.8" />;
          })}
        </g>
      );
    case "badge":
      return (
        <g>
          <path d="M170 252 L198 336 M230 252 L202 336" stroke={t.base} strokeWidth="6" strokeLinecap="round" />
          <rect x="188" y="334" width="24" height="36" rx="4" fill="#F7F3EA" stroke="#BDB6A6" strokeWidth="1.4" />
          <circle cx="200" cy="348" r="6" fill="#B8C3CF" />
          <rect x="192" y="358" width="16" height="3" rx="1.5" fill="#9AA3AF" />
          <rect x="194" y="364" width="12" height="2.4" rx="1.2" fill="#C5CBD3" />
        </g>
      );
    default: // foulard
      return (
        <g>
          <path d="M160 266 C180 282 220 282 240 266 L242 280 C222 296 178 296 158 280 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M170 288 L230 288 L200 326 Z" fill={t.base} stroke={t.ring} strokeWidth="1.8" strokeLinejoin="round" />
          <g fill={t.light} fillOpacity=".7"><circle cx="190" cy="298" r="2" /><circle cx="208" cy="296" r="2" /><circle cx="200" cy="310" r="2" /></g>
        </g>
      );
  }
}
