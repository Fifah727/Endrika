const HEIGHTS = [260, 200, 320, 230, 290, 210, 340, 250];

/** État de chargement de la galerie. */
export function GallerySkeleton({ count = 8 }) {
  return (
    <div className="masonry" aria-busy="true" aria-label="Chargement des inspirations">
      {Array.from({ length: count }, (_, i) => (
        <div className="icard icard--skeleton" key={i}>
          <div className="icard__art skeleton" style={{ height: HEIGHTS[i % HEIGHTS.length] }} />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>Chargement…</span>
    </div>
  );
}
