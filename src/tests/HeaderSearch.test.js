import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import HeaderSearch from '../components/HeaderSearch';

describe('Component HeaderSearch', () => {
  test('if there is an search field', () => {
    renderWithRouter(<HeaderSearch />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
  test('if there are three radios button', () => {
    renderWithRouter(<HeaderSearch />);

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    expect(ingredientSearch).toBeInTheDocument();

    const nameSearch = screen.getByTestId('name-search-radio');
    expect(nameSearch).toBeInTheDocument();

    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterSearch).toBeInTheDocument();

    const maxLength = 3;
    const allRadios = screen.getAllByRole('radio');
    expect(allRadios.length).toBe(maxLength);
  });

  test('if there is an search button', () => {
    renderWithRouter(<HeaderSearch />);

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
  });
});
