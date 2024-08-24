import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localSrorage';

interface loginByUserNameProps {
   username: string;
   password: string
}

export const loginByUserName = createAsyncThunk<User, loginByUserNameProps, { rejectValue: string }>(
  'login/loginByUserName',
  async({ username, password }, thunkApi) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', {
        username, password
      });
      if(!response.data) {
        throw  new Error();
      }
        
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      thunkApi.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch(e) {
      console.log(e);
      return thunkApi.rejectWithValue('Неверный логин или пароль');
    }
  })