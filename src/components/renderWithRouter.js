import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <Provider store={ store }>{component}</Provider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
