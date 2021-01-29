const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
const SUBMIT_CATEGORY = 'SUBMIT_ CATEGORY';
const CLEAR_CATEGORY = 'CLEAR_CATEGORY';

function filterReducer(state, action) {
  switch (action.type) {
  case SUBMIT_SEARCH:
    return { ...state, search: action.payload };
  case SUBMIT_CATEGORY:
    return { ...state, category: action.payload };
  case CLEAR_CATEGORY:
    return { ...state, category: '' };
  default:
    return state;
  }
}

export { SUBMIT_SEARCH, SUBMIT_CATEGORY, CLEAR_CATEGORY, filterReducer };
