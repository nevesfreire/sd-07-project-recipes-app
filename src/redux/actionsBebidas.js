// -------------------------------- BY INGREDIENT -----------------------------
export const GET_INGREDIENTS_DRINK = 'GET_INGREDIENTS_DRINK';

export const getIngredientsBebida = (recipesByIngredientsBebida) => ({
  type: GET_INGREDIENTS_DRINK,
  recipesByIngredientsBebida,
});

async function fetchIngredientsBebida(ingredientBebida) {
  const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientBebida}`);
  const recipesWithIngredient = await responseAPI.json();
  return recipesWithIngredient;
}

export const resultIngredientsBebida = (ingredientBebida) => async (dispatch) => {
  const recipes = await fetchIngredientsBebida(ingredientBebida);
  dispatch(getIngredientsBebida(recipes.drinks));
};
// -------------------------------- BY NAME -----------------------------
export const GET_NAME_DRINK = 'GET_NAME_DRINK';

export const getNameBebida = (recipesByNameBebida) => ({
  type: GET_NAME_DRINK,
  recipesByNameBebida,
});

async function fetchNameBebida(nameBebida) {
  const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameBebida}`);
  const recipesWithName = await responseAPI.json();
  return recipesWithName;
}

export const resultNameBebida = (nameBebida) => async (dispatch) => {
  const recipes = await fetchNameBebida(nameBebida);
  dispatch(getNameBebida(recipes.drinks));
};
// -------------------------------- BY LETTER -----------------------------
export const GET_FIRST_LETTER_DRINK = 'GET_FIRST_LETTER_DRINK';

export const getLetterBebida = (recipesWithLetterBebida) => ({
  type: GET_FIRST_LETTER_DRINK,
  recipesWithLetterBebida,
});

async function fetchLetterBebida(letterBebida) {
  const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letterBebida}`);
  const recipesWithLetter = await responseAPI.json();
  return recipesWithLetter;
}

export const resultLetterBebida = (letterBebida) => async (dispatch) => {
  const recipes = await fetchLetterBebida(letterBebida);
  dispatch(getLetterBebida(recipes.drinks));
};
// -------------------------------- BY ID -----------------------------
export const GET_BY_ID_DRINK = 'GET_BY_ID_DRINK';

export const getByIDBebida = (recipeByIdBebida) => ({
  type: GET_BY_ID_DRINK,
  recipeByIdBebida,
});

async function fetchByIDBebida(id) {
  const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const recipeByID = await responseAPI.json();
  return recipeByID;
}

export const resultIDBebida = (id) => async (dispatch) => {
  const recipe = await fetchByIDBebida(id);
  dispatch(getByIDBebida(recipe.drinks[0]));
};
// -------------------------------- RANDOM -----------------------------
export const GET_RANDOM_DRINK = 'GET_RANDOM_DRINK';

export const getRandomDrink = (recipesByRadomDrink) => ({
  type: GET_RANDOM_DRINK,
  recipesByRadomDrink,
});

async function fetchRandomDrink() {
  const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const recipesByRandom = await responseAPI.json();
  return recipesByRandom;
}

export const resultRandomDrink = () => async (dispatch) => {
  const recipe = await fetchRandomDrink();
  dispatch(getRandomDrink(recipe.drinks));
};
// -------------------------------- CATEGORY -----------------------------
export const GET_CATEGORY_DRINK = 'GET_CATEGORY_DRINK';

export const getCategoryDrink = (recipesByCategoryDrink) => ({
  type: GET_CATEGORY_DRINK,
  recipesByCategoryDrink,
});

async function fetchCategoryDrink() {
  const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const recipesByCategory = await responseAPI.json();
  return recipesByCategory;
}

export const resultCategoryDrink = () => async (dispatch) => {
  const recipe = await fetchCategoryDrink();
  dispatch(getCategoryDrink(recipe.drinks));
};
