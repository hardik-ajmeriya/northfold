// Turns the static export in /out into a portable demo that works from any sub-folder
// (e.g. a shared preview link): absolute "/_next/" paths become relative "./assets/".
// Not needed for Vercel. Usage: npm run build:demo
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const root = "out";
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));

for (const file of walk(root)) {
  const ext = extname(file);
  if (![".html", ".js", ".css", ".txt"].includes(ext)) continue;
  let s = readFileSync(file, "utf8");
  const before = s;
  if (ext === ".css") s = s.replaceAll("url(/_next/static/media/", "url(../media/");
  else {
    s = s.replace(/(["'(]|\\")\/_next\//g, "$1./assets/");
    s = s.replace(/(="|\\")\/(icon\.svg|og\.jpg)/g, "$1./$2");
  }
  if (s !== before) writeFileSync(file, s);
}
// some static hosts reserve names starting with "_"
renameSync(join(root, "_next"), join(root, "assets"));
console.log("demo export ready in /out");
