import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import MainRecipes from '../pages/MainRecipes';

describe('13 - Implemente os elementos da barra de busca respeitando os '
+ 'atributos descritos no protótipo', () => {
  test('Tem os data-testids tanto da barra de busca quanto '
  + 'de todos os radio-buttons', () => {
    const { getByTestId } = renderWithRouter(<MainRecipes />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
