import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import auth from '../../store/ducks/auth';
import recipes from '../../store/ducks/recipes';
// import initialState from '../../store/ducks/initialState';

const renderWithRedux = (
  component,
  { initialState, store = createStore(combineReducers({ auth, recipes }), initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
export default renderWithRedux;
