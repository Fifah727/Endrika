import { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "../avatar/Avatar";
import { DEFAULTS } from "../avatar/catalog";
import { applyPatch, configToQuery, randomize, saveConfig } from "../avatar/config";
import useHistory from "../state/useHistory";
import ExportPanel from "../ui/ExportPanel";
import { copyText } from "../ui/export";
import Group from "../ui/Options";
import { STEPS } from "../ui/panels";

const Icon = ({ d, label }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d={d} /></svg>
);

export default function Editor({ seed, onSave, toast, onOpenSaved, onDraft }) {
  const history = useHistory(seed.config);
  const config = history.state;
  const { set, undo, redo, canUndo, canRedo } = history;
  const [step, setStep] = useState(STEPS[0].id);
  const [creationId, setCreationId] = useState(seed.id ?? null);

  // Le lien et le brouillon suivent chaque modification
  useEffect(() => {
    saveConfig(config);
    onDraft?.(config, creationId);
    const q = configToQuery(config);
    const extra = creationId ? `${q ? "&" : ""}c=${creationId}` : "";
    history_replace(`#/creer?${q}${extra}`);
  }, [config, creationId, onDraft]);

  const pick = useCallback((key, value, coalesce) => set((c) => ({ ...c, [key]: value }), coalesce ?? null), [set]);
  const apply = useCallback((patch) => set((c) => applyPatch(c, patch)), [set]);

  // Raccourcis : Ctrl/Cmd+Z, Ctrl/Cmd+Maj+Z ou Ctrl+Y
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === "z" && e.shiftKey) || k === "y") { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  const onSaveClick = () => {
    const id = onSave(config, creationId);
    setCreationId(id);
    toast(creationId ? "Création mise à jour" : "Enregistrée dans Mes créations");
  };

  const onCopy = async () => {
    const ok = await copyText(`${location.origin}${location.pathname}#/creer?${configToQuery(config)}`);
    toast(ok ? "Lien copié" : "Copie impossible : copie l'adresse du navigateur");
  };

  const idx = STEPS.findIndex((s) => s.id === step);
  const current = STEPS[idx];

  // Les interrupteurs consécutifs sont regroupés dans une même liste
  const blocks = useMemo(() => {
    const out = [];
    for (const g of current.groups) {
      if (g.when && !g.when(config)) continue;
      const last = out[out.length - 1];
      if (g.kind === "toggle" && last?.toggles) last.toggles.push(g);
      else if (g.kind === "toggle") out.push({ toggles: [g] });
      else out.push({ group: g });
    }
    return out;
  }, [current, config]);

  return (
    <div className="editor">
      <section className="stage" aria-label="Aperçu de l'avatar">
        <div className="stage__frame"><Avatar config={config} label="Aperçu de ton avatar animé" /></div>
        <div className="toolbar" role="toolbar" aria-label="Actions">
          <div className="toolbar__group">
          <button type="button" className="iconbtn" onClick={undo} disabled={!canUndo} aria-label="Annuler" title="Annuler (Ctrl+Z)"><Icon d="M9 7H15a5 5 0 010 10H8M9 7L5 11M9 7l-4-4" /></button>
          <button type="button" className="iconbtn" onClick={redo} disabled={!canRedo} aria-label="Rétablir" title="Rétablir (Ctrl+Maj+Z)"><Icon d="M15 7H9a5 5 0 000 10h7M15 7l4 4M15 7l4-4" /></button>
          <button type="button" className="btn" onClick={() => set((c) => randomize(c))}>Aléatoire</button>
          <button type="button" className="btn btn--ghost" onClick={() => set({ ...DEFAULTS })}>Réinitialiser</button>
          </div>
          <div className="toolbar__group">
          <button type="button" className="btn" onClick={onCopy}>Copier le lien</button>
          <button type="button" className="btn btn--primary" onClick={onSaveClick}>{creationId ? "Mettre à jour" : "Enregistrer"}</button>
          </div>
        </div>
        <p className="stage__tip">Survole l'avatar : il te regarde et te salue. Clique pour un clin d'œil.</p>
      </section>

      <section className="panel" aria-label="Personnalisation">
        <ol className="steps" role="tablist" aria-label="Étapes de création">
          {STEPS.map((s, i) => (
            <li key={s.id} role="presentation">
              <button type="button" role="tab" id={`tab-${s.id}`} aria-selected={step === s.id} aria-controls={`panel-${s.id}`} tabIndex={step === s.id ? 0 : -1} className="step" onClick={() => setStep(s.id)}
                onKeyDown={(e) => {
                  const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                  if (!d) return;
                  e.preventDefault();
                  const n = STEPS[(i + d + STEPS.length) % STEPS.length];
                  setStep(n.id);
                  document.getElementById(`tab-${n.id}`)?.focus();
                }}>
                <span className="step__num" aria-hidden="true">{i + 1}</span>
                <span className="step__label">{s.label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="panel__body" role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
          <p className="panel__hint">{current.hint}</p>
          {current.id === "export" ? (
            <ExportPanel config={config} onToast={toast} />
          ) : (
            blocks.map((b, i) =>
              b.toggles ? (
                <div className="toggles" key={`t${i}`}>
                  {b.toggles.map((g) => <Group key={g.key} group={g} config={config} onPick={pick} onApply={apply} />)}
                </div>
              ) : (
                <Group key={b.group.key ?? b.group.kind} group={b.group} config={config} onPick={pick} onApply={apply} />
              )
            )
          )}
        </div>

        <div className="panel__nav">
          <button type="button" className="btn" disabled={idx === 0} onClick={() => setStep(STEPS[idx - 1].id)}>Précédent</button>
          {idx < STEPS.length - 1 ? (
            <button type="button" className="btn btn--primary" onClick={() => setStep(STEPS[idx + 1].id)}>Suivant : {STEPS[idx + 1].label}</button>
          ) : (
            <button type="button" className="btn" onClick={onOpenSaved}>Voir mes créations</button>
          )}
        </div>
      </section>
    </div>
  );
}

// Met à jour l'adresse sans déclencher de navigation (donc sans recharger l'éditeur)
function history_replace(hash) {
  try {
    window.history.replaceState(null, "", `${location.pathname}${location.search}${hash}`);
  } catch {
    /* environnements restreints : le lien ne se met simplement pas à jour */
  }
}
