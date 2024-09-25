import { StateSchema } from 'app/providers/StoreProvider';
import { getValidateProfileErrors } from './getValidateProfileErrors';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';


describe('getValidateProfileErrors.test', () => {
  test('should return errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.INCORRECT_USER_DATA
        ]
      }
    }
    expect(getValidateProfileErrors(state as StateSchema)).toEqual(
      [
        ValidateProfileError.INCORRECT_AGE,
        ValidateProfileError.INCORRECT_USER_DATA
      ]
    );
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getValidateProfileErrors(state as StateSchema)).toEqual(undefined);
  });
});
