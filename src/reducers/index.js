import { combineReducers } from 'redux';

import searchToggleReducer from './searchToggleReducer';
import loginReducer from './login';

const rootReducer = combineReducers({
  loginReducer,
  searchToggleReducer,
});

export default rootReducer;
