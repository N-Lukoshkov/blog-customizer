import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, FormEvent, useState } from 'react';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from './constants/articleProps';

const App = () => {
	const [currentSideBarState, setCurrentSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [appliedState, setAppliedState] = useState(defaultArticleState);

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
		setAppliedState(defaultArticleState);
		setCurrentSideBarState(defaultArticleState);
	};

	const applyCurrentState = (event: FormEvent) => {
		event.preventDefault();
		setAppliedState(currentSideBarState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={updateFontFamilyState}
				fontSize={updateFontSizeState}
				fontColor={updateFontColorState}
				backgroundColor={updateBackgroundColorState}
				contentWidth={updateContentWidthState}
				resetButton={resetToInitialState}
				applyButton={applyCurrentState}
				sideBarState={currentSideBarState}
			/>
			<Article />
		</main>
	);
};

const rootElement = document.getElementById('root') as HTMLElement;
const appRoot = createRoot(rootElement);

appRoot.render(
	<StrictMode>
		<App />
	</StrictMode>
);
