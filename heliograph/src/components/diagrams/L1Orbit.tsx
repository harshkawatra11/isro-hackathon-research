import { motion } from "framer-motion";

/** Sun–Earth line with the five Lagrange points and Aditya-L1 in a halo orbit at L1. */
export default function L1Orbit() {
  const sun = { x: 70, y: 150 };
  const earth = { x: 640, y: 150 };
  const L1 = { x: earth.x - 70, y: 150 };
  return (
    <svg viewBox="0 0 720 300" className="w-full">
      <defs>
        <radialGradient id="sunO" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4cc" /><stop offset="100%" stopColor="#ff7a1a" />
        </radialGradient>
        <radialGradient id="earthO" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5aa9ff" /><stop offset="100%" stopColor="#163b6b" />
        </radialGradient>
      </defs>

      <line x1={sun.x} y1={150} x2={earth.x} y2={150} stroke="#233150" strokeWidth={1} strokeDasharray="3 5" />
      <circle cx={sun.x} cy={sun.y} r={40} fill="url(#sunO)" />
      <text x={sun.x} y={154} textAnchor="middle" fontSize="12" fontWeight={800} fill="#7a3b00">SUN</text>
      <circle cx={earth.x} cy={earth.y} r={20} fill="url(#earthO)" />
      <text x={earth.x} y={154} textAnchor="middle" fontSize="10" fontWeight={700} fill="#fff">EARTH</text>

      {/* L points (schematic) */}
      {[
        { x: L1.x, y: 150, l: "L1" },
        { x: earth.x + 60, y: 150, l: "L2" },
        { x: sun.x - 0, y: 150, l: "" },
        { x: 355, y: 80, l: "L4" },
        { x: 355, y: 220, l: "L5" },
      ].map((pt, i) =>
        pt.l ? (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={2.5} fill="#5c6884" />
            <text x={pt.x} y={pt.y - 8} textAnchor="middle" fontSize="10" fill="#7d8aa6">{pt.l}</text>
          </g>
        ) : null
      )}

      {/* halo orbit ellipse at L1 */}
      <ellipse cx={L1.x} cy={150} rx={34} ry={56} fill="none" stroke="#ff6b1a" strokeOpacity={0.55} strokeWidth={1.5} strokeDasharray="4 4" />
      <motion.circle
        r={5} fill="#ff6b1a" style={{ filter: "drop-shadow(0 0 5px #ff6b1a)" }}
        animate={{
          cx: [L1.x + 34, L1.x, L1.x - 34, L1.x, L1.x + 34],
          cy: [150, 150 - 56, 150, 150 + 56, 150],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <text x={L1.x} y={150 - 66} textAnchor="middle" fontSize="11" fontWeight={700} fill="#ffa726">Aditya-L1</text>
      <text x={L1.x} y={150 + 78} textAnchor="middle" fontSize="9.5" fill="#93a0b8">halo orbit · ~178-day period</text>

      <text x={(sun.x + L1.x) / 2} y={186} textAnchor="middle" fontSize="10.5" fill="#7d8aa6">
        ~1.5 million km (≈1% of Sun–Earth distance)
      </text>
      <text x={360} y={282} textAnchor="middle" fontSize="11" fill="#93a0b8">
        L1 gives a continuous, never-eclipsed view of the Sun, ideal for non-stop monitoring
      </text>
    </svg>
  );
}
