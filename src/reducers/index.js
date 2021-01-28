import { combineReducers } from 'redux';
import categories from './categories';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
  categories,
});

export default rootReducer;
