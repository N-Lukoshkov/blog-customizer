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
	defaultArticleState
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text/Text';
import { useClose } from '../select/hooks/useClose';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) =>{
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentSideBarState, setCurrentSideBarState] =
		useState<ArticleStateType>(defaultArticleState);

	useClose({
		isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
		rootRef: formRef,
	});

	const toggleForm = useCallback(() => {
		setIsMenuOpen((prevState) => !prevState)
	}, []);

	const updateFontFamilyState = (option: OptionType) => {
		setCurrentSideBarState({
			...currentSideBarState,
			fontFamilyOption: option,
		});
	};

	const updateFontSizeState = (option: OptionType) => {
		setCurrentSideBarState({ ...currentSideBarState, fontSizeOption: option });
	};

	const updateFontColorState = (option: OptionType) => {
		setCurrentSideBarState({ ...currentSideBarState, fontColor: option });
	};

	const updateContentWidthState = (option: OptionType) => {
		setCurrentSideBarState({ ...currentSideBarState, contentWidth: option });
	};

	const updateBackgroundColorState = (option: OptionType) => {
		setCurrentSideBarState({ ...currentSideBarState, backgroundColor: option });
	};

	const resetToInitialState = () => {
		setCurrentSideBarState(defaultArticleState);
	};

	const applyCurrentState = (event: FormEvent) => {
		event.preventDefault();
		onApply(currentSideBarState);
	};

	return (
		<>
			<ArrowButton
				onClick={toggleForm}
				isMenuOpen={isMenuOpen}
				aria-expanded={isMenuOpen ? 'true' : 'false'}
			/>

			<aside
				className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form className={styles.form} ref={formRef} onSubmit={applyCurrentState}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Настройки статьи
					</Text>

					<Select
						title='Шрифт'
						selected={currentSideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateFontFamilyState}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentSideBarState.fontSizeOption}
						onChange={updateFontSizeState}
					/>

					<Select
						title='Цвет шрифта'
						selected={currentSideBarState.fontColor}
						options={fontColors}
						onChange={updateFontColorState}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={currentSideBarState.backgroundColor}
						options={backgroundColors}
						onChange={updateBackgroundColorState}
					/>

					<Select
						title='Ширина контента'
						selected={currentSideBarState.contentWidth}
						options={contentWidthArr}
						onChange={updateContentWidthState}
					/>

					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={resetToInitialState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
