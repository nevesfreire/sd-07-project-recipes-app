import types from './types';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

export const test = () => ({ teste: 'teste' });
