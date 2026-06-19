import { Callout, Equation, Figure } from "../../components/ui/primitives";
import NeupertAnimator from "../../components/diagrams/NeupertAnimator";

export default function Neupert() {
  return (
    <>
      <p className="lead">
        Everything so far has been preparation for this single relationship. The <strong>Neupert effect</strong> is
        the empirical, physically-grounded link between the hard and soft X-ray light curves — and it is the reason
        a forecast with real lead time is possible at all. If you remember one chapter, make it this one.
      </p>

      <h3 className="prose-h3">The phases of a flare light curve</h3>
      <p>A flare's brightness over time has a characteristic shape, in three phases:</p>
      <ul className="ml-5 list-disc text-ink/90">
        <li><strong>Precursor phase</strong> — small, gradual soft-X-ray brightenings before the main event; sometimes present, often subtle. This is where long-horizon forecasting hunts.</li>
        <li><strong>Impulsive phase</strong> — the hard X-rays spike as electrons are accelerated and hit the footpoints. Short and violent.</li>
        <li><strong>Gradual (decay) phase</strong> — the soft X-rays rise to their peak and then slowly decay as the loop cools. The soft peak <em>lags</em> the hard peak.</li>
      </ul>

      <h3 className="prose-h3">The relationship</h3>
      <p>
        In 1968 Werner Neupert noticed that the soft-X-ray light curve looks like the running <strong>integral</strong>{" "}
        of the impulsive emission — equivalently, the hard-X-ray light curve looks like the <strong>time
        derivative</strong> of the soft. Roughly:
      </p>
      <Equation>HXR(t) &nbsp;≈&nbsp; d/dt&nbsp;SXR(t) &nbsp;&nbsp;⟺&nbsp;&nbsp; SXR(t) &nbsp;≈&nbsp; ∫ HXR&nbsp;dt</Equation>
      <p>
        Physically this is exactly what Chapter 3 set up: the hard X-rays measure the <em>instantaneous</em> rate of
        energy deposition by the electron beams; the soft X-rays measure the <em>accumulated</em> heat that
        deposition produces. The accumulated quantity is the integral of the rate. Studies find roughly{" "}
        <strong>80% of large flares</strong> obey this well.
      </p>

      <Figure
        title="The Neupert effect — play it, then scrub it"
        caption="The hard channel (orange) tracks the rate of rise of the soft channel (blue); the dashed purple line is the literal derivative of soft, and it sits right under the hard curve. Crucially, the hard peak arrives well before the soft peak — that gap (shaded) is lead time."
      >
        <NeupertAnimator />
      </Figure>

      <Callout kind="key" title="Why this is forecast lead time, not hindsight">
        The most damaging part of a flare — the peak ionising soft-X-ray flux — arrives at the <strong>soft
        peak</strong>. But the hard channel already spiked minutes earlier, at the impulsive phase. So the moment we
        detect a strong hard-X-ray impulse, the physics tells us a soft-X-ray peak is <em>coming</em> and roughly
        when. We are not detecting the damage; we are reading its cause and anticipating its effect.
      </Callout>

      <h3 className="prose-h3">Two horizons — and intellectual honesty about both</h3>
      <p>
        ISRO asks for both "nowcasting" and "forecasting." It's essential to be precise about what lead time each
        physically supports, and to never over-claim:
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-panel p-4" style={{ borderLeft: "4px solid #34d399" }}>
          <h4 className="font-bold text-isro">Peak forecasting — strong &amp; defensible</h4>
          <p className="mt-1 text-[14px] text-muted">
            Once the impulsive hard-X-ray burst begins, the Neupert effect gives a real, physics-backed estimate of
            the upcoming soft-X-ray peak — minutes of genuine warning on the most damaging moment. This is our
            primary, high-confidence claim.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-panel p-4" style={{ borderLeft: "4px solid #fbbf24" }}>
          <h4 className="font-bold text-[#fbbf24]">Onset forecasting — the research frontier</h4>
          <p className="mt-1 text-[14px] text-muted">
            Predicting a flare <em>before any rise at all</em> relies on subtle precursors — micro-brightenings,
            slow pre-heating, hard/soft texture. We pursue it with the ML model, but report it with calibrated
            uncertainty. We claim only the lead time the data actually earns.
          </p>
        </div>
      </div>

      <Callout kind="warn" title="Reconciling with ISRO's 15-30 min forecast target">
        The PS-15 briefing frames the forecasting goal as roughly <strong>15-30 minutes</strong> of lead time.
        We are deliberate about what each signal earns: <strong>X-ray Neupert physics caps reliable lead time at
        about 5-15 minutes</strong> — that is the genuine head start between the hard-X-ray impulse and the
        damaging soft-X-ray peak, and it is the number we report rather than inflate. Pushing the horizon out
        toward 15-30 minutes means forecasting <em>before</em> the X-ray rise at all, which physically requires
        <strong> magnetic-field / magnetogram precursors</strong> (active-region complexity, flux emergence) — a
        path the briefing explicitly permits. We carry it as a <strong>roadmap extension</strong>: the X-ray
        system ships the honest 5-15 min warning today, and the magnetogram channel is the principled way to
        reach the longer horizon without over-claiming.
      </Callout>

      <Callout kind="deep" title="From physics to features">
        The Neupert effect tells us precisely which quantities our forecasting model should compute: not just the
        raw soft and hard counts, but the <strong>hard/soft ratio</strong>, the <strong>rate of change</strong> of
        the soft channel, and the <strong>curvature</strong> of its rise. A rising hard/soft ratio is the
        signature of fresh, ongoing energy injection — the single most informative precursor we can engineer.
        Chapter 14 turns this paragraph into a feature matrix.
      </Callout>
    </>
  );
}
