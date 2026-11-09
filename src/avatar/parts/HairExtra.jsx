import { BraidLinks, CapTexture, Clip, Curls, Fan, Flow, LockRibs, Sheen, Shade, Strands, arc, circlePath, grid } from "./HairTexture";

// Coiffures supplémentaires (même contrat que Hair.jsx : calques back / front).
// Chaque silhouette est dessinée en aplat, puis la texture (HairTexture.jsx) est découpée dedans.

// Calotte lisse avec raie au milieu (base de plusieurs styles)
const CAP = "M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178 Z";
const CAP_EDGE = "M266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178";
const SKULL = "M200 62 C142 62 118 114 124 172 C126 192 130 204 134 210 L266 210 C270 204 274 192 276 172 C282 114 258 62 200 62 Z";
const FRINGE = "M130 202 C106 120 146 64 200 64 C254 64 294 120 270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202 Z";
const FRINGE_EDGE = "M270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202";

// Fond de crâne texturé, commun à plusieurs coiffures
const Skull = ({ t, id, seed }) => (
  <>
    <path d={SKULL} fill={t.base} />
    <Clip id={id} d={SKULL}>
      <Strands t={t} from={[150, 66, 250, 66]} to={[124, 208, 276, 208]} n={14} bow={4} seed={seed} />
    </Clip>
  </>
);

// Maillons d'une tresse qui descend de (x0, 214) ; dir = 1 à gauche, -1 à droite
const braidPts = (x0, dir) => [[0, 214], [-4, 240], [-7, 266], [-10, 292], [-12, 318]].map(([dx, y]) => [x0 + dir * -dx, y, dir * 14]);

