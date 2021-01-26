import { EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL:
      return {
        email: action.email,
      };
    default:
      return state;
  }
};

export default login;
