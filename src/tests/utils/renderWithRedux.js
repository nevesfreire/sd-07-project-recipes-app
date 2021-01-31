import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import auth from '../../store/ducks/auth';
import recipes from '../../store/ducks/recipes';

const renderWithRedux = (
  component,
  { initialState,
    store = createStore(combineReducers({ auth, recipes }),
      initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
});
export default renderWithRedux;
