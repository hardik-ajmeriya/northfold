"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Crosshair } from "./Crosshair";
import { Plate } from "../plate/Plate";
import { SheetFrame } from "./SheetFrame";
import { STAGES } from "./stages";
import { TitleBlock } from "./TitleBlock";

const project = projects[0];

/*
 * Scroll story of the pinned hero (p = 0 → 1):
 *   0.04 – 0.42  every line of the drawing is drawn, ground first, then the house
 *   0.30 – 0.50  dimension lines + the full ink drawing (brick, glass, detail)
 *   0.52 – 0.84  the photograph is revealed behind a section line, left to right
 *   0.86 – 0.94  "BUILT" stamp
 */

export function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });

  // reduced motion: same markup, everything shown in its finished state
  const reduceMV = useMotionValue(0);
  useEffect(() => reduceMV.set(reduce ? 1 : 0), [reduce, reduceMV]);
  const p = useTransform<number, number>([scrollYProgress, reduceMV], ([s, r]) => (r ? 1 : s));

  const draw = useTransform(p, [0.04, 0.42], [0, 1]);
  const ink = useTransform(p, [0.3, 0.5], [0, 1]);
  const dims = useTransform(p, [0.3, 0.46], [0, 1]);
  const dimsOpacity = useTransform(p, [0.3, 0.36, 0.84, 0.92], [0, 1, 1, 0.35]);
  const reveal = useTransform(p, [0.52, 0.84], [0, 1]);
  const stamp = useTransform(p, [0.86, 0.92], [0, 1]);
  const stampScale = useTransform(stamp, [0, 1], [1.6, 1]);
  const cue = useTransform(p, [0, 0.05], [1, 0]);

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const s = STAGES.findLastIndex((st) => v >= st.at);
    setStage((cur) => (cur === s ? cur : s));
  });


  return (
    <div ref={wrapRef} id="top" className={`relative ${reduce ? "h-[100svh]" : "h-[420svh]"}`}>
      <section
        aria-label="Northfold Architects — from drawing to building"
        className="t-sky grid-paper sticky top-0 h-[100svh] overflow-hidden bg-paper text-ink"
      >
        <SheetFrame />
        <Crosshair />

        <div className="relative mx-auto grid h-full max-w-[1680px] grid-rows-[auto_1fr_auto] px-6 pb-9 pt-[5.6rem] sm:px-10 lg:grid-cols-[30%_1fr] lg:grid-rows-[1fr_auto] lg:gap-x-[4vw] lg:px-14 lg:pb-12 lg:pt-28">
          {/* ---------- words ---------- */}
          <div className="relative z-10 lg:col-start-1 lg:row-start-1">
            <p className="label text-graphite">
              Northfold Architects <span className="text-accent">/</span> Annecy · London
            </p>
            <h1 className="mt-4 leading-[0.86] tracking-[-0.01em] lg:mt-8">
              <span className="w-narrow block text-[clamp(4.6rem,9.4vw,9.5rem)] font-[850] uppercase">Drawn</span>
              <span className="w-wide block pl-[0.06em] text-[clamp(1.6rem,3.1vw,3.2rem)] font-[280] leading-[1.15] text-accent">
                before it is
              </span>
              <span className="w-narrow block text-[clamp(4.6rem,9.4vw,9.5rem)] font-[850] uppercase">
                built<span className="text-accent">.</span>
              </span>
            </h1>
          </div>

          {/* ---------- intro + stage tracker ---------- */}
          <div className="relative z-10 mt-5 lg:col-start-1 lg:row-start-2 lg:mt-0">
            <p className="max-w-[34ch] text-sm leading-relaxed text-ink/80 [@media(max-height:740px)]:hidden lg:text-[15px] lg:[@media(max-height:740px)]:block">
              We design private houses and careful retrofits. Every one starts as a pencil line, and every line
              is there for a reason.
            </p>
            <ol className="mt-5 grid grid-cols-3 gap-3 lg:mt-8" aria-label="Drawing stage">
              {STAGES.map((s, i) => (
                <li key={s.rev} className="label" aria-current={i === stage ? "step" : undefined}>
                  <span className={`block h-px transition-colors duration-500 ${i <= stage ? "bg-ink" : "bg-ink/20"}`} />
                  <span className={`mt-2 block transition-colors ${i === stage ? "text-ink" : "text-graphite/70"}`}>
                    0{i + 1} {s.short}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- right column: the sheet ---------- */}
          <div className="relative row-start-2 mt-5 flex min-h-0 flex-col justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
            <div className="mx-auto w-full max-w-[min(100%,calc((100svh-15rem)*1.5))]">
              <Plate
                project={project}
                draw={draw}
                ink={ink}
                reveal={reveal}
                dims={dims}
                dimsOpacity={dimsOpacity}
                priority
              >
                <motion.div
                  style={{ opacity: stamp, scale: stampScale, rotate: -8 }}
                  className="absolute left-[5%] top-[7%] border-2 border-accent px-3 py-2 text-accent"
                  aria-hidden="true"
                >
                  <span className="label block text-[9px]">Northfold · {project.dwg}</span>
                  <span className="w-wide block text-xl font-bold leading-none tracking-[0.12em] sm:text-2xl">
                    BUILT {project.year}
                  </span>
                </motion.div>
              </Plate>
            </div>

            <TitleBlock project={project} stage={stage} />
          </div>
        </div>

        {/* scroll cue */}
        <motion.p
          style={{ opacity: cue }}
          className="label pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-graphite lg:flex"
          aria-hidden="true"
        >
          Scroll to build <span className="inline-block animate-bounce">↓</span>
        </motion.p>
      </section>
    </div>
  );
}
