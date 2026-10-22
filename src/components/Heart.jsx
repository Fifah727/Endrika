/** Cœur de favori (icône SVG, remplie quand `filled`). */
export default function Heart({ filled = false, size = 16 }) {
  return (
    <svg className="heart" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" data-filled={filled || undefined}>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 5 6 5c2 0 3.4 1.1 4 2.4h4C14.6 6.1 16 5 18 5c3.4 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
