import { screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { renderWithRouter } from 'shared/config/tests/renderWithRouter/renderWithRouter';

describe('Sidebar', () => {
  test('test', () => {
    renderWithRouter(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  });

  // test('test toggle', () => {
  //   renderWithRouter(<Sidebar />)
  //   const toggleBtn = screen.getByTestId('sidebar-toggle');
  //   expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  //   fireEvent.click(toggleBtn);
  //   expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  // });
})