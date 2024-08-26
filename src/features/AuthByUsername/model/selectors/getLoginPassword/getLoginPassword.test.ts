import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
  test('should return the password when it is set', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: 'testuser',
        password: 'testpass',
        isLoading: false,
        error: undefined,
      },
    };
    expect(getLoginPassword(state)).toBe('testpass');
  });

  test('should return an empty string when password is undefined', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: 'testuser',
        password: undefined,
        isLoading: false,
        error: undefined,
      },
    };
    expect(getLoginPassword(state)).toBe('');
  });

  test('should return an empty string when loginForm is undefined', () => {
    const state: StateSchema = {
      user: {},
      loginForm: undefined, 
    };
    expect(getLoginPassword(state)).toBe('');
  });

  test('should return an empty string when state is undefined', () => {
    expect(getLoginPassword(undefined)).toBe('');
  });
});