import { useId } from "react";
import { EXTRA } from "./HairExtra";
import { CapTexture, Clip, Curls, Fan, Flow, Sheen, Shade, Strands, Stubble, arc, circlePath, grid, mirrorPath, texTones } from "./HairTexture";

// Chaque coiffure fournit deux calques :
//   back  → dessiné DERRIÈRE le buste et la tête
//   front → dessiné PAR-DESSUS le visage (frange, mèches, pointes)
// Toutes les coiffures respectent le même contour de visage (x 134→266, y 96→260).
// La texture (brins, reflets, ombres, boucles) vient de HairTexture.jsx et est découpée
// par la silhouette de chaque coiffure.

// Pointes du carré, posées sur les épaules (identiques des deux côtés, en miroir)
const TIP = "M90.5 254 C89 284 86 300 90 312 C95 324 112 328 126 322 C138 317 144 306 145 294 C146 282 146 270 148 260 L130 248 Z";

// Calotte lisse avec raie (queue de cheval, chignon)
const CAP = "M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178 Z";
const CAP_EDGE = "M266 178 C262 150 252 128 236 114 C222 106 208 104 200 104 C192 104 178 106 164 114 C148 128 138 150 134 178";
const SKULL = "M200 62 C142 62 118 114 124 172 C126 192 130 204 134 210 L266 210 C270 204 274 192 276 172 C282 114 258 62 200 62 Z";

