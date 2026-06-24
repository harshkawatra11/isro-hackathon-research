import { Callout, Figure } from "../../components/ui/primitives";
import DashboardWireframe from "../../components/diagrams/DashboardWireframe";

export default function Dashboard() {
  return (
    <>
      <p className="lead">
        A forecast nobody can see is useless. ISRO's third deliverable is an interface that visualises the X-ray
        light curves and raises a visual alert when a flare is nowcast or forecast. This chapter designs that
        operator-facing dashboard, explaining why <strong>Streamlit</strong> is the right tool for it.
      </p>

      <Figure
        title="The operator dashboard: wireframe"
        caption="A single glanceable screen: the alert banner spans the top; the dual light curve and the hard/soft ratio (the precursor) sit centre; a calibrated probability gauge shows the live forecast; a replayable timeline and the event catalogue sit below."
      >
        <DashboardWireframe />
      </Figure>

      <h3 className="prose-h3">The alert logic: three states</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-xl border border-isro/60 bg-isro/10 px-4 py-3 font-semibold text-isro">
          <span className="h-3 w-3 rounded-full bg-isro" /> QUIET: no flare activity
        </div>
        <div className="flex items-center gap-2 rounded-xl border-[#fbbf24]/60 border bg-[#fbbf24]/10 px-4 py-3 font-semibold text-[#fbbf24]">
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" /> WATCH: precursor rising
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#f0506e]/60 bg-[#f0506e]/10 px-4 py-3 font-semibold text-[#f0506e]">
          <span className="h-3 w-3 rounded-full bg-[#f0506e]" /> ALERT: flare forecast, lead time shown
        </div>
      </div>
      <p className="mt-3">
        The states map to the forecast probability and the nowcast detector: <strong>WATCH</strong> when the
        hard/soft ratio and forecast probability begin climbing; <strong>ALERT</strong> when the forecast crosses
        the TSS-optimised threshold <em>or</em> the nowcaster confirms onset. The alert always carries its{" "}
        <strong>lead time</strong> and <strong>confidence</strong>, never a bare red light.
      </p>

      <h3 className="prose-h3">Why Streamlit</h3>
      <ul className="ml-5 list-disc text-ink/90">
        <li><strong>Python-native</strong>: it shares the exact data structures and model objects the pipeline already produces; no serialisation layer, no second language.</li>
        <li><strong>Built for this</strong>: live charts, gauges, sliders and a replay control are a few lines each; evaluators expect a Streamlit demo for a data-science deliverable.</li>
        <li><strong>₹0 and local</strong>: runs on the same laptop, and deploys free to Hugging Face Spaces if a public demo is wanted.</li>
      </ul>
      <Callout kind="deep" title="A considered trade-off, not a default">
        Harsh is a strong React/Next.js engineer, so a bespoke FastAPI + React dashboard was genuinely on the table
        and would look more polished. We chose Streamlit deliberately: in a hackathon, the marginal hours are far
        better spent on detection accuracy and lead time (what's <em>scored</em>) than on front-end shine. The
        "replay" feature reuses the batch pipeline path, so the demo is driven by the real system, not a mock.
      </Callout>

      <Callout kind="good" title="All three deliverables now have a home">
        Catalogue (Ch.13), calibrated forecast (Ch.14), and this alert interface complete ISRO's required outputs.
        The final engineering chapter lays out the order in which to actually build them, with AI-assisted
        implementation accelerating the build.
      </Callout>
    </>
  );
}
