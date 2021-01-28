import { ERROR, RECEIVED_RECIPES } from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  recipes: [],
  error: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_RECIPES:
    return {
      ...state,
      isFetching: false,
      recipes: action.payload,
    };
  case ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipes;
