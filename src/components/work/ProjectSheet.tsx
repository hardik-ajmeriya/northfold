"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SheetFrame } from "../hero/SheetFrame";
import { Plate } from "../plate/Plate";

/** A pinned drawing sheet: the plate on the left, the sheet's title column on the right. */
export function ProjectSheet({ project, index, total }: { project: Project; index: number; total: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const reduceMV = useMotionValue(0);
  useEffect(() => reduceMV.set(reduce ? 1 : 0), [reduce, reduceMV]);
  const p = useTransform<number, number>([scrollYProgress, reduceMV], ([s, r]) => (r ? 1 : s));

  const draw = useTransform(p, [0.04, 0.42], [0, 1]);
  const ink = useTransform(p, [0.3, 0.5], [0, 1]);
  const dims = useTransform(p, [0.3, 0.45], [0, 1]);
  const dimsOpacity = useTransform(p, [0.3, 0.36, 0.8, 0.9], [0, 1, 1, 0.35]);
  const reveal = useTransform(p, [0.5, 0.86], [0, 1]);
  const bar = useTransform(p, [0.04, 0.86], [0, 1]);

  const [first, ...rest] = project.name.split(" ");
  const facts = [
    ["Location", project.place],
    ["Type", project.type],
    ["Area", `${project.area} m²`],
    ["Completed", String(project.year)],
  ];

  return (
    <div ref={ref} id={project.slug} className={`relative ${reduce ? "" : "h-[240svh]"}`}>
      <section
        aria-labelledby={`${project.slug}-title`}
        className={`${project.theme} grid-paper sticky top-0 h-[100svh] overflow-hidden bg-paper text-ink`}
      >
        <SheetFrame />
        <div className="relative mx-auto grid h-full max-w-[1680px] grid-rows-[1fr_auto] gap-5 px-6 pb-9 pt-[5.6rem] sm:px-10 lg:grid-cols-[1fr_minmax(280px,22%)] lg:grid-rows-1 lg:gap-0 lg:px-14 lg:pb-12 lg:pt-28">
          {/* plate */}
          <div className="flex min-h-0 items-center lg:pr-[3vw]">
            <div className="mx-auto w-full max-w-[min(100%,calc((100svh-12rem)*1.5))]">
              <Plate project={project} draw={draw} ink={ink} reveal={reveal} dims={dims} dimsOpacity={dimsOpacity} />
            </div>
          </div>

          {/* title column */}
          <div className="flex flex-col border-t border-ink/70 pt-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-1">
            <div className="flex items-baseline justify-between">
              <span className="label text-[11px] text-accent">{project.dwg}</span>
              <span className="label text-graphite">
                Sheet {index + 1} of {total}
              </span>
            </div>
            <h3 id={`${project.slug}-title`} className="mt-2 leading-[0.88] lg:mt-6">
              <span className="w-narrow block text-[clamp(2.6rem,4vw,4.4rem)] font-[850] uppercase">{first}</span>
              <span className="w-wide block text-[clamp(1.1rem,1.6vw,1.6rem)] font-[280] text-accent">{rest.join(" ")}</span>
            </h3>

            {/* progress from drawing to building */}
            <div className="mt-4 lg:mt-6" aria-hidden="true">
              <div className="label flex justify-between text-[9px] text-graphite">
                <span>Drawing</span>
                <span>Built</span>
              </div>
              <div className="mt-1.5 h-px bg-ink/20">
                <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-accent" />
              </div>
            </div>

            <dl className="mt-4 lg:mt-6">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 border-t border-rule py-1.5 lg:py-2">
                  <dt className="label text-graphite">{k}</dt>
                  <dd className="truncate text-right text-[13px]">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-ink/80 [@media(max-height:700px)]:hidden lg:mt-6 lg:[@media(max-height:700px)]:block">{project.summary}</p>

            <div className="mt-auto hidden pt-6 lg:block">
              <p className="label text-graphite">General notes</p>
              <ol className="mt-2 space-y-1.5">
                {project.notes.map((n, i) => (
                  <li key={n} className="label flex gap-2 text-[10px] normal-case tracking-normal text-ink/80">
                    <span className="text-accent">{i + 1}.</span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
