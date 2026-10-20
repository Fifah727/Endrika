import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { DEFAULTS } from "./avatar/catalog";
import { applyPatch, configFromQuery, configToQuery, loadConfig } from "./avatar/config";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import { GallerySkeleton, PageSkeleton } from "./components/Skeleton";
import { CATEGORIES } from "./avatar/catalog";
import useRoute from "./state/useRoute";
import { useCreations, useFavorites } from "./state/useStore";

// Les écrans sont chargés à la demande (le moteur d'export l'est aussi, dans l'éditeur)
const Gallery = lazy(() => import("./views/Gallery"));
const Editor = lazy(() => import("./views/Editor"));
const Saved = lazy(() => import("./views/Saved"));

const idOf = (query) => new URLSearchParams(query).get("c");

export default function App() {
  const [route, go] = useRoute();
  const [toastText, setToastText] = useState("");
  const toastTimer = useRef(0);
  const toast = useCallback((text) => {
    setToastText(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastText(""), 2800);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const favs = useFavorites(toast);
  const store = useCreations(toast);

  // Graine de l'éditeur : config issue du lien, d'une inspiration, d'une création ou du brouillon
  const [seed, setSeed] = useState(() => ({
    config: (route.name === "creer" && configFromQuery(route.query)) || loadConfig(),
    id: route.name === "creer" ? idOf(route.query) : null,
    nonce: 0,
  }));
  const lastQuery = useRef(route.name === "creer" ? route.query : null);
  useEffect(() => {
    if (route.name !== "creer" || route.query === lastQuery.current) return;
    lastQuery.current = route.query;
    const cfg = configFromQuery(route.query);
    if (cfg) setSeed({ config: cfg, id: idOf(route.query), nonce: Date.now() });
  }, [route]);

  const openEditor = useCallback((config, id = null, from = "") => {
    const q = [configToQuery(config), id ? `c=${id}` : "", from ? `from=${from}` : ""].filter(Boolean).join("&");
    lastQuery.current = q || "from=new";
    setSeed({ config, id, nonce: Date.now() });
    go("creer", q || "from=new");
  }, [go]);

  const quickStart = (catId) => {
    const cat = CATEGORIES.find((c) => c.id === catId);
    openEditor(applyPatch(DEFAULTS, { ...cat.patch, category: cat.id }), null, "start");
  };

  // Dernier état de l'éditeur : on le retrouve en revenant par le menu
  const draft = useRef(null);
  const onDraft = useCallback((config, id) => { draft.current = { config, id }; }, []);
  const onNav = (name) => {
    if (name === "creer") {
      if (draft.current && route.name !== "creer") setSeed({ config: draft.current.config, id: draft.current.id, nonce: Date.now() });
      lastQuery.current = "";
      go("creer", "");
    } else go(name);
  };

  useEffect(() => { window.scrollTo?.({ top: 0 }); }, [route.name]);

  return (
    <div className="app">
      <Nav route={route} onGo={onNav} count={store.creations.length} />
      <main id="main">
        <ErrorBoundary message="Cette page n'a pas pu se charger. Vérifie ta connexion puis réessaie.">
          <Suspense fallback={route.name === "inspirations" ? <div className="gallery"><GallerySkeleton /></div> : <PageSkeleton />}>
            {route.name === "inspirations" && (
              <Gallery favorites={favs.favorites} isFavorite={favs.isFavorite} onToggleFavorite={favs.toggle} onCreate={(item) => openEditor(item.config, null, item.id)} onQuickStart={quickStart} />
            )}
            {route.name === "creer" && (
              <Editor key={seed.nonce} seed={seed} toast={toast} onDraft={onDraft} onSave={(cfg, id) => store.save(cfg, id)} onOpenSaved={() => go("creations")} />
            )}
            {route.name === "creations" && (
              <Saved creations={store.creations} onOpen={(c) => openEditor(c.config, c.id)} onRename={store.rename} onRemove={store.remove} onNew={() => go("creer", "")} />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
      <p className="toast" role="status" aria-live="polite">{toastText}</p>
    </div>
  );
}
