import type Lenis from "lenis";

/** Shared Lenis instance (set by <SmoothScroll />), so components can scroll smoothly to a position. */
let instance: Lenis | undefined;
export const setLenis = (l: Lenis | undefined) => {
  instance = l;
};
export const getLenis = () => instance;

/** Smooth scroll to a Y position, with or without Lenis (reduced motion = instant). */
export function scrollToY(y: number, reduce: boolean, native = false) {
  const l = getLenis();
  if (l && !native) l.scrollTo(y, { duration: 0.55, force: true });
  else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}
