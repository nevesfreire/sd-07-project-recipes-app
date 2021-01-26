function getEmailLocalStorage() {
  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', '{ email: initial@gmail.com}');
  }
  return JSON.parse(localStorage.getItem('user'));
}

function setEmailLocalStorage(userEmail) {
  localStorage.setItem('user', `{ email: ${userEmail}}`);
}

function setTokens() {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
}

function getDoneRecipesLocalStorage() {
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', '[]');
  }
  return JSON.parse(localStorage.getItem('doneRecipes'));
}

function putDoneRecipesLocalStorage(recipe) {
  const atualArray = getDoneRecipesLocalStorage();
  atualArray.push(recipe);
  const newArrayInString = JSON.stringify(atualArray);
  localStorage.setItem('doneRecipes', newArrayInString);
}

function getFavoriteRecipesLocalStorage() {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', '[]');
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

function putFavoriteRecipesLocalStorage(recipe) {
  const atualArray = getFavoriteRecipesLocalStorage();
  atualArray.push(recipe);
  const newArrayInString = JSON.stringify(atualArray);
  localStorage.setItem('favoriteRecipes', newArrayInString);
}

function getRecipesInProgressLocalStorage() {
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', '{}');
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

export default {
  getEmailLocalStorage,
  setEmailLocalStorage,
  setTokens,
  getDoneRecipesLocalStorage,
  putDoneRecipesLocalStorage,
  putFavoriteRecipesLocalStorage,
  getRecipesInProgressLocalStorage,
};
