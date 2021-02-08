import React from 'react';

import renderWithRouter from './renderWithRouter';
import { Provider } from '../context/RecipeContext';
import SearchBar from '../pages/Components/SearchBar';

describe('Teste página de Comidas', () => {
  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    const props = { searched: [] };
    const { getByTestId, getByText } = renderWithRouter(
      <Provider value={ props }>
        <SearchBar />
      </Provider>,
    );
    const radio1 = getByTestId('ingredient-search-radio');
    const radio2 = getByTestId('name-search-radio');
    const radio3 = getByTestId('first-letter-search-radio');
    const radio4 = getByTestId('exec-search-btn');
    const text = getByText('Search');

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio3).toBeInTheDocument();
    expect(radio4).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
