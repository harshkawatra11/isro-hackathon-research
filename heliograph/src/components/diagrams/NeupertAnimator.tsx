import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const N = 1000;

function buildSeries() {
  const hard = new Array(N);
  const soft = new Array(N);
  let acc = 0;
  const g = (x: number, mu: number, sg: number, A: number) => A * Math.exp(-((x - mu) ** 2) / (2 * sg * sg));
  for (let i = 0; i < N; i++) {
    const hv = g(i, 360, 32, 1) + g(i, 300, 18, 0.45) + g(i, 420, 26, 0.55) + 0.008;
    hard[i] = hv;
    acc += hv;
    soft[i] = acc;
  }
  const sMax = soft[N - 1];
  for (let i = 0; i < N; i++) soft[i] /= sMax;
  const hMax = Math.max(...hard);
  for (let i = 0; i < N; i++) hard[i] /= hMax;
  return { hard, soft };
}

export default function NeupertAnimator() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [{ hard, soft }] = useState(buildSeries);
  const [head, setHead] = useState(N - 1);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);

  const deriv = (i: number) => (i ? soft[i] - soft[i - 1] : 0);
  const dMax = Math.max(...soft.map((_, i) => deriv(i)));
  const hardPeak = hard.indexOf(Math.max(...hard));
  const softPeak = soft.indexOf(Math.max(...soft));

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height, padL = 44, padB = 28, padT = 18, mid = H * 0.52;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b101d";
    ctx.fillRect(0, 0, W, H);

    const X = (i: number) => padL + (i / (N - 1)) * (W - padL - 14);
    const Yh = (v: number) => mid - 8 - v * (mid - padT - 8);
    const Ys = (v: number) => H - padB - v * (H - padB - mid - 6);

    // mid divider
    ctx.strokeStyle = "#1c2740";
    ctx.beginPath(); ctx.moveTo(padL, mid); ctx.lineTo(W - 14, mid); ctx.stroke();

    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = "#5c6884";
    ctx.fillText("HARD X-ray (HEL1OS) — impulsive", padL + 4, padT + 2);
    ctx.fillText("SOFT X-ray (SoLEXS) — gradual", padL + 4, mid + 14);

    // lead-time band between hard peak and soft peak
    if (head > hardPeak) {
      const x1 = X(hardPeak), x2 = X(Math.min(head, softPeak));
      if (x2 > x1) {
        ctx.fillStyle = "rgba(255,167,38,0.10)";
        ctx.fillRect(x1, padT, x2 - x1, H - padB - padT);
      }
    }

    // d/dt(soft) overlay on hard panel
    ctx.strokeStyle = "#a78bfa"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= head; i++) {
      const y = mid - 8 - (deriv(i) / dMax) * (mid - padT - 8);
      i ? ctx.lineTo(X(i), y) : ctx.moveTo(X(i), y);
    }
    ctx.stroke(); ctx.setLineDash([]);

    // hard
    ctx.strokeStyle = "#ff6b1a"; ctx.lineWidth = 2.4; ctx.beginPath();
    for (let i = 0; i <= head; i++) { const y = Yh(hard[i]); i ? ctx.lineTo(X(i), y) : ctx.moveTo(X(i), y); }
    ctx.stroke();

    // soft
    ctx.strokeStyle = "#4aa8ff"; ctx.lineWidth = 2.4; ctx.beginPath();
    for (let i = 0; i <= head; i++) { const y = Ys(soft[i]); i ? ctx.lineTo(X(i), y) : ctx.moveTo(X(i), y); }
    ctx.stroke();

    // peak markers
    if (head >= hardPeak) {
      ctx.strokeStyle = "#ff6b1a"; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(X(hardPeak), padT); ctx.lineTo(X(hardPeak), H - padB); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ff6b1a"; ctx.fillText("hard peak", X(hardPeak) + 4, padT + 14);
    }
    if (head >= softPeak) {
      ctx.strokeStyle = "#4aa8ff"; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(X(softPeak), padT); ctx.lineTo(X(softPeak), H - padB); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#4aa8ff"; ctx.fillText("soft peak", X(softPeak) + 4, mid + 28);
      ctx.fillStyle = "#ffa726"; ctx.font = "bold 11px Inter";
      ctx.fillText("← lead time →", (X(hardPeak) + X(softPeak)) / 2 - 34, padT + 30);
    }

    // playhead
    ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(head), padT); ctx.lineTo(X(head), H - padB); ctx.stroke();
  }, [head, hard, soft, dMax, hardPeak, softPeak]);

  useEffect(() => {
    if (!playing) return;
    const step = () => {
      setHead((h) => {
        if (h >= N - 1) { setPlaying(false); return N - 1; }
        return h + 6;
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  return (
    <div>
      <canvas ref={ref} width={860} height={340} className="w-full" />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={() => { if (head >= N - 1) setHead(0); setPlaying((p) => !p); }}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#10131c] hover:bg-accent2"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => { setPlaying(false); setHead(0); }}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel2 px-4 py-2 text-sm font-semibold hover:border-accent/50"
        >
          <RotateCcw size={15} /> Reset
        </button>
        <input
          type="range" min={0} max={N - 1} value={head}
          onChange={(e) => { setPlaying(false); setHead(+e.target.value); }}
          className="flex-1 accent-[#ff6b1a]"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-[12.5px] text-muted">
        <Legend c="#ff6b1a" t="Hard X-ray — rises first" />
        <Legend c="#4aa8ff" t="Soft X-ray — peaks later" />
        <Legend c="#a78bfa" t="d/dt of soft ≈ hard" />
      </div>
    </div>
  );
}

function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-sm" style={{ background: c }} /> {t}
    </span>
  );
}
