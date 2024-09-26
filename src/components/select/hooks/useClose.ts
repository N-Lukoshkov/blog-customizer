import { useEffect, useCallback } from 'react';

type UseClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClose = ({ isOpen, rootRef, onClose, onChange }: UseClose) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick && isOpen) {
				onClose?.();
				onChange(false);
			}
		},
		[isOpen, onClose, onChange, rootRef]
	);

	const handleEscape = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose?.();
				onChange(false);
			}
		},
		[isOpen, onClose, onChange]
	);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleEscape, handleClickOutside]);
};
