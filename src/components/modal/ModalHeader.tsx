import { ReactNode } from "react";
import { ModalHeaderTitle } from "./ModalHeaderTitle";

type ModalHeaderProps = {
  title?: ReactNode;
};

export function ModalHeader({ title }: ModalHeaderProps) {
  return (
    <div className="py-1 bg-white rounded-t-2xl w-full flex">
      {title && <ModalHeaderTitle value={title} />}
    </div>
  );
}
