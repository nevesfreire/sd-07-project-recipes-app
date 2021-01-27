import {
  REQUEST_DRINK_RECIPES,
  LIST_DRINK_RECIPES,
  REQUEST_DRINK_FAILED,
  UPDATE_DRINK_IS_FETCHING,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  drinks: [],
  error: false,
};

const drinkRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_DRINK_RECIPES:
    return { ...state, isFetching: true };
  case LIST_DRINK_RECIPES:
    return {
      ...state,
      drinks: (!action.payload.drinks) ? [] : action.payload.drinks,
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
