import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import Comidas from '../pages/Comidas';
import { Provider } from '../context/RecipeContext';

describe('Teste página de Comidas', () => {
  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    const props = { searched: [] };
    const { getByTestId, findByTestId, getByText } = renderWithRouter(
      <Provider value={ props }>
        <Comidas />
      </Provider>,
    );
    const allCat = getByTestId('All-category-filter');
    const comidastext = getByText('Comidas');

    expect(allCat).toBeInTheDocument();
    expect(comidastext).toBeInTheDocument();
  });
});
