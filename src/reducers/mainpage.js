import {
  MEALS_REQUEST_STARTED,
  MEALS_REQUEST,
  MEALS_REQUEST_FAIL,
} from '../actions/mainpage';

const INITIAL_STATE = {
  meals: [],
  isLoading: false,
};

function mainpage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_REQUEST_STARTED:
    return { ...state, isLoading: true };
  case MEALS_REQUEST:
    return { ...state, meals: action.meals.meals, isLoading: false };
  case MEALS_REQUEST_FAIL:
    return { ...state, meals: action.meals.meals, isLoading: false };
  default:
    return state;
  }
}

export default mainpage;
