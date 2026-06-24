import { useMemo } from "react";

/** Lightweight CSS starfield, fixed behind everything. */
export default function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.4 + 0.3,
        d: Math.random() * 3,
        o: Math.random() * 0.6 + 0.2,
      })),
    []
  );
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r * 0.12}
          fill="#cfe0ff"
          opacity={s.o}
          style={{ animation: `twinkle 3s ease-in-out ${s.d}s infinite` }}
        />
      ))}
    </svg>
  );
}
