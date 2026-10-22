/** Logo d'Endrika : exactement le même dessin que l'icône d'onglet (public/favicon.svg). */
export default function Logo({ size = 32 }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#F5F5F2" />
      <path d="M32 8c13 0 22 9 22 22S45 56 32 56 10 47 10 34c0-4 1-8 3-11 3-9 10-15 19-15z" fill="#B9FF70" stroke="#17161B" strokeWidth="3" />
      <circle cx="24" cy="30" r="3" fill="#17161B" />
      <circle cx="40" cy="30" r="3" fill="#17161B" />
      <path d="M23 40q9 8 18 0" fill="none" stroke="#17161B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
