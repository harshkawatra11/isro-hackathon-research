import { Callout, Card } from "../../components/ui/primitives";

const TECH = [
  ["FITS I/O", "astropy", "standard reader for SoLEXS/HEL1OS products + GTI", "BSD"],
  ["Numerics", "numpy · pandas", "time-series wrangling, alignment, resampling", "BSD"],
  ["Signal", "scipy", "detrending, smoothing, derivative, baseline", "BSD"],
  ["Forecaster A", "LightGBM", "fast, interpretable, sample-efficient on rare events", "MIT"],
  ["Forecaster B", "MiniROCKET (sktime)", "CPU, deterministic, SOTA-ish raw time-series", "BSD"],
  ["Calibration / metrics", "scikit-learn", "isotonic/Platt, TSS/HSS/ROC/Brier, blocked CV", "BSD"],
  ["Explainability", "SHAP", "per-prediction precursor attribution", "MIT"],
  ["Interface", "Streamlit", "dual light curves + alerts + replay, ₹0", "Apache-2.0"],
  ["Environment", "Python 3.11 (uv)", "prebuilt wheels; avoids the 3.14 build failure", "PSF"],
];

export default function Features() {
  return (
    <>
      <p className="lead">
        The template's "features" and "technologies" slides, in one place. The feature list is what the solution
        does; the tech stack is what it's made of, with every choice justified earlier in the guide, every dependency
        free and CPU-first.
      </p>

      <h3 className="prose-h3">Features offered by the solution</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🗂️" title="1 · Automated nowcast catalogue">
          Real-time flare detection on soft + hard channels, merged into one master catalogue with onset/peak/end,
          relative class, and significance, with no manual intervention.
        </Card>
        <Card icon="⏱️" title="2 · Calibrated forecast + lead time">
          <code className="code-inline">P(flare ≤ N min)</code> with a calibrated confidence and a measured
          lead-time distribution, the headline ISRO metric.
        </Card>
        <Card icon="🚨" title="3 · Live dashboard with visual alerts">
          Dual light curves + hard/soft ratio + a green/amber/red banner that flips before the soft peak, with a
          replay mode over historical days.
        </Card>
        <Card icon="📐" title="4 · Full A→X dynamic range">
          Adaptive baselining + dual SoLEXS detectors detect both faint A/B/C and giant M/X flares.
        </Card>
        <Card icon="🔍" title="5 · Explainable alerts (SHAP)">
          Every forecast says <em>why</em>: which precursor drove it, so scientists can trust and audit it.
        </Card>
        <Card icon="💻" title="6 · Offline & reproducible">
          No cloud, no cost, no proprietary software. End-to-end on a single laptop from public data.
        </Card>
      </div>

      <h3 className="prose-h3">Technologies to be used</h3>
      <div className="overflow-x-auto">
        <table className="my-3 w-full text-[13.5px]">
          <thead><tr className="text-left text-muted">
            <th className="border border-line px-3 py-1.5">Layer</th>
            <th className="border border-line px-3 py-1.5">Tool</th>
            <th className="border border-line px-3 py-1.5">Why this one</th>
            <th className="border border-line px-3 py-1.5">License</th>
          </tr></thead>
          <tbody>
            {TECH.map((r) => (
              <tr key={r[1]}>
                <td className="border border-line px-3 py-1.5">{r[0]}</td>
                <td className="border border-line px-3 py-1.5 font-mono text-accent2">{r[1]}</td>
                <td className="border border-line px-3 py-1.5">{r[2]}</td>
                <td className="border border-line px-3 py-1.5">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout kind="good" title="Every dependency is free and CPU-first">
        The entire stack is open-source (BSD/MIT/Apache/PSF) and runs CPU-first on the target machine
        (i5-13420H / RTX 3050 / 16 GB). GPU is optional, never required, which is what makes the ₹0 cost claim in
        the next chapter real.
      </Callout>
    </>
  );
}
