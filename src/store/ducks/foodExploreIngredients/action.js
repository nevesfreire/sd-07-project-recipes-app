import IngredientFoodTypes from './type';

export const getIngredientFood = (IngredientFood) => ({
  type: IngredientFoodTypes.INGREDIENTS_FOOD,
  payload: IngredientFood,
});

export const ExploreIngredientsFood = () => async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getIngredientFood(response));
};