const BASE = {
  // ── Carré long (coiffure d'origine) ──────────────────────────────────────
  carre: {
    back: (t, { cid }) => {
      const B = "M200 56 C124 56 86 118 90 206 C92 244 90 274 87 300 L87 312 L313 312 L313 300 C310 274 308 244 310 206 C314 118 276 56 200 56 Z";
      return (
        <>
          <path d={B} fill={t.base} />
          <Clip id={`${cid}a`} d={B}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[92, 312, 308, 312]} n={30} bow={9} seed={11} />
            <Shade t={t} d="M104 120 C94 190 96 260 90 312" w={22} o={0.34} />
            <Shade t={t} d="M296 120 C306 190 304 260 310 312" w={22} o={0.34} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const F = "M130 202 C106 120 146 64 200 64 C254 64 294 120 270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202 Z";
      // Les pointes reprennent EXACTEMENT les brins du fond : les lignes se prolongent sans raccord.
      const tip = (id, d) => (
        <>
          <path d={d} fill={t.base} />
          <Clip id={id} d={d}>
            <Strands t={t} from={[150, 62, 250, 62]} to={[92, 312, 308, 312]} n={30} bow={9} seed={11} />
            <Shade t={t} d={d.startsWith("M90") ? "M92 292 C92 306 102 318 120 322" : "M308 292 C308 306 298 318 280 322"} w={11} o={0.28} />
          </Clip>
        </>
      );
      return (
        <>
          <path d="M270 202 C266 166 256 138 238 122 C226 112 208 104 190 98 C170 112 150 134 142 172 C138 184 134 194 130 202" fill="none" stroke={shade} strokeOpacity=".22" strokeWidth="10" strokeLinecap="round" />
          <path d={F} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={F} root={[190, 94]} from={175} to={365} n={24} sheen="M138 120 C152 84 206 62 256 92" shade="M190 98 C170 112 150 134 142 172" seed={12} />
          {tip(`${cid}t1`, TIP)}
          {tip(`${cid}t2`, mirrorPath(TIP))}
        </>
      );
    },
  },

  // ── Court, frange balayée ────────────────────────────────────────────────
  court: {
    back: (t, { cid }) => {
      const B = "M200 60 C140 60 116 112 122 172 C124 192 128 204 134 210 L266 210 C272 204 276 192 278 172 C284 112 260 60 200 60 Z";
      return (
        <>
          <path d={B} fill={t.base} />
          <Clip id={`${cid}a`} d={B}>
            <Strands t={t} from={[150, 64, 250, 64]} to={[124, 206, 276, 206]} n={14} bow={4} seed={31} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const F = "M134 178 C118 124 148 66 200 64 C252 66 282 124 266 178 C264 156 258 140 248 130 C236 116 214 110 196 112 C176 114 158 122 148 136 C140 148 136 162 134 178 Z";
      return (
        <>
          <path d="M266 178 C264 156 258 140 248 130 C236 116 214 110 196 112 C176 114 158 122 148 136 C140 148 136 162 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={F} fill={t.base} />
          <CapTexture t={t} id={`${cid}f`} d={F} root={[214, 100]} from={150} to={395} n={22} sheen="M156 98 C176 78 210 70 238 84" shade="M248 130 C236 116 214 110 196 112 C176 114 158 122 148 136" seed={32} />
        </>
      );
    },
  },

  // ── Bouclés (volume rond) ────────────────────────────────────────────────
  boucles: {
    back: (t, { cid }) => {
      const blobs = [
        [200, 112, 72], [200, 82, 44], [150, 78, 34], [250, 78, 34], [120, 122, 34],
        [280, 122, 34], [104, 170, 32], [296, 170, 32], [108, 216, 24], [292, 216, 24],
      ];
      return (
        <>
          <g fill={t.base}>
            {blobs.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
          <Clip id={`${cid}a`} d={blobs.map(([x, y, r]) => circlePath(x, y, r))}>
            <Curls t={t} pts={grid(76, 36, 324, 246, 25, 41)} r={8} seed={41} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade }) => {
      const F = "M134 178 C118 130 140 86 178 80 C196 76 204 76 222 80 C260 86 282 130 266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178 Z";
      return (
        <>
          <path d="M266 178 C264 160 262 148 256 138 Q250 126 240 128 Q234 114 222 120 Q212 106 200 114 Q188 106 178 120 Q166 114 160 128 Q150 126 144 140 Q138 152 134 178" fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
          <path d={F} fill={t.base} />
          <Clip id={`${cid}f`} d={F}>
            <Curls t={t} pts={grid(130, 80, 272, 132, 19, 42)} r={7} seed={42} />
            <Sheen t={t} d="M148 112 C160 90 196 78 238 92" w={8} o={0.34} />
          </Clip>
        </>
      );
    },
  },

  // ── Queue de cheval (sur le côté gauche) ─────────────────────────────────
  queue: {
    back: (t, { cid }) => {
      const TAIL = "M152 96 C98 88 66 140 80 204 C86 240 102 266 112 290 C118 268 116 242 120 218 C124 180 132 142 152 122 Z";
      return (
        <>
          <path d={SKULL} fill={t.base} />
          <Clip id={`${cid}a`} d={SKULL}>
            <Strands t={t} from={[150, 66, 250, 66]} to={[124, 208, 276, 208]} n={14} bow={4} seed={51} />
          </Clip>
          <path d={TAIL} fill={t.base} />
          <Clip id={`${cid}b`} d={TAIL}>
            <Flow t={t} c={[150, 108, 88, 112, 74, 224, 112, 292]} width={50} n={11} taper={0.9} seed={52} />
            <Shade t={t} d="M126 130 C116 170 122 220 114 282" w={12} o={0.3} />
            <Sheen t={t} d="M120 104 C92 112 80 156 86 200" w={9} o={0.36} />
          </Clip>
        </>
      );
    },
    front: (t, { cid, shade, tie }) => (
      <>
        <path d={CAP_EDGE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d={CAP} fill={t.base} />
        <CapTexture t={t} id={`${cid}f`} d={CAP} root={[200, 104]} from={180} to={360} n={20} sheen="M168 82 C186 72 214 72 234 80" shade={CAP_EDGE} seed={53} />
        <ellipse cx="148" cy="106" rx="6" ry="10" transform="rotate(-38 148 106)" fill={tie} />
      </>
    ),
  },

  // ── Chignon (haut, côté gauche) ──────────────────────────────────────────
  chignon: {
    back: (t, { cid }) => (
      <>
        <path d={SKULL} fill={t.base} />
        <Clip id={`${cid}a`} d={SKULL}>
          <Strands t={t} from={[150, 66, 250, 66]} to={[124, 208, 276, 208]} n={14} bow={4} seed={61} />
        </Clip>
      </>
    ),
    front: (t, { cid, shade, tie, hideTop }) => (
      <>
        {!hideTop && (
          <>
            <circle cx="164" cy="60" r="25" fill={t.base} />
            <Clip id={`${cid}b`} d={circlePath(164, 60, 25)}>
              <Fan t={t} root={[164, 60]} pts={arc(164, 60, 27, 27, 0, 360, 16)} bow={5} wMax={2} seed={62} />
              <Shade t={t} d={circlePath(164, 60, 22)} w={7} o={0.3} />
              <Sheen t={t} d="M148 50 C156 40 174 40 182 50" w={6} o={0.4} />
            </Clip>
          </>
        )}
        <path d={CAP_EDGE} fill="none" stroke={shade} strokeOpacity=".2" strokeWidth="8" strokeLinecap="round" />
        <path d={CAP} fill={t.base} />
        <CapTexture t={t} id={`${cid}f`} d={CAP} root={[200, 104]} from={180} to={360} n={20} sheen="M168 82 C186 72 214 72 234 80" shade={CAP_EDGE} seed={63} />
        {!hideTop && <ellipse cx="164" cy="78" rx="14" ry="4.5" transform="rotate(-14 164 78)" fill={tie} />}
      </>
    ),
  },

  // ── Rasé (ras du crâne) ──────────────────────────────────────────────────
  rase: {
    back: () => null,
    front: (t, { cid }) => {
      const R = "M136 152 C130 118 156 82 200 80 C244 82 270 118 264 152 C258 130 240 112 200 110 C162 112 142 130 136 152 Z";
      return (
        <>
          <path d={R} fill={t.base} fillOpacity=".95" />
          <Clip id={`${cid}f`} d={R}>
            <Stubble t={t} id={`${cid}p`} box={[130, 78, 270, 156]} />
            <Sheen t={t} d="M156 98 C176 86 210 84 238 92" w={7} o={0.3} />
          </Clip>
        </>
      );
    },
  },

  // ── Chauve ───────────────────────────────────────────────────────────────
  chauve: {
    back: () => null,
    front: () => null,
  },
};

const STYLES = { ...BASE, ...EXTRA };

const useCid = () => useId().replace(/[^a-zA-Z0-9]/g, "");

export function HairBack({ style, tone }) {
  const cid = useCid();
  return (STYLES[style] ?? STYLES.carre).back(texTones(tone), { cid: `${cid}b` });
}

export function HairFront({ style, tone, ...extra }) {
  const cid = useCid();
  return (STYLES[style] ?? STYLES.carre).front(texTones(tone), { cid: `${cid}f`, ...extra });
}
