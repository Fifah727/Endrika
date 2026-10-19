import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import Avatar from "../../avatar/Avatar";
import avatarCss from "../../styles/avatar.css?raw";

// ══════════════════════════════════════════════════════════════════════════
//  EXPORTS RÉELS : PNG, GIF, MP4 et SVG animé.
//  Principe : on rend l'avatar hors écran, on fige ses animations CSS (Web Animations
//  API) à des instants précis, on photographie chaque instant en SVG statique, puis
//  on l'encode. Aucun serveur : tout se passe dans le navigateur.
// ══════════════════════════════════════════════════════════════════════════

const XMLNS = "http://www.w3.org/2000/svg";

export class ExportError extends Error {}

const tick = () => new Promise((r) => setTimeout(r, 0));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

/** Rend l'avatar dans un conteneur invisible. */
function mountOffscreen(config, layers) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  Object.assign(host.style, { position: "fixed", left: "-10000px", top: "0", width: "400px", height: "400px", visibility: "hidden", pointerEvents: "none" });
  document.body.appendChild(host);
  const root = createRoot(host);
  flushSync(() => root.render(createElement(Avatar, { config, variant: "export", layers })));
  const svg = host.querySelector("svg");
  return {
    svg,
    dispose() {
      root.unmount();
      host.remove();
    },
  };
}

const layersFor = (bg) => (bg === "scene" ? undefined : { background: false, plank: false });

/** Prépare un SVG autonome (CSS embarqué) prêt à être sérialisé. */
function standaloneClone(svg, { size, bg, color, animated }) {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", XMLNS);
  clone.removeAttribute("data-offscreen");
  clone.removeAttribute("aria-hidden");
  clone.setAttribute("width", String(size));
  clone.setAttribute("height", String(size));
  clone.style.aspectRatio = "";
  if (!animated) clone.setAttribute("data-static", "true");
  else clone.removeAttribute("data-motion"); // le fichier respecte « réduire les animations »
  if (bg === "color") {
    const rect = document.createElementNS(XMLNS, "rect");
    rect.setAttribute("width", "400");
    rect.setAttribute("height", "400");
    rect.setAttribute("fill", color);
    clone.insertBefore(rect, clone.firstChild);
  }
  return clone;
}

const withStyle = (clone) => {
  const style = document.createElementNS(XMLNS, "style");
  style.textContent = avatarCss;
  clone.insertBefore(style, clone.firstChild);
  return clone;
};

const serialize = (node) => new XMLSerializer().serializeToString(node);

// ── Échantillonnage des animations ───────────────────────────────────────────
/**
 * Crée un « photographe » : renderFrame(i) renvoie un canvas de l'avatar à l'instant i.
 * Les animations infinies sont ajustées pour que la boucle soit parfaite sur `duration`.
 */
async function createRenderer(config, { size, bg, color, duration, fps, frames }) {
  const mount = mountOffscreen(config, layersFor(bg));
  const { svg } = mount;
  if (!svg) {
    mount.dispose();
    throw new ExportError("Impossible de préparer l'avatar pour l'export.");
  }
  await nextFrame();
  svg.getBoundingClientRect(); // force le calcul des styles : les animations existent

  const loopMs = duration * 1000;
  const anims = typeof svg.getAnimations === "function" ? svg.getAnimations({ subtree: true }) : [];
  const live = [];
  for (const a of anims) {
    const target = a.effect?.target;
    if (!target || !target.isConnected) continue;
    const t = a.effect.getTiming();
    const d = Number(t.duration);
    let freeze = false;
    if (Number.isFinite(d) && d > 0 && t.iterations === Infinity) {
      if (d > loopMs * 2) freeze = true; // trop lent pour boucler (orbite…) : on la fige
      else {
        const n = Math.max(1, Math.round(loopMs / d));
        const nd = loopMs / n;
        let delay = ((Number(t.delay) || 0) % nd + nd) % nd;
        if (delay > 0) delay -= nd;
        a.effect.updateTiming({ duration: nd, delay, endDelay: 0 });
      }
    }
    a.pause();
    live.push({ a, target, freeze });
  }

  const all = Array.from(svg.querySelectorAll("*"));
  const index = new Map(all.map((e, i) => [e, i]));
  const targets = [...new Set(live.map((l) => l.target))].filter((t) => index.has(t));
  const template = standaloneClone(svg, { size, bg, color, animated: false });
  const hasBgRect = bg === "color";
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const renderAt = async (ms) => {
    for (const l of live) l.a.currentTime = l.freeze ? 0 : ms;
    const snapshot = targets.map((el) => {
      const cs = getComputedStyle(el);
      return [index.get(el), cs.transform, cs.opacity, cs.strokeDashoffset];
    });
    const clone = template.cloneNode(true);
    const els = clone.querySelectorAll("*");
    const shift = hasBgRect ? 1 : 0; // le rectangle de fond décale les indices
    for (const [i, transform, opacity, dash] of snapshot) {
      const el = els[i + shift];
      if (!el) continue;
      if (transform && transform !== "none") el.style.transform = transform;
      el.style.opacity = opacity;
      if (dash && dash !== "auto") el.style.strokeDashoffset = dash;
    }
    const xml = serialize(withStyle(clone));
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
    try {
      await img.decode();
    } catch {
      throw new ExportError("Ce navigateur n'a pas réussi à dessiner l'image.");
    }
    ctx.clearRect(0, 0, size, size);
    if (bg === "scene" || bg === "color") {
      ctx.fillStyle = bg === "color" ? color : "#ffffff";
      ctx.fillRect(0, 0, size, size);
    }
    ctx.drawImage(img, 0, 0, size, size);
    return canvas;
  };

  return {
    canvas,
    count: frames,
    renderFrame: (i) => renderAt((i / fps) * 1000),
    renderPoster: () => renderAt(loopMs * 0.22),
    dispose: () => mount.dispose(),
  };
}

