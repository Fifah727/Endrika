import { forwardRef, memo, useCallback, useEffect, useId, useRef, useState } from "react";
import "../styles/avatar.css";
import { byId } from "./catalog";
import { hairTones } from "./color";
import { Audio, Earrings, Headwear } from "./parts/Accessories";
import { Brows, Ears, Eyes, FaceBase, FacialHair, Mouth } from "./parts/Face";
import { Glasses, LensClip } from "./parts/Glasses";
import { HairBack, HairFront } from "./parts/Hair";
import { Sleeve, Torso } from "./parts/Outfit";
import { Backdrop, Bubble, Desk, Idea, Laptop } from "./parts/Scene";

/**
 * Avatar animé, entièrement piloté par `config` (voir catalog.js).
 *
 *  variant="full"  : scène complète, interactive (survol, tap, clic)
 *  variant="thumb" : personnage seul, figé, recadré sur `crop` (aperçus de l'interface)
 *
 * États (attributs data-* lus par avatar.css) :
 *  data-state    "code" | "hello"   hello = survol, tap ou activité « coucou »
 *  data-activity "code" | "dance" | "chill" | "wave"
 *  data-wink     clic : clin d'œil
 *  data-motion   "full" force les animations malgré « réduire les animations »
 */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

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
  { config, variant = "full", crop, forceMotion = false, onStateChange, label = "Avatar animé" },
  ref
) {
  const live = variant === "full";
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `av-grid-${uid}`;
  const lensId = `av-lens-${uid}`;
  const cableId = `av-cable-${uid}`;

  // ── Valeurs dérivées de la configuration ──────────────────────────────────
  const skin = byId("skin", config.skin);
  const tone = hairTones(byId("hairColor", config.hairColor).color);
  const eyeColor = byId("eyes", config.eyes).color;
  const theme = byId("theme", config.theme);
  const frameColor = byId("frame", config.frame).color;
  const headColor = byId("headColor", config.headColor).color;
  const outfitColor = byId("outfitColor", config.outfitColor).color;
  const build = byId("build", config.build).scale;
  const tempo = byId("tempo", config.tempo).value;
  const texts = byId("message", config.message).texts;
  const textsKey = texts.join("|");

  // ── Interactions ──────────────────────────────────────────────────────────
  const svgRef = useRef(null);
  const [hello, setHello] = useState(false);
  const [wink, setWink] = useState(false);
  const [msg, setMsg] = useState(texts[0] ?? "");

  const msgIndex = useRef(0);
  const touched = useRef(false);
  const helloRef = useRef(false);
  const tapTimer = useRef(0);
  const winkTimer = useRef(0);
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
    if (!live || !el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  const wave = config.activity === "wave";
  const isHello = wave || hello;
  useEffect(() => {
    if (live && onStateChange) onStateChange(isHello ? "hello" : "code");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHello]);

  // Salut d'accueil, une seule fois (annulé si on touche l'avatar avant)
  useEffect(() => {
    if (!live || !config.intro) return undefined;
    const a = setTimeout(() => !touched.current && show(), 900);
    const b = setTimeout(() => !touched.current && hide(), 4300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, config.intro]);

  useEffect(
    () => () => {
      clearTimeout(tapTimer.current);
      clearTimeout(winkTimer.current);
      cancelAnimationFrame(raf.current);
    },
    []
  );

  // Si on désactive la réaction au survol, on retombe tout de suite en état « code »
  useEffect(() => {
    if (!config.hover && helloRef.current) hide();
  }, [config.hover]);

  const onEnter = (e) => {
    if (!config.hover || e.pointerType === "touch") return;
    touched.current = true;
    show();
  };
  const onLeave = (e) => {
    if (!config.hover || e.pointerType === "touch") return;
    hide();
  };
  const onDown = (e) => {
    touched.current = true;
    if (config.hover && e.pointerType === "touch") {
      show();
      clearTimeout(tapTimer.current);
      tapTimer.current = setTimeout(hide, 3500);
    }
  };
  // Les yeux et la tête suivent le curseur
  const onMove = (e) => {
    if (!config.hover || e.pointerType === "touch") return;
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
  const onClick = () => {
    setWink(true);
    clearTimeout(winkTimer.current);
    winkTimer.current = setTimeout(() => setWink(false), 700);
  };

  // ── Rendu ─────────────────────────────────────────────────────────────────
  const hasHat = config.headwear === "casquette" || config.headwear === "bonnet";
  const handlers = live
    ? { onPointerEnter: onEnter, onPointerLeave: onLeave, onPointerDown: onDown, onPointerMove: onMove, onClick }
    : {};
  const showBubble = live && texts.length > 0;

  return (
    <svg
      ref={setRefs}
      className="avatar"
      data-state={isHello ? "hello" : "code"}
      data-activity={config.activity}
      data-wink={wink ? "true" : "false"}
      data-motion={forceMotion ? "full" : undefined}
      data-static={live ? undefined : "true"}
      style={{ "--tempo": tempo }}
      viewBox={crop ?? "0 0 400 400"}
      width="400"
      height="400"
      role={live ? "img" : undefined}
      aria-label={live ? label : undefined}
      aria-hidden={live ? undefined : "true"}
      {...handlers}
    >
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill={theme.dot} opacity=".45" />
        </pattern>
        <LensClip id={lensId} kind={config.glasses} />
        <clipPath id={cableId}>
          <rect x="0" y="0" width="400" height="366" />
        </clipPath>
      </defs>

      {live && <Backdrop theme={theme} gridId={gridId} show={config} />}

      {/* cheveux arrière */}
      <g className="av-pose">
        <g className="av-hairback">
          <HairBack style={config.hair} tone={tone} />
        </g>
      </g>

      {/* buste : respiration + petites secousses de frappe */}
      <g className="av-breathe">
        <g className="av-typing">
          <g transform={`translate(200 0) scale(${build} 1) translate(-200 0)`}>
            <Torso kind={config.outfit} color={outfitColor} skin={skin} />
          </g>
        </g>
      </g>

      {live && <Arm outfit={config.outfit} color={outfitColor} skin={skin} theme={theme} />}
      {live && <Desk theme={theme} mug={config.mug} />}

      {/* tête */}
      <g className="av-pose">
        <g className="av-head">
          <Ears skin={skin} />
          <FaceBase skin={skin} shape={config.face} freckles={config.freckles} />
          <FacialHair kind={config.facialHair} tone={tone} />
          <Mouth skin={skin} />
          <Brows tone={tone} />
          <Eyes color={eyeColor} />
          <Glasses kind={config.glasses} color={frameColor} lensId={lensId} />
          <HairFront style={config.hair} tone={tone} shade={skin.shade} tie={theme.b} hideTop={hasHat} />
          <Earrings kind={config.earrings} />
          <Headwear kind={config.headwear} color={headColor} />
          <g clipPath={live ? `url(#${cableId})` : undefined}>
            <Audio kind={config.earphones} accent={theme.a} />
          </g>
        </g>
      </g>

      {live && config.laptop && <Laptop theme={theme} />}
      {live && <Idea />}
      {live && <path className="av-pop" d="M296 160 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={theme.a} />}
      {showBubble && <Bubble text={msg} />}
    </svg>
  );
});

export default memo(Avatar);
