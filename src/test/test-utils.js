import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Header from '../components/header/Header';

const reducer = store;

function render(
  ui,
  {
    initialState,
    store1 = reducer,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={ store1 }>{ children }</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
