import React from 'react';
import { screen, fireEvent, wait, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import fetchMock from './mocks/fetch';

global.fetch = jest.fn().mockImplementation(fetchMock);

const ELEVEN = 11;

describe('the 12 cards are rendered in the pages', () => {
  // passei muito mal aqui, stack-overflow salvou minha noite de sono
  it('should render 12 meals cards', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    await Promise.all(meals.meals.map(async (meal, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const imageFood = await screen.findByTestId(`${index}-card-img`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(imageFood).toHaveAttribute('src', meal.strMealThumb);
        expect(recipeCard).toBeTruthy();
        expect(cardName.innerHTML).toBe(meal.strMeal);
      }
    }));
    const recipeCard = screen.queryByTestId('12-recipe-card');
    expect(recipeCard).toBeFalsy();
  });

  it('should render 12 drinks cards', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    await Promise.all(drinks.drinks.map(async (drink, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const imageDink = await screen.findByTestId(`${index}-card-img`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(imageDink).toHaveAttribute('src', drink.strDrinkThumb);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(drink.strDrink);
      }
    }));
    const recipeCard = screen.queryByTestId('12-recipe-card');
    expect(recipeCard).toBeFalsy();
  });
});
