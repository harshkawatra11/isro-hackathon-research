import { useState } from "react";

interface Payload {
  id: string;
  name: string;
  kind: "remote" | "insitu";
  by: string;
  measures: string;
  ours?: boolean;
}

const PAYLOADS: Payload[] = [
  { id: "VELC", name: "Visible Emission Line Coronagraph", kind: "remote", by: "IIA", measures: "Images the inner corona and its magnetic field; observes CMEs close to the solar disk. The mission's primary payload." },
  { id: "SUIT", name: "Solar Ultraviolet Imaging Telescope", kind: "remote", by: "IUCAA", measures: "Near-UV (200–400 nm) images of the photosphere and chromosphere, the layers below the corona." },
  { id: "SoLEXS", name: "Solar Low Energy X-ray Spectrometer", kind: "remote", by: "URSC", measures: "Sun-as-a-star SOFT X-rays, 2–22 keV, 1-second cadence. Our soft channel.", ours: true },
  { id: "HEL1OS", name: "High Energy L1 Orbiting X-ray Spectrometer", kind: "remote", by: "URSC", measures: "Sun-as-a-star HARD X-rays, 8–150 keV, fast timing. Our hard channel.", ours: true },
  { id: "ASPEX", name: "Aditya Solar wind Particle Experiment", kind: "insitu", by: "PRL", measures: "In-situ solar wind / energetic ions (protons, alphas, heavier) via its SWIS and STEPS sensors." },
  { id: "PAPA", name: "Plasma Analyser Package for Aditya", kind: "insitu", by: "SPL/VSSC", measures: "In-situ solar wind electrons and ion composition and their direction." },
  { id: "MAG", name: "Advanced Tri-axial Magnetometer", kind: "insitu", by: "LEOS", measures: "The interplanetary magnetic field at L1, in three axes." },
];

export default function PayloadExplorer() {
  const [sel, setSel] = useState("SoLEXS");
  const p = PAYLOADS.find((x) => x.id === sel)!;
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex gap-3 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-sci" /> Remote sensing (watch the Sun)</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-isro" /> In-situ (sample L1 locally)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAYLOADS.map((x) => {
            const active = x.id === sel;
            const col = x.kind === "remote" ? "#4aa8ff" : "#34d399";
            return (
              <button
                key={x.id}
                onClick={() => setSel(x.id)}
                className={`relative rounded-xl border p-3 text-left transition ${active ? "bg-panel2" : "bg-panel hover:bg-panel2"}`}
                style={{ borderColor: active ? col : "#233150" }}
              >
                {x.ours && (
                  <span className="absolute right-2 top-2 rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-accent">
                    ours
                  </span>
                )}
                <div className="font-mono text-sm font-bold" style={{ color: col }}>{x.id}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-muted">{x.name}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border border-line bg-bg2 p-4">
        <div className="font-mono text-lg font-bold" style={{ color: p.kind === "remote" ? "#4aa8ff" : "#34d399" }}>{p.id}</div>
        <div className="text-sm font-semibold text-white">{p.name}</div>
        <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">Built by {p.by} · {p.kind === "remote" ? "remote sensing" : "in-situ"}</div>
        <p className="mt-2 text-[13.5px] text-muted">{p.measures}</p>
      </div>
    </div>
  );
}
