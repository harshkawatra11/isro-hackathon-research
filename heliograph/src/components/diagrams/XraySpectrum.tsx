import { useState } from "react";
import { scaleLog } from "d3-scale";

/** Interactive: thermal (soft, exponential) vs non-thermal (hard, power-law) X-ray spectra. */
export default function XraySpectrum() {
  const [temp, setTemp] = useState(15); // MK
  const [gamma, setGamma] = useState(4); // power-law index

  const W = 560, H = 320, padL = 52, padB = 40, padT = 16, padR = 16;
  const ex = scaleLog().domain([1, 150]).range([padL, W - padR]);
  const ey = scaleLog().domain([1e-4, 1]).range([H - padB, padT]);

  // thermal bremsstrahlung ~ exp(-E / kT), kT in keV (T[MK]*0.0862)
  const kT = temp * 0.0862;
  const thermal = (E: number) => Math.exp(-E / kT) / Math.exp(-1 / kT);
  // non-thermal power law ~ E^-gamma, normalised at 1 keV-ish to 0.5
  const nonth = (E: number) => 0.4 * Math.pow(E, -gamma + 1) / Math.pow(2, -gamma + 1);

  const pts = Array.from({ length: 120 }, (_, i) => Math.pow(10, Math.log10(1) + (i / 119) * Math.log10(150)));
  const path = (f: (E: number) => number) =>
    pts
      .map((E, i) => {
        const v = Math.max(1e-4, Math.min(1, f(E)));
        return `${i ? "L" : "M"}${ex(E).toFixed(1)},${ey(v).toFixed(1)}`;
      })
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* instrument bands */}
        <rect x={ex(2)} y={padT} width={ex(22) - ex(2)} height={H - padB - padT} fill="#4aa8ff" opacity={0.08} />
        <rect x={ex(8)} y={padT} width={ex(150) - ex(8)} height={H - padB - padT} fill="#ff6b1a" opacity={0.07} />
        <text x={ex(6.6)} y={padT + 12} fontSize="10" fill="#4aa8ff">SoLEXS 2–22</text>
        <text x={ex(40)} y={padT + 12} fontSize="10" fill="#ff6b1a">HEL1OS 8–150</text>

        {/* grid + axes */}
        {[1, 10, 100].map((E) => (
          <g key={E}>
            <line x1={ex(E)} y1={padT} x2={ex(E)} y2={H - padB} stroke="#1c2740" />
            <text x={ex(E)} y={H - padB + 16} fontSize="11" fill="#5c6884" textAnchor="middle">{E}</text>
          </g>
        ))}
        {[1e-3, 1e-2, 1e-1, 1].map((v) => (
          <g key={v}>
            <line x1={padL} y1={ey(v)} x2={W - padR} y2={ey(v)} stroke="#1c2740" />
            <text x={padL - 6} y={ey(v) + 3} fontSize="10" fill="#5c6884" textAnchor="end">{v}</text>
          </g>
        ))}
        <text x={(W) / 2} y={H - 4} fontSize="11" fill="#93a0b8" textAnchor="middle">photon energy (keV)  →  harder</text>
        <text x={14} y={H / 2} fontSize="11" fill="#93a0b8" textAnchor="middle" transform={`rotate(-90 14 ${H / 2})`}>
          relative flux
        </text>

        {/* spectra */}
        <path d={path(thermal)} fill="none" stroke="#4aa8ff" strokeWidth={2.5} />
        <path d={path(nonth)} fill="none" stroke="#ff6b1a" strokeWidth={2.5} />
        <text x={ex(5)} y={ey(thermal(5)) - 8} fontSize="11" fill="#4aa8ff" fontWeight={700}>thermal (soft)</text>
        <text x={ex(60)} y={ey(nonth(60)) - 8} fontSize="11" fill="#ff6b1a" fontWeight={700}>non-thermal (hard)</text>
      </svg>

      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <label className="rounded-lg border border-line bg-bg2 p-3 text-[13px] text-muted">
          <div className="mb-1 flex justify-between">
            <span className="text-soft">Thermal plasma temperature</span>
            <span className="font-mono text-ink">{temp} MK</span>
          </div>
          <input type="range" min={5} max={30} value={temp} onChange={(e) => setTemp(+e.target.value)} className="w-full accent-sci" />
          <p className="mt-1 text-[12px]">Hotter plasma → spectrum extends to higher energies, but always falls off exponentially.</p>
        </label>
        <label className="rounded-lg border border-line bg-bg2 p-3 text-[13px] text-muted">
          <div className="mb-1 flex justify-between">
            <span className="text-hard">Electron spectral index γ</span>
            <span className="font-mono text-ink">{gamma.toFixed(1)}</span>
          </div>
          <input type="range" min={2} max={6} step={0.1} value={gamma} onChange={(e) => setGamma(+e.target.value)} className="w-full accent-[#ff6b1a]" />
          <p className="mt-1 text-[12px]">Harder electron beams (smaller γ) → flatter power law reaching well into HEL1OS's band.</p>
        </label>
      </div>
    </div>
  );
}
