import { motion } from "framer-motion";

const NODES = [
  { x: 20, t: "Raw FITS", s: "SoLEXS + HEL1OS", c: "#4aa8ff" },
  { x: 168, t: "Ingest + GTI", s: "mask gaps", c: "#ff8a3d" },
  { x: 316, t: "Fuse", s: "1-s grid", c: "#ff8a3d" },
];

export default function ProcessFlow() {
  const W = 740, H = 250;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <marker id="pfArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="#4aa8ff" />
        </marker>
      </defs>
      {NODES.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={104} width={128} height={48} rx={10} fill="#16203a" stroke={n.c} strokeWidth={1.6} />
          <text x={n.x + 64} y={126} textAnchor="middle" fontSize="13" fontWeight={700} fill="#fff">{n.t}</text>
          <text x={n.x + 64} y={142} textAnchor="middle" fontSize="10" fill="#93a0b8">{n.s}</text>
        </g>
      ))}
      {/* arrows between first three */}
      <line x1={148} y1={128} x2={168} y2={128} stroke="#4aa8ff" strokeWidth={2} markerEnd="url(#pfArrow)" />
      <line x1={296} y1={128} x2={316} y2={128} stroke="#4aa8ff" strokeWidth={2} markerEnd="url(#pfArrow)" />

      {/* fork to nowcast / forecast */}
      <line x1={444} y1={120} x2={500} y2={70} stroke="#34d399" strokeWidth={2} markerEnd="url(#pfArrow)" />
      <line x1={444} y1={136} x2={500} y2={186} stroke="#ff8a3d" strokeWidth={2} markerEnd="url(#pfArrow)" />

      <rect x={500} y={46} width={150} height={48} rx={10} fill="#16203a" stroke="#34d399" strokeWidth={1.6} />
      <text x={575} y={68} textAnchor="middle" fontSize="13" fontWeight={700} fill="#fff">Nowcast</text>
      <text x={575} y={84} textAnchor="middle" fontSize="10" fill="#93a0b8">classical detector</text>

      <rect x={500} y={162} width={150} height={48} rx={10} fill="#16203a" stroke="#ff8a3d" strokeWidth={1.6} />
      <text x={575} y={184} textAnchor="middle" fontSize="13" fontWeight={700} fill="#fff">Forecast</text>
      <text x={575} y={200} textAnchor="middle" fontSize="10" fill="#93a0b8">LightGBM + MiniROCKET</text>

      {/* converge to output */}
      <line x1={650} y1={70} x2={690} y2={120} stroke="#a78bfa" strokeWidth={2} markerEnd="url(#pfArrow)" />
      <line x1={650} y1={186} x2={690} y2={136} stroke="#a78bfa" strokeWidth={2} markerEnd="url(#pfArrow)" />
      <rect x={648} y={104} width={84} height={48} rx={10} fill="#16203a" stroke="#a78bfa" strokeWidth={1.6} />
      <text x={690} y={126} textAnchor="middle" fontSize="12" fontWeight={700} fill="#fff">Alerts +</text>
      <text x={690} y={140} textAnchor="middle" fontSize="11" fontWeight={700} fill="#fff">catalogue</text>

      {/* animated data pulse along the main line */}
      <motion.circle r={4} fill="#ffd27a"
        animate={{ cx: [84, 232, 380], cy: [128, 128, 128] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} />
    </svg>
  );
}
