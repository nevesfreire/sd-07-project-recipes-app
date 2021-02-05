import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Explorar from '../pages/Explorar';

const EXPLORE_FOOD = 'explore-food';
const EXPLORE_DRINK = 'explore-drinks';

afterEach(cleanup);

describe('Testes tela Explorar.js', () => {
  test('A tela deve possuir os elementos explorar respeitando os atributos descritos',
    () => {
      const { getByTestId } = render(<Explorar />);
      const food = getByTestId(EXPLORE_FOOD);
      const drink = getByTestId(EXPLORE_DRINK);
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
    });
  test('A tela deve possuir dois botãoes: "explorar comidas" e "explorar bebidas"',
    () => {
      const { getByTestId } = render(<Explorar />);
      const food = getByTestId(EXPLORE_FOOD);
      const drink = getByTestId(EXPLORE_DRINK);
      expect(food.type).toBe('button');
      expect(drink.type).toBe('button');
    });
});
