import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { getLoginUserName } from './getLoginUserName';

describe('getLoginUserName', () => {
  test('should return username if it is present in the state', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: 'testUser',
        password: '',
        isLoading: false,
        error: undefined,
      },
    };
        
    expect(getLoginUserName(state)).toBe('testUser');
  });

  test('should return an empty string if username is not present', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: '',
        password: '',
        isLoading: false,
        error: undefined,
      },
    };

    expect(getLoginUserName(state)).toBe('');
  });

  test('should return an empty string if state itself is undefined', () => {
    const state: StateSchema | undefined = undefined;

    expect(getLoginUserName(state)).toBe('');
  });
});