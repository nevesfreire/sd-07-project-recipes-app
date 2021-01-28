import { SEARCH_INPUT } from '../actions';

const INITIAL_STATE = {
  searchInput: '',
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_INPUT:
    return {
      searchInput: action.value,
    };
  default:
    return state;
  }
};

export default header;
