/** Northfold mark: a drawing sheet with its corner folded (the olive fold), and an N drawn in one stroke. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
        <path d="M5 5h15l7 7v15H5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 5v7h7" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
        <path d="M11 22V12l10 10V15" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="w-wide text-[15px] font-semibold tracking-[0.18em]">NORTHFOLD</span>
    </span>
  );
}
