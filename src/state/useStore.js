import { useCallback, useEffect, useRef, useState } from "react";
import { loadCreations, loadFavorites, saveCreations, saveFavorites } from "../avatar/config";

/** Favoris : liste d'identifiants d'inspirations, conservée dans le navigateur. */
export function useFavorites(onError) {
  const [list, setList] = useState(loadFavorites);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!saveFavorites(list)) onError?.("Impossible d'enregistrer les favoris sur cet appareil.");
  }, [list, onError]);

  const toggle = useCallback((id) => setList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [id, ...l])), []);
  return { favorites: list, isFavorite: (id) => list.includes(id), toggle };
}

/** Créations enregistrées : { id, name, config, updatedAt }. */
export function useCreations(onError) {
  const [list, setList] = useState(loadCreations);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!saveCreations(list)) onError?.("Impossible d'enregistrer tes créations sur cet appareil.");
  }, [list, onError]);

  const save = useCallback((config, id, name) => {
    const now = Date.now();
    const finalId = id ?? `c${now.toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
    setList((l) => {
      const exists = l.some((c) => c.id === finalId);
      if (exists) return l.map((c) => (c.id === finalId ? { ...c, config, name: name ?? c.name, updatedAt: now } : c));
      return [{ id: finalId, name: name ?? `Création n°${l.length + 1}`, config, updatedAt: now }, ...l];
    });
    return finalId;
  }, []);
  const rename = useCallback((id, name) => setList((l) => l.map((c) => (c.id === id ? { ...c, name: name.trim() || c.name } : c))), []);
  const remove = useCallback((id) => setList((l) => l.filter((c) => c.id !== id)), []);
  return { creations: list, save, rename, remove };
}
