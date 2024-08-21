import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from 'react-router-dom';

export interface renderWithRouterOptions {
  route?: string
}

export function renderWithRouter(component: ReactNode, options: renderWithRouterOptions = {}) {
  const {
    route = '/',
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
        {component}
    </MemoryRouter>
  )
}