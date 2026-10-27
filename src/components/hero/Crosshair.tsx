"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Drafting crosshair that replaces the mouse pointer over the hero, with a live coordinate read-out
 * (as if the screen were the sheet at 1:100, so 1 px = 10 mm). Mouse / trackpad only.
 */
export function Crosshair() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const readout = useRef<HTMLSpanElement>(null);
  const [inside, setInside] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const host = document.getElementById("top")?.firstElementChild as HTMLElement | null;
    if (!host) return;
    host.classList.add("cursor-cross");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      x.set(px);
      y.set(py);
      if (readout.current)
        readout.current.textContent = `X ${String(Math.round(px * 10)).padStart(5, "0")}  Y ${String(Math.round(py * 10)).padStart(5, "0")}`;
    };
    const enter = () => setInside(true);
    const leave = () => setInside(false);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.classList.remove("cursor-cross");
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-200 ${inside ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 top-0 h-px bg-ink/35" />
      <motion.div style={{ x }} className="absolute inset-y-0 left-0 w-px bg-ink/35" />
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <span className="absolute -left-[7px] -top-[7px] size-[15px] border border-accent" />
        <span ref={readout} className="label absolute left-3 top-3 whitespace-pre bg-paper/90 px-1 text-[9px] text-ink">
          X 00000  Y 00000
        </span>
      </motion.div>
    </div>
  );
}
