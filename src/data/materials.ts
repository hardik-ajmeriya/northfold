/** Sheet NF-301: interiors and the materials schedule. Keynote points are in image px (1536 x 1024). */

export type MaterialCode = "TV-01" | "CN-02" | "OK-03" | "BR-04";

export const materials: {
  code: MaterialCode;
  name: string;
  img: string;
  spec: [string, string][];
}[] = [
  {
    code: "TV-01",
    name: "Roman travertine",
    img: "/img/material-travertine",
    spec: [
      ["Finish", "Honed, unfilled"],
      ["Origin", "Tivoli, Italy"],
      ["Format", "Book-matched slabs, 30 mm"],
    ],
  },
  {
    code: "CN-02",
    name: "Board-marked concrete",
    img: "/img/material-concrete",
    spec: [
      ["Finish", "As struck, matt sealer"],
      ["Origin", "Cast on site"],
      ["Format", "Pine boards, 150 mm"],
    ],
  },
  {
    code: "OK-03",
    name: "European white oak",
    img: "/img/material-oak",
    spec: [
      ["Finish", "Hard-wax oil"],
      ["Origin", "France, FSC certified"],
      ["Format", "Solid, quarter sawn"],
    ],
  },
  {
    code: "BR-04",
    name: "Brushed brass",
    img: "/img/material-brass",
    spec: [
      ["Finish", "Unlacquered, darkens with use"],
      ["Origin", "Birmingham, UK"],
      ["Format", "Solid bar and tube"],
    ],
  },
];

export type Keynote = { code: MaterialCode; at: [number, number]; label: string; /** tag offset in px */ d: [number, number] };

export const rooms: { id: string; sheet: string; name: string; house: string; img: string; alt: string; keynotes: Keynote[] }[] = [
  {
    id: "kitchen",
    sheet: "I-01",
    name: "Kitchen",
    house: "Courtyard House",
    img: "/img/interior-1-kitchen",
    alt: "Kitchen with a long travertine island, walnut cabinets and a garden beyond floor-to-ceiling glass",
    keynotes: [
      { code: "TV-01", at: [900, 720], label: "Island", d: [150, 90] },
      { code: "BR-04", at: [886, 500], label: "Tap", d: [-210, -150] },
      { code: "TV-01", at: [560, 880], label: "Floor", d: [-250, -10] },
    ],
  },
  {
    id: "living",
    sheet: "I-02",
    name: "Living room",
    house: "Hillside House",
    img: "/img/interior-2-living",
    alt: "Double-height living room with board-marked concrete walls, a travertine table and a view over the hills",
    keynotes: [
      { code: "CN-02", at: [130, 230], label: "Wall", d: [120, -110] },
      { code: "CN-02", at: [1380, 360], label: "Wall", d: [-120, -200] },
      { code: "TV-01", at: [632, 736], label: "Table", d: [190, 130] },
      { code: "OK-03", at: [380, 640], label: "Chair", d: [-90, 210] },
    ],
  },
  {
    id: "bath",
    sheet: "I-03",
    name: "Bathroom",
    house: "Cliff Pavilion",
    img: "/img/interior-3-bath",
    alt: "Bathroom lined in travertine with a carved stone bath, brass taps and a skylight",
    keynotes: [
      { code: "TV-01", at: [770, 760], label: "Bath", d: [260, 110] },
      { code: "TV-01", at: [600, 300], label: "Walls", d: [190, -150] },
      { code: "BR-04", at: [800, 602], label: "Taps", d: [230, -140] },
      { code: "BR-04", at: [110, 152], label: "Shower", d: [150, 70] },
    ],
  },
];
