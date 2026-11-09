import { lum, mix } from "../color";

// ══════════════════════════════════════════════════════════════════════════
//  Texture des cheveux : brins fins, reflets, ombres et boucles posés sur les
//  silhouettes. Tout est découpé (clipPath) par la silhouette de la coiffure :
//  on peut donc tracer largement sans jamais dépasser. Les positions « au hasard »
//  sont déterministes : le dessin est identique à chaque rendu (aperçu, GIF, MP4…).
// ══════════════════════════════════════════════════════════════════════════

/** Ajoute à la teinte de base une teinte sombre (creux) et claire (éclat). */
export const texTones = (t) => {
  const light = lum(t.base) > 0.55;
  return {
    ...t,
    deep: light ? mix(t.base, "#4A2F1D", 0.34) : mix(t.base, "#000000", 0.42),
    lite: light ? mix(t.base, "#FFFFFF", 0.62) : mix(t.base, "#FFE9D6", 0.34),
  };
};

const rnd = (i, salt = 1) => {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
};
const f1 = (n) => Math.round(n * 10) / 10;
const lerp = (a, b, u) => a + (b - a) * u;

/** Points régulièrement répartis sur une ellipse (angles en degrés, 0 = droite, 90 = bas). */
export const arc = (cx, cy, rx, ry, a0, a1, n) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / Math.max(1, n - 1)) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });

/** Découpe son contenu selon une ou plusieurs silhouettes. */
export function Clip({ id, d, children }) {
  const list = Array.isArray(d) ? d : [d];
  return (
    <>
      <clipPath id={id}>
        {list.map((x, i) => (
          <path key={i} d={x} />
        ))}
      </clipPath>
      <g clipPath={`url(#${id})`}>{children}</g>
    </>
  );
}

const Group = ({ children }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </g>
);

// Un brin : tantôt creux sombre, tantôt éclat clair, d'épaisseur et d'opacité variables
function Hair({ d, i, t, wMin, wMax, seed, o = 1 }) {
  const dark = (i + Math.floor(rnd(i, seed) * 3)) % 3 === 0;
  return (
    <path
      d={d}
      stroke={dark ? t.deep : t.strand}
      strokeOpacity={f1(((dark ? 0.4 : 0.38) + rnd(i, seed + 5) * 0.28) * o)}
      strokeWidth={f1(wMin + rnd(i, seed + 7) * (wMax - wMin))}
    />
  );
}

/** Brins qui vont d'un segment de départ à un segment d'arrivée (cheveux longs, nappes). */
export function Strands({ t, from, to, n = 16, bow = 6, wave = 0, wMin = 1, wMax = 2.4, seed = 1, o = 1 }) {
  const lines = [];
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n;
    const v = Math.min(1, Math.max(0, u + (rnd(i, seed) - 0.5) * 0.06));
    const sx = lerp(from[0], from[2], u), sy = lerp(from[1], from[3], u);
    const ex = lerp(to[0], to[2], v), ey = lerp(to[1], to[3], v);
    const dx = ex - sx, dy = ey - sy, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    let d;
    if (wave) {
      // cheveux ondulés : la courbe alterne de part et d'autre de l'axe du brin
      const segs = Math.max(2, Math.round(len / 30));
      const sign = i % 2 ? 1 : -1;
      d = `M${f1(sx)} ${f1(sy)}`;
      for (let k = 1; k <= segs; k++) {
        const p = k / segs, q = (k - 0.5) / segs;
        const px = sx + dx * p, py = sy + dy * p;
        d += k === 1 ? ` Q${f1(sx + dx * q + nx * wave * sign)} ${f1(sy + dy * q + ny * wave * sign)} ${f1(px)} ${f1(py)}` : ` T${f1(px)} ${f1(py)}`;
      }
    } else {
      const b = bow * (rnd(i, seed + 2) - 0.35);
      d = `M${f1(sx)} ${f1(sy)} C${f1(sx + dx * 0.33 + nx * b)} ${f1(sy + dy * 0.33 + ny * b)} ${f1(sx + dx * 0.68 + nx * b * 0.6)} ${f1(sy + dy * 0.68 + ny * b * 0.6)} ${f1(ex)} ${f1(ey)}`;
    }
    lines.push(<Hair key={i} d={d} i={i} t={t} wMin={wMin} wMax={wMax} seed={seed} o={o} />);
  }
  return <Group>{lines}</Group>;
}

