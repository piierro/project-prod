import { render } from "@testing-library/react";
import { StoreProvider } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode } from "react";
import { MemoryRouter } from 'react-router-dom';

export interface renderWithRouterOptions {
  route?: string;
  // initialState?: DeepPartial<StateSchema>
}

export function renderWithRouter(component: ReactNode, options: renderWithRouterOptions = {}) {
  const {
    route = '/',
    // initialState
  } = options;

  return render(
    // <StoreProvider initialState={initialState as StateSchema}>
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
    // </StoreProvider>
  )
}