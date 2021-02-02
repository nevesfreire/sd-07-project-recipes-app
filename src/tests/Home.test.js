import React from 'react';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
// import fetchMock from 'fetch-mock-jest';
import renderWithRouterAndRedux from './utils/renderWIthRouterAndRedux';
import { Home } from '../pages';
// import mockFetchMealsData from './utils/dataFetchMeals';

afterEach(cleanup);
const NUM_TOTAL_RECIPES = 12;
const NUM_ZERO = 0;

describe('25 - Implemente os elementos da tela principal de receitas', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    const history = createMemoryHistory();
    const route = '/comidas';
    history.push(route);
    renderWithRouterAndRedux(<Home />, history);

    // fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/search.php?s=',
    //   mockFetchMealsData);

    for (let index = NUM_ZERO; index < NUM_TOTAL_RECIPES; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`))
        .toBeInTheDocument();
    }

    expect(screen.getByTestId('12-recipe-card'))
      .not.toBeInTheDocument();
    expect(screen.getByTestId('12-recipe-card'))
      .not.toBeInTheDocument();
    expect(screen.getByTestId('12-card-name'))
      .not.toBeInTheDocument();
  });
});
