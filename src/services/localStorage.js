const minusOne = -1;

export const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

export const getStorage = (key) => JSON.parse(localStorage.getItem(key));

function createFavoriteRecipesDatabase() {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

function checkDatabase() {
  // let temp;
  const temp = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!temp) createFavoriteRecipesDatabase();
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
