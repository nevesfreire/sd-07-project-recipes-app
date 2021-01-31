function checkFavorites(itemId, setIsFavorite) {
  const zero = 0;

  const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
    setIsFavorite(true);
  }
}

export default checkFavorites;
