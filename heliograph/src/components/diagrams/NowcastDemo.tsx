import { useEffect, useMemo, useRef, useState } from "react";
import solexs from "../../data/solexs.json";

function rollingMedian(arr: number[], win: number) {
  const half = Math.floor(win / 2);
  return arr.map((_, i) => {
    const s = arr.slice(Math.max(0, i - half), Math.min(arr.length, i + half + 1)).slice().sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  });
}

export default function NowcastDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const data = solexs as { avg: (number | null)[]; max: number };
  const series = useMemo(() => data.avg.map((v) => (v == null ? 0 : v)), [data]);

  const [sens, setSens] = useState(1.8); // multiplier over baseline
  const [win, setWin] = useState(60); // baseline window (blocks)

  const baseline = useMemo(() => rollingMedian(series, win), [series, win]);
  const detected = useMemo(
    () => series.map((v, i) => v > baseline[i] * sens && v > 12),
    [series, baseline, sens]
  );
  const nDet = detected.filter(Boolean).length;
  const events = useMemo(() => {
    let c = 0; let prev = false;
    detected.forEach((d) => { if (d && !prev) c++; prev = d; });
    return c;
  }, [detected]);

  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height, padL = 40, padB = 26, padT = 12, padR = 10;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#0b101d"; ctx.fillRect(0, 0, W, H);
    const n = series.length, maxY = data.max * 1.1;
    const X = (i: number) => padL + (i / (n - 1)) * (W - padL - padR);
    const Y = (v: number) => H - padB - (v / maxY) * (H - padB - padT);

    ctx.strokeStyle = "#172238"; ctx.fillStyle = "#5c6884"; ctx.font = "10px Inter";
    for (let hh = 0; hh <= 24; hh += 6) { const xx = padL + (hh / 24) * (W - padL - padR); ctx.beginPath(); ctx.moveTo(xx, padT); ctx.lineTo(xx, H - padB); ctx.stroke(); ctx.fillText(`${hh}h`, xx - 6, H - padB + 14); }

    // threshold band
    ctx.strokeStyle = "#f0506e"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath();
    baseline.forEach((b, i) => { const yy = Y(b * sens); i ? ctx.lineTo(X(i), yy) : ctx.moveTo(X(i), yy); }); ctx.stroke(); ctx.setLineDash([]);
    // baseline
    ctx.strokeStyle = "#34d399"; ctx.lineWidth = 1.5; ctx.beginPath();
    baseline.forEach((b, i) => { const yy = Y(b); i ? ctx.lineTo(X(i), yy) : ctx.moveTo(X(i), yy); }); ctx.stroke();
    // signal
    ctx.strokeStyle = "#4aa8ff"; ctx.lineWidth = 1.8; ctx.beginPath();
    series.forEach((v, i) => { const yy = Y(v); i ? ctx.lineTo(X(i), yy) : ctx.moveTo(X(i), yy); }); ctx.stroke();
    // detections
    ctx.fillStyle = "#f0506e";
    detected.forEach((d, i) => { if (d) { ctx.beginPath(); ctx.arc(X(i), Y(series[i]), 2.6, 0, 7); ctx.fill(); } });

    ctx.font = "10px Inter";
    ctx.fillStyle = "#34d399"; ctx.fillText("adaptive baseline", padL + 4, padT + 10);
    ctx.fillStyle = "#f0506e"; ctx.fillText("detection threshold", padL + 4, padT + 24);
  }, [series, baseline, detected, sens, data.max]);

  return (
    <div>
      <canvas ref={ref} width={860} height={260} className="w-full" />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="rounded-lg border border-line bg-bg2 p-3 text-[13px] text-muted">
          <div className="mb-1 flex justify-between"><span>Sensitivity (× baseline)</span><span className="font-mono text-ink">{sens.toFixed(1)}×</span></div>
          <input type="range" min={1.2} max={4} step={0.1} value={sens} onChange={(e) => setSens(+e.target.value)} className="w-full accent-[#f0506e]" />
          <p className="mt-1 text-[12px]">Lower = more sensitive (catches faint flares, risks false alarms). Higher = stricter.</p>
        </label>
        <label className="rounded-lg border border-line bg-bg2 p-3 text-[13px] text-muted">
          <div className="mb-1 flex justify-between"><span>Baseline window</span><span className="font-mono text-ink">{(win * 2.4 / 60).toFixed(1)} h</span></div>
          <input type="range" min={10} max={150} step={5} value={win} onChange={(e) => setWin(+e.target.value)} className="w-full accent-[#34d399]" />
          <p className="mt-1 text-[12px]">How much history defines "quiet". Longer = smoother baseline, ignores slow drift.</p>
        </label>
      </div>
      <div className="mt-2 flex gap-3 text-[13px]">
        <span className="rounded-lg border border-line bg-panel px-3 py-1.5">Detected points: <b className="font-mono text-accent2">{nDet}</b></span>
        <span className="rounded-lg border border-line bg-panel px-3 py-1.5">Distinct events: <b className="font-mono text-[#f0506e]">{events}</b></span>
      </div>
    </div>
  );
}
