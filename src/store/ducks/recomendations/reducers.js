import recomendationsTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.recomendations;

const recomendations = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case recomendationsTypes.REQUEST:
    return {
      ...state,
      data: [],
      isFetching: true,
    };
  case recomendationsTypes.GET_RECOMENDATIONS:
  {
    // put only 6 recipes recomendations
    const START_INDEX = 0;
    const END_INDEX = 6;
    return {
      ...state,
      isFetching: false,
      data: [...action.payload.slice(START_INDEX, END_INDEX)],
    };
  }
  case recomendationsTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

export default recomendations;
