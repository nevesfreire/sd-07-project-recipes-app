import ingredientsTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.ingredients;

const ingredients = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ingredientsTypes.REQUEST:
    return {
      ...state,
      data: [],
      isFetching: true,
    };
  case ingredientsTypes.GET_INGREDIENTS:
    return {
      ...state,
      isFetching: false,
      data: [...action.payload],
    };
  case ingredientsTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

export default ingredients;
