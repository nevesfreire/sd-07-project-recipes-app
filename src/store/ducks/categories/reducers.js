import categoriesTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.categories;

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case categoriesTypes.REQUEST:
    return {
      ...state,
      data: [],
      isFetching: true,
    };
  case categoriesTypes.GET_CATEGORIES:
  {
    // put only 5 categories and map to strings
    const START_INDEX = 0;
    const END_INDEX = 5;
    return {
      ...state,
      isFetching: false,
      data: [...action.payload.slice(START_INDEX, END_INDEX)
        .map(({ strCategory }) => strCategory)],
    };
  }
  case categoriesTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

export default categories;
