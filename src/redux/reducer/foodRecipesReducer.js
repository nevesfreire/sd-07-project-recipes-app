import {
  REQUEST_FOOD_RECIPES,
  LIST_FOOD_RECIPES,
  REQUEST_FOOD_FAILED,
  UPDATE_FOOD_IS_FETCHING,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  meals: [],
  error: false,
};

const foodRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
