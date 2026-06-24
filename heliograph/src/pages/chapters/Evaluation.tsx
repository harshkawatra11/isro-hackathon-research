import { Callout, Equation, Figure } from "../../components/ui/primitives";
import TSSWidget from "../../components/diagrams/TSSWidget";

export default function Evaluation() {
  return (
    <>
      <p className="lead">
        A flare model that is never evaluated honestly is worthless, and flare forecasting is a minefield of
        misleading metrics. This chapter is where rigour is won or lost. It also maps one-to-one onto ISRO's three
        evaluation criteria, so it doubles as our scoring strategy.
      </p>

      <h3 className="prose-h3">Why accuracy is a trap</h3>
      <p>
        Flares are <strong>rare</strong>. In any stretch of data, the overwhelming majority of moments are "no
        flare". A lazy model that <em>always</em> predicts "no flare" scores ~99% accuracy, and is completely
        useless. Any metric that can be fooled by the class imbalance is disqualified. That rules out plain
        accuracy, and makes even F1 fragile as the imbalance shifts.
      </p>

      <h3 className="prose-h3">The space-weather standard: True Skill Statistic</h3>
      <p>
        The community's answer is the <strong>True Skill Statistic</strong> (TSS, also called the Hanssen–Kuiper
        skill score):
      </p>
      <Equation>TSS = TPR − FPR = (true-positive rate) − (false-positive rate)</Equation>
      <p>
        TSS ranges from −1 to +1; <strong>+1 is perfect, 0 is no skill</strong>. Its defining virtue: a constant or
        random forecast scores exactly 0 regardless of how imbalanced the data is. It cannot be gamed by predicting
        the majority class. That is precisely why it's the standard, and why it maps directly onto ISRO's "high
        TPR, low FAR" requirement (TSS rewards exactly that trade-off).
      </p>

      <Figure
        title="TSS in action: drag the decision threshold"
        caption="Each dot is a moment scored by the forecaster; orange/green are real pre-flare moments, blue are quiet. Slide the threshold and watch TPR, FPR and TSS trade off. We choose the operating threshold that maximises TSS, not the one that maximises accuracy."
      >
        <TSSWidget />
      </Figure>

      <h3 className="prose-h3">The full scorecard</h3>
      <p>We report TSS as the headline, with a panel of complementary metrics so nothing hides:</p>
      <ul className="ml-5 list-disc text-ink/90">
        <li><strong>HSS</strong> (Heidke Skill Score): a second skill score, for cross-checking.</li>
        <li><strong>ROC-AUC</strong>: threshold-independent ranking quality.</li>
        <li><strong>Brier score + reliability diagram</strong>: are the probabilities <em>calibrated</em>? A "0.8" must mean 80%.</li>
        <li><strong>Lead-time distribution</strong>: the headline ISRO metric: how many minutes before each flare's peak did the alert fire? Reported as a distribution, not a single flattering number.</li>
        <li><strong>Per-class recall (A/B/C/M/X)</strong>: proves "detection of low- AND high-class flares".</li>
      </ul>

      <Callout kind="warn" title="Time-blocked cross-validation: the rule that cannot bend">
        Time-series data must be split <strong>chronologically</strong>: train on earlier periods, test on strictly
        later ones (walk-forward / blocked CV). Random k-fold shuffling lets the model see the future and leaks
        information backward in time, producing metrics that are simply fiction. Every number we report comes from a
        held-out <em>future</em> block. This single discipline separates a credible forecaster from an impressive-
        looking but useless one.
      </Callout>

      <Callout kind="good" title="How this wins the evaluation">
        <div className="overflow-x-auto">
          <table className="mt-1 w-full text-[13.5px]">
            <thead><tr className="text-left text-muted">
              <th className="border border-line px-3 py-1.5">ISRO criterion</th>
              <th className="border border-line px-3 py-1.5">Our evidence</th>
            </tr></thead>
            <tbody>
              <tr><td className="border border-line px-3 py-1.5">Detection of low- &amp; high-class flares</td><td className="border border-line px-3 py-1.5">Per-class recall table (A→X)</td></tr>
              <tr><td className="border border-line px-3 py-1.5">High TPR, low FAR</td><td className="border border-line px-3 py-1.5">TSS, optimised on a held-out block</td></tr>
              <tr><td className="border border-line px-3 py-1.5">Lead time before peak</td><td className="border border-line px-3 py-1.5">Lead-time distribution + median</td></tr>
            </tbody>
          </table>
        </div>
      </Callout>
    </>
  );
}
