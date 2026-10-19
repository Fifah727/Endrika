import { useCallback, useRef, useState } from "react";

const LIMIT = 80;

/**
 * État avec annuler / rétablir.
 * `set(next, key)` : si deux modifications portent la même `key` à moins de 700 ms
 * d'intervalle (ex. glisser un sélecteur de couleur), elles comptent pour une seule étape.
 */
export default function useHistory(initial) {
  const [snap, setSnap] = useState({ past: [], present: initial, future: [] });
  const last = useRef({ key: null, at: 0 });

  const set = useCallback((next, key = null) => {
    const now = Date.now();
    const merge = key && last.current.key === key && now - last.current.at < 700;
    last.current = { key, at: now };
    setSnap((s) => {
      const value = typeof next === "function" ? next(s.present) : next;
      if (value === s.present) return s;
      return {
        past: merge ? s.past : [...s.past, s.present].slice(-LIMIT),
        present: value,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    last.current = { key: null, at: 0 };
    setSnap((s) =>
      s.past.length
        ? { past: s.past.slice(0, -1), present: s.past[s.past.length - 1], future: [s.present, ...s.future] }
        : s
    );
  }, []);

  const redo = useCallback(() => {
    last.current = { key: null, at: 0 };
    setSnap((s) =>
      s.future.length
        ? { past: [...s.past, s.present], present: s.future[0], future: s.future.slice(1) }
        : s
    );
  }, []);

  /** Repart d'une nouvelle base, sans historique. */
  const reset = useCallback((value) => {
    last.current = { key: null, at: 0 };
    setSnap({ past: [], present: value, future: [] });
  }, []);

  return { state: snap.present, set, undo, redo, reset, canUndo: snap.past.length > 0, canRedo: snap.future.length > 0 };
}