export const EXTRA = {
  // ── Bob net, frange balayée ──────────────────────────────────────────────
  bob: {
    back: (t, { cid }) => {
      const B = "M200 58 C128 58 96 116 98 188 C99 214 100 232 108 244 C130 250 150 246 160 240 L240 240 C250 246 270 250 292 244 C300 232 301 214 302 188 C304 116 272 58 200 58 Z";
      return (
        <>
          <path d={B} fill={t.base} />
          <Clip id={`${cid}a`} d={B}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[104, 246, 296, 246]} n={24} bow={7} seed={71} />
            <Shade t={t} d="M104 230 C130 250 150 246 160 240" w={12} o={0.32} />
            <Shade t={t} d="M296 230 C270 250 250 246 240 240" w={12} o={0.32} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const L = "M110 188 C106 214 108 232 116 246 C130 250 146 244 152 238 C146 222 142 206 142 188 Z";
      const R = "M290 188 C294 214 292 232 284 246 C270 250 254 244 248 238 C254 222 258 206 258 188 Z";
      return (
        <>
          <path d={FRINGE_EDGE} fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
          <path d={FRINGE} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={FRINGE} root={[190, 94]} from={175} to={365} n={22} sheen="M138 120 C152 84 206 62 256 92" shade={FRINGE_EDGE} seed={72} />
          <path d={L} fill={t.base} />
          <path d={R} fill={t.base} />
          <Clip id={`${cid}l`} d={L}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[104, 246, 296, 246]} n={24} bow={7} seed={71} />
          </Clip>
          <Clip id={`${cid}r`} d={R}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[104, 246, 296, 246]} n={24} bow={7} seed={71} />
          </Clip>
        </>
      );
    },
  },

  // ── Nattes ───────────────────────────────────────────────────────────────
  nattes: {
    back: (t, { cid }) => <Skull t={t} id={`${cid}a`} seed={81} />,
    front: (t, { cid, shade, tie }) => {
      const left = braidPts(124, 1), right = braidPts(276, -1);
      return (
        <>
          <path d={CAP_EDGE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={CAP} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={CAP} root={[200, 104]} from={180} to={360} n={20} sheen="M168 82 C186 72 214 72 234 80" shade={CAP_EDGE} seed={82} />
          <path d="M200 64 V104" stroke={shade} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
          {[left, right].map((pts, k) => (
            <g key={k}>
              {pts.map(([x, y, rot], i) => (
                <ellipse key={i} cx={x} cy={y} rx="10" ry="13" transform={`rotate(${rot} ${x} ${y})`} fill={t.base} stroke={t.deep} strokeOpacity=".55" strokeWidth="1.4" />
              ))}
              <BraidLinks t={t} links={pts} />
            </g>
          ))}
          <ellipse cx="116" cy="330" rx="8" ry="5" fill={tie} />
          <ellipse cx="284" cy="330" rx="8" ry="5" fill={tie} />
        </>
      );
    },
  },

  // ── Couettes hautes, frange droite ───────────────────────────────────────
  couettes: {
    back: (t, { cid }) => {
      const TL = "M82 138 C70 184 82 226 102 244 C110 224 110 188 118 156 Z";
      const TR = "M318 138 C330 184 318 226 298 244 C290 224 290 188 282 156 Z";
      return (
        <>
          <Skull t={t} id={`${cid}a`} seed={91} />
          {[98, 302].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="122" r="30" fill={t.base} />
              <Clip id={`${cid}p${cx}`} d={circlePath(cx, 122, 30)}>
                <Fan t={t} root={[cx, 122]} pts={arc(cx, 122, 32, 32, 0, 360, 18)} bow={5} wMax={2} seed={92} />
                <Shade t={t} d={circlePath(cx, 122, 26)} w={9} o={0.28} />
                <Sheen t={t} d={`M${cx - 18} 112 C${cx - 10} 98 ${cx + 8} 98 ${cx + 16} 108`} w={7} o={0.38} />
              </Clip>
            </g>
          ))}
          <path d={TL} fill={t.base} />
          <path d={TR} fill={t.base} />
          <Clip id={`${cid}tl`} d={TL}>
            <Flow t={t} c={[100, 142, 80, 180, 88, 222, 104, 244]} width={24} n={6} taper={0.8} seed={93} />
          </Clip>
          <Clip id={`${cid}tr`} d={TR}>
            <Flow t={t} c={[300, 142, 320, 180, 312, 222, 296, 244]} width={24} n={6} taper={0.8} seed={94} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade, tie }) => {
      const CAP2 = "M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 256 130 240 120 C228 112 212 108 200 108 C188 108 172 112 160 120 C144 130 138 150 134 178 Z";
      const BANGS = "M146 112 C168 100 232 100 254 112 L256 132 C232 124 168 124 144 132 Z";
      return (
        <>
          <path d="M266 178 C262 150 256 130 240 120 C228 112 212 108 200 108 C188 108 172 112 160 120 C144 130 138 150 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={CAP2} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={CAP2} root={[200, 100]} from={180} to={360} n={18} sheen="M160 84 C178 74 210 72 234 80" seed={95} />
          <path d={BANGS} fill={t.base} />
          <Clip id={`${cid}g`} d={BANGS}>
            <Strands t={t} from={[146, 108, 254, 108]} to={[144, 134, 256, 134]} n={16} bow={1.5} seed={96} />
            <Shade t={t} d="M146 128 C168 138 232 138 254 128" w={9} o={0.3} />
          </Clip>
          <ellipse cx="116" cy="128" rx="5" ry="12" transform="rotate(28 116 128)" fill={tie} />
          <ellipse cx="284" cy="128" rx="5" ry="12" transform="rotate(-28 284 128)" fill={tie} />
        </>
      );
    },
  },

  // ── Afro puffs ───────────────────────────────────────────────────────────
  puffs: {
    back: (t, { cid }) => (
      <>
        <circle cx="140" cy="78" r="36" fill={t.base} />
        <circle cx="260" cy="78" r="36" fill={t.base} />
        <Skull t={t} id={`${cid}a`} seed={101} />
        <Clip id={`${cid}c`} d={[circlePath(140, 78, 36), circlePath(260, 78, 36)]}>
          <Curls t={t} pts={[...grid(100, 44, 182, 116, 17, 103), ...grid(220, 44, 302, 116, 17, 104)]} r={6} seed={105} />
        </Clip>
      </>
    ),
    front: (t, { cid, shade, tie }) => {
      const P = "M134 178 C120 130 148 80 200 78 C252 80 280 130 266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178 Z";
      return (
        <>
          <path d="M266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={P} fill={t.base} />
          <Clip id={`${cid}f`} d={P}>
            <Curls t={t} pts={grid(130, 82, 272, 132, 19, 106)} r={6.5} seed={107} />
            <Sheen t={t} d="M150 112 C162 92 198 82 236 94" w={8} o={0.34} />
          </Clip>
          <ellipse cx="164" cy="108" rx="8" ry="5" transform="rotate(-30 164 108)" fill={tie} />
          <ellipse cx="236" cy="108" rx="8" ry="5" transform="rotate(30 236 108)" fill={tie} />
        </>
      );
    },
  },

  // ── Longs lisses, raie au milieu ─────────────────────────────────────────
  longs: {
    back: (t, { cid }) => {
      const B = "M200 56 C120 56 88 118 92 210 C94 270 92 310 88 340 L312 340 C308 310 306 270 308 210 C312 118 280 56 200 56 Z";
      return (
        <>
          <path d={B} fill={t.base} />
          <Clip id={`${cid}a`} d={B}>
            <Strands t={t} from={[150, 60, 250, 60]} to={[90, 340, 310, 340]} n={32} bow={8} seed={111} />
            <Shade t={t} d="M104 130 C96 210 98 280 92 340" w={22} o={0.34} />
            <Shade t={t} d="M296 130 C304 210 302 280 308 340" w={22} o={0.34} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const LF = "M130 222 C108 130 146 64 200 64 C254 64 292 130 270 222 C262 180 246 142 214 114 C208 108 204 106 200 106 C196 106 192 108 186 114 C154 142 138 180 130 222 Z";
      const LE = "M130 222 C108 130 146 64 200 64 C254 64 292 130 270 222 C262 180 246 142 214 114 C208 108 204 106 200 106 C196 106 192 108 186 114 C154 142 138 180 130 222";
      const SL = "M110 200 C102 250 98 292 100 336 C114 342 130 336 140 324 C140 282 138 240 142 202 Z";
      const SR = "M290 200 C298 250 302 292 300 336 C286 342 270 336 260 324 C260 282 262 240 258 202 Z";
      return (
        <>
          <path d={LE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="9" strokeLinecap="round" />
          <path d={LF} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={LF} root={[200, 106]} from={190} to={350} n={20} sheen="M156 96 C172 76 200 70 226 78" shade={LE} seed={112} />
          <path d={SL} fill={t.base} />
          <path d={SR} fill={t.base} />
          <Clip id={`${cid}l`} d={SL}>
            <Strands t={t} from={[150, 60, 250, 60]} to={[90, 340, 310, 340]} n={32} bow={8} seed={111} />
            <Shade t={t} d="M104 220 C98 270 98 310 100 336" w={12} o={0.28} />
          </Clip>
          <Clip id={`${cid}r`} d={SR}>
            <Strands t={t} from={[150, 60, 250, 60]} to={[90, 340, 310, 340]} n={32} bow={8} seed={111} />
            <Shade t={t} d="M296 220 C302 270 302 310 300 336" w={12} o={0.28} />
          </Clip>
        </>
      );
    },
  },

  // ── Ondulés mi-longs ─────────────────────────────────────────────────────
  ondules: {
    back: (t, { cid }) => {
      const W = "M200 56 C122 56 90 116 94 196 C96 224 92 244 98 262 Q108 278 120 262 Q132 248 144 266 L256 266 Q268 248 280 262 Q292 278 302 262 C308 244 304 224 306 196 C310 116 278 56 200 56 Z";
      return (
        <>
          <path d={W} fill={t.base} />
          <Clip id={`${cid}a`} d={W}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[100, 270, 300, 270]} n={22} wave={6} seed={121} />
            <Shade t={t} d="M104 120 C96 190 100 240 100 268" w={20} o={0.32} />
            <Shade t={t} d="M296 120 C304 190 300 240 300 268" w={20} o={0.32} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const WF = "M130 214 C106 122 146 64 200 64 C254 64 294 122 270 214 C264 170 254 140 236 122 C224 112 208 104 190 98 C170 112 150 134 142 176 C138 192 134 204 130 214 Z";
      const WE = "M270 214 C264 170 254 140 236 122 C224 112 208 104 190 98 C170 112 150 134 142 176 C138 192 134 204 130 214";
      const SL = "M114 196 Q100 218 112 238 Q124 254 114 276 Q130 282 144 268 Q154 238 144 212 Z";
      const SR = "M286 196 Q300 218 288 238 Q276 254 286 276 Q270 282 256 268 Q246 238 256 212 Z";
      return (
        <>
          <path d={WE} fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
          <path d={WF} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={WF} root={[190, 94]} from={175} to={365} n={22} sheen="M138 120 C152 84 206 62 254 92" shade={WE} seed={122} />
          <path d={SL} fill={t.base} />
          <path d={SR} fill={t.base} />
          <Clip id={`${cid}l`} d={SL}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[100, 270, 300, 270]} n={22} wave={6} seed={121} />
          </Clip>
          <Clip id={`${cid}r`} d={SR}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[100, 270, 300, 270]} n={22} wave={6} seed={121} />
          </Clip>
        </>
      );
    },
  },

  // ── Banane (gros volume devant) ──────────────────────────────────────────
  pompadour: {
    back: (t, { cid }) => <Skull t={t} id={`${cid}a`} seed={131} />,
    front: (t, { cid, shade }) => {
      const PF = "M134 178 C120 112 138 38 212 34 C264 34 284 100 266 178 C264 150 256 132 242 122 C230 114 214 112 200 112 C186 112 168 116 156 126 C142 138 136 156 134 178 Z";
      const PE = "M266 178 C264 150 256 132 242 122 C230 114 214 112 200 112 C186 112 168 116 156 126 C142 138 136 156 134 178";
      return (
        <>
          <path d={PE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={PF} fill={t.base} />
          <Clip id={`${cid}f`} d={PF}>
            <Strands t={t} from={[140, 130, 262, 126]} to={[150, 44, 262, 40]} n={22} bow={12} seed={132} />
            <Strands t={t} from={[136, 176, 150, 132]} to={[124, 110, 140, 66]} n={5} bow={4} seed={133} />
            <Shade t={t} d={PE} w={9} o={0.3} />
            <Sheen t={t} d="M148 98 C156 66 188 46 226 44" w={10} o={0.4} />
          </Clip>
        </>
      );
    },
  },

  // ── Locks ────────────────────────────────────────────────────────────────
  locks: {
    back: (t, { cid }) => {
      const locks = ["M126 150 C108 190 104 240 110 292", "M140 168 C128 210 126 250 130 296", "M110 138 C90 180 88 232 94 276", "M274 150 C292 190 296 240 290 292", "M260 168 C272 210 274 250 270 296", "M290 138 C310 180 312 232 306 276"];
      return (
        <>
          <Skull t={t} id={`${cid}a`} seed={141} />
          <g fill="none" stroke={t.base} strokeWidth="13" strokeLinecap="round">
            {locks.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {locks.map((d) => (
            <LockRibs key={d} t={t} d={d} />
          ))}
        </>
      );
    },
    front: (t, { cid, shade, tie }) => {
      const locks = ["M148 120 C140 170 134 230 140 308", "M252 120 C260 170 266 230 260 308"];
      return (
        <>
          <path d={CAP_EDGE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={CAP} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={CAP} root={[200, 104]} from={180} to={360} n={18} sheen="M168 82 C186 72 214 72 234 80" shade={CAP_EDGE} seed={142} />
          <g fill="none" stroke={t.base} strokeWidth="13" strokeLinecap="round">
            {locks.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {locks.map((d) => (
            <LockRibs key={d} t={t} d={d} />
          ))}
          <rect x="134" y="140" width="12" height="5" rx="2.4" fill={tie} />
          <rect x="254" y="140" width="12" height="5" rx="2.4" fill={tie} />
        </>
      );
    },
  },
};
