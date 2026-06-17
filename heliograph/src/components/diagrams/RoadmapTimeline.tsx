import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Phase {
  n: string; title: string; days: string; scored?: boolean; color: string;
  goal: string; does: string; done: string;
}

const PHASES: Phase[] = [
  { n: "0", title: "Environment", days: "½ day", color: "#5c6884",
    goal: "A Python 3.11 env that can read the held .lc.gz.",
    does: "Create the uv/conda env, install the stack, write a smoke test that opens the file with astropy and prints columns + row count.",
    done: "astropy prints ['TIME','COUNTS'] and 86400. No build errors." },
  { n: "1", title: "Data I/O & fusion", days: "1–2 d", color: "#4aa8ff",
    goal: "load_day(date) → DataFrame[time, soft_sdd1, soft_sdd2, hard].",
    does: "Readers for SoLEXS .lc/.gti and HEL1OS LC; apply GTI masks; merge detectors + soft/hard on a 1-s grid; handle NaN gaps; sanity plots.",
    done: "One real day plotted with both channels aligned; gap regions masked." },
  { n: "2", title: "Labeling (GOES)", days: "1 d", color: "#34d399",
    goal: "Labelled windows for training.",
    does: "Fetch the GOES XRS catalog; cross-reference timestamps; emit flare / pre-flare / quiet windows + class; store as parquet.",
    done: "The 13:15 enhancement in our day-file matches a GOES catalog entry." },
  { n: "3", title: "Nowcasting", days: "2 d", scored: true, color: "#34d399",
    goal: "The automated master catalogue (deliverable #1).",
    does: "Adaptive-baseline + rise-rate detector per channel with hysteresis; merge soft+hard; classify by relative peak; write the catalogue.",
    done: "Detects known low- and high-class flares; catalogue validated vs GOES; per-class recall reported." },
  { n: "4", title: "Feature engineering", days: "1–2 d", color: "#ff8a3d",
    goal: "The Neupert feature matrix.",
    does: "Rolling-window features: hard/soft ratio + d/dt, soft slope & curvature, variance, background, time-since-flare, at multiple windows.",
    done: "Feature matrix + a LightGBM importance plot showing the ratio-derivative ranks high." },
  { n: "5", title: "Forecasting models", days: "3–4 d", scored: true, color: "#ff8a3d",
    goal: "Calibrated P(flare in next N min) with lead time (deliverable #2).",
    does: "Train LightGBM + MiniROCKET under time-blocked CV; calibrate (isotonic); fuse; tune the threshold on TSS.",
    done: "TSS on a held-out time block; lead-time distribution plotted; no temporal leakage." },
  { n: "6", title: "Evaluation", days: "1–2 d", color: "#a78bfa",
    goal: "Defensible numbers for the three ISRO criteria.",
    does: "TSS/HSS/ROC-AUC/Brier + reliability diagram + lead-time histogram + per-class recall; honest peak-vs-onset split.",
    done: "A one-page metrics report; every ISRO criterion has a number beside it." },
  { n: "7", title: "Streamlit dashboard", days: "2–3 d", scored: true, color: "#a78bfa",
    goal: "The alert interface (deliverable #3).",
    does: "Dual light-curve panel + ratio panel + alert banner (green/amber/red) + forecast gauge + replay timeline + catalogue table.",
    done: "Replay a real day; the banner flips to red and an alert fires before the soft peak." },
  { n: "8", title: "Report & deck", days: "1 d", color: "#5c6884",
    goal: "The ≤3-page PS-15 report + the ISRO deck.",
    does: "Assemble methodology + assumptions + uncertainty; export the ISRO-tagged sections into the submission template.",
    done: "Report ≤3 pages; deck matches template.pdf sections." },
];

export default function RoadmapTimeline() {
  const [open, setOpen] = useState("3");
  return (
    <div className="space-y-2">
      {PHASES.map((p) => {
        const isOpen = open === p.n;
        return (
          <div key={p.n} className="overflow-hidden rounded-xl border border-line bg-panel">
            <button
              onClick={() => setOpen(isOpen ? "" : p.n)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-panel2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-sm font-bold"
                style={{ color: p.color, background: `${p.color}22` }}>{p.n}</span>
              <span className="font-semibold text-white">{p.title}</span>
              {p.scored && <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-accent">scored</span>}
              <span className="ml-auto text-xs text-muted">{p.days}</span>
              <ChevronRight size={16} className={`text-muted transition ${isOpen ? "rotate-90" : ""}`} />
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-line px-4 py-3 text-[14px]">
                <p><span className="font-semibold text-accent2">Goal · </span><span className="text-muted">{p.goal}</span></p>
                <p><span className="font-semibold text-soft">Claude Code does · </span><span className="text-muted">{p.does}</span></p>
                <p><span className="font-semibold text-isro">Definition of done · </span><span className="text-muted">{p.done}</span></p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
