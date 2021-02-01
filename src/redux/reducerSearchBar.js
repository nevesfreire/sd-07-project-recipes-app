import { SHOW_HIDE_SEARCHBAR } from './actionsSearchBar';

const INITIAL_STATE = {
  toggle: false,
};

function reducerSearchBar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SHOW_HIDE_SEARCHBAR:
    return {
      ...state,
      toggle: !state.toggle,
    };
  default:
    return state;
  }
}

export default reducerSearchBar;
