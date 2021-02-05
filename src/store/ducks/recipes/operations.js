import {
  getRecipes,
  request,
  failedRequest,
  getCategories,
  setRecipeDetails,
  setAreas,
  setIngredients,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export function fetchRecipesByFilter(
  pathType,
  filterType = recipeAPI.FILTER_TYPES.NAME,
  filterTerm = '',
) {
  return async (dispatch) => {
    try {
      dispatch(request());
      let data;
      switch (filterType) {
      case recipeAPI.FILTER_TYPES.CATEGORY:
        data = await recipeAPI.getRecipesByCategory(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.INGREDIENT:
        data = await recipeAPI.getRecipesByIngredient(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.FIRST_LETTER:
        data = await recipeAPI.getRecipesByFirstLetter(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.AREA:
        console.log('pendente filtrar por area');
        break;
      case recipeAPI.FILTER_TYPES.NAME:
        data = await recipeAPI.getRecipesByName(pathType, filterTerm);
        break;
      default:
        data = await recipeAPI.getRecipes(pathType);
      }
      dispatch(getRecipes(data));
    } catch (error) {
      console.log('fetchRecipesByFilter: ', pathType, filterType, filterTerm);
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchCategories(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getCategories(type);
      dispatch(getCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchRecipeDetails(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getRandom(type);
      dispatch(setRecipeDetails(data[0]));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchAreas(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getAreas(type);
      dispatch(setAreas(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchIngredients(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getIngredientList(type);
      dispatch(setIngredients(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchRecipesByIngredient(type, ingredient) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getRecipesByIngredient(type, ingredient);
      dispatch(getRecipes(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
