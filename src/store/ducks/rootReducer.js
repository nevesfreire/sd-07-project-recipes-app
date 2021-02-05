import { combineReducers } from 'redux';
import userReducer from './login';
import receitasDeBebidas from './receitasDeBebidas';
import receitasDeComidas from './receitasDeComidas';
import exploreDrinks from './exploreDrinks';
import exploreFoods from './exploreFoods';
import drinkExploreIngredients from './drinkExploreIngredients';
import foodExploreIngredients from './foodExploreIngredients';

export default combineReducers({
  receitasDeBebidas,
  receitasDeComidas,
  userReducer,
  exploreDrinks,
  exploreFoods,
  drinkExploreIngredients,
  foodExploreIngredients,
});
