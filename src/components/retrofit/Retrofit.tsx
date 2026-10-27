"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cloudPath, retrofit } from "@/data/retrofit";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/lib/useReducedMotion";

const W = 1536;
const H = 1024;

/**
 * Sheet NF-201: "existing" vs "proposed", as an architect would label them.
 * Drag the line (mouse anywhere, touch on the handle, or arrow keys on the handle).
 * Each change is circled with a revision cloud on the proposed side and listed in the revision schedule.
 */
export function Retrofit() {
  const reduce = useReducedMotion();
  const pos = useMotionValue(50); // % from the left where the old room ends
  const [active, setActive] = useState<number | null>(null);
  const slider = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const inView = useInView(frame, { once: true, amount: 0.55 });

  const outerX = useTransform(pos, (v) => `${v - 100}%`);
  const innerX = useTransform(pos, (v) => `${100 - v}%`);
  const handleX = useTransform(pos, (v) => `${v}%`);
  const existingOpacity = useTransform(pos, [4, 14], [0, 1]);
  const proposedOpacity = useTransform(pos, [86, 96], [1, 0]);

  // read-out + ARIA follow the line without re-rendering React every frame
  useEffect(
    () =>
      pos.on("change", (v) => {
        const n = Math.round(v);
        slider.current?.setAttribute("aria-valuenow", String(n));
        slider.current?.setAttribute("aria-valuetext", `${n}% existing room shown`);
        if (readout.current) readout.current.textContent = String(n).padStart(3, "0");
      }),
    [pos],
  );

  // one hint sweep the first time the sheet comes into view
  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const c = animate(pos, [50, 74, 28, 50], { duration: 2.6, ease: "easeInOut", delay: 0.3 });
    return () => c.stop();
  }, [inView, reduce, pos]);

  const setFromClientX = (clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const onHandle = (e.target as HTMLElement).closest("[role=slider]");
    if (e.pointerType !== "mouse" && !onHandle) return; // touch: let the page scroll
    touched.current = true;
    pos.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const v = pos.get();
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? v - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? v + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    touched.current = true;
    pos.stop();
    pos.set(Math.min(100, Math.max(0, next)));
  };

  // pick a revision: highlight its cloud and slide the line so the change is on the proposed side
  const focusRevision = (i: number | null) => {
    setActive(i);
    if (i === null) return;
    touched.current = true;
    const target = Math.max(0, (retrofit.revisions[i].box[0] / W) * 100 - 6);
    if (pos.get() > target) animate(pos, target, { duration: reduce ? 0 : 0.7, ease: [0.3, 0.7, 0.2, 1] });
  };

  const img = (base: string) => ({
    src: asset(`${base}.webp`),
    srcSet: `${asset(`${base}-768.webp`)} 768w, ${asset(`${base}.webp`)} 1536w`,
    sizes: "(min-width: 1024px) 66vw, 100vw",
  });

  return (
    <section id="retrofit" aria-labelledby="retrofit-title" className="t-butter relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="retrofit-title" className="leading-[0.9]">
            <span className="label block text-graphite">
              Sheet {retrofit.dwg} <span className="text-accent">/</span> {retrofit.room}
            </span>
            <span className="mt-3 flex flex-wrap items-baseline gap-x-4">
              <span className="w-narrow text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Existing</span>
              <span className="w-wide text-[clamp(1.6rem,3.6vw,3.4rem)] font-[250] text-accent">/</span>
              <span className="w-wide text-[clamp(1.4rem,3vw,2.8rem)] font-[280] text-accent">proposed</span>
            </span>
          </h2>
          <p className="label max-w-[38ch] text-graphite">
            Retrofit is most of our work. We keep what is good and change only what needs changing. Drag the line.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_minmax(300px,26%)] lg:gap-10">
          {/* ---------- comparison ---------- */}
          <figure>
            <div
              ref={frame}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              className="relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden border border-ink/70 bg-ink md:cursor-ew-resize"
            >
              {/* proposed (base layer) + revision clouds, which only show on the proposed side */}
              <img {...img(retrofit.after.src)} alt={retrofit.after.alt} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                {retrofit.revisions.map((r, i) => (
                  <g
                    key={r.rev}
                    className="transition-opacity duration-300"
                    opacity={active === null ? 0.85 : active === i ? 1 : 0.18}
                  >
                    <path d={cloudPath(r.box)} fill="none" stroke="var(--accent)" strokeWidth={active === i ? 5 : 3.5} />
                    <path d={`M${r.box[0] + 26} ${r.box[1] + 10}l22 38h-44z`} fill="var(--accent)" />
                    <text x={r.box[0] + 26} y={r.box[1] + 42} textAnchor="middle" fill="var(--paper)" fontSize={20} fontFamily="var(--font-martian)">
                      {r.rev}
                    </text>
                  </g>
                ))}
              </svg>

              {/* existing, cut at the line (transform only) */}
              <motion.div style={{ x: outerX }} className="absolute inset-0 overflow-hidden">
                <motion.img
                  {...img(retrofit.before.src)}
                  alt={retrofit.before.alt}
                  loading="lazy"
                  draggable={false}
                  style={{ x: innerX }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>

              {/* corner labels */}
              <motion.span style={{ opacity: existingOpacity }} className="label pointer-events-none absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[9px] text-paper">
                Existing · {retrofit.before.year}
              </motion.span>
              <motion.span style={{ opacity: proposedOpacity }} className="label pointer-events-none absolute right-3 top-3 bg-paper/90 px-2 py-1 text-[9px] text-ink">
                Proposed · built {retrofit.after.year}
              </motion.span>

              {/* the line */}
              <motion.div style={{ x: handleX }} className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-accent" />
                <div
                  ref={slider}
                  role="slider"
                  tabIndex={0}
                  aria-label="Compare existing and proposed"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={50}
                  aria-valuetext="50% existing room shown"
                  onKeyDown={onKeyDown}
                  className="pointer-events-auto absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center border-2 border-accent bg-paper text-accent outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:cursor-ew-resize"
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <span ref={readout} className="label absolute bottom-3 left-2 bg-accent px-1.5 py-0.5 text-[9px] text-paper">
                  050
                </span>
              </motion.div>
            </div>
            <figcaption className="label mt-3 flex flex-wrap justify-between gap-2 text-graphite">
              <span>Left: as found, {retrofit.before.year}</span>
              <span>Right: as built, {retrofit.after.year}</span>
            </figcaption>
          </figure>

          {/* ---------- revision schedule ---------- */}
          <div>
            <p className="label border-b border-ink pb-2 text-ink">Revision schedule</p>
            <ol onMouseLeave={() => focusRevision(null)}>
              {retrofit.revisions.map((r, i) => (
                <li key={r.rev} className="border-b border-rule">
                  <button
                    type="button"
                    onMouseEnter={() => focusRevision(i)}
                    onFocus={() => focusRevision(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => focusRevision(i)}
                    aria-pressed={active === i}
                    className={`grid w-full grid-cols-[2.2rem_1fr] gap-x-2 py-3.5 text-left transition-colors ${active === i ? "text-ink" : "text-ink/75"}`}
                  >
                    <span className={`label mt-0.5 flex size-6 items-center justify-center border text-[10px] ${active === i ? "border-accent bg-accent text-paper" : "border-accent text-accent"}`}>
                      {r.rev}
                    </span>
                    <span>
                      <span className="w-wide block text-[15px] font-medium">{r.title}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-ink/70">{r.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="label mt-4 text-graphite">Hover or tap a revision to find it in the room.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
