import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, EdgeMouseHandler, MarkerType, Node, useEdgesState, useNodesState } from "reactflow";
import zinc from "tailwindcss/colors"
import 'reactflow/dist/style.css';
import { InitialFlowNode } from "../../components/nodes/InitialFlowNode/InitialFlowNode";
import { useCallback } from "react";
import { TextMessageNode } from "../../components/nodes/TextMessageNode/TextMessageNode";

export interface NodeData {
  label: string;
  description?: string;
  config?: {
    text?: string;
    question?: string;
    responseVariable?: string;
    timeout?: number;
    mediaUrl?: string;
  };
}

const NODE_TYPES = {
  initialFlowNode: InitialFlowNode,
  textMessage: TextMessageNode
}

const INITIAL_NODES: Node[] = [
  {
    id: crypto.randomUUID(),
    type: "initialFlowNode",
    data: { label: "Square 1" },
    position: { x: 100, y: 100 },
  },
  {
    id: crypto.randomUUID(),
    type: "textMessage",
    data: { label: "textMessage 1" },
    position: { x: 1000, y: 100 },
  }
] satisfies Node[]

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#64748b', strokeWidth: 2 },
  type: 'smoothstep',
  markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
  },
};

export function FlowBuilder() {
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

    const onConnect = useCallback((connection: Connection) => {
        return setEdges((edges) => addEdge(connection, edges))
    }, [setEdges])

    const onEdgeContextMenu: EdgeMouseHandler = useCallback((event, edge) => {
        event.preventDefault();
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }, [setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onEdgeContextMenu={onEdgeContextMenu}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Strict}
    >
        <Background 
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}