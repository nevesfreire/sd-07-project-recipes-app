import initialState from '../initialState';
import recipesTypes from './types';

const INITIAL_STATE = initialState.recipes;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case recipesTypes.REQUEST_RECIPES:
    return {
      ...state,
      isFetching: true,
      error: '',
    };
  case recipesTypes.GET_RECIPES:
    return {
      ...state,
      isFetching: false,
      data: [...action.payload],
      error: '',
    };
  case recipesTypes.FAILED_REQUEST_RECIPES:
    return {
      ...state,
      isFetching: false,
      data: [],
      error: action.payload,
    };
  default:
    return state;
  }
};

export default recipes;
