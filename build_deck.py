# -*- coding: utf-8 -*-
"""Lay out the SuryaSetu PS-15 pitch into ISRO's 10-slide template (chrome preserved)."""
import os
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

SRC = "[Pub] ISRO BAH 2026 _ Idea Submission Template.pptx"
OUT = "SuryaSetu - ISRO BAH 2026 - PS15 - Idea Submission.pptx"
A   = "render_assets"

# palette (match the diagrams / live app)
INK    = RGBColor(0x16, 0x1d, 0x2e)
ACCENT = RGBColor(0xc2, 0x56, 0x0a)     # readable orange on white
ACC2   = RGBColor(0xb4, 0x4a, 0x00)
SOFTB  = RGBColor(0x1f, 0x6f, 0xb8)
MUTED  = RGBColor(0x51, 0x5b, 0x73)
GREEN  = RGBColor(0x17, 0x82, 0x55)
PURPLE = RGBColor(0x6d, 0x47, 0xc9)
WHITE  = RGBColor(0xff, 0xff, 0xff)
NAVY   = RGBColor(0x0b, 0x10, 0x1d)
F = "Segoe UI"

p = Presentation(SRC)
S = p.slides

# clear ISRO's grey instruction-placeholder text on content slides 3-9 (keep the
# branded background PICTURE; only empty the guidance text boxes)
for idx in range(2, 9):
    for sh in S[idx].shapes:
        if sh.has_text_frame:
            sh.text_frame.clear()

# ---------------- helpers ----------------
def _set(run, text, size, color, bold=False, italic=False, font=F):
    run.text = text; run.font.size = Pt(size); run.font.bold = bold
    run.font.italic = italic; run.font.color.rgb = color; run.font.name = font

def title_bar(slide, text, top=0.42):
    tb = slide.shapes.add_textbox(Inches(0.34), Inches(top), Inches(9.3), Inches(0.55))
    tf = tb.text_frame; tf.word_wrap = True; tf.auto_size = MSO_AUTO_SIZE.NONE
    _set(tf.paragraphs[0].add_run(), text, 20, ACCENT, bold=True)
    return tb

def lines(slide, items, left, top, width, height=None, anchor_title=None):
    """items: list of (text, size, color, bold, italic, bullet)"""
    h = height or 3.0
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True; tf.auto_size = MSO_AUTO_SIZE.NONE
    first = True
    for it in items:
        text, size, color, bold, italic, bullet = it
        para = tf.paragraphs[0] if first else tf.add_paragraph(); first = False
        para.space_after = Pt(3); para.space_before = Pt(0)
        r = para.add_run()
        _set(r, ("•  " if bullet else "") + text, size, color, bold, italic)
    return tb

def caption(slide, text, left, top, width, size=9.5, color=MUTED, align=PP_ALIGN.CENTER, bold=False):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(0.5))
    tf = tb.text_frame; tf.word_wrap = True; tf.auto_size = MSO_AUTO_SIZE.NONE
    para = tf.paragraphs[0]; para.alignment = align
    _set(para.add_run(), text, size, color, bold=bold)
    return tb

def banner(slide, text, left, top, width, height, fill=NAVY, tc=WHITE, size=11, bold=True):
    sh = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top),
                                Inches(width), Inches(height))
    sh.fill.solid(); sh.fill.fore_color.rgb = fill
    sh.line.color.rgb = ACCENT; sh.line.width = Pt(1.25)
    tf = sh.text_frame; tf.word_wrap = True
    tf.margin_left = Inches(0.12); tf.margin_right = Inches(0.12)
    tf.margin_top = Inches(0.04); tf.margin_bottom = Inches(0.04)
    para = tf.paragraphs[0]; para.alignment = PP_ALIGN.CENTER
    _set(para.add_run(), text, size, tc, bold=bold)
    return sh

def img(slide, name, left, top, max_w, max_h, align="center"):
    path = os.path.join(A, name)
    iw, ih = Image.open(path).size; ar = iw/ih
    w = max_w; h = w/ar
    if h > max_h:
        h = max_h; w = h*ar
    if align == "center":
        left = left + (max_w - w)/2
    slide.shapes.add_picture(path, Inches(left), Inches(top), Inches(w), Inches(h))
    return w, h

