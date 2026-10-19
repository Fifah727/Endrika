import { Laptop } from "./Scene";

// Objets posés sur le bureau, au premier plan (zone x 96→304, y 340→396).
// Seul l'ordinateur masque le buste ; les autres laissent voir la tenue.

const PAPER = "#FBF8F0";
const INK = "#2B2824";

function Keyboard({ th }) {
  const rows = [
    { y: 372, n: 13, x0: 114, w: 11.4 },
    { y: 380, n: 13, x0: 112, w: 11.8 },
    { y: 388, n: 12, x0: 110, w: 12.4 },
  ];
  return (
    <g>
      <ellipse cx="200" cy="397" rx="108" ry="3" fill={th.contact} opacity=".22" />
      <path d="M102 396 L112 366 H288 L298 396 Z" fill="#2A2B2F" stroke="#151618" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M112 368 H288" stroke="#4A4C52" strokeWidth="1.2" strokeLinecap="round" />
      {rows.map((r, ri) =>
        Array.from({ length: r.n }, (_, i) => {
          const accent = (i * 3 + ri * 5) % 7 === 0;
          const color = [th.a, th.b, th.c][(i + ri) % 3];
          return (
            <rect
              key={`${ri}-${i}`}
              className={accent ? "av-rgb" : undefined}
              style={accent ? { animationDelay: `${-((i + ri * 2) % 6) * 0.5}s` } : undefined}
              x={r.x0 + i * (r.w + 2.4)}
              y={r.y}
              width={r.w}
              height="6"
              rx="1.6"
              fill={accent ? color : "#3E4046"}
            />
          );
        })
      )}
      <rect x="148" y="394" width="104" height="0.01" />
      {/* souris */}
      <ellipse cx="330" cy="384" rx="14" ry="10" fill="#2A2B2F" stroke="#151618" strokeWidth="1.2" />
      <path d="M330 374 V384" stroke="#4A4C52" strokeWidth="1.2" />
    </g>
  );
}

function Notebook({ th }) {
  return (
    <g>
      <ellipse cx="200" cy="397" rx="112" ry="3" fill={th.contact} opacity=".2" />
      <path d="M92 397 L128 360 L272 360 L308 397 Z" fill={th.b} />
      <path d="M132 364 L199 367 L199 394 L98 396 Z" fill={PAPER} stroke="#D9D2C2" strokeWidth="1" strokeLinejoin="round" />
      <path d="M201 367 L268 364 L302 396 L201 394 Z" fill={PAPER} stroke="#D9D2C2" strokeWidth="1" strokeLinejoin="round" />
      <g stroke="#B9C7DB" strokeWidth="1.1" strokeLinecap="round">
        <path d="M134 372 L196 374" /><path d="M126 379 L196 381" /><path d="M118 386 L196 388" />
        <path d="M204 374 L266 372" /><path d="M204 381 L275 379" /><path d="M204 388 L284 386" />
      </g>
      <path d="M200 366 V394" stroke="#C9C1AE" strokeWidth="1.6" />
      <path className="av-write" d="M142 373 q5 -5 9 0 t9 0 t9 0 t9 0 M134 380 q5 -5 9 0 t9 0 t9 0" fill="none" stroke={th.a} strokeWidth="2" strokeLinecap="round" pathLength="1" />
      <path d="M214 365 V386 L219 381 L224 386 V365" fill="#D2546A" />
      {/* stylo */}
      <g transform="rotate(-24 280 384)">
        <rect x="248" y="381" width="52" height="5" rx="2.5" fill={th.a} />
        <path d="M300 381 L310 383.5 L300 386 Z" fill="#E8D9B8" />
        <rect x="248" y="381" width="9" height="5" rx="2.5" fill="#fff" fillOpacity=".4" />
      </g>
    </g>
  );
}

function Book({ th }) {
  return (
    <g>
      <ellipse cx="200" cy="397" rx="110" ry="3" fill={th.contact} opacity=".22" />
      <path d="M96 397 L124 352 L276 352 L304 397 Z" fill={th.a} />
      <path d="M100 394 L130 357 L199 360 L199 392 Z" fill={PAPER} />
      <path d="M201 360 L270 357 L300 394 L201 392 Z" fill={PAPER} />
      <g stroke="#CFC8B8" strokeWidth="1" strokeLinecap="round">
        <path d="M104 396 H198 M202 396 H296" strokeWidth="2.4" />
      </g>
      <g stroke="#9AA3AF" strokeWidth="1.4" strokeLinecap="round" opacity=".8">
        <path d="M136 366 L194 368" /><path d="M132 372 L194 374" /><path d="M128 378 L194 380" /><path d="M124 384 L170 385" />
        <path d="M206 368 L264 366" /><path d="M206 374 L268 372" />
      </g>
      <rect x="212" y="378" width="40" height="10" rx="2" fill={th.c} opacity=".7" />
      <path d="M200 359 V393" stroke="#C9C1AE" strokeWidth="1.6" />
    </g>
  );
}

