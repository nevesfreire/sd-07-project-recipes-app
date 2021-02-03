import React from 'react';
import renderWithRouter from '../renderWithRouter';
import ComidasProcesso from '../pages/ComidasProcesso';
import BebidasProcesso from '../pages/BebidasProcesso';
import ComidasDetalhes from '../pages/ComidasDetalhes';
import { fireEvent } from '@testing-library/react';

describe('Testa Receitas inProgress.js', () => {
  it('A pagina de login é renderizada ao carregar a aplicação no path de URL /', () => {
    const id = 52948;
    const { history, getByTestId } = renderWithRouter(<ComidasDetalhes match={ { params: { id } } } />);
    const { pathname } = history.location;
    const fowardToInProgressButton = getByTestId('start-recipe-btn');

    fireEvent.click(fowardToInProgressButton);

    expect
  });
});
