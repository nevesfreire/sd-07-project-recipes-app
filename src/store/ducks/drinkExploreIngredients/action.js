import IngredientDrinkTypes from './type';

export const getIngredientDrink = (IngredientDrink) => ({
  type: IngredientDrinkTypes.INGREDIENTS_DRINKS,
  payload: IngredientDrink,
});

export const ExploreIngredientsDrink = () => async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getIngredientDrink(response));
};
