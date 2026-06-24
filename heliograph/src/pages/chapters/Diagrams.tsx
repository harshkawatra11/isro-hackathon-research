import { Figure } from "../../components/ui/primitives";
import ProcessFlow from "../../components/diagrams/ProcessFlow";
import UseCase from "../../components/diagrams/UseCase";
import SystemArchitecture from "../../components/diagrams/SystemArchitecture";

export default function Diagrams() {
  return (
    <>
      <p className="lead">
        The ISRO template asks for three diagrams: a process-flow or use-case diagram, and an architecture diagram.
        All three are here, on screen, the same diagrams that appeared in context throughout the guide, collected
        for the submission and ready to export to the deck.
      </p>

      <h3 className="prose-h3">Process-flow diagram</h3>
      <Figure
        title="Data process flow"
        caption="Raw payload files → ingest & GTI → fuse → the parallel nowcast / forecast engines → alerts + catalogue. The gold pulse traces a datum moving through the pipeline."
      >
        <ProcessFlow />
      </Figure>

      <h3 className="prose-h3">Use-case diagram</h3>
      <Figure
        title="Actors and use cases"
        caption="Two actors: an operations operator and a researcher, and the four things they do with the system."
      >
        <UseCase />
      </Figure>

      <h3 className="prose-h3">Architecture diagram</h3>
      <Figure
        title="Full system architecture (interactive)"
        caption="The complete layered architecture from Chapter 11, with every component labelled by its technology. Drag to explore."
      >
        <SystemArchitecture />
      </Figure>

      <p className="text-muted">
        Use <span className="kbd">Ctrl/Cmd + P</span> to print these sections into the BAH-2026 submission deck.
      </p>
    </>
  );
}
