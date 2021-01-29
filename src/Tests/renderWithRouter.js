import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';

function renderWithRouter(
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <Provider>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
  };
}

export default renderWithRouter;
