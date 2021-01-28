export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_NAME = 'GET_NAME';
export const GET_FIRST_LETTER = 'GET_FIRST_LETTER';

export const getIngredients = (recipesByIngredients) => ({
  type: GET_INGREDIENTS,
  recipesByIngredients,
});

async function fetchIngredients(ingredient) {
  const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const recipesWithIngredient = await responseAPI.json();
  return recipesWithIngredient;
}

export const resultIngredients = (ingredient) => async (dispatch) => {
  const recipes = await fetchIngredients(ingredient);
  dispatch(getIngredients(recipes.meals));
};

export const getName = (recipesByName) => ({
  type: GET_NAME,
  recipesByName,
});

async function fetchName(name) {
  const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const recipesWithName = await responseAPI.json();
  return recipesWithName;
}

export const resultName = (name) => async (dispatch) => {
  const recipes = await fetchName(name);
  dispatch(getName(recipes.meals));
};

export const getLetter = (recipesWithLetter) => ({
  type: GET_FIRST_LETTER,
  recipesWithLetter,
});

async function fetchLetter(letter) {
  const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const recipesWithLetter = await responseAPI.json();
  return recipesWithLetter;
}

export const resultLetter = (letter) => async (dispatch) => {
  const recipes = await fetchLetter(letter);
  dispatch(getLetter(recipes.meals));
};
