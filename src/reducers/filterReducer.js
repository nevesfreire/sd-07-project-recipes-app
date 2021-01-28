const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

function filterReducer(state, action) {
  switch (action.type) {
  case SUBMIT_SEARCH:
    return { search: action.payload };
  default:
    return state;
  }
}

export { SUBMIT_SEARCH, filterReducer };
