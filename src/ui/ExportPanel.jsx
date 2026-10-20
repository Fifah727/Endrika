import { useEffect, useRef, useState } from "react";
import { ExportError, canEncodeMp4, downloadBlob, exportGif, exportMp4, exportPng, exportSvg } from "./export";

const BG = [
  { id: "scene", label: "Avec décor" },
  { id: "transparent", label: "Transparent" },
  { id: "color", label: "Couleur unie" },
];

const FORMATS = [
  { id: "png", label: "PNG", hint: "Image nette, fond transparent possible", bgs: ["scene", "transparent", "color"] },
  { id: "gif", label: "GIF", hint: "Animation en boucle, partout compatible", bgs: ["scene", "transparent", "color"] },
  { id: "mp4", label: "MP4", hint: "Vidéo H.264 pour réseaux et messageries", bgs: ["scene", "color"] },
  { id: "svg", label: "SVG animé", hint: "Vectoriel, animé, très léger", bgs: ["scene", "transparent", "color"] },
];

const DEFAULTS = {
  png: { size: 1024, bg: "scene", color: "#FFFFFF" },
  gif: { size: 480, fps: 12, duration: 6, bg: "scene", color: "#FFFFFF" },
  mp4: { size: 720, fps: 24, duration: 6, loops: 2, quality: "normal", bg: "scene", color: "#FFFFFF" },
  svg: { bg: "scene", color: "#FFFFFF" },
};

const OPTIONS = {
  png: [{ key: "size", label: "Taille", values: [[512, "512 px"], [1024, "1024 px"], [2048, "2048 px"]] }],
  gif: [
    { key: "size", label: "Taille", values: [[320, "320 px"], [480, "480 px"], [640, "640 px"]] },
    { key: "duration", label: "Durée de la boucle", values: [[3, "3 s"], [6, "6 s"], [9, "9 s"]] },
  ],
  mp4: [
    { key: "size", label: "Taille", values: [[480, "480 px"], [720, "720 px"], [1080, "1080 px"]] },
    { key: "duration", label: "Durée de la boucle", values: [[3, "3 s"], [6, "6 s"], [9, "9 s"]] },
  ],
  svg: [],
};

const kb = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} Mo` : `${Math.max(1, Math.round(n / 1024))} Ko`);

function Seg({ label, value, values, onChange }) {
  return (
    <div className="opt">
      <span className="opt__label" id={`o-${label}`}>{label}</span>
      <div className="chips" role="radiogroup" aria-labelledby={`o-${label}`}>
        {values.map(([v, text]) => (
          <button key={String(v)} type="button" role="radio" aria-checked={value === v} className="chip chip--sm" onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
    </div>
  );
}

export default function ExportPanel({ config, onToast }) {
  const [format, setFormat] = useState("png");
  const [opts, setOpts] = useState(DEFAULTS);
  const [busy, setBusy] = useState(null); // { fraction, label }
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const abort = useRef(null);
  const urlRef = useRef(null);

  const o = opts[format];
  const fmt = FORMATS.find((f) => f.id === format);
  const mp4Missing = format === "mp4" && !canEncodeMp4();

  const release = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  };
  useEffect(() => () => { release(); abort.current?.abort(); }, []);

  const setOpt = (key, value) => setOpts((s) => ({ ...s, [format]: { ...s[format], [key]: value } }));
  const pickFormat = (id) => {
    setFormat(id);
    setError("");
  };

  const run = async () => {
    setError("");
    release();
    setResult(null);
    const controller = new AbortController();
    abort.current = controller;
    setBusy({ fraction: 0, label: "Préparation…" });
    const hooks = { signal: controller.signal, onProgress: (fraction, label) => setBusy({ fraction, label }) };
    try {
      const fn = { png: exportPng, gif: exportGif, mp4: exportMp4, svg: exportSvg }[format];
      const out = await fn(config, o, hooks);
      urlRef.current = URL.createObjectURL(out.blob);
      setResult({ ...out, url: urlRef.current, format });
      onToast?.(`${fmt.label} prêt`);
    } catch (e) {
      setError(e instanceof ExportError ? e.message : `L'export a échoué (${e?.message ?? "erreur inconnue"}).`);
    } finally {
      setBusy(null);
      abort.current = null;
    }
  };

  return (
    <div className="export">
      <div className="formats" role="radiogroup" aria-label="Format d'export">
        {FORMATS.map((f) => (
          <button key={f.id} type="button" role="radio" aria-checked={format === f.id} className="format" onClick={() => pickFormat(f.id)}>
            <span className="format__name">{f.label}</span>
            <span className="format__hint">{f.hint}</span>
          </button>
        ))}
      </div>

      <div className="export__opts">
        {OPTIONS[format].map((opt) => (
          <Seg key={opt.key} label={opt.label} value={o[opt.key]} values={opt.values} onChange={(v) => setOpt(opt.key, v)} />
        ))}
        <Seg label="Fond" value={o.bg} values={BG.filter((b) => fmt.bgs.includes(b.id)).map((b) => [b.id, b.label])} onChange={(v) => setOpt("bg", v)} />
        {o.bg === "color" && (
          <label className="opt opt--color">
            <span className="opt__label">Couleur du fond</span>
            <input type="color" value={o.color} onChange={(e) => setOpt("color", e.target.value.toUpperCase())} aria-label="Couleur du fond" />
          </label>
        )}
        {format === "gif" && o.bg === "transparent" && <p className="note">Le GIF gère une transparence sans demi-teintes : les bords peuvent être légèrement crénelés.</p>}
        {format === "mp4" && <p className="note">La vidéo contient la boucle deux fois de suite.</p>}
        {format === "svg" && <p className="note">Le SVG contient ses animations : ouvre-le dans un navigateur ou dans une balise &lt;img&gt;.</p>}
        {mp4Missing && <p className="note note--warn">Ce navigateur ne sait pas encoder de MP4. Essaie Chrome, Edge ou Safari récent, ou choisis le GIF.</p>}
      </div>

      <div className="export__go">
        {busy ? (
          <>
            <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(busy.fraction * 100)} aria-label="Progression de l'export">
              <span style={{ width: `${Math.round(busy.fraction * 100)}%` }} />
            </div>
            <p className="note">{busy.label}</p>
            <button type="button" className="btn" onClick={() => abort.current?.abort()}>Annuler</button>
          </>
        ) : (
          <button type="button" className="btn btn--primary" onClick={run} disabled={mp4Missing}>Créer le {fmt.label}</button>
        )}
      </div>

      {error && <p className="note note--error" role="alert">{error}</p>}

      {result && (
        <div className="result" aria-live="polite">
          <div className="result__media" style={{ background: result.format === "png" || result.format === "gif" || result.format === "svg" ? "repeating-conic-gradient(#e9e8e3 0% 25%, #fff 0% 50%) 50% / 16px 16px" : undefined }}>
            {result.format === "mp4" ? (
              <video src={result.url} controls loop muted autoPlay playsInline />
            ) : (
              <img src={result.url} alt={`Aperçu de l'export ${result.format.toUpperCase()}`} />
            )}
          </div>
          <div className="result__meta">
            <p><strong>{result.filename}</strong></p>
            <p className="note">{result.width} × {result.height} px · {kb(result.blob.size)}</p>
            <button type="button" className="btn btn--primary" onClick={() => downloadBlob(result.blob, result.filename)}>Télécharger</button>
          </div>
        </div>
      )}
    </div>
  );
}
