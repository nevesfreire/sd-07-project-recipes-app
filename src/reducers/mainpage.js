import {
  REQUEST_STARTED,
  MEALS_REQUEST,
  COCKTAILS_REQUEST,
  REQUEST_FAIL,
} from '../actions/mainpage';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  isLoading: false,
};

function mainpage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case MEALS_REQUEST:
    return { ...state, meals: action.meals, isLoading: false };
  case COCKTAILS_REQUEST:
    return { ...state, drinks: action.drinks, isLoading: false };
  case REQUEST_FAIL:
    return { ...state, meals: action.meals, isLoading: false };
  default:
    return state;
  }
}

export default mainpage;
