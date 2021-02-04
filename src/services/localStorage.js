import getMeals from './mealAPI';

const minusOne = -1;

export const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

export const getStorage = (key) => JSON.parse(localStorage.getItem(key));

function createFavoriteRecipesDatabase() {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

function createDoneRecipesDatabase() {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
}

function createProgressDatabase() {
  localStorage.setItem('inProgressRecipes', JSON.stringify([]));
}

function checkDatabase() {
  let temp;
  temp = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!temp) createFavoriteRecipesDatabase();
  temp = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!temp) createDoneRecipesDatabase();
  temp = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!temp) createProgressDatabase();
}

function setFavoriteRecipes(recipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export function getFavoriteRecipes() {
  checkDatabase();
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

export function recipeIsFavorite(recipe) {
  checkDatabase();
  const recipes = getFavoriteRecipes();
  const match = recipes.findIndex((item) => item.id === recipe.id);
  if (match > minusOne) return true;
  return false;
}

export function doFavoriteRecipe(recipe) {
  console.log(recipe);
  let treatedRecipe;
  if ('idMeal' in recipe) {
    const obj = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    treatedRecipe = obj;
  } else if ('idDrink' in recipe) {
    const obj = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    treatedRecipe = obj;
  } else treatedRecipe = recipe;

  const temp = getFavoriteRecipes();

  const tempIndex = temp.findIndex((item) => item.id === recipe.id);
  if (tempIndex > minusOne) {
    temp.splice(tempIndex, 1);
  } else {
    temp.push(treatedRecipe);
  }

  setFavoriteRecipes(temp);
}

function setDoneRecipes(recipes) {
  localStorage.setItem('doneRecipes', JSON.stringify(recipes));
}

export function getDoneRecipes() {
  checkDatabase();
  return JSON.parse(localStorage.getItem('doneRecipes'));
}

export function addDoneRecipe(recipe) {
  let obj;
  if ('idMeal' in recipe) {
    obj = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: '',
    };
  } else if ('idDrink' in recipe) {
    obj = {
      id: recipe.idDrink,
      type: 'bebidas',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: '',
    };
  }

  const two = 2;
  const today = new Date();
  const day = String(today.getDate()).padStart(two, '0');
  const month = String(today.getMonth() + 1).padStart(two, '0');
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  obj.doneDate = date;

  if (recipe.strTags) obj.tags = recipe.strTags.split(',');
  else obj.tags = [];

  setDoneRecipes(getDoneRecipes().concat(obj));
}

function setRecipesProgress(recipes) {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
}

export function getRecipesProgress() {
  checkDatabase();
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

export function ingredientIsSelected(recipeID, ingredient) {
  checkDatabase();
  const recipes = getRecipesProgress();
  const recipeIndex = recipes.findIndex((item) => item.id === recipeID);
  if (recipeIndex > minusOne) {
    const { ingredients } = recipes[recipeIndex];
    const ingredientIndex = ingredients.findIndex((item) => item === ingredient);
    if (ingredientIndex > minusOne) return true;
  }

  return false;
}

export function addRecipeProgress(recipeID, ingredient) {
  checkDatabase();
  const recipes = getRecipesProgress();
  const recipeIndex = recipes.findIndex((item) => item.id === recipeID);
  if (recipeIndex > minusOne) {
    const { ingredients } = recipes[recipeIndex];
    const ingredientIndex = ingredients.findIndex((item) => item === ingredient);
    if (ingredientIndex > minusOne) {
      recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
    } else recipes[recipeIndex].ingredients.push(ingredient);
  } else {
    const obj = {
      meals: {
        recipeID: [ingredient],
      },
    };
    recipes.push(obj);
  }

  setRecipesProgress(recipes);
}

export function resumeRecipe(recipeID) {
  checkDatabase();
  const recipes = getRecipesProgress();
  if (recipes.find((item) => item.id === recipeID)) {
    const doneRecipes = getDoneRecipes();
    if (!doneRecipes.find((item) => item.id === recipeID)) return true;
  }

  return false;
}

export async function mockRecipe(id) {
  const recipe = await getMeals('ID', id);
  return recipe;
}
