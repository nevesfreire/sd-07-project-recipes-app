import {
  REQUEST_FOOD_RECIPES,
  LIST_FOOD_RECIPES,
  REQUEST_FOOD_FAILED,
  UPDATE_FOOD_IS_FETCHING,
  RESQUEST_ALL_CATEGORIES_MEALS,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  meals: [],
  categories: [],
  error: false,
};

const foodRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESQUEST_ALL_CATEGORIES_MEALS:
    return {
      ...state,
      categories: action.categories,
    };
  case REQUEST_FOOD_RECIPES:
    return { ...state, isFetching: true };
  case LIST_FOOD_RECIPES:
    return {
      ...state,
      meals: (!action.payload.meals) ? [] : action.payload.meals,
      isFetching: false,
    };
  case REQUEST_FOOD_FAILED:
    return { ...state, error: true };
  case UPDATE_FOOD_IS_FETCHING:
    return { ...state, isFetching: true };
  default:
    return state;
  }
};

export default foodRecipesReducer;
