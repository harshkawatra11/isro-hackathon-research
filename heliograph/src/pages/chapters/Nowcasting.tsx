import { Callout, Figure } from "../../components/ui/primitives";
import NowcastDemo from "../../components/diagrams/NowcastDemo";

export default function Nowcasting() {
  return (
    <>
      <p className="lead">
        Nowcasting means detecting a flare <em>as it happens</em> and logging it to an automated catalogue —
        ISRO's first deliverable. The temptation is to reach for machine learning. We argue, and demonstrate, that
        for this job a <strong>classical detector is the correct choice</strong> — not a fallback.
      </p>

      <h3 className="prose-h3">The algorithm</h3>
      <p>
        A flare is a sharp rise above the slowly-varying quiet Sun. So the detector has three parts, applied
        independently to the soft and hard channels:
      </p>
      <ol className="ml-5 list-decimal text-ink/90">
        <li><strong>Adaptive baseline.</strong> Estimate the quiet level with a rolling median over a long window. The median ignores the flare spikes themselves and tracks slow drift as active regions rotate across the disk.</li>
        <li><strong>Rise-rate threshold.</strong> Flag seconds where the signal exceeds the baseline by an adaptive factor (and a small absolute floor, so noise near zero doesn't trigger).</li>
        <li><strong>Persistence / hysteresis.</strong> Require the condition to hold for several seconds to start an event, and to clearly drop before ending it — this kills single-sample glitches and prevents an event from flickering on and off.</li>
      </ol>
      <p>
        Run on both channels, then <strong>merge</strong>: a real flare appears in soft (and usually hard, earlier).
        Combining the two independent detections into one master catalogue is both more complete and more robust to
        a single instrument glitching.
      </p>

      <Figure
        title="The nowcaster on real SoLEXS data — tune it yourself"
        caption="Blue is the real signal, green is the adaptive baseline, red dashes are the detection threshold, and red dots are detected flare seconds. Lower the sensitivity to catch faint events (and watch false detections creep in); shorten the baseline window and watch it chase the flare it should be ignoring."
      >
        <NowcastDemo />
      </Figure>

      <Callout kind="key" title="Why classical beats ML here — the rigorous argument">
        Detection of an ongoing flare is a <em>solved</em> signal-processing problem with a strong physical prior:
        a flare is, by definition, a sharp brightening. A classical detector is:
        <ul className="mt-2 ml-5 list-disc">
          <li><strong>Interpretable</strong> — every detection has a reason a scientist can audit (it exceeded baseline × k for n seconds).</li>
          <li><strong>Training-free</strong> — it generalises to any future data, including flare regimes never seen before.</li>
          <li><strong>Dynamic-range robust</strong> — an <em>adaptive</em> baseline handles faint A/B/C and giant M/X flares alike, satisfying the "low- and high-class" criterion.</li>
        </ul>
        A learned classifier would be strictly worse: it needs labelled data, it can silently miss the rare strong
        events that matter most, and it replaces an auditable rule with a black box — for no accuracy gain on a
        problem the physics already pins down. Operational flare catalogues (including GOES's own event lists) are
        built exactly this way. <strong>Choosing the simpler tool here is the rigorous decision, not the lazy one.</strong>
      </Callout>

      <h3 className="prose-h3">Classifying and scoring each event</h3>
      <p>
        For each detected event the catalogue records onset/peak/end times, the <strong>relative magnitude</strong>{" "}
        (mapped toward an A→X estimate, with the counts-vs-flux caveat from Chapter 6), and a{" "}
        <strong>signal-to-noise / significance</strong> from how far the peak rose above the baseline noise. That
        significance is what lets a downstream user trust or filter the catalogue — and it directly answers ISRO's
        request to "provide significance levels of the identified events."
      </p>

      <Callout kind="good" title="Deliverable #1, done — and it never needed a GPU">
        The output of this chapter is the automated nowcast master catalogue ISRO asked for, built from
        transparent, defensible signal processing that runs in milliseconds on any laptop. The machine learning is
        reserved for the genuinely hard problem — seeing the flare <em>before</em> it rises — which is next.
      </Callout>
    </>
  );
}
