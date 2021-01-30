/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function ButtonsShareAndFavFood(props) {
  const { fav, setFav, recipe } = props;

  useEffect(() => {
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    if (favRecipe) {
      const favoriteRecipe = favRecipe.find(({ id }) => id === recipe.idMeal);
      if (favoriteRecipe) {
        setFav(true);
      }
    }
  }, []);

  const saveFavorites = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    if (!favRecipe) {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: idMeal,
        type: 'comida',
        area: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }]));
      setFav(true);
      return true;
    }
    const favoriteRecipe = favRecipe.find(({ id }) => id === idMeal);
    if (!favoriteRecipe) {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipe,
        {
          id: idMeal,
          type: 'comida',
          area: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]));
      setFav(true);
      return true;
    }
    window.localStorage.setItem('favoriteRecipes',
      JSON.stringify(favRecipe.filter(({ id }) => id !== recipe.idMeal)));
    setFav(false);
  };

  return (
    <div>
      <button data-testid="share-btn" type="button">
        <img src={ share } alt="" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ saveFavorites }
        src={ fav ? blackHeart : whiteHeart }
      >
        <img src={ fav ? blackHeart : whiteHeart } alt="" />
      </button>
    </div>
  );
}

ButtonsShareAndFavFood.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  fav: PropTypes.bool.isRequired,
  setFav: PropTypes.func.isRequired,
};

export default ButtonsShareAndFavFood;
