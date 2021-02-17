import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './ducks/rootReducer';
// import initialState from './ducks/initialState';
// import { loadState, saveState } from '../services/localStorage';

// const persistedState = loadState(initialState);

const store = createStore(
  rootReducer,
  /* persistedState, */
  compose(
    applyMiddleware(thunk),
    devToolsEnhancer(),
  ),
);

/* store.subscribe(() => {
  saveState(store.getState());
}); */

export default store;
