/** Before / after of the Canonbury Townhouse front room (sheet NF-201). Boxes are in image px (1536 x 1024). */
export const retrofit = {
  dwg: "NF-201",
  room: "Front room, Canonbury Townhouse",
  before: { src: "/img/before", year: 2022, alt: "The front room as found: floral wallpaper and carpet, heavy brown curtains and a dark wood fireplace" },
  after: { src: "/img/after", year: 2023, alt: "The same room restored: pale walls, bare wooden floor, linen curtains and a marble fireplace that keeps the old tiles" },
  revisions: [
    { rev: "1", title: "Fireplace", text: "Dark surround swapped for marble. The original Victorian tiles stay.", box: [120, 400, 413, 920] },
    { rev: "2", title: "Sash window", text: "Repaired and draught-proofed, not replaced. Heavy curtains out, linen in.", box: [673, 180, 849, 567] },
    { rev: "3", title: "Walls", text: "Four layers of wallpaper stripped back to lime plaster.", box: [1160, 133, 1427, 507] },
    { rev: "4", title: "Floor", text: "Carpet lifted. The pine boards underneath were sanded and kept.", box: [380, 700, 1000, 1010] },
    { rev: "5", title: "Lighting", text: "Fringed shade replaced by a paper lantern on a dimmer.", box: [662, 12, 871, 170] },
  ],
} as const;

export type Revision = (typeof retrofit.revisions)[number];

/** Revision cloud: the scalloped outline architects draw around a change. */
export function cloudPath([x1, y1, x2, y2]: readonly number[], r = 22) {
  const arcs = (ax: number, ay: number, bx: number, by: number) => {
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(2, Math.round(len / (r * 1.6)));
    let d = "";
    for (let i = 1; i <= n; i++) {
      const x = ax + ((bx - ax) * i) / n;
      const y = ay + ((by - ay) * i) / n;
      d += `A${r} ${r} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  };
  return `M${x1} ${y1}${arcs(x1, y1, x2, y1)}${arcs(x2, y1, x2, y2)}${arcs(x2, y2, x1, y2)}${arcs(x1, y2, x1, y1)}Z`;
}
