import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fastFood from './reducer';

const rootReducer = combineReducers({ fastFood });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
