import { useMemo, useState } from "react";
import { CATEGORIES } from "../avatar/catalog";
import { lum } from "../avatar/color";
import Heart from "../components/Heart";
import InspirationCard from "../components/InspirationCard";
import InspirationModal from "../components/InspirationModal";
import { COLLECTIONS } from "../data/collections";
import { ALL, resolveInspiration } from "../data/inspirations";

const EMPTY = { collection: null, category: null, favorites: false };

export default function Gallery({ favorites, isFavorite, onToggleFavorite, onCreate, onQuickStart }) {
  const [filters, setFilters] = useState(EMPTY);
  const [open, setOpen] = useState(null);

  const items = useMemo(() => {
    const base = filters.favorites ? favorites.map(resolveInspiration).filter(Boolean) : ALL;
    return base.filter(
      (i) => (!filters.collection || i.collection === filters.collection) && (!filters.category || i.config.category === filters.category)
    );
  }, [filters, favorites]);

  const toggle = (key, value) => setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));
  const active = filters.collection || filters.category || filters.favorites;
  const noFavorites = filters.favorites && !favorites.length;

  return (
    <div className="gallery">
      <section className="hero">
        <h1>Trouve ton <em>endrika</em>.</h1>
        <p className="hero__lead">Crée un avatar animé qui te ressemble, quel que soit ton métier, tes études ou ta passion. Inspire-toi, personnalise chaque détail, puis télécharge-le.</p>
        <div className="starters" role="group" aria-label="Commencer avec un univers">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" className="starter" style={{ "--tint": c.tint }} onClick={() => onQuickStart(c.id)}>
              <span className="starter__title">{c.label}</span>
              <span className="starter__blurb">{c.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="explore-title" className="explore">
        <h2 id="explore-title" className="visually-hidden">Explorer les inspirations</h2>

        <div className="collections" role="group" aria-label="Collections">
          {COLLECTIONS.map((c) => (
            <button key={c.id} type="button" className="collection" aria-pressed={filters.collection === c.id} style={{ "--tint": c.tint, color: lum(c.tint) < 0.4 ? "#fff" : undefined }} onClick={() => toggle("collection", c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="filters">
          <div className="filter" role="group" aria-label="Catégorie d'avatar">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="chip chip--sm" aria-pressed={filters.category === c.id} onClick={() => toggle("category", c.id)}>{c.label}</button>
            ))}
          </div>
          <div className="filter filter--end">
            <button type="button" className="chip chip--sm" aria-pressed={filters.favorites} onClick={() => setFilters((f) => ({ ...f, favorites: !f.favorites }))}><Heart /> Favoris{favorites.length ? ` (${favorites.length})` : ""}</button>
            {active && <button type="button" className="linkbtn" onClick={() => setFilters(EMPTY)}>Tout effacer</button>}
          </div>
        </div>

        <p className="count" role="status" aria-live="polite">{items.length} inspiration{items.length > 1 ? "s" : ""}</p>

        {items.length ? (
          <div className="masonry">
            {items.map((item) => (
              <InspirationCard key={item.id} item={item} favorite={isFavorite(item.id)} onToggleFavorite={onToggleFavorite} onOpen={setOpen} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>{noFavorites ? "Aucun favori pour l'instant" : "Rien ne correspond à ces filtres"}</h3>
            <p>{noFavorites ? "Touche le cœur d'une inspiration pour la retrouver ici." : "Essaie d'enlever un filtre."}</p>
            {active && <button type="button" className="btn" onClick={() => setFilters(EMPTY)}>Réinitialiser les filtres</button>}
          </div>
        )}
      </section>

      {open && (
        <InspirationModal item={open} favorite={isFavorite(open.id)} onToggleFavorite={onToggleFavorite} onClose={() => setOpen(null)} onCreate={onCreate} />
      )}
    </div>
  );
}
