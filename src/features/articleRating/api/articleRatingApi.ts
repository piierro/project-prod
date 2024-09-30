import { Rating } from '@/entities/Reiting';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
  userId: string;
  articleId: string
}

interface RateArticleArg {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}


const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({articleId, userId}) => ({
        url: '/article-ratings',
        params: {
          articleId,
          userId
        }
      }),
    }),
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg
      }),
    }),
  }),
  overrideExisting: false,
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticel = articleRatingApi.useRateArticleMutation;