import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { 
  getArticlesPageIsLoading, 
  getArticlesPagesHasMore, 
  getArticlesPagesNum 
} from '../../selectors/articlesPageSelectors';
import { articelPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNexrArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNexrArticlePage',
  async (_, thunkApi) => {
    const { getState , dispatch} = thunkApi;
    const hasMore = getArticlesPagesHasMore(getState());
    const page = getArticlesPagesNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articelPageActions.setPage(page + 1))
      dispatch(fetchArticlesList({
        page: page + 1
      }))
    }
  },
);
