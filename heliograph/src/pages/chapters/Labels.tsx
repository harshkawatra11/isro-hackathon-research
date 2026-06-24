import { Callout, Card, Figure } from "../../components/ui/primitives";

function LabelWindows() {
  const W = 620, H = 200, padL = 30, padB = 30, padT = 16;
  const n = 120;
  const flux = (i: number) => {
    const t = i / n;
    return 0.08 + 0.85 * Math.exp(-((t - 0.62) ** 2) / 0.006) + 0.04 * Math.sin(i / 4);
  };
  const X = (i: number) => padL + (i / (n - 1)) * (W - padL - 14);
  const Y = (v: number) => H - padB - v * (H - padB - padT);
  const path = Array.from({ length: n }, (_, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(flux(i)).toFixed(1)}`).join(" ");

  const bands = [
    { x0: 0, x1: 0.45, c: "#34d399", label: "QUIET (negative)" },
    { x0: 0.45, x1: 0.58, c: "#fbbf24", label: "PRE-FLARE (forecast target)" },
    { x0: 0.58, x1: 0.74, c: "#f0506e", label: "FLARE (nowcast)" },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {bands.map((b) => (
        <g key={b.label}>
          <rect x={X(b.x0 * n)} y={padT} width={X(b.x1 * n) - X(b.x0 * n)} height={H - padB - padT} fill={b.c} opacity={0.12} />
          <text x={(X(b.x0 * n) + X(b.x1 * n)) / 2} y={H - 10} textAnchor="middle" fontSize="9.5" fill={b.c} fontWeight={700}>
            {b.label}
          </text>
        </g>
      ))}
      <line x1={padL} y1={Y(0.16)} x2={W - 14} y2={Y(0.16)} stroke="#34d399" strokeDasharray="4 4" strokeWidth={1} />
      <path d={path} fill="none" stroke="#4aa8ff" strokeWidth={2.2} />
      {/* GOES catalog tick */}
      <line x1={X(0.62 * n)} y1={padT} x2={X(0.62 * n)} y2={H - padB} stroke="#fff" strokeDasharray="2 3" opacity={0.5} />
      <text x={X(0.62 * n) + 4} y={padT + 10} fontSize="9.5" fill="#fff">GOES peak time</text>
    </svg>
  );
}

export default function Labels() {
  return (
    <>
      <p className="lead">
        A supervised model is only as good as its labels. We need to tell the model, for every moment in the data,
        whether a flare is happening (for nowcasting) or about to happen (for forecasting). Hand-labelling 1,500
        days of one-second data is impossible, so we borrow ground truth from a catalog that already exists.
      </p>

      <h3 className="prose-h3">The GOES X-ray flare catalog</h3>
      <p>
        NOAA's <strong>GOES</strong> satellites have continuously monitored solar X-rays for decades and publish a
        free, authoritative <strong>flare catalog</strong>: every flare's <strong>start, peak, and end time</strong>{" "}
        and its <strong>class</strong> (A→X). This is the gold standard the entire field uses. We cross-reference its
        timestamps against our Aditya-L1 files to label them automatically.
      </p>

      <Callout kind="good" title="Why we can use Earth-based labels for an L1 spacecraft">
        GOES orbits Earth; Aditya-L1 sits 1.5 million km sunward. Does the timing still line up? Yes: the
        light-travel difference is only a few seconds, utterly negligible against flares that evolve over minutes.
        So a flare peaking at 13:15:00 UTC in the GOES catalog peaks at essentially the same UTC second in our
        SoLEXS data. The labels transfer cleanly. (We <em>verify</em> this in Phase 2 of the build by checking that
        the 13:15 enhancement in our real day-file matches a GOES entry.)
      </Callout>

      <h3 className="prose-h3">From timestamps to training windows</h3>
      <p>
        Each catalog entry lets us carve the continuous light curve into labelled windows, and the distinction
        between the yellow and red zones below is the entire difference between forecasting and nowcasting:
      </p>

      <Figure
        title="How a flare event becomes labelled windows"
        caption="Quiet (green) → negative examples. Pre-flare (yellow) → the window the FORECASTER must learn to recognise before the rise. Flare (red) → what the NOWCASTER must detect as it happens."
      >
        <LabelWindows />
      </Figure>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card icon="🟢" title="Quiet windows" accent="#34d399">
          Periods with no catalog flare. The abundant negative class, and the reason accuracy is a misleading
          metric (Chapter 15).
        </Card>
        <Card icon="🟡" title="Pre-flare windows" accent="#fbbf24">
          The minutes <em>before</em> a flare's onset. The forecaster is trained to separate these from quiet
          windows; that separation is the prediction.
        </Card>
        <Card icon="🔴" title="Flare windows" accent="#f0506e">
          Onset → peak → decay. The nowcaster must flag these in real time and the catalogue records them.
        </Card>
      </div>

      <Callout kind="warn" title="The labelling subtlety that makes or breaks the model">
        The forecasting label is a <strong>choice</strong>: "did a flare begin within the next N minutes?" That N
        defines the forecast horizon. Too short and there's no useful warning; too long and the pre-flare signal is
        too faint to learn. We treat N as a tuned hyper-parameter and report results per horizon, never quietly
        picking the N that flatters the metrics. And because flares are rare, these windows are extremely
        imbalanced, which dictates both the model design (Chapter 14) and the evaluation (Chapter 15).
      </Callout>

      <Callout kind="key" title="Part II complete">
        You now know the spacecraft, the instruments, the real data format, and where ground truth comes from. The
        physics and the data are in hand. Part III designs the product that turns them into flare warnings,
        starting with the full system architecture.
      </Callout>
    </>
  );
}