# =================================================== SLIDE 1 — Title
for sh in S[0].shapes:
    if not sh.has_text_frame: continue
    t = sh.text_frame.text
    if t.startswith("Team Name"):       val = "  SuryaSetu"
    elif t.startswith("Problem Statement"): val = "  PS-15 · Nowcasting & Forecasting of Solar Flares from Aditya-L1 X-ray data"
    elif t.startswith("Team Leader"):    val = "  Harsh Kawatra"
    else: continue
    _set(sh.text_frame.paragraphs[0].add_run(), val, 16, ACCENT, bold=True)
# one-line pitch + capability badges in the lower white band
caption(S[0], "Detect a flare the instant it begins — and warn minutes before its most damaging peak.",
        0.34, 5.05, 9.3, size=11, color=INK, align=PP_ALIGN.LEFT, bold=True)
badges = "SoLEXS 2–22 keV   ·   HEL1OS 8–150 keV   ·   LightGBM + MiniROCKET   ·   TSS-driven   ·   ₹0 on a laptop"
caption(S[0], badges, 0.34, 5.32, 9.3, size=9.5, color=SOFTB, align=PP_ALIGN.LEFT, bold=True)

# =================================================== SLIDE 2 — Team
for sh in S[1].shapes:
    if sh.has_table:
        tbl = sh.table
        cells = {
            (0,0): ("Team Leader", "Harsh Kawatra", "Delhi Technological University (DTU)"),
            (0,1): ("Team Member-1", "Gursimran Kaur", "Guru Gobind Singh Indraprastha University (GGSIPU)"),
            (1,0): ("Team Member-2", "—", "—"),
            (1,1): ("Team Member-3", "—", "—"),
        }
        for (ri,ci),(role,name,college) in cells.items():
            tf = tbl.cell(ri,ci).text_frame; tf.clear(); tf.word_wrap = True
            _set(tf.paragraphs[0].add_run(), role, 13, ACCENT, bold=True)
            for label,val in [("Name: ",name),("College: ",college)]:
                par = tf.add_paragraph()
                _set(par.add_run(), label, 11, INK, bold=True)
                _set(par.add_run(), val, 11, INK)
caption(S[1], "A two-person, two-institute team — full-stack + AI/ML engineering applied to ISRO's own solar mission.",
        0.5, 5.15, 9.0, size=10.5, color=MUTED, align=PP_ALIGN.CENTER)

# =================================================== SLIDE 3 — Opportunity & USP
title_bar(S[2], "Opportunity & USP — why SuryaSetu wins")
lines(S[2], [
    ("Most flare tools use a single channel from Earth orbit — and most “forecasts” are really just detections.", 11, INK, False, False, False),
    ("We are different on three axes:", 11, INK, True, False, False),
    ("Dual-payload fusion — SoLEXS soft + HEL1OS hard, from the L1 vantage.", 10, ACCENT, False, False, True),
    ("Physics-grounded lead time — the Neupert effect, a real mechanism.", 10, SOFTB, False, False, True),
    ("Honest evaluation — TSS-driven, calibrated, time-blocked.", 10, GREEN, False, False, True),
], 0.34, 1.05, 9.3, height=1.3)
img(S[2], "spectrum.png",  0.30, 2.35, 4.55, 2.55, align="center")
img(S[2], "neupert.png",   5.05, 2.35, 4.65, 2.55, align="center")
caption(S[2], "Two payloads = two physical windows (why fusion beats one channel)", 0.30, 4.92, 4.55, size=8.5)
caption(S[2], "Hard X-ray leads soft by 5–15 min = our forecast lead time", 5.05, 4.92, 4.65, size=8.5)
banner(S[2], "USP:  the only dual-payload, L1-vantage system that turns the Neupert effect into calibrated, TSS-validated lead-time warnings — reproducible at ₹0 on a laptop.",
       0.34, 5.22, 9.32, 0.34, fill=NAVY, tc=WHITE, size=9.5)

