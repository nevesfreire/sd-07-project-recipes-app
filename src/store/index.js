import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './ducks/rootReducer';
import initialState from './ducks/initialState';
import { loadState, saveState } from '../services/localStorage';

/* eslint-disable no-underscore-dangle */
const composeEnhancer = (typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistedState = loadState(initialState);

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunk)),
);
/* eslint-enable */

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
