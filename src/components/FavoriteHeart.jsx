import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';

function FavoriteHeart({ id, foodDetails, drinkDetails }) {
  const [favoriteButton, setFavoriteButton] = useState('');

  const handleFavoriteRecipe = () => {
    const loadStorage = loadState('favoriteRecipes', []);
    const filteredStorage = loadStorage.filter((element) => element.id !== id);

    if (loadStorage.length > filteredStorage.length) {
      saveState('favoriteRecipes', filteredStorage);
    }

    if (drinkDetails) {
      const expectedObject = {
        id: drinkDetails.idDrink,
        type: 'bebida',
        area: '',
        category: drinkDetails.strCategory,
        alcoholicOrNot: drinkDetails.strAlcoholic,
        name: drinkDetails.strDrink,
        image: drinkDetails.strDrinkThumb,
      };
      saveState('favoriteRecipes', [...loadStorage, expectedObject]);
    }

    if (foodDetails) {
      const expectedObject = {
        id: foodDetails.idMeal,
        type: 'comida',
        area: foodDetails.strArea,
        category: foodDetails.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.strMeal,
        image: foodDetails.strMealThumb,
      };
      saveState('favoriteRecipes', [...loadStorage, expectedObject]);
    }

    setFavoriteButton(!favoriteButton);
  };

  useEffect(() => {
    const loadStorage = loadState('favoriteRecipes', [])
      .some((element) => element.id === id);
      setFavoriteButton(loadStorage);
  }, []);

  return (
    favoriteButton ? (
      <button
        type="button"
        onClick={ handleFavoriteRecipe }
      >
        <img
          src={ blackHeartIcon }
          alt="favorite"
        />
      </button>
    ) : (
      <button
        type="button"
        onClick={ handleFavoriteRecipe }
      >
        <img
          src={ whiteHeartIcon }
          alt="is not favorite"
        />
      </button>
    )
  )
}

FavoriteHeart.propTypes = {
  id: PropTypes.number.isRequired,
  drinkDetails: PropTypes.shape({
    idDrink: PropTypes.number.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
  foodDetails: PropTypes.shape({
    idMeal: PropTypes.number.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteHeart;
