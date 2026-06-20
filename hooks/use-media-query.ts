"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const matches = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer viewport-dependent values until after hydration so SSR markup
  // matches the client's first paint (avoids aria-* / conditional render mismatches).
  return mounted && matches;
}
