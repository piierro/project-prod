import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type { 
  StateSchema, 
  ReduxStoreWithManager, 
  ThunkConfig, 
  StateSchemaKey 
} from './config/StateSchema'

export {
  createReduxStore,
  StoreProvider,
  ReduxStoreWithManager,
  StateSchemaKey
}

export type {
  AppDispatch,
  StateSchema,
  ThunkConfig
}