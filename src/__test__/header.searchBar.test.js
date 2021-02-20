import React from 'react';
import { screen, fireEvent, wait, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import fetchMock from './mocks/fetch';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH = 'ingredient-search-radio';
const NAME_SEARCH = 'name-search-radio';
const FIRST_LETTER_SEARCH = 'first-letter-search-radio';
const EXEC_SEARCH_BUTTON = 'exec-search-btn';
const SEARCH_TOP_BUTTON = 'search-top-btn';
const ELEVEN = 11;

window.alert = jest.fn().mockImplementation(() => {});
global.fetch = jest.fn().mockImplementation(fetchMock);

afterEach(() => cleanup());

describe('search bar should render the rights elements', () => {
  it('should render the search bar elements', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));

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
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(INGREDIENT_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'water');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=water');
  });

  it('should search for for name when radio is clicked', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(NAME_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Corba');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba');
  });

  it('should search for for first letter when radio is clicked', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('should show alert when typed more than one letters radio is clicked', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'aa');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(alert).toHaveBeenCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});

describe('should redirect to details page if only one recipe is shown', () => {
  it('should redirect to "/comidas" when only one food is shown', async () => {
    const { history } = renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    userEvent.click(screen.getByTestId(NAME_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Arrabiata');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await wait(() => expect(history.location.pathname).toBe('/comidas/52771'));
  });

  it('should redirect to "/bebidas" when only one drink is shown', async () => {
    const { history } = renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    userEvent.click(screen.getByTestId(NAME_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Aquamarine');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await wait(() => expect(history.location.pathname).toBe('/bebidas/178319'));
  });
});

describe('show 12 cards recipes when more than 12 cards is found', () => {
  it('should render 12 meals recipes', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(INGREDIENT_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'soup');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    meals.meals.forEach((_, index) => {
      const recipeCard = screen.findByTestId(`${index}-recipe-card`);
      if (index <= ELEVEN) {
        expect(recipeCard).toBeTruthy();
      }
    });
    expect(screen.queryByTestId('12-recipe-card')).toBeFalsy();
  });

  it('should render 12 drinks recipes', () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    fireEvent.click(screen.getByTestId(INGREDIENT_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'gin');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    drinks.drinks.forEach((_, index) => {
      const recipeDrink = screen.findByTestId(`${index}-recipe-card`);
      if (index <= ELEVEN) {
        expect(recipeDrink).toBeTruthy();
      }
    });
    expect(screen.queryByTestId('12-recipe-card')).toBeFalsy();
  });
});

describe('show alert when recipes not found', () => {
  it('should show alert when meal not found', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    userEvent.click(screen.getByTestId(NAME_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Corba');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(alert).toHaveBeenCalledWith(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  });

  it('should show alert when drink not found', () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BUTTON));
    userEvent.click(screen.getByTestId(NAME_SEARCH));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Aquamarine');
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    expect(alert).toHaveBeenCalledWith(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  });
});
