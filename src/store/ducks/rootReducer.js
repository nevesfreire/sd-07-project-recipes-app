import { combineReducers } from 'redux';

import areas from './areas';
import categories from './categories';
import ingredients from './ingredients';
import recipe from './recipe';
import recipes from './recipes';
import recomendations from './recomendations';

const rootReducer = combineReducers({
  areas,
  categories,
  ingredients,
  recipe,
  recipes,
  recomendations,
});

export default rootReducer;