function Tablet({ th }) {
  return (
    <g>
      <ellipse cx="200" cy="397" rx="96" ry="3" fill={th.contact} opacity=".22" />
      <path d="M118 397 L134 346 H266 L282 397 Z" fill="#1E1F22" stroke="#34363B" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M130 390 L142 354 H258 L270 390 Z" fill="#2E3037" />
      <circle cx="200" cy="371" r="14" fill={th.c} opacity=".9" />
      <path d="M142 388 L170 362 L190 378 L216 354 L262 390 Z" fill={th.a} opacity=".9" />
      <path className="av-draw" d="M150 380 C172 360 196 392 224 366 C240 352 250 364 256 380" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" pathLength="1" />
      <g transform="rotate(32 296 380)">
        <rect x="262" y="377" width="60" height="6" rx="3" fill="#EDEAE2" stroke="#BDB6A6" strokeWidth="1" />
        <path d="M322 377 L332 380 L322 383 Z" fill="#2B2824" />
      </g>
    </g>
  );
}

function Folders({ th }) {
  return (
    <g>
      <ellipse cx="190" cy="397" rx="112" ry="3" fill={th.contact} opacity=".2" />
      <path d="M96 396 V372 H126 L132 366 H226 V396 Z" fill={th.c} stroke="#00000022" strokeWidth="1.2" />
      <path d="M106 386 V360 H136 L142 354 H232 V386 Z" fill={th.a} stroke="#00000022" strokeWidth="1.2" />
      <path d="M116 376 V348 H146 L152 342 H240 V376 Z" fill={th.b} stroke="#00000022" strokeWidth="1.2" />
      <rect x="160" y="352" width="46" height="5" rx="2" fill="#fff" opacity=".5" />
      <rect x="252" y="366" width="58" height="30" rx="2" fill={PAPER} stroke="#D9D2C2" strokeWidth="1.2" />
      <g stroke="#B9C0CC" strokeWidth="1.4" strokeLinecap="round"><path d="M260 374 H302" /><path d="M260 380 H296" /><path d="M260 386 H300" /></g>
      <g transform="rotate(-30 290 360)">
        <rect x="262" y="357" width="48" height="5" rx="2.5" fill={INK} />
        <path d="M310 357 L318 359.5 L310 362 Z" fill="#E8D9B8" />
      </g>
    </g>
  );
}

function Camera({ th }) {
  return (
    <g>
      <ellipse cx="200" cy="397" rx="86" ry="3" fill={th.contact} opacity=".25" />
      <path d="M118 394 C104 380 112 356 140 354 M282 394 C296 380 288 356 260 354" fill="none" stroke={th.b} strokeWidth="6" strokeLinecap="round" />
      <rect x="146" y="354" width="108" height="42" rx="9" fill="#2A2B2F" stroke="#151618" strokeWidth="1.6" />
      <rect x="146" y="354" width="108" height="14" rx="7" fill="#3A3C41" />
      <path d="M176 354 L184 344 H216 L224 354 Z" fill="#2A2B2F" stroke="#151618" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="158" y="344" width="14" height="10" rx="3" fill="#D2546A" />
      <circle cx="200" cy="376" r="22" fill="#18191C" stroke="#4A4C52" strokeWidth="2" />
      <circle cx="200" cy="376" r="15" fill="#25364F" stroke="#0F1012" strokeWidth="2" />
      <circle cx="200" cy="376" r="7" fill="#101827" />
      <circle cx="194" cy="370" r="3.6" fill="#fff" opacity=".55" />
      <circle className="av-flash" cx="238" cy="362" r="4.4" fill="#fff" />
      <rect x="150" y="372" width="12" height="18" rx="4" fill="#3E4046" />
    </g>
  );
}

function Piano({ th }) {
  const whites = Array.from({ length: 15 }, (_, i) => 98 + i * 13.9);
  const blackAt = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  return (
    <g>
      <ellipse cx="200" cy="397" rx="112" ry="3" fill={th.contact} opacity=".22" />
      <rect x="92" y="352" width="216" height="46" rx="6" fill="#26272B" />
      <rect x="98" y="362" width="204" height="32" rx="2.4" fill="#F7F3EA" />
      {whites.slice(1, 15).map((x) => (
        <path key={x} d={`M${x} 362 V394`} stroke="#CFC8B8" strokeWidth="1.2" />
      ))}
      {blackAt.map((i, k) => (
        <rect key={i} className="av-key" style={{ animationDelay: `${-k * 0.37}s` }} x={98 + (i + 1) * 13.9 - 4.6} y="362" width="9.2" height="19" rx="1.8" fill="#18191C" />
      ))}
      <rect x="108" y="355" width="30" height="4" rx="2" fill={th.a} />
      <circle cx="286" cy="357" r="2.4" fill={th.b} /><circle cx="276" cy="357" r="2.4" fill={th.c} />
    </g>
  );
}

