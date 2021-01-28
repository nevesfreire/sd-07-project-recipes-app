import { combineReducers } from 'redux';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
});

export default rootReducer;
