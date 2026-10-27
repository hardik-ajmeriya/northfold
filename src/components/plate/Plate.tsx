"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";
import { toPath, type Project } from "@/data/projects";
import { asset } from "@/lib/asset";
import { Dimensions } from "./Dimensions";

/**
 * One drawing "plate": traced lines → ink drawing → photograph, all driven by motion values.
 *   draw    0 → 1  lines drawn in order (one stroke-dash over a single path)
 *   ink     0 → 1  raster ink drawing fades in (brick, glazing bars, detail)
 *   reveal  0 → 1  photograph revealed; direction comes from project.wipe
 */
export function Plate({
  project,
  draw,
  ink,
  reveal,
  dims,
  dimsOpacity,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  children,
}: {
  project: Project;
  draw: MotionValue<number>;
  ink: MotionValue<number>;
  reveal: MotionValue<number>;
  dims: MotionValue<number>;
  dimsOpacity: MotionValue<number>;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  const [xray, setXray] = useState(false);
  const linesOpacity = useTransform(reveal, [0, 0.35, 1], [1, 1, 0]);
  const wipe = useWipe(project.wipe, reveal);
  const scanOpacity = useTransform(reveal, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);
  const done = useTransform(reveal, (v) => (v > 0.98 ? 1 : 0));
  const clickable = useTransform(done, (d) => (d ? "auto" : "none"));
  const nudge = { transform: `translate(${project.offset.x}%, ${project.offset.y}%)` };
  const path = toPath(project.lines);
  const img = (base: string) => ({
    src: asset(`${base}.webp`),
    srcSet: `${asset(`${base}-768.webp`)} 768w, ${asset(`${base}.webp`)} 1536w`,
    sizes,
  });

  return (
    <figure className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2]">
        <motion.img
          {...img(project.drawing)}
          alt=""
          aria-hidden="true"
          loading={priority ? "eager" : "lazy"}
          style={{ opacity: ink, ...nudge }}
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        />

        <motion.div style={wipe.outer} className="absolute inset-0 overflow-hidden">
          <motion.img
            {...img(project.photo)}
            alt={`${project.name}, ${project.place}`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            style={wipe.inner}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        <motion.svg
          viewBox={`0 0 ${project.lines.w} ${project.lines.h}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          style={{ opacity: linesOpacity, ...nudge }}
          aria-hidden="true"
        >
          <motion.path d={path} fill="none" stroke="var(--ink)" strokeWidth={2.2} style={{ pathLength: draw }} />
        </motion.svg>

        {/* "X-ray": the drawing laid over the finished photograph */}
        <svg
          viewBox={`0 0 ${project.lines.w} ${project.lines.h}`}
          preserveAspectRatio="xMidYMid slice"
          className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500 ${xray ? "opacity-100" : "opacity-0"}`}
          style={nudge}
          aria-hidden="true"
        >
          <path d={path} fill="none" stroke="#fff" strokeWidth={2.4} opacity={0.95} />
        </svg>

        <motion.div style={{ ...wipe.scan, opacity: scanOpacity }} className="pointer-events-none absolute inset-0" aria-hidden="true">
          {project.wipe === "center" ? (
            <div className="absolute inset-0 outline outline-[1.5px] -outline-offset-1 outline-accent" />
          ) : (
            <div className={`absolute bg-accent ${wipe.edge}`} />
          )}
        </motion.div>

        {children}

        {project.xray !== false && (
        <motion.button
          type="button"
          onClick={() => setXray((v) => !v)}
          aria-pressed={xray}
          style={{ opacity: done, pointerEvents: clickable }}
          className="label absolute bottom-3 right-3 flex items-center gap-2 border border-paper/70 bg-ink/70 px-2.5 py-1.5 text-[9px] text-paper backdrop-blur-[2px] transition-colors hover:bg-ink"
        >
          <span className={`size-1.5 ${xray ? "bg-accent" : "bg-paper/60"}`} aria-hidden="true" />
          {xray ? "Hide drawing" : "Show drawing"}
        </motion.button>
        )}
      </div>
      <Dimensions project={project} progress={dims} opacity={dimsOpacity} />
    </figure>
  );
}

/** Transform-only reveals (no clip-path repaint), except "center" which grows a clip rectangle. */
function useWipe(mode: Project["wipe"], reveal: MotionValue<number>) {
  const fwd = useTransform(reveal, [0, 1], ["-100%", "0%"]);
  const back = useTransform(reveal, [0, 1], ["100%", "0%"]);
  const inset = useTransform(reveal, (v) => {
    const i = (1 - v) * 50;
    return `inset(${i}% ${i}% ${i}% ${i}%)`;
  });
  switch (mode) {
    case "top":
      return { outer: { y: fwd }, inner: { y: back }, scan: { y: fwd }, edge: "inset-x-0 bottom-0 h-[1.5px]" };
    case "bottom":
      return { outer: { y: back }, inner: { y: fwd }, scan: { y: back }, edge: "inset-x-0 top-0 h-[1.5px]" };
    case "center":
      return { outer: { clipPath: inset }, inner: {}, scan: { clipPath: inset }, edge: "" };
    default:
      return { outer: { x: fwd }, inner: { x: back }, scan: { x: fwd }, edge: "inset-y-0 right-0 w-[1.5px]" };
  }
}
