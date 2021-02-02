const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
const SUBMIT_CATEGORY = 'SUBMIT_ CATEGORY';
const SUBMIT_AREA = 'SUBMIT_AREA';
const CLEAR_AREA = 'CLEAR_AREA';
const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';

function filterReducer(state, action) {
  switch (action.type) {
  case SUBMIT_SEARCH:
    return { ...state, search: action.payload };
  case SUBMIT_CATEGORY:
    return { ...state, search: '', category: action.payload };
  case SUBMIT_AREA:
    return { ...state, area: action.payload };
  case CLEAR_AREA:
    return { ...state, area: '' };
  case CLEAR_ALL_FILTERS:
    return { ...state, area: '', category: '', search: '' };
  default:
    return state;
  }
}

export {
  SUBMIT_SEARCH,
  SUBMIT_CATEGORY,
  SUBMIT_AREA,
  CLEAR_ALL_FILTERS,
  CLEAR_AREA,
  filterReducer,
};
