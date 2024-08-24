import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
  };

  const store = configureStore({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })

  return store;
}

export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];