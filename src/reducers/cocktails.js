import { REQUEST_COCKTAILS, REQUEST_COCKTAILS_SUCCESS, REQUEST_COCKTAILS_FAILURE } from '../actions';

const INITIAL_STATE = {
  cocktails: [],
  isFetching: false,
  error,
};

export default function cocktails(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COCKTAILS:
    return { ...state, isFetching: true };
  case REQUEST_COCKTAILS_SUCCESS:
    return { ...state, isFetching: false, cocktails: [...action.cocktails.drinks] };
  case REQUEST_COCKTAILS_FAILURE:
    return { ...state, isFetching: false, error };
  default:
    return state;
  }
};
