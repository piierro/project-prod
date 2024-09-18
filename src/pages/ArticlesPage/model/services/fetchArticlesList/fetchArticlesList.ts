import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { Comment } from 'entities/Comments';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user'
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
