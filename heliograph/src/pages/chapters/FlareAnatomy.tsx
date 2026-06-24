import { Callout, Card, Figure } from "../../components/ui/primitives";
import Reconnection from "../../components/diagrams/Reconnection";

export default function FlareAnatomy() {
  return (
    <>
      <p className="lead">
        A solar flare is a story of energy conversion: magnetic energy stored in the corona is released and
        transformed into particle motion, heat, and radiation across the spectrum. The accepted picture is the{" "}
        <strong>CSHKP standard model</strong> (named for Carmichael, Sturrock, Hirayama, Kopp & Pneuman). It
        explains, in one geometry, why a flare emits <em>both</em> hard and soft X-rays, and why they peak at
        different times. That timing difference is the seed of everything we forecast.
      </p>

      <Figure
        title="The standard flare model: magnetic reconnection, animated"
        caption="Watch the cycle: reconnection at the X-point → electron beams race down the loop legs → they hit the chromosphere and emit hard X-rays at the footpoints → the heated plasma evaporates up to fill the loop, which glows in soft X-rays."
      >
        <Reconnection />
      </Figure>

      <h3 className="prose-h3">Step by step</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="✂️" title="1 · Reconnection releases the energy" accent="#fff">
          Stressed, oppositely-directed magnetic field lines are pushed together until they snap and reconnect into
          a lower-energy configuration. The difference in magnetic energy is dumped, explosively, into the
          surrounding plasma. This is the trigger.
        </Card>
        <Card icon="⚡" title="2 · Electrons are accelerated" accent="#a78bfa">
          A large fraction of that energy goes into accelerating electrons to a substantial fraction of light speed.
          These <strong>non-thermal</strong> electrons stream down the newly-formed magnetic loop toward the
          surface.
        </Card>
        <Card icon="💥" title="3 · Footpoints flash in hard X-rays" accent="#ff6b1a">
          When the electron beams hit the dense chromosphere at the loop's <strong>footpoints</strong>, they
          decelerate violently, converting their energy into <strong>hard X-rays</strong> (non-thermal
          bremsstrahlung). This happens during the brief, intense <em>impulsive phase</em>.
        </Card>
        <Card icon="🌡️" title="4 · Evaporation lights the loop in soft X-rays" accent="#4aa8ff">
          The footpoints are heated to tens of millions of kelvin. This super-hot plasma expands upward via
          <strong> chromospheric evaporation</strong>, filling the coronal loop. The dense, hot loop then radiates{" "}
          <strong>soft X-rays</strong> (thermal bremsstrahlung) through the slower <em>gradual phase</em>.
        </Card>
      </div>

      <Callout kind="key" title="The crucial consequence">
        Hard X-rays come from the <em>instantaneous</em> arrival of accelerated electrons; they switch on the
        moment reconnection accelerates particles, and switch off when it stops. Soft X-rays come from the{" "}
        <em>accumulated</em> heating of the loop; they keep rising as long as energy is still being deposited, and
        peak <strong>after</strong> the hard X-rays. <strong>Hard leads; soft follows.</strong> Hold onto that:
        Chapter 5 turns it into a forecasting signal.
      </Callout>

      <h3 className="prose-h3">The impostors we must reject</h3>
      <p>
        Not every brightening is a flare, and ISRO's problem statement is explicit that we must keep a{" "}
        <strong>low false-alarm rate</strong>. Two physical effects can masquerade as a flare in a Sun-as-a-star
        light curve:
      </p>
      <ul className="ml-5 list-disc text-ink/90">
        <li>
          <strong>Instrumental / particle background:</strong> when the spacecraft passes through regions of
          energetic particles, or the detector responds to cosmic rays, counts can spike without a real flare. The
          Good-Time-Interval (GTI) files and the hard/soft consistency check defend against this.
        </li>
        <li>
          <strong>Active-region rotation &amp; slow variability:</strong> the quiescent X-ray background drifts as
          active regions rotate across the disk. An <em>adaptive</em> baseline (Chapter 13) separates this slow
          drift from a genuine sharp flare rise.
        </li>
      </ul>

      <Callout kind="deep" title="Why the two-channel design is physically motivated">
        A real flare must show the correct <em>causal signature</em>: a hard-X-ray impulsive burst followed by a
        soft-X-ray gradual rise. A background glitch or a calibration artefact generally won't reproduce that
        ordered, physically-linked behaviour across two independent instruments. Requiring both channels to agree is
        not just an accuracy trick; it is a direct application of flare physics to suppress false alarms.
      </Callout>
    </>
  );
}
