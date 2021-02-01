import { combineReducers } from 'redux';
import categories from './categories';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';
import recomendationsReducer from './details';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
  categories,
  recomendationsReducer,
});

export default rootReducer;
