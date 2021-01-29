import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Component Header', () => {
  test('whether the profile button appears', () => {
    renderWithRouter(<Header name="Comidas" button />);

    const profileButton = screen.getByTestId('profile-top-btn');

    expect(profileButton).toBeInTheDocument();
  });

  test('whether the title is rendered', () => {
    renderWithRouter(<Header name="Comidas" button />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const expectedValue = screen.getByText(/comidas/i);
    expect(expectedValue).toBeInTheDocument();
  });

  test('whether the search button appears', () => {
    renderWithRouter(<Header name="Comidas" button />);

    const searchButton = screen.getByTestId('search-top-btn');

    expect(searchButton).toBeInTheDocument();
  });

  test('whether the search button not appears', () => {
    renderWithRouter(<Header name="Explorar" button={ false } />);

    const searchButton = screen.getAllByRole('img');

    expect(searchButton.length).toBe(1);
  });
});
