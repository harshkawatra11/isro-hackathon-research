import { Handle, Position } from "@xyflow/react";

export interface FlowNodeData {
  title: string;
  sub?: string;
  color?: string;
  tech?: string;
  [key: string]: unknown;
}

export default function FlowNode({ data }: { data: FlowNodeData }) {
  const color = data.color ?? "#4aa8ff";
  return (
    <div
      className="rounded-xl border bg-panel px-3.5 py-2.5 text-center shadow-lg"
      style={{ borderColor: color, minWidth: 130 }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, border: "none" }} />
      <Handle type="target" position={Position.Top} style={{ background: color, border: "none" }} />
      <div className="text-[13px] font-bold text-white">{data.title}</div>
      {data.sub && <div className="mt-0.5 text-[10.5px] text-muted">{data.sub}</div>}
      {data.tech && (
        <div className="mt-1 inline-block rounded bg-bg2 px-1.5 py-0.5 font-mono text-[9px]" style={{ color }}>
          {data.tech}
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ background: color, border: "none" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: color, border: "none" }} />
    </div>
  );
}
