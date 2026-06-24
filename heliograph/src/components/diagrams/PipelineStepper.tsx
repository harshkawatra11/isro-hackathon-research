import { useState } from "react";

const STAGES = [
  { t: "Raw payload files", d: "SoLEXS .lc/.gti and HEL1OS .lc arrive as gzipped FITS, calibrated Level-1, one row per second.", state: "soft=95 c/s, hard=high · t=13:15:26 · (raw, unvalidated)", color: "#4aa8ff" },
  { t: "Ingest + GTI mask", d: "Parse FITS, convert TIME to UTC, and drop any second outside the Good-Time-Intervals.", state: "second is inside GTI → kept", color: "#ff8a3d" },
  { t: "Fuse & resample", d: "Align SoLEXS SDD1/SDD2 and HEL1OS onto one 1-second grid; pick the unsaturated SoLEXS detector for this brightness.", state: "soft=95, hard=42, ratio=0.44 (aligned)", color: "#ff8a3d" },
  { t: "Feature engineering", d: "Compute rolling Neupert features over the trailing window ending at this second.", state: "ratio↑ d/dt=+0.06, soft slope=+18/s, curvature>0", color: "#ff8a3d" },
  { t: "Nowcast detector", d: "Classical: is soft rising sharply above its adaptive baseline? Cross-check hard.", state: "95 ≫ 1.8 × baseline(7) → FLARE onset detected", color: "#34d399" },
  { t: "Forecast models", d: "LightGBM (features) + MiniROCKET (raw window) each emit a probability; fuse + calibrate.", state: "P(flare ≤ 10 min) = 0.82 (calibrated)", color: "#a78bfa" },
  { t: "Catalogue + alert", d: "Append the event to the master catalogue; if forecast crosses threshold, raise a visual alert with lead time.", state: "🚨 ALERT · M-class · ~7 min lead · logged", color: "#f0506e" },
];

export default function PipelineStepper() {
  const [i, setI] = useState(0);
  const s = STAGES[i];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {STAGES.map((st, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`flex-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition ${k === i ? "text-[#0b101d]" : "border border-line bg-panel text-muted hover:text-ink"}`}
            style={k === i ? { background: st.color } : k < i ? { borderColor: st.color, color: st.color } : undefined}
          >
            {k + 1}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-line bg-bg2 p-4" style={{ borderLeft: `4px solid ${s.color}` }}>
        <div className="flex items-baseline justify-between">
          <h4 className="text-lg font-bold text-white">{i + 1}. {s.t}</h4>
          <span className="text-xs text-muted">stage {i + 1} / {STAGES.length}</span>
        </div>
        <p className="mt-1 text-[14px] text-muted">{s.d}</p>
        <div className="mt-3 rounded-lg bg-bg p-2.5 font-mono text-[12.5px]" style={{ color: s.color }}>
          ▸ {s.state}
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}
          className="rounded-lg border border-line bg-panel px-4 py-2 text-sm font-semibold disabled:opacity-40">← Prev</button>
        <button onClick={() => setI(Math.min(STAGES.length - 1, i + 1))} disabled={i === STAGES.length - 1}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#10131c] disabled:opacity-40">Next stage →</button>
      </div>
    </div>
  );
}
