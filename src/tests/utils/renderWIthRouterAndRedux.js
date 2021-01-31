import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import rootReducer from '../../store/ducks/rootReducer';

export default function renderWithRouterAndRedux(component) {
  const mockStore = createStore(rootReducer);

  return {
    ...render(
      <Router history={ createMemoryHistory() }>
        <Provider store={ mockStore }>
          {component}
        </Provider>
      </Router>,
    ),
    mockStore,
  };
}
