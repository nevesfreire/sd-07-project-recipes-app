export function getEmailLocalStorage() {
  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', '{ email: initial@gmail.com}');
  }
  return JSON.parse(localStorage.getItem('user'));
}

export function setEmailLocalStorage(userEmail) {
  localStorage.setItem('user', `{ email: ${userEmail}}`);
}

export function setTokens() {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
}

export function getDoneRecipesLocalStorage() {
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', '[]');
  }
  return JSON.parse(localStorage.getItem('doneRecipes'));
}

export function putDoneRecipesLocalStorage(recipe) {
  const atualArray = getDoneRecipesLocalStorage();
  atualArray.push(recipe);
  const newArrayInString = JSON.stringify(atualArray);
  localStorage.setItem('doneRecipes', newArrayInString);
}

export function getFavoriteRecipesLocalStorage() {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', '[]');
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

export function putFavoriteRecipesLocalStorage(recipe) {
  const atualArray = getFavoriteRecipesLocalStorage();
  atualArray.push(recipe);
  const newArrayInString = JSON.stringify(atualArray);
  localStorage.setItem('favoriteRecipes', newArrayInString);
}

export function getRecipesInProgressLocalStorage() {
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', '{}');
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}
