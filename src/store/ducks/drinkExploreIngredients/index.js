import IngredientDrinkTypes from './type';
import initialState from '../initialState';

const INITIAL_STATE_DRINKS_INGREDIENTS = initialState.drinkExploreIngredients;

const IngredientDrinkReducer = (state = INITIAL_STATE_DRINKS_INGREDIENTS, action) => {
  switch (action.type) {
  case IngredientDrinkTypes.INGREDIENTS_DRINKS:
    return { ...state, drinkIngredients: action.payload };
  default:
    return state;
  }
};

export default IngredientDrinkReducer;