const fileBase = (config) => `endrika-${config.hair}-${config.outfit}`;
const toBlob = (canvas, type) =>
  new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new ExportError("Création du fichier impossible."))), type));

const checkAbort = (signal) => {
  if (signal?.aborted) throw new ExportError("Export annulé.");
};

// ── PNG ──────────────────────────────────────────────────────────────────────
export async function exportPng(config, o, { onProgress } = {}) {
  onProgress?.(0.1, "Préparation…");
  const r = await createRenderer(config, { ...o, frames: 1, fps: 24, duration: 6 });
  try {
    onProgress?.(0.5, "Dessin de l'image…");
    const canvas = await r.renderPoster();
    const blob = await toBlob(canvas, "image/png");
    return { blob, filename: `${fileBase(config)}.png`, width: o.size, height: o.size, mime: "image/png" };
  } finally {
    r.dispose();
  }
}

// ── SVG animé ────────────────────────────────────────────────────────────────
export async function exportSvg(config, o) {
  const mount = mountOffscreen(config, layersFor(o.bg));
  try {
    await nextFrame();
    const clone = withStyle(standaloneClone(mount.svg, { size: 800, bg: o.bg, color: o.color, animated: true }));
    const text = serialize(clone);
    const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
    return { blob, filename: `${fileBase(config)}-anime.svg`, width: 800, height: 800, mime: "image/svg+xml" };
  } finally {
    mount.dispose();
  }
}

// ── GIF ──────────────────────────────────────────────────────────────────────
export async function exportGif(config, o, { onProgress, signal } = {}) {
  onProgress?.(0.02, "Chargement de l'encodeur GIF…");
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  const frames = Math.max(2, Math.round(o.duration * o.fps));
  const r = await createRenderer(config, { ...o, frames });
  try {
    const transparent = o.bg === "transparent";
    const format = transparent ? "rgba4444" : "rgb565";
    const size = o.size;
    const grab = async (i) => {
      const canvas = await r.renderFrame(i);
      return r.canvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, size, size).data;
    };

    // Palette commune calculée sur trois images : pas de scintillement entre les images.
    onProgress?.(0.05, "Choix des couleurs…");
    const picks = [0, Math.floor(frames / 3), Math.floor((2 * frames) / 3)];
    const parts = [];
    for (const i of picks) parts.push(new Uint8ClampedArray(await grab(i)));
    const sample = new Uint8ClampedArray(parts.reduce((n, p) => n + p.length, 0));
    let off = 0;
    for (const p of parts) {
      sample.set(p, off);
      off += p.length;
    }
    const palette = quantize(sample, 256, transparent ? { format, oneBitAlpha: true } : { format });
    const transparentIndex = transparent ? Math.max(0, palette.findIndex((c) => c[3] === 0)) : -1;

    const gif = GIFEncoder();
    const delay = Math.round(1000 / o.fps);
    for (let i = 0; i < frames; i++) {
      checkAbort(signal);
      const data = await grab(i);
      const index = applyPalette(data, palette, format);
      gif.writeFrame(index, size, size, {
        palette: i === 0 ? palette : undefined,
        delay,
        repeat: 0,
        transparent,
        transparentIndex: transparent ? transparentIndex : 0,
        dispose: transparent ? 2 : -1,
      });
      onProgress?.(0.1 + 0.88 * ((i + 1) / frames), `Image ${i + 1} / ${frames}`);
      if (i % 3 === 2) await tick();
    }
    gif.finish();
    const blob = new Blob([gif.bytes()], { type: "image/gif" });
    return { blob, filename: `${fileBase(config)}.gif`, width: size, height: size, mime: "image/gif" };
  } finally {
    r.dispose();
  }
}

