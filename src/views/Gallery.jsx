import { useMemo, useState } from "react";
import { CATEGORIES, STYLES } from "../avatar/catalog";
import { ALL, COLOR_BUCKETS, colorBucket, makeRemix, resolveInspiration } from "../data/inspirations";
import { COLLECTIONS } from "../data/collections";
import { lum } from "../avatar/color";
import InspirationCard from "../components/InspirationCard";
import InspirationModal from "../components/InspirationModal";

const EMPTY = { collection: null, category: null, color: null, style: null, favorites: false };

export default function Gallery({ favorites, isFavorite, onToggleFavorite, onCreate, onQuickStart }) {
  const [filters, setFilters] = useState(EMPTY);
  const [open, setOpen] = useState(null);
  const [remixes, setRemixes] = useState([]);

  const base = useMemo(() => {
    const favItems = favorites.map(resolveInspiration).filter(Boolean);
    return filters.favorites ? favItems : ALL;
  }, [filters.favorites, favorites]);

  const items = useMemo(
    () =>
      base.filter(
        (i) =>
          (!filters.collection || i.collection === filters.collection) &&
          (!filters.category || i.config.category === filters.category) &&
          (!filters.style || i.config.style === filters.style) &&
          (!filters.color || colorBucket(i.config) === filters.color)
      ),
    [base, filters]
  );

  const toggle = (key, value) => setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));
  const active = Object.entries(filters).some(([k, v]) => (k === "favorites" ? v : v !== null));

  const generate = () => {
    const seed = Math.floor(Math.random() * 1e9);
    const pool = filters.collection ? [filters.collection] : COLLECTIONS.map((c) => c.id);
    setRemixes(Array.from({ length: 8 }, (_, i) => makeRemix(seed + i * 7919, pool[(seed + i) % pool.length])));
  };

  const createFrom = (item) => onCreate(item);

  return (
    <div className="gallery">
      <section className="hero">
        <h1>Trouve ton <em>endrika</em>.</h1>
        <p className="hero__lead">Crée un avatar animé qui te ressemble, quel que soit ton métier, tes études ou ta passion. Inspire-toi, personnalise chaque détail, puis télécharge-le.</p>
        <div className="starters" role="group" aria-label="Commencer avec un univers">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" className="starter" onClick={() => onQuickStart(c.id)}>
              <span className="starter__emoji" aria-hidden="true">{c.emoji}</span>
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
              <span aria-hidden="true">{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        <div className="filters">
          <div className="filter" role="group" aria-label="Catégorie d'avatar">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="chip chip--sm" aria-pressed={filters.category === c.id} onClick={() => toggle("category", c.id)}>{c.emoji} {c.label}</button>
            ))}
          </div>
          <div className="filter" role="group" aria-label="Couleur">
            {COLOR_BUCKETS.map((c) => (
              <button key={c.id} type="button" className="dot" aria-pressed={filters.color === c.id} aria-label={c.label} title={c.label} style={{ "--swatch": c.color }} onClick={() => toggle("color", c.id)} />
            ))}
          </div>
          <div className="filter" role="group" aria-label="Style artistique">
            {STYLES.map((s) => (
              <button key={s.id} type="button" className="chip chip--sm" aria-pressed={filters.style === s.id} onClick={() => toggle("style", s.id)}>{s.label}</button>
            ))}
          </div>
          <div className="filter filter--end">
            <button type="button" className="chip chip--sm" aria-pressed={filters.favorites} onClick={() => setFilters((f) => ({ ...f, favorites: !f.favorites }))}>♥ Favoris{favorites.length ? ` (${favorites.length})` : ""}</button>
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
            <h3>{filters.favorites && !favorites.length ? "Aucun favori pour l'instant" : "Rien ne correspond à ces filtres"}</h3>
            <p>{filters.favorites && !favorites.length ? "Touche le cœur d'une inspiration pour la retrouver ici." : "Essaie d'enlever un filtre ou génère de nouvelles idées ci-dessous."}</p>
            {active && <button type="button" className="btn" onClick={() => setFilters(EMPTY)}>Réinitialiser les filtres</button>}
          </div>
        )}
      </section>

      <section className="remix" aria-labelledby="remix-title">
        <div className="remix__head">
          <div>
            <h2 id="remix-title">Encore plus d'idées</h2>
            <p>Des combinaisons inédites générées à chaque clic{filters.collection ? ", dans la collection choisie" : ""}.</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={generate}>{remixes.length ? "Générer d'autres idées" : "Générer des idées"}</button>
        </div>
        {remixes.length > 0 && (
          <div className="masonry">
            {remixes.map((item) => (
              <InspirationCard key={item.id} item={item} favorite={isFavorite(item.id)} onToggleFavorite={onToggleFavorite} onOpen={setOpen} />
            ))}
          </div>
        )}
      </section>

      {open && (
        <InspirationModal
          item={open}
          favorite={isFavorite(open.id)}
          onToggleFavorite={onToggleFavorite}
          onClose={() => setOpen(null)}
          onCreate={createFrom}
        />
      )}
    </div>
  );
}
