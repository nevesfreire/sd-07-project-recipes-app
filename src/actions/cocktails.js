import {
  getCocktailsByFirstLetter,
  getCocktailsByIngredient,
  getCocktailsByName,
  getRandomCocktails,
  getCocktailsDetailsById,
} from '../services/cocktailsAPI';

export const REQUEST_COCKTAILS = 'REQUEST_COCKTAILS';
export const REQUEST_COCKTAILS_SUCCESS = 'REQUEST_COCKTAILS_SUCCESS';
export const REQUEST_COCKTAILS_FAILURE = 'REQUEST_COCKTAILS_FAILURE ';

const requestCocktails = () => ({ type: 'REQUEST_COCKTAILS' });

const setCocktailsSuccess = (cocktails) => (
  { type: 'REQUEST_COCKTAILS_SUCCESS', cocktails });

const setCocktailsFailure = (error) => ({ type: 'REQUEST_COCKTAILS_FAILURE', error });

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

export const fetchCocktailsDetailsById = () => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsDetailsById()
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};
