const copy = require('clipboard-copy');

const objectInProgressLocalStorage = {
  meals: {},
  cocktails: {},
};

export const innitialLocalStorage = () => {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(objectInProgressLocalStorage));
  }
};

export const changeFavorites = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    const getID = favoriteRecipes.find((favorite) => favorite.id === id);
    if (getID) return true;
    return false;
  }
};

export const verifyIdMeals = (id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (Object.keys(inProgressRecipes.meals) !== undefined) {
    const arrayIDs = Object.keys(inProgressRecipes.meals);
    const getID = arrayIDs.find((idRecipe) => idRecipe === id);
    if (getID) return false;
    return true;
  }
};

export const verifyIdDrinks = (id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (Object.keys(inProgressRecipes.cocktails) !== undefined) {
    const arrayIDs = Object.keys(inProgressRecipes.cocktails);
    const getID = arrayIDs.find((idRecipe) => idRecipe === id);
    if (getID) return false;
    return true;
  }
};

export const handleClick = (history) => {
  copy(`http://localhost:3000${history.location.pathname}`);
  return true;
};

export const ingredientsListMeals = (detail) => {
  const one = 1;
  const twenty = 20;
  const list = [];
  for (let index = one; index <= twenty; index += one) {
    if (detail[`strIngredient${index}`] !== ''
      && detail[`strIngredient${index}`] !== null) {
      list.push(`${detail[`strIngredient${index}`]} - ${detail[`strMeasure${index}`]}`);
    }
  }
  return list;
};

export const ingredientsListDrinks = (detail) => {
  const one = 1;
  const twenty = 15;
  const list = [];
  for (let index = one; index <= twenty; index += one) {
    if (detail[`strIngredient${index}`] !== null
      && detail[`strIngredient${index}`] !== '') {
      list.push(`${detail[`strIngredient${index}`]} - ${detail[`strMeasure${index}`]}`);
    }
  }
  return list;
};

const three = 3;

export const handleClickinProcess = (history) => {
  const url = history.location.pathname;
  const urlCut = url.split('/', three);
  copy(`http://localhost:3000/${urlCut[1]}/${urlCut[2]}`);
  return true;
};
