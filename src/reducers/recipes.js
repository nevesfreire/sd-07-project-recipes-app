import { ERROR, RECEIVED_RECIPES } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  error: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  case ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipes;
