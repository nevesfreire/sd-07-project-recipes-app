import recipeTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.recipe;

const recipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case recipeTypes.REQUEST:
    return {
      ...state,
      data: {},
      isFetching: true,
    };
  case recipeTypes.GET_RECIPE:
    return {
      ...state,
      isFetching: false,
      data: { ...action.payload },
    };
  case recipeTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: {},
    };
  default:
    return state;
  }
};

export default recipe;
