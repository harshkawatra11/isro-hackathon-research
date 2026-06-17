import { useParams } from "react-router-dom";
import { FLAT } from "../lib/syllabus";
import ChapterShell from "../components/ChapterShell";
import { REGISTRY } from "./registry";

export default function ChapterRoute() {
  const { slug = "" } = useParams();
  const exists = FLAT.some((c) => c.slug === slug);
  if (!exists) {
    return (
      <div className="py-20 text-center text-muted">
        <p className="text-2xl font-bold text-white">Chapter not found</p>
        <p className="mt-2">That slug isn't in the syllabus.</p>
      </div>
    );
  }
  const Comp = REGISTRY[slug];
  return (
    <ChapterShell slug={slug}>
      {Comp ? (
        <Comp />
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-panel/50 p-10 text-center text-muted">
          This chapter is being authored.
        </div>
      )}
    </ChapterShell>
  );
}
