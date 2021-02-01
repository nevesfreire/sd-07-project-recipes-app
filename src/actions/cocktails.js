import {
  getCocktailsByFirstLetter,
  getCocktailsByIngredient,
  getCocktailsByName,
  getRandomCocktails,
  getCocktailsByCategory,
  getCocktailsCategories,
} from '../services/cocktailsAPI';

export const REQUEST_COCKTAILS = 'REQUEST_COCKTAILS';
export const REQUEST_COCKTAILS_SUCCESS = 'REQUEST_COCKTAILS_SUCCESS';
export const REQUEST_COCKTAILS_FAILURE = 'REQUEST_COCKTAILS_FAILURE ';

export const REQUEST_COCKTAILS_CATEGORIES = 'REQUEST_COCKTAILS_CATEGORIES';
export const REQUEST_COCKTAILS_CATEGORIES_SUCCESS = 'REQUEST_COCKTAILS_CATEGORIES_SUCCESS';
export const REQUEST_COCKTAILS_CATEGORIES_FAILURE = 'REQUEST_COCKTAILS_CATEGORIES_FAILURE ';

const requestCocktails = () => ({ type: 'REQUEST_COCKTAILS' });

const setCocktailsSuccess = (cocktails) => (
  { type: 'REQUEST_COCKTAILS_SUCCESS', cocktails });

const setCocktailsFailure = (error) => ({ type: 'REQUEST_COCKTAILS_FAILURE', error });

const requestCocktailsCategories = () => ({ type: 'REQUEST_COCKTAILS' });

const setCocktailsCategoriesSuccess = (cocktails) => (
  { type: 'REQUEST_COCKTAILS_SUCCESS', cocktails });

const setCocktailsCategoriesFailure = (error) => (
  { type: 'REQUEST_COCKTAILS_FAILURE', error });

export const fetchCocktailsByIngredient = (i) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByIngredient(i)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsByName = (name) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByName(name)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByFirstLetter(firstLetter)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchRandomCocktails = () => (dispatch) => {
  dispatch(requestCocktails());
  return getRandomCocktails()
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsByCategory = (category) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByCategory(category)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsCategories = () => (dispatch) => {
  dispatch(requestCocktailsCategories());
  return getCocktailsCategories()
    .then((response) => dispatch(setCocktailsCategoriesSuccess(response)))
    .catch((error) => dispatch(setCocktailsCategoriesFailure(error)));
};
