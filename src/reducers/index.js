import { combineReducers } from 'redux';
import login from './login';
import recipes from './recipes';
import header from './header';

const rootReducer = combineReducers({
  login,
  recipes,
  header,
});

export default rootReducer;
