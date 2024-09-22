import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';

export const getArticlesPagesView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPagesError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPagesNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPagesLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPagesHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPagesInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPagesSort = (
  state: StateSchema
) => state.articlesPage?.sort ?? ArticleSortField.VIEWS;
export const getArticlesPagesOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesPagesSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesPagesTypes = (state: StateSchema) => state.articlesPage?.types ?? ArticleType.ALL;