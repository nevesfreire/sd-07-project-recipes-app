export default function detailsDidMount(
  buttonClicked, favoriteRecipe, setFavoriteRecipe, currentRecipe,
) {
  if (localStorage.getItem('favoriteRecipes') !== null
  && buttonClicked === false && favoriteRecipe === false) {
    const favoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteLS.filter((recipe) => {
      if (recipe.name === currentRecipe.name) {
        setFavoriteRecipe(true);
      }
      return null;
    });
  }
}
