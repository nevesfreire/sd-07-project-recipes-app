import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import MainRecipes from '../pages/MainRecipes';
import SearchBar from '../components/SearchBar';

beforeEach(() => cleanup());
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
  describe('14 - Posicione a barra logo abaixo do header e implemente 3 radio'
  + ' buttons: Ingrediente, Nome e Primeira letra', () => {
    test('Se o radio selecionado for Ingrediente, a busca na API é feita'
    + ' corretamente pelo ingrediente', () => {

    });
    test('Se o radio selecionado for Nome, a busca na API é feita '
    + 'corretamente pelo nome', () => {

    });
    test('Se o radio selecionado for Primeira letra, a busca na API '
    + 'é feita corretamente pelo primeira letra', () => {

    });
    test('Se o radio selecionado for Primeira letra e a busca na API for '
    + 'feita com mais de uma letra, deve-se exibir um alert', () => {

    });
  });
  describe('15 - Busque na API de comidas caso a pessoa esteja na página de comidas e na '
  + 'de bebidas caso esteja na de bebidas', () => {
    test('Na tela de bebidas, se o radio selecionado for Ingrediente, a busca na API '
    + 'é feita corretamente pelo ingrediente', () => {

    });
    test('Na tela de bebidas, se o radio selecionado for Nome'
    + ', a busca na API é feita corretamente pelo nome', () => {

    });
    test('Na tela de bebidas, se o radio selecionado for Primeira letra, a busca na '
    + 'API é feita corretamente pelo primeira letra', () => {

    });
    test('Na tela de bebidas, se o radio selecionado for Primeira letra e a busca'
    + ' na API for feita com mais de uma letra, deve-se exibir um alert', () => {

    });
  });
  describe('16 - Redirecione para a tela de detalhes da receita caso apenas uma receita '
  + 'seja encontrada, com o ID da mesma na URL', () => {
    test('Caso apenas uma comida seja encontrada, deve-se ir para sua'
    + ' rota de detalhes', () => {

    });
    test('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de '
    + 'detalhes', () => {

    });
  });
  describe('17 - Mostre as receitas em cards caso mais '
  + 'de uma receita seja encontrada', () => {
    test('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras', () => {

    });
    test('Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras', () => {

    });
  });
  describe('18 - Exiba um alert caso nenhuma receita seja encontrada', () => {
    test('Caso nenhuma comida seja encontrada o alert deve ser exibido', () => {
      const { getByTestId } = renderWithRouter(<SearchBar search="meals" />);
      fireEvent.click(getByTestId('name-search-radio'));
      fireEvent.change(getByTestId('search-input'), { target: { value: 'asd' } });
      fireEvent.click(getByTestId('exec-search-btn'));
    });
  });
});
