import React from 'react';
import { render, screen } from '@testing-library/react';
import TiendaGApp from './TiendaGApp';

test('renders learn react link', () => {
  render(<TiendaGApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
