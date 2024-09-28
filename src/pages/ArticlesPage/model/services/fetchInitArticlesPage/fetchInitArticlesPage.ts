import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesPagesInited } from '../../selectors/articlesPageSelectors';
import { articelPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export const fetchInitArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/fetchInitArticlesPage',
  async (searchParams, thunkApi) => {
    const { getState , dispatch} = thunkApi;;
    const inited = getArticlesPagesInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const searchFromUrl = searchParams.get('search');
      const sortFromUrl = searchParams.get('sort') as ArticleSortField;
      const typeFromUrl = searchParams.get('type') as ArticleType
      if (orderFromUrl) {
        dispatch(articelPageActions.setOrder(orderFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articelPageActions.setSearch(searchFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articelPageActions.setSort(sortFromUrl));
      }
      if (typeFromUrl) {
        dispatch(articelPageActions.setType(typeFromUrl));
      }
      dispatch(articelPageActions.initState())
      dispatch(fetchArticlesList({}))
    }
  },
);
