import types from '../actions/types';

const RECIPES_INITIAL_STATE = {
  // isFetching: false,
  // recipes: [],
  mealRecipes: [],
  drinkRecipes: [],
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
  //     recipes: action.payload,
  //   });
  case types.MEAL_RECIPES_RESULTS:
    return ({
      ...state,
      mealRecipes: [...action.payload],
    });
  case types.DRINK_RECIPES_RESULTS:
    return ({
      ...state,
      drinkRecipes: [{ ...action.payload }],
    });
  default:
    return state;
  }
};

export default recipes;
