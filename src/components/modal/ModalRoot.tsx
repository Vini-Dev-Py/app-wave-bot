import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { globalManagerModal } from '../../helpers/globalManagerModal';

type ModalProps = {
	open: boolean
	children?: ReactNode
	onClose: () => unknown
	className?: string
	fullscreen?: boolean
}

export function ModalRoot({
	open = false,
	children,
	onClose,
	className,
	fullscreen = false
}: ModalProps) {
	const maskRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			!modalRef.current?.contains(event.target as Node) &&
			maskRef.current?.contains(event.target as Node)
		) {
			const topModal = globalManagerModal.getTopModal();
			if (topModal === modalRef) {
				globalManagerModal.popModal();
				globalManagerModal.decrementZIndex();
				onClose();
			}
		}
	}, [onClose]);
	
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			const topModal = globalManagerModal.getTopModal();
			if (topModal === modalRef) {
				globalManagerModal.popModal();
				globalManagerModal.decrementZIndex();
				onClose();
			}
		}
	}, [onClose]);
	
	useEffect(() => {
		if (open && modalRef.current) {
			globalManagerModal.pushModal(modalRef);
		}
	
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
	
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);

			const topModal = globalManagerModal.getTopModal();
			if (topModal === modalRef) {
				globalManagerModal.popModal();
			}
		};
	}, [handleClickOutside, handleKeyDown, open]);

	return createPortal((
		<div
			data-open={open}
			ref={maskRef}
			className={twMerge(
				"data-[open=false]:hidden absolute left-0 top-0 h-screen w-screen flex items-center justify-center bg-gray/50 box-border py-5 max-h-full",
				fullscreen && "items-start p-4"
			)}
			style={{ zIndex: open ? globalManagerModal.getZIndex() : 0 }}
		>
			<div
				ref={modalRef}
				className={twMerge(
					"bg-selected-background text-gray rounded-2xl shadow-2xl z-50 flex flex-col max-h-full",
					fullscreen
						? "w-screen h-screen sm:w-screen sm:h-screen flex flex-col"
						: "",
					className
				)}
			>
				{children}
			</div>
		</div>
	), document.getElementById('root')!)
}