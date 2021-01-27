import React from 'react';
// import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import MainRecipes from '../pages/MainRecipes';

describe('19 - Implemente os elementos do menu inferior respeitando '
+ 'os atributos descritos no protótipo', () => {
  test('Tem os data-testids footer, drinks-bottom-btn, '
  + 'explore-bottom-btn e food-bottom-btn', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});

describe('20 - Posicione o menu inferior de forma fixa e apresente 3 '
+ 'ícones: um para comidas, um para bebidas e outro para exploração', () => {
  test('O menu inferior deve ficar fixado sempre ao final da página', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    expect(getByTestId('footer').className).toBe('footer');
  });
  test('Apresenta os ícones corretos', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    expect(getByTestId('food-bottom-btn').src).toBe('http://localhost/mealIcon.svg');
    expect(getByTestId('explore-bottom-btn').src).toBe('http://localhost/exploreIcon.svg');
    expect(getByTestId('drinks-bottom-btn').src).toBe('http://localhost/drinkIcon.svg');
  });
});

describe('21 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  test('Não tem footer na tela de login', () => {
    const { container } = renderWithRouter(<Login />);
    expect(container.querySelector('footer')).not.toBeInTheDocument();
  });
  test('Tem footer na tela de principal de receitas de comidas', () => {
    const { getByTestId } = renderWithRouter(<MainRecipes />);
    expect(getByTestId('footer')).toBeInTheDocument();
  });
  test('Tem footer na tela de principal de receitas de bebidas', () => {

  });
  test('Não tem footer na tela de detalhes de uma receita de comida', () => {

  });
  test('Não tem footer na tela de detalhes de uma receita de bebida', () => {

  });
  test('Não tem footer na tela de receita em processo de comida', () => {

  });
  test('Não tem footer na tela de receita em processo de bebida', () => {

  });
  test('Tem footer na tela de explorar', () => {

  });
  test('Tem footer na tela de explorar comidas', () => {

  });
  test('Tem footer na tela de explorar bebidas', () => {

  });
  test('Tem footer na tela de explorar comidas por ingrediente', () => {

  });
  test('Tem footer na tela de explorar bebidas por ingrediente', () => {

  });
  test('Tem footer na tela de explorar comidas por local de origem', () => {

  });
  test('Tem footer na tela de perfil', () => {

  });
  test('Não tem footer na tela de receitas feitas', () => {

  });
  test('Não tem footer na tela de receitas favoritas', () => {

  });
});

describe('22 - Redirecione a pessoa usuária para uma lista de '
+ 'cocktails ao clicar no ícone de bebidas', () => {
  test('Redireciona para a rota bebidas', () => {

  });
});

describe('23 - Redirecione a pessoa usuária para a tela de explorar ao '
+ 'clicar no ícone de exploração', () => {
  test('Redireciona para a rota explorar', () => {

  });
});

describe('24 - Redirecione a pessoa usuárua para uma lista de'
+ ' comidas ao clicar no ícone de comidas', () => {
  test('Redireciona para a rota comidas', () => {

  });
});
