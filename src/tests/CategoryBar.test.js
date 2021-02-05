import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Comidas from '../pages/Comidas';

const searchButtonTestId = 'search-top-btn';

describe('Testa o componente CategoryBar', () => {
  it('Testa se o componente tem o input ', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const searchButton = getByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.tagName).toBe('INPUT');
  });

  it('Testa se o componente tem o box ingredient', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const searchButton = getByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const ingredientBox = getByTestId('ingredient-search-radio');
    expect(ingredientBox).toBeInTheDocument();
    expect(ingredientBox.tagName).toBe('INPUT');
  });

  it('Testa se o component tem a opcao name', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const searchButton = getByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const nameBox = getByTestId('name-search-radio');
    expect(nameBox).toBeInTheDocument();
    expect(nameBox.tagName).toBe('INPUT');
  });

  it('Testa se o componente tem a opcao firstLetter', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const searchButton = getByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const firstLetterBox = getByTestId('first-letter-search-radio');
    expect(firstLetterBox).toBeInTheDocument();
    expect(firstLetterBox.tagName).toBe('INPUT');
  });

  it('Testa se o componente tem o botao de search', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const searchButton = getByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    const findButton = getByTestId('exec-search-btn');
    expect(findButton).toBeInTheDocument();
    expect(findButton.tagName).toBe('BUTTON');
  });
});
