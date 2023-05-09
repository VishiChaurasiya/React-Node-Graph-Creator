import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data, id, onRemoveNode }) => {
  const [isHover, setIsHover] = useState(false);

  const handleRemoveNode = (data, id, onRemoveNode) => {
    const isRemove = window.confirm(`Do you want to remove the Node ${id}`);
    if (isRemove) onRemoveNode(id);
  };

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <div
        style={{
          width: "128px",
          height: "13px",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "3px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "12px" }}>{data.label}</span>
      </div>
      {isHover && (
        <span style={{ position: "absolute", top: "-10px", right: "-8px" }}>
          <button
            className="edgebutton"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              handleRemoveNode(data, id, onRemoveNode);
            }}
          >
            ×
          </button>
        </span>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default CustomNode;
