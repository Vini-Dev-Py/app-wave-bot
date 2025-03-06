import React from "react";

type CheckBoxProps = {
  checked: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

export function CheckBox({ checked, onClick, disabled }: CheckBoxProps) {
  return (
    <button
      onClick={(event) => {
        if (disabled) {
          return
        }

        onClick(event);
      }}
      className={`
        w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 
        ${checked ? "border-blue bg-primary" : "bg-white border-gray"}
        ${disabled? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
