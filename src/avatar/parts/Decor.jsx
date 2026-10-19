import { MONO } from "./Scene";

// ── Motifs du mur (un par ambiance) ──────────────────────────────────────────
export function WallPattern({ id, theme: th }) {
  const c = th.dot;
  switch (th.pattern) {
    case "grid":
      return (
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 H0 V24" fill="none" stroke={c} strokeWidth="1" opacity=".45" />
        </pattern>
      );
    case "stars":
      return (
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M10 6 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" fill={c} opacity=".75" />
          <circle cx="34" cy="30" r="1.2" fill={c} opacity=".6" />
          <circle cx="24" cy="14" r=".8" fill={c} opacity=".5" />
        </pattern>
      );
    case "waves":
      return (
        <pattern id={id} width="40" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 11 Q10 2 20 11 T40 11" fill="none" stroke={c} strokeWidth="1.6" opacity=".5" strokeLinecap="round" />
        </pattern>
      );
    case "hearts":
      return (
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M10 14 C4 9 7 4 10 7 C13 4 16 9 10 14Z" fill={c} opacity=".6" />
          <path d="M28 32 C24 28 26 25 28 27 C30 25 32 28 28 32Z" fill={c} opacity=".45" />
        </pattern>
      );
    case "checks":
      return (
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={c} opacity=".28" />
          <rect x="16" y="16" width="16" height="16" fill={c} opacity=".28" />
        </pattern>
      );
    case "clouds":
      return (
        <pattern id={id} width="72" height="48" patternUnits="userSpaceOnUse">
          <g fill={c} opacity=".75">
            <circle cx="16" cy="16" r="6" /><circle cx="24" cy="13" r="8" /><circle cx="32" cy="17" r="6" /><rect x="12" y="16" width="25" height="7" rx="3.5" />
          </g>
          <g fill={c} opacity=".5"><circle cx="54" cy="38" r="4" /><circle cx="60" cy="36" r="5.4" /><rect x="50" y="38" width="16" height="5" rx="2.5" /></g>
        </pattern>
      );
    case "leaves":
      return (
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
          <ellipse cx="10" cy="12" rx="6" ry="2.6" transform="rotate(-35 10 12)" fill={c} opacity=".6" />
          <ellipse cx="30" cy="32" rx="6" ry="2.6" transform="rotate(30 30 32)" fill={c} opacity=".5" />
        </pattern>
      );
    case "stripes":
      return (
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="7" height="18" fill={c} opacity=".28" />
        </pattern>
      );
    default:
      return (
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill={c} opacity=".45" />
        </pattern>
      );
  }
}

// ── Mur, halo, rais de lumière (la couche « fond » : supprimée en PNG transparent) ──
export function Background({ theme: th, patternId }) {
  return (
    <>
      <rect width="400" height="400" fill={th.wall} />
      <rect width="400" height="296" fill={`url(#${patternId})`} />
      <rect y="296" width="400" height="70" fill={th.plinth} />
      <rect y="295" width="400" height="2" fill={th.plinthLine} />
      <circle cx="208" cy="220" r="150" fill={th.haloShadow} opacity=".32" />
      <circle cx="200" cy="212" r="150" fill={th.halo} />
      <g fill={th.ray} opacity={th.rayOpacity}>
        <polygon points="-30,0 58,0 228,366 128,366" />
        <polygon points="92,0 116,0 286,366 262,366" />
      </g>
    </>
  );
}

export function Orbit({ theme: th }) {
  return (
    <g className="av-orbit">
      <circle cx="200" cy="212" r="172" fill="none" stroke={th.orbit} strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="114" cy="63" r="5" fill={th.a} />
      <circle cx="362" cy="271" r="4" fill={th.b} />
      <circle cx="51" cy="298" r="4.5" fill={th.c} />
    </g>
  );
}

