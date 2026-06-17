import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { neighbors, FLAT, type Chapter } from "../lib/syllabus";
import { TrackTag } from "./ui/primitives";

export default function ChapterShell({ slug, children }: { slug: string; children: ReactNode }) {
  const ch = FLAT.find((c) => c.slug === slug) as Chapter;
  const { prev, next } = neighbors(slug);
  return (
    <article>
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 border-b border-line pb-6"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-sm text-accent">Chapter {ch.n}</span>
          <TrackTag track={ch.track} />
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock size={13} /> {ch.minutes} min
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">{ch.title}</h1>
        <p className="mt-2 text-lg text-muted">{ch.blurb}</p>
      </motion.header>

      <div className="leading-relaxed text-ink/90 [&_p]:my-3 [&_strong]:text-white [&_ul]:my-3 [&_li]:my-1">
        {children}
      </div>

      <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/c/${prev.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-line bg-panel p-4 hover:border-accent/50"
          >
            <ArrowLeft size={18} className="text-muted group-hover:text-accent" />
            <span>
              <span className="block text-xs text-muted">Previous · {prev.n}</span>
              <span className="font-semibold">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/c/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-panel p-4 text-right hover:border-accent/50"
          >
            <span>
              <span className="block text-xs text-muted">Next · {next.n}</span>
              <span className="font-semibold">{next.title}</span>
            </span>
            <ArrowRight size={18} className="text-muted group-hover:text-accent" />
          </Link>
        )}
      </nav>
    </article>
  );
}
