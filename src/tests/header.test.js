import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import MainRecipes from '../pages/MainRecipes';

describe('9 - Implemente os elementos do header na tela principal de receitas, '
+ 'respeitando os atributos descritos no protótipo', () => {
  test('Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    const { getByTestId } = renderWithRouter(<MainRecipes />);
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil, um título e um'
+ ' ícone para a busca, caso exista no protótipo', () => {
  test('Não tem header na tela de login', () => {

  });
  test('O header tem os ícones'
  + ' corretos na tela de principal de receitas de comidas', () => {

  });
  test('O header tem os ícones corretos na tela de principal de receitas '
  + 'de bebidas', () => {

  });
  test('Não tem header na tela de detalhes de uma receita de comida', () => {

  });
  test('Não tem header na tela de detalhes de uma receita de bebida', () => {

  });
  test('Não tem header na tela de receita em processo de comida', () => {

  });
  test('Não tem header na tela de receita em processo de bebida', () => {

  });
  test('O header tem os ícones corretos na tela de explorar', () => {

  });
  test('O header tem os ícones corretos na tela de explorar comidas', () => {

  });
  test('O header tem os ícones corretos na tela de explorar bebidas', () => {

  });
  test('O header tem os ícones corretos na tela de '
  + 'explorar comidas por ingrediente', () => {

  });
  test('O header tem os ícones corretos na tela de explorar '
  + 'bebidas por ingrediente', () => {

  });
  test('O header tem os ícones corretos na tela de explorar comidas'
  + ' por local de origem', () => {

  });
  test('O header tem os ícones corretos na tela de perfil', () => {

  });
  test('O header tem os ícones corretos na tela de receitas feitas', () => {

  });
  test('O header tem os ícones corretos na tela de receitas favoritas', () => {

  });
});

describe('11 - Redirecione a pessoa usuária para a tela de perfil ao '
+ 'clicar no botão de perfil', () => {
  test('A mudança de tela ocorre corretamente', () => {

  });
});

describe('12 - Desenvolva o botão de busca que, ao ser clicado, a barra de'
+ ' busca deve aparecer. O mesmo serve para escondê-la', () => {
  test('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {

  });
  test('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {

  });
});
