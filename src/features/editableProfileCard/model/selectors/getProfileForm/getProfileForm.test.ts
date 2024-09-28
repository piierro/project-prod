import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  test('should return error', () => {
    const data = {
      first: "Kuros",
      lastName: "M",
      age: 23,
      city: "Moscow",
      username: "admin",
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data
      }
    }
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
