# -*- coding: utf-8 -*-
"""Shared SuryaSetu / Heliograph visual identity for all deck diagrams.
Palette + fonts mirror the live app (tailwind.config.js, index.css)."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle, Circle, Wedge, Polygon
from matplotlib.lines import Line2D
import numpy as np

# ---- exact app tokens ----
BG      = "#070a12"
PANEL   = "#111a2e"
PANEL2  = "#16203a"
LINE    = "#233150"
ACCENT  = "#ff6b1a"   # hard X-ray / primary orange
ACCENT2 = "#ffa726"   # amber / headings
SOFT    = "#4aa8ff"   # soft X-ray / science blue
HARD    = "#ff6b1a"
RED     = "#f0506e"   # ALERT
YELLOW  = "#fbbf24"   # WATCH
GREEN   = "#34d399"   # QUIET / good
PURPLE  = "#a78bfa"   # derivative / precursor
INK     = "#e8edf7"
MUTED   = "#93a0b8"
GRID    = "#172238"

# ---- register Segoe UI + Consolas (present on Windows) ----
import os
_FONTS = r"C:\Windows\Fonts"
for f in ["segoeui.ttf", "segoeuib.ttf", "segoeuisl.ttf", "consola.ttf", "consolab.ttf"]:
    p = os.path.join(_FONTS, f)
    if os.path.exists(p):
        try: font_manager.fontManager.addfont(p)
        except Exception: pass
SANS = "Segoe UI"
MONO = "Consolas"
plt.rcParams.update({
    "font.family": SANS,
    "font.size": 12,
    "axes.edgecolor": LINE,
    "axes.labelcolor": MUTED,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "text.color": INK,
    "savefig.dpi": 450,
})


def panel_fig(w=9.0, h=5.0, dpi=450):
    """A dark self-contained panel figure on transparent ground (sits on white slide)."""
    fig = plt.figure(figsize=(w, h), dpi=dpi)
    fig.patch.set_alpha(0)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100); ax.set_ylim(0, 100)
    ax.axis("off")
    # square dark panel (no border radius)
    card = Rectangle((0.6, 0.6), 98.8, 98.8,
                     linewidth=1.6, edgecolor=LINE, facecolor=BG, zorder=0)
    ax.add_patch(card)
    return fig, ax


def chart_fig(w=6.0, h=4.2, dpi=450):
    """A dark panel with a real matplotlib data axis inside."""
    fig = plt.figure(figsize=(w, h), dpi=dpi)
    fig.patch.set_facecolor(BG)
    fig.patch.set_alpha(1)
    ax = fig.add_subplot(111)
    ax.set_facecolor(BG)
    for s in ax.spines.values():
        s.set_color(LINE)
    ax.grid(True, color=GRID, linewidth=0.7, alpha=0.9)
    ax.tick_params(colors=MUTED, labelsize=9)
    return fig, ax


def title(ax, text, x=4, y=93, color=ACCENT2, size=15):
    ax.text(x, y, text, color=color, fontsize=size, fontweight="bold",
            family=SANS, zorder=6, va="top")


def box(ax, x, y, w, h, text, fc=PANEL, ec=LINE, tc=INK, fs=10, bold=False,
        round=0, align="center", lw=1.5, family=SANS):
    p = Rectangle((x, y), w, h, linewidth=lw, edgecolor=ec, facecolor=fc, zorder=2)
    ax.add_patch(p)
    if text:
        ha = "center" if align == "center" else "left"
        tx = x + w/2 if align == "center" else x + 1.4
        ax.text(tx, y + h/2, text, ha=ha, va="center", color=tc,
                fontsize=fs, fontweight="bold" if bold else "normal",
                zorder=3, family=family, linespacing=1.25)
    return (x, y, w, h)


def arrow(ax, p1, p2, color=MUTED, lw=2.0, style="-|>", ls="-", ms=14):
    a = FancyArrowPatch(p1, p2, arrowstyle=style, mutation_scale=ms,
                        linewidth=lw, color=color, zorder=1, linestyle=ls,
                        shrinkA=3, shrinkB=3)
    ax.add_patch(a)


def dot(ax, x, y, color, r=1.0):
    ax.add_patch(Circle((x, y), r, color=color, zorder=5))


def save(fig, name):
    fig.savefig(name, transparent=True, bbox_inches="tight", pad_inches=0.05)
    plt.close(fig)
    print("wrote", name)
