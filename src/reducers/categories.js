import { ERROR, RECEIVED_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  categories: {},
  error: '',
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
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

export default categories;
