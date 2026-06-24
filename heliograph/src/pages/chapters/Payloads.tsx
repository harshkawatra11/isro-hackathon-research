import { Callout, Card, Figure } from "../../components/ui/primitives";
import { scaleLog } from "d3-scale";

function BandDiagram() {
  const W = 620, H = 130, padL = 40, padR = 20;
  const x = scaleLog().domain([1, 200]).range([padL, W - padR]);
  const ticks = [1, 2, 8, 22, 70, 150];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={20} x2={x(t)} y2={H - 26} stroke="#1c2740" />
          <text x={x(t)} y={H - 12} textAnchor="middle" fontSize="10" fill="#5c6884">{t}</text>
        </g>
      ))}
      <text x={W / 2} y={H} textAnchor="middle" fontSize="10.5" fill="#93a0b8">photon energy (keV)</text>
      {/* SoLEXS */}
      <rect x={x(2)} y={34} width={x(22) - x(2)} height={26} rx={6} fill="#4aa8ff" opacity={0.85} />
      <text x={(x(2) + x(22)) / 2} y={51} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#06203f">SoLEXS · soft</text>
      {/* HEL1OS */}
      <rect x={x(8)} y={66} width={x(150) - x(8)} height={26} rx={6} fill="#ff6b1a" opacity={0.85} />
      <text x={(x(8) + x(150)) / 2} y={83} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#2a1402">HEL1OS · hard</text>
      {/* overlap */}
      <rect x={x(8)} y={34} width={x(22) - x(8)} height={58} fill="#a78bfa" opacity={0.18} />
      <text x={(x(8) + x(22)) / 2} y={28} textAnchor="middle" fontSize="9.5" fill="#c5b6f7">overlap 8–22 keV</text>
    </svg>
  );
}

export default function Payloads() {
  return (
    <>
      <p className="lead">
        Two instruments, one job split in half. SoLEXS owns the soft band, HEL1OS the hard band, and together they
        cover roughly <strong>2 to 150 keV</strong>, exactly the range where a flare's thermal and non-thermal
        emission live. This chapter is the hardware you're actually modelling.
      </p>

      <Figure
        title="Energy coverage of the two payloads"
        caption="SoLEXS (soft, 2–22 keV) and HEL1OS (hard, 8–150 keV) overlap around 8–22 keV, a region useful for cross-checking the two instruments."
      >
        <BandDiagram />
      </Figure>

      <h3 className="prose-h3">SoLEXS: the soft channel</h3>
      <p>
        <strong>SoLEXS</strong> (Solar Low Energy X-ray Spectrometer), built by the U R Rao Satellite Centre, is a
        Sun-as-a-star soft X-ray spectrometer covering <strong>2–22 keV</strong> at <strong>1-second cadence</strong>.
        Its detectors are <strong>Silicon Drift Detectors (SDDs)</strong>, compact solid-state devices that produce
        a charge pulse proportional to each X-ray photon's energy, giving both a count rate (the light curve) and a
        spectrum.
      </p>
      <Callout kind="key" title="The two-detector trick: how one instrument spans 10,000×">
        SoLEXS carries <strong>two SDDs of different sizes</strong>. A flare's brightness varies by four orders of
        magnitude (A→X, Chapter 6), and no single detector handles that range without either missing faint flares
        or saturating on bright ones. So:
        <ul className="mt-2 ml-5 list-disc">
          <li><strong>The large-area SDD</strong> collects many photons → sensitive to the faint <strong>quiet Sun and small flares</strong>.</li>
          <li><strong>The small-area SDD</strong> collects fewer photons → stays unsaturated during <strong>large M/X flares</strong> that would overwhelm the large one (avoiding "pile-up").</li>
        </ul>
        Fusing the two detectors is how we satisfy ISRO's "detect low- <em>and</em> high-class flares" requirement
        at the instrument level, long before any ML.
      </Callout>

      <h3 className="prose-h3">HEL1OS: the hard channel</h3>
      <p>
        <strong>HEL1OS</strong> (High Energy L1 Orbiting X-ray Spectrometer), also from URSC, covers the{" "}
        <strong>hard band 8–150 keV</strong> with fast timing. It uses semiconductor detectors,{" "}
        <strong>CdTe</strong> (cadmium telluride) for the lower hard range and <strong>CZT</strong> (cadmium-zinc-
        telluride) for higher energies, chosen because high-Z materials stop penetrating hard X-rays efficiently. A
        collimator restricts its field of view to the Sun. HEL1OS is built to catch the brief, impulsive
        non-thermal bursts: the <em>early</em> half of the Neupert relationship.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🔵" title="SoLEXS" accent="#4aa8ff">
          Soft · 2–22 keV · 1 s cadence · 2× Silicon Drift Detectors · measures accumulated thermal heat → the
          flare's "how big" signal.
        </Card>
        <Card icon="🟠" title="HEL1OS" accent="#ff6b1a">
          Hard · 8–150 keV · fast timing · CdTe + CZT detectors · measures non-thermal electron impacts → the
          flare's "starting now, fast" signal.
        </Card>
      </div>

      <Callout kind="deep" title="What 'Level-1' means for these instruments">
        Both deliver data at processing levels. <strong>Level-0</strong> is raw telemetry. <strong>Level-1</strong>{" "}
        is what we download: calibrated, time-tagged, and in physical units (counts/s vs time, plus spectra),
        with Good-Time-Intervals marking valid data. <strong>Level-2</strong> would be higher science products
        (e.g. fluxes, temperatures). Level-1 light curves are the right altitude for flare detection: clean,
        time-aligned, and unopinionated. The next chapter opens a real Level-1 file byte by byte.
      </Callout>
    </>
  );
}
