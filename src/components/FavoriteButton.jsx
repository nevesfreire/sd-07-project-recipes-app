import React, { useState, useEffect } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  // const [favoritedRecipeFound, setFavoriteRecipeFound] = useState();
  const [iconButtonColor, setIconButtonColor] = useState(whiteHeartIcon);

  const filterRecipe = (parseSearchFavoriteBttn) => {
    const getRecipe = parseSearchFavoriteBttn.find((rec) => rec.id === id);
    if (getRecipe) setIconButtonColor(blackHeartIcon);
  };

  const favoritedRecipe = () => {
    const searchFavoriteBttn = localStorage.getItem('favoriteRecipes');
    const parseSearchFavoriteBttn = JSON.parse(searchFavoriteBttn);
    return parseSearchFavoriteBttn ? filterRecipe(parseSearchFavoriteBttn) : '';
  };

  const removeFromFavorites = (favoriteList, removedRecipe) => {
    const remove = favoriteList
      .filter((removeItem) => removeItem.id !== removedRecipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    setIconButtonColor(whiteHeartIcon);
  };

  const addToFavorites = (oldList, addRecipe) => {
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...oldList, addRecipe]),
    );
    setIconButtonColor(blackHeartIcon);
  };

  const setFavoriteRecipe = () => {
    const searchFavoriteBttn = localStorage.getItem('favoriteRecipes');
    const parseSearchFavoriteBttn = JSON.parse(searchFavoriteBttn);
    if (parseSearchFavoriteBttn) {
      const findRecipe = parseSearchFavoriteBttn.find((reci) => reci.id === id);
      return findRecipe ? removeFromFavorites(parseSearchFavoriteBttn, findRecipe)
        : addToFavorites(parseSearchFavoriteBttn, recipe);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    setIconButtonColor(blackHeartIcon);
  };

  useEffect(() => {
    favoritedRecipe();
  }, []);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ () => setFavoriteRecipe() }
      src={ iconButtonColor }
    >
      <img src={ iconButtonColor } alt="favorite" />
    </button>
  );
}

export default FavoriteButton;
