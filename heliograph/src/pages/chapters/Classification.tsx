import { Callout, Figure } from "../../components/ui/primitives";
import FlareLadder from "../../components/diagrams/FlareLadder";

export default function Classification() {
  return (
    <>
      <p className="lead">
        Flares are graded by their <strong>peak soft-X-ray brightness</strong> on a scale that every solar
        physicist — and every ISRO evaluator — knows by heart: the <strong>A, B, C, M, X</strong> classes. It is a
        logarithmic ladder, and that logarithm is the source of one of this problem's hardest requirements.
      </p>

      <h3 className="prose-h3">The GOES scale</h3>
      <p>
        The standard comes from NOAA's GOES satellites, which measure the Sun's X-ray flux in the 1–8 Å band
        (roughly 1.5–12 keV). The class is set by the peak flux in W/m², with each letter a factor of ten above the
        last, and a number 1–9 giving the multiplier within the class. An <strong>M5</strong> flare is 5 × 10⁻⁵
        W/m²; an <strong>X2</strong> is 2 × 10⁻⁴.
      </p>

      <Figure
        title="The logarithmic flare ladder — drag to classify"
        caption="Each step up the ladder is ×10 in energy. The span from a background A-class to a great X-class flare covers four orders of magnitude — a 10,000× dynamic range."
      >
        <FlareLadder />
      </Figure>

      <Callout kind="warn" title="The dynamic-range requirement, stated plainly">
        ISRO's evaluation explicitly demands <strong>"detection of low- and high-class flares."</strong> That single
        phrase means our system must reliably catch a faint C-class brightening that is barely above the noise{" "}
        <em>and</em> a giant X-class flare that saturates a sensitive detector — a 10,000× range. This is precisely
        why SoLEXS carries <strong>two</strong> detectors (a small one for bright flares, a large one for faint
        ones, Chapter 8) and why our nowcaster uses an <strong>adaptive</strong> baseline rather than a fixed
        threshold (Chapter 13). The classification scale is not trivia — it is a design constraint.
      </Callout>

      <h3 className="prose-h3">Counts, flux, and an honest caveat</h3>
      <p>
        Here is a subtlety we will be careful about throughout the build. SoLEXS reports <strong>counts per
        second</strong>, not the GOES <strong>W/m²</strong> flux that defines the class. The two are related but not
        identical — converting requires the instrument's spectral response. So our pipeline will classify the{" "}
        <em>relative</em> magnitude of each detected flare from SoLEXS counts, and use the <strong>GOES catalog as
        the ground-truth class label</strong> for training and evaluation (Chapter 10). We will state this
        assumption openly in the report rather than silently pretend counts are flux — that honesty is itself part
        of the rigour ISRO scores.
      </p>

      <Callout kind="good" title="Part I complete — you now think like the instrument">
        You understand why flares happen (reconnection), why they emit two kinds of X-rays (thermal vs non-thermal
        bremsstrahlung), why hard leads soft (Neupert), and how flares are sized (A→X). That is the entire physical
        foundation. Part II introduces the spacecraft that measures all of this — Aditya-L1 — and the real data it
        produces.
      </Callout>
    </>
  );
}
