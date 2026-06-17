const FEATS = [
  { name: "hard/soft ratio · d/dt", v: 1.0, note: "rising ratio = fresh energy injection (Neupert)" },
  { name: "soft flux · slope", v: 0.82, note: "rate of rise of the thermal emission" },
  { name: "hard/soft ratio · level", v: 0.74, note: "current spectral hardness" },
  { name: "soft flux · curvature", v: 0.58, note: "is the rise accelerating?" },
  { name: "hard flux · short-window var", v: 0.49, note: "impulsive burstiness" },
  { name: "background level", v: 0.31, note: "the quiet-Sun context" },
  { name: "time since last flare", v: 0.22, note: "active-region recharge state" },
];

export default function FeatureImportance() {
  const W = 600, rowH = 34, padL = 178, padR = 16, padT = 8;
  const H = padT * 2 + FEATS.length * rowH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {FEATS.map((f, i) => {
        const y = padT + i * rowH + 6;
        const w = f.v * (W - padL - padR);
        return (
          <g key={f.name}>
            <text x={padL - 8} y={y + 13} textAnchor="end" fontSize="11.5" fill="#cfd8ea" fontFamily="monospace">
              {f.name}
            </text>
            <rect x={padL} y={y} width={W - padL - padR} height={18} rx={4} fill="#16203a" />
            <rect x={padL} y={y} width={w} height={18} rx={4} fill="#ff8a3d" opacity={0.85} />
            <text x={padL + w + 6} y={y + 13} fontSize="10.5" fill="#93a0b8">{f.v.toFixed(2)}</text>
            <text x={padL + 6} y={y + 30} fontSize="9.5" fill="#5c6884">{f.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
