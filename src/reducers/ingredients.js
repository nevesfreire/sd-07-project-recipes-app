import { ERROR, SET_INGREDIENT } from '../actions';

const INITIAL_STATE = {
  error: '',
  selectedIngredient: '',
};

const ingredients = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_INGREDIENT:
    return {
      ...state,
      selectedIngredient: action.payload,
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

export default ingredients;
