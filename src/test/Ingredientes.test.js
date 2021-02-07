import React from 'react';
import { render } from '@testing-library/react';
// import ComidasIngredientes from '../pages/comidas/ComidasIngredientes';
import BebidasIngredientes from '../pages/bebidas/BebidasIngredientes';
import ComidasArea from '../pages/comidas/ComidasArea';
import NotFound from '../pages/bebidas/NotFound';

describe('Testando arquivo ComidasIngredientes.js e BebidasIngredientes.js', () => {
  // test('Conteúdo da página ComidasIngredientes', () => {
  //   const { getByTestId } = render(<ComidasIngredientes />);
  //   const profileBtn = getByTestId('profile-top-btn');
  //   const profileimgSrc = 'http://localhost/profileIcon.svg';
  //   expect(profileBtn).toBeInTheDocument();
  //   expect(getByRole('img').src).toBe(profileimgSrc);
  // });

  test('Conteúdo da página BebidasIngredientes', () => {
    const { getAllByText } = render(<BebidasIngredientes />);
    const nomeDaPagina = getAllByText('Explorar Ingredientes');
    const DOIS = 2;
    expect(nomeDaPagina.length).toBe(DOIS);
  });
});

describe('Testando arquivo ComidasArea.js e NotFound.js', () => {
  test('Conteúdo da página ComidasArea', () => {
    const { getByText } = render(<ComidasArea />);
    const nomeDaPagina = getByText('Comidas Area');
    expect(nomeDaPagina).toBeInTheDocument();
  });

  test('Conteúdo da página NotFound', () => {
    const { getByText } = render(<NotFound />);
    const nomeDaPagina = getByText('Not Found');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});
