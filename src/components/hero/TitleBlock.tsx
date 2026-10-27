import type { Project } from "@/data/projects";
import { STAGES } from "./stages";

/** The title block every drawing sheet carries. Revision and status follow the scroll. */
export function TitleBlock({ project, stage }: { project: Project; stage: number }) {
  const s = STAGES[stage];
  const cell = "border-ink/70 px-2.5 py-2 sm:px-3";
  return (
    <dl
      className="mx-auto mt-3 grid w-full max-w-[min(100%,calc((100svh-15rem)*1.5))] grid-cols-4 border border-ink/70 bg-paper/90 text-ink sm:grid-cols-[1.6fr_1fr_0.8fr_0.5fr_1.1fr] lg:mt-4"
      aria-label="Title block"
    >
      <div className={`${cell} col-span-4 border-b sm:col-span-1 sm:border-b-0 sm:border-r`}>
        <dt className="label text-graphite">Project</dt>
        <dd className="mt-0.5 truncate text-[13px] font-semibold sm:text-sm">
          {project.name}
          <span className="font-normal text-graphite"> — {project.place}</span>
        </dd>
      </div>
      <div className={`${cell} border-r`}>
        <dt className="label text-graphite">Dwg no.</dt>
        <dd className="label mt-1 text-[11px] text-ink">{project.dwg}</dd>
      </div>
      <div className={`${cell} border-r`}>
        <dt className="label text-graphite">Scale</dt>
        <dd className="label mt-1 text-[11px] text-ink">{stage === 2 ? "1:1" : "1:100"}</dd>
      </div>
      <div className={`${cell} border-r`}>
        <dt className="label text-graphite">Rev</dt>
        <dd className="label mt-1 text-[11px] text-accent">{s.rev}</dd>
      </div>
      <div className={cell}>
        <dt className="label text-graphite">Status</dt>
        <dd key={s.status} className="label mt-1 text-[11px] text-ink" aria-live="polite">
          {s.status}
        </dd>
      </div>
    </dl>
  );
}
