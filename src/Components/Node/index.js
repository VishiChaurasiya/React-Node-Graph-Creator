import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./index.css";
import ButtonEdge from "../CustomEdge";
import CustomNode from "../CustomNode";

const initialNodes = [
  {
    id: "0",
    data: { label: "Node 0" },
    position: { x: 600, y: 100 },
    type: "custom",
  },
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 600, y: 200 },
    type: "custom",
  },
];

const initialEdges = [
  {
    id: "reactflow__edge-0-1",
    source: "0",
    target: "1",
    type: "buttonedge",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export const Node = ({ toast }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edgeTypes, setEdgeTypes] = useState({});
  const [nodeTypes, setNodeTypes] = useState({});
  const [nodeId, setNodeId] = useState(2);

  // Removes the edge with the given id from the edges list and displays a success message.
  const onRemoveEdge = (id, source, target) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
    toast.success(`Edge ${source} - ${target} Removed Successfully`);
  };

  // Removes the node with the given id from the nodes and edges list and displays a success message.
  const onRemoveNode = (id) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
    );
    toast.success(`Node ${id} Removed Successfully`);
  };

  useMemo(
    () =>
      setEdgeTypes({
        buttonedge: (obj) => (
          <ButtonEdge {...obj} onRemoveEdge={onRemoveEdge} />
        ),
      }),
    // eslint-disable-next-line
    []
  );

  useMemo(
    () =>
      setNodeTypes({
        custom: ({ data, id }) => (
          <CustomNode data={data} id={id} onRemoveNode={onRemoveNode} />
        ),
      }),
    // eslint-disable-next-line
    []
  );

  // Updates the edges list with a new edge that connects two nodes.
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "buttonedge",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  // Adds a new node to the nodes list and displays a success message.
  const onAdd = useCallback(() => {
    const newNode = {
      id: `${nodeId}`,
      data: { label: `Node ${nodeId}` },
      position: {
        x: 200,
        y: 200,
      },
      type: "custom",
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeId(nodeId + 1);
    toast.success(`Node ${nodeId} Added Successfully`);
    // eslint-disable-next-line
  }, [setNodes, nodes]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
      >
        <div className="save__controls">
          <button
            onClick={onAdd}
            style={{
              backgroundColor: "#0D6EFD",
              color: "white",
              borderRadius: "5px",
              border: 0,
              padding: "10px",
              cursor: "pointer",
              margin: "30px",
            }}
          >
            Create Node
          </button>
        </div>
      </ReactFlow>
    </ReactFlowProvider>
  );
};
