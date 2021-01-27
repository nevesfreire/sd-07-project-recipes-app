import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import MainRecipes from '../pages/MainRecipes';

describe('25 - Implemente os elementos da tela principal de receitas '
+ 'respeitando os atributos descritos no protótipo', () => {
  test('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    const { getByTestId } = renderWithRouter(<MainRecipes />);
    const magicNumber = 12;
    const zero = 0;
    for (let index = zero; index < magicNumber; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
});