function Board({ th }) {
  return (
    <g>
      <ellipse cx="200" cy="397" rx="104" ry="3" fill={th.contact} opacity=".22" />
      <rect x="104" y="366" width="190" height="30" rx="9" fill="#C9A672" stroke="#A9854E" strokeWidth="1.4" />
      <circle cx="116" cy="381" r="3.4" fill="#A9854E" />
      <circle cx="150" cy="374" r="12" fill="#D2463C" /><path d="M146 364 q4 -5 9 0 q-4 3 -9 0z" fill="#4F8A5B" />
      <circle cx="150" cy="374" r="12" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2" strokeDasharray="14 60" />
      {[188, 204, 220].map((x, i) => <ellipse key={x} cx={x} cy={380 - i} rx="7" ry="5.4" fill="#E9893A" stroke="#C86B22" strokeWidth="1" />)}
      <g fill="#6FA37B"><ellipse cx="248" cy="372" rx="9" ry="4" transform="rotate(-24 248 372)" /><ellipse cx="258" cy="382" rx="9" ry="4" transform="rotate(18 258 382)" /><ellipse cx="240" cy="384" rx="8" ry="3.6" transform="rotate(8 240 384)" /></g>
      <g transform="rotate(-18 272 366)">
        <path d="M232 360 H290 L296 366 L232 366 Z" fill="#DADDE3" stroke="#9AA0AA" strokeWidth="1" strokeLinejoin="round" />
        <rect x="290" y="361" width="30" height="7" rx="3.5" fill="#2B2824" />
      </g>
    </g>
  );
}

function Toolbox({ th }) {
  return (
    <g>
      <ellipse cx="190" cy="397" rx="104" ry="3" fill={th.contact} opacity=".25" />
      <path d="M130 366 C130 346 168 346 168 366" fill="none" stroke="#8A9099" strokeWidth="6" strokeLinecap="round" />
      <rect x="100" y="362" width="114" height="34" rx="6" fill="#C8483A" stroke="#8E2E24" strokeWidth="1.6" />
      <rect x="100" y="362" width="114" height="10" rx="5" fill="#DB5A4B" />
      <rect x="148" y="368" width="18" height="12" rx="2.4" fill="#B9BEC6" stroke="#7F858E" strokeWidth="1.2" />
      <circle cx="112" cy="388" r="2.2" fill="#F3C4BC" /><circle cx="202" cy="388" r="2.2" fill="#F3C4BC" />
      <g transform="rotate(-24 262 380)">
        <rect x="226" y="377" width="64" height="7" rx="3.5" fill="#B9BEC6" stroke="#7F858E" strokeWidth="1.2" />
        <path d="M290 372 a9 9 0 1 1 0 17 v-6 a3 3 0 1 0 0 -5 z" fill="#B9BEC6" stroke="#7F858E" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
      <g transform="rotate(14 268 390)"><rect x="244" y="386" width="40" height="8" rx="3" fill="#D9A53C" /><rect x="236" y="384" width="12" height="12" rx="2" fill="#7F858E" /></g>
    </g>
  );
}

function MedKit({ th }) {
  return (
    <g>
      <ellipse cx="190" cy="397" rx="100" ry="3" fill={th.contact} opacity=".22" />
      <rect x="116" y="360" width="100" height="36" rx="7" fill="#F7F3EA" stroke="#CFC8B8" strokeWidth="1.6" />
      <path d="M126 356 H206 V362 H126 Z" fill="#E4DECE" stroke="#CFC8B8" strokeWidth="1.2" />
      <path d="M160 368 h12 v8 h8 v10 h-8 v8 h-12 v-8 h-8 v-10 h8 z" transform="translate(-3 -3) scale(1)" fill="#D2463C" />
      <rect x="234" y="366" width="30" height="30" rx="5" fill="#E9893A" stroke="#BF6A22" strokeWidth="1.4" />
      <rect x="232" y="360" width="34" height="9" rx="3" fill="#F7F3EA" stroke="#CFC8B8" strokeWidth="1.2" />
      <rect x="241" y="376" width="16" height="10" rx="2" fill="#fff" opacity=".8" />
      <g transform="rotate(-8 292 386)"><rect x="276" y="382" width="34" height="8" rx="4" fill="#F4B8A4" stroke="#D98E78" strokeWidth="1" /><rect x="288" y="382" width="10" height="8" fill="#F8D6C8" /></g>
    </g>
  );
}

const ITEMS = {
  clavier: Keyboard, cahier: Notebook, livre: Book, tablette: Tablet, dossier: Folders,
  camera: Camera, piano: Piano, planche: Board, outils: Toolbox, trousse: MedKit,
};

/** Objet principal posé devant le personnage. */
export default function DeskItem({ kind, theme }) {
  if (kind === "laptop") return <Laptop theme={theme} />;
  const Item = ITEMS[kind];
  return Item ? <Item th={theme} /> : null;
}
