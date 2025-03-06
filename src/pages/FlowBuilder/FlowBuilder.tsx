import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, Node, useEdgesState, useNodesState } from "reactflow";
import zinc from "tailwindcss/colors"
import 'reactflow/dist/style.css';
import { Square } from "../../components/nodes/Square";
import { useCallback } from "react";

const NODE_TYPES = {
    square: Square
}

const INITIAL_NODES = [
    {
        id: crypto.randomUUID(),
        type: "square",
        data: { label: "Square 1" },
        position: { x: 100, y: 100 },
    },
    {
        id: crypto.randomUUID(),
        type: "square",
        data: { label: "Square 1" },
        position: { x: 1000, y: 100 },
    }
] satisfies Node[]

export function FlowBuilder() {
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

    const onConnect = useCallback((connection: Connection) => {
        return setEdges((edges) => addEdge(connection, edges))
    }, [setEdges])

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodeTypes={NODE_TYPES}
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
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