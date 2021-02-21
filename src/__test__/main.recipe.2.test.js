import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetch';
import meals from './mocks/meals';
import beefMeals from './mocks/beefMeals';
import drinks from './mocks/drinks';
import cocktailDrink from './mocks/cocktailDrinks';

global.fetch = jest.fn().mockImplementation(fetchMock);

const ELEVEN = 11;
const LAST_CARD = '12-recipe-card';
const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const COCKTAIL_CATEGORY_FILTER = 'Cocktail-category-filter';

describe('implement a toggle functionality on filter buttons', () => {
  it('should toggle filter buttons on meals page', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId(BEEF_CATEGORY_FILTER));

    await Promise.all(beefMeals.meals.map(async (beef, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(beef.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();

    userEvent.click(await screen.findByTestId(BEEF_CATEGORY_FILTER));

    await Promise.all(meals.meals.map(async (meal, index) => {
      if (index <= ELEVEN) {
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(await screen.findByTestId(`${index}-recipe-card`)).toBeTruthy();
        expect(await screen.findByTestId(`${index}-card-img`))
          .toHaveAttribute('src', meal.strMealThumb);
        expect(cardName.innerHTML).toBe(meal.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });

  it('should toggle filter buttons on drinks page', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId(COCKTAIL_CATEGORY_FILTER));

    await Promise.all(cocktailDrink.drinks.map(async (cocktail, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(cocktail.strDrink);
      }
    }));

    userEvent.click(await screen.findByTestId(COCKTAIL_CATEGORY_FILTER));

    await Promise.all(drinks.drinks.map(async (drink, index) => {
      if (index <= ELEVEN) {
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(await screen.findByTestId(`${index}-recipe-card`)).toBeTruthy();
        expect(await screen.findByTestId(`${index}-card-img`))
          .toHaveAttribute('src', drink.strMealThumb);
        expect(cardName.firstChild.data).toBe(drink.strDrink);
      }
    }));
  });
});

describe('implement a All filter buttons', () => {
  it('should dismiss filter buttons when All button clicked page', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId(BEEF_CATEGORY_FILTER));

    await Promise.all(beefMeals.meals.map(async (beef, i) => {
      if (i <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${i}-recipe-card`);
        const cardName = await screen.findByTestId(`${i}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(beef.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();

    userEvent.click(await screen.findByTestId('All-category-filter'));

    await Promise.all(meals.meals.map(async (meal, i) => {
      if (i <= ELEVEN) {
        const cardName = await screen.findByTestId(`${i}-card-name`);
        expect(await screen.findByTestId(`${i}-recipe-card`)).toBeTruthy();
        expect(await screen.findByTestId(`${i}-card-img`))
          .toHaveAttribute('src', meal.strMealThumb);
        expect(cardName.innerHTML).toBe(meal.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });

  it('should dismiss filter buttons when All button clicked page', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId(COCKTAIL_CATEGORY_FILTER));

    await Promise.all(cocktailDrink.drinks.map(async (cocktail, i) => {
      if (i <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${i}-recipe-card`);
        const cardName = await screen.findByTestId(`${i}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(cocktail.strDrink);
      }
    }));

    userEvent.click(await screen.findByTestId('All-category-filter'));

    await Promise.all(drinks.drinks.map(async (drink, i) => {
      if (i <= ELEVEN) {
        const cardName = await screen.findByTestId(`${i}-card-name`);
        expect(await screen.findByTestId(`${i}-recipe-card`)).toBeTruthy();
        expect(await screen.findByTestId(`${i}-card-img`))
          .toHaveAttribute('src', drink.strMealThumb);
        expect(cardName.firstChild.data).toBe(drink.strDrink);
      }
    }));
  });
});

describe('redirect user to recipe details page', () => {
  it('should redirect to dailts page', async () => {
    const { history } = renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('0-recipe-card'));

    const path = history.location.pathname;

    expect(path).toBe('/comidas/52977');
  });
});