// ── Décor mural (zone droite) ────────────────────────────────────────────────
export function WallItem({ kind, theme: th }) {
  switch (kind) {
    case "etageres":
      return (
        <g>
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
      );
    case "cadres":
      return (
        <g>
          <path d="M340 60 L348 84 M372 60 L364 84" stroke={th.orbit} strokeWidth="1.4" fill="none" />
          <rect x="326" y="84" width="58" height="72" rx="3" fill="#00000018" transform="translate(3 3)" />
          <rect x="326" y="84" width="58" height="72" rx="3" fill="#F7F3EA" stroke="#9C7E58" strokeWidth="5" />
          <circle cx="355" cy="112" r="13" fill={th.c} />
          <path d="M334 148 L350 124 L360 138 L368 128 L378 148 Z" fill={th.a} />
          <rect x="346" y="168" width="44" height="30" rx="3" fill="#F7F3EA" stroke="#9C7E58" strokeWidth="4" />
          <path d="M350 192 C358 176 366 190 372 180 C378 174 384 186 386 192" fill="none" stroke={th.b} strokeWidth="3" strokeLinecap="round" />
          <rect x="318" y="164" width="22" height="22" rx="2.4" fill="#F7F3EA" stroke="#9C7E58" strokeWidth="3.4" />
          <circle cx="329" cy="175" r="6" fill={th.b} opacity=".85" />
        </g>
      );
    case "guirlande": {
      const bulbs = [[252, 22], [282, 34], [312, 40], [342, 40], [372, 34], [398, 26]];
      const cols = [th.a, th.b, th.c];
      return (
        <g>
          <path d="M236 10 C270 40 310 50 346 44 C374 40 392 30 404 20" fill="none" stroke={th.orbit} strokeWidth="1.6" />
          {bulbs.map(([x, y], i) => (
            <g key={x}>
              <path d={`M${x} ${y} v6`} stroke={th.orbit} strokeWidth="1.4" />
              <circle cx={x} cy={y + 11} r="9" fill={cols[i % 3]} opacity=".22" className="av-spark" style={{ animationDelay: `${-i * 0.5}s` }} />
              <circle cx={x} cy={y + 11} r="5" fill={cols[i % 3]} />
              <circle cx={x - 1.4} cy={y + 9} r="1.6" fill="#fff" opacity=".7" />
            </g>
          ))}
        </g>
      );
    }
    case "neon":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" className="av-neon">
          <path d="M356 150 C334 134 328 118 340 108 C348 102 356 106 358 112 C360 106 368 102 376 108 C388 118 382 134 360 150" stroke={th.b} strokeWidth="10" opacity=".18" transform="translate(-2 -6)" />
          <path d="M356 150 C334 134 328 118 340 108 C348 102 356 106 358 112 C360 106 368 102 376 108 C388 118 382 134 360 150" stroke={th.b} strokeWidth="3.4" transform="translate(-2 -6)" />
          <path d="M330 162 C344 168 372 168 388 160" stroke={th.a} strokeWidth="3.2" />
          <path d="M330 162 C344 168 372 168 388 160" stroke={th.a} strokeWidth="9" opacity=".18" />
        </g>
      );
    case "tableau":
      return (
        <g>
          <rect x="312" y="76" width="92" height="70" rx="4" fill="#00000018" transform="translate(3 3)" />
          <rect x="312" y="76" width="92" height="70" rx="4" fill="#2F4A3F" stroke="#B98C5C" strokeWidth="6" />
          <g fill="none" stroke="#F1EEE4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".92">
            <path d="M324 98 h14 M324 108 h22 M324 118 h12" />
            <path d="M362 124 L376 98 L390 124 Z" />
            <path d="M376 98 V124" strokeDasharray="2 3" />
          </g>
          <text x="324" y="136" fontSize="9" fill="#F1EEE4" opacity=".9" style={{ fontFamily: MONO }}>x²+y²</text>
          <rect x="318" y="148" width="80" height="5" rx="1.6" fill="#B98C5C" />
          <rect x="330" y="145" width="10" height="3.6" rx="1.6" fill="#F7F3EA" />
        </g>
      );
    default:
      return null;
  }
}

