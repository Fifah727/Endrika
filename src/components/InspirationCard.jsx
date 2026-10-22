import { memo, useEffect, useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import Heart from "./Heart";
import { COLLECTIONS } from "../data/collections";
import { RATIOS } from "../data/inspirations";

/** Carte de galerie : image figée, animée au survol ; ne se dessine qu'à l'approche de l'écran. */
function InspirationCard({ item, favorite, onToggleFavorite, onOpen }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(false);
  const col = COLLECTIONS.find((c) => c.id === item.collection);
  const crop = RATIOS[item.ratio] ?? RATIOS.portrait;
  const [, , w, h] = crop.split(" ").map(Number);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article className="icard" ref={ref} style={{ "--tint": col?.tint ?? "#eee" }}>
      <button
        type="button"
        className="icard__art"
        onClick={() => onOpen(item)}
        onPointerEnter={(e) => e.pointerType !== "touch" && setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{ aspectRatio: `${w} / ${h}` }}
        aria-label={`Ouvrir l'inspiration « ${item.title} »`}
      >
        {seen ? <Avatar config={item.config} variant={active ? "preview" : "scene"} crop={crop} /> : <span className="skeleton" />}
        <span className="icard__veil" aria-hidden="true">Voir</span>
      </button>
      <button type="button" className="icard__fav" aria-pressed={favorite} aria-label={favorite ? `Retirer « ${item.title} » des favoris` : `Ajouter « ${item.title} » aux favoris`} onClick={() => onToggleFavorite(item.id)}>
        <Heart filled={favorite} size={20} />
      </button>
      <div className="icard__meta">
        <h3>{item.title}</h3>
        <p>{col?.label}</p>
      </div>
    </article>
  );
}

export default memo(InspirationCard);
