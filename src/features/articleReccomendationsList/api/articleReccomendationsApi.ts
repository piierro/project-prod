import { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

const reccomendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleReccomendationsList: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit
        }
      }),
    }),
  }),
  overrideExisting: false,
})

export const useArticleReccomendationsList = reccomendationsApi.useGetArticleReccomendationsListQuery;