// ── Fenêtre / carte à gauche ─────────────────────────────────────────────────
export function CardItem({ kind, theme: th }) {
  const frame = (children) => <g className="av-card">{children}</g>;
  switch (kind) {
    case "code":
      return frame(
        <>
          <rect x="16" y="90" width="80" height="70" rx="8" fill="#000" opacity=".14" />
          <rect x="12" y="86" width="80" height="70" rx="8" fill="#26231F" />
          <rect x="12.5" y="86.5" width="79" height="69" rx="7.5" fill="none" stroke="#3D3832" />
          <text x="50" y="99.4" fontSize="6.5" fill="#A39B8C" style={{ fontFamily: MONO }}>app.jsx</text>
          <circle cx="23" cy="97" r="2.5" fill="#C47A63" /><circle cx="31" cy="97" r="2.5" fill="#D9B26A" /><circle cx="39" cy="97" r="2.5" fill="#8FA895" />
          <rect x="12" y="105" width="80" height="1" fill="#3D3832" />
          <rect className="av-line" x="21" y="112" width="40" height="4" rx="2" fill="#E0937D" />
          <rect className="av-line" x="27" y="122" width="52" height="4" rx="2" fill="#F1EBDD" opacity=".8" style={{ animationDelay: ".4s" }} />
          <rect className="av-line" x="27" y="132" width="34" height="4" rx="2" fill="#A8D5BB" style={{ animationDelay: ".8s" }} />
          <rect className="av-line" x="21" y="142" width="24" height="4" rx="2" fill="#8FB09B" style={{ animationDelay: "1.2s" }} />
          <rect className="av-caret" x="50" y="141" width="4" height="6" fill="#A8D5BB" />
        </>
      );
    case "notes":
      return frame(
        <>
          <g transform="rotate(-7 40 110)"><rect x="14" y="88" width="46" height="46" rx="2" fill="#000" opacity=".12" transform="translate(2 3)" /><rect x="14" y="88" width="46" height="46" rx="2" fill="#F7E58C" /><g stroke="#B79B2E" strokeWidth="1.6" strokeLinecap="round"><path d="M21 100 h30 M21 108 h24 M21 116 h28" /></g></g>
          <g transform="rotate(6 66 124)"><rect x="42" y="106" width="46" height="44" rx="2" fill="#000" opacity=".12" transform="translate(2 3)" /><rect x="42" y="106" width="46" height="44" rx="2" fill="#F4A9C0" /><g stroke="#C4607F" strokeWidth="1.6" strokeLinecap="round"><path d="M49 118 h30 M49 126 h20" /></g><path d="M52 138 l4 4 l10 -10" fill="none" stroke="#C4607F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></g>
        </>
      );
    case "palette":
      return frame(
        <>
          <path d="M20 112 C16 90 48 78 74 86 C96 93 100 118 86 130 C78 137 66 130 62 138 C56 150 34 152 24 140 C14 130 20 122 20 112 Z" fill="#000" opacity=".12" transform="translate(3 3)" />
          <path d="M20 112 C16 90 48 78 74 86 C96 93 100 118 86 130 C78 137 66 130 62 138 C56 150 34 152 24 140 C14 130 20 122 20 112 Z" fill="#E9D8B4" stroke="#BFA575" strokeWidth="1.6" />
          <circle cx="36" cy="124" r="5" fill="#BFA575" opacity=".55" />
          {[[34, 104, th.b], [48, 96, th.c], [64, 96, th.a], [78, 106, "#8D7BD8"], [76, 120, "#2F4468"]].map(([x, y, c], i) => (
            <circle key={i} cx={x} cy={y} r="6.4" fill={c} className="av-spark" style={{ animationDuration: "4s", animationDelay: `${-i * 0.7}s` }} />
          ))}
          <g transform="rotate(-28 70 140)"><rect x="46" y="137" width="48" height="5" rx="2.5" fill="#9C7E58" /><path d="M94 137 L104 139.5 L94 142 Z" fill={th.b} /></g>
        </>
      );
    case "chart":
      return frame(
        <>
          <rect x="16" y="90" width="80" height="70" rx="8" fill="#000" opacity=".12" />
          <rect x="12" y="86" width="80" height="70" rx="8" fill="#FBF8F0" stroke="#D9D2C2" />
          <g stroke="#E2DCCB" strokeWidth="1"><path d="M22 110 H84 M22 126 H84 M22 142 H84" /></g>
          {[[24, 34, th.a], [38, 24, th.b], [52, 40, th.a], [66, 18, th.c]].map(([x, h, c], i) => (
            <rect key={x} className="av-bar" style={{ animationDelay: `${-i * 0.5}s` }} x={x} y={146 - h} width="10" height={h} rx="2" fill={c} />
          ))}
          <path d="M26 128 L44 120 L60 130 L82 104" fill="none" stroke="#2B2824" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="94" width="26" height="4" rx="2" fill="#2B2824" opacity=".7" />
        </>
      );
    case "playlist":
      return frame(
        <>
          <rect x="16" y="90" width="80" height="70" rx="8" fill="#000" opacity=".14" />
          <rect x="12" y="86" width="80" height="70" rx="8" fill="#26231F" />
          <rect x="20" y="94" width="30" height="30" rx="5" fill={th.b} />
          <circle cx="35" cy="109" r="8" fill={th.c} /><circle cx="35" cy="109" r="2.6" fill="#26231F" />
          <rect x="56" y="98" width="28" height="4" rx="2" fill="#F1EBDD" opacity=".85" />
          <rect x="56" y="107" width="20" height="3.4" rx="1.7" fill="#A39B8C" />
          <g fill={th.a}>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} className="av-bar" style={{ animationDelay: `${-i * 0.28}s` }} x={58 + i * 5.4} y="112" width="3.4" height="12" rx="1.7" />
            ))}
          </g>
          <rect x="20" y="136" width="64" height="3.4" rx="1.7" fill="#3D3832" />
          <rect className="av-line" x="20" y="136" width="40" height="3.4" rx="1.7" fill={th.a} />
          <g fill="#F1EBDD"><path d="M36 146 l8 4.4 l-8 4.4z" /><rect x="52" y="146" width="3" height="8.8" rx="1" /><rect x="58" y="146" width="3" height="8.8" rx="1" /></g>
        </>
      );
    default:
      return null;
  }
}

