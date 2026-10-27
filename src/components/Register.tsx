import { projects } from "@/data/projects";

/** Drawing register: the index sheet of a drawing set, used here as the project list. */
export function Register() {
  return (
    <section id="work" aria-labelledby="register-title" className="t-white relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="register-title" className="leading-[0.9]">
            <span className="label block text-graphite">Sheet NF-100</span>
            <span className="w-narrow mt-3 block text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Drawing</span>
            <span className="w-wide block text-[clamp(1.1rem,2.2vw,2rem)] font-[280] text-accent">register of selected work</span>
          </h2>
          <p className="label max-w-[36ch] text-graphite">
            Four houses, each issued as a drawing first. Open a sheet to watch the drawing become the building.
          </p>
        </div>

        <table className="mt-2 w-full border-collapse text-left">
          <caption className="sr-only">Selected projects</caption>
          <thead>
            <tr className="label text-graphite">
              <th scope="col" className="py-3 pr-4 font-normal">Dwg</th>
              <th scope="col" className="py-3 pr-4 font-normal">Project</th>
              <th scope="col" className="hidden py-3 pr-4 font-normal md:table-cell">Location</th>
              <th scope="col" className="hidden py-3 pr-4 font-normal lg:table-cell">Type</th>
              <th scope="col" className="hidden py-3 pr-4 text-right font-normal sm:table-cell">Area</th>
              <th scope="col" className="py-3 text-right font-normal">Year</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.slug} className="group relative border-t border-rule transition-colors hover:bg-ink hover:text-paper">
                <td className="label whitespace-nowrap py-5 pr-4 align-baseline text-[11px] text-accent">{p.dwg}</td>
                <th scope="row" className="py-5 pr-4 text-left align-baseline">
                  <a
                    href={i === 0 ? "#top" : `#${p.slug}`}
                    className="w-wide text-lg font-medium after:absolute after:inset-0 sm:text-2xl"
                  >
                    {p.name}
                  </a>
                </th>
                <td className="hidden py-5 pr-4 align-baseline text-sm md:table-cell">{p.place}</td>
                <td className="label hidden py-5 pr-4 align-baseline lg:table-cell">{p.type}</td>
                <td className="label hidden py-5 pr-4 text-right align-baseline sm:table-cell">
                  {p.area} m²
                </td>
                <td className="label py-5 text-right align-baseline text-[11px]">{p.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
