import ingredientsTypes from './types';

export function getIngredients(ingredients) {
  return { type: ingredientsTypes.GET_INGREDIENTS, payload: ingredients };
}

export function request() {
  return { type: ingredientsTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: ingredientsTypes.FAILED_REQUEST, payload: error };
}
