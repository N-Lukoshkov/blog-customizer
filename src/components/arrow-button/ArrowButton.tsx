import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonProps = {
	onClick: () => void;
	isMenuOpen: boolean;
};

export const ArrowButton = ({ onClick, isMenuOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isMenuOpen })}
			/>
		</div>
	);
};
