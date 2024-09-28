import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileRedonly } from './getProfileReadonly';

describe('getProfileRedonly.test', () => {
  test('should return readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true
      }
    }
    expect(getProfileRedonly(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileRedonly(state as StateSchema)).toEqual(undefined);
  });
});
