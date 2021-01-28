export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_NAME = 'GET_NAME';
export const GET_FIRST_LETTER = 'GET_FIRST_LETTER';

export const getIngredients = (recipesByIngredients) => ({
  type: GET_INGREDIENTS,
  recipesByIngredients,
});

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getFirstLetter = (payload) => ({
  type: GET_FIRST_LETTER,
  payload,
});

async function fetchIngredients(ingredient) {
  const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
  const recipesWithIngredient = await responseAPI.json();
  return recipesWithIngredient;
}

export const resultIngredients = () => async (dispatch) => {
  const recipes = await fetchIngredients();
  dispatch(getIngredients(recipes));
};
