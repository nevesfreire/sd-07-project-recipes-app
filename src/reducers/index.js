import { combineReducers } from 'redux';
import login from './login';
import recipes from './recipes';
import categories from './categories';

const rootReducer = combineReducers({
  login,
  recipes,
  categories,
});

export default rootReducer;
