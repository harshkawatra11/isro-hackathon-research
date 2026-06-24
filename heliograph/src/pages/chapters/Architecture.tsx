import { Callout, Figure } from "../../components/ui/primitives";
import SystemArchitecture from "../../components/diagrams/SystemArchitecture";

export default function Architecture() {
  return (
    <>
      <p className="lead">
        Here is the whole system on one canvas. Every box is something we build; every arrow is data moving. Drag
        the nodes, zoom in, follow a path. The rest of Part III walks each component in turn. This chapter is the
        map you'll keep coming back to.
      </p>

      <Figure
        title="SURYASETU system architecture (interactive)"
        caption="Drag nodes to explore. Two engines run in parallel off the same fused, GTI-clean signal: a classical nowcaster (green) that produces the master catalogue, and an ML forecaster (orange → purple) that produces calibrated lead-time predictions. Both feed the alert dashboard."
      >
        <SystemArchitecture />
      </Figure>

      <h3 className="prose-h3">The shape of the design</h3>
      <p>
        Notice the single most important structural decision: <strong>two engines, one signal</strong>. The data is
        ingested, cleaned with GTI, and fused once. From that shared foundation the pipeline forks:
      </p>
      <ul className="ml-5 list-disc text-ink/90">
        <li>
          <strong>The nowcasting path (green)</strong> is deliberately simple and classical: a deterministic
          detector that needs no training and produces the automated master catalogue ISRO asks for (deliverable
          #1). It is the dependable backbone.
        </li>
        <li>
          <strong>The forecasting path (orange → purple)</strong> is where the machine learning lives: two
          complementary models whose probabilities are fused and calibrated into a single <code className="code-inline">P(flare in next N min)</code> with a meaningful confidence (deliverable #2).
        </li>
        <li>
          <strong>Both converge on the dashboard (purple)</strong>, the operator-facing interface with visual
          alerts (deliverable #3).
        </li>
      </ul>

      <Callout kind="key" title="Why separate the two engines at all?">
        Because they answer different questions with different tools. Detecting an <em>ongoing</em> flare is a
        solved signal-processing problem; throwing ML at it would add fragility and opacity for no gain.
        Anticipating a <em>future</em> flare from faint precursors genuinely needs a learned model. Forcing both
        into one black box would make each worse. Separating them lets each use the right method and lets the
        nowcaster keep working even if the forecaster is uncertain. This is the central rigour decision of the
        whole architecture, and Chapters 13–14 defend each half.
      </Callout>

      <h3 className="prose-h3">Mapping the architecture to ISRO's deliverables</h3>
      <div className="overflow-x-auto">
        <table className="my-3 w-full text-[13.5px]">
          <thead>
            <tr className="text-left text-muted">
              <th className="border border-line px-3 py-1.5">ISRO deliverable</th>
              <th className="border border-line px-3 py-1.5">Architecture component</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-line px-3 py-1.5">Automated nowcast master catalogue</td><td className="border border-line px-3 py-1.5">Nowcast engine → Master catalogue (green)</td></tr>
            <tr><td className="border border-line px-3 py-1.5">Forecast model with quantifiable lead time</td><td className="border border-line px-3 py-1.5">LightGBM + MiniROCKET → Calibrated fusion (orange→purple)</td></tr>
            <tr><td className="border border-line px-3 py-1.5">Interface with visual alerts</td><td className="border border-line px-3 py-1.5">Streamlit dashboard (purple)</td></tr>
            <tr><td className="border border-line px-3 py-1.5">High TPR / low FAR, lead-time reporting</td><td className="border border-line px-3 py-1.5">Evaluation (TSS, blocked CV)</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Nothing in this architecture is decorative. Every node exists to satisfy a stated requirement. The next
        chapter animates one second of data flowing through it, end to end.
      </p>
    </>
  );
}
