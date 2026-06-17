import { Callout, Card, Figure, Stat } from "../../components/ui/primitives";
import ImpactTimeline from "../../components/diagrams/ImpactTimeline";

export default function SpaceWeather() {
  return (
    <>
      <p className="lead">
        A solar flare is a sudden release of magnetic energy in the Sun's atmosphere — in seconds to minutes it
        can radiate as much energy as billions of megatons of TNT. That radiation, and the particles and plasma
        that can follow it, is what we call <strong>space weather</strong>. And space weather breaks the
        infrastructure modern civilisation runs on.
      </p>

      <h3 className="prose-h3">Three things arrive, at three different speeds</h3>
      <p>
        Understanding the threat means understanding its timing. A flare doesn't hit Earth as a single event —
        it arrives in three waves, and only the first one travels at the speed of light.
      </p>

      <Figure
        title="The arrival sequence — flare to impact"
        caption="Photons (incl. X-rays) reach Earth in ~8 minutes; energetic particles in tens of minutes to hours; a CME's plasma cloud in 1–3 days. Aditya-L1, sitting sunward at L1, sees the photons first."
      >
        <ImpactTimeline />
      </Figure>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card icon="⚡" title="1 · Electromagnetic radiation" accent="#ffa726">
          X-rays, EUV and radio, travelling at light speed — <strong>~8 min</strong> to Earth. This is what SoLEXS
          and HEL1OS measure, and what causes immediate radio blackouts. <em>This is the part we forecast.</em>
        </Card>
        <Card icon="☄️" title="2 · Solar energetic particles" accent="#4aa8ff">
          Protons and electrons accelerated to near-light speed — <strong>minutes to hours</strong>. A radiation
          hazard to astronauts and a cause of satellite single-event upsets.
        </Card>
        <Card icon="🌀" title="3 · Coronal mass ejection" accent="#a78bfa">
          A billion-tonne magnetised plasma cloud — <strong>1–3 days</strong>. When it hits Earth's
          magnetosphere it drives the geomagnetic storms that threaten power grids.
        </Card>
      </div>

      <h3 className="prose-h3">What actually breaks</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="📡" title="Satellite communications & the ionosphere">
          The X-ray/EUV burst ionises Earth's upper atmosphere within minutes, raising the ionosphere's density on
          the dayside. This causes <strong>Sudden Ionospheric Disturbances (SIDs)</strong> and shortwave radio
          blackouts (NOAA's R1–R5 scale) — and degrades the satellite links ISRO itself operates.
        </Card>
        <Card icon="🛰️" title="GPS & NavIC navigation">
          Positioning depends on radio signals passing cleanly through the ionosphere. A flare's sudden
          ionisation change corrupts the timing, throwing off navigation for aviation, shipping, defence and
          everyday devices that assume metre-level accuracy.
        </Card>
        <Card icon="⚡" title="Power grids">
          The geomagnetic storm following a large CME induces <strong>geomagnetically induced currents</strong> in
          long transmission lines. In 1989 this collapsed the entire Hydro-Québec grid in 90 seconds, leaving
          six million people without power.
        </Card>
        <Card icon="👩‍🚀" title="Astronauts & spacecraft">
          Hard X-rays and energetic particles are a radiation dose hazard to crewed missions — directly relevant
          to <strong>Gaganyaan</strong> — and can flip bits or permanently damage spacecraft electronics.
        </Card>
      </div>

      <Callout kind="deep" title="The benchmark event: the Carrington flare (1859)">
        The largest recorded geomagnetic storm, triggered by a white-light flare observed by Richard Carrington,
        induced currents strong enough to set telegraph offices on fire and made aurorae visible near the equator.
        A Carrington-class event today would cause trillions of dollars of damage to a far more electrified,
        satellite-dependent world. The 2012 "near-miss" CME — which crossed Earth's orbit just behind us — shows
        these are not historical curiosities. <strong>This is why every spacefaring nation is investing in
        flare prediction.</strong>
      </Callout>

      <h3 className="prose-h3">Why prediction is the whole point</h3>
      <p>
        Almost everything vulnerable here can be protected <em>if you have warning</em>: satellites can be put into
        safe mode, sensitive operations can be paused, grid operators can reduce loading. The defence against space
        weather is not armour — it is <strong>time</strong>.
      </p>
      <p>
        That is exactly what ISRO's Problem Statement 15 asks us to manufacture. Read the evaluation criteria
        literally: detect low- and high-class flares, keep a high true-positive rate with a low false-alarm rate,
        and — the headline metric — maximise the <strong>lead time</strong> before the flare peak. Every chapter
        that follows is in service of that one number.
      </p>

      <div className="my-6 flex flex-wrap gap-3">
        <Stat value="~8 min" label="X-rays: Sun → Earth" color="#ffa726" />
        <Stat value="90 s" label="Québec grid collapse, 1989" color="#f0506e" />
        <Stat value="1–3 d" label="CME transit time" color="#a78bfa" />
        <Stat value="L1" label="where Aditya-L1 watches" color="#4aa8ff" />
      </div>

      <Callout kind="key" title="Carry this forward">
        Space weather arrives in waves; the light-speed X-ray wave is both the earliest warning and the first
        thing to cause damage. Aditya-L1 measures that wave from L1. If we can read its onset and anticipate its
        peak, we convert raw photons into actionable warning time — the entire value of this system.
      </Callout>
    </>
  );
}
