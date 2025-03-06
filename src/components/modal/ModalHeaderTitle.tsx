import { ReactNode } from "react";

type ModalHeaderTitleProps = {
  value: ReactNode;
};

export function ModalHeaderTitle({ value }: ModalHeaderTitleProps) {
  return (
    <div className="text-lg font-bold w-full flex justify-center">
      {value}
    </div>
  );
}
