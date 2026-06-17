import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { TRACK_META, type Track } from "../../lib/syllabus";

export function TrackTag({ track }: { track: Track }) {
  const m = TRACK_META[track];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide"
      style={{ color: m.color, background: `${m.color}1f`, border: `1px solid ${m.color}55` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: "info" | "key" | "warn" | "good" | "deep";
  title?: string;
  children: ReactNode;
}) {
  const c = {
    info: "#4aa8ff",
    key: "#ff6b1a",
    warn: "#fbbf24",
    good: "#34d399",
    deep: "#a78bfa",
  }[kind];
  const label = {
    info: "Note",
    key: "Key idea",
    warn: "Rigour check",
    good: "Insight",
    deep: "Deep dive",
  }[kind];
  return (
    <div
      className="my-5 rounded-xl border border-line bg-panel p-4 pl-5"
      style={{ borderLeft: `4px solid ${c}` }}
    >
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>
        {title ?? label}
      </div>
      <div className="text-[15px] text-ink/90">{children}</div>
    </div>
  );
}

export function Figure({
  children,
  caption,
  title,
}: {
  children: ReactNode;
  caption?: ReactNode;
  title?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="my-6 overflow-hidden rounded-2xl border border-line bg-bg2"
    >
      {title && (
        <div className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
      {caption && (
        <figcaption className="border-t border-line px-4 py-2.5 text-center text-[13px] text-muted">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function Stat({ value, label, color = "#ffa726" }: { value: string; label: string; color?: string }) {
  return (
    <div className="inline-flex min-w-[120px] flex-col rounded-xl border border-line bg-panel px-4 py-3">
      <b className="font-mono text-2xl" style={{ color }}>
        {value}
      </b>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

export function Card({
  icon,
  title,
  children,
  accent,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <h4 className="mb-1 font-bold" style={{ color: accent ?? "#fff" }}>
        {title}
      </h4>
      <div className="text-[14.5px] text-muted">{children}</div>
    </div>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return <code className="code-inline">{children}</code>;
}

export function Equation({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 text-center font-mono text-xl text-accent2">{children}</div>
  );
}
