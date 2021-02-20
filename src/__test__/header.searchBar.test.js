import React from 'react';
import { screen, fireEvent, wait, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import { oneMeal, oneDrink } from './mocks/oneMeal';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import { emptyDrinks, emptyMeals } from './mocks/empty';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH = 'ingredient-search-radio';
const NAME_SEARCH = 'name-search-radio';
const FIRST_LETTER_SEARCH = 'first-letter-search-radio';
const EXEC_SEARCH_BUTTON = 'exec-search-btn';
const SEARCH_TOP_BUTTON = 'search-top-btn';
const ELEVEN = 11;

describe('search bar should render the rights elements', () => {
  it('should render the search bar elements', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientSearch = screen.getByTestId(INGREDIENT_SEARCH);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    const firstLetterSearch = screen.getByTestId(FIRST_LETTER_SEARCH);
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });
});

describe('test if fetch is called with the rights endpoints', () => {
  it('should search for for ingredients when radio is clicked', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    fireEvent.click(searchTopButton);
    const ingredientSearch = screen.getByTestId(INGREDIENT_SEARCH);
    fireEvent.click(ingredientSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'water');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    fireEvent.click(execSearchButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=water');
  });

  it('should search for for name when radio is clicked', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    fireEvent.click(searchTopButton);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    fireEvent.click(nameSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Corba');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    fireEvent.click(execSearchButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba');
  });

  it('should search for for first letter when radio is clicked', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    fireEvent.click(searchTopButton);
    const firstLetterSearch = screen.getByTestId(FIRST_LETTER_SEARCH);
    fireEvent.click(firstLetterSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'a');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    fireEvent.click(execSearchButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('should show alert when typed more than one letters radio is clicked', () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    fireEvent.click(searchTopButton);
    const firstLetterSearch = screen.getByTestId(FIRST_LETTER_SEARCH);
    fireEvent.click(firstLetterSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'aa');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    fireEvent.click(execSearchButton);

    expect(alert).toHaveBeenCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});

describe('should redirect to details page if only one recipe is shown', () => {
  it('should redirect to "/comidas" when only one food is shown', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(oneMeal),
      },
    ));

    const { history } = renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchTopButton);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    userEvent.click(nameSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Corba');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    userEvent.click(execSearchButton);

    await wait(() => expect(history.location.pathname).toBe('/comidas/52977'));
  });

  it('should redirect to "/bebidas" when only one drink is shown', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(oneDrink),
      },
    ));

    const { history } = renderWithRouter(<App />, { route: '/bebidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchTopButton);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    userEvent.click(nameSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Aquamarine');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    userEvent.click(execSearchButton);

    await wait(() => expect(history.location.pathname).toBe('/bebidas/178319'));
  });
});

describe('show 12 cards recipes when more than 12 cards is found', () => {
  it('should render 12 meals recipes', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(meals),
      },
    ));

    renderWithRouter(<App />, { route: '/comidas' });
    meals.meals.forEach(async (_, index) => {
      const recipeCard = await waitForElement(
        () => screen.getByTestId(`${index}-recipe-card`),
      );
      if (index <= ELEVEN) {
        expect(recipeCard).toBeInTheDocument();
      } else {
        expect(recipeCard).not.toBeInTheDocument();
      }
    });
  });

  it('should render 12 drinks recipes', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(drinks),
      },
    ));

    renderWithRouter(<App />, { route: '/bebidas' });
    drinks.drinks.forEach(async (_, index) => {
      const recipeDrink = await waitForElement(
        () => screen.getByTestId(`${index}-recipe-card`),
      );
      if (index <= ELEVEN) {
        expect(recipeDrink).toBeInTheDocument();
      } else {
        expect(recipeDrink).not.toBeInTheDocument();
      }
    });
  });
});

describe('show alert when recipes not found', () => {
  it('should show alert when meal not found', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(emptyMeals),
      },
    ));

    renderWithRouter(<App />, { route: '/comidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchTopButton);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    userEvent.click(nameSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Corba');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    userEvent.click(execSearchButton);

    expect(alert).toHaveBeenCalledWith(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  });

  it('should show alert when drink not found', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve(emptyDrinks),
      },
    ));

    renderWithRouter(<App />, { route: '/bebidas' });

    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchTopButton);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    userEvent.click(nameSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Aquamarine');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    userEvent.click(execSearchButton);

    expect(alert).toHaveBeenCalledWith(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  });
});
