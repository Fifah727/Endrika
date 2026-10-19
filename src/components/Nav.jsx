export default function Nav({ route, onGo, count }) {
  const items = [
    ["inspirations", "Inspirations"],
    ["creer", "Créer"],
    ["creations", "Mes créations"],
  ];
  return (
    <header className="nav">
      <a className="brand" href="#/" onClick={(e) => { e.preventDefault(); onGo("inspirations"); }} aria-label="Endrika, accueil">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">Endrika</span>
      </a>
      <nav aria-label="Navigation principale">
        {items.map(([id, label]) => (
          <button key={id} type="button" className="nav__link" aria-current={route.name === id ? "page" : undefined} onClick={() => onGo(id)}>
            {label}
            {id === "creations" && count > 0 && <span className="nav__count">{count}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
}
