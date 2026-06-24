import { Callout, Stat } from "../../components/ui/primitives";

const COST = [
  ["Aditya-L1 SoLEXS + HEL1OS data", "₹0", "free via ISSDC PRADAN (registered)"],
  ["GOES flare catalog (labels)", "₹0", "free, NOAA"],
  ["Software stack", "₹0", "all open-source (BSD/MIT/Apache)"],
  ["Compute", "₹0", "existing laptop (i5-13420H / RTX 3050 / 16 GB)"],
  ["Storage", "₹0", "existing 256 GB external drive (~5 GB used)"],
  ["Hosting (demo)", "₹0", "Streamlit local; optional free HF Spaces"],
];

function Field({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <label className="mb-2 flex items-center gap-3">
      <span className="w-36 shrink-0 text-sm text-muted">{label}</span>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-line bg-bg2 px-3 py-2 text-[15px] text-ink outline-none focus:border-accent"
      />
    </label>
  );
}

export default function CostTeam() {
  return (
    <>
      <p className="lead">
        The last two template slides: the estimated implementation cost, and the team cover. The cost story is
        simple, because there isn't one.
      </p>

      <h3 className="prose-h3">Estimated implementation cost</h3>
      <div className="overflow-x-auto">
        <table className="my-3 w-full text-[13.5px]">
          <thead><tr className="text-left text-muted">
            <th className="border border-line px-3 py-1.5">Item</th>
            <th className="border border-line px-3 py-1.5">Cost</th>
            <th className="border border-line px-3 py-1.5">Note</th>
          </tr></thead>
          <tbody>
            {COST.map((r) => (
              <tr key={r[0]}>
                <td className="border border-line px-3 py-1.5">{r[0]}</td>
                <td className="border border-line px-3 py-1.5 font-mono text-isro">{r[1]}</td>
                <td className="border border-line px-3 py-1.5">{r[2]}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-line px-3 py-1.5 font-bold">Total</td>
              <td className="border border-line px-3 py-1.5 font-mono font-bold text-isro">₹0</td>
              <td className="border border-line px-3 py-1.5">only real input is engineering time</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-5 flex flex-wrap gap-3">
        <Stat value="₹0" label="capital cost" color="#34d399" />
        <Stat value="~5 GB" label="targeted data" color="#4aa8ff" />
        <Stat value="~2 wk" label="AI-assisted build" color="#ffa726" />
        <Stat value="CPU" label="first; GPU optional" color="#a78bfa" />
      </div>

      <h3 className="prose-h3">Team &amp; cover (editable)</h3>
      <div className="rounded-2xl border border-line bg-panel p-5">
        <Field label="Team Name" defaultValue="SURYASETU" />
        <Field label="Problem Statement" defaultValue="PS-15 · Forecasting / Nowcasting of Solar Flares (Aditya-L1)" />
        <Field label="Team Leader" defaultValue="Harsh Kawatra" />
        <Field label="Leader College" defaultValue="Delhi Technological University (DTU)" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-bg2 p-3">
              <div className="mb-2 text-sm font-bold text-accent2">Member {i}</div>
              <Field label="Name" placeholder="Name" />
              <Field label="College" placeholder="College" />
            </div>
          ))}
        </div>
      </div>

      <Callout kind="good" title="The guide is complete">
        You've gone from "what is a solar flare?" to a fully-specified, ISRO-aligned, ₹0 system with every diagram on
        screen and a nine-phase build plan. Every template section is covered, every deliverable has a home, and
        every design choice has a defence. Execute the roadmap with AI-assisted implementation and start building. Use{" "}
        <span className="kbd">Ctrl/Cmd + P</span> to export the submission sections to the BAH-2026 deck.
      </Callout>

      <p className="mt-6 border-t border-line pt-5 text-[13px] text-muted">
        SURYASETU · Built for Bharatiya Antariksh Hackathon 2026 · Problem Statement 15. Real SoLEXS sample:
        2026-06-15 SDD2, parsed from the downloaded day-file. Instrument figures verified against the published
        SoLEXS and HEL1OS papers (<em>Solar Physics</em>, 2025) and the Neupert-effect literature. The animated
        Neupert and reconnection figures are physically-faithful schematics, labelled as such.
      </p>
    </>
  );
}