/** Brins qui partent d'un point (raie, sommet du crâne) vers une série de points (éventail). */
export function Fan({ t, root, pts, bow = 6, wMin = 1, wMax = 2.2, seed = 2, o = 1 }) {
  return (
    <Group>
      {pts.map(([ex, ey], i) => {
        const dx = ex - root[0], dy = ey - root[1], len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const b = bow * (rnd(i, seed) - 0.4);
        const d = `M${f1(root[0])} ${f1(root[1])} C${f1(root[0] + dx * 0.34 + nx * b)} ${f1(root[1] + dy * 0.34 + ny * b)} ${f1(root[0] + dx * 0.7 + nx * b * 0.5)} ${f1(root[1] + dy * 0.7 + ny * b * 0.5)} ${f1(ex)} ${f1(ey)}`;
        return <Hair key={i} d={d} i={i} t={t} wMin={wMin} wMax={wMax} seed={seed} o={o} />;
      })}
    </Group>
  );
}

/** Brins parallèles à une courbe (queue de cheval, mèche) : ils se resserrent vers la pointe. */
export function Flow({ t, c, width, n = 8, taper = 0.8, m = 14, wMin = 1, wMax = 2.2, seed = 3, o = 1 }) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = c;
  const pt = (s) => {
    const u = s / m, v = 1 - u;
    return [v * v * v * x0 + 3 * v * v * u * x1 + 3 * v * u * u * x2 + u * u * u * x3, v * v * v * y0 + 3 * v * v * u * y1 + 3 * v * u * u * y2 + u * u * u * y3];
  };
  const nrm = (s) => {
    const a = pt(Math.max(0, s - 0.5)), b = pt(Math.min(m, s + 0.5));
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    return [-dy / l, dx / l];
  };
  return (
    <Group>
      {Array.from({ length: n }, (_, k) => {
        const off = ((k + 0.5) / n - 0.5) * width;
        let d = "";
        for (let s = 0; s <= m; s++) {
          const [px, py] = pt(s), [nx, ny] = nrm(s);
          const o = off * (1 - taper * (s / m)) + Math.sin(s * 0.9 + k) * 0.6;
          d += `${s ? "L" : "M"}${f1(px + nx * o)} ${f1(py + ny * o)} `;
        }
        return <Hair key={k} d={d} i={k} t={t} wMin={wMin} wMax={wMax} seed={seed} o={o} />;
      })}
    </Group>
  );
}

/** Petites boucles : cheveux bouclés ou crépus. pts = [[x, y, rayon?]]. */
export function Curls({ t, pts, r = 6, seed = 4 }) {
  return (
    <Group>
      {pts.map(([x, y, rr], i) => {
        const R = rr ?? r * (0.8 + rnd(i, seed) * 0.5);
        const a = Math.round(rnd(i, seed + 1) * 360);
        return (
          <g key={i} transform={`translate(${f1(x)} ${f1(y)}) rotate(${a})`}>
            <path d={`M${f1(-R)} 0 A${f1(R)} ${f1(R)} 0 1 1 ${f1(R * 0.3)} ${f1(-R * 0.95)}`} stroke={t.deep} strokeOpacity=".5" strokeWidth="1.9" />
            <path d={`M${f1(-R * 0.42)} 0 A${f1(R * 0.42)} ${f1(R * 0.42)} 0 1 1 ${f1(R * 0.12)} ${f1(-R * 0.4)}`} stroke={t.lite} strokeOpacity=".38" strokeWidth="1.5" />
          </g>
        );
      })}
    </Group>
  );
}

/** Grille de points de départ pour les boucles (décalée une ligne sur deux). */
export const grid = (x0, y0, x1, y1, gap, seed = 9) => {
  const out = [];
  let row = 0;
  for (let y = y0; y <= y1; y += gap * 0.86, row++) {
    for (let x = x0 + (row % 2 ? gap / 2 : 0); x <= x1; x += gap) {
      out.push([x + (rnd(out.length, seed) - 0.5) * gap * 0.35, y + (rnd(out.length, seed + 1) - 0.5) * gap * 0.3]);
    }
  }
  return out;
};

