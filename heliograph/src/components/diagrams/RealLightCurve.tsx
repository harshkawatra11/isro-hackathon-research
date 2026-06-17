import { useEffect, useRef, useState } from "react";
import solexs from "../../data/solexs.json";

/** Renders the real downloaded SoLEXS day-file light curve (decimated). */
export default function RealLightCurve() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ x: number; hh: number; v: number } | null>(null);
  const data = solexs as {
    avg: (number | null)[]; peak: (number | null)[]; median: number; max: number; peak_sec: number;
  };

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height, padL = 44, padB = 30, padT = 14, padR = 12;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b101d"; ctx.fillRect(0, 0, W, H);

    const n = data.avg.length;
    const maxY = data.max * 1.1;
    const X = (i: number) => padL + (i / (n - 1)) * (W - padL - padR);
    const Y = (v: number) => H - padB - (v / maxY) * (H - padB - padT);

    // grid
    ctx.strokeStyle = "#172238"; ctx.lineWidth = 1; ctx.fillStyle = "#5c6884"; ctx.font = "11px Inter";
    for (let hh = 0; hh <= 24; hh += 4) {
      const xx = padL + (hh / 24) * (W - padL - padR);
      ctx.beginPath(); ctx.moveTo(xx, padT); ctx.lineTo(xx, H - padB); ctx.stroke();
      ctx.fillText(`${hh}h`, xx - 7, H - padB + 16);
    }
    for (let g = 0; g <= maxY; g += 20) {
      ctx.beginPath(); ctx.moveTo(padL, Y(g)); ctx.lineTo(W - padR, Y(g)); ctx.stroke();
      ctx.fillText(`${g}`, 8, Y(g) + 3);
    }
    ctx.fillText("counts/s", 6, 11);

    // peak (faint)
    ctx.strokeStyle = "rgba(255,107,26,0.45)"; ctx.lineWidth = 1; ctx.beginPath();
    data.peak.forEach((v, i) => { if (v == null) return; const xx = X(i), yy = Y(v); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); });
    ctx.stroke();

    // median baseline
    ctx.strokeStyle = "#34d399"; ctx.setLineDash([5, 4]); ctx.beginPath();
    ctx.moveTo(padL, Y(data.median)); ctx.lineTo(W - padR, Y(data.median)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#34d399"; ctx.fillText(`quiet ≈ ${data.median}/s`, padL + 6, Y(data.median) - 5);

    // avg (main)
    ctx.strokeStyle = "#4aa8ff"; ctx.lineWidth = 2; ctx.beginPath();
    data.avg.forEach((v, i) => { if (v == null) return; const xx = X(i), yy = Y(v); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); });
    ctx.stroke();

    // flare marker
    const ps = data.peak_sec, pi = Math.round((ps / 86400) * (n - 1));
    ctx.fillStyle = "#f0506e"; ctx.beginPath(); ctx.arc(X(pi), Y(data.max), 5, 0, 7); ctx.fill();
    ctx.fillStyle = "#f0506e"; ctx.font = "12px Inter";
    ctx.fillText(`real flare · ${data.max}/s @ ${(ps / 3600).toFixed(1)}h UTC`, Math.min(X(pi), W - 220), Y(data.max) - 10);
  }, [data]);

  return (
    <div>
      <canvas
        ref={ref}
        width={860}
        height={300}
        className="w-full cursor-crosshair"
        onMouseMove={(e) => {
          const cv = ref.current!; const rect = cv.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * cv.width;
          const n = data.avg.length, padL = 44, padR = 12;
          const i = Math.round(((px - padL) / (cv.width - padL - padR)) * (n - 1));
          if (i < 0 || i >= n || data.avg[i] == null) { setHover(null); return; }
          setHover({ x: e.clientX - rect.left, hh: (i / n) * 24, v: data.avg[i]! });
        }}
        onMouseLeave={() => setHover(null)}
      />
      {hover && (
        <div className="mt-1 text-center font-mono text-[12px] text-muted">
          {hover.hh.toFixed(1)}h UTC · {hover.v.toFixed(1)} counts/s
        </div>
      )}
    </div>
  );
}
