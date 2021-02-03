import React from 'react';
// import { render, screen } from '@testing-library/react';
import ComidasID from './index';
import { renderWithRouterAndStore } from '../../test/testConfig';

test('loads items eventually', async () => {
  const { getByText } = renderWithRouterAndStore(<ComidasID />);
  const element = getByText(/Ingredientes:/);

  // Wait for page to update with query text
  expect(element).toBeInTheDocument();
});
