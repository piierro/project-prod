import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { StateSchemaKey, StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterAnMount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { 
    children, 
    reducers, 
    removeAfterAnMount = true
  } = props;
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer)
      }
    })

    return () => {
      if(removeAfterAnMount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
 
  return (
    <>
      {children}
    </>
  )
}