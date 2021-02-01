import {
  REQUEST_COCKTAILS,
  REQUEST_COCKTAILS_SUCCESS,
  REQUEST_COCKTAILS_FAILURE,
  REQUEST_COCKTAILS_CATEGORIES,
  COCKTAILS_CATEGORIES_SUCCESS,
  COCKTAILS_CATEGORIES_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  cocktails: [],
  cocktailsCategories: [],
  isFetchingCocktails: false,
  isFetchingCategories: false,
  error: '',
};

export default function cocktails(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COCKTAILS:
    return { ...state, isFetchingCocktails: true };
  case REQUEST_COCKTAILS_SUCCESS:
    return {
      ...state,
      isFetchingCocktails: false,
      cocktails: [...action.cocktails.drinks],
    };
  case REQUEST_COCKTAILS_FAILURE:
    return { ...state, isFetchingCocktails: false, error: action.error };
  case REQUEST_COCKTAILS_CATEGORIES:
    return { ...state, isFetchingCategories: true };
  case COCKTAILS_CATEGORIES_SUCCESS:
    return {
      ...state,
      isFetchingCategories: false,
      cocktailsCategories: [...action.drinks],
    };
  case COCKTAILS_CATEGORIES_FAILURE:
    return { ...state, isFetchingCategories: false, error: action.error };
  default:
    return state;
  }
}
