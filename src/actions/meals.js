import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getRandomMeals,
} from '../services/mealsAPI';

export const REQUEST_MEALS = 'REQUEST_MEALS';
export const REQUEST_MEALS_SUCCESS = 'REQUEST_MEALS_SUCCESS';
export const REQUEST_MEALS_FAILURE = 'REQUEST_MEALS_FAILURE ';

const requestMeals = () => ({ type: 'REQUEST_MEALS' });

const setMealsSuccess = (meals) => (
  { type: 'REQUEST_MEALS_SUCCESS', meals });

const setMealsFailure = (error) => ({ type: 'REQUEST_MEALS_FAILURE', error });

export const fetchMealsByIngredient = (i) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByIngredient(i)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByName = (name) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByName(name)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByFirstLetter(firstLetter)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchRandomMeals = () => (dispatch) => {
  dispatch(requestMeals());
  return getRandomMeals()
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};