# =================================================== SLIDE 4 — Features
title_bar(S[3], "Features offered by the solution")
img(S[3], "features_grid.png", 0.30, 1.15, 9.4, 3.9, align="center")
caption(S[3], "Six capabilities — each mapped to an ISRO evaluation criterion: a master catalogue, calibrated lead-time forecasts, a live alerting dashboard, full A→X range, explainable alerts, and ₹0 reproducibility.",
        0.34, 5.12, 9.32, size=9.5, color=INK, align=PP_ALIGN.CENTER)

# =================================================== SLIDE 5 — Process flow / use-case
title_bar(S[4], "Process flow & use-case")
img(S[4], "process_flow.png", 0.28, 1.30, 6.25, 3.55, align="center")
img(S[4], "usecase.png",      6.62, 1.30, 3.10, 3.55, align="center")
caption(S[4], "Raw FITS → ingest + GTI → fuse to a 1-second grid → two parallel engines (classical nowcast ‖ ML forecast) → catalogue + calibrated alerts → operator dashboard.",
        0.30, 4.95, 6.25, size=8.6, color=INK)
caption(S[4], "Two actors: an ops operator who acts on alerts, and a researcher who audits the catalogue.",
        6.62, 4.95, 3.10, size=8.6, color=INK)

# =================================================== SLIDE 6 — Wireframe / dashboard
title_bar(S[5], "Wireframe — the operator dashboard")
img(S[5], "dashboard.png", 0.28, 1.20, 6.25, 3.85, align="left")
# right column: real light-curve inset + alert states
img(S[5], "real_lightcurve.png", 6.62, 1.22, 3.10, 1.10, align="center")
caption(S[5], "Renders real Aditya-L1 data (2026-06-15)", 6.62, 2.30, 3.10, size=8, color=MUTED)
states = [("● QUIET", GREEN, "no flare activity"),
          ("● WATCH", RGBColor(0xb8,0x86,0x00), "precursor (hard/soft ratio) rising"),
          ("● ALERT", RGBColor(0xc0,0x2a,0x42), "flare forecast — lead time + confidence shown")]
y = 2.62
for label, col, desc in states:
    tb = S[5].shapes.add_textbox(Inches(6.62), Inches(y), Inches(3.15), Inches(0.7))
    tf = tb.text_frame; tf.word_wrap = True
    _set(tf.paragraphs[0].add_run(), label, 10.5, col, bold=True)
    par = tf.add_paragraph(); _set(par.add_run(), desc, 8.5, INK)
    y += 0.78
caption(S[5], "Alert banner spans the top; dual light curve + playhead centre; hard/soft-ratio precursor and a calibrated probability gauge right; the flare catalogue below. The banner flips before the soft peak.",
        0.30, 5.12, 6.25, size=8.4, color=INK, align=PP_ALIGN.LEFT)

# =================================================== SLIDE 7 — Architecture
title_bar(S[6], "Architecture of the proposed solution")
img(S[6], "architecture.png", 0.28, 1.22, 5.95, 3.55, align="left")
img(S[6], "tss.png",                6.42, 1.22, 3.30, 1.95, align="center")
img(S[6], "feature_importance.png", 6.42, 3.30, 3.30, 1.70, align="center")
caption(S[6], "Classical where classical wins, ML where ML wins. Evaluated on TSS (not accuracy); every alert is explainable.",
        0.28, 4.86, 5.95, size=8.4, color=INK, align=PP_ALIGN.LEFT)

# =================================================== SLIDE 8 — Technologies
title_bar(S[7], "Technologies used in the solution")
img(S[7], "tech_stack.png", 0.30, 1.18, 7.7, 4.05, align="left")
lines(S[7], [
    ("Every layer, justified:", 11, ACCENT, True, False, False),
    ("CPU-first — runs on an", 9.5, INK, False, False, False),
    ("i5 / RTX 3050 / 16 GB laptop.", 9.5, INK, False, False, False),
    ("GPU optional, never required.", 9.5, MUTED, False, True, False),
    ("", 6, INK, False, False, False),
    ("All open-source", 10, GREEN, True, False, False),
    ("(BSD / MIT / Apache / PSF).", 9.5, INK, False, False, False),
    ("", 6, INK, False, False, False),
    ("Live build:", 10, INK, True, False, False),
    ("isro-hack-research.vercel.app", 9.5, SOFTB, True, False, False),
], 8.15, 1.35, 1.65, height=3.6)

