
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError'

describe('getLoginError', () => {
  test('should return the login error', () => {
    const state: StateSchema = {
      user: {}, // Пустая структура для пользователя, если она не нужна
      loginForm: { 
        username: 'testuser', 
        password: 'testpass', 
        isLoading: false, 
        error: 'Invalid credentials'
      },
    };
    expect(getLoginError(state)).toEqual('Invalid credentials');
  });

  test('should return undefined if no error is set', () => {
    const state: StateSchema = {
      user: {},
      loginForm: { 
        username: 'testuser', 
        password: 'testpass', 
        isLoading: false, 
        error: undefined // Ошибка равна undefined
      },
    };
    expect(getLoginError(state)).toBeUndefined();
  });
})