import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import rootReducer from '../../store/ducks/rootReducer';

export default function renderWithRouterAndRedux(
  component,
  history = createMemoryHistory(),
) {
  const mockStore = createStore(rootReducer, applyMiddleware(thunk));

  return {
    ...render(
      <Router history={ history }>
        <Provider store={ mockStore }>
          {component}
        </Provider>
      </Router>,
    ),
    mockStore,
  };
}
