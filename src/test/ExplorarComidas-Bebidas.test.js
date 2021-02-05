import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ExplorarComidasIngredientes from '../pages/comidas/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from '../pages/bebidas/ExplorarBebidasIngredientes';
import BebidasExplorar from '../pages/bebidas/BebidasExplorar';
import ExplorarComidas from '../pages/comidas/ExplorarComidas';

describe('Testando arquivo ExplorarComidasIngredientes.js', () => {
  test('Conteúdo da página ExplorarComidasIngredientes', () => {
    const { getByText } = render(<ExplorarComidasIngredientes />);
    const nomeDaPagina = getByText('Explorar Ingredientes');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});

describe('Testando arquivo ExplorarBebidasIngredientes.js', () => {
  test('Conteúdo da página ExplorarBebidasIngredientes', () => {
    const { getByText } = render(<ExplorarBebidasIngredientes />);
    const nomeDaPagina = getByText('Explorar Ingredientes');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});

describe('Testando arquivo ExplorarComidas.js', () => {
  test('Conteúdo da página ExplorarComidas', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <ExplorarComidas />
      </Router>,
    );
    const ingredientBtn = getByTestId('explore-by-ingredient');
    expect(ingredientBtn).toBeInTheDocument();
    fireEvent.click(ingredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
});

describe('Testando arquivo BebidasExplorar.js', () => {
  test('Conteúdo da página BebidasExplorar', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <BebidasExplorar />
      </Router>,
    );
    const ingredientBtn = getByTestId('explore-by-ingredient');
    expect(ingredientBtn).toBeInTheDocument();
    fireEvent.click(ingredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
});
