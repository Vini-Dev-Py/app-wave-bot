import { Rocket } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

export function InitialFlowNode(props: NodeProps) {
  return (
    <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg w-[350px] h-[175px]">
      <div className="node-content flex flex-col items-start justify-between h-full">
        <div className="">
          <span className="text-lg flex gap-2">
            <Rocket className="text-green-500" /> 
            Bloco Inícial
          </span>
        </div>
        <div>
          <p className="text-sm">Seu fluxo começa por este bloco.</p>
          <p className="text-sm">Conecte-o com outro bloco.</p>
        </div>
      </div>
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-2 w-5 h-5 bg-cyan-200 flex items-center"
      >
        <i className="pi pi-angle-right pointer-events-none" />
      </Handle>
    </div>
  );
}