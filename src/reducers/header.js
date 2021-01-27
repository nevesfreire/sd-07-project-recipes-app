import {
  RENDER_SEARCH_ICON,
} from '../actions/header';

const INITIAL_STATE = {
  hasSearchIcon: true,
}

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RENDER_SEARCH_ICON:
    return { ...state, hasSearchIcon: true };
  default:
    return state;
  }
};

export default header;