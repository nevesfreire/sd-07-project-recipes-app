const removeFromFavorites = (id) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newList = favoriteList.filter((recipe) => recipe.id !== id);
  console.log(newList);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

export default removeFromFavorites;
