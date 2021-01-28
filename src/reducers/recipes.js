import { ERROR, RECEIVED_RECIPES, CHANGE_FETCH } from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  recipes: [],
  error: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_FETCH:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVED_RECIPES:
    return {
      ...state,
      isFetching: false,
      recipes: action.payload,
    };
  case ERROR:
    return {
      ...state,
      // isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipes;
