import { Callout, Card, Figure } from "../../components/ui/primitives";
import SunStructure from "../../components/diagrams/SunStructure";

export default function MagneticSun() {
  return (
    <>
      <p className="lead">
        To understand a flare you first have to understand that the Sun is not a calm ball of fire — it is a
        churning <strong>magnetic machine</strong>. Flares are what happen when that machine's stored magnetic
        energy is released catastrophically. This chapter builds the picture from the core outward.
      </p>

      <h3 className="prose-h3">The layered Sun</h3>
      <p>
        The Sun is a sphere of <strong>plasma</strong> — gas so hot its atoms are stripped into free electrons and
        ions. Because plasma is electrically charged, its motion creates magnetic fields, and those fields, in
        turn, channel the plasma. Explore the layers — note especially the <strong>chromosphere</strong> (where
        hard X-rays are made) and the <strong>corona</strong> (where flares ignite and soft X-rays glow).
      </p>

      <Figure
        title="Interactive cross-section — click a layer"
        caption="The two layers that matter most for us: the corona (flare energy release → soft X-rays) and the chromosphere (electron impact → hard X-rays)."
      >
        <SunStructure />
      </Figure>

      <h3 className="prose-h3">Where the magnetism comes from</h3>
      <p>
        In the <strong>convective zone</strong>, hot plasma rises, cools, and sinks in enormous cells — like a pot
        of boiling water. This constant churning of charged material, combined with the Sun's rotation (faster at
        the equator than the poles), acts as a <strong>dynamo</strong> that continuously generates and amplifies
        magnetic field. Over an ~11-year cycle this field becomes increasingly twisted and tangled.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon="🌑" title="Sunspots: the magnetic anchors" accent="#ffa726">
          Where intense magnetic field bundles punch through the photosphere, they suppress convection and create
          cooler, darker <strong>sunspots</strong>. Sunspots are the visible footprints of the strong magnetic
          fields that store flare energy.
        </Card>
        <Card icon="🔁" title="Active regions" accent="#4aa8ff">
          A complex group of sunspots and the magnetic loops arching between them form an <strong>active
          region</strong>. The more twisted and sheared the field, the more energy it stores — and the more likely
          it is to flare. Most large flares come from a small number of complex active regions.
        </Card>
      </div>

      <Callout kind="key" title="The mental model: a wound spring">
        Think of the coronal magnetic field above an active region as a spring being progressively wound up by the
        churning plasma below. Energy accumulates silently. A flare is the moment the spring slips — releasing that
        stored magnetic energy in seconds. <strong>The next chapter shows exactly how that release happens.</strong>
      </Callout>

      <h3 className="prose-h3">Why "Sun-as-a-star" is enough for us</h3>
      <p>
        SoLEXS and HEL1OS don't image the Sun — they measure its <strong>total X-ray output integrated over the
        whole disk</strong> ("Sun-as-a-star"). That sounds like a limitation, but for flare detection it's ideal:
        a flare is such a dramatic brightening that it dominates the whole-disk signal. We don't need to know{" "}
        <em>where</em> on the Sun the flare is — only <em>that</em> it is happening and <em>how fast</em> it is
        growing. A single number per second per energy band is all the physics requires.
      </p>
    </>
  );
}
