// -------------------------------- BY INGREDIENT -----------------------------
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

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
// -------------------------------- BY NAME -----------------------------
export const GET_NAME = 'GET_NAME';

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
// -------------------------------- BY LETTER -----------------------------
export const GET_FIRST_LETTER = 'GET_FIRST_LETTER';

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
// -------------------------------- BY ID -----------------------------
export const GET_BY_ID = 'GET_BY_ID';

export const getByID = (recipeById) => ({
  type: GET_BY_ID,
  recipeById,
});

async function fetchByID(id) {
  const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const recipeByID = await responseAPI.json();
  return recipeByID;
}

export const resultID = (id) => async (dispatch) => {
  const recipe = await fetchByID(id);
  dispatch(getByID(recipe.meals[0]));
};
// -------------------------------- RANDOM -----------------------------
export const GET_RANDOM_FOOD = 'GET_RANDOM_FOOD';

export const getRandomFood = (recipesByRadomFood) => ({
  type: GET_RANDOM_FOOD,
  recipesByRadomFood,
});

async function fetchRandomFood() {
  const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const recipesByRandom = await responseAPI.json();
  return recipesByRandom;
}

export const resultRandomFood = () => async (dispatch) => {
  const recipe = await fetchRandomFood();
  dispatch(getRandomFood(recipe.meals));
};
// -------------------------------- CATEGORY -----------------------------
export const GET_CATEGORY_FOOD = 'GET_CATEGORY_FOOD';

export const getCategoryFood = (recipesByCategoryFood) => ({
  type: GET_CATEGORY_FOOD,
  recipesByCategoryFood,
});

async function fetchCategoryFood() {
  const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const recipesByCategory = await responseAPI.json();
  return recipesByCategory;
}

export const resultCategoryFood = () => async (dispatch) => {
  const recipe = await fetchCategoryFood();
  dispatch(getCategoryFood(recipe.meals));
};
