import authTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.auth;

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case authTypes.SIGNIN:
    return {
      ...state,
      user: {
        ...state.user,
        email: action.payload,
      },
    };
  default:
    return state;
  }
};

export default auth;
