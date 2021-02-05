import IngredientFoodTypes from './type';
import initialState from '../initialState';

const INITIAL_STATE_FOOD_INGREDIENTS = initialState.foodExploreIngredients;

const IngredientFoodReducer = (state = INITIAL_STATE_FOOD_INGREDIENTS, action) => {
  switch (action.type) {
  case IngredientFoodTypes.INGREDIENTS_FOOD:
    return { ...state, foodIngredients: action.payload };
  default:
    return state;
  }
};

export default IngredientFoodReducer;
