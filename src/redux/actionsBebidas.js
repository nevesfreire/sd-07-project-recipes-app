export const GET_INGREDIENTS_DRINK = 'GET_INGREDIENTS_DRINK';
export const GET_NAME_DRINK = 'GET_NAME_DRINK';
export const GET_FIRST_LETTER_DRINK = 'GET_FIRST_LETTER_DRINK';
export const GET_BY_ID_DRINK = 'GET_BY_ID_DRINK';

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
