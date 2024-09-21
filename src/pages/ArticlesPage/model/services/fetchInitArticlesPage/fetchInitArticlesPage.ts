import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPagesInited } from '../../selectors/articlesPageSelectors';
import { articelPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchInitArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchInitArticlesPage',
  async (_, thunkApi) => {
    const { getState , dispatch} = thunkApi;;
    const inited = getArticlesPagesInited(getState());

    if (!inited) {
      dispatch(articelPageActions.initState())
      dispatch(fetchArticlesList({}))
    }
  },
);
