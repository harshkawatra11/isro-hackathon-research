import { useEffect, useMemo, useRef, useState } from "react";

function gaussRand() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function TSSWidget() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [th, setTh] = useState(55);
  const { neg, pos } = useMemo(() => {
    const neg: number[] = [], pos: number[] = [];
    for (let i = 0; i < 220; i++) neg.push(Math.max(0, Math.min(100, 36 + 17 * gaussRand())));
    for (let i = 0; i < 42; i++) pos.push(Math.max(0, Math.min(100, 67 + 15 * gaussRand())));
    return { neg, pos };
  }, []);

  const TP = pos.filter((v) => v >= th).length;
  const FN = pos.length - TP;
  const FP = neg.filter((v) => v >= th).length;
  const TN = neg.length - FP;
  const TPR = TP / (TP + FN), FPR = FP / (FP + TN), TSS = TPR - FPR;

  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height; ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b101d"; ctx.fillRect(0, 0, W, H);
    const base = H - 46, X = (v: number) => 40 + (v / 100) * (W - 60);
    ctx.strokeStyle = "#233150"; ctx.beginPath(); ctx.moveTo(40, base); ctx.lineTo(W - 20, base); ctx.stroke();
    ctx.fillStyle = "#5c6884"; ctx.font = "11px Inter"; ctx.fillText("forecast probability →", W - 150, base + 28);
    neg.forEach((v, i) => { ctx.globalAlpha = 0.7; ctx.fillStyle = v >= th ? "#f0506e" : "#3a4f7a"; ctx.beginPath(); ctx.arc(X(v), base - 12 - (i % 14) * 8, 3, 0, 7); ctx.fill(); });
    pos.forEach((v, i) => { ctx.globalAlpha = 0.95; ctx.fillStyle = v >= th ? "#34d399" : "#ffa726"; ctx.beginPath(); ctx.arc(X(v), base - 12 - (i % 14) * 8, 4, 0, 7); ctx.fill(); });
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#fff"; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(X(th), 16); ctx.lineTo(X(th), base); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = "12px Inter";
    ctx.fillStyle = "#34d399"; ctx.fillText("● flare caught (TP)", W - 168, 26);
    ctx.fillStyle = "#ffa726"; ctx.fillText("● flare missed (FN)", W - 168, 44);
    ctx.fillStyle = "#f0506e"; ctx.fillText("● false alarm (FP)", W - 168, 62);
  }, [neg, pos, th]);

  const color = TSS > 0.6 ? "#34d399" : TSS > 0.3 ? "#ffa726" : "#f0506e";
  return (
    <div>
      <canvas ref={ref} width={860} height={250} className="w-full" />
      <div className="mt-2">
        <input type="range" min={0} max={100} value={th} onChange={(e) => setTh(+e.target.value)} className="w-full accent-[#ff6b1a]" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[13px] sm:grid-cols-4">
        <div className="rounded-lg border border-line bg-panel px-2 py-2">TPR<br /><b className="font-mono text-soft">{TPR.toFixed(2)}</b></div>
        <div className="rounded-lg border border-line bg-panel px-2 py-2">FPR<br /><b className="font-mono text-[#f0506e]">{FPR.toFixed(2)}</b></div>
        <div className="rounded-lg border-2 px-2 py-2" style={{ borderColor: color }}>TSS<br /><b className="font-mono" style={{ color }}>{TSS.toFixed(2)}</b></div>
        <div className="rounded-lg border border-line bg-panel px-2 py-2 font-mono text-[11px] text-muted">TP {TP} · FN {FN}<br />FP {FP} · TN {TN}</div>
      </div>
    </div>
  );
}
