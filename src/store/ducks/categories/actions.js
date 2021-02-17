import categoriesTypes from './types';

export function getCategories(categories) {
  return { type: categoriesTypes.GET_CATEGORIES, payload: categories };
}

export function request() {
  return { type: categoriesTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: categoriesTypes.FAILED_REQUEST, payload: error };
}
