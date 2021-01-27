import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancer = (typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
/* eslint-enable */

export default store;
