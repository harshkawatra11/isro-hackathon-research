export type Track = "sci" | "eng" | "isro";

export interface Chapter {
  slug: string;
  n: string;
  title: string;
  blurb: string;
  track: Track;
  minutes: number;
}

export interface Part {
  id: string;
  label: string;
  sub: string;
  chapters: Chapter[];
}

export const SYLLABUS: Part[] = [
  {
    id: "science",
    label: "Part I · The Science",
    sub: "Become fluent in solar flare physics",
    chapters: [
      { slug: "space-weather", n: "1", title: "Space Weather & the Stakes", blurb: "Why a burst on the Sun breaks satellites, GPS and grids on Earth.", track: "sci", minutes: 9 },
      { slug: "magnetic-sun", n: "2", title: "The Sun as a Magnetic Star", blurb: "Structure, corona, active regions, and where flares are born.", track: "sci", minutes: 10 },
      { slug: "flare-anatomy", n: "3", title: "Anatomy of a Solar Flare", blurb: "Magnetic reconnection & the CSHKP standard model, animated.", track: "sci", minutes: 12 },
      { slug: "xray-physics", n: "4", title: "X-ray Emission Physics", blurb: "Thermal vs non-thermal bremsstrahlung: why soft & hard differ.", track: "sci", minutes: 11 },
      { slug: "neupert", n: "5", title: "The Light Curve & Neupert Effect", blurb: "Flare phases and the relationship that buys forecast lead time.", track: "sci", minutes: 12 },
      { slug: "classification", n: "6", title: "Classifying Flares: A→X", blurb: "The logarithmic GOES scale and the dynamic-range challenge.", track: "sci", minutes: 6 },
    ],
  },
  {
    id: "mission",
    label: "Part II · Mission & Data",
    sub: "Aditya-L1, its payloads, and the real data",
    chapters: [
      { slug: "aditya-l1", n: "7", title: "The Aditya-L1 Mission", blurb: "L1 halo orbit and the seven payloads watching the Sun.", track: "sci", minutes: 11 },
      { slug: "payloads", n: "8", title: "SoLEXS & HEL1OS, In Depth", blurb: "The two X-ray spectrometers, their detectors and bands.", track: "sci", minutes: 9 },
      { slug: "the-data", n: "9", title: "The Data: FITS, Levels, PRADAN", blurb: "Reading a real day-file, GTI, and the 70 GB strategy.", track: "eng", minutes: 12 },
      { slug: "labels", n: "10", title: "Ground Truth & Labels", blurb: "The GOES flare catalog and why L1 timing aligns.", track: "eng", minutes: 7 },
    ],
  },
  {
    id: "product",
    label: "Part III · The Product",
    sub: "Build it exactly to ISRO's requirements",
    chapters: [
      { slug: "architecture", n: "11", title: "System Architecture", blurb: "The full layered architecture, interactive and pannable.", track: "eng", minutes: 10 },
      { slug: "pipeline", n: "12", title: "Pipeline Walkthrough", blurb: "Follow one second of data from payload to alert.", track: "eng", minutes: 11 },
      { slug: "nowcasting", n: "13", title: "The Nowcasting Engine", blurb: "Classical detection done right. Try it on real data.", track: "eng", minutes: 10 },
      { slug: "forecasting", n: "14", title: "The Forecasting Engine", blurb: "LightGBM + MiniROCKET hybrid and the Neupert features.", track: "eng", minutes: 13 },
      { slug: "evaluation", n: "15", title: "Evaluation & Rigour", blurb: "TSS, time-blocked CV, calibration. Interactive.", track: "eng", minutes: 11 },
      { slug: "dashboard", n: "16", title: "The Alert Dashboard", blurb: "The operator interface and its visual-alert logic.", track: "eng", minutes: 7 },
      { slug: "roadmap", n: "17", title: "Build Roadmap (AI-Assisted)", blurb: "Nine phases, each a unit of work with a definition of done.", track: "eng", minutes: 9 },
    ],
  },
  {
    id: "submission",
    label: "Part IV · ISRO Submission",
    sub: "Every required template section",
    chapters: [
      { slug: "opportunity", n: "18", title: "Opportunity & USP", blurb: "How it differs, how it solves the problem, the USP.", track: "isro", minutes: 5 },
      { slug: "features", n: "19", title: "Features & Technologies", blurb: "The feature set and the justified tech stack.", track: "isro", minutes: 5 },
      { slug: "diagrams", n: "20", title: "Flow · Use-case · Architecture", blurb: "The template's required diagrams, on screen.", track: "isro", minutes: 5 },
      { slug: "cost-team", n: "21", title: "Cost & Team", blurb: "The ₹0 breakdown and the editable cover.", track: "isro", minutes: 4 },
    ],
  },
];

export const FLAT: Chapter[] = SYLLABUS.flatMap((p) => p.chapters);

export function neighbors(slug: string) {
  const i = FLAT.findIndex((c) => c.slug === slug);
  return { prev: i > 0 ? FLAT[i - 1] : null, next: i < FLAT.length - 1 ? FLAT[i + 1] : null };
}

export const TRACK_META: Record<Track, { label: string; color: string }> = {
  sci: { label: "Science", color: "#4aa8ff" },
  eng: { label: "Engineering", color: "#ff8a3d" },
  isro: { label: "ISRO Submission", color: "#34d399" },
};
