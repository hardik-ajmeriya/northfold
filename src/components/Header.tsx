import { Logo } from "./Logo";

const NAV = [
  { n: "01", label: "Work", href: "#work" },
  { n: "02", label: "Practice", href: "#practice" },
  { n: "03", label: "Process", href: "#process" },
  { n: "04", label: "Contact", href: "#contact" },
];

/** Sits inside the top margin of the sheet. */
export function Header() {
  return (
    <header className="fixed inset-x-[25px] top-[25px] z-40 border-b border-ink/15 bg-white sm:inset-x-[31px] sm:top-[31px]">
      <div className="mx-auto flex h-12 max-w-[1680px] items-center justify-between px-3 sm:px-5 lg:px-8">
        <a href="#top" aria-label="Northfold Architects, home" className="text-ink">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group label flex items-baseline gap-1.5 text-[11px] text-ink">
                  <span className="text-[9px] text-graphite">{item.n}</span>
                  <span className="bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="label flex items-center gap-2 border border-ink px-2.5 py-1.5 text-[10px] text-ink transition-colors hover:bg-ink hover:text-paper">
          <span className="size-1.5 bg-accent" aria-hidden="true" />
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Start a project</span>
        </a>
      </div>
    </header>
  );
}