// ── Symboles flottants (haut de l'image) ─────────────────────────────────────
const note = "M0 0 m-3.6 0 a3.6 3.6 0 1 0 7.2 0 a3.6 3.6 0 1 0 -7.2 0 M3.2 0 V-15 q6 2 7 8";
const heart = "M0 5 C-10 -3 -6 -10 0 -5.5 C6 -10 10 -3 0 5 Z";
const spark = "M0 -9 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z";

export function Floaters({ kind, theme: th }) {
  const fl = (i, extra) => ({ className: "av-float", style: { animationDelay: `${-i * 1.7}s`, ...extra } });
  const text = (x, y, s, size, c, i) => (
    <text {...fl(i)} x={x} y={y} fontSize={size} fontWeight="700" fill={c} style={{ fontFamily: MONO, animationDelay: `${-i * 1.7}s` }}>{s}</text>
  );
  // L'animation CSS remplace l'attribut transform : on place l'étoile dans un groupe parent.
  const sparkAt = (x, y, c, i, sc = 1) => (
    <g transform={`translate(${x} ${y}) scale(${sc})`}>
      <path className="av-spark" style={{ animationDelay: `${-i * 0.9}s` }} d={spark} fill={c} />
    </g>
  );
  switch (kind) {
    case "code":
      return (
        <>
          {text(262, 58, "</>", 22, th.a, 0)}{text(96, 60, "{ }", 18, th.b, 1)}{text(26, 196, "=>", 16, th.a, 2)}
          <circle cx="316" cy="62" r="7" fill="none" stroke={th.a} strokeWidth="2.4" />
          <path d="M44 34 l8 14 h-16z" fill={th.b} opacity=".85" stroke={th.b} strokeWidth="2" strokeLinejoin="round" />
          {sparkAt(350, 288, th.b, 1, 0.9)}{sparkAt(153, 31, th.a, 2, 0.8)}
        </>
      );
    case "ecole":
      return (
        <>
          {text(262, 58, "A+", 22, th.a, 0)}{text(96, 62, "x²", 20, th.b, 1)}{text(26, 198, "π", 20, th.a, 2)}{text(300, 80, "∑", 18, th.c, 3)}
          <path d="M44 34 l10 0 M49 29 v10" stroke={th.b} strokeWidth="3" strokeLinecap="round" />
          <path d="M318 60 l6 6 l12 -12" fill="none" stroke={th.a} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {sparkAt(350, 288, th.c, 1, 0.9)}{sparkAt(153, 31, th.b, 2, 0.8)}
        </>
      );
    case "art":
      return (
        <>
          <g className="av-float"><path d={note} transform="translate(268 60)" fill={th.a} stroke={th.a} strokeWidth="2.2" strokeLinecap="round" /></g>
          <g className="av-float" style={{ animationDelay: "-2s" }}><path d={note} transform="translate(100 62) scale(.9)" fill={th.b} stroke={th.b} strokeWidth="2.2" strokeLinecap="round" /></g>
          <path d="M20 196 q10 -12 20 0 t20 0" fill="none" stroke={th.c} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M316 50 C306 66 308 74 316 74 C324 74 326 66 316 50 Z" fill={th.b} />
          <circle cx="46" cy="38" r="7" fill={th.a} opacity=".85" />
          {sparkAt(350, 288, th.b, 1, 0.9)}{sparkAt(153, 31, th.c, 2, 0.8)}
        </>
      );
    case "pro":
      return (
        <>
          {text(262, 58, "%", 24, th.a, 0)}{text(96, 62, "$", 22, th.b, 1)}{text(24, 198, "+12", 15, th.a, 2)}
          <path d="M310 58 l7 7 l14 -14" fill="none" stroke={th.b} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="38" y="26" width="18" height="18" rx="4" fill="none" stroke={th.c} strokeWidth="2.6" />
          {sparkAt(350, 288, th.c, 1, 0.9)}{sparkAt(153, 31, th.a, 2, 0.8)}
        </>
      );
    case "cute":
      return (
        <>
          <g className="av-float"><path d={heart} transform="translate(268 56) scale(1.3)" fill={th.b} /></g>
          <g className="av-float" style={{ animationDelay: "-1.8s" }}><path d={heart} transform="translate(100 58)" fill={th.a} /></g>
          <g className="av-float" style={{ animationDelay: "-3.2s" }}><path d={heart} transform="translate(34 196) scale(.9)" fill={th.c} /></g>
          <g fill={th.a} opacity=".85"><circle cx="312" cy="62" r="6" /><circle cx="322" cy="58" r="8" /><circle cx="332" cy="63" r="6" /><rect x="307" y="62" width="30" height="8" rx="4" /></g>
          {sparkAt(46, 38, th.b, 0)}{sparkAt(350, 288, th.b, 1, 0.9)}{sparkAt(153, 31, th.c, 2, 0.8)}
        </>
      );
    case "etoiles":
      return (
        <>
          {sparkAt(268, 56, th.c, 0, 1.4)}{sparkAt(100, 58, th.a, 1, 1.1)}{sparkAt(34, 196, th.b, 2, 1)}
          {sparkAt(316, 66, th.a, 3, 0.8)}{sparkAt(46, 38, th.b, 4, 0.9)}{sparkAt(350, 288, th.b, 5, 0.9)}{sparkAt(153, 31, th.c, 6, 0.8)}
        </>
      );
    default:
      return null;
  }
}

