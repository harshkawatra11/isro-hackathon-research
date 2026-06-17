import { motion } from "framer-motion";

/** Sun → Earth: three waves of space weather at three speeds. */
export default function ImpactTimeline() {
  const sunX = 70;
  const earthX = 720;
  const waves = [
    { y: 70, color: "#ffa726", label: "Electromagnetic radiation (X-ray, EUV)", eta: "~8 min", dur: 2.4 },
    { y: 130, color: "#4aa8ff", label: "Solar energetic particles", eta: "min – hours", dur: 4.5 },
    { y: 190, color: "#a78bfa", label: "Coronal mass ejection (plasma)", eta: "1 – 3 days", dur: 7 },
  ];
  return (
    <svg viewBox="0 0 780 250" className="w-full">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4cc" />
          <stop offset="60%" stopColor="#ff8a1a" />
          <stop offset="100%" stopColor="#d2560a" />
        </radialGradient>
        <radialGradient id="earthGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5aa9ff" />
          <stop offset="100%" stopColor="#1a3f73" />
        </radialGradient>
      </defs>

      {/* sun */}
      <circle cx={sunX} cy={130} r={44} fill="url(#sunGrad)" />
      <circle cx={sunX} cy={130} r={44} fill="none" stroke="#ffb347" strokeOpacity={0.4}>
        <animate attributeName="r" values="44;52;44" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x={sunX} y={134} textAnchor="middle" fontSize="13" fontWeight="800" fill="#7a3b00">
        SUN
      </text>

      {/* aditya-l1 marker */}
      <circle cx={sunX + 150} cy={130} r={5} fill="#ff6b1a" stroke="#fff" strokeWidth={1.4} />
      <text x={sunX + 150} y={112} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffa726">
        Aditya-L1
      </text>
      <text x={sunX + 150} y={155} textAnchor="middle" fontSize="9.5" fill="#93a0b8">
        (sees photons first)
      </text>

      {/* earth */}
      <circle cx={earthX} cy={130} r={26} fill="url(#earthGrad)" />
      <text x={earthX} y={134} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
        EARTH
      </text>

      {waves.map((w, i) => (
        <g key={i}>
          <line x1={sunX + 46} y1={w.y} x2={earthX - 28} y2={w.y} stroke="#233150" strokeWidth={1} strokeDasharray="3 4" />
          <motion.circle
            r={6}
            fill={w.color}
            initial={{ cx: sunX + 46 }}
            animate={{ cx: [sunX + 46, earthX - 28] }}
            transition={{ duration: w.dur, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
            cy={w.y}
            style={{ filter: `drop-shadow(0 0 5px ${w.color})` }}
          />
          <text x={sunX + 56} y={w.y - 9} fontSize="11.5" fill={w.color} fontWeight={600}>
            {w.label}
          </text>
          <text x={earthX - 34} y={w.y - 9} textAnchor="end" fontSize="11" fill="#93a0b8" fontFamily="monospace">
            {w.eta}
          </text>
        </g>
      ))}
    </svg>
  );
}
