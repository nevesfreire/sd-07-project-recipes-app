import {
  REQUEST_DRINK_RECIPES,
  LIST_DRINK_RECIPES,
  REQUEST_DRINK_FAILED,
  UPDATE_DRINK_IS_FETCHING,
  RESQUEST_ALL_CATEGORIES_DRINKS,
  FILTERED_DRINK_BY_CATEGORY,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  drinks: [],
  categories: [],
  error: false,
};

const drinkRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESQUEST_ALL_CATEGORIES_DRINKS:
    return {
      ...state,
      categories: action.categories,
    };
  case FILTERED_DRINK_BY_CATEGORY:
    return {
      ...state,
      drinks: (!action.drinkFilteredByCategory) ? [] : action.drinkFilteredByCategory,
      isFetching: false,
    };
  case REQUEST_DRINK_RECIPES:
    return { ...state, isFetching: true };
  case LIST_DRINK_RECIPES:
    return {
      ...state,
      drinks: !action.payload.drinks ? [] : action.payload.drinks,
      isFetching: false,
    };
  case REQUEST_DRINK_FAILED:
    return { ...state, error: true };
  case UPDATE_DRINK_IS_FETCHING:
    return { ...state, isFetching: true };
  default:
    return state;
  }
};

export default drinkRecipesReducer;
