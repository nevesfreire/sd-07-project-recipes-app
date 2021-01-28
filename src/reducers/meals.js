import {
  REQUEST_MEALS,
  REQUEST_MEALS_SUCCESS,
  REQUEST_MEALS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  isFetching: false,
  error: '',
};

export default function meals(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_MEALS:
    return { ...state, isFetching: true };
  case REQUEST_MEALS_SUCCESS:
    return { ...state, isFetching: false, meals: [...action.meals.drinks] };
  case REQUEST_MEALS_FAILURE:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
}
