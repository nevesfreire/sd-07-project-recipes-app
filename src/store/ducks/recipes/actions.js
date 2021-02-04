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

export function setFilterByCategory(categoryFilter) {
  return { type: recipesTypes.SET_FILTER_BY_CATEGORY, payload: categoryFilter };
}

export function setFilterByIngredient(ingredientFilter) {
  return { type: recipesTypes.SET_FILTER_BY_INGREDIENT, payload: ingredientFilter };
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
