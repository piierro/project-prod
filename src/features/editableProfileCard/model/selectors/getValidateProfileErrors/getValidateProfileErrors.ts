import { StateSchema } from 'app/providers/StoreProvider';

export const getValidateProfileErrors = (state: StateSchema): string[] | undefined => {
  return state.profile?.validateErrors;
};
    