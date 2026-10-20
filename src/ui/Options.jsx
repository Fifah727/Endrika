import { memo, useMemo } from "react";
import Avatar from "../avatar/Avatar";
import { CATEGORIES, COLOR_KEYS, CROPS, LISTS, byId, isHex } from "../avatar/catalog";

// Aperçu figé d'une option, avec le reste de la configuration actuelle
const Thumb = memo(function Thumb({ config, crop, variant }) {
  return <Avatar config={config} variant={variant} crop={CROPS[crop] ?? crop} />;
});

// Les options pensées pour l'univers choisi passent en premier ; tout reste accessible.
const fits = (o, config) => Boolean(o.tags?.includes(config.category)) && config.category !== "libre";
const rank = (o, config) => (fits(o, config) ? 0 : !o.tags ? 1 : 2);
const ordered = (options, config) => options.map((o, i) => [o, i]).sort((a, b) => rank(a[0], config) - rank(b[0], config) || a[1] - b[1]);

function ThumbGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  const previews = useMemo(
    () => options.map((o) => ({ ...config, ...group.preview, [group.key]: o.id })),
    [config, group.key, group.preview, options]
  );
  return (
    <div className="grid grid--thumbs" role="radiogroup" aria-label={group.label}>
      {ordered(options, config).map(([o, i]) => {
        const selected = config[group.key] === o.id;
        return (
          <button key={o.id} type="button" role="radio" aria-checked={selected} className="tile" onClick={() => onPick(group.key, o.id)}>
            <span className="tile__art"><Thumb config={previews[i]} crop={group.crop} variant={group.variant ?? "thumb"} /></span>
            <span className="tile__label">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SwatchGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  const pick = (o) => (group.key === "skin" ? o.face : o.color);
  const current = config[group.key];
  const customSelected = isHex(current);
  return (
    <div className="swatches" role="radiogroup" aria-label={group.label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={current === o.id}
          aria-label={o.label}
          title={o.label}
          className="swatch"
          style={{ "--swatch": pick(o) }}
          onClick={() => onPick(group.key, o.id)}
        />
      ))}
      {group.custom && COLOR_KEYS.includes(group.key) && (
        <label className={`swatch swatch--custom${customSelected ? " is-set" : ""}`} style={{ "--swatch": customSelected ? current : "transparent" }} title="Couleur personnalisée">
          <input
            type="color"
            aria-label={`${group.label} : couleur personnalisée`}
            value={customSelected ? current : byId(group.key, current).color}
            onChange={(e) => onPick(group.key, e.target.value.toUpperCase(), `color:${group.key}`)}
          />
          <span aria-hidden="true">{customSelected ? "" : "+"}</span>
        </label>
      )}
    </div>
  );
}

function ThemeGroup({ group, config, onPick }) {
  return (
    <div className="grid grid--themes" role="radiogroup" aria-label={group.label}>
      {LISTS.theme.map((th) => (
        <button key={th.id} type="button" role="radio" aria-checked={config.theme === th.id} className="tile" onClick={() => onPick("theme", th.id)}>
          <span className="tile__art tile__art--theme" style={{ "--wall": th.wall, "--halo": th.halo, "--desk": th.deskTop, "--a": th.a, "--b": th.b }}>
            <i className="theme-halo" /><i className="theme-dot theme-dot--a" /><i className="theme-dot theme-dot--b" /><i className="theme-desk" />
          </span>
          <span className="tile__label">{th.label}</span>
        </button>
      ))}
    </div>
  );
}

function Chips({ group, config, onPick }) {
  const options = LISTS[group.key];
  return (
    <div className="chips" role="radiogroup" aria-label={group.label}>
      {ordered(options, config).map(([o]) => {
        const selected = config[group.key] === o.id;
        return (
          <button key={o.id} type="button" role="radio" aria-checked={selected} className="chip" onClick={() => onPick(group.key, o.id)}>
            {o.emoji && <span className="chip__emoji" aria-hidden="true">{o.emoji}</span>}{o.label}
          </button>
        );
      })}
    </div>
  );
}

function TextGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  return (
    <div className={group.compact ? "chips" : "cards"} role="radiogroup" aria-label={group.label}>
      {options.map((o) => (
        <button key={o.id} type="button" role="radio" aria-checked={config[group.key] === o.id} className={group.compact ? "chip" : "card"} onClick={() => onPick(group.key, o.id)}>
          <span className="card__title">{o.label}</span>
          {!group.compact && o.hint && <span className="card__hint">{o.hint}</span>}
        </button>
      ))}
    </div>
  );
}

function CategoryGroup({ config, onApply }) {
  return (
    <div className="cats" role="radiogroup" aria-label="Univers">
      {CATEGORIES.map((c) => (
        <button key={c.id} type="button" role="radio" aria-checked={config.category === c.id} className="cat" onClick={() => onApply({ ...c.patch, category: c.id })}>
          <span className="cat__emoji" aria-hidden="true">{c.emoji}</span>
          <span className="cat__title">{c.label}</span>
          <span className="cat__blurb">{c.blurb}</span>
        </button>
      ))}
    </div>
  );
}

function Toggle({ group, config, onPick }) {
  const on = config[group.key];
  return (
    <button type="button" role="switch" aria-checked={on} className="toggle" onClick={() => onPick(group.key, !on)}>
      <span className="toggle__label">{group.label}</span>
      <span className="toggle__track" aria-hidden="true"><span className="toggle__knob" /></span>
    </button>
  );
}

export default function Group({ group, config, onPick, onApply }) {
  if (group.when && !group.when(config)) return null;
  if (group.kind === "toggle") return <Toggle group={group} config={config} onPick={onPick} />;

  const current = group.key && LISTS[group.key] ? byId(group.key, config[group.key]).label : null;
  let body;
  switch (group.kind) {
    case "category": body = <CategoryGroup config={config} onApply={onApply} />; break;
    case "thumb": body = <ThumbGroup group={group} config={config} onPick={onPick} />; break;
    case "swatch": body = <SwatchGroup group={group} config={config} onPick={onPick} />; break;
    case "theme": body = <ThemeGroup group={group} config={config} onPick={onPick} />; break;
    case "chips": body = <Chips group={group} config={config} onPick={onPick} />; break;
    case "text": body = <TextGroup group={group} config={config} onPick={onPick} />; break;
    default: body = null;
  }

  return (
    <section className="group">
      <header className="group__head">
        <h3>{group.label}</h3>
        {current && <span className="group__value">{current}</span>}
      </header>
      {body}
    </section>
  );
}
