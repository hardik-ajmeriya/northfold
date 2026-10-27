"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/data/projects";

const mm = (n: number) => n.toLocaleString("en-GB").replace(/,/g, " ");

/** Architectural dimension strings (overall width + height, in mm) drawn over the image. */
export function Dimensions({
  project,
  progress,
  opacity,
}: {
  project: Project;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const [l, t, r, b] = project.bbox;
  const { w, h } = project.lines;
  const gap = 46; // distance between the building and the dimension line
  const y = Math.max(28, t - gap);
  const x = l - gap;
  const showHeight = x > 24; // no room on the left: width only
  const text = useTransform(progress, [0.7, 1], [0, 1]);
  const tick = (cx: number, cy: number) => `M${cx - 9} ${cy + 9}L${cx + 9} ${cy - 9}`;

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/3] w-full overflow-visible sm:aspect-[3/2]"
      style={{ opacity, transform: `translate(${project.offset.x}%, ${project.offset.y}%)` }}
      aria-hidden="true"
    >
      <g stroke="var(--accent)" strokeWidth={2} fill="none">
        {/* width */}
        <motion.path d={`M${l} ${y}L${r} ${y}`} style={{ pathLength: progress }} />
        <motion.path d={`M${l} ${y - 16}L${l} ${t - 8}M${r} ${y - 16}L${r} ${t - 8}`} style={{ pathLength: progress }} />
        <motion.path d={tick(l, y) + tick(r, y)} style={{ opacity: text }} />
        {showHeight && (
          <>
            <motion.path d={`M${x} ${t}L${x} ${b}`} style={{ pathLength: progress }} />
            <motion.path d={`M${x - 16} ${t}L${l - 8} ${t}M${x - 16} ${b}L${l - 8} ${b}`} style={{ pathLength: progress }} />
            <motion.path d={tick(x, t) + tick(x, b)} style={{ opacity: text }} />
          </>
        )}
      </g>
      <motion.g style={{ opacity: text }} fill="var(--accent)" fontFamily="var(--font-martian)" fontSize={22}>
        <text x={(l + r) / 2} y={y - 12} textAnchor="middle">
          {mm(project.dims.width)}
        </text>
        {showHeight && (
          <text x={x - 12} y={(t + b) / 2} textAnchor="middle" transform={`rotate(-90 ${x - 12} ${(t + b) / 2})`}>
            {mm(project.dims.height)}
          </text>
        )}
      </motion.g>
    </motion.svg>
  );
}
