import { useState } from "react";

const CLASSES = [
  { c: "A", lo: 1e-8, color: "#3b4a6b", note: "Background level: barely above the quiet Sun." },
  { c: "B", lo: 1e-7, color: "#4a6fa5", note: "Minor brightenings, very common." },
  { c: "C", lo: 1e-6, color: "#4aa8ff", note: "Small flares; few noticeable effects on Earth." },
  { c: "M", lo: 1e-5, color: "#ffa726", note: "Medium flares; brief radio blackouts at the poles, minor radiation storms." },
  { c: "X", lo: 1e-4, color: "#f0506e", note: "Major flares; planet-wide radio blackouts, strong radiation storms. The events ISRO most needs warning of." },
];

function classify(flux: number) {
  if (flux >= 1e-4) return { c: "X", mult: flux / 1e-4, color: "#f0506e" };
  if (flux >= 1e-5) return { c: "M", mult: flux / 1e-5, color: "#ffa726" };
  if (flux >= 1e-6) return { c: "C", mult: flux / 1e-6, color: "#4aa8ff" };
  if (flux >= 1e-7) return { c: "B", mult: flux / 1e-7, color: "#4a6fa5" };
  return { c: "A", mult: Math.max(1, flux / 1e-8), color: "#3b4a6b" };
}

export default function FlareLadder() {
  const [exp, setExp] = useState(-5.3); // log10 flux
  const flux = Math.pow(10, exp);
  const cl = classify(flux);

  return (
    <div>
      <div className="flex items-end gap-2">
        {CLASSES.map((k, i) => (
          <div key={k.c} className="flex-1 text-center">
            <div
              className="mx-auto rounded-t-lg"
              style={{ background: k.color, height: 26 + i * 22, opacity: cl.c === k.c ? 1 : 0.45 }}
            />
            <div className="mt-1 text-xl font-extrabold" style={{ color: k.color }}>{k.c}</div>
            <div className="font-mono text-[11px] text-muted">{k.lo.toExponential(0)} W/m²</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-line bg-bg2 p-4">
        <input
          type="range" min={-8} max={-3.2} step={0.01} value={exp}
          onChange={(e) => setExp(+e.target.value)}
          className="w-full accent-[#ff6b1a]"
        />
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <span className="text-sm text-muted">Peak 1–8 Å flux </span>
            <span className="font-mono text-ink">{flux.toExponential(2)} W/m²</span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: cl.color }}>
            Class {cl.c}
            {cl.mult.toFixed(1)}
          </div>
        </div>
        <p className="mt-1 text-[13px] text-muted">{CLASSES.find((k) => k.c === cl.c)!.note}</p>
      </div>
    </div>
  );
}
