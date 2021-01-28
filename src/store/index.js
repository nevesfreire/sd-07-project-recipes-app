<<<<<<< HEAD
// Este arquivo nao recebe nenhuma outra informacao.
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
=======
import { createStore } from 'redux';
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
import rootReducer from './ducks/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));

export default store;
