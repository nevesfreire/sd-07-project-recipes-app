import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getStorage, setStorage } from '../../services/localStorage';
import './style.css';

function FavoriteButton({ details }) {
  const [favorite, setFavorite] = useState(false);
  const { category, idReceita } = useParams();

  useEffect(() => {
    const localFavorite = getStorage('favoriteRecipes');
    if (localFavorite) {
      const bool = localFavorite.find((item) => item.id === idReceita);
      setFavorite(bool);
    }
  }, [idReceita]);

  function handleFavorite() {
    let localFavorite = getStorage('favoriteRecipes');
    if (localFavorite) {
      const bool = localFavorite.find((item) => item.id === idReceita);
      setFavorite(!bool);
      if (bool) {
        const newFavorite = localFavorite.filter((item) => item.id !== idReceita);
        setStorage('favoriteRecipes', newFavorite);
        return;
      }
    } else {
      localFavorite = [];
      setFavorite(true);
    }
    const obj = {
      id: idReceita,
      type: category.replace('s', ''),
      area: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strDrink || details.strMeal,
      image: details.strDrinkThumb || details.strMealThumb,
    };
    localFavorite.push(obj);
    setStorage('favoriteRecipes', localFavorite);
  }

  return (
    <div className="favorite-button-container">
      <button
        type="button"
        className="favorite-button-button"
        onClick={ () => handleFavorite() }
      >
        {
          !favorite
            ? (
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="favoritar"
                className="favorite-button-image"
              />
            ) : (
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="favoritar"
                className="favorite-button-image"
              />
            )
        }
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  details: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteButton;
