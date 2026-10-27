/** Border of a drawing sheet with grid references (A–F across, 1–4 down), like a printed A1 sheet. */
const COLS = ["A", "B", "C", "D", "E", "F"];
const ROWS = ["1", "2", "3", "4"];

export function SheetFrame() {
  return (
    <div className="pointer-events-none absolute inset-2.5 border border-ink/70 sm:inset-4" aria-hidden="true">
      {/* inner border */}
      <div className="absolute inset-[14px] border border-ink/25" />
      {(["top", "bottom"] as const).map((side) => (
        <div key={side} className={`absolute inset-x-[14px] flex h-[14px] ${side === "top" ? "top-0" : "bottom-0"}`}>
          {COLS.map((c, i) => (
            <span
              key={c}
              className={`label flex flex-1 items-center justify-center text-[8px] text-graphite ${i ? "border-l border-ink/25" : ""}`}
            >
              {c}
            </span>
          ))}
        </div>
      ))}
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`absolute inset-y-[14px] flex w-[14px] flex-col ${side === "left" ? "left-0" : "right-0"}`}>
          {ROWS.map((r, i) => (
            <span
              key={r}
              className={`label flex flex-1 items-center justify-center text-[8px] text-graphite ${i ? "border-t border-ink/25" : ""}`}
            >
              {r}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
