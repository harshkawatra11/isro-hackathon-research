import { useState } from "react";

interface Layer {
  name: string;
  r: number;
  color: string;
  temp: string;
  desc: string;
}

const LAYERS: Layer[] = [
  { name: "Core", r: 34, color: "#fff0b3", temp: "15 million K", desc: "Nuclear fusion of hydrogen into helium powers the entire Sun. Energy generated here takes ~100,000 years to reach the surface." },
  { name: "Radiative zone", r: 70, color: "#ffcf6b", temp: "7–2 million K", desc: "Energy crawls outward as photons are absorbed and re-emitted countless times." },
  { name: "Convective zone", r: 104, color: "#ff9d3c", temp: "2 million – 5700 K", desc: "Hot plasma physically rises and sinks like a boiling pot, generating the Sun's magnetic field through the dynamo effect." },
  { name: "Photosphere", r: 120, color: "#ff7a1a", temp: "~5,800 K", desc: "The visible 'surface'. Sunspots are cool, intensely magnetic regions that appear here and anchor the loops that produce flares." },
  { name: "Chromosphere", r: 134, color: "#e0512e", temp: "~10,000 K", desc: "A thin layer above the surface. Flare-accelerated electrons slam into its dense plasma. This is where hard X-rays are made." },
  { name: "Corona", r: 168, color: "#9fc6ff", temp: "1–3 million K", desc: "The outer atmosphere, mysteriously hotter than the surface. Magnetic reconnection here releases the energy of a flare; the heated loops glow in soft X-rays." },
];

export default function SunStructure() {
  const [sel, setSel] = useState(5);
  const layer = LAYERS[sel];
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[320px_1fr]">
      <svg viewBox="0 0 340 340" className="mx-auto w-full max-w-[320px]">
        <defs>
          <radialGradient id="coronaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#9fc6ff" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#9fc6ff" stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx={170} cy={170} r={200} fill="url(#coronaGlow)" />
        {LAYERS.slice().reverse().map((l) => {
          const idx = LAYERS.indexOf(l);
          const active = idx === sel;
          return (
            <circle
              key={l.name}
              cx={170}
              cy={170}
              r={l.r}
              fill={l.color}
              fillOpacity={idx <= 3 ? 1 : 0.28}
              stroke={active ? "#fff" : "transparent"}
              strokeWidth={active ? 2.5 : 0}
              style={{ cursor: "pointer", transition: "stroke 0.2s" }}
              onClick={() => setSel(idx)}
            />
          );
        })}
        {/* a couple of coronal loops */}
        <path d="M150,58 Q170,8 190,58" fill="none" stroke="#cfe0ff" strokeWidth={2} opacity={0.7} />
        <path d="M196,66 Q230,24 250,80" fill="none" stroke="#cfe0ff" strokeWidth={1.6} opacity={0.5} />
      </svg>

      <div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {LAYERS.map((l, i) => (
            <button
              key={l.name}
              onClick={() => setSel(i)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                i === sel ? "text-[#10131c]" : "border border-line bg-panel text-muted hover:text-ink"
              }`}
              style={i === sel ? { background: l.color } : undefined}
            >
              {l.name}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-bg2 p-4">
          <div className="flex items-baseline justify-between">
            <h4 className="text-lg font-bold text-white">{layer.name}</h4>
            <span className="font-mono text-sm" style={{ color: layer.color }}>
              {layer.temp}
            </span>
          </div>
          <p className="mt-1.5 text-[14px] text-muted">{layer.desc}</p>
        </div>
      </div>
    </div>
  );
}
