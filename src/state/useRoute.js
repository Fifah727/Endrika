import { useCallback, useEffect, useState } from "react";

// Routes par hash (compatibles GitHub Pages, aucun 404) :
//   #/                 → inspirations
//   #/creer?hair=…     → éditeur (la config est dans la requête)
//   #/mes-creations    → créations enregistrées
export function parseHash(hash) {
  const raw = (hash || "").replace(/^#/, "");
  const [path, query = ""] = raw.split("?");
  if (!path || path === "/") return { name: "inspirations", query };
  if (path.startsWith("/creer")) return { name: "creer", query };
  if (path.startsWith("/mes-creations")) return { name: "creations", query };
  // anciens liens : #hair=boucles&skin=ebene
  if (raw.includes("=")) return { name: "creer", query: raw };
  return { name: "inspirations", query: "" };
}

export default function useRoute() {
  const [route, setRoute] = useState(() => parseHash(location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const go = useCallback((name, query = "") => {
    const path = name === "creer" ? "/creer" : name === "creations" ? "/mes-creations" : "/";
    location.hash = `#${path}${query ? `?${query}` : ""}`;
  }, []);

  return [route, go];
}
