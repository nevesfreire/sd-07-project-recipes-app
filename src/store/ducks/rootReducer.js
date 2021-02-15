import { combineReducers } from 'redux';
import userReducer from './login';
import receitasDeBebidas from './receitasDeBebidas';
import receitasDeComidas from './receitasDeComidas';
import detalhesDaReceitaBebida from './getDetailedDrink';
import detalhesDaReceitaComida from './getDetailedMeal';
import exploreDrinks from './exploreDrinks';
import exploreFoods from './exploreFoods';
import drinkExploreIngredients from './drinkExploreIngredients';
import foodExploreIngredients from './foodExploreIngredients';
import doneRecipesReducer from './doneRecipes';

export default combineReducers({
  receitasDeBebidas,
  receitasDeComidas,
  userReducer,
  detalhesDaReceitaBebida,
  detalhesDaReceitaComida,
  exploreDrinks,
  exploreFoods,
  drinkExploreIngredients,
  foodExploreIngredients,
  doneRecipesReducer,
});
