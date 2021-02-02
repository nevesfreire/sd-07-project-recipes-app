import * as API from '../services/foodApi';
import * as DRINKAPI from '../services/drinkApi';

const SIGN_IN = 'SING_IN';
const LOADING = 'LOADING';
const OK = 'OK';
const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
const RETRIEVE_DRINK_RECIPES = 'RETRIEVE_DRINK_RECIPES';
const SET_SEARCH = 'SET_SEARCH';
const RETRIEVE_FOOD_DETAILS = 'RETRIEVE_FOOD_DETAILS';
const RETRIEVE_DRINK_DETAILS = 'RETRIEVE_DRINK_DETAILS';

export const signIn = (email) => ({
  type: SIGN_IN,
  email,
});

export const setForSearchBar = (setter) => ({
  type: SET_SEARCH,
  setter,
});

//-------------------------------------------------

const storageRecipes = (value) => ({
  type: RETRIEVE_RECIPES,
  value,
});

const storageFoodDetails = (value) => ({
  type: RETRIEVE_FOOD_DETAILS,
  value,
});

const storageDrinkDetails = (value) => ({
  type: RETRIEVE_DRINK_DETAILS,
  value,
});

const storageDrinkRecipes = (value) => ({
  type: RETRIEVE_DRINK_RECIPES,
  value
});

export const retrieveNameRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await API.searchFoodNameRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrievefirstLetterRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await API.searchFoodFirstWordDrinkRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveIngredientRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await API.searchFoodByMainIngredientsRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkNameRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await DRINKAPI.searchDrinkNameRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkFirstLetterRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await DRINKAPI.searchDrinkFirstLetterRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkIngredientRecipes = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await DRINKAPI.searchDrinkByMainIngredientsRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)))
    .catch(() => dispatch(storageDrinkRecipes({ drinks: null })));
  dispatch({ type: OK });
};
export const retrieveDrinkDetailsById = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await DRINKAPI.searchDrinkByIdRequest(value)
    .then((result) => dispatch(storageDrinkDetails(result)))
    .catch(() => dispatch(storageDrinkDetails({ drinks: null })));
  dispatch({ type: OK });
};

export const retrieveFoodDetailsById = (value) => async (dispatch) => {
  dispatch({ type: LOADING });
  await API.searchFoodByIdRequest(value)
    .then((result) => dispatch(storageFoodDetails(result)))
    .catch(() => dispatch(storageFoodDetails({ drinks: null })));
  dispatch({ type: OK });
};
