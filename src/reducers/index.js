import { combineReducers } from 'redux';
import searchToggleReducer from './searchToggleReducer';

const rootReducer = combineReducers({
  searchToggleReducer,
});

export default rootReducer;
