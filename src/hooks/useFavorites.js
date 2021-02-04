import { useState } from 'react';

function useFavorites() {
  const [favorite, setFavorite] = useState(false);

  const onFavorite = (recipe, drinkOrMeals, favoritesRecipes) => {
    let recipeFavorited = {};
    if (drinkOrMeals === 'bebidas') {
      const {
        idDrink: id,
        strAlcoholic: alcoholicOrNot,
        strCategory: category,
        strDrink: name,
        strDrinkThumb: image,
      } = recipe[0];
      recipeFavorited = {
        id,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
        name,
        image,
      };
    } else {
      const {
        idMeal: id,
        strArea: area,
        strCategory: category,
        strMeal: name,
        strMealThumb: image,
      } = recipe[0];
      recipeFavorited = {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
      };
    }
    return favoritesRecipes
      ? localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoritesRecipes, recipeFavorited]),
      )
      : localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([recipeFavorited]),
      );
  };

  const onDesfavorite = (favoritesRecipes, id) => {
    const filteredFavorites = favoritesRecipes
      .filter((currRecipe) => currRecipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...filteredFavorites]));
  };

  const handleClickFavorite = (recipe = [], drinkOrMeals = '', id) => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorite) {
      onFavorite(recipe, drinkOrMeals, favoritesRecipes);
    } else {
      onDesfavorite(favoritesRecipes, id);
    }
    setFavorite(!favorite);
  };

  const isAlreadyFavorite = (id) => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesRecipes) {
      setFavorite(favoritesRecipes.find((currRecipe) => currRecipe.id === id));
    }
  };
  return [favorite, handleClickFavorite, isAlreadyFavorite];
}

export default useFavorites;
