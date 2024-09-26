import { useCallback, useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text/Text';
import { useClose } from '../select/hooks/useClose';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	applyButton,
	sideBarState,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		rootRef: formRef,
	});

	const toggleForm = useCallback(() => {
		setIsOpen((prevState) => {
			console.log('текущее состояние', !prevState);
			return !prevState;
		});
	}, []);

	return (
		<>
			<ArrowButton
				onClick={toggleForm}
				isOpen={isOpen}
				aria-expanded={isOpen ? 'true' : 'false'}
			/>

			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={formRef} onSubmit={applyButton}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Настройки статьи
					</Text>

					<Select
						title='Шрифт'
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={fontFamily}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={fontSize}
					/>

					<Select
						title='Цвет шрифта'
						selected={sideBarState.fontColor}
						options={fontColors}
						onChange={fontColor}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={backgroundColor}
					/>

					<Select
						title='Ширина контента'
						selected={sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={contentWidth}
					/>

					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={resetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
