import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function TitleDetails({ recipes }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [favorite, setFavorite] = useState(false);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  const handlerFavorite = () => {
    setFavorite(!favorite);
  };

  if (recipes === 'comidas') {
    return (
      <div className="div-title">
        {meals && meals.map(({ idMeal, strMeal, strCategory }) => (
          <div
            key={ idMeal }
            className="div-title-detail"
          >
            <h2
              data-testid="recipe-title"
            >
              { strMeal }
            </h2>
            <p
              data-testid="recipe-category"
            >
              { strCategory }
            </p>
          </div>
        ))}
        <div className="div-favorite-detail">
          <img
            className="img-compartilhar"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Icone Compartilhar"
          />
          <button
            type="button"
            onClick={ handlerFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? favoriteIcon : notFavoriteIcon }
              alt="Icone Favoritar"
            />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="div-title">
      {drinks && drinks.map(({ idDrink, strDrink, strAlcoholic }) => (
        <div
          key={ idDrink }
          className="div-title-detail"
        >
          <h2
            data-testid="recipe-title"
          >
            { strDrink }
          </h2>
          <p
            data-testid="recipe-category"
          >
            { strAlcoholic }
          </p>
        </div>
      ))}
      <div className="div-favorite-detail">
        <img
          className="img-compartilhar"
          data-testid="share-btn"
          src={ shareIcon }
          alt="Icone Compartilhar"
        />
        <button
          type="button"
          onClick={ handlerFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? favoriteIcon : notFavoriteIcon }
            alt="Icone Favoritar"
          />
        </button>
      </div>
    </div>
  );
}

TitleDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default TitleDetails;
