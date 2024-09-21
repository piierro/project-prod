import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { 
  getArticlesPagesLimit, 
  getArticlesPagesNum, 
  getArticlesPagesOrder, 
  getArticlesPagesSearch, 
  getArticlesPagesSort 
} from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], fetchArticlesListProps, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getArticlesPagesLimit(getState());
    const search = getArticlesPagesSearch(getState());
    const order = getArticlesPagesOrder(getState());
    const sort = getArticlesPagesSort(getState());
    const page = getArticlesPagesNum(getState())

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search
        }
      });

      if(!response.data) {
        throw new Error()
      }

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
