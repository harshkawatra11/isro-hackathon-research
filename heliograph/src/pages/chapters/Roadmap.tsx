import { Callout, Figure } from "../../components/ui/primitives";
import RoadmapTimeline from "../../components/diagrams/RoadmapTimeline";

export default function Roadmap() {
  return (
    <>
      <p className="lead">
        This is how the system actually gets built. The build uses <strong>AI implementation to improve speed
        towards training the model and DevOps</strong>, a force-multiplier under human sign-off, not an autopilot.
        Each phase is a self-contained unit of work executed with <strong>AI-assisted implementation</strong>: it
        proposes a plan, writes and runs the code, and you sign off on a concrete <em>definition of done</em> before
        moving on. Expand each phase.
      </p>

      <Figure
        title="The nine build phases: expand any phase"
        caption="Phases 3 (nowcast), 5 (forecast) and 7 (dashboard) are the directly-scored deliverables. The rest exist to make those three trustworthy. Total: roughly two focused weeks."
      >
        <RoadmapTimeline />
      </Figure>

      <h3 className="prose-h3">How to drive the AI implementation well</h3>
      <ul className="ml-5 list-disc text-ink/90">
        <li><strong>One phase per session.</strong> Give it the phase goal and definition of done; let it propose a plan before it writes code.</li>
        <li><strong>Always demand the verification artefact</strong>: a plot, a metric, a printed table. "Show me it works," never "it's done."</li>
        <li><strong>Keep the repo skeleton fixed</strong> so context stays cheap: <code className="code-inline">src/{`{io, labels, nowcast, features, forecast, eval, app}`}</code>, plus <code className="code-inline">data/</code>, <code className="code-inline">notebooks/</code>, <code className="code-inline">reports/</code>.</li>
        <li><strong>Feed it this guide.</strong> The physics and the rigour arguments here <em>are</em> the spec; point the AI implementation at the relevant chapter so its choices match the design.</li>
      </ul>

      <Callout kind="key" title="Verification is the through-line">
        Notice that every phase ends in something you can <em>see</em>: a plot of aligned channels, a catalogue that
        matches GOES, a TSS number on a held-out block, a banner that flips before the soft peak. Progress is proven,
        never assumed. That discipline of building the smallest verifiable increment, then checking it against reality
        is exactly how a credible scientific system is assembled, and exactly how this hackathon is won.
      </Callout>

      <Callout kind="good" title="Part III complete">
        You now have the full product design: architecture, pipeline, both engines, the evaluation that proves them,
        the interface that surfaces them, and the plan to build them. Part IV packages all of this into the exact
        sections ISRO's submission template requires.
      </Callout>
    </>
  );
}
