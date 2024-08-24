import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer
  }

  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}

// // Определите AppDispatch
// export type AppDispatch = typeof store.dispatch;

// // Определите RootState
// export type RootState = ReturnType<typeof rootReducer>;

// // Переопределите хуки
// export const useDispatch = () => useReduxDispatch<AppDispatch>();
// export const useSelector: TypedUseSelectorHook<RootState> = useSelector;
