import {
  SEARCH_TOGGLE,
} from '../actions';

const INITIAL_STATE = false;

const searchToggleReducer = (state = INITIAL_STATE, action) => {
  if (action.type === SEARCH_TOGGLE) {
    return action.toggle;
  }
  return state;
};

export default searchToggleReducer;
