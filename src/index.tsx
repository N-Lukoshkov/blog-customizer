import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

const App = () => {
	const [appliedState, setAppliedState] = useState(defaultArticleState);

	const handleApplySettings = (state: ArticleStateType) => {
		setAppliedState(state);
	}

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
			<ArticleParamsForm onApply={handleApplySettings} />
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