// ── Effets animés : particules déterministes (mêmes positions à chaque rendu) ──
const rnd = (i, salt) => {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const FX = {
  etoiles: { n: 16, anim: "twinkle", shape: "spark", colors: ["#FFE08A", "#FFFFFF", "#9FF0D8", "#FF9BD0"] },
  petales: { n: 12, anim: "fall", shape: "petal", colors: ["#F6B8CC", "#F9D2DF", "#F29EC0", "#FFFFFF"] },
  bulles: { n: 12, anim: "rise", shape: "bubble", colors: ["#FFFFFF"] },
  neige: { n: 26, anim: "fall", shape: "dot", colors: ["#FFFFFF", "#E8F1FA"], slow: true },
  lucioles: { n: 14, anim: "drift", shape: "glow", colors: ["#F2E08A", "#C9F28A", "#FFF4B8"] },
  confettis: { n: 28, anim: "fall", shape: "confetti", colors: ["#FF6B8B", "#FFD25E", "#6BD6C5", "#7A8CFF", "#FFFFFF"] },
  coeurs: { n: 10, anim: "rise", shape: "heart", colors: ["#F4739B", "#FF9BBB", "#FFFFFF"] },
};

export function Effects({ kind }) {
  const cfg = FX[kind];
  if (!cfg) return null;
  return (
    <g pointerEvents="none">
      {Array.from({ length: cfg.n }, (_, i) => {
        const x = 8 + rnd(i, 1) * 384;
        const y = 10 + rnd(i, 2) * 380;
        const size = 0.6 + rnd(i, 3) * 0.9;
        const color = cfg.colors[i % cfg.colors.length];
        const dur = (cfg.slow ? 11 : cfg.anim === "twinkle" ? 3 : 8) + rnd(i, 4) * 5;
        const delay = -rnd(i, 5) * dur;
        const dx = (rnd(i, 6) - 0.5) * 60;
        const style = { animationDuration: `calc(${dur.toFixed(2)}s * var(--tempo, 1))`, animationDelay: `${delay.toFixed(2)}s`, "--dx": `${dx.toFixed(0)}px`, "--rot": `${(rnd(i, 7) * 540 - 270).toFixed(0)}deg`, "--sc": size };
        let shape;
        switch (cfg.shape) {
          case "spark": shape = <path d={spark} fill={color} transform={`scale(${size})`} />; break;
          case "petal": shape = <path d="M0 -6 C6 -6 7 3 0 7 C-7 3 -6 -6 0 -6Z" fill={color} transform={`scale(${size})`} />; break;
          case "bubble": shape = <circle r={5 * size} fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />; break;
          case "dot": shape = <circle r={2 * size + 0.6} fill={color} />; break;
          case "glow": shape = <><circle r={7 * size} fill={color} opacity=".25" /><circle r={2.4 * size} fill={color} /></>; break;
          case "confetti": shape = <rect x={-3} y={-1.6} width={6 * size + 1} height={3.4} rx="1" fill={color} />; break;
          default: shape = <path d={heart} fill={color} transform={`scale(${size * 0.9})`} />;
        }
        return (
          <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <g className={`av-fx av-fx--${cfg.anim}`} style={style}>{shape}</g>
          </g>
        );
      })}
    </g>
  );
}
