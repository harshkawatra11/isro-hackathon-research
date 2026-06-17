# HELIOGRAPH

An interactive textbook **and** build blueprint for **ISRO BAH-2026 Problem Statement 15** —
*Forecasting / Nowcasting of Solar Flares using combined Soft & Hard X-ray data from Aditya-L1.*

It takes an AI/ML engineer with zero space-science background to ISRO-level fluency: the physics of
solar flares, the Aditya-L1 mission and its SoLEXS/HEL1OS payloads, the real data, and a fully
rigorous product design with every architecture, pipeline and physics diagram rendered live.

## Run it

```bash
cd heliograph
npm install      # already done if node_modules exists
npm run dev      # → http://localhost:5173
```

Production build / preview:

```bash
npm run build
npm run preview
```

## Stack

- **Vite + React + TypeScript** — fast static SPA, ₹0 to deploy (Vercel / GitHub Pages / Netlify).
- **Tailwind CSS** — theming.
- **Framer Motion** — physics animations (reconnection, Neupert, impact timeline).
- **React Flow (@xyflow/react)** — interactive, pannable system-architecture diagram.
- **d3-scale / d3-shape** — log-scale spectra and charts.
- **lucide-react**, **react-router-dom** — icons, hash routing.

## Structure

```
src/
  lib/syllabus.ts              # 4 parts, 21 chapters (single source of nav truth)
  data/solexs.json             # REAL decimated SoLEXS 2026-06-15 SDD2 light curve
  components/
    ui/primitives.tsx          # Callout, Figure, Card, TrackTag, Stat, Equation
    ChapterShell.tsx           # chapter header + prev/next
    Starfield.tsx
    diagrams/                  # every interactive/animated diagram
  pages/
    Home.tsx                   # landing + syllabus
    ChapterRoute.tsx           # slug → chapter via registry
    registry.tsx               # slug → component map
    chapters/                  # 21 authored chapters
```

## Content map (mirrors the ISRO template)

- **Part I — Science:** space weather, magnetic Sun, flare anatomy (CSHKP), X-ray physics, Neupert, A→X classes.
- **Part II — Mission & Data:** Aditya-L1 + 7 payloads, SoLEXS/HEL1OS, real FITS data, GOES labels.
- **Part III — Product:** architecture, pipeline, nowcasting, forecasting, evaluation (TSS), dashboard, build roadmap.
- **Part IV — ISRO submission:** Opportunity/USP, Features/Technologies, Flow/Use-case/Architecture, Cost & Team.

Use **Ctrl/Cmd + P** on the Part IV chapters to export the submission sections to the BAH-2026 deck.

## Accuracy

Instrument specs are verified against the published SoLEXS and HEL1OS papers (*Solar Physics*, 2025) and
the Neupert-effect literature; the real light curve is parsed from the actual downloaded day-file. Animated
physics figures (reconnection, Neupert) are physically-faithful schematics, labelled as such in-app.
