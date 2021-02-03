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
