// import { apiTheCocktailDB, apiTheMealDB } from '../../services';
import types from '../actions/types';

const RECIPES_INITIAL_STATE = {
  // isFetching: false,
  // recipes: [],
  mealRecipes: [],
  drinkRecipes: [],
  inProgressRecipes: null,
  inProgressRecipesDrink: null,
};

const recipes = (state = RECIPES_INITIAL_STATE, action) => {
  switch (action.type) {
  // case types.IS_FETCHING:
  //   return ({
  //     ...state,
  //     isFetching: true,
  //   });
  // case types.REQUEST_SUCCESS:
  //   return ({
  //     ...state,
  //     isFetching: false,
  //     drinkRecipes: [...action.payload.drinks],
  //   });
  case types.MEAL_RECIPES_RESULTS:
    return ({
      ...state,
      mealRecipes: [...action.payload],
    });
  case types.DRINK_RECIPES_RESULTS:
    return ({
      ...state,
      drinkRecipes: [...action.payload],
    });
  case types.START_RECIPE:
    return ({
      ...state,
      inProgressRecipes: action.recipe,
    });
  case types.START_RECIPE_DRINK:
    return ({
      ...state,
      inProgressRecipesDrink: action.recipe,
    });
  default:
    return state;
  }
};

export default recipes;
