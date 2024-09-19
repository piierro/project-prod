import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlesPagesView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPagesError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPagesNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPagesLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPagesHasMore = (state: StateSchema) => state.articlesPage?.hasMore;