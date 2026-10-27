import { Logo } from "./Logo";

const LINKS = [
  ["Work", "#work"],
  ["Retrofit", "#retrofit"],
  ["Interiors", "#interiors"],
  ["Practice", "#practice"],
  ["Process", "#process"],
  ["Contact", "#contact"],
] as const;

/** The last sheet ends with a full title block. */
export function Footer() {
  return (
    <footer className="t-white bg-paper px-6 pb-8 pt-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1680px]">
        <p aria-hidden="true" className="w-narrow select-none text-[clamp(4rem,19vw,19rem)] font-[850] uppercase leading-[0.8] tracking-[-0.01em]">
          Northfold<span className="text-accent">.</span>
        </p>

        <div className="mt-10 grid border border-ink/70 text-ink sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
          <div className="border-b border-ink/70 p-4 sm:border-r lg:border-b-0">
            <Logo />
            <p className="mt-3 max-w-[34ch] text-sm text-ink/70">Architecture for private houses and careful retrofits. Annecy and London.</p>
          </div>
          <nav aria-label="Footer" className="border-b border-ink/70 p-4 lg:border-b-0 lg:border-r">
            <p className="label text-graphite">Sheets</p>
            <ul className="mt-2 grid grid-cols-2 gap-y-1">
              {LINKS.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-sm hover:text-accent">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-b border-ink/70 p-4 sm:border-r sm:border-b-0 lg:border-r">
            <p className="label text-graphite">Elsewhere</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a href="mailto:studio@northfold.studio" className="hover:text-accent">
                  studio@northfold.studio
                </a>
              </li>
              <li className="text-ink/70">Instagram · @northfold.studio</li>
            </ul>
          </div>
          <dl className="grid grid-cols-2 p-4 lg:grid-cols-1">
            <div>
              <dt className="label text-graphite">Dwg</dt>
              <dd className="label mt-0.5 text-ink">NF-000 · Rev C</dd>
            </div>
            <div className="lg:mt-2">
              <dt className="label text-graphite">Issued</dt>
              <dd className="label mt-0.5 text-ink">© 2026 Northfold</dd>
            </div>
          </dl>
        </div>
        <p className="label mt-4 flex flex-wrap justify-between gap-2 text-graphite">
          <span>All drawings © Northfold Architects. Do not scale from this website.</span>
          <a href="#top" className="hover:text-ink">
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}
