// Seguir os exemplos dos arquivos da pasta login.
import DrinksTypes from './types';

export const getDrinks = (drinks) => ({
  type: DrinksTypes.DRINKS,
  payload: drinks,
});

export const getDrinksCategories = (drinksCategories) => ({
  type: DrinksTypes.CATEGORIES,
  payload: drinksCategories,
});

export const loadDrinks = () => async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinks(response));
};

export const loadDrinksCategories = () => async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinksCategories(response));
};

export const getByIngredientsDrinks = (ingredient) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinks(response));
};

export const getByNameDrinks = (name) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinks(response));
};

export const getByLetterDrinks = (firstLetter) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinks(response));
};

export const getByCategorieDrinks = (categorie) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinks(response));
};
