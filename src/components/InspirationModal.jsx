import { useEffect, useRef } from "react";
import Avatar from "../avatar/Avatar";
import { byId } from "../avatar/catalog";
import { deriveTheme } from "../avatar/color";
import { COLLECTIONS } from "../data/collections";

const none = new Set(["aucun", "aucune", "rien"]);

/** Liste lisible des éléments d'une configuration. */
export function describe(c) {
  const label = (k) => byId(k, c[k]).label;
  const rows = [
    ["Univers", label("category")],
    ["Style", label("style")],
    ["Ambiance", label("theme")],
    ["Coiffure", `${label("hair")}, ${label("hairColor").toLowerCase()}`],
    ["Tenue", label("outfit")],
  ];
  const opt = (name, key) => !none.has(c[key]) && rows.push([name, label(key)]);
  opt("Objet", "desk");
  opt("Couvre-chef", "headwear");
  opt("Cou", "neck");
  opt("Lunettes", "glasses");
  opt("Audio", "earphones");
  opt("Effet", "effect");
  opt("Décor mural", "wall");
  return rows;
}

export function paletteOf(c) {
  const base = byId("theme", c.theme);
  const th = c.bgColor ? deriveTheme(base, c.bgColor) : base;
  return [th.wall, byId("outfitColor", c.outfitColor).color, byId("hairColor", c.hairColor).color, th.a, th.b, th.c];
}

export default function InspirationModal({ item, favorite, onToggleFavorite, onClose, onCreate }) {
  const closeRef = useRef(null);
  const col = COLLECTIONS.find((c) => c.id === item.collection);

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = [...document.querySelectorAll(".modal button, .modal [href], .modal input")].filter((n) => !n.disabled);
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        <div className="modal__stage"><Avatar config={item.config} variant="full" label={`Aperçu animé : ${item.title}`} /></div>
        <div className="modal__body">
          <p className="modal__kicker">{col?.emoji} {col?.label}{item.generated ? " · remix" : ""}</p>
          <h2 id="modal-title">{item.title}</h2>
          <p className="modal__note">{item.note}</p>
          <div className="swatchrow" aria-label="Palette de couleurs">
            {paletteOf(item.config).map((c, i) => <i key={i} style={{ background: c }} title={c} />)}
          </div>
          <ul className="facts">
            {describe(item.config).map(([k, v]) => <li key={k}><span>{k}</span>{v}</li>)}
          </ul>
          <div className="modal__actions">
            <button type="button" className="btn btn--primary" onClick={() => onCreate(item)}>Créer à partir de cette inspiration</button>
            <button type="button" className="btn" aria-pressed={favorite} onClick={() => onToggleFavorite(item.id)}>{favorite ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
