import { isArray, isEmpty } from "lodash"
import { IconField } from "primereact/iconfield"
import { InputIcon } from "primereact/inputicon"
import { InputText } from "primereact/inputtext"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"
import { CheckBox } from "./CheckBox"
import { globalManagerModal } from "../../helpers/globalManagerModal"

export type ComboBoxOption<V> = {
    value: V,
    label: string,
    detail?: ReactNode,
    disabled?: boolean,
    onClick?: () => void,
}

type ComboBoxProps<V, M extends boolean> = {
    multiple?: M
    value: null | M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>
    options: ComboBoxOption<V>[]
    onChange: (value: M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>) => void
    placeholder?: string
    label: string
    emptyResultText?: string
} & (M extends true ? { closeDropdownOnSelection?: boolean } : { closeDropdownOnSelection: boolean }) 

export function ComboBox<V, M extends boolean = false>({
    multiple,
    value,
    options,
    onChange,
    placeholder,
    label,
    emptyResultText = "Nenhuma opção encontrada",
    closeDropdownOnSelection = true
}: ComboBoxProps<V, M>) {
    const [query, setQuery] = useState<string>("");
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const [isOptionsActive, setOptionsActive] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const containerOptionListRef = useRef<HTMLDivElement | null>(null);
    const optionListRef = useRef<HTMLUListElement | null>(null);
    const containerInputRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputSearchRef = useRef<HTMLInputElement | null>(null);

    const handleFilterOptions = (options: ComboBoxOption<V>[]): ComboBoxOption<V>[] => {
        if (!query.trim()) return options;
        return options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (
          !containerRef.current?.contains(event.relatedTarget as Node) &&
          !optionListRef.current?.contains(event.relatedTarget as Node)
        ) {
          setOptionsActive(false);
          setHighlightIndex(null);
          setQuery("");
        }
    };

    const isSelected = (option: ComboBoxOption<V>): boolean => {
        if (multiple && Array.isArray(value)) {
          return value.some((item) => item.value === option.value);
        }
        if (!multiple && value && !Array.isArray(value)) {
          return value.value === option.value;
        }
        return false;
    };

    const renderInputValue = (value: M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>) => {
        if (Array.isArray(value)) {
            return value.map((option) => option.label).join(", ");
        }
        return value?.label || "";
    };

    const handleSelect = (event: React.MouseEvent | React.KeyboardEvent, option: ComboBoxOption<V>) => {
        event.preventDefault();
        event.stopPropagation();

        if (multiple && isArray(value)) {
          const updatedValue = value.some(item => item.value === option.value) ? value.filter(item => item.value !== option.value) : [...value, option];
          onChange(updatedValue as M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>);
        }
      
        if (!multiple && !isArray(value)) {
          onChange((value.value === option.value ? null : option) as M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>);
        }

        if (closeDropdownOnSelection) {
            setOptionsActive(false);
        }
      
        inputSearchRef.current?.focus();
    };

    const isSelectedAllOptions = (): boolean => {
        if (multiple && isArray(value) && !!value.length) {
          return value.length === options.length;
        }
        return false;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
          setHighlightIndex((prev) =>
            prev === null || prev === options.length - 1 ? 0 : prev + 1
          );
        } else if (event.key === "ArrowUp") {
          setHighlightIndex((prev) =>
            prev === null || prev === 0 ? options.length - 1 : prev - 1
          );
        } else if (event.key === "Enter" && highlightIndex !== null) {
          handleSelect(event, options[highlightIndex]);
          return;
        }
  
        setOptionsActive(true);
    };

    const handleKeyDownClose = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			const topModal = globalManagerModal.getTopModal();
			if (topModal === containerOptionListRef) {
				globalManagerModal.popModal();
				globalManagerModal.decrementZIndex();
				setOptionsActive(false)
			}
		}
	}, []);

    useEffect(() => {
        if (isOptionsActive && containerOptionListRef.current) {
            globalManagerModal.pushModal(containerOptionListRef);
        }

        document.addEventListener('keydown', handleKeyDownClose);

        return () => {
			document.removeEventListener('keydown', handleKeyDownClose);

			const topModal = globalManagerModal.getTopModal();
			if (topModal === containerOptionListRef) {
				globalManagerModal.popModal();
			}
		};
    }, [handleKeyDownClose, isOptionsActive])

    const inputPosition = containerInputRef.current?.getBoundingClientRect();
    const inputWidth = containerInputRef.current ? containerInputRef.current.offsetWidth : 0;

    return (
        <div className="relative w-full mb-4">
            {label && (
                <span className="block text-sm font-medium text-textGray mb-2">
                    {label}
                </span>
            )}
            <div 
                className="flex"
                onBlur={handleBlur}
                ref={containerRef}
                onDoubleClick={() => setOptionsActive(true)}
            >
                <div
                    className="relative rounded-lg cursor-pointer bg-background data-[selected=true]:bg-selected-background flex-1 input-dropdown"
                    data-active={isOptionsActive}
                >
                    <div
                        className="flex items-center overflow-hidden"
                        ref={containerInputRef}
                    >
                        <IconField iconPosition="right">
                            <InputText
                                ref={inputRef}
                                className={twMerge(
                                    "w-full bg-inputBackground shadow-subtle flex-grow outline-none flex-1",
                                    isOptionsActive && "rounded-t-lg rounded-b-none"
                                )}
                                value={renderInputValue(value)}
                                placeholder={placeholder}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOptionsActive(true);
                                }}
                                onFocus={(event) => {
                                    event.stopPropagation();
                                    setOptionsActive(true);
                    
                                    if (inputSearchRef.current) inputSearchRef.current.focus();
                                }}
                            />
                            <InputIcon 
                                onClick={() => {}} 
                                className={twMerge("mr-1 pi pi-info-circle")}
                            />
                        </IconField>
                    </div>
                    <div ref={containerOptionListRef}>
                        {(isOptionsActive && document.getElementById("root")) && createPortal((
                            <ul
                                ref={optionListRef}
                                className={twMerge(
                                    "absolute bg-white rounded-b-lg overflow-auto max-h-72 shadow flex-col",
                                    isOptionsActive ? "" : "hidden"
                                )}
                                style={{
                                    top: inputPosition
                                      ? inputPosition.bottom + window.scrollY
                                      : 0,
                                    right: inputPosition ? inputPosition.left : 0,
                                    width: inputWidth ? `${inputWidth}px` : "300px",
                                    zIndex: isOptionsActive ? globalManagerModal.getZIndex() : 0
                                }}
                            >
                                <li className="flex items-center bg-selected-background p-2 sticky top-0">
                                    {multiple && isArray(value) && (
                                        <CheckBox
                                            disabled={isEmpty(options)}
                                            checked={isSelectedAllOptions()}
                                            onClick={(event) => {
                                                event.preventDefault();
                    
                                                if (isEmpty(options)) {
                                                    return;
                                                }
                    
                                                if (isSelectedAllOptions()) {
                                                    return onChange([] as unknown as M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>);
                                                }
                    
                                                onChange((options.filter((item) => !isSelected(item)) as  M extends true ? ComboBoxOption<V>[] : ComboBoxOption<V>));
                                            }}
                                        />
                                    )}
                                    <div className={twMerge("rounded-lg cursor-pointer dark:bg-dark-gray flex-1", (multiple && isArray(value)) ? "ml-4" : "")}>
                                        <InputText 
                                            ref={inputSearchRef}
                                            value={query}
                                            type={"text"}
                                            placeholder={placeholder}
                                            className={twMerge(
                                                "flex-grow outline-none flex-1 dark:bg-black bg-background dark:text-white"
                                            )}
                                            onKeyDown={handleKeyDown}
                                            onChange={(event) => setQuery(event.target.value)}
                                            autoFocus={true}
                                        />
                                    </div>
                                </li>
                                {isEmpty(options) && (
                                    <li className="p-2 cursor-default">{emptyResultText}</li>
                                )}
                                {!isEmpty(options) && handleFilterOptions(options).map((option, index) => (
                                    <li
                                        key={index}
                                        className={`
                                            w-full p-2 hover:bg-selected-background dark:hover:bg-gray-front text-gray-front cursor-pointer border-b-1 border-selected-background
                                            ${
                                              isSelected(option)
                                                ? "bg-selected-background dark:bg-dark-gray"
                                                : ""
                                            }
                                            ${
                                              highlightIndex === index
                                                ? "bg-highlight-option dark:bg-light-gray"
                                                : ""
                                            }
                                        `}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={(event) => handleSelect(event, option)}
                                    >
                                        <div className="flex items-center">
                                            <CheckBox
                                                checked={isSelected(option)}
                                                onClick={(event) => handleSelect(event, option)}
                                            />
                                            <div className="ml-4">
                                                <span>{option.label}</span>
                                                {option?.detail}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ), document.getElementById("root")!)}
                    </div>
                </div>
            </div>
        </div>
    )
}