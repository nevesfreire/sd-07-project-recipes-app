const removeFromFavorites = (id) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newList = favoriteList.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

const addToFavLocalStorage = (obj) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newList = [...favoriteList, obj];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

export { removeFromFavorites, addToFavLocalStorage };
