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

const addToRecipesInProgress = (id, type) => {
  const progressRecipes = localStorage.getItem('inProgressRecipes');
  if (type === 'meals') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        { ...JSON.parse(progressRecipes), meals: { ...progressRecipes.meals, [id]: [] } },
      ));
  } else if (type === 'cocktails') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          ...JSON.parse(progressRecipes),
          cocktails: { ...progressRecipes.cocktails, [id]: [] },
        },
      ));
  }
};

export { removeFromFavorites, addToFavLocalStorage, addToRecipesInProgress };
