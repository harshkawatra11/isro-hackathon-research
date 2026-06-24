import { Callout, Card, Figure } from "../../components/ui/primitives";
import XraySpectrum from "../../components/diagrams/XraySpectrum";

export default function XrayPhysics() {
  return (
    <>
      <p className="lead">
        SoLEXS and HEL1OS both measure X-rays, so why two instruments? Because "soft" and "hard" X-rays are made
        by <strong>two physically different processes</strong>, carry different information, and peak at different
        times. This chapter explains the radiation physics so that, when you see two light curves later, you know
        exactly what each one is telling you.
      </p>

      <h3 className="prose-h3">One word: bremsstrahlung</h3>
      <p>
        Almost all solar-flare X-rays are <strong>bremsstrahlung</strong> ("braking radiation"): when a fast
        electron is deflected by the electric field of an ion, it decelerates, and the lost kinetic energy is
        emitted as an X-ray photon. The <em>energy distribution</em> of the electrons doing the braking is what
        separates soft from hard.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🔥" title="Thermal → soft X-rays (SoLEXS)" accent="#4aa8ff">
          In the flare-heated coronal loop, the plasma reaches 10–25 million K. Its electrons share a{" "}
          <strong>thermal (Maxwellian)</strong> distribution: most are low-energy, very few are fast. Their
          bremsstrahlung produces a spectrum that falls off <strong>exponentially</strong> with energy: bright at a
          few keV, fading fast. This is the <strong>soft</strong> X-ray emission, and it traces{" "}
          <em>how much</em> plasma has been heated.
        </Card>
        <Card icon="⚡" title="Non-thermal → hard X-rays (HEL1OS)" accent="#ff6b1a">
          The freshly-accelerated electron beams are <strong>non-thermal</strong>, a power-law distribution with
          many high-energy electrons. Slamming into the dense chromosphere, they emit a <strong>power-law</strong>{" "}
          spectrum that reaches tens to hundreds of keV. This is the <strong>hard</strong> X-ray emission, and it
          traces <em>the rate of energy injection</em>: the acceleration happening right now.
        </Card>
      </div>

      <Figure
        title="The two spectra: adjust the physics"
        caption="Thermal emission (blue) always falls off exponentially and lives mostly in SoLEXS's band. Non-thermal emission (orange) is a power law that extends into HEL1OS's hard band. Raise the temperature or harden the electron beam and watch each respond."
      >
        <XraySpectrum />
      </Figure>

      <Callout kind="key" title="Read this table once and the rest of the guide clicks">
        <div className="overflow-x-auto">
          <table className="mt-1 w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-muted">
                <th className="border border-line px-3 py-1.5">Property</th>
                <th className="border border-line px-3 py-1.5 text-soft">Soft X-ray (SoLEXS)</th>
                <th className="border border-line px-3 py-1.5 text-hard">Hard X-ray (HEL1OS)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-line px-3 py-1.5">Mechanism</td><td className="border border-line px-3 py-1.5">Thermal bremsstrahlung</td><td className="border border-line px-3 py-1.5">Non-thermal bremsstrahlung</td></tr>
              <tr><td className="border border-line px-3 py-1.5">Source location</td><td className="border border-line px-3 py-1.5">Coronal loop (top)</td><td className="border border-line px-3 py-1.5">Chromospheric footpoints</td></tr>
              <tr><td className="border border-line px-3 py-1.5">Tells you</td><td className="border border-line px-3 py-1.5">Accumulated heat</td><td className="border border-line px-3 py-1.5">Instantaneous energy input</td></tr>
              <tr><td className="border border-line px-3 py-1.5">Timing</td><td className="border border-line px-3 py-1.5">Gradual, peaks later</td><td className="border border-line px-3 py-1.5">Impulsive, peaks early</td></tr>
              <tr><td className="border border-line px-3 py-1.5">Energy band</td><td className="border border-line px-3 py-1.5">2–22 keV</td><td className="border border-line px-3 py-1.5">8–150 keV</td></tr>
            </tbody>
          </table>
        </div>
      </Callout>

      <p>
        The last two rows are the whole reason this problem is solvable. <strong>Hard X-rays report the energy
        input as it happens; soft X-rays report the heat that input produces, a little later.</strong> The
        mathematical form of "a little later" has a name: the Neupert effect, and it is the engine of our
        forecast. That is the next chapter.
      </p>
    </>
  );
}
