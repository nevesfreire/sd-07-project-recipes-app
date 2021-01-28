import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Explore } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

const dataTestIdFood = 'explore-food';
const dataTestIdDrinks = 'explore-drinks';

describe('A tela Explorar deve ter', () => {
  it('dois elementos de link na tela', () => {
    const { getByTestId } = renderWithRouter(<Explore />);

    const foodButton = getByTestId(dataTestIdFood);
    const drinkButton = getByTestId(dataTestIdDrinks);

    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('dois links com os textos de: Explorar Comidas e Explorar Bebidas', () => {
    const { getByTestId } = renderWithRouter(<Explore />);

    const foodText = 'Explorar Comidas';
    const drinksText = 'Explorar Bebidas';

    const foodButton = getByTestId(dataTestIdFood);
    const drinkButton = getByTestId(dataTestIdDrinks);

    expect(foodButton.text).toBe(foodText);
    expect(drinkButton.text).toBe(drinksText);
  });

  it('o link Explorar Comidas deve levar para página Explorar Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);

    const foodButton = getByTestId(dataTestIdFood);
    fireEvent.click(foodButton);
    const { pathname } = history.location;

    const explorarComidas = '/explorar/comidas';

    expect(pathname).toBe(explorarComidas);
  });

  it('o link Explorar Bebidas deve levar para página Explorar Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);

    const foodButton = getByTestId(dataTestIdDrinks);
    fireEvent.click(foodButton);
    const { pathname } = history.location;

    const explorarBebidas = '/explorar/bebidas';

    expect(pathname).toBe(explorarBebidas);
  });
});
