import { facts, people } from "@/data/studio";

/** Sheet NF-401. The practice, with the team listed the way a drawing credits who drew and checked it. */
export function Practice() {
  return (
    <section id="practice" aria-labelledby="practice-title" className="t-pink relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-10 border-b border-ink pb-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <h2 id="practice-title" className="leading-[0.9]">
            <span className="label block text-graphite">
              Sheet NF-401 <span className="text-accent">/</span> Practice
            </span>
            <span className="w-narrow mt-3 block text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Small</span>
            <span className="w-wide block text-[clamp(1.1rem,2.2vw,2rem)] font-[280] text-accent">on purpose</span>
          </h2>
          <div className="self-end">
            <p className="w-wide text-[clamp(1.05rem,1.5vw,1.35rem)] font-[300] leading-snug">
              Twelve people in two studios. We take on six houses a year, so the person who draws your first sketch
              is the one standing on site when the roof goes on.
            </p>
            <dl className="mt-8 grid grid-cols-2 border-t border-ink/70 sm:grid-cols-4">
              {facts.map(([k, v], i) => (
                <div key={k} className={`border-b border-ink/70 py-3 sm:border-b-0 ${i % 2 ? "pl-4" : ""} sm:pl-4 sm:first:pl-0 ${i ? "sm:border-l" : ""} ${i % 2 ? "border-l" : ""}`}>
                  <dt className="label text-graphite">{k}</dt>
                  <dd className="w-narrow mt-1 text-4xl font-[800]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* team as a drawing credit block */}
        <ul className="mt-10 grid border-l border-t border-ink/70 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <li key={p.name} className="group relative border-b border-r border-ink/70 bg-paper p-5">
              <p className="label flex justify-between text-graphite">
                <span>{p.stamp}</span>
                <span>{p.office}</span>
              </p>
              {/* initials drawn as a monogram box, like the "drawn / checked" initials on a title block */}
              <div className="mt-6 flex size-20 items-center justify-center border border-ink/70 transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                <span className="w-wide text-2xl font-[600] tracking-[0.08em]">{p.initials}</span>
              </div>
              <p className="w-wide mt-6 text-lg font-medium leading-tight">{p.name}</p>
              <p className="label mt-1 text-graphite">{p.role}</p>
              <span className="absolute right-5 top-[4.6rem] h-px w-0 bg-accent transition-[width] duration-500 group-hover:w-12" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
