import { ERROR, RECEIVED_CATEGORIES, SET_CATEGORY } from '../actions';

const INITIAL_STATE = {
  categories: {},
  error: '',
  selectedCategory: '',
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
    };
  case SET_CATEGORY:
    return {
      ...state,
      selectedCategory: action.payload,
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
