import {
  getRecipes,
  request,
  failedRequest,
  getCategories,
} from './actions';

import {
  getRecipes as getRecipesFromAPI,
  getCategories as getCategoriesFromAPI,
  getRecipesByCategory as getRecipesByCategoryFromAPI,
} from '../../../services/recipeAPI';

export function fetchRecipes(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await getRecipesFromAPI(type);
      dispatch(getRecipes(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchRecipesByCategory(type, category) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await getRecipesByCategoryFromAPI(type, category);
      dispatch(getRecipes(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchCategories(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await getCategoriesFromAPI(type);
      dispatch(getCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
