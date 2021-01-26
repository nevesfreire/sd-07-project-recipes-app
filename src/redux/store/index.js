import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: reduxDevTools } = window;

const composeEnhancer = reduxDevTools || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
