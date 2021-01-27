const SUBMIT_EMAIL = 'SUBMIT_EMAIL';

function userReducer(state, action) {
  switch (action.type) {
  case SUBMIT_EMAIL:
    return { ...state, user: { email: action.payload } };
  default:
    return state;
  }
}

export { SUBMIT_EMAIL, userReducer };
