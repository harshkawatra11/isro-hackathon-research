import { Callout, Figure } from "../../components/ui/primitives";
import PipelineStepper from "../../components/diagrams/PipelineStepper";

export default function Pipeline() {
  return (
    <>
      <p className="lead">
        The architecture chapter showed the map; this one drives the road. We'll follow a single second of real
        data: the 13:15:26 UTC moment when our day-file spiked to 95 counts/s, through every stage, from raw
        gzipped FITS to a red alert on the operator's screen. Step through it.
      </p>

      <Figure
        title="One second of data, end to end: step through the pipeline"
        caption="Each stage transforms the data and hands it on. Notice that the nowcaster fires at stage 5 (the flare is happening) while the forecaster at stage 6 attaches a calibrated probability and lead time: two different jobs on the same second."
      >
        <PipelineStepper />
      </Figure>

      <h3 className="prose-h3">Why this ordering is non-negotiable</h3>
      <p>
        Every stage depends on the integrity of the one before it. Three ordering rules are load-bearing:
      </p>
      <ul className="ml-5 list-disc text-ink/90">
        <li>
          <strong>GTI masking before anything else.</strong> If you compute features or detect flares over invalid
          seconds, you'll manufacture false alarms from instrument artefacts. Clean first, analyse second.
        </li>
        <li>
          <strong>Fusion before features.</strong> The most powerful features are <em>cross-channel</em> (the
          hard/soft ratio). They only exist once soft and hard are on the same time grid.
        </li>
        <li>
          <strong>Features computed only from the past.</strong> Every rolling feature at time <em>t</em> uses only
          data up to <em>t</em>. A single forward-looking window would leak the future into the model and inflate
          every metric, the cardinal sin of time-series ML (Chapter 15).
        </li>
      </ul>

      <Callout kind="key" title="Streaming vs batch: the same code path">
        We design the pipeline so a stage doesn't care whether it's replaying a historical day (batch, for training
        and evaluation) or receiving live telemetry (streaming, for operations). Each stage is a pure function of
        "the data up to now." That single discipline means the model we evaluate offline behaves identically when
        deployed, with no train/serve skew. The dashboard's "replay" mode is literally the batch path driving the
        streaming UI.
      </Callout>

      <p>
        With the flow clear, the next two chapters open the two engines this pipeline forks into: the classical
        nowcaster and the hybrid forecaster, arguing in detail why each is built the way it is.
      </p>
    </>
  );
}
