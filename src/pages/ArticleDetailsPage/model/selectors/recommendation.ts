import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesReccomendationIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.reccomendation.isLoading;
}
export const getArticlesReccomendationsError = (state: StateSchema) => {
  return state.articleDetailsPage?.reccomendation.error;
}