// Seguir os exemplos dos arquivos da pasta login.
import AuthTypes from './types';

export const getMeals = (meals) => ({
  type: AuthTypes.MEALS,
  payload: meals,
});

export const getMealsCategories = (mealsCategories) => ({
  type: AuthTypes.CATEGORIES,
  payload: mealsCategories,
});

export const loadMealsCategories = () => async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMealsCategories(response));
};

export const loadMeals = () => async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMeals(response));
};

export const getByIngredientsMeals = (ingredient) => async (dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMeals(response));
};

export const getByNameMeals = (name) => async (dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMeals(response));
};

export const getByLetterMeals = (firstLetter) => async (dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMeals(response));
};
