import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';
import recomendationsReducer from './details';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
  categoriesReducer,
  recomendationsReducer,
});

export default rootReducer;
