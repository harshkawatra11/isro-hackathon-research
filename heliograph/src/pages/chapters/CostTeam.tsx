import { Callout, Stat } from "../../components/ui/primitives";

const COST = [
  ["Aditya-L1 SoLEXS + HEL1OS data", "₹0", "free via ISSDC PRADAN (registered)"],
  ["GOES flare catalog (labels)", "₹0", "free, NOAA"],
  ["Software stack", "₹0", "all open-source (BSD/MIT/Apache)"],
  ["Compute", "₹0", "existing laptop (i5-13420H / RTX 3050 / 16 GB)"],
  ["Storage", "₹0", "existing 256 GB external drive (~5 GB used)"],
  ["Hosting (demo)", "₹0", "Streamlit local; optional free HF Spaces"],
];

const TEAM = [
  { role: "Team Leader", name: "Harsh Kawatra", college: "Delhi Technological University (DTU)", degree: "B.Tech in Electronics & Communication Engineering (ECE)" },
  { role: "Team Member-1", name: "Gursimran Kaur", college: "Guru Gobind Singh Indraprastha University (GGSIPU)", degree: "BCA (Bachelor of Computer Applications)" },
  { role: "Team Member-2", name: "Anuj Gambhir", college: "Delhi Technological University (DTU)", degree: "B.Tech in Biotechnology (BT)" },
  { role: "Team Member-3", name: "Dayita Arora", college: "Ramjas College (DU)", degree: "B.Sc in Statistics" },
];

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

      <h3 className="prose-h3">Team &amp; cover</h3>
      <div className="rounded-2xl border border-line bg-panel p-5">
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          <div className="flex gap-2">
            <span className="w-40 shrink-0 text-sm text-muted">Team Name</span>
            <span className="text-[15px] font-semibold text-ink">SURYASETU</span>
          </div>
          <div className="flex gap-2">
            <span className="w-40 shrink-0 text-sm text-muted">Problem Statement</span>
            <span className="text-[15px] font-semibold text-ink">PS-15 · Forecasting / Nowcasting of Solar Flares (Aditya-L1)</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-xl border border-line bg-bg2 p-3">
              <div className="mb-2 text-sm font-bold text-accent2">{m.role}</div>
              <div className="text-[15px] font-semibold text-ink">{m.name}</div>
              <div className="mt-1 text-[13px] text-muted">{m.college}</div>
              <div className="text-[13px] text-muted">{m.degree}</div>
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
