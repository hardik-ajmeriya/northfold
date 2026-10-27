import { projects } from "@/data/projects";
import { ProjectSheet } from "./ProjectSheet";

/** Sheets NF-102 → NF-104. NF-101 is the hero. */
export function Work() {
  return (
    <div aria-label="Selected projects">
      {projects.slice(1).map((p, i) => (
        <ProjectSheet key={p.slug} project={p} index={i + 1} total={projects.length} />
      ))}
    </div>
  );
}
