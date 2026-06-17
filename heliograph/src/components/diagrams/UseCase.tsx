function Actor({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g stroke="#ffa726" strokeWidth={2} fill="none">
      <circle cx={x} cy={y} r={9} />
      <line x1={x} y1={y + 9} x2={x} y2={y + 30} />
      <line x1={x - 11} y1={y + 18} x2={x + 11} y2={y + 18} />
      <line x1={x} y1={y + 30} x2={x - 9} y2={y + 46} />
      <line x1={x} y1={y + 30} x2={x + 9} y2={y + 46} />
      <text x={x} y={y + 64} textAnchor="middle" fontSize="11.5" fill="#cfd8ea" stroke="none">{label}</text>
    </g>
  );
}

function UC({ x, y, t }: { x: number; y: number; t: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={98} ry={24} fill="#16203a" stroke="#233150" strokeWidth={1.5} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#fff">{t}</text>
    </g>
  );
}

export default function UseCase() {
  const W = 720, H = 220;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <marker id="ucArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4aa8ff" />
        </marker>
      </defs>
      <Actor x={70} y={40} label="Ops operator" />
      <Actor x={70} y={130} label="Researcher" />

      <UC x={340} y={46} t="Receive flare alert" />
      <UC x={340} y={104} t="Browse catalogue" />
      <UC x={340} y={162} t="Replay historical day" />
      <UC x={610} y={104} t='Audit "why" (SHAP)' />

      <line x1={92} y1={52} x2={240} y2={48} stroke="#4aa8ff" strokeWidth={1.4} markerEnd="url(#ucArrow)" />
      <line x1={92} y1={140} x2={240} y2={106} stroke="#4aa8ff" strokeWidth={1.4} markerEnd="url(#ucArrow)" />
      <line x1={92} y1={140} x2={240} y2={160} stroke="#4aa8ff" strokeWidth={1.4} markerEnd="url(#ucArrow)" />
      <line x1={438} y1={104} x2={510} y2={104} stroke="#4aa8ff" strokeWidth={1.4} markerEnd="url(#ucArrow)" strokeDasharray="3 3" />
    </svg>
  );
}
