import { Callout, Figure, Stat } from "../../components/ui/primitives";
import RealLightCurve from "../../components/diagrams/RealLightCurve";

export default function TheData() {
  return (
    <>
      <p className="lead">
        Enough theory; here is the actual data. This chapter opens the real SoLEXS Level-1 day-file we downloaded
        from ISRO's PRADAN portal, explains its format byte by byte, and confronts the practical problems of working
        with 70 GB of it. Everything below is from the genuine file, not a mock-up.
      </p>

      <h3 className="prose-h3">FITS, in thirty seconds</h3>
      <p>
        Space-science data ships in <strong>FITS</strong> (Flexible Image Transport System): a self-describing
        format of 80-character header "cards" in 2,880-byte blocks, followed by binary data. A light curve lives in
        a <strong>binary table extension</strong> with named columns. You read it in Python with{" "}
        <code className="code-inline">astropy.io.fits</code>, or, as we did to embed the curve below, by parsing
        the blocks directly when a library wouldn't install.
      </p>

      <h3 className="prose-h3">The real file, decoded</h3>
      <p>
        From <code className="code-inline">AL1_SOLEXS_20260615_SDD2_L1.lc.gz</code> we read the FITS header and the
        binary table directly:
      </p>
      <div className="overflow-x-auto">
        <table className="my-4 w-full text-[13.5px]">
          <thead>
            <tr className="text-left text-muted">
              <th className="border border-line px-3 py-1.5">Field</th>
              <th className="border border-line px-3 py-1.5">Value</th>
              <th className="border border-line px-3 py-1.5">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-line px-3 py-1.5"><code className="code-inline">EXTNAME</code></td><td className="border border-line px-3 py-1.5">RATE (OGIP LIGHTCURVE)</td><td className="border border-line px-3 py-1.5">a standard light-curve table</td></tr>
            <tr><td className="border border-line px-3 py-1.5">Columns</td><td className="border border-line px-3 py-1.5"><code className="code-inline">TIME</code>, <code className="code-inline">COUNTS</code></td><td className="border border-line px-3 py-1.5">timestamp + counts/second</td></tr>
            <tr><td className="border border-line px-3 py-1.5"><code className="code-inline">TIMEDEL</code></td><td className="border border-line px-3 py-1.5">1</td><td className="border border-line px-3 py-1.5">1-second cadence</td></tr>
            <tr><td className="border border-line px-3 py-1.5"><code className="code-inline">NAXIS2</code></td><td className="border border-line px-3 py-1.5">86,400</td><td className="border border-line px-3 py-1.5">exactly one 24-hour day</td></tr>
            <tr><td className="border border-line px-3 py-1.5">TIME epoch</td><td className="border border-line px-3 py-1.5">Unix sec (MJDREF 40587)</td><td className="border border-line px-3 py-1.5">trivial to convert to UTC</td></tr>
          </tbody>
        </table>
      </div>

      <Figure
        title="The real SoLEXS light curve, 2026-06-15, detector SDD2 (hover it)"
        caption="86,400 one-second samples, decimated to fit the browser. The quiet Sun sits near 7 counts/s (green baseline). A genuine enhancement reaches 95 counts/s, 13.6× the quiet level, around 13:15 UTC. This is exactly the kind of rise the nowcaster must catch."
      >
        <RealLightCurve />
      </Figure>

      <div className="my-5 flex flex-wrap gap-3">
        <Stat value="86,400" label="samples / day (1 Hz)" color="#4aa8ff" />
        <Stat value="7 /s" label="quiet-Sun median" color="#34d399" />
        <Stat value="95 /s" label="flare peak (13.6×)" color="#f0506e" />
        <Stat value="2" label="NaN gaps (very clean)" color="#ffa726" />
      </div>

      <h3 className="prose-h3">The companion files</h3>
      <ul className="ml-5 list-disc text-ink/90">
        <li><code className="code-inline">.lc</code>: the light curve (what we model).</li>
        <li><code className="code-inline">.gti</code>: <strong>Good-Time-Intervals</strong>: the windows where data is valid. Always apply this to mask gaps and bad periods <em>before</em> analysis. Our file had only 2 invalid seconds, clean, but never assume.</li>
        <li><code className="code-inline">.pi</code>: the energy spectrum (not needed for the light-curve task).</li>
      </ul>
      <p>
        HEL1OS ships separately (<code className="code-inline">HLS_YYYYMMDD_..._lev1.zip</code>, ~12-hour light
        curves). The pipeline merges SoLEXS (soft) and HEL1OS (hard) onto a common 1-second grid, the fused signal
        the whole system runs on.
      </p>

      <Callout kind="warn" title="The environment trap we already hit: fix it first">
        The build machine has <strong>Python 3.14</strong>, on which <code className="code-inline">astropy</code> has
        no prebuilt wheel and fails to compile (it needs a C++ build toolchain). Instead create a{" "}
        <strong>Python 3.11 environment</strong> where every dependency has a wheel:
        <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-bg2 p-3 text-[12.5px] text-ink/90"><code>{`uv venv --python 3.11 .venv
.venv\\Scripts\\activate
uv pip install astropy numpy pandas scipy lightgbm \\
    scikit-learn matplotlib streamlit sktime`}</code></pre>
      </Callout>

      <Callout kind="key" title="The 70 GB problem: the smarter answer">
        The full archive is ~70 GB, about 1,500 day-files. Don't brute-force it. Use the GOES flare catalog
        (next chapter) to download <strong>only</strong> flare windows, their pre-flare windows, and sampled quiet
        windows: roughly <strong>4–6 GB</strong> onto the 256 GB external drive. Targeted selection is faster{" "}
        <em>and</em> a stronger methodology story for the report.
      </Callout>
    </>
  );
}
