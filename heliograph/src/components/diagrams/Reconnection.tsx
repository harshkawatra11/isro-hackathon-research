import { motion } from "framer-motion";

/**
 * The CSHKP "standard model" of an eruptive solar flare, animated.
 * Reconnection at the X-point → electron beams down the legs → footpoint
 * hard X-rays → chromospheric evaporation fills the loop → soft X-rays.
 */
export default function Reconnection() {
  const cx = 250;
  const xpoint = { x: cx, y: 70 };
  const loopTop = { x: cx, y: 150 };
  const footL = { x: cx - 90, y: 250 };
  const footR = { x: cx + 90, y: 250 };

  return (
    <svg viewBox="0 0 500 290" className="w-full">
      <defs>
        <linearGradient id="chromo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0512e" stopOpacity={0.0} />
          <stop offset="100%" stopColor="#e0512e" stopOpacity={0.55} />
        </linearGradient>
        <marker id="arrowR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ffd27a" />
        </marker>
      </defs>

      {/* chromosphere / surface */}
      <rect x={0} y={250} width={500} height={40} fill="url(#chromo)" />
      <line x1={0} y1={250} x2={500} y2={250} stroke="#e0512e" strokeWidth={2} />
      <text x={8} y={244} fontSize="11" fill="#ffb39c">
        chromosphere (dense, cool)
      </text>

      {/* inflowing field lines reconnecting at X-point */}
      <path d={`M${cx - 150},20 Q${cx - 40},60 ${xpoint.x},${xpoint.y}`} fill="none" stroke="#4aa8ff" strokeWidth={1.8} opacity={0.8} />
      <path d={`M${cx + 150},20 Q${cx + 40},60 ${xpoint.x},${xpoint.y}`} fill="none" stroke="#4aa8ff" strokeWidth={1.8} opacity={0.8} />
      {/* inflow arrows */}
      <line x1={cx - 120} y1={36} x2={cx - 96} y2={46} stroke="#4aa8ff" strokeWidth={1.5} markerEnd="url(#arrowR)" opacity={0.6} />
      <line x1={cx + 120} y1={36} x2={cx + 96} y2={46} stroke="#4aa8ff" strokeWidth={1.5} markerEnd="url(#arrowR)" opacity={0.6} />

      {/* the reconnection X-point */}
      <motion.circle
        cx={xpoint.x}
        cy={xpoint.y}
        r={9}
        fill="#fff"
        animate={{ r: [7, 12, 7], opacity: [0.9, 0.4, 0.9] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{ filter: "drop-shadow(0 0 8px #fff)" }}
      />
      <text x={xpoint.x + 16} y={xpoint.y - 6} fontSize="12" fontWeight={700} fill="#fff">
        reconnection
      </text>
      <text x={xpoint.x + 16} y={xpoint.y + 8} fontSize="10.5" fill="#93a0b8">
        magnetic energy released
      </text>

      {/* post-reconnection flare loop */}
      <path
        d={`M${footL.x},${footL.y} Q${loopTop.x},${loopTop.y - 70} ${footR.x},${footR.y}`}
        fill="none"
        stroke="#ffa726"
        strokeWidth={3}
        opacity={0.9}
      />

      {/* electron beams travelling down the legs */}
      {[footL, footR].map((f, i) => (
        <motion.circle
          key={i}
          r={4.5}
          fill="#a78bfa"
          style={{ filter: "drop-shadow(0 0 5px #a78bfa)" }}
          animate={{
            cx: [xpoint.x, f.x],
            cy: [xpoint.y + 6, f.y - 6],
          }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn", repeatDelay: 0.5 }}
        />
      ))}
      <text x={cx} y={120} textAnchor="middle" fontSize="11" fill="#c5b6f7" fontWeight={600}>
        non-thermal electron beams ↓
      </text>

      {/* footpoint hard X-ray bursts */}
      {[footL, footR].map((f, i) => (
        <g key={`fp${i}`}>
          <motion.circle
            cx={f.x}
            cy={f.y - 4}
            r={10}
            fill="#ff6b1a"
            animate={{ r: [4, 16, 4], opacity: [0.9, 0, 0.9] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.9 }}
          />
          <circle cx={f.x} cy={f.y - 4} r={5} fill="#ff6b1a" />
        </g>
      ))}
      <text x={footL.x} y={278} textAnchor="middle" fontSize="10.5" fontWeight={700} fill="#ff6b1a">
        HARD X-ray
      </text>
      <text x={footR.x} y={278} textAnchor="middle" fontSize="10.5" fontWeight={700} fill="#ff6b1a">
        HARD X-ray
      </text>

      {/* chromospheric evaporation filling the loop → soft X-rays */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`ev${i}`}
          r={3.5}
          fill="#4aa8ff"
          animate={{
            cx: [i ? footR.x : footL.x, loopTop.x],
            cy: [footR.y - 10, loopTop.y - 64],
            opacity: [0, 0.9, 0.2],
          }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 1.4 + i * 0.2, ease: "easeOut" }}
        />
      ))}
      <motion.path
        d={`M${footL.x},${footL.y} Q${loopTop.x},${loopTop.y - 70} ${footR.x},${footR.y}`}
        fill="none"
        stroke="#4aa8ff"
        strokeWidth={6}
        strokeLinecap="round"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 }}
      />
      <text x={cx} y={loopTop.y - 50} textAnchor="middle" fontSize="11" fill="#7fc0ff" fontWeight={600}>
        heated loop → SOFT X-ray
      </text>
    </svg>
  );
}
