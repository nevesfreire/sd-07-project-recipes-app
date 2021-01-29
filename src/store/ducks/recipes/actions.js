import recipesTypes from './types';

export function getRecipes(recipes) {
  return { type: recipesTypes.GET_RECIPES, payload: recipes };
}

export function requestRecipes() {
  return { type: recipesTypes.REQUEST_RECIPES };
}

export function failedRequestRecipes(error) {
  return { type: recipesTypes.FAILED_REQUEST_RECIPES, payload: error };
}
