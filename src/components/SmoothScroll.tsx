"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/lenis";

/** Lenis smooth scrolling (~3 KB). Turned off when the user prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    let lenis: import("lenis").default | undefined;
    let cancelled = false;
    // loaded after first paint so it never delays the hero
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, anchors: true });
      setLenis(lenis);
      const raf = (time: number) => {
        lenis?.raf(time);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      lenis?.destroy();
      setLenis(undefined);
    };
  }, []);
  return null;
}
