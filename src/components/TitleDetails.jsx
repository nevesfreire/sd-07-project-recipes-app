import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function TitleDetails({ recipes, id }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [favorite, setFavorite] = useState(false);
  const [copy, setCopy] = useState(false);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  const handlerFavorite = () => {
    setFavorite(!favorite);
  };

  const clipBoardRef = useRef();

  const clipBoard = () => {
    setCopy(true);
    const range = document.createRange();
    range.selectNode(clipBoardRef.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
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
          <span
            className={ copy ? 'copy-compartilhar' : '' }
          >
            { copy ? 'Link copiado!' : '' }
          </span>
          <button
            type="button"
            data-testid="share-btn"
            ref={ clipBoardRef }
            src={ shareIcon }
            alt={ `http://localhost:3000/${recipes}/${id}` }
            onClick={ clipBoard }
          >
            dsdsds
          </button>
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
        <span
          className={ copy ? 'copy-compartilhar' : '' }
        >
          { copy ? 'Link copiado!' : '' }
        </span>
        <button
          type="button"
          data-testid="share-btn"
          ref={ clipBoardRef }
          src={ shareIcon }
          alt={ `http://localhost:3000/${recipes}/${id}` }
          onClick={ clipBoard }
        >
          dsdsds
        </button>
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
  id: PropTypes.string.isRequired,
};

export default TitleDetails;
