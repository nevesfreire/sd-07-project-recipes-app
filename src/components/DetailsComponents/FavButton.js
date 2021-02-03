import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavButton() {
  const {
    favorite,
    setFavorite,
  } = useContext(RecipesContext);

  const handleFavBtn = () => {
    setFavorite(false);
  };

  const handleNotFavBtn = () => {
    setFavorite(true);
  };

  if (favorite) {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavBtn }
      >
        <img
          src={ blackHeartIcon }
          alt="Favorited Icon"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleNotFavBtn }
    >
      <img
        src={ whiteHeartIcon }
        alt="Not Favorited Icon"
      />
    </button>
  );
}

export default FavButton;
