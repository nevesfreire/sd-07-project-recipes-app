import { ERROR, RECEIVED_DETAILS, COPY_BUTTON } from '../actions';

const INITIAL_STATE = {
  recomendations: {},
  copy: '',
  error: '',
};

const recomendations = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_DETAILS:
    return {
      ...state,
      recomendations: action.payload,
    };
  case COPY_BUTTON:
    return {
      ...state,
      copy: action.value,
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
