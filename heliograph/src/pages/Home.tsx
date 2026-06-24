import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SYLLABUS, FLAT, TRACK_META } from "../lib/syllabus";
import { ArrowRight, Radio, Satellite, Brain, Gauge, IndianRupee } from "lucide-react";

const totalMin = FLAT.reduce((a, c) => a + c.minutes, 0);

export default function Home() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-line pb-10"
      >
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Bharatiya Antariksh Hackathon 2026 · Problem Statement 15
        </div>
        <h1 className="mt-3 bg-gradient-to-br from-white via-white to-accent2 bg-clip-text text-5xl font-extrabold leading-[1.05] tracking-tight text-transparent sm:text-6xl">
          SURYASETU
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-muted">
          An interactive textbook and build blueprint for <strong className="text-ink">nowcasting and
          forecasting solar flares</strong> from Aditya-L1's combined soft + hard X-ray data, written to take
          an AI/ML engineer with <em>zero</em> space-science background to the level of someone sitting at ISRO.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Badge icon={<Radio size={14} />}>SoLEXS · 2–22 keV soft X-ray</Badge>
          <Badge icon={<Radio size={14} />}>HEL1OS · 8–150 keV hard X-ray</Badge>
          <Badge icon={<Brain size={14} />}>LightGBM + MiniROCKET hybrid</Badge>
          <Badge icon={<Gauge size={14} />}>TSS-driven evaluation</Badge>
          <Badge icon={<IndianRupee size={14} />}>₹0 · runs on RTX 3050 / 16 GB</Badge>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/c/space-weather"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-[#10131c] transition hover:bg-accent2"
          >
            Start learning <ArrowRight size={18} />
          </Link>
          <Link
            to="/c/architecture"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-5 py-3 font-semibold text-ink hover:border-accent/50"
          >
            Jump to the architecture
          </Link>
          <span className="text-sm text-muted">
            {FLAT.length} chapters · ~{Math.round(totalMin / 60)} h read
          </span>
        </div>
      </motion.section>

      <section className="py-9">
        <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-muted">The mission of this document</h2>
        <p className="max-w-3xl text-lg text-ink/90">
          ISRO doesn't want a summary; it wants a system that <strong>detects a flare the instant it begins</strong>{" "}
          and <strong>warns minutes before its most damaging peak</strong>. To build that, you first have to{" "}
          <em>understand</em> it. This guide teaches the physics, the mission, and the data from first principles,
          then designs the product against every line of ISRO's stated requirements, with every architecture,
          pipeline and physics diagram rendered live, not described.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Pillar icon={<Satellite />} title="Real mission, real data" color="#4aa8ff">
            Grounded in the actual Aditya-L1 SoLEXS day-file we downloaded and the published instrument papers.
          </Pillar>
          <Pillar icon={<Brain />} title="Rigour, not validation" color="#ff8a3d">
            Every model and tool choice is argued against ISRO's evaluation criteria, with honest limits stated.
          </Pillar>
          <Pillar icon={<Gauge />} title="Built to be built" color="#34d399">
            A nine-phase roadmap executed with AI-assisted implementation to accelerate model training and DevOps, each phase with a concrete definition of done.
          </Pillar>
        </div>
      </section>

      <section className="py-4">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">The syllabus</h2>
        <div className="grid gap-5">
          {SYLLABUS.map((part) => (
            <div key={part.id} className="rounded-2xl border border-line bg-panel/60 p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <h3 className="text-lg font-bold text-white">{part.label}</h3>
                <span className="text-xs text-muted">{part.sub}</span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {part.chapters.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/c/${c.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-line bg-bg2 p-3 transition hover:border-accent/40"
                  >
                    <span
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold"
                      style={{ color: TRACK_META[c.track].color, background: `${TRACK_META[c.track].color}1a` }}
                    >
                      {c.n}
                    </span>
                    <span>
                      <span className="block font-semibold leading-tight text-ink group-hover:text-white">
                        {c.title}
                      </span>
                      <span className="block text-[13px] leading-snug text-muted">{c.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 text-[13px] text-ink/90">
      <span className="text-accent">{icon}</span>
      {children}
    </span>
  );
}

function Pillar({ icon, title, children, color }: { icon: React.ReactNode; title: string; children: React.ReactNode; color: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg" style={{ color, background: `${color}1a` }}>
        {icon}
      </div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="mt-1 text-[14px] text-muted">{children}</p>
    </div>
  );
}
