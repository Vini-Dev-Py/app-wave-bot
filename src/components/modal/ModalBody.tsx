import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      className={twMerge(
        "flex-1 overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
