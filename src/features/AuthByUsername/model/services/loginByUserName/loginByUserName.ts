import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '@/entities/User';
import { User } from '@/entities/User/model/types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localSrorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = 
createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post<User>('/login', authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Неверный логин или пароль');
    }
  },
);
