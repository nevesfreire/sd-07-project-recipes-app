import {
  getRecipes,
  requestRecipes,
  failedRequestRecipes,
} from './actions';

import mapMealAndDrinkToRecipe from '../../../services/util';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
const BASE_COCKTAIL_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const END_POINT_SEARCH = '/search.php?s=';

export default function fetchRecipes(type) {
  return async (dispatch) => {
    try {
      dispatch(requestRecipes());
      const GET_RECIPES_URL = (type.includes('comidas')
        ? BASE_MEAL_URL : BASE_COCKTAIL_URL) + END_POINT_SEARCH;
      const response = await fetch(GET_RECIPES_URL);
      const result = await response.json();
      const data = type.includes('comidas')
        ? mapMealAndDrinkToRecipe(result.meals)
        : mapMealAndDrinkToRecipe(result.drinks);
      dispatch(getRecipes(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequestRecipes(error.message));
    }
  };
}
