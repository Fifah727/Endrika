import { forwardRef, memo, useCallback, useEffect, useId, useRef } from "react";
import "../styles/avatar.css";
import { CARD_BY_CATEGORY, FLOATERS_BY_CATEGORY, byId } from "./catalog";
import { hairTones } from "./color";
import { Audio, Earrings, Headwear, Neck } from "./parts/Accessories";
import { Background, CardItem, Effects, Floaters, Orbit, WallItem, WallPattern } from "./parts/Decor";
import DeskItem from "./parts/DeskItems";
import { Brows, Ears, Eyes, FaceArt, FaceBase, FacialHair, Mouth } from "./parts/Face";
import { Glasses, LensClip } from "./parts/Glasses";
import { HairBack, HairFront } from "./parts/Hair";
import { Sleeve, Torso } from "./parts/Outfit";
import { Bubble, Desk, Idea, Mug, Zzz } from "./parts/Scene";

/**
 * Avatar animé, entièrement piloté par `config` (voir catalog.js). Aucune interaction :
 * ce que tu vois est ce que tu exportes.
 *
 *  variant="full"   : scène complète animée (éditeur, fenêtre d'inspiration)
 *  variant="export" : scène complète animée, animations forcées (captures des exports)
 *  variant="scene"  : scène complète figée, recadrable (cartes de galerie)
 *  variant="thumb"  : personnage seul, figé, recadré sur `crop` (aperçus de l'éditeur)
 *  layers           : { background, plank } à false pour un export à fond transparent
 *  forceMotion      : joue les animations même si le système demande de les réduire
 *
 * Attributs data-* lus par avatar.css :
 *  data-activity  code | think | nod | shake | laugh | celebrate | dance | chill | sleep | wave
 *  data-state     "hello" uniquement pour l'activité « coucou » (bras levé et bulle), sinon "code"
 *  data-motion    "full" force les animations malgré « réduire les animations »
 */

const aspectOf = (crop) => {
  const [, , w, h] = crop.split(/\s+/).map(Number);
  return w && h ? w / h : 1;
};

function Arm({ outfit, color, skin, theme }) {
  const sleeve = Sleeve({ kind: outfit, color, skin });
  return (
    <g className="av-arm">
      {sleeve.under}
      {/* main ouverte, paume vers nous, pouce côté tête */}
      <g className="av-hand">
        <g fill="none" stroke={skin.face} strokeLinecap="round">
          <path d="M329 230 L325 200" strokeWidth="8.5" />
          <path d="M338 227 L338 192" strokeWidth="8.5" />
          <path d="M347 229 L351 198" strokeWidth="8.5" />
          <path d="M355 234 L361 211" strokeWidth="8" />
          <path d="M325 250 Q311 246 308 231" strokeWidth="9" />
        </g>
        <rect x="322" y="224" width="38" height="44" rx="15" fill={skin.face} />
        <path d="M330 248 Q339 254 350 247" fill="none" stroke={skin.line} strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {sleeve.over}
      <path className="av-wsp" d="M374 206 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill={theme.a} />
      <path className="av-wsp" style={{ animationDelay: ".7s" }} d="M356 176 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill={theme.b} />
      <path className="av-wsp" style={{ animationDelay: "1.2s" }} d="M318 186 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" fill={theme.a} />
    </g>
  );
}