# =================================================== SLIDE 9 — Cost
title_bar(S[8], "Estimated implementation cost")
lines(S[8], [
    ("Prototype (our submission): total ₹0 — the only real input is engineering time.", 11.5, ACCENT, True, False, False),
], 0.34, 1.02, 9.3, height=0.4)
rows = [
    ("Item","Cost","Note"),
    ("Aditya-L1 SoLEXS + HEL1OS data","₹0","free · ISSDC PRADAN (registered)"),
    ("GOES flare catalog (labels)","₹0","free · NOAA SWPC"),
    ("Software stack","₹0","all open-source (BSD/MIT/Apache)"),
    ("Compute","₹0","existing laptop — i5 / RTX 3050 / 16 GB"),
    ("Storage","₹0","existing 256 GB drive (~5 GB used)"),
    ("Hosting (demo)","₹0","Streamlit local / free HF Spaces"),
    ("TOTAL (prototype)","₹0","only real input is engineering time"),
]
gt = S[8].shapes.add_table(len(rows), 3, Inches(0.34), Inches(1.55), Inches(5.55), Inches(2.7)).table
gt.columns[0].width = Inches(2.7); gt.columns[1].width = Inches(0.7); gt.columns[2].width = Inches(2.15)
for ri,row in enumerate(rows):
    for ci,val in enumerate(row):
        c = gt.cell(ri,ci); c.text = ""
        par = c.text_frame.paragraphs[0]
        head = ri==0; tot = ri==len(rows)-1
        _set(par.add_run(), val, 9.5, WHITE if head else (ACCENT if tot else INK), bold=head or tot)
img(S[8], "data_funnel.png", 6.05, 1.5, 3.65, 2.95, align="center")
banner(S[8], "Production / ISRO-scale deployment adds real cost — operational GPU/cloud compute (~₹1.5–2.5 L/yr), 24×7 ingest + redundant full-mission storage, monitoring/MLOps, and engineering staff. Scoped on selection.",
       0.34, 4.78, 9.32, 0.66, fill=NAVY, tc=WHITE, size=9)

# =================================================== SLIDE 10 — Closing (dark bg: use light text)
LIGHT   = RGBColor(0xe2, 0xe9, 0xf6)
ORANGEB = RGBColor(0xff, 0x8a, 0x3d)
# closing banner with the live link folded in as a second line (avoids the baked-in title)
cb = S[9].shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.7), Inches(0.62), Inches(8.6), Inches(0.92))
cb.fill.solid(); cb.fill.fore_color.rgb = NAVY
cb.line.color.rgb = ACCENT; cb.line.width = Pt(1.25)
ctf = cb.text_frame; ctf.word_wrap = True
ctf.margin_top = Inches(0.06); ctf.margin_bottom = Inches(0.06)
p0 = ctf.paragraphs[0]; p0.alignment = PP_ALIGN.CENTER
_set(p0.add_run(), "SuryaSetu turns two ISRO payloads and one piece of solar physics into a calibrated, honestly-evaluated, zero-cost flare-warning system.", 11, WHITE, bold=True)
p1 = ctf.add_paragraph(); p1.alignment = PP_ALIGN.CENTER; p1.space_before = Pt(3)
_set(p1.add_run(), "Live build  ·  isro-hack-research.vercel.app", 11, ORANGEB, bold=True)
# single compact references line in the dark bottom band
caption(S[9], "References — SoLEXS 10.1007/s11207-025-02494-0  ·  HEL1OS 10.1007/s11207-025-02543-8  ·  Neupert: Dennis & Zarro (1993)  ·  TSS: Bloomfield (2012)  ·  Data: ISSDC PRADAN  ·  Labels: NOAA GOES",
        0.34, 5.22, 9.32, size=7.5, color=LIGHT, align=PP_ALIGN.CENTER)

p.save(OUT)
print("SAVED:", OUT)
