import { ReactFlow, Background, Controls, MarkerType, type Node, type Edge } from "@xyflow/react";
import { useMemo } from "react";
import FlowNode, { type FlowNodeData } from "./FlowNode";

const SCI = "#4aa8ff", ENG = "#ff8a3d", GREEN = "#34d399", PURPLE = "#a78bfa";

const nodes: Node<FlowNodeData>[] = [
  { id: "solexs", type: "box", position: { x: 0, y: 40 }, data: { title: "SoLEXS", sub: "soft 2–22 keV", color: SCI, tech: ".lc / .gti" } },
  { id: "hel1os", type: "box", position: { x: 0, y: 130 }, data: { title: "HEL1OS", sub: "hard 8–150 keV", color: SCI, tech: ".lc" } },
  { id: "goes", type: "box", position: { x: 0, y: 220 }, data: { title: "GOES catalog", sub: "labels", color: GREEN, tech: "CSV" } },

  { id: "ingest", type: "box", position: { x: 210, y: 85 }, data: { title: "Ingest + GTI", sub: "mask invalid times", color: ENG, tech: "astropy" } },
  { id: "fuse", type: "box", position: { x: 210, y: 175 }, data: { title: "Fuse & resample", sub: "SDD1+2, soft+hard → 1 s grid", color: ENG, tech: "pandas" } },

  { id: "features", type: "box", position: { x: 440, y: 30 }, data: { title: "Feature engineering", sub: "Neupert features", color: ENG, tech: "numpy/scipy" } },
  { id: "nowcast", type: "box", position: { x: 440, y: 210 }, data: { title: "Nowcast engine", sub: "classical detector", color: GREEN, tech: "scipy" } },

  { id: "lgbm", type: "box", position: { x: 670, y: 0 }, data: { title: "LightGBM", sub: "physics features", color: ENG, tech: "lightgbm" } },
  { id: "rocket", type: "box", position: { x: 670, y: 80 }, data: { title: "MiniROCKET", sub: "raw windows", color: ENG, tech: "sktime" } },
  { id: "fusion", type: "box", position: { x: 670, y: 165 }, data: { title: "Calibrated fusion", sub: "isotonic → P(flare)", color: PURPLE, tech: "sklearn" } },

  { id: "catalogue", type: "box", position: { x: 900, y: 210 }, data: { title: "Master catalogue", sub: "deliverable #1", color: GREEN } },
  { id: "eval", type: "box", position: { x: 900, y: 95 }, data: { title: "Evaluation", sub: "TSS · blocked CV", color: PURPLE, tech: "sklearn" } },

  { id: "dash", type: "box", position: { x: 900, y: 10 }, data: { title: "Dashboard", sub: "alerts · deliverable #3", color: PURPLE, tech: "streamlit" } },
];

function e(id: string, s: string, t: string, color: string, animated = false): Edge {
  return { id, source: s, target: t, animated, style: { stroke: color }, markerEnd: { type: MarkerType.ArrowClosed, color } };
}

const edges: Edge[] = [
  e("e1", "solexs", "ingest", SCI), e("e2", "hel1os", "ingest", SCI),
  e("e3", "ingest", "fuse", ENG), e("e4", "goes", "fuse", GREEN),
  e("e5", "fuse", "features", ENG, true), e("e6", "fuse", "nowcast", GREEN, true),
  e("e7", "features", "lgbm", ENG), e("e8", "fuse", "rocket", ENG),
  e("e9", "lgbm", "fusion", PURPLE), e("e10", "rocket", "fusion", PURPLE),
  e("e11", "fusion", "eval", PURPLE), e("e12", "fusion", "dash", PURPLE, true),
  e("e13", "nowcast", "catalogue", GREEN, true), e("e14", "catalogue", "dash", PURPLE),
  e("e15", "eval", "dash", PURPLE),
];

export default function SystemArchitecture() {
  const nodeTypes = useMemo(() => ({ box: FlowNode }), []);
  return (
    <div className="h-[460px] w-full overflow-hidden rounded-xl border border-line bg-bg2">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1c2740" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