// ── MP4 (H.264 via WebCodecs) ────────────────────────────────────────────────
export const canEncodeMp4 = () => typeof window !== "undefined" && typeof window.VideoEncoder === "function" && typeof window.VideoFrame === "function";

export async function exportMp4(config, o, { onProgress, signal } = {}) {
  if (!canEncodeMp4()) {
    throw new ExportError("Ce navigateur ne peut pas encoder de MP4 (WebCodecs). Essaie Chrome, Edge ou Safari récent, ou exporte en GIF.");
  }
  onProgress?.(0.02, "Chargement de l'encodeur MP4…");
  const { ArrayBufferTarget, Muxer } = await import("mp4-muxer");
  const size = o.size - (o.size % 2);
  const frames = Math.max(2, Math.round(o.duration * o.fps));
  const bitrate = o.quality === "max" ? 12_000_000 : o.quality === "eco" ? 2_000_000 : 5_000_000;

  let config264 = null;
  for (const codec of ["avc1.640028", "avc1.4D0028", "avc1.42E028", "avc1.42001F"]) {
    try {
      const s = await VideoEncoder.isConfigSupported({ codec, width: size, height: size, bitrate, framerate: o.fps });
      if (s.supported) {
        config264 = s.config;
        break;
      }
    } catch {
      /* codec suivant */
    }
  }
  if (!config264) throw new ExportError("Aucun encodeur H.264 disponible dans ce navigateur : exporte plutôt en GIF.");

  const r = await createRenderer(config, { ...o, size, bg: o.bg === "transparent" ? "scene" : o.bg, frames });
  let failure = null;
  try {
    const muxer = new Muxer({ target: new ArrayBufferTarget(), video: { codec: "avc", width: size, height: size }, fastStart: "in-memory" });
    const encoder = new VideoEncoder({ output: (chunk, meta) => muxer.addVideoChunk(chunk, meta), error: (e) => { failure = e; } });
    encoder.configure(config264);

    const loops = Math.max(1, o.loops ?? 1);
    const cache = loops > 1 ? [] : null;
    const total = frames * loops;
    let k = 0;
    for (let l = 0; l < loops; l++) {
      for (let i = 0; i < frames; i++) {
        checkAbort(signal);
        if (failure) throw new ExportError(`L'encodage MP4 a échoué : ${failure.message}`);
        let source;
        if (l === 0) {
          const canvas = await r.renderFrame(i);
          source = cache ? await createImageBitmap(canvas) : canvas;
          if (cache) cache.push(source);
        } else source = cache[i];
        const frame = new VideoFrame(source, { timestamp: Math.round((k * 1e6) / o.fps), duration: Math.round(1e6 / o.fps) });
        encoder.encode(frame, { keyFrame: k % (o.fps * 2) === 0 });
        frame.close();
        k++;
        while (encoder.encodeQueueSize > 6) await tick();
        onProgress?.(0.05 + 0.9 * (k / total), `Image ${k} / ${total}`);
        if (k % 4 === 0) await tick();
      }
    }
    await encoder.flush();
    encoder.close();
    if (failure) throw new ExportError(`L'encodage MP4 a échoué : ${failure.message}`);
    muxer.finalize();
    cache?.forEach((b) => b.close?.());
    const blob = new Blob([muxer.target.buffer], { type: "video/mp4" });
    return { blob, filename: `${fileBase(config)}.mp4`, width: size, height: size, mime: "video/mp4" };
  } finally {
    r.dispose();
  }
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}
