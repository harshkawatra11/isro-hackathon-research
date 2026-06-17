export default function DashboardWireframe() {
  const W = 700, H = 380;
  const lc = (cx: number, amp: number, color: string, w: number) => {
    let d = "";
    for (let i = 0; i <= 80; i++) { const x = 44 + i * 7.6; const y = 200 - amp * Math.exp(-((i - cx) ** 2) / 80); d += `${i ? "L" : "M"}${x},${y} `; }
    return <path d={d} fill="none" stroke={color} strokeWidth={w} />;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <rect x={10} y={10} width={W - 20} height={H - 20} rx={14} fill="#0b101d" stroke="#233150" />
      {/* alert banner */}
      <rect x={26} y={26} width={W - 52} height={38} rx={8} fill="rgba(240,80,110,0.14)" stroke="#f0506e" />
      <circle cx={48} cy={45} r={6} fill="#f0506e" />
      <text x={64} y={50} fontSize="13.5" fontWeight={700} fill="#f0506e">🚨 ALERT — M-class flare forecast · ~7 min lead · confidence 0.82</text>
      {/* dual light curve */}
      <rect x={26} y={78} width={W - 52} height={140} rx={8} fill="#111a2e" stroke="#233150" />
      <text x={40} y={97} fontSize="11" fill="#93a0b8">Dual light curve — soft (blue) + hard (orange) + playhead</text>
      {lc(52, 56, "#4aa8ff", 2)}
      {lc(44, 64, "#ff6b1a", 2)}
      <line x1={420} y1={88} x2={420} y2={208} stroke="#fff" strokeDasharray="4 4" />
      {/* ratio panel */}
      <rect x={26} y={232} width={420} height={132} rx={8} fill="#111a2e" stroke="#233150" />
      <text x={40} y={251} fontSize="11" fill="#93a0b8">Hard / soft ratio (precursor) ↑ rising → WATCH</text>
      <path d={(() => { let d = ""; for (let i = 0; i <= 46; i++) { const x = 44 + i * 8.4; const y = 340 - 64 * (1 / (1 + Math.exp(-(i - 26) / 4))); d += `${i ? "L" : "M"}${x},${y} `; } return d; })()} fill="none" stroke="#a78bfa" strokeWidth={2.5} />
      {/* gauge */}
      <rect x={460} y={232} width={W - 486} height={132} rx={8} fill="#111a2e" stroke="#233150" />
      <text x={476} y={251} fontSize="11" fill="#93a0b8">P(flare ≤ N min)</text>
      <path d="M510,338 A70,70 0 0,1 650,338" fill="none" stroke="#233150" strokeWidth={12} />
      <path d="M510,338 A70,70 0 0,1 636,300" fill="none" stroke="#f0506e" strokeWidth={12} strokeLinecap="round" />
      <text x={580} y={332} textAnchor="middle" fontSize="26" fontWeight={800} fill="#f0506e">0.82</text>
    </svg>
  );
}
