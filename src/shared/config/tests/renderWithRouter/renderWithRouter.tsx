import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReactNode } from "react";
import { MemoryRouter } from 'react-router-dom';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const {
    route = '/',
    initialState,
  } = options;

  return render(
    <StoreProvider initialState={initialState}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </StoreProvider>
  );
}