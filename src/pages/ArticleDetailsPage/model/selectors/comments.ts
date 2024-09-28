import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesCommentsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.comments.isLoading;
}
export const getArticlesCommentsError = (state: StateSchema) => {
  return  state.articleDetailsPage?.comments.error;
}