import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerComidas from './reducerComidas';
import reducerBebidas from './reducerBebidas';

const rootReducer = combineReducers({ reducerComidas, reducerBebidas });

const store = createStore(
  rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
