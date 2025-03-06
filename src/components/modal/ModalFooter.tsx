import { globalManagerModal } from "../../helpers/globalManagerModal";
import { ReactNode } from "react";
import { Button } from "../atoms/Button";

type ModalFooterProps = {
  onClose: () => unknown;
  onConfirm?: () => unknown;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children?: ReactNode
};

export function ModalFooter({
  onClose,
  onConfirm,
  cancelButtonText = "Voltar",
  confirmButtonText = "Confirmar",
  children
}: ModalFooterProps) {

  const handleOnClose = () => {
    globalManagerModal.decrementZIndex()
    globalManagerModal.popModal();
    onClose()
  }

  return (
    <div className="flex p-2 bg-white rounded-b-2xl">
      {children}
      <Button variant="text" className="ml-auto text-gray" onClick={handleOnClose}>
        {cancelButtonText}
      </Button>
      {onConfirm && (
        <Button variant="filled" className="bg-success" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      )}
    </div>
  );
}
