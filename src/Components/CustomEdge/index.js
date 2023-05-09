import React from "react";
import { getBezierPath } from "reactflow";
import "./index.css";

const foreignObjectSize = 40;

// Removes an edge between 'source' and 'target' nodes from a graph.
const onEdgeClick = (evt, id, onRemoveEdge, source, target) => {
  evt.stopPropagation();
  const isRemove = window.confirm(
    `Do you want to remove the edge connecting the Node ${source} & Node ${target} `
  );
  if (isRemove) onRemoveEdge(id, source, target);
};

export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  onRemoveEdge,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
      >
        <div>
          <button
            className="edgebutton"
            onClick={(event) =>
              onEdgeClick(event, id, onRemoveEdge, source, target)
            }
            style={{ backgroundColor: "red" }}
          >
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
}
