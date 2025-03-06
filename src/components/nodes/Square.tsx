import { Handle, NodeProps, Position } from "reactflow";

export function Square(props: NodeProps) {
    return (
        <div className="bg-violet-500 rounded w-[200px] h-[200px]">
            <Handle 
                id="right" 
                type="source" 
                position={Position.Right} 
                className="-right-2 w-5 h-5 bg-cyan-200 flex items-center"
            >
                <i className="pi pi-angle-right pointer-events-none" />
            </Handle>
            <Handle 
                id="left" 
                type="target" 
                position={Position.Left}
                className="-left-2 w-5 h-5 bg-cyan-200 flex items-center"
            >
                <i className="pi pi-angle-left pointer-events-none" />
            </Handle>
        </div>
    )
}