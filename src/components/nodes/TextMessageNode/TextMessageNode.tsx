import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Handle, NodeProps, Position } from "reactflow";
import { TextMessageNodeModal } from "./components/TextMessageNodeModal";

type TextMessageNodeData = {
  text: string
}

export function TextMessageNode(props: NodeProps<TextMessageNodeData>) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handlerOnClose = () => {
    setOpenModal(false)
  }

  const handlerOnConfirme = () => {
    setOpenModal(true)
  }

  return (
    <div 
      className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg w-[350px] h-[175px] cursor-pointer" 
      onClick={() => handlerOnConfirme()}
    >
      <div className="node-content flex flex-col items-start justify-between h-full">
        <div className="">
          <span className="text-lg flex gap-2">
            <MessageCircle className="text-blue-500" /> 
            Enviar Mensagem de Texto
          </span>
        </div>
        <div>
          <p className="text-sm">
            Esse bloco envia uma mensagem de texto para seu contato.
          </p>
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
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="-left-2 w-5 h-5 bg-cyan-200 flex items-center"
      >
        <i className="pi pi-angle-left pointer-events-none" />
      </Handle>
      {openModal && createPortal(
          <TextMessageNodeModal 
            open={openModal} 
            handlerOnClose={handlerOnClose} 
            handlerOnConfirme={handlerOnConfirme}
          />, document.getElementById("root")
        )
      }
    </div>
  );
}