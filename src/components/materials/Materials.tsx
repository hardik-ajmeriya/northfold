"use client";

import { useState } from "react";
import { materials, rooms, type MaterialCode } from "@/data/materials";
import { asset } from "@/lib/asset";

const W = 1536;
const H = 1024;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Sheet NF-301. Interiors with keynote tags (the boxed codes architects use to point at a material),
 * next to the materials schedule. Pick a material and its keynotes light up in the room.
 */
export function Materials() {
  const [room, setRoom] = useState(0);
  const [active, setActive] = useState<MaterialCode | null>(null);
  const current = rooms[room];

  // hover already selects on desktop, so a click only ever selects (never toggles off); "Show all" clears
  const pickMaterial = (code: MaterialCode) => setActive(code);

  return (
    <section id="interiors" aria-labelledby="materials-title" className="t-violet relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="materials-title" className="leading-[0.9]">
            <span className="label block text-graphite">
              Sheet NF-301 <span className="text-accent">/</span> Interiors
            </span>
            <span className="w-narrow mt-3 block text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Materials</span>
            <span className="w-wide block text-[clamp(1.1rem,2.2vw,2rem)] font-[280] text-accent">schedule, four and no more</span>
          </h2>
          <p className="label max-w-[38ch] text-graphite">
            We pick a few honest materials and use them everywhere. Choose one to see where it went.
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1fr_minmax(320px,30%)]">
          {/* ---------- interiors ---------- */}
          <div>
            <div role="tablist" aria-label="Interiors" className="flex border-b border-ink/70">
              {rooms.map((r, i) => (
                <button
                  key={r.id}
                  role="tab"
                  id={`tab-${r.id}`}
                  aria-selected={i === room}
                  aria-controls="room-panel"
                  onClick={() => setRoom(i)}
                  className={`label -mb-px flex flex-1 flex-col items-start border border-b-0 px-3 py-2 text-left transition-colors sm:flex-none sm:px-4 ${
                    i === room ? "border-ink/70 bg-paper text-ink" : "border-transparent text-graphite hover:text-ink"
                  }`}
                >
                  <span className="text-[9px] text-accent">{r.sheet}</span>
                  <span className="text-[10px]">{r.name}</span>
                </button>
              ))}
            </div>

            <div id="room-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="relative aspect-[3/2] w-full overflow-hidden border border-t-0 border-ink/70 bg-paper-2">
              {rooms.map((r, i) => (
                <img
                  key={r.id}
                  src={asset(`${r.img}.webp`)}
                  srcSet={`${asset(`${r.img}-768.webp`)} 768w, ${asset(`${r.img}.webp`)} 1536w`}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={i === room ? r.alt : ""}
                  aria-hidden={i !== room}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === room ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {/* leaders + target dots */}
              <svg key={current.id} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                {current.keynotes.map((k, i) => {
                  const on = active === null || active === k.code;
                  const [x, y] = k.at;
                  return (
                    <g key={i} className="transition-opacity duration-300" opacity={on ? 1 : 0.2}>
                      <line x1={x} y1={y} x2={x + k.d[0]} y2={y + k.d[1]} stroke="var(--paper)" strokeWidth={5} />
                      <line x1={x} y1={y} x2={x + k.d[0]} y2={y + k.d[1]} stroke="var(--accent)" strokeWidth={2.5} />
                      <circle cx={x} cy={y} r={9} fill="var(--accent)" stroke="var(--paper)" strokeWidth={3} />
                    </g>
                  );
                })}
              </svg>

              {/* keynote tags */}
              {current.keynotes.map((k, i) => {
                const on = active === null || active === k.code;
                const sel = active === k.code;
                return (
                  <button
                    key={`${current.id}-${i}`}
                    type="button"
                    onClick={() => pickMaterial(k.code)}
                    onMouseEnter={() => setActive(k.code)}
                    style={{ left: pct(k.at[0] + k.d[0], W), top: pct(k.at[1] + k.d[1], H) }}
                    className={`label absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap border px-1.5 py-1 text-[9px] transition-[opacity,background-color,color] duration-300 sm:px-2 sm:text-[10px] ${
                      sel ? "border-accent bg-accent text-paper" : "border-accent bg-paper text-ink"
                    } ${on ? "opacity-100" : "opacity-30"}`}
                    aria-label={`${k.label}: ${materials.find((m) => m.code === k.code)?.name}`}
                  >
                    <span className={sel ? "text-paper" : "text-accent"}>{k.code}</span>
                    <span className="hidden sm:inline">{k.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="label mt-3 flex justify-between text-graphite">
              <span>
                {current.sheet} · {current.name}
              </span>
              <span>{current.house}</span>
            </p>
          </div>

          {/* ---------- schedule ---------- */}
          <div onMouseLeave={() => setActive(null)}>
            <p className="label flex items-baseline justify-between border-b border-ink pb-2 text-ink">
              Materials schedule
              <button
                type="button"
                onClick={() => setActive(null)}
                className={`label text-[9px] text-accent underline-offset-2 hover:underline ${active ? "visible" : "invisible"}`}
              >
                Show all
              </button>
            </p>
            <ul className="grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {materials.map((m) => {
                const sel = active === m.code;
                const usedIn = rooms.filter((r) => r.keynotes.some((k) => k.code === m.code));
                return (
                  <li key={m.code} className="border-b border-rule py-4 lg:grid lg:grid-cols-[88px_1fr] lg:gap-4">
                    <Swatch img={m.img} name={m.name} selected={sel} onPick={() => pickMaterial(m.code)} onHover={() => setActive(m.code)} />
                    <div className="mt-3 lg:mt-0">
                      <p className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                        <span className={`label self-start whitespace-nowrap text-[10px] ${sel ? "bg-accent px-1 text-paper" : "text-accent"}`}>{m.code}</span>
                        <span className="w-wide text-[15px] font-medium leading-tight">{m.name}</span>
                      </p>
                      <dl className="mt-2 hidden sm:block">
                        {m.spec.map(([k, v]) => (
                          <div key={k} className="flex gap-2 text-[12px] leading-snug">
                            <dt className="label w-14 shrink-0 pt-px text-[9px] text-graphite">{k}</dt>
                            <dd className="text-ink/80">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-2 flex flex-wrap gap-1.5">
                        {usedIn.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              setRoom(rooms.indexOf(r));
                              setActive(m.code);
                            }}
                            className="label border border-ink/30 px-1.5 py-0.5 text-[9px] text-ink/80 transition-colors hover:border-ink hover:text-ink"
                          >
                            {r.sheet} {r.name}
                          </button>
                        ))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Square material sample. Hovering with a mouse turns it into a loupe that follows the pointer. */
function Swatch({
  img,
  name,
  selected,
  onPick,
  onHover,
}: {
  img: string;
  name: string;
  selected: boolean;
  onPick: () => void;
  onHover: () => void;
}) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);
  return (
    <button
      type="button"
      onClick={onPick}
      onPointerEnter={(e) => {
        onHover();
        if (e.pointerType === "mouse") setZoom(true);
      }}
      onPointerLeave={() => setZoom(false)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      aria-pressed={selected}
      aria-label={`Show where ${name} is used`}
      className={`relative block aspect-square w-full overflow-hidden border lg:w-[88px] ${selected ? "border-accent outline outline-2 outline-offset-2 outline-accent" : "border-ink/40"}`}
    >
      <img
        src={asset(`${img}-768.webp`)}
        alt=""
        loading="lazy"
        style={{ transformOrigin: origin }}
        className={`h-full w-full object-cover transition-transform duration-300 ease-out ${zoom ? "scale-[2.2]" : "scale-100"}`}
      />
    </button>
  );
}
