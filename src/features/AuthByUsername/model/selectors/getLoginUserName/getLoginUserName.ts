import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getLoginUserName = (state: StateSchema) => state?.loginForm?.username || '';