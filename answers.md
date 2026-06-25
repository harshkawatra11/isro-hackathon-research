# ISRO BAH 2026 - PS-15 - Idea Submission Answers (SuryaSetu)

Plain-text answers for the submission form. Each answer is written to stay under the field's
character limit. No em dashes. Paste directly into the form.

---

## Challenges (dropdown)

Forecasting and/or Nowcasting of Solar Flares using combined Soft and Hard X-ray data from Aditya-L1

---

## Brief about your Idea  (limit 1024)

SuryaSetu turns Aditya-L1 X-ray data into early warning for solar flares. It reads both payloads at once, SoLEXS for soft X-rays (2 to 22 keV) and HEL1OS for hard X-rays (8 to 150 keV), and fuses them onto a single one-second timeline. Two engines then run side by side. A classical detector logs every flare it sees, with onset, peak, end and class, into a master catalogue the moment it starts. A machine learning forecaster, LightGBM on physics features plus MiniROCKET on raw windows calibrated together, predicts the probability of a flare in the next N minutes with a confidence value and the minutes of lead time left. The forecast rests on the Neupert effect, where the hard X-ray burst arrives minutes before the damaging soft X-ray peak. An operator dashboard shows the live curves and a green, amber, red alert, and SHAP names the precursor behind each alert. The whole system runs at zero cost on a single laptop.

---

## What problem are you trying to solve?  (limit 2000)

A solar flare releases magnetic energy that reaches Earth as X-rays in about eight minutes. That burst ionises the upper atmosphere and causes shortwave radio blackouts, degrades GPS and NavIC positioning, threatens satellite electronics, and adds a radiation dose risk for crewed missions such as Gaganyaan. Larger events bring particle storms and coronal mass ejections that can endanger power grids. Almost all of this damage can be reduced if operators get warning in time, so the real value of any system here is the warning time it produces.

Problem Statement 15 asks for nowcasting and forecasting of solar flares from Aditya-L1 X-ray data. The hard part is doing it honestly. Flares are rare, so a model that always predicts no flare can look accurate and still be useless. The task needs strong detection of both low and high class flares, a low false alarm rate, and the longest reliable lead time before the flare peak.

Most existing tools use a single X-ray channel and blur detection and prediction into one step. SuryaSetu reads both the soft and hard channels from the L1 vantage and keeps detection and forecasting separate, so each can be measured on its own terms. It grounds lead time in the Neupert effect rather than a curve fit, and reports only the lead time the physics actually supports, about 5 to 15 minutes from X-rays alone, with longer horizons noted as a magnetogram based roadmap step. Every result is scored with the True Skill Statistic on future time blocks, the standard the space weather community trusts, and each alert states the precursor that triggered it. The outcome is a warning an operator can act on, built from real Aditya-L1 data at zero cost.

---

## Technology Stack being used  (limit 1024)

Language and environment: Python 3.11 in a uv managed virtual environment for stable scientific wheels.
Data handling: astropy for FITS light curves and GTI masking, numpy and pandas for fusion and resampling, scipy for baseline, smoothing and rate features.
Models: LightGBM on Neupert physics features, MiniROCKET (sktime) on raw time series windows, fused and calibrated with scikit-learn isotonic regression.
Metrics and validation: scikit-learn for TSS, HSS, ROC-AUC, Brier score and time blocked cross-validation.
Explainability: SHAP for per alert precursor attribution.
Visualisation and interface: matplotlib and plotly for figures, Streamlit for the live dashboard, alerts and replay.
Data sources: Aditya-L1 SoLEXS and HEL1OS from ISSDC PRADAN, GOES flare catalogue from NOAA for labels.
Hardware: a single laptop (i5, RTX 3050, 16 GB), CPU first with GPU optional. All software is open source.

---

## Is this your first hackathon? If Yes, then please share your experience.  (limit 1024)

No, this is not our first hackathon. Members of the team have taken part in college and national level hackathons before, across web development, data and machine learning projects, and that experience shaped how we approached this one. We started from the physics and the evaluation metric rather than the code, scoped the data so it fits on a laptop, and kept detection and forecasting separate so each can be judged fairly. We are used to working as a small team under a deadline, splitting the data work, modelling, evaluation and the interface between us, and we treat an honest account of a system's limits as part of a good submission rather than a weakness. What was new for us here was working directly with real satellite mission data and space weather physics, which made the build both demanding and genuinely interesting.

> Note: adjust this answer to match your team's actual history. If it is genuinely your first
> hackathon, switch the opening to "Yes" and keep the rest about the approach and what you learned.
