import { ModalComposition } from "../../../modal/ModalComposition";

type TextMessageNodeModalProps = {
    open: boolean
    handlerOnClose: () => void
    handlerOnConfirme: () => void
}

export function TextMessageNodeModal({ open, handlerOnClose, handlerOnConfirme }: TextMessageNodeModalProps) {
    return (
        <ModalComposition.Root
            open={open}
            className="w-[60%]"
            onClose={() => handlerOnClose()}
        >
            <ModalComposition.Header title={"Mensagem de texto"} />
            <ModalComposition.Body>
                Olá
            </ModalComposition.Body>
            <ModalComposition.Footer 
                cancelButtonText="Voltar"
                confirmButtonText="Confirmar"
                onClose={() => handlerOnClose()}
                onConfirm={() => handlerOnConfirme()}
            />
        </ModalComposition.Root>
    )
}