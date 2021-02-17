import recipeTypes from './types';

export function getRecipe(recipe) {
  return { type: recipeTypes.GET_RECIPE, payload: recipe };
}

export function request() {
  return { type: recipeTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: recipeTypes.FAILED_REQUEST, payload: error };
}
