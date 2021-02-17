import recipesTypes from './types';

export function getRecipes(recipes) {
  return { type: recipesTypes.GET_RECIPES, payload: recipes };
}

export function request() {
  return { type: recipesTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: recipesTypes.FAILED_REQUEST, payload: error };
}

export function setFilter(origin, type, term = '') {
  return { type: recipesTypes.SET_FILTER, payload: { origin, type, term } };
}

/* export function favoriteRecipe(recipe) {
  return { type: recipesTypes.FAVORITE_RECIPE, payload: recipe };
}

export function unFavoriteRecipe(recipeId) {
  return { type: recipesTypes.UNFAVORITE_RECIPE, payload: recipeId };
}

export function checkIngredient(checked, ingredient, recipeId, recipeType) {
  return {
    type: recipesTypes.CHECK_INGREDIENT,
    payload: { checked, ingredient, recipeId, recipeType },
  };
}

export function doneRecipe(recipe) {
  return { type: recipesTypes.DONE_RECIPE, payload: recipe };
}
*/
