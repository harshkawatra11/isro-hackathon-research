import { Callout, Card, Figure } from "../../components/ui/primitives";
import FeatureImportance from "../../components/diagrams/FeatureImportance";

export default function Forecasting() {
  return (
    <>
      <p className="lead">
        Forecasting is the hard, valuable half: predicting <code className="code-inline">P(flare in the next N
        minutes)</code> from precursors, with quantifiable lead time. This is where machine learning genuinely
        earns its place — and where ISRO's emphasis on "identifying precursor patterns" points to a specific,
        defensible model design.
      </p>

      <h3 className="prose-h3">From the Neupert effect to a feature matrix</h3>
      <p>
        Chapter 5 told us physically what to look for: a flare is preceded by fresh energy injection, which shows up
        as a <strong>rising hard/soft ratio</strong> and an accelerating soft rise. We turn that physics into
        rolling-window features computed only from the past:
      </p>

      <Figure
        title="Engineered features, ranked by importance (illustrative SHAP-style)"
        caption="The hard/soft ratio and its derivative dominate — exactly what the Neupert effect predicts. This is the pleasing result where the physics and the model agree, and it's what makes the forecaster explainable rather than a black box."
      >
        <FeatureImportance />
      </Figure>

      <h3 className="prose-h3">A hybrid ensemble — and why each half is there</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🌳" title="Branch 1 · LightGBM on features" accent="#ff8a3d">
          Gradient-boosted trees on the engineered Neupert features. Sample-efficient on rare events, fast on CPU,
          and — crucially — <strong>interpretable via SHAP</strong>: it can tell you <em>which precursor</em> fired
          a given alert. This is the backbone, and it directly answers "identify precursor patterns".
        </Card>
        <Card icon="🚀" title="Branch 2 · MiniROCKET on raw windows" accent="#ff8a3d">
          Random convolutional kernels + a linear head, applied to the raw dual-channel window. It learns precursor{" "}
          <strong>morphology</strong> the hand-built features might miss — the <em>shape</em> of a building flare,
          not just summary statistics.
        </Card>
      </div>
      <p>
        Their probabilities are combined and <strong>calibrated</strong> (isotonic regression) into one number with
        an honest confidence — so "0.8" really means "about 80% of such moments are followed by a flare."
      </p>

      <Callout kind="deep" title="Why MiniROCKET, and not a deep CNN or Transformer?">
        It would be easy — and wrong — to reach for a large neural network. The decisive facts:
        <ul className="mt-2 ml-5 list-disc">
          <li><strong>Flares are rare.</strong> The strong M/X class — the events we most need — has very few examples. A high-capacity deep net overfits that minority class badly.</li>
          <li><strong>The hardware is a 4 GB-VRAM RTX 3050.</strong> Heavy sequence models strain it; iteration slows to a crawl.</li>
          <li><strong>MiniROCKET is deterministic, CPU-only, and fits in seconds</strong>, yet sits near state-of-the-art on time-series classification.</li>
        </ul>
        So MiniROCKET is the <em>minimal</em> addition that captures raw-sequence morphology without the overfitting
        or hardware tax. A small 1D-CNN is kept as an optional GPU experiment, never the primary. Choosing the
        lighter learner is, again, the rigorous call.
      </Callout>

      <Callout kind="warn" title="The leakage trap that invalidates most student forecasters">
        Every feature at time <em>t</em> must use only data up to <em>t</em>, and cross-validation must be{" "}
        <strong>time-ordered</strong> (Chapter 15). Randomly shuffling time-series rows lets the model peek at the
        future, producing spectacular metrics that collapse in deployment. We design against this from the first
        line of feature code — it is the single most common reason flare forecasters fail in the real world.
      </Callout>

      <Callout kind="key" title="What this produces">
        A calibrated, explainable <code className="code-inline">P(flare ≤ N min)</code> stream with a measured
        lead-time distribution — ISRO's deliverable #2. The next chapter shows how we prove it actually works,
        with the metric the space-weather community trusts.
      </Callout>
    </>
  );
}
