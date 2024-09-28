import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileRedonly = (state: StateSchema) => state.profile?.readonly;