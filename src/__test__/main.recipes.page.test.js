import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import fetchMock from './mocks/fetch';
import mealCategories from './mocks/mealCategories';
import drinkCategories from './mocks/drinkCategories';
import beefMeals from './mocks/beefMeals';
import breakfastMeals from './mocks/breakfastMeals';
import chickenMeals from './mocks/chickenMeals';
import dessertMeals from './mocks/dessertMeals';
import goatMeals from './mocks/goatMeals';
import ordinaryDrinks from './mocks/ordinaryDrinks';
import cocktailDrinks from './mocks/cocktailDrinks';
import milkDrinks from './mocks/milkDrinks';
import otherDrinks from './mocks/otherDrinks';
import cocoaDrinks from './mocks/cocoaDrinks';

global.fetch = jest.fn().mockImplementation(fetchMock);

const FIVE = 5;
const ELEVEN = 11;
const LAST_CARD = '12-recipe-card';

describe('the 12 cards are rendered in the pages', () => {
  // passei muito mal aqui, stack-overflow salvou minha noite de sono
  it('should render 12 meals cards', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

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
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
  it('should render 12 drinks cards', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    await Promise.all(drinks.drinks.map(async (drink, index) => {
      if (index <= ELEVEN) {
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(await screen.findByTestId(`${index}-recipe-card`)).toBeTruthy();
        expect(await screen.findByTestId(`${index}-card-img`))
          .toHaveAttribute('src', drink.strDrinkThumb);
        expect(cardName.firstChild.data).toBe(drink.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});
describe('test if all category buttons are rendered', () => {
  it('should render all meals category', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    await Promise.all(mealCategories.meals.map(async (meal, index) => {
      if (index < FIVE) {
        const categoryButton = await screen.findByTestId(
          `${meal.strCategory}-category-filter`,
        );
        expect(categoryButton).toBeInTheDocument();
        expect(categoryButton.innerHTML).toBe(meal.strCategory);
      } else {
        const categoryButton = screen.queryByTestId(
          `${meal.strCategory}-category-filter`,
        );
        expect(categoryButton).not.toBeInTheDocument();
      }
    }));
  });
  it('should render all drinks category', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    await Promise.all(drinkCategories.drinks.map(async (drink, index) => {
      if (index < FIVE) {
        const categoryButton = await screen.findByTestId(
          `${drink.strCategory}-category-filter`,
        );
        expect(categoryButton).toBeInTheDocument();
        expect(categoryButton.innerHTML).toBe(drink.strCategory);
      } else {
        const categoryButton = screen.queryByTestId(
          `${drink.strCategory}-category-filter`,
        );
        expect(categoryButton).not.toBeInTheDocument();
      }
    }));
  });
});
describe('render the meals recipes by category', () => {
  it('should render all the beef categories', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('Beef-category-filter'));
    await Promise.all(beefMeals.meals.map(async (beef, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(beef.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the breakfast categories', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('Breakfast-category-filter'));
    await Promise.all(breakfastMeals.meals.map(async (breakfast, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(breakfast.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the chicken categories', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('Chicken-category-filter'));
    await Promise.all(chickenMeals.meals.map(async (chicken, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(chicken.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the dessert categories', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('Dessert-category-filter'));
    await Promise.all(dessertMeals.meals.map(async (dessert, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(dessert.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the goat categories', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(await screen.findByTestId('Goat-category-filter'));
    await Promise.all(goatMeals.meals.map(async (goat, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(goat.strMeal);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
});
describe('render the drinks recipes by category', () => {
  it('should render all the ordinary drinks categories', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId('Ordinary Drink-category-filter'));
    await Promise.all(ordinaryDrinks.drinks.map(async (ordinary, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(ordinary.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the cocktail categories', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId('Cocktail-category-filter'));
    await Promise.all(cocktailDrinks.drinks.map(async (cocktail, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(cocktail.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the milk categories', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId('Milk / Float / Shake-category-filter'));
    await Promise.all(milkDrinks.drinks.map(async (milk, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(milk.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the other drinks categories', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId('Other/Unknown-category-filter'));
    await Promise.all(otherDrinks.drinks.map(async (other, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(other.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
  it('should render all the cocoa categories', async () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(await screen.findByTestId('Cocoa-category-filter'));

    await Promise.all(cocoaDrinks.drinks.map(async (cocoa, index) => {
      if (index <= ELEVEN) {
        const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
        const cardName = await screen.findByTestId(`${index}-card-name`);
        expect(recipeCard).toBeTruthy();
        expect(cardName.firstChild.data).toBe(cocoa.strDrink);
      }
    }));
    expect(screen.queryByTestId(LAST_CARD)).toBeFalsy();
  });
});
