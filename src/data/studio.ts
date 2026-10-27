/** Practice, process and contact content (all fictional: Northfold is a portfolio demo studio). */

export const process = [
  {
    no: "01",
    name: "Survey",
    weeks: "2–3 wks",
    text: "We measure the site or the building to the millimetre, walk it at different times of day and list what must stay.",
    out: ["Measured survey", "Site levels", "Brief"],
  },
  {
    no: "02",
    name: "Sketch",
    weeks: "4–6 wks",
    text: "Loose drawings and card models. Three options, one conversation, one direction. Nothing is fixed yet.",
    out: ["Sketch options", "Massing model", "Cost range"],
  },
  {
    no: "03",
    name: "Drawings",
    weeks: "8–14 wks",
    text: "Planning and technical drawings, every junction detailed. The builder prices exactly what will be built.",
    out: ["Planning set", "Construction set", "Specification"],
  },
  {
    no: "04",
    name: "Build",
    weeks: "On site",
    text: "We stay on site until handover: weekly visits, answers within a day, and a snagging list we close ourselves.",
    out: ["Site visits", "Snagging", "Handover file"],
  },
] as const;

export const people = [
  { initials: "EM", name: "Elise Marchand", role: "Founding director", office: "Annecy", stamp: "Drawn by" },
  { initials: "TO", name: "Tom Okafor", role: "Director", office: "London", stamp: "Checked by" },
  { initials: "SR", name: "Sofia Ruiz", role: "Associate, retrofit", office: "London", stamp: "Detailed by" },
  { initials: "JW", name: "Jonas Weber", role: "Architect, interiors", office: "Annecy", stamp: "Specified by" },
] as const;

export const facts = [
  ["Founded", "2014"],
  ["Houses built", "38"],
  ["Retrofits", "61%"],
  ["Studios", "2"],
] as const;

export const offices = [
  { city: "Annecy", lines: ["12 rue Sainte-Claire", "74000 Annecy, France"], tz: "Europe/Paris" },
  { city: "London", lines: ["4 Canonbury Lane", "London N1, United Kingdom"], tz: "Europe/London" },
] as const;

export const projectTypes = ["New house", "Retrofit", "Extension", "Interior"] as const;
export const budgets = ["Under £500k", "£500k – £1.5m", "£1.5m – £3m", "£3m +"] as const;
