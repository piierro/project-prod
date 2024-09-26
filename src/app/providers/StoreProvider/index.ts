import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type { StateSchema, ReduxStoreWithManager, ThunkConfig } from './config/StateSchema'

export {
  createReduxStore,
  StoreProvider,
  ReduxStoreWithManager,
}

export type {
  AppDispatch,
  StateSchema,
  ThunkConfig
}