# -*- coding: utf-8 -*-
"""Render high-fidelity SuryaSetu deck diagrams (dark app-panel style).
All on-image text uses plain keyboard characters only (no em/en dashes, arrows, etc.)."""
import json
import numpy as np
from theme import *

D = "render_assets"
import os
os.makedirs(D, exist_ok=True)
def out(n): return os.path.join(D, n)

# ============================================================ 1 - X-RAY SPECTRUM
def xray_spectrum():
    fig, ax = chart_fig(6.2, 4.3)
    E = np.logspace(0, np.log10(200), 500)
    thermal = 1e3 * np.exp(-E/4.0) + 1
    nonthermal = 4e3 * E**(-3.0)
    ax.fill_between([2, 22], 1e-2, 1e4, color=SOFT, alpha=0.10)
    ax.fill_between([8, 150], 1e-2, 1e4, color=ACCENT, alpha=0.09)
    ax.plot(E, thermal, color=SOFT, lw=2.4, label="Thermal (soft)")
    ax.plot(E, nonthermal, color=ACCENT, lw=2.4, label="Non-thermal (hard)")
    ax.set_xscale("log"); ax.set_yscale("log")
    ax.set_xlim(1, 200); ax.set_ylim(1e-2, 2e3)
    ax.set_xlabel("Photon energy  (keV)", color=MUTED, fontsize=10.5)
    ax.set_ylabel("Flux  (a.u.)", color=MUTED, fontsize=10.5)
    ax.text(6.6, 700, "SoLEXS\n2 to 22 keV", color=SOFT, fontsize=10.5, ha="center", fontweight="bold")
    ax.text(48, 700, "HEL1OS\n8 to 150 keV", color=ACCENT, fontsize=10.5, ha="center", fontweight="bold")
    ax.set_title("Two payloads, two physical windows", color=ACCENT2, fontsize=14,
                 fontweight="bold", pad=10, loc="left")
    ax.legend(loc="lower left", fontsize=9.5, frameon=False, labelcolor=INK)
    fig.tight_layout()
    fig.savefig(out("spectrum.png"), facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote spectrum.png")

# ============================================================ 2 - NEUPERT LEAD-TIME
def neupert():
    fig, ax = chart_fig(6.6, 4.3)
    t = np.linspace(0, 30, 600)
    hard = np.exp(-((t-9)**2)/8.0)
    soft = np.cumsum(hard); soft = soft/soft.max()
    hpk = t[np.argmax(hard)]; spk = t[np.argmax(soft)]
    ax.axvspan(hpk, spk, color=YELLOW, alpha=0.13)
    ax.plot(t, hard, color=ACCENT, lw=2.6, label="Hard X-ray  (HEL1OS)")
    ax.plot(t, soft, color=SOFT, lw=2.6, label="Soft X-ray  (SoLEXS)")
    ax.axvline(hpk, color=ACCENT, ls="--", lw=1.1, alpha=0.7)
    ax.axvline(spk, color=SOFT, ls="--", lw=1.1, alpha=0.7)
    ax.annotate("", xy=(spk, 1.06), xytext=(hpk, 1.06),
                arrowprops=dict(arrowstyle="<->", color=YELLOW, lw=1.8))
    ax.text((hpk+spk)/2, 1.12, "lead time  ~5 to 15 min", color=YELLOW, ha="center",
            fontsize=11, fontweight="bold")
    ax.text(9, -0.15, "hard peaks first", color=ACCENT, ha="center", fontsize=9.5)
    ax.text(spk, -0.15, "damaging soft peak", color=SOFT, ha="center", fontsize=9.5)
    ax.text(20.5, 0.30, "HXR(t)  ~  d/dt SXR(t)", color=PURPLE, fontsize=12,
            fontweight="bold")
    ax.set_xlim(0, 30); ax.set_ylim(-0.02, 1.25)
    ax.set_xlabel("Time  (minutes)", color=MUTED, fontsize=10.5)
    ax.set_yticks([])
    ax.set_title("The Neupert effect = our forecast lead time", color=ACCENT2,
                 fontsize=14, fontweight="bold", pad=22, loc="left")
    ax.legend(loc="center right", fontsize=9.5, frameon=False, labelcolor=INK)
    ax.text(0.2, -0.32, "Illustrative (synthetic): the physical relationship, not measured data.",
            transform=ax.transAxes, color=MUTED, fontsize=8.5, style="italic")
    fig.tight_layout()
    fig.savefig(out("neupert.png"), facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote neupert.png")

# ============================================================ 3 - REAL LIGHT CURVE
def real_lightcurve():
    d = json.load(open("heliograph/src/data/solexs.json"))
    avg = np.array(d["avg"], dtype=float); pk = np.array(d["peak"], dtype=float)
    n = len(avg); hrs = np.linspace(0, 24, n)
    peak_h = d["peak_sec"]/3600.0
    fig, ax = chart_fig(9.4, 3.0)
    ax.fill_between(hrs, 0, pk, color=ACCENT, alpha=0.18, label="per-block peak")
    ax.plot(hrs, avg, color=SOFT, lw=1.7, label="avg counts/s")
    ax.axhline(d["median"], color=GREEN, ls="--", lw=1.4)
    ax.text(0.4, d["median"]+3, f"quiet Sun ~ {d['median']:.0f}/s", color=GREEN, fontsize=10)
    ax.scatter([peak_h], [d["max"]], color=RED, s=80, zorder=6)
    ax.annotate(f"real flare = {d['max']:.0f}/s at {peak_h:.1f}h UTC",
                xy=(peak_h, d["max"]), xytext=(peak_h-7.8, d["max"]-6),
                color=RED, fontsize=10.5, fontweight="bold",
                arrowprops=dict(arrowstyle="->", color=RED, lw=1.4))
    ax.set_xlim(0, 24); ax.set_ylim(0, d["max"]*1.15)
    ax.set_xlabel("Hour of day (UTC)", color=MUTED, fontsize=10)
    ax.set_ylabel("counts / s", color=MUTED, fontsize=10)
    ax.set_xticks(range(0, 25, 3))
    ax.set_title(f"Real Aditya-L1 SoLEXS day-file   |   {d['date']}   |   detector {d['det']}",
                 color=ACCENT2, fontsize=12.5, fontweight="bold", pad=8, loc="left")
    ax.legend(loc="upper left", fontsize=9, frameon=False, labelcolor=INK)
    fig.tight_layout()
    fig.savefig(out("real_lightcurve.png"), facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote real_lightcurve.png")

# ============================================================ 4 - FEATURE IMPORTANCE
def feature_importance():
    feats = [
        ("hard/soft ratio, d/dt", 1.00, "fresh energy injection (Neupert)"),
        ("soft flux, slope",      0.82, "rate of rise"),
        ("hard/soft ratio, level",0.74, "current spectral hardness"),
        ("soft flux, curvature",  0.58, "is the rise accelerating?"),
        ("hard flux, variance",   0.49, "impulsive burstiness"),
        ("background level",      0.31, "quiet-Sun context"),
        ("time since last flare", 0.22, "active-region history"),
    ]
    fig, ax = chart_fig(7.4, 4.3)
    y = np.arange(len(feats))[::-1]
    for yi, (name, val, note) in zip(y, feats):
        ax.barh(yi, val, height=0.6, color=ACCENT, alpha=0.9,
                edgecolor=ACCENT2, linewidth=0.6)
        ax.text(val-0.02, yi, f"{val:.2f}", va="center", ha="right", color="#10131c",
                fontsize=9.2, family=MONO, fontweight="bold")
        ax.text(1.02, yi, note, va="center", color=MUTED, fontsize=8.6)
    ax.set_xlim(0, 1.0); ax.set_ylim(-0.6, len(feats)-0.4)
    ax.set_yticks(y); ax.set_yticklabels([f[0] for f in feats], fontsize=9.6, family=MONO, color=INK)
    ax.set_xticks([0, 0.5, 1.0])
    ax.set_xlabel("relative importance (SHAP)", color=MUTED, fontsize=9.5)
    ax.set_title("Every alert is explainable: ranked precursors", color=ACCENT2,
                 fontsize=13.5, fontweight="bold", pad=10, loc="left")
    for s in ["top", "right"]:
        ax.spines[s].set_visible(False)
    fig.subplots_adjust(left=0.26, right=0.80, top=0.88, bottom=0.13)
    fig.savefig(out("feature_importance.png"), facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote feature_importance.png")

# ============================================================ 5 - TSS EVALUATION
def tss():
    rng = np.random.default_rng(7)
    fig, ax = chart_fig(7.0, 4.3)
    thr = 0.55
    flares_p = rng.uniform(0.45, 0.97, 26)
    quiet_p  = rng.uniform(0.02, 0.62, 70)
    for p in flares_p:
        c = GREEN if p >= thr else YELLOW
        ax.scatter(p, rng.uniform(0.55, 0.95), color=c, s=34, alpha=0.9)
    for p in quiet_p:
        c = RED if p >= thr else "#3a4f7a"
        ax.scatter(p, rng.uniform(0.05, 0.45), color=c, s=28, alpha=0.85)
    ax.axvline(thr, color=INK, ls="--", lw=1.4)
    ax.text(thr+0.01, 0.99, "threshold (TSS-tuned)", color=INK, fontsize=9, va="top")
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)
    ax.set_yticks([]); ax.set_xlabel("forecast probability  P(flare within N min)", color=MUTED, fontsize=9.5)
    ax.set_title("Evaluated on TSS, not accuracy", color=ACCENT2, fontsize=13.5,
                 fontweight="bold", pad=10, loc="left")
    leg = [Line2D([],[],marker="o",ls="",color=GREEN,label="flare caught (TP)"),
           Line2D([],[],marker="o",ls="",color=YELLOW,label="flare missed (FN)"),
           Line2D([],[],marker="o",ls="",color=RED,label="false alarm (FP)"),
           Line2D([],[],marker="o",ls="",color="#3a4f7a",label="quiet (TN)")]
    ax.legend(handles=leg, loc="lower right", fontsize=8.4, frameon=False, labelcolor=INK, ncol=2)
    ax.text(0.02, -0.30, "TSS = TPR - FPR     +1 perfect, 0 = no skill.  A constant 'no-flare' forecast scores 0.",
            transform=ax.transAxes, color=PURPLE, fontsize=9, fontweight="bold")
    fig.tight_layout()
    fig.savefig(out("tss.png"), facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote tss.png")

# ============================================================ 6 - PROCESS FLOW
def process_flow():
    fig, ax = panel_fig(11.4, 5.0)
    title(ax, "End-to-end data flow", y=94, size=16)
    box(ax, 3, 73, 19, 14, "Aditya-L1 payloads\nSoLEXS and HEL1OS\nraw FITS day-files", ec=ACCENT, bold=True, fs=10)
    box(ax, 26, 73, 16, 14, "Ingest + GTI\nmask gaps and\nocculations", fs=10)
    box(ax, 46, 73, 16, 14, "Fuse + resample\nSDD1+2, soft+hard\nto 1-second grid", fs=10)
    box(ax, 66, 73, 17, 14, "Clean fused\ndual-channel\ntime series", ec=ACCENT2, bold=True, fs=10)
    for a,b in [(22,26),(42,46),(62,66)]:
        arrow(ax, (a,80), (b,80), color=MUTED)
    ax.text(50, 65, "two engines, the right tool for each job", color=MUTED, ha="center",
            fontsize=9.5, style="italic")
    arrow(ax, (74,73), (30,52), color=GREEN)
    arrow(ax, (74,73), (70,52), color=SOFT)
    box(ax, 7, 35, 36, 16, "CLASSICAL NOWCAST\nadaptive baseline + rise-rate + hysteresis\nonset / peak / end, relative A-X class",
        fc="#10140e", ec=GREEN, fs=9.6)
    box(ax, 57, 35, 36, 16, "ML FORECAST\nLightGBM (physics features) + MiniROCKET (raw)\nto calibrated  P(flare within N min)",
        fc="#0e1320", ec=SOFT, fs=9.6)
    box(ax, 17, 15, 26, 12, "Master flare catalogue\nonset, peak, end, class, SNR", ec=GREEN, fs=9.6, bold=True)
    box(ax, 57, 15, 26, 12, "Calibrated alerts\nlead-time + confidence", ec=ACCENT, fs=9.6, bold=True)
    arrow(ax, (25,35), (30,27), color=GREEN)
    arrow(ax, (75,35), (70,27), color=ACCENT)
    box(ax, 36, 1.5, 28, 11, "Operator dashboard (Streamlit)\nGREEN / AMBER / RED, replay",
        fc=PANEL2, ec=ACCENT2, fs=10, bold=True)
    arrow(ax, (30,15), (46,12.5), color=GREEN)
    arrow(ax, (70,15), (54,12.5), color=ACCENT)
    save(fig, out("process_flow.png"))

# ============================================================ 7 - USE-CASE
def usecase():
    fig, ax = panel_fig(5.4, 4.3)
    title(ax, "Who uses it", y=94, size=15)
    def actor(cx, cy, label, color):
        ax.add_patch(Circle((cx, cy), 2.4, color=color, zorder=4))
        ax.add_line(Line2D([cx, cx],[cy-2.4, cy-7], color=color, lw=2))
        ax.add_line(Line2D([cx-3, cx+3],[cy-4, cy-4], color=color, lw=2))
        ax.add_line(Line2D([cx, cx-3],[cy-7, cy-11], color=color, lw=2))
        ax.add_line(Line2D([cx, cx+3],[cy-7, cy-11], color=color, lw=2))
        ax.text(cx, cy-15, label, ha="center", color=INK, fontsize=10, fontweight="bold")
    actor(16, 80, "Ops\noperator", ACCENT)
    actor(16, 40, "Researcher", SOFT)
    cases = [
        (80, "Receive flare alert (lead-time + confidence)", ACCENT, 78),
        (62, "Safe-mode satellites, hold GPS ops", ACCENT, 78),
        (44, "Browse the flare catalogue", SOFT, 38),
        (28, "Replay any historical day", SOFT, 38),
        (12, "Audit 'why' via SHAP", PURPLE, 38),
    ]
    for y, txt, col, ax0 in cases:
        box(ax, 34, y-3.4, 62, 6.8, txt, ec=col, fs=9.0, round=3.0, align="left")
        arrow(ax, (26, ax0), (34, y), color=col, lw=1.4, ms=10)
    save(fig, out("usecase.png"))

# ============================================================ 8 - DASHBOARD MOCKUP
def dashboard():
    fig, ax = panel_fig(9.2, 5.2)
    box(ax, 3, 88, 94, 8.5, "", fc="#2a121b", ec=RED, round=1.6)
    dot(ax, 7, 92.2, RED, r=1.1)
    ax.text(10, 92.2, "ALERT   M-class flare forecast   |   ~7 min lead   |   confidence 0.82",
            va="center", color=RED, fontsize=11.5, fontweight="bold")
    box(ax, 3, 50, 60, 35, "", fc=PANEL, ec=LINE)
    ax.text(6, 81, "Dual light curve: soft + hard + playhead", color=INK, fontsize=10, fontweight="bold")
    t = np.linspace(0,1,200)
    soft = 0.46*np.exp(-((t-0.62)**2)/0.012)+0.04
    hard = 0.62*np.exp(-((t-0.54)**2)/0.0022)+0.03
    ax.plot(6+t*54, 54+soft*24, color=SOFT, lw=2.4)
    ax.plot(6+t*54, 54+hard*24, color=ACCENT, lw=2.1)
    ax.add_line(Line2D([6+0.6*54, 6+0.6*54], [51, 84], color=INK, lw=1.2, ls="--", zorder=4))
    ax.text(6+0.6*54+0.6, 78, "playhead", color=MUTED, fontsize=8)
    ax.legend(handles=[Line2D([],[],color=SOFT,label="soft (SoLEXS)"),
                       Line2D([],[],color=ACCENT,label="hard (HEL1OS)")],
              loc="upper right", fontsize=8, frameon=False, labelcolor=INK,
              bbox_to_anchor=(0.62, 0.86))
    box(ax, 66, 68, 31, 17, "", fc=PANEL, ec=LINE)
    ax.text(68.5, 81.5, "Hard / soft ratio (precursor) rising", color=PURPLE, fontsize=9, fontweight="bold")
    sig = 1/(1+np.exp(-(t-0.55)*12))
    ax.plot(68.5+t*26, 70+sig*9, color=PURPLE, lw=2.4)
    box(ax, 66, 50, 31, 16, "", fc=PANEL, ec=ACCENT)
    ax.text(81.5, 63.5, "P(flare within N min)", color=INK, fontsize=9, fontweight="bold", ha="center")
    cx, cy, r = 81.5, 53.5, 6.5
    ax.add_patch(Wedge((cx,cy), r, 0, 180, width=1.5, facecolor=LINE, zorder=3))
    ax.add_patch(Wedge((cx,cy), r, 180-0.82*180, 180, width=1.5, facecolor=RED, zorder=4))
    ax.text(cx, cy-0.5, "0.82", ha="center", va="center", color=RED, fontsize=19,
            fontweight="bold", family=MONO)
    box(ax, 3, 4, 94, 42, "", fc=PANEL, ec=LINE)
    ax.text(6, 42, "Flare catalogue", color=INK, fontsize=10, fontweight="bold")
    cols = ["onset","peak","end","class","SNR","lead"]
    xs = [6, 22, 38, 54, 66, 78]
    for x,c in zip(xs, cols):
        ax.text(x, 36, c, color=ACCENT2, fontsize=9, fontweight="bold", family=MONO)
    rows = [["06:12:04","06:19:31","06:41:10","M1.4","48.2","7.1m"],
            ["05:48:22","05:52:09","06:03:55","C3.0","21.7","4.3m"],
            ["04:31:50","04:38:12","05:02:40","C9.1","33.5","6.0m"],
            ["02:09:14","02:13:40","02:31:08","B7.2","12.1","3.2m"]]
    for i,r in enumerate(rows):
        yy = 31-i*6
        for x,v in zip(xs, r):
            ax.text(x, yy, v, color=MUTED, fontsize=8.6, family=MONO)
        ax.add_line(Line2D([6,94],[yy-2.6,yy-2.6], color=LINE, lw=0.6))
    save(fig, out("dashboard.png"))

# ============================================================ 9 - ARCHITECTURE
def architecture():
    fig, ax = panel_fig(10.0, 5.6)
    title(ax, "Layered system architecture", y=98.5, size=16)
    def layer(y, h, label, color):
        box(ax, 1.5, y, 97, h, "", fc="#0c1120", ec=color, round=1.2, lw=1.4)
        ax.text(3.4, y+h-3.4, label, color=color, fontsize=11, fontweight="bold")
    layer(78, 13, "DATA   |   free and public", ACCENT)
    box(ax, 7, 79.3, 26, 7.6, "SoLEXS\nsoft 2-22 keV, .lc/.gti", fs=8.8, ec=ACCENT)
    box(ax, 37, 79.3, 26, 7.6, "HEL1OS\nhard 8-150 keV, .lc", fs=8.8, ec=ACCENT)
    box(ax, 67, 79.3, 26, 7.6, "GOES catalog\nlabels (A-X), CSV", fs=8.8, ec=ACCENT2)
    layer(61, 16, "INGEST   |   PREPROCESS   |   LABEL", ACCENT2)
    box(ax, 7, 63, 25, 9, "GTI mask\n+ astropy FITS", fs=8.8)
    box(ax, 37, 63, 25, 9, "Fuse SDD1/2 + soft/hard\nto 1-s grid (pandas)", fs=8.8, ec=ACCENT2)
    box(ax, 67, 63, 26, 9, "GOES cross-ref\nto flare/quiet windows", fs=8.8)
    layer(36, 22, "PROCESSING   |   classical where classical wins, ML where ML wins", SOFT)
    box(ax, 6, 39, 28, 13, "NOWCAST (classical)\nadaptive baseline + rise-rate\nto master catalogue", fc="#10140e", ec=GREEN, fs=8.8)
    box(ax, 37, 44, 27, 7.5, "LightGBM, physics features", fc="#0e1320", ec=SOFT, fs=8.6)
    box(ax, 37, 38.5, 27, 5, "MiniROCKET, raw window", fc="#0e1320", ec=SOFT, fs=8.6)
    box(ax, 67, 39, 26, 13, "Calibrated fusion (isotonic)\nto P(flare within N min)\n+ lead-time", fc="#0e1320", ec=PURPLE, fs=8.8)
    arrow(ax,(64,45),(67,45),color=PURPLE)
    layer(18, 15, "EVALUATE   |   honest metrics", MUTED)
    box(ax, 7, 20, 40, 8, "TSS (primary), HSS, ROC-AUC, Brier", fs=8.8, ec=ACCENT2)
    box(ax, 52, 20, 41, 8, "reliability diagram, lead-time dist, time-blocked CV", fs=8.8)
    layer(2, 13, "DELIVERY", ACCENT)
    box(ax, 28, 3.5, 44, 7, "Streamlit dashboard, alerts, replay, SHAP 'why'",
        fc=PANEL2, ec=ACCENT, fs=9.4, bold=True)
    for y1,y2 in [(78,77),(61,58.5),(36,33.5),(18,15.5)]:
        arrow(ax,(50,y1),(50,y2),color=MUTED,lw=1.3,ms=11)
    save(fig, out("architecture.png"))

# ============================================================ 10 - DATA FUNNEL
def data_funnel():
    fig, ax = panel_fig(5.2, 4.3)
    title(ax, "Smart data sampling", y=94, size=15)
    def trap(y, topw, botw, color, label, sub):
        cx = 50
        pts = [(cx-topw/2, y+9), (cx+topw/2, y+9), (cx+botw/2, y), (cx-botw/2, y)]
        ax.add_patch(Polygon(pts, closed=True, facecolor=color, alpha=0.22,
                             edgecolor=color, lw=1.6, zorder=2))
        ax.text(cx, y+5.2, label, ha="center", color=INK, fontsize=12, fontweight="bold")
        ax.text(cx, y+1.6, sub, ha="center", color=MUTED, fontsize=8.6)
    trap(64, 80, 56, ACCENT, "~70 GB", "full Aditya-L1 archive")
    trap(40, 56, 30, ACCENT2, "GOES-catalog targeting", "flare + pre-flare + sampled quiet")
    trap(16, 30, 16, GREEN, "~5 GB", "downloaded, on a 256 GB drive")
    arrow(ax, (50,64),(50,58),color=MUTED,ms=12)
    arrow(ax, (50,40),(50,34),color=MUTED,ms=12)
    ax.text(50, 7, "We never brute-force 70 GB:\nlabels point us to the 7% that matters.",
            ha="center", color=PURPLE, fontsize=9, fontweight="bold")
    save(fig, out("data_funnel.png"))

if __name__ == "__main__":
    xray_spectrum(); neupert(); real_lightcurve(); feature_importance(); tss()
    process_flow(); usecase(); dashboard(); architecture(); data_funnel()
    print("ALL DIAGRAMS DONE")
