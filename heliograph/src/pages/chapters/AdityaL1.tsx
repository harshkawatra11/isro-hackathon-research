import { Callout, Card, Figure } from "../../components/ui/primitives";
import L1Orbit from "../../components/diagrams/L1Orbit";
import PayloadExplorer from "../../components/diagrams/PayloadExplorer";

export default function AdityaL1() {
  return (
    <>
      <p className="lead">
        <strong>Aditya-L1</strong> is India's first dedicated mission to study the Sun. Launched on a PSLV on{" "}
        <strong>2 September 2023</strong>, it was inserted into its halo orbit around the Sun–Earth L1 point on{" "}
        <strong>6 January 2024</strong>. For this project it is not just a data source. It is the reason the
        problem is uniquely Indian, and the reason the evaluators care.
      </p>

      <h3 className="prose-h3">Why L1?</h3>
      <p>
        A Lagrange point is a location where the gravity of the Sun and the Earth balance the orbital motion of a
        small body, so a spacecraft can "hover" there while keeping pace with Earth. <strong>L1</strong> sits about
        1.5 million km from Earth directly toward the Sun, only ~1% of the way, but far enough to escape
        Earth's shadow entirely. From L1 the Sun is <strong>never eclipsed and never occulted</strong>: Aditya-L1
        can watch continuously, which is exactly what a flare-monitoring mission needs.
      </p>

      <Figure
        title="Aditya-L1 at the L1 point"
        caption="A halo orbit around L1 keeps the spacecraft in continuous sunlight and continuous contact with Earth, ~1.5 million km sunward."
      >
        <L1Orbit />
      </Figure>

      <Callout kind="good" title="A small, decisive advantage for forecasting">
        Because L1 is ~1.5 million km closer to the Sun than Earth-orbiting satellites, Aditya-L1's instruments
        receive the flare's photons a few seconds earlier than ground- or LEO-based monitors. At minute-scale flare
        timing this is negligible for <em>labelling</em> (so we can borrow Earth-based GOES timestamps, Chapter 10),
        but it underlines the mission's design intent as an <strong>early-warning sentinel</strong>.
      </Callout>

      <h3 className="prose-h3">Seven payloads, two philosophies</h3>
      <p>
        Aditya-L1 carries seven scientific payloads. Four are <strong>remote-sensing</strong> instruments that look
        at the Sun from a distance; three are <strong>in-situ</strong> instruments that sample the solar wind and
        magnetic field as they wash over L1. Our problem uses just the two X-ray spectrometers, but knowing the
        full suite is exactly the context that makes you sound like you belong at ISRO.
      </p>

      <Figure title="The payload suite (click to explore)" caption="SoLEXS and HEL1OS (marked 'ours') are the two soft/hard X-ray spectrometers that feed this project.">
        <PayloadExplorer />
      </Figure>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🔭" title="Remote sensing" accent="#4aa8ff">
          VELC (corona), SUIT (UV imaging), and our two: SoLEXS (soft X-ray) and HEL1OS (hard X-ray). These watch
          the Sun's atmosphere and its flares.
        </Card>
        <Card icon="🧲" title="In-situ" accent="#34d399">
          ASPEX and PAPA (solar-wind particles) and MAG (interplanetary magnetic field). These feel the solar wind
          and the arrival of CMEs directly at L1.
        </Card>
      </div>

      <Callout kind="key" title="Where we go next">
        We only need SoLEXS and HEL1OS. The next chapter opens them up: their detectors, their energy bands, and
        the clever two-detector trick that lets SoLEXS span the entire A→X dynamic range you met in Chapter 6.
      </Callout>
    </>
  );
}
