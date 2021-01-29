import React from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function ButtonsShhareAndFav(props) {
  const { fav, setFav, recipe } = props;

  // const saveFavorites = () => {
  //   if () {
  //     const {idMeal, strArea, strCategory } = recipe;

  //   }
  // };

  return (
    <div>
      {console.log(recipe)}
      <button data-testid="share-btn" type="button">
        <img src={ share } alt="" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => setFav(!fav) }
      >
        <img src={ fav ? blackHeart : whiteHeart } alt="" />
      </button>
    </div>
  );
}

ButtonsShhareAndFav.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  fav: PropTypes.bool.isRequired,
  setFav: PropTypes.func.isRequired,
};

export default ButtonsShhareAndFav;
