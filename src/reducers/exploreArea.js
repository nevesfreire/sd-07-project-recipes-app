import { ERROR, RECEIVED_AREA, FILTERED_AREA } from '../actions';

const INITIAL_STATE = {
  areas: {},
  areasFiltered: {},
  error: '',
};

const exploreArea = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_AREA:
    return {
      ...state,
      areas: action.payload,
    };
    case FILTERED_AREA:
      return {
        ...state,
        areasFiltered: action.payload,
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

export default exploreArea;
