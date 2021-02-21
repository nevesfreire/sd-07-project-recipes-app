import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipeDetails, id }) {
  const { disfavor, addToFavorites } = useContext(RecipesContext);
  const [favorited, setFavorited] = useState(false);

  const isFavorited = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favorites.some((recipe) => recipe.id === id);
  };

  const addOrRemoveFavorites = () => {
    if (isFavorited()) {
      disfavor(id);
      setFavorited(false);
    } else {
      addToFavorites(recipeDetails);
      setFavorited(true);
    }
  };

  useEffect(() => {
    const condition = isFavorited();
    if (condition) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={ addOrRemoveFavorites }
    >
      <img
        data-testid="favorite-btn"
        src={ favorited ? BlackHeartIcon : WhiteHeartIcon }
        alt="favorite recipe"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
