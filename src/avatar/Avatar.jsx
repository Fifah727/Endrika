import { forwardRef, memo, useCallback, useEffect, useId, useRef, useState } from "react";
import "../styles/avatar.css";
import { CARD_BY_CATEGORY, FLOATERS_BY_CATEGORY, GREETINGS, byId } from "./catalog";
import { hairTones } from "./color";
import { Audio, Earrings, Headwear, Neck } from "./parts/Accessories";
import { Background, CardItem, Effects, Floaters, Orbit, WallItem, WallPattern } from "./parts/Decor";
import DeskItem from "./parts/DeskItems";
import { Brows, Ears, Eyes, FaceArt, FaceBase, FacialHair, Mouth } from "./parts/Face";
import { Glasses, LensClip } from "./parts/Glasses";
import { HairBack, HairFront } from "./parts/Hair";
import { Sleeve, Torso } from "./parts/Outfit";
import { Bubble, Desk, Idea } from "./parts/Scene";

/**
 * Avatar animé, entièrement piloté par `config` (voir catalog.js).
 *
 *  variant="full"   : scène complète, animée et interactive (survol, tap, clic)
 *  variant="export"  : scène complète animée, sans interaction, animations forcées (captures et exports)
 *  variant="preview" : scène animée, sans interaction, respecte « réduire les animations » (survol des cartes)
 *  variant="scene"  : scène complète figée, recadrable (cartes de galerie)
 *  variant="thumb"  : personnage seul, figé, recadré sur `crop` (aperçus de l'éditeur)
 *  layers           : { background, plank } à false pour un export à fond transparent
 *
 * États (attributs data-* lus par avatar.css) :
 *  data-state    "code" | "hello"   hello = survol, tap ou activité « coucou »
 *  data-activity "code" | "dance" | "chill" | "wave"
 *  data-motion   "full" force les animations malgré « réduire les animations »
 */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
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
  { config, variant = "full", crop, forceMotion = false, onStateChange, layers, label = "Avatar animé" },
  ref
) {
  const live = variant === "full" || variant === "export" || variant === "preview";
  const interactive = variant === "full";
  const showScene = variant !== "thumb";
  const showBackground = layers?.background !== false;
  const showPlank = layers?.plank !== false;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `av-grid-${uid}`;
  const cutId = `av-cut-${uid}`;
  const lensId = `av-lens-${uid}`;
  const cableId = `av-cable-${uid}`;

  // ── Valeurs dérivées de la configuration ──────────────────────────────────
  const skin = byId("skin", config.skin);
  const tone = hairTones(byId("hairColor", config.hairColor).color);
  const eyeColor = byId("eyes", config.eyes).color;
  const theme = byId("theme", config.theme);
  const lip = config.faceArt === "rouge" ? "#C2334D" : undefined;
  const fx = config.effect !== "aucun" ? config.effect : config.activity === "celebrate" ? "confettis" : null;
  const frameColor = byId("frame", config.frame).color;
  const outfitColor = byId("outfitColor", config.outfitColor).color;
  const headColor = config.headColor === "auto" ? outfitColor : byId("headColor", config.headColor).color;
  const build = byId("build", config.build).scale;
  const tempo = byId("tempo", config.tempo).value;
  const texts = GREETINGS;
  const textsKey = texts.join("|");

  // ── Interactions ──────────────────────────────────────────────────────────
  const svgRef = useRef(null);
  const [hello, setHello] = useState(false);
  const [msg, setMsg] = useState(texts[0] ?? "");

  const msgIndex = useRef(0);
  const touched = useRef(false);
  const helloRef = useRef(false);
  const tapTimer = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const setRefs = useCallback(
    (el) => {
      svgRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );

  // Quand on change de message, on repart du premier
  useEffect(() => {
    msgIndex.current = 0;
    setMsg(texts[0] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textsKey]);

  const show = () => {
    if (!helloRef.current && texts.length) {
      setMsg(texts[msgIndex.current % texts.length]);
      msgIndex.current += 1;
    }
    helloRef.current = true;
    setHello(true);
  };
  const hide = () => {
    helloRef.current = false;
    setHello(false);
    const el = svgRef.current;
    if (el) {
      el.style.setProperty("--nx", "0");
      el.style.setProperty("--ny", "0");
    }
  };

  // Hors écran : animations en pause (voir avatar.css)
  useEffect(() => {
    const el = svgRef.current;
    if (!interactive || !el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, [interactive]);

  const wave = config.activity === "wave" || config.activity === "celebrate";
  const isHello = wave || hello;
  useEffect(() => {
    if (interactive && onStateChange) onStateChange(isHello ? "hello" : "code");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHello]);

  // Salut d'accueil, une seule fois (annulé si on touche l'avatar avant)
  useEffect(() => {
    if (!interactive) return undefined;
    const a = setTimeout(() => !touched.current && show(), 900);
    const b = setTimeout(() => !touched.current && hide(), 4300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  useEffect(
    () => () => {
      clearTimeout(tapTimer.current);
      cancelAnimationFrame(raf.current);
    },
    []
  );

  const onEnter = (e) => {
    if (e.pointerType === "touch") return;
    touched.current = true;
    show();
  };
  const onLeave = (e) => {
    if (e.pointerType === "touch") return;
    hide();
  };
  const onDown = (e) => {
    touched.current = true;
    if (e.pointerType === "touch") {
      show();
      clearTimeout(tapTimer.current);
      tapTimer.current = setTimeout(hide, 3500);
    }
  };
  // Les yeux et la tête suivent le curseur
  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    pointer.current.x = e.clientX;
    pointer.current.y = e.clientY;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = clamp((pointer.current.x - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
      const ny = clamp((pointer.current.y - (r.top + r.height * 0.45)) / (r.height / 2), -1, 1);
      el.style.setProperty("--nx", nx.toFixed(3));
      el.style.setProperty("--ny", ny.toFixed(3));
    });
  };
  // ── Rendu ─────────────────────────────────────────────────────────────────
  const hasHat = config.headwear === "casquette" || config.headwear === "bonnet";
  const handlers = interactive
    ? { onPointerEnter: onEnter, onPointerLeave: onLeave, onPointerDown: onDown, onPointerMove: onMove }
    : {};
  const showBubble = live && texts.length > 0;

  return (
    <svg
      ref={setRefs}
      className="avatar"
      data-state={isHello ? "hello" : "code"}
      data-activity={config.activity}
      data-motion={forceMotion || variant === "export" ? "full" : undefined}
      data-static={live ? undefined : "true"}
      style={{ "--tempo": tempo, ...(crop ? { aspectRatio: aspectOf(crop) } : null) }}
      viewBox={crop ?? "0 0 400 400"}
      width="400"
      height="400"
      role={interactive ? "img" : undefined}
      aria-label={interactive ? label : undefined}
      aria-hidden={interactive ? undefined : "true"}
      {...handlers}
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
          {showPlank && <Desk theme={theme} mug />}
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

        {live && <Arm outfit={config.outfit} color={outfitColor} skin={skin} theme={theme} />}
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

      {showScene && <DeskItem kind={config.desk} theme={theme} />}
      {showBubble && <Bubble text={msg} />}
    </svg>
  );
});

export default memo(Avatar);
