import { memo, useMemo } from "react";
import Avatar from "../avatar/Avatar";
import { CROPS, byId, LISTS } from "../avatar/catalog";

// Aperçu figé d'une option, avec le reste de la configuration actuelle
const Thumb = memo(function Thumb({ config, crop }) {
  return <Avatar config={config} variant="thumb" crop={CROPS[crop]} />;
});

function ThumbGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  const previews = useMemo(
    () => options.map((o) => ({ ...config, ...group.preview, [group.key]: o.id })),
    [config, group.key, group.preview, options]
  );
  return (
    <div className="grid grid--thumbs" role="radiogroup" aria-label={group.label}>
      {options.map((o, i) => {
        const selected = config[group.key] === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className="tile"
            onClick={() => onPick(group.key, o.id)}
          >
            <span className="tile__art">
              <Thumb config={previews[i]} crop={group.crop} />
            </span>
            <span className="tile__label">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SwatchGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  return (
    <div className="swatches" role="radiogroup" aria-label={group.label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={config[group.key] === o.id}
          aria-label={o.label}
          title={o.label}
          className="swatch"
          style={{ "--swatch": group.pick(o) }}
          onClick={() => onPick(group.key, o.id)}
        />
      ))}
    </div>
  );
}

function ThemeGroup({ group, config, onPick }) {
  return (
    <div className="grid grid--themes" role="radiogroup" aria-label={group.label}>
      {LISTS.theme.map((th) => (
        <button
          key={th.id}
          type="button"
          role="radio"
          aria-checked={config.theme === th.id}
          className="tile"
          onClick={() => onPick("theme", th.id)}
        >
          <span
            className="tile__art tile__art--theme"
            style={{ "--wall": th.wall, "--halo": th.halo, "--desk": th.deskTop, "--a": th.a, "--b": th.b }}
          >
            <i className="theme-halo" />
            <i className="theme-dot theme-dot--a" />
            <i className="theme-dot theme-dot--b" />
            <i className="theme-desk" />
          </span>
          <span className="tile__label">{th.label}</span>
        </button>
      ))}
    </div>
  );
}

function TextGroup({ group, config, onPick }) {
  const options = LISTS[group.key];
  return (
    <div className={group.compact ? "chips" : "cards"} role="radiogroup" aria-label={group.label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={config[group.key] === o.id}
          className={group.compact ? "chip" : "card"}
          onClick={() => onPick(group.key, o.id)}
        >
          <span className="card__title">{o.label}</span>
          {!group.compact && o.hint && <span className="card__hint">{o.hint}</span>}
        </button>
      ))}
    </div>
  );
}

function Toggle({ group, config, onPick }) {
  const on = config[group.key];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className="toggle"
      onClick={() => onPick(group.key, !on)}
    >
      <span className="toggle__label">{group.label}</span>
      <span className="toggle__track" aria-hidden="true">
        <span className="toggle__knob" />
      </span>
    </button>
  );
}

const RENDERERS = {
  thumb: ThumbGroup,
  swatch: SwatchGroup,
  theme: ThemeGroup,
  text: TextGroup,
};

export default function Group({ group, config, onPick }) {
  if (group.when && !group.when(config)) return null;

  if (group.kind === "toggle") return <Toggle group={group} config={config} onPick={onPick} />;

  const Body = RENDERERS[group.kind];
  const current = LISTS[group.key] ? byId(group.key, config[group.key]).label : null;
  return (
    <section className="group">
      <header className="group__head">
        <h3>{group.label}</h3>
        {current && <span className="group__value">{current}</span>}
      </header>
      <Body group={group} config={config} onPick={onPick} />
    </section>
  );
}
