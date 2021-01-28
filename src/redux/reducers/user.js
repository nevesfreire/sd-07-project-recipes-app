import types from '../actions/types';

const LOGIN_INITIAL_STATE = {
  email: '',
};

const user = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case types.LOGIN_INFO:
    return ({
      ...state,
      email: action.payload,
    });
  default:
    return state;
  }
};

export default user;
