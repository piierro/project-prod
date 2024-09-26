import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReactNode } from "react";
import { MemoryRouter } from 'react-router-dom';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const {
    route = '/',
    initialState,
    asyncReducers
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        {component}
      </StoreProvider>
    </MemoryRouter>
  );
}