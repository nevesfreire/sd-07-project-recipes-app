import {
  RENDER_SEARCH_ICON,
  CHANGE_PAGE_TITLE,
} from '../actions/header';

const INITIAL_STATE = {
  hasSearchIcon: false,
  pageTitle: '',
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RENDER_SEARCH_ICON:
    return { ...state, hasSearchIcon: true };
  case CHANGE_PAGE_TITLE:
    return { ...state, pageTitle: action.title };
  default:
    return state;
  }
};

export default header;
