import { useEffect, useCallback } from 'react';

type UseClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClose = ({ isMenuOpen, rootRef, onClose, onChange }: UseClose) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick && isMenuOpen) {
				onClose?.();
				onChange(false);
			}
		},
		[isMenuOpen, onClose, onChange, rootRef]
	);

	const handleEscape = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuOpen) {
				onClose?.();
				onChange(false);
			}
		},
		[isMenuOpen, onClose, onChange]
	);

	useEffect(() => {
		if (!isMenuOpen) return;

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen, handleEscape, handleClickOutside]);
};
