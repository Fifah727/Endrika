import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Avatar from "./avatar/Avatar";
import { DEFAULTS, PANELS, byId } from "./avatar/catalog";
import { loadConfig, randomize, saveConfig, shareUrl, toHash } from "./avatar/config";
import { copyText, downloadPng, downloadSvg } from "./ui/exporters";
import Group from "./ui/Options";

// Ligne « terminal » qui résume les choix en cours
const slug = (s) => s.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, "-");
function readout(c) {
  const l = (key) => slug(byId(key, c[key]).label);
  const parts = [`--teint=${l("skin")}`, `--cheveux=${l("hair")}/${l("hairColor")}`];
  if (c.glasses !== "aucune") parts.push(`--lunettes=${l("glasses")}`);
  if (c.headwear !== "aucun") parts.push(`--tete=${l("headwear")}`);
  parts.push(`--tenue=${l("outfit")}`, `--decor=${l("theme")}`, `--anim=${l("activity")}`);
  return parts.join(" ");
}

export default function App() {
  const [config, setConfig] = useState(loadConfig);
  const [tab, setTab] = useState(PANELS[0].id);
  const [toast, setToast] = useState("");
  const svgRef = useRef(null);
  const menuRef = useRef(null);
  const toastTimer = useRef(0);

  // Les choix vivent dans l'URL (#…) et dans le stockage local
  useEffect(() => {
    saveConfig(config);
    history.replaceState(null, "", `${location.pathname}${location.search}${toHash(config)}`);
  }, [config]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const say = useCallback((text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const pick = useCallback((key, value) => setConfig((c) => ({ ...c, [key]: value })), []);

  const onRandom = () => setConfig((c) => randomize(c));
  const onReset = () => setConfig({ ...DEFAULTS });

  const onCopy = async () => {
    const ok = await copyText(shareUrl(config));
    say(ok ? "Lien copié" : "Copie impossible : copie l'adresse du navigateur");
  };

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  const onSvg = () => {
    closeMenu();
    if (svgRef.current) {
      downloadSvg(svgRef.current);
      say("SVG animé téléchargé");
    }
  };

  const onPng = async () => {
    closeMenu();
    if (!svgRef.current) return;
    try {
      await downloadPng(svgRef.current);
      say("PNG téléchargé");
    } catch {
      say("Export PNG impossible dans ce navigateur");
    }
  };

  const onTabKey = (e) => {
    const i = PANELS.findIndex((p) => p.id === tab);
    let next = null;
    if (e.key === "ArrowRight") next = PANELS[(i + 1) % PANELS.length];
    if (e.key === "ArrowLeft") next = PANELS[(i - 1 + PANELS.length) % PANELS.length];
    if (next) {
      e.preventDefault();
      setTab(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }
  };

  const panel = PANELS.find((p) => p.id === tab);
  const line = useMemo(() => readout(config), [config]);

  // Les interrupteurs consécutifs sont regroupés dans une même liste
  const blocks = [];
  for (const g of panel.groups) {
    if (g.when && !g.when(config)) continue;
    const last = blocks[blocks.length - 1];
    if (g.kind === "toggle" && last?.toggles) last.toggles.push(g);
    else if (g.kind === "toggle") blocks.push({ toggles: [g] });
    else blocks.push({ group: g });
  }

  return (
    <div className="app">
      <header className="top">
        <h1>Avatar Studio</h1>
        <p>Choisis chaque détail : ton avatar s'anime en direct.</p>
      </header>

      <main className="studio">
        <section className="stage" aria-label="Aperçu de l'avatar">
          <div className="stage__frame">
            <Avatar ref={svgRef} config={config} label="Aperçu de ton avatar animé" />
          </div>

          <p className="readout" aria-hidden="true">
            <span className="readout__prompt">$</span> avatar {line}
          </p>

          <div className="actions">
            <button type="button" className="btn btn--primary" onClick={onRandom}>
              Aléatoire
            </button>
            <button type="button" className="btn" onClick={onCopy}>
              Copier le lien
            </button>
            <details className="menu" ref={menuRef}>
              <summary className="btn">Télécharger</summary>
              <div className="menu__list">
                <button type="button" onClick={onSvg}>SVG animé</button>
                <button type="button" onClick={onPng}>PNG, 1024 px</button>
              </div>
            </details>
            <button type="button" className="btn btn--ghost" onClick={onReset}>
              Réinitialiser
            </button>
          </div>

          <p className="toast" role="status" aria-live="polite">{toast}</p>
        </section>

        <section className="panel" aria-label="Personnalisation">
          <div className="tabs" role="tablist" aria-label="Catégories" onKeyDown={onTabKey}>
            {PANELS.map((p) => (
              <button
                key={p.id}
                id={`tab-${p.id}`}
                type="button"
                role="tab"
                aria-selected={tab === p.id}
                aria-controls={`panel-${p.id}`}
                tabIndex={tab === p.id ? 0 : -1}
                className="tab"
                onClick={() => setTab(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="panel__body" role="tabpanel" id={`panel-${panel.id}`} aria-labelledby={`tab-${panel.id}`}>
            {blocks.map((b) =>
              b.toggles ? (
                <div className="toggles" key={b.toggles[0].key}>
                  {b.toggles.map((g) => (
                    <Group key={g.key} group={g} config={config} onPick={pick} />
                  ))}
                </div>
              ) : (
                <Group key={b.group.key} group={b.group} config={config} onPick={pick} />
              )
            )}
          </div>
        </section>
      </main>

      <footer className="foot">
        <p>Tes choix sont gardés dans le lien : copie-le pour retrouver ou partager ton avatar.</p>
      </footer>
    </div>
  );
}
