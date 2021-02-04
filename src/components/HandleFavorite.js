export function handleFavoriteFood(detailsRecipe, favoriteRecipe, setFavoriteRecipe, setButtonClicked) {
  setButtonClicked(true);
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailsRecipe;
  const newRecipe = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  if (favoriteRecipe === false) {
    setFavoriteRecipe(true);
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
    } else {
      const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavoriteList = [
        ...favoriteLocalStorage,
        newRecipe,
      ];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(newFavoriteList),
      );
    }
  }
  if (favoriteRecipe === true) {
    setFavoriteRecipe(false);
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newListFavorite = favoriteLocalStorage
      .filter((recipe) => recipe.name !== newRecipe.name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
  }
}

export function handleFavoriteDrink() {
  return null;
}
