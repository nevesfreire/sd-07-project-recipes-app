import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipeDetails, id }) {
  const { disfavor, addToFavorites, favorites } = useContext(RecipesContext);

  const isFavorited = () => {
    if (recipeDetails.idMeal || recipeDetails.idDrink) {
      return favorites.some((recipe) => recipe.id === id);
    }
  };

  const addOrRemoveFavorites = () => {
    if (isFavorited()) {
      disfavor(id);
    } else {
      addToFavorites(recipeDetails);
    }
  };

  return (
    <button
      type="button"
      onClick={ addOrRemoveFavorites }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorited() ? BlackHeartIcon : WhiteHeartIcon }
        alt="favorite recipe"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipeDetails: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};
