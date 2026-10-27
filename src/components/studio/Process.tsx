"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data/studio";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Small line drawings for each stage, drawn on when the row comes into view. */
const ICONS: Record<string, string> = {
  // contour lines + a level staff
  Survey: "M4 46c10-6 18-6 28 0s18 6 28 0M4 34c10-6 18-6 28 0s18 6 28 0M4 22c10-6 18-6 28 0s18 6 28 0M48 8v44M44 8h8M44 18h8M44 28h8",
  // loose sketch of a house, two attempts
  Sketch: "M8 50l2-20 16-14 16 14 1 20zM6 49c14 1 26 2 40 0M20 50V36h10v14M14 30c6-6 12-10 13-12M38 26l14-10 8 8",
  // a plan: walls, door swing, dimension line
  Drawings: "M6 10h52v38H6zM6 28h22M36 28h22M28 28a8 8 0 0 1 8-8M6 56h52M6 53v6M58 53v6M42 10v18",
  // finished section: roof, floors, ground
  Build: "M4 54h56M10 54V22h44v32M6 22h52M10 38h44M18 54V44h8v10M36 30h12v8H36z",
};

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  // small threshold: on phones the list is several screens tall
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const on = inView || reduce;

  return (
    <section id="process" aria-labelledby="process-title" className="t-mint relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="process-title" className="leading-[0.9]">
            <span className="label block text-graphite">
              Sheet NF-501 <span className="text-accent">/</span> How we work
            </span>
            <span className="w-narrow mt-3 block text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Process</span>
            <span className="w-wide block text-[clamp(1.1rem,2.2vw,2rem)] font-[280] text-accent">four stages, one team</span>
          </h2>
          <p className="label max-w-[38ch] text-graphite">
            A typical house takes 14 to 24 months from the first visit to the keys. Most of it is drawing.
          </p>
        </div>

        <ol ref={ref} className="relative mt-12 grid gap-y-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
          {/* timeline rule that draws across */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ scaleX: on ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.4, ease: [0.3, 0.7, 0.2, 1] }}
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-ink lg:block"
          />
          {process.map((s, i) => (
            <li key={s.no} className="relative lg:pr-8">
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{ scale: on ? 1 : 0 }}
                transition={{ delay: reduce ? 0 : 0.25 + i * 0.3, duration: 0.3 }}
                className="relative z-10 block size-[15px] border-2 border-ink bg-paper"
              >
                <span className="absolute inset-[3px] bg-accent" />
              </motion.span>
              <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                <h3 className="flex items-baseline gap-3">
                  <span className="label text-accent">{s.no}</span>
                  <span className="w-narrow text-4xl font-[800] uppercase">{s.name}</span>
                </h3>
                <span className="label text-graphite">{s.weeks}</span>
              </div>
              <svg viewBox="0 0 64 64" className="mt-6 size-16 text-ink" aria-hidden="true">
                <motion.path
                  d={ICONS[s.name]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  initial={false}
                  animate={{ pathLength: on ? 1 : 0 }}
                  transition={{ delay: reduce ? 0 : 0.4 + i * 0.3, duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
                />
              </svg>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-ink/80">{s.text}</p>
              <p className="label mt-5 text-graphite">You receive</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {s.out.map((o) => (
                  <li key={o} className="label border border-ink/30 px-1.5 py-0.5 text-[9px] text-ink/80">
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
