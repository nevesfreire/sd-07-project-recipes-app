import recipesTypes from './types';

export function getRecipes(recipes) {
  return { type: recipesTypes.GET_RECIPES, payload: recipes };
}

export function getCategories(categories) {
  return { type: recipesTypes.GET_CATEGORIES, payload: categories };
}

export function request() {
  return { type: recipesTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: recipesTypes.FAILED_REQUEST, payload: error };
}

export function setFilter(type, term = '') {
  return { type: recipesTypes.SET_FILTER, payload: { type, term } };
}

export function favoriteRecipe(recipe) {
  return { type: recipesTypes.FAVORITE_RECIPE, payload: recipe };
}

export function unFavoriteRecipe(recipeId) {
  return { type: recipesTypes.UNFAVORITE_RECIPE, payload: recipeId };
}

export function setRecipeDetails(recipe) {
  return { type: recipesTypes.SET_RECIPE_DETAILS, payload: recipe };
}

export function setAreas(areas) {
  return { type: recipesTypes.SET_AREAS, payload: areas };
}

export function setIngredients(ingredients) {
  return { type: recipesTypes.SET_AREAS, payload: ingredients };
}

export function getRecomendations(recipes) {
  return { type: recipesTypes.GET_RECOMENDATIONS, payload: recipes };
}

export function updateFromLS(stateLS) {
  return { type: recipesTypes.UPDATE_FROM_LS, payload: stateLS };
}
