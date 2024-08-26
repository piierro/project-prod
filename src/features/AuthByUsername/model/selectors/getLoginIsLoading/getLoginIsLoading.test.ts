import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
  test('should return true when isLoading is true', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: 'testuser',
        password: 'testpass',
        isLoading: true,
        error: undefined,
      },
    };
    expect(getLoginIsLoading(state)).toBe(true);
  });

  test('should return false when isLoading is false', () => {
    const state: StateSchema = {
      user: {},
      loginForm: {
        username: 'testuser',
        password: 'testpass',
        isLoading: false,
        error: undefined,
      },
    };
    expect(getLoginIsLoading(state)).toBe(false);
  });
});