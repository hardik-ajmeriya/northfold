/** Drawing stages shown in the hero (p = scroll progress through the pinned hero, 0 → 1). */
export const STAGES = [
  { at: 0, rev: "A", status: "Line work", short: "Line" },
  { at: 0.46, rev: "B", status: "Detail design", short: "Detail" },
  { at: 0.7, rev: "C", status: "Built", short: "Built" },
] as const;
