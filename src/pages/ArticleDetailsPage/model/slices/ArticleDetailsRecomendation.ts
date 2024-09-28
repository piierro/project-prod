import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticleDetailsReccomendationSchema } from '../types/ArticleDetailsReccomendationSchema';
import { 
  fetchArticleRecommendation
} from '../services/fetchArticleRecommendation/fetchArticleRecommendation';

const reccomendationAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
})

export const getArticleReccomendation = reccomendationAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.reccomendation || reccomendationAdapter.getInitialState()
)

const articleDetailsReccomendationSlice = createSlice({
  name: 'articleDetailsReccomendation',
  initialState: reccomendationAdapter.getInitialState<ArticleDetailsReccomendationSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendation.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleRecommendation.fulfilled, (state, action) => {
        state.isLoading = false;
        reccomendationAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export const { 
  reducer: articleDetailsReccomendationReducer
} = articleDetailsReccomendationSlice;