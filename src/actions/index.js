import { SEARCH_TOGGLE } from './actionSearchToggle';

const USER_EMAIL = 'USER_EMAIL';

export default {
  SEARCH_TOGGLE,
  USER_EMAIL,
};

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});