const Avatar = forwardRef(function Avatar(
  { config, variant = "full", crop, forceMotion = false, layers, label = "Avatar animé" },
  ref
) {
  const live = variant === "full" || variant === "export";
  const showScene = variant !== "thumb";
  const showBackground = layers?.background !== false;
  const showPlank = layers?.plank !== false;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `av-grid-${uid}`;
  const lensId = `av-lens-${uid}`;
  const cableId = `av-cable-${uid}`;
  const cutId = `av-cut-${uid}`;

  // ── Valeurs dérivées de la configuration ──────────────────────────────────
  const skin = byId("skin", config.skin);
  const tone = hairTones(byId("hairColor", config.hairColor).color);
  const eyeColor = byId("eyes", config.eyes).color;
  const theme = byId("theme", config.theme);
  const frameColor = byId("frame", config.frame).color;
  const outfitColor = byId("outfitColor", config.outfitColor).color;
  const headColor = config.headColor === "auto" ? outfitColor : byId("headColor", config.headColor).color;
  const build = byId("build", config.build).scale;
  const tempo = byId("tempo", config.tempo).value;
  const lip = config.faceArt === "rouge" ? "#C2334D" : undefined;
  const fx = config.effect !== "aucun" ? config.effect : config.activity === "celebrate" ? "confettis" : null;
  const hello = config.activity === "wave";
  const hasHat = config.headwear === "casquette" || config.headwear === "bonnet";

  // Hors écran : animations en pause (voir avatar.css)
  const svgRef = useRef(null);
  const setRefs = useCallback(
    (el) => {
      svgRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );
  useEffect(() => {
    const el = svgRef.current;
    if (variant !== "full" || !el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  return (
    <svg
      ref={setRefs}
      className="avatar"
      data-state={hello ? "hello" : "code"}
      data-activity={config.activity}
      data-motion={forceMotion || variant === "export" ? "full" : undefined}
      data-static={live ? undefined : "true"}
      style={{ "--tempo": tempo, ...(crop ? { aspectRatio: aspectOf(crop) } : null) }}
      viewBox={crop ?? "0 0 400 400"}
      width="400"
      height="400"
      role={variant === "full" ? "img" : undefined}
      aria-label={variant === "full" ? label : undefined}
      aria-hidden={variant === "full" ? undefined : "true"}
    >
      <defs>
        <WallPattern id={gridId} theme={theme} />
        <LensClip id={lensId} kind={config.glasses} />
        <clipPath id={cableId}><rect x="0" y="0" width="400" height="366" /></clipPath>
        <clipPath id={cutId}><rect x="-40" y="-40" width="480" height="406" /></clipPath>
      </defs>

      {showScene && (
        <>
          {showBackground && <Background theme={theme} patternId={gridId} />}
          <Orbit theme={theme} />
          <WallItem kind={config.wall} theme={theme} />
          <CardItem kind={CARD_BY_CATEGORY[config.category] ?? "rien"} theme={theme} />
          <Floaters kind={FLOATERS_BY_CATEGORY[config.category] ?? "etoiles"} theme={theme} />
          <g className="av-music">
            <g transform="translate(72 232)"><g className="av-mnote"><circle r="3.6" fill={theme.a} /><path d="M3.2 0 V-15 q6 2 7 8" fill="none" stroke={theme.a} strokeWidth="2.3" strokeLinecap="round" /></g></g>
            <g transform="translate(56 262)"><g className="av-mnote av-mnote--b"><circle r="3.6" fill={theme.b} /><path d="M3.2 0 V-15 q6 2 7 8" fill="none" stroke={theme.b} strokeWidth="2.3" strokeLinecap="round" /></g></g>
          </g>
          {/* l'idée et les effets passent DERRIÈRE le personnage : ils ne cachent ni le visage ni les chapeaux */}
          {live && <Idea />}
          {fx && <Effects kind={fx} />}
          {showPlank && <Desk theme={theme} />}
        </>
      )}

      {/* personnage */}
      <g clipPath={showScene && showPlank ? `url(#${cutId})` : undefined}>
        <g className="av-pose"><g className="av-hairback"><HairBack style={config.hair} tone={tone} /></g></g>

        {/* buste : respiration + petites secousses de frappe */}
        <g className="av-breathe">
          <g className="av-typing">
            <g transform={`translate(200 0) scale(${build} 1) translate(-200 0)`}>
              <Torso kind={config.outfit} color={outfitColor} skin={skin} />
              <Neck kind={config.neck} color={headColor} />
            </g>
          </g>
        </g>

        {live && hello && <Arm outfit={config.outfit} color={outfitColor} skin={skin} theme={theme} />}
      </g>

      {/* tête */}
      <g className="av-pose">
        <g className="av-head">
          <Ears skin={skin} />
          <FaceBase skin={skin} shape={config.face} freckles={config.freckles} />
          <FaceArt kind={config.faceArt} skin={skin} />
          <FacialHair kind={config.facialHair} tone={tone} />
          <Mouth skin={skin} expression={config.expression} lip={lip} />
          <Brows tone={tone} expression={config.expression} />
          <Eyes color={eyeColor} expression={config.expression} skin={skin} />
          <Glasses kind={config.glasses} color={frameColor} lensId={lensId} />
          <HairFront style={config.hair} tone={tone} shade={skin.shade} tie={theme.b} hideTop={hasHat} />
          <Earrings kind={config.earrings} />
          <Headwear kind={config.headwear} color={headColor} />
          <g clipPath={showScene ? `url(#${cableId})` : undefined}>
            <Audio kind={config.earphones} accent={theme.a} />
          </g>
        </g>
      </g>

      {/* tasse et objet du bureau : au premier plan, devant l'épaule */}
      {showScene && showPlank && <Mug theme={theme} />}
      {showScene && <DeskItem kind={config.desk} theme={theme} />}
      {showScene && config.activity === "sleep" && <Zzz />}
      {live && hello && <Bubble text="Coucou !" />}
    </svg>
  );
});

export default memo(Avatar);
