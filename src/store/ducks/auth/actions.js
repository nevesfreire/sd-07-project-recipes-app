import authTypes from './types';

const signIn = (userEmail) => ({
  type: authTypes.SIGNIN,
  payload: userEmail,
});

export default signIn;
