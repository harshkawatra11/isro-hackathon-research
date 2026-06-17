import { Callout, Card } from "../../components/ui/primitives";

export default function Opportunity() {
  return (
    <>
      <p className="lead">
        Part IV packages everything into the exact sections ISRO's <code className="code-inline">template.pdf</code>{" "}
        requires. This chapter covers the template's "Opportunity" slide: how the solution differs from existing
        ideas, how it solves the problem, and its unique selling proposition.
      </p>

      <h3 className="prose-h3">How is it different from existing ideas?</h3>
      <p>
        Most operational flare tools share two limitations: they rely on a <strong>single channel</strong> (usually
        soft X-rays) and on <strong>Earth-orbit</strong> data, and most "predictions" are really detections.
        HELIOGRAPH differs on three concrete axes:
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card icon="🔗" title="Dual-payload fusion" accent="#4aa8ff">
          It combines SoLEXS soft + HEL1OS hard X-rays from the L1 vantage, exploiting <em>both</em> halves of the
          flare's emission rather than one.
        </Card>
        <Card icon="⏱️" title="Physics-grounded lead time" accent="#ffa726">
          It forecasts the damaging soft-X-ray peak using the <strong>Neupert effect</strong> — a real physical
          mechanism — not an opaque curve fit.
        </Card>
        <Card icon="📏" title="Honest, standard evaluation" accent="#34d399">
          It is <strong>TSS-driven</strong>, calibrated, and time-blocked — the metrics the space-weather community
          actually trusts, reported without inflation.
        </Card>
      </div>

      <h3 className="prose-h3">How will it solve the problem?</h3>
      <p>
        Nowcasting delivers operators an instant, automated flare catalogue. Forecasting delivers the one thing they
        cannot otherwise buy: <strong>minutes of warning before the peak</strong> — enough to safe-mode satellites,
        pause GPS-critical operations, and reduce grid loading. Because the whole system runs offline on commodity
        hardware from free public data, it is deployable anywhere ISRO needs it, with no recurring cost.
      </p>

      <Callout kind="key" title="USP — in one sentence">
        <strong>The only dual-payload, L1-vantage flare system that turns the Neupert effect into calibrated,
        TSS-validated lead-time warnings — fully reproducible at ₹0 on a laptop.</strong>
      </Callout>

      <h3 className="prose-h3">Why it will land with these judges</h3>
      <p>
        The evaluators are ISRO scientists, and the data is from ISRO's own mission. A submission that uses{" "}
        <em>their</em> satellite's two payloads correctly, respects the real physics of the Sun, and is honest about
        the difference between defensible peak-forecasting and frontier onset-forecasting (Chapter 5) signals
        genuine domain understanding — not a generic ML pipeline pointed at unfamiliar data. That credibility, plus
        a quantifiable lead-time number, is the winning combination.
      </p>
    </>
  );
}