/** Reflet brillant le long d'une courbe : un large halo doux et un filet plus clair. */
export function Sheen({ t, d, w = 9, o = 0.4 }) {
  return (
    <Group>
      <path d={d} stroke={t.shine} strokeOpacity={f1(o * 0.7)} strokeWidth={w} />
      <path d={d} stroke={t.lite} strokeOpacity={f1(o)} strokeWidth={f1(w * 0.26)} />
    </Group>
  );
}

/** Zone d'ombre le long d'une courbe (creux, racines, bord intérieur). */
export function Shade({ t, d, w = 14, o = 0.3 }) {
  return (
    <Group>
      <path d={d} stroke={t.deep} strokeOpacity={o} strokeWidth={w} />
    </Group>
  );
}

/** Crâne rasé : fine trame de points. `id` doit être unique. */
export function Stubble({ t, id, box }) {
  return (
    <>
      <defs>
        <pattern id={id} width="4.6" height="4.6" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r=".75" fill={t.lite} opacity=".5" />
          <circle cx="3.5" cy="3.5" r=".75" fill={t.deep} opacity=".6" />
        </pattern>
      </defs>
      <rect x={box[0]} y={box[1]} width={box[2] - box[0]} height={box[3] - box[1]} fill={`url(#${id})`} />
    </>
  );
}

/** Tresse : chaque maillon reçoit deux mèches croisées et un éclat. */
export function BraidLinks({ t, links, rx = 10, ry = 13 }) {
  return (
    <Group>
      {links.map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${f1(x)} ${f1(y)}) rotate(${rot})`}>
          <path d={`M${-rx * 0.55} ${-ry * 0.8} Q${rx * 0.2} ${-ry * 0.1} ${rx * 0.55} ${ry * 0.8}`} stroke={t.deep} strokeOpacity=".5" strokeWidth="1.8" />
          <path d={`M${rx * 0.55} ${-ry * 0.8} Q${-rx * 0.2} ${-ry * 0.1} ${-rx * 0.55} ${ry * 0.8}`} stroke={t.deep} strokeOpacity=".42" strokeWidth="1.6" />
          <path d={`M${-rx * 0.5} ${-ry * 0.5} Q${-rx * 0.2} ${-ry * 0.85} ${rx * 0.25} ${-ry * 0.78}`} stroke={t.lite} strokeOpacity=".42" strokeWidth="1.5" />
        </g>
      ))}
    </Group>
  );
}

/** Locks : stries régulières en travers de chaque mèche et fil de lumière au centre. */
export function LockRibs({ t, d, w = 13 }) {
  return (
    <Group>
      <path d={d} stroke={t.deep} strokeOpacity=".26" strokeWidth={w - 1} strokeLinecap="butt" strokeDasharray="1.3 8.2" />
      <path d={d} stroke={t.lite} strokeOpacity=".3" strokeWidth="2" />
    </Group>
  );
}

/** Texture type d'une calotte (raie ou sommet → bords) : éventail de brins, reflet, ombre de bord. */
export function CapTexture({ t, id, d, root = [200, 72], from = 170, to = 370, n = 20, sheen, shade, seed = 5 }) {
  return (
    <Clip id={id} d={d}>
      <Fan t={t} root={root} pts={arc(200, 150, 92, 98, from, to, n)} bow={7} seed={seed} />
      {shade && <Shade t={t} d={shade} w={9} o={0.3} />}
      {sheen && <Sheen t={t} d={sheen} w={10} o={0.4} />}
    </Clip>
  );
}

/** Contour d'un cercle sous forme de chemin (pour découper des boucles dans des ronds). */
export const circlePath = (cx, cy, r) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Symétrique d'un chemin par rapport à l'axe vertical du visage (x → 400 − x). Chemins en coordonnées absolues. */
export const mirrorPath = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f1(400 - Number(x))} ${y}`);
