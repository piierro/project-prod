import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { $api } from 'shared/api/api'
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
  initialState?: StateSchema,
  navigate?: (to: To, options?: NavigateOptions) =>  void
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer
  };

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddeleware => getDefaultMiddeleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigate
        }
      }
    })
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store;
}

export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];