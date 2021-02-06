import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';
import CoffeeAndCodeContext from '../context/CoffeeAndCodeContext';

function FavoriteHeart({ id, drink, food }) {
  const [favoriteButton, setFavoriteButton] = useState('');

  const {
    foodDetails,
    drinkDetails,
  } = useContext(CoffeeAndCodeContext);

  const handleFavoriteRecipe = () => {
    const loadStorage = loadState('favoriteRecipes', []);
    const filteredStorage = loadStorage.filter((element) => element.id !== id);

    if (loadStorage.length > filteredStorage.length) {
      saveState('favoriteRecipes', filteredStorage);
    }

    if (drink) {
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

    if (food) {
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
          data-testid="favorite-btn"
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
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="is not favorite"
        />
      </button>
    )
  );
}

FavoriteHeart.propTypes = {
  id: PropTypes.number.isRequired,
  drink: PropTypes.bool.isRequired,
  food: PropTypes.bool.isRequired,
};

export default FavoriteHeart;
