import React from 'react';
import { screen, fireEvent, wait, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import fetchMock from './mocks/fetch';

global.fetch = jest.fn().mockImplementation(fetchMock);

afterEach(() => cleanup());

describe('the 12 cards are rendered in the pages', () => {
  it('should render 12 meals cards', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    meals.meals.forEach(async (meal, index) => {
      const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
      const imageFood = await screen.findByTestId(`${index}-card-img`);
      const cardName = await screen.findByTestId(`${index}-card-name`);
      console.log(imageFood);
      expect(recipeCard).toBeTruthy();
      expect(imageFood).toHaveAttribute('src', meal.strMealThumb);
      expect(cardName.innerHTML).not.toBe(meal.strMeal);
    });
    expect(screen.queryByTestId('12-recipe-card')).toBeFalsy();
  });
});

describe('the 12 cards are rendered in the pages', () => {
  it('should render 12 drinks cards', () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    drinks.drinks.forEach(async (drink, index) => {
      const drinkCard = await screen.findByTestId(`${index}-recipe-card`);
      const imageDrink = await screen.findByTestId(`${index}-card-img`);
      expect(drinkCard).toBeTruthy();
      expect(imageDrink).toHaveAttribute('src', drink.strDrinkThumb);
    });
    expect(screen.queryByTestId('12-recipe-card')).toBeFalsy();
    // cleanup();
  });
});
