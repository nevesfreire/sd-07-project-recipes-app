import areasTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.areas;

const areas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case areasTypes.REQUEST:
    return {
      ...state,
      data: [],
      isFetching: true,
    };
  case areasTypes.GET_AREAS:
    return {
      ...state,
      isFetching: false,
      data: [...action.payload],
    };
  case areasTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

export default areas;
