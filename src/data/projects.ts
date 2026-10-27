import hillside from "./lines/1-hillside.json";
import timber from "./lines/2-timber.json";
import coastal from "./lines/3-coastal.json";
import townhouse from "./lines/4-townhouse.json";

/** Line drawing traced from the raster drawing (tools/trace.py), in image pixels (1536 x 1024). */
export type LineSet = { w: number; h: number; lines: number[][] };

export type Project = {
  slug: string;
  dwg: string; // drawing number on the title block
  name: string;
  place: string;
  year: number;
  type: string;
  area: number; // m²
  photo: string;
  drawing: string;
  lines: LineSet;
  /** small nudge (in % of the image) so the drawing sits exactly on the photo */
  offset: { x: number; y: number };
  /** overall building size shown on the dimension lines, in mm */
  dims: { width: number; height: number };
  /** building outline in image pixels [left, top, right, bottom], used for the dimension lines */
  bbox: [number, number, number, number];
  /** how the photograph is revealed on this sheet */
  wipe: "left" | "top" | "bottom" | "center";
  /** colour theme class for this sheet (see globals.css), taken from the photo */
  theme: string;
  /** false when the drawing's perspective doesn't match the photo closely enough to overlay it */
  xray?: boolean;
  summary: string;
  /** "general notes" column of the sheet */
  notes: string[];
};

export const projects: Project[] = [
  {
    slug: "hillside",
    dwg: "NF-101",
    name: "Hillside House",
    place: "Lake Annecy, France",
    year: 2025,
    type: "New build",
    area: 312,
    photo: "/img/house-1-hillside",
    drawing: "/img/drawing-1-hillside",
    lines: hillside,
    offset: { x: -0.5, y: 0 },
    dims: { width: 21600, height: 7400 },
    bbox: [415, 170, 1505, 690],
    theme: "t-sky",
    wipe: "left",
    summary:
      "A concrete box that steps off the slope, so the living room floats above the lake view and the garden runs underneath it.",
    notes: [
      "Board-marked concrete, poured in 300 mm lifts.",
      "6.4 m cantilever, no columns on the view side.",
      "Glazing set back 900 mm for summer shade.",
    ],
  },
  {
    slug: "timber",
    dwg: "NF-102",
    name: "Courtyard House",
    place: "Mornington, Australia",
    year: 2024,
    type: "New build",
    area: 268,
    photo: "/img/house-2-timber",
    drawing: "/img/drawing-2-timber",
    lines: timber,
    offset: { x: -1.5, y: 0.8 },
    dims: { width: 34200, height: 3600 },
    bbox: [8, 212, 1528, 640],
    theme: "t-green",
    wipe: "top",
    xray: false,
    summary:
      "Two low timber wings around a dry garden. Every room opens to the courtyard, none faces the road.",
    notes: [
      "Charred spotted-gum cladding, 90 mm boards.",
      "Roof overhang tuned to the winter sun angle.",
      "Rainwater from the roof feeds the garden.",
    ],
  },
  {
    slug: "coastal",
    dwg: "NF-103",
    name: "Cliff Pavilion",
    place: "Mallorca, Spain",
    year: 2024,
    type: "New build",
    area: 405,
    photo: "/img/house-3-coastal",
    drawing: "/img/drawing-3-coastal",
    lines: coastal,
    offset: { x: 0.5, y: 0.8 },
    dims: { width: 26800, height: 7900 },
    bbox: [90, 210, 1105, 610],
    theme: "t-teal",
    wipe: "center",
    summary:
      "A white pavilion on a cliff edge, with an infinity pool that lines up with the horizon from the sofa.",
    notes: [
      "Pool edge level set to the sea horizon, ±5 mm.",
      "Local limestone walls rebuilt from site spoil.",
      "Deep slab edges hide the sliding door tracks.",
    ],
  },
  {
    slug: "townhouse",
    dwg: "NF-104",
    name: "Canonbury Townhouse",
    place: "London, United Kingdom",
    year: 2023,
    type: "Retrofit + roof extension",
    area: 186,
    photo: "/img/house-4-townhouse",
    drawing: "/img/drawing-4-townhouse",
    lines: townhouse,
    offset: { x: -0.5, y: -1.6 },
    dims: { width: 5600, height: 13100 },
    bbox: [528, 40, 1057, 895],
    theme: "t-brick",
    wipe: "bottom",
    summary:
      "A Victorian brick house kept as it was on the street, with a glass roof room and a garden link added behind.",
    notes: [
      "Front facade repaired, not replaced.",
      "Roof extension set back 1.5 m from the parapet.",
      "New glass link stands clear of the old wall.",
    ],
  },
];

/** One SVG path with every line as its own sub-path. A single stroke-dash then "draws" them in order. */
export const toPath = (set: LineSet) =>
  set.lines.map(([x1, y1, x2, y2]) => `M${x1} ${y1}L${x2} ${y2}`).join("");
