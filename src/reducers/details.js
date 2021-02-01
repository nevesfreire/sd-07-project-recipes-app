import { ERROR, RECEIVED_DETAILS } from '../actions';

const INITIAL_STATE = {
  recomendations: {},
  error: '',
};

const recomendations = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_DETAILS:
    return {
      ...state,
      recomendations: action.payload,
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

export default recomendations;
