import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import loginReducer from './login';
import recipesReducer from './recipes';
import headerReducer from './header';
import recomendationsReducer from './details';
import ingredientsReducer from './ingredients';
import exploreAreaReducer from './exploreArea';

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
  headerReducer,
  categoriesReducer,
  recomendationsReducer,
  ingredientsReducer,
  exploreAreaReducer,
});

export default rootReducer;
