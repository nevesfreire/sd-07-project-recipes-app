import {
  getRecipe,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export function fetchRecipeById(type, recipeId) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getRecipeById(type, recipeId);
      dispatch(getRecipe(data[0]));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}

export function fetchRandomRecipe(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getRandom(type);
      dispatch(getRecipe(data[0]));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
