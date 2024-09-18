import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlesPagesView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPagesError = (state: StateSchema) => state.articlesPage?.error;