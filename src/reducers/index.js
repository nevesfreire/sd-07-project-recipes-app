import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
  categoriesReducer,
});

export default rootReducer;
