export function setItem(itemName, value) {
  localStorage.getItem(itemName, value);
}
export function getItem(itemName) {
  return localStorage.getItem(itemName);
}

export function doesFavoriteExists(id) {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const resp = JSON.parse(localStorage.getItem('favoriteRecipes')).find((foodID) => id === foodID.id) !== undefined;
  console.log(resp);
  return resp;
}

export function toggleFavorite(obj) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites.find((food) => obj.id === food.id) === undefined) {
    favorites.push(obj);
  } else {
    favorites.splice(favorites.indexOf(obj.id), 1);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}
