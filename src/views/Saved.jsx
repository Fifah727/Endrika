import { useState } from "react";
import Avatar from "../avatar/Avatar";
import { RATIOS } from "../data/inspirations";

const fmt = (ts) => new Date(ts).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

function Item({ c, onOpen, onRename, onRemove }) {
  const [name, setName] = useState(c.name);
  const [confirm, setConfirm] = useState(false);
  return (
    <article className="saved">
      <button type="button" className="saved__art" onClick={() => onOpen(c)} aria-label={`Ouvrir « ${c.name} »`}>
        <Avatar config={c.config} variant="scene" crop={RATIOS.portrait} />
      </button>
      <div className="saved__meta">
        <input className="saved__name" value={name} aria-label="Nom de la création" maxLength={40} onChange={(e) => setName(e.target.value)} onBlur={() => onRename(c.id, name)} onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()} />
        <p className="note">Modifiée le {fmt(c.updatedAt)}</p>
        <div className="saved__actions">
          <button type="button" className="btn btn--sm btn--primary" onClick={() => onOpen(c)}>Ouvrir</button>
          {confirm ? (
            <>
              <button type="button" className="btn btn--sm btn--danger" onClick={() => onRemove(c.id)}>Confirmer</button>
              <button type="button" className="btn btn--sm btn--ghost" onClick={() => setConfirm(false)}>Garder</button>
            </>
          ) : (
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => setConfirm(true)}>Supprimer</button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Saved({ creations, onOpen, onRename, onRemove, onNew }) {
  return (
    <div className="gallery">
      <section className="hero hero--small">
        <h1>Mes <em>créations</em></h1>
        <p className="hero__lead">Tes avatars enregistrés sur cet appareil. Reprends-les quand tu veux.</p>
      </section>
      {creations.length ? (
        <div className="saved-grid">
          {creations.map((c) => <Item key={c.id} c={c} onOpen={onOpen} onRename={onRename} onRemove={onRemove} />)}
        </div>
      ) : (
        <div className="empty">
          <h2>Pas encore de création</h2>
          <p>Compose un avatar et touche « Enregistrer » : il apparaîtra ici.</p>
          <button type="button" className="btn btn--primary" onClick={onNew}>Créer mon avatar</button>
        </div>
      )}
    </div>
  );
}
