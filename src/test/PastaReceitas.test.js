import React from 'react';
import { render } from '@testing-library/react';
import NovasReceitas from '../pages/receitas/NovasReceitas';
import NovasReceitasSalvas from '../pages/receitas/NovasReceitasSalvas';
import ReceitasFeitas from '../pages/receitas/ReceitasFeitas';

describe('Testando arquivo NovasReceitas.js', () => {
  test('Conteúdo da página NovasReceitas', () => {
    const { getByText } = render(<NovasReceitas />);
    const nomeDaPagina = getByText('Novas Receitas');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});

describe('Testando arquivo NovasReceitasSalvas.js', () => {
  test('Conteúdo da página NovasReceitasSalvas', () => {
    const { getByText } = render(<NovasReceitasSalvas />);
    const nomeDaPagina = getByText('Novas Receitas Salvas');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});

describe('Testando arquivo ReceitasFeitas.js', () => {
  test('Conteúdo da página ReceitasFeitas', () => {
    const { getByTestId } = render(<ReceitasFeitas />);
    const btnAll = getByTestId('filter-by-all-btn');
    const btnFood = getByTestId('filter-by-food-btn');
    const btnDrinks = getByTestId('filter-by-drink-btn');

    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });
});